<?php
require __DIR__ . '/bootstrap.php';
ensure_reset_tokens_table();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
$in          = input_json();
$rawToken    = (string)($in['token']       ?? '');
$newPassword = (string)($in['newPassword'] ?? '');

if ($rawToken === '')    json_error('Reset token is missing.');
if (strlen($newPassword) < 6) json_error('Password must be at least 6 characters.');

$tokenHash = hash('sha256', $rawToken);

// First check if token exists at all (regardless of expiry/used)
$stmtAny = db()->prepare('SELECT *, expires_at > NOW() AS still_valid, used_at IS NOT NULL AS already_used FROM password_reset_tokens WHERE token_hash = ? LIMIT 1');
$stmtAny->execute([$tokenHash]);
$any = $stmtAny->fetch();

if (!$any) {
    json_error('Reset link not recognised. Please request a new one.');
}
if ($any['already_used']) {
    json_error('This reset link has already been used. Please request a new one if you need to reset again.');
}
if (!$any['still_valid']) {
    json_error('This reset link has expired (links are valid for 1 hour). Please request a new one.');
}

// Fetch with user join for the valid token
$stmt = db()->prepare(
    'SELECT prt.*, u.id AS uid, u.display_name, u.username
     FROM password_reset_tokens prt
     JOIN users u ON u.id = prt.user_id
     WHERE prt.token_hash = ? AND prt.used_at IS NULL AND prt.expires_at > NOW()
     LIMIT 1'
);
$stmt->execute([$tokenHash]);
$row = $stmt->fetch();
if (!$row) json_error('Reset link validation failed. Please request a new one.');

// Update password and mark token used
db()->beginTransaction();
db()->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
    ->execute([password_hash($newPassword, PASSWORD_DEFAULT), (int)$row['uid']]);
db()->prepare('UPDATE password_reset_tokens SET used_at = NOW() WHERE token_hash = ?')
    ->execute([$tokenHash]);
log_auth_event('password_reset', (int)$row['uid'], $row['display_name'], $row['username']);
db()->commit();

json_ok(['message' => 'Password updated successfully. You can now sign in.']);
