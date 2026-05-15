// ===== VOCABULARY DATA =====
const vocabularyData = [
    { id: 1, word: "闯祸", pinyin: "chuǎng huò", meaning: "做错事，惹麻烦", tones: [3, 4] },
    { id: 2, word: "珍宝", pinyin: "zhēn bǎo", meaning: "很珍贵的宝贝", tones: [1, 3] },
    { id: 3, word: "碎片", pinyin: "suì piàn", meaning: "破了后的小块", tones: [4, 4] },
    { id: 4, word: "愤怒", pinyin: "fèn nù", meaning: "非常生气", tones: [4, 4] },
    { id: 5, word: "严肃", pinyin: "yán sù", meaning: "很认真，不说笑", tones: [2, 4] },
    { id: 6, word: "急促", pinyin: "jí cù", meaning: "又快又短", tones: [2, 4] },
    { id: 7, word: "怀疑", pinyin: "huái yí", meaning: "不太相信", tones: [2, 2] },
    { id: 8, word: "避开", pinyin: "bì kāi", meaning: "躲开", tones: [4, 1] },
    { id: 9, word: "不禁", pinyin: "bù jīn", meaning: "忍不住", tones: [4, 1] }
];

// ===== GLOBAL STATE =====
let currentMode = 'learn';
let speechRate = 1.0;
let speechPitch = 1.0;
let showPinyin = true;
let showToneColor = true;
let startTime = Date.now();
let quizState = {
    currentQuestion: 0,
    score: 0,
    questions: [],
    answered: false
};
let practiceState = {
    matches: {},
    // ADDED: Track placeholders for maintaining space
    placeholders: {}
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if fullscreen (not in iframe)
    if (window.self === window.top) {
        document.body.classList.add('fullscreen');
    }
    
    initializeEventListeners();
    initializeLearnMode();
    logAction('🎯 互动开始', '学生进入学习界面');
});

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Info icon
    document.getElementById('infoIcon').addEventListener('click', () => {
        document.getElementById('headerTooltip').classList.remove('hidden');
        logAction('ℹ️ 查看说明', '打开帮助提示');
    });
    
    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchMode(e.target.dataset.mode);
        });
    });
    
    // Audio controls
    document.getElementById('rateSlider').addEventListener('input', (e) => {
        speechRate = parseFloat(e.target.value);
        document.getElementById('rateValue').textContent = speechRate.toFixed(1) + 'x';
        logAction('🎚️ 调整语速', `语速设置为 ${speechRate.toFixed(1)}x`);
    });
    
    document.getElementById('pitchSlider').addEventListener('input', (e) => {
        speechPitch = parseFloat(e.target.value);
        document.getElementById('pitchValue').textContent = speechPitch.toFixed(1);
        logAction('🎚️ 调整音调', `音调设置为 ${speechPitch.toFixed(1)}`);
    });
    
    // Toggles
    document.getElementById('pinyinToggle').addEventListener('change', (e) => {
        showPinyin = e.target.checked;
        updatePinyinDisplay();
        logAction('👁️ 切换拼音', showPinyin ? '显示拼音' : '隐藏拼音');
    });
    
    document.getElementById('toneColorToggle').addEventListener('change', (e) => {
        showToneColor = e.target.checked;
        updateToneColorDisplay();
        logAction('🎨 切换声调颜色', showToneColor ? '显示声调颜色' : '隐藏声调颜色');
    });
    
    // Analytics controls
    document.getElementById('toggleAnalytics').addEventListener('click', () => {
        document.getElementById('analyticsPanel').classList.toggle('collapsed');
    });
    
    document.getElementById('clearAnalytics').addEventListener('click', () => {
        document.getElementById('actionLog').innerHTML = '';
        startTime = Date.now();
        logAction('🗑️ 清除记录', '学习记录已重置');
    });
}

// ===== MODE SWITCHING =====
function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update content visibility
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (mode === 'learn') {
        document.getElementById('learnMode').classList.add('active');
        logAction('📚 切换模式', '进入学习模式');
    } else if (mode === 'practice') {
        document.getElementById('practiceMode').classList.add('active');
        initializePracticeMode();
        logAction('✏️ 切换模式', '进入练习模式');
    } else if (mode === 'quiz') {
        document.getElementById('quizMode').classList.add('active');
        initializeQuizMode();
        logAction('📝 切换模式', '进入测验模式');
    }
}

// ===== LEARN MODE =====
function initializeLearnMode() {
    const grid = document.getElementById('vocabGrid');
    grid.innerHTML = '';
    
    vocabularyData.forEach(item => {
        const card = createVocabCard(item);
        grid.appendChild(card);
    });
}

function createVocabCard(item) {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    
    const number = document.createElement('div');
    number.className = 'vocab-number';
    number.textContent = item.id;
    
    const word = document.createElement('div');
    word.className = 'vocab-word';
    word.textContent = item.word;
    
    const pinyin = document.createElement('div');
    pinyin.className = 'vocab-pinyin' + (showPinyin ? '' : ' hidden');
    pinyin.innerHTML = formatPinyinWithTones(item.pinyin, item.tones);
    
    const meaning = document.createElement('div');
    meaning.className = 'vocab-meaning';
    meaning.textContent = item.meaning;
    
    card.appendChild(number);
    card.appendChild(word);
    card.appendChild(pinyin);
    card.appendChild(meaning);
    
    // Click to speak
    card.addEventListener('click', () => {
        speakText(item.word);
        logAction('🔊 播放发音', `"${item.word}" - ${item.pinyin}`);
    });
    
    // Touch support
    card.addEventListener('touchstart', (e) => {
        e.preventDefault();
        card.click();
    });
    
    return card;
}

// ===== PRACTICE MODE =====
function initializePracticeMode() {
    practiceState.matches = {};
    // ADDED: Reset placeholders tracking
    practiceState.placeholders = {};
    
    const wordColumn = document.getElementById('wordColumn');
    const meaningColumn = document.getElementById('meaningColumn');
    
    wordColumn.innerHTML = '';
    meaningColumn.innerHTML = '';
    
    // Create word slots
    vocabularyData.forEach(item => {
        const slot = document.createElement('div');
        slot.className = 'word-slot';
        slot.dataset.wordId = item.id;
        
        const label = document.createElement('div');
        label.className = 'word-label';
        label.textContent = item.word;
        
        slot.appendChild(label);
        wordColumn.appendChild(slot);
        
        // Drop zone events
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('touchmove', handleTouchMove);
        slot.addEventListener('touchend', handleTouchEnd);
    });
    
    // Create meaning cards (shuffled)
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => {
        const card = document.createElement('div');
        card.className = 'meaning-card';
        card.textContent = item.meaning;
        card.dataset.meaningId = item.id;
        card.draggable = true;
        
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('touchstart', handleTouchStart);
        
        meaningColumn.appendChild(card);
    });
    
    // Control buttons
    document.getElementById('checkAnswers').onclick = checkPracticeAnswers;
    document.getElementById('resetPractice').onclick = () => {
        initializePracticeMode();
        logAction('🔄 重置练习', '重新开始配对练习');
    };
}

// Drag and Drop handlers
let draggedElement = null;
let touchTarget = null;

// MODIFIED: Create placeholder when drag starts to maintain space
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    
    // ADDED: Create placeholder to maintain space in meaning column
    const meaningId = draggedElement.dataset.meaningId;
    if (!practiceState.placeholders[meaningId]) {
        const placeholder = document.createElement('div');
        placeholder.className = 'meaning-placeholder';
        placeholder.textContent = '(拖动中...)';
        placeholder.dataset.placeholderId = meaningId;
        
        // Insert placeholder after the dragged element
        draggedElement.parentNode.insertBefore(placeholder, draggedElement.nextSibling);
        practiceState.placeholders[meaningId] = placeholder;
    }
}

// MODIFIED: Clean up placeholder when drag ends
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // ADDED: Remove placeholder if card wasn't placed in a slot
    const meaningId = e.target.dataset.meaningId;
    const placeholder = practiceState.placeholders[meaningId];
    
    // Only remove placeholder if the card is back in the meaning column
    if (placeholder && e.target.parentNode.id === 'meaningColumn') {
        placeholder.remove();
        delete practiceState.placeholders[meaningId];
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

// MODIFIED: Handle placeholder cleanup when dropping
function handleDrop(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const slot = e.currentTarget;
    const wordId = slot.dataset.wordId;
    const meaningId = draggedElement.dataset.meaningId;
    
    // Remove any existing card in this slot and return it to meaning column
    const existing = slot.querySelector('.meaning-card');
    if (existing) {
        const existingId = existing.dataset.meaningId;
        const meaningColumn = document.getElementById('meaningColumn');
        
        // ADDED: If there's a placeholder for the existing card, replace it
        const existingPlaceholder = practiceState.placeholders[existingId];
        if (existingPlaceholder) {
            meaningColumn.insertBefore(existing, existingPlaceholder);
            existingPlaceholder.remove();
            delete practiceState.placeholders[existingId];
        } else {
            meaningColumn.appendChild(existing);
        }
        
        existing.classList.remove('placed');
    }
    
    // Place the dragged card
    slot.appendChild(draggedElement);
    draggedElement.classList.add('placed');
    slot.classList.add('has-card');
    
    practiceState.matches[wordId] = meaningId;
    
    // ADDED: Remove the placeholder for the dragged card
    const placeholder = practiceState.placeholders[meaningId];
    if (placeholder) {
        placeholder.remove();
        delete practiceState.placeholders[meaningId];
    }
    
    logAction('🎯 拖动配对', `将意思卡片拖到词语 "${vocabularyData.find(v => v.id == wordId).word}"`);
}

// Touch support for drag and drop
// MODIFIED: Add placeholder support for touch events
function handleTouchStart(e) {
    touchTarget = e.target;
    touchTarget.classList.add('dragging');
    
    // ADDED: Create placeholder for touch drag
    const meaningId = touchTarget.dataset.meaningId;
    if (!practiceState.placeholders[meaningId]) {
        const placeholder = document.createElement('div');
        placeholder.className = 'meaning-placeholder';
        placeholder.textContent = '(拖动中...)';
        placeholder.dataset.placeholderId = meaningId;
        
        touchTarget.parentNode.insertBefore(placeholder, touchTarget.nextSibling);
        practiceState.placeholders[meaningId] = placeholder;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchTarget) return;
    
    const touch = e.touches[0];
    touchTarget.style.position = 'fixed';
    touchTarget.style.left = touch.clientX - 50 + 'px';
    touchTarget.style.top = touch.clientY - 25 + 'px';
    touchTarget.style.zIndex = 1000;
}

// MODIFIED: Handle placeholder cleanup for touch events
function handleTouchEnd(e) {
    if (!touchTarget) return;
    
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    
    touchTarget.style.position = '';
    touchTarget.style.left = '';
    touchTarget.style.top = '';
    touchTarget.style.zIndex = '';
    touchTarget.classList.remove('dragging');
    
    const meaningId = touchTarget.dataset.meaningId;
    
    if (dropTarget && dropTarget.classList.contains('word-slot')) {
        const slot = dropTarget;
        const wordId = slot.dataset.wordId;
        
        const existing = slot.querySelector('.meaning-card');
        if (existing) {
            const existingId = existing.dataset.meaningId;
            const meaningColumn = document.getElementById('meaningColumn');
            
            // ADDED: Handle placeholder for existing card
            const existingPlaceholder = practiceState.placeholders[existingId];
            if (existingPlaceholder) {
                meaningColumn.insertBefore(existing, existingPlaceholder);
                existingPlaceholder.remove();
                delete practiceState.placeholders[existingId];
            } else {
                meaningColumn.appendChild(existing);
            }
            
            existing.classList.remove('placed');
        }
        
        slot.appendChild(touchTarget);
        touchTarget.classList.add('placed');
        slot.classList.add('has-card');
        
        practiceState.matches[wordId] = meaningId;
        
        // ADDED: Remove placeholder for placed card
        const placeholder = practiceState.placeholders[meaningId];
        if (placeholder) {
            placeholder.remove();
            delete practiceState.placeholders[meaningId];
        }
        
        logAction('🎯 触摸配对', `将意思卡片放到词语 "${vocabularyData.find(v => v.id == wordId).word}"`);
    } else {
        // ADDED: Card wasn't placed in a slot, remove placeholder
        const placeholder = practiceState.placeholders[meaningId];
        if (placeholder && touchTarget.parentNode.id === 'meaningColumn') {
            placeholder.remove();
            delete practiceState.placeholders[meaningId];
        }
    }
    
    touchTarget = null;
}

function checkPracticeAnswers() {
    let correct = 0;
    let total = vocabularyData.length;
    
    document.querySelectorAll('.word-slot').forEach(slot => {
        const wordId = slot.dataset.wordId;
        const matchedId = practiceState.matches[wordId];
        
        slot.classList.remove('correct', 'incorrect');
        
        if (matchedId == wordId) {
            slot.classList.add('correct');
            correct++;
        } else if (matchedId) {
            slot.classList.add('incorrect');
        }
    });
    
    const percentage = Math.round((correct / total) * 100);
    alert(`你答对了 ${correct}/${total} 题 (${percentage}%)\n\n${correct === total ? '太棒了！全部正确！🎉' : '继续加油！💪'}`);
    
    logAction('✅ 检查答案', `练习结果: ${correct}/${total} 正确 (${percentage}%)`);
}

// ===== QUIZ MODE =====
function initializeQuizMode() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;
    quizState.questions = generateQuizQuestions();
    
    document.getElementById('nextQuestion').classList.add('hidden');
    document.getElementById('restartQuiz').classList.add('hidden');
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').className = '';
    
    showQuizQuestion();
}

function generateQuizQuestions() {
    // Generate different types of questions
    const questions = [];
    
    // Type 1: Word to meaning (with scaffolding initially)
    vocabularyData.forEach((item, index) => {
        const wrongAnswers = vocabularyData
            .filter(v => v.id !== item.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(v => v.meaning);
        
        const options = [item.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        questions.push({
            type: 'word-to-meaning',
            question: `"${item.word}" 的意思是什么？`,
            word: item.word,
            pinyin: item.pinyin,
            correctAnswer: item.meaning,
            options: options,
            difficulty: index < 3 ? 'easy' : index < 6 ? 'medium' : 'hard'
        });
    });
    
    // Type 2: Meaning to word
    vocabularyData.forEach((item, index) => {
        const wrongAnswers = vocabularyData
            .filter(v => v.id !== item.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(v => v.word);
        
        const options = [item.word, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        questions.push({
            type: 'meaning-to-word',
            question: `哪个词语的意思是"${item.meaning}"？`,
            correctAnswer: item.word,
            options: options,
            difficulty: index < 3 ? 'easy' : index < 6 ? 'medium' : 'hard'
        });
    });
    
    // Shuffle and return
    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

function showQuizQuestion() {
    if (quizState.currentQuestion >= quizState.questions.length) {
        showQuizResults();
        return;
    }
    
    const q = quizState.questions[quizState.currentQuestion];
    quizState.answered = false;
    
    // Update progress
    document.getElementById('quizProgress').textContent = 
        `题目 ${quizState.currentQuestion + 1} / ${quizState.questions.length}`;
    
    // Update question
    const questionDiv = document.getElementById('quizQuestion');
    questionDiv.innerHTML = `
        <div>${q.question}</div>
        ${q.pinyin ? `<div style="font-size: 14px; margin-top: 8px; opacity: 0.9;">${q.pinyin}</div>` : ''}
    `;
    
    // Update options
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';
    
    q.options.forEach(option => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectQuizOption(option, q.correctAnswer));
        optionsDiv.appendChild(optionBtn);
    });
    
    // Clear feedback
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').className = '';
    document.getElementById('nextQuestion').classList.add('hidden');
    
    logAction('❓ 显示题目', `第 ${quizState.currentQuestion + 1} 题: ${q.question}`);
}

function selectQuizOption(selected, correct) {
    if (quizState.answered) return;
    
    quizState.answered = true;
    const isCorrect = selected === correct;
    
    if (isCorrect) {
        quizState.score++;
    }
    
    // Update option styles
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.add('disabled');
        if (opt.textContent === correct) {
            opt.classList.add('correct');
        } else if (opt.textContent === selected && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Show feedback
    const feedback = document.getElementById('quizFeedback');
    if (isCorrect) {
        feedback.textContent = '✅ 正确！做得好！';
        feedback.className = 'correct';
    } else {
        feedback.textContent = `❌ 不对哦！正确答案是：${correct}`;
        feedback.className = 'incorrect';
    }
    
    // Show next button
    document.getElementById('nextQuestion').classList.remove('hidden');
    document.getElementById('nextQuestion').onclick = () => {
        quizState.currentQuestion++;
        showQuizQuestion();
    };
    
    // Log quiz answer
    const q = quizState.questions[quizState.currentQuestion];
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${isCorrect ? 'quiz-correct' : 'quiz-incorrect'}`;
    logEntry.innerHTML = `
        <span class="log-time">t=${getElapsedTime()}s</span>
        <span class="log-action">
            ${isCorrect ? '✅' : '❌'} 题目${quizState.currentQuestion + 1}: ${q.question}<br>
            学生答案: ${selected} | 正确答案: ${correct}
        </span>
    `;
    document.getElementById('actionLog').appendChild(logEntry);
    document.getElementById('actionLog').scrollTop = document.getElementById('actionLog').scrollHeight;
}

function showQuizResults() {
    const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
    
    document.getElementById('quizProgress').textContent = '测验完成！';
    document.getElementById('quizQuestion').innerHTML = `
        <div style="font-size: 24px;">🎉 测验结束！</div>
        <div style="margin-top: 15px; font-size: 18px;">
            你的成绩：${quizState.score} / ${quizState.questions.length}
        </div>
        <div style="margin-top: 10px; font-size: 16px;">
            正确率：${percentage}%
        </div>
    `;
    document.getElementById('quizOptions').innerHTML = '';
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('nextQuestion').classList.add('hidden');
    
    const restartBtn = document.getElementById('restartQuiz');
    restartBtn.classList.remove('hidden');
    restartBtn.onclick = initializeQuizMode;
    
    logAction('🏆 测验完成', `最终成绩: ${quizState.score}/${quizState.questions.length} (${percentage}%)`);
}

// ===== TEXT-TO-SPEECH =====
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = speechRate;
        utterance.pitch = speechPitch;
        
        window.speechSynthesis.speak(utterance);
    }
}

// ===== PINYIN FORMATTING =====
function formatPinyinWithTones(pinyin, tones) {
    if (!showToneColor) {
        return pinyin;
    }
    
    const syllables = pinyin.split(' ');
    return syllables.map((syl, i) => {
        const tone = tones[i] || 5;
        return `<span class="tone${tone}">${syl}</span>`;
    }).join(' ');
}

function updatePinyinDisplay() {
    document.querySelectorAll('.vocab-pinyin').forEach(el => {
        el.classList.toggle('hidden', !showPinyin);
    });
}

function updateToneColorDisplay() {
    if (currentMode === 'learn') {
        initializeLearnMode();
    }
}

// ===== ANALYTICS LOGGING =====
function logAction(action, details) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">t=${getElapsedTime()}s</span>
        <span class="log-action">${action}: ${details}</span>
    `;
    
    document.getElementById('actionLog').appendChild(logEntry);
    document.getElementById('actionLog').scrollTop = document.getElementById('actionLog').scrollHeight;
}

function getElapsedTime() {
    return Math.round((Date.now() - startTime) / 1000);
}

// ===== TOOLTIP CLOSE =====
function closeTooltip() {
    document.getElementById('headerTooltip').classList.add('hidden');
}