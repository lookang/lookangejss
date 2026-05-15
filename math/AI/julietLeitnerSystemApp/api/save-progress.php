<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
$userId = require_user_id();
$in = input_json();

$profile = is_array($in['profile'] ?? null) ? $in['profile'] : [];
$today = is_array($profile['today'] ?? null) ? $profile['today'] : [];
$cards = is_array($in['cards'] ?? null) ? $in['cards'] : [];
$achievements = is_array($in['achievements'] ?? null) ? $in['achievements'] : [];
$records = $in['records'] ?? [];

db()->beginTransaction();
try {
    $stmt = db()->prepare(
        'INSERT INTO game_profiles
        (user_id, xp, league_name, streak, best_streak, daily_goal, last_active_date, today_date, today_cards, today_correct, today_xp, badges_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        xp=VALUES(xp), league_name=VALUES(league_name), streak=VALUES(streak), best_streak=VALUES(best_streak),
        daily_goal=VALUES(daily_goal), last_active_date=VALUES(last_active_date), today_date=VALUES(today_date),
        today_cards=VALUES(today_cards), today_correct=VALUES(today_correct), today_xp=VALUES(today_xp), badges_json=VALUES(badges_json)'
    );
    $stmt->execute([
        $userId,
        (int)($profile['xp'] ?? 0),
        (string)($profile['league'] ?? 'Bronze'),
        (int)($profile['streak'] ?? 0),
        (int)($profile['bestStreak'] ?? 0),
        (int)($profile['dailyGoal'] ?? 20),
        ($profile['lastActiveDate'] ?? null) ?: null,
        ($today['date'] ?? null) ?: null,
        (int)($today['cards'] ?? 0),
        (int)($today['correct'] ?? 0),
        (int)($today['xp'] ?? 0),
        json_encode($profile['badges'] ?? []),
    ]);

    $cardStmt = db()->prepare(
        'INSERT INTO card_progress
        (user_id, card_id, topic, milestone, pack, hint_level, attempts_json, common_errors_json, last_reviewed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        topic=VALUES(topic), milestone=VALUES(milestone), pack=VALUES(pack), hint_level=VALUES(hint_level),
        attempts_json=VALUES(attempts_json), common_errors_json=VALUES(common_errors_json), last_reviewed=VALUES(last_reviewed)'
    );
    foreach ($cards as $card) {
        if (!is_array($card) || empty($card['id'])) continue;
        $cardStmt->execute([
            $userId,
            (string)$card['id'],
            (string)($card['topic'] ?? ''),
            (int)($card['milestone'] ?? 0),
            (string)($card['pack'] ?? 'A'),
            (int)($card['hintLevel'] ?? 3),
            json_encode($card['attempts'] ?? []),
            json_encode($card['commonErrors'] ?? []),
            ($card['lastReviewed'] ?? null) ? date('Y-m-d H:i:s', strtotime((string)$card['lastReviewed'])) : null,
        ]);
    }

    db()->prepare('DELETE FROM achievements WHERE user_id = ?')->execute([$userId]);
    $achStmt = db()->prepare('INSERT INTO achievements (user_id, milestone, achieved_date) VALUES (?, ?, ?)');
    foreach ($achievements as $milestone => $date) {
        if (!$date) continue;
        $achStmt->execute([$userId, (int)$milestone, (string)$date]);
    }

    $stmt = db()->prepare('INSERT INTO records_json (user_id, records) VALUES (?, ?) ON DUPLICATE KEY UPDATE records=VALUES(records)');
    $stmt->execute([$userId, json_encode($records)]);

    db()->commit();
    json_ok(['savedCards' => count($cards)]);
} catch (Throwable $e) {
    if (db()->inTransaction()) db()->rollBack();
    throw $e;
}
