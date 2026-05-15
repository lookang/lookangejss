// Export Functions
export function generateQuizHTML(quizData, safeTitle, safeDesc, wrapText, drawTextInHotspot) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${safeTitle}</title>
      <style>
        html, body { margin: 0; padding: 0; height: 100vh; overflow: hidden; }
        body { font-family: Arial, sans-serif; text-align: center; padding: 15px; }
        canvas { 
          border: 1px solid #333; 
          display: block; 
          margin: 0 auto; 
          max-width: calc(100% - 32px); /* Account for body padding (30px) and borders (2px) */
        }
        .canvas-container {
          width: 100%;
          max-width: calc(100% - 32px);
          margin: 0 auto;
          position: relative;
        }
        .draggable-options { margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; align-items: center; }
        .draggable-option { border: 2px dashed #ccc; padding: 5px; cursor: move; }
        .draggable-option img { max-width: 100px; max-height: 100px; }
        #testQuizBtn { display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 20px; }
        #testQuizBtn:hover { background-color: #45a049; }
        h1 { display: none; }
      </style>
      <script src="xapiwrapper.min.js"></script>
    </head>
    <body>
      <h1>${safeTitle}</h1>
      ${safeDesc ? `<p>${safeDesc}</p>` : ""}
      <canvas id="quizCanvas" width="${quizData.baseWidth}" height="${quizData.baseHeight}"></canvas>
      <div class="draggable-options" id="draggableOptionsContainer"></div>
      <button id="testQuizBtn">Test Quiz</button>
      <div id="result" style="margin-top:20px;"></div>
      <script>
        ${wrapText.toString()}
        ${drawTextInHotspot.toString()}
        
        const quizData = ${JSON.stringify(quizData, null, 2)};
        // ... rest of the quiz logic ...
      </script>
    </body>
    </html>`;
}

// Export button click handler
export function initializeExport(hotspots, baseImage, options, wrapText, drawTextInHotspot) {
    document.getElementById("exportZipBtn").addEventListener("click", function() {
        try {
            const exportHotspots = hotspots.map(h => ({ ...h, placed: null }));
            const quizData = {
                title: document.getElementById("quizTitle").value,
                description: document.getElementById("quizDescription").value,
                baseImage: baseImage ? baseImage.img.src : null,
                baseWidth: baseImage ? baseImage.width : null,
                baseHeight: baseImage ? baseImage.height : null,
                options: options.map(o => ({
                    label: o.label,
                    ...(o.img ? { src: o.img.src } : { text: o.text }),
                    isCorrect: o.isCorrect
                })),
                hotspots: exportHotspots
            };

        const safeTitle = quizData.title.replace(/</g, "&lt;");
        const safeDesc = quizData.description.replace(/</g, "&lt;");
        
        const htmlContent = generateQuizHTML(quizData, safeTitle, safeDesc, wrapText, drawTextInHotspot);
        
        const zip = new JSZip();
        zip.file("index.html", htmlContent);
        zip.file("quiz.json", JSON.stringify(quizData, null, 2));
        
        fetch("xapiwrapper.min.js")
            .then(res => res.text())
            .then(xapiContent => {
                zip.file("xapiwrapper.min.js", xapiContent);
                return zip.generateAsync({ type: "blob" });
            })
            .then(zipBlob => {
                const a = document.createElement("a");
                const title = document.getElementById("quizTitle").value.trim() || "quiz";
                a.href = URL.createObjectURL(zipBlob);
                a.download = title + ".zip";
                a.click();
            })
            .catch(err => {
                console.error("Export ZIP error:", err);
            });
        } catch (err) {
            console.error("Export ZIP error:", err);
        }
    });
}