// ===== ELEMENT DATA GENERATION =====
// Exactly 20 elements with creative identifiers

const allElementsData = [
    {
        identifier: "SB-01",
        name: "Skybreeze",
        state: "Gas",
        meltingPoint: -259,
        boilingPoint: -253,
        color: "Colorless",
        protonNumber: 1,
        shells: 1,
        outermostElectrons: 1,
        atomicMass: 1.01,
        appearance: "An invisible, odorless gas that is the lightest substance known"
    },
    {
        identifier: "FL-02",
        name: "Floatium",
        state: "Gas",
        meltingPoint: -272,
        boilingPoint: -269,
        color: "Colorless",
        protonNumber: 2,
        shells: 1,
        outermostElectrons: 2,
        atomicMass: 4.00,
        appearance: "A colorless, odorless gas that makes balloons float"
    },
    {
        identifier: "MS-03",
        name: "Moonstone",
        state: "Solid",
        meltingPoint: 180,
        boilingPoint: 1342,
        color: "Silver-white",
        protonNumber: 3,
        shells: 2,
        outermostElectrons: 1,
        atomicMass: 6.94,
        appearance: "A soft, silvery-white solid that can be cut with a knife"
    },
    {
        identifier: "NC-06",
        name: "Nightcrystal",
        state: "Solid",
        meltingPoint: 3550,
        boilingPoint: 4827,
        color: "Black",
        protonNumber: 6,
        shells: 2,
        outermostElectrons: 4,
        atomicMass: 12.01,
        appearance: "A black solid that can form diamonds or graphite"
    },
    {
        identifier: "AF-07",
        name: "Airflow",
        state: "Gas",
        meltingPoint: -210,
        boilingPoint: -196,
        color: "Colorless",
        protonNumber: 7,
        shells: 2,
        outermostElectrons: 5,
        atomicMass: 14.01,
        appearance: "A colorless, odorless gas that makes up most of the air"
    },
    {
        identifier: "BR-08",
        name: "Breathium",
        state: "Gas",
        meltingPoint: -218,
        boilingPoint: -183,
        color: "Colorless",
        protonNumber: 8,
        shells: 2,
        outermostElectrons: 6,
        atomicMass: 16.00,
        appearance: "A colorless, odorless gas essential for breathing"
    },
    {
        identifier: "YM-09",
        name: "Yellowmist",
        state: "Gas",
        meltingPoint: -220,
        boilingPoint: -188,
        color: "Pale yellow",
        protonNumber: 9,
        shells: 2,
        outermostElectrons: 7,
        atomicMass: 19.00,
        appearance: "A pale yellow gas with a sharp, pungent odor"
    },
    {
        identifier: "QS-11",
        name: "Quicksilver",
        state: "Solid",
        meltingPoint: 98,
        boilingPoint: 883,
        color: "Silver-white",
        protonNumber: 11,
        shells: 3,
        outermostElectrons: 1,
        atomicMass: 22.99,
        appearance: "A soft, silvery-white solid that reacts vigorously with water"
    },
    {
        identifier: "FB-12",
        name: "Flashbright",
        state: "Solid",
        meltingPoint: 650,
        boilingPoint: 1090,
        color: "Gray-white",
        protonNumber: 12,
        shells: 3,
        outermostElectrons: 2,
        atomicMass: 24.31,
        appearance: "A shiny gray-white solid that burns with a brilliant white light"
    },
    {
        identifier: "SF-13",
        name: "Skyforge",
        state: "Solid",
        meltingPoint: 660,
        boilingPoint: 2519,
        color: "Silver-white",
        protonNumber: 13,
        shells: 3,
        outermostElectrons: 3,
        atomicMass: 26.98,
        appearance: "A lightweight, silvery-white solid used in cans and foil"
    },
    {
        identifier: "SP-16",
        name: "Sunpowder",
        state: "Solid",
        meltingPoint: 115,
        boilingPoint: 445,
        color: "Yellow",
        protonNumber: 16,
        shells: 3,
        outermostElectrons: 6,
        atomicMass: 32.07,
        appearance: "A bright yellow, brittle solid with a distinctive smell"
    },
    {
        identifier: "GS-17",
        name: "Greensting",
        state: "Gas",
        meltingPoint: -102,
        boilingPoint: -34,
        color: "Yellow-green",
        protonNumber: 17,
        shells: 3,
        outermostElectrons: 7,
        atomicMass: 35.45,
        appearance: "A yellow-green gas with a sharp, choking smell"
    },
    {
        identifier: "BB-20",
        name: "Bonebuilder",
        state: "Solid",
        meltingPoint: 842,
        boilingPoint: 1484,
        color: "Gray",
        protonNumber: 20,
        shells: 4,
        outermostElectrons: 2,
        atomicMass: 40.08,
        appearance: "A soft gray solid that forms the structure of bones and teeth"
    },
    {
        identifier: "MC-26",
        name: "Magnetcore",
        state: "Solid",
        meltingPoint: 1538,
        boilingPoint: 2862,
        color: "Silver-gray",
        protonNumber: 26,
        shells: 4,
        outermostElectrons: 2,
        atomicMass: 55.85,
        appearance: "A strong, magnetic silver-gray solid that rusts in air"
    },
    {
        identifier: "RG-29",
        name: "Redglow",
        state: "Solid",
        meltingPoint: 1085,
        boilingPoint: 2562,
        color: "Reddish-orange",
        protonNumber: 29,
        shells: 4,
        outermostElectrons: 1,
        atomicMass: 63.55,
        appearance: "A soft, reddish-orange solid with excellent electrical conductivity"
    },
    {
        identifier: "CF-35",
        name: "Crimsonflow",
        state: "Liquid",
        meltingPoint: -7,
        boilingPoint: 59,
        color: "Red-brown",
        protonNumber: 35,
        shells: 4,
        outermostElectrons: 7,
        atomicMass: 79.90,
        appearance: "A dark red-brown liquid that evaporates easily into a toxic gas"
    },
    {
        identifier: "MB-47",
        name: "Moonbeam",
        state: "Solid",
        meltingPoint: 962,
        boilingPoint: 2162,
        color: "Silver-white",
        protonNumber: 47,
        shells: 5,
        outermostElectrons: 1,
        atomicMass: 107.87,
        appearance: "A shiny, lustrous white solid that is the best conductor of electricity"
    },
    {
        identifier: "VD-53",
        name: "Violetdark",
        state: "Solid",
        meltingPoint: 114,
        boilingPoint: 184,
        color: "Violet-black",
        protonNumber: 53,
        shells: 5,
        outermostElectrons: 7,
        atomicMass: 126.90,
        appearance: "A shiny, violet-black solid that forms purple vapor when heated"
    },
    {
        identifier: "SU-79",
        name: "Sunstone",
        state: "Solid",
        meltingPoint: 1064,
        boilingPoint: 2856,
        color: "Yellow",
        protonNumber: 79,
        shells: 6,
        outermostElectrons: 1,
        atomicMass: 196.97,
        appearance: "A soft, bright yellow solid that doesn't tarnish or corrode"
    },
    {
        identifier: "HD-82",
        name: "Heavydull",
        state: "Solid",
        meltingPoint: 327,
        boilingPoint: 1749,
        color: "Gray",
        protonNumber: 82,
        shells: 6,
        outermostElectrons: 4,
        atomicMass: 207.2,
        appearance: "A heavy, soft gray solid that tarnishes to a dull finish"
    }
];

// Array of diverse gradient colors for randomization
const cardColorGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e8198b 0%, #c7eafd 100%)',
    'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    'linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)',
    'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
];

// MODIFIED: Global state management for freeform workspace
let elementsData = [];
let elementColorMap = {};
let draggedElement = null;
let draggedCard = null;
let touchOffset = { x: 0, y: 0 };

// NEW: Workspace cards tracking
let workspaceCards = []; // Array to store cards in workspace with their positions

// ===== LEVEL SYSTEM =====
let currentLevel = 1;

const levelConfig = {
    1: {
        hint: 'Level 1 — Classify by physical appearance: state and color only.',
        properties: [
            { key: 'state',  label: 'State', modalLabel: 'Physical State', format: function(v) { return v; } },
            { key: 'color',  label: 'Color', modalLabel: 'Color',          format: function(v) { return v; } }
        ]
    },
    2: {
        hint: 'Level 2 — Adds proton number and atomic mass. Do you see number patterns?',
        properties: [
            { key: 'state',        label: 'State',       modalLabel: 'Physical State', format: function(v) { return v; } },
            { key: 'color',        label: 'Color',       modalLabel: 'Color',          format: function(v) { return v; } },
            { key: 'protonNumber', label: 'Protons',     modalLabel: 'Proton Number',  format: function(v) { return v; } },
            { key: 'atomicMass',   label: 'Atomic Mass', modalLabel: 'Atomic Mass',    format: function(v) { return v; } }
        ]
    },
    3: {
        hint: 'Level 3 — Look at electron shells and outermost electrons. Which substances share these values?',
        properties: [
            { key: 'state',              label: 'State',       modalLabel: 'Physical State',      format: function(v) { return v; } },
            { key: 'color',              label: 'Color',       modalLabel: 'Color',               format: function(v) { return v; } },
            { key: 'protonNumber',       label: 'Protons',     modalLabel: 'Proton Number',       format: function(v) { return v; } },
            { key: 'atomicMass',         label: 'Atomic Mass', modalLabel: 'Atomic Mass',         format: function(v) { return v; } },
            { key: 'shells',             label: 'Shells',      modalLabel: 'Number of Shells',    format: function(v) { return v; } },
            { key: 'outermostElectrons', label: 'Outer e⁻',   modalLabel: 'Outermost Electrons', format: function(v) { return v; } }
        ]
    },
    4: {
        hint: 'Level 4 — Full data including melting and boiling points. Refine your classification!',
        properties: [
            { key: 'state',              label: 'State',       modalLabel: 'Physical State',      format: function(v) { return v; } },
            { key: 'color',              label: 'Color',       modalLabel: 'Color',               format: function(v) { return v; } },
            { key: 'protonNumber',       label: 'Protons',     modalLabel: 'Proton Number',       format: function(v) { return v; } },
            { key: 'atomicMass',         label: 'Atomic Mass', modalLabel: 'Atomic Mass',         format: function(v) { return v; } },
            { key: 'shells',             label: 'Shells',      modalLabel: 'Number of Shells',    format: function(v) { return v; } },
            { key: 'outermostElectrons', label: 'Outer e⁻',   modalLabel: 'Outermost Electrons', format: function(v) { return v; } },
            { key: 'meltingPoint',       label: 'Melt',        modalLabel: 'Melting Point',       format: function(v) { return v + '°C'; } },
            { key: 'boilingPoint',       label: 'Boil',        modalLabel: 'Boiling Point',       format: function(v) { return v + '°C'; } }
        ]
    }
};

// ===== SAMPLE ANSWER DATA =====
// Elements grouped by periods (same number of electron shells)
// and by groups (same number of outermost electrons)
const sampleAnswerData = {
    byPeriods: [
        { name: 'Period 1', subtitle: '1 Electron Shell',  identifiers: ['SB-01', 'FL-02'] },
        { name: 'Period 2', subtitle: '2 Electron Shells', identifiers: ['MS-03', 'NC-06', 'AF-07', 'BR-08', 'YM-09'] },
        { name: 'Period 3', subtitle: '3 Electron Shells', identifiers: ['QS-11', 'FB-12', 'SF-13', 'SP-16', 'GS-17'] },
        { name: 'Period 4', subtitle: '4 Electron Shells', identifiers: ['BB-20', 'MC-26', 'RG-29', 'CF-35'] },
        { name: 'Period 5', subtitle: '5 Electron Shells', identifiers: ['MB-47', 'VD-53'] },
        { name: 'Period 6', subtitle: '6 Electron Shells', identifiers: ['SU-79', 'HD-82'] }
    ],
    byGroups: [
        { name: 'Group 1', subtitle: '1 Outermost Electron',  identifiers: ['SB-01', 'MS-03', 'QS-11', 'RG-29', 'MB-47', 'SU-79'] },
        { name: 'Group 2', subtitle: '2 Outermost Electrons', identifiers: ['FL-02', 'FB-12', 'BB-20', 'MC-26'] },
        { name: 'Group 3', subtitle: '3 Outermost Electrons', identifiers: ['SF-13'] },
        { name: 'Group 4', subtitle: '4 Outermost Electrons', identifiers: ['NC-06', 'HD-82'] },
        { name: 'Group 5', subtitle: '5 Outermost Electrons', identifiers: ['AF-07'] },
        { name: 'Group 6', subtitle: '6 Outermost Electrons', identifiers: ['BR-08', 'SP-16'] },
        { name: 'Group 7', subtitle: '7 Outermost Electrons', identifiers: ['YM-09', 'GS-17', 'CF-35', 'VD-53'] }
    ]
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    elementsData = allElementsData;
    assignRandomColors();
    renderElementCards();
});

function assignRandomColors() {
    elementColorMap = {};
    elementsData.forEach((element, index) => {
        const randomColorIndex = Math.floor(Math.random() * cardColorGradients.length);
        elementColorMap[element.identifier] = cardColorGradients[randomColorIndex];
    });
}

function initializeApp() {
    workspaceCards = [];
    document.body.dataset.level = 1;
    document.querySelector('.info-icon').title = levelConfig[1].hint;
}

// ===== EVENT LISTENERS SETUP =====
// MODIFIED: Changed event listeners for new workspace functionality
function setupEventListeners() {
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetWorkspace);

    // Download Picture button
    document.getElementById('downloadPictureBtn').addEventListener('click', downloadPicture);

    // Sample Answer button
    document.getElementById('sampleAnswerBtn').addEventListener('click', showSampleAnswer);

    // Level buttons
    document.querySelectorAll('.level-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            setLevel(parseInt(btn.dataset.level));
        });
    });

    // Element modal close
    const modal = document.getElementById('elementModal');
    const closeBtn = document.querySelector('#elementModal .modal-close');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Sample answer modal close
    const saModal = document.getElementById('sampleAnswerModal');
    document.getElementById('sampleAnswerClose').addEventListener('click', closeSampleAnswer);
    saModal.addEventListener('click', function(e) {
        if (e.target === saModal) closeSampleAnswer();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeSampleAnswer();
        }
    });
}

// ===== DOWNLOAD PICTURE FUNCTIONALITY =====
// Pure Canvas 2D implementation — no external library required (SLS-compatible)

// Parse a CSS linear-gradient string into a CanvasGradient for a given rectangle
function parseGradientForCanvas(ctx, gradientStr, x, y, w, h) {
    const match = gradientStr.match(/linear-gradient\((\d+)deg,\s*(.+)\)/);
    if (!match) return '#667eea';

    const angle = parseInt(match[1]);
    const stopsStr = match[2];

    // Convert CSS angle (clockwise from north) to canvas line endpoints
    const rad = (angle - 90) * Math.PI / 180;
    const cx = x + w / 2, cy = y + h / 2;
    const halfLen = Math.sqrt(w * w + h * h) / 2;
    const x0 = cx - Math.cos(rad) * halfLen;
    const y0 = cy - Math.sin(rad) * halfLen;
    const x1 = cx + Math.cos(rad) * halfLen;
    const y1 = cy + Math.sin(rad) * halfLen;

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

    // Split stops by commas not inside parentheses
    const stops = stopsStr.split(/,(?![^(]*\))/);
    stops.forEach(function(stop) {
        const parts = stop.trim().match(/^(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\))\s+(\d+(?:\.\d+)?)%$/);
        if (parts) {
            gradient.addColorStop(parseFloat(parts[2]) / 100, parts[1]);
        }
    });

    return gradient;
}

// Draw a rounded rectangle path (helper — no fill/stroke called here)
function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function downloadPicture() {
    if (workspaceCards.length === 0) {
        alert('Please add some element cards to the workspace before downloading!');
        return;
    }

    const workspace = document.getElementById('freeformWorkspace');
    const scale = 2; // Retina-quality output
    const cardW = 120, cardH = 50, cardR = 8;

    // Canvas covers the full scrollable workspace area
    const canvasW = workspace.offsetWidth;
    const canvasH = Math.max(workspace.scrollHeight, workspace.clientHeight);

    const canvas = document.createElement('canvas');
    canvas.width  = canvasW * scale;
    canvas.height = canvasH * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // --- Background ---
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // --- Grid pattern (matches CSS background-image) ---
    ctx.strokeStyle = 'rgba(102, 126, 234, 0.05)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= canvasW; gx += 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvasH); ctx.stroke();
    }
    for (let gy = 0; gy <= canvasH; gy += 20) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvasW, gy); ctx.stroke();
    }

    // --- Draw each workspace card ---
    workspaceCards.forEach(function(cardData) {
        const { element, x, y } = cardData;

        // Card gradient fill
        const grad = parseGradientForCanvas(ctx, elementColorMap[element.identifier], x, y, cardW, cardH);
        roundedRect(ctx, x, y, cardW, cardH, cardR);
        ctx.fillStyle = grad;
        ctx.fill();

        // Card border
        roundedRect(ctx, x, y, cardW, cardH, cardR);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Decorative highlight overlay (top-right radial)
        const highlight = ctx.createRadialGradient(
            x + cardW, y, 0,
            x + cardW, y, cardW * 0.8
        );
        highlight.addColorStop(0, 'rgba(255,255,255,0.18)');
        highlight.addColorStop(1, 'rgba(255,255,255,0)');
        roundedRect(ctx, x, y, cardW, cardH, cardR);
        ctx.fillStyle = highlight;
        ctx.fill();

        // Identifier text
        ctx.save();
        ctx.shadowColor   = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur    = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle   = 'white';
        ctx.font        = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign   = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.identifier, x + cardW / 2, y + cardH / 2);
        ctx.restore();

        // X button (top-right corner)
        const btnX = x + cardW - 11, btnY = y + 11, btnR = 9;
        ctx.beginPath();
        ctx.arc(btnX, btnY, btnR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(229, 62, 62, 0.9)';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('\u2715', btnX, btnY);
    });

    // --- Trigger download ---
    canvas.toBlob(function(blob) {
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const ts   = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.href     = url;
        link.download = 'element_classification_' + ts + '.png';
        link.click();
        URL.revokeObjectURL(url);
    });
}

// ===== ELEMENT CARDS RENDERING =====
function renderElementCards(filteredData = null) {
    const container = document.getElementById('elementCards');
    container.innerHTML = '';
    
    const dataToRender = filteredData || elementsData;
    
    dataToRender.forEach((element, index) => {
        const card = createElementCard(element, index);
        container.appendChild(card);
    });
}

// MODIFIED: Element card creation with new drag behavior for workspace
function createElementCard(element, index) {
    const card = document.createElement('div');
    card.className = 'element-card';
    card.dataset.elementIndex = index;
    card.dataset.state = element.state;
    card.draggable = true;
    
    card.style.background = elementColorMap[element.identifier];

    const lvlCfg = levelConfig[currentLevel];
    const propsHTML = lvlCfg.properties.map(function(p) {
        return '<div class="element-property">' +
            '<span class="property-label">' + p.label + '</span>' +
            '<div class="property-value">' + p.format(element[p.key]) + '</div>' +
            '</div>';
    }).join('');

    card.innerHTML =
        '<div class="element-identifier">' + element.identifier + '</div>' +
        '<div class="element-name">' + element.name + '</div>' +
        '<div class="element-properties-grid">' + propsHTML + '</div>';

    // Click event to show modal
    card.addEventListener('click', function(e) {
        if (!card.classList.contains('dragging')) {
            showElementModal(element);
        }
    });
    
    // Mouse drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    // Touch events for mobile
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return card;
}

// ===== MODAL FUNCTIONALITY =====
function showElementModal(element) {
    const modal = document.getElementById('elementModal');
    const modalDetails = document.getElementById('modalElementDetails');
    
    const modalLvlCfg = levelConfig[currentLevel];
    const modalPropsHTML = modalLvlCfg.properties.map(function(p) {
        return '<div class="modal-property-item">' +
            '<div class="modal-property-label">' + p.modalLabel + '</div>' +
            '<div class="modal-property-value">' + p.format(element[p.key]) + '</div>' +
            '</div>';
    }).join('');

    modalDetails.innerHTML =
        '<div class="modal-element-header">' +
            '<div class="modal-element-identifier">' + element.identifier + '</div>' +
            '<div class="modal-element-name">' + element.name + '</div>' +
        '</div>' +
        '<div class="modal-properties-grid">' +
            modalPropsHTML +
            '<div class="modal-element-appearance">' + element.appearance + '</div>' +
        '</div>';
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('elementModal');
    modal.classList.remove('show');
}

// ===== DRAG AND DROP - MOUSE EVENTS =====
function handleDragStart(e) {
    draggedCard = e.target.closest('.element-card');
    draggedElement = elementsData[draggedCard.dataset.elementIndex];
    draggedCard.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy'; // Changed to copy since we're adding to workspace
}

function handleDragEnd(e) {
    if (draggedCard) {
        draggedCard.classList.remove('dragging');
    }
    draggedCard = null;
    draggedElement = null;
}

// ===== DRAG AND DROP - TOUCH EVENTS (MOBILE) =====
function handleTouchStart(e) {
    const touch = e.touches[0];
    draggedCard = e.target.closest('.element-card');
    
    draggedCard.touchStartTime = Date.now();
    draggedCard.touchStartX = touch.clientX;
    draggedCard.touchStartY = touch.clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    const touch = e.touches[0];
    const timeDiff = Date.now() - draggedCard.touchStartTime;
    const distX = Math.abs(touch.clientX - draggedCard.touchStartX);
    const distY = Math.abs(touch.clientY - draggedCard.touchStartY);
    
    if (timeDiff > 200 || distX > 10 || distY > 10) {
        if (!draggedElement) {
            draggedElement = elementsData[draggedCard.dataset.elementIndex];
            
            const rect = draggedCard.getBoundingClientRect();
            touchOffset.x = touch.clientX - rect.left;
            touchOffset.y = touch.clientY - rect.top;
            
            draggedCard.classList.add('dragging');
            draggedCard.style.position = 'fixed';
            draggedCard.style.zIndex = '1000';
            draggedCard.style.pointerEvents = 'none';
        }
        
        updateTouchPosition(touch);
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!draggedCard) return;
    
    const touch = e.changedTouches[0];
    const timeDiff = Date.now() - draggedCard.touchStartTime;
    const distX = Math.abs(touch.clientX - draggedCard.touchStartX);
    const distY = Math.abs(touch.clientY - draggedCard.touchStartY);
    
    if (timeDiff < 200 && distX < 10 && distY < 10 && !draggedElement) {
        const element = elementsData[draggedCard.dataset.elementIndex];
        showElementModal(element);
        draggedCard = null;
        return;
    }
    
    if (draggedElement) {
        // Check if dropped on workspace
        const workspace = document.getElementById('freeformWorkspace');
        const workspaceRect = workspace.getBoundingClientRect();
        
        if (touch.clientX >= workspaceRect.left && touch.clientX <= workspaceRect.right &&
            touch.clientY >= workspaceRect.top && touch.clientY <= workspaceRect.bottom) {
            
            // Calculate position relative to workspace
            const x = touch.clientX - workspaceRect.left + workspace.scrollLeft;
            const y = touch.clientY - workspaceRect.top + workspace.scrollTop;
            
            addCardToWorkspace(draggedElement, x, y);
        }
        
        draggedCard.style.position = '';
        draggedCard.style.zIndex = '';
        draggedCard.style.left = '';
        draggedCard.style.top = '';
        draggedCard.style.pointerEvents = '';
        draggedCard.classList.remove('dragging');
    }
    
    draggedCard = null;
    draggedElement = null;
}

function updateTouchPosition(touch) {
    if (!draggedCard) return;
    
    draggedCard.style.left = (touch.clientX - touchOffset.x) + 'px';
    draggedCard.style.top = (touch.clientY - touchOffset.y) + 'px';
}

// ===== NEW: WORKSPACE MANAGEMENT =====
// Setup workspace to accept drops
document.addEventListener('DOMContentLoaded', function() {
    const workspace = document.getElementById('freeformWorkspace');
    
    workspace.addEventListener('dragover', handleWorkspaceDragOver);
    workspace.addEventListener('drop', handleWorkspaceDrop);
});

function handleWorkspaceDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleWorkspaceDrop(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const workspace = document.getElementById('freeformWorkspace');
    const rect = workspace.getBoundingClientRect();
    
    // MODIFIED: Account for scroll position when calculating drop position
    const x = e.clientX - rect.left + workspace.scrollLeft;
    const y = e.clientY - rect.top + workspace.scrollTop;
    
    addCardToWorkspace(draggedElement, x, y);
}

// MODIFIED: Add card to workspace at specific position - now creates horizontal rectangle card
// MODIFIED: Updated centering calculations for horizontal rectangle (120x50)
function addCardToWorkspace(element, x, y) {
    const workspace = document.getElementById('freeformWorkspace');
    
    // Check if element already exists in workspace
    const existingCard = workspaceCards.find(card => card.element.identifier === element.identifier);
    if (existingCard) {
        // MODIFIED: Center the horizontal rectangle card (60px is half of 120px width, 25px is half of 50px height)
        existingCard.x = x - 60;
        existingCard.y = y - 25;
        updateWorkspaceCard(existingCard);
        // NEW: Update workspace height after moving card
        updateWorkspaceHeight();
        return;
    }
    
    // MODIFIED: Create new horizontal rectangle workspace card - center on drop point
    const workspaceCard = createWorkspaceCard(element, x - 60, y - 25);
    workspace.appendChild(workspaceCard);
    
    // Add to tracking array
    workspaceCards.push({
        element: element,
        card: workspaceCard,
        x: x - 60,
        y: y - 25
    });
    
    // Update workspace state
    updateWorkspaceState();
    // NEW: Update workspace height to accommodate new card
    updateWorkspaceHeight();
}

// NEW: Function to dynamically update workspace height based on card positions
// MODIFIED: Updated to account for horizontal rectangle card height (50px)
// This ensures scrollbar appears when cards are placed beyond visible area
function updateWorkspaceHeight() {
    const workspace = document.getElementById('freeformWorkspace');
    
    if (workspaceCards.length === 0) {
        // Reset to default when no cards
        workspace.style.minHeight = '100%';
        return;
    }
    
    // Find the maximum Y position (bottom edge) of all cards
    let maxY = 0;
    workspaceCards.forEach(cardData => {
        // MODIFIED: Card height is now 50px, so bottom edge is y + 50
        const cardBottom = cardData.y + 50;
        if (cardBottom > maxY) {
            maxY = cardBottom;
        }
    });
    
    // Add padding at the bottom (100px) for better UX
    const requiredHeight = maxY + 100;
    
    // Get the current visible height of workspace
    const currentHeight = workspace.clientHeight;
    
    // Only update if required height is greater than current height
    // This allows scrollbar to appear when cards extend beyond visible area
    if (requiredHeight > currentHeight) {
        workspace.style.minHeight = requiredHeight + 'px';
    }
}

// MODIFIED: Create a horizontal rectangle workspace card showing identifier (symbol)
function createWorkspaceCard(element, x, y) {
    const card = document.createElement('div');
    card.className = 'workspace-card';
    card.dataset.identifier = element.identifier;
    
    card.style.background = elementColorMap[element.identifier];
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    
    // MODIFIED: Simplified HTML structure - only showing identifier horizontally
    card.innerHTML = `
        <div class="element-identifier">${element.identifier}</div>
        <div class="element-name">${element.name}</div>
        <div class="element-properties-grid">
            <div class="element-property">
                <span class="property-label">Protons</span>
                <div class="property-value">${element.protonNumber}</div>
            </div>
            <div class="element-property">
                <span class="property-label">Atomic Mass</span>
                <div class="property-value">${element.atomicMass}</div>
            </div>
            <div class="element-property">
                <span class="property-label">Shells</span>
                <div class="property-value">${element.shells}</div>
            </div>
            <div class="element-property">
                <span class="property-label">Outer e⁻</span>
                <div class="property-value">${element.outermostElectrons}</div>
            </div>
            <div class="element-property">
                <span class="property-label">State</span>
                <div class="property-value">${element.state}</div>
            </div>
            <div class="element-property">
                <span class="property-label">Color</span>
                <div class="property-value">${element.color}</div>
            </div>
            <div class="element-property">
                <span class="property-label">Melt</span>
                <div class="property-value">${element.meltingPoint}°C</div>
            </div>
            <div class="element-property">
                <span class="property-label">Boil</span>
                <div class="property-value">${element.boilingPoint}°C</div>
            </div>
        </div>
    `;
    
    // Add drag functionality within workspace
    setupWorkspaceCardDrag(card, element);
    
    // MODIFIED: Add remove functionality (click on X button) - adjusted for horizontal rectangle
    card.addEventListener('click', function(e) {
        // Check if clicked on the X button (top right corner)
        const rect = card.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // X button is at top-right (approximately 2px from top, 2px from right, 18px size)
        if (clickX > rect.width - 20 && clickX < rect.width - 2 && clickY > 2 && clickY < 20) {
            removeCardFromWorkspace(element.identifier);
        }
    });
    
    return card;
}

// NEW: Setup drag functionality for workspace cards
// MODIFIED: Updated to handle scroll position correctly during drag and update workspace height
function setupWorkspaceCardDrag(card, element) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    
    // Mouse events
    card.addEventListener('mousedown', function(e) {
        // Don't drag if clicking on X button
        const rect = card.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        if (clickX > rect.width - 20 && clickY < 20) return;
        
        isDragging = true;
        card.classList.add('active');
        
        const workspace = document.getElementById('freeformWorkspace');
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = card.offsetLeft;
        initialTop = card.offsetTop;
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        const newLeft = initialLeft + deltaX;
        const newTop = initialTop + deltaY;
        
        card.style.left = newLeft + 'px';
        card.style.top = newTop + 'px';
        
        // Update tracking
        const cardData = workspaceCards.find(c => c.element.identifier === element.identifier);
        if (cardData) {
            cardData.x = newLeft;
            cardData.y = newTop;
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
            card.classList.remove('active');
            // NEW: Update workspace height after drag ends
            updateWorkspaceHeight();
        }
    });
    
    // Touch events for mobile
    let touchStartX, touchStartY;
    
    card.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const clickX = touch.clientX - rect.left;
        const clickY = touch.clientY - rect.top;
        if (clickX > rect.width - 20 && clickY < 20) return;
        
        isDragging = true;
        card.classList.add('active');
        
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        initialLeft = card.offsetLeft;
        initialTop = card.offsetTop;
        
        e.preventDefault();
    }, { passive: false });
    
    card.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        
        const newLeft = initialLeft + deltaX;
        const newTop = initialTop + deltaY;
        
        card.style.left = newLeft + 'px';
        card.style.top = newTop + 'px';
        
        const cardData = workspaceCards.find(c => c.element.identifier === element.identifier);
        if (cardData) {
            cardData.x = newLeft;
            cardData.y = newTop;
        }
        
        e.preventDefault();
    }, { passive: false });
    
    card.addEventListener('touchend', function(e) {
        if (isDragging) {
            isDragging = false;
            card.classList.remove('active');
            // NEW: Update workspace height after drag ends
            updateWorkspaceHeight();
        }
    });
}

// NEW: Update workspace card position
function updateWorkspaceCard(cardData) {
    cardData.card.style.left = cardData.x + 'px';
    cardData.card.style.top = cardData.y + 'px';
}

// NEW: Remove card from workspace
function removeCardFromWorkspace(identifier) {
    const index = workspaceCards.findIndex(card => card.element.identifier === identifier);
    if (index !== -1) {
        const cardData = workspaceCards[index];
        cardData.card.remove();
        workspaceCards.splice(index, 1);
        updateWorkspaceState();
        // NEW: Update workspace height after removing card
        updateWorkspaceHeight();
    }
}

// NEW: Update workspace state (show/hide instructions)
function updateWorkspaceState() {
    const workspace = document.getElementById('freeformWorkspace');
    if (workspaceCards.length > 0) {
        workspace.classList.add('has-cards');
    } else {
        workspace.classList.remove('has-cards');
    }
}

// ===== UTILITY FUNCTIONS =====
function resetWorkspace() {
    // Clear all workspace cards
    workspaceCards.forEach(cardData => {
        cardData.card.remove();
    });
    workspaceCards = [];
    updateWorkspaceState();
    // NEW: Reset workspace height
    updateWorkspaceHeight();
}

// ===== LEVEL SYSTEM =====
function setLevel(level) {
    currentLevel = level;
    document.body.dataset.level = level;

    // Update active button highlight
    document.querySelectorAll('.level-btn').forEach(function(btn) {
        btn.classList.toggle('active', parseInt(btn.dataset.level) === level);
    });

    // Update hint tooltip on info icon
    document.querySelector('.info-icon').title = levelConfig[level].hint;

    // Re-render source cards with new property set
    renderElementCards();
}

// ===== SAMPLE ANSWER =====
function showSampleAnswer() {
    const modal   = document.getElementById('sampleAnswerModal');
    const details = document.getElementById('sampleAnswerDetails');

    function buildGroups(groups) {
        return groups.map(function(group) {
            var cards = group.identifiers.map(function(id) {
                var el = allElementsData.find(function(e) { return e.identifier === id; });
                if (!el) return '';
                return '<span class="sa-card" style="background:' + (elementColorMap[id] || '#667eea') + '">' +
                    id + '<br><small>' + el.name + '</small></span>';
            }).join('');
            return '<div class="sa-group">' +
                '<div class="sa-group-label"><strong>' + group.name + '</strong>' +
                '<span>' + group.subtitle + '</span></div>' +
                '<div class="sa-group-cards">' + cards + '</div>' +
                '</div>';
        }).join('');
    }

    details.innerHTML =
        '<h2 class="sa-title">💡 Sample Answer</h2>' +

        '<div class="sa-section">' +
            '<h3 class="sa-section-title">Classification by Periods</h3>' +
            '<p class="sa-section-desc">Elements in the same <strong>period</strong> have the same number of electron shells. ' +
            'Group the substances that share the same shell count.</p>' +
            '<div class="sa-groups">' + buildGroups(sampleAnswerData.byPeriods) + '</div>' +
        '</div>' +

        '<div class="sa-section">' +
            '<h3 class="sa-section-title">Classification by Groups</h3>' +
            '<p class="sa-section-desc">Elements in the same <strong>group</strong> have the same number of outermost electrons. ' +
            'Substances with identical outer-electron counts share similar chemical properties.</p>' +
            '<div class="sa-groups">' + buildGroups(sampleAnswerData.byGroups) + '</div>' +
        '</div>';

    modal.classList.add('show');
}

function closeSampleAnswer() {
    document.getElementById('sampleAnswerModal').classList.remove('show');
}