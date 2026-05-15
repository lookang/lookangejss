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
