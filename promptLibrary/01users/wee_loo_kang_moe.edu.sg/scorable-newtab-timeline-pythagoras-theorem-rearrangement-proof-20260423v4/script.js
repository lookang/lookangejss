// ===========================
// GLOBAL VARIABLES
// ===========================

let a = 240; // side a
let b = 180; // side b
let c = Math.sqrt(a * a + b * b); // hypotenuse
let outerSize = a + b;

const MARGIN = 75; // space around outer square for side labels

let currentAngle = 0;
let labelsVisible  = true;
let hintsVisible   = true;
let titleVisible   = true;
let explanationRevealed = false;
let analyticsCollapsed  = true;
let patternsEnabled     = false;

// Play animation
let animating    = false;
let animationId  = null;
const ANIM_SPEED = 0.5; // degrees per animation frame

// Triangle fill colours (solid and pattern variants)
const FILLS = {
    solid:   { pink: '#ff69b4', yellow: '#ffd700', blue: '#1e90ff', green: '#7fff00' },
    pattern: { pink: 'url(#patPink)', yellow: 'url(#patYellow)', blue: 'url(#patBlue)', green: 'url(#patGreen)' }
};

// Preset triangles for "Try Another △"
const PRESETS = [
    { a: 240, b: 180, label: '3-4-5 (×6)'  },   // default: a=24, b=18, c=30
    { a: 240, b: 100, label: '12-5-13 (×2)' },   // a=24, b=10, c=26
    { a: 150, b: 200, label: '3-4-5 (×5)'  },   // a=15, b=20, c=25
];
let presetIndex = 0;

// Learning stages
let currentStage = 0;
const learningStages = [
    "Move the slider slowly. What shape do you see in the middle?",
    "What happens to the empty space when the blue and green triangles rotate?",
    "Does the total uncovered area change, or only its shape?",
    "Complete the idea: c² = ____ + ____"
];

// Stage checkpoint data
const stageCheckpoints = {
    1: {
        question: "Are the 4 coloured triangles changing size?",
        valid: ["no", "nope", "not changing", "same", "same size", "they don't",
                "no they don't", "no change", "unchanged", "they stay the same",
                "no, they stay the same", "no they stay the same"],
        hint: "Watch the triangles — they only move, they do not grow or shrink."
    },
    2: {
        question: "Is the total white (uncovered) area changing?",
        valid: ["no", "nope", "not changing", "same", "stays the same",
                "no change", "unchanged", "it stays the same", "no it stays the same"],
        hint: "The four triangles take up the same space no matter how they are arranged."
    }
};

// Analytics
let interactionLog    = [];
let startTime         = Date.now();
let lastInputType     = 'unknown';
let checkpointAttempts = 0;
let stageCheckAttempts = 0;

// ===========================
// DOM ELEMENTS
// ===========================

const elements = {
    diagram:        document.getElementById('diagram'),
    rotationSlider: document.getElementById('rotationSlider'),
    angleDisplay:   document.getElementById('angleDisplay'),

    // IDs now match the variable they control
    aSlider:  document.getElementById('aSlider'),   // controls a (range 120–360)
    bSlider:  document.getElementById('bSlider'),   // controls b (range 90–270)
    aDisplay: document.getElementById('aDisplay'),  // shows a
    bDisplay: document.getElementById('bDisplay'),  // shows b

    trianglePink:   document.getElementById('trianglePink'),
    triangleYellow: document.getElementById('triangleYellow'),
    triangleBlue:   document.getElementById('triangleBlue'),
    triangleGreen:  document.getElementById('triangleGreen'),

    markerPink:   document.getElementById('markerPink'),
    markerYellow: document.getElementById('markerYellow'),
    markerBlue:   document.getElementById('markerBlue'),
    markerGreen:  document.getElementById('markerGreen'),

    labelC2:  document.getElementById('labelC2'),
    labelA2:  document.getElementById('labelA2'),
    labelB2:  document.getElementById('labelB2'),
    squareC2: document.getElementById('squareC2'),
    squareA2: document.getElementById('squareA2'),
    squareB2: document.getElementById('squareB2'),
    labelA:  document.getElementById('labelA'),
    labelB:  document.getElementById('labelB'),
    labelC:  document.getElementById('labelC'),
    yellowLabelA: document.getElementById('yellowLabelA'),
    yellowLabelB: document.getElementById('yellowLabelB'),
    yellowLabelC: document.getElementById('yellowLabelC'),

    // Equation display
    eqA:   document.getElementById('eqA'),
    eqB:   document.getElementById('eqB'),
    eqC:   document.getElementById('eqC'),
    eqA2:  document.getElementById('eqA2'),
    eqB2:  document.getElementById('eqB2'),
    eqSum: document.getElementById('eqSum'),

    // Area breakdown
    brkOuter:     document.getElementById('brkOuter'),
    brkTriangles: document.getElementById('brkTriangles'),
    brkWhite:     document.getElementById('brkWhite'),

    // Buttons
    playBtn:            document.getElementById('playBtn'),
    resetBtn:           document.getElementById('resetBtn'),
    toggleLabelsBtn:    document.getElementById('toggleLabelsBtn'),
    toggleHintsBtn:     document.getElementById('toggleHintsBtn'),
    toggleTitleBtn:     document.getElementById('toggleTitle'),
    revealExplanationBtn: document.getElementById('revealExplanationBtn'),
    tryTriangleBtn:     document.getElementById('tryTriangleBtn'),
    togglePatternsBtn:  document.getElementById('togglePatternsBtn'),
    stageCheckBtn:      document.getElementById('stageCheckBtn'),
    checkAnswerBtn:     document.getElementById('checkAnswerBtn'),
    clearLogBtn:        document.getElementById('clearLogBtn'),
    toggleAnalyticsBtn: document.getElementById('toggleAnalyticsBtn'),

    // Panels
    titleSection:       document.getElementById('titleSection'),
    instructionPanel:   document.getElementById('instructionPanel'),
    instructionText:    document.getElementById('instructionText'),
    explanationText:    document.getElementById('explanationText'),
    stageCheckPanel:    document.getElementById('stageCheckPanel'),
    stageCheckQuestion: document.getElementById('stageCheckQuestion'),
    stageCheckFeedback: document.getElementById('stageCheckFeedback'),
    stageAnswer:        document.getElementById('stageAnswer'),
    checkpointPanel:    document.getElementById('checkpointPanel'),
    answer1:            document.getElementById('answer1'),
    answer2:            document.getElementById('answer2'),
    checkpointFeedback: document.getElementById('checkpointFeedback'),
    analyticsContent:   document.getElementById('analyticsContent'),
    logEntries:         document.getElementById('logEntries'),

    // Tooltip
    tooltip:      document.getElementById('tooltip'),
    tooltipText:  document.getElementById('tooltipText'),
    tooltipClose: document.getElementById('tooltipClose')
};

// ===========================
// INITIALIZATION
// ===========================

function initSliderFills() {
    updateSliderFill(elements.rotationSlider);
    updateSliderFill(elements.aSlider);
    updateSliderFill(elements.bSlider);
}

function init() {
    detectIframe();
    setupEventListeners();
    initSliderFills();
    // Start with log collapsed
    elements.analyticsContent.classList.add('collapsed');
    elements.toggleAnalyticsBtn.textContent = 'Show Log';
    updateDiagram(0);
    updateEquationDisplay();
    logInteraction('Interactive loaded', `angle: 0°, a: ${a/10}, b: ${b/10}`);
}

function detectIframe() {
    if (window.self !== window.top) document.body.classList.add('in-iframe');
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
    elements.rotationSlider.addEventListener('input', handleSliderChange);
    elements.rotationSlider.addEventListener('touchstart', () => detectInputType('touch'));
    elements.rotationSlider.addEventListener('mousedown',  () => detectInputType('mouse'));

    // Each slider now maps directly to its named variable
    elements.aSlider.addEventListener('input', handleASliderChange);
    elements.aSlider.addEventListener('touchstart', () => detectInputType('touch'));
    elements.aSlider.addEventListener('mousedown',  () => detectInputType('mouse'));

    elements.bSlider.addEventListener('input', handleBSliderChange);
    elements.bSlider.addEventListener('touchstart', () => detectInputType('touch'));
    elements.bSlider.addEventListener('mousedown',  () => detectInputType('mouse'));

    elements.playBtn.addEventListener('click',            handlePlayPause);
    elements.resetBtn.addEventListener('click',           handleReset);
    elements.toggleLabelsBtn.addEventListener('click',    handleToggleLabels);
    elements.toggleHintsBtn.addEventListener('click',     handleToggleHints);
    elements.toggleTitleBtn.addEventListener('click',     handleToggleTitle);
    elements.revealExplanationBtn.addEventListener('click', handleRevealExplanation);
    elements.tryTriangleBtn.addEventListener('click',     handleTryAnotherTriangle);
    elements.togglePatternsBtn.addEventListener('click',  handleTogglePatterns);
    elements.stageCheckBtn.addEventListener('click',      handleStageCheck);
    elements.checkAnswerBtn.addEventListener('click',     handleCheckAnswer);
    elements.clearLogBtn.addEventListener('click',        handleClearLog);
    elements.toggleAnalyticsBtn.addEventListener('click', handleToggleAnalytics);

    // Triangle tooltips
    elements.trianglePink.addEventListener('click',   (e) => showTriangleTooltip(e, 'pink'));
    elements.triangleYellow.addEventListener('click', (e) => showTriangleTooltip(e, 'yellow'));
    elements.triangleBlue.addEventListener('click',   (e) => showTriangleTooltip(e, 'blue'));
    elements.triangleGreen.addEventListener('click',  (e) => showTriangleTooltip(e, 'green'));
    elements.tooltipClose.addEventListener('click', hideTooltip);

    // Dismiss tooltip when clicking the diagram background
    document.getElementById('outerSquare').addEventListener('click', hideTooltip);

    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT') e.preventDefault();
    });

    addTouchSupport();
}

function detectInputType(type) { lastInputType = type; }

function addTouchSupport() {
    let touchTimeout;
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            clearTimeout(touchTimeout);
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('touchend', function() {
            touchTimeout = setTimeout(() => { this.style.transform = ''; }, 50);
        });
    });
}

// ===========================
// SLIDER HANDLERS
// ===========================

function updateSliderFill(slider) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--val-pct', pct.toFixed(2) + '%');
}

function handleASliderChange(e) {
    stopAnimation();
    a = parseInt(e.target.value);
    elements.aDisplay.textContent = a / 10;
    c = Math.sqrt(a * a + b * b);
    outerSize = a + b;
    updateSliderFill(e.target);
    updateDiagram(currentAngle);
    updateEquationDisplay();
    logInteraction(`a changed to ${a / 10}`, `c: ${(c / 10).toFixed(1)}, input: ${lastInputType}`);
    lastInputType = 'unknown';
}

function handleBSliderChange(e) {
    stopAnimation();
    b = parseInt(e.target.value);
    elements.bDisplay.textContent = b / 10;
    c = Math.sqrt(a * a + b * b);
    outerSize = a + b;
    updateSliderFill(e.target);
    updateDiagram(currentAngle);
    updateEquationDisplay();
    logInteraction(`b changed to ${b / 10}`, `c: ${(c / 10).toFixed(1)}, input: ${lastInputType}`);
    lastInputType = 'unknown';
}

function handleSliderChange(e) {
    stopAnimation();
    const angle = parseInt(e.target.value);
    currentAngle = angle;
    elements.angleDisplay.textContent = angle;
    updateSliderFill(e.target);
    updateDiagram(angle);
    updateLearningStage(angle);
    logInteraction(`Slider moved to ${angle}°`, `input: ${lastInputType}`);
    lastInputType = 'unknown';
}

// ===========================
// PLAY / PAUSE
// ===========================

function handlePlayPause() {
    if (animating) {
        stopAnimation();
    } else {
        if (currentAngle >= 90) {
            currentAngle = 0;
            elements.rotationSlider.value = 0;
            elements.angleDisplay.textContent = '0';
            updateDiagram(0);
        }
        animating = true;
        elements.playBtn.textContent = '⏸ Pause';
        elements.playBtn.classList.add('playing');
        logInteraction('Animation started', `from ${currentAngle}°`);
        animateStep();
    }
}

function stopAnimation() {
    if (animationId) cancelAnimationFrame(animationId);
    animating   = false;
    animationId = null;
    elements.playBtn.textContent = '▶ Play';
    elements.playBtn.classList.remove('playing');
}

function animateStep() {
    if (!animating) return;
    currentAngle = Math.min(currentAngle + ANIM_SPEED, 90);
    elements.rotationSlider.value = currentAngle;
    elements.angleDisplay.textContent = Math.round(currentAngle);
    updateDiagram(currentAngle);
    updateLearningStage(currentAngle);
    if (currentAngle >= 90) {
        stopAnimation();
        logInteraction('Animation completed', 'reached 90°');
        return;
    }
    animationId = requestAnimationFrame(animateStep);
}

// ===========================
// TRY ANOTHER TRIANGLE
// ===========================

function handleTryAnotherTriangle() {
    stopAnimation();
    presetIndex = (presetIndex + 1) % PRESETS.length;
    applyPreset(PRESETS[presetIndex]);
}

function applyPreset(preset) {
    a = preset.a;
    b = preset.b;
    c = Math.sqrt(a * a + b * b);
    outerSize = a + b;
    currentAngle = 0;
    currentStage = 0;

    elements.aSlider.value        = a;
    elements.aDisplay.textContent = a / 10;
    elements.bSlider.value        = b;
    elements.bDisplay.textContent = b / 10;
    elements.rotationSlider.value = 0;
    elements.angleDisplay.textContent = '0';

    initSliderFills();
    updateDiagram(0);
    updateEquationDisplay();

    elements.instructionText.textContent =
        `New triangle: ${preset.label} — a=${a/10}, b=${b/10}. Does c² = a² + b² still hold?`;
    elements.stageCheckPanel.classList.add('hidden');
    elements.checkpointPanel.classList.add('hidden');

    logInteraction(`Preset: ${preset.label}`, `a: ${a/10}, b: ${b/10}, c: ${(c/10).toFixed(1)}`);
}

// ===========================
// COLOUR-BLIND PATTERN TOGGLE
// ===========================

function handleTogglePatterns() {
    patternsEnabled = !patternsEnabled;
    elements.togglePatternsBtn.textContent = patternsEnabled ? 'Patterns: ON' : 'Patterns: OFF';
    elements.togglePatternsBtn.classList.toggle('pattern-active', patternsEnabled);

    const fills = patternsEnabled ? FILLS.pattern : FILLS.solid;
    elements.trianglePink.setAttribute('fill',   fills.pink);
    elements.triangleYellow.setAttribute('fill', fills.yellow);
    elements.triangleBlue.setAttribute('fill',   fills.blue);
    elements.triangleGreen.setAttribute('fill',  fills.green);

    logInteraction(`Patterns ${patternsEnabled ? 'enabled' : 'disabled'}`, '');
}

// ===========================
// TRIANGLE TOOLTIP
// ===========================

const TRIANGLE_INFO = {
    pink:   { name: 'Pink triangle',   desc: 'Top-left · fixed'      },
    yellow: { name: 'Yellow triangle', desc: 'Bottom-left · fixed'   },
    blue:   { name: 'Blue triangle',   desc: 'Top-right · rotating'  },
    green:  { name: 'Green triangle',  desc: 'Bottom-right · rotating' }
};

function showTriangleTooltip(e, colour) {
    e.stopPropagation();
    const info = TRIANGLE_INFO[colour];
    const area = Math.round(0.5 * a * b / 100);
    elements.tooltipText.innerHTML =
        `<strong>${info.name}</strong><br>` +
        `${info.desc}<br>` +
        `Legs: a = ${a/10}, b = ${b/10}<br>` +
        `Area = ½ × ${a/10} × ${b/10} = <strong>${area.toLocaleString()}</strong>`;

    const tx = Math.min(e.clientX + 12, window.innerWidth  - 320);
    const ty = Math.min(e.clientY + 12, window.innerHeight - 130);
    elements.tooltip.style.left = tx + 'px';
    elements.tooltip.style.top  = ty + 'px';
    elements.tooltip.classList.remove('hidden');

    logInteraction(`${info.name} clicked`, `area = ${area}`);
}

function hideTooltip() {
    elements.tooltip.classList.add('hidden');
}

// ===========================
// RIGHT-ANGLE MARKER HELPER
// ===========================

function rightAngleMarker(vertex, p1, p2, size) {
    const d1 = [p1[0] - vertex[0], p1[1] - vertex[1]];
    const len1 = Math.sqrt(d1[0] * d1[0] + d1[1] * d1[1]);
    if (len1 < 0.01) return '';
    const u1 = [d1[0] / len1, d1[1] / len1];

    const d2 = [p2[0] - vertex[0], p2[1] - vertex[1]];
    const len2 = Math.sqrt(d2[0] * d2[0] + d2[1] * d2[1]);
    if (len2 < 0.01) return '';
    const u2 = [d2[0] / len2, d2[1] / len2];

    const c1 = [vertex[0] + size * u1[0], vertex[1] + size * u1[1]];
    const c2 = [c1[0] + size * u2[0], c1[1] + size * u2[1]];
    const c3 = [vertex[0] + size * u2[0], vertex[1] + size * u2[1]];

    return `M${c1[0].toFixed(2)},${c1[1].toFixed(2)} ` +
           `L${c2[0].toFixed(2)},${c2[1].toFixed(2)} ` +
           `L${c3[0].toFixed(2)},${c3[1].toFixed(2)}`;
}

// ===========================
// EQUATION + AREA BREAKDOWN
// ===========================

function updateEquationDisplay() {
    const a2 = a * a;
    const b2 = b * b;
    const c2 = a2 + b2;
    // Display scaled ÷10 (lengths) and ÷100 (areas) — dimensionless for young learners
    elements.eqA.textContent   = a / 10;
    elements.eqB.textContent   = b / 10;
    elements.eqC.textContent   = (c / 10).toFixed(1);
    elements.eqA2.textContent  = (a2 / 100).toLocaleString();
    elements.eqB2.textContent  = (b2 / 100).toLocaleString();
    elements.eqSum.textContent = (c2 / 100).toLocaleString();

    // Conservation of area breakdown
    const outerSq       = outerSize * outerSize;
    const fourTriangles = 2 * a * b;
    const white         = outerSq - fourTriangles;
    elements.brkOuter.textContent     = (outerSq / 100).toLocaleString();
    elements.brkTriangles.textContent = (fourTriangles / 100).toLocaleString();
    elements.brkWhite.textContent     = (white / 100).toLocaleString();
}

// ===========================
// DIAGRAM UPDATE
// ===========================

function updateDiagram(angle) {
    const rad = (angle * Math.PI) / 180;

    // Dynamic viewBox — prevents clipping as outerSize grows
    const vbSize = outerSize + 2 * MARGIN;
    elements.diagram.setAttribute('viewBox', `0 0 ${vbSize} ${vbSize}`);

    const offsetX = MARGIN;
    const offsetY = MARGIN;

    const x0 = offsetX,             y0 = offsetY + outerSize; // bottom-left
    const x1 = offsetX + outerSize, y1 = offsetY + outerSize; // bottom-right
    const x2 = offsetX + outerSize, y2 = offsetY;             // top-right
    const x3 = offsetX,             y3 = offsetY;             // top-left

    document.getElementById('outerSquare').setAttribute('x', offsetX);
    document.getElementById('outerSquare').setAttribute('y', offsetY);
    document.getElementById('outerSquare').setAttribute('width',  outerSize);
    document.getElementById('outerSquare').setAttribute('height', outerSize);

    // PINK — right angle at pinkP1 (top-left corner)
    const pinkP1 = [x3, y3];
    const pinkP2 = [x3 + a, y3];
    const pinkP3 = [x3, y3 + b];
    elements.trianglePink.setAttribute('points',
        `${pinkP1[0]},${pinkP1[1]} ${pinkP2[0]},${pinkP2[1]} ${pinkP3[0]},${pinkP3[1]}`);

    // YELLOW — right angle at yellowP1 (bottom-left corner)
    const yellowP1 = [x0, y0];
    const yellowP2 = [x0, y0 - a];
    const yellowP3 = [x0 + b, y0];
    elements.triangleYellow.setAttribute('points',
        `${yellowP1[0]},${yellowP1[1]} ${yellowP2[0]},${yellowP2[1]} ${yellowP3[0]},${yellowP3[1]}`);

    // Pivot
    const pivotX = x0 + b;
    const pivotY = y0;
    document.getElementById('pivotPoint').setAttribute('cx', pivotX);
    document.getElementById('pivotPoint').setAttribute('cy', pivotY);

    // BLUE — right angle at blueP1 (rotates around bluePivot)
    const bluePivot   = [x3 + a, y3];
    const blueP1_init = [x2, y2];
    const blueP2_init = [x2, y2 + a];
    const blueP1      = rotatePoint(blueP1_init, bluePivot, rad);
    const blueP2      = rotatePoint(blueP2_init, bluePivot, rad);
    elements.triangleBlue.setAttribute('points',
        `${bluePivot[0]},${bluePivot[1]} ${blueP1[0]},${blueP1[1]} ${blueP2[0]},${blueP2[1]}`);

    // GREEN — right angle at greenP2 (rotates around greenP1)
    const greenP1      = [pivotX, pivotY];
    const greenP2_init = [x1, y1];
    const greenP3_init = [x1, y1 - b];
    const greenP2      = rotatePoint(greenP2_init, greenP1, -rad);
    const greenP3      = rotatePoint(greenP3_init, greenP1, -rad);
    elements.triangleGreen.setAttribute('points',
        `${greenP1[0]},${greenP1[1]} ${greenP2[0]},${greenP2[1]} ${greenP3[0]},${greenP3[1]}`);

    // C² tilted square boundary — 4 fixed junction points (hypotenuse tips at angle=0)
    // V1=top(bluePivot), V2=right(blueP2@0°), V3=bottom(greenP1), V4=left(yellowP2/pinkP3)
    const c2V2x = offsetX + outerSize, c2V2y = offsetY + a;
    elements.squareC2.setAttribute('points',
        `${bluePivot[0]},${bluePivot[1]} ` +
        `${c2V2x},${c2V2y} ` +
        `${greenP1[0]},${greenP1[1]} ` +
        `${offsetX},${offsetY + b}`);

    // RIGHT-ANGLE MARKERS
    const mSize        = Math.max(8, Math.min(15, outerSize / 32));
    const markerOpacity = labelsVisible ? '1' : '0';

    elements.markerPink.setAttribute('d',   rightAngleMarker(pinkP1,  pinkP2,   pinkP3,  mSize));
    elements.markerYellow.setAttribute('d', rightAngleMarker(yellowP1,yellowP2, yellowP3,mSize));
    elements.markerBlue.setAttribute('d',   rightAngleMarker(blueP1,  bluePivot,blueP2,  mSize));
    elements.markerGreen.setAttribute('d',  rightAngleMarker(greenP2, greenP1,  greenP3, mSize));

    elements.markerPink.style.opacity   = markerOpacity;
    elements.markerYellow.style.opacity = markerOpacity;
    elements.markerBlue.style.opacity   = markerOpacity;
    elements.markerGreen.style.opacity  = markerOpacity;

    updateLabels(angle, offsetX, offsetY);
}

function rotatePoint(point, center, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const dx = point[0] - center[0], dy = point[1] - center[1];
    return [center[0] + dx * cos - dy * sin,
            center[1] + dx * sin + dy * cos];
}

// ===========================
// LABEL UPDATES
// ===========================

function updateLabels(angle, offsetX, offsetY) {
    // Label each side of the pink triangle (top-left, always fixed)
    // Side a — top horizontal edge: label sits above it, in the margin
    elements.labelA.setAttribute('x', offsetX + a / 2);
    elements.labelA.setAttribute('y', offsetY - 14);
    elements.labelA.setAttribute('text-anchor', 'middle');

    // Side b — left vertical edge: label sits in the left margin
    elements.labelB.setAttribute('x', offsetX - 14);
    elements.labelB.setAttribute('y', offsetY + b / 2);
    elements.labelB.setAttribute('text-anchor', 'end');
    elements.labelB.setAttribute('dominant-baseline', 'middle');

    // Side c — hypotenuse: label offset outward (guard against c=0 when a leg collapses)
    if (c > 0.01) {
        elements.labelC.setAttribute('x', offsetX + a / 2 + 22 * b / c);
        elements.labelC.setAttribute('y', offsetY + b / 2 + 22 * a / c);
        elements.labelC.setAttribute('text-anchor', 'middle');
        elements.labelC.setAttribute('dominant-baseline', 'middle');
    }

    if (angle < 45) {
        elements.labelC2.setAttribute('x', offsetX + outerSize / 2);
        elements.labelC2.setAttribute('y', offsetY + outerSize / 2);
        elements.labelC2.style.opacity  = labelsVisible ? '1' : '0';
        elements.squareC2.style.opacity = labelsVisible ? '1' : '0';
        elements.labelA2.style.opacity  = '0';
        elements.labelB2.style.opacity  = '0';
        elements.squareA2.style.opacity = '0';
        elements.squareB2.style.opacity = '0';
    } else {
        const t = (angle - 45) / 45;
        const sqOp = labelsVisible ? String(t) : '0';
        elements.labelC2.style.opacity  = labelsVisible ? String(1 - t) : '0';
        elements.squareC2.style.opacity = labelsVisible ? String(1 - t) : '0';
        elements.labelA2.style.opacity  = sqOp;
        elements.labelB2.style.opacity  = sqOp;

        elements.labelA2.setAttribute('x', offsetX + b + a / 2);
        elements.labelA2.setAttribute('y', offsetY + b + a / 2);
        elements.labelB2.setAttribute('x', offsetX + a + b / 2);
        elements.labelB2.setAttribute('y', offsetY + b / 2);

        // a² square: bottom-right region, size a×a
        elements.squareA2.setAttribute('x',      offsetX + b);
        elements.squareA2.setAttribute('y',      offsetY + b);
        elements.squareA2.setAttribute('width',  a);
        elements.squareA2.setAttribute('height', a);
        elements.squareA2.style.opacity = sqOp;

        // b² square: top-right region, size b×b
        elements.squareB2.setAttribute('x',      offsetX + a);
        elements.squareB2.setAttribute('y',      offsetY);
        elements.squareB2.setAttribute('width',  b);
        elements.squareB2.setAttribute('height', b);
        elements.squareB2.style.opacity = sqOp;
    }

    // Yellow triangle labels
    // Side a — left vertical edge (yellowP1 bottom-left to yellowP2 above it)
    elements.yellowLabelA.setAttribute('x', offsetX - 14);
    elements.yellowLabelA.setAttribute('y', offsetY + b + a / 2);
    elements.yellowLabelA.setAttribute('dominant-baseline', 'middle');

    // Side b — bottom horizontal edge (yellowP1 to yellowP3 right)
    elements.yellowLabelB.setAttribute('x', offsetX + b / 2);
    elements.yellowLabelB.setAttribute('y', offsetY + outerSize + 18);

    // Side c — hypotenuse (yellowP2 to yellowP3), offset outward (guard against c=0)
    if (c > 0.01) {
        elements.yellowLabelC.setAttribute('x', offsetX + b / 2 + 22 * a / c);
        elements.yellowLabelC.setAttribute('y', offsetY + b + a / 2 - 22 * b / c);
        elements.yellowLabelC.setAttribute('dominant-baseline', 'middle');
    }

    const sideOp = labelsVisible ? '1' : '0';
    elements.labelA.style.opacity = sideOp;
    elements.labelB.style.opacity = sideOp;
    elements.labelC.style.opacity = sideOp;
    elements.yellowLabelA.style.opacity = sideOp;
    elements.yellowLabelB.style.opacity = sideOp;
    elements.yellowLabelC.style.opacity = sideOp;
}

// ===========================
// LEARNING STAGE MANAGEMENT
// ===========================

function updateLearningStage(angle) {
    let newStage;
    if      (angle >= 80) newStage = 3;
    else if (angle >= 50) newStage = 2;
    else if (angle >= 20) newStage = 1;
    else                  newStage = 0;

    if (newStage > currentStage) {
        currentStage = newStage;
        elements.instructionText.textContent = learningStages[currentStage];
        updateCheckpointPanels();
    }
}

function updateCheckpointPanels() {
    if (currentStage === 1 || currentStage === 2) {
        const cp = stageCheckpoints[currentStage];
        elements.stageCheckQuestion.textContent = cp.question;
        elements.stageAnswer.value = '';
        elements.stageCheckFeedback.textContent = '';
        elements.stageCheckFeedback.className = 'checkpoint-feedback';
        stageCheckAttempts = 0;
        elements.stageCheckPanel.classList.remove('hidden');
        elements.checkpointPanel.classList.add('hidden');
    } else if (currentStage === 3) {
        elements.stageCheckPanel.classList.add('hidden');
        elements.checkpointPanel.classList.remove('hidden');
    }
}

// ===========================
// STAGE CHECK (stages 1 & 2)
// ===========================

function handleStageCheck() {
    stageCheckAttempts++;
    const ans = elements.stageAnswer.value.trim().toLowerCase();
    const cp  = stageCheckpoints[currentStage];
    if (!cp) return;

    const isCorrect = cp.valid.some(v => ans === v || ans.includes(v));
    if (isCorrect) {
        elements.stageCheckFeedback.textContent = '✓ Correct! Well done.';
        elements.stageCheckFeedback.className = 'checkpoint-feedback correct';
    } else {
        const hint = stageCheckAttempts >= 2 ? ` ${cp.hint}` : '';
        elements.stageCheckFeedback.textContent = `✗ Think again.${hint}`;
        elements.stageCheckFeedback.className = 'checkpoint-feedback incorrect';
    }
    logQuizInteraction(cp.question, ans, cp.valid[0], stageCheckAttempts, isCorrect);
}

// ===========================
// BUTTON HANDLERS
// ===========================

function handleReset() {
    stopAnimation();
    hideTooltip();

    a = PRESETS[0].a;   // 240
    b = PRESETS[0].b;   // 180
    c = Math.sqrt(a * a + b * b);
    outerSize    = a + b;
    currentAngle = 0;
    currentStage = 0;
    presetIndex  = 0;

    elements.aSlider.value        = a;
    elements.aDisplay.textContent = a / 10;
    elements.bSlider.value        = b;
    elements.bDisplay.textContent = b / 10;
    elements.rotationSlider.value = 0;
    elements.angleDisplay.textContent = '0';

    initSliderFills();
    updateDiagram(0);
    updateEquationDisplay();
    elements.instructionText.textContent = learningStages[0];
    elements.stageCheckPanel.classList.add('hidden');
    elements.checkpointPanel.classList.add('hidden');
    elements.answer1.value = '';
    elements.answer2.value = '';
    elements.checkpointFeedback.textContent = '';
    elements.checkpointFeedback.className = 'checkpoint-feedback';

    logInteraction('Reset clicked', `a: ${a/10}, b: ${b/10}`);
}

function handleToggleLabels() {
    labelsVisible = !labelsVisible;
    elements.toggleLabelsBtn.textContent = labelsVisible ? 'Hide Labels' : 'Show Labels';
    updateDiagram(currentAngle);
    logInteraction(`Labels ${labelsVisible ? 'shown' : 'hidden'}`, '');
}

function handleToggleHints() {
    hintsVisible = !hintsVisible;
    elements.toggleHintsBtn.textContent = hintsVisible ? 'Hide Hints' : 'Show Hints';
    elements.instructionPanel.classList.toggle('hidden', !hintsVisible);
    logInteraction(`Hints ${hintsVisible ? 'shown' : 'hidden'}`, '');
}

function handleToggleTitle() {
    titleVisible = !titleVisible;
    elements.toggleTitleBtn.textContent = titleVisible ? 'Hide Title' : 'Show Title';
    elements.titleSection.classList.toggle('hidden', !titleVisible);
    logInteraction(`Title ${titleVisible ? 'shown' : 'hidden'}`, '');
}

function handleRevealExplanation() {
    explanationRevealed = !explanationRevealed;
    elements.explanationText.classList.toggle('hidden', !explanationRevealed);
    elements.revealExplanationBtn.textContent =
        explanationRevealed ? 'Hide Explanation' : 'Reveal Explanation';
    logInteraction(`Explanation ${explanationRevealed ? 'revealed' : 'hidden'}`, '');
}

function handleCheckAnswer() {
    checkpointAttempts++;
    const ans1 = elements.answer1.value.trim().toLowerCase();
    const ans2 = elements.answer2.value.trim().toLowerCase();

    const validPairs = [
        ['a²','b²'],['a2','b2'],['a^2','b^2'],
        ['b²','a²'],['b2','a2'],['b^2','a^2']
    ];
    const isCorrect = validPairs.some(p =>
        (ans1 === p[0] && ans2 === p[1]) || (ans1 === p[1] && ans2 === p[0]));

    if (isCorrect) {
        elements.checkpointFeedback.textContent = '✓ Correct! Well done!';
        elements.checkpointFeedback.className = 'checkpoint-feedback correct';
    } else {
        elements.checkpointFeedback.textContent = '✗ Not quite. Try again! (Hint: Look at the labels on the squares)';
        elements.checkpointFeedback.className = 'checkpoint-feedback incorrect';
    }
    logQuizInteraction('c² = ____ + ____', `${ans1} + ${ans2}`, 'a² + b²', checkpointAttempts, isCorrect);
}

function handleClearLog() {
    interactionLog = [];
    elements.logEntries.innerHTML = '';
    startTime = Date.now();
    logInteraction('Log cleared', '');
}

function handleToggleAnalytics() {
    analyticsCollapsed = !analyticsCollapsed;
    elements.analyticsContent.classList.toggle('collapsed', analyticsCollapsed);
    elements.toggleAnalyticsBtn.textContent = analyticsCollapsed ? 'Show Log' : 'Hide Log';
    elements.toggleAnalyticsBtn.setAttribute('aria-label',
        analyticsCollapsed ? 'Show interaction log' : 'Hide interaction log');
}

// ===========================
// ANALYTICS LOGGING
// ===========================

function logInteraction(action, details) {
    const timestamp = Math.floor((Date.now() - startTime) / 1000);
    const entry = { time: timestamp, action, details, type: 'interaction' };
    interactionLog.push(entry);
    displayLogEntry(entry);
}

function logQuizInteraction(question, studentAnswer, correctAnswer, attempt, isCorrect) {
    const timestamp = Math.floor((Date.now() - startTime) / 1000);
    const entry = {
        time: timestamp,
        action: 'Quiz answer submitted',
        details: `Q: "${question}" | Student: "${studentAnswer}" | Correct: "${correctAnswer}" | Attempt: ${attempt} | ${isCorrect ? 'CORRECT' : 'INCORRECT'}`,
        type: 'quiz'
    };
    interactionLog.push(entry);
    displayLogEntry(entry);
}

function displayLogEntry(entry) {
    const logDiv = document.createElement('div');
    logDiv.className = `log-entry ${entry.type}`;
    logDiv.textContent = `t=${entry.time}s • ${entry.action}${entry.details ? ' • ' + entry.details : ''}`;
    elements.logEntries.appendChild(logDiv);
    elements.logEntries.scrollTop = elements.logEntries.scrollHeight;
}

// ===========================
// START
// ===========================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}