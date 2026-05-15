// generate_zips.js
// For each interactive that has a prompt.txt, create/update a zip package
// suitable for upload to a webserver.
//
// Rules:
// - If prompt.txt lives in a *_files folder and matching <BaseName>.html exists
//   in the parent folder, create <BaseName>.zip next to the HTML, containing:
//     <BaseName>.html + <BaseName>_files/.
// - If prompt.txt lives in a folder that has index.html (standalone interactive
//   folder), create <FolderName>.zip in the parent, containing the entire folder.
// - Skip folders where we cannot resolve an HTML file.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walkForPromptDirs(baseDir) {
  const promptDirs = [];

  function walk(dir) {
    const basename = path.basename(dir);
    if (['node_modules', '.git', 'Library', 'playwright-report'].includes(basename)) {
      return;
    }

    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    const hasPrompt = entries.some((ent) => !ent.isDirectory() && ent.name === 'prompt.txt');
    if (hasPrompt) {
      promptDirs.push(dir);
    }

    for (const ent of entries) {
      if (ent.isDirectory()) {
        walk(path.join(dir, ent.name));
      }
    }
  }

  walk(baseDir);
  return promptDirs;
}

function findHtmlForPromptDir(promptDir) {
  // 1. index.html in the same folder
  const indexPath = path.join(promptDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  const dirName = path.basename(promptDir);
  const parentDir = path.dirname(promptDir);

  // 2. For *_files folders, try matching "BaseName.html" in the parent directory
  if (dirName.endsWith('_files')) {
    const base = dirName.slice(0, -'_files'.length);
    const candidate = path.join(parentDir, base + '.html');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // 3. If there is exactly one .html file in this folder, use it
  try {
    const htmls = fs
      .readdirSync(promptDir)
      .filter((name) => name.toLowerCase().endsWith('.html'));
    if (htmls.length === 1) {
      return path.join(promptDir, htmls[0]);
    }
  } catch (e) {
    // ignore
  }

  return null;
}

function safeExec(cmd, cwd) {
  try {
    execSync(cmd, { stdio: 'inherit', cwd });
    return null;
  } catch (e) {
    return e.message || String(e);
  }
}

function main() {
  const baseDir = process.cwd();
  console.log('Scanning for prompt.txt folders under', baseDir);

  const promptDirs = walkForPromptDirs(baseDir);
  console.log('Found', promptDirs.length, 'folders containing prompt.txt');

  let created = 0;
  let skippedNoHtml = 0;
  const errors = [];

  for (const promptDir of promptDirs) {
    const htmlPath = findHtmlForPromptDir(promptDir);
    const relPrompt = path.relative(baseDir, promptDir) || '.';

    if (!htmlPath) {
      skippedNoHtml++;
      console.log('Skipping (no HTML resolved):', relPrompt);
      continue;
    }

    const htmlDir = path.dirname(htmlPath);
    const htmlBase = path.basename(htmlPath);

    // Case A: promptDir is a *_files folder whose parent holds the HTML
    if (promptDir.endsWith('_files') && path.dirname(promptDir) === htmlDir) {
      const baseName = htmlBase.replace(/\.html?$/i, '');
      const parentDir = htmlDir;
      const zipName = baseName + '.zip';
      const zipPath = path.join(parentDir, zipName);

      console.log('Zipping ACP-style interactive:', path.relative(baseDir, zipPath));

      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }

      const cmd = `zip -r "${zipName}" "${baseName}.html" "${baseName}_files"`;
      const err = safeExec(cmd, parentDir);
      if (err) {
        console.error('  Error zipping', zipName, ':', err);
        errors.push({ zip: path.relative(baseDir, zipPath), error: err });
      } else {
        created++;
      }
      continue;
    }

    // Case B: standalone folder with index.html (htmlDir === promptDir)
    if (htmlDir === promptDir) {
      const folderName = path.basename(promptDir);
      const parentDir = path.dirname(promptDir);
      const zipName = folderName + '.zip';
      const zipPath = path.join(parentDir, zipName);

      console.log('Zipping standalone folder:', path.relative(baseDir, zipPath));

      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }

      const cmd = `zip -r "${zipName}" "${folderName}"`;
      const err = safeExec(cmd, parentDir);
      if (err) {
        console.error('  Error zipping', zipName, ':', err);
        errors.push({ zip: path.relative(baseDir, zipPath), error: err });
      } else {
        created++;
      }
      continue;
    }

    // Fallback: we have an HTML, but structure doesn't match the two main patterns.
    // As a safe default, zip just that HTML file into <BaseName>.zip in its directory.
    const baseName = htmlBase.replace(/\.html?$/i, '');
    const zipName = baseName + '.zip';
    const zipPath = path.join(htmlDir, zipName);

    console.log('Zipping HTML-only fallback:', path.relative(baseDir, zipPath));

    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }

    const cmd = `zip "${zipName}" "${htmlBase}"`;
    const err = safeExec(cmd, htmlDir);
    if (err) {
      console.error('  Error zipping', zipName, ':', err);
      errors.push({ zip: path.relative(baseDir, zipPath), error: err });
    } else {
      created++;
    }
  }

  console.log('\nSummary:');
  console.log('  Zips created/updated:', created);
  console.log('  Prompt folders skipped (no HTML found):', skippedNoHtml);
  console.log('  Zipping errors:', errors.length);
  if (errors.length) {
    console.log('  Error details:');
    for (const { zip, error } of errors) {
      console.log('   -', zip, '=>', error);
    }
  }
}

main();
