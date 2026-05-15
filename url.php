<?php
declare(strict_types=1);

$rootDir = __DIR__;
$defaultLimit = 200;
$browseLimit = 400;

$blockedDirNames = array(
    '.git',
    '.claude',
    '__pycache__',
    'node_modules',
    'vendor',
);

$blockedFileNames = array(
    'url.php',
    'url_back.php',
    'chir_url.php',
    'chir_url_v2.php',
    'chir_url_instructions.txt',
    'chir_url_v2_instructions.txt',
);

$blockedExtensions = array(
    'php',
    'phtml',
    'phar',
    'cgi',
    'pl',
    'py',
    'pyc',
    'ps1',
    'bat',
    'cmd',
    'sh',
    'ini',
    'env',
    'log',
    'sql',
    'bak',
    'sqlite',
    'sqlite3',
    'htaccess',
);

function detectBaseUrl(): string
{
    $scheme = 'https';
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        $scheme = 'https';
    } elseif (!empty($_SERVER['REQUEST_SCHEME'])) {
        $scheme = (string) $_SERVER['REQUEST_SCHEME'];
    }

    $host = $_SERVER['HTTP_HOST'] ?? 'iwant2study.moe.edu.sg';
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '/lookangejss/url.php';
    $basePath = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');

    if ($basePath === '') {
        $basePath = '/lookangejss';
    }

    return $scheme . '://' . $host . $basePath . '/';
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function normalizeRelativePath(string $path): string
{
    $path = str_replace('\\', '/', trim($path));
    $parts = preg_split('~/+~', $path);
    $safeParts = array();

    foreach ($parts as $part) {
        if ($part === '' || $part === '.') {
            continue;
        }
        if ($part === '..') {
            continue;
        }
        $safeParts[] = $part;
    }

    return implode('/', $safeParts);
}

function isBlockedName(string $name, array $blockedFileNames, array $blockedDirNames): bool
{
    if ($name === '' || $name[0] === '.') {
        return true;
    }

    if (in_array($name, $blockedFileNames, true)) {
        return true;
    }

    if (in_array($name, $blockedDirNames, true)) {
        return true;
    }

    return false;
}

function isSafePublicFile(string $fileName, array $blockedFileNames, array $blockedExtensions): bool
{
    if ($fileName === '' || $fileName[0] === '.') {
        return false;
    }

    if (in_array($fileName, $blockedFileNames, true)) {
        return false;
    }

    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if ($extension !== '' && in_array($extension, $blockedExtensions, true)) {
        return false;
    }

    return true;
}

function formatSize(int $bytes): string
{
    $units = array('B', 'KB', 'MB', 'GB');
    $size = (float) $bytes;
    $unit = 0;

    while ($size >= 1024 && $unit < count($units) - 1) {
        $size /= 1024;
        $unit++;
    }

    return $unit === 0 ? (string) ((int) $size) . ' ' . $units[$unit] : number_format($size, 1) . ' ' . $units[$unit];
}

function formatTime(int $timestamp): string
{
    return date('Y-m-d H:i:s', $timestamp);
}

function buildPublicUrl(string $baseUrl, string $relativePath, bool $isDir): string
{
    $relativePath = str_replace('\\', '/', $relativePath);
    $segments = $relativePath === '' ? array() : explode('/', $relativePath);
    $encoded = array_map('rawurlencode', $segments);
    $url = $baseUrl . implode('/', $encoded);

    if ($isDir && $url !== '' && substr($url, -1) !== '/') {
        $url .= '/';
    }

    return $url;
}

function collectRecentItems(
    string $rootDir,
    string $baseUrl,
    array $blockedFileNames,
    array $blockedDirNames,
    array $blockedExtensions,
    int $limit
): array {
    $items = array();
    $flags = FilesystemIterator::SKIP_DOTS;
    $iterator = new RecursiveIteratorIterator(
        new RecursiveCallbackFilterIterator(
            new RecursiveDirectoryIterator($rootDir, $flags),
            function (SplFileInfo $current) use ($blockedFileNames, $blockedDirNames, $blockedExtensions): bool {
                $name = $current->getFilename();

                if ($current->isDir()) {
                    return !isBlockedName($name, $blockedFileNames, $blockedDirNames);
                }

                return isSafePublicFile($name, $blockedFileNames, $blockedExtensions);
            }
        ),
        RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($iterator as $info) {
        $fullPath = $info->getPathname();
        if ($fullPath === $rootDir) {
            continue;
        }

        $relativePath = str_replace('\\', '/', substr($fullPath, strlen($rootDir) + 1));
        $name = $info->getFilename();

        if ($info->isDir()) {
            $items[] = array(
                'name' => $name,
                'relative_path' => $relativePath,
                'type' => 'Folder',
                'timestamp' => (int) $info->getMTime(),
                'size' => null,
                'public_url' => buildPublicUrl($baseUrl, $relativePath, true),
                'browse_path' => $relativePath,
            );
            continue;
        }

        $items[] = array(
            'name' => $name,
            'relative_path' => $relativePath,
            'type' => 'File',
            'timestamp' => (int) $info->getMTime(),
            'size' => (int) $info->getSize(),
            'public_url' => buildPublicUrl($baseUrl, $relativePath, false),
            'browse_path' => dirname($relativePath) === '.' ? '' : dirname($relativePath),
        );
    }

    usort(
        $items,
        function (array $a, array $b): int {
            return $b['timestamp'] <=> $a['timestamp'];
        }
    );

    if (count($items) > $limit) {
        $items = array_slice($items, 0, $limit);
    }

    return $items;
}

function collectFolderItems(
    string $folderDir,
    string $rootDir,
    string $baseUrl,
    array $blockedFileNames,
    array $blockedDirNames,
    array $blockedExtensions,
    int $limit
): array {
    $items = array();
    $entries = scandir($folderDir);

    if ($entries === false) {
        return $items;
    }

    foreach ($entries as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }

        $fullPath = $folderDir . DIRECTORY_SEPARATOR . $entry;
        $relativePath = str_replace('\\', '/', substr($fullPath, strlen($rootDir) + 1));

        if (is_dir($fullPath)) {
            if (isBlockedName($entry, $blockedFileNames, $blockedDirNames)) {
                continue;
            }

            $items[] = array(
                'name' => $entry,
                'relative_path' => $relativePath,
                'type' => 'Folder',
                'timestamp' => (int) filemtime($fullPath),
                'size' => null,
                'public_url' => buildPublicUrl($baseUrl, $relativePath, true),
                'browse_path' => $relativePath,
            );
            continue;
        }

        if (!is_file($fullPath) || !isSafePublicFile($entry, $blockedFileNames, $blockedExtensions)) {
            continue;
        }

        $items[] = array(
            'name' => $entry,
            'relative_path' => $relativePath,
            'type' => 'File',
            'timestamp' => (int) filemtime($fullPath),
            'size' => (int) filesize($fullPath),
            'public_url' => buildPublicUrl($baseUrl, $relativePath, false),
            'browse_path' => dirname($relativePath) === '.' ? '' : dirname($relativePath),
        );
    }

    usort(
        $items,
        function (array $a, array $b): int {
            return $b['timestamp'] <=> $a['timestamp'];
        }
    );

    if (count($items) > $limit) {
        $items = array_slice($items, 0, $limit);
    }

    return $items;
}

$baseUrl = detectBaseUrl();
$requestedPath = isset($_GET['path']) ? normalizeRelativePath((string) $_GET['path']) : '';
$browsePath = '';
$browseDir = $rootDir;
$browseError = '';

if ($requestedPath !== '') {
    $candidateDir = $rootDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $requestedPath);
    $realCandidateDir = realpath($candidateDir);
    $realRootDir = realpath($rootDir);

    if ($realCandidateDir === false || $realRootDir === false || strpos($realCandidateDir, $realRootDir) !== 0 || !is_dir($realCandidateDir)) {
        $browseError = 'Requested folder is not available.';
    } else {
        $browseDir = $realCandidateDir;
        $browsePath = str_replace('\\', '/', substr($realCandidateDir, strlen($realRootDir) + 1));
    }
}

$recentItems = collectRecentItems(
    $rootDir,
    $baseUrl,
    $blockedFileNames,
    $blockedDirNames,
    $blockedExtensions,
    $defaultLimit
);

$folderItems = array();
if ($browseError === '') {
    $folderItems = collectFolderItems(
        $browseDir,
        $rootDir,
        $baseUrl,
        $blockedFileNames,
        $blockedDirNames,
        $blockedExtensions,
        $browseLimit
    );
}

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>lookangejss links</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 24px;
      line-height: 1.5;
      color: #1d1d1f;
      background: #ffffff;
    }
    h1, h2, h3 {
      margin: 0 0 10px;
    }
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
      word-break: break-all;
    }
    .note, .warning {
      margin: 14px 0 22px;
      padding: 14px 16px;
      border-radius: 10px;
    }
    .note {
      background: #eef6ff;
      border-left: 4px solid #2878d8;
    }
    .warning {
      background: #fff4e5;
      border-left: 4px solid #cc7a00;
    }
    .section {
      margin-top: 28px;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      margin: 12px 0 18px;
    }
    .toolbar input {
      min-width: 260px;
      max-width: 100%;
      padding: 8px 10px;
      border: 1px solid #c8ccd0;
      border-radius: 8px;
      font-size: 14px;
    }
    .toolbar a {
      text-decoration: none;
      color: #1d4ed8;
    }
    .grid {
      display: grid;
      gap: 12px;
    }
    .row {
      border: 1px solid #d9d9de;
      border-radius: 10px;
      padding: 14px;
      background: #fafafa;
    }
    .name {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 4px;
      word-break: break-all;
    }
    .path {
      color: #5f6368;
      font-size: 0.95em;
      margin-bottom: 4px;
      word-break: break-all;
    }
    .meta {
      color: #5f6368;
      font-size: 0.92em;
      margin-bottom: 8px;
    }
    .url {
      font-family: Consolas, monospace;
      font-size: 0.94em;
      margin-bottom: 10px;
      word-break: break-all;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .button,
    button {
      display: inline-block;
      border: 1px solid #b8bcc2;
      background: #ffffff;
      border-radius: 8px;
      padding: 7px 12px;
      text-decoration: none;
      color: #202124;
      cursor: pointer;
      font-size: 14px;
    }
    .button:hover,
    button:hover {
      background: #f1f3f4;
    }
    .empty {
      padding: 14px 16px;
      background: #f7f7f7;
      border-radius: 10px;
      border: 1px solid #e2e2e2;
    }
  </style>
</head>
<body>
  <h1>lookangejss URL helper</h1>
  <p>Base URL: <code><?php echo h($baseUrl); ?></code></p>

  <div class="note">
    This page is designed for your upload workflow: it highlights the most recently modified public items across <code>lookangejss/</code>, and it lets you drill into a folder when you need the exact URL.
    Hidden files, helper scripts, and risky server-side file types such as <code>.php</code>, <code>.ini</code>, <code>.log</code>, <code>.sql</code>, and <code>.py</code> are intentionally not shown.
  </div>

  <div class="section">
    <h2>Browse a folder</h2>
    <div class="toolbar">
      <a href="<?php echo h(strtok($_SERVER['REQUEST_URI'] ?? '/lookangejss/url.php', '?')); ?>">Root view</a>
      <?php if ($browsePath !== '') : ?>
        <span>Current folder: <code><?php echo h($browsePath . '/'); ?></code></span>
      <?php else : ?>
        <span>Current folder: <code>lookangejss/</code></span>
      <?php endif; ?>
    </div>

    <?php if ($browseError !== '') : ?>
      <div class="warning"><?php echo h($browseError); ?></div>
    <?php elseif (count($folderItems) === 0) : ?>
      <div class="empty">No public items found in this folder.</div>
    <?php else : ?>
      <div class="grid" id="folder-grid">
        <?php foreach ($folderItems as $item) : ?>
          <div class="row" data-search="<?php echo h(strtolower($item['relative_path'] . ' ' . $item['name'])); ?>">
            <div class="name"><?php echo h($item['name']); ?></div>
            <div class="path"><?php echo h($item['relative_path']); ?></div>
            <div class="meta">
              <?php echo h($item['type']); ?> |
              Modified <?php echo h(formatTime($item['timestamp'])); ?>
              <?php if ($item['size'] !== null) : ?>
                | <?php echo h(formatSize((int) $item['size'])); ?>
              <?php endif; ?>
            </div>
            <div class="url"><?php echo h($item['public_url']); ?></div>
            <div class="actions">
              <a class="button" href="<?php echo h($item['public_url']); ?>" target="_blank" rel="noopener">Open</a>
              <button type="button" onclick="copyText('<?php echo h($item['public_url']); ?>', this)">Copy URL</button>
              <?php if ($item['type'] === 'Folder') : ?>
                <a class="button" href="?path=<?php echo h(rawurlencode($item['relative_path'])); ?>">Browse here</a>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>

  <div class="section">
    <h2>Recent public uploads and updates</h2>
    <div class="toolbar">
      <input id="recent-filter" type="search" placeholder="Filter by filename or folder path">
      <span>Showing newest <?php echo h((string) count($recentItems)); ?> public items across <code>lookangejss/</code></span>
    </div>

    <?php if (count($recentItems) === 0) : ?>
      <div class="empty">No public items found.</div>
    <?php else : ?>
      <div class="grid" id="recent-grid">
        <?php foreach ($recentItems as $item) : ?>
          <div class="row" data-search="<?php echo h(strtolower($item['relative_path'] . ' ' . $item['name'])); ?>">
            <div class="name"><?php echo h($item['name']); ?></div>
            <div class="path"><?php echo h($item['relative_path']); ?></div>
            <div class="meta">
              <?php echo h($item['type']); ?> |
              Modified <?php echo h(formatTime($item['timestamp'])); ?>
              <?php if ($item['size'] !== null) : ?>
                | <?php echo h(formatSize((int) $item['size'])); ?>
              <?php endif; ?>
            </div>
            <div class="url"><?php echo h($item['public_url']); ?></div>
            <div class="actions">
              <a class="button" href="<?php echo h($item['public_url']); ?>" target="_blank" rel="noopener">Open</a>
              <button type="button" onclick="copyText('<?php echo h($item['public_url']); ?>', this)">Copy URL</button>
              <?php if ($item['type'] === 'Folder') : ?>
                <a class="button" href="?path=<?php echo h(rawurlencode($item['relative_path'])); ?>">Browse here</a>
              <?php elseif ($item['browse_path'] !== '') : ?>
                <a class="button" href="?path=<?php echo h(rawurlencode($item['browse_path'])); ?>">Open folder view</a>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>

  <script>
    function copyText(text, button) {
      navigator.clipboard.writeText(text).then(function () {
        var old = button.textContent;
        button.textContent = 'Copied';
        setTimeout(function () {
          button.textContent = old;
        }, 1200);
      }).catch(function () {
        alert('Copy failed. You can still copy the URL manually.');
      });
    }

    function wireFilter(inputId, gridId) {
      var input = document.getElementById(inputId);
      var grid = document.getElementById(gridId);
      if (!input || !grid) {
        return;
      }

      input.addEventListener('input', function () {
        var needle = input.value.toLowerCase().trim();
        var rows = grid.querySelectorAll('.row');
        rows.forEach(function (row) {
          var haystack = row.getAttribute('data-search') || '';
          row.style.display = needle === '' || haystack.indexOf(needle) !== -1 ? '' : 'none';
        });
      });
    }

    wireFilter('recent-filter', 'recent-grid');
  </script>
</body>
</html>
