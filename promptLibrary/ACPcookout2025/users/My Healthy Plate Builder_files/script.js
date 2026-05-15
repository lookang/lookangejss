// My Healthy Plate Builder - Interactive Nutrition Education Tool
// This script handles drag-and-drop functionality, plate balance calculation,
// and educational feedback for students learning about balanced nutrition
// Modified: Removed categorization in sidebar and portion size labels on plate

class HealthyPlateBuilder {
    constructor() {
        // Initialize food database with nutritional information
        this.foodDatabase = {
            // Grains - provide energy through carbohydrates
            rice: {
                name: 'Rice',
                group: 'grains',
                icon: '🍚',
                description: 'Staple carbohydrate source providing energy for daily activities',
                nutrition: 'Rich in carbohydrates, provides sustained energy'
            },
            noodles: {
                name: 'Noodles',
                group: 'grains',
                icon: '🍜',
                description: 'Popular grain option, choose wholemeal for more fiber',
                nutrition: 'Carbohydrates for energy, B vitamins'
            },
            bread: {
                name: 'Wholemeal Bread',
                group: 'grains',
                icon: '🍞',
                description: 'Whole grain option with more fiber and nutrients',
                nutrition: 'Complex carbohydrates, fiber, B vitamins'
            },
            
            // Proteins - essential for growth and repair
            fish: {
                name: 'Fish',
                group: 'protein',
                icon: '🐟',
                description: 'Excellent protein source with healthy omega-3 fatty acids',
                nutrition: 'Complete protein, omega-3 fatty acids, vitamins D and B12'
            },
            tofu: {
                name: 'Tofu',
                group: 'protein',
                icon: '🧈',
                description: 'Plant-based protein made from soybeans',
                nutrition: 'Complete protein, calcium, isoflavones'
            },
            chicken: {
                name: 'Chicken',
                group: 'protein',
                icon: '🍗',
                description: 'Lean protein source for muscle growth and repair',
                nutrition: 'High-quality protein, B vitamins, selenium'
            },
            egg: {
                name: 'Egg',
                group: 'protein',
                icon: '🥚',
                description: 'Complete protein with all essential amino acids',
                nutrition: 'Complete protein, choline, vitamin D'
            },
            
            // Vegetables - provide vitamins, minerals, and fiber
            kangkung: {
                name: 'Kangkung',
                group: 'vegetables',
                icon: '🥬',
                description: 'Local leafy green vegetable rich in nutrients',
                nutrition: 'Vitamin A, vitamin C, iron, fiber'
            },
            broccoli: {
                name: 'Broccoli',
                group: 'vegetables',
                icon: '🥦',
                description: 'Nutrient-dense vegetable with antioxidants',
                nutrition: 'Vitamin C, vitamin K, folate, fiber'
            },
            carrot: {
                name: 'Carrot',
                group: 'vegetables',
                icon: '🥕',
                description: 'Orange vegetable rich in beta-carotene',
                nutrition: 'Beta-carotene (vitamin A), fiber, potassium'
            },
            
            // Fruits - provide vitamins and natural sugars
            apple: {
                name: 'Apple',
                group: 'fruits',
                icon: '🍎',
                description: 'Crunchy fruit high in fiber and vitamin C',
                nutrition: 'Fiber, vitamin C, antioxidants'
            },
            banana: {
                name: 'Banana',
                group: 'fruits',
                icon: '🍌',
                description: 'Energy-rich fruit with potassium',
                nutrition: 'Potassium, vitamin B6, natural sugars'
            },
            orange: {
                name: 'Orange',
                group: 'fruits',
                icon: '🍊',
                description: 'Citrus fruit packed with vitamin C',
                nutrition: 'Vitamin C, folate, fiber'
            }
        };
        
        // Track current plate composition
        this.plateComposition = {
            grains: [],
            protein: [],
            vegetables: [],
            fruits: []
        };
        
        // Educational hints for different scenarios - Modified: Updated hints to reflect uncategorized sidebar
        this.hints = [
            "💡 Tip: Aim for half your plate with fruits and vegetables!",
            "🌾 Try choosing whole grain options for better nutrition",
            "🐟 Include a variety of protein sources throughout the week",
            "🥕 Different colored vegetables provide different nutrients",
            "🍎 Fresh fruits are better than fruit juices",
            "⚖️ Balance is key - no single food group should dominate",
            "🎯 Drag foods from the sidebar to build your healthy plate!"
        ];
        
        this.currentHintIndex = 0;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startHintRotation();
        this.updateBalance();
    }
    
    setupEventListeners() {
        // Drag and drop functionality for food items
        const foodItems = document.querySelectorAll('.food-item');
        foodItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('mouseenter', this.showFoodTooltip.bind(this));
            item.addEventListener('mouseleave', this.hideFoodTooltip.bind(this));
        });
        
        // Drop zones on the plate
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));
            zone.addEventListener('dragenter', this.handleDragEnter.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
        
        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', this.resetPlate.bind(this));
        document.getElementById('compareBtn').addEventListener('click', this.showComparison.bind(this));
        document.getElementById('summaryBtn').addEventListener('click', this.showSummary.bind(this));
        
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', this.closeSummary.bind(this));
        document.getElementById('closeCompareModal').addEventListener('click', this.closeComparison.bind(this));
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            const summaryModal = document.getElementById('summaryModal');
            const compareModal = document.getElementById('compareModal');
            if (e.target === summaryModal) this.closeSummary();
            if (e.target === compareModal) this.closeComparison();
        });
    }
    
    handleDragStart(e) {
        // Store the food data being dragged
        const foodType = e.target.dataset.food;
        const foodGroup = e.target.dataset.group;
        e.dataTransfer.setData('text/plain', JSON.stringify({
            food: foodType,
            group: foodGroup
        }));
        e.target.style.opacity = '0.5';
    }
    
    handleDragOver(e) {
        e.preventDefault(); // Allow drop
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        e.target.closest('.plate-section').classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        // Only remove highlight if leaving the entire section
        if (!e.target.closest('.plate-section').contains(e.relatedTarget)) {
            e.target.closest('.plate-section').classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        const section = e.target.closest('.plate-section');
        section.classList.remove('drag-over');
        
        try {
            const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const targetGroup = section.dataset.group;
            
            // Check if food belongs to the correct group (with some flexibility)
            if (this.canPlaceFood(dragData.group, targetGroup)) {
                this.addFoodToPlate(dragData.food, targetGroup);
                this.updateBalance();
                this.provideFeedback(dragData.group, targetGroup);
            } else {
                this.showIncorrectPlacementFeedback(dragData.group, targetGroup);
            }
        } catch (error) {
            console.error('Error handling drop:', error);
        }
        
        // Reset opacity of all food items
        document.querySelectorAll('.food-item').forEach(item => {
            item.style.opacity = '1';
        });
    }
    
    canPlaceFood(foodGroup, targetGroup) {
        // Allow some flexibility - fruits can go in vegetables section and vice versa
        if (foodGroup === targetGroup) return true;
        if ((foodGroup === 'fruits' && targetGroup === 'vegetables') ||
            (foodGroup === 'vegetables' && targetGroup === 'fruits')) {
            return true;
        }
        return false;
    }
    
    addFoodToPlate(foodType, targetGroup) {
        const food = this.foodDatabase[foodType];
        if (!food) return;
        
        // Add to plate composition
        this.plateComposition[targetGroup].push(foodType);
        
        // Create visual representation on plate
        const dropZone = document.getElementById(targetGroup + 'Zone');
        const foodElement = document.createElement('div');
        foodElement.className = 'placed-food';
        foodElement.innerHTML = `
            <span class="food-icon">${food.icon}</span>
            <span>${food.name}</span>
        `;
        
        // Add click to remove functionality
        foodElement.addEventListener('click', () => {
            this.removeFoodFromPlate(foodType, targetGroup, foodElement);
        });
        
        // Add hover tooltip
        foodElement.addEventListener('mouseenter', (e) => {
            this.showFoodTooltip(e, foodType);
        });
        foodElement.addEventListener('mouseleave', this.hideFoodTooltip.bind(this));
        
        dropZone.appendChild(foodElement);
    }
    
    removeFoodFromPlate(foodType, group, element) {
        // Remove from composition
        const index = this.plateComposition[group].indexOf(foodType);
        if (index > -1) {
            this.plateComposition[group].splice(index, 1);
        }
        
        // Remove visual element
        element.remove();
        
        // Update balance
        this.updateBalance();
    }
    
    updateBalance() {
        const totalItems = Object.values(this.plateComposition).flat().length;
        
        if (totalItems === 0) {
            this.setBalanceIndicator('yellow', 'Start building your plate!');
            return;
        }
        
        // Calculate proportions
        const grainCount = this.plateComposition.grains.length;
        const proteinCount = this.plateComposition.protein.length;
        const vegetableCount = this.plateComposition.vegetables.length;
        const fruitCount = this.plateComposition.fruits.length;
        
        // Ideal ratios: 1/4 grains, 1/4 protein, 1/2 fruits+vegetables
        const idealGrains = totalItems * 0.25;
        const idealProtein = totalItems * 0.25;
        const idealVegFruit = totalItems * 0.5;
        const actualVegFruit = vegetableCount + fruitCount;
        
        // Calculate balance score
        let balanceScore = 0;
        let feedback = [];
        
        // Check grains
        if (grainCount === 0) {
            feedback.push("Add some grains for energy!");
        } else if (grainCount > idealGrains * 1.5) {
            feedback.push("Too many grains - try reducing!");
            balanceScore -= 1;
        } else if (Math.abs(grainCount - idealGrains) <= 1) {
            balanceScore += 1;
        }
        
        // Check protein
        if (proteinCount === 0) {
            feedback.push("Add protein for growth and repair!");
        } else if (proteinCount > idealProtein * 1.5) {
            feedback.push("Too much protein!");
            balanceScore -= 1;
        } else if (Math.abs(proteinCount - idealProtein) <= 1) {
            balanceScore += 1;
        }
        
        // Check vegetables and fruits
        if (actualVegFruit === 0) {
            feedback.push("Add fruits and vegetables!");
        } else if (actualVegFruit < idealVegFruit * 0.7) {
            feedback.push("Not enough fruits and vegetables!");
            balanceScore -= 1;
        } else if (actualVegFruit >= idealVegFruit * 0.8) {
            balanceScore += 1;
        }
        
        // Set indicator based on balance score
        if (balanceScore >= 2 && totalItems >= 4) {
            this.setBalanceIndicator('green', '✓ Well balanced plate!');
        } else if (balanceScore >= 0) {
            this.setBalanceIndicator('yellow', feedback.join(' ') || 'Getting better!');
        } else {
            this.setBalanceIndicator('red', feedback.join(' ') || 'Needs improvement!');
        }
    }
    
    setBalanceIndicator(color, text) {
        const light = document.getElementById('indicatorLight');
        const textElement = document.getElementById('balanceText');
        
        light.className = `indicator-light ${color}`;
        textElement.textContent = text;
    }
    
    provideFeedback(foodGroup, targetGroup) {
        if (foodGroup !== targetGroup) {
            // Flexible placement feedback
            this.updateHint("Good adaptation! Fruits and vegetables work well together.");
        }
    }
    
    showIncorrectPlacementFeedback(foodGroup, targetGroup) {
        const messages = {
            grains: "Grains belong in the grains section for energy!",
            protein: "Proteins help with growth - place in protein section!",
            vegetables: "Vegetables provide vitamins - try the vegetables section!",
            fruits: "Fruits are sweet and nutritious - place with fruits or vegetables!"
        };
        
        this.updateHint(messages[foodGroup] || "Try placing this food in the correct section!");
    }
    
    showFoodTooltip(e, foodType = null) {
        const tooltip = document.getElementById('foodTooltip');
        const food = foodType ? this.foodDatabase[foodType] : this.foodDatabase[e.target.dataset.food];
        
        if (!food) return;
        
        document.getElementById('tooltipTitle').textContent = food.name;
        document.getElementById('tooltipDescription').textContent = food.description;
        document.getElementById('tooltipNutrition').textContent = food.nutrition;
        
        tooltip.classList.add('show');
        
        // Position tooltip
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Adjust if tooltip goes off screen
        if (tooltip.offsetLeft < 0) {
            tooltip.style.left = '10px';
        }
        if (tooltip.offsetLeft + tooltip.offsetWidth > window.innerWidth) {
            tooltip.style.left = window.innerWidth - tooltip.offsetWidth - 10 + 'px';
        }
    }
    
    hideFoodTooltip() {
        document.getElementById('foodTooltip').classList.remove('show');
    }
    
    updateHint(message) {
        const hintElement = document.getElementById('hintMessage');
        hintElement.textContent = message;
        
        // Reset to rotating hints after 3 seconds
        setTimeout(() => {
            hintElement.textContent = this.hints[this.currentHintIndex];
        }, 3000);
    }
    
    startHintRotation() {
        setInterval(() => {
            this.currentHintIndex = (this.currentHintIndex + 1) % this.hints.length;
            const hintElement = document.getElementById('hintMessage');
            if (hintElement.textContent.startsWith('💡') || hintElement.textContent.startsWith('🌾') || hintElement.textContent.startsWith('🎯')) {
                hintElement.textContent = this.hints[this.currentHintIndex];
            }
        }, 5000);
    }
    
    resetPlate() {
        // Clear plate composition
        this.plateComposition = {
            grains: [],
            protein: [],
            vegetables: [],
            fruits: []
        };
        
        // Clear visual elements
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.innerHTML = '';
        });
        
        // Reset balance indicator
        this.updateBalance();
        
        // Show reset feedback
        this.updateHint("🔄 Plate reset! Start building your healthy meal again.");
    }
    
    showComparison() {
        document.getElementById('compareModal').style.display = 'block';
    }
    
    closeComparison() {
        document.getElementById('compareModal').style.display = 'none';
    }
    
    showSummary() {
        const summaryContent = document.getElementById('summaryContent');
        const totalItems = Object.values(this.plateComposition).flat().length;
        
        if (totalItems === 0) {
            summaryContent.innerHTML = '<p>Your plate is empty! Add some foods to see a summary.</p>';
        } else {
            let html = '<div class="summary-sections">';
            
            // Summary for each food group
            Object.keys(this.plateComposition).forEach(group => {
                const foods = this.plateComposition[group];
                const groupName = group.charAt(0).toUpperCase() + group.slice(1);
                
                html += `<div class="summary-section">`;
                html += `<h4>${groupName} (${foods.length} items)</h4>`;
                
                if (foods.length === 0) {
                    html += `<p>No ${group} selected</p>`;
                } else {
                    html += '<ul>';
                    foods.forEach(food => {
                        const foodData = this.foodDatabase[food];
                        html += `<li>${foodData.icon} ${foodData.name}</li>`;
                    });
                    html += '</ul>';
                }
                html += '</div>';
            });
            
            html += '</div>';
            
            // Balance assessment
            const grainCount = this.plateComposition.grains.length;
            const proteinCount = this.plateComposition.protein.length;
            const vegFruitCount = this.plateComposition.vegetables.length + this.plateComposition.fruits.length;
            
            html += '<div class="balance-assessment">';
            html += '<h4>Plate Balance Assessment</h4>';
            html += `<p><strong>Grains:</strong> ${grainCount} items (Target: ~25% of plate)</p>`;
            html += `<p><strong>Protein:</strong> ${proteinCount} items (Target: ~25% of plate)</p>`;
            html += `<p><strong>Fruits & Vegetables:</strong> ${vegFruitCount} items (Target: ~50% of plate)</p>`;
            
            // Overall assessment
            const isBalanced = grainCount > 0 && proteinCount > 0 && vegFruitCount >= totalItems * 0.4;
            if (isBalanced) {
                html += '<p style="color: #4CAF50; font-weight: bold;">✓ Your plate follows healthy eating guidelines!</p>';
            } else {
                html += '<p style="color: #f44336; font-weight: bold;">⚠ Your plate could be more balanced. Try adjusting the proportions.</p>';
            }
            html += '</div>';
            
            summaryContent.innerHTML = html;
        }
        
        document.getElementById('summaryModal').style.display = 'block';
    }
    
    closeSummary() {
        document.getElementById('summaryModal').style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HealthyPlateBuilder();
    
    // Add some visual enhancements
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Hide tooltips on resize to prevent positioning issues
    document.getElementById('foodTooltip').classList.remove('show');
});