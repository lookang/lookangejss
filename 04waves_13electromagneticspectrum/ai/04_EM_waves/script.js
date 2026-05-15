// Define the applications with their correct EM wave categories
// Updated applications list as per user request
const applications = [
    {
        name: "Radio and TV communication",
        image: "image/Radio.png",
        description: "Used for transmitting radio and television signals",
        correctCategory: "radio"
    },
    {
        name: "Radio Telescope (astronomy)",
        image: "image/Radio_Telescope.png",
        description: "Used for observing distant objects in space",
        correctCategory: "radio"
    },
    {
        name: "RFID (passport)",
        image: "image/RFID.png",
        description: "Used for identification and tracking",
        correctCategory: "radio"
    },
    {
        name: "Microwave oven",
        image: "image/microwave_oven.png",
        description: "Used for heating food",
        correctCategory: "microwave"
    },
    {
        name: "Mobile phones (signals)",
        image: "image/Mobile_phone.png",
        description: "Used for wireless communication",
        correctCategory: "microwave"
    },
    {
        name: "Satellite TV",
        image: "image/Satellite_TV.png",
        description: "Used for broadcasting TV via satellites",
        correctCategory: "microwave"
    },
    {
        name: "Remote controller",
        image: "image/Remote_controller.png",
        description: "Used to control devices wirelessly",
        correctCategory: "infrared"
    },
    {
        name: "Intruder alarm",
        image: "image/Intruder_alarm.png",
        description: "Used for security systems",
        correctCategory: "infrared"
    },
    {
        name: "Thermal imaging",
        image: "image/Thermal_imaging.jpg",
        description: "Used to detect heat signatures",
        correctCategory: "infrared"
    },
    {
        name: "Photography",
        image: "image/Photography.png",
        description: "Used to capture images",
        correctCategory: "visible"
    },
    {
        name: "Optical fibre in medicine",
        image: "image/Optical_fibre_medical.png",
        description: "Used for medical imaging and procedures",
        correctCategory: "visible"
    },
    {
        name: "Optical fibre in telecommunication",
        image: "image/Optical_fibre_telecommunication.png",
        description: "Used for high-speed data transmission",
        correctCategory: "visible"
    },
    {
        name: "Sunbed",
        image: "image/Sunbed.jpg",
        description: "Used for artificial tanning",
        correctCategory: "ultraviolet"
    },
    {
        name: "Bank note authentication",
        image: "image/Money.png",
        description: "Used to verify currency",
        correctCategory: "ultraviolet"
    },
    {
        name: "Water disinfection",
        image: "image/Disinfect_water.png",
        description: "Used to kill bacteria in water",
        correctCategory: "ultraviolet"
    },
    {
        name: "Medical radiology",
        image: "image/X-rays.png",
        description: "Used to image bones and internal organs",
        correctCategory: "xray"
    },
    {
        name: "Security screening",
        image: "image/Security_screening.png",
        description: "Used at airports for baggage inspection",
        correctCategory: "xray"
    },
    {
        name: "Industrial defect detection",
        image: "image/Industrial_defect_detection.png",
        description: "Used to find flaws in materials",
        correctCategory: "xray"
    },
    {
        name: "Sterilisation of food",
        image: "image/Sterilisation_Food.png",
        description: "Used to kill bacteria in food",
        correctCategory: "gamma"
    },
    {
        name: "Cancer treatment",
        image: "image/Cancer_treatment.png",
        description: "Used in radiation therapy",
        correctCategory: "gamma"
    }
];

// Game state variables
let score = 0;
let currentApplicationIndex = -1;
let remainingApplications = [];
// Removed secondAttempt variable as it's no longer needed

// DOM elements
const applicationDisplay = document.getElementById('application-display');
const startNextBtn = document.getElementById('start-next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const feedbackArea = document.getElementById('feedback');
const emWaves = document.querySelectorAll('.em-wave');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// Initialize the game
function initGame() {
    // Reset game state
    score = 0;
    currentApplicationIndex = -1;
    // Removed secondAttempt reset as it's no longer needed
    scoreDisplay.textContent = score;
    feedbackArea.innerHTML = '';
    applicationDisplay.innerHTML = '';
    
    // Create a shuffled copy of applications
    remainingApplications = [...applications];
    shuffleArray(remainingApplications);
    
    // Set button text
    startNextBtn.textContent = 'Next'; // Changed from 'Start' to 'Next'
    
    // Automatically start the game when initialized
    showNextApplication();
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display the next application
function showNextApplication() {
    // Clear feedback
    feedbackArea.innerHTML = '';
    
    // Check if there are applications left
    if (remainingApplications.length === 0) {
        endGame();
        return;
    }
    
    // Get the next application
    const application = remainingApplications[0];
    
    // Display the application with labeled image
    applicationDisplay.innerHTML = `
        <img src="${application.image}" alt="${application.name}" title="${application.name}">
        <p><strong>${application.name}</strong></p>
        <p>${application.description}</p>
    `;
    
    // Make the application draggable
    applicationDisplay.setAttribute('draggable', 'true');
    
    // Button text is already set to "Next" in initGame
    
    // Removed secondAttempt reset as it's no longer needed
}

// End the game
function endGame() {
    applicationDisplay.innerHTML = `
        <h2>Game Over!</h2>
        <p>Your final score: ${score} out of 20</p>
        <p>Click "Restart" to play again.</p>
    `;
    applicationDisplay.setAttribute('draggable', 'false');
    // Keep the button text as "Next" even at game end
    feedbackArea.innerHTML = '';
}

// Check if the answer is correct
function checkAnswer(selectedCategory) {
    const correctCategory = remainingApplications[0].correctCategory;
    
    if (selectedCategory === correctCategory) {
        // Correct answer
        feedbackArea.innerHTML = '<span class="correct-answer">✓ Correct!</span>';
        correctSound.play();
        
        // Award points (now only 1 point per correct answer)
        score += 1;
        
        // Update score display
        scoreDisplay.textContent = score;
        
        // Remove the application from the remaining list
        remainingApplications.shift();
        
        // Make application non-draggable until next round
        applicationDisplay.setAttribute('draggable', 'false');
        
        return true;
    } else {
        // Incorrect answer
        feedbackArea.innerHTML = '<span class="incorrect-answer">✗ Incorrect!</span>';
        incorrectSound.play();
        
        // Immediately show correct answer and move to next question
        setTimeout(() => {
            feedbackArea.innerHTML = `<span class="correct-answer">The correct answer was: ${getWaveNameByType(correctCategory)}</span>`;
            remainingApplications.shift();
            applicationDisplay.setAttribute('draggable', 'false');
        }, 1000);
        
        return false;
    }
}

// Get wave name by type
function getWaveNameByType(type) {
    const waveMap = {
        'gamma': 'Gamma Ray',
        'xray': 'X-Ray',
        'ultraviolet': 'Ultraviolet',
        'visible': 'Visible Light',
        'infrared': 'Infrared',
        'microwave': 'Microwave',
        'radio': 'Radio Wave'
    };
    
    return waveMap[type] || type;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game
    initGame();
    
    // Start/Next button
    startNextBtn.addEventListener('click', () => {
        // Only show next application if the current one is not draggable
        if (applicationDisplay.getAttribute('draggable') === 'false') {
            showNextApplication();
        }
        // Removed the 'Start' text condition since button always shows 'Next' now
    });
    
    // Restart button
    restartBtn.addEventListener('click', () => {
        initGame(); // This will now automatically start the game
    });
    
    // Drag and drop functionality
    applicationDisplay.addEventListener('dragstart', (e) => {
        if (remainingApplications.length === 0) return;
        
        applicationDisplay.classList.add('dragging');
        e.dataTransfer.setData('text/plain', 'application');
    });
    
    applicationDisplay.addEventListener('dragend', () => {
        applicationDisplay.classList.remove('dragging');
    });
    
    // Handle dropping on EM wave categories
    emWaves.forEach(wave => {
        // Highlight effect on dragover
        wave.addEventListener('dragover', (e) => {
            e.preventDefault();
            wave.classList.add('highlight');
        });
        
        wave.addEventListener('dragleave', () => {
            wave.classList.remove('highlight');
        });
        
        wave.addEventListener('drop', (e) => {
            e.preventDefault();
            wave.classList.remove('highlight');
            
            // Get the selected category
            const selectedCategory = wave.getAttribute('data-type');
            
            // Check the answer
            checkAnswer(selectedCategory);
        });
    });
});