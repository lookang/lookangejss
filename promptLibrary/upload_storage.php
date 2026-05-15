<?php
declare(strict_types=1);

require_once __DIR__ . '/db_config.php';

/**
 * Build a stable, opaque owner key so upload folders do not expose teacher emails.
 */
function buildUploadOwnerKey(string $email): string
{
    $normalized = strtolower(trim($email));
    if ($normalized === '') {
        throw new InvalidArgumentException('Email is required to build owner key');
    }

    $secret = defined('UPLOAD_OWNER_SECRET') && UPLOAD_OWNER_SECRET !== ''
        ? UPLOAD_OWNER_SECRET
        : DB_PASS;

    return 'u-' . substr(hash_hmac('sha256', $normalized, $secret), 0, 20);
}

function buildSimulationFolderPath(string $email, string $slug): string
{
    return '01users/' . buildUploadOwnerKey($email) . '/' . trim($slug, '/') . '/';
}

function uploadAbsolutePath(string $relativePath): string
{
    return __DIR__ . '/' . ltrim($relativePath, '/');
}

function ensureUploadDirectory(string $dir): bool
{
    return is_dir($dir) || mkdir($dir, 0775, true);
}

/**
 * Move a legacy email-based upload directory into the opaque owner-key path.
 * Safe to call repeatedly; if migration is not needed or cannot complete, the
 * original row is returned unchanged.
 */
function migrateSimulationStorage(PDO $pdo, array $row): array
{
    $id = isset($row['id']) ? (int) $row['id'] : 0;
    $email = strtolower(trim((string) ($row['user_email'] ?? '')));
    $slug = trim((string) ($row['slug'] ?? ''));
    if ($id <= 0 || $email === '' || $slug === '') {
        return $row;
    }

    $expectedFolderPath = buildSimulationFolderPath($email, $slug);
    $currentFolderPath = trim((string) ($row['folder_path'] ?? ''));
    if ($currentFolderPath === '') {
        $currentFolderPath = $expectedFolderPath;
    }

    $normalize = static function (string $path): string {
        $clean = trim(str_replace('\\', '/', $path), '/');
        return $clean === '' ? '' : $clean . '/';
    };

    $currentFolderPath = $normalize($currentFolderPath);
    $expectedFolderPath = $normalize($expectedFolderPath);

    if ($currentFolderPath === $expectedFolderPath) {
        $row['folder_path'] = $expectedFolderPath;
        return $row;
    }

    $currentDir = uploadAbsolutePath($currentFolderPath);
    $expectedDir = uploadAbsolutePath($expectedFolderPath);
    $expectedParent = dirname($expectedDir);
    $legacyParent = dirname($currentDir);

    $migrated = false;
    if (is_dir($expectedDir)) {
        $migrated = true;
    } elseif (is_dir($currentDir)) {
        if (!ensureUploadDirectory($expectedParent)) {
            return $row;
        }
        $migrated = @rename($currentDir, $expectedDir);
    }

    if (!$migrated) {
        return $row;
    }

    try {
        $stmt = $pdo->prepare('UPDATE simulations SET folder_path = :folder_path WHERE id = :id');
        $stmt->execute([
            ':folder_path' => $expectedFolderPath,
            ':id' => $id,
        ]);
        if (is_dir($legacyParent)) {
            $entries = array_values(array_diff(scandir($legacyParent) ?: [], ['.', '..']));
            if (!$entries) {
                @rmdir($legacyParent);
            }
        }
    } catch (PDOException $e) {
        error_log('upload_storage.php migration update failed: ' . $e->getMessage());
        return $row;
    }

    $row['folder_path'] = $expectedFolderPath;
    return $row;
}
