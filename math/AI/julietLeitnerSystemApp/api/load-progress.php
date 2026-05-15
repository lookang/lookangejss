<?php
require __DIR__ . '/bootstrap.php';

$userId = require_user_id();

$profileStmt = db()->prepare('SELECT * FROM game_profiles WHERE user_id = ?');
$profileStmt->execute([$userId]);
$p = $profileStmt->fetch() ?: [];

$cardsStmt = db()->prepare('SELECT * FROM card_progress WHERE user_id = ?');
$cardsStmt->execute([$userId]);
$cards = [];
foreach ($cardsStmt->fetchAll() as $row) {
    $cards[] = [
        'id' => $row['card_id'],
        'topic' => $row['topic'],
        'milestone' => (int)$row['milestone'],
        'pack' => $row['pack'],
        'hintLevel' => (int)$row['hint_level'],
        'attempts' => json_decode((string)($row['attempts_json'] ?? '[]'), true) ?: [],
        'commonErrors' => json_decode((string)($row['common_errors_json'] ?? '{}'), true) ?: [],
        'lastReviewed' => $row['last_reviewed'],
    ];
}

$achStmt = db()->prepare('SELECT milestone, achieved_date FROM achievements WHERE user_id = ?');
$achStmt->execute([$userId]);
$achievements = [];
foreach ($achStmt->fetchAll() as $row) {
    $achievements[(string)$row['milestone']] = $row['achieved_date'];
}

$recStmt = db()->prepare('SELECT records FROM records_json WHERE user_id = ?');
$recStmt->execute([$userId]);
$recordsRow = $recStmt->fetch();

json_ok([
    'profile' => [
        'xp' => (int)($p['xp'] ?? 0),
        'league' => $p['league_name'] ?? 'Bronze',
        'streak' => (int)($p['streak'] ?? 0),
        'bestStreak' => (int)($p['best_streak'] ?? 0),
        'dailyGoal' => (int)($p['daily_goal'] ?? 20),
        'lastActiveDate' => $p['last_active_date'] ?? null,
        'today' => [
            'date' => $p['today_date'] ?? null,
            'cards' => (int)($p['today_cards'] ?? 0),
            'correct' => (int)($p['today_correct'] ?? 0),
            'xp' => (int)($p['today_xp'] ?? 0),
        ],
        'badges' => json_decode((string)($p['badges_json'] ?? '[]'), true) ?: [],
    ],
    'cards' => $cards,
    'achievements' => $achievements,
    'records' => $recordsRow ? (json_decode((string)$recordsRow['records'], true) ?: []) : [],
]);
