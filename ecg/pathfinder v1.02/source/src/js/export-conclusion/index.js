import "../../css/pages/export-conclusion.scss";
import { generateExportData } from "../common";
import { SessionManager } from "../session";
import html2pdf from "html2pdf.js";

export default function ExportConclusion() {
  const exportCanvas = document.querySelector("#export-canvas");
  const exportPdfButton = document.getElementById('exportPdfButton');


  if (exportPdfButton) {
    exportPdfButton.addEventListener('click', async () => {
      await Promise.all([
        exportCanvas &&
        fetch("./pages/export-file.html")
          .then((res) => {

            return res.text();
          })
          .then((data) => {
            exportCanvas.innerHTML = data;
          })
      ]);

      const pdfContent = document.getElementById('pdf-content');

      if (!pdfContent) return;

      await generateExportData();

      exportCanvas.classList.remove('is-hidden');


      const options = {
        margin: 5,
        filename: 'Pathfinder_Mindmap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          logging: true,
          dpi: 192,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

        pagebreak: {
          mode: ['css', 'avoid-all']
        }
      };

      html2pdf().from(pdfContent).set(options).save().then(() => {
        exportCanvas.classList.add('is-hidden');
        location.reload();
      });
    });
  }


  const endButton = document.getElementById('endButton');

  endButton.addEventListener('click', () => {

    SessionManager.reset();
    navigateTo('#intro');
  });
}
