<?php
declare(strict_types=1);

require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/upload_storage.php';

function respondNotFound(string $message = 'Interactive not found'): void
{
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo $message;
    exit;
}

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($id <= 0) {
    respondNotFound('Missing upload id');
}

try {
    $pdo = getDB();
    $stmt = $pdo->prepare(
        'SELECT id, user_email, user_name, title, slug, folder_path, html_filename
           FROM simulations
          WHERE id = :id
          LIMIT 1'
    );
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();
} catch (PDOException $e) {
    error_log('open_upload.php DB error: ' . $e->getMessage());
    respondNotFound('Could not load this interactive right now');
}

if (!$row) {
    respondNotFound();
}

$row = migrateSimulationStorage($pdo, $row);
$title = trim((string) ($row['title'] ?? 'Interactive'));
$folderPath = rtrim((string) ($row['folder_path'] ?? ''), '/');
$htmlFile = trim((string) ($row['html_filename'] ?? 'index.html'));
$relativeSrc = ltrim($folderPath . '/' . $htmlFile, '/');
$absoluteSrc = uploadAbsolutePath($relativeSrc);

$uploadsRoot = realpath(__DIR__ . '/01users');
$resolvedSrc = realpath($absoluteSrc);
if (
    !$uploadsRoot ||
    !$resolvedSrc ||
    strpos($resolvedSrc, $uploadsRoot) !== 0 ||
    !is_file($resolvedSrc)
) {
    respondNotFound();
}

$safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
$safeSrc = htmlspecialchars($relativeSrc, ENT_QUOTES, 'UTF-8');

header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $safeTitle ?> | Sandbox Viewer</title>
    <style>
        :root {
            color-scheme: light;
            --bg: #f4f7fb;
            --panel: #ffffff;
            --text: #1f2933;
            --muted: #52606d;
            --line: #d9e2ec;
            --accent: #1d4ed8;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(180deg, #eef4ff 0%, var(--bg) 100%);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 14px 18px;
            border-bottom: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
        }

        .title-wrap {
            min-width: 0;
        }

        h1 {
            margin: 0;
            font-size: 1rem;
            line-height: 1.3;
        }

        .note {
            margin-top: 4px;
            color: var(--muted);
            font-size: 0.88rem;
        }

        .back-link {
            color: var(--accent);
            text-decoration: none;
            font-weight: 600;
            white-space: nowrap;
        }

        .frame-wrap {
            flex: 1;
            padding: 16px;
        }

        iframe {
            width: 100%;
            height: calc(100vh - 110px);
            border: 1px solid var(--line);
            border-radius: 14px;
            background: var(--panel);
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
        }

        @media (max-width: 700px) {
            .topbar {
                align-items: flex-start;
                flex-direction: column;
            }

            iframe {
                height: calc(100vh - 150px);
            }
        }
    </style>
</head>
<body>
    <div class="topbar">
        <div class="title-wrap">
            <h1><?= $safeTitle ?></h1>
            <div class="note">Opened in a sandboxed viewer to reduce the risk from uploaded scripts.</div>
        </div>
        <a class="back-link" href="ai-prompt-library.html">Back to library</a>
    </div>
    <div class="frame-wrap">
        <iframe
            src="<?= $safeSrc ?>"
            title="<?= $safeTitle ?>"
            loading="eager"
            referrerpolicy="no-referrer"
            sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-scripts">
        </iframe>
    </div>
</body>
</html>
