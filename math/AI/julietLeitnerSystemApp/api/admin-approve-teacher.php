<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
ensure_user_account_columns();
ensure_auth_events_table();

$admin = require_teacher_or_admin();
if ($admin['role'] !== 'admin') json_error('Admin login required', 403);

$in = input_json();
$teacherId = (int)($in['teacherId'] ?? 0);
if ($teacherId <= 0) json_error('Select a pending teacher first');

$stmt = db()->prepare("SELECT id, username, display_name, email, role FROM users WHERE id = ?");
$stmt->execute([$teacherId]);
$teacher = $stmt->fetch();
if (!$teacher) json_error('Teacher account not found', 404);
if ($teacher['role'] !== 'pending_teacher') json_error('This account is not pending teacher approval', 400);

$stmt = db()->prepare("UPDATE users SET role = 'teacher' WHERE id = ?");
$stmt->execute([$teacherId]);
log_auth_event('teacher_approved', $teacherId, $teacher['display_name'], $teacher['username'], null);

json_ok([
    'message' => 'Teacher approved: ' . $teacher['display_name'] . ' (@' . $teacher['username'] . ')',
]);
