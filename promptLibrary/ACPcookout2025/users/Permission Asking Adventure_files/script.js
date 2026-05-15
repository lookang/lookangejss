// Permission Asking Adventure Game
// Educational game for Primary 1 students to learn social-emotional skills

// Game state management
let gameState = {
    currentStep: 0,
    currentScenario: 0,
    score: 0,
    totalSteps: 5,
    isGameActive: false
};

// Learning steps for asking permission
const permissionSteps = [
    {
        step: 1,
        title: "Decide who to ask",
        description: "Choose the right person to ask for permission",
        instruction: "Who should you ask permission from to borrow a book from the classroom library?"
    },
    {
        step: 2,
        title: "Get attention appropriately",
        description: "Get the person's attention in a polite way",
        instruction: "How should you get your teacher's attention?"
    },
    {
        step: 3,
        title: "Address the person",
        description: "Address the person respectfully",
        instruction: "How should you start talking to your teacher?"
    },
    {
        step: 4,
        title: "Ask politely",
        description: "Ask for permission using polite words",
        instruction: "What's the best way to ask for permission?"
    },
    {
        step: 5,
        title: "Wait for permission",
        description: "Wait patiently for the person's response",
        instruction: "What should you do after asking for permission?"
    }
];

// Scenarios with different contexts
const scenarios = [
    {
        context: "classroom",
        situation: "borrowing a book from the classroom library",
        characters: ["teacher", "student"],
        correctChoices: [
            "teacher", // Step 1: who to ask
            "raise hand quietly", // Step 2: get attention
            "Excuse me, Teacher", // Step 3: address
            "May I please borrow this book?", // Step 4: ask politely
            "wait quietly" // Step 5: wait for response
        ]
    },
    {
        context: "home",
        situation: "using the computer to play games",
        characters: ["parent", "student"],
        correctChoices: [
            "parent",
            "walk up to them calmly",
            "Hi Mom/Dad",
            "Can I please use the computer?",
            "wait for their answer"
        ]
    }
];

// Decision options for each step
const decisionOptions = [
    // Step 1: Who to ask
    [
        { text: "👩‍🏫 Ask the Teacher", correct: true, feedback: "Great choice! Teachers are responsible for classroom materials." },
        { text: "🧒 Ask a Friend", correct: false, feedback: "Friends can't give permission for classroom items. Ask the teacher instead!" },
        { text: "🤷 Take it without asking", correct: false, feedback: "Oh no! We must always ask permission first. This could get you in trouble." }
    ],
    // Step 2: Get attention
    [
        { text: "🙋 Raise hand quietly", correct: true, feedback: "Perfect! This is a respectful way to get teacher's attention." },
        { text: "📢 Shout across the room", correct: false, feedback: "Too loud! This disturbs others. Try raising your hand instead." },
        { text: "👋 Wave frantically", correct: false, feedback: "This might be distracting. A quiet raised hand works better." }
    ],
    // Step 3: Address the person
    [
        { text: "💬 'Excuse me, Teacher'", correct: true, feedback: "Excellent! This is polite and respectful." },
        { text: "😐 Say nothing, just stare", correct: false, feedback: "The teacher won't know what you want. Use words to be polite!" },
        { text: "😤 'Hey you!'", correct: false, feedback: "This sounds rude. Try 'Excuse me, Teacher' instead." }
    ],
    // Step 4: Ask politely
    [
        { text: "🙏 'May I please borrow this book?'", correct: true, feedback: "Wonderful! Using 'please' shows good manners." },
        { text: "😠 'I want this book now!'", correct: false, feedback: "This sounds demanding. Try asking nicely with 'please'." },
        { text: "😕 'Can I have it?'", correct: false, feedback: "Close, but add 'please' to be more polite!" }
    ],
    // Step 5: Wait for response
    [
        { text: "⏳ Wait quietly for an answer", correct: true, feedback: "Perfect! Patience shows respect and good manners." },
        { text: "😫 Keep asking repeatedly", correct: false, feedback: "This is annoying! Wait patiently for the answer." },
        { text: "😤 Get angry if they say no", correct: false, feedback: "Getting angry is not okay. Accept the answer respectfully." }
    ]
];

// Initialize the game
function initGame() {
    console.log("Initializing Permission Asking Adventure Game");
    updateProgressBar();
    setupEventListeners();
    showTooltip();
}

// Start the game
function startGame() {
    console.log("Starting game");
    gameState.isGameActive = true;
    gameState.currentStep = 0;
    gameState.score = 0;
    
    // Hide start button and show first step
    document.getElementById('startBtn').style.display = 'none';
    showCurrentStep();
    updateProgressBar();
}

// Display current step
function showCurrentStep() {
    const step = permissionSteps[gameState.currentStep];
    const options = decisionOptions[gameState.currentStep];
    
    console.log(`Showing step ${gameState.currentStep + 1}: ${step.title}`);
    
    // Update dialogue
    const dialogueText = document.getElementById('dialogueText');
    dialogueText.innerHTML = `<strong>Step ${step.step}:</strong> ${step.instruction}`;
    
    // Show relevant characters
    showRelevantCharacters();
    
    // Create decision buttons
    createDecisionButtons(options);
    
    // Update step indicator
    document.getElementById('stepIndicator').textContent = `Step ${gameState.currentStep + 1} of ${gameState.totalSteps}`;
}

// Show characters relevant to current scenario
function showRelevantCharacters() {
    const allCharacters = document.querySelectorAll('.character');
    allCharacters.forEach(char => {
        char.classList.add('hidden');
    });
    
    // Always show student
    document.getElementById('student').classList.remove('hidden');
    
    // Show teacher for classroom scenarios
    if (gameState.currentStep === 0 || gameState.currentStep === 1 || gameState.currentStep === 2) {
        document.getElementById('teacher').classList.remove('hidden');
    }
}

// Create decision buttons for current step
function createDecisionButtons(options) {
    const container = document.getElementById('decisionContainer');
    container.innerHTML = '';
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'decision-btn';
        button.textContent = option.text;
        button.onclick = () => handleDecision(option, index);
        
        // Add hover tooltip for additional context
        button.title = `Click to choose: ${option.text}`;
        
        container.appendChild(button);
    });
}

// Handle player decision
function handleDecision(option, buttonIndex) {
    console.log(`Player chose: ${option.text}, Correct: ${option.correct}`);
    
    // Disable all buttons to prevent multiple clicks
    const buttons = document.querySelectorAll('.decision-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    // Visual feedback on selected button
    buttons[buttonIndex].style.transform = 'scale(0.95)';
    
    if (option.correct) {
        // Correct choice
        buttons[buttonIndex].style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        gameState.score++;
        showFeedback(option.feedback, true);
        
        // Celebrate correct choice
        setTimeout(() => {
            if (gameState.currentStep === gameState.totalSteps - 1) {
                // Game complete
                showGameCompletion();
            } else {
                // Next step
                gameState.currentStep++;
                showCurrentStep();
                updateProgressBar();
            }
        }, 2000);
    } else {
        // Wrong choice
        buttons[buttonIndex].style.background = 'linear-gradient(135deg, #f44336, #ef5350)';
        showFeedback(option.feedback, false);
        
        // Allow retry after showing consequence
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.transform = 'scale(1)';
                btn.style.background = '';
            });
        }, 3000);
    }
}

// Show feedback for player choice
function showFeedback(message, isPositive) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    
    // Set feedback content
    feedbackText.textContent = message;
    
    if (isPositive) {
        feedbackIcon.textContent = '😊';
        feedbackBox.classList.remove('negative');
    } else {
        feedbackIcon.textContent = '😔';
        feedbackBox.classList.add('negative');
    }
    
    // Show feedback
    feedbackContainer.classList.remove('hidden');
    feedbackContainer.classList.add('fade-in');
    
    // Hide feedback after delay
    setTimeout(() => {
        feedbackContainer.classList.add('hidden');
        feedbackContainer.classList.remove('fade-in');
    }, isPositive ? 2000 : 3000);
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (gameState.currentStep / gameState.totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
    
    console.log(`Progress updated: ${percentage}%`);
}

// Show game completion celebration
function showGameCompletion() {
    const overlay = document.getElementById('celebrationOverlay');
    const message = document.getElementById('celebrationMessage');
    
    let celebrationText = '';
    if (gameState.score === gameState.totalSteps) {
        celebrationText = "Amazing! You learned all 5 steps perfectly! You're now a permission-asking expert! 🌟";
    } else if (gameState.score >= 3) {
        celebrationText = "Great job! You learned most of the steps. Keep practicing to become even better! 👍";
    } else {
        celebrationText = "Good try! Remember the 5 steps and practice asking for permission politely. You'll get better! 💪";
    }
    
    message.textContent = celebrationText;
    overlay.classList.remove('hidden');
    
    console.log(`Game completed with score: ${gameState.score}/${gameState.totalSteps}`);
}

// Continue to next level or restart
function nextLevel() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.add('hidden');
    
    // Reset game for replay
    gameState.currentStep = 0;
    gameState.score = 0;
    gameState.isGameActive = false;
    
    // Reset UI
    const container = document.getElementById('decisionContainer');
    container.innerHTML = '<button class="decision-btn start-btn" id="startBtn" onclick="startGame()">🎮 PLAY AGAIN</button>';
    
    document.getElementById('dialogueText').textContent = "Great learning! Ready to practice asking for permission again?";
    updateProgressBar();
    
    // Hide all characters except student
    document.querySelectorAll('.character').forEach(char => {
        if (char.id !== 'student') {
            char.classList.add('hidden');
        }
    });
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Character hover effects with tooltips
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('mouseenter', (e) => {
            if (!gameState.isGameActive) return;
            
            const tooltip = document.getElementById('tooltip');
            const characterName = e.target.querySelector('.character-name').textContent;
            
            let tooltipText = '';
            switch(characterName) {
                case 'Teacher':
                    tooltipText = 'Teachers can give permission for classroom activities and materials';
                    break;
                case 'Parent':
                    tooltipText = 'Parents can give permission for home activities and family rules';
                    break;
                case 'You':
                    tooltipText = 'This is you! Remember to be polite when asking for permission';
                    break;
            }
            
            showTooltipAt(e.pageX, e.pageY - 40, tooltipText);
        });
        
        character.addEventListener('mouseleave', hideTooltip);
    });
    
    // Touch support for mobile devices
    document.addEventListener('touchstart', function(e) {
        // Prevent zoom on double tap for better mobile experience
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Show tooltip at specific position
function showTooltipAt(x, y, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.classList.remove('hidden');
}

// Hide tooltip
function hideTooltip() {
    document.getElementById('tooltip').classList.add('hidden');
}

// Show initial tooltip for game instructions
function showTooltip() {
    // Show game instructions in dialogue
    const dialogueText = document.getElementById('dialogueText');
    dialogueText.innerHTML = `
        <strong>🎯 Learning Goal:</strong> Master the 5 steps to ask for permission politely!<br>
        <small>💡 Tip: Hover over characters to learn more about them</small>
    `;
}

// Handle window resize for responsive design
function handleResize() {
    // Adjust game container height based on viewport
    const container = document.querySelector('.game-container');
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
        container.style.height = '450px';
    } else {
        container.style.height = '90vh';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing game");
    initGame();
    handleResize();
});

// Handle window resize events
window.addEventListener('resize', handleResize);

// Prevent context menu on long press for better mobile experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add keyboard support for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const startBtn = document.getElementById('startBtn');
        if (startBtn && startBtn.style.display !== 'none') {
            startGame();
        }
    }
});

console.log("Permission Asking Adventure Game loaded successfully!");