<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
ensure_auth_events_table();
ensure_user_account_columns();
$in = input_json();

$displayName = trim((string)($in['displayName'] ?? $in['name'] ?? ''));
$username = strtolower(trim((string)($in['username'] ?? '')));
$email = strtolower(trim((string)($in['email'] ?? '')));
$password = (string)($in['password'] ?? '');
$joinCode = strtoupper(trim((string)($in['classCode'] ?? '')));

if ($displayName === '' || mb_strlen($displayName) > 120) json_error('Display name is required');
if (!preg_match('/^[a-z0-9_.-]{3,80}$/', $username)) json_error('Username must be 3-80 characters: letters, numbers, dot, dash, underscore');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) json_error('Email address is not valid');
if (strlen($password) < 6) json_error('Password must be at least 6 characters');

$classId = null;
if ($joinCode !== '') {
    $stmt = db()->prepare('SELECT id FROM classes WHERE join_code = ?');
    $stmt->execute([$joinCode]);
    $class = $stmt->fetch();
    if (!$class) json_error('Class code not found');
    $classId = (int)$class['id'];
}

$isTeacherDomain = $email !== '' && is_teacher_email($email);
$role = $isTeacherDomain ? 'pending_teacher' : 'student';

try {
    db()->beginTransaction();
    $stmt = db()->prepare('INSERT INTO users (username, email, display_name, password_hash, role, class_id, teacher_domain_approved) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$username, $email !== '' ? $email : null, $displayName, password_hash($password, PASSWORD_DEFAULT), $role, $classId, $isTeacherDomain ? 1 : 0]);
    $userId = (int)db()->lastInsertId();
    $stmt = db()->prepare('INSERT INTO game_profiles (user_id, today_date) VALUES (?, CURDATE())');
    $stmt->execute([$userId]);
    log_auth_event('account_created', $userId, $displayName, $username, $joinCode);
    if ($isTeacherDomain) {
        log_auth_event('teacher_pending', $userId, $displayName, $username, $joinCode);
    }
    db()->commit();
} catch (PDOException $e) {
    if (db()->inTransaction()) db()->rollBack();
    if ($e->getCode() === '23000') json_error('Username already exists');
    throw $e;
}

session_regenerate_id(true);
$_SESSION['user_id'] = $userId;
json_ok(['user' => public_user(load_user($userId))]);
