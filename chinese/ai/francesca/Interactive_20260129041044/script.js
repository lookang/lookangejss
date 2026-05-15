// ===========================
// GAME STATE & CONFIGURATION
// ===========================

// Vocabulary list - Teachers can replace this with their own
const vocabList = [
    { hanzi: "测试", pinyin: "ceshi" },
    { hanzi: "伤害", pinyin: "shanghai" },
    { hanzi: "下降", pinyin: "xiajiang" },
    { hanzi: "户外", pinyin: "huwai" },
    { hanzi: "而且", pinyin: "erqie" },
    { hanzi: "诊所", pinyin: "zhensuo" },
    { hanzi: "正确", pinyin: "zhengque" },
    { hanzi: "保持距离", pinyin: "baochi juli" },
    { hanzi: "模糊", pinyin: "mohu" },
    { hanzi: "放松", pinyin: "fangsong" },
    { hanzi: "习惯", pinyin: "xiguan" }
];

// Game configuration
const RACE_DISTANCE = 100; // Total race distance in meters
const CORRECT_MOVE_DISTANCE = 10; // Distance player moves on correct answer
const WRONG_PENALTY = 3; // Distance player loses on wrong answer
const LEVEL_UP_THRESHOLD = 5; // Correct answers needed to level up
const BASE_AI_SPEED = 0.15; // Base AI movement speed per frame
const LEVEL_SPEED_MULTIPLIER = 0.05; // Speed increase per level

// Game state object
let gameState = {
    isPlaying: false,
    score: 0,
    highScore: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    correctAnswers: 0,
    currentWord: null,
    playerPosition: 0,
    aiPositions: [0, 0, 0],
    usedWords: []
};

// ===========================
// DOM ELEMENTS
// ===========================
const elements = {
    score: document.getElementById('score'),
    highScore: document.getElementById('highScore'),
    level: document.getElementById('level'),
    combo: document.getElementById('combo'),
    currentHanzi: document.getElementById('currentHanzi'),
    pinyinInput: document.getElementById('pinyinInput'),
    startBtn: document.getElementById('startBtn'),
    playerRacer: document.getElementById('playerRacer'),
    aiRacers: [
        document.getElementById('aiRacer1'),
        document.getElementById('aiRacer2'),
        document.getElementById('aiRacer3')
    ],
    resultOverlay: document.getElementById('resultOverlay'),
    resultTitle: document.getElementById('resultTitle'),
    finalScore: document.getElementById('finalScore'),
    finalLevel: document.getElementById('finalLevel'),
    maxCombo: document.getElementById('maxCombo'),
    restartBtn: document.getElementById('restartBtn'),
    particleContainer: document.getElementById('particleContainer')
};

// ===========================
// WEB AUDIO API SETUP
// ===========================
let audioContext;
let isAudioInitialized = false;

function initAudio() {
    if (!isAudioInitialized) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isAudioInitialized = true;
    }
}

// Play success beep sound
function playSuccessSound() {
    if (!isAudioInitialized) return;
    
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
}

// Play error sound
function playErrorSound() {
    if (!isAudioInitialized) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Play win sound
function playWinSound() {
    if (!isAudioInitialized) return;
    
    const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord)
    notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
    });
}

// ===========================
// GAME INITIALIZATION
// ===========================

// Load high score from localStorage
function loadHighScore() {
    const saved = localStorage.getItem('pinyinRaceHighScore');
    gameState.highScore = saved ? parseInt(saved) : 0;
    elements.highScore.textContent = gameState.highScore;
}

// Save high score to localStorage
function saveHighScore() {
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('pinyinRaceHighScore', gameState.highScore);
        elements.highScore.textContent = gameState.highScore;
    }
}

// Get random word from vocabulary list
function getRandomWord() {
    // Reset used words if all have been used
    if (gameState.usedWords.length >= vocabList.length) {
        gameState.usedWords = [];
    }
    
    // Filter out used words
    const availableWords = vocabList.filter(
        word => !gameState.usedWords.includes(word.hanzi)
    );
    
    // Select random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    
    // Mark as used
    gameState.usedWords.push(selectedWord.hanzi);
    
    return selectedWord;
}

// Display new word
function showNewWord() {
    gameState.currentWord = getRandomWord();
    elements.currentHanzi.textContent = gameState.currentWord.hanzi;
    elements.pinyinInput.value = '';
}

// ===========================
// GAME MECHANICS
// ===========================

// Start game
function startGame() {
    initAudio();
    
    // Reset game state
    gameState.isPlaying = true;
    gameState.score = 0;
    gameState.level = 1;
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.correctAnswers = 0;
    gameState.playerPosition = 0;
    gameState.aiPositions = [0, 0, 0];
    gameState.usedWords = [];
    
    // Update UI
    updateUI();
    showNewWord();
    
    // Hide start button, show input
    elements.startBtn.classList.add('hidden');
    elements.pinyinInput.classList.remove('hidden');
    elements.pinyinInput.focus();
    
    // Start AI movement
    requestAnimationFrame(updateAI);
}

// Update UI elements
function updateUI() {
    elements.score.textContent = gameState.score;
    elements.level.textContent = gameState.level;
    elements.combo.textContent = gameState.combo;
    
    // Update racer positions
    updateRacerPosition(elements.playerRacer, gameState.playerPosition);
    gameState.aiPositions.forEach((pos, index) => {
        updateRacerPosition(elements.aiRacers[index], pos);
    });
}

// Update racer position on track
function updateRacerPosition(racerElement, position) {
    const trackWidth = racerElement.parentElement.offsetWidth - 80; // Account for racer width and finish line
    const percentage = Math.min(position / RACE_DISTANCE, 1);
    const leftPosition = percentage * trackWidth;
    racerElement.style.left = leftPosition + 'px';
    
    // Update distance marker
    const marker = racerElement.parentElement.querySelector('.distance-marker');
    if (marker) {
        marker.textContent = Math.round(position) + 'm';
    }
}

// Handle correct answer
function handleCorrectAnswer() {
    // Play sound
    playSuccessSound();
    
    // Update game state
    gameState.playerPosition += CORRECT_MOVE_DISTANCE;
    gameState.score += 10 + (gameState.combo * 2); // Bonus for combo
    gameState.combo++;
    gameState.correctAnswers++;
    
    // Track max combo
    if (gameState.combo > gameState.maxCombo) {
        gameState.maxCombo = gameState.combo;
    }
    
    // Level up check
    if (gameState.correctAnswers % LEVEL_UP_THRESHOLD === 0) {
        gameState.level++;
        showLevelUpEffect();
    }
    
    // Visual feedback
    createParticleEffect();
    createNeonFlash();
    
    // Check win condition
    if (gameState.playerPosition >= RACE_DISTANCE) {
        endGame(true);
        return;
    }
    
    // Update UI and show new word
    updateUI();
    showNewWord();
}

// Handle wrong answer
function handleWrongAnswer() {
    // Play error sound
    playErrorSound();
    
    // Reset combo
    gameState.combo = 0;
    
    // Penalty: move back slightly
    gameState.playerPosition = Math.max(0, gameState.playerPosition - WRONG_PENALTY);
    
    // Visual feedback
    elements.pinyinInput.classList.add('shake');
    setTimeout(() => {
        elements.pinyinInput.classList.remove('shake');
    }, 300);
    
    // Update UI
    updateUI();
}

// Check player input
function checkInput() {
    const userInput = elements.pinyinInput.value.trim().toLowerCase();
    const correctAnswer = gameState.currentWord.pinyin.toLowerCase();
    
    if (userInput === correctAnswer) {
        handleCorrectAnswer();
    } else if (userInput.length >= correctAnswer.length) {
        // Only trigger wrong answer if input is long enough
        handleWrongAnswer();
        elements.pinyinInput.value = '';
    }
}

// ===========================
// AI OPPONENTS
// ===========================

// Update AI positions (called every frame)
function updateAI() {
    if (!gameState.isPlaying) return;
    
    // Calculate AI speed based on level
    const aiSpeed = BASE_AI_SPEED + (gameState.level - 1) * LEVEL_SPEED_MULTIPLIER;
    
    // Update each AI position with slight randomness
    gameState.aiPositions = gameState.aiPositions.map(pos => {
        const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        const newPos = pos + (aiSpeed * randomFactor);
        return Math.min(newPos, RACE_DISTANCE);
    });
    
    // Check if any AI won
    const aiWon = gameState.aiPositions.some(pos => pos >= RACE_DISTANCE);
    if (aiWon) {
        endGame(false);
        return;
    }
    
    // Update UI
    updateUI();
    
    // Continue animation
    requestAnimationFrame(updateAI);
}

// ===========================
// VISUAL EFFECTS
// ===========================

// Create particle burst effect
function createParticleEffect() {
    const particleCount = 15;
    const racerRect = elements.playerRacer.getBoundingClientRect();
    const containerRect = elements.particleContainer.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position at player racer
        const x = racerRect.left - containerRect.left + racerRect.width / 2;
        const y = racerRect.top - containerRect.top + racerRect.height / 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        elements.particleContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => particle.remove(), 600);
    }
}

// Create neon flash effect
function createNeonFlash() {
    const flash = document.createElement('div');
    flash.className = 'neon-flash';
    document.getElementById('gameContainer').appendChild(flash);
    
    setTimeout(() => flash.remove(), 300);
}

// Show level up effect
function showLevelUpEffect() {
    const levelElement = elements.level;
    levelElement.style.transform = 'scale(1.5)';
    levelElement.style.color = '#ffff00';
    
    setTimeout(() => {
        levelElement.style.transform = 'scale(1)';
        levelElement.style.color = '#fff';
    }, 500);
}

// ===========================
// GAME END
// ===========================

// End game and show results
function endGame(playerWon) {
    gameState.isPlaying = false;
    
    // Save high score
    saveHighScore();
    
    // Play win sound if player won
    if (playerWon) {
        playWinSound();
    }
    
    // Update result overlay
    elements.resultTitle.textContent = playerWon ? '🏆 You Win!' : '😢 You Lost!';
    elements.resultTitle.style.color = playerWon ? '#ffff00' : '#ff6b6b';
    elements.finalScore.textContent = gameState.score;
    elements.finalLevel.textContent = gameState.level;
    elements.maxCombo.textContent = gameState.maxCombo;
    
    // Show overlay
    elements.resultOverlay.classList.remove('hidden');
}

// Restart game
function restartGame() {
    // Hide overlay
    elements.resultOverlay.classList.add('hidden');
    
    // Reset positions
    gameState.playerPosition = 0;
    gameState.aiPositions = [0, 0, 0];
    updateUI();
    
    // Show start button
    elements.startBtn.classList.remove('hidden');
    elements.pinyinInput.classList.add('hidden');
    
    // Reset word display
    elements.currentHanzi.textContent = '准备好了吗？';
}

// ===========================
// EVENT LISTENERS
// ===========================

// Start button
elements.startBtn.addEventListener('click', startGame);

// Restart button
elements.restartBtn.addEventListener('click', restartGame);

// Input field - check on every input
elements.pinyinInput.addEventListener('input', () => {
    if (gameState.isPlaying) {
        checkInput();
    }
});

// Prevent form submission on Enter
elements.pinyinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// Auto-focus input when game is playing
document.addEventListener('click', () => {
    if (gameState.isPlaying) {
        elements.pinyinInput.focus();
    }
});

// ===========================
// INITIALIZATION
// ===========================

// Load high score on page load
loadHighScore();

// Hide input initially
elements.pinyinInput.classList.add('hidden');

console.log('🏁 Pinyin Racing Game Loaded!');