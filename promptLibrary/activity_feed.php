<?php
/**
 * activity_feed.php — Social presence + activity feed endpoint.
 *
 * GET  activity_feed.php
 *      → JSON { online: N, recent: [...], hot: [...] }
 *
 * POST action=ping  token=<hex32>
 *      → Heartbeat — keeps the user counted as "online now".
 *
 * POST action=log   token=<hex32>  type=view|download|upload  slug=<str>  title=<str>
 *      → Records a user action in the activity log.
 *
 * ── SQL: run once in phpMyAdmin ────────────────────────────────────────────
 *
 * CREATE TABLE IF NOT EXISTS page_pings (
 *   session_token CHAR(32) PRIMARY KEY,
 *   last_ping     DATETIME NOT NULL,
 *   INDEX idx_ping (last_ping)
 * ) ENGINE=InnoDB;
 *
 * CREATE TABLE IF NOT EXISTS activity_log (
 *   id             INT AUTO_INCREMENT PRIMARY KEY,
 *   event_type     ENUM('view','download','upload') NOT NULL,
 *   resource_slug  VARCHAR(255),
 *   resource_title VARCHAR(255),
 *   anon_label     VARCHAR(80),
 *   created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   INDEX idx_created (created_at),
 *   INDEX idx_slug    (resource_slug, created_at)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 *
 * ──────────────────────────────────────────────────────────────────────────
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/db_config.php';

// ── Helpers ────────────────────────────────────────────────────────────────

function sanitizeToken(string $t): string
{
    return substr(preg_replace('/[^a-f0-9]/', '', strtolower($t)), 0, 32);
}

function relTime(string $dt): string
{
    $diff = max(0, time() - (int)strtotime($dt));
    if ($diff < 90)    return 'just now';
    if ($diff < 3600)  return (int)($diff / 60) . ' min ago';
    if ($diff < 86400) return (int)($diff / 3600) . ' hr ago';
    return (int)($diff / 86400) . 'd ago';
}

const ANON_LABELS = [
    'A Physics teacher',    'A Maths educator',      'A Science teacher',
    'A Primary teacher',    'A Secondary teacher',   'A JC teacher',
    'An educator',          'A teacher',             'A Computing teacher',
    'A Biology teacher',    'A Chemistry teacher',   'A Geography teacher',
    'An English teacher',   'A History teacher',     'A Design & Tech teacher',
];

function anonLabel(string $token): string
{
    $idx = abs(crc32($token)) % count(ANON_LABELS);
    return ANON_LABELS[$idx];
}

// ── Routing ────────────────────────────────────────────────────────────────

$method = $_SERVER['REQUEST_METHOD'];
$action = ($method === 'POST') ? (trim($_POST['action'] ?? '') ?: 'ping') : 'feed';

// ── POST: ping ─────────────────────────────────────────────────────────────
if ($action === 'ping') {
    $token = sanitizeToken($_POST['token'] ?? '');
    if (strlen($token) === 32) {
        try {
            getDB()->prepare(
                'INSERT INTO page_pings (session_token, last_ping) VALUES (?, NOW())
                 ON DUPLICATE KEY UPDATE last_ping = NOW()'
            )->execute([$token]);
        } catch (PDOException $e) {
            error_log('activity_feed ping: ' . $e->getMessage());
        }
    }
    echo json_encode(['ok' => true]);
    exit;
}

// ── POST: log ──────────────────────────────────────────────────────────────
if ($action === 'log') {
    $token = sanitizeToken($_POST['token'] ?? '');
    $type  = in_array($_POST['type'] ?? '', ['view', 'download', 'upload'], true)
           ? $_POST['type'] : 'view';
    $slug  = substr(trim($_POST['slug']  ?? ''), 0, 255);
    $title = substr(trim($_POST['title'] ?? ''), 0, 255);
    $label = anonLabel($token ?: bin2hex(random_bytes(4)));

    try {
        getDB()->prepare(
            'INSERT INTO activity_log (event_type, resource_slug, resource_title, anon_label)
             VALUES (?, ?, ?, ?)'
        )->execute([$type, $slug, $title, $label]);
    } catch (PDOException $e) {
        error_log('activity_feed log: ' . $e->getMessage());
    }

    echo json_encode(['ok' => true]);
    exit;
}

// ── GET: feed ──────────────────────────────────────────────────────────────

header('Cache-Control: no-store');

try {
    $pdo = getDB();

    // ── Online count: sessions that pinged in the last 5 minutes ──────────
    $online = max(1,
        (int)$pdo->query(
            'SELECT COUNT(*) FROM page_pings WHERE last_ping > NOW() - INTERVAL 5 MINUTE'
        )->fetchColumn()
    );

    // ── Real recent events (last 30 minutes) ──────────────────────────────
    $rows = $pdo->query(
        'SELECT id, event_type, resource_slug, resource_title, anon_label, created_at
           FROM activity_log
          WHERE created_at > NOW() - INTERVAL 30 MINUTE
          ORDER BY created_at DESC
          LIMIT 20'
    )->fetchAll();

    $events = array_map(fn($r) => [
        'id'    => (int)$r['id'],
        'type'  => $r['event_type'],
        'slug'  => $r['resource_slug'],
        'title' => $r['resource_title'],
        'label' => $r['anon_label'],
        'when'  => relTime($r['created_at']),
    ], $rows);

    // ── Supplement with plausible seeded events when feed is sparse ────────
    // Events with negative IDs are synthetic — the client skips them for toasts
    // but shows them in the activity ticker to create a sense of activity.
    // The 10-minute bucket seed keeps results stable within each window.
    if (count($events) < 8) {
        mt_srand(intdiv(time(), 600));  // stable per 10-minute window

        // Pull up to 20 simulation titles, ordered deterministically by id
        $sims = $pdo->query(
            'SELECT slug, title FROM simulations ORDER BY id LIMIT 20'
        )->fetchAll();

        if ($sims) {
            // Seeded shuffle (Fisher-Yates via mt_rand)
            $indices = range(0, count($sims) - 1);
            for ($i = count($indices) - 1; $i > 0; $i--) {
                $j = mt_rand(0, $i);
                [$indices[$i], $indices[$j]] = [$indices[$j], $indices[$i]];
            }

            $seedTypes = ['view', 'download', 'view', 'view', 'download', 'view', 'download', 'view'];
            $need      = 10 - count($events);
            $synthId   = -1;

            for ($k = 0; $k < min($need, count($indices)); $k++) {
                $sim    = $sims[$indices[$k]];
                $minAgo = 3 + $k * mt_rand(4, 11) + mt_rand(0, 4);
                $events[] = [
                    'id'    => $synthId--,
                    'type'  => $seedTypes[$k % count($seedTypes)],
                    'slug'  => $sim['slug'],
                    'title' => $sim['title'],
                    'label' => ANON_LABELS[mt_rand(0, count(ANON_LABELS) - 1)],
                    'when'  => $minAgo < 2 ? 'just now' : $minAgo . ' min ago',
                ];
            }
        }
    }

    // ── Hot slugs: appear ≥ 3 times in the last 60 minutes ────────────────
    $hotRows  = $pdo->query(
        'SELECT resource_slug
           FROM activity_log
          WHERE created_at > NOW() - INTERVAL 60 MINUTE
          GROUP BY resource_slug
         HAVING COUNT(*) >= 3'
    )->fetchAll(\PDO::FETCH_COLUMN);
    $hotSlugs = array_values($hotRows);

    echo json_encode([
        'online' => $online,
        'recent' => array_slice($events, 0, 15),
        'hot'    => $hotSlugs,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    error_log('activity_feed.php feed: ' . $e->getMessage());
    // Graceful fallback — page still works if DB is down
    echo json_encode(['online' => 1, 'recent' => [], 'hot' => []]);
}
