// Interactive Outdoor Day Trip Essentials Game
// Designed for Primary 4 students learning about outdoor preparation
// Modified with larger icons and Arial 16px font for better visibility
// Updated to include Umbrella item and removed Cold Day weather option
// Removed walking shoes and added disposable and reusable water bottles
// Changed reusable water bottle icon from 🍼 to 🍶 for a plastic water bottle appearance
// Added sweet drinks, chocolate, and potato chips; changed sandwich to wholemeal sandwich
// Added Low-Fat Milk under food and drinks, and Sunglasses under protection items
// UPDATED: Removed sweet drinks, chocolate, and potato chips from essential items for both weather conditions
// UPDATED: Added randomization of food and drink items positions

class OutdoorTripGame {
    constructor() {
        // Game state variables
        this.selectedWeather = null;
        this.itemsInBag = [];
        this.score = 0;
        this.maxScore = 0;
        
        // Essential items for each weather condition
        // UPDATED: Removed 'sweetdrinks', 'chocolate', and 'potatochips' from essential items
        // These items remain as distractors but are not considered correct answers
        this.essentialItems = {
            sunny: {
                protection: ['hat', 'sunscreen', 'sunglasses', 'umbrella', 'insectrepellent'],
                food: ['disposablewater', 'reusablewater', 'lowfatmilk', 'wholemeal', 'fruits', 'snacks']
            },
            rainy: {
                protection: ['raincoat', 'umbrella', 'insectrepellent'],
                food: ['disposablewater', 'reusablewater', 'lowfatmilk', 'wholemeal', 'fruits', 'snacks']
            }
        };
        
        this.init();
    }
    
    init() {
        // Randomize food items positions on page load
        this.randomizeFoodItems();
        this.setupEventListeners();
        this.updateScoreDisplay();
    }
    
    // NEW METHOD: Randomize the positions of food and drink items
    randomizeFoodItems() {
        const foodContainer = document.getElementById('foodItemsContainer');
        const foodItems = Array.from(foodContainer.children);
        
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = foodItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [foodItems[i], foodItems[j]] = [foodItems[j], foodItems[i]];
        }
        
        // Clear container and append items in randomized order
        foodContainer.innerHTML = '';
        foodItems.forEach(item => {
            foodContainer.appendChild(item);
        });
    }
    
    setupEventListeners() {
        // Weather selection
        document.querySelectorAll('.weather-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectWeather(e.target.closest('.weather-card')));
        });
        
        // Drag and drop for items
        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch support for mobile
            item.addEventListener('touchstart', (e) => this.handleTouchStart(e), {passive: false});
            item.addEventListener('touchmove', (e) => this.handleTouchMove(e), {passive: false});
            item.addEventListener('touchend', (e) => this.handleTouchEnd(e));
            
            // Click to add item (alternative to drag)
            item.addEventListener('click', (e) => this.addItemToBag(e.target.closest('.item')));
        });
        
        // Backpack drop zone
        const backpack = document.querySelector('.backpack');
        backpack.addEventListener('dragover', (e) => this.handleDragOver(e));
        backpack.addEventListener('drop', (e) => this.handleDrop(e));
        backpack.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        
        // Control buttons
        document.getElementById('checkBtn').addEventListener('click', () => this.checkBackpack());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        
        // Tooltip functionality
        this.setupTooltips();
    }
    
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.add('show');
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('show')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }
    
    positionTooltip(event, tooltip) {
        const rect = document.querySelector('.container').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }
    
    selectWeather(weatherCard) {
        // Remove previous selection
        document.querySelectorAll('.weather-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Select new weather
        weatherCard.classList.add('selected');
        this.selectedWeather = weatherCard.dataset.weather;
        
        // Reset game state
        this.itemsInBag = [];
        this.updateItemsDisplay();
        this.highlightRelevantItems();
        this.updateScoreDisplay();
        
        // Clear previous feedback
        document.querySelectorAll('.item').forEach(item => {
            item.classList.remove('correct-choice', 'incorrect-choice');
        });
    }
    
    highlightRelevantItems() {
        if (!this.selectedWeather) return;
        
        document.querySelectorAll('.item').forEach(item => {
            const itemWeather = item.dataset.weather;
            const isRelevant = itemWeather.includes(this.selectedWeather);
            
            item.classList.toggle('disabled', false); // Enable all items initially
            
            if (isRelevant) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0.7';
            }
        });
    }
    
    // Drag and drop handlers
    handleDragStart(e) {
        if (!this.selectedWeather) {
            e.preventDefault();
            this.showMessage("Please select a weather condition first!");
            return;
        }
        
        e.dataTransfer.setData('text/plain', e.target.dataset.item);
        e.target.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const itemName = e.dataTransfer.getData('text/plain');
        const item = document.querySelector(`[data-item="${itemName}"]`);
        
        if (item) {
            this.addItemToBag(item);
        }
    }
    
    // Touch handlers for mobile support
    handleTouchStart(e) {
        if (!this.selectedWeather) {
            this.showMessage("Please select a weather condition first!");
            return;
        }
        
        this.touchItem = e.target.closest('.item');
        this.touchStartPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }
    
    handleTouchMove(e) {
        if (!this.touchItem) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.touchStartPos.x;
        const deltaY = touch.clientY - this.touchStartPos.y;
        
        // Visual feedback for dragging
        if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
            this.touchItem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.9)`;
            this.touchItem.style.zIndex = '1000';
        }
    }
    
    handleTouchEnd(e) {
        if (!this.touchItem) return;
        
        // Reset visual state
        this.touchItem.style.transform = '';
        this.touchItem.style.zIndex = '';
        
        // Check if dropped on backpack
        const touch = e.changedTouches[0];
        const backpack = document.querySelector('.backpack');
        const backpackRect = backpack.getBoundingClientRect();
        
        if (touch.clientX >= backpackRect.left && 
            touch.clientX <= backpackRect.right &&
            touch.clientY >= backpackRect.top && 
            touch.clientY <= backpackRect.bottom) {
            this.addItemToBag(this.touchItem);
        }
        
        this.touchItem = null;
    }
    
    addItemToBag(itemElement) {
        if (!this.selectedWeather) {
            this.showMessage("Please select a weather condition first!");
            return;
        }
        
        const itemName = itemElement.dataset.item;
        const itemCategory = itemElement.dataset.category;
        
        // Check if item already in bag
        if (this.itemsInBag.some(item => item.name === itemName)) {
            this.showMessage("This item is already in your backpack!");
            return;
        }
        
        // Add item to bag
        this.itemsInBag.push({
            name: itemName,
            category: itemCategory,
            element: itemElement
        });
        
        // Visual feedback
        itemElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            itemElement.style.transform = '';
        }, 200);
        
        this.updateItemsDisplay();
        this.updateScoreDisplay();
    }
    
    removeItemFromBag(itemName) {
        this.itemsInBag = this.itemsInBag.filter(item => item.name !== itemName);
        this.updateItemsDisplay();
        this.updateScoreDisplay();
    }
    
    updateItemsDisplay() {
        const container = document.getElementById('itemsInBag');
        container.innerHTML = '';
        
        this.itemsInBag.forEach(item => {
            const bagItem = document.createElement('div');
            bagItem.className = 'bag-item';
            bagItem.innerHTML = `
                <span>${item.element.querySelector('.item-icon').textContent}</span>
                <span>${item.element.querySelector('span').textContent}</span>
            `;
            bagItem.addEventListener('click', () => this.removeItemFromBag(item.name));
            bagItem.title = 'Click to remove from backpack';
            container.appendChild(bagItem);
        });
    }
    
    checkBackpack() {
        if (!this.selectedWeather) {
            this.showMessage("Please select a weather condition first!");
            return;
        }
        
        const essential = this.essentialItems[this.selectedWeather];
        const requiredItems = [...essential.protection, ...essential.food];
        
        let correctItems = 0;
        let incorrectItems = 0;
        
        // Clear previous feedback
        document.querySelectorAll('.item').forEach(item => {
            item.classList.remove('correct-choice', 'incorrect-choice');
        });
        
        document.querySelectorAll('.bag-item').forEach(bagItem => {
            bagItem.classList.remove('correct', 'incorrect');
        });
        
        // Check each item in bag
        this.itemsInBag.forEach((item, index) => {
            const bagItemElement = document.querySelectorAll('.bag-item')[index];
            
            if (requiredItems.includes(item.name)) {
                correctItems++;
                item.element.classList.add('correct-choice');
                bagItemElement.classList.add('correct');
            } else {
                incorrectItems++;
                item.element.classList.add('incorrect-choice');
                bagItemElement.classList.add('incorrect');
            }
        });
        
        // Check for missing essential items
        const missingItems = requiredItems.filter(required => 
            !this.itemsInBag.some(bagItem => bagItem.name === required)
        );
        
        this.score = correctItems;
        this.maxScore = requiredItems.length;
        
        // Provide detailed feedback
        let feedback = '';
        if (missingItems.length === 0 && incorrectItems === 0) {
            feedback = `🎉 Perfect! You have all ${requiredItems.length} essential items for a ${this.selectedWeather} day!`;
            document.querySelector('.backpack').classList.add('celebration');
            setTimeout(() => {
                document.querySelector('.backpack').classList.remove('celebration');
            }, 600);
        } else {
            feedback = `Score: ${correctItems}/${requiredItems.length} essential items. `;
            if (missingItems.length > 0) {
                // Convert item names to more readable format for feedback
                const readableMissingItems = missingItems.map(item => {
                    if (item === 'disposablewater') return 'Disposable Water Bottle';
                    if (item === 'reusablewater') return 'Reusable Water Bottle';
                    if (item === 'lowfatmilk') return 'Low-Fat Milk';
                    if (item === 'insectrepellent') return 'Insect Repellent';
                    if (item === 'wholemeal') return 'Wholemeal Sandwich';
                    if (item === 'sunglasses') return 'Sunglasses';
                    return item.charAt(0).toUpperCase() + item.slice(1);
                });
                feedback += `Missing: ${readableMissingItems.join(', ')}. `;
            }
            if (incorrectItems > 0) {
                feedback += `Remove ${incorrectItems} unnecessary item(s).`;
            }
        }
        
        this.showMessage(feedback);
    }
    
    resetGame() {
        this.selectedWeather = null;
        this.itemsInBag = [];
        this.score = 0;
        this.maxScore = 0;
        
        // Clear selections and feedback
        document.querySelectorAll('.weather-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelectorAll('.item').forEach(item => {
            item.classList.remove('correct-choice', 'incorrect-choice', 'disabled');
            item.style.opacity = '1';
            item.style.transform = '';
        });
        
        // Randomize food items positions again on reset
        this.randomizeFoodItems();
        
        this.updateItemsDisplay();
        this.updateScoreDisplay();
    }
    
    updateScoreDisplay() {
        const scoreText = document.getElementById('scoreText');
        
        if (!this.selectedWeather) {
            scoreText.textContent = 'Choose a weather condition to start!';
        } else if (this.itemsInBag.length === 0) {
            scoreText.textContent = `Selected: ${this.selectedWeather.charAt(0).toUpperCase() + this.selectedWeather.slice(1)} day. Start packing!`;
        } else {
            scoreText.textContent = `Items packed: ${this.itemsInBag.length}. Click "Check My Backpack" when ready!`;
        }
    }
    
    showMessage(message) {
        const scoreText = document.getElementById('scoreText');
        const originalText = scoreText.textContent;
        
        scoreText.textContent = message;
        scoreText.style.color = message.includes('🎉') ? '#4CAF50' : '#333';
        
        // Revert to original after 4 seconds
        setTimeout(() => {
            scoreText.style.color = '#333';
            this.updateScoreDisplay();
        }, 4000);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OutdoorTripGame();
});

// Prevent default drag behavior on images and other elements
document.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('item')) {
        e.preventDefault();
    }
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed
    const container = document.querySelector('.container');
    if (window.innerHeight > 600 && window.innerWidth > 768) {
        document.body.style.height = '90vh';
    } else {
        document.body.style.height = '450px';
    }
});