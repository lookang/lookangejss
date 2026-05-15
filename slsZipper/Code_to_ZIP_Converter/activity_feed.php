<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../../promptLibrary/db_config.php';

function sanitizeZipperToken(string $token): string
{
    return substr(preg_replace('/[^a-f0-9]/', '', strtolower($token)), 0, 32);
}

function ensureZipperPresenceTable(PDO $pdo): void
{
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS zipper_page_pings (
            session_token CHAR(32) PRIMARY KEY,
            last_ping DATETIME NOT NULL,
            INDEX idx_zipper_ping (last_ping)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS zipper_activity_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            session_token CHAR(32) NOT NULL,
            event_type ENUM("view","generate","download") NOT NULL,
            resource_title VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_zipper_activity_created (created_at),
            INDEX idx_zipper_activity_token (session_token, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );
}

function zipperRelTime(string $dateTime): string
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

function zipperLocationLabel(string $token): string
{
    $places = ['Singapore', 'Malaysia', 'Indonesia', 'Brunei', 'Thailand', 'the Philippines', 'Vietnam'];
    return 'A user from ' . $places[abs(crc32($token)) % count($places)];
}

try {
    $pdo = getDB();
    ensureZipperPresenceTable($pdo);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $token = sanitizeZipperToken($_POST['token'] ?? '');
        $action = trim($_POST['action'] ?? 'ping');
        if (strlen($token) === 32) {
            $pdo->prepare(
                'INSERT INTO zipper_page_pings (session_token, last_ping) VALUES (?, NOW())
                 ON DUPLICATE KEY UPDATE last_ping = NOW()'
            )->execute([$token]);

            if ($action === 'log') {
                $type = in_array($_POST['type'] ?? '', ['view', 'generate', 'download'], true)
                    ? $_POST['type']
                    : 'view';
                $title = substr(trim($_POST['title'] ?? 'SLS Offline ZIP Packager'), 0, 255);
                $pdo->prepare(
                    'INSERT INTO zipper_activity_log (session_token, event_type, resource_title)
                     VALUES (?, ?, ?)'
                )->execute([$token, $type, $title]);
            }
        }
        echo json_encode(['ok' => true]);
        exit;
    }

    $online = max(
        1,
        (int)$pdo->query(
            'SELECT COUNT(*) FROM zipper_page_pings WHERE last_ping > NOW() - INTERVAL 5 MINUTE'
        )->fetchColumn()
    );

    $token = sanitizeZipperToken($_GET['token'] ?? '');
    $rows = $pdo->query(
        'SELECT id, session_token, event_type, resource_title, created_at
           FROM zipper_activity_log
          WHERE created_at > NOW() - INTERVAL 45 MINUTE
          ORDER BY created_at DESC
          LIMIT 20'
    )->fetchAll(PDO::FETCH_ASSOC);

    $events = array_map(static function (array $row) use ($token): array {
        return [
            'id' => (int)$row['id'],
            'type' => $row['event_type'],
            'label' => zipperLocationLabel($row['session_token']),
            'title' => $row['resource_title'],
            'when' => zipperRelTime($row['created_at']),
            'own' => $token !== '' && hash_equals($token, $row['session_token']),
        ];
    }, $rows);

    echo json_encode(['online' => $online, 'recent' => $events], JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    error_log('slsZipper activity_feed.php: ' . $e->getMessage());
    echo json_encode(['online' => 1, 'recent' => [], 'ok' => false]);
}
