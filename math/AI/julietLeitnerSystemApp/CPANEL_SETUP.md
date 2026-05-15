# cPanel Setup - Leitner Maths Arena Backend

This backend is designed for normal cPanel hosting using PHP and MySQL/MariaDB. It does not require Node.js.

## 1. Create The Database

1. Log in to cPanel: `https://svr115.phsserver.net:2083/`
2. Open **MySQL Databases**.
3. Create a database, for example:
   - `YOURCPANELUSER_leitner`
4. Create a database user, for example:
   - `YOURCPANELUSER_leitneruser`
5. Set a strong password.
6. Add the user to the database.
7. Grant **ALL PRIVILEGES**.

The actual names usually get prefixed by your cPanel account name.

## 2. Import The Tables

1. Open **phpMyAdmin** from cPanel.
2. Select the new database.
3. Click **Import**.
4. Upload `api/schema.sql`.
5. Click **Go**.

This creates:

- `classes`
- `users`
- `game_profiles`
- `card_progress`
- `achievements`
- `records_json`
- `attempts`

It also creates a demo class code:

```text
DEMO2026
```

## 3. Create api/config.php

In the app folder, copy:

```text
api/config.example.php
```

to:

```text
api/config.php
```

Then edit the values:

```php
<?php
return [
    'db_host' => 'localhost',
    'db_name' => 'YOURCPANELUSER_leitner',
    'db_user' => 'YOURCPANELUSER_leitneruser',
    'db_pass' => 'YOUR_DATABASE_PASSWORD',
    'session_name' => 'LEITNER_MATHS_SESSION',
];
```

Do not put real passwords into `config.example.php`.

## 4. Upload Files

Upload the full app folder to:

```text
public_html/lookangejss/math/AI/julietLeitnerSystemApp/
```

Make sure the `api/` folder is uploaded too.

Required new files:

- `backend-client.js`
- `api/bootstrap.php`
- `api/config.php`
- `api/login.php`
- `api/logout.php`
- `api/me.php`
- `api/register.php`
- `api/save-progress.php`
- `api/load-progress.php`
- `api/leaderboard.php`
- `api/users-debug.php`
- `api/auth-feed.php`
- `api/teacher-students.php`
- `api/teacher-reset-password.php`
- `api/admin-pending-teachers.php`
- `api/admin-approve-teacher.php`
- `api/upgrade_auth_events.sql`
- `api/schema.sql`

## 5. Test The API

Open this in the browser:

```text
https://iwant2study.org/lookangejss/math/AI/julietLeitnerSystemApp/api/me.php
```

Expected response before login:

```json
{"ok":true,"user":null}
```

If you see a missing config message, `api/config.php` is not in place yet.

If you see a database connection error, check the database name, username, password, and privileges.

## 6. Test Cloud Login In The App

1. Open:

```text
https://iwant2study.org/lookangejss/math/AI/julietLeitnerSystemApp/
```

2. Click **Player Login**.
3. Enter:
   - Player name
   - Cloud username
   - Password
   - Class code: `DEMO2026`
4. Click **Create Account**.
5. Practice some cards.
6. Progress should save to MySQL after practice.

## 7. Recommended Production Settings

- Use HTTPS only.
- Keep `api/config.php` private.
- Use class codes for student signup.
- Do not enable open chat.
- Use teacher-created classes before public competition.
- Back up the MySQL database from cPanel regularly.

## 8. What Is Implemented Now

- Student account creation.
- Student login/logout.
- PHP session authentication.
- MySQL storage for profile, XP, league, streak, card progress, achievements, and records.
- Class leaderboard endpoint.
- Temporary user debug list endpoint and home-page panel for checking account creation/login.
- Teacher/admin password reset panel.
- Teacher-domain account detection for `moe.edu.sg`, `schools.gov.sg`, and `moe.gov.sg`.
- Local browser fallback remains active if the backend is not configured.

## 9. Next Backend Improvements

- Teacher account creation.
- Teacher dashboard.
- Password reset.
- CSV student import.
- Attempt-level analytics dashboard.
- Admin page for managing classes and join codes.

## 10. Account Activity Feed

During setup, the home page includes an **Account Activity Feed** below the credit line. It calls:

```text
api/auth-feed.php
```

This shows social-style notices such as:

- Juliet @juliet01 created a new account for class DEMO2026.
- Juliet @juliet01 logged in.
- Failed login attempt for @juliet01.

If you already imported the old schema, import this extra file in phpMyAdmin:

```text
api/upgrade_auth_events.sql
```

Use this feed only while testing. Before using real student data, protect this endpoint behind teacher/admin login or remove it.

## 11. Teacher Accounts And Manual Password Reset

Cloud account creation now includes an email field.

If the email ends with one of these domains:

```text
@moe.edu.sg
@schools.gov.sg
@moe.gov.sg
```

the account is created as:

```text
pending_teacher
```

This is safer than immediately granting teacher permissions. An admin must approve the account before it becomes:

```text
teacher
```

During setup, you can make your own account admin in phpMyAdmin:

```sql
UPDATE users
SET role = 'admin'
WHERE username = 'YOUR_USERNAME';
```

Then sign in through the app and use the **Teacher Tools** panel below the footer:

- Approve pending teacher accounts.
- Select a student.
- Enter a temporary password.
- Reset the selected student's password.

Security rules:

- Only `teacher` and `admin` can reset passwords.
- Teachers can reset only students in their own class.
- Admin can reset any student.
- Old passwords are never shown because they are stored as password hashes.
