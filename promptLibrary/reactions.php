<?php
/**
 * reactions.php — Emoji reactions + star ratings per simulation.
 *
 * GET  ?action=bulk&slugs=s1,s2,...
 *      → {"slug":{"👍":N,"😮":N,"🔥":N,"avg_rating":F,"rating_count":N}, ...}
 *
 * GET  ?action=mine&token=X&slugs=s1,s2,...
 *      → {"slug":{"reactions":["👍"],"rating":4|null}, ...}
 *
 * POST action=react   token slug emoji   → toggle reaction on/off
 * POST action=rate    token slug rating  → upsert 1-5 star rating
 *
 * ── SQL: run once in phpMyAdmin ───────────────────────────────────────────
 *
 * CREATE TABLE IF NOT EXISTS sim_reactions (
 *   id            INT AUTO_INCREMENT PRIMARY KEY,
 *   resource_slug VARCHAR(255) NOT NULL,
 *   session_token CHAR(32)     NOT NULL,
 *   emoji         VARCHAR(20)  NOT NULL,
 *   created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   UNIQUE KEY uq_token_slug_emoji (session_token, resource_slug, emoji),
 *   INDEX idx_slug (resource_slug)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 *
 * CREATE TABLE IF NOT EXISTS sim_ratings (
 *   id            INT AUTO_INCREMENT PRIMARY KEY,
 *   resource_slug VARCHAR(255) NOT NULL,
 *   session_token CHAR(32)     NOT NULL,
 *   rating        TINYINT      NOT NULL,
 *   created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
 *   UNIQUE KEY uq_token_slug (session_token, resource_slug),
 *   INDEX idx_slug (resource_slug)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 * ─────────────────────────────────────────────────────────────────────────
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/db_config.php';

// ── Helpers ────────────────────────────────────────────────────────────────

function sanitizeToken(string $t): string
{
    return substr(preg_replace('/[^a-f0-9]/', '', strtolower($t)), 0, 32);
}

function parseSlugs(string $raw): array
{
    return array_slice(
        array_filter(array_map('trim', explode(',', $raw)), fn($s) => strlen($s) > 0 && strlen($s) <= 255),
        0, 60
    );
}

const ALLOWED_EMOJIS = ['👍', '😮', '🔥'];

// ── Route ──────────────────────────────────────────────────────────────────

try {
    $pdo    = getDB();
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $method === 'POST'
            ? (trim($_POST['action'] ?? '') ?: 'react')
            : ($_GET['action'] ?? 'bulk');

    // ── POST: toggle reaction ──────────────────────────────────────────────
    if ($action === 'react') {
        $token = sanitizeToken($_POST['token'] ?? '');
        $slug  = substr(trim($_POST['slug']  ?? ''), 0, 255);
        $emoji = trim($_POST['emoji'] ?? '');

        if (strlen($token) !== 32 || !$slug || !in_array($emoji, ALLOWED_EMOJIS, true)) {
            echo json_encode(['ok' => false, 'error' => 'Invalid input']);
            exit;
        }

        try {
            $pdo->prepare(
                'INSERT INTO sim_reactions (resource_slug, session_token, emoji) VALUES (?,?,?)'
            )->execute([$slug, $token, $emoji]);
            $toggled = 'added';
        } catch (PDOException) {
            // Duplicate key → toggle off
            $pdo->prepare(
                'DELETE FROM sim_reactions WHERE resource_slug=? AND session_token=? AND emoji=?'
            )->execute([$slug, $token, $emoji]);
            $toggled = 'removed';
        }

        // Return fresh count for this slug+emoji
        $cnt = (int)$pdo->prepare(
            'SELECT COUNT(*) FROM sim_reactions WHERE resource_slug=? AND emoji=?'
        )->execute([$slug, $emoji]) ? $pdo->query(
            "SELECT COUNT(*) FROM sim_reactions WHERE resource_slug=" . $pdo->quote($slug) .
            " AND emoji=" . $pdo->quote($emoji)
        )->fetchColumn() : 0;

        // Simpler count query
        $cntStmt = $pdo->prepare('SELECT COUNT(*) FROM sim_reactions WHERE resource_slug=? AND emoji=?');
        $cntStmt->execute([$slug, $emoji]);
        echo json_encode(['ok' => true, 'action' => $toggled, 'count' => (int)$cntStmt->fetchColumn()]);
        exit;
    }

    // ── POST: upsert rating ────────────────────────────────────────────────
    if ($action === 'rate') {
        $token  = sanitizeToken($_POST['token'] ?? '');
        $slug   = substr(trim($_POST['slug'] ?? ''), 0, 255);
        $rating = (int)($_POST['rating'] ?? 0);

        if (strlen($token) !== 32 || !$slug || $rating < 1 || $rating > 5) {
            echo json_encode(['ok' => false, 'error' => 'Invalid input']);
            exit;
        }

        $pdo->prepare(
            'INSERT INTO sim_ratings (resource_slug, session_token, rating) VALUES (?,?,?)
             ON DUPLICATE KEY UPDATE rating=VALUES(rating), created_at=NOW()'
        )->execute([$slug, $token, $rating]);

        $avgStmt = $pdo->prepare(
            'SELECT ROUND(AVG(rating),1) AS avg_r, COUNT(*) AS cnt FROM sim_ratings WHERE resource_slug=?'
        );
        $avgStmt->execute([$slug]);
        $row = $avgStmt->fetch();
        echo json_encode(['ok' => true, 'avg_rating' => (float)$row['avg_r'], 'rating_count' => (int)$row['cnt']]);
        exit;
    }

    // ── GET: mine — current user's own reactions/ratings ──────────────────
    if ($action === 'mine') {
        $token = sanitizeToken($_GET['token'] ?? '');
        $slugs = parseSlugs($_GET['slugs'] ?? '');

        if (strlen($token) !== 32 || empty($slugs)) { echo json_encode([]); exit; }

        $ph     = implode(',', array_fill(0, count($slugs), '?'));
        $params = array_merge([$token], $slugs);

        $rxStmt = $pdo->prepare(
            "SELECT resource_slug, emoji FROM sim_reactions WHERE session_token=? AND resource_slug IN ($ph)"
        );
        $rxStmt->execute($params);

        $rtStmt = $pdo->prepare(
            "SELECT resource_slug, rating FROM sim_ratings WHERE session_token=? AND resource_slug IN ($ph)"
        );
        $rtStmt->execute($params);

        $result = [];
        foreach ($slugs as $s) $result[$s] = ['reactions' => [], 'rating' => null];
        foreach ($rxStmt->fetchAll() as $r) $result[$r['resource_slug']]['reactions'][] = $r['emoji'];
        foreach ($rtStmt->fetchAll() as $r) $result[$r['resource_slug']]['rating'] = (int)$r['rating'];

        echo json_encode($result);
        exit;
    }

    // ── GET: bulk counts (default) ─────────────────────────────────────────
    $slugs = parseSlugs($_GET['slugs'] ?? '');
    if (empty($slugs)) { echo json_encode([]); exit; }

    $ph = implode(',', array_fill(0, count($slugs), '?'));

    $rxStmt = $pdo->prepare(
        "SELECT resource_slug, emoji, COUNT(*) AS cnt
           FROM sim_reactions WHERE resource_slug IN ($ph)
          GROUP BY resource_slug, emoji"
    );
    $rxStmt->execute($slugs);

    $rtStmt = $pdo->prepare(
        "SELECT resource_slug, ROUND(AVG(rating),1) AS avg_r, COUNT(*) AS cnt
           FROM sim_ratings WHERE resource_slug IN ($ph)
          GROUP BY resource_slug"
    );
    $rtStmt->execute($slugs);

    $result = [];
    foreach ($slugs as $s) $result[$s] = ['👍' => 0, '😮' => 0, '🔥' => 0, 'avg_rating' => null, 'rating_count' => 0];
    foreach ($rxStmt->fetchAll() as $r) $result[$r['resource_slug']][$r['emoji']] = (int)$r['cnt'];
    foreach ($rtStmt->fetchAll() as $r) {
        $result[$r['resource_slug']]['avg_rating']   = (float)$r['avg_r'];
        $result[$r['resource_slug']]['rating_count'] = (int)$r['cnt'];
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    error_log('reactions.php: ' . $e->getMessage());
    echo json_encode([]);
}
