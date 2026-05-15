/**
 * sw.js — Service Worker for SLS Prompt Library push notifications.
 *
 * Uses "fetch-on-push": when a push arrives (empty payload), fetch the
 * latest upload from the API and show a rich notification.
 *
 * Place this file at: /lookangejss/promptLibrary/sw.js
 * (No need to put it at the domain root — it's scoped to this directory.)
 */

'use strict';

const LIBRARY_URL = 'https://iwant2study.org/lookangejss/promptLibrary/ai-prompt-library.html';
const API_URL     = 'https://iwant2study.org/lookangejss/promptLibrary/get_public_uploads.php';
const ICON_URL    = 'https://iwant2study.org/lookangejss/promptLibrary/favicon.ico';

// ── Push received ──────────────────────────────────────────────────────────
self.addEventListener('push', event => {
    event.waitUntil(showNotification());
});

async function showNotification() {
    let title   = '🆕 New simulation uploaded';
    let body    = 'A new interactive simulation has been shared in the SLS Prompt Library.';
    let destUrl = LIBRARY_URL;

    try {
        // Fetch the latest upload to build a meaningful notification
        const res   = await fetch(API_URL + '?_=' + Date.now(), { cache: 'no-store' });
        const items = await res.json();
        if (Array.isArray(items) && items.length) {
            const sim   = items[0];
            title       = '🆕 ' + (sim.title || 'New simulation');
            const parts = [sim.subject, sim.gradeLevel].filter(Boolean);
            body        = (sim.user_name || 'A teacher') + ' just shared a new simulation'
                        + (parts.length ? ' — ' + parts.join(' · ') : '');
            if (sim.launchPath) {
                destUrl = 'https://iwant2study.org/lookangejss/promptLibrary/' + sim.launchPath;
            } else if (sim.indexPath) {
                destUrl = 'https://iwant2study.org/lookangejss/promptLibrary/' + sim.indexPath;
            }
        }
    } catch (_) { /* network unavailable — use defaults */ }

    return self.registration.showNotification(title, {
        body,
        icon:      ICON_URL,
        badge:     ICON_URL,
        tag:       'sls-new-sim',      // replaces any previous notification
        renotify:  true,
        data:      { url: destUrl },
        actions: [
            { action: 'open',    title: '▶ Open simulation' },
            { action: 'dismiss', title: '✕ Dismiss' },
        ],
    });
}

// ── Notification click ─────────────────────────────────────────────────────
self.addEventListener('notificationclick', event => {
    event.notification.close();
    if (event.action === 'dismiss') return;

    const url = event.notification.data?.url || LIBRARY_URL;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
            // Focus existing tab if open
            const existing = wins.find(w => w.url === url);
            if (existing && 'focus' in existing) return existing.focus();
            return clients.openWindow(url);
        })
    );
});

// ── Activation: take control immediately ──────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
