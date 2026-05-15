<?php
require __DIR__ . '/bootstrap.php';
ensure_reset_tokens_table();
ensure_user_account_columns();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('POST required', 405);
$in         = input_json();
$identifier = strtolower(trim((string)($in['identifier'] ?? '')));

if ($identifier === '') json_error('Please enter your email or username.');

// Find user by email or username
if (str_contains($identifier, '@')) {
    $stmt = db()->prepare('SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1');
    $stmt->execute([$identifier, $identifier]);
} else {
    $stmt = db()->prepare('SELECT * FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$identifier]);
}
$user = $stmt->fetch();

// Always return success — never reveal whether the account exists
if (!$user || !($user['email'] ?? '')) {
    json_ok(['message' => 'If an account with that email exists, a reset link has been sent.']);
}

// Delete any existing unused tokens for this user
db()->prepare('DELETE FROM password_reset_tokens WHERE user_id = ? AND used_at IS NULL')->execute([(int)$user['id']]);

// Generate token — use MySQL NOW() for expiry to avoid PHP/MySQL timezone mismatch
$token     = bin2hex(random_bytes(32));   // 64-char hex, URL-safe
$tokenHash = hash('sha256', $token);

db()->prepare('INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))')
    ->execute([(int)$user['id'], $tokenHash]);

// Build reset link — detect domain dynamically so the link works from either entry point
//   e.g. https://iwant2study.org/…  or  https://iwant2study.moe.edu.sg/…
global $config;
$scheme    = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host      = $_SERVER['HTTP_HOST'] ?? parse_url($config['site_url'] ?? '', PHP_URL_HOST) ?? 'iwant2study.org';
// SCRIPT_NAME is  /…/julietLeitnerSystemApp/api/forgot-password.php
// dirname twice  →  /…/julietLeitnerSystemApp
$appPath   = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/api/forgot-password.php')), '/');
$siteUrl   = $scheme . '://' . $host . $appPath;
$resetLink = $siteUrl . '/reset-password.html?token=' . urlencode($token);
$name      = htmlspecialchars($user['display_name'] ?? $user['username']);
$fromEmail = $config['from_email'] ?? 'noreply@iwant2study.org';
$fromName  = $config['from_name']  ?? 'Leitner Maths Arena';

$subject = 'Reset your Leitner Maths password';
$body    = "Hi {$name},\r\n\r\n"
         . "Someone requested a password reset for your Leitner Maths account.\r\n\r\n"
         . "Click the link below to set a new password (valid for 1 hour):\r\n"
         . "{$resetLink}\r\n\r\n"
         . "If you did not request this, you can safely ignore this email.\r\n\r\n"
         . "— {$fromName}";

$headers  = "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$fromEmail}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

@mail($user['email'], $subject, $body, $headers);

json_ok(['message' => 'If an account with that email exists, a reset link has been sent.']);
