// Game state management
class TradeOffGame {
    constructor() {
        // Initialize game state
        this.currentScenario = 0;
        this.playerChoices = [];
        this.scenarios = [
            {
                title: "Weekend Dilemma",
                description: "You have $20 for the weekend. Your favorite band is performing at the school concert (ticket costs $15), but you also need money for lunch tomorrow ($8).",
                budget: 20,
                options: [
                    {
                        id: "concert",
                        title: "Buy Concert Ticket",
                        cost: 15,
                        icon: "🎵",
                        description: "Enjoy the concert but skip lunch",
                        tradeoff: "Missing lunch tomorrow",
                        opportunityCost: "A nutritious meal ($8)"
                    },
                    {
                        id: "lunch",
                        title: "Save for Lunch",
                        cost: 8,
                        icon: "🍽️",
                        description: "Have lunch but miss the concert",
                        tradeoff: "Missing the concert",
                        opportunityCost: "Entertainment and social experience ($15)"
                    }
                ]
            },
            {
                title: "Study vs Social",
                description: "You have $25 saved up. There's a new video game everyone is playing ($20), but you also want to buy extra study materials for your upcoming exams ($18).",
                budget: 25,
                options: [
                    {
                        id: "game",
                        title: "Buy Video Game",
                        cost: 20,
                        icon: "🎮",
                        description: "Have fun with friends but no extra study help",
                        tradeoff: "Less preparation for exams",
                        opportunityCost: "Better exam preparation ($18)"
                    },
                    {
                        id: "study",
                        title: "Buy Study Materials",
                        cost: 18,
                        icon: "📚",
                        description: "Be well-prepared but miss out on social gaming",
                        tradeoff: "Missing social gaming time",
                        opportunityCost: "Social connection and entertainment ($20)"
                    }
                ]
            },
            {
                title: "Fashion vs Function",
                description: "You have $30 for new shoes. You can get trendy sneakers that look great ($28) or comfortable walking shoes for daily use ($22).",
                budget: 30,
                options: [
                    {
                        id: "trendy",
                        title: "Trendy Sneakers",
                        cost: 28,
                        icon: "👟",
                        description: "Look fashionable but less comfortable",
                        tradeoff: "Comfort and durability",
                        opportunityCost: "Daily comfort and extra money ($22)"
                    },
                    {
                        id: "comfortable",
                        title: "Comfortable Shoes",
                        cost: 22,
                        icon: "👞",
                        description: "Very comfortable but less stylish",
                        tradeoff: "Fashion appeal",
                        opportunityCost: "Trendy appearance ($28)"
                    }
                ]
            }
        ];
        
        this.initializeElements();
        this.setupEventListeners();
        this.displayCurrentScenario();
    }

    // Initialize DOM elements
    initializeElements() {
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.budgetAmount = document.getElementById('budgetAmount');
        this.scenarioPanel = document.getElementById('scenarioPanel');
        this.scenarioTitle = document.getElementById('scenarioTitle');
        this.scenarioDescription = document.getElementById('scenarioDescription');
        this.optionsPanel = document.getElementById('optionsPanel');
        this.feedbackPanel = document.getElementById('feedbackPanel');
        this.feedbackTitle = document.getElementById('feedbackTitle');
        this.feedbackText = document.getElementById('feedbackText');
        this.tradeoffValue = document.getElementById('tradeoffValue');
        this.opportunityCostValue = document.getElementById('opportunityCostValue');
        this.nextBtn = document.getElementById('nextBtn');
        this.summaryPanel = document.getElementById('summaryPanel');
        this.summaryChoices = document.getElementById('summaryChoices');
        this.restartBtn = document.getElementById('restartBtn');
        this.tooltip = document.getElementById('tooltip');
    }

    // Setup event listeners
    setupEventListeners() {
        // Option card clicks
        this.optionsPanel.addEventListener('click', (e) => {
            const optionCard = e.target.closest('.option-card');
            if (optionCard) {
                this.handleOptionSelect(optionCard);
            }
        });

        // Next button click
        this.nextBtn.addEventListener('click', () => {
            this.nextScenario();
        });

        // Restart button click
        this.restartBtn.addEventListener('click', () => {
            this.restartGame();
        });

        // Tooltip functionality
        document.addEventListener('mouseover', (e) => {
            if (e.target.hasAttribute('title')) {
                this.showTooltip(e.target.getAttribute('title'), e);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.hasAttribute('title')) {
                this.hideTooltip();
            }
        });

        // Touch support for tooltips
        document.addEventListener('touchstart', (e) => {
            if (e.target.hasAttribute('title')) {
                this.showTooltip(e.target.getAttribute('title'), e);
                setTimeout(() => this.hideTooltip(), 3000);
            }
        });
    }

    // Display current scenario
    displayCurrentScenario() {
        const scenario = this.scenarios[this.currentScenario];
        
        // Update progress
        const progressPercent = ((this.currentScenario + 1) / this.scenarios.length) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
        this.progressText.textContent = `Scenario ${this.currentScenario + 1} of ${this.scenarios.length}`;
        
        // Update budget
        this.budgetAmount.textContent = `$${scenario.budget}`;
        
        // Update scenario content
        this.scenarioTitle.textContent = scenario.title;
        this.scenarioDescription.textContent = scenario.description;
        
        // Create option cards
        this.optionsPanel.innerHTML = '';
        scenario.options.forEach(option => {
            const optionCard = this.createOptionCard(option);
            this.optionsPanel.appendChild(optionCard);
        });
        
        // Show scenario panel and hide others
        this.scenarioPanel.style.display = 'block';
        this.optionsPanel.style.display = 'flex';
        this.feedbackPanel.style.display = 'none';
        this.summaryPanel.style.display = 'none';
    }

    // Create option card element
    createOptionCard(option) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.setAttribute('data-choice', option.id);
        card.setAttribute('data-cost', option.cost);
        card.setAttribute('title', `${option.title} - ${option.description}`);
        
        card.innerHTML = `
            <div class="option-icon">${option.icon}</div>
            <div class="option-content">
                <div class="option-title">${option.title}</div>
                <div class="option-cost">$${option.cost}</div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
        
        return card;
    }

    // Handle option selection
    handleOptionSelect(optionCard) {
        const choiceId = optionCard.getAttribute('data-choice');
        const scenario = this.scenarios[this.currentScenario];
        const selectedOption = scenario.options.find(opt => opt.id === choiceId);
        
        // Store player choice
        this.playerChoices.push({
            scenario: this.currentScenario + 1,
            scenarioTitle: scenario.title,
            choice: selectedOption.title,
            cost: selectedOption.cost,
            budget: scenario.budget,
            tradeoff: selectedOption.tradeoff,
            opportunityCost: selectedOption.opportunityCost
        });
        
        // Show feedback
        this.showFeedback(selectedOption, scenario);
    }

    // Show feedback for selected option
    showFeedback(selectedOption, scenario) {
        const remainingBudget = scenario.budget - selectedOption.cost;
        
        this.feedbackTitle.textContent = `You chose: ${selectedOption.title}`;
        this.feedbackText.textContent = `You spent $${selectedOption.cost} and have $${remainingBudget} remaining.`;
        this.tradeoffValue.textContent = selectedOption.tradeoff;
        this.opportunityCostValue.textContent = selectedOption.opportunityCost;
        
        // Hide scenario and options, show feedback
        this.scenarioPanel.style.display = 'none';
        this.optionsPanel.style.display = 'none';
        this.feedbackPanel.style.display = 'block';
        
        // Update next button text
        if (this.currentScenario === this.scenarios.length - 1) {
            this.nextBtn.textContent = 'View Summary';
        } else {
            this.nextBtn.textContent = 'Next Scenario';
        }
    }

    // Move to next scenario or show summary
    nextScenario() {
        this.currentScenario++;
        
        if (this.currentScenario < this.scenarios.length) {
            this.displayCurrentScenario();
        } else {
            this.showSummary();
        }
    }

    // Show final summary
    showSummary() {
        let summaryHTML = '<div class="summary-text">Your choices throughout the scenarios:</div>';
        
        this.playerChoices.forEach((choice, index) => {
            summaryHTML += `
                <div class="choice-item">
                    <strong>Scenario ${choice.scenario}:</strong> ${choice.scenarioTitle}<br>
                    <strong>Choice:</strong> ${choice.choice} ($${choice.cost})<br>
                    <strong>Trade-off:</strong> ${choice.tradeoff}<br>
                    <strong>Opportunity Cost:</strong> ${choice.opportunityCost}
                </div>
            `;
        });
        
        this.summaryChoices.innerHTML = summaryHTML;
        
        // Hide all other panels, show summary
        this.scenarioPanel.style.display = 'none';
        this.optionsPanel.style.display = 'none';
        this.feedbackPanel.style.display = 'none';
        this.summaryPanel.style.display = 'block';
    }

    // Restart the game
    restartGame() {
        this.currentScenario = 0;
        this.playerChoices = [];
        this.displayCurrentScenario();
    }

    // Show tooltip
    showTooltip(text, element) {
        this.tooltip.textContent = text;
        this.tooltip.style.opacity = '1';
        
        const rect = element.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        // Position tooltip at center top of element
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Ensure tooltip stays within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
    }

    // Hide tooltip
    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create new game instance
    const game = new TradeOffGame();
    
    // Add visual feedback for interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-card') || e.target.closest('.option-card')) {
            const card = e.target.classList.contains('option-card') ? e.target : e.target.closest('.option-card');
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('option-card')) {
                focusedElement.click();
                e.preventDefault();
            }
        }
    });
    
    // Make option cards focusable for accessibility
    document.querySelectorAll('.option-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });
});

// Utility functions for cognitive load management
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Handle orientation changes on mobile
window.addEventListener('orientationchange', debounce(() => {
    // Recalculate layout after orientation change
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}, 250));