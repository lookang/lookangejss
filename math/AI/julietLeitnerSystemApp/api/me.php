<?php
require __DIR__ . '/bootstrap.php';

$id = current_user_id();
if (!$id) json_ok(['user' => null]);
$user = load_user($id);
json_ok(['user' => $user ? public_user($user) : null]);
