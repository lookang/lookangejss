// ===========================
// CHARACTER DATA
// ===========================
// Complete list of characters with Pinyin and English meanings
const characterData = [
    // Intro/Bonus characters
    { char: '我', pinyin: 'wǒ', meaning: 'I, me', sentence: '我是学生。(I am a student.)' },
    { char: '你', pinyin: 'nǐ', meaning: 'you', sentence: '你好吗？(How are you?)' },
    { char: '他', pinyin: 'tā', meaning: 'he, him', sentence: '他很高。(He is tall.)' },
    // Practice list
    { char: '捐', pinyin: 'juān', meaning: 'donate', sentence: '我们捐钱给慈善机构。(We donate money to charity.)' },
    { char: '装', pinyin: 'zhuāng', meaning: 'pack,装', sentence: '请装好你的书包。(Please pack your school bag.)' },
    { char: '鲜', pinyin: 'xiān', meaning: 'fresh', sentence: '这些水果很新鲜。(These fruits are very fresh.)' },
    { char: '适', pinyin: 'shì', meaning: 'suitable', sentence: '这件衣服很适合你。(This clothing suits you well.)' },
    { char: '糕', pinyin: 'gāo', meaning: 'cake', sentence: '生日蛋糕很好吃。(The birthday cake is delicious.)' },
    { char: '饼', pinyin: 'bǐng', meaning: 'biscuit, cake', sentence: '我喜欢吃月饼。(I like to eat mooncakes.)' },
    { char: '私', pinyin: 'sī', meaning: 'private', sentence: '这是我的私人物品。(This is my private item.)' },
    { char: '煮', pinyin: 'zhǔ', meaning: 'cook, boil', sentence: '妈妈在煮饭。(Mom is cooking rice.)' },
    { char: '烧', pinyin: 'shāo', meaning: 'burn, cook', sentence: '爸爸在烧菜。(Dad is cooking dishes.)' },
    { char: '怪', pinyin: 'guài', meaning: 'strange, blame', sentence: '这件事很奇怪。(This matter is strange.)' },
    { char: '甜', pinyin: 'tián', meaning: 'sweet', sentence: '这个糖果很甜。(This candy is very sweet.)' },
    { char: '转', pinyin: 'zhuǎn', meaning: 'turn, rotate', sentence: '请向左转。(Please turn left.)' },
    { char: '幸', pinyin: 'xìng', meaning: 'fortunate', sentence: '我很幸运。(I am very fortunate.)' },
    { char: '福', pinyin: 'fú', meaning: 'blessing, happiness', sentence: '祝你幸福快乐！(Wish you happiness and joy!)' }
];

// ===========================
// xAPI SCORE REPORTING
// Updates hidden DOM elements (id="xapi-score", id="xapi-total") so the
// lib/xAPI.js timeline tracker can read and submit the score to SLS.
// Also calls window.storeState() directly for an immediate flush.
// ===========================
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
                          ' | Mode: ' + (typeof currentMode !== 'undefined' ? currentMode : 'unknown'),
                reason: 'character-complete'
            });
        }
    } catch (e) {}
    console.log('[xAPI] Score updated:', completedCount + '/' + totalCount);
}

// ===========================
// ANALYTICS / ACTION LOG
// ===========================
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

// ===========================
// GLOBAL STATE MANAGEMENT
// ===========================
let currentIndex = 0;
let currentMode = 'learn'; // 'learn' or 'test'
let writer = null;
let completedCharacters = new Set();
let showInfo = true;

// Audio context for success sound (using Web Audio API)
let audioContext = null;

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio context
    initAudioContext();

    // Init analytics
    analytics.init();

    // Render character list in sidebar
    renderCharacterList();

    // Load first character
    loadCharacter(currentIndex);

    // Attach event listeners
    attachEventListeners();

    // Update total words count
    document.getElementById('total-words').textContent = characterData.length;
});

// ===========================
// AUDIO INITIALIZATION
// ===========================
function initAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Play success sound using Web Audio API (no external files needed)
function playSuccessSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ===========================
// RENDER CHARACTER LIST
// ===========================
function renderCharacterList() {
    const charList = document.getElementById('char-list');
    charList.innerHTML = '';
    
    characterData.forEach((data, index) => {
        const charItem = document.createElement('div');
        charItem.className = 'char-item';
        charItem.textContent = data.char;
        charItem.setAttribute('data-index', index);
        charItem.title = `${data.char} (${data.pinyin}) - ${data.meaning}`;
        
        // Mark as active if current
        if (index === currentIndex) {
            charItem.classList.add('active');
        }
        
        // Mark as completed
        if (completedCharacters.has(index)) {
            charItem.classList.add('completed');
        }
        
        // Click to jump to character
        charItem.addEventListener('click', function() {
            loadCharacter(index);
        });
        
        charList.appendChild(charItem);
    });
}

// ===========================
// LOAD CHARACTER
// ===========================
function loadCharacter(index) {
    currentIndex = index;
    const data = characterData[index];
    analytics.log('📖', 'Loaded: ' + data.char + ' (' + data.pinyin + ')', (index + 1) + '/' + characterData.length, 'nav');

    // Update progress display
    document.getElementById('current-word').textContent = index + 1;
    
    // Update character display
    document.getElementById('display-char').textContent = data.char;
    document.getElementById('pinyin-display').textContent = data.pinyin;
    document.getElementById('meaning-display').textContent = data.meaning;
    
    // Update sidebar active state
    renderCharacterList();
    
    // Hide success message
    hideSuccessMessage();
    
    // Initialize Hanzi Writer
    initializeHanziWriter(data.char);
}

// ===========================
// HANZI WRITER INITIALIZATION
// ===========================
function initializeHanziWriter(character) {
    // Clear previous writer
    const targetDiv = document.getElementById('character-target');
    targetDiv.innerHTML = '';
    
    // Create new Hanzi Writer instance
    writer = HanziWriter.create('character-target', character, {
        charDataLoader: function(char, onLoad, onError) {
            var data = HANZI_DATA[char];
            if (data) { onLoad(data); } else { onError('No data for: ' + char); }
        },
        width: targetDiv.offsetWidth || 400,
        height: targetDiv.offsetHeight || 400,
        padding: 20,
        strokeAnimationSpeed: 2,
        delayBetweenStrokes: 200,
        strokeColor: '#667eea',
        radicalColor: '#764ba2',
        outlineColor: '#ddd',
        drawingColor: '#333',
        showOutline: currentMode === 'learn',
        showCharacter: currentMode === 'learn',
        
        // Quiz options for test mode
        highlightOnComplete: true,
        highlightCompleteColor: '#28a745',
        
        // Callbacks
        onCorrectStroke: function(strokeData) {
            analytics.log('✅', 'Correct stroke', 'Stroke #' + (strokeData.strokeNum + 1), 'correct');
            console.log('Correct stroke:', strokeData.strokeNum);
        },
        onMistake: function(strokeData) {
            analytics.log('❌', 'Incorrect stroke', 'Expected #' + (strokeData.strokeNum + 1), 'mistake');
            console.log('Wrong stroke. Expected:', strokeData.strokeNum);
            handleMistake();
        },
        onComplete: function(summaryData) {
            analytics.log('🎉', 'Character completed: ' + characterData[currentIndex].char, characterData[currentIndex].pinyin + ' – ' + characterData[currentIndex].meaning, 'complete');
            console.log('Character completed!');
            handleCompletion();
        }
    });
    
    // If in test mode, start quiz
    if (currentMode === 'test') {
        writer.quiz({
            onMistake: function(strokeData) {
                analytics.log('❌', 'Incorrect stroke (test)', 'Expected #' + (strokeData.strokeNum + 1), 'mistake');
                handleMistake();
            },
            onComplete: function(summaryData) {
                analytics.log('🎉', 'Character completed: ' + characterData[currentIndex].char, 'Test mode', 'complete');
                handleCompletion();
            },
            highlightOnComplete: true,
            highlightCompleteColor: '#28a745'
        });
    }
}

// ===========================
// HANDLE STROKE MISTAKE
// ===========================
function handleMistake() {
    // Shake the canvas
    const canvas = document.querySelector('.canvas-container');
    canvas.classList.add('shake');
    
    setTimeout(() => {
        canvas.classList.remove('shake');
    }, 500);
    
    // Show hint in test mode
    if (currentMode === 'test') {
        writer.showOutline({
            duration: 1000
        });
    }
}

// ===========================
// HANDLE CHARACTER COMPLETION
// ===========================
function handleCompletion() {
    // Play success sound
    playSuccessSound();

    // Mark as completed
    completedCharacters.add(currentIndex);

    // Update sidebar
    renderCharacterList();

    // Show success message
    showSuccessMessage();

    // xAPI: update score = number of unique characters completed
    updateXapiScore(completedCharacters.size, characterData.length);
    analytics.log('📡', 'xAPI score updated', completedCharacters.size + '/' + characterData.length + ' characters', 'control');
}

// ===========================
// SUCCESS MESSAGE
// ===========================
function showSuccessMessage() {
    const data = characterData[currentIndex];
    const successMsg = document.getElementById('success-message');
    const successDetails = document.getElementById('success-details');
    
    successDetails.innerHTML = `
        <strong>${data.char}</strong> (${data.pinyin})<br>
        ${data.sentence}
    `;
    
    successMsg.classList.remove('hidden');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        hideSuccessMessage();
    }, 4000);
}

function hideSuccessMessage() {
    const successMsg = document.getElementById('success-message');
    successMsg.classList.add('hidden');
}

// ===========================
// EVENT LISTENERS
// ===========================
function attachEventListeners() {
    // Mode toggle button
    document.getElementById('mode-btn').addEventListener('click', function() {
        toggleMode();
    });

    // Play animation button
    document.getElementById('animate-btn').addEventListener('click', function() {
        analytics.log('▶️', 'Play Animation clicked', characterData[currentIndex].char, 'control');
        if (writer) {
            writer.animateCharacter({
                onComplete: function() {
                    analytics.log('✔', 'Animation finished', characterData[currentIndex].char, 'control');
                    console.log('Animation complete');
                }
            });
        }
    });

    // Reset canvas button
    document.getElementById('reset-btn').addEventListener('click', function() {
        analytics.log('↺', 'Reset Canvas clicked', characterData[currentIndex].char, 'control');
        resetCanvas();
    });

    // Toggle Pinyin/Info button
    document.getElementById('toggle-pinyin-btn').addEventListener('click', function() {
        toggleInfo();
        analytics.log('👁', 'Info toggled', showInfo ? 'Shown' : 'Hidden', 'control');
    });

    // Next word button
    document.getElementById('next-btn').addEventListener('click', function() {
        analytics.log('→', 'Next Word clicked', (currentIndex + 2 > characterData.length ? 1 : currentIndex + 2) + '/' + characterData.length, 'nav');
        nextCharacter();
    });

    // Sidebar character clicks
    document.getElementById('char-list').addEventListener('click', function(e) {
        const item = e.target.closest('.char-item');
        if (item) {
            const idx = parseInt(item.getAttribute('data-index'), 10);
            analytics.log('🔍', 'Sidebar: jumped to ' + characterData[idx].char, (idx + 1) + '/' + characterData.length, 'nav');
        }
    });
}

// ===========================
// MODE TOGGLE (LEARN/TEST)
// ===========================
function toggleMode() {
    currentMode = currentMode === 'learn' ? 'test' : 'learn';
    analytics.log('⚙️', 'Mode toggled', currentMode === 'learn' ? 'Learn Mode' : 'Test Mode', 'control');

    const modeText = document.getElementById('mode-text');
    modeText.textContent = currentMode === 'learn' ? 'Learn Mode' : 'Test Mode';
    
    // Reload character with new mode
    loadCharacter(currentIndex);
}

// ===========================
// RESET CANVAS
// ===========================
function resetCanvas() {
    if (writer) {
        // Cancel any ongoing quiz
        if (currentMode === 'test') {
            writer.cancelQuiz();
        }
        
        // Reload the character
        loadCharacter(currentIndex);
    }
}

// ===========================
// TOGGLE INFO DISPLAY
// ===========================
function toggleInfo() {
    showInfo = !showInfo;
    const charDetails = document.querySelector('.char-details');
    const toggleText = document.getElementById('toggle-pinyin-text');
    
    if (showInfo) {
        charDetails.classList.remove('hidden');
        toggleText.textContent = 'Hide Info';
    } else {
        charDetails.classList.add('hidden');
        toggleText.textContent = 'Show Info';
    }
}

// ===========================
// NEXT CHARACTER
// ===========================
function nextCharacter() {
    if (currentIndex < characterData.length - 1) {
        loadCharacter(currentIndex + 1);
    } else {
        // Loop back to first character
        loadCharacter(0);
    }
}

// ===========================
// RESPONSIVE CANVAS RESIZE
// ===========================
window.addEventListener('resize', function() {
    // Reload character to adjust canvas size
    if (writer) {
        loadCharacter(currentIndex);
    }
});