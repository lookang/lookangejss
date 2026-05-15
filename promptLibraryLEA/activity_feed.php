<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../promptLibrary/db_config.php';

const LEA_ANON_LABELS = [
    'A curious teacher',
    'A thoughtful educator',
    'A reflective mentor',
    'A creative lesson designer',
    'A practical classroom coach',
    'A generous sharer',
    'A student-centered teacher',
    'A collaborative educator',
    'A careful planner',
    'A question-driven teacher',
    'A supportive facilitator',
    'A learning innovator',
];

function jsonResponse(array $payload): void
{
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function sanitizeToken(string $token): string
{
    return substr(preg_replace('/[^a-f0-9]/', '', strtolower($token)), 0, 32);
}

function clipText(string $value, int $maxLength): string
{
    $value = trim((string)preg_replace('/\s+/', ' ', $value));
    if ($value === '') {
        return '';
    }

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }

    return substr($value, 0, $maxLength);
}

function relTime(string $dateTime): string
{
    $diff = max(0, time() - (int)strtotime($dateTime));

    if ($diff < 90) {
        return 'just now';
    }
    if ($diff < 3600) {
        return (int)floor($diff / 60) . ' min ago';
    }
    if ($diff < 86400) {
        return (int)floor($diff / 3600) . ' hr ago';
    }

    return (int)floor($diff / 86400) . 'd ago';
}

function anonLabel(string $token): string
{
    if ($token === '') {
        return LEA_ANON_LABELS[array_rand(LEA_ANON_LABELS)];
    }

    $index = abs(crc32($token)) % count(LEA_ANON_LABELS);
    return LEA_ANON_LABELS[$index];
}

function ensureTables(PDO $pdo): void
{
    static $ready = false;

    if ($ready) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS lea_page_pings (
            session_token CHAR(32) PRIMARY KEY,
            last_ping DATETIME NOT NULL,
            INDEX idx_ping (last_ping)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS lea_activity_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            session_token CHAR(32) DEFAULT NULL,
            event_type ENUM('view', 'sample', 'generate', 'copy', 'download') NOT NULL,
            resource_slug VARCHAR(120) DEFAULT '',
            resource_title VARCHAR(120) DEFAULT '',
            anon_label VARCHAR(80) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_created (created_at),
            INDEX idx_type_created (event_type, created_at),
            INDEX idx_session_created (session_token, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );

    $ready = true;
}

function touchPresence(PDO $pdo, string $token): void
{
    if (strlen($token) !== 32) {
        return;
    }

    $pdo->prepare(
        'INSERT INTO lea_page_pings (session_token, last_ping) VALUES (?, NOW())
         ON DUPLICATE KEY UPDATE last_ping = NOW()'
    )->execute([$token]);
}

function fetchStats(PDO $pdo): array
{
    $row = $pdo->query(
        "SELECT
            COALESCE(SUM(event_type = 'sample'), 0) AS sample_count,
            COALESCE(SUM(event_type = 'generate'), 0) AS generate_count,
            COALESCE(SUM(event_type = 'copy'), 0) AS copy_count,
            COALESCE(SUM(event_type = 'download'), 0) AS download_count,
            COUNT(DISTINCT CASE
                WHEN session_token IS NOT NULL AND session_token <> '' THEN session_token
                ELSE NULL
            END) AS active_users
         FROM lea_activity_log
         WHERE created_at > NOW() - INTERVAL 1 DAY"
    )->fetch(PDO::FETCH_ASSOC) ?: [];

    return [
        'sample' => (int)($row['sample_count'] ?? 0),
        'generate' => (int)($row['generate_count'] ?? 0),
        'copy' => (int)($row['copy_count'] ?? 0),
        'download' => (int)($row['download_count'] ?? 0),
        'activeUsers' => (int)($row['active_users'] ?? 0),
    ];
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $method === 'POST' ? trim((string)($_POST['action'] ?? 'ping')) : 'feed';

try {
    $pdo = getDB();
    ensureTables($pdo);
} catch (Throwable $e) {
    error_log('promptLibraryLEA activity_feed init: ' . $e->getMessage());

    if ($method === 'POST') {
        jsonResponse(['ok' => false]);
    }

    jsonResponse([
        'online' => 0,
        'recent' => [],
        'stats' => [
            'sample' => 0,
            'generate' => 0,
            'copy' => 0,
            'download' => 0,
            'activeUsers' => 0,
        ],
    ]);
}

if ($action === 'ping') {
    $token = sanitizeToken((string)($_POST['token'] ?? ''));

    try {
        touchPresence($pdo, $token);
        $pdo->exec("DELETE FROM lea_page_pings WHERE last_ping < NOW() - INTERVAL 2 DAY");
    } catch (Throwable $e) {
        error_log('promptLibraryLEA activity_feed ping: ' . $e->getMessage());
    }

    jsonResponse(['ok' => true]);
}

if ($action === 'log') {
    $token = sanitizeToken((string)($_POST['token'] ?? ''));
    $type = (string)($_POST['type'] ?? 'view');
    $allowedTypes = ['view', 'sample', 'generate', 'copy', 'download'];
    if (!in_array($type, $allowedTypes, true)) {
        $type = 'view';
    }

    $slug = clipText((string)($_POST['slug'] ?? ''), 120);
    $title = clipText((string)($_POST['title'] ?? ''), 120);
    $label = anonLabel($token);

    try {
        touchPresence($pdo, $token);
        $pdo->prepare(
            'INSERT INTO lea_activity_log (session_token, event_type, resource_slug, resource_title, anon_label)
             VALUES (?, ?, ?, ?, ?)'
        )->execute([
            strlen($token) === 32 ? $token : null,
            $type,
            $slug,
            $title,
            $label,
        ]);
    } catch (Throwable $e) {
        error_log('promptLibraryLEA activity_feed log: ' . $e->getMessage());
    }

    jsonResponse(['ok' => true]);
}

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

try {
    $pdo->exec("DELETE FROM lea_page_pings WHERE last_ping < NOW() - INTERVAL 2 DAY");

    $online = (int)$pdo->query(
        "SELECT COUNT(*)
         FROM lea_page_pings
         WHERE last_ping > NOW() - INTERVAL 5 MINUTE"
    )->fetchColumn();

    $rows = $pdo->query(
        "SELECT id, event_type, resource_slug, resource_title, anon_label, created_at
         FROM lea_activity_log
         WHERE created_at > NOW() - INTERVAL 90 MINUTE
         ORDER BY created_at DESC
         LIMIT 18"
    )->fetchAll(PDO::FETCH_ASSOC);

    $recent = array_map(static function (array $row): array {
        return [
            'id' => (int)($row['id'] ?? 0),
            'type' => (string)($row['event_type'] ?? 'view'),
            'slug' => (string)($row['resource_slug'] ?? ''),
            'title' => (string)($row['resource_title'] ?? ''),
            'label' => (string)($row['anon_label'] ?? 'An educator'),
            'when' => relTime((string)($row['created_at'] ?? 'now')),
        ];
    }, $rows);

    jsonResponse([
        'online' => $online,
        'recent' => $recent,
        'stats' => fetchStats($pdo),
    ]);
} catch (Throwable $e) {
    error_log('promptLibraryLEA activity_feed feed: ' . $e->getMessage());
    jsonResponse([
        'online' => 0,
        'recent' => [],
        'stats' => [
            'sample' => 0,
            'generate' => 0,
            'copy' => 0,
            'download' => 0,
            'activeUsers' => 0,
        ],
    ]);
}
