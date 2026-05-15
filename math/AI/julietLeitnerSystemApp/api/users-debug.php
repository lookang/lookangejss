<?php
require __DIR__ . '/bootstrap.php';

/**
 * Temporary debug endpoint for setup testing.
 * Remove or protect this endpoint before using real student data.
 */
ensure_user_account_columns();
$stmt = db()->query(
    "SELECT
      u.id, u.username, u.email, u.display_name, u.role, u.created_at, u.last_login_at,
      c.name AS class_name, c.join_code,
      COALESCE(gp.xp, 0) AS xp,
      COALESCE(gp.league_name, 'Bronze') AS league_name,
      COALESCE(gp.streak, 0) AS streak,
      COALESCE(gp.today_cards, 0) AS today_cards
    FROM users u
    LEFT JOIN classes c ON c.id = u.class_id
    LEFT JOIN game_profiles gp ON gp.user_id = u.id
    ORDER BY u.created_at DESC
    LIMIT 50"
);

$users = [];
foreach ($stmt->fetchAll() as $row) {
    $users[] = [
        'id' => (int)$row['id'],
        'username' => $row['username'],
        'email' => $row['email'],
        'displayName' => $row['display_name'],
        'role' => $row['role'],
        'className' => $row['class_name'],
        'classCode' => $row['join_code'],
        'createdAt' => $row['created_at'],
        'lastLoginAt' => $row['last_login_at'],
        'xp' => (int)$row['xp'],
        'league' => $row['league_name'],
        'streak' => (int)$row['streak'],
        'todayCards' => (int)$row['today_cards'],
    ];
}

json_ok(['users' => $users]);
