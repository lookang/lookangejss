<?php
require __DIR__ . '/bootstrap.php';

$userId = current_user_id();
$classOnly = isset($_GET['class']) && $_GET['class'] === '1';

$where = '';
$params = [];
if ($classOnly && $userId) {
    $user = load_user($userId);
    if ($user && $user['class_id']) {
        $where = 'WHERE u.class_id = ?';
        $params[] = (int)$user['class_id'];
    }
}

$sql = "SELECT u.id, u.display_name, gp.xp, gp.league_name, gp.streak
        FROM game_profiles gp
        JOIN users u ON u.id = gp.user_id
        $where
        ORDER BY gp.xp DESC, gp.streak DESC
        LIMIT 20";
$stmt = db()->prepare($sql);
$stmt->execute($params);

$rows = [];
foreach ($stmt->fetchAll() as $i => $row) {
    $rows[] = [
        'rank' => $i + 1,
        'id' => (int)$row['id'],
        'name' => $row['display_name'],
        'xp' => (int)$row['xp'],
        'league' => $row['league_name'],
        'streak' => (int)$row['streak'],
        'me' => $userId && (int)$row['id'] === $userId,
    ];
}

json_ok(['leaders' => $rows]);
