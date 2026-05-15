// -- Grab DOM elements --
const canvas = document.getElementById("rayCanvas");
const ctx = canvas.getContext("2d");
const graphCanvas = document.getElementById("graphCanvas");
const gctx = graphCanvas.getContext("2d");
const angleSlider = document.getElementById("angleSlider");
const angleDisplay = document.getElementById("angleDisplay");
const recordBtn = document.getElementById("recordBtn");
const plotBtn = document.getElementById("plotBtn");
const resetBtn = document.getElementById("resetBtn");
const tableBody = document.querySelector("#dataTable tbody");

// -- Constants for drawing --
const strike = { x: canvas.width / 2, y: canvas.height - 60 }; // point where ray meets mirror
const rayLen = 180; // length of the drawn rays
const maxRows = 7;

// --- Data store ---
let records = [];

// Utility: degree <-> radian conversion
const toRad = deg => (deg * Math.PI) / 180;

// Draw the simulation for a given incidence angle
function drawScene(angleIncidence) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw mirror
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#0d47a1";
  ctx.beginPath();
  ctx.moveTo(30, strike.y);
  ctx.lineTo(canvas.width - 30, strike.y);
  ctx.stroke();

  // Draw mirror texture (diagonal stripes)
  for (let x = 30; x < canvas.width - 30; x += 10) {
    ctx.beginPath();
    ctx.moveTo(x, strike.y + 1);
    ctx.lineTo(x + 8, strike.y + 10);
    ctx.stroke();
  }

  // Draw normal (dashed)
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(strike.x, strike.y);
  ctx.lineTo(strike.x, strike.y - 200);
  ctx.stroke();
  ctx.setLineDash([]);

  // Calculate reflection angle (equal)
  const angleReflection = angleIncidence; // by law of reflection

  // ---- Draw incident ray ----
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  let incDir = toRad(90 + angleIncidence); // left side w.r.t horizontal
  let ix = strike.x + rayLen * Math.cos(incDir);
  let iy = strike.y - rayLen * Math.sin(incDir); // minus because canvas y grows down
  ctx.beginPath();
  ctx.moveTo(ix, iy);
  ctx.lineTo(strike.x, strike.y);
  ctx.stroke();
  
  // MODIFIED: Place arrow head in the middle of the incident ray
  // MODIFIED: Changed direction of arrow to point away from the strike point (opposite direction)
  let midX = (ix + strike.x) / 2;
  let midY = (iy + strike.y) / 2;
  drawArrowHead(midX, midY, ix, iy);

  // ---- Draw reflected ray ----
  let refDir = toRad(90 - angleReflection); // right side
  let rx = strike.x + rayLen * Math.cos(refDir);
  let ry = strike.y - rayLen * Math.sin(refDir);
  ctx.beginPath();
  ctx.moveTo(strike.x, strike.y);
  ctx.lineTo(rx, ry);
  ctx.stroke();
  
  // MODIFIED: Place arrow head in the middle of the reflected ray
  let midRX = (rx + strike.x) / 2;
  let midRY = (ry + strike.y) / 2;
  drawArrowHead(midRX, midRY, strike.x, strike.y);

  // Draw angle arc (blue)
  ctx.strokeStyle = "#0277bd";
  ctx.beginPath();
  const radius = 45;
  ctx.arc(strike.x, strike.y, radius, toRad(-90), toRad(-90 - angleIncidence), true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(strike.x, strike.y, radius, toRad(-90), toRad(-90 + angleReflection), false);
  ctx.stroke();

  // Labels
  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  // MODIFIED: Changed "normal" to lowercase
  ctx.fillText("normal", strike.x, strike.y - 210);
  ctx.textAlign = "left";
  
  // MODIFIED: Changed "Incident ray" to lowercase
  ctx.fillText("incident ray", ix - 90, iy + 20);
  
  ctx.textAlign = "right";
  // MODIFIED: Changed "Reflected ray" to lowercase
  ctx.fillText("reflected ray", rx + 90, ry + 20);

  ctx.textAlign = "center";
  ctx.fillText("i = " + angleIncidence.toFixed(1) + "°", strike.x - 50, strike.y - 10);
  ctx.fillText("r = " + angleReflection.toFixed(1) + "°", strike.x + 50, strike.y - 10);
}

// Helper: draw arrowhead at start of a line (pt1) pointing towards pt2
function drawArrowHead(x1, y1, x2, y2) {
  const headLen = 10;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + headLen * Math.cos(angle + Math.PI / 7), y1 + headLen * Math.sin(angle + Math.PI / 7));
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 + headLen * Math.cos(angle - Math.PI / 7), y1 + headLen * Math.sin(angle - Math.PI / 7));
  ctx.stroke();
}

// --- Table & Graph utilities ---
function addRecord(angleInc) {
  if (records.length >= maxRows) return;
  const angleRef = angleInc; // equal
  const record = { i: parseFloat(angleInc.toFixed(1)), r: parseFloat(angleRef.toFixed(1)) };
  records.push(record);
  renderTable();
  if (records.length >= maxRows) recordBtn.disabled = true;
}

function renderTable() {
  tableBody.innerHTML = "";
  records.forEach((rec, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${idx + 1}</td><td>${rec.i.toFixed(1)}</td><td>${rec.r.toFixed(1)}</td>`;
    tableBody.appendChild(row);
  });
}

function drawGraph() {
  if (records.length === 0) return;
  graphCanvas.classList.remove("hidden");
  // Clear
  gctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  // margins
  const margin = 40;
  const w = graphCanvas.width - 2 * margin;
  const h = graphCanvas.height - 2 * margin;

  // find max for scaling (0-90)
  const maxAngle = 90;

  // MODIFIED: Draw grid lines
  gctx.strokeStyle = "#e0e0e0";
  gctx.lineWidth = 1;
  
  // Draw horizontal grid lines (for x-axis)
  for (let i = 0; i <= 90; i += 15) {
    const y = graphCanvas.height - margin - (i / maxAngle) * h;
    gctx.beginPath();
    gctx.moveTo(margin, y);
    gctx.lineTo(graphCanvas.width - margin, y);
    gctx.stroke();
    
    // Add scale labels on y-axis
    gctx.fillStyle = "#000";
    gctx.textAlign = "right";
    gctx.fillText(i.toString(), margin - 5, y + 4);
  }
  
  // Draw vertical grid lines (for y-axis)
  for (let i = 0; i <= 90; i += 15) {
    const x = margin + (i / maxAngle) * w;
    gctx.beginPath();
    gctx.moveTo(x, margin);
    gctx.lineTo(x, graphCanvas.height - margin);
    gctx.stroke();
    
    // Add scale labels on x-axis
    gctx.fillStyle = "#000";
    gctx.textAlign = "center";
    gctx.fillText(i.toString(), x, graphCanvas.height - margin + 15);
  }

  // Draw axes
  gctx.strokeStyle = "#000";
  gctx.lineWidth = 1;
  // x-axis
  gctx.beginPath();
  gctx.moveTo(margin, graphCanvas.height - margin);
  gctx.lineTo(graphCanvas.width - margin, graphCanvas.height - margin);
  gctx.stroke();
  // y-axis
  gctx.beginPath();
  gctx.moveTo(margin, graphCanvas.height - margin);
  gctx.lineTo(margin, margin);
  gctx.stroke();

  // Labels
  gctx.font = "14px Arial";
  gctx.textAlign = "center";
  // MODIFIED: Changed "r / degree" to lowercase
  gctx.fillText("r / degree", graphCanvas.width / 2, graphCanvas.height - 10);
  gctx.save();
  gctx.translate(12, graphCanvas.height / 2);
  gctx.rotate(-Math.PI / 2);
  // MODIFIED: Changed 'I' to 'i' on the y-axis
  gctx.fillText("i / degree", 0, 0);
  gctx.restore();

  // Plot points
  gctx.fillStyle = "#d50000";
  gctx.beginPath();
  records.forEach((rec, idx) => {
    const x = margin + (rec.r / maxAngle) * w;
    const y = graphCanvas.height - margin - (rec.i / maxAngle) * h;
    gctx.fillRect(x - 3, y - 3, 6, 6);
    // optional join lines
    if (idx === 0) gctx.moveTo(x, y);
    else gctx.lineTo(x, y);
  });
  gctx.strokeStyle = "#d50000";
  gctx.stroke();
}

function resetAll() {
  records = [];
  recordBtn.disabled = false;
  graphCanvas.classList.add("hidden");
  gctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  renderTable();
  angleSlider.value = 30;
  angleDisplay.textContent = "30.0";
  drawScene(30);
}

// --- Event Listeners ---
angleSlider.addEventListener("input", () => {
  const angleVal = parseFloat(angleSlider.value);
  angleDisplay.textContent = angleVal.toFixed(1);
  drawScene(angleVal);
});

recordBtn.addEventListener("click", () => {
  addRecord(parseFloat(angleSlider.value));
});

plotBtn.addEventListener("click", drawGraph);
resetBtn.addEventListener("click", resetAll);

// --- Initial draw ---
window.addEventListener("load", () => {
  drawScene(parseFloat(angleSlider.value));
});