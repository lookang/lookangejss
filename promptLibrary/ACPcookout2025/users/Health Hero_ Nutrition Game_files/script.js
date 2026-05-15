// Game state management
class HealthHeroGame {
    constructor() {
        this.currentCharacter = null;
        this.currentCondition = null;
        this.healthScore = 50;
        this.nutrients = { calcium: 0, iron: 0, fiber: 0 };
        this.currentScenario = 0;
        this.selectedFoods = [];
        
        // Food database with nutritional information
        this.foods = {
            osteoporosis: [
                { name: 'Milk', emoji: '🥛', calcium: 30, iron: 5, fiber: 0, good: true },
                { name: 'Cheese', emoji: '🧀', calcium: 25, iron: 3, fiber: 0, good: true },
                { name: 'Yogurt', emoji: '🍦', calcium: 20, iron: 2, fiber: 5, good: true },
                { name: 'Broccoli', emoji: '🥦', calcium: 15, iron: 8, fiber: 20, good: true },
                { name: 'Sardines', emoji: '🐟', calcium: 35, iron: 15, fiber: 0, good: true },
                { name: 'Almonds', emoji: '🌰', calcium: 18, iron: 10, fiber: 15, good: true },
                { name: 'Soda', emoji: '🥤', calcium: 0, iron: 0, fiber: 0, good: false },
                { name: 'Candy', emoji: '🍬', calcium: 0, iron: 0, fiber: 0, good: false }
            ],
            anaemia: [
                { name: 'Spinach', emoji: '🥬', calcium: 10, iron: 25, fiber: 15, good: true },
                { name: 'Red Meat', emoji: '🥩', calcium: 5, iron: 30, fiber: 0, good: true },
                { name: 'Lentils', emoji: '🫘', calcium: 8, iron: 20, fiber: 25, good: true },
                { name: 'Tofu', emoji: '🧈', calcium: 15, iron: 18, fiber: 5, good: true },
                { name: 'Eggs', emoji: '🥚', calcium: 5, iron: 15, fiber: 0, good: true },
                { name: 'Quinoa', emoji: '🌾', calcium: 6, iron: 12, fiber: 20, good: true },
                { name: 'White Bread', emoji: '🍞', calcium: 2, iron: 3, fiber: 2, good: false },
                { name: 'Ice Cream', emoji: '🍨', calcium: 8, iron: 1, fiber: 0, good: false }
            ],
            diabetes: [
                { name: 'Oats', emoji: '🥣', calcium: 5, iron: 8, fiber: 30, good: true },
                { name: 'Apple', emoji: '🍎', calcium: 2, iron: 2, fiber: 25, good: true },
                { name: 'Brown Rice', emoji: '🍚', calcium: 3, iron: 5, fiber: 20, good: true },
                { name: 'Salmon', emoji: '🐟', calcium: 8, iron: 12, fiber: 0, good: true },
                { name: 'Avocado', emoji: '🥑', calcium: 4, iron: 6, fiber: 28, good: true },
                { name: 'Nuts', emoji: '🥜', calcium: 12, iron: 15, fiber: 22, good: true },
                { name: 'Donut', emoji: '🍩', calcium: 2, iron: 1, fiber: 1, good: false },
                { name: 'Soda', emoji: '🥤', calcium: 0, iron: 0, fiber: 0, good: false }
            ]
        };
        
        // Scenarios for each condition
        this.scenarios = {
            osteoporosis: [
                { title: 'Breakfast with Grandma', text: 'Help Mei Ling choose calcium-rich foods for strong bones.' },
                { title: 'Lunch at the Café', text: 'Pick foods that will help prevent bone loss.' },
                { title: 'Dinner Planning', text: 'Create a bone-healthy evening meal.' }
            ],
            anaemia: [
                { title: 'Morning Energy Boost', text: 'Help Arjun choose iron-rich foods for healthy blood.' },
                { title: 'School Lunch', text: 'Select foods that will increase iron absorption.' },
                { title: 'After Sports Snack', text: 'Pick foods to replenish iron stores.' }
            ],
            diabetes: [
                { title: 'Balanced Breakfast', text: 'Help Siti choose low-sugar, high-fiber options.' },
                { title: 'Hawker Centre Visit', text: 'Make smart choices to keep blood sugar stable.' },
                { title: 'Evening Meal', text: 'Plan a diabetes-friendly dinner.' }
            ]
        };
        
        this.init();
    }
    
    // Initialize the game
    init() {
        this.bindEvents();
        this.showTooltipOnHover();
        this.updateDisplay();
    }
    
    // Show tooltip on container hover
    showTooltipOnHover() {
        const container = document.getElementById('gameContainer');
        const tooltip = document.getElementById('tooltip');
        
        container.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
        });
        
        container.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    }
    
    // Bind all event listeners
    bindEvents() {
        // Character selection
        document.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectCharacter(e));
        });
        
        // Action buttons
        document.getElementById('resetBtn').addEventListener('click', () => this.resetLevel());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextScenario());
        document.getElementById('backBtn').addEventListener('click', () => this.backToCharacters());
        document.getElementById('closeFeedbackBtn').addEventListener('click', () => this.closeFeedback());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.playAgain());
    }
    
    // Character selection handler
    selectCharacter(e) {
        const card = e.currentTarget;
        const character = card.dataset.character;
        const condition = card.dataset.condition;
        
        // Add selection animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
            this.startGame(character, condition);
        }, 150);
    }
    
    // Start the game with selected character
    startGame(character, condition) {
        this.currentCharacter = character;
        this.currentCondition = condition;
        this.currentScenario = 0;
        this.healthScore = 50;
        this.nutrients = { calcium: 0, iron: 0, fiber: 0 };
        this.selectedFoods = [];
        
        // Update character display
        const characterData = {
            meiLing: { emoji: '👵', name: 'Mei Ling' },
            arjun: { emoji: '👨', name: 'Arjun' },
            siti: { emoji: '👩', name: 'Siti' }
        };
        
        document.getElementById('selectedCharacterEmoji').textContent = characterData[character].emoji;
        document.getElementById('selectedCharacterName').textContent = characterData[character].name;
        
        // Show game screen
        document.getElementById('characterScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        
        this.loadScenario();
        this.generateFoodItems();
        this.updateDisplay();
    }
    
    // Load current scenario
    loadScenario() {
        const scenario = this.scenarios[this.currentCondition][this.currentScenario];
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioText').textContent = scenario.text;
    }
    
    // Generate food items for current condition
    generateFoodItems() {
        const foodGrid = document.getElementById('foodGrid');
        foodGrid.innerHTML = '';
        
        const foods = this.foods[this.currentCondition];
        
        foods.forEach((food, index) => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.dataset.foodIndex = index;
            
            foodItem.innerHTML = `
                <div class="food-emoji">${food.emoji}</div>
                <div class="food-name">${food.name}</div>
                <div class="food-nutrients">Ca:${food.calcium} Fe:${food.iron} Fi:${food.fiber}</div>
            `;
            
            foodItem.addEventListener('click', (e) => this.selectFood(e));
            foodGrid.appendChild(foodItem);
        });
    }
    
    // Food selection handler
    selectFood(e) {
        const foodItem = e.currentTarget;
        const foodIndex = parseInt(foodItem.dataset.foodIndex);
        const food = this.foods[this.currentCondition][foodIndex];
        
        // Visual feedback
        foodItem.style.transform = 'scale(0.9)';
        setTimeout(() => {
            foodItem.style.transform = '';
            foodItem.classList.add('selected');
        }, 100);
        
        // Add to selected foods
        this.selectedFoods.push(food);
        
        // Update nutrients
        this.nutrients.calcium += food.calcium;
        this.nutrients.iron += food.iron;
        this.nutrients.fiber += food.fiber;
        
        // Update health score
        if (food.good) {
            this.healthScore += 10;
            this.showFeedback(true, food);
        } else {
            this.healthScore -= 5;
            this.showFeedback(false, food);
        }
        
        // Clamp health score
        this.healthScore = Math.max(0, Math.min(100, this.healthScore));
        
        this.updateDisplay();
        this.checkLevelComplete();
        
        // Remove selection after delay
        setTimeout(() => {
            foodItem.classList.remove('selected');
        }, 1000);
    }
    
    // Show feedback modal
    showFeedback(isGood, food) {
        const modal = document.getElementById('feedbackModal');
        const icon = document.getElementById('feedbackIcon');
        const title = document.getElementById('feedbackTitle');
        const text = document.getElementById('feedbackText');
        
        if (isGood) {
            icon.textContent = '✅';
            title.textContent = 'Great Choice!';
            text.textContent = this.getPositiveFeedback(food);
        } else {
            icon.textContent = '❌';
            title.textContent = 'Try Again!';
            text.textContent = this.getNegativeFeedback(food);
        }
        
        modal.classList.remove('hidden');
    }
    
    // Get positive feedback based on condition and food
    getPositiveFeedback(food) {
        const messages = {
            osteoporosis: `High in calcium (${food.calcium}) - perfect for strong bones!`,
            anaemia: `Rich in iron (${food.iron}) - great for healthy blood!`,
            diabetes: `High in fiber (${food.fiber}) - helps control blood sugar!`
        };
        return messages[this.currentCondition] || 'Good nutritional choice!';
    }
    
    // Get negative feedback
    getNegativeFeedback(food) {
        const messages = {
            osteoporosis: 'Low in calcium - try foods like milk, cheese, or leafy greens!',
            anaemia: 'Low in iron - choose foods like spinach, red meat, or lentils!',
            diabetes: 'High in sugar or low in fiber - pick whole grains and vegetables!'
        };
        return messages[this.currentCondition] || 'This food doesn\'t help with your condition.';
    }
    
    // Close feedback modal
    closeFeedback() {
        document.getElementById('feedbackModal').classList.add('hidden');
    }
    
    // Check if level is complete
    checkLevelComplete() {
        const targetNutrient = this.getTargetNutrient();
        const currentValue = this.nutrients[targetNutrient];
        
        if (currentValue >= 100 && this.healthScore >= 80) {
            document.getElementById('nextLevelBtn').disabled = false;
            
            // Show victory if all scenarios complete
            if (this.currentScenario >= this.scenarios[this.currentCondition].length - 1) {
                setTimeout(() => this.showVictory(), 1000);
            }
        }
    }
    
    // Get target nutrient for current condition
    getTargetNutrient() {
        const targets = {
            osteoporosis: 'calcium',
            anaemia: 'iron',
            diabetes: 'fiber'
        };
        return targets[this.currentCondition];
    }
    
    // Show victory modal
    showVictory() {
        const modal = document.getElementById('victoryModal');
        const text = document.getElementById('victoryText');
        
        const messages = {
            osteoporosis: 'You\'ve helped Mei Ling build stronger bones with calcium-rich foods!',
            anaemia: 'You\'ve helped Arjun fight anaemia with iron-rich nutrition!',
            diabetes: 'You\'ve helped Siti manage diabetes with fiber-rich, low-sugar choices!'
        };
        
        text.textContent = messages[this.currentCondition];
        modal.classList.remove('hidden');
    }
    
    // Update all display elements
    updateDisplay() {
        // Health bar
        const healthFill = document.getElementById('healthFill');
        const healthScore = document.getElementById('healthScore');
        healthFill.style.width = `${this.healthScore}%`;
        healthScore.textContent = this.healthScore;
        
        // Nutrient progress bars
        ['calcium', 'iron', 'fiber'].forEach(nutrient => {
            const progress = document.getElementById(`${nutrient}Progress`);
            const value = document.getElementById(`${nutrient}Value`);
            const percentage = Math.min(100, this.nutrients[nutrient]);
            
            progress.style.width = `${percentage}%`;
            value.textContent = `${this.nutrients[nutrient]}/100`;
        });
    }
    
    // Reset current level
    resetLevel() {
        this.nutrients = { calcium: 0, iron: 0, fiber: 0 };
        this.healthScore = 50;
        this.selectedFoods = [];
        
        // Remove all selections
        document.querySelectorAll('.food-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        document.getElementById('nextLevelBtn').disabled = true;
        this.updateDisplay();
    }
    
    // Move to next scenario
    nextScenario() {
        this.currentScenario++;
        
        if (this.currentScenario < this.scenarios[this.currentCondition].length) {
            this.resetLevel();
            this.loadScenario();
        } else {
            this.showVictory();
        }
    }
    
    // Back to character selection
    backToCharacters() {
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('characterScreen').classList.remove('hidden');
        
        // Reset game state
        this.currentCharacter = null;
        this.currentCondition = null;
        this.currentScenario = 0;
    }
    
    // Play again after victory
    playAgain() {
        document.getElementById('victoryModal').classList.add('hidden');
        this.backToCharacters();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HealthHeroGame();
});

// Handle window resize for responsive height
window.addEventListener('resize', () => {
    const container = document.getElementById('gameContainer');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});

// Touch event optimizations for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
}