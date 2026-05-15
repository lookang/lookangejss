
let eventLog = [];
// Live reference read by the xAPI IIFE's buildPayload / buildFeedback
window.__fdpEventLog = eventLog;

function logAttempt(id, fraction, decimal, percent, correct, questionObj, questionIndex) {
  eventLog.push({
    timestamp: new Date().toISOString(),
    questionId: id,
    fraction: fraction,
    decimal: decimal,
    percent: percent,
    correct: correct
  });
  if (questionObj != null && questionIndex != null) {
    updateAnalyticsPanel(questionObj, fraction, decimal, percent, correct, questionIndex);
  }
  // Trigger xAPI flush so each answer is captured in the SLS timeline
  if (typeof window.__xapiFlushNow === 'function') window.__xapiFlushNow('quiz-answer', 300);
}

function updateAnalyticsPanel(q, fraction, decimal, percent, correct, index) {
  const container = document.getElementById('logContainer');
  if (!container) return;

  const entry = document.createElement('div');
  entry.className = 'log-entry ' + (correct ? 'log-correct' : 'log-wrong');

  const resultSymbol = correct ? '✅ Correct' : '❌ Wrong';
  const f = fraction || '—';
  const d = decimal  || '—';
  const p = percent  || '—';

  entry.innerHTML =
    '<span class="log-num">#' + (index + 1) + '</span>' +
    '<span class="log-question">Convert: <b>' + q.given + '</b></span>' +
    '<span class="log-answers">' +
      '<span class="log-label">Correct:</span> ' + q.fraction + ' | ' + q.decimal + ' | ' + q.percent +
      '<br>' +
      '<span class="log-label">Student:</span> ' + f + ' | ' + d + ' | ' + p +
    '</span>' +
    '<span class="log-result ' + (correct ? 'result-correct' : 'result-wrong') + '">' + resultSymbol + '</span>';

  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;

  // Hide placeholder once there are entries
  const empty = document.getElementById('logEmpty');
  if (empty) empty.style.display = 'none';

  // Auto-show panel on first entry
  const panel = document.getElementById('analyticsPanel');
  if (panel && panel.style.display === 'none') panel.style.display = 'block';
}

function downloadJSON() {
  const dataStr = "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(eventLog, null, 2));
  const dl = document.createElement("a");
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", "p5_fdp_analytics.json");
  dl.click();
}
