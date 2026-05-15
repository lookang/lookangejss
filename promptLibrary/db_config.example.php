<?php
/**
 * Example database, Google OAuth, and web push configuration.
 *
 * Copy this file to db_config.php on the server and fill in real values there.
 * Keep db_config.php out of Git because it contains deployment credentials.
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
define('DB_NAME', 'your_database_name');
define('DB_CHARSET', 'utf8mb4');

define('GOOGLE_CLIENT_ID', 'your-google-oauth-client-id.apps.googleusercontent.com');

define('ALLOWED_DOMAINS', ['moe.edu.sg', 'moe.gov.sg']);

// Leave blank to disable browser push notifications.
define('VAPID_PUBLIC_KEY', '');
define('VAPID_PRIVATE_KEY', '');
define('VAPID_SUBJECT', 'mailto:admin@example.com');

function getDB(): PDO
{
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}
