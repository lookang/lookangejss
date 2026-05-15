// ============================================
// Chinese Text to Speech with Hanyu Pinyin
// Interactive Learning Tool for Primary 3-4
// ============================================

// Global Variables
let startTime = Date.now();
let currentUtterance = null;
let isPaused = false;
let currentCharIndex = 0;
let charElements = [];
let analyticsLog = [];

// Pinyin library for Chinese characters (simplified mapping)
const pinyinMap = {
    '你': 'nǐ', '好': 'hǎo', '我': 'wǒ', '是': 'shì', '小': 'xiǎo', '明': 'míng',
    '今': 'jīn', '天': 'tiān', '气': 'qì', '很': 'hěn', '喜': 'xǐ', '欢': 'huān',
    '学': 'xué', '习': 'xí', '中': 'zhōng', '文': 'wén', '妈': 'mā', '买': 'mǎi',
    '了': 'le', '一': 'yī', '个': 'gè', '苹': 'píng', '果': 'guǒ', '的': 'de',
    '吗': 'ma', '呢': 'ne', '啊': 'a', '吧': 'ba', '们': 'men', '在': 'zài',
    '有': 'yǒu', '不': 'bù', '到': 'dào', '人': 'rén', '他': 'tā', '这': 'zhè',
    '上': 'shàng', '来': 'lái', '大': 'dà', '为': 'wèi', '子': 'zi', '和': 'hé',
    '对': 'duì', '说': 'shuō', '国': 'guó', '时': 'shí', '以': 'yǐ', '要': 'yào',
    '就': 'jiù', '出': 'chū', '会': 'huì', '可': 'kě', '也': 'yě', '你': 'nǐ',
    '看': 'kàn', '能': 'néng', '下': 'xià', '过': 'guò', '自': 'zì', '己': 'jǐ',
    '去': 'qù', '得': 'de', '起': 'qǐ', '还': 'hái', '发': 'fā', '成': 'chéng',
    '事': 'shì', '只': 'zhǐ', '作': 'zuò', '当': 'dāng', '想': 'xiǎng', '看': 'kàn',
    '。': '', '，': '', '！': '', '？': '', '、': '', '；': '', '：': ''
};

// Get tone number from pinyin
function getToneNumber(pinyin) {
    if (!pinyin) return 5;
    const toneMarks = {
        'ā': 1, 'á': 2, 'ǎ': 3, 'à': 4,
        'ē': 1, 'é': 2, 'ě': 3, 'è': 4,
        'ī': 1, 'í': 2, 'ǐ': 3, 'ì': 4,
        'ō': 1, 'ó': 2, 'ǒ': 3, 'ò': 4,
        'ū': 1, 'ú': 2, 'ǔ': 3, 'ù': 4,
        'ǖ': 1, 'ǘ': 2, 'ǚ': 3, 'ǜ': 4
    };
    
    for (let char of pinyin) {
        if (toneMarks[char]) return toneMarks[char];
    }
    return 5; // neutral tone
}

// Get pinyin for a character
function getPinyin(char) {
    return pinyinMap[char] || '';
}

// Initialize the application
function init() {
    logAction('🚀 System', 'Application initialized');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial text display
    updateTextDisplay();
    
    // Check if Web Speech API is available
    if (!('speechSynthesis' in window)) {
        alert('抱歉，您的浏览器不支持语音合成功能。\nSorry, your browser does not support speech synthesis.');
        logAction('⚠️ Error', 'Speech synthesis not supported');
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Text input
    document.getElementById('chineseText').addEventListener('input', function() {
        updateTextDisplay();
        logAction('✏️ Input', `Text changed: "${this.value.substring(0, 20)}..."`);
    });
    
    // Sample text buttons
    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            document.getElementById('chineseText').value = text;
            updateTextDisplay();
            logAction('📚 Sample', `Loaded sample: "${text}"`);
        });
    });
    
    // Rate slider
    document.getElementById('rateSlider').addEventListener('input', function() {
        document.getElementById('rateValue').textContent = this.value;
        logAction('🎚️ Rate', `Speed adjusted to ${this.value}x`);
    });
    
    // Pitch slider
    document.getElementById('pitchSlider').addEventListener('input', function() {
        document.getElementById('pitchValue').textContent = this.value;
        logAction('🎵 Pitch', `Pitch adjusted to ${this.value}`);
    });
    
    // Play button
    document.getElementById('playBtn').addEventListener('click', function() {
        playText();
        logAction('▶️ Play', 'Speech playback started');
    });
    
    // Pause button
    document.getElementById('pauseBtn').addEventListener('click', function() {
        pauseText();
        logAction('⏸️ Pause', 'Speech playback paused');
    });
    
    // Stop button
    document.getElementById('stopBtn').addEventListener('click', function() {
        stopText();
        logAction('⏹️ Stop', 'Speech playback stopped');
    });
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', function() {
        resetAll();
        logAction('🔄 Reset', 'All settings reset to default');
    });
    
    // Checkboxes
    document.getElementById('showPinyin').addEventListener('change', function() {
        updateTextDisplay();
        logAction('🔤 Toggle', `Pinyin display: ${this.checked ? 'ON' : 'OFF'}`);
    });
    
    document.getElementById('showTones').addEventListener('change', function() {
        updateTextDisplay();
        logAction('🎨 Toggle', `Tone colors: ${this.checked ? 'ON' : 'OFF'}`);
    });
    
    document.getElementById('wordByWord').addEventListener('change', function() {
        logAction('💡 Toggle', `Word-by-word highlight: ${this.checked ? 'ON' : 'OFF'}`);
    });
    
    // Quiz button
    document.getElementById('newQuizBtn').addEventListener('click', function() {
        generateQuiz();
        logAction('🎯 Quiz', 'New quiz question generated');
    });
    
    // Analytics controls
    document.getElementById('toggleAnalytics').addEventListener('click', function() {
        const content = document.getElementById('analyticsContent');
        content.classList.toggle('collapsed');
        this.textContent = content.classList.contains('collapsed') ? '展开 (Expand)' : '折叠 (Collapse)';
    });
    
    document.getElementById('clearLog').addEventListener('click', function() {
        clearAnalytics();
    });
}

// Update text display with pinyin and characters
function updateTextDisplay() {
    const text = document.getElementById('chineseText').value;
    const showPinyin = document.getElementById('showPinyin').checked;
    const showTones = document.getElementById('showTones').checked;
    const displayArea = document.getElementById('textDisplay');
    
    displayArea.innerHTML = '';
    charElements = [];
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const pinyin = getPinyin(char);
        const toneNum = getToneNumber(pinyin);
        
        const container = document.createElement('div');
        container.className = 'char-container';
        container.dataset.index = i;
        
        // Add pinyin if enabled
        if (showPinyin && pinyin) {
            const pinyinSpan = document.createElement('span');
            pinyinSpan.className = 'pinyin';
            if (showTones) {
                pinyinSpan.classList.add(`tone${toneNum}`);
            }
            pinyinSpan.textContent = pinyin;
            container.appendChild(pinyinSpan);
        }
        
        // Add character
        const charSpan = document.createElement('span');
        charSpan.className = 'character';
        if (showTones && pinyin) {
            charSpan.classList.add(`tone${toneNum}`);
        }
        charSpan.textContent = char;
        container.appendChild(charSpan);
        
        // Click to speak individual character
        container.addEventListener('click', function() {
            speakCharacter(char, parseInt(this.dataset.index));
            logAction('👆 Tap', `Character clicked: "${char}" (${pinyin})`);
        });
        
        displayArea.appendChild(container);
        charElements.push(container);
    }
}

// Play text with TTS
function playText() {
    if (isPaused && currentUtterance) {
        window.speechSynthesis.resume();
        isPaused = false;
        document.getElementById('pauseBtn').disabled = false;
        return;
    }
    
    stopText();
    
    const text = document.getElementById('chineseText').value;
    const rate = parseFloat(document.getElementById('rateSlider').value);
    const pitch = parseFloat(document.getElementById('pitchSlider').value);
    const wordByWord = document.getElementById('wordByWord').checked;
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'zh-CN';
    currentUtterance.rate = rate;
    currentUtterance.pitch = pitch;
    
    // Get Chinese voice if available
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
    if (chineseVoice) {
        currentUtterance.voice = chineseVoice;
    }
    
    currentCharIndex = 0;
    
    // Word-by-word highlighting
    if (wordByWord) {
        currentUtterance.onboundary = function(event) {
            if (event.name === 'word') {
                highlightCharacter(currentCharIndex);
                currentCharIndex++;
            }
        };
    }
    
    currentUtterance.onend = function() {
        clearHighlight();
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
    };
    
    currentUtterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        logAction('❌ Error', `Speech error: ${event.error}`);
    };
    
    window.speechSynthesis.speak(currentUtterance);
    document.getElementById('playBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
}

// Pause text
function pauseText() {
    if (window.speechSynthesis.speaking && !isPaused) {
        window.speechSynthesis.pause();
        isPaused = true;
        document.getElementById('pauseBtn').textContent = '▶️ 继续 (Resume)';
    } else if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
        document.getElementById('pauseBtn').textContent = '⏸️ 暂停 (Pause)';
    }
}

// Stop text
function stopText() {
    window.speechSynthesis.cancel();
    clearHighlight();
    isPaused = false;
    currentUtterance = null;
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('pauseBtn').textContent = '⏸️ 暂停 (Pause)';
}

// Speak individual character
function speakCharacter(char, index) {
    stopText();
    
    const rate = parseFloat(document.getElementById('rateSlider').value);
    const pitch = parseFloat(document.getElementById('pitchSlider').value);
    
    const utterance = new SpeechSynthesisUtterance(char);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
    if (chineseVoice) {
        utterance.voice = chineseVoice;
    }
    
    highlightCharacter(index);
    
    utterance.onend = function() {
        clearHighlight();
    };
    
    window.speechSynthesis.speak(utterance);
}

// Highlight character during speech
function highlightCharacter(index) {
    clearHighlight();
    if (charElements[index]) {
        charElements[index].classList.add('active');
    }
}

// Clear all highlights
function clearHighlight() {
    charElements.forEach(el => el.classList.remove('active'));
}

// Reset all settings
function resetAll() {
    stopText();
    document.getElementById('chineseText').value = '你好，我是小明。今天天气很好。';
    document.getElementById('rateSlider').value = 1.0;
    document.getElementById('pitchSlider').value = 1.0;
    document.getElementById('rateValue').textContent = '1.0';
    document.getElementById('pitchValue').textContent = '1.0';
    document.getElementById('showPinyin').checked = true;
    document.getElementById('showTones').checked = true;
    document.getElementById('wordByWord').checked = true;
    updateTextDisplay();
    
    // Clear quiz
    document.getElementById('quizQuestion').textContent = '点击"新题目"开始练习 (Click "New" to start)';
    document.getElementById('quizOptions').innerHTML = '';
    document.getElementById('quizFeedback').style.display = 'none';
}

// Generate quiz question
function generateQuiz() {
    const quizPairs = [
        { question: '听一听，选择正确的字：', correct: '妈', options: ['妈', '马', '骂', '吗'], pinyin: 'mā' },
        { question: '听一听，选择正确的字：', correct: '天', options: ['天', '田', '甜', '添'], pinyin: 'tiān' },
        { question: '听一听，选择正确的字：', correct: '好', options: ['好', '号', '豪', '毫'], pinyin: 'hǎo' },
        { question: '听一听，选择正确的字：', correct: '是', options: ['是', '十', '时', '石'], pinyin: 'shì' },
        { question: '听一听，选择正确的字：', correct: '学', options: ['学', '雪', '血', '穴'], pinyin: 'xué' }
    ];
    
    const quiz = quizPairs[Math.floor(Math.random() * quizPairs.length)];
    
    document.getElementById('quizQuestion').textContent = quiz.question;
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizFeedback').className = '';
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    // Shuffle options
    const shuffled = [...quiz.options].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(option => {
        const btn = document.createElement('div');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', function() {
            checkQuizAnswer(option, quiz.correct, quiz.pinyin);
        });
        optionsContainer.appendChild(btn);
    });
    
    // Speak the correct answer
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(quiz.correct);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        
        const voices = window.speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    }, 500);
}

// Check quiz answer
function checkQuizAnswer(selected, correct, pinyin) {
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.textContent === correct) {
            opt.classList.add('correct');
        }
        if (opt.textContent === selected && selected !== correct) {
            opt.classList.add('incorrect');
        }
    });
    
    if (selected === correct) {
        feedback.textContent = `✅ 正确！Very good! (${pinyin})`;
        feedback.className = 'correct show';
        logAction('✅ Quiz', `Correct answer: "${correct}"`);
    } else {
        feedback.textContent = `❌ 不对。正确答案是："${correct}" (${pinyin})`;
        feedback.className = 'incorrect show';
        logAction('❌ Quiz', `Incorrect answer. Selected: "${selected}", Correct: "${correct}"`);
    }
    
    feedback.style.display = 'block';
}

// Log action to analytics
function logAction(type, description) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const entry = {
        timestamp: `t=${elapsed}s`,
        type: type,
        description: description
    };
    
    analyticsLog.push(entry);
    
    const logContainer = document.getElementById('actionLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="timestamp">${entry.timestamp}</span>
        <span class="action">${entry.type}: ${entry.description}</span>
    `;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Clear analytics log
function clearAnalytics() {
    analyticsLog = [];
    document.getElementById('actionLog').innerHTML = '';
    startTime = Date.now();
    logAction('🗑️ System', 'Analytics log cleared');
}

// Load voices when available
window.speechSynthesis.onvoiceschanged = function() {
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.filter(v => v.lang.includes('zh')));
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);

// Handle page visibility for speech synthesis
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause speech when page is hidden
        if (window.speechSynthesis.speaking && !isPaused) {
            pauseText();
        }
    }
});