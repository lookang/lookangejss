<?php
require __DIR__ . '/bootstrap.php';
ensure_auth_events_table();

$userId = current_user_id();
if ($userId) {
    $user = load_user($userId);
    log_auth_event('logout', $userId, $user['display_name'] ?? null, $user['username'] ?? null, null);
}

$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
}
session_destroy();
json_ok();
