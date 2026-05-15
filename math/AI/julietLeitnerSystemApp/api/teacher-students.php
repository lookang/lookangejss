<?php
require __DIR__ . '/bootstrap.php';

ensure_user_account_columns();
$teacher = require_teacher_or_admin();

$params = [];
$where = "WHERE u.role = 'student'";
if ($teacher['role'] !== 'admin') {
    if (empty($teacher['class_id'])) json_ok(['students' => []]);
    $where .= ' AND u.class_id = ?';
    $params[] = (int)$teacher['class_id'];
}

$stmt = db()->prepare(
    "SELECT u.id, u.username, u.email, u.display_name, u.role, u.last_login_at, c.name AS class_name, c.join_code
     FROM users u
     LEFT JOIN classes c ON c.id = u.class_id
     $where
     ORDER BY u.display_name, u.username
     LIMIT 200"
);
$stmt->execute($params);

$students = [];
foreach ($stmt->fetchAll() as $row) {
    $students[] = [
        'id' => (int)$row['id'],
        'username' => $row['username'],
        'email' => $row['email'],
        'displayName' => $row['display_name'],
        'role' => $row['role'],
        'className' => $row['class_name'],
        'classCode' => $row['join_code'],
        'lastLoginAt' => $row['last_login_at'],
    ];
}

json_ok(['students' => $students]);
