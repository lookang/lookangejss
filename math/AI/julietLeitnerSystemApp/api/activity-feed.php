<?php
require __DIR__ . '/bootstrap.php';
ensure_practice_events_table();
ensure_auth_events_table();

// ── Online now: distinct users active in last 15 min + anonymous sessions ──
$onlineStmt = db()->prepare(
    "SELECT COUNT(DISTINCT COALESCE(user_id, ip_hash)) AS cnt
     FROM auth_events
     WHERE event_type IN ('login','account_created') AND created_at >= NOW() - INTERVAL 15 MINUTE"
);
$onlineStmt->execute();
$onlineRow = $onlineStmt->fetch();
// Add recent practice activity (may include non-logged-in users)
$practiceOnlineStmt = db()->prepare(
    "SELECT COUNT(*) AS cnt FROM practice_events WHERE created_at >= NOW() - INTERVAL 15 MINUTE"
);
$practiceOnlineStmt->execute();
$practiceOnlineRow = $practiceOnlineStmt->fetch();
$onlineNow = max(1, (int)($onlineRow['cnt'] ?? 0) + (int)($practiceOnlineRow['cnt'] ?? 0));

// ── Practice events (last 40, last 24h) ──
$practiceStmt = db()->prepare(
    "SELECT event_type, topic, correct, total, created_at
     FROM practice_events
     WHERE created_at >= NOW() - INTERVAL 24 HOUR
     ORDER BY created_at DESC LIMIT 40"
);
$practiceStmt->execute();
$practiceRows = $practiceStmt->fetchAll();

// ── Auth events (last 24h, join/login only) ──
$authStmt = db()->prepare(
    "SELECT event_type, created_at
     FROM auth_events
     WHERE event_type IN ('account_created','login') AND created_at >= NOW() - INTERVAL 24 HOUR
     ORDER BY created_at DESC LIMIT 20"
);
$authStmt->execute();
$authRows = $authStmt->fetchAll();

// ── Merge and sort by created_at DESC ──
$events = [];

$topicLabel = [
    'addition'       => 'Addition',
    'subtraction'    => 'Subtraction',
    'multiplication' => 'Multiplication',
    'division'       => 'Division',
    'wordproblems'   => 'Word Problems',
];

foreach ($practiceRows as $r) {
    $t = strtotime($r['created_at']);
    $topic = $topicLabel[$r['topic']] ?? ucfirst($r['topic'] ?? 'Maths');
    $minAgo = max(0, (int)round((time() - $t) / 60));

    if ($r['event_type'] === 'session_complete') {
        $pct = ($r['total'] > 0) ? round($r['correct'] / $r['total'] * 100) : 0;
        $icon = $pct >= 80 ? '⭐' : '📖';
        $text = "A student completed {$r['total']} {$topic} cards";
        if ($r['correct'] !== null) $text .= " ({$pct}% correct)";
    } elseif ($r['event_type'] === 'milestone_achieved') {
        $icon = '🏆';
        $text = "A student unlocked a {$topic} milestone";
    } elseif ($r['event_type'] === 'card_mastered') {
        $icon = '✅';
        $text = "A student mastered a {$topic} card";
    } else {
        continue;
    }

    $events[] = ['icon' => $icon, 'text' => $text, 'minutesAgo' => $minAgo, 'ts' => $t];
}

foreach ($authRows as $r) {
    $t = strtotime($r['created_at']);
    $minAgo = max(0, (int)round((time() - $t) / 60));
    if ($r['event_type'] === 'account_created') {
        $events[] = ['icon' => '🎉', 'text' => 'A new student joined the arena', 'minutesAgo' => $minAgo, 'ts' => $t];
    } elseif ($r['event_type'] === 'login') {
        $events[] = ['icon' => '🔑', 'text' => 'A student signed in to practise', 'minutesAgo' => $minAgo, 'ts' => $t];
    }
}

// Sort merged list newest first
usort($events, fn($a, $b) => $b['ts'] - $a['ts']);
$events = array_slice($events, 0, 30);

// Remove internal 'ts' key before sending
$events = array_map(function($e) {
    unset($e['ts']);
    return $e;
}, $events);

json_ok(['events' => $events, 'onlineNow' => $onlineNow]);
