<?php
/**
 * leaderboard.php — Top contributors + weekly usage analytics.
 *
 * GET ?action=leaderboard
 *      → [{user_name, upload_count, subjects, email_hint}, ...]
 *
 * GET ?action=analytics
 *      → {total_views, total_downloads, new_uploads, top_viewed[], top_downloaded[], by_subject[]}
 *
 * No authentication required — public read-only stats.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: public, max-age=120');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/db_config.php';

$action = trim($_GET['action'] ?? 'leaderboard');

try {
    $pdo = getDB();

    // ── Analytics ──────────────────────────────────────────────────────────
    if ($action === 'analytics') {
        $views     = (int)$pdo->query(
            "SELECT COUNT(*) FROM activity_log
              WHERE event_type='view' AND created_at > NOW() - INTERVAL 7 DAY"
        )->fetchColumn();

        $downloads = (int)$pdo->query(
            "SELECT COUNT(*) FROM activity_log
              WHERE event_type='download' AND created_at > NOW() - INTERVAL 7 DAY"
        )->fetchColumn();

        $newUploads = (int)$pdo->query(
            "SELECT COUNT(*) FROM simulations WHERE updated_at > NOW() - INTERVAL 7 DAY"
        )->fetchColumn();

        $topViewed = $pdo->query(
            "SELECT resource_title AS title, resource_slug AS slug, COUNT(*) AS cnt
               FROM activity_log
              WHERE event_type='view'
                AND created_at > NOW() - INTERVAL 7 DAY
                AND resource_slug IS NOT NULL AND resource_slug != ''
              GROUP BY resource_slug, resource_title
              ORDER BY cnt DESC LIMIT 8"
        )->fetchAll();

        $topDownloaded = $pdo->query(
            "SELECT resource_title AS title, resource_slug AS slug, COUNT(*) AS cnt
               FROM activity_log
              WHERE event_type='download'
                AND created_at > NOW() - INTERVAL 7 DAY
                AND resource_slug IS NOT NULL AND resource_slug != ''
              GROUP BY resource_slug, resource_title
              ORDER BY cnt DESC LIMIT 8"
        )->fetchAll();

        $bySubject = $pdo->query(
            "SELECT subject, COUNT(*) AS cnt
               FROM simulations
              WHERE subject IS NOT NULL AND subject != ''
              GROUP BY subject ORDER BY cnt DESC LIMIT 10"
        )->fetchAll();

        echo json_encode([
            'total_views'     => $views,
            'total_downloads' => $downloads,
            'new_uploads'     => $newUploads,
            'top_viewed'      => array_map(fn($r) => ['title' => $r['title'], 'slug' => $r['slug'], 'cnt' => (int)$r['cnt']], $topViewed),
            'top_downloaded'  => array_map(fn($r) => ['title' => $r['title'], 'slug' => $r['slug'], 'cnt' => (int)$r['cnt']], $topDownloaded),
            'by_subject'      => array_map(fn($r) => ['subject' => $r['subject'], 'cnt' => (int)$r['cnt']], $bySubject),
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── Leaderboard (default) ──────────────────────────────────────────────
    $rows = $pdo->query(
        "SELECT user_name, user_email,
                COUNT(*) AS upload_count,
                GROUP_CONCAT(DISTINCT subject ORDER BY subject SEPARATOR ', ') AS subjects,
                MAX(updated_at) AS last_upload
           FROM simulations
          WHERE user_email IS NOT NULL AND user_email != ''
          GROUP BY user_email, user_name
          ORDER BY upload_count DESC, last_upload DESC
          LIMIT 20"
    )->fetchAll();

    $result = array_map(function ($r) {
        $email    = $r['user_email'] ?? '';
        $atPos    = strrpos($email, '@');
        $hint     = $atPos !== false
                  ? substr($email, 0, min(3, $atPos)) . '***@' . substr($email, $atPos + 1)
                  : '';
        return [
            'user_name'    => $r['user_name'] ?: 'MOE Teacher',
            'upload_count' => (int)$r['upload_count'],
            'subjects'     => $r['subjects'] ?? '',
            'email_hint'   => $hint,
            'last_upload'  => $r['last_upload'] ?? null,
        ];
    }, $rows);

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
    error_log('leaderboard.php: ' . $e->getMessage());
    echo json_encode([]);
}
