// Singapore's Four National Taps Adventure Game
// Implements cognitive load theory and multimedia learning principles

class WaterAdventureGame {
    constructor() {
        // Game state management
        this.discoveredTaps = new Set();
        this.currentQuizIndex = 0;
        this.gamePhase = 'exploration'; // exploration, quiz, completed
        
        // Story content for each tap - aligned with Primary 2 level
        this.tapStories = {
            local: {
                icon: '🌧️',
                title: 'Local Catchment Water',
                story: 'Great choice! You discovered our rainwater collection! When it rains in Singapore, the water flows into rivers and streams, then into big lakes called reservoirs like MacRitchie and Bedok. This is our very own water!',
                choices: [
                    'Visit MacRitchie Reservoir',
                    'Learn about rain collection'
                ],
                outcomes: [
                    'You see the beautiful reservoir surrounded by trees. Fish swim in the clean water that will help supply Singapore!',
                    'Rain falls on Singapore and flows through drains into our reservoirs. Nature helps us collect water!'
                ]
            },
            imported: {
                icon: '🚰',
                title: 'Imported Water',
                story: 'Excellent discovery! This water comes from Malaysia, our neighbor country. It travels through big pipes across the bridge connecting Singapore and Malaysia. We have a special agreement to buy this water.',
                choices: [
                    'See the water pipes',
                    'Learn about the agreement'
                ],
                outcomes: [
                    'Huge pipes carry millions of liters of water across the bridge every day. What amazing engineering!',
                    'Singapore and Malaysia work together as good neighbors to share water resources. Teamwork is important!'
                ]
            },
            newater: {
                icon: '♻️',
                title: 'NEWater',
                story: 'Amazing find! NEWater is Singapore\'s special invention. We take used water and clean it so well that it becomes safe to drink again. It\'s like magic - turning old water into new, clean water!',
                choices: [
                    'See how cleaning works',
                    'Learn why it\'s special'
                ],
                outcomes: [
                    'Special machines remove all the dirt and germs from used water. Science makes it super clean!',
                    'Singapore invented this technology and now other countries want to learn from us. We are water heroes!'
                ]
            },
            desalinated: {
                icon: '🌊',
                title: 'Desalinated Water',
                story: 'Fantastic discovery! This water comes from the sea around Singapore. Special factories near the ocean remove all the salt from seawater to make it safe to drink. No more salty taste!',
                choices: [
                    'Visit the desalination plant',
                    'Learn about removing salt'
                ],
                outcomes: [
                    'Big machines work day and night near the sea, turning salty water into fresh drinking water for everyone!',
                    'Salt is separated from water using special filters. The salt goes away and clean water comes out!'
                ]
            }
        };
        
        // Quiz questions for assessment
        this.quizQuestions = [
            {
                question: 'Which National Tap collects rainwater in Singapore?',
                options: [
                    'Local Catchment Water',
                    'Imported Water',
                    'NEWater',
                    'Desalinated Water'
                ],
                correct: 0,
                explanation: 'Correct! Local Catchment Water collects rainwater in our reservoirs.'
            },
            {
                question: 'Where does Singapore\'s imported water come from?',
                options: [
                    'Indonesia',
                    'Malaysia',
                    'Thailand',
                    'China'
                ],
                correct: 1,
                explanation: 'Yes! We buy water from Malaysia, our neighbor country.'
            },
            {
                question: 'What makes NEWater special?',
                options: [
                    'It comes from rain',
                    'It comes from the sea',
                    'It\'s used water made clean again',
                    'It comes from other countries'
                ],
                correct: 2,
                explanation: 'Excellent! NEWater is used water that is cleaned and made safe to drink again.'
            }
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        // Get DOM elements
        this.elements = {
            progressBar: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            storyArea: document.getElementById('storyArea'),
            storyImage: document.getElementById('storyImage'),
            storyText: document.getElementById('storyText').querySelector('p'),
            currentTapIcon: document.getElementById('currentTapIcon'),
            navigationPanel: document.getElementById('navigationPanel'),
            decisionPanel: document.getElementById('decisionPanel'),
            inventoryItems: document.getElementById('inventoryItems'),
            quizPanel: document.getElementById('quizPanel'),
            badgePanel: document.getElementById('badgePanel'),
            tooltip: document.getElementById('tooltip')
        };
        
        this.setupEventListeners();
        this.updateProgress();
    }
    
    setupEventListeners() {
        // Tap button listeners
        document.querySelectorAll('.tap-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tapType = button.dataset.tap;
                this.exploreTap(tapType);
            });
            
            // Tooltip on hover for desktop
            button.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, button.title);
            });
            
            button.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
        
        // Decision button listeners
        document.querySelectorAll('.decision-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                this.makeDecision(index);
            });
        });
        
        // Quiz option listeners
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', (e) => {
                this.answerQuiz(e.target);
            });
        });
        
        // Inventory item tooltips
        document.querySelectorAll('.inventory-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const tapType = item.dataset.item;
                if (!item.classList.contains('hidden')) {
                    this.showTooltip(e, `Discovered: ${this.tapStories[tapType].title}`);
                }
            });
            
            item.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    exploreTap(tapType) {
        const story = this.tapStories[tapType];
        
        // Update story display
        this.elements.currentTapIcon.textContent = story.icon;
        this.elements.storyText.textContent = story.story;
        
        // Mark as discovered
        if (!this.discoveredTaps.has(tapType)) {
            this.discoveredTaps.add(tapType);
            this.updateInventory(tapType);
            this.updateProgress();
            
            // Mark button as discovered
            const button = document.querySelector(`[data-tap="${tapType}"]`);
            button.classList.add('discovered');
        }
        
        // Show decision options
        this.showDecisionOptions(tapType);
        
        // Check if all taps discovered
        if (this.discoveredTaps.size === 4) {
            this.showExplorerBadge();
            setTimeout(() => {
                this.startQuiz();
            }, 2000);
        }
    }
    
    showDecisionOptions(tapType) {
        const story = this.tapStories[tapType];
        const decisionButtons = document.querySelectorAll('.decision-button');
        
        decisionButtons[0].textContent = story.choices[0];
        decisionButtons[1].textContent = story.choices[1];
        
        // Store current tap for decision outcomes
        this.currentTap = tapType;
        
        this.elements.decisionPanel.classList.remove('hidden');
    }
    
    makeDecision(choiceIndex) {
        const story = this.tapStories[this.currentTap];
        const outcome = story.outcomes[choiceIndex];
        
        // Update story text with outcome
        this.elements.storyText.textContent = outcome;
        
        // Hide decision panel
        this.elements.decisionPanel.classList.add('hidden');
        
        // Add some visual feedback
        this.elements.storyArea.style.background = 'linear-gradient(145deg, #e8f5e8, #f1f8e9)';
        setTimeout(() => {
            this.elements.storyArea.style.background = 'rgba(255, 255, 255, 0.95)';
        }, 1500);
    }
    
    updateInventory(tapType) {
        const inventoryItem = document.querySelector(`[data-item="${tapType}"]`);
        inventoryItem.classList.remove('hidden');
    }
    
    updateProgress() {
        const progress = (this.discoveredTaps.size / 4) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
        this.elements.progressText.textContent = `Progress: ${this.discoveredTaps.size}/4 Taps Discovered`;
    }
    
    showExplorerBadge() {
        const badge = document.getElementById('explorerBadge');
        badge.classList.remove('hidden');
    }
    
    startQuiz() {
        this.gamePhase = 'quiz';
        this.currentQuizIndex = 0;
        this.elements.quizPanel.classList.remove('hidden');
        this.displayQuizQuestion();
    }
    
    displayQuizQuestion() {
        const question = this.quizQuestions[this.currentQuizIndex];
        
        document.getElementById('quizQuestion').textContent = question.question;
        
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });
        
        document.getElementById('quizFeedback').textContent = '';
    }
    
    answerQuiz(selectedOption) {
        const question = this.quizQuestions[this.currentQuizIndex];
        const selectedIndex = Array.from(document.querySelectorAll('.quiz-option')).indexOf(selectedOption);
        const isCorrect = selectedIndex === question.correct;
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.disabled = true;
        });
        
        // Show visual feedback
        if (isCorrect) {
            selectedOption.classList.add('correct');
            document.getElementById('quizFeedback').innerHTML = `<span style="color: #4caf50;">✓ ${question.explanation}</span>`;
        } else {
            selectedOption.classList.add('incorrect');
            document.querySelectorAll('.quiz-option')[question.correct].classList.add('correct');
            document.getElementById('quizFeedback').innerHTML = `<span style="color: #f44336;">✗ ${question.explanation}</span>`;
        }
        
        // Move to next question or complete quiz
        setTimeout(() => {
            this.currentQuizIndex++;
            if (this.currentQuizIndex < this.quizQuestions.length) {
                this.displayQuizQuestion();
            } else {
                this.completeQuiz();
            }
        }, 2500);
    }
    
    completeQuiz() {
        this.elements.quizPanel.classList.add('hidden');
        
        // Show quiz completion badge
        const quizBadge = document.getElementById('quizBadge');
        quizBadge.classList.remove('hidden');
        
        // Update story area with completion message
        this.elements.currentTapIcon.textContent = '🏆';
        this.elements.storyText.textContent = 'Congratulations! You are now a Water Expert! You have discovered all of Singapore\'s Four National Taps and learned how they help provide clean water for everyone. Well done!';
        
        this.gamePhase = 'completed';
    }
    
    showTooltip(event, text) {
        const tooltip = this.elements.tooltip;
        tooltip.textContent = text;
        tooltip.classList.remove('hidden');
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        const containerRect = document.getElementById('gameContainer').getBoundingClientRect();
        
        tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - containerRect.top - tooltip.offsetHeight - 8}px`;
    }
    
    hideTooltip() {
        this.elements.tooltip.classList.add('hidden');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WaterAdventureGame();
});

// Handle responsive height changes
window.addEventListener('resize', () => {
    // Ensure game container maintains proper height
    const gameContainer = document.getElementById('gameContainer');
    if (window.innerHeight < 500) {
        document.body.style.height = '450px';
    } else {
        document.body.style.height = '90vh';
    }
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('tap-button') || 
            focusedElement.classList.contains('decision-button') ||
            focusedElement.classList.contains('quiz-option')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});