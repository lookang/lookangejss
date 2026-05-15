// Game state management
let gameState = {
    currentScreen: 'menu', // menu, playing, gameOver
    difficulty: 'easy',
    cards: [],
    flippedCards: [],
    matchedPairs: new Set(),
    moves: 0,
    time: 0,
    gameStartTime: null,
    scoreHistory: JSON.parse(localStorage.getItem('fractionGameScores') || '[]'),
    gameTimer: null
};

// Difficulty configuration based on Singapore curriculum
const difficultySettings = {
    easy: { pairs: 4, gridCols: 4 },
    medium: { pairs: 6, gridCols: 4 },
    difficult: { pairs: 10, gridCols: 5 }
};

// Fraction pairs representing equivalent fractions commonly taught in Singapore curriculum
const fractionPairs = [
    ['1/2', '2/4'], ['1/3', '2/6'], ['1/4', '2/8'], ['2/3', '4/6'],
    ['3/4', '6/8'], ['1/5', '2/10'], ['2/5', '4/10'], ['3/5', '6/10'],
    ['1/6', '2/12'], ['5/6', '10/12'], ['1/8', '2/16'], ['3/8', '6/16'],
    ['4/5', '8/10'], ['7/8', '14/16'], ['1/10', '2/20'], ['3/10', '6/20']
];

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    showMenu();
    updateScoreHistory();
});

// Tooltip functionality for cognitive load reduction
function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 10 + 'px';
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Screen management functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId.replace('Screen', '');
}

function showMenu() {
    showScreen('menuScreen');
    clearInterval(gameState.gameTimer);
    updateScoreHistory();
}

// Game initialization - implements chunking principle for cognitive load management
function startGame(difficulty) {
    gameState.difficulty = difficulty;
    const settings = difficultySettings[difficulty];
    
    // Create card pairs using selected fraction equivalents
    const selectedPairs = fractionPairs.slice(0, settings.pairs);
    const gameCards = [];
    
    // Generate card objects with unique IDs and pair relationships
    selectedPairs.forEach(([frac1, frac2], index) => {
        gameCards.push(
            { id: index * 2, fraction: frac1, pairId: index, isFlipped: false, isMatched: false },
            { id: index * 2 + 1, fraction: frac2, pairId: index, isFlipped: false, isMatched: false }
        );
    });
    
    // Fisher-Yates shuffle algorithm for random card placement
    for (let i = gameCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    // Reset game state
    gameState.cards = gameCards;
    gameState.flippedCards = [];
    gameState.matchedPairs = new Set();
    gameState.moves = 0;
    gameState.time = 0;
    gameState.gameStartTime = Date.now();
    
    // Update UI elements
    document.getElementById('difficultyLabel').textContent = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`;
    document.getElementById('movesDisplay').textContent = 'Moves: 0';
    document.getElementById('pairsDisplay').textContent = `Pairs: 0/${settings.pairs}`;
    document.getElementById('timeDisplay').textContent = '0:00';
    
    // Apply difficulty-based background gradient
    const backgrounds = {
        easy: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        medium: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        difficult: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    };
    document.body.style.background = backgrounds[difficulty];
    
    // Create game board and start timer
    createGameBoard();
    startTimer();
    showScreen('gameScreen');
}

// Create visual game board with responsive grid layout
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const settings = difficultySettings[gameState.difficulty];
    
    // Set up CSS Grid based on difficulty
    gameBoard.style.gridTemplateColumns = `repeat(${settings.gridCols}, 1fr)`;
    gameBoard.style.maxWidth = `${settings.gridCols * 110}px`;
    gameBoard.innerHTML = '';
    
    // Create card elements with accessibility features
    gameState.cards.forEach(card => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
    });
}

// Create individual card element with visual fraction representation
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.setAttribute('data-card-id', card.id);
    cardDiv.setAttribute('role', 'button');
    cardDiv.setAttribute('tabindex', '0');
    cardDiv.setAttribute('aria-label', `Fraction card ${card.fraction}`);
    
    cardDiv.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-back">?</div>
            <div class="card-face card-front">
                ${renderFraction(card.fraction)}
            </div>
        </div>
    `;
    
    // Add click and keyboard event listeners
    cardDiv.addEventListener('click', () => handleCardClick(card.id));
    cardDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(card.id);
        }
    });
    
    return cardDiv;
}

// Generate visual fraction representation following dual coding theory
function renderFraction(fraction) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    
    // Calculate grid layout for visual representation
    const cols = Math.min(denominator, 4);
    const rows = Math.ceil(denominator / 4);
    
    let visualParts = '';
    for (let i = 0; i < denominator; i++) {
        const filled = i < numerator ? 'filled' : 'empty';
        visualParts += `<div class="fraction-part ${filled}"></div>`;
    }
    
    return `
        <div class="fraction-display">
            <div class="fraction-text">${fraction}</div>
            <div class="fraction-visual" style="grid-template-columns: repeat(${cols}, 1fr);">
                ${visualParts}
            </div>
        </div>
    `;
}

// Handle card click interactions with cognitive load considerations - FIXED
function handleCardClick(cardId) {
    // Fixed: Check if game is in playing state correctly
    if (gameState.flippedCards.length === 2 || gameState.currentScreen !== 'game') return;
    
    const card = gameState.cards.find(c => c.id === cardId);
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    
    // Prevent clicking already flipped or matched cards
    if (card.isFlipped || card.isMatched) return;
    
    // Fixed: Properly flip the card by updating both state and DOM
    card.isFlipped = true;
    cardElement.classList.add('flipped');
    gameState.flippedCards.push(cardId);
    
    // Debug logging to help troubleshoot
    console.log(`Card ${cardId} clicked - Fraction: ${card.fraction}`);
    console.log(`Flipped cards: ${gameState.flippedCards.length}`);
    
    // Check for pair when two cards are flipped
    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        document.getElementById('movesDisplay').textContent = `Moves: ${gameState.moves}`;
        
        // Delay for cognitive processing (Mayer's temporal contiguity principle)
        setTimeout(() => {
            checkForMatch();
        }, 1000);
    }
}

// Check if flipped cards form a matching pair
function checkForMatch() {
    const [firstCardId, secondCardId] = gameState.flippedCards;
    const firstCard = gameState.cards.find(c => c.id === firstCardId);
    const secondCard = gameState.cards.find(c => c.id === secondCardId);
    
    const firstCardElement = document.querySelector(`[data-card-id="${firstCardId}"]`);
    const secondCardElement = document.querySelector(`[data-card-id="${secondCardId}"]`);
    
    if (firstCard.pairId === secondCard.pairId) {
        // Match found - apply visual feedback
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        
        firstCardElement.classList.add('matched');
        secondCardElement.classList.add('matched');
        
        gameState.matchedPairs.add(firstCard.pairId);
        
        // Update pairs counter
        const totalPairs = difficultySettings[gameState.difficulty].pairs;
        document.getElementById('pairsDisplay').textContent = `Pairs: ${gameState.matchedPairs.size}/${totalPairs}`;
        
        // Check for game completion
        if (gameState.matchedPairs.size === totalPairs) {
            setTimeout(() => {
                endGame();
            }, 500);
        }
    } else {
        // No match - flip cards back
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        
        firstCardElement.classList.remove('flipped');
        secondCardElement.classList.remove('flipped');
    }
    
    // Reset flipped cards array
    gameState.flippedCards = [];
}

// Timer management for game duration tracking
function startTimer() {
    gameState.gameTimer = setInterval(() => {
        gameState.time = Math.floor((Date.now() - gameState.gameStartTime) / 1000);
        document.getElementById('timeDisplay').textContent = formatTime(gameState.time);
    }, 1000);
}

// Format time display in MM:SS format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// End game and calculate score based on performance metrics
function endGame() {
    clearInterval(gameState.gameTimer);
    
    // Calculate score using performance-based algorithm
    const baseScore = 100;
    const timePenalty = Math.floor(gameState.time / 10);
    const movesPenalty = gameState.moves;
    const finalScore = Math.max(baseScore - timePenalty - movesPenalty, 10);
    
    // Store game result in score history
    const gameResult = {
        difficulty: gameState.difficulty,
        moves: gameState.moves,
        time: gameState.time,
        score: finalScore,
        date: new Date().toLocaleDateString()
    };
    
    gameState.scoreHistory.push(gameResult);
    localStorage.setItem('fractionGameScores', JSON.stringify(gameState.scoreHistory));
    
    // Update game over screen with results
    document.getElementById('completionMessage').textContent = `You completed the ${gameState.difficulty} level!`;
    document.getElementById('finalTime').textContent = formatTime(gameState.time);
    document.getElementById('finalMoves').textContent = gameState.moves;
    document.getElementById('finalScore').textContent = finalScore;
    
    showScreen('gameOverScreen');
}

// Play again with same difficulty
function playAgain() {
    startGame(gameState.difficulty);
}

// Update score history display in menu
function updateScoreHistory() {
    const scoreHistoryDiv = document.getElementById('scoreHistory');
    const scoreList = document.getElementById('scoreList');
    
    if (gameState.scoreHistory.length === 0) {
        scoreHistoryDiv.style.display = 'none';
        return;
    }
    
    scoreHistoryDiv.style.display = 'block';
    
    // Show last 5 games
    const recentGames = gameState.scoreHistory.slice(-5).reverse();
    scoreList.innerHTML = recentGames.map(game => `
        <div class="score-item">
            <span class="difficulty-name">${game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}</span>
            <div class="score-details">
                <span>${game.moves} moves</span>
                <span>${formatTime(game.time)}</span>
                <span class="score-value">${game.score}</span>
            </div>
        </div>
    `).join('');
}

// Keyboard navigation support for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && gameState.currentScreen === 'playing') {
        showMenu();
    }
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    if (gameState.currentScreen === 'playing') {
        // Adjust card sizes based on container size
        const cards = document.querySelectorAll('.card');
        const container = document.getElementById('gameBoard');
        const containerWidth = container.offsetWidth;
        const cols = difficultySettings[gameState.difficulty].gridCols;
        const cardSize = Math.min(90, (containerWidth - (cols - 1) * 12) / cols);
        
        cards.forEach(card => {
            card.style.width = cardSize + 'px';
            card.style.height = (cardSize * 1.2) + 'px';
        });
    }
});