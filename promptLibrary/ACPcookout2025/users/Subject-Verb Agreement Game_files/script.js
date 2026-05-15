// Game data and state management
const questions = [
    {
        sentence: "The plain prata and the egg prata [VERB] perfect when dipped in curry.",
        choices: ["taste", "tastes"],
        correct: 0,
        explanation: "When a subject consists of noun phrases joined by 'and', we use a plural verb.",
        nounPhrases: ["The plain prata", "the egg prata"],
        headNouns: ["prata", "prata"]
    },
    {
        sentence: "Those books and files [VERB] to me.",
        choices: ["belong", "belongs"],
        correct: 0,
        explanation: "When a subject consists of noun phrases joined by 'and', we use a plural verb.",
        nounPhrases: ["Those books", "files"],
        headNouns: ["books", "files"]
    },
    {
        sentence: "The cutting board and the knife [VERB] on the kitchen counter just now.",
        choices: ["were", "was"],
        correct: 0,
        explanation: "When a subject consists of noun phrases joined by 'and', we use a plural verb.",
        nounPhrases: ["The cutting board", "the knife"],
        headNouns: ["board", "knife"]
    },
    {
        sentence: "The potatoes and the carrots [VERB] been peeled and cut.",
        choices: ["have", "has"],
        correct: 0,
        explanation: "When a subject consists of noun phrases joined by 'and', we use a plural verb.",
        nounPhrases: ["The potatoes", "the carrots"],
        headNouns: ["potatoes", "carrots"]
    },
    {
        sentence: "The used cups and dirty dishes [VERB] still in the sink.",
        choices: ["are", "is"],
        correct: 0,
        explanation: "When a subject consists of noun phrases joined by 'and', we use a plural verb.",
        nounPhrases: ["The used cups", "dirty dishes"],
        headNouns: ["cups", "dishes"]
    }
];

// Game state variables
let currentQuestion = 0;
let wrongAttempts = 0;
let hintShown = false;
let questionAnswered = false;

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayQuestion();
    updateProgress();
});

// Display current question with proper formatting
function displayQuestion() {
    const question = questions[currentQuestion];
    const sentenceElement = document.getElementById('sentenceDisplay');
    const choice1Element = document.getElementById('choice1');
    const choice2Element = document.getElementById('choice2');
    const feedbackArea = document.getElementById('feedbackArea');
    const nextBtn = document.getElementById('nextBtn');
    const hintBtn = document.getElementById('hintBtn');
    
    // Reset state for new question
    wrongAttempts = 0;
    hintShown = false;
    questionAnswered = false;
    
    // Clear previous feedback and hide next button
    feedbackArea.innerHTML = '';
    feedbackArea.className = 'feedback-area';
    nextBtn.style.display = 'none';
    hintBtn.disabled = false;
    hintBtn.style.opacity = '1';
    
    // Display sentence with placeholder for verb
    sentenceElement.innerHTML = question.sentence.replace('[VERB]', '<span class="verb-placeholder">[choose verb]</span>');
    
    // Set up choice buttons
    choice1Element.textContent = question.choices[0];
    choice2Element.textContent = question.choices[1];
    choice1Element.className = 'verb-choice';
    choice2Element.className = 'verb-choice';
    choice1Element.disabled = false;
    choice2Element.disabled = false;
    
    // Add fade-in animation
    document.querySelector('.question-container').classList.add('fade-in');
    setTimeout(() => {
        document.querySelector('.question-container').classList.remove('fade-in');
    }, 500);
}

// Handle verb selection
function selectVerb(choiceIndex) {
    if (questionAnswered) return;
    
    const question = questions[currentQuestion];
    const choice1Element = document.getElementById('choice1');
    const choice2Element = document.getElementById('choice2');
    const selectedButton = choiceIndex === 0 ? choice1Element : choice2Element;
    const otherButton = choiceIndex === 0 ? choice2Element : choice1Element;
    
    // Clear previous selections
    choice1Element.classList.remove('selected', 'correct', 'incorrect');
    choice2Element.classList.remove('selected', 'correct', 'incorrect');
    
    // Mark selected button
    selectedButton.classList.add('selected');
    
    // Check if answer is correct
    if (choiceIndex === question.correct) {
        // Correct answer
        selectedButton.classList.add('correct');
        displayCorrectFeedback();
        questionAnswered = true;
        disableChoices();
        showNextButton();
        createCelebrationParticles();
    } else {
        // Wrong answer
        selectedButton.classList.add('incorrect');
        wrongAttempts++;
        
        if (wrongAttempts >= 2) {
            // Maximum attempts reached - show answer
            displayAnswerReveal();
            questionAnswered = true;
            disableChoices();
            showNextButton();
        } else {
            // Show hint and allow retry
            displayIncorrectFeedback();
            setTimeout(() => {
                clearChoices();
                if (!hintShown) {
                    showHint();
                }
            }, 2000);
        }
    }
}

// Display correct answer feedback
function displayCorrectFeedback() {
    const feedbackArea = document.getElementById('feedbackArea');
    const question = questions[currentQuestion];
    
    feedbackArea.className = 'feedback-area feedback-correct';
    feedbackArea.innerHTML = `
        <div>🎉 <strong>Terrific!</strong> 🎉</div>
        <div style="margin-top: 8px; font-size: 14px;">
            You correctly identified that compound subjects joined by 'and' need plural verbs!
        </div>
    `;
    
    // Update sentence with correct formatting
    updateSentenceFormatting(true);
}

// Display incorrect answer feedback
function displayIncorrectFeedback() {
    const feedbackArea = document.getElementById('feedbackArea');
    const question = questions[currentQuestion];
    
    feedbackArea.className = 'feedback-area feedback-incorrect';
    feedbackArea.innerHTML = `
        <div><strong>Not quite right.</strong></div>
        <div style="margin-top: 8px; font-size: 14px;">
            ${question.explanation}
        </div>
    `;
}

// Display answer reveal after maximum attempts
function displayAnswerReveal() {
    const feedbackArea = document.getElementById('feedbackArea');
    const question = questions[currentQuestion];
    const choice1Element = document.getElementById('choice1');
    const choice2Element = document.getElementById('choice2');
    
    // Highlight correct answer
    const correctButton = question.correct === 0 ? choice1Element : choice2Element;
    correctButton.classList.remove('incorrect');
    correctButton.classList.add('correct');
    
    feedbackArea.className = 'feedback-area feedback-incorrect';
    feedbackArea.innerHTML = `
        <div><strong>The correct answer is: "${question.choices[question.correct]}"</strong></div>
        <div style="margin-top: 8px; font-size: 14px;">
            ${question.explanation}
        </div>
    `;
    
    // Update sentence with correct formatting
    updateSentenceFormatting(true);
}

// Show hint
function showHint() {
    if (hintShown) return;
    
    const feedbackArea = document.getElementById('feedbackArea');
    const hintBtn = document.getElementById('hintBtn');
    
    feedbackArea.className = 'feedback-area feedback-hint';
    feedbackArea.innerHTML = `
        <div><strong>💡 Hint:</strong></div>
        <div style="margin-top: 8px; font-size: 14px;">
            Look for compound subjects joined by 'and'. When two or more things are joined by 'and', they become plural and need a plural verb.
        </div>
    `;
    
    hintShown = true;
    hintBtn.disabled = true;
    hintBtn.style.opacity = '0.5';
    
    // Emphasize the conjunction in the sentence
    emphasizeConjunction();
}

// Emphasize the conjunction 'and' in the sentence
function emphasizeConjunction() {
    const sentenceElement = document.getElementById('sentenceDisplay');
    const currentHTML = sentenceElement.innerHTML;
    const emphasizedHTML = currentHTML.replace(/ and /g, ' <span class="conjunction-emphasis">and</span> ');
    sentenceElement.innerHTML = emphasizedHTML;
}

// Update sentence formatting with color coding
function updateSentenceFormatting(showCorrect = false) {
    const question = questions[currentQuestion];
    const sentenceElement = document.getElementById('sentenceDisplay');
    let formattedSentence = question.sentence;
    
    // Replace noun phrases with colored versions
    question.nounPhrases.forEach((phrase, index) => {
        const headNoun = question.headNouns[index];
        const coloredPhrase = phrase.replace(headNoun, `<span class="head-noun">${headNoun}</span>`);
        const fullColoredPhrase = `<span class="noun-phrase">${coloredPhrase}</span>`;
        formattedSentence = formattedSentence.replace(phrase, fullColoredPhrase);
    });
    
    // Replace verb with colored version
    if (showCorrect) {
        const correctVerb = question.choices[question.correct];
        formattedSentence = formattedSentence.replace('[VERB]', `<span class="correct-verb">${correctVerb}</span>`);
    } else {
        formattedSentence = formattedSentence.replace('[VERB]', '<span class="verb-placeholder">[choose verb]</span>');
    }
    
    sentenceElement.innerHTML = formattedSentence;
}

// Clear choice selections
function clearChoices() {
    const choice1Element = document.getElementById('choice1');
    const choice2Element = document.getElementById('choice2');
    
    choice1Element.classList.remove('selected', 'correct', 'incorrect');
    choice2Element.classList.remove('selected', 'correct', 'incorrect');
    choice1Element.disabled = false;
    choice2Element.disabled = false;
}

// Disable choice buttons
function disableChoices() {
    const choice1Element = document.getElementById('choice1');
    const choice2Element = document.getElementById('choice2');
    
    choice1Element.disabled = true;
    choice2Element.disabled = true;
}

// Show next button
function showNextButton() {
    const nextBtn = document.getElementById('nextBtn');
    const hintBtn = document.getElementById('hintBtn');
    
    if (currentQuestion < questions.length - 1) {
        nextBtn.textContent = 'Next Question →';
    } else {
        nextBtn.textContent = 'Complete Game! 🎉';
    }
    
    nextBtn.style.display = 'block';
    hintBtn.disabled = true;
    hintBtn.style.opacity = '0.5';
}

// Move to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    } else {
        // Game completed
        showGameCompletion();
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Show game completion
function showGameCompletion() {
    const contentArea = document.querySelector('.content-area');
    
    contentArea.innerHTML = `
        <div class="completion-screen" style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #4CAF50; margin-bottom: 15px;">Congratulations!</h2>
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
                You've completed the Subject-Verb Agreement game!
            </p>
            <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
                You now understand how compound subjects joined by 'and' require plural verbs.
            </p>
            <button onclick="restartGame()" class="next-btn">
                Play Again 🔄
            </button>
        </div>
    `;
    
    createCelebrationParticles();
    
    // Update progress to 100%
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    progressFill.style.width = '100%';
    progressText.textContent = 'Completed!';
}

// Restart the game
function restartGame() {
    currentQuestion = 0;
    location.reload();
}

// Create celebration particles
function createCelebrationParticles() {
    const container = document.getElementById('particlesContainer');
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 3000);
        }, i * 100);
    }
}

// Handle responsive design adjustments
function handleResize() {
    const gameContainer = document.querySelector('.game-container');
    const isIframe = window.self !== window.top;
    
    if (isIframe) {
        gameContainer.style.height = '450px';
    } else if (window.innerHeight >= 600) {
        gameContainer.style.height = '90vh';
    }
}

// Add resize listener
window.addEventListener('resize', handleResize);

// Touch event handling for mobile devices
document.addEventListener('touchstart', function() {
    // Enable touch interactions
}, { passive: true });

// Prevent zoom on double tap for mobile
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;