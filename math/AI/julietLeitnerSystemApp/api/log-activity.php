<?php
require __DIR__ . '/bootstrap.php';
ensure_practice_events_table();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
$in = input_json();

$eventType = trim((string)($in['eventType'] ?? ''));
$topic     = trim((string)($in['topic']     ?? ''));
$correct   = isset($in['correct']) ? (int)$in['correct'] : null;
$total     = isset($in['total'])   ? (int)$in['total']   : null;

$allowed = ['session_complete', 'milestone_achieved', 'card_mastered'];
if (!in_array($eventType, $allowed, true)) json_error('Unknown event type.');

// Optionally attach class_id from the current session user
$classId = null;
$userId  = current_user_id();
if ($userId) {
    $row = db()->prepare('SELECT class_id FROM users WHERE id = ?');
    $row->execute([$userId]);
    $u = $row->fetch();
    $classId = $u ? ($u['class_id'] ?: null) : null;
}

db()->prepare(
    'INSERT INTO practice_events (event_type, topic, correct, total, class_id) VALUES (?, ?, ?, ?, ?)'
)->execute([$eventType, $topic ?: null, $correct, $total, $classId]);

json_ok();
