import "../../css/pages/create-mind-map.scss";
import handleAnswer from "../common";
import { loadAnswer, getFactorId, generateExportData } from "../common";
import html2pdf from "html2pdf.js";

export default async function CreateMindMap() {
  handleAnswer(getFactorId());

  var modal = document.getElementById("tipsModal");

  var btn = document.getElementById("tipsBtn");

  var span = document.getElementsByClassName("close-btn")[0];
  var selected_purpose = document.getElementsByClassName(
    "mindmap-selected-purpose",
  )[0];

  let purpose_value = loadAnswer({
    factorId: "create-mindmap-datastore",
    key: "mindmap-selected-purpose",
  }); 
  
  selected_purpose.textContent = purpose_value;

  function getEdgePoint(fromRect, toRect, containerRect) {
    const fromX = fromRect.left + fromRect.width / 2;
    const fromY = fromRect.top + fromRect.height / 2;
    const toX = toRect.left + toRect.width / 2;
    const toY = toRect.top + toRect.height / 2;
    const dx = toX - fromX;
    const dy = toY - fromY;

    if (dx === 0 && dy === 0) {
      return {
        x: fromX - containerRect.left,
        y: fromY - containerRect.top,
      };
    }

    const scaleX = Math.abs(dx) > 0 ? fromRect.width / 2 / Math.abs(dx) : Infinity;
    const scaleY = Math.abs(dy) > 0 ? fromRect.height / 2 / Math.abs(dy) : Infinity;
    const scale = Math.min(scaleX, scaleY);

    return {
      x: fromX + dx * scale - containerRect.left,
      y: fromY + dy * scale - containerRect.top,
    };
  }

  function updateMindMapLines() {
    const mindmapArea = document.querySelector("#create-mind-map .mindmap-area");
    const svg = document.querySelector("#create-mind-map .lines-svg");
    const centerNode = document.querySelector("#create-mind-map .center-node");
    const roleInputs = document.querySelectorAll('#create-mind-map input[class^="answer-"]');
    const lines = document.querySelectorAll("#create-mind-map .line");

    if (!mindmapArea || !svg || !centerNode || roleInputs.length !== lines.length) return;

    const containerRect = mindmapArea.getBoundingClientRect();
    const centerRect = centerNode.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);

    roleInputs.forEach((input, index) => {
      const inputRect = input.getBoundingClientRect();
      const start = getEdgePoint(centerRect, inputRect, containerRect);
      const end = getEdgePoint(inputRect, centerRect, containerRect);
      const line = lines[index];

      line.setAttribute("x1", start.x);
      line.setAttribute("y1", start.y);
      line.setAttribute("x2", end.x);
      line.setAttribute("y2", end.y);
    });
  }

  requestAnimationFrame(updateMindMapLines);
  window.addEventListener("resize", updateMindMapLines);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(updateMindMapLines);
    const mindmapArea = document.querySelector("#create-mind-map .mindmap-area");
    if (mindmapArea) observer.observe(mindmapArea);
  }

  btn.onclick = function () {
    modal.style.display = "flex";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const createBtn = document.getElementById("create-submit-btn");
  const errorDiv = document.getElementById("validation-error");
  const allInputs = document.querySelectorAll("[class*=answer-]");
  const exportCanvas = document.querySelector("#export-canvas");
  const exportPdfButton = document.getElementById("exportPdfButton");

  if (exportPdfButton) {
    exportPdfButton.addEventListener("click", async () => {
      await Promise.all([
        exportCanvas &&
          fetch("./pages/export-file-mind-map.html")
            .then((res) => {
              return res.text();
            })
            .then((data) => {
              exportCanvas.innerHTML = data;
            }),
      ]);

      const pdfContent = document.getElementById("pdf-content");

      if (!pdfContent) return;

      await generateExportData();

      exportCanvas.classList.remove("is-hidden");

      const options = {
        margin: 5,
        filename: "Pathfinder_Mindmap.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: true,
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },

        pagebreak: {
          mode: ["css", "avoid-all"],
        },
      };

      html2pdf()
        .from(pdfContent)
        .set(options)
        .save()
        .then(() => {
          exportCanvas.classList.add("is-hidden");
          location.reload();
        });
    });
  }

  createBtn.addEventListener("click", () => {
    let hasValue = false;

    for (const input of allInputs) {
      if (input.value.trim() !== "") {
        hasValue = true;
      } else {
        hasValue = false;
        break;
      }
    }

    if (!hasValue) {
      errorDiv.style.display = "block";
      allInputs.forEach((input) => input.classList.add("error"));
      allInputs[0].focus();
    } else {
      errorDiv.style.display = "none";
      allInputs.forEach((input) => input.classList.remove("error"));
      navigateTo("#explore-multiple-pathways-1");
    }
  });

  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        errorDiv.style.display = "none";
        allInputs.forEach((i) => i.classList.remove("error"));
      }
    });
  });
}
