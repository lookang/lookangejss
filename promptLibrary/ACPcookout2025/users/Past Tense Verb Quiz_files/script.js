// Quiz data with sentences and verb choices
const quizData = [
    {
        sentence: "Yesterday, she walked to the store.",
        choices: ["walk", "walked", "walking"],
        correct: 1,
        hint: "Past tense verbs tell us about actions that already happened."
    },
    {
        sentence: "The cat jumped on the table.",
        choices: ["jump", "jumped", "jumping"],
        correct: 1,
        hint: "Look for the verb that shows the action is finished."
    },
    {
        sentence: "He played soccer after school.",
        choices: ["play", "played", "playing"],
        correct: 1,
        hint: "The action happened in the past, so we need past tense."
    },
    {
        sentence: "They cooked dinner together.",
        choices: ["cook", "cooked", "cooking"],
        correct: 1,
        hint: "Past tense verbs often end with -ed."
    },
    {
        sentence: "She brushed her teeth before bed.",
        choices: ["brush", "brushed", "brushing"],
        correct: 1,
        hint: "Think about when the action happened - before bed means it's done."
    },
    {
        sentence: "The dog barked at the mailman.",
        choices: ["bark", "barked", "barking"],
        correct: 1,
        hint: "The action is complete, so we use past tense."
    },
    {
        sentence: "We watched a movie last night.",
        choices: ["watch", "watched", "watching"],
        correct: 1,
        hint: "Last night tells us this happened in the past."
    },
    {
        sentence: "He cleaned his room yesterday.",
        choices: ["clean", "cleaned", "cleaning"],
        correct: 1,
        hint: "Yesterday is a clue that we need past tense."
    }
];

// Game state variables
let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

// DOM elements
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const playAudioBtn = document.getElementById('playAudioBtn');
const replayBtn = document.getElementById('replayBtn');
const choicesSection = document.getElementById('choicesSection');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackMessage = document.getElementById('feedbackMessage');
const hintMessage = document.getElementById('hintMessage');
const actionButtons = document.getElementById('actionButtons');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const nextBtn = document.getElementById('nextBtn');
const scoreSection = document.getElementById('scoreSection');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const restartBtn = document.getElementById('restartBtn');
const audioPlayer = document.getElementById('audioPlayer');

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    playAudioBtn.addEventListener('click', playCurrentSentence);
    replayBtn.addEventListener('click', playCurrentSentence);
    tryAgainBtn.addEventListener('click', resetCurrentQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    // Audio player event listeners
    audioPlayer.addEventListener('loadstart', function() {
        playAudioBtn.classList.add('playing');
    });
    
    audioPlayer.addEventListener('ended', function() {
        playAudioBtn.classList.remove('playing');
    });
    
    audioPlayer.addEventListener('error', function() {
        playAudioBtn.classList.remove('playing');
        console.log('Audio playback failed, using fallback');
    });
}

// Initialize the quiz
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    hasAnswered = false;
    scoreSection.style.display = 'none';
    loadQuestion();
}

// Load current question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showFinalScore();
        return;
    }
    
    const question = quizData[currentQuestion];
    hasAnswered = false;
    
    // Update progress
    updateProgress();
    
    // Clear previous feedback
    clearFeedback();
    
    // Generate choices
    generateChoices(question.choices, question.correct);
    
    // Hide action buttons
    hideActionButtons();
    
    // Generate audio for the sentence (using Web Speech API as fallback)
    generateAudio(question.sentence);
}

// Update progress bar and text
function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

// Generate choice buttons
function generateChoices(choices, correctIndex) {
    choicesSection.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.addEventListener('click', () => handleAnswer(index, correctIndex));
        choicesSection.appendChild(button);
    });
}

// Handle answer selection
function handleAnswer(selectedIndex, correctIndex) {
    if (hasAnswered) return;
    
    hasAnswered = true;
    const buttons = document.querySelectorAll('.choice-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    if (selectedIndex === correctIndex) {
        // Correct answer
        buttons[selectedIndex].classList.add('correct');
        showFeedback(true);
        score++;
        
        // Show next button after delay
        setTimeout(() => {
            showNextButton();
        }, 1500);
    } else {
        // Incorrect answer
        buttons[selectedIndex].classList.add('incorrect');
        buttons[correctIndex].classList.add('correct');
        showFeedback(false);
        
        // Show try again button after delay
        setTimeout(() => {
            showTryAgainButton();
        }, 1500);
    }
}

// Show feedback message
function showFeedback(isCorrect) {
    const question = quizData[currentQuestion];
    
    if (isCorrect) {
        feedbackMessage.textContent = "Excellent! That's correct!";
        feedbackMessage.className = 'feedback-message correct';
        hintMessage.textContent = "Great job identifying the past tense verb!";
    } else {
        feedbackMessage.textContent = "Not quite right. Try again!";
        feedbackMessage.className = 'feedback-message incorrect';
        hintMessage.textContent = question.hint;
    }
}

// Clear feedback
function clearFeedback() {
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback-message';
    hintMessage.textContent = '';
}

// Show action buttons
function showTryAgainButton() {
    tryAgainBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
}

function showNextButton() {
    tryAgainBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

function hideActionButtons() {
    tryAgainBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}

// Reset current question for retry
function resetCurrentQuestion() {
    hasAnswered = false;
    clearFeedback();
    hideActionButtons();
    
    // Reset choice buttons
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        btn.classList.remove('disabled', 'correct', 'incorrect');
    });
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

// Show final score
function showFinalScore() {
    const percentage = Math.round((score / quizData.length) * 100);
    finalScore.textContent = `${score}/${quizData.length}`;
    
    let message = '';
    if (percentage >= 90) {
        message = "Outstanding! You're a past tense expert! 🌟";
    } else if (percentage >= 70) {
        message = "Great job! You understand past tense verbs well! 👏";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing past tense verbs! 💪";
    } else {
        message = "Keep trying! Practice makes perfect! 📚";
    }
    
    scoreMessage.textContent = message;
    scoreSection.style.display = 'flex';
}

// Restart the quiz
function restartQuiz() {
    initializeQuiz();
}

// Generate and play audio for the sentence
function generateAudio(text) {
    // Try to use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
        // Clear any existing speech
        speechSynthesis.cancel();
        
        playAudioBtn.onclick = function() {
            playTextToSpeech(text);
        };
        
        replayBtn.onclick = function() {
            playTextToSpeech(text);
        };
    } else {
        // Fallback: show text briefly when audio button is clicked
        playAudioBtn.onclick = function() {
            showTextFallback(text);
        };
        
        replayBtn.onclick = function() {
            showTextFallback(text);
        };
    }
}

// Play text using Web Speech API
function playTextToSpeech(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slightly slower for better comprehension
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Visual feedback
        playAudioBtn.classList.add('playing');
        
        utterance.onend = function() {
            playAudioBtn.classList.remove('playing');
        };
        
        utterance.onerror = function() {
            playAudioBtn.classList.remove('playing');
            showTextFallback(text);
        };
        
        speechSynthesis.speak(utterance);
    } else {
        showTextFallback(text);
    }
}

// Fallback method to show text when speech is not available
function showTextFallback(text) {
    playAudioBtn.classList.add('playing');
    
    // Create temporary text display
    const textDisplay = document.createElement('div');
    textDisplay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        z-index: 1000;
        max-width: 80%;
        text-align: center;
    `;
    textDisplay.textContent = text;
    document.body.appendChild(textDisplay);
    
    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(textDisplay);
        playAudioBtn.classList.remove('playing');
    }, 3000);
}

// Play current sentence audio
function playCurrentSentence() {
    if (currentQuestion < quizData.length) {
        const sentence = quizData[currentQuestion].sentence;
        playTextToSpeech(sentence);
    }
}

// Detect if running in iframe and adjust styles accordingly
function detectIframeMode() {
    try {
        if (window.self !== window.top) {
            document.body.classList.add('iframe-mode');
        }
    } catch (e) {
        // If we can't access parent, assume we're in iframe
        document.body.classList.add('iframe-mode');
    }
}

// Call iframe detection on load
document.addEventListener('DOMContentLoaded', detectIframeMode);