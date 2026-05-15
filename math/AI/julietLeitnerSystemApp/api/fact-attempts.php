<?php
require __DIR__ . '/bootstrap.php';

$teacher = require_teacher_or_admin();

$studentId = isset($_GET['studentId']) ? (int)$_GET['studentId'] : 0;
if ($studentId <= 0) json_error('studentId is required', 400);

// Load the requested student
$stmt = db()->prepare(
    'SELECT u.id, u.username, u.display_name, u.class_id
       FROM users u WHERE u.id = ?'
);
$stmt->execute([$studentId]);
$student = $stmt->fetch();
if (!$student) json_error('Student not found', 404);

// Non-admin teachers may only see students in their own class
if ($teacher['role'] !== 'admin') {
    if (empty($teacher['class_id']) || (int)$student['class_id'] !== (int)$teacher['class_id']) {
        json_error('Access denied: student is not in your class', 403);
    }
}

// Fetch all card_progress rows for this student
$stmt = db()->prepare(
    'SELECT card_id, topic, milestone, pack, hint_level, attempts_json, common_errors_json, last_reviewed
       FROM card_progress WHERE user_id = ? ORDER BY topic, card_id'
);
$stmt->execute([$studentId]);
$rows = $stmt->fetchAll();

$facts = [];
foreach ($rows as $row) {
    $attemptsArr = json_decode($row['attempts_json'] ?? '[]', true);
    if (!is_array($attemptsArr)) $attemptsArr = [];

    $totalAttempts = count($attemptsArr);
    $correctCount  = 0;
    foreach ($attemptsArr as $a) {
        if (!empty($a['correct'])) $correctCount++;
    }
    $accuracy = $totalAttempts > 0 ? (int)round(($correctCount / $totalAttempts) * 100) : null;

    // Parse and sort common errors by count descending
    $errorsRaw = json_decode($row['common_errors_json'] ?? '{}', true);
    if (!is_array($errorsRaw)) $errorsRaw = [];
    arsort($errorsRaw);
    $commonErrors = [];
    foreach ($errorsRaw as $answer => $count) {
        $commonErrors[] = ['answer' => (string)$answer, 'count' => (int)$count];
    }

    $facts[] = [
        'cardId'       => $row['card_id'],
        'topic'        => $row['topic'],
        'milestone'    => $row['milestone'],
        'pack'         => $row['pack'],
        'hintLevel'    => (int)$row['hint_level'],
        'attempts'     => $totalAttempts,
        'correct'      => $correctCount,
        'accuracy'     => $accuracy,
        'commonErrors' => $commonErrors,
        'lastReviewed' => $row['last_reviewed'],
    ];
}

json_ok([
    'studentId'   => (int)$studentId,
    'displayName' => $student['display_name'],
    'username'    => $student['username'],
    'facts'       => $facts,
]);
