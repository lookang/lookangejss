<?php
/**
 * get_public_uploads.php
 *
 * Public (no authentication) endpoint that returns all uploaded simulations
 * from the database as a JSON array compatible with the ai-prompt-library.html
 * catalogue format.
 *
 * Used by the library source-filter "👥 User Contributions" checkbox.
 *
 * GET  get_public_uploads.php
 *
 * Each item in the response array has these fields (matching catalogue.json schema):
 *   title           string
 *   id              string   — slug
 *   folder          string   — slug (used as display folder name)
 *   folderPath      string   — e.g. "01users/u-1a2b3c4d5e6f7a8b9c0d/my-topic"
 *   indexPath       string   — e.g. "01users/u-1a2b3c4d5e6f7a8b9c0d/my-topic/index.html"
 *   launchPath      string   — e.g. "open_upload.php?id=123"
 *   subject         string
 *   gradeLevel      string
 *   promptText      string   — description shown as summary on the card
 *   hasPrompt       bool
 *   hasPromptImage     bool
 *   promptImagePath    string
 *   promptImageExt     string
 *   hasZip             bool
 *   zipPath            string   — relative path to {slug}.zip for download
 *   hasKnowledgeBase   bool
 *   knowledgeBasePath  string
 *   knowledgeBaseExt   string
 *   modifiedTime       string   — ISO 8601 from updated_at
 *   user_name          string
 *   sls_url            string
 *   _source            string   — always "user_contrib"
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://iwant2study.org');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
// Allow CDN / browser caching for 60 seconds to ease DB load
header('Cache-Control: public, max-age=60');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/upload_storage.php';

try {
    $pdo  = getDB();
    $stmt = $pdo->query('
        SELECT id, user_email, user_name, title, slug,
               subject, level, description, sls_url,
               folder_path, html_filename, prompt_filename,
               updated_at
        FROM simulations
        ORDER BY updated_at DESC
    ');
    $rows = $stmt->fetchAll();
} catch (PDOException $e) {
    error_log('get_public_uploads.php DB error: ' . $e->getMessage());
    echo json_encode([]);
    exit;
}

$items = [];
foreach ($rows as $row) {
    $row = migrateSimulationStorage($pdo, $row);

    $folderPath = rtrim($row['folder_path'] ?? '', '/');   // e.g. 01users/u-1a2b3c4d5e6f7a8b9c0d/my-topic
    $htmlFile   = $row['html_filename']   ?? 'index.html';
    $promptFile = $row['prompt_filename'] ?? null;
    $recordId   = isset($row['id']) ? (int) $row['id'] : 0;
    $launchPath = $recordId > 0
        ? 'open_upload.php?id=' . $recordId
        : $folderPath . '/' . $htmlFile;

    $simDir   = __DIR__ . '/' . $folderPath;
    $slug     = $row['slug'] ?? '';

    // ── Thumbnail / prompt image ──────────────────────────────────────────────
    $hasImage     = false;
    $imageRelPath = null;
    $imageExt     = null;
    foreach (['png', 'jpg', 'jpeg', 'gif', 'webp'] as $ext) {
        if (file_exists($simDir . '/prompt_image.' . $ext)) {
            $hasImage     = true;
            $imageRelPath = $folderPath . '/prompt_image.' . $ext;
            $imageExt     = $ext;
            break;
        }
    }

    // ── Prompt text ───────────────────────────────────────────────────────────
    // Priority: DB description → explicit prompt file → prompt.txt / prompt.md
    // extracted from the ZIP during upload.
    $promptText = trim($row['description'] ?? '');
    $hasPromptFile = false;

    if ($promptFile !== null && $promptFile !== '') {
        $pf = $simDir . '/' . $promptFile;
        if (file_exists($pf)) {
            $hasPromptFile = true;
            if ($promptText === '') {
                $promptText = file_get_contents($pf) ?: '';
            }
        }
    }
    // Fall back: look for prompt.txt / prompt.md dropped by the ZIP extractor
    if (!$hasPromptFile) {
        foreach (['prompt.txt', 'prompt.md'] as $candidate) {
            $fp = $simDir . '/' . $candidate;
            if (file_exists($fp)) {
                $hasPromptFile = true;
                if ($promptText === '') {
                    $promptText = file_get_contents($fp) ?: '';
                }
                break;
            }
        }
    }

    // ── Downloadable ZIP ──────────────────────────────────────────────────────
    // Saved by upload_simulation.php as {slug}.zip; also accept any single .zip
    // that may have been placed manually.
    $hasZip  = false;
    $zipPath = null;
    $namedZip = $simDir . '/' . $slug . '.zip';
    if (file_exists($namedZip)) {
        $hasZip  = true;
        $zipPath = $folderPath . '/' . $slug . '.zip';
    } else {
        // Fallback: any .zip in the folder
        $found = glob($simDir . '/*.zip');
        if (!empty($found)) {
            $hasZip  = true;
            $zipPath = $folderPath . '/' . basename($found[0]);
        }
    }

    // ── Knowledge base ────────────────────────────────────────────────────────
    $hasKb  = false;
    $kbPath = null;
    $kbExt  = null;
    foreach (['txt', 'md', 'pdf', 'docx'] as $ext) {
        $kb = $simDir . '/prompt_knowledge_base.' . $ext;
        if (file_exists($kb)) {
            $hasKb  = true;
            $kbPath = $folderPath . '/prompt_knowledge_base.' . $ext;
            $kbExt  = $ext;
            break;
        }
    }

    $items[] = [
        // Catalogue-compatible fields
        'recordId'         => $recordId,
        'title'            => $row['title'],
        'id'               => $slug,
        'folder'           => $slug,
        'folderPath'       => $folderPath,
        'indexPath'        => $folderPath . '/' . $htmlFile,
        'launchPath'       => $launchPath,
        'subject'          => $row['subject']  ?? '',
        'gradeLevel'       => $row['level']    ?? '',
        'promptText'       => $promptText,
        'hasPrompt'        => $hasPromptFile || $promptText !== '',
        'hasPromptImage'   => $hasImage,
        'promptImagePath'  => $imageRelPath,
        'promptImageExt'   => $imageExt,
        'hasZip'           => $hasZip,
        'zipPath'          => $zipPath,
        'hasKnowledgeBase' => $hasKb,
        'knowledgeBasePath'=> $kbPath,
        'knowledgeBaseExt' => $kbExt,
        'modifiedTime'     => $row['updated_at'] ?? null,
        // Attribution fields
        'user_name'        => $row['user_name']  ?? '',
        'sls_url'          => $row['sls_url']    ?? '',
        '_source'          => 'user_contrib',
    ];
}

echo json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
