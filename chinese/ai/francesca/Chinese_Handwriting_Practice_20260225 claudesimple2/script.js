// ===================================
// VOCABULARY DATA
// ===================================
const vocabulary = [
    { char: '视', pinyin: 'shì', english: 'to look at, to view' },
    { char: '题', pinyin: 'tí', english: 'topic, question' },
    { char: '连', pinyin: 'lián', english: 'to link, to connect' },
    { char: '续', pinyin: 'xù', english: 'to continue' },
    { char: '脑', pinyin: 'nǎo', english: 'brain' },
    { char: '持', pinyin: 'chí', english: 'to hold, to maintain' },
    { char: '户', pinyin: 'hù', english: 'household, door' },
    { char: '而', pinyin: 'ér', english: 'and, but' },
    { char: '且', pinyin: 'qiě', english: 'moreover, and' },
    { char: '松', pinyin: 'sōng', english: 'pine tree, loose' },
    { char: '差', pinyin: 'chà', english: 'difference, to lack' },
    { char: '担', pinyin: 'dān', english: 'to carry, to shoulder' },
    { char: '痛', pinyin: 'tòng', english: 'pain, painful' },
    { char: '害', pinyin: 'hài', english: 'harm, to harm' },
    { char: '惯', pinyin: 'guàn', english: 'habit, accustomed to' }
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
    // Immediate flush via the SLS xAPI glue (lib/xAPI.js)
    try {
        if (typeof window.storeState === 'function') {
            window.storeState({
                score: completedCount,
                max: totalCount,
                feedback: 'Characters completed: ' + completedCount + '/' + totalCount,
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
// GLOBAL STATE
// ===================================
let currentIndex = 0;
let writer = null;
let characterScores = []; // Store accuracy for each character
let currentCharacterStrokes = {
    total: 0,
    correct: 0,
    mistakes: 0
};

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
    currentChar: document.getElementById('currentChar'),
    pinyin: document.getElementById('pinyin'),
    english: document.getElementById('english'),
    pinyinToggle: document.getElementById('pinyinToggle'),
    englishToggle: document.getElementById('englishToggle'),
    characterTarget: document.getElementById('characterTarget'),
    animateBtn: document.getElementById('animateBtn'),
    resetBtn: document.getElementById('resetBtn'),
    nextBtn: document.getElementById('nextBtn'),
    globalAccuracy: document.getElementById('globalAccuracy'),
    progress: document.getElementById('progress'),
    scoreOverlay: document.getElementById('scoreOverlay'),
    scoreChar: document.getElementById('scoreChar'),
    scorePercentage: document.getElementById('scorePercentage'),
    scoreFeedback: document.getElementById('scoreFeedback'),
    strokesCorrect: document.getElementById('strokesCorrect'),
    strokesTotal: document.getElementById('strokesTotal'),
    continueBtn: document.getElementById('continueBtn')
};

// ===================================
// INITIALIZATION
// ===================================
function init() {
    // Detect if standalone (new tab) or iframe
    if (window.self === window.top) {
        document.body.classList.add('standalone');
    }

    // Init analytics
    analytics.init();

    // Load first character
    loadCharacter(currentIndex);

    // Setup event listeners
    setupEventListeners();

    // Update progress display
    updateProgress();
}

// ===================================
// LOAD CHARACTER
// ===================================
function loadCharacter(index) {
    const vocab = vocabulary[index];
    analytics.log('📖', 'Loaded character: ' + vocab.char + ' (' + vocab.pinyin + ')', (index + 1) + '/' + vocabulary.length, 'nav');

    // Update info display
    elements.currentChar.textContent = vocab.char;
    elements.pinyin.textContent = vocab.pinyin;
    elements.english.textContent = vocab.english;
    
    // Reset stroke tracking for new character
    currentCharacterStrokes = {
        total: 0,
        correct: 0,
        mistakes: 0
    };
    
    // Clear previous writer
    elements.characterTarget.innerHTML = '';
    
    // Initialize Hanzi Writer
    initializeWriter(vocab.char);
}

// ===================================
// INITIALIZE HANZI WRITER
// ===================================
function initializeWriter(character) {
    // Calculate responsive size
    const containerWidth = elements.characterTarget.offsetWidth;
    const size = Math.min(containerWidth, 450);
    
    // MODIFIED: Changed strokeColor to black (#000) instead of dark grey (#333)
    // This makes completed strokes appear in solid black color
    writer = HanziWriter.create(elements.characterTarget, character, {
        width: size,
        height: size,
        padding: 20,
        charDataLoader: function(char, onLoad, onError) {
            var charData = HANZI_DATA[char];
            if (charData) {
                onLoad(charData);
            } else {
                onError('No local data for: ' + char);
            }
        },
        strokeColor: '#000', // CHANGED: Black color for completed strokes (was #333)
        radicalColor: '#667eea',
        outlineColor: '#DDD',
        drawingColor: '#2ecc71',
        showCharacter: false,
        showOutline: true,
        showHintAfterMisses: 2,
        highlightOnComplete: true,
        highlightCompleteColor: '#2ecc71',
        drawingWidth: 4,
        
        // Stroke callbacks for accuracy tracking
        onCorrectStroke: function(strokeData) {
            currentCharacterStrokes.correct++;
            currentCharacterStrokes.total++;
            analytics.log('✅', 'Correct stroke', 'Stroke #' + (strokeData.strokeNum + 1), 'correct');
            // Visual feedback: already green from drawingColor
            playCorrectSound();
        },

        onMistake: function(strokeData) {
            currentCharacterStrokes.mistakes++;
            analytics.log('❌', 'Incorrect stroke', 'Expected #' + (strokeData.strokeNum + 1), 'mistake');
            // Visual feedback: flash red and shake
            const target = elements.characterTarget;
            target.classList.add('flash-red', 'shake');

            setTimeout(() => {
                target.classList.remove('flash-red', 'shake');
            }, 500);

            playIncorrectSound();
        },

        onComplete: function(summaryData) {
            // Calculate accuracy
            const accuracy = calculateAccuracy();

            // Store score
            characterScores[currentIndex] = accuracy;

            analytics.log('🎉', 'Character completed: ' + vocabulary[currentIndex].char, accuracy + '% accuracy', 'complete');
            // Show score overlay
            showScoreOverlay(accuracy);

            // Update global accuracy
            updateGlobalAccuracy();
        }
    });
    
    // Enable quiz mode (user draws)
    writer.quiz({
        onMistake: function(strokeData) {
            currentCharacterStrokes.mistakes++;
            analytics.log('❌', 'Incorrect stroke', 'Expected #' + (strokeData.strokeNum + 1), 'mistake');
            const target = elements.characterTarget;
            target.classList.add('flash-red', 'shake');

            setTimeout(() => {
                target.classList.remove('flash-red', 'shake');
            }, 500);

            playIncorrectSound();
        },
        onCorrectStroke: function(strokeData) {
            currentCharacterStrokes.correct++;
            currentCharacterStrokes.total++;
            analytics.log('✅', 'Correct stroke', 'Stroke #' + (strokeData.strokeNum + 1), 'correct');
            playCorrectSound();
        },
        onComplete: function(summaryData) {
            const accuracy = calculateAccuracy();
            characterScores[currentIndex] = accuracy;
            analytics.log('🎉', 'Character completed: ' + vocabulary[currentIndex].char, accuracy + '% accuracy', 'complete');

            // xAPI: update score = number of characters completed so far
            var completedCount = characterScores.filter(s => s !== undefined).length;
            updateXapiScore(completedCount, vocabulary.length);

            setTimeout(() => {
                showScoreOverlay(accuracy);
                updateGlobalAccuracy();
            }, 500);
        }
    });
}

// ===================================
// CALCULATE ACCURACY
// ===================================
function calculateAccuracy() {
    // Get total strokes from writer
    const totalStrokes = writer._character.strokes.length;
    
    // Calculate accuracy: (correct strokes / total strokes) * 100
    // Penalize for mistakes
    const maxAttempts = currentCharacterStrokes.correct + currentCharacterStrokes.mistakes;
    
    if (totalStrokes === 0) return 0;
    
    // Accuracy formula: correct strokes / (correct + mistakes) * 100
    // But ensure we have completed all strokes
    const accuracy = (currentCharacterStrokes.correct / Math.max(maxAttempts, totalStrokes)) * 100;
    
    return Math.round(Math.min(100, accuracy));
}

// ===================================
// SHOW SCORE OVERLAY
// ===================================
function showScoreOverlay(accuracy) {
    const vocab = vocabulary[currentIndex];
    
    elements.scoreChar.textContent = vocab.char;
    elements.scorePercentage.textContent = accuracy + '%';
    elements.strokesCorrect.textContent = currentCharacterStrokes.correct;
    elements.strokesTotal.textContent = writer._character.strokes.length;
    
    // Set feedback based on accuracy
    let feedback = '';
    let percentageClass = '';
    
    if (accuracy >= 90) {
        feedback = 'Writing Master! (书法大师)';
        percentageClass = '';
    } else if (accuracy >= 70) {
        feedback = 'Great Job! (真棒)';
        percentageClass = 'medium';
    } else {
        feedback = 'Keep Practicing! (加油)';
        percentageClass = 'low';
    }
    
    elements.scoreFeedback.textContent = feedback;
    elements.scorePercentage.className = 'score-percentage ' + percentageClass;
    
    // Show overlay
    elements.scoreOverlay.classList.add('show');
}

// ===================================
// HIDE SCORE OVERLAY
// ===================================
function hideScoreOverlay() {
    elements.scoreOverlay.classList.remove('show');
}

// ===================================
// UPDATE GLOBAL ACCURACY
// ===================================
function updateGlobalAccuracy() {
    if (characterScores.length === 0) {
        elements.globalAccuracy.textContent = '--%';
        return;
    }
    
    const sum = characterScores.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / characterScores.length);
    elements.globalAccuracy.textContent = avg + '%';
}

// ===================================
// UPDATE PROGRESS
// ===================================
function updateProgress() {
    elements.progress.textContent = `${currentIndex}/${vocabulary.length}`;
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Pinyin toggle
    elements.pinyinToggle.addEventListener('change', function() {
        if (this.checked) {
            elements.pinyin.classList.remove('hidden');
        } else {
            elements.pinyin.classList.add('hidden');
        }
    });
    
    // English toggle
    elements.englishToggle.addEventListener('change', function() {
        if (this.checked) {
            elements.english.classList.remove('hidden');
        } else {
            elements.english.classList.add('hidden');
        }
    });
    
    // Pinyin toggle
    elements.pinyinToggle.addEventListener('change', function() {
        analytics.log('👁', 'Pinyin toggled', this.checked ? 'Shown' : 'Hidden', 'control');
    });
    // Note: original listener below is kept; this one fires first for analytics only

    // English toggle log
    elements.englishToggle.addEventListener('change', function() {
        analytics.log('👁', 'English toggled', this.checked ? 'Shown' : 'Hidden', 'control');
    });

    // MODIFIED: Animate button - now shows complete character animation
    // Fixed issue where animation only showed left side of character
    elements.animateBtn.addEventListener('click', function() {
        if (writer) {
            analytics.log('▶️', 'Animate Stroke Order clicked', vocabulary[currentIndex].char, 'control');
            // First cancel any ongoing quiz
            writer.cancelQuiz();
            
            // CHANGED: Show the complete character during animation
            // This ensures both left and right parts are visible
            writer.showCharacter({
                duration: 500,
                onComplete: function() {
                    // Now animate all strokes in order
                    writer.animateCharacter({
                        onComplete: function() {
                            // After animation completes, hide character and restart quiz
                            writer.hideCharacter({
                                duration: 300,
                                onComplete: function() {
                                    // Restart quiz mode
                                    writer.quiz({
                                        onMistake: function(strokeData) {
                                            currentCharacterStrokes.mistakes++;
                                            const target = elements.characterTarget;
                                            target.classList.add('flash-red', 'shake');
                                            setTimeout(() => {
                                                target.classList.remove('flash-red', 'shake');
                                            }, 500);
                                            playIncorrectSound();
                                        },
                                        onCorrectStroke: function(strokeData) {
                                            currentCharacterStrokes.correct++;
                                            currentCharacterStrokes.total++;
                                            playCorrectSound();
                                        },
                                        onComplete: function(summaryData) {
                                            const accuracy = calculateAccuracy();
                                            characterScores[currentIndex] = accuracy;
                                            setTimeout(() => {
                                                showScoreOverlay(accuracy);
                                                updateGlobalAccuracy();
                                            }, 500);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
    // Reset button
    elements.resetBtn.addEventListener('click', function() {
        analytics.log('↺', 'Reset Character clicked', vocabulary[currentIndex].char, 'control');
        if (writer) {
            // Reset stroke tracking
            currentCharacterStrokes = {
                total: 0,
                correct: 0,
                mistakes: 0
            };
            
            // Cancel current quiz and start new one
            writer.cancelQuiz();
            writer.quiz({
                onMistake: function(strokeData) {
                    currentCharacterStrokes.mistakes++;
                    const target = elements.characterTarget;
                    target.classList.add('flash-red', 'shake');
                    setTimeout(() => {
                        target.classList.remove('flash-red', 'shake');
                    }, 500);
                    playIncorrectSound();
                },
                onCorrectStroke: function(strokeData) {
                    currentCharacterStrokes.correct++;
                    currentCharacterStrokes.total++;
                    playCorrectSound();
                },
                onComplete: function(summaryData) {
                    const accuracy = calculateAccuracy();
                    characterScores[currentIndex] = accuracy;
                    setTimeout(() => {
                        showScoreOverlay(accuracy);
                        updateGlobalAccuracy();
                    }, 500);
                }
            });
        }
    });
    
    // Next button
    elements.nextBtn.addEventListener('click', function() {
        analytics.log('→', 'Next Character clicked', (currentIndex + 2 > vocabulary.length ? 1 : currentIndex + 2) + '/' + vocabulary.length, 'nav');
        nextCharacter();
    });

    // Continue button in overlay
    elements.continueBtn.addEventListener('click', function() {
        analytics.log('→', 'Continue (score overlay)', vocabulary[currentIndex].char + ' → next', 'nav');
        hideScoreOverlay();
        nextCharacter();
    });
}

// ===================================
// NEXT CHARACTER
// ===================================
function nextCharacter() {
    currentIndex++;

    if (currentIndex >= vocabulary.length) {
        var scoredCount = characterScores.filter(s => s !== undefined).length;
        var totalCount = vocabulary.length;
        analytics.log('🏁', 'All characters completed!', scoredCount + '/' + totalCount + ' scored', 'complete');
        // Final xAPI flush with full score
        updateXapiScore(scoredCount, totalCount);
        // Loop back to start
        currentIndex = 0;
    }

    loadCharacter(currentIndex);
    updateProgress();
}

// ===================================
// AUDIO FEEDBACK (Web Audio API)
// ===================================
function playCorrectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silent fail if audio not supported
    }
}

function playIncorrectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Silent fail if audio not supported
    }
}

// ===================================
// RESPONSIVE RESIZE HANDLER
// ===================================
window.addEventListener('resize', function() {
    if (writer) {
        // Reload current character with new size
        loadCharacter(currentIndex);
    }
});

// ===================================
// START APPLICATION
// ===================================
// Wait for DOM and Hanzi Writer library to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}