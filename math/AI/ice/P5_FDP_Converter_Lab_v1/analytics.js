
let eventLog = [];

function logAttempt(id, fraction, decimal, percent, correct) {
  eventLog.push({
    timestamp: new Date().toISOString(),
    questionId: id,
    fraction: fraction,
    decimal: decimal,
    percent: percent,
    correct: correct
  });
}

function downloadJSON() {
  const dataStr = "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(eventLog, null, 2));
  const dl = document.createElement("a");
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", "p5_fdp_analytics.json");
  dl.click();
}
