// scripts.js

// ===========================
// Global Variables & Setup
// ===========================
let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let previewCanvas = document.getElementById("previewCanvas");
let previewCtx = previewCanvas.getContext("2d");

let baseImage = null; // { img, width, height } for interactive preview
let options = [];     // Each option: { img, text, label, isCorrect }
let hotspots = [];    // Each hotspot: { x, y, width, height, option, placed, isCorrect, maxMarks }

let draggedHotspot = null;
let resizingHotspot = null;
let dragOffsetX = 0, dragOffsetY = 0;
let startX, startY;
let quizTested = false;
let defaultHotspotWidth = 100, defaultHotspotHeight = 100;

// ===========================
// Cropper & Modal Setup
// ===========================
let cropper = null;
let currentCropCallback = null;
const cropperModal = document.getElementById("cropperModal");
const cropperImage = document.getElementById("cropperImage");
const cropBtn = document.getElementById("cropBtn");
const cancelCropBtn = document.getElementById("cancelCropBtn");

function openCropperModal(file, callback) {
  currentCropCallback = callback;
  const reader = new FileReader();
  reader.onload = function(e) {
    cropperImage.src = e.target.result;
    cropperModal.style.display = "flex";
    if (cropper) { cropper.destroy(); }
    cropper = new Cropper(cropperImage, {
      aspectRatio: NaN,
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
      scalable: true,
      zoomable: true,
      movable: true,
      minContainerHeight: 200,
      minContainerWidth: 300,
    });
  };
  reader.readAsDataURL(file);
}

cropBtn.addEventListener("click", () => {
  if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedDataUrl = croppedCanvas.toDataURL();
    currentCropCallback(croppedDataUrl);
    cropper.destroy();
    cropper = null;
    cropperModal.style.display = "none";
  }
});
cancelCropBtn.addEventListener("click", () => {
  if (cropper) { cropper.destroy(); cropper = null; }
  cropperModal.style.display = "none";
});

// ===========================
// xAPI Integration
// ===========================
const XAPIUtils = {
  parameters: null,
  getParameters: function() {
    if (!this.parameters) {
      const urlParams = new URLSearchParams(window.location.search);
      const endpoint = urlParams.get("endpoint");
      const auth = urlParams.get("auth");
      const agent = JSON.parse(urlParams.get("agent") || "null");
      const stateId = urlParams.get("stateId");
      const activityId = urlParams.get("activityId");
      if (endpoint && auth) {
        ADL.XAPIWrapper.changeConfig({
          endpoint: endpoint + "/",
          auth: `Basic ${auth}`
        });
      }
      this.parameters = { agent, stateId, activityId };
    }
    return this.parameters;
  }
};

document.addEventListener("DOMContentLoaded", function() {
  XAPIUtils.getParameters();
});

function sendScore(score) {
  try {
    const parameters = XAPIUtils.getParameters();
    if (!parameters || !parameters.activityId) return;
    const { agent, stateId, activityId } = parameters;
    const registration = null;
    const stateValue = { score };
    ADL.XAPIWrapper.sendState(activityId, agent, stateId, registration, stateValue);
  } catch (err) {
    console.error("An error occurred sending xAPI score:", err);
  }
}

// ===========================
// Tab Handling
// ===========================
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "Tab").classList.add("active");
    if (tab.dataset.tab === "preview") { updatePreview(); }
  });
});

// ===========================
// Image Upload & Cropping
// ===========================
document.getElementById("addBaseImageBtn").addEventListener("click", () => {
  document.getElementById("baseImageUpload").click();
});
document.getElementById("baseImageUpload").addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    openCropperModal(e.target.files[0], (croppedDataUrl) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 600, maxHeight = 400;
        let width = img.width, height = img.height;
        if (width > maxWidth) { height = (maxWidth / width) * height; width = maxWidth; }
        if (height > maxHeight) { width = (maxHeight / height) * width; height = maxHeight; }
        canvas.width = width; canvas.height = height;
        previewCanvas.width = width; previewCanvas.height = height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, width, height);
        // Save scaled dimensions for export
        baseImage = { img, width, height };
        document.getElementById("addOptionBtn").disabled = false;
        document.getElementById("addOptionTextBtn").disabled = false;
        document.getElementById("addHotspotBtn").disabled = false;
        redrawCanvas();
      };
      img.src = croppedDataUrl;
    });
  }
});

document.getElementById("addOptionBtn").addEventListener("click", () => {
  document.getElementById("optionImageUpload").click();
});
document.getElementById("optionImageUpload").addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    openCropperModal(e.target.files[0], (croppedDataUrl) => {
      const img = new Image();
      img.onload = () => {
        const optionLabel = String.fromCharCode(65 + options.length);
        options.push({ img, label: optionLabel, isCorrect: true });
        renderOptionPanel();
      };
      img.src = croppedDataUrl;
    });
  }
});
document.getElementById("addOptionTextBtn").addEventListener("click", () => {
  const optionText = prompt("Enter text for this option:");
  if (optionText) {
    const optionLabel = String.fromCharCode(65 + options.length);
    options.push({ text: optionText, label: optionLabel, isCorrect: true });
    renderOptionPanel();
  }
});

// ===========================
// Import Quiz Feature (JSON or ZIP)
// ===========================
document.getElementById("importQuizBtn").addEventListener("click", () => {
  document.getElementById("importQuizInput").click();
});
document.getElementById("importQuizInput").addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    if (file.name.endsWith(".zip")) {
      JSZip.loadAsync(file).then(zip => {
        const quizFile = zip.file("quiz.json");
        if (!quizFile) {
          throw new Error("quiz.json not found in ZIP file.");
        }
        return quizFile.async("string");
      }).then(jsonString => {
        loadQuizData(jsonString);
      }).catch(err => {
        alert("Error reading ZIP file: " + err);
      });
    } else {
      const reader = new FileReader();
      reader.onload = function(ev) { loadQuizData(ev.target.result); };
      reader.readAsText(file);
    }
  }
});

function loadQuizData(jsonString) {
  try {
    const quizData = JSON.parse(jsonString);
    document.getElementById("quizTitle").value = quizData.title || "";
    document.getElementById("quizDescription").value = quizData.description || "";
    if (quizData.baseImage) {
      const img = new Image();
      img.onload = function() {
        canvas.width = quizData.baseWidth || img.width;
        canvas.height = quizData.baseHeight || img.height;
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        baseImage = { img, width: canvas.width, height: canvas.height };
        redrawCanvas();
      };
      img.src = quizData.baseImage;
    }
    options = [];
    quizData.options.forEach(o => {
      if (o.src) {
        const optImg = new Image();
        optImg.src = o.src;
        options.push({ img: optImg, label: o.label, isCorrect: o.isCorrect });
      } else if (o.text) {
        options.push({ text: o.text, label: o.label, isCorrect: o.isCorrect });
      }
    });
    hotspots = quizData.hotspots || [];
    renderOptionPanel();
    redrawCanvas();
  } catch (err) {
    alert("Error parsing quiz file: " + err);
  }
}

// ===========================
// Hotspot Handling
// ===========================
document.getElementById("addHotspotBtn").addEventListener("click", () => {
  if (options.length === 0) { alert("Please add option images or texts first."); return; }
  if (hotspots.length >= options.length) { alert("You have already added hotspots for all options."); return; }
  let maxMarksInput = prompt("Enter maximum marks for this hotspot:", "1");
  let maxMarks = parseFloat(maxMarksInput);
  if (isNaN(maxMarks)) { maxMarks = 1; }
  const hotspot = {
    x: 50,
    y: 50,
    width: defaultHotspotWidth,
    height: defaultHotspotHeight,
    option: options[hotspots.length].label,
    placed: null,
    isCorrect: false,
    maxMarks
  };
  hotspots.push(hotspot);
  redrawCanvas();
});

// ===========================
// Clear Canvas
// ===========================
document.getElementById("clearCanvasBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the canvas? This removes images & hotspots.")) {
    baseImage = null; options = []; hotspots = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderOptionPanel();
    document.getElementById("addOptionBtn").disabled = true;
    document.getElementById("addOptionTextBtn").disabled = true;
    document.getElementById("addHotspotBtn").disabled = true;
  }
});

// ===========================
// Render Option Panel
// ===========================
function renderOptionPanel() {
  const panel = document.getElementById("optionPanel");
  panel.innerHTML = "";
  options.forEach((option, index) => {
    const optionItem = document.createElement("div");
    optionItem.className = "option-item";
    if (option.img) {
      const imgEl = document.createElement("img");
      imgEl.src = option.img.src;
      optionItem.appendChild(imgEl);
    } else if (option.text) {
      const textDiv = document.createElement("div");
      textDiv.textContent = option.text;
      textDiv.style.padding = "10px";
      textDiv.style.fontSize = "16px";
      textDiv.style.fontWeight = "bold";
      optionItem.appendChild(textDiv);
    }
    const label = document.createElement("span");
    label.className = "option-label";
    label.textContent = `Option ${option.label}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-option";
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", () => {
      options.splice(index, 1);
      options.forEach((opt, i) => { opt.label = String.fromCharCode(65 + i); });
      hotspots.forEach(h => { if (h.option === option.label) { h.option = options.length ? options[0].label : "A"; } });
      renderOptionPanel();
      redrawCanvas();
    });
    const settings = document.createElement("div");
    settings.className = "option-settings";
    const correctCheckbox = document.createElement("input");
    correctCheckbox.type = "checkbox";
    correctCheckbox.className = "is-correct";
    correctCheckbox.checked = option.isCorrect;
    correctCheckbox.addEventListener("change", () => { option.isCorrect = correctCheckbox.checked; });
    const correctLabel = document.createElement("label");
    correctLabel.appendChild(correctCheckbox);
    correctLabel.appendChild(document.createTextNode("Mark as correct"));
    settings.appendChild(correctLabel);
    optionItem.appendChild(label);
    optionItem.appendChild(deleteBtn);
    optionItem.appendChild(settings);
    panel.appendChild(optionItem);
  });
  addTouchDragSupport();
}

// ===========================
// Redraw Canvas (Create Tab)
// ===========================
function redrawCanvas() {
  if (!baseImage) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage.img, 0, 0, baseImage.width, baseImage.height);
  hotspots.forEach(h => {
    ctx.beginPath();
    ctx.rect(h.x, h.y, h.width, h.height);
    ctx.strokeStyle = "red"; 
    ctx.lineWidth = 2; 
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fillRect(h.x + h.width - 30, h.y + h.height - 30, 30, 30);
    ctx.strokeStyle = "#888";
    ctx.strokeRect(h.x + h.width - 30, h.y + h.height - 30, 30, 30);
    // In create view, show intended answer for guidance.
    ctx.fillStyle = "#000"; 
    ctx.font = "16px Arial";
    ctx.fillText(h.option, h.x + 5, h.y + 20);
    ctx.fillStyle = "blue"; 
    ctx.font = "14px Arial";
    ctx.fillText("Max: " + h.maxMarks, h.x + 5, h.y + 40);
  });
}

// ===========================
// Drag & Resize Hotspots (Create Tab)
// ===========================
const handleSize = 30;
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const h = hotspots[i];
    if (x >= h.x + h.width - handleSize && x <= h.x + h.width &&
        y >= h.y + h.height - handleSize && y <= h.y + h.height) {
      resizingHotspot = h;
      startX = x; startY = y;
      return;
    }
  }
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const h = hotspots[i];
    if (x >= h.x && x <= h.x + h.width &&
        y >= h.y && y <= h.y + h.height) {
      draggedHotspot = h;
      dragOffsetX = x - h.x;
      dragOffsetY = y - h.y;
      break;
    }
  }
});
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  let hoverOnResize = false;
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const h = hotspots[i];
    if (x >= h.x + h.width - handleSize && x <= h.x + h.width &&
        y >= h.y + h.height - handleSize && y <= h.y + h.height) {
      hoverOnResize = true;
      break;
    }
  }
  canvas.style.cursor = hoverOnResize ? "se-resize" : (draggedHotspot ? "move" : "default");
  if (resizingHotspot) {
    let newWidth = resizingHotspot.width + (x - startX);
    let newHeight = resizingHotspot.height + (y - startY);
    resizingHotspot.width = Math.max(newWidth, 20);
    resizingHotspot.height = Math.max(newHeight, 20);
    defaultHotspotWidth = resizingHotspot.width;
    defaultHotspotHeight = resizingHotspot.height;
    startX = x; startY = y;
    redrawCanvas();
  } else if (draggedHotspot) {
    draggedHotspot.x = x - dragOffsetX;
    draggedHotspot.y = y - dragOffsetY;
    redrawCanvas();
  }
});
canvas.addEventListener("mouseup", () => { draggedHotspot = null; resizingHotspot = null; });
canvas.addEventListener("mouseleave", () => { draggedHotspot = null; resizingHotspot = null; });
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left, y = touch.clientY - rect.top;
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const h = hotspots[i];
    if (x >= h.x + h.width - handleSize && x <= h.x + h.width &&
        y >= h.y + h.height - handleSize && y <= h.y + h.height) {
      resizingHotspot = h;
      startX = x; startY = y;
      return;
    }
  }
  for (let i = hotspots.length - 1; i >= 0; i--) {
    const h = hotspots[i];
    if (x >= h.x && x <= h.x + h.width &&
        y >= h.y && y <= h.y + h.height) {
      draggedHotspot = h;
      dragOffsetX = x - h.x;
      dragOffsetY = y - h.y;
      break;
    }
  }
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left, y = touch.clientY - rect.top;
  if (resizingHotspot) {
    let newWidth = resizingHotspot.width + (x - startX);
    let newHeight = resizingHotspot.height + (y - startY);
    resizingHotspot.width = Math.max(newWidth, 20);
    resizingHotspot.height = Math.max(newHeight, 20);
    defaultHotspotWidth = resizingHotspot.width;
    defaultHotspotHeight = resizingHotspot.height;
    startX = x; startY = y;
    redrawCanvas();
  } else if (draggedHotspot) {
    draggedHotspot.x = x - dragOffsetX;
    draggedHotspot.y = y - dragOffsetY;
    redrawCanvas();
  }
});
canvas.addEventListener("touchend", () => { draggedHotspot = null; resizingHotspot = null; });

// ===========================
// Preview Tab Functions
// ===========================
function updatePreview() {
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  if (!baseImage) return;
  previewCtx.drawImage(baseImage.img, 0, 0, canvas.width, canvas.height);
  hotspots.forEach(h => {
    if (h.placed) {
      const opt = options.find(o => o.label === h.placed);
      if (opt) {
        if (opt.img) { previewCtx.drawImage(opt.img, h.x, h.y, h.width, h.height); }
        else if (opt.text) { drawTextInHotspot(previewCtx, opt.text, h.x, h.y, h.width, h.height); }
      }
    }
    previewCtx.beginPath();
    previewCtx.rect(h.x, h.y, h.width, h.height);
    previewCtx.strokeStyle = quizTested ? (h.isCorrect ? "green" : "red") : "#888";
    previewCtx.lineWidth = 2;
    previewCtx.stroke();
  });
  document.getElementById("resultMessage").style.display = "none";
  renderDraggableOptions_Preview();
}
function renderDraggableOptions_Preview() {
  const container = document.getElementById("draggableOptionsContainer");
  container.innerHTML = "";
  options.forEach(option => {
    let elem;
    if (option.img) {
      elem = document.createElement("img");
      elem.src = option.img.src; 
      elem.alt = "Option " + option.label;
      elem.style.maxWidth = "100px"; 
      elem.style.maxHeight = "100px";
    } else if (option.text) {
      elem = document.createElement("div");
      elem.textContent = option.text;
      elem.style.padding = "10px"; 
      elem.style.border = "1px solid #ccc";
      elem.style.display = "inline-block"; 
      elem.style.fontSize = "16px"; 
      elem.style.fontWeight = "bold";
    }
    elem.setAttribute("draggable", "true"); 
    elem.dataset.label = option.label;
    elem.className = "draggable-option";
    elem.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", option.label); });
    container.appendChild(elem);
  });
  addTouchDragSupport();
}
previewCanvas.addEventListener("dragover", (e) => { e.preventDefault(); });
previewCanvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const droppedOptionLabel = e.dataTransfer.getData("text/plain");
  const rect = previewCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  let foundHotspot = hotspots.find(h =>
    x >= h.x && x <= h.x + h.width && y >= h.y && y <= h.y + h.height
  );
  if (foundHotspot) { foundHotspot.placed = droppedOptionLabel; updatePreview(); }
});
document.getElementById("testQuizBtn_preview").addEventListener("click", () => {
  let allPlaced = hotspots.every(h => h.placed);
  if (!allPlaced) { alert("Please drop all option images/texts onto the hotspots before testing the quiz."); return; }
  quizTested = true;
  let score = 0;
  hotspots.forEach(h => {
    h.isCorrect = (h.placed === h.option);
    if (h.isCorrect) { score += h.maxMarks; }
  });
  updatePreview();
  let totalScore = hotspots.reduce((sum, h) => sum + h.maxMarks, 0);
  document.getElementById("resultMessage").textContent = "Your score: " + score + " / " + totalScore;
  document.getElementById("resultMessage").className = (score === totalScore) ? "result-message success" : "result-message error";
  document.getElementById("resultMessage").style.display = "block";
});
document.getElementById("resetQuizBtn").addEventListener("click", () => {
  quizTested = false;
  hotspots.forEach(h => { h.placed = null; });
  document.getElementById("resultMessage").style.display = "none";
  updatePreview();
});

// ===========================
// Helper: Wrap & Draw Text in Hotspots
// ===========================
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) { currentLine += " " + word; }
    else { lines.push(currentLine); currentLine = word; }
  }
  lines.push(currentLine);
  return lines;
}
function drawTextInHotspot(ctx, text, x, y, width, height) {
  let fontSize = Math.floor(height * 0.5);
  let lines = [];
  while (fontSize > 5) {
    ctx.font = fontSize + "px Arial";
    lines = wrapText(ctx, text, width - 10);
    const lineHeight = fontSize * 1.2;
    if (lines.length * lineHeight <= height) break;
    fontSize--;
  }
  const lineHeight = fontSize * 1.2;
  const totalTextHeight = lines.length * lineHeight;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  for (let i = 0; i < lines.length; i++) {
    const lineY = y + (height - totalTextHeight) / 2 + i * lineHeight + lineHeight / 2;
    ctx.fillText(lines[i], x + width / 2, lineY);
  }
}
// Mobile Touch Drag Support (Updated)
function addTouchDragSupport() {
  let touchItem = null;
  let offsetX = 0, offsetY = 0;
  const optionsElems = document.querySelectorAll(".draggable-option");
 optionsElems.forEach(elem => {
    elem.addEventListener("touchstart", (e) => {
      e.preventDefault();
      touchItem = elem.cloneNode(true);
      touchItem.style.position = "absolute";
      touchItem.style.opacity = "0.7";
      document.body.appendChild(touchItem);
      const touch = e.touches[0];
      const rect = elem.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      touchItem.style.left = (touch.clientX - offsetX) + "px";
      touchItem.style.top = (touch.clientY - offsetY) + "px";
    });
    elem.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if(touchItem) {
        const touch = e.touches[0];
        touchItem.style.left = (touch.clientX - offsetX) + "px";
        touchItem.style.top = (touch.clientY - offsetY) + "px";
      }
    });
    elem.addEventListener("touchend", (e) => {
      e.preventDefault();
      if(touchItem) {
        let activeCanvas = document.getElementById("quizCanvas") || canvas;
        const canvasRect = activeCanvas.getBoundingClientRect();
        const scaleX = activeCanvas.width / canvasRect.width;
        const scaleY = activeCanvas.height / canvasRect.height;
        const touch = e.changedTouches[0];
        const x = (touch.clientX - canvasRect.left) * scaleX;
        const y = (touch.clientY - canvasRect.top) * scaleY;
        let currentHotspots = (typeof quizData !== "undefined") ? quizData.hotspots : hotspots;
        let foundHotspot = currentHotspots.find(h =>
          x >= h.x && x <= (h.x + h.width) && y >= h.y && y <= (h.y + h.height)
        );
        if(foundHotspot) {
          foundHotspot.placed = elem.dataset.label;
          if (typeof redrawCanvasContent === "function") {
            redrawCanvasContent();
          } else if (document.getElementById("previewTab").classList.contains("active")) {
            updatePreview();
          } else {
            redrawCanvas();
          }
        }
        touchItem.parentNode.removeChild(touchItem);
        touchItem = null;
      }
    });
  });
}
