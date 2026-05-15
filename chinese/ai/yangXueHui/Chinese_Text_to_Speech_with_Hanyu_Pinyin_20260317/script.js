// ===================================
// GLOBAL VARIABLES & DATA
// ===================================

// Chinese vocabulary data with Hanyu Pinyin
const vocabularyData = [
    { hanzi: '闯', pinyin: 'chuǎng', tone: 3, meaning: 'rush, break through' },
    { hanzi: '珍', pinyin: 'zhēn', tone: 1, meaning: 'precious, treasure' },
    { hanzi: '碎', pinyin: 'suì', tone: 4, meaning: 'broken, shattered' },
    { hanzi: '愤', pinyin: 'fèn', tone: 4, meaning: 'indignant, angry' },
    { hanzi: '严', pinyin: 'yán', tone: 2, meaning: 'strict, serious' },
    { hanzi: '肃', pinyin: 'sù', tone: 4, meaning: 'solemn, respectful' },
    { hanzi: '促', pinyin: 'cù', tone: 4, meaning: 'urge, promote' },
    { hanzi: '怀', pinyin: 'huái', tone: 2, meaning: 'cherish, embrace' },
    { hanzi: '疑', pinyin: 'yí', tone: 2, meaning: 'doubt, suspect' },
    { hanzi: '避', pinyin: 'bì', tone: 4, meaning: 'avoid, evade' },
    { hanzi: '禁', pinyin: 'jīn', tone: 1, meaning: 'prohibit, forbid' }
];

// State management
let state = {
    rate: 1.0,
    pitch: 1.0,
    showPinyin: true,
    showToneColors: true,
    currentPlayingIndex: -1,
    isPlaying: false,
    quizActive: false,
    quizScore: 0,
    quizTotal: 0,
    currentQuestion: null,
    quizAttempts: 0,
    startTime: Date.now()
};

// Analytics tracking
let actionLog = [];
let quizLog = [];

// Speech synthesis
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if opened in new tab (fullscreen mode)
    if (window.innerHeight > 500) {
        document.body.classList.add('fullscreen');
    }

    // Initialize the interactive
    initializeWordCards();
    initializeControls();
    initializeQuiz();
    initializeAnalytics();
    
    // Show tooltip on main panel hover
    const mainPanel = document.getElementById('mainPanel');
    const tooltip = document.getElementById('headerTooltip');
    
    mainPanel.addEventListener('mouseenter', function() {
        tooltip.classList.remove('hidden');
        setTimeout(() => tooltip.classList.add('hidden'), 3000);
    });

    // Log initial state
    logAction('🚀 Interactive loaded', 'Ready to explore Chinese pronunciation');
});

// ===================================
// WORD CARDS INITIALIZATION
// ===================================

function initializeWordCards() {
    const container = document.getElementById('wordCardsContainer');
    
    vocabularyData.forEach((word, index) => {
        const card = createWordCard(word, index);
        container.appendChild(card);
    });
}

function createWordCard(word, index) {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.dataset.index = index;
    
    // Hanzi (Chinese character)
    const hanzi = document.createElement('div');
    hanzi.className = 'hanzi';
    hanzi.textContent = word.hanzi;
    if (state.showToneColors) {
        hanzi.classList.add(`tone${word.tone}`);
    }
    
    // Pinyin (romanization)
    const pinyin = document.createElement('div');
    pinyin.className = 'pinyin';
    pinyin.textContent = word.pinyin;
    if (!state.showPinyin) {
        pinyin.style.display = 'none';
    }
    
    // Meaning
    const meaning = document.createElement('div');
    meaning.className = 'meaning';
    meaning.textContent = word.meaning;
    
    card.appendChild(hanzi);
    card.appendChild(pinyin);
    card.appendChild(meaning);
    
    // Add click/touch event
    card.addEventListener('click', () => speakWord(index));
    card.addEventListener('touchstart', (e) => {
        e.preventDefault();
        speakWord(index);
    });
    
    return card;
}

// ===================================
// SPEECH SYNTHESIS FUNCTIONS
// ===================================

function speakWord(index) {
    if (state.isPlaying) {
        stopSpeech();
    }
    
    const word = vocabularyData[index];
    const card = document.querySelector(`.word-card[data-index="${index}"]`);
    
    // Visual feedback
    card.classList.add('playing');
    state.currentPlayingIndex = index;
    
    // Create speech utterance
    currentUtterance = new SpeechSynthesisUtterance(word.hanzi);
    currentUtterance.lang = 'zh-CN';
    currentUtterance.rate = state.rate;
    currentUtterance.pitch = state.pitch;
    
    // Event handlers
    currentUtterance.onend = function() {
        card.classList.remove('playing');
        state.isPlaying = false;
        state.currentPlayingIndex = -1;
    };
    
    currentUtterance.onerror = function() {
        card.classList.remove('playing');
        state.isPlaying = false;
        state.currentPlayingIndex = -1;
    };
    
    // Speak
    state.isPlaying = true;
    speechSynthesis.speak(currentUtterance);
    
    // Log action
    logAction('🔊 Word spoken', `${word.hanzi} (${word.pinyin}) - Rate: ${state.rate}x, Pitch: ${state.pitch}`);
}

function playAllWords() {
    if (state.isPlaying) {
        stopSpeech();
        return;
    }
    
    let currentIndex = 0;
    
    function playNext() {
        if (currentIndex < vocabularyData.length) {
            speakWord(currentIndex);
            
            // Wait for current word to finish before playing next
            currentUtterance.onend = function() {
                const card = document.querySelector(`.word-card[data-index="${currentIndex}"]`);
                card.classList.remove('playing');
                currentIndex++;
                
                if (currentIndex < vocabularyData.length) {
                    setTimeout(playNext, 500); // Small pause between words
                } else {
                    state.isPlaying = false;
                    state.currentPlayingIndex = -1;
                }
            };
        }
    }
    
    state.isPlaying = true;
    playNext();
    logAction('▶️ Play all', 'Playing all words sequentially');
}

function stopSpeech() {
    speechSynthesis.cancel();
    
    // Remove playing class from all cards
    document.querySelectorAll('.word-card').forEach(card => {
        card.classList.remove('playing');
    });
    
    state.isPlaying = false;
    state.currentPlayingIndex = -1;
    
    logAction('⏹️ Stop', 'Speech stopped');
}

// ===================================
// CONTROLS INITIALIZATION
// ===================================

function initializeControls() {
    // Rate slider
    const rateSlider = document.getElementById('rateSlider');
    const rateValue = document.getElementById('rateValue');
    
    rateSlider.addEventListener('input', function() {
        state.rate = parseFloat(this.value);
        rateValue.textContent = state.rate.toFixed(1) + 'x';
        logAction('🎚️ Speed adjusted', `Speed set to ${state.rate.toFixed(1)}x`);
    });
    
    // Pitch slider
    const pitchSlider = document.getElementById('pitchSlider');
    const pitchValue = document.getElementById('pitchValue');
    
    pitchSlider.addEventListener('input', function() {
        state.pitch = parseFloat(this.value);
        pitchValue.textContent = state.pitch.toFixed(1);
        logAction('🎵 Pitch adjusted', `Pitch set to ${state.pitch.toFixed(1)}`);
    });
    
    // Pinyin toggle
    const pinyinToggle = document.getElementById('pinyinToggle');
    pinyinToggle.addEventListener('change', function() {
        state.showPinyin = this.checked;
        updateWordCardsDisplay();
        logAction('📝 Pinyin toggle', `Pinyin ${state.showPinyin ? 'shown' : 'hidden'}`);
    });
    
    // Tone color toggle
    const toneColorToggle = document.getElementById('toneColorToggle');
    toneColorToggle.addEventListener('change', function() {
        state.showToneColors = this.checked;
        updateWordCardsDisplay();
        logAction('🎨 Tone colors toggle', `Tone colors ${state.showToneColors ? 'enabled' : 'disabled'}`);
    });
    
    // Play all button
    const playAllBtn = document.getElementById('playAllBtn');
    playAllBtn.addEventListener('click', playAllWords);
    
    // Stop button
    const stopBtn = document.getElementById('stopBtn');
    stopBtn.addEventListener('click', stopSpeech);
    
    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', resetControls);
}

function updateWordCardsDisplay() {
    const cards = document.querySelectorAll('.word-card');
    
    cards.forEach((card, index) => {
        const word = vocabularyData[index];
        const hanzi = card.querySelector('.hanzi');
        const pinyin = card.querySelector('.pinyin');
        
        // Update pinyin visibility
        pinyin.style.display = state.showPinyin ? 'block' : 'none';
        
        // Update tone colors
        hanzi.className = 'hanzi';
        if (state.showToneColors) {
            hanzi.classList.add(`tone${word.tone}`);
        }
    });
}

function resetControls() {
    // Reset sliders
    document.getElementById('rateSlider').value = 1.0;
    document.getElementById('pitchSlider').value = 1.0;
    document.getElementById('rateValue').textContent = '1.0x';
    document.getElementById('pitchValue').textContent = '1.0';
    
    // Reset checkboxes
    document.getElementById('pinyinToggle').checked = true;
    document.getElementById('toneColorToggle').checked = true;
    
    // Reset state
    state.rate = 1.0;
    state.pitch = 1.0;
    state.showPinyin = true;
    state.showToneColors = true;
    
    // Update display
    updateWordCardsDisplay();
    
    // Stop any playing audio
    stopSpeech();
    
    logAction('🔄 Reset', 'All controls reset to default');
}

// ===================================
// QUIZ FUNCTIONALITY
// ===================================

function initializeQuiz() {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    
    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
}

function startQuiz() {
    state.quizActive = true;
    state.quizScore = 0;
    state.quizTotal = 0;
    state.quizAttempts = 0;
    quizLog = [];
    
    document.getElementById('startQuizBtn').classList.add('hidden');
    document.getElementById('quizInstruction').classList.add('hidden');
    document.getElementById('quizQuestion').classList.remove('hidden');
    document.getElementById('quizAnalytics').classList.remove('hidden');
    
    generateQuestion();
    
    logAction('🎯 Quiz started', 'Listening challenge begins');
}

function generateQuestion() {
    // Select a random word as the correct answer
    const correctIndex = Math.floor(Math.random() * vocabularyData.length);
    const correctWord = vocabularyData[correctIndex];
    
    // Select 3 other random words as distractors
    let distractors = [];
    while (distractors.length < 3) {
        const randomIndex = Math.floor(Math.random() * vocabularyData.length);
        if (randomIndex !== correctIndex && !distractors.includes(randomIndex)) {
            distractors.push(randomIndex);
        }
    }
    
    // Combine and shuffle options
    const options = [correctIndex, ...distractors];
    shuffleArray(options);
    
    state.currentQuestion = {
        correctIndex: correctIndex,
        correctWord: correctWord,
        options: options,
        answered: false,
        attempt: 1
    };
    
    // Display question
    document.getElementById('questionText').textContent = '🎧 Listen and select the correct character:';
    
    // Create option buttons
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    options.forEach((wordIndex, optionIndex) => {
        const word = vocabularyData[wordIndex];
        const optionBtn = document.createElement('div');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = word.hanzi;
        optionBtn.dataset.wordIndex = wordIndex;
        optionBtn.dataset.optionIndex = optionIndex;
        
        optionBtn.addEventListener('click', () => checkAnswer(wordIndex, optionBtn));
        optionBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(wordIndex, optionBtn);
        });
        
        optionsContainer.appendChild(optionBtn);
    });
    
    // Automatically play the correct word
    setTimeout(() => {
        speakQuizWord(correctIndex);
    }, 500);
    
    // Hide next button
    document.getElementById('nextQuestionBtn').classList.add('hidden');
}

function speakQuizWord(index) {
    const word = vocabularyData[index];
    
    currentUtterance = new SpeechSynthesisUtterance(word.hanzi);
    currentUtterance.lang = 'zh-CN';
    currentUtterance.rate = state.rate;
    currentUtterance.pitch = state.pitch;
    
    speechSynthesis.speak(currentUtterance);
}

function checkAnswer(selectedIndex, optionBtn) {
    if (state.currentQuestion.answered) return;
    
    const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
    const correctWord = state.currentQuestion.correctWord;
    const selectedWord = vocabularyData[selectedIndex];
    
    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.add('disabled');
    });
    
    if (isCorrect) {
        // Correct answer
        optionBtn.classList.add('correct');
        state.quizScore++;
        state.quizTotal++;
        state.currentQuestion.answered = true;
        
        // Log quiz result
        logQuizResult(
            state.quizTotal,
            `Listen and select: ${correctWord.hanzi} (${correctWord.pinyin})`,
            selectedWord.hanzi,
            correctWord.hanzi,
            true,
            state.currentQuestion.attempt
        );
        
        // Show next button
        setTimeout(() => {
            document.getElementById('nextQuestionBtn').classList.remove('hidden');
        }, 1000);
        
    } else {
        // Incorrect answer
        optionBtn.classList.add('incorrect');
        state.quizTotal++;
        state.currentQuestion.attempt++;
        
        // Log quiz result
        logQuizResult(
            state.quizTotal,
            `Listen and select: ${correctWord.hanzi} (${correctWord.pinyin})`,
            selectedWord.hanzi,
            correctWord.hanzi,
            false,
            state.currentQuestion.attempt
        );
        
        // Show correct answer after delay
        setTimeout(() => {
            document.querySelectorAll('.quiz-option').forEach(opt => {
                if (parseInt(opt.dataset.wordIndex) === state.currentQuestion.correctIndex) {
                    opt.classList.add('correct');
                }
            });
            state.currentQuestion.answered = true;
            
            // Show next button
            setTimeout(() => {
                document.getElementById('nextQuestionBtn').classList.remove('hidden');
            }, 1000);
        }, 1000);
    }
    
    // Update score display
    updateScoreDisplay();
}

function nextQuestion() {
    if (state.quizTotal >= 5) {
        // End quiz after 5 questions
        endQuiz();
    } else {
        generateQuestion();
    }
}

function endQuiz() {
    state.quizActive = false;
    
    const percentage = Math.round((state.quizScore / state.quizTotal) * 100);
    
    document.getElementById('quizQuestion').classList.add('hidden');
    document.getElementById('nextQuestionBtn').classList.add('hidden');
    document.getElementById('quizInstruction').classList.remove('hidden');
    document.getElementById('quizInstruction').innerHTML = `
        <h3>🎉 Quiz Complete!</h3>
        <p>Your Score: ${state.quizScore}/${state.quizTotal} (${percentage}%)</p>
        <p>${percentage >= 80 ? 'Excellent work! 优秀!' : percentage >= 60 ? 'Good effort! 加油!' : 'Keep practicing! 继续努力!'}</p>
    `;
    document.getElementById('startQuizBtn').classList.remove('hidden');
    document.getElementById('startQuizBtn').textContent = '🔄 Try Again';
    
    logAction('🏁 Quiz completed', `Final score: ${state.quizScore}/${state.quizTotal} (${percentage}%)`);
}

function updateScoreDisplay() {
    document.getElementById('scoreDisplay').textContent = `${state.quizScore}/${state.quizTotal}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===================================
// ANALYTICS FUNCTIONS
// ===================================

function initializeAnalytics() {
    const toggleBtn = document.getElementById('toggleAnalytics');
    const panel = document.getElementById('analyticsPanel');
    
    toggleBtn.addEventListener('click', function() {
        panel.classList.toggle('collapsed');
        this.textContent = panel.classList.contains('collapsed') ? '▲' : '▼';
    });
    
    const clearLogBtn = document.getElementById('clearLogBtn');
    clearLogBtn.addEventListener('click', function() {
        actionLog = [];
        document.getElementById('logEntries').innerHTML = '<p style="color: #95a5a6;">Log cleared</p>';
    });
}

function logAction(action, details) {
    const timestamp = ((Date.now() - state.startTime) / 1000).toFixed(1);
    const entry = {
        time: timestamp,
        action: action,
        details: details
    };
    
    actionLog.push(entry);
    
    // Update display
    const logContainer = document.getElementById('logEntries');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-timestamp">t=${timestamp}s</span><br>
        <strong>${action}</strong><br>
        ${details}
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Limit to 20 entries
    if (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

function logQuizResult(questionNum, question, studentAnswer, correctAnswer, isCorrect, attempt) {
    const timestamp = ((Date.now() - state.startTime) / 1000).toFixed(1);
    const entry = {
        time: timestamp,
        questionNum: questionNum,
        question: question,
        studentAnswer: studentAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        attempt: attempt
    };
    
    quizLog.push(entry);
    
    // Update display
    const logContainer = document.getElementById('quizLogEntries');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${isCorrect ? 'quiz-correct' : 'quiz-incorrect'}`;
    logEntry.innerHTML = `
        <span class="log-timestamp">t=${timestamp}s | Q${questionNum} | Attempt ${attempt}</span><br>
        <strong>${question}</strong><br>
        Student: ${studentAnswer} | Correct: ${correctAnswer}<br>
        ${isCorrect ? '✅ Correct' : '❌ Wrong'}
    `;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Limit to 20 entries
    if (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Prevent default touch behaviors for better mobile experience
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.word-card') || e.target.closest('.quiz-option')) {
        e.preventDefault();
    }
}, { passive: false });

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerHeight > 500) {
        document.body.classList.add('fullscreen');
    } else {
        document.body.classList.remove('fullscreen');
    }
});