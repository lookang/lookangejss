// Game state management
class PerimeterStickerGame {
    constructor() {
        this.currentShape = 'rectangle';
        this.currentDimensions = {};
        this.correctPerimeter = 0;
        this.stickersNeeded = 0;
        this.stickersPlaced = 0;
        this.score = 0;
        this.stickerColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];
        this.stickerSlots = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateNewShape();
        this.updateDisplay();

        // Keep sticker slots aligned if the layout changes (desktop/mobile/resize)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.repositionStickerSlots(), 100);
        });
    }

    setupEventListeners() {
        // Shape selection buttons
        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectShape(e.target.dataset.shape);
            });
        });

        // Check answer button
        document.getElementById('check-btn').addEventListener('click', () => {
            this.checkPerimeter();
        });

        // New shape button
        document.getElementById('new-shape-btn').addEventListener('click', () => {
            this.generateNewShape();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetCurrentShape();
        });

        // Continue button in modal
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.hideSuccessModal();
            this.generateNewShape();
        });

        // Enter key for perimeter input
        document.getElementById('perimeter-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPerimeter();
            }
        });
    }

    selectShape(shape) {
        // Update active button
        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-shape="${shape}"]`).classList.add('active');

        // Update active dimensions display
        document.querySelectorAll('.dims-info').forEach(info => {
            info.classList.remove('active');
        });
        document.getElementById(`${shape}-dims`).classList.add('active');

        this.currentShape = shape;
        this.generateNewShape();
    }

    generateNewShape() {
        // Generate random dimensions based on shape type
        switch(this.currentShape) {
            case 'rectangle':
                this.currentDimensions = {
                    length: Math.floor(Math.random() * 8) + 4, // 4-11
                    width: Math.floor(Math.random() * 6) + 3   // 3-8
                };
                this.correctPerimeter = 2 * (this.currentDimensions.length + this.currentDimensions.width);
                break;
            case 'square':
                this.currentDimensions = {
                    side: Math.floor(Math.random() * 6) + 4 // 4-9
                };
                this.correctPerimeter = 4 * this.currentDimensions.side;
                break;
            case 'triangle':
                this.currentDimensions = {
                    a: Math.floor(Math.random() * 5) + 4, // 4-8
                    b: Math.floor(Math.random() * 5) + 4, // 4-8
                    c: Math.floor(Math.random() * 5) + 4  // 4-8
                };
                this.correctPerimeter = this.currentDimensions.a + this.currentDimensions.b + this.currentDimensions.c;
                break;
        }

        this.stickersNeeded = this.correctPerimeter;
        this.stickersPlaced = 0;
        
        this.updateDisplay();
        this.createShape();
        this.createStickerSlots();
        this.createStickers();
        this.updateFormula();
    }

    updateDisplay() {
        // Update dimensions display
        switch(this.currentShape) {
            case 'rectangle':
                document.getElementById('rect-length').textContent = this.currentDimensions.length;
                document.getElementById('rect-width').textContent = this.currentDimensions.width;
                break;
            case 'square':
                document.getElementById('square-side').textContent = this.currentDimensions.side;
                break;
            case 'triangle':
                document.getElementById('tri-a').textContent = this.currentDimensions.a;
                document.getElementById('tri-b').textContent = this.currentDimensions.b;
                document.getElementById('tri-c').textContent = this.currentDimensions.c;
                break;
        }

        // Update sticker counter
        document.getElementById('stickers-needed').textContent = this.stickersNeeded;
        document.getElementById('stickers-placed').textContent = this.stickersPlaced;
        
        // Update score
        document.getElementById('score').textContent = this.score;
        
        // Clear perimeter input
        document.getElementById('perimeter-input').value = '';
    }

    createShape() {
        const container = document.getElementById('shape-container');
        container.innerHTML = '';

        const shape = document.createElement('div');
        shape.className = `shape ${this.currentShape}`;

        switch(this.currentShape) {
            case 'rectangle':
                shape.style.width = `${this.currentDimensions.length * 20}px`;
                shape.style.height = `${this.currentDimensions.width * 20}px`;
                break;
            case 'square':
                const size = this.currentDimensions.side * 20;
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                break;
            case 'triangle':
                // Create triangle using CSS borders
                const base = Math.max(this.currentDimensions.a, this.currentDimensions.b, this.currentDimensions.c) * 15;
                const height = base * 0.8;
                shape.style.borderLeft = `${base/2}px solid transparent`;
                shape.style.borderRight = `${base/2}px solid transparent`;
                shape.style.borderBottom = `${height}px solid #e1bee7`;
                break;
        }

        container.appendChild(shape);
    }

    createStickerSlots() {
        const slotsContainer = document.getElementById('sticker-slots');
        slotsContainer.innerHTML = '';
        this.stickerSlots = [];

        // Calculate positions for sticker slots around the shape perimeter
        // IMPORTANT: positions must be based on the *actual rendered* shape location,
        // not hard-coded center coordinates. This keeps alignment correct on all screens.
        const slots = this.calculateStickerPositions();

        slots.forEach((pos, index) => {
            const slot = document.createElement('div');
            slot.className = 'sticker-slot';
            slot.style.left = `${pos.x}px`;
            slot.style.top = `${pos.y}px`;
            slot.dataset.index = index;

            // Add drop zone functionality
            this.addDropZoneListeners(slot);

            slotsContainer.appendChild(slot);
            this.stickerSlots.push({ element: slot, filled: false });
        });
    }

    calculateStickerPositions() {
        const positions = [];

        const slotsEl = document.getElementById('sticker-slots');
        const shapeEl = document.querySelector('.shape');
        if (!slotsEl || !shapeEl) return positions;

        const overlayRect = slotsEl.getBoundingClientRect();
        const shapeRect = shapeEl.getBoundingClientRect();

        // Convert shape rect from page coords to overlay-local coords
        const shapeLeft = shapeRect.left - overlayRect.left;
        const shapeTop = shapeRect.top - overlayRect.top;
        const shapeWidth = shapeRect.width;
        const shapeHeight = shapeRect.height;

        const unitPx = 20;
        const slotOffset = 10; // distance from edge (in px) so slots sit on the perimeter

        // Helper functions
        const lerp = (a, b, t) => a + (b - a) * t;
        const pointOnSegment = (p1, p2, t) => ({ x: lerp(p1.x, p2.x, t), y: lerp(p1.y, p2.y, t) });
        const normalize = (v) => {
            const len = Math.hypot(v.x, v.y) || 1;
            return { x: v.x / len, y: v.y / len };
        };
        const add = (p, v, s = 1) => ({ x: p.x + v.x * s, y: p.y + v.y * s });

        switch (this.currentShape) {
            case 'rectangle': {
                const L = this.currentDimensions.length;
                const W = this.currentDimensions.width;

                // Top edge
                for (let i = 0; i < L; i++) {
                    positions.push({ x: shapeLeft + i * unitPx + unitPx / 2, y: shapeTop - slotOffset });
                }
                // Right edge
                for (let i = 0; i < W; i++) {
                    positions.push({ x: shapeLeft + shapeWidth + slotOffset, y: shapeTop + i * unitPx + unitPx / 2 });
                }
                // Bottom edge
                for (let i = 0; i < L; i++) {
                    positions.push({ x: shapeLeft + shapeWidth - i * unitPx - unitPx / 2, y: shapeTop + shapeHeight + slotOffset });
                }
                // Left edge
                for (let i = 0; i < W; i++) {
                    positions.push({ x: shapeLeft - slotOffset, y: shapeTop + shapeHeight - i * unitPx - unitPx / 2 });
                }
                break;
            }

            case 'square': {
                const S = this.currentDimensions.side;

                // Top edge
                for (let i = 0; i < S; i++) {
                    positions.push({ x: shapeLeft + i * unitPx + unitPx / 2, y: shapeTop - slotOffset });
                }
                // Right edge
                for (let i = 0; i < S; i++) {
                    positions.push({ x: shapeLeft + shapeWidth + slotOffset, y: shapeTop + i * unitPx + unitPx / 2 });
                }
                // Bottom edge
                for (let i = 0; i < S; i++) {
                    positions.push({ x: shapeLeft + shapeWidth - i * unitPx - unitPx / 2, y: shapeTop + shapeHeight + slotOffset });
                }
                // Left edge
                for (let i = 0; i < S; i++) {
                    positions.push({ x: shapeLeft - slotOffset, y: shapeTop + shapeHeight - i * unitPx - unitPx / 2 });
                }
                break;
            }

            case 'triangle': {
                // The visual triangle is isosceles (CSS borders). We'll align slots to its real rendered bounding box.
                const { a, b, c } = this.currentDimensions;

                const pBottomLeft = { x: shapeLeft, y: shapeTop + shapeHeight };
                const pBottomRight = { x: shapeLeft + shapeWidth, y: shapeTop + shapeHeight };
                const pTop = { x: shapeLeft + shapeWidth / 2, y: shapeTop };

                const centroid = {
                    x: (pBottomLeft.x + pBottomRight.x + pTop.x) / 3,
                    y: (pBottomLeft.y + pBottomRight.y + pTop.y) / 3
                };

                const pushAlongEdge = (p1, p2, n) => {
                    if (n <= 0) return;
                    const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
                    // A perpendicular (normal)
                    let normal = normalize({ x: -edge.y, y: edge.x });

                    for (let i = 0; i < n; i++) {
                        const t = (i + 0.5) / n; // avoid corner duplication
                        let p = pointOnSegment(p1, p2, t);

                        // Ensure normal points outward (away from centroid)
                        const toCentroid = { x: centroid.x - p.x, y: centroid.y - p.y };
                        if (toCentroid.x * normal.x + toCentroid.y * normal.y > 0) {
                            normal = { x: -normal.x, y: -normal.y };
                        }

                        p = add(p, normal, slotOffset);
                        positions.push(p);
                    }
                };

                // Map sides: a = base, b = left, c = right
                pushAlongEdge(pBottomLeft, pBottomRight, a);
                pushAlongEdge(pBottomLeft, pTop, b);
                pushAlongEdge(pTop, pBottomRight, c);

                break;
            }
        }

        return positions;
    }

    createStickers() {
        const container = document.getElementById('stickers-container');
        container.innerHTML = '';

        // Create stickers with random colors
        for(let i = 0; i < this.stickersNeeded + 3; i++) { // Extra stickers for variety
            const sticker = document.createElement('div');
            sticker.className = 'sticker';
            sticker.style.backgroundColor = this.stickerColors[i % this.stickerColors.length];
            sticker.draggable = true;
            
            this.addDragListeners(sticker);
            container.appendChild(sticker);
        }
    }

    addDragListeners(sticker) {
        sticker.addEventListener('dragstart', (e) => {
            sticker.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', sticker.outerHTML);
        });

        sticker.addEventListener('dragend', () => {
            sticker.classList.remove('dragging');
        });

        // Touch events for mobile
        sticker.addEventListener('touchstart', (e) => {
            e.preventDefault();
            sticker.classList.add('dragging');
            this.handleTouchMove(e, sticker);
        });
    }

    addDropZoneListeners(slot) {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('highlight');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('highlight');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('highlight');
            
            if (!this.stickerSlots[slot.dataset.index].filled) {
                this.placeSticker(slot, e.dataTransfer.getData('text/html'));
            }
        });

        // Touch events
        slot.addEventListener('touchend', (e) => {
            if (this.draggedSticker && !this.stickerSlots[slot.dataset.index].filled) {
                this.placeSticker(slot, this.draggedSticker.outerHTML);
                this.draggedSticker.remove();
                this.draggedSticker = null;
            }
        });
    }

    handleTouchMove(e, sticker) {
        this.draggedSticker = sticker;
        const touch = e.touches[0];
        
        const moveHandler = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            sticker.style.position = 'fixed';
            sticker.style.left = touch.clientX - 10 + 'px';
            sticker.style.top = touch.clientY - 10 + 'px';
            sticker.style.zIndex = '1000';
        };
        
        const endHandler = () => {
            sticker.classList.remove('dragging');
            sticker.style.position = '';
            sticker.style.left = '';
            sticker.style.top = '';
            sticker.style.zIndex = '';
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', endHandler);
        };
        
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', endHandler);
    }

    placeSticker(slot, stickerHTML) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = stickerHTML;
        const newSticker = tempDiv.firstChild;
        
        // Remove drag functionality and resize for slot
        newSticker.draggable = false;
        newSticker.className = 'sticker sticker-place-animation';
        newSticker.style.width = '16px';
        newSticker.style.height = '16px';
        newSticker.style.cursor = 'default';
        
        // Clear the slot and add the sticker
        slot.innerHTML = '';
        slot.appendChild(newSticker);
        slot.classList.add('filled');
        
        // Update game state
        this.stickerSlots[slot.dataset.index].filled = true;
        this.stickersPlaced++;
        
        // Update display
        document.getElementById('stickers-placed').textContent = this.stickersPlaced;
        
        // Check if all stickers are placed
        if (this.stickersPlaced === this.stickersNeeded) {
            this.checkCompletion();
        }
    }

    checkPerimeter() {
        const input = document.getElementById('perimeter-input');
        const userAnswer = parseInt(input.value);
        
        if (userAnswer === this.correctPerimeter) {
            // Correct answer - enable sticker placement
            input.style.borderColor = '#28a745';
            input.style.backgroundColor = '#d4edda';
            
            // Show success feedback
            this.showFeedback('Correct! Now place the stickers around the shape.', 'success');
            
            // Enable sticker slots
            document.querySelectorAll('.sticker-slot').forEach(slot => {
                slot.style.pointerEvents = 'all';
            });
        } else {
            // Wrong answer
            input.style.borderColor = '#dc3545';
            input.style.backgroundColor = '#f8d7da';
            
            this.showFeedback('Try again! Check your calculation.', 'error');
            
            // Shake animation
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        }
    }

    checkCompletion() {
        if (this.stickersPlaced === this.stickersNeeded) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
            
            // Add success animation to shape
            document.querySelector('.shape').classList.add('success-animation');
            
            // Show success modal
            setTimeout(() => {
                this.showSuccessModal();
            }, 600);
        }
    }

    showSuccessModal() {
        document.getElementById('success-modal').classList.add('show');
    }

    hideSuccessModal() {
        document.getElementById('success-modal').classList.remove('show');
    }

    showFeedback(message, type) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1500;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    updateFormula() {
        const formulaHint = document.getElementById('formula-hint');
        switch(this.currentShape) {
            case 'rectangle':
                formulaHint.textContent = 'Rectangle: 2 × (length + width)';
                break;
            case 'square':
                formulaHint.textContent = 'Square: 4 × side length';
                break;
            case 'triangle':
                formulaHint.textContent = 'Triangle: side A + side B + side C';
                break;
        }
    }

    resetCurrentShape() {
        // Reset sticker placement
        this.stickersPlaced = 0;
        document.getElementById('stickers-placed').textContent = '0';

        // Clear all sticker slots
        this.stickerSlots.forEach(slot => {
            slot.element.innerHTML = '';
            slot.element.classList.remove('filled');
            slot.filled = false;
        });

        // Reset input field
        const input = document.getElementById('perimeter-input');
        input.value = '';
        input.style.borderColor = '#dee2e6';
        input.style.backgroundColor = 'white';

        // Recreate stickers
        this.createStickers();

        // Ensure slot positions stay aligned
        this.repositionStickerSlots();
    }

    // Recompute and apply slot positions without clearing already placed stickers
    repositionStickerSlots() {
        if (!this.stickerSlots?.length) return;

        const positions = this.calculateStickerPositions();
        if (!positions.length) return;

        // If counts changed (rare), rebuild cleanly
        if (positions.length !== this.stickerSlots.length) {
            this.createStickerSlots();
            return;
        }

        positions.forEach((pos, idx) => {
            const slot = this.stickerSlots[idx]?.element;
            if (!slot) return;
            slot.style.left = `${pos.x}px`;
            slot.style.top = `${pos.y}px`;
        });
    }
}

// Tooltip functionality
function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PerimeterStickerGame();
});

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
