<?php
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
ensure_auth_events_table();
ensure_user_account_columns();
$in = input_json();
$identifier = strtolower(trim((string)($in['username'] ?? '')));
$password   = (string)($in['password'] ?? '');

// Accept username or email — if @ present, check both email and username columns
if (str_contains($identifier, '@')) {
    $stmt = db()->prepare('SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1');
    $stmt->execute([$identifier, $identifier]);
} else {
    $stmt = db()->prepare('SELECT * FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$identifier]);
}
$user = $stmt->fetch();
if (!$user || !password_verify($password, $user['password_hash'])) {
    log_auth_event('login_failed', null, null, $identifier, null);
    json_error('Invalid username or password', 401);
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int)$user['id'];
db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([(int)$user['id']]);
log_auth_event('login', (int)$user['id'], $user['display_name'], $user['username'], null);

json_ok(['user' => public_user($user)]);
