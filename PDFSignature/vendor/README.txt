Local vendor libraries for PDF_Signature_Helper

This app prefers local copies of pdf-lib and pdf.js. If these files are present, the page will load them locally; if not, it falls back to the CDNs.

Create these files:
1) vendor/pdf-lib/pdf-lib.min.js
   - Source (download in your browser or via curl):
     https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js

2) vendor/pdfjs/pdf.min.js
   - Source:
     https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js

3) vendor/pdfjs/pdf.worker.min.js
   - Source:
     https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js

Option A — Download in your browser (recommended if CLI has network limits)
- Open each URL above in your browser
- Save the file to the matching path inside this project:
  - vendor/pdf-lib/pdf-lib.min.js
  - vendor/pdfjs/pdf.min.js
  - vendor/pdfjs/pdf.worker.min.js
- Create folders if they don’t exist

Option B — Use curl (may require network access)
mkdir -p vendor/pdf-lib vendor/pdfjs
curl -L -o vendor/pdf-lib/pdf-lib.min.js https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js
curl -L -o vendor/pdfjs/pdf.min.js https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js
curl -L -o vendor/pdfjs/pdf.worker.min.js https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js

Verifying local load:
- Open PDF_Signature_Helper.html in your browser.
- Temporarily go offline (or block CDN) to ensure the page still works. If the preview renders and export works, the local files are being used.
- If preview fails while offline, ensure all three files are present and not blocked by your system.

Notes:
- The loader in PDF_Signature_Helper.html tries local first and only uses CDN if the global objects are missing or the worker fails. Once these files exist locally, the app will use them automatically.
- If you update these libraries later, keep the same filenames so the page picks them up without changes.
