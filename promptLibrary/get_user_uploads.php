<?php
/**
 * get_user_uploads.php
 *
 * Returns a JSON array of simulations belonging to the authenticated user.
 * Used by the library section to show Edit buttons on the user's own uploads.
 *
 * POST get_user_uploads.php  body: id_token=...
 *
 * Response:
 * [
 *   {
 *     "id": 1,
 *     "user_email": "...",
 *     "user_name": "...",
 *     "title": "...",
 *     "slug": "...",
 *     "subject": "...",
 *     "level": "...",
 *     "description": "...",
 *     "folder_path": "01users/u-1a2b3c4d5e6f7a8b9c0d/slug/",
 *     "html_filename": "index.html",
 *     "prompt_filename": "prompt.txt",
 *     "created_at": "...",
 *     "updated_at": "..."
 *   },
 *   ...
 * ]
 */

declare(strict_types=1);

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

require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/upload_storage.php';

function jsonError(string $msg, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

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

// Accept token from POST only so it is not exposed in URLs or web logs.
$idToken = trim($_POST['id_token'] ?? '');
if ($idToken === '') {
    jsonError('Missing id_token', 401);
}

try {
    $payload = verifyGoogleToken($idToken);
} catch (RuntimeException $e) {
    jsonError($e->getMessage(), 401);
}

if (($payload['aud'] ?? '') !== GOOGLE_CLIENT_ID) {
    jsonError('Token audience mismatch', 401);
}

$email = strtolower(trim($payload['email'] ?? ''));
if ($email === '') {
    jsonError('No email in token', 401);
}

$emailDomain = substr($email, strrpos($email, '@') + 1);
if (!in_array($emailDomain, ALLOWED_DOMAINS, true)) {
    jsonError('Not an MOE account', 403);
}

try {
    $pdo  = getDB();
    $stmt = $pdo->prepare('
        SELECT id, user_email, user_name, title, slug, subject, level, description,
               folder_path, html_filename, prompt_filename, created_at, updated_at
        FROM simulations
        WHERE user_email = :email
        ORDER BY updated_at DESC
    ');
    $stmt->execute([':email' => $email]);
    $rows = $stmt->fetchAll();
} catch (PDOException $e) {
    error_log('get_user_uploads.php DB error: ' . $e->getMessage());
    jsonError('Database error', 500);
}

$rows = array_map(
    static fn(array $row): array => migrateSimulationStorage($pdo, $row),
    $rows
);

echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
