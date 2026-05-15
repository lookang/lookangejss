<?php
/**
 * push_subscribe.php — Store / remove Web Push subscriptions.
 *
 * POST JSON body:
 *   { "action": "subscribe",   "endpoint": "...", "p256dh": "...", "auth": "...",
 *     "level": "all|primary|secondary|jc", "subjs": ["sciences","mathematics",...] }
 *   { "action": "unsubscribe", "endpoint": "..." }
 *
 * ── SQL: run once in phpMyAdmin ──────────────────────────────────────────
 *
 * CREATE TABLE IF NOT EXISTS push_subscriptions (
 *   id         INT AUTO_INCREMENT PRIMARY KEY,
 *   endpoint   TEXT        NOT NULL,
 *   p256dh     VARCHAR(512) NOT NULL,
 *   auth_key   VARCHAR(255) NOT NULL,
 *   level_pref VARCHAR(20)  NOT NULL DEFAULT 'all',
 *   subj_prefs VARCHAR(500) NOT NULL DEFAULT '',
 *   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   UNIQUE KEY uq_ep (endpoint(255))
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 * ─────────────────────────────────────────────────────────────────────────
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['ok' => false]); exit; }

require_once __DIR__ . '/db_config.php';

$body   = json_decode(file_get_contents('php://input'), true) ?: [];
$action = trim($body['action'] ?? '');

try {
    $pdo = getDB();

    // ── Subscribe ──────────────────────────────────────────────────────────
    if ($action === 'subscribe') {
        $endpoint = trim($body['endpoint'] ?? '');
        $p256dh   = trim($body['p256dh']   ?? '');
        $auth     = trim($body['auth']      ?? '');
        $level    = trim($body['level']     ?? 'all');
        $subjs    = implode(',', array_filter(array_map('trim', (array)($body['subjs'] ?? []))));

        if (!$endpoint || !$p256dh || !$auth) {
            echo json_encode(['ok' => false, 'error' => 'Missing required subscription fields']);
            exit;
        }

        $validLevels = ['all', 'primary', 'secondary', 'jc'];
        if (!in_array($level, $validLevels, true)) $level = 'all';

        $pdo->prepare('
            INSERT INTO push_subscriptions (endpoint, p256dh, auth_key, level_pref, subj_prefs)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                p256dh     = VALUES(p256dh),
                auth_key   = VALUES(auth_key),
                level_pref = VALUES(level_pref),
                subj_prefs = VALUES(subj_prefs)
        ')->execute([$endpoint, $p256dh, $auth, $level, $subjs]);

        echo json_encode(['ok' => true]);

    // ── Unsubscribe ────────────────────────────────────────────────────────
    } elseif ($action === 'unsubscribe') {
        $endpoint = trim($body['endpoint'] ?? '');
        if ($endpoint) {
            $pdo->prepare('DELETE FROM push_subscriptions WHERE endpoint = ?')
                ->execute([$endpoint]);
        }
        echo json_encode(['ok' => true]);

    } else {
        echo json_encode(['ok' => false, 'error' => 'Unknown action']);
    }

} catch (PDOException $e) {
    error_log('push_subscribe.php: ' . $e->getMessage());
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
