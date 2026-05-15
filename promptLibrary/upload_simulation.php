<?php
/**
 * upload_simulation.php
 *
 * Accepts a multipart POST from ai-prompt-library.html.
 * Verifies the Google ID token, checks MOE domain, saves files under
 * ./01users/{opaque-owner-key}/{slug}/, and upserts a row in the simulations table.
 *
 * POST fields:
 *   id_token      — Google ID JWT
 *   title         — simulation title (required)
 *   subject       — subject area (optional)
 *   level         — grade level (optional)
 *   description   — short description (optional)
 *   edit          — '1' if updating an existing upload, '' otherwise
 *   existing_slug — the slug to overwrite when edit=1
 *
 * FILES:
 *   html_file     — the .html simulation (required, max 2 MB)
 *   prompt_file   — the prompt.txt (optional, max 50 KB)
 */

declare(strict_types=1);

// ── CORS ───────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ── Config ─────────────────────────────────────────────────────────────────
require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/upload_storage.php';

const MAX_HTML_BYTES   = 2 * 1024 * 1024;   // 2 MB
const MAX_ZIP_BYTES    = 10 * 1024 * 1024;  // 10 MB
const MAX_PROMPT_BYTES = 50 * 1024;         // 50 KB

// ── Helpers ────────────────────────────────────────────────────────────────

function jsonError(string $msg, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

/**
 * Verify a Google ID token via the tokeninfo endpoint.
 * Uses cURL (preferred on shared hosting) with file_get_contents as fallback.
 */
function verifyGoogleToken(string $idToken): array {
    $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($idToken);

    $raw = false;
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT      => 'SLS-PromptLibrary/1.0',
        ]);
        $raw    = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($raw === false || $status === 0) $raw = false;
    }

    if ($raw === false && ini_get('allow_url_fopen')) {
        $ctx = stream_context_create(['http' => ['timeout' => 10]]);
        $raw = @file_get_contents($url, false, $ctx);
    }

    if ($raw === false) {
        throw new RuntimeException('Could not reach Google token endpoint (check server cURL/allow_url_fopen)');
    }

    $payload = json_decode($raw, true);
    if (!$payload || isset($payload['error_description'])) {
        throw new RuntimeException('Invalid Google ID token: ' . ($payload['error_description'] ?? 'unknown'));
    }
    return $payload;
}

/**
 * Turn a title into a URL-safe slug (max 80 chars).
 */
function makeSlug(string $title): string {
    $slug = mb_strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return mb_substr($slug, 0, 80);
}

// ── 1. Validate token ──────────────────────────────────────────────────────

$idToken = trim($_POST['id_token'] ?? '');
if ($idToken === '') {
    jsonError('Missing id_token');
}

try {
    $payload = verifyGoogleToken($idToken);
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 401);
}

// Verify audience
if (($payload['aud'] ?? '') !== GOOGLE_CLIENT_ID) {
    jsonError('Token audience mismatch', 401);
}

$email    = strtolower(trim($payload['email'] ?? ''));
$userName = trim($payload['name'] ?? '');

if ($email === '') {
    jsonError('No email in token', 401);
}

// Verify MOE domain
$emailDomain = substr($email, strrpos($email, '@') + 1);
if (!in_array($emailDomain, ALLOWED_DOMAINS, true)) {
    jsonError("Only @moe.edu.sg or @moe.gov.sg accounts may upload (got @{$emailDomain})", 403);
}

// ── 2. Validate POST fields ────────────────────────────────────────────────

$title       = trim($_POST['title']         ?? '');
$subject     = trim($_POST['subject']       ?? '');
$level       = trim($_POST['level']         ?? '');
$description = trim($_POST['description']   ?? '');
$slsUrl      = trim($_POST['sls_url']       ?? '');
$isEdit      = (($_POST['edit'] ?? '') === '1');

// Validate SLS URL (must be empty or a proper https:// URL, and not a blocked cloud-storage host)
if ($slsUrl !== '') {
    $parsed = parse_url($slsUrl);
    if (empty($parsed['host']) || !in_array($parsed['scheme'] ?? '', ['http', 'https'], true)) {
        jsonError('SLS URL is not a valid URL (must start with https://)');
    }
    $blockedHosts = [
        'drive.google.com', 'docs.google.com', 'sheets.google.com', 'slides.google.com',
        '1drv.ms', 'onedrive.live.com', 'sharepoint.com',
        'dropbox.com', 'dropboxusercontent.com', 'box.com', 'icloud.com',
    ];
    $host = strtolower(preg_replace('/^www\./', '', $parsed['host']));
    foreach ($blockedHosts as $blocked) {
        if ($host === $blocked || str_ends_with($host, '.' . $blocked)) {
            jsonError("SLS URL points to {$host}, which is not accessible to SLS users. Use an SLS community or go.gov.sg link.");
        }
    }
    if (strlen($slsUrl) > 500) $slsUrl = substr($slsUrl, 0, 500);
}
$existingSlug = trim($_POST['existing_slug'] ?? '');

if ($title === '') {
    jsonError('Title is required');
}

$slug = $isEdit && $existingSlug !== '' ? makeSlug($existingSlug) : makeSlug($title);
if ($slug === '') {
    jsonError('Could not derive a valid slug from the title');
}

// ── 3. Validate uploaded files ─────────────────────────────────────────────

$htmlFile = $_FILES['html_file'] ?? null;
if (!$htmlFile || $htmlFile['error'] !== UPLOAD_ERR_OK) {
    // On edit the HTML file is optional (user may only update metadata)
    if (!$isEdit) {
        jsonError('HTML file is required');
    }
    $htmlFile = null;
}

$promptFile = $_FILES['prompt_file'] ?? null;
if ($promptFile && $promptFile['error'] !== UPLOAD_ERR_OK) {
    $promptFile = null; // treat optional file errors as absent
}

if ($htmlFile !== null) {
    $htmlExt = strtolower(pathinfo($htmlFile['name'], PATHINFO_EXTENSION));
    if (!in_array($htmlExt, ['html', 'zip'], true)) {
        jsonError('Only .html or .zip files are accepted');
    }
    $sizeLimit = ($htmlExt === 'zip') ? MAX_ZIP_BYTES : MAX_HTML_BYTES;
    if ($htmlFile['size'] > $sizeLimit) {
        jsonError($htmlExt === 'zip' ? 'ZIP file exceeds 10 MB limit' : 'HTML file exceeds 2 MB limit');
    }
}

if ($promptFile !== null) {
    if ($promptFile['size'] > MAX_PROMPT_BYTES) {
        jsonError('prompt.txt exceeds 50 KB limit');
    }
    $promptExt = strtolower(pathinfo($promptFile['name'], PATHINFO_EXTENSION));
    if (!in_array($promptExt, ['txt', 'md'], true)) {
        jsonError('Prompt file must be .txt or .md');
    }
}

// ── 4. Prepare filesystem paths ────────────────────────────────────────────

$ownerKey   = buildUploadOwnerKey($email);
$folderPath = buildSimulationFolderPath($email, $slug);
$baseDir    = __DIR__ . '/01users';
$ownerDir   = uploadAbsolutePath(dirname($folderPath));
$simDir     = uploadAbsolutePath($folderPath);
$pdo        = null;

// If this is an edit, migrate any legacy email-based storage to the opaque
// owner-key path before writing updated files.
if ($isEdit) {
    try {
        $pdo = getDB();
        $stmt = $pdo->prepare(
            'SELECT id, user_email, slug, folder_path
               FROM simulations
              WHERE user_email = :user_email AND slug = :slug
              LIMIT 1'
        );
        $stmt->execute([
            ':user_email' => $email,
            ':slug' => $slug,
        ]);
        $existingRow = $stmt->fetch();
        if ($existingRow) {
            migrateSimulationStorage($pdo, $existingRow);
        }
    } catch (PDOException $e) {
        error_log('upload_simulation.php preflight lookup failed: ' . $e->getMessage());
    }
}

// Create directories if they don't exist
foreach ([$baseDir, $ownerDir, $simDir] as $dir) {
    if (!ensureUploadDirectory($dir)) {
        jsonError("Could not create directory: $dir", 500);
    }
}

// ── 5. Save uploaded files ─────────────────────────────────────────────────

$htmlFilename   = null;
$promptFilename = null;

if ($htmlFile !== null) {
    $htmlExt = strtolower(pathinfo($htmlFile['name'], PATHINFO_EXTENSION));

    if ($htmlExt === 'zip') {
        // ── Extract ZIP into $simDir ──────────────────────────────────
        if (!class_exists('ZipArchive')) {
            jsonError('ZIP support (ZipArchive) is not available on this server', 500);
        }
        $tmpZip = $htmlFile['tmp_name'];
        $zip = new ZipArchive();
        if ($zip->open($tmpZip) !== true) {
            jsonError('Could not open ZIP file — it may be corrupt', 400);
        }

        // Security: reject any entry with path traversal or absolute paths
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $entry = $zip->getNameIndex($i);
            if (strpos($entry, '..') !== false || strpos($entry, '/') === 0) {
                $zip->close();
                jsonError('ZIP contains unsafe paths', 400);
            }
        }

        $zip->extractTo($simDir);
        $zip->close();

        // Keep the original ZIP in the simulation folder so users can download it.
        // Name it after the slug so get_public_uploads.php can locate it reliably.
        @copy($tmpZip, $simDir . '/' . $slug . '.zip');

        // Locate index.html — accept at root or one level deep (common zip structure)
        if (file_exists($simDir . '/index.html')) {
            $htmlFilename = 'index.html';
        } else {
            // Search one level deep for index.html
            foreach (glob($simDir . '/*/index.html') as $found) {
                // Flatten: move contents up to $simDir
                $subDir = dirname($found);
                foreach (array_diff(scandir($subDir), ['.', '..']) as $entry) {
                    rename($subDir . '/' . $entry, $simDir . '/' . $entry);
                }
                rmdir($subDir);
                $htmlFilename = 'index.html';
                break;
            }
        }
        if (!$htmlFilename) {
            jsonError('ZIP extracted but no index.html found inside', 400);
        }

    } else {
        // ── Plain HTML file ───────────────────────────────────────────
        $htmlFilename = 'index.html';
        if (!move_uploaded_file($htmlFile['tmp_name'], $simDir . '/' . $htmlFilename)) {
            jsonError('Failed to save HTML file', 500);
        }
    }
}

if ($promptFile !== null) {
    $promptFilename = 'prompt.' . strtolower(pathinfo($promptFile['name'], PATHINFO_EXTENSION));
    $dest = $simDir . '/' . $promptFilename;
    if (!move_uploaded_file($promptFile['tmp_name'], $dest)) {
        error_log("upload_simulation.php: failed to save prompt file for $email/$slug");
        $promptFilename = null;
    }
}

$thumbFile = $_FILES['thumbnail_file'] ?? null;
if ($thumbFile && $thumbFile['error'] === UPLOAD_ERR_OK && $thumbFile['size'] <= 500 * 1024) {
    move_uploaded_file($thumbFile['tmp_name'], $simDir . '/prompt_image.png');
}

// ── 6. Upsert database record ───────────────────────────────────────────────

try {
    if (!$pdo instanceof PDO) {
        $pdo = getDB();
    }

    if ($isEdit) {
        // Update existing row (only update non-null fields)
        $sets = ['title=:title', 'subject=:subject', 'level=:level', 'description=:description',
                 'sls_url=:sls_url', 'user_name=:user_name', 'folder_path=:folder_path', 'updated_at=NOW()'];
        $params = [
            ':title'       => $title,
            ':subject'     => $subject,
            ':level'       => $level,
            ':description' => $description,
            ':sls_url'     => $slsUrl,
            ':user_name'   => $userName,
            ':folder_path' => $folderPath,
            ':user_email'  => $email,
            ':slug'        => $slug,
        ];

        if ($htmlFilename !== null) {
            $sets[]                  = 'html_filename=:html_filename';
            $params[':html_filename'] = $htmlFilename;
        }
        if ($promptFilename !== null) {
            $sets[]                    = 'prompt_filename=:prompt_filename';
            $params[':prompt_filename'] = $promptFilename;
        }

        $sql = 'UPDATE simulations SET ' . implode(', ', $sets)
             . ' WHERE user_email=:user_email AND slug=:slug';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        // If no row was updated (e.g. slug mismatch), fall through to insert
        if ($stmt->rowCount() === 0) {
            $isEdit = false; // treat as new
        }
    }

    if (!$isEdit) {
        $stmt = $pdo->prepare('
            INSERT INTO simulations
              (user_email, user_name, title, slug, subject, level, description, sls_url,
               folder_path, html_filename, prompt_filename)
            VALUES
              (:user_email, :user_name, :title, :slug, :subject, :level, :description, :sls_url,
               :folder_path, :html_filename, :prompt_filename)
            ON DUPLICATE KEY UPDATE
              title=VALUES(title), subject=VALUES(subject), level=VALUES(level),
              description=VALUES(description), sls_url=VALUES(sls_url),
              user_name=VALUES(user_name), folder_path=VALUES(folder_path),
              html_filename=IF(VALUES(html_filename) IS NOT NULL, VALUES(html_filename), html_filename),
              prompt_filename=IF(VALUES(prompt_filename) IS NOT NULL, VALUES(prompt_filename), prompt_filename),
              updated_at=NOW()
        ');
        $stmt->execute([
            ':user_email'     => $email,
            ':user_name'      => $userName,
            ':title'          => $title,
            ':slug'           => $slug,
            ':subject'        => $subject,
            ':level'          => $level,
            ':description'    => $description,
            ':sls_url'        => $slsUrl,
            ':folder_path'    => $folderPath,
            ':html_filename'  => $htmlFilename,
            ':prompt_filename' => $promptFilename,
        ]);
    }
} catch (PDOException $e) {
    error_log('upload_simulation.php DB error: ' . $e->getMessage());
    jsonError('Database error — please try again later', 500);
}

// ── 7. Fire push notification for new uploads ───────────────────────────

$recordId = null;
if ($pdo instanceof PDO) {
    try {
        $stmt = $pdo->prepare(
            'SELECT id
               FROM simulations
              WHERE user_email = :user_email AND slug = :slug
              LIMIT 1'
        );
        $stmt->execute([
            ':user_email' => $email,
            ':slug' => $slug,
        ]);
        $recordId = $stmt->fetchColumn() ?: null;
    } catch (PDOException $e) {
        error_log('upload_simulation.php record lookup failed: ' . $e->getMessage());
    }
}

if (!$isEdit && defined('VAPID_PUBLIC_KEY') && VAPID_PUBLIC_KEY !== '') {
    require_once __DIR__ . '/webpush_lib.php';
    sendWebPushToAll($level, $subject);
}

// ── 8. Return success ──────────────────────────────────────────────────────

$url = $folderPath . ($htmlFilename ?? 'index.html');
$launchPath = $recordId ? ('open_upload.php?id=' . $recordId) : $url;

echo json_encode([
    'ok'        => true,
    'url'       => $url,
    'launch_path' => $launchPath,
    'edit'      => $isEdit,
    'slug'      => $slug,
    'record_id' => $recordId,
    'owner_key' => $ownerKey,
]);
