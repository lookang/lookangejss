<?php
/**
 * Copy this file to config.php after creating the MySQL database in cPanel.
 * Keep config.php private and do not commit real passwords.
 */
return [
    'db_host'      => 'localhost',
    'db_name'      => 'CPANELUSER_leitner',
    'db_user'      => 'CPANELUSER_leitneruser',
    'db_pass'      => 'CHANGE_ME',
    'session_name' => 'LEITNER_MATHS_SESSION',
    // Password reset emails
    // site_url is now optional — the reset link is auto-detected from the request domain,
    // so it works from both iwant2study.org and iwant2study.moe.edu.sg without any change here.
    // Only set this as a fallback if HTTP_HOST is unavailable (rare CLI/cron scenarios).
    // 'site_url'  => 'https://iwant2study.org/lookangejss/math/AI/julietLeitnerSystemApp',
    'from_email'   => 'noreply@iwant2study.org',
    'from_name'    => 'Leitner Maths Arena',
];
