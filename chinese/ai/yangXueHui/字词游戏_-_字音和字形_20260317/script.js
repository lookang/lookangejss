// ===== VOCABULARY DATA =====
// 9 vocabulary words with meanings for Primary 5-6 Chinese
const vocabulary = [
    { word: "闯祸", pinyin: "chuǎng huò", meaning: "做错事，惹麻烦" },
    { word: "珍宝", pinyin: "zhēn bǎo", meaning: "很珍贵的宝贝" },
    { word: "碎片", pinyin: "suì piàn", meaning: "破了后的小块" },
    { word: "愤怒", pinyin: "fèn nù", meaning: "非常生气" },
    { word: "严肃", pinyin: "yán sù", meaning: "很认真，不说笑" },
    { word: "急促", pinyin: "jí cù", meaning: "又快又短" },
    { word: "怀疑", pinyin: "huái yí", meaning: "不太相信" },
    { word: "避开", pinyin: "bì kāi", meaning: "躲开" },
    { word: "不禁", pinyin: "bù jīn", meaning: "忍不住" }
];

// ===== GLOBAL STATE =====
let currentMode = "learn";
let currentQuestion = 0;
let score = 0;
let totalAttempts = 0;
let correctAttempts = 0;
let startTime = Date.now();
let questionStartTime = Date.now();
let quizQuestions = [];
let currentAttempt = 1;

// ===== ANALYTICS TRACKING =====
let actionLog = [];
let quizLog = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    logAction("🎮 应用启动", "学习模式已加载");
    
    // Detect if in iframe
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }
    
    // Initialize learning mode
    renderVocabCards();
    
    // Event listeners
    setupEventListeners();
    
    // Update progress
    updateProgress();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Info icon tooltip
    document.getElementById('infoIcon').addEventListener('click', toggleTooltip);
    document.getElementById('closeTooltip').addEventListener('click', hideTooltip);
    
    // Mode selector buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchMode(mode);
        });
    });
    
    // Start quiz button
    document.getElementById('startQuizBtn').addEventListener('click', function() {
        switchMode('easy');
    });
    
    // Quiz control buttons
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('backToLearnBtn').addEventListener('click', function() {
        switchMode('learn');
    });
    
    // Analytics toggle
    document.getElementById('analyticsToggle').addEventListener('click', toggleAnalytics);
    document.getElementById('closeAnalytics').addEventListener('click', toggleAnalytics);
    document.getElementById('clearAnalytics').addEventListener('click', clearAnalytics);
}

// ===== TOOLTIP FUNCTIONS =====
function toggleTooltip() {
    const tooltip = document.getElementById('headerTooltip');
    tooltip.classList.toggle('hidden');
    logAction("ℹ️ 查看说明", "用户打开了帮助提示");
}

function hideTooltip() {
    document.getElementById('headerTooltip').classList.add('hidden');
}

// ===== MODE SWITCHING =====
function switchMode(mode) {
    currentMode = mode;
    
    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    // Show appropriate game mode
    if (mode === 'learn') {
        document.getElementById('learnMode').classList.add('active');
        document.getElementById('quizMode').classList.remove('active');
        logAction("📚 切换模式", "进入学习模式");
    } else {
        document.getElementById('learnMode').classList.remove('active');
        document.getElementById('quizMode').classList.add('active');
        startQuiz(mode);
        logAction(`🎯 切换模式`, `开始${mode === 'easy' ? '简单' : mode === 'medium' ? '中等' : '困难'}测验`);
    }
}

// ===== LEARNING MODE: VOCABULARY CARDS =====
function renderVocabCards() {
    const container = document.getElementById('vocabCards');
    container.innerHTML = '';
    
    vocabulary.forEach((vocab, index) => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="vocab-word">${vocab.word}</div>
            <div class="vocab-meaning">${vocab.meaning}</div>
        `;
        
        // Click to flip and show pinyin
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            if (this.classList.contains('flipped')) {
                this.innerHTML = `
                    <div class="vocab-word">${vocab.word}</div>
                    <div class="vocab-meaning">${vocab.pinyin}</div>
                    <div class="vocab-meaning">${vocab.meaning}</div>
                `;
                logAction(`📖 学习词语`, `查看"${vocab.word}"的拼音和意思`);
            } else {
                this.innerHTML = `
                    <div class="vocab-word">${vocab.word}</div>
                    <div class="vocab-meaning">${vocab.meaning}</div>
                `;
            }
        });
        
        container.appendChild(card);
    });
}

// ===== QUIZ MODE =====
function startQuiz(difficulty) {
    currentQuestion = 0;
    score = 0;
    totalAttempts = 0;
    correctAttempts = 0;
    currentAttempt = 1;
    
    // Generate questions based on difficulty
    quizQuestions = generateQuestions(difficulty);
    
    // Reset feedback
    document.getElementById('feedbackArea').innerHTML = '';
    document.getElementById('feedbackArea').className = '';
    
    // Show first question
    showQuestion();
    
    // Update score
    updateScore();
}

function generateQuestions(difficulty) {
    const questions = [];
    const shuffledVocab = [...vocabulary].sort(() => Math.random() - 0.5);
    
    shuffledVocab.forEach(vocab => {
        if (difficulty === 'easy') {
            // Easy: Multiple choice with meaning
            questions.push({
                type: 'multiple-choice',
                question: `"${vocab.word}"的意思是什么？`,
                hint: `拼音：${vocab.pinyin}`,
                correct: vocab.meaning,
                options: generateOptions(vocab.meaning, 'meaning'),
                word: vocab.word,
                pinyin: vocab.pinyin // Added: Store pinyin for hints
            });
        } else if (difficulty === 'medium') {
            // Medium: Multiple choice without pinyin hint
            questions.push({
                type: 'multiple-choice',
                question: `"${vocab.word}"的意思是什么？`,
                hint: '',
                correct: vocab.meaning,
                options: generateOptions(vocab.meaning, 'meaning'),
                word: vocab.word,
                pinyin: vocab.pinyin // Added: Store pinyin for hints
            });
        } else {
            // Hard: Drag and drop character matching
            questions.push({
                type: 'drag-drop',
                question: `请把正确的字拖到空格中，组成"${vocab.meaning}"的词语`,
                hint: '',
                correct: vocab.word,
                characters: vocab.word.split(''),
                word: vocab.word,
                pinyin: vocab.pinyin, // Added: Store pinyin for hints
                meaning: vocab.meaning // Added: Store meaning for hints
            });
        }
    });
    
    return questions;
}

function generateOptions(correct, type) {
    const options = [correct];
    const pool = vocabulary.map(v => v[type]).filter(item => item !== correct);
    
    // Add 3 random wrong options
    while (options.length < 4 && pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        options.push(pool.splice(randomIndex, 1)[0]);
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    questionStartTime = Date.now();
    currentAttempt = 1;
    
    // Update question text
    document.getElementById('questionText').innerHTML = `<strong>第 ${currentQuestion + 1}/${quizQuestions.length} 题：</strong> ${q.question}`;
    document.getElementById('hintArea').textContent = q.hint;
    
    // Clear feedback
    document.getElementById('feedbackArea').innerHTML = '';
    document.getElementById('feedbackArea').className = '';
    
    // Hide next button, show check button
    document.getElementById('checkBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    
    // Render answer area based on question type
    const answerArea = document.getElementById('answerArea');
    answerArea.innerHTML = '';
    
    if (q.type === 'multiple-choice') {
        renderMultipleChoice(q);
    } else if (q.type === 'drag-drop') {
        renderDragDrop(q);
    }
    
    // Update progress
    updateProgress();
}

function renderMultipleChoice(question) {
    const answerArea = document.getElementById('answerArea');
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.answer = option;
        
        btn.addEventListener('click', function() {
            // Deselect all
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            // Select this one
            this.classList.add('selected');
        });
        
        answerArea.appendChild(btn);
    });
}

function renderDragDrop(question) {
    const answerArea = document.getElementById('answerArea');
    
    // Create drop zone
    const dropZone = document.createElement('div');
    dropZone.id = 'dropZone';
    
    question.characters.forEach((char, index) => {
        const slot = document.createElement('div');
        slot.className = 'drop-slot';
        slot.dataset.index = index;
        slot.textContent = '?';
        dropZone.appendChild(slot);
    });
    
    answerArea.appendChild(dropZone);
    
    // Create draggable characters (shuffled)
    const dragOptions = document.createElement('div');
    dragOptions.id = 'dragOptions';
    
    const shuffledChars = [...question.characters].sort(() => Math.random() - 0.5);
    shuffledChars.forEach((char, index) => {
        const dragItem = document.createElement('div');
        dragItem.className = 'drag-item';
        dragItem.textContent = char;
        dragItem.draggable = true;
        dragItem.dataset.char = char;
        dragItem.dataset.id = index;
        
        // Desktop drag events
        dragItem.addEventListener('dragstart', handleDragStart);
        dragItem.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile
        dragItem.addEventListener('touchstart', handleTouchStart, {passive: false});
        dragItem.addEventListener('touchmove', handleTouchMove, {passive: false});
        dragItem.addEventListener('touchend', handleTouchEnd, {passive: false});
        
        dragOptions.appendChild(dragItem);
    });
    
    answerArea.appendChild(dragOptions);
    
    // Setup drop zones
    document.querySelectorAll('.drop-slot').forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragleave', handleDragLeave);
    });
}

// ===== DRAG AND DROP HANDLERS (Desktop) =====
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();
    
    this.classList.remove('drag-over');
    
    if (draggedElement && !this.classList.contains('filled')) {
        this.textContent = draggedElement.dataset.char;
        this.classList.add('filled');
        draggedElement.classList.add('placed');
        draggedElement.style.pointerEvents = 'none';
    }
    
    return false;
}

// ===== TOUCH HANDLERS (Mobile) =====
let touchedElement = null;
let touchClone = null;

function handleTouchStart(e) {
    e.preventDefault();
    touchedElement = this;
    this.classList.add('dragging');
    
    // Create a clone for visual feedback
    touchClone = this.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.zIndex = '1000';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.8';
    document.body.appendChild(touchClone);
    
    const touch = e.touches[0];
    touchClone.style.left = touch.clientX - 40 + 'px';
    touchClone.style.top = touch.clientY - 20 + 'px';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;
    
    const touch = e.touches[0];
    touchClone.style.left = touch.clientX - 40 + 'px';
    touchClone.style.top = touch.clientY - 20 + 'px';
    
    // Highlight drop zone under touch
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    document.querySelectorAll('.drop-slot').forEach(slot => slot.classList.remove('drag-over'));
    if (elementBelow && elementBelow.classList.contains('drop-slot')) {
        elementBelow.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!touchedElement) return;
    
    touchedElement.classList.remove('dragging');
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementBelow && elementBelow.classList.contains('drop-slot') && !elementBelow.classList.contains('filled')) {
        elementBelow.textContent = touchedElement.dataset.char;
        elementBelow.classList.add('filled');
        touchedElement.classList.add('placed');
        touchedElement.style.pointerEvents = 'none';
    }
    
    document.querySelectorAll('.drop-slot').forEach(slot => slot.classList.remove('drag-over'));
    
    if (touchClone) {
        document.body.removeChild(touchClone);
        touchClone = null;
    }
    
    touchedElement = null;
}

// ===== GENERATE HINT BASED ON QUESTION TYPE =====
// Modified: Function to generate contextual hints instead of showing the answer
function generateHint(question, attemptNumber) {
    if (question.type === 'multiple-choice') {
        // For multiple choice questions
        if (attemptNumber === 1) {
            // First attempt: Give pinyin hint if not already shown
            if (!question.hint || question.hint === '') {
                return `💡 提示：拼音是 ${question.pinyin}`;
            } else {
                // If pinyin already shown, give a word structure hint
                return `💡 提示：想想这个词的意思，再仔细看看选项`;
            }
        } else {
            // Second attempt: Give more specific hint
            const correctMeaning = question.correct;
            const firstChar = correctMeaning.charAt(0);
            return `💡 提示：答案的第一个字是"${firstChar}"`;
        }
    } else if (question.type === 'drag-drop') {
        // For drag and drop questions
        if (attemptNumber === 1) {
            // First attempt: Give pinyin hint
            return `💡 提示：这个词的拼音是 ${question.pinyin}`;
        } else {
            // Second attempt: Give first character hint
            const firstChar = question.correct.charAt(0);
            return `💡 提示：第一个字是"${firstChar}"`;
        }
    }
    return '💡 提示：再想想看！';
}

// ===== CHECK ANSWER =====
// Modified: Changed feedback to show hints instead of direct answers when incorrect
function checkAnswer() {
    const q = quizQuestions[currentQuestion];
    let userAnswer = '';
    let isCorrect = false;
    
    if (q.type === 'multiple-choice') {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) {
            alert('请选择一个答案！');
            return;
        }
        userAnswer = selected.dataset.answer;
        isCorrect = userAnswer === q.correct;
        
        // Visual feedback - Modified: Only show correct answer when answer is correct
        if (isCorrect) {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.answer === q.correct) {
                    btn.classList.add('correct');
                }
            });
        } else {
            // Modified: Only mark the selected wrong answer, don't reveal correct answer
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.classList.contains('selected')) {
                    btn.classList.add('incorrect');
                }
            });
        }
        
    } else if (q.type === 'drag-drop') {
        const slots = document.querySelectorAll('.drop-slot');
        userAnswer = Array.from(slots).map(slot => slot.textContent).join('');
        isCorrect = userAnswer === q.correct;
    }
    
    // Update score
    totalAttempts++;
    if (isCorrect) {
        correctAttempts++;
        score += (currentAttempt === 1) ? 10 : 5; // Bonus for first attempt
    }
    
    // Show feedback - Modified: Show hints instead of answers when incorrect
    const feedbackArea = document.getElementById('feedbackArea');
    if (isCorrect) {
        feedbackArea.className = 'correct';
        feedbackArea.innerHTML = `✅ 太棒了！答对了！<br>正确答案：${q.correct}`;
        document.getElementById('checkBtn').classList.add('hidden');
        document.getElementById('nextBtn').classList.remove('hidden');
    } else {
        feedbackArea.className = 'incorrect';
        if (currentAttempt < 2) {
            // Modified: Show hint instead of "try again"
            const hint = generateHint(q, currentAttempt);
            feedbackArea.innerHTML = `❌ 不对哦！${hint}`;
            currentAttempt++;
            // Reset for retry
            if (q.type === 'multiple-choice') {
                document.querySelectorAll('.option-btn').forEach(btn => {
                    // Modified: Don't disable buttons, just remove incorrect marking
                    btn.classList.remove('selected', 'incorrect');
                });
            } else if (q.type === 'drag-drop') {
                document.querySelectorAll('.drop-slot').forEach(slot => {
                    slot.textContent = '?';
                    slot.classList.remove('filled');
                });
                document.querySelectorAll('.drag-item').forEach(item => {
                    item.classList.remove('placed');
                    item.style.pointerEvents = 'auto';
                });
            }
        } else {
            // Modified: After second attempt, show answer with encouragement
            feedbackArea.innerHTML = `❌ 正确答案是：${q.correct}<br>💪 继续加油，下一题会更好！`;
            document.getElementById('checkBtn').classList.add('hidden');
            document.getElementById('nextBtn').classList.remove('hidden');
        }
    }
    
    // Log quiz attempt
    const timeSpent = ((Date.now() - questionStartTime) / 1000).toFixed(1);
    logQuizAttempt(currentQuestion + 1, q.question, userAnswer, q.correct, isCorrect, currentAttempt, timeSpent);
    
    updateScore();
}

// ===== NEXT QUESTION =====
function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// ===== SHOW RESULTS =====
function showResults() {
    const answerArea = document.getElementById('answerArea');
    const accuracy = totalAttempts > 0 ? ((correctAttempts / totalAttempts) * 100).toFixed(1) : 0;
    
    answerArea.innerHTML = `
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
            <h2>🎉 测验完成！</h2>
            <p style="font-size: 24px; margin: 16px 0;">总分：${score} 分</p>
            <p style="font-size: 18px;">正确率：${accuracy}%</p>
            <p style="font-size: 16px; margin-top: 12px;">
                ${accuracy >= 80 ? '太棒了！你掌握得很好！🌟' : 
                  accuracy >= 60 ? '不错！继续努力！💪' : 
                  '加油！多练习会更好！📚'}
            </p>
        </div>
    `;
    
    document.getElementById('questionText').textContent = '';
    document.getElementById('hintArea').textContent = '';
    document.getElementById('feedbackArea').innerHTML = '';
    document.getElementById('checkBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    
    logAction("🏆 完成测验", `得分：${score}，正确率：${accuracy}%`);
}

// ===== UPDATE FUNCTIONS =====
function updateProgress() {
    const total = vocabulary.length;
    const current = currentMode === 'learn' ? 0 : currentQuestion;
    const percentage = (current / total) * 100;
    
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `进度: ${current}/${total}`;
}

function updateScore() {
    document.getElementById('scoreText').textContent = `得分: ${score}`;
    const accuracy = totalAttempts > 0 ? ((correctAttempts / totalAttempts) * 100).toFixed(1) : 0;
    document.getElementById('accuracyText').textContent = `正确率: ${accuracy}%`;
}

// ===== ANALYTICS FUNCTIONS =====
function logAction(action, details) {
    const timestamp = ((Date.now() - startTime) / 1000).toFixed(1);
    actionLog.push({
        time: timestamp,
        action: action,
        details: details
    });
    updateActionLog();
}

function logQuizAttempt(questionNum, question, userAnswer, correctAnswer, isCorrect, attempt, timeSpent) {
    quizLog.push({
        questionNum: questionNum,
        question: question,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        attempt: attempt,
        timeSpent: timeSpent
    });
    updateQuizLog();
}

function updateActionLog() {
    const container = document.getElementById('actionLogContent');
    container.innerHTML = '';
    
    actionLog.slice(-10).reverse().forEach(log => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <span class="log-timestamp">t=${log.time}s</span><br>
            <strong>${log.action}</strong>: ${log.details}
        `;
        container.appendChild(entry);
    });
}

function updateQuizLog() {
    const container = document.getElementById('quizLogContent');
    container.innerHTML = '';
    
    quizLog.forEach(log => {
        const entry = document.createElement('div');
        entry.className = `log-entry ${log.isCorrect ? 'correct' : 'incorrect'}`;
        entry.innerHTML = `
            <strong>第${log.questionNum}题</strong> (尝试${log.attempt}, ${log.timeSpent}秒)<br>
            ${log.question}<br>
            你的答案: <strong>${log.userAnswer}</strong><br>
            正确答案: <strong>${log.correctAnswer}</strong><br>
            ${log.isCorrect ? '✅ 正确' : '❌ 错误'}
        `;
        container.appendChild(entry);
    });
}

function toggleAnalytics() {
    const panel = document.getElementById('analyticsPanel');
    panel.classList.toggle('collapsed');
    
    const btn = document.getElementById('analyticsToggle');
    if (panel.classList.contains('collapsed')) {
        btn.textContent = '📊 显示学习记录';
    } else {
        btn.textContent = '📊 隐藏学习记录';
    }
}

function clearAnalytics() {
    if (confirm('确定要清除所有学习记录吗？')) {
        actionLog = [];
        quizLog = [];
        updateActionLog();
        updateQuizLog();
        logAction("🗑️ 清除记录", "学习记录已重置");
    }
}