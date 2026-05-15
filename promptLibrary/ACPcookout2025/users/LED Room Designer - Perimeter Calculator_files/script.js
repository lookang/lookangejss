// LED Room Designer - Interactive Perimeter Learning Game
// Designed for Primary 5-6 students to learn perimeter calculation through room decoration

class LEDRoomDesigner {
    constructor() {
        // Game state management
        this.budget = 50.00; // Starting budget in dollars
        this.cartTotal = 0.00;
        this.selectedFurniture = null;
        this.placedFurniture = [];
        this.ledStrips = [];
        this.selectedColor = '#ff0000';
        this.achievements = new Set();
        this.measurementMode = false;
        
        // DOM elements
        this.gameContainer = document.getElementById('gameContainer');
        this.room = document.getElementById('room');
        this.furnitureContainer = document.getElementById('furnitureContainer');
        this.ledContainer = document.getElementById('ledContainer');
        this.budgetDisplay = document.getElementById('budgetAmount');
        this.cartDisplay = document.getElementById('cartTotal');
        this.tooltip = document.getElementById('tooltip');
        
        // Initialize the game
        this.init();
    }

    init() {
        console.log('Initializing LED Room Designer game...');
        this.setupEventListeners();
        this.updateDisplay();
        this.createRoomBoundaries();
    }

    // Set up all event listeners for interactive elements
    setupEventListeners() {
        // Furniture catalog drag and drop
        const furnitureItems = document.querySelectorAll('.furniture-item');
        furnitureItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('click', (e) => this.handleFurnitureClick(e));
        });

        // Room drop zone
        this.room.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.room.addEventListener('drop', (e) => this.handleDrop(e));
        this.room.addEventListener('click', (e) => this.handleRoomClick(e));

        // Toolbar buttons
        document.getElementById('measureTool').addEventListener('click', () => this.toggleMeasureMode());
        document.getElementById('shopBtn').addEventListener('click', () => this.openShop());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetRoom());
        document.getElementById('previewBtn').addEventListener('click', () => this.previewLEDs());
        document.getElementById('installBtn').addEventListener('click', () => this.installLEDs());

        // Shop modal
        document.getElementById('ledLength').addEventListener('input', () => this.calculateShopCost());
        document.getElementById('addToCartBtn').addEventListener('click', () => this.addToCart());
        document.getElementById('cancelShopBtn').addEventListener('click', () => this.closeShop());

        // Color picker
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', (e) => this.selectColor(e));
        });

        // Measure modal
        document.getElementById('buyLEDBtn').addEventListener('click', () => this.buyMeasuredLED());
        document.getElementById('closeMeasureBtn').addEventListener('click', () => this.closeMeasureModal());

        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e));
        });

        // Tooltip handling
        document.addEventListener('mouseover', (e) => this.showTooltip(e));
        document.addEventListener('mouseout', () => this.hideTooltip());
        document.addEventListener('mousemove', (e) => this.moveTooltip(e));

        // Touch support for mobile devices
        this.setupTouchSupport();
    }

    // Handle furniture drag start
    handleDragStart(e) {
        const item = e.target.closest('.furniture-item');
        this.selectedFurniture = {
            type: item.dataset.type,
            width: parseInt(item.dataset.width),
            height: parseInt(item.dataset.height),
            name: item.dataset.name
        };
        e.dataTransfer.effectAllowed = 'copy';
        console.log('Started dragging furniture:', this.selectedFurniture.name);
    }

    // Handle furniture click for mobile
    handleFurnitureClick(e) {
        const item = e.target.closest('.furniture-item');
        this.selectedFurniture = {
            type: item.dataset.type,
            width: parseInt(item.dataset.width),
            height: parseInt(item.dataset.height),
            name: item.dataset.name
        };
        
        // Visual feedback for selection
        document.querySelectorAll('.furniture-item').forEach(f => f.classList.remove('selected'));
        item.classList.add('selected');
        
        this.showFeedback(`Selected ${this.selectedFurniture.name}. Click in room to place.`, 'info');
    }

    // Handle drag over room
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    // Handle drop in room
    handleDrop(e) {
        e.preventDefault();
        if (!this.selectedFurniture) return;

        const rect = this.room.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.placeFurniture(x, y);
    }

    // Handle room click (for mobile placement)
    handleRoomClick(e) {
        if (this.measurementMode) {
            this.measureFurniture(e);
            return;
        }

        if (!this.selectedFurniture) return;

        const rect = this.room.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.placeFurniture(x, y);
    }

    // Place furniture in the room
    placeFurniture(x, y) {
        if (!this.selectedFurniture) return;

        // Create furniture element
        const furniture = document.createElement('div');
        furniture.className = 'placed-furniture';
        furniture.style.width = this.selectedFurniture.width + 'px';
        furniture.style.height = this.selectedFurniture.height + 'px';
        furniture.style.left = Math.max(0, Math.min(x - this.selectedFurniture.width/2, 
            this.room.clientWidth - this.selectedFurniture.width)) + 'px';
        furniture.style.top = Math.max(0, Math.min(y - this.selectedFurniture.height/2, 
            this.room.clientHeight - this.selectedFurniture.height)) + 'px';

        // Set furniture appearance based on type
        this.setFurnitureAppearance(furniture, this.selectedFurniture);

        // Add furniture data
        furniture.dataset.type = this.selectedFurniture.type;
        furniture.dataset.width = this.selectedFurniture.width;
        furniture.dataset.height = this.selectedFurniture.height;
        furniture.dataset.name = this.selectedFurniture.name;
        furniture.textContent = this.selectedFurniture.name;

        // Make furniture draggable within room
        this.makeFurnitureDraggable(furniture);

        // Add to room and tracking array
        this.furnitureContainer.appendChild(furniture);
        this.placedFurniture.push(furniture);

        console.log(`Placed ${this.selectedFurniture.name} at (${x}, ${y})`);
        this.selectedFurniture = null;
        
        // Clear selection visual feedback
        document.querySelectorAll('.furniture-item').forEach(f => f.classList.remove('selected'));
        
        this.showFeedback(`${furniture.dataset.name} placed! Click measure tool to calculate perimeter.`, 'success');
    }

    // Set furniture visual appearance
    setFurnitureAppearance(element, furniture) {
        switch(furniture.name.toLowerCase()) {
            case 'bed':
                element.style.background = 'linear-gradient(45deg, #8e44ad, #9b59b6)';
                break;
            case 'desk':
                element.style.background = 'linear-gradient(45deg, #e67e22, #f39c12)';
                break;
            case 'nightstand':
                element.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                break;
            case 'corner shelf':
                element.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                if (furniture.type === 'triangle') {
                    element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                }
                break;
        }
    }

    // Make placed furniture draggable within room
    makeFurnitureDraggable(furniture) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        furniture.addEventListener('mousedown', startDrag);
        furniture.addEventListener('touchstart', startDrag);

        function startDrag(e) {
            isDragging = true;
            furniture.style.cursor = 'grabbing';
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            startX = clientX;
            startY = clientY;
            initialX = parseInt(furniture.style.left);
            initialY = parseInt(furniture.style.top);

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
        }

        const drag = (e) => {
            if (!isDragging) return;
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            
            const newX = Math.max(0, Math.min(initialX + deltaX, 
                this.room.clientWidth - furniture.offsetWidth));
            const newY = Math.max(0, Math.min(initialY + deltaY, 
                this.room.clientHeight - furniture.offsetHeight));
            
            furniture.style.left = newX + 'px';
            furniture.style.top = newY + 'px';
        };

        const stopDrag = () => {
            isDragging = false;
            furniture.style.cursor = 'move';
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', stopDrag);
        };
    }

    // Toggle measurement mode
    toggleMeasureMode() {
        this.measurementMode = !this.measurementMode;
        const btn = document.getElementById('measureTool');
        
        if (this.measurementMode) {
            btn.style.background = '#e74c3c';
            btn.textContent = '📏 Measuring...';
            this.showFeedback('Click on furniture to measure its perimeter', 'info');
            
            // Highlight all furniture
            this.placedFurniture.forEach(furniture => {
                furniture.classList.add('measuring');
            });
        } else {
            btn.style.background = '#3498db';
            btn.innerHTML = '<span class="icon">📏</span>Measure';
            
            // Remove highlighting
            this.placedFurniture.forEach(furniture => {
                furniture.classList.remove('measuring');
            });
        }
    }

    // Measure furniture perimeter
    measureFurniture(e) {
        const furniture = e.target.closest('.placed-furniture');
        if (!furniture) return;

        const type = furniture.dataset.type;
        const width = parseInt(furniture.dataset.width);
        const height = parseInt(furniture.dataset.height);
        const name = furniture.dataset.name;

        let perimeter, formula, steps;

        // Calculate perimeter based on shape type
        switch(type) {
            case 'rectangle':
                perimeter = 2 * (width + height);
                formula = 'P = 2l + 2w';
                steps = [
                    `Length (l) = ${width}cm`,
                    `Width (w) = ${height}cm`,
                    `P = 2(${width}) + 2(${height})`,
                    `P = ${2*width} + ${2*height}`,
                    `P = ${perimeter}cm`
                ];
                break;
            case 'square':
                perimeter = 4 * width;
                formula = 'P = 4s';
                steps = [
                    `Side (s) = ${width}cm`,
                    `P = 4 × ${width}`,
                    `P = ${perimeter}cm`
                ];
                break;
            case 'triangle':
                // For simplicity, assume equilateral triangle with base = width
                const side = width;
                perimeter = 3 * side;
                formula = 'P = a + b + c';
                steps = [
                    `This is an equilateral triangle`,
                    `All sides = ${side}cm`,
                    `P = ${side} + ${side} + ${side}`,
                    `P = ${perimeter}cm`
                ];
                break;
        }

        // Show measurement modal
        this.showMeasurementModal(name, formula, steps, perimeter);
        
        // Award achievement for first calculation
        if (!this.achievements.has('first-calculation')) {
            this.unlockAchievement('first-calculation');
        }
    }

    // Show measurement modal with calculation steps
    showMeasurementModal(name, formula, steps, perimeter) {
        const modal = document.getElementById('measureModal');
        const display = document.getElementById('measurementDisplay');
        const stepsContainer = document.getElementById('calculationSteps');
        const buyBtn = document.getElementById('buyLEDBtn');

        display.innerHTML = `
            <h4>Measuring: ${name}</h4>
            <p><strong>Formula:</strong> ${formula}</p>
        `;

        stepsContainer.innerHTML = steps.map(step => 
            `<div class="calculation-step">${step}</div>`
        ).join('');

        // Store perimeter for purchase
        buyBtn.dataset.perimeter = perimeter;
        buyBtn.disabled = false;

        modal.classList.add('show');
        console.log(`Calculated perimeter: ${perimeter}cm for ${name}`);
    }

    // Buy LED strip based on measurement
    buyMeasuredLED() {
        const perimeter = parseFloat(document.getElementById('buyLEDBtn').dataset.perimeter);
        const lengthInMeters = perimeter / 100; // Convert cm to meters
        
        document.getElementById('ledLength').value = lengthInMeters.toFixed(2);
        this.calculateShopCost();
        
        this.closeMeasureModal();
        this.openShop();
    }

    // Close measurement modal
    closeMeasureModal() {
        document.getElementById('measureModal').classList.remove('show');
        this.measurementMode = false;
        this.toggleMeasureMode(); // Reset measure button
    }

    // Open LED strip shop
    openShop() {
        document.getElementById('shopModal').classList.add('show');
        this.calculateShopCost();
    }

    // Close LED strip shop
    closeShop() {
        document.getElementById('shopModal').classList.remove('show');
    }

    // Calculate shop cost based on length input
    calculateShopCost() {
        const length = parseFloat(document.getElementById('ledLength').value) || 0;
        const pricePerMeter = 2.50;
        const cost = length * pricePerMeter;
        
        document.getElementById('calculatedCost').textContent = cost.toFixed(2);
        
        // Enable/disable add to cart based on budget
        const addBtn = document.getElementById('addToCartBtn');
        addBtn.disabled = cost > this.budget || length <= 0;
    }

    // Select LED color
    selectColor(e) {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        this.selectedColor = e.target.dataset.color;
        console.log('Selected LED color:', this.selectedColor);
    }

    // Add LED strip to cart
    addToCart() {
        const length = parseFloat(document.getElementById('ledLength').value);
        const cost = length * 2.50;
        
        if (cost > this.budget) {
            this.showFeedback('Not enough budget! Try a shorter length.', 'error');
            return;
        }

        this.budget -= cost;
        this.cartTotal += cost;
        
        // Add to LED strips array
        this.ledStrips.push({
            length: length,
            cost: cost,
            color: this.selectedColor
        });

        this.updateDisplay();
        this.closeShop();
        this.showFeedback(`Added ${length}m LED strip to cart!`, 'success');
        
        // Enable install button if we have LED strips
        document.getElementById('installBtn').disabled = this.ledStrips.length === 0;
        
        // Check budget achievement
        if (this.budget > 0 && this.ledStrips.length > 0 && !this.achievements.has('budget-master')) {
            this.unlockAchievement('budget-master');
        }
    }

    // Preview LED installation
    previewLEDs() {
        if (this.ledStrips.length === 0) {
            this.showFeedback('Add LED strips to cart first!', 'error');
            return;
        }

        // Clear existing previews
        this.ledContainer.innerHTML = '';

        // Show preview for each furniture piece
        this.placedFurniture.forEach((furniture, index) => {
            if (index < this.ledStrips.length) {
                this.createLEDPreview(furniture, this.ledStrips[index]);
            }
        });

        this.showFeedback('LED preview shown! Click Install to finalize.', 'info');
    }

    // Create LED preview around furniture
    createLEDPreview(furniture, ledStrip) {
        const rect = furniture.getBoundingClientRect();
        const roomRect = this.room.getBoundingClientRect();
        
        const x = rect.left - roomRect.left;
        const y = rect.top - roomRect.top;
        const width = furniture.offsetWidth;
        const height = furniture.offsetHeight;

        // Create LED strips around perimeter
        const strips = [
            // Top
            { x: x, y: y - 2, width: width, height: 4 },
            // Right
            { x: x + width - 2, y: y, width: 4, height: height },
            // Bottom
            { x: x, y: y + height - 2, width: width, height: 4 },
            // Left
            { x: x - 2, y: y, width: 4, height: height }
        ];

        strips.forEach(strip => {
            const ledElement = document.createElement('div');
            ledElement.className = 'led-strip';
            ledElement.style.left = strip.x + 'px';
            ledElement.style.top = strip.y + 'px';
            ledElement.style.width = strip.width + 'px';
            ledElement.style.height = strip.height + 'px';
            ledElement.style.background = ledStrip.color;
            ledElement.style.boxShadow = `0 0 10px ${ledStrip.color}`;
            
            this.ledContainer.appendChild(ledElement);
        });
    }

    // Install LEDs permanently
    installLEDs() {
        if (this.ledStrips.length === 0) {
            this.showFeedback('No LED strips in cart!', 'error');
            return;
        }

        // Make LED strips permanent
        const ledElements = this.ledContainer.querySelectorAll('.led-strip');
        ledElements.forEach(led => {
            led.style.opacity = '1';
            led.classList.add('installed');
        });

        this.showFeedback('LEDs installed successfully! Room looks amazing!', 'success');
        
        // Award perfect fit achievement if calculations were accurate
        if (!this.achievements.has('perfect-fit')) {
            this.unlockAchievement('perfect-fit');
        }

        // Disable install button
        document.getElementById('installBtn').disabled = true;
    }

    // Reset room to start over
    resetRoom() {
        // Clear all furniture and LEDs
        this.furnitureContainer.innerHTML = '';
        this.ledContainer.innerHTML = '';
        this.placedFurniture = [];
        this.ledStrips = [];
        
        // Reset budget and cart
        this.budget = 50.00;
        this.cartTotal = 0.00;
        
        // Reset UI
        this.updateDisplay();
        document.getElementById('installBtn').disabled = true;
        this.measurementMode = false;
        
        // Clear selections
        document.querySelectorAll('.furniture-item').forEach(f => f.classList.remove('selected'));
        
        this.showFeedback('Room reset! Start decorating again.', 'info');
        console.log('Room reset completed');
    }

    // Update budget and cart display
    updateDisplay() {
        this.budgetDisplay.textContent = '$' + this.budget.toFixed(2);
        this.cartDisplay.textContent = '$' + this.cartTotal.toFixed(2);
    }

    // Unlock achievement badge
    unlockAchievement(achievementId) {
        this.achievements.add(achievementId);
        const badge = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (badge) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
            console.log(`Achievement unlocked: ${achievementId}`);
        }
    }

    // Show feedback message
    showFeedback(message, type = 'info') {
        const feedback = document.getElementById('successFeedback');
        const icon = feedback.querySelector('.feedback-icon');
        const text = feedback.querySelector('.feedback-text');
        
        // Set icon based on type
        switch(type) {
            case 'success':
                icon.textContent = '✅';
                feedback.style.background = '#27ae60';
                break;
            case 'error':
                icon.textContent = '❌';
                feedback.style.background = '#e74c3c';
                break;
            case 'info':
                icon.textContent = 'ℹ️';
                feedback.style.background = '#3498db';
                break;
        }
        
        text.textContent = message;
        feedback.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }

    // Tooltip functionality
    showTooltip(e) {
        const element = e.target;
        const title = element.getAttribute('title') || element.closest('[title]')?.getAttribute('title');
        
        if (title) {
            this.tooltip.textContent = title;
            this.tooltip.classList.add('show');
            this.moveTooltip(e);
            
            // Remove title to prevent default tooltip
            element.setAttribute('data-title', title);
            element.removeAttribute('title');
        }
    }

    hideTooltip() {
        this.tooltip.classList.remove('show');
        
        // Restore title attributes
        document.querySelectorAll('[data-title]').forEach(el => {
            el.setAttribute('title', el.getAttribute('data-title'));
            el.removeAttribute('data-title');
        });
    }

    moveTooltip(e) {
        const x = e.clientX + 10;
        const y = e.clientY - 30;
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    // Close any modal
    closeModal(e) {
        const modal = e.target.closest('.modal');
        modal.classList.remove('show');
    }

    // Create room boundaries for better visual appeal
    createRoomBoundaries() {
        // Add subtle room decorations
        const roomStyle = this.room.style;
        roomStyle.backgroundImage = `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
        `;
        roomStyle.backgroundSize = '50px 50px, 30px 30px';
    }

    // Setup touch support for mobile devices
    setupTouchSupport() {
        // Prevent default touch behaviors that might interfere
        this.room.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
            }
        });

        // Handle touch events for furniture placement
        this.room.addEventListener('touchend', (e) => {
            if (this.selectedFurniture && e.changedTouches.length === 1) {
                const touch = e.changedTouches[0];
                const rect = this.room.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                
                this.placeFurniture(x, y);
            }
        });
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing LED Room Designer...');
    window.ledRoomGame = new LEDRoomDesigner();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust game container height based on window size
    const container = document.getElementById('gameContainer');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('#gameContainer')) {
        e.preventDefault();
    }
});

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', (e) => {
    if (e.target.closest('#gameContainer')) {
        switch(e.key) {
            case 'Escape':
                // Close any open modal
                document.querySelectorAll('.modal.show').forEach(modal => {
                    modal.classList.remove('show');
                });
                break;
            case 'r':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    window.ledRoomGame?.resetRoom();
                }
                break;
        }
    }
});

console.log('LED Room Designer script loaded successfully!');