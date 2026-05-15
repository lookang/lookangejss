// Main application class for Tropical Rainforest Interactive
class RainforestInteractive {
    constructor() {
        // Initialize application state
        this.currentLayer = null;
        this.soundEnabled = false;
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        
        // Layer data with educational content
        this.layerData = {
            emergent: {
                title: "Emergent Layer",
                height: "60-80 meters",
                characteristics: "Highest layer with tallest trees breaking through the canopy. Receives most sunlight and experiences strong winds.",
                adaptations: "Trees have broad, waxy leaves with drip tips to shed excess rainwater quickly. Strong, flexible trunks to withstand winds.",
                sunlight: "100% direct sunlight",
                humidity: "Lower humidity due to wind exposure",
                density: "Sparse - only the tallest trees"
            },
            canopy: {
                title: "Canopy Layer",
                height: "20-40 meters",
                characteristics: "Dense layer forming a roof over the forest. Most biodiversity occurs here. Warm and humid environment.",
                adaptations: "Broad leaves to capture filtered sunlight. Waxy surfaces and drip tips prevent water accumulation. Many epiphytes grow here.",
                sunlight: "Filtered sunlight (60-80%)",
                humidity: "High humidity (80-90%)",
                density: "Very dense - forms continuous canopy"
            },
            understory: {
                title: "Understory & Forest Floor",
                height: "0-20 meters",
                characteristics: "Dark, humid layer with little sunlight. Rich soil from decomposing matter. Many insects and small animals.",
                adaptations: "Large buttress roots for support in shallow soil. Large, thin leaves to capture limited light. Fast decomposition of organic matter.",
                sunlight: "Very little sunlight (2-5%)",
                humidity: "Very high humidity (90-95%)",
                density: "Sparse trees, dense ground vegetation"
            }
        };
        
        // Fun facts for educational engagement
        this.funFacts = [
            "Rainforests are evergreen — trees keep their leaves all year round!",
            "Over half of the world's plant species live in rainforests!",
            "A single rainforest tree can be home to over 1,000 species of insects!",
            "Rainforests produce 20% of the world's oxygen!",
            "The Amazon rainforest is larger than the entire United States!",
            "Some rainforest trees can live for over 1,000 years!",
            "Rainforests cover only 6% of Earth's surface but contain 50% of all species!",
            "The forest floor is so dark that less than 2% of sunlight reaches it!"
        ];
        
        // Quiz questions for assessment
        this.quizQuestions = [
            {
                question: "Which layer receives the most sunlight?",
                options: ["Understory", "Canopy", "Emergent", "Forest Floor"],
                correct: 2,
                explanation: "The Emergent Layer is the highest and receives 100% direct sunlight."
            },
            {
                question: "What adaptation helps trees shed excess rainwater?",
                options: ["Buttress roots", "Drip tips", "Thick bark", "Small leaves"],
                correct: 1,
                explanation: "Drip tips on leaves help water run off quickly, preventing damage from excess moisture."
            },
            {
                question: "Which layer has the highest humidity?",
                options: ["Emergent", "Canopy", "Understory", "All the same"],
                correct: 2,
                explanation: "The Understory has 90-95% humidity due to limited air circulation and trapped moisture."
            },
            {
                question: "What are buttress roots used for?",
                options: ["Collecting water", "Support in shallow soil", "Storing nutrients", "Climbing higher"],
                correct: 1,
                explanation: "Buttress roots provide extra support for tall trees in the shallow, nutrient-poor rainforest soil."
            }
        ];
        
        // Initialize the application
        this.init();
    }
    
    // Initialize all event listeners and setup
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        
        // Add keyboard accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Set up all interactive event listeners
    setupEventListeners() {
        // Layer interaction events
        const layers = document.querySelectorAll('.layer');
        layers.forEach(layer => {
            // Mouse events
            layer.addEventListener('click', (e) => this.handleLayerClick(e));
            layer.addEventListener('mouseenter', (e) => this.handleLayerHover(e));
            layer.addEventListener('mouseleave', (e) => this.handleLayerLeave(e));
            
            // Touch events for mobile
            layer.addEventListener('touchstart', (e) => this.handleLayerTouch(e));
        });
        
        // Control button events
        document.getElementById('funFactBtn').addEventListener('click', () => this.showFunFact());
        document.getElementById('quizBtn').addEventListener('click', () => this.startQuiz());
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
        
        // Modal close events
        document.getElementById('closeFunFact').addEventListener('click', () => this.closeFunFactModal());
        document.getElementById('closeQuiz').addEventListener('click', () => this.closeQuizModal());
        
        // Click outside modal to close
        window.addEventListener('click', (e) => this.handleModalClick(e));
        
        // Responsive tooltip positioning
        document.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
    }
    
    // Handle layer click interactions
    handleLayerClick(e) {
        const layerType = e.currentTarget.dataset.layer;
        this.selectLayer(layerType);
        this.announceForAccessibility(`Selected ${this.layerData[layerType].title}`);
    }
    
    // Handle layer hover for desktop
    handleLayerHover(e) {
        if (window.innerWidth > 768) { // Desktop only
            const layerType = e.currentTarget.dataset.layer;
            this.showTooltip(e, layerType);
            e.currentTarget.classList.add('pulse');
        }
    }
    
    // Handle layer leave
    handleLayerLeave(e) {
        this.hideTooltip();
        e.currentTarget.classList.remove('pulse');
    }
    
    // Handle touch events for mobile
    handleLayerTouch(e) {
        e.preventDefault(); // Prevent default touch behavior
        const layerType = e.currentTarget.dataset.layer;
        this.selectLayer(layerType);
    }
    
    // Select and display layer information
    selectLayer(layerType) {
        // Remove previous selection
        document.querySelectorAll('.layer').forEach(l => l.classList.remove('active'));
        
        // Add active class to selected layer
        const selectedLayer = document.querySelector(`[data-layer="${layerType}"]`);
        selectedLayer.classList.add('active');
        
        // Update information panel
        this.updateInfoPanel(layerType);
        this.currentLayer = layerType;
        
        // Play selection sound if enabled
        if (this.soundEnabled) {
            this.playSound('select');
        }
    }
    
    // Update the information panel with layer details
    updateInfoPanel(layerType) {
        const data = this.layerData[layerType];
        const titleElement = document.getElementById('layerTitle');
        const infoElement = document.getElementById('layerInfo');
        
        titleElement.textContent = data.title;
        infoElement.innerHTML = `
            <div class="layer-details">
                <p><strong>Height:</strong> ${data.height}</p>
                <p><strong>Characteristics:</strong> ${data.characteristics}</p>
                <p><strong>Plant Adaptations:</strong> ${data.adaptations}</p>
                <div class="environmental-data">
                    <p><strong>Sunlight:</strong> ${data.sunlight}</p>
                    <p><strong>Humidity:</strong> ${data.humidity}</p>
                    <p><strong>Tree Density:</strong> ${data.density}</p>
                </div>
            </div>
        `;
        
        // Add smooth transition effect
        infoElement.style.opacity = '0';
        setTimeout(() => {
            infoElement.style.opacity = '1';
        }, 100);
    }
    
    // Show tooltip on hover
    showTooltip(e, layerType) {
        const tooltip = document.getElementById('tooltip');
        const data = this.layerData[layerType];
        
        tooltip.innerHTML = `<strong>${data.title}</strong><br>${data.height}`;
        tooltip.classList.add('show');
        
        this.updateTooltipPosition(e);
    }
    
    // Hide tooltip
    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    }
    
    // Update tooltip position based on mouse
    updateTooltipPosition(e) {
        const tooltip = document.getElementById('tooltip');
        if (tooltip.classList.contains('show')) {
            const rect = document.querySelector('.container').getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            tooltip.style.left = `${x + 10}px`;
            tooltip.style.top = `${y - 10}px`;
        }
    }
    
    // Show welcome message
    showWelcomeMessage() {
        const titleElement = document.getElementById('layerTitle');
        const infoElement = document.getElementById('layerInfo');
        
        titleElement.textContent = "Explore Tropical Rainforest Layers";
        infoElement.innerHTML = `
            <p>🌳 Click on different layers of the rainforest to discover their unique characteristics and plant adaptations!</p>
            <p>🔍 Each layer has different amounts of sunlight, humidity, and types of plants.</p>
            <p>📱 <em>Tip: Click on the colorful tree sections above to start exploring!</em></p>
        `;
    }
    
    // Show random fun fact
    showFunFact() {
        const modal = document.getElementById('funFactModal');
        const factText = document.getElementById('funFactText');
        
        const randomFact = this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
        factText.textContent = randomFact;
        
        modal.style.display = 'block';
        
        if (this.soundEnabled) {
            this.playSound('fact');
        }
        
        this.announceForAccessibility(`Fun fact: ${randomFact}`);
    }
    
    // Close fun fact modal
    closeFunFactModal() {
        document.getElementById('funFactModal').style.display = 'none';
    }
    
    // Start the quiz
    startQuiz() {
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        
        const modal = document.getElementById('quizModal');
        modal.style.display = 'block';
        
        this.showQuizQuestion();
        
        if (this.soundEnabled) {
            this.playSound('quiz');
        }
    }
    
    // Display current quiz question
    showQuizQuestion() {
        const question = this.quizQuestions[this.currentQuizQuestion];
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const nextBtn = document.getElementById('nextBtn');
        const resultElement = document.getElementById('quizResult');
        
        questionElement.textContent = `Question ${this.currentQuizQuestion + 1}: ${question.question}`;
        
        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectQuizOption(index));
            optionsElement.appendChild(button);
        });
        
        nextBtn.style.display = 'none';
        resultElement.innerHTML = '';
    }
    
    // Handle quiz option selection
    selectQuizOption(selectedIndex) {
        const question = this.quizQuestions[this.currentQuizQuestion];
        const options = document.querySelectorAll('.option');
        const nextBtn = document.getElementById('nextBtn');
        const resultElement = document.getElementById('quizResult');
        
        // Disable all options
        options.forEach(option => option.disabled = true);
        
        // Show correct/incorrect styling
        options[question.correct].classList.add('correct');
        if (selectedIndex !== question.correct) {
            options[selectedIndex].classList.add('incorrect');
        }
        
        // Update score and show explanation
        if (selectedIndex === question.correct) {
            this.quizScore++;
            resultElement.innerHTML = `<span style="color: green;">✓ Correct!</span><br>${question.explanation}`;
            if (this.soundEnabled) {
                this.playSound('correct');
            }
        } else {
            resultElement.innerHTML = `<span style="color: red;">✗ Incorrect.</span><br>${question.explanation}`;
            if (this.soundEnabled) {
                this.playSound('incorrect');
            }
        }
        
        // Show next button or finish quiz
        if (this.currentQuizQuestion < this.quizQuestions.length - 1) {
            nextBtn.textContent = 'Next Question';
            nextBtn.style.display = 'block';
            nextBtn.onclick = () => {
                this.currentQuizQuestion++;
                this.showQuizQuestion();
            };
        } else {
            nextBtn.textContent = 'Finish Quiz';
            nextBtn.style.display = 'block';
            nextBtn.onclick = () => this.showQuizResults();
        }
        
        this.announceForAccessibility(resultElement.textContent);
    }
    
    // Show final quiz results
    showQuizResults() {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const nextBtn = document.getElementById('nextBtn');
        const resultElement = document.getElementById('quizResult');
        
        const percentage = Math.round((this.quizScore / this.quizQuestions.length) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = '🌟 Excellent! You\'re a rainforest expert!';
        } else if (percentage >= 60) {
            message = '👍 Good job! You understand rainforest layers well!';
        } else {
            message = '🌱 Keep learning! Try exploring the layers again!';
        }
        
        questionElement.textContent = 'Quiz Complete!';
        optionsElement.innerHTML = '';
        resultElement.innerHTML = `
            <div style="text-align: center; font-size: 18px;">
                <p>Your Score: ${this.quizScore}/${this.quizQuestions.length} (${percentage}%)</p>
                <p>${message}</p>
            </div>
        `;
        
        nextBtn.textContent = 'Take Quiz Again';
        nextBtn.onclick = () => this.startQuiz();
        
        this.announceForAccessibility(`Quiz complete. You scored ${this.quizScore} out of ${this.quizQuestions.length}. ${message}`);
    }
    
    // Close quiz modal
    closeQuizModal() {
        document.getElementById('quizModal').style.display = 'none';
    }
    
    // Toggle sound effects
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById('soundBtn');
        
        if (this.soundEnabled) {
            soundBtn.textContent = '🔊 Sounds ON';
            soundBtn.classList.add('sound-active');
            this.playSound('toggle');
        } else {
            soundBtn.textContent = '🔇 Sounds OFF';
            soundBtn.classList.remove('sound-active');
        }
        
        this.announceForAccessibility(`Sounds ${this.soundEnabled ? 'enabled' : 'disabled'}`);
    }
    
    // Play sound effects (simulated with Web Audio API)
    playSound(type) {
        if (!this.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different actions
            switch (type) {
                case 'select':
                    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                    break;
                case 'correct':
                    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
                    break;
                case 'incorrect':
                    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                    break;
                case 'fact':
                    oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
                    break;
                case 'quiz':
                    oscillator.frequency.setValueAtTime(392, audioContext.currentTime);
                    break;
                case 'toggle':
                    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                    break;
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
    
    // Handle modal clicks (close when clicking outside)
    handleModalClick(e) {
        const funFactModal = document.getElementById('funFactModal');
        const quizModal = document.getElementById('quizModal');
        
        if (e.target === funFactModal) {
            this.closeFunFactModal();
        } else if (e.target === quizModal) {
            this.closeQuizModal();
        }
    }
    
    // Keyboard accessibility support
    handleKeyboard(e) {
        switch (e.key) {
            case 'Escape':
                this.closeFunFactModal();
                this.closeQuizModal();
                break;
            case '1':
                this.selectLayer('emergent');
                break;
            case '2':
                this.selectLayer('canopy');
                break;
            case '3':
                this.selectLayer('understory');
                break;
            case 'f':
            case 'F':
                this.showFunFact();
                break;
            case 'q':
            case 'Q':
                this.startQuiz();
                break;
            case 's':
            case 'S':
                this.toggleSound();
                break;
        }
    }
    
    // Accessibility announcements for screen readers
    announceForAccessibility(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RainforestInteractive();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Hide tooltip on resize to prevent positioning issues
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
});

// Prevent context menu on touch devices for better UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.layer')) {
        e.preventDefault();
    }
});

// Add loading indicator for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});