<?php
/**
 * feed.php — RSS 2.0 feed for newly uploaded simulations.
 *
 * Endpoints:
 *   feed.php                  → All uploads
 *   feed.php?level=primary    → Primary school only
 *   feed.php?level=secondary  → Secondary school only
 *   feed.php?level=jc         → Junior College only
 *   feed.php?subject=sciences → Subject group (sciences|mathematics|computing|humanities|languages|arts)
 *
 * Subscribe URL to paste into any RSS reader (Feedly, Outlook, etc.):
 *   https://iwant2study.org/lookangejss/promptLibrary/feed.php
 */

declare(strict_types=1);

require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/upload_storage.php';

// ── Config ─────────────────────────────────────────────────────────────────

const SITE_BASE  = 'https://iwant2study.org/lookangejss/promptLibrary/';
const SITE_TITLE = 'SLS Prompt Library — New Simulations';
const SITE_DESC  = 'Latest interactive simulations uploaded by MOE teachers on the SLS Prompt Generator Library.';
const MAX_ITEMS  = 50;

// ── Helpers ────────────────────────────────────────────────────────────────

function levelBand(string $level): string
{
    $l = strtolower($level);
    if (preg_match('/primary|^p[1-6]$/', $l))              return 'primary';
    if (preg_match('/jc|junior.college|a.?level|pre.?u/', $l)) return 'jc';
    if ($l !== '')                                           return 'secondary';
    return '';
}

function subjectGroup(string $subject): string
{
    $s = strtolower($subject);
    if (preg_match('/physics|chemistry|biology|science/', $s)) return 'sciences';
    if (preg_match('/math/',                              $s)) return 'mathematics';
    if (preg_match('/comput|ict|program|digital/',        $s)) return 'computing';
    if (preg_match('/geo|history|social|economics|cce|humanities/', $s)) return 'humanities';
    if (preg_match('/english|malay|chinese|tamil|language/', $s)) return 'languages';
    if (preg_match('/art|design|music|drama/',            $s)) return 'arts';
    return 'others';
}

function xmlEsc(string $s): string { return htmlspecialchars($s, ENT_XML1 | ENT_QUOTES, 'UTF-8'); }

function rfc822(string $dt): string
{
    return (new DateTimeImmutable($dt, new DateTimeZone('Asia/Singapore')))->format(DateTimeInterface::RSS);
}

// ── Parse filters ──────────────────────────────────────────────────────────

$filterLevel   = strtolower(trim($_GET['level']   ?? ''));
$filterSubject = strtolower(trim($_GET['subject']  ?? ''));

$validLevels   = ['primary', 'secondary', 'jc'];
$validSubjects = ['sciences', 'mathematics', 'computing', 'humanities', 'languages', 'arts', 'others'];

if ($filterLevel   && !in_array($filterLevel,   $validLevels,   true)) $filterLevel   = '';
if ($filterSubject && !in_array($filterSubject, $validSubjects, true)) $filterSubject = '';

// Build feed title & self-URL
$feedTitle = SITE_TITLE;
$selfUrl   = SITE_BASE . 'feed.php';
$params    = [];
if ($filterLevel)   { $feedTitle .= ' [' . ucfirst($filterLevel) . ']'; $params[] = 'level='   . urlencode($filterLevel); }
if ($filterSubject) { $feedTitle .= ' [' . ucfirst($filterSubject) . ']'; $params[] = 'subject=' . urlencode($filterSubject); }
if ($params) $selfUrl .= '?' . implode('&', $params);

// ── Query DB ───────────────────────────────────────────────────────────────

try {
    $pdo = getDB();

    $rows = $pdo->query(
        'SELECT id, title, slug, subject, level, description, folder_path, html_filename,
                user_name, user_email, updated_at
           FROM simulations
          ORDER BY updated_at DESC
          LIMIT ' . MAX_ITEMS
    )->fetchAll();

} catch (PDOException $e) {
    error_log('feed.php: ' . $e->getMessage());
    $rows = [];
}

// ── Filter rows ────────────────────────────────────────────────────────────

$items = [];
foreach ($rows as $row) {
    $row = migrateSimulationStorage($pdo, $row);

    $band  = levelBand($row['level'] ?? '');
    $group = subjectGroup($row['subject'] ?? '');

    if ($filterLevel && $band !== $filterLevel)     continue;
    if ($filterSubject && $group !== $filterSubject) continue;

    $items[] = $row;
}

// ── Emit RSS ───────────────────────────────────────────────────────────────

header('Content-Type: application/rss+xml; charset=utf-8');
header('Cache-Control: public, max-age=300');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title><?= xmlEsc($feedTitle) ?></title>
    <link><?= xmlEsc(SITE_BASE . 'ai-prompt-library.html') ?></link>
    <description><?= xmlEsc(SITE_DESC) ?></description>
    <language>en-sg</language>
    <ttl>30</ttl>
    <atom:link href="<?= xmlEsc($selfUrl) ?>" rel="self" type="application/rss+xml"/>
    <image>
      <url><?= xmlEsc(SITE_BASE) ?>favicon.ico</url>
      <title><?= xmlEsc($feedTitle) ?></title>
      <link><?= xmlEsc(SITE_BASE . 'ai-prompt-library.html') ?></link>
    </image>

<?php foreach ($items as $row):
    $recordId = isset($row['id']) ? (int) $row['id'] : 0;
    $simUrl  = $recordId > 0
             ? SITE_BASE . 'open_upload.php?id=' . $recordId
             : SITE_BASE . rtrim($row['folder_path'] ?? '', '/') . '/' . ($row['html_filename'] ?? 'index.html');
    $guid    = SITE_BASE . 'sim/' . xmlEsc($row['slug'] ?? '');
    $desc    = trim($row['description'] ?? '');
    $subject = trim($row['subject'] ?? '');
    $level   = trim($row['level']   ?? '');
    $author  = trim($row['user_name'] ?? 'MOE Teacher');
    $pubDate = $row['updated_at'] ? rfc822($row['updated_at']) : '';
?>
    <item>
      <title><?= xmlEsc($row['title'] ?? 'Untitled') ?></title>
      <link><?= xmlEsc($simUrl) ?></link>
      <guid isPermaLink="false"><?= $guid ?></guid>
      <?php if ($pubDate): ?><pubDate><?= $pubDate ?></pubDate><?php endif ?>
      <?php if ($subject): ?><category><?= xmlEsc($subject) ?></category><?php endif ?>
      <?php if ($level):   ?><category><?= xmlEsc($level) ?></category><?php endif ?>
      <dc:creator><?= xmlEsc($author) ?></dc:creator>
      <?php if ($desc): ?>
      <description><![CDATA[<?= $desc ?>]]></description>
      <?php endif ?>
    </item>
<?php endforeach ?>

  </channel>
</rss>
