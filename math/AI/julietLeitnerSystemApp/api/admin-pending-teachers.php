<?php
require __DIR__ . '/bootstrap.php';

ensure_user_account_columns();
$admin = require_teacher_or_admin();
if ($admin['role'] !== 'admin') json_error('Admin login required', 403);

$stmt = db()->query(
    "SELECT id, username, email, display_name, role, created_at
     FROM users
     WHERE role = 'pending_teacher'
     ORDER BY created_at DESC
     LIMIT 100"
);

$teachers = [];
foreach ($stmt->fetchAll() as $row) {
    $teachers[] = [
        'id' => (int)$row['id'],
        'username' => $row['username'],
        'email' => $row['email'],
        'displayName' => $row['display_name'],
        'role' => $row['role'],
        'createdAt' => $row['created_at'],
    ];
}

json_ok(['teachers' => $teachers]);
