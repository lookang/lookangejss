<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
ensure_user_account_columns();
ensure_teacher_actions_table();
ensure_auth_events_table();

$teacher = require_teacher_or_admin();
$in = input_json();
$studentId = (int)($in['studentId'] ?? 0);
$newPassword = (string)($in['newPassword'] ?? '');

if ($studentId <= 0) json_error('Select a student first');
if (strlen($newPassword) < 6) json_error('New password must be at least 6 characters');

$stmt = db()->prepare('SELECT id, username, display_name, role, class_id FROM users WHERE id = ?');
$stmt->execute([$studentId]);
$student = $stmt->fetch();
if (!$student) json_error('Student not found', 404);
if ($student['role'] !== 'student') json_error('Only student passwords can be reset here', 403);
if ($teacher['role'] !== 'admin' && (int)$student['class_id'] !== (int)$teacher['class_id']) {
    json_error('You can only reset students in your own class', 403);
}

db()->beginTransaction();
try {
    $stmt = db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
    $stmt->execute([password_hash($newPassword, PASSWORD_DEFAULT), $studentId]);

    $stmt = db()->prepare('INSERT INTO teacher_actions (teacher_id, student_id, action_type) VALUES (?, ?, ?)');
    $stmt->execute([(int)$teacher['id'], $studentId, 'password_reset']);

    log_auth_event('password_reset', $studentId, $student['display_name'], $student['username'], null);
    db()->commit();
} catch (Throwable $e) {
    if (db()->inTransaction()) db()->rollBack();
    throw $e;
}

json_ok([
    'message' => 'Password reset for ' . $student['display_name'] . ' (@' . $student['username'] . ')',
    'student' => [
        'id' => (int)$student['id'],
        'username' => $student['username'],
        'displayName' => $student['display_name'],
    ],
]);
