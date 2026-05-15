<?php
require __DIR__ . '/bootstrap.php';

ensure_user_account_columns();
$teacher = require_teacher_or_admin();

$studentId = isset($_GET['studentId']) ? (int)$_GET['studentId'] : 0;
$params = [];
$where = "WHERE u.role = 'student'";
if ($teacher['role'] !== 'admin') {
    if (empty($teacher['class_id'])) json_ok([
        'classSummary' => [
            'studentCount' => 0,
            'activeToday' => 0,
            'totalXp' => 0,
            'avgAccuracy' => 0,
            'completedGoal' => 0,
        ],
        'students' => [],
        'selectedStudent' => null,
    ]);
    $where .= ' AND u.class_id = ?';
    $params[] = (int)$teacher['class_id'];
}

$sql = "SELECT
          u.id, u.username, u.email, u.display_name, u.last_login_at,
          c.name AS class_name, c.join_code,
          COALESCE(gp.xp, 0) AS xp,
          COALESCE(gp.league_name, 'Bronze') AS league_name,
          COALESCE(gp.streak, 0) AS streak,
          COALESCE(gp.best_streak, 0) AS best_streak,
          COALESCE(gp.daily_goal, 20) AS daily_goal,
          gp.last_active_date,
          gp.today_date,
          COALESCE(gp.today_cards, 0) AS today_cards,
          COALESCE(gp.today_correct, 0) AS today_correct,
          COALESCE(gp.today_xp, 0) AS today_xp,
          COALESCE(cp.total_cards, 0) AS total_cards,
          COALESCE(cp.pack_a, 0) AS pack_a,
          COALESCE(cp.pack_b, 0) AS pack_b,
          COALESCE(cp.pack_c, 0) AS pack_c,
          COALESCE(cp.addition_cards, 0) AS addition_cards,
          COALESCE(cp.subtraction_cards, 0) AS subtraction_cards,
          COALESCE(cp.multiplication_cards, 0) AS multiplication_cards,
          COALESCE(cp.division_cards, 0) AS division_cards
        FROM users u
        LEFT JOIN classes c ON c.id = u.class_id
        LEFT JOIN game_profiles gp ON gp.user_id = u.id
        LEFT JOIN (
          SELECT user_id,
            COUNT(*) AS total_cards,
            SUM(pack = 'A') AS pack_a,
            SUM(pack = 'B') AS pack_b,
            SUM(pack = 'C') AS pack_c,
            SUM(topic = 'addition') AS addition_cards,
            SUM(topic = 'subtraction') AS subtraction_cards,
            SUM(topic = 'multiplication') AS multiplication_cards,
            SUM(topic = 'division') AS division_cards
          FROM card_progress
          GROUP BY user_id
        ) cp ON cp.user_id = u.id
        $where
        ORDER BY xp DESC, streak DESC, u.display_name, u.username
        LIMIT 300";
$stmt = db()->prepare($sql);
$stmt->execute($params);

$today = date('Y-m-d');
$students = [];
$selected = null;
$summary = [
    'studentCount' => 0,
    'activeToday' => 0,
    'totalXp' => 0,
    'avgAccuracy' => 0,
    'completedGoal' => 0,
];
$accuracyTotal = 0;
$accuracyRows = 0;

foreach ($stmt->fetchAll() as $i => $row) {
    $todayCards = (int)$row['today_cards'];
    $todayCorrect = (int)$row['today_correct'];
    $dailyGoal = max(1, (int)$row['daily_goal']);
    $accuracy = $todayCards > 0 ? (int)round(($todayCorrect / $todayCards) * 100) : 0;
    $mastery = (int)$row['total_cards'] > 0 ? (int)round(((int)$row['pack_c'] / (int)$row['total_cards']) * 100) : 0;
    $student = [
        'rank' => $i + 1,
        'id' => (int)$row['id'],
        'username' => $row['username'],
        'email' => $row['email'],
        'displayName' => $row['display_name'],
        'className' => $row['class_name'],
        'classCode' => $row['join_code'],
        'lastLoginAt' => $row['last_login_at'],
        'xp' => (int)$row['xp'],
        'league' => $row['league_name'],
        'streak' => (int)$row['streak'],
        'bestStreak' => (int)$row['best_streak'],
        'lastActiveDate' => $row['last_active_date'],
        'today' => [
            'date' => $row['today_date'],
            'cards' => $todayCards,
            'correct' => $todayCorrect,
            'xp' => (int)$row['today_xp'],
            'goal' => $dailyGoal,
            'goalPct' => min(100, (int)round(($todayCards / $dailyGoal) * 100)),
            'accuracy' => $accuracy,
        ],
        'packs' => [
            'A' => (int)$row['pack_a'],
            'B' => (int)$row['pack_b'],
            'C' => (int)$row['pack_c'],
            'total' => (int)$row['total_cards'],
            'masteryPct' => $mastery,
        ],
        'topics' => [
            'addition' => (int)$row['addition_cards'],
            'subtraction' => (int)$row['subtraction_cards'],
            'multiplication' => (int)$row['multiplication_cards'],
            'division' => (int)$row['division_cards'],
        ],
    ];
    $students[] = $student;
    if ($studentId > 0 && $student['id'] === $studentId) $selected = $student;

    $summary['studentCount']++;
    $summary['totalXp'] += $student['xp'];
    if ($row['today_date'] === $today && $todayCards > 0) $summary['activeToday']++;
    if ($todayCards >= $dailyGoal) $summary['completedGoal']++;
    if ($todayCards > 0) {
        $accuracyTotal += $accuracy;
        $accuracyRows++;
    }
}

$summary['avgAccuracy'] = $accuracyRows > 0 ? (int)round($accuracyTotal / $accuracyRows) : 0;
if (!$selected && count($students) > 0) $selected = $students[0];

json_ok([
    'classSummary' => $summary,
    'students' => $students,
    'selectedStudent' => $selected,
]);
