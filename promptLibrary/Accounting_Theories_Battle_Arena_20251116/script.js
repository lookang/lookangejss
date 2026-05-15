// Accounting theories data structure
const accountingTheories = [
    {
        name: "Accounting entity theory",
        explanation: "The activities of a business are separate from the actions of the owner(s). All transactions are recorded from the point of view of the business.",
        applications: [
            "Contributions of resources by the sole owner for business use is recorded as \"capital\" while withdrawal of assets from the business by the sole owner for personal use is recorded as \"drawings\"."
        ]
    },
    {
        name: "Accounting period theory",
        explanation: "The life of a business is divided into regular time intervals.",
        applications: [
            "A business should prepare its financial statements at regular time intervals (e.g. at the end of every 12 months) to provide timely information for stakeholders to make decisions."
        ]
    },
    {
        name: "Accrual basis of accounting theory",
        explanation: "Business activities that have occurred, regardless of whether cash is paid or received, should be recorded in the relevant accounting period.",
        applications: [
            "Adjusting for prepaid expense, expense payable, income receivable and income received in advance at the end of the accounting year.",
            "Adjusting for interest expense payable at the end of the accounting year."
        ]
    },
    {
        name: "Consistency theory",
        explanation: "Once an accounting method is chosen, this method should be applied to all future accounting periods to enable meaningful comparison of accounting information over time.",
        applications: [
            "Unless there is a change of usage pattern, a business should use the same depreciation method and depreciation rate every accounting period to enable meaningful comparison of the net book value of non-current assets over time."
        ]
    },
    {
        name: "Going concern theory",
        explanation: "A business is assumed to have an indefinite economic life unless there is credible evidence that it may close down.",
        applications: [
            "A business should prepare its financial statements at regular time intervals (e.g. at the end of every 12 months) to provide timely information for stakeholders to make decisions."
        ]
    },
    {
        name: "Historical cost theory",
        explanation: "Transactions should be recorded at their original cost.",
        applications: [
            "Transactions are recorded based on source documents as source documents provide proof of the original cost at which the transactions occurred."
        ]
    },
    {
        name: "Matching theory",
        explanation: "Expenses incurred must be matched against income earned in the same period to determine the profit for that period.",
        applications: [
            "Recording of depreciation expense in the books of the business.",
            "Recording of impairment loss on trade receivables in the books of a business.",
            "Recording of interest expense in the books of a business."
        ]
    },
    {
        name: "Materiality theory",
        explanation: "A transaction is considered material if it makes a difference to the decision-making process.",
        applications: [
            "Recording small amounts as revenue expenditure even though they are likely to provide benefits beyond one financial year."
        ]
    },
    {
        name: "Monetary theory",
        explanation: "Only business transactions that can be measured in monetary terms are recorded.",
        applications: [
            "Business activities such as strong collaboration among employees and providing good customer service cannot be recorded in the books of the business as these cannot be measured in monetary terms."
        ]
    },
    {
        name: "Objectivity theory",
        explanation: "Accounting information recorded must be supported by reliable and verifiable evidence so that financial statements will be free from opinions and biases.",
        applications: [
            "Transactions are recorded based on source documents as they serve as evidence that transactions have occurred."
        ]
    },
    {
        name: "Prudence theory",
        explanation: "The accounting treatment chosen should be the one that least overstates assets and profits and least understates liabilities and losses.",
        applications: [
            "Recording accumulated depreciation in the books of the business.",
            "Recording allowance for impairment of trade receivables in the books of the business.",
            "Inventory is valued on the Statement of Financial Position at cost or net realisable value, whichever is lower, to ensure that inventory (current asset) is not overstated."
        ]
    },
    {
        name: "Revenue recognition theory",
        explanation: "Revenue is earned when goods have been delivered or when services have been provided.",
        applications: [
            "Sales revenue is recorded in the books of the business when goods have been delivered.",
            "Service fee revenue is recorded in the books of the business when services have been provided."
        ]
    }
];

// Clash Royale inspired visual elements for questions
const clashRoyaleImages = [
    "⚔️", "🏰", "👑", "🛡️", "⚡", "🔥", "💎", "🏹", "🗡️", "🛡️", "⭐", "💥"
];

// Game state management
class GameState {
    constructor() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.questionsAsked = [];
        this.selectedAnswer = null;
        this.selectedTheoryName = null;
        this.selectedExplanation = null;
        this.levelQuestions = [];
        this.isAnswered = false;
    }

    // Reset game state
    reset() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.questionsAsked = [];
        this.selectedAnswer = null;
        this.selectedTheoryName = null;
        this.selectedExplanation = null;
        this.levelQuestions = [];
        this.isAnswered = false;
    }

    // Reset level state
    resetLevel() {
        this.currentQuestion = 0;
        this.questionsAsked = [];
        this.selectedAnswer = null;
        this.selectedTheoryName = null;
        this.selectedExplanation = null;
        this.levelQuestions = [];
        this.isAnswered = false;
    }
}

// Initialize game state
const gameState = new GameState();

// DOM elements
const elements = {
    tooltip: document.getElementById('tooltip'),
    gameHeader: document.getElementById('gameHeader'),
    scoreValue: document.getElementById('scoreValue'),
    currentLevel: document.getElementById('currentLevel'),
    restartLevelBtn: document.getElementById('restartLevelBtn'),
    restartGameBtn: document.getElementById('restartGameBtn'),
    levelSelection: document.getElementById('levelSelection'),
    gameScreen: document.getElementById('gameScreen'),
    gameScreenLevel3: document.getElementById('gameScreenLevel3'),
    questionCounter: document.getElementById('questionCounter'),
    questionText: document.getElementById('questionText'),
    answersGrid: document.getElementById('answersGrid'),
    submitBtn: document.getElementById('submitBtn'),
    questionCounterL3: document.getElementById('questionCounterL3'),
    questionTextL3: document.getElementById('questionTextL3'),
    theoryNamesGrid: document.getElementById('theoryNamesGrid'),
    explanationsGrid: document.getElementById('explanationsGrid'),
    submitBtnL3: document.getElementById('submitBtnL3'),
    resultModal: document.getElementById('resultModal'),
    resultIcon: document.getElementById('resultIcon'),
    resultMessage: document.getElementById('resultMessage'),
    correctAnswer: document.getElementById('correctAnswer'),
    nextQuestionBtn: document.getElementById('nextQuestionBtn'),
    levelCompleteModal: document.getElementById('levelCompleteModal'),
    completionMessage: document.getElementById('completionMessage'),
    nextLevelBtn: document.getElementById('nextLevelBtn'),
    backToMenuBtn: document.getElementById('backToMenuBtn')
};

// Function to get random Clash Royale inspired images
function getRandomClashImages() {
    const shuffled = [...clashRoyaleImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2); // Return 2 random images
}

// Initialize the game
function initGame() {
    // Check if running in iframe
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }

    // Show tooltip on header hover
    elements.gameHeader.addEventListener('mouseenter', showTooltip);
    elements.gameHeader.addEventListener('mouseleave', hideTooltip);

    // Level selection event listeners
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', () => {
            const level = parseInt(card.dataset.level);
            startLevel(level);
        });
    });

    // Control button event listeners
    elements.restartLevelBtn.addEventListener('click', restartLevel);
    elements.restartGameBtn.addEventListener('click', restartGame);

    // Submit button event listeners
    elements.submitBtn.addEventListener('click', submitAnswer);
    elements.submitBtnL3.addEventListener('click', submitAnswerLevel3);

    // Modal event listeners
    elements.nextQuestionBtn.addEventListener('click', nextQuestion);
    elements.nextLevelBtn.addEventListener('click', goToNextLevel);
    elements.backToMenuBtn.addEventListener('click', backToMenu);

    // Initialize display
    updateDisplay();
    showScreen('levelSelection');
}

// Tooltip functions
function showTooltip() {
    elements.tooltip.classList.add('show');
}

function hideTooltip() {
    elements.tooltip.classList.remove('show');
}

// Screen management
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });

    // Show selected screen
    switch (screenName) {
        case 'levelSelection':
            elements.levelSelection.style.display = 'block';
            elements.restartLevelBtn.style.display = 'none';
            elements.restartGameBtn.style.display = 'none';
            break;
        case 'gameScreen':
            elements.gameScreen.style.display = 'block';
            elements.restartLevelBtn.style.display = 'inline-block';
            elements.restartGameBtn.style.display = 'inline-block';
            break;
        case 'gameScreenLevel3':
            elements.gameScreenLevel3.style.display = 'block';
            elements.restartLevelBtn.style.display = 'inline-block';
            elements.restartGameBtn.style.display = 'inline-block';
            break;
    }
}

// Start a level
function startLevel(level) {
    gameState.currentLevel = level;
    gameState.resetLevel();
    generateLevelQuestions(level);
    
    if (level === 3) {
        showScreen('gameScreenLevel3');
    } else {
        showScreen('gameScreen');
    }
    
    updateDisplay();
    loadQuestion();
}

// Generate questions for the level
function generateLevelQuestions(level) {
    gameState.levelQuestions = [];
    
    if (level === 1 || level === 2) {
        // Shuffle theories for levels 1 and 2
        gameState.levelQuestions = [...accountingTheories].sort(() => Math.random() - 0.5);
    } else if (level === 3) {
        // Generate all applications for level 3
        const applications = [];
        accountingTheories.forEach(theory => {
            theory.applications.forEach(app => {
                applications.push({
                    application: app,
                    correctTheory: theory
                });
            });
        });
        gameState.levelQuestions = applications.sort(() => Math.random() - 0.5);
    }
}

// Load current question
function loadQuestion() {
    gameState.isAnswered = false;
    gameState.selectedAnswer = null;
    gameState.selectedTheoryName = null;
    gameState.selectedExplanation = null;

    const currentQ = gameState.levelQuestions[gameState.currentQuestion];
    
    if (gameState.currentLevel === 1) {
        loadLevel1Question(currentQ);
    } else if (gameState.currentLevel === 2) {
        loadLevel2Question(currentQ);
    } else if (gameState.currentLevel === 3) {
        loadLevel3Question(currentQ);
    }
    
    updateSubmitButton();
}

// Load Level 1 question (name -> explanation) - Enhanced with Clash Royale visuals
function loadLevel1Question(theory) {
    const clashImages = getRandomClashImages();
    elements.questionText.innerHTML = `${clashImages[0]} ${theory.name} ${clashImages[1]}`;
    elements.questionCounter.textContent = `Question ${gameState.currentQuestion + 1}/12`;
    
    // Generate answer options (correct explanation + 3 random explanations)
    const options = [theory.explanation];
    const otherTheories = accountingTheories.filter(t => t.name !== theory.name);
    
    while (options.length < 4 && otherTheories.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherTheories.length);
        const randomExplanation = otherTheories[randomIndex].explanation;
        if (!options.includes(randomExplanation)) {
            options.push(randomExplanation);
        }
        otherTheories.splice(randomIndex, 1);
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Create answer buttons with Clash Royale inspired visuals
    elements.answersGrid.innerHTML = '';
    options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        const optionImages = getRandomClashImages();
        button.innerHTML = `${optionImages[0]} ${option}`;
        button.addEventListener('click', () => selectAnswer(option));
        elements.answersGrid.appendChild(button);
    });
}

// Load Level 2 question (explanation -> name) - Enhanced with Clash Royale visuals
function loadLevel2Question(theory) {
    const clashImages = getRandomClashImages();
    elements.questionText.innerHTML = `${clashImages[0]} ${theory.explanation} ${clashImages[1]}`;
    elements.questionCounter.textContent = `Question ${gameState.currentQuestion + 1}/12`;
    
    // Generate answer options (correct name + 3 random names)
    const options = [theory.name];
    const otherTheories = accountingTheories.filter(t => t.name !== theory.name);
    
    while (options.length < 4 && otherTheories.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherTheories.length);
        const randomName = otherTheories[randomIndex].name;
        if (!options.includes(randomName)) {
            options.push(randomName);
        }
        otherTheories.splice(randomIndex, 1);
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Create answer buttons with Clash Royale inspired visuals
    elements.answersGrid.innerHTML = '';
    options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        const optionImages = getRandomClashImages();
        button.innerHTML = `${optionImages[0]} ${option}`;
        button.addEventListener('click', () => selectAnswer(option));
        elements.answersGrid.appendChild(button);
    });
}

// Load Level 3 question (application -> name + explanation) - Enhanced with Clash Royale visuals
function loadLevel3Question(questionData) {
    const clashImages = getRandomClashImages();
    elements.questionTextL3.innerHTML = `${clashImages[0]} ${questionData.application} ${clashImages[1]}`;
    elements.questionCounterL3.textContent = `Question ${gameState.currentQuestion + 1}/18`;
    
    // Generate theory name options
    const nameOptions = [questionData.correctTheory.name];
    const otherTheories = accountingTheories.filter(t => t.name !== questionData.correctTheory.name);
    
    while (nameOptions.length < 4 && otherTheories.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherTheories.length);
        const randomName = otherTheories[randomIndex].name;
        if (!nameOptions.includes(randomName)) {
            nameOptions.push(randomName);
        }
        otherTheories.splice(randomIndex, 1);
    }
    nameOptions.sort(() => Math.random() - 0.5);
    
    // Generate explanation options
    const explanationOptions = [questionData.correctTheory.explanation];
    const remainingTheories = accountingTheories.filter(t => t.name !== questionData.correctTheory.name);
    
    while (explanationOptions.length < 4 && remainingTheories.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingTheories.length);
        const randomExplanation = remainingTheories[randomIndex].explanation;
        if (!explanationOptions.includes(randomExplanation)) {
            explanationOptions.push(randomExplanation);
        }
        remainingTheories.splice(randomIndex, 1);
    }
    explanationOptions.sort(() => Math.random() - 0.5);
    
    // Create theory name buttons with Clash Royale inspired visuals
    elements.theoryNamesGrid.innerHTML = '';
    nameOptions.forEach(option => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        const optionImages = getRandomClashImages();
        button.innerHTML = `${optionImages[0]} ${option}`;
        button.addEventListener('click', () => selectTheoryName(option));
        elements.theoryNamesGrid.appendChild(button);
    });
    
    // Create explanation buttons with Clash Royale inspired visuals
    elements.explanationsGrid.innerHTML = '';
    explanationOptions.forEach(option => {
        const button = document.createElement('div');
        button.className = 'answer-option';
        const optionImages = getRandomClashImages();
        button.innerHTML = `${optionImages[0]} ${option}`;
        button.addEventListener('click', () => selectExplanation(option));
        elements.explanationsGrid.appendChild(button);
    });
}

// Select answer for levels 1 and 2
function selectAnswer(answer) {
    if (gameState.isAnswered) return;
    
    gameState.selectedAnswer = answer;
    
    // Update visual selection
    document.querySelectorAll('#answersGrid .answer-option').forEach(option => {
        option.classList.remove('selected');
        // Check if the text content (without emojis) matches the answer
        if (option.textContent.replace(/[^\w\s]/gi, '').trim() === answer.replace(/[^\w\s]/gi, '').trim()) {
            option.classList.add('selected');
        }
    });
    
    updateSubmitButton();
}

// Select theory name for level 3
function selectTheoryName(name) {
    if (gameState.isAnswered) return;
    
    gameState.selectedTheoryName = name;
    
    // Update visual selection
    document.querySelectorAll('#theoryNamesGrid .answer-option').forEach(option => {
        option.classList.remove('selected');
        // Check if the text content (without emojis) matches the name
        if (option.textContent.replace(/[^\w\s]/gi, '').trim() === name.replace(/[^\w\s]/gi, '').trim()) {
            option.classList.add('selected');
        }
    });
    
    updateSubmitButton();
}

// Select explanation for level 3
function selectExplanation(explanation) {
    if (gameState.isAnswered) return;
    
    gameState.selectedExplanation = explanation;
    
    // Update visual selection
    document.querySelectorAll('#explanationsGrid .answer-option').forEach(option => {
        option.classList.remove('selected');
        // Check if the text content (without emojis) matches the explanation
        if (option.textContent.replace(/[^\w\s]/gi, '').trim() === explanation.replace(/[^\w\s]/gi, '').trim()) {
            option.classList.add('selected');
        }
    });
    
    updateSubmitButton();
}

// Update submit button state
function updateSubmitButton() {
    if (gameState.currentLevel === 3) {
        elements.submitBtnL3.disabled = !gameState.selectedTheoryName || !gameState.selectedExplanation || gameState.isAnswered;
    } else {
        elements.submitBtn.disabled = !gameState.selectedAnswer || gameState.isAnswered;
    }
}

// Submit answer for levels 1 and 2
function submitAnswer() {
    if (gameState.isAnswered || !gameState.selectedAnswer) return;
    
    gameState.isAnswered = true;
    const currentQ = gameState.levelQuestions[gameState.currentQuestion];
    let isCorrect = false;
    let correctAnswer = '';
    
    if (gameState.currentLevel === 1) {
        isCorrect = gameState.selectedAnswer === currentQ.explanation;
        correctAnswer = currentQ.explanation;
    } else if (gameState.currentLevel === 2) {
        isCorrect = gameState.selectedAnswer === currentQ.name;
        correctAnswer = currentQ.name;
    }
    
    // Update visual feedback
    document.querySelectorAll('#answersGrid .answer-option').forEach(option => {
        const optionText = option.textContent.replace(/[^\w\s]/gi, '').trim();
        const correctText = correctAnswer.replace(/[^\w\s]/gi, '').trim();
        const selectedText = gameState.selectedAnswer.replace(/[^\w\s]/gi, '').trim();
        
        if (optionText === correctText) {
            option.classList.add('correct');
        } else if (optionText === selectedText && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        gameState.score += 10;
    }
    
    updateDisplay();
    showResult(isCorrect, currentQ);
}

// Submit answer for level 3
function submitAnswerLevel3() {
    if (gameState.isAnswered || !gameState.selectedTheoryName || !gameState.selectedExplanation) return;
    
    gameState.isAnswered = true;
    const currentQ = gameState.levelQuestions[gameState.currentQuestion];
    const isNameCorrect = gameState.selectedTheoryName === currentQ.correctTheory.name;
    const isExplanationCorrect = gameState.selectedExplanation === currentQ.correctTheory.explanation;
    const isCorrect = isNameCorrect && isExplanationCorrect;
    
    // Update visual feedback for theory names
    document.querySelectorAll('#theoryNamesGrid .answer-option').forEach(option => {
        const optionText = option.textContent.replace(/[^\w\s]/gi, '').trim();
        const correctText = currentQ.correctTheory.name.replace(/[^\w\s]/gi, '').trim();
        const selectedText = gameState.selectedTheoryName.replace(/[^\w\s]/gi, '').trim();
        
        if (optionText === correctText) {
            option.classList.add('correct');
        } else if (optionText === selectedText && !isNameCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Update visual feedback for explanations
    document.querySelectorAll('#explanationsGrid .answer-option').forEach(option => {
        const optionText = option.textContent.replace(/[^\w\s]/gi, '').trim();
        const correctText = currentQ.correctTheory.explanation.replace(/[^\w\s]/gi, '').trim();
        const selectedText = gameState.selectedExplanation.replace(/[^\w\s]/gi, '').trim();
        
        if (optionText === correctText) {
            option.classList.add('correct');
        } else if (optionText === selectedText && !isExplanationCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        gameState.score += 15;
    }
    
    updateDisplay();
    showResultLevel3(isCorrect, currentQ);
}

// Show result modal
function showResult(isCorrect, currentQ) {
    if (isCorrect) {
        elements.resultIcon.textContent = '🎉';
        elements.resultMessage.textContent = 'Excellent! Correct answer!';
        elements.correctAnswer.style.display = 'none';
    } else {
        elements.resultIcon.textContent = '❌';
        elements.resultMessage.textContent = 'Not quite right. Here\'s the correct answer:';
        
        let correctAnswerText = '';
        if (gameState.currentLevel === 1) {
            correctAnswerText = `<h4>Theory Name:</h4>${currentQ.name}<br><h4>Correct Explanation:</h4>${currentQ.explanation}`;
        } else if (gameState.currentLevel === 2) {
            correctAnswerText = `<h4>Explanation:</h4>${currentQ.explanation}<br><h4>Correct Theory Name:</h4>${currentQ.name}`;
        }
        
        elements.correctAnswer.innerHTML = correctAnswerText;
        elements.correctAnswer.style.display = 'block';
    }
    
    elements.resultModal.style.display = 'flex';
}

// Show result modal for level 3
function showResultLevel3(isCorrect, currentQ) {
    if (isCorrect) {
        elements.resultIcon.textContent = '🏆';
        elements.resultMessage.textContent = 'Outstanding! Perfect match!';
        elements.correctAnswer.style.display = 'none';
    } else {
        elements.resultIcon.textContent = '❌';
        elements.resultMessage.textContent = 'Not quite right. Here\'s the correct answer:';
        
        const correctAnswerText = `
            <h4>Application:</h4>${currentQ.application}<br>
            <h4>Correct Theory Name:</h4>${currentQ.correctTheory.name}<br>
            <h4>Correct Explanation:</h4>${currentQ.correctTheory.explanation}
        `;
        
        elements.correctAnswer.innerHTML = correctAnswerText;
        elements.correctAnswer.style.display = 'block';
    }
    
    elements.resultModal.style.display = 'flex';
}

// Next question
function nextQuestion() {
    elements.resultModal.style.display = 'none';
    gameState.currentQuestion++;
    
    const totalQuestions = gameState.currentLevel === 3 ? 18 : 12;
    
    if (gameState.currentQuestion >= totalQuestions) {
        showLevelComplete();
    } else {
        loadQuestion();
    }
}

// Show level completion
function showLevelComplete() {
    const totalQuestions = gameState.currentLevel === 3 ? 18 : 12;
    const percentage = Math.round((gameState.score / (totalQuestions * (gameState.currentLevel === 3 ? 15 : 10))) * 100);
    
    elements.completionMessage.textContent = `Arena ${gameState.currentLevel} Complete! Score: ${gameState.score} (${percentage}%)`;
    
    // Show next level button only for levels 1 and 2
    if (gameState.currentLevel < 3) {
        elements.nextLevelBtn.style.display = 'inline-block';
    } else {
        elements.nextLevelBtn.style.display = 'none';
    }
    
    elements.levelCompleteModal.style.display = 'flex';
}

// Go to next level
function goToNextLevel() {
    elements.levelCompleteModal.style.display = 'none';
    startLevel(gameState.currentLevel + 1);
}

// Back to menu
function backToMenu() {
    elements.levelCompleteModal.style.display = 'none';
    showScreen('levelSelection');
    updateDisplay();
}

// Restart current level
function restartLevel() {
    startLevel(gameState.currentLevel);
}

// Restart entire game
function restartGame() {
    gameState.reset();
    showScreen('levelSelection');
    updateDisplay();
}

// Update display
function updateDisplay() {
    elements.scoreValue.textContent = gameState.score;
    elements.currentLevel.textContent = gameState.currentLevel || '-';
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);