// Game state management and interactive functionality
// Implements cognitive load theory and multimedia learning principles

class PersuasionGame {
    constructor() {
        // Initialize game state variables
        this.currentCampaign = 0;
        this.currentScene = 0;
        this.persuasionScore = 0;
        this.ethicsScore = 100;
        this.gameHistory = [];
        this.isGameComplete = false;
        
        // Initialize DOM elements
        this.initializeElements();
        
        // Load game data structure
        this.loadGameData();
        
        // Start the game
        this.startGame();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    // Initialize DOM element references for efficient access
    initializeElements() {
        this.elements = {
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            characterAvatar: document.getElementById('characterAvatar'),
            characterName: document.getElementById('characterName'),
            sceneBackground: document.getElementById('sceneBackground'),
            dialogueText: document.getElementById('dialogueText'),
            decisionContainer: document.getElementById('decisionContainer'),
            decision1: document.getElementById('decision1'),
            decision2: document.getElementById('decision2'),
            decision3: document.getElementById('decision3'),
            backBtn: document.getElementById('backBtn'),
            nextBtn: document.getElementById('nextBtn'),
            restartBtn: document.getElementById('restartBtn'),
            persuasionScore: document.getElementById('persuasionScore'),
            ethicsScore: document.getElementById('ethicsScore'),
            tooltip: document.getElementById('tooltip')
        };
    }
    
    // Game data structure following instructional design principles
    loadGameData() {
        this.gameData = {
            campaigns: [
                {
                    title: "Healthy Snack Campaign",
                    character: "Nutritionist Sarah",
                    avatar: "👩‍⚕️",
                    background: "linear-gradient(90deg, #90EE90, #98FB98)",
                    scenes: [
                        {
                            dialogue: "Our client wants to promote their new organic granola bars. How should we approach this campaign to be both persuasive and truthful?",
                            decisions: [
                                {
                                    text: "Emphasize 'superfood' ingredients",
                                    persuasion: 15,
                                    ethics: -10,
                                    feedback: "Good persuasion, but 'superfood' claims can be misleading without scientific backing."
                                },
                                {
                                    text: "Focus on taste and convenience",
                                    persuasion: 10,
                                    ethics: 5,
                                    feedback: "Honest approach that builds trust with consumers while being moderately persuasive."
                                },
                                {
                                    text: "Highlight certified organic ingredients",
                                    persuasion: 12,
                                    ethics: 10,
                                    feedback: "Excellent balance! Factual claims that persuade through credibility."
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Tech Gadget Launch",
                    character: "Tech Reviewer Mike",
                    avatar: "👨‍💻",
                    background: "linear-gradient(90deg, #87CEEB, #4682B4)",
                    scenes: [
                        {
                            dialogue: "A startup wants to advertise their new smartphone. The device has good features but isn't revolutionary. How do we position it?",
                            decisions: [
                                {
                                    text: "Claim it's 'revolutionary technology'",
                                    persuasion: 20,
                                    ethics: -20,
                                    feedback: "High persuasion but misleading. This could damage brand credibility long-term."
                                },
                                {
                                    text: "Compare specific features to competitors",
                                    persuasion: 15,
                                    ethics: 15,
                                    feedback: "Smart strategy! Factual comparisons build trust and inform consumers."
                                },
                                {
                                    text: "Focus on value for money",
                                    persuasion: 12,
                                    ethics: 8,
                                    feedback: "Good approach that appeals to budget-conscious consumers honestly."
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Fashion Brand Revival",
                    character: "Style Consultant Emma",
                    avatar: "👗",
                    background: "linear-gradient(90deg, #FFB6C1, #FF69B4)",
                    scenes: [
                        {
                            dialogue: "An old fashion brand wants to appeal to young adults. They're struggling with relevance. What's our strategy?",
                            decisions: [
                                {
                                    text: "Use trending slang and memes",
                                    persuasion: 8,
                                    ethics: -5,
                                    feedback: "Risky approach. Forced trendy language can appear inauthentic to young audiences."
                                },
                                {
                                    text: "Showcase sustainable practices",
                                    persuasion: 18,
                                    ethics: 15,
                                    feedback: "Excellent choice! Sustainability resonates strongly with young consumers."
                                },
                                {
                                    text: "Partner with young influencers",
                                    persuasion: 16,
                                    ethics: 5,
                                    feedback: "Effective for reach, but ensure influencers genuinely align with brand values."
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Local Restaurant Promotion",
                    character: "Chef Antonio",
                    avatar: "👨‍🍳",
                    background: "linear-gradient(90deg, #FFA500, #FF8C00)",
                    scenes: [
                        {
                            dialogue: "A family restaurant wants to increase dinner traffic. They pride themselves on homemade recipes. How do we craft their message?",
                            decisions: [
                                {
                                    text: "Promise 'authentic Italian cuisine'",
                                    persuasion: 14,
                                    ethics: -8,
                                    feedback: "Be careful with authenticity claims. Is the chef actually Italian? Verify before claiming."
                                },
                                {
                                    text: "Emphasize family recipes and fresh ingredients",
                                    persuasion: 16,
                                    ethics: 12,
                                    feedback: "Perfect! Emotional connection through family story plus factual ingredient quality."
                                },
                                {
                                    text: "Highlight awards and reviews",
                                    persuasion: 12,
                                    ethics: 10,
                                    feedback: "Good credibility building, but ensure all awards and reviews are current and verifiable."
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Educational App Campaign",
                    character: "Teacher Ms. Chen",
                    avatar: "👩‍🏫",
                    background: "linear-gradient(90deg, #DDA0DD, #9370DB)",
                    scenes: [
                        {
                            dialogue: "An educational app claims to improve math scores by 50%. Parents are skeptical. How do we address their concerns while promoting the app?",
                            decisions: [
                                {
                                    text: "Show testimonials from satisfied parents",
                                    persuasion: 13,
                                    ethics: 8,
                                    feedback: "Good social proof, but ensure testimonials are genuine and representative."
                                },
                                {
                                    text: "Provide detailed study methodology",
                                    persuasion: 10,
                                    ethics: 18,
                                    feedback: "Excellent transparency! Parents appreciate evidence-based claims they can verify."
                                },
                                {
                                    text: "Offer free trial with money-back guarantee",
                                    persuasion: 17,
                                    ethics: 12,
                                    feedback: "Smart risk-reversal strategy that shows confidence in the product."
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    
    // Initialize game and display first campaign
    startGame() {
        this.updateProgress();
        this.displayCurrentCampaign();
        this.updateScores();
        this.elements.backBtn.disabled = true;
    }
    
    // Display current campaign content with visual feedback
    displayCurrentCampaign() {
        const campaign = this.gameData.campaigns[this.currentCampaign];
        const scene = campaign.scenes[this.currentScene];
        
        // Update character and scene visuals
        this.elements.characterName.textContent = campaign.character;
        this.elements.characterAvatar.querySelector('.avatar-image').textContent = campaign.avatar;
        this.elements.sceneBackground.style.background = campaign.background;
        
        // Display dialogue with fade-in animation
        this.elements.dialogueText.textContent = scene.dialogue;
        this.elements.dialogueText.parentElement.classList.add('fade-in');
        
        // Setup decision buttons with proper formatting
        this.setupDecisionButtons(scene.decisions);
        
        // Enable/disable navigation buttons based on game state
        this.updateNavigationState();
    }
    
    // Setup decision buttons with cognitive load optimization
    setupDecisionButtons(decisions) {
        const buttons = [this.elements.decision1, this.elements.decision2, this.elements.decision3];
        
        decisions.forEach((decision, index) => {
            if (buttons[index]) {
                buttons[index].textContent = decision.text;
                buttons[index].style.display = 'flex';
                buttons[index].disabled = false;
                buttons[index].classList.remove('success-highlight', 'warning-highlight');
                
                // Add slide-up animation with staggered timing
                setTimeout(() => {
                    buttons[index].classList.add('slide-up');
                }, index * 100);
            }
        });
        
        // Hide unused buttons
        for (let i = decisions.length; i < buttons.length; i++) {
            if (buttons[i]) {
                buttons[i].style.display = 'none';
            }
        }
    }
    
    // Handle decision making with immediate feedback
    makeDecision(decisionIndex) {
        const campaign = this.gameData.campaigns[this.currentCampaign];
        const scene = campaign.scenes[this.currentScene];
        const decision = scene.decisions[decisionIndex - 1];
        
        if (!decision) return;
        
        // Store decision in game history
        this.gameHistory.push({
            campaign: this.currentCampaign,
            scene: this.currentScene,
            decision: decisionIndex - 1,
            persuasionGain: decision.persuasion,
            ethicsChange: decision.ethics
        });
        
        // Update scores with visual feedback
        this.updateScores(decision.persuasion, decision.ethics);
        
        // Provide immediate visual feedback on button
        const selectedButton = document.getElementById(`decision${decisionIndex}`);
        if (decision.ethics >= 0) {
            selectedButton.classList.add('success-highlight');
        } else {
            selectedButton.classList.add('warning-highlight');
        }
        
        // Disable all decision buttons to prevent multiple selections
        this.disableDecisionButtons();
        
        // Show feedback in dialogue box
        setTimeout(() => {
            this.showFeedback(decision.feedback);
        }, 1000);
        
        // Enable next button
        this.elements.nextBtn.disabled = false;
        this.elements.backBtn.disabled = false;
    }
    
    // Display feedback with educational value
    showFeedback(feedback) {
        this.elements.dialogueText.textContent = feedback;
        this.elements.dialogueText.parentElement.classList.add('fade-in');
    }
    
    // Update game scores with smooth animations
    updateScores(persuasionGain = 0, ethicsChange = 0) {
        this.persuasionScore += persuasionGain;
        this.ethicsScore += ethicsChange;
        
        // Ensure ethics score doesn't go below 0 or above 100
        this.ethicsScore = Math.max(0, Math.min(100, this.ethicsScore));
        
        // Animate score changes
        this.animateScoreChange(this.elements.persuasionScore, this.persuasionScore);
        this.animateScoreChange(this.elements.ethicsScore, this.ethicsScore);
    }
    
    // Animate score changes for better user feedback
    animateScoreChange(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        const difference = targetValue - currentValue;
        const steps = 10;
        const stepValue = difference / steps;
        
        let step = 0;
        const interval = setInterval(() => {
            step++;
            const newValue = Math.round(currentValue + (stepValue * step));
            element.textContent = newValue;
            
            if (step >= steps) {
                clearInterval(interval);
                element.textContent = targetValue;
            }
        }, 50);
    }
    
    // Update progress bar and text
    updateProgress() {
        const totalCampaigns = this.gameData.campaigns.length;
        const progressPercentage = ((this.currentCampaign + 1) / totalCampaigns) * 100;
        
        this.elements.progressFill.style.width = `${progressPercentage}%`;
        this.elements.progressText.textContent = `Campaign ${this.currentCampaign + 1} of ${totalCampaigns}`;
    }
    
    // Navigation: Move to next campaign or scene
    goNext() {
        if (this.currentCampaign < this.gameData.campaigns.length - 1) {
            this.currentCampaign++;
            this.currentScene = 0;
            this.updateProgress();
            this.displayCurrentCampaign();
            this.elements.nextBtn.disabled = true;
        } else {
            this.endGame();
        }
    }
    
    // Navigation: Go back to previous campaign
    goBack() {
        if (this.currentCampaign > 0) {
            this.currentCampaign--;
            this.currentScene = 0;
            this.displayCurrentCampaign();
            this.elements.nextBtn.disabled = true;
            
            if (this.currentCampaign === 0) {
                this.elements.backBtn.disabled = true;
            }
        }
    }
    
    // End game and show final results
    endGame() {
        this.isGameComplete = true;
        
        let finalMessage = this.generateFinalFeedback();
        
        this.elements.dialogueText.textContent = finalMessage;
        this.elements.decisionContainer.style.display = 'none';
        this.elements.nextBtn.textContent = 'Play Again';
        this.elements.nextBtn.onclick = () => this.restartGame();
    }
    
    // Generate personalized final feedback based on performance
    generateFinalFeedback() {
        const persuasionLevel = this.persuasionScore >= 70 ? 'excellent' : 
                              this.persuasionScore >= 50 ? 'good' : 'developing';
        const ethicsLevel = this.ethicsScore >= 80 ? 'exemplary' : 
                           this.ethicsScore >= 60 ? 'good' : 'needs improvement';
        
        return `Congratulations! You've completed all campaigns. 
                Your persuasion skills are ${persuasionLevel} (${this.persuasionScore} points), 
                and your ethics rating is ${ethicsLevel} (${this.ethicsScore}%). 
                
                Remember: The best advertisers combine compelling messaging with honest, 
                ethical practices that build long-term trust with consumers.`;
    }
    
    // Restart the entire game
    restartGame() {
        this.currentCampaign = 0;
        this.currentScene = 0;
        this.persuasionScore = 0;
        this.ethicsScore = 100;
        this.gameHistory = [];
        this.isGameComplete = false;
        
        this.elements.decisionContainer.style.display = 'flex';
        this.elements.nextBtn.textContent = 'Continue →';
        this.elements.nextBtn.onclick = () => this.goNext();
        
        this.startGame();
    }
    
    // Disable decision buttons after selection
    disableDecisionButtons() {
        [this.elements.decision1, this.elements.decision2, this.elements.decision3].forEach(btn => {
            btn.disabled = true;
        });
    }
    
    // Update navigation button states
    updateNavigationState() {
        this.elements.nextBtn.disabled = true;
        this.elements.backBtn.disabled = this.currentCampaign === 0;
    }
    
    // Setup event listeners for enhanced interactivity
    setupEventListeners() {
        // Tooltip functionality for enhanced user guidance
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
            element.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
        });
        
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case '1':
                case '2':
                case '3':
                    if (!this.elements.decision1.disabled) {
                        this.makeDecision(parseInt(e.key));
                    }
                    break;
                case 'ArrowRight':
                    if (!this.elements.nextBtn.disabled) {
                        this.goNext();
                    }
                    break;
                case 'ArrowLeft':
                    if (!this.elements.backBtn.disabled) {
                        this.goBack();
                    }
                    break;
                case 'r':
                case 'R':
                    this.restartGame();
                    break;
            }
        });
        
        // Touch event optimization for mobile devices
        document.querySelectorAll('.decision-btn, .nav-btn').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('highlight');
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('highlight');
                }, 200);
            });
        });
    }
    
    // Tooltip functionality for additional guidance
    showTooltip(event) {
        const tooltip = this.elements.tooltip;
        tooltip.textContent = event.target.getAttribute('title');
        tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }
    
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }
    
    updateTooltipPosition(event) {
        const tooltip = this.elements.tooltip;
        const rect = event.target.getBoundingClientRect();
        
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
    }
}

// Global functions for HTML onclick handlers
function makeDecision(decisionIndex) {
    if (window.game) {
        window.game.makeDecision(decisionIndex);
    }
}

function goNext() {
    if (window.game) {
        window.game.goNext();
    }
}

function goBack() {
    if (window.game) {
        window.game.goBack();
    }
}

function restartGame() {
    if (window.game) {
        window.game.restartGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global game instance
    window.game = new PersuasionGame();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});