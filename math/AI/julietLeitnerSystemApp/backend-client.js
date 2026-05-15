(function () {
  'use strict';

  const API_ROOT = 'api/';
  let currentUser = null;
  let syncTimer = null;
  let pendingEngine = null;

  async function request(endpoint, options = {}) {
    if (window.location.protocol === 'file:') {
      throw new Error('Cloud API is available after uploading to cPanel.');
    }
    const res = await fetch(API_ROOT + endpoint, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    const data = await res.json().catch(() => ({ ok: false, error: 'Invalid server response' }));
    if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async function me() {
    const data = await request('me.php');
    currentUser = data.user || null;
    return currentUser;
  }

  async function ensureCurrentUser() {
    if (currentUser) return currentUser;
    try {
      return await me();
    } catch (err) {
      currentUser = null;
      return null;
    }
  }

  async function login(username, password) {
    const data = await request('login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    currentUser = data.user;
    return currentUser;
  }

  async function register(displayName, username, password, classCode, email) {
    const data = await request('register.php', {
      method: 'POST',
      body: JSON.stringify({ displayName, username, password, classCode, email }),
    });
    currentUser = data.user;
    return currentUser;
  }

  async function logout() {
    await request('logout.php', { method: 'POST', body: '{}' });
    currentUser = null;
  }

  async function saveProgress(engine) {
    if (!engine || typeof engine.exportCloudState !== 'function') return null;
    if (!await ensureCurrentUser()) return null;
    return request('save-progress.php', {
      method: 'POST',
      body: JSON.stringify(engine.exportCloudState()),
    });
  }

  function queueSave(engine) {
    pendingEngine = engine;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => saveProgress(engine).catch(err => console.warn('Cloud sync failed', err)), 120);
  }

  async function loadProgress(engine) {
    if (!engine || typeof engine.importCloudState !== 'function') return null;
    if (!await ensureCurrentUser()) return null;
    const data = await request('load-progress.php');
    engine.importCloudState(data, { cloudUser: currentUser });
    return data;
  }

  function flushPendingSave() {
    if (!pendingEngine || typeof pendingEngine.exportCloudState !== 'function') return;
    if (!currentUser || window.location.protocol === 'file:') return;
    try {
      const body = JSON.stringify(pendingEngine.exportCloudState());
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(API_ROOT + 'save-progress.php', blob);
      } else {
        fetch(API_ROOT + 'save-progress.php', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => null);
      }
    } catch (err) {
      console.warn('Cloud flush failed', err);
    }
  }

  window.addEventListener('pagehide', flushPendingSave);

  async function logActivity(eventType, topic, correct, total) {
    try {
      await request('log-activity.php', {
        method: 'POST',
        body: JSON.stringify({ eventType, topic, correct: correct ?? null, total: total ?? null }),
      });
    } catch { /* fire-and-forget — never block the student */ }
  }

  async function activityFeed() {
    const data = await request('activity-feed.php');
    return { events: data.events || [], onlineNow: data.onlineNow || 1 };
  }

  async function leaderboard(classOnly = true) {
    const data = await request('leaderboard.php' + (classOnly ? '?class=1' : ''));
    return data.leaders || [];
  }

  async function usersDebug() {
    const data = await request('users-debug.php');
    return data.users || [];
  }

  async function authFeed() {
    const data = await request('auth-feed.php');
    return data.events || [];
  }

  async function teacherStudents() {
    const data = await request('teacher-students.php');
    return data.students || [];
  }

  async function teacherDashboard(studentId) {
    const suffix = studentId ? '?studentId=' + encodeURIComponent(studentId) : '';
    return request('teacher-dashboard.php' + suffix);
  }

  async function teacherResetPassword(studentId, newPassword) {
    return request('teacher-reset-password.php', {
      method: 'POST',
      body: JSON.stringify({ studentId, newPassword }),
    });
  }

  async function pendingTeachers() {
    const data = await request('admin-pending-teachers.php');
    return data.teachers || [];
  }

  async function approveTeacher(teacherId) {
    return request('admin-approve-teacher.php', {
      method: 'POST',
      body: JSON.stringify({ teacherId }),
    });
  }

  async function factAttempts(studentId) {
    const data = await request('fact-attempts.php?studentId=' + encodeURIComponent(studentId));
    return data;
  }

  window.LeitnerCloud = {
    get user() { return currentUser; },
    me,
    login,
    register,
    logout,
    saveProgress,
    queueSave,
    loadProgress,
    leaderboard,
    logActivity,
    activityFeed,
    usersDebug,
    authFeed,
    teacherStudents,
    teacherDashboard,
    teacherResetPassword,
    pendingTeachers,
    approveTeacher,
    factAttempts,
  };
})();
