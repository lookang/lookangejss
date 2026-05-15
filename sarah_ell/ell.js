"use strict";

/**
 * ELL End of Course Survey 2025 – Web Report
 * Static, client-side implementation that replicates the notebook logic:
 * - Load data from CSV/XLSX (upload) or CSV URL (e.g., Google Sheets published to web)
 * - Normalize columns (remove colons, trim), canonicalize responses
 * - Overview: respondents by school (bar + table)
 * - Sections/questions: fuzzy match columns, % by school, stacked bar + table
 * - Export PDF of current page
 */

/* ----------------------------- Config & Data ----------------------------- */

const SECTIONS = [
  {
    title: "Section 1: Motivations and Influence",
    questions: [
      "I offered H2 ELL out of interest.",
      "What I had heard about ELL from my seniors had influenced my decision to choose the subject.",
      "One of the reasons I had chosen my JC was that it offers ELL.",
    ],
  },
  {
    title: "Section 2: Achievement of ELL's Aims and Goals",
    questions: [
      "What I have learnt in ELL has helped me to analyse and evaluate the influence of contextual and cultural factors in the production and reception of the English language.",
      "What I have learnt in ELL has provided me with a foundation in linguistics.",
      "I understand the English language better.",
      "I like the English language more.",
    ],
  },
  {
    title: "Section 3: Achievement of ELL's Learning Objectives for ELL Area of Study 1",
    questions: [
      "What I have learnt from ELL Paper 1 is interesting.",
      "What I have learnt from ELL Paper 1 has enabled me to describe and distinguish between the linguistic features of written, spoken and multimodal texts.",
      "What I have learnt from ELL Paper 1 has helped me become more aware of how effective writing needs to have a clear purpose and a particular audience, within a certain context and culture.",
      "What I have learnt from ELL Paper 1 has helped me become more aware of the features of different genres.",
      "What I have learnt from ELL Paper 1 has provided me with the skill to analyse how meaning is constructed in different texts.",
      "What I have learnt from ELL Paper 1 has provided me with the skill to make appropriate linguistic choices in writing for specific audiences, purposes, contexts and cultures.",
      "What I have learnt from ELL Paper 1 has provided me with the skill to comment on linguistic choices in writing for specific audiences, purposes, contexts and cultures.",
    ],
  },
  {
    title: "Section 4: Achievement of ELL's Learning Objectives for ELL Area of Study 2",
    questions: [
      "What I have learnt from ELL Paper 2 is interesting.",
      "What I have learnt from ELL Paper 2 has enabled me to distinguish between language variation and language change.",
      "What I have learnt from ELL Paper 2 has enabled me to comment on trends and patterns in language variation and language change.",
      "What I have learnt from ELL Paper 2 has enabled me to use and explain key concepts that relate to different varieties of English.",
      "What I have learnt from ELL Paper 2 has given me an understanding of how patterns and trends in the use of the English language reflect as well as influence identity, attitudes, behaviour and relationships.",
    ],
  },
  {
    title: "Section 5: Perceptions on the ELL Teaching and Learning Experience",
    questions: [
      "I have opportunities to engage in dialogue regarding ELL issues with my peers and teacher(s) -- this includes both face-to-face and or online platforms.",
      "I research for ELL materials to supplement my own learning.",
      "I find teacher feedback on my work useful.",
      "My peers and I provide comments on each other's work.",
      "I find peer feedback on my work useful.",
      "I collaborate with my peers in the process of studying and learning about ELL.",
      "I am aware of my learning needs in ELL.",
      "I know how I can work towards improving my learning in ELL.",
      "I set learning goals for myself in ELL.",
      "I plan and monitor my learning and understanding of ELL through reflection and questioning.",
    ],
  },
  {
    title: "Section 6: Future Aspirations",
    questions: [
      "I still think ELL is useful for future career options.",
      "I would want to read English Language / Linguistics at university.",
      "I would consider a career that will exercise and hone the skills that I have acquired from ELL.",
      "I would consider being an English Language or ELL teacher in the future.",
    ],
  },
];

const STANDARD_ORDERS = {
  agreement: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
  frequency: ["Very often", "Often", "Sometimes", "Rarely", "Limited"],
  yes_no: ["Yes", "No"],
};

// Preferred display order for schools from notebook
const SCHOOL_ORDER = [
  "Anglo-Chinese Junior College",
  "Catholic Junior College",
  "Dunman High School",
  "Hwa Chong Institution",
  "National Junior College",
  "Raffles Institution",
];

/* ----------------------------- DOM Elements ----------------------------- */

const $file = document.getElementById("file-input");
const $btnClear = document.getElementById("btn-clear");
const $csvUrl = document.getElementById("csv-url");
const $btnLoadUrl = document.getElementById("btn-load-url");

const $status = document.getElementById("status");
const $meta = document.getElementById("meta");
const $overviewChart = document.getElementById("overview-chart");
const $overviewTable = document.getElementById("overview-table");
const $sectionsContainer = document.getElementById("sections-container");
const $btnDocxMain = document.getElementById("btn-docx-main");
const $btnDocxSchoolsZip = document.getElementById("btn-docx-schools-zip");

/* --------------------------------- State -------------------------------- */

let DATA_ROWS = []; // array of row objects with normalized headers
let COLUMNS = []; // normalized column names
let SCHOOL_KEY = "School"; // unified school column key

/* ------------------------------- Listeners ------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  $file?.addEventListener("change", onFileChange);
  $btnLoadUrl?.addEventListener("click", onLoadUrl);
  $btnClear?.addEventListener("click", clearAll);
  $btnDocxMain?.addEventListener("click", onDownloadDocxMain);
  $btnDocxSchoolsZip?.addEventListener("click", onDownloadDocxSchoolsZip);
});

/* --------------------------------- Utils -------------------------------- */

function setStatus(html, type = "ok") {
  $status.innerHTML = `<div class="${type === "ok" ? "ok" : "warn"}">${html}</div>`;
}

function nowStr() {
  return new Date().toLocaleString();
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function trimAll(str) {
  return String(str ?? "").trim();
}

function normalizeHeaderKey(k) {
  // Remove colons and excessive spaces
  return trimAll(String(k).replace(/:/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeaders(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === null || typeof k === "undefined" || k === "") continue;
    const nk = normalizeHeaderKey(k);
    out[nk] = v;
  }
  return out;
}

function normalizeValue(v) {
  if (v === null || typeof v === "undefined") return "";
  if (typeof v === "string") return v.trim();
  return v;
}

function detectSchoolKey(columns) {
  if (columns.includes("School")) return "School";
  if (columns.includes("School:")) return "School"; // will be normalized
  // Fallback: find a column whose name contains 'school' (case-insensitive)
  const c = columns.find((c) => c.toLowerCase().includes("school"));
  return c ? normalizeHeaderKey(c) : "School";
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function sortSchools(schools) {
  const set = new Set(schools);
  const preferred = SCHOOL_ORDER.filter((s) => set.has(s));
  const others = schools.filter((s) => !SCHOOL_ORDER.includes(s)).sort((a, b) => a.localeCompare(b));
  return [...preferred, ...others];
}

const STOPWORDS = new Set([
  "the", "of", "and", "to", "in", "has", "have", "what", "i", "my", "is", "are", "be", "been",
  "me", "a", "an", "for", "on", "with", "from", "this", "that", "it", "paper", "ell",
  "english", "language", "area", "study", "1", "2", "jc", "teacher", "teachers",
  "needs", "need", "how"
]);

function normalizeText(s) {
  let out = String(s || "");
  // Unicode normalization to unify variants
  out = out.normalize ? out.normalize("NFKC") : out;
  // Normalize smart quotes and dashes
  out = out
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-");
  // Remove possessive endings like other's / others'
  out = out.replace(/\b(\w+)[’']s\b/gi, "$1");
  return out
    .toLowerCase()
    .replace(/[_/()[\].,;:!?'"`~@#$%^&*+=<>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(s) {
  const toks = normalizeText(s).split(" ").filter(Boolean);
  const out = new Set();
  for (let t of toks) {
    if (STOPWORDS.has(t)) continue;
    // simple plural -> singular (peers -> peer, goals -> goal), avoid 'ss'
    if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) {
      t = t.slice(0, -1);
    }
    out.add(t);
  }
  return out;
}

// Dice coefficient over character bigrams as an additional fuzzy metric
function diceCoefficient(a, b) {
  const sa = normalizeText(a).replace(/\s+/g, "");
  const sb = normalizeText(b).replace(/\s+/g, "");
  if (!sa.length || !sb.length) return 0;
  if (sa === sb) return 1;

  const bigrams = (str) => {
    const res = [];
    for (let i = 0; i < str.length - 1; i++) res.push(str.slice(i, i + 2));
    return res;
  };
  const aGrams = bigrams(sa);
  const bGrams = bigrams(sb);
  const bMap = new Map();
  for (const g of bGrams) bMap.set(g, (bMap.get(g) || 0) + 1);
  let matches = 0;
  for (const g of aGrams) {
    const count = bMap.get(g) || 0;
    if (count > 0) {
      matches++;
      bMap.set(g, count - 1);
    }
  }
  return (2 * matches) / (aGrams.length + bGrams.length);
}

/**
 * Fuzzy match question text to the best column.
 * Score = token overlap ratio with tie-break on substring presence.
 */
function findMatchingColumn(columns, question, threshold = 0.35) {
  const qTokens = tokenSet(question);
  if (qTokens.size === 0) return null;
  const qNorm = normalizeText(question);

  let best = { col: null, score: 0 };
  for (const col of columns) {
    const cTokens = tokenSet(col);
    if (cTokens.size === 0) continue;

    const common = [...qTokens].filter((t) => cTokens.has(t)).length;
    const union = new Set([...qTokens, ...cTokens]).size;
    const jaccard = union ? common / union : 0;

    const dice = diceCoefficient(col, question);

    const substrBoost =
      normalizeText(col).includes(qNorm) || qNorm.includes(normalizeText(col))
        ? 0.15
        : 0;

    const score = 0.7 * jaccard + 0.3 * dice + substrBoost;

    if (score > best.score) {
      best = { col, score };
    }
  }
  return best.score >= threshold ? best.col : null;
}

/**
 * Canonicalize response values to handle capitalization/variants.
 */
function canonicalizeResponse(val) {
  const s = String(val ?? "").trim();
  const low = s.toLowerCase();

  // agreement
  if (/^strongly\s*agree$/i.test(s)) return "Strongly Agree";
  if (/^agree$/i.test(s)) return "Agree";
  if (/^disagree$/i.test(s)) return "Disagree";
  if (/^strongly\s*disagree$/i.test(s)) return "Strongly Disagree";

  // frequency
  if (/^very\s*often$/i.test(s)) return "Very often";
  if (/^often$/i.test(s)) return "Often";
  if (/^sometimes$/i.test(s)) return "Sometimes";
  if (/^rarely$/i.test(s)) return "Rarely";
  if (/^limited$/i.test(s)) return "Limited";
  if (/^frequently$/i.test(s)) return "Often"; // map to Often bucket

  // yes/no
  if (low === "yes") return "Yes";
  if (low === "no") return "No";

  return s;
}

/**
 * Determine desired order for responses given observed values.
 */
function getResponseOrder(values) {
  const vals = unique(values.map(canonicalizeResponse)).filter((v) => v !== "");
  const lowVals = vals.map((v) => v.toLowerCase());

  const hasAgreement = lowVals.some((v) => v.includes("agree") || v.includes("disagree"));
  const hasFrequency =
    lowVals.some((v) => v.includes("often") || v.includes("sometimes") || v.includes("rarely") || v.includes("limited"));
  const isYesNo = vals.length <= 3 && vals.every((v) => ["yes", "no"].includes(v.toLowerCase()));

  if (hasAgreement) return STANDARD_ORDERS.agreement.filter((o) => vals.includes(o));
  if (hasFrequency) return STANDARD_ORDERS.frequency.filter((o) => vals.includes(o));
  if (isYesNo) return STANDARD_ORDERS.yes_no.filter((o) => vals.includes(o));

  return vals;
}

/* ------------------------------ Renderers ------------------------------- */

function renderOverview(rows) {
  $overviewChart.innerHTML = "";
  $overviewTable.innerHTML = "";

  const total = rows.length;
  const schools = sortSchools(unique(rows.map((r) => r[SCHOOL_KEY]).filter((s) => s && s !== "")));

  const counts = {};
  for (const s of schools) counts[s] = 0;
  for (const r of rows) {
    const s = r[SCHOOL_KEY];
    if (counts[s] !== undefined) counts[s]++;
  }

  const x = schools;
  const y = schools.map((s) => counts[s]);
  Plotly.newPlot(
    $overviewChart,
    [
      {
        type: "bar",
        x,
        y,
        text: y.map((n) => `${((n / total) * 100).toFixed(1)}%`),
        textposition: "auto",
        hovertemplate: "%{x}<br>Count: %{y}<br>% of total: %{text}<extra></extra>",
        marker: { color: "#2563eb" },
      },
    ],
    {
      title: "Distribution of Respondents by School",
      margin: { t: 40, r: 10, b: 60, l: 50 },
      yaxis: { title: "Count" },
      xaxis: { automargin: true },
    },
    { responsive: true }
  );

  // Table
  const table = document.createElement("table");
  table.className = "data-table";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>School</th><th>Count</th><th>% of total</th></tr>";
  const tbody = document.createElement("tbody");
  for (const s of schools) {
    const tr = document.createElement("tr");
    const pct = total ? ((counts[s] / total) * 100).toFixed(1) : "0.0";
    tr.innerHTML = `<td>${s}</td><td>${counts[s]}</td><td>${pct}%</td>`;
    tbody.appendChild(tr);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  $overviewTable.appendChild(table);
}

function renderSections(rows, columns) {
  $sectionsContainer.innerHTML = "";

  const schools = sortSchools(unique(rows.map((r) => r[SCHOOL_KEY]).filter((s) => s && s !== "")));

  for (const section of SECTIONS) {
    const secDiv = document.createElement("div");
    secDiv.className = "section-block";
    const h = document.createElement("h3");
    h.textContent = section.title;
    secDiv.appendChild(h);

    for (const question of section.questions) {
      const matchedCol = findMatchingColumn(columns, question, 0.35);
      const qDiv = document.createElement("div");
      qDiv.className = "question-block";

      const title = document.createElement("div");
      title.className = "question-title";
      title.textContent = matchedCol ? question : `${question} (no matching column found)`;
      qDiv.appendChild(title);

      if (!matchedCol) {
        const warn = document.createElement("div");
        warn.className = "warn";
        warn.textContent = "No matching column detected. You can adjust column names in your sheet to more closely match the question.";
        qDiv.appendChild(warn);
        secDiv.appendChild(qDiv);
        continue;
      }

      // Compute response % by school
      const perSchool = {};
      const observedValues = new Set();
      for (const s of schools) {
        const subset = rows.filter((r) => r[SCHOOL_KEY] === s);
        const counts = {};
        let denom = 0;
        for (const r of subset) {
          const vRaw = r[matchedCol];
          const v = canonicalizeResponse(vRaw);
          if (v === "") continue;
          counts[v] = (counts[v] || 0) + 1;
          denom++;
          observedValues.add(v);
        }
        const percentages = {};
        for (const [k, n] of Object.entries(counts)) {
          percentages[k] = denom ? (n / denom) * 100 : 0;
        }
        perSchool[s] = { counts, percentages, denom };
      }

      const order = getResponseOrder(Array.from(observedValues));
      if (!order.length) {
        const warn = document.createElement("div");
        warn.className = "warn";
        warn.textContent = "No responses detected for this question.";
        qDiv.appendChild(warn);
        secDiv.appendChild(qDiv);
        continue;
      }

      // Chart (stacked bar: % by school)
      const traces = order.map((opt) => {
        return {
          type: "bar",
          name: opt,
          x: schools,
          y: schools.map((s) => (perSchool[s].percentages[opt] || 0)),
          hovertemplate: "%{x}<br>" + opt + ": %{y:.1f}%<extra></extra>",
        };
      });

      const chartEl = document.createElement("div");
      chartEl.style.minHeight = "300px";
      qDiv.appendChild(chartEl);

      Plotly.newPlot(
        chartEl,
        traces,
        {
          barmode: "stack",
          margin: { t: 20, r: 10, b: 60, l: 50 },
          yaxis: { title: "Percentage", range: [0, 100], ticksuffix: "%" },
          xaxis: { automargin: true },
          legend: { orientation: "h", x: 0, y: 1.1 },
        },
        { responsive: true }
      );

      // Table of percentages
      const tableWrap = document.createElement("div");
      tableWrap.className = "scroll";
      tableWrap.style.marginTop = "8px";
      const table = document.createElement("table");
      table.className = "data-table";
      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      const thSchool = document.createElement("th");
      thSchool.textContent = "School";
      headRow.appendChild(thSchool);
      for (const opt of order) {
        const th = document.createElement("th");
        th.textContent = opt;
        headRow.appendChild(th);
      }
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      for (const s of schools) {
        const tr = document.createElement("tr");
        const tdSchool = document.createElement("td");
        tdSchool.textContent = s;
        tr.appendChild(tdSchool);
        for (const opt of order) {
          const td = document.createElement("td");
          const v = perSchool[s].percentages[opt] || 0;
          td.textContent = `${v.toFixed(1)}%`;
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      qDiv.appendChild(tableWrap);

      secDiv.appendChild(qDiv);
    }

    $sectionsContainer.appendChild(secDiv);
  }
}

/* ------------------------------ Data ingest ----------------------------- */

async function onFileChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  try {
    await loadFromFile(file);
  } catch (err) {
    console.error(err);
    setStatus("Failed to load file. Ensure it is a valid .xlsx or .csv.", "warn");
  }
}

async function onLoadUrl() {
  const url = ($csvUrl.value || "").trim();
  if (!url) {
    setStatus("Please provide a CSV URL.", "warn");
    return;
  }
  setStatus("Fetching CSV from URL...");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rows = parseCsvText(text);
    await finalizeDataset(rows);
  } catch (err) {
    console.error(err);
    setStatus("Failed to fetch/parse CSV. Ensure the link is a 'Publish to web' CSV and CORS-allowed.", "warn");
  }
}

async function loadFromFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) {
    setStatus("Parsing CSV...");
    const text = await file.text();
    const rows = parseCsvText(text);
    await finalizeDataset(rows);
  } else if (name.endsWith(".xlsx")) {
    setStatus("Reading Excel...");
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const firstSheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[firstSheetName];
    // Get AOA to preserve header row exactly
    const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    if (!aoa || aoa.length === 0) throw new Error("Empty sheet");
    const headers = (aoa[0] || []).map(normalizeHeaderKey);
    const body = aoa.slice(1);
    const rows = body.map((r) => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = normalizeValue(r[i]);
      });
      return obj;
    });
    await finalizeDataset(rows);
  } else {
    setStatus("Unsupported file type. Please upload .xlsx or .csv.", "warn");
  }
}

function parseCsvText(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: "greedy",
    dynamicTyping: false,
  });
  // Normalize headers and values, drop blank rows
  const rows = [];
  for (const row of result.data || []) {
    const nrow = normalizeHeaders(row);
    const hasAny = Object.values(nrow).some((v) => String(v ?? "").trim() !== "");
    if (hasAny) rows.push(nrow);
  }
  return rows;
}

async function finalizeDataset(rowsRaw) {
  // Normalize values
  const rows = rowsRaw.map((r) => {
    const out = {};
    for (const [k, v] of Object.entries(r)) out[k] = normalizeValue(v);
    return out;
  });

  // Determine school key and unify to "School"
  const rawColumns = unique(
    rows.flatMap((r) => Object.keys(r))
  );
  const detectedSchoolKey = detectSchoolKey(rawColumns);
  const normalizedRows = rows.map((r) => {
    const obj = {};
    for (const [k, v] of Object.entries(r)) {
      const nk = normalizeHeaderKey(k);
      // move detected school column to "School"
      if (nk === detectedSchoolKey) {
        obj["School"] = normalizeValue(v);
      } else {
        obj[nk] = normalizeValue(v);
      }
    }
    return obj;
  });

  // Filter out rows without School
  const filtered = normalizedRows.filter((r) => r["School"] && r["School"].trim() !== "");

  DATA_ROWS = filtered;
  COLUMNS = unique(filtered.flatMap((r) => Object.keys(r)));
  SCHOOL_KEY = "School";

  // Update UI meta
  const total = DATA_ROWS.length;
  const colCount = COLUMNS.length;
  const schools = sortSchools(unique(DATA_ROWS.map((r) => r[SCHOOL_KEY])));
  $meta.innerHTML = `Loaded <b>${total}</b> rows, <b>${colCount}</b> columns, <b>${schools.length}</b> schools. <span class="pill">Updated ${nowStr()}</span>`;
  setStatus(`Dataset loaded successfully with ${total} rows.`, "ok");

  // Render
  renderOverview(DATA_ROWS);
  renderSections(DATA_ROWS, COLUMNS);

  // Enable DOCX export
  if ($btnDocxMain) $btnDocxMain.disabled = false;
  if ($btnDocxSchoolsZip) $btnDocxSchoolsZip.disabled = false;
}

/* ------------------------------- DOCX Export ---------------------------- */

async function onDownloadDocxMain() {
  try {
    const blob = await buildMainDocx(DATA_ROWS);
    saveAs(blob, "ELL_End_of_Course_Survey_2025_Report_Professional.docx");
  } catch (e) {
    console.error(e);
    setStatus("Failed to generate DOCX main report.", "warn");
  }
}

async function onDownloadDocxSchoolsZip() {
  try {
    const schools = sortSchools(unique(DATA_ROWS.map((r) => r[SCHOOL_KEY]).filter((s) => s && s !== "")));
    const zip = new JSZip();
    for (const s of schools) {
      const blob = await buildSchoolDocx(DATA_ROWS, s);
      if (blob) {
        const safe = String(s).replace(/\s+/g, "_").replace(/[\/\\]/g, "_");
        const fname = `ELL_Survey_2025_${safe}_Report_Professional.docx`;
        zip.file(fname, blob);
      }
    }
    const out = await zip.generateAsync({ type: "blob" });
    saveAs(out, "ELL_Per_School_Reports.zip");
  } catch (e) {
    console.error(e);
    setStatus("Failed to generate per-school DOCX ZIP.", "warn");
  }
}

// Helpers to build DOCX with docx UMD library
function docxLoaded() {
  return typeof window.docx !== "undefined" || typeof docx !== "undefined";
}

function getDocx() {
  const lib = window.docx || docx;
  const {
    Document: DocxDocument,
    Packer,
    Paragraph,
    HeadingLevel,
    TextRun,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    WidthType,
  } = lib;
  return { DocxDocument, Packer, Paragraph, HeadingLevel, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType };
}

function paragraph(text, level = null) {
  const { Paragraph, HeadingLevel } = getDocx();
  if (level) {
    return new Paragraph({ text, heading: level });
  }
  return new Paragraph({ text });
}

function tableFromMatrix(headers, rows) {
  const { Table, TableRow, TableCell, Paragraph, WidthType } = getDocx();
  const headerCells = headers.map((h) => new TableCell({ children: [new Paragraph(String(h))] }));
  const docRows = [
    new TableRow({ children: headerCells }),
    ...rows.map((r) =>
      new TableRow({
        children: r.map((cell) => new TableCell({ children: [new Paragraph(String(cell))] })),
      })
    ),
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: docRows,
  });
}

function getSchools(rows) {
  return sortSchools(unique(rows.map((r) => r[SCHOOL_KEY]).filter((s) => s && s !== "")));
}

function countBy(arr, keyFn) {
  const m = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    m.set(k, (m.get(k) || 0) + 1);
  }
  return m;
}

async function buildMainDocx(rows) {
  if (!docxLoaded()) throw new Error("docx library not loaded");
  const { DocxDocument, Packer, HeadingLevel } = getDocx();

  const children = [];
  // Title and meta
  children.push(paragraph("ELL End of Course Survey 2025 Report", HeadingLevel.TITLE));
  children.push(paragraph(`Total number of respondents: ${rows.length}`));

  // Breakdown by school
  children.push(paragraph("Breakdown of respondents by school:", HeadingLevel.HEADING_2));
  const schools = getSchools(rows);
  const countsMap = countBy(rows, (r) => r[SCHOOL_KEY]);
  const breakdownRows = schools.map((s) => [s, countsMap.get(s) || 0]);
  children.push(tableFromMatrix(["School", "Count"], breakdownRows));

  // Sections and questions
  let qNum = 1;
  for (const section of SECTIONS) {
    children.push(paragraph(section.title, HeadingLevel.HEADING_1));

    for (const question of section.questions) {
      const matchedCol = findMatchingColumn(COLUMNS, question, 0.35);
      if (!matchedCol) continue;

      children.push(paragraph(`Q${qNum}: ${question}`, HeadingLevel.HEADING_3));

      // Compute percentages by school
      const observedValues = new Set();
      const perSchool = {};
      for (const s of schools) {
        const subset = rows.filter((r) => r[SCHOOL_KEY] === s);
        const counts = {};
        let denom = 0;
        for (const r of subset) {
          const v = canonicalizeResponse(r[matchedCol]);
          if (!v) continue;
          counts[v] = (counts[v] || 0) + 1;
          denom++;
          observedValues.add(v);
        }
        const percentages = {};
        for (const [k, n] of Object.entries(counts)) {
          percentages[k] = denom ? (n / denom) * 100 : 0;
        }
        perSchool[s] = { counts, percentages, denom };
      }
      const order = getResponseOrder(Array.from(observedValues));
      if (!order.length) continue;

      const headers = ["School", ...order];
      const dataRows = schools.map((s) => [s, ...order.map((opt) => `${(perSchool[s].percentages[opt] || 0).toFixed(1)}%`)]);
      children.push(tableFromMatrix(headers, dataRows));
      qNum++;
    }
  }

  const doc = new DocxDocument({ sections: [{ children }] });
  return await Packer.toBlob(doc);
}

async function buildSchoolDocx(rows, schoolName) {
  if (!docxLoaded()) throw new Error("docx library not loaded");
  const { DocxDocument, Packer, HeadingLevel } = getDocx();

  const schoolRows = rows.filter((r) => r[SCHOOL_KEY] === schoolName);
  if (!schoolRows.length) return null;

  const children = [];
  children.push(paragraph(`ELL End of Course Survey 2025 Report - ${schoolName}`, HeadingLevel.TITLE));
  children.push(paragraph(`School: ${schoolName}`));
  children.push(paragraph(`Number of respondents: ${schoolRows.length}`));

  let qNum = 1;
  for (const section of SECTIONS) {
    children.push(paragraph(section.title, HeadingLevel.HEADING_1));

    for (const question of section.questions) {
      const matchedCol = findMatchingColumn(COLUMNS, question, 0.35);
      if (!matchedCol) continue;

      children.push(paragraph(`Q${qNum}: ${question}`, HeadingLevel.HEADING_3));

      // Compute response counts and percentages for this school
      const counts = {};
      let denom = 0;
      for (const r of schoolRows) {
        const v = canonicalizeResponse(r[matchedCol]);
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
        denom++;
      }
      const order = getResponseOrder(Object.keys(counts));
      if (!order.length) continue;

      const dataRows = order.map((resp) => {
        const n = counts[resp] || 0;
        const pct = denom ? (n / denom) * 100 : 0;
        return [resp, n, `${pct.toFixed(1)}%`];
      });

      children.push(tableFromMatrix(["Response", "Count", "Percentage"], dataRows));
      qNum++;
    }
  }

  const doc = new DocxDocument({ sections: [{ children }] });
  return await Packer.toBlob(doc);
}

/* --------------------------------- Reset -------------------------------- */

function clearAll() {
  DATA_ROWS = [];
  COLUMNS = [];
  $file.value = "";
  $csvUrl.value = "";
  $status.innerHTML = "";
  $meta.innerHTML = "";
  $overviewChart.innerHTML = "";
  $overviewTable.innerHTML = "";
  $sectionsContainer.innerHTML = "";
  if ($btnDocxMain) $btnDocxMain.disabled = true;
  if ($btnDocxSchoolsZip) $btnDocxSchoolsZip.disabled = true;
  setStatus("Cleared.", "ok");
}
