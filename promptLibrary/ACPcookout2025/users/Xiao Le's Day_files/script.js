// Game data structure containing scenes and correct answers - Updated with new emojis
const gameData = {
    scenes: [
        {
            time: "上午",
            emoji: "🌞🏫🧑‍🎓🎵", // Updated emoji sequence for morning scene
            answers: {
                time: "上午",
                place: "学校", 
                people: "同学",
                activity: "唱生日歌"
            }
        },
        {
            time: "下午", 
            emoji: "🌤️🛝🤱", // Updated emoji sequence for afternoon scene
            answers: {
                time: "下午",
                place: "游乐场",
                people: "妈妈", 
                activity: "溜滑梯"
            }
        },
        {
            time: "傍晚",
            emoji: "🌇🏠👴🎂", // Updated emoji sequence for evening scene (unchanged)
            answers: {
                time: "傍晚",
                place: "家里",
                people: "爷爷",
                activity: "吃生日蛋糕"
            }
        }
    ],
    
    // All possible options for each question category
    options: {
        time: ["上午", "下午", "傍晚"],
        place: ["学校", "游乐场", "家里"], 
        people: ["同学", "妈妈", "爷爷"],
        activity: ["唱生日歌", "溜滑梯", "吃生日蛋糕"]
    },
    
    // Question templates for each category
    questions: {
        time: "这是什么时候？",
        place: "小乐在哪里？", 
        people: "和谁一起？",
        activity: "在做什么？"
    }
};

// Game state management
let gameState = {
    currentScene: 0,
    currentQuestion: 'time', // time, place, people, activity
    completedScenes: [],
    questionOrder: ['time', 'place', 'people', 'activity'],
    currentQuestionIndex: 0
};

// DOM elements
const conductorIntro = document.getElementById('conductorIntro');
const gameInterface = document.getElementById('gameInterface');
const startBtn = document.getElementById('startBtn');
const questionPanel = document.getElementById('questionPanel');
const celebration = document.getElementById('celebration');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const currentEmoji = document.getElementById('currentEmoji');
const hintText = document.getElementById('hintText');
const restartBtn = document.getElementById('restartBtn');

// Audio feedback using Web Audio API for cross-browser compatibility
function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let frequency, duration;
    
    switch(type) {
        case 'correct':
            frequency = 800; // Higher pitch for success
            duration = 0.3;
            break;
        case 'incorrect': 
            frequency = 200; // Lower pitch for error
            duration = 0.2;
            break;
        case 'celebration':
            frequency = 1000; // Highest pitch for celebration
            duration = 0.5;
            break;
        default:
            return;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Initialize the game
function initGame() {
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);
    
    // Add click handlers for carriages
    document.querySelectorAll('.carriage').forEach(carriage => {
        carriage.addEventListener('click', () => {
            const sceneIndex = parseInt(carriage.dataset.scene);
            if (!gameState.completedScenes.includes(sceneIndex)) {
                startScene(sceneIndex);
            }
        });
    });
}

// Start the main game
function startGame() {
    conductorIntro.style.display = 'none';
    gameInterface.style.display = 'flex';
    
    // Play train whistle sound
    playSound('celebration');
    
    // Start with first scene
    startScene(0);
}

// Start a specific scene
function startScene(sceneIndex) {
    gameState.currentScene = sceneIndex;
    gameState.currentQuestionIndex = 0;
    gameState.currentQuestion = gameState.questionOrder[0];
    
    // Highlight active carriage
    document.querySelectorAll('.carriage').forEach(c => c.classList.remove('active'));
    document.getElementById(`carriage${sceneIndex + 1}`).classList.add('active');
    
    // Show question panel and start first question
    questionPanel.style.display = 'block';
    celebration.style.display = 'none';
    
    showQuestion();
}

// Display current question with options
function showQuestion() {
    const scene = gameData.scenes[gameState.currentScene];
    const questionType = gameState.currentQuestion;
    
    // Update question title
    questionTitle.textContent = gameData.questions[questionType];
    
    // Update emoji display with new emoji sequences
    currentEmoji.textContent = scene.emoji;
    
    // Hide hint text
    hintText.classList.remove('show');
    
    // Generate option buttons
    generateOptions(questionType);
}

// Generate clickable option buttons
function generateOptions(questionType) {
    optionsContainer.innerHTML = '';
    
    const options = gameData.options[questionType];
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => handleAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function handleAnswer(selectedAnswer, buttonElement) {
    const scene = gameData.scenes[gameState.currentScene];
    const correctAnswer = scene.answers[gameState.currentQuestion];
    
    // Disable all buttons temporarily
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if (selectedAnswer === correctAnswer) {
        // Correct answer
        buttonElement.classList.add('correct');
        playSound('correct');
        
        setTimeout(() => {
            nextQuestion();
        }, 1000);
        
    } else {
        // Incorrect answer
        buttonElement.classList.add('incorrect');
        hintText.classList.add('show');
        playSound('incorrect');
        
        setTimeout(() => {
            // Re-enable buttons and reset styles
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.style.pointerEvents = 'auto';
                btn.classList.remove('incorrect');
            });
            hintText.classList.remove('show');
        }, 1500);
    }
}

// Move to next question or complete scene
function nextQuestion() {
    gameState.currentQuestionIndex++;
    
    if (gameState.currentQuestionIndex < gameState.questionOrder.length) {
        // More questions in this scene
        gameState.currentQuestion = gameState.questionOrder[gameState.currentQuestionIndex];
        showQuestion();
    } else {
        // Scene completed
        completeScene();
    }
}

// Complete current scene
function completeScene() {
    const sceneIndex = gameState.currentScene;
    gameState.completedScenes.push(sceneIndex);
    
    // Mark carriage as completed
    const carriage = document.getElementById(`carriage${sceneIndex + 1}`);
    carriage.classList.remove('active');
    carriage.classList.add('completed');
    
    // Update progress
    updateProgress();
    
    // Hide question panel
    questionPanel.style.display = 'none';
    
    // Check if all scenes completed
    if (gameState.completedScenes.length === gameData.scenes.length) {
        showCelebration();
    } else {
        // Auto-start next scene after delay
        setTimeout(() => {
            const nextScene = findNextIncompleteScene();
            if (nextScene !== -1) {
                startScene(nextScene);
            }
        }, 2000);
    }
}

// Find next incomplete scene
function findNextIncompleteScene() {
    for (let i = 0; i < gameData.scenes.length; i++) {
        if (!gameState.completedScenes.includes(i)) {
            return i;
        }
    }
    return -1;
}

// Update progress bar
function updateProgress() {
    const progress = (gameState.completedScenes.length / gameData.scenes.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${gameState.completedScenes.length}/${gameData.scenes.length}`;
}

// Show celebration screen
function showCelebration() {
    celebration.style.display = 'block';
    playSound('celebration');
    
    // Add train movement animation
    const trainContainer = document.querySelector('.train-container');
    trainContainer.style.animation = 'trainMove 2s ease-in-out';
}

// Restart the game
function restartGame() {
    // Reset game state
    gameState = {
        currentScene: 0,
        currentQuestion: 'time',
        completedScenes: [],
        questionOrder: ['time', 'place', 'people', 'activity'],
        currentQuestionIndex: 0
    };
    
    // Reset UI
    document.querySelectorAll('.carriage').forEach(carriage => {
        carriage.classList.remove('active', 'completed');
    });
    
    progressFill.style.width = '0%';
    progressText.textContent = '0/3';
    
    celebration.style.display = 'none';
    questionPanel.style.display = 'none';
    
    // Remove train animation
    const trainContainer = document.querySelector('.train-container');
    trainContainer.style.animation = '';
    
    // Start first scene
    startScene(0);
}

// Add train movement animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes trainMove {
        0% { transform: translateX(0); }
        100% { transform: translateX(50px); }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// Handle touch events for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add keyboard support for accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('option-btn')) {
            activeElement.click();
        }
    }
});

// Console log for debugging - Updated message to reflect emoji changes
console.log('小乐的一天 Game Initialized with Updated Emojis - Ready to play!');