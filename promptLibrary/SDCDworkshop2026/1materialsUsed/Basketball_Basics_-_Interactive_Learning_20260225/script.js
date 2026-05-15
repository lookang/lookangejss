// ===================================
// BASKETBALL LEARNING INTERACTIVE
// Primary 3-4 Physical Education
// ===================================

// Global Variables
let canvas, ctx;
let currentQuestionIndex = 0;
let score = 0;
let totalAttempts = 0;
let analyticsData = [];
let isAnswered = false;

// Basketball animation variables
let ballX = 0;
let ballY = 0;
let animationFrame = null;
let currentAction = null;

// Quiz Questions Database
const quizQuestions = [
    {
        question: "How many players from each team are on the basketball court at one time?",
        options: ["3 players", "5 players", "7 players", "10 players"],
        correct: 1,
        explanation: "Each team has 5 players on the court during play."
    },
    {
        question: "What is dribbling in basketball?",
        options: [
            "Throwing the ball to a teammate",
            "Bouncing the ball while moving",
            "Shooting the ball into the hoop",
            "Holding the ball with both hands"
        ],
        correct: 1,
        explanation: "Dribbling is bouncing the ball continuously while moving around the court."
    },
    {
        question: "What happens if you take more than 2 steps without dribbling?",
        options: [
            "You score a point",
            "It's called traveling - a violation",
            "You get a free throw",
            "Nothing happens"
        ],
        correct: 1,
        explanation: "Taking more than 2 steps without dribbling is called traveling, which is a violation."
    },
    {
        question: "What is a pass in basketball?",
        options: [
            "Running with the ball",
            "Throwing the ball to a teammate",
            "Bouncing the ball",
            "Shooting at the hoop"
        ],
        correct: 1,
        explanation: "A pass is when you throw the ball to a teammate to help move it around the court."
    },
    {
        question: "How many points do you score for a regular basket inside the three-point line?",
        options: ["1 point", "2 points", "3 points", "4 points"],
        correct: 1,
        explanation: "A regular basket from inside the three-point line is worth 2 points."
    },
    {
        question: "What should you do when defending in basketball?",
        options: [
            "Push the other player",
            "Stand still and watch",
            "Stay between your opponent and the basket",
            "Hold the opponent's shirt"
        ],
        correct: 2,
        explanation: "Good defense means positioning yourself between your opponent and the basket without fouling."
    },
    {
        question: "What is the main objective of basketball?",
        options: [
            "To dribble the most",
            "To run the fastest",
            "To score more points than the other team",
            "To pass the ball the most times"
        ],
        correct: 2,
        explanation: "The main objective is to score more points than the opposing team by shooting the ball through the hoop."
    },
    {
        question: "What is a free throw?",
        options: [
            "A shot taken while running",
            "An unguarded shot from the free-throw line",
            "A pass to a teammate",
            "A shot from half court"
        ],
        correct: 1,
        explanation: "A free throw is an unguarded shot taken from the free-throw line, usually awarded after a foul."
    }
];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Detect if in iframe and adjust height
    detectIframe();
    
    // Initialize canvas
    initializeCanvas();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load first question
    loadQuestion();
    
    // Draw initial court
    drawBasketballCourt();
    
    // Show welcome tooltip
    showTooltip("Welcome! Learn basketball basics through interactive actions and quiz questions.", window.innerWidth / 2, 50);
    setTimeout(() => hideTooltip(), 3000);
});

// ===================================
// IFRAME DETECTION
// ===================================
function detectIframe() {
    try {
        if (window.self !== window.top) {
            document.body.classList.add('in-iframe');
        }
    } catch (e) {
        document.body.classList.add('in-iframe');
    }
}

// ===================================
// CANVAS INITIALIZATION
// ===================================
function initializeCanvas() {
    canvas = document.getElementById('basketballCourt');
    ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const courtSection = document.getElementById('courtSection');
    canvas.width = courtSection.clientWidth;
    canvas.height = courtSection.clientHeight;
    drawBasketballCourt();
}

// ===================================
// BASKETBALL COURT DRAWING
// ===================================
function drawBasketballCourt() {
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw court background
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(0, 0, width, height);
    
    // Draw court lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    
    // Outer boundary
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    // Center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.stroke();
    
    // Left hoop
    drawHoop(80, height / 2);
    
    // Right hoop
    drawHoop(width - 80, height / 2);
    
    // Draw player
    drawPlayer(width / 2, height / 2 + 50);
    
    // Draw ball if action is active
    if (currentAction) {
        drawBall(ballX, ballY);
    }
}

function drawHoop(x, y) {
    // Backboard
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 5, y - 30, 10, 60);
    
    // Hoop
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.stroke();
    
    // Net
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const startX = x + Math.cos(angle) * 15;
        const startY = y + Math.sin(angle) * 15;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y + 25);
        ctx.stroke();
    }
}

function drawPlayer(x, y) {
    // Head
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(x, y - 20, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Body
    ctx.fillStyle = '#667eea';
    ctx.fillRect(x - 15, y - 8, 30, 35);
    
    // Arms
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(x - 25, y - 5, 10, 20);
    ctx.fillRect(x + 15, y - 5, 10, 20);
    
    // Legs
    ctx.fillStyle = '#667eea';
    ctx.fillRect(x - 12, y + 27, 10, 25);
    ctx.fillRect(x + 2, y + 27, 10, 25);
    
    // Shoes
    ctx.fillStyle = '#333333';
    ctx.fillRect(x - 12, y + 50, 10, 5);
    ctx.fillRect(x + 2, y + 50, 10, 5);
}

function drawBall(x, y) {
    // Basketball
    ctx.fillStyle = '#ff8c42';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Ball lines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x - 12, y);
    ctx.lineTo(x + 12, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y - 12);
    ctx.lineTo(x, y + 12);
    ctx.stroke();
}

// ===================================
// EVENT LISTENERS SETUP
// ===================================
function setupEventListeners() {
    // Action buttons
    document.getElementById('dribbleBtn').addEventListener('click', () => performAction('dribble'));
    document.getElementById('passBtn').addEventListener('click', () => performAction('pass'));
    document.getElementById('shootBtn').addEventListener('click', () => performAction('shoot'));
    
    // Touch support for action buttons
    ['dribbleBtn', 'passBtn', 'shootBtn'].forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.click();
        });
    });
    
    // Quiz controls
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    document.getElementById('resetQuizBtn').addEventListener('click', resetQuiz);
    
    // Analytics controls
    document.getElementById('toggleAnalytics').addEventListener('click', toggleAnalytics);
    document.getElementById('clearAnalytics').addEventListener('click', clearAnalytics);
    
    // Tooltip on action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const tooltips = {
                'dribbleBtn': 'Dribbling: Bounce the ball while moving. This is how you move with the ball!',
                'passBtn': 'Passing: Throw the ball to your teammate. Teamwork is important!',
                'shootBtn': 'Shooting: Throw the ball towards the hoop to score points!'
            };
            showTooltip(tooltips[btn.id], e.clientX, e.clientY - 40);
        });
        
        btn.addEventListener('mouseleave', hideTooltip);
    });
}

// ===================================
// BASKETBALL ACTIONS
// ===================================
function performAction(action) {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    
    currentAction = action;
    const width = canvas.width;
    const height = canvas.height;
    
    switch(action) {
        case 'dribble':
            animateDribble(width / 2, height / 2 + 70);
            break;
        case 'pass':
            animatePass(width / 2, height / 2 + 70, width - 100, height / 2);
            break;
        case 'shoot':
            animateShoot(width / 2, height / 2 + 70, width - 80, height / 2);
            break;
    }
}

function animateDribble(startX, startY) {
    let bounceCount = 0;
    let bounceHeight = 0;
    let direction = 1;
    
    function animate() {
        if (bounceCount >= 6) {
            currentAction = null;
            drawBasketballCourt();
            return;
        }
        
        bounceHeight += direction * 3;
        
        if (bounceHeight >= 40) {
            direction = -1;
        } else if (bounceHeight <= 0) {
            direction = 1;
            bounceCount++;
        }
        
        ballX = startX;
        ballY = startY - bounceHeight;
        
        drawBasketballCourt();
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
}

function animatePass(startX, startY, targetX, targetY) {
    let progress = 0;
    const duration = 60;
    
    function animate() {
        progress++;
        
        if (progress >= duration) {
            currentAction = null;
            drawBasketballCourt();
            return;
        }
        
        const t = progress / duration;
        ballX = startX + (targetX - startX) * t;
        ballY = startY + (targetY - startY) * t - Math.sin(t * Math.PI) * 50;
        
        drawBasketballCourt();
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
}

function animateShoot(startX, startY, targetX, targetY) {
    let progress = 0;
    const duration = 80;
    
    function animate() {
        progress++;
        
        if (progress >= duration) {
            currentAction = null;
            drawBasketballCourt();
            
            // Show success message
            if (Math.random() > 0.3) {
                showTooltip("🎉 Great shot! 2 points!", canvas.width / 2, 50);
            } else {
                showTooltip("Almost! Keep practicing your shooting!", canvas.width / 2, 50);
            }
            setTimeout(hideTooltip, 2000);
            return;
        }
        
        const t = progress / duration;
        const arc = Math.sin(t * Math.PI) * 100;
        
        ballX = startX + (targetX - startX) * t;
        ballY = startY - arc - (t * 50);
        
        drawBasketballCourt();
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// QUIZ FUNCTIONALITY
// ===================================
function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showCompletionMessage();
        return;
    }
    
    isAnswered = false;
    const question = quizQuestions[currentQuestionIndex];
    
    // Display question
    document.getElementById('questionText').textContent = 
        `Q${currentQuestionIndex + 1}: ${question.question}`;
    
    // Create option buttons
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(index));
        
        // Touch support
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!isAnswered) {
                checkAnswer(index);
            }
        });
        
        optionsContainer.appendChild(btn);
    });
    
    // Update score display
    updateScoreDisplay();
}

function checkAnswer(selectedIndex) {
    if (isAnswered) return;
    
    isAnswered = true;
    totalAttempts++;
    
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        score++;
    }
    
    // Visual feedback on buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Log to analytics
    logAnswer(question, selectedIndex, isCorrect);
    
    // Update score
    updateScoreDisplay();
    
    // Show explanation tooltip
    setTimeout(() => {
        showTooltip(question.explanation, canvas.width / 2, canvas.height / 2);
        setTimeout(hideTooltip, 3000);
    }, 500);
}

function nextQuestion() {
    if (!isAnswered && currentQuestionIndex < quizQuestions.length) {
        showTooltip("Please answer the current question first!", canvas.width / 2, canvas.height / 2);
        setTimeout(hideTooltip, 2000);
        return;
    }
    
    currentQuestionIndex++;
    loadQuestion();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalAttempts = 0;
    isAnswered = false;
    loadQuestion();
    
    showTooltip("Quiz reset! Start fresh and test your knowledge!", canvas.width / 2, canvas.height / 2);
    setTimeout(hideTooltip, 2000);
}

function updateScoreDisplay() {
    document.getElementById('scoreText').textContent = 
        `Score: ${score}/${totalAttempts}`;
}

function showCompletionMessage() {
    const percentage = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
    
    document.getElementById('questionText').innerHTML = 
        `<strong>🎉 Quiz Complete!</strong><br>
        You scored ${score} out of ${totalAttempts} (${percentage}%)`;
    
    document.getElementById('optionsContainer').innerHTML = 
        `<p style="text-align: center; color: #667eea; font-weight: 600;">
        ${percentage >= 80 ? 'Excellent work! You know your basketball!' : 
          percentage >= 60 ? 'Good job! Keep learning!' : 
          'Keep practicing! Review the concepts and try again!'}
        </p>`;
}

// ===================================
// ANALYTICS FUNCTIONALITY
// ===================================
function logAnswer(question, selectedIndex, isCorrect) {
    const logEntry = {
        questionNumber: currentQuestionIndex + 1,
        question: question.question,
        correctAnswer: question.options[question.correct],
        studentAnswer: question.options[selectedIndex],
        isCorrect: isCorrect,
        timestamp: new Date().toLocaleTimeString()
    };
    
    analyticsData.push(logEntry);
    displayAnalytics();
}

function displayAnalytics() {
    const logContainer = document.getElementById('analyticsLog');
    logContainer.innerHTML = '';
    
    analyticsData.forEach((entry, index) => {
        const logDiv = document.createElement('div');
        logDiv.className = `log-entry ${entry.isCorrect ? 'correct' : 'incorrect'}`;
        
        logDiv.innerHTML = `
            <div class="log-entry-header">
                ${entry.isCorrect ? '✅' : '❌'} Q${entry.questionNumber} - ${entry.timestamp}
            </div>
            <div class="log-entry-detail">
                <strong>Question:</strong> ${entry.question}
            </div>
            <div class="log-entry-detail">
                <strong>Correct Answer:</strong> ${entry.correctAnswer}
            </div>
            <div class="log-entry-detail">
                <strong>Student Answer:</strong> ${entry.studentAnswer}
            </div>
        `;
        
        logContainer.appendChild(logDiv);
    });
    
    // Scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
}

function toggleAnalytics() {
    const panel = document.getElementById('analyticsPanel');
    const btn = document.getElementById('toggleAnalytics');
    
    panel.classList.toggle('collapsed');
    btn.textContent = panel.classList.contains('collapsed') ? 'Show' : 'Hide';
}

function clearAnalytics() {
    analyticsData = [];
    document.getElementById('analyticsLog').innerHTML = 
        '<p style="text-align: center; opacity: 0.6;">No data yet. Answer questions to see analytics.</p>';
}

// ===================================
// TOOLTIP FUNCTIONALITY
// ===================================
function showTooltip(text, x, y) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.classList.add('visible');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('visible');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Prevent default touch behaviors for better mobile experience
document.addEventListener('touchmove', function(e) {
    if (e.target.tagName !== 'DIV' || !e.target.id.includes('analytics')) {
        // Allow scrolling only in analytics panel
    }
}, { passive: false });

// Handle visibility change to pause animations
document.addEventListener('visibilitychange', function() {
    if (document.hidden && animationFrame) {
        cancelAnimationFrame(animationFrame);
        currentAction = null;
        drawBasketballCourt();
    }
});