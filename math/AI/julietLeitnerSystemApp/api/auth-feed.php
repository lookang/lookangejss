<?php
require __DIR__ . '/bootstrap.php';
ensure_auth_events_table();

/**
 * Temporary social-style auth feed for setup testing.
 * Protect or remove before using real student data.
 */
$stmt = db()->query(
    "SELECT id, event_type, display_name, username, class_code, created_at
     FROM auth_events
     ORDER BY created_at DESC, id DESC
     LIMIT 40"
);

$events = [];
foreach ($stmt->fetchAll() as $row) {
    $events[] = [
        'id' => (int)$row['id'],
        'type' => $row['event_type'],
        'displayName' => $row['display_name'],
        'username' => $row['username'],
        'classCode' => $row['class_code'],
        'createdAt' => $row['created_at'],
    ];
}

json_ok(['events' => $events]);
