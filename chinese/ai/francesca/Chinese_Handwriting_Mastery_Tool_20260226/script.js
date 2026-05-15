/**
 * Chinese Handwriting Mastery Tool
 * Uses Hanzi Writer library for stroke-by-stroke character learning
 * Implements Practice and Test modes with immediate feedback
 */

// ===================================
// VOCABULARY DATA
// ===================================
const vocabulary = [
    { char: '营', pinyin: 'yíng', english: 'camp, operate' },
    { char: '养', pinyin: 'yǎng', english: 'raise, nourish' },
    { char: '蛋', pinyin: 'dàn', english: 'egg' },
    { char: '黄', pinyin: 'huáng', english: 'yellow' },
    { char: '形', pinyin: 'xíng', english: 'shape, form' },
    { char: '状', pinyin: 'zhuàng', english: 'condition, state' },
    { char: '炒', pinyin: 'chǎo', english: 'stir-fry' },
    { char: '嘴', pinyin: 'zuǐ', english: 'mouth' },
    { char: '异', pinyin: 'yì', english: 'different, strange' },
    { char: '答', pinyin: 'dá', english: 'answer' },
    { char: '谈', pinyin: 'tán', english: 'talk, chat' },
    { char: '似', pinyin: 'sì', english: 'similar, like' },
    { char: '懂', pinyin: 'dǒng', english: 'understand' },
    { char: '劳', pinyin: 'láo', english: 'labor, work' },
    { char: '累', pinyin: 'lèi', english: 'tired,累' }
];

// ===================================
// xAPI SCORE REPORTING
// Updates hidden DOM elements (id="xapi-score", id="xapi-total") so the
// lib/xAPI.js timeline tracker can read and submit the score to SLS.
// Also calls window.storeState() directly for an immediate flush.
// ===================================
function updateXapiScore(completedCount, totalCount) {
    var scoreEl = document.getElementById('xapi-score');
    var totalEl = document.getElementById('xapi-total');
    if (scoreEl) scoreEl.textContent = completedCount;
    if (totalEl) totalEl.textContent = totalCount;
    try {
        if (typeof window.storeState === 'function') {
            window.storeState({
                score: completedCount,
                max: totalCount,
                feedback: 'Characters completed: ' + completedCount + '/' + totalCount +
                          ' | Mode: ' + (isPracticeMode ? 'Practice' : 'Test'),
                reason: 'character-complete'
            });
        }
    } catch (e) {}
    console.log('[xAPI] Score updated:', completedCount + '/' + totalCount);
}

// ===================================
// ANALYTICS / ACTION LOG
// ===================================
const analytics = {
    startTime: Date.now(),
    logEl: null,

    init() {
        this.logEl = document.getElementById('analyticsLog');
        document.getElementById('clearLogBtn').addEventListener('click', () => this.clear());
        document.getElementById('toggleAnalyticsBtn').addEventListener('click', () => this.toggle());
    },

    _relTime() {
        const s = ((Date.now() - this.startTime) / 1000).toFixed(1);
        return 't=' + s + 's';
    },

    log(icon, action, state, type) {
        if (!this.logEl) return;
        const empty = this.logEl.querySelector('.analytics-empty');
        if (empty) empty.remove();

        const entry = document.createElement('div');
        entry.className = 'log-entry log-' + (type || 'control');
        entry.innerHTML =
            '<span class="log-time">' + this._relTime() + '</span>' +
            '<span class="log-icon">' + icon + '</span>' +
            '<span class="log-action">' + action + '</span>' +
            (state ? '<span class="log-state">' + state + '</span>' : '');
        this.logEl.appendChild(entry);
        this.logEl.scrollTop = this.logEl.scrollHeight;
    },

    clear() {
        if (!this.logEl) return;
        this.logEl.innerHTML = '<div class="analytics-empty">Interactions will appear here…</div>';
        this.startTime = Date.now();
    },

    toggle() {
        const panel = document.getElementById('analyticsPanel');
        const btn = document.getElementById('toggleAnalyticsBtn');
        panel.classList.toggle('collapsed');
        btn.textContent = panel.classList.contains('collapsed') ? '▶' : '▼';
    }
};

// ===================================
// STATE MANAGEMENT
// ===================================
let currentIndex = 0;
let writer = null;
let isPracticeMode = true;
let showPinyin = true;
let isAnimating = false;
let completedCharacters = new Set(); // track which indices have been completed

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
    progressText: document.getElementById('progressText'),
    characterTarget: document.getElementById('characterTarget'),
    completionMessage: document.getElementById('completionMessage'),
    characterInfo: document.getElementById('characterInfo'),
    feedbackPanel: document.getElementById('feedbackPanel'),
    pinyinDisplay: document.getElementById('pinyinDisplay'),
    englishDisplay: document.getElementById('englishDisplay'),
    modeIndicator: document.getElementById('modeIndicator'),
    modeText: document.getElementById('modeText'),
    watchBtn: document.getElementById('watchBtn'),
    resetBtn: document.getElementById('resetBtn'),
    nextBtn: document.getElementById('nextBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    modeToggle: document.getElementById('modeToggle'),
    tooltip: document.getElementById('tooltip')
};

// ===================================
// INITIALIZATION
// ===================================
function init() {
    // Check if running in iframe
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    }

    // Init analytics
    analytics.init();

    // Setup event listeners
    setupEventListeners();

    // Update progress
    updateProgress();

    // Defer first character load by one frame so the container has a measured size
    // (offsetWidth returns 0 if read before layout is painted)
    requestAnimationFrame(function() {
        loadCharacter(currentIndex);
    });
}

// ===================================
// CHARACTER LOADING
// ===================================
function loadCharacter(index) {
    const char = vocabulary[index];
    analytics.log('📖', 'Loaded character: ' + char.char + ' (' + char.pinyin + ')', (index + 1) + '/' + vocabulary.length, 'nav');
    
    // Clear previous writer
    if (writer) {
        writer = null;
    }
    
    // Clear the target container
    elements.characterTarget.innerHTML = '';
    
    // Hide completion message and feedback
    elements.completionMessage.classList.remove('show');
    elements.feedbackPanel.classList.remove('show');
    
    // Measure canvas size; defer one frame so layout is complete before reading offsetWidth
    var canvasSize = elements.characterTarget.offsetWidth || 300;

    // Create new Hanzi Writer instance
    writer = HanziWriter.create(elements.characterTarget, char.char, {
        width: canvasSize,
        height: canvasSize,
        padding: 20,
        charDataLoader: function(character, onComplete, onError) {
            // Try loading from local hanzi-data folder first (SLS offline compatibility)
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'hanzi-data/' + character + '.json', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    onComplete(JSON.parse(xhr.responseText));
                } else {
                    // Fallback to CDN if local file not found
                    fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/' + character + '.json')
                        .then(function(r) { return r.json(); })
                        .then(onComplete)
                        .catch(onError);
                }
            };
            xhr.onerror = function() {
                // Fallback to CDN on network error
                fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/' + character + '.json')
                    .then(function(r) { return r.json(); })
                    .then(onComplete)
                    .catch(onError);
            };
            xhr.send();
        },
        strokeColor: '#333',
        radicalColor: '#168',
        // Practice: show outline always. Test: start hidden; shown briefly on mistake.
        outlineColor: '#ddd',
        showOutline: isPracticeMode,
        showCharacter: false,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 100,

        // Vivid blue so student strokes are clearly visible against white
        highlightColor: '#4ade80',
        drawingColor: '#2563eb',

        // Quiz configuration
        leniency: 0.8,
        // In test mode disable built-in per-stroke hint; we show the full outline instead
        showHintAfterMisses: isPracticeMode ? 2 : false,
        highlightOnComplete: true
    });

    // Start quiz mode (HanziWriter v3 queues this until char data finishes loading)
    writer.quiz({
        onMistake: function(strokeData) {
            handleIncorrectStroke(strokeData);
        },
        onCorrectStroke: function(strokeData) {
            handleCorrectStroke(strokeData);
        },
        onComplete: function(summaryData) {
            handleCharacterComplete(char);
        }
    });
}

// ===================================
// FEEDBACK HANDLERS
// ===================================
function handleCorrectStroke(strokeData) {
    // Visual feedback: pulse animation
    elements.characterTarget.classList.add('pulse');
    setTimeout(() => {
        elements.characterTarget.classList.remove('pulse');
    }, 400);

    analytics.log('✅', 'Correct stroke', 'Stroke #' + (strokeData.strokeNum + 1), 'correct');
    console.log('✓ Correct stroke!', strokeData);
}

function handleIncorrectStroke(strokeData) {
    // Visual feedback: shake animation
    elements.characterTarget.classList.add('shake');
    setTimeout(() => {
        elements.characterTarget.classList.remove('shake');
    }, 500);

    // Flash red border
    elements.characterTarget.style.borderColor = '#ef4444';
    setTimeout(() => {
        elements.characterTarget.style.borderColor = '#333';
    }, 300);

    // TEST MODE: briefly show the full character outline as a scaffold hint, then hide it again
    if (!isPracticeMode && writer) {
        writer.showOutline();
        setTimeout(() => { writer.hideOutline(); }, 1200);
    }

    analytics.log('❌', 'Incorrect stroke', 'Expected stroke #' + (strokeData.strokeNum + 1), 'mistake');
    console.log('✗ Incorrect stroke', strokeData);
}

function handleCharacterComplete(char) {
    // Show completion message
    elements.characterInfo.textContent = `${char.char} - ${char.pinyin} (${char.english})`;
    elements.completionMessage.classList.add('show');

    // Show feedback panel with pinyin and English
    if (showPinyin) {
        elements.pinyinDisplay.textContent = char.pinyin;
        elements.englishDisplay.textContent = char.english;
        elements.feedbackPanel.classList.add('show');
    }

    analytics.log('🎉', 'Character completed: ' + char.char, char.pinyin + ' – ' + char.english, 'complete');
    console.log('✓ Character completed!', char);

    // Mark this index as completed and update xAPI score
    completedCharacters.add(currentIndex);
    var completedCount = completedCharacters.size;
    var totalCount = vocabulary.length;
    analytics.log('📡', 'xAPI score updated', completedCount + '/' + totalCount + ' characters', 'control');
    updateXapiScore(completedCount, totalCount);
}

// ===================================
// BUTTON ACTIONS
// ===================================
function watchAnimation() {
    if (isAnimating || !writer) return;

    analytics.log('▶️', 'Watch Animation clicked', vocabulary[currentIndex].char, 'control');
    isAnimating = true;
    elements.watchBtn.disabled = true;
    
    // Cancel quiz mode and show animation
    writer.cancelQuiz();
    writer.showCharacter();
    
    writer.animateCharacter({
        onComplete: function() {
            isAnimating = false;
            elements.watchBtn.disabled = false;
            
            // Restart quiz after animation
            setTimeout(() => {
                writer.hideCharacter();
                writer.quiz({
                    onMistake: handleIncorrectStroke,
                    onCorrectStroke: handleCorrectStroke,
                    onComplete: () => handleCharacterComplete(vocabulary[currentIndex])
                });
            }, 500);
        }
    });
}

function resetCanvas() {
    if (!writer) return;

    analytics.log('↺', 'Reset Canvas', vocabulary[currentIndex].char, 'control');
    // Hide completion message and feedback
    elements.completionMessage.classList.remove('show');
    elements.feedbackPanel.classList.remove('show');

    // Reload current character
    loadCharacter(currentIndex);
}

function nextCharacter() {
    analytics.log('→', 'Next Character', (currentIndex + 2 > vocabulary.length ? 1 : currentIndex + 2) + '/' + vocabulary.length, 'nav');
    currentIndex = (currentIndex + 1) % vocabulary.length;
    updateProgress();
    loadCharacter(currentIndex);
}

function toggleMode() {
    isPracticeMode = !isPracticeMode;

    // Update mode indicator
    if (isPracticeMode) {
        elements.modeText.textContent = 'Practice Mode';
        elements.modeIndicator.classList.remove('test-mode');
    } else {
        elements.modeText.textContent = 'Test Mode';
        elements.modeIndicator.classList.add('test-mode');
    }
    analytics.log('⚙️', 'Mode toggled', isPracticeMode ? 'Practice Mode' : 'Test Mode', 'control');
    
    // Reload character with new mode
    loadCharacter(currentIndex);
}

function toggleSettings() {
    showPinyin = !showPinyin;
    analytics.log('👁', 'Pinyin/Info toggled', showPinyin ? 'Shown' : 'Hidden', 'control');

    if (!showPinyin) {
        elements.feedbackPanel.classList.remove('show');
    }
}

// ===================================
// PROGRESS UPDATE
// ===================================
function updateProgress() {
    elements.progressText.textContent = `Character ${currentIndex + 1} of ${vocabulary.length}`;
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Button clicks
    elements.watchBtn.addEventListener('click', watchAnimation);
    elements.resetBtn.addEventListener('click', resetCanvas);
    elements.nextBtn.addEventListener('click', nextCharacter);
    elements.modeToggle.addEventListener('click', toggleMode);
    elements.settingsBtn.addEventListener('click', toggleSettings);
    
    // Tooltip functionality
    const buttonsWithTooltips = document.querySelectorAll('[title]');
    buttonsWithTooltips.forEach(btn => {
        btn.addEventListener('mouseenter', showTooltip);
        btn.addEventListener('mouseleave', hideTooltip);
        btn.addEventListener('mousemove', moveTooltip);
    });
    
    // Touch support for mobile
    elements.characterTarget.addEventListener('touchstart', handleTouchStart, { passive: false });
    elements.characterTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
    elements.characterTarget.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// ===================================
// TOOLTIP FUNCTIONS
// ===================================
function showTooltip(e) {
    const text = e.currentTarget.getAttribute('title');
    elements.tooltip.textContent = text;
    elements.tooltip.classList.add('show');
    moveTooltip(e);
}

function hideTooltip() {
    elements.tooltip.classList.remove('show');
}

function moveTooltip(e) {
    const x = e.clientX;
    const y = e.clientY;
    elements.tooltip.style.left = x + 10 + 'px';
    elements.tooltip.style.top = y + 10 + 'px';
}

// ===================================
// TOUCH SUPPORT
// ===================================
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    // Allow Hanzi Writer to handle touch
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    // Prevent scrolling while writing
    e.preventDefault();
}

function handleTouchEnd(e) {
    // Touch end handling
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
            nextCharacter();
            break;
        case 'r':
        case 'R':
            resetCanvas();
            break;
        case ' ':
            e.preventDefault();
            watchAnimation();
            break;
        case 'm':
        case 'M':
            toggleMode();
            break;
    }
}

// ===================================
// START APPLICATION
// ===================================
// Wait for DOM and Hanzi Writer to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}