/* ===================================================================
   CHINESE TEXT TO SPEECH WITH HANYU PINYIN - SCRIPT
   
   This script handles all interactive functionality for the Chinese
   Text to Speech educational tool. It includes:
   - Text input processing
   - Hanyu Pinyin conversion
   - Text-to-speech synthesis
   - Character analysis
   - Example loading
   - Reset functionality
   
   Learning Approach:
   - Immediate feedback on user actions
   - Real-time character analysis
   - Visual representation of tones
   - Interactive examples for discovery learning
   
   MODIFICATION: Added default demo text for ease of testing
   =================================================================== */

// ===================================================================
// PINYIN DATABASE - Comprehensive mapping of Chinese characters to Hanyu Pinyin
// ===================================================================
const pinyinDatabase = {
    // Common greetings and basic phrases
    '你': 'nǐ',
    '好': 'hǎo',
    '谢': 'xiè',
    '谢谢': 'xièxie',
    '再': 'zài',
    '见': 'jiàn',
    '再见': 'zàijiàn',
    '学': 'xué',
    '习': 'xí',
    '学习': 'xuéxí',
    '中': 'zhōng',
    '国': 'guó',
    '中国': 'zhōngguó',
    '我': 'wǒ',
    '是': 'shì',
    '学生': 'xuésheng',
    '老': 'lǎo',
    '师': 'shī',
    '老师': 'lǎoshī',
    '妈': 'mā',
    '爸': 'bà',
    '爸爸': 'bàba',
    '妈妈': 'māma',
    '哥': 'gē',
    '姐': 'jiě',
    '弟': 'dì',
    '妹': 'mèi',
    '家': 'jiā',
    '学校': 'xuéxiào',
    '书': 'shū',
    '笔': 'bǐ',
    '纸': 'zhǐ',
    '桌': 'zhuō',
    '椅': 'yǐ',
    '门': 'mén',
    '窗': 'chuāng',
    '黑': 'hēi',
    '板': 'bǎn',
    '黑板': 'hēibǎn',
    '白': 'bái',
    '红': 'hóng',
    '绿': 'lǜ',
    '蓝': 'lán',
    '黄': 'huáng',
    '紫': 'zǐ',
    '一': 'yī',
    '二': 'èr',
    '三': 'sān',
    '四': 'sì',
    '五': 'wǔ',
    '六': 'liù',
    '七': 'qī',
    '八': 'bā',
    '九': 'jiǔ',
    '十': 'shí',
    '天': 'tiān',
    '月': 'yuè',
    '日': 'rì',
    '星': 'xīng',
    '期': 'qī',
    '星期': 'xīngqī',
    '早': 'zǎo',
    '上': 'shàng',
    '午': 'wǔ',
    '下': 'xià',
    '晚': 'wǎn',
    '早上': 'zǎoshang',
    '下午': 'xiàwǔ',
    '晚上': 'wǎnshang',
    '吃': 'chī',
    '饭': 'fàn',
    '喝': 'hē',
    '水': 'shuǐ',
    '茶': 'chá',
    '咖': 'kā',
    '啡': 'fēi',
    '咖啡': 'kāfēi',
    '牛': 'niú',
    '奶': 'nǎi',
    '牛奶': 'niúnǎi',
    '果': 'guǒ',
    '汁': 'zhī',
    '果汁': 'guǒzhī',
    '苹': 'píng',
    '果': 'guǒ',
    '苹果': 'píngguǒ',
    '香': 'xiāng',
    '蕉': 'jiāo',
    '香蕉': 'xiāngjiāo',
    '橙': 'chéng',
    '葡': 'pú',
    '萄': 'táo',
    '葡萄': 'pútao',
    '走': 'zǒu',
    '跑': 'pǎo',
    '跳': 'tiào',
    '坐': 'zuò',
    '站': 'zhàn',
    '睡': 'shuì',
    '觉': 'jiào',
    '睡觉': 'shuìjiào',
    '玩': 'wán',
    '游': 'yóu',
    '戏': 'xì',
    '游戏': 'yóuxì',
    '唱': 'chàng',
    '歌': 'gē',
    '唱歌': 'chànggē',
    '跳': 'tiào',
    '舞': 'wǔ',
    '跳舞': 'tiàowǔ',
    '画': 'huà',
    '图': 'tú',
    '画画': 'huàhuà',
    '读': 'dú',
    '书': 'shū',
    '读书': 'dúshū',
    '写': 'xiě',
    '字': 'zì',
    '写字': 'xiězì',
    '数': 'shǔ',
    '学': 'xué',
    '数学': 'shùxué',
    '英': 'yīng',
    '文': 'wén',
    '英文': 'yīngwén',
    '科': 'kē',
    '学': 'xué',
    '科学': 'kēxué',
    '体': 'tǐ',
    '育': 'yù',
    '体育': 'tǐyù',
    '美': 'měi',
    '术': 'shù',
    '美术': 'měishù',
    '音': 'yīn',
    '乐': 'yuè',
    '音乐': 'yīnyuè',
    '电': 'diàn',
    '脑': 'nǎo',
    '电脑': 'diànnǎo',
    '手': 'shǒu',
    '机': 'jī',
    '手机': 'shǒujī',
    '电': 'diàn',
    '视': 'shì',
    '电视': 'diànshì',
    '收': 'shōu',
    '音': 'yīn',
    '机': 'jī',
    '收音机': 'shōuyīnjī',
    '照': 'zhào',
    '相': 'xiàng',
    '机': 'jī',
    '照相机': 'zhàoxiàngjī',
    '汽': 'qì',
    '车': 'chē',
    '汽车': 'qìchē',
    '自': 'zì',
    '行': 'xíng',
    '车': 'chē',
    '自行车': 'zìxíngchē',
    '公': 'gōng',
    '共': 'gòng',
    '汽': 'qì',
    '车': 'chē',
    '公共汽车': 'gōnggòngqìchē',
    '火': 'huǒ',
    '车': 'chē',
    '火车': 'huǒchē',
    '飞': 'fēi',
    '机': 'jī',
    '飞机': 'fēijī',
    '船': 'chuán',
    '衣': 'yī',
    '服': 'fu',
    '衣服': 'yīfu',
    '裤': 'kù',
    '子': 'zi',
    '裤子': 'kùzi',
    '鞋': 'xié',
    '帽': 'mào',
    '子': 'zi',
    '帽子': 'màozi',
    '袜': 'wà',
    '子': 'zi',
    '袜子': 'wàzi',
    '手': 'shǒu',
    '套': 'tào',
    '手套': 'shǒutào',
    '围': 'wéi',
    '巾': 'jīn',
    '围巾': 'wéijīn',
    '包': 'bāo',
    '包包': 'bāobao',
    '眼': 'yǎn',
    '镜': 'jìng',
    '眼镜': 'yǎnjìng',
    '手': 'shǒu',
    '表': 'biǎo',
    '手表': 'shǒubiǎo',
    '戒': 'jiè',
    '指': 'zhǐ',
    '戒指': 'jièzhi',
    '项': 'xiàng',
    '链': 'liàn',
    '项链': 'xiàngliàn',
    '耳': 'ěr',
    '环': 'huán',
    '耳环': 'ěrhuán',
    '头': 'tóu',
    '发': 'fa',
    '头发': 'toufa',
    '脸': 'liǎn',
    '眼': 'yǎn',
    '睛': 'jing',
    '眼睛': 'yǎnjing',
    '鼻': 'bí',
    '子': 'zi',
    '鼻子': 'bízi',
    '嘴': 'zuǐ',
    '耳': 'ěr',
    '朵': 'duǒ',
    '耳朵': 'ěrduǒ',
    '牙': 'yá',
    '齿': 'chǐ',
    '牙齿': 'yáchǐ',
    '舌': 'shé',
    '头': 'tóu',
    '手': 'shǒu',
    '臂': 'bì',
    '手臂': 'shǒubì',
    '手': 'shǒu',
    '指': 'zhǐ',
    '手指': 'shǒuzhǐ',
    '手': 'shǒu',
    '掌': 'zhǎng',
    '手掌': 'shǒuzhǎng',
    '胳': 'gē',
    '膊': 'bo',
    '胳膊': 'gēbo',
    '肩': 'jiān',
    '膀': 'páng',
    '肩膀': 'jiānpáng',
    '胸': 'xiōng',
    '背': 'bèi',
    '腰': 'yāo',
    '腿': 'tuǐ',
    '脚': 'jiǎo',
    '脚': 'jiǎo',
    '趾': 'zhǐ',
    '脚趾': 'jiǎozhǐ',
    '心': 'xīn',
    '肺': 'fèi',
    '肝': 'gān',
    '胃': 'wèi',
    '肾': 'shèn',
    '骨': 'gǔ',
    '头': 'tóu',
    '骨': 'gǔ',
    '头骨': 'tóugǔ',
    '脊': 'jǐ',
    '椎': 'zhuī',
    '脊椎': 'jǐzhuī',
    '肋': 'lèi',
    '骨': 'gǔ',
    '肋骨': 'lèigǔ'
};

// ===================================================================
// TONE INFORMATION - Educational reference for the four tones
// ===================================================================
const toneInfo = {
    '1': { name: '1st Tone', mark: 'ā', description: 'High & Level' },
    '2': { name: '2nd Tone', mark: 'á', description: 'Rising' },
    '3': { name: '3rd Tone', mark: 'ǎ', description: 'Low & Dip' },
    '4': { name: '4th Tone', mark: 'à', description: 'Falling' }
};

// ===================================================================
// DEFAULT DEMO TEXT - Primary 1 level Chinese text for testing
// MODIFICATION: Added default demo text to textarea on page load
// ===================================================================
const DEFAULT_DEMO_TEXT = '你好';

// ===================================================================
// DOM ELEMENTS - Cache references to frequently accessed elements
// ===================================================================
const chineseInput = document.getElementById('chinese-input');
const charCountDisplay = document.getElementById('char-count-display');
const speakBtn = document.getElementById('speak-btn');
const pinyinBtn = document.getElementById('pinyin-btn');
const resetBtn = document.getElementById('reset-btn');
const pinyinDisplay = document.getElementById('pinyin-display');
const analysisDisplay = document.getElementById('analysis-display');
const exampleBtns = document.querySelectorAll('.example-btn');

// ===================================================================
// EVENT LISTENERS - Set up all interactive functionality
// ===================================================================

// Character count update - Real-time feedback on input length
chineseInput.addEventListener('input', () => {
    const count = chineseInput.value.length;
    charCountDisplay.textContent = count;
});

// Speak button - Trigger text-to-speech synthesis
speakBtn.addEventListener('click', () => {
    const text = chineseInput.value.trim();
    if (text) {
        speakChinese(text);
    } else {
        showFeedback('Please enter Chinese text first');
    }
});

// Pinyin button - Display Hanyu Pinyin romanization
pinyinBtn.addEventListener('click', () => {
    const text = chineseInput.value.trim();
    if (text) {
        displayPinyin(text);
        analyzeCharacters(text);
    } else {
        showFeedback('Please enter Chinese text first');
    }
});

// Reset button - Clear all inputs and displays
resetBtn.addEventListener('click', () => {
    resetAll();
});

// Example buttons - Load predefined Chinese phrases
exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        chineseInput.value = text;
        charCountDisplay.textContent = text.length;
        displayPinyin(text);
        analyzeCharacters(text);
    });
});

// ===================================================================
// FUNCTION: speakChinese
// Purpose: Use Web Speech API to synthesize Chinese text
// Parameters: text (string) - Chinese text to speak
// Returns: void
// ===================================================================
function speakChinese(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new utterance for speech synthesis
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure speech parameters for optimal Chinese pronunciation
    utterance.lang = 'zh-CN'; // Simplified Chinese (Mainland China)
    utterance.rate = 0.8; // Slower speech rate for clarity
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    // Add visual feedback during speech
    utterance.onstart = () => {
        speakBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        speakBtn.textContent = '🔊 Speaking...';
    };

    utterance.onend = () => {
        speakBtn.style.background = '';
        speakBtn.textContent = '🔊 Speak';
    };

    // Trigger speech synthesis
    window.speechSynthesis.speak(utterance);
}

// ===================================================================
// FUNCTION: displayPinyin
// Purpose: Convert Chinese text to Hanyu Pinyin and display it
// Parameters: text (string) - Chinese text to convert
// Returns: void
// ===================================================================
function displayPinyin(text) {
    let pinyinResult = '';

    // Process each character in the input text
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Look up character in pinyin database
        if (pinyinDatabase[char]) {
            pinyinResult += pinyinDatabase[char];
        } else {
            // If character not found, display the character itself
            pinyinResult += char;
        }
        
        // Add space between syllables for readability
        if (i < text.length - 1) {
            pinyinResult += ' ';
        }
    }

    // Display the pinyin result
    pinyinDisplay.innerHTML = `<span>${pinyinResult}</span>`;
}

// ===================================================================
// FUNCTION: analyzeCharacters
// Purpose: Break down Chinese text into individual characters with pinyin
// Parameters: text (string) - Chinese text to analyze
// Returns: void
// ===================================================================
function analyzeCharacters(text) {
    // Clear previous analysis
    analysisDisplay.innerHTML = '';

    // Process each character
    text.split('').forEach(char => {
        // Create a card for each character
        const card = document.createElement('div');
        card.className = 'char-card';

        // Get pinyin for the character
        const pinyin = pinyinDatabase[char] || '?';

        // Build card HTML with character and pinyin
        card.innerHTML = `
            <div class="char-large">${char}</div>
            <div class="char-pinyin">${pinyin}</div>
        `;

        // Add click event to speak individual character
        card.addEventListener('click', () => {
            speakChinese(char);
        });

        // Add card to analysis display
        analysisDisplay.appendChild(card);
    });
}

// ===================================================================
// FUNCTION: resetAll
// Purpose: Reset all inputs and displays to initial state
// MODIFICATION: Now resets to default demo text instead of empty
// Parameters: none
// Returns: void
// ===================================================================
function resetAll() {
    // Clear text input and set to default demo text
    chineseInput.value = DEFAULT_DEMO_TEXT;
    charCountDisplay.textContent = DEFAULT_DEMO_TEXT.length;

    // Reset pinyin display
    pinyinDisplay.innerHTML = '<span class="placeholder-text">Enter text and click "Show Pinyin"</span>';

    // Reset character analysis
    analysisDisplay.innerHTML = '<div class="analysis-placeholder"><span class="placeholder-text">No characters analyzed yet</span></div>';

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Reset button styles
    speakBtn.style.background = '';
    speakBtn.textContent = '🔊 Speak';

    // Focus back to input for better UX
    chineseInput.focus();
}

// ===================================================================
// FUNCTION: showFeedback
// Purpose: Display temporary feedback message to user
// Parameters: message (string) - Feedback message to display
// Returns: void
// ===================================================================
function showFeedback(message) {
    // Create a temporary alert-like message
    // This could be enhanced with a toast notification system
    console.log('Feedback:', message);
    
    // Optional: Show alert for now
    // alert(message);
}

// ===================================================================
// INITIALIZATION - Set up the interactive on page load
// MODIFICATION: Load default demo text and auto-display pinyin/analysis
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set default demo text in textarea
    chineseInput.value = DEFAULT_DEMO_TEXT;
    charCountDisplay.textContent = DEFAULT_DEMO_TEXT.length;

    // Auto-display pinyin and character analysis for default text
    displayPinyin(DEFAULT_DEMO_TEXT);
    analyzeCharacters(DEFAULT_DEMO_TEXT);

    // Focus on input field for immediate interaction
    chineseInput.focus();

    // Log initialization for debugging
    console.log('Chinese Text to Speech Interactive loaded successfully');
    console.log('Pinyin database entries:', Object.keys(pinyinDatabase).length);
    console.log('Default demo text loaded:', DEFAULT_DEMO_TEXT);
});

// ===================================================================
// CLEANUP - Handle page unload
// ===================================================================
window.addEventListener('beforeunload', () => {
    // Cancel any ongoing speech synthesis
    window.speechSynthesis.cancel();
});