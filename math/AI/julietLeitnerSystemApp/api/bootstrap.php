<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

set_exception_handler(function (Throwable $e): void {
    http_response_code(500);
    error_log('Leitner API fatal: ' . $e->getMessage());
    echo json_encode([
        'ok' => false,
        'error' => 'Server error: ' . $e->getMessage(),
    ]);
    exit;
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Missing api/config.php. Copy config.example.php to config.php and add your cPanel MySQL credentials.'
    ]);
    exit;
}

$config = require $configPath;
session_name($config['session_name'] ?? 'LEITNER_MATHS_SESSION');
session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 14,
    'path' => '/',
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function db(): PDO {
    static $pdo = null;
    global $config;
    if ($pdo instanceof PDO) return $pdo;
    $dsn = 'mysql:host=' . $config['db_host'] . ';dbname=' . $config['db_name'] . ';charset=utf8mb4';
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function input_json(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') return [];
    $data = json_decode($raw, true);
    if (!is_array($data)) json_error('Invalid JSON body', 400);
    return $data;
}

function json_ok(array $data = []): void {
    echo json_encode(['ok' => true] + $data);
    exit;
}

function json_error(string $message, int $status = 400): void {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function current_user_id(): ?int {
    return isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;
}

function require_user_id(): int {
    $id = current_user_id();
    if (!$id) json_error('Login required', 401);
    return $id;
}

function public_user(array $row): array {
    return [
        'id' => (int)$row['id'],
        'username' => $row['username'],
        'email' => $row['email'] ?? null,
        'displayName' => $row['display_name'],
        'role' => $row['role'],
        'classId' => isset($row['class_id']) ? (int)$row['class_id'] : null,
    ];
}

function load_user(int $id): ?array {
    ensure_user_account_columns();
    $stmt = db()->prepare('SELECT id, username, email, display_name, role, class_id FROM users WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function log_auth_event(string $eventType, ?int $userId, ?string $displayName, ?string $username, ?string $classCode = null): void {
    try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '';
        $agent = substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);
        $ipHash = $ip !== '' ? hash('sha256', $ip) : null;
        $stmt = db()->prepare(
            'INSERT INTO auth_events (user_id, event_type, display_name, username, class_code, ip_hash, user_agent)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$userId, $eventType, $displayName, $username, $classCode ?: null, $ipHash, $agent]);
    } catch (Throwable $e) {
        error_log('auth event failed: ' . $e->getMessage());
    }
}

function ensure_auth_events_table(): void {
    db()->exec(
        "CREATE TABLE IF NOT EXISTS auth_events (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NULL,
          event_type ENUM('account_created','login','logout','login_failed','password_reset','teacher_pending','teacher_approved') NOT NULL,
          display_name VARCHAR(120) NULL,
          username VARCHAR(80) NULL,
          class_code VARCHAR(24) NULL,
          ip_hash CHAR(64) NULL,
          user_agent VARCHAR(255) NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_auth_events_created (created_at),
          INDEX idx_auth_events_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    try {
        db()->exec("ALTER TABLE auth_events MODIFY event_type ENUM('account_created','login','logout','login_failed','password_reset','teacher_pending','teacher_approved') NOT NULL");
    } catch (Throwable $e) {
        error_log('auth event enum upgrade skipped: ' . $e->getMessage());
    }
}

function add_column_if_missing(string $table, string $column, string $definition): void {
    $stmt = db()->prepare(
        'SELECT COUNT(*) AS found
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?'
    );
    $stmt->execute([$table, $column]);
    $row = $stmt->fetch();
    if ((int)($row['found'] ?? 0) === 0) {
        db()->exec("ALTER TABLE `$table` ADD COLUMN $definition");
    }
}

function ensure_user_account_columns(): void {
    add_column_if_missing('users', 'email', 'email VARCHAR(190) NULL UNIQUE AFTER username');
    add_column_if_missing('users', 'email_verified_at', 'email_verified_at DATETIME NULL AFTER class_id');
    add_column_if_missing('users', 'teacher_domain_approved', 'teacher_domain_approved TINYINT(1) NOT NULL DEFAULT 0 AFTER email_verified_at');
    try {
        db()->exec("ALTER TABLE users MODIFY role ENUM('student','pending_teacher','teacher','parent','admin') NOT NULL DEFAULT 'student'");
    } catch (Throwable $e) {
        error_log('role enum upgrade skipped: ' . $e->getMessage());
    }
}

function ensure_teacher_actions_table(): void {
    db()->exec(
        "CREATE TABLE IF NOT EXISTS teacher_actions (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          teacher_id INT NOT NULL,
          student_id INT NOT NULL,
          action_type VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_teacher_actions_teacher (teacher_id),
          INDEX idx_teacher_actions_student (student_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function is_teacher_email(string $email): bool {
    $email = strtolower(trim($email));
    foreach (['@moe.edu.sg', '@schools.gov.sg', '@moe.gov.sg'] as $domain) {
        if (substr($email, -strlen($domain)) === $domain) return true;
    }
    return false;
}

function ensure_practice_events_table(): void {
    db()->exec(
        "CREATE TABLE IF NOT EXISTS practice_events (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          event_type VARCHAR(50) NOT NULL,
          topic VARCHAR(50) NULL,
          correct INT NULL,
          total INT NULL,
          class_id INT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_pe_created (created_at),
          INDEX idx_pe_class (class_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function ensure_reset_tokens_table(): void {
    db()->exec(
        "CREATE TABLE IF NOT EXISTS password_reset_tokens (
          id BIGINT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          token_hash CHAR(64) NOT NULL,
          expires_at DATETIME NOT NULL,
          used_at DATETIME NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_prt_token (token_hash),
          INDEX idx_prt_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function require_teacher_or_admin(): array {
    $id = require_user_id();
    $user = load_user($id);
    if (!$user || !in_array($user['role'], ['teacher', 'admin'], true)) {
        json_error('Teacher or admin login required', 403);
    }
    return $user;
}
