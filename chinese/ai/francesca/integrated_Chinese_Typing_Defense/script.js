/* ===================================
   CHINESE TYPING DEFENSE - GAME LOGIC
   =================================== */

// ============================================
// VOCABULARY DATA
// ============================================
// [PASTE YOUR VOCABULARY LIST HERE]
// Format: { hanzi: "Chinese Character", pinyin: "pinyin" }
const vocabList = [
    { hanzi: "快乐", pinyin: "kuaile" },
    { hanzi: "学校", pinyin: "xuexiao" },
    { hanzi: "努力", pinyin: "nuli" },
    { hanzi: "朋友", pinyin: "pengyou" },
    { hanzi: "家庭", pinyin: "jiating" },
    { hanzi: "老师", pinyin: "laoshi" },
    { hanzi: "学生", pinyin: "xuesheng" },
    { hanzi: "书本", pinyin: "shuben" },
    { hanzi: "音乐", pinyin: "yinyue" },
    { hanzi: "运动", pinyin: "yundong" },
    { hanzi: "美丽", pinyin: "meili" },
    { hanzi: "聪明", pinyin: "congming" },
    { hanzi: "勇敢", pinyin: "yonggan" },
    { hanzi: "健康", pinyin: "jiankang" },
    { hanzi: "幸福", pinyin: "xingfu" }
];

// ============================================
// GAME STATE VARIABLES
// ============================================
let gameState = {
    score: 0,
    highScore: 0,
    level: 1,
    combo: 0,
    isPlaying: false,
    fallingChars: [],
    spawnInterval: null,
    animationFrame: null,
    spawnRate: 2000, // milliseconds between spawns
    fallSpeed: 1, // pixels per frame
    lastSpawnTime: 0
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    gameView: document.getElementById('gameView'),
    pinyinInput: document.getElementById('pinyinInput'),
    scoreDisplay: document.getElementById('score'),
    highScoreDisplay: document.getElementById('highScore'),
    levelDisplay: document.getElementById('level'),
    comboDisplay: document.getElementById('combo'),
    gameOverlay: document.getElementById('gameOverlay'),
    startOverlay: document.getElementById('startOverlay'),
    finalScore: document.getElementById('finalScore'),
    finalHighScore: document.getElementById('finalHighScore'),
    startBtn: document.getElementById('startBtn'),
    restartBtn: document.getElementById('restartBtn')
};

// ============================================
// WEB AUDIO API SETUP
// ============================================
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Play correct answer sound
function playCorrectSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Play wrong answer sound
function playWrongSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Play game over sound
function playGameOverSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============================================
// GAME INITIALIZATION
// ============================================
function initGame() {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('chineseTypingDefenseHighScore');
    if (savedHighScore) {
        gameState.highScore = parseInt(savedHighScore);
        elements.highScoreDisplay.textContent = gameState.highScore;
    }
    
    // Event listeners
    elements.startBtn.addEventListener('click', startGame);
    elements.restartBtn.addEventListener('click', startGame);
    elements.pinyinInput.addEventListener('input', handleInput);
    
    // Focus input when clicking on game view
    elements.gameView.addEventListener('click', () => {
        if (gameState.isPlaying) {
            elements.pinyinInput.focus();
        }
    });
}

// ============================================
// GAME START
// ============================================
function startGame() {
    // Reset game state
    gameState.score = 0;
    gameState.level = 1;
    gameState.combo = 0;
    gameState.isPlaying = true;
    gameState.fallingChars = [];
    gameState.spawnRate = 2000;
    gameState.fallSpeed = 1;
    gameState.lastSpawnTime = Date.now();
    
    // Clear game view
    elements.gameView.innerHTML = '';
    
    // Update UI
    updateUI();
    
    // Hide overlays
    elements.startOverlay.classList.add('hidden');
    elements.gameOverlay.classList.add('hidden');
    
    // Focus input
    elements.pinyinInput.value = '';
    elements.pinyinInput.focus();
    
    // Start game loop
    gameLoop();
}

// ============================================
// GAME LOOP
// ============================================
function gameLoop() {
    if (!gameState.isPlaying) return;
    
    const currentTime = Date.now();
    
    // Spawn new characters
    if (currentTime - gameState.lastSpawnTime > gameState.spawnRate) {
        spawnCharacter();
        gameState.lastSpawnTime = currentTime;
    }
    
    // Update falling characters
    updateFallingCharacters();
    
    // Continue loop
    gameState.animationFrame = requestAnimationFrame(gameLoop);
}

// ============================================
// SPAWN CHARACTER
// ============================================
function spawnCharacter() {
    // Get random vocabulary
    const vocab = vocabList[Math.floor(Math.random() * vocabList.length)];
    
    // Create character element
    const charElement = document.createElement('div');
    charElement.className = 'falling-char';
    charElement.textContent = vocab.hanzi;
    
    // Create pinyin label
    const pinyinLabel = document.createElement('div');
    pinyinLabel.className = 'pinyin-label';
    pinyinLabel.textContent = vocab.pinyin;
    charElement.appendChild(pinyinLabel);
    
    // Random horizontal position
    const gameViewWidth = elements.gameView.offsetWidth;
    const charWidth = 60; // approximate character width
    const maxX = gameViewWidth - charWidth;
    const randomX = Math.random() * maxX;
    
    charElement.style.left = randomX + 'px';
    charElement.style.top = '0px';
    
    // Add to game view
    elements.gameView.appendChild(charElement);
    
    // Store character data
    const charData = {
        element: charElement,
        hanzi: vocab.hanzi,
        pinyin: vocab.pinyin.toLowerCase(),
        y: 0,
        x: randomX
    };
    
    gameState.fallingChars.push(charData);
}

// ============================================
// UPDATE FALLING CHARACTERS
// ============================================
function updateFallingCharacters() {
    const gameViewHeight = elements.gameView.offsetHeight;
    
    for (let i = gameState.fallingChars.length - 1; i >= 0; i--) {
        const char = gameState.fallingChars[i];
        
        // Move character down
        char.y += gameState.fallSpeed;
        char.element.style.top = char.y + 'px';
        
        // Check if character reached bottom (game over)
        if (char.y > gameViewHeight - 60) {
            gameOver();
            return;
        }
    }
}

// ============================================
// HANDLE INPUT
// ============================================
function handleInput(event) {
    if (!gameState.isPlaying) return;
    
    const input = event.target.value.toLowerCase().trim();
    
    if (input === '') return;
    
    // Find matching character (prioritize lowest/closest to bottom)
    let matchedChar = null;
    let matchedIndex = -1;
    let lowestY = -1;
    
    for (let i = 0; i < gameState.fallingChars.length; i++) {
        const char = gameState.fallingChars[i];
        if (char.pinyin === input && char.y > lowestY) {
            matchedChar = char;
            matchedIndex = i;
            lowestY = char.y;
        }
    }
    
    // If match found
    if (matchedChar) {
        destroyCharacter(matchedChar, matchedIndex);
        elements.pinyinInput.value = '';
        elements.pinyinInput.classList.add('correct-flash');
        setTimeout(() => {
            elements.pinyinInput.classList.remove('correct-flash');
        }, 500);
    }
}

// ============================================
// DESTROY CHARACTER
// ============================================
function destroyCharacter(char, index) {
    // Play sound
    playCorrectSound();
    
    // Create particle effect
    createParticles(char.element);
    
    // Add destroying animation
    char.element.classList.add('destroying');
    
    // Update score
    gameState.score += 10 * gameState.level;
    gameState.combo++;
    
    // Remove character after animation
    setTimeout(() => {
        if (char.element.parentNode) {
            char.element.parentNode.removeChild(char.element);
        }
    }, 500);
    
    // Remove from array
    gameState.fallingChars.splice(index, 1);
    
    // Update UI
    updateUI();
    
    // Check level up
    checkLevelUp();
}

// ============================================
// CREATE PARTICLE EFFECT
// ============================================
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const gameViewRect = elements.gameView.getBoundingClientRect();
    
    const centerX = rect.left - gameViewRect.left + rect.width / 2;
    const centerY = rect.top - gameViewRect.top + rect.height / 2;
    
    // Create 8 particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        elements.gameView.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// ============================================
// CHECK LEVEL UP
// ============================================
function checkLevelUp() {
    const newLevel = Math.floor(gameState.score / 100) + 1;
    
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        
        // Increase difficulty
        gameState.spawnRate = Math.max(800, 2000 - (gameState.level * 150));
        gameState.fallSpeed = 1 + (gameState.level * 0.2);
        
        // Visual feedback for level up
        elements.levelDisplay.style.transform = 'scale(1.5)';
        setTimeout(() => {
            elements.levelDisplay.style.transform = 'scale(1)';
        }, 300);
    }
}

// ============================================
// UPDATE UI
// ============================================
function updateUI() {
    elements.scoreDisplay.textContent = gameState.score;
    elements.levelDisplay.textContent = gameState.level;
    elements.comboDisplay.textContent = gameState.combo;
    
    // Update high score
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        elements.highScoreDisplay.textContent = gameState.highScore;
        localStorage.setItem('chineseTypingDefenseHighScore', gameState.highScore);
    }
}

// ============================================
// GAME OVER
// ============================================
function gameOver() {
    gameState.isPlaying = false;
    
    // Stop game loop
    if (gameState.animationFrame) {
        cancelAnimationFrame(gameState.animationFrame);
    }
    
    // Play game over sound
    playGameOverSound();
    
    // Update final score display
    elements.finalScore.textContent = gameState.score;
    elements.finalHighScore.textContent = gameState.highScore;
    
    // Show game over overlay
    elements.gameOverlay.classList.remove('hidden');
    
    // Clear falling characters
    gameState.fallingChars.forEach(char => {
        if (char.element.parentNode) {
            char.element.parentNode.removeChild(char.element);
        }
    });
    gameState.fallingChars = [];
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.addEventListener('DOMContentLoaded', initGame);

// Detect if running in iframe
if (window.self !== window.top) {
    document.body.classList.add('iframe');
}