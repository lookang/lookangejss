// Main application class for concept mapping interactive
class ConceptMappingApp {
    constructor() {
        this.currentZoom = 1;
        this.sentenceSlots = {};
        this.draggedElement = null;
        this.touchStartPos = { x: 0, y: 0 };
        
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupTooltips();
        this.detectIframeMode();
        
        console.log('Concept mapping app initialized');
    }

    // Detect if running in iframe mode
    detectIframeMode() {
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            document.body.classList.add('iframe-mode');
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Control panel buttons
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('reset-zoom').addEventListener('click', () => this.resetZoom());
        document.getElementById('clear-all').addEventListener('click', () => this.clearAll());
        document.getElementById('show-example').addEventListener('click', () => this.showExample());
        document.getElementById('print-btn').addEventListener('click', () => this.printContent());
        
        // Example overlay
        document.getElementById('close-example').addEventListener('click', () => this.hideExample());
        document.getElementById('example-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'example-overlay') {
                this.hideExample();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideExample();
            }
        });
    }

    // Setup drag and drop functionality
    setupDragAndDrop() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        const dropZones = document.querySelectorAll('.sentence-slot');

        // Setup draggable items
        draggableItems.forEach(item => {
            // Mouse events
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch events for mobile support
            item.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            item.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            item.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        });

        // Setup drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            
            // Double click to clear slot
            zone.addEventListener('dblclick', () => this.clearSlot(zone));
        });
    }

    // Handle drag start
    handleDragStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.dataTransfer.setData('data-type', e.target.dataset.type);
        
        console.log('Drag started:', e.target.textContent);
    }

    // Handle drag end
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    // Handle drag over drop zone
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        
        const slot = e.currentTarget;
        const draggedType = this.draggedElement?.dataset.type;
        const slotType = slot.dataset.type;
        
        if (draggedType === slotType) {
            slot.classList.add('drag-over');
        }
    }

    // Handle drag leave
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    // Handle drop
    handleDrop(e) {
        e.preventDefault();
        const slot = e.currentTarget;
        const text = e.dataTransfer.getData('text/plain');
        const type = e.dataTransfer.getData('data-type');
        
        slot.classList.remove('drag-over');
        
        // Check if types match
        if (type === slot.dataset.type) {
            this.fillSlot(slot, text, type);
            this.updateConstructedSentence();
            
            // Visual feedback
            this.showSuccessAnimation(slot);
        } else {
            // Show error feedback
            this.showErrorAnimation(slot);
        }
    }

    // Touch event handlers for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartPos = { x: touch.clientX, y: touch.clientY };
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        
        // Create visual feedback for touch drag
        this.createTouchDragHelper(e.target, touch);
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        const helper = document.getElementById('touch-drag-helper');
        
        if (helper) {
            helper.style.left = (touch.clientX - 50) + 'px';
            helper.style.top = (touch.clientY - 20) + 'px';
        }
        
        // Check for drop zone collision
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.sentence-slot');
        
        // Update visual feedback
        document.querySelectorAll('.sentence-slot').forEach(slot => {
            slot.classList.remove('drag-over');
        });
        
        if (dropZone && dropZone.dataset.type === this.draggedElement.dataset.type) {
            dropZone.classList.add('drag-over');
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.sentence-slot');
        
        // Clean up
        this.draggedElement.classList.remove('dragging');
        document.querySelectorAll('.sentence-slot').forEach(slot => {
            slot.classList.remove('drag-over');
        });
        
        const helper = document.getElementById('touch-drag-helper');
        if (helper) {
            helper.remove();
        }
        
        // Handle drop
        if (dropZone && dropZone.dataset.type === this.draggedElement.dataset.type) {
            this.fillSlot(dropZone, this.draggedElement.textContent, this.draggedElement.dataset.type);
            this.updateConstructedSentence();
            this.showSuccessAnimation(dropZone);
        } else if (dropZone) {
            this.showErrorAnimation(dropZone);
        }
        
        this.draggedElement = null;
    }

    // Create visual helper for touch dragging
    createTouchDragHelper(element, touch) {
        const helper = document.createElement('div');
        helper.id = 'touch-drag-helper';
        helper.textContent = element.textContent;
        helper.className = element.className + ' touch-helper';
        helper.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.8;
            transform: scale(1.1);
            left: ${touch.clientX - 50}px;
            top: ${touch.clientY - 20}px;
        `;
        
        document.body.appendChild(helper);
    }

    // Fill a sentence slot with content
    fillSlot(slot, text, type) {
        const dropZone = slot.querySelector('.drop-zone');
        const placeholder = slot.querySelector('.placeholder');
        
        dropZone.textContent = text;
        placeholder.style.display = 'none';
        slot.classList.add('filled');
        
        // Store the slot data
        this.sentenceSlots[type] = text;
        
        console.log('Slot filled:', type, text);
    }

    // Clear a specific slot
    clearSlot(slot) {
        const dropZone = slot.querySelector('.drop-zone');
        const placeholder = slot.querySelector('.placeholder');
        const type = slot.dataset.type;
        
        dropZone.textContent = '';
        placeholder.style.display = 'block';
        slot.classList.remove('filled');
        
        // Remove from stored data
        delete this.sentenceSlots[type];
        
        this.updateConstructedSentence();
        
        console.log('Slot cleared:', type);
    }

    // Update the constructed sentence display
    updateConstructedSentence() {
        const sentenceDisplay = document.getElementById('constructed-sentence');
        const slots = ['time', 'who', 'where', 'how', 'what'];
        
        let sentence = '';
        let hasContent = false;
        
        slots.forEach(slot => {
            if (this.sentenceSlots[slot]) {
                sentence += this.sentenceSlots[slot];
                hasContent = true;
            }
        });
        
        if (hasContent) {
            sentenceDisplay.textContent = sentence + '。';
            sentenceDisplay.style.background = 'rgba(76, 175, 80, 0.1)';
        } else {
            sentenceDisplay.textContent = '请拖拽词语来构建句子...';
            sentenceDisplay.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    }

    // Show success animation
    showSuccessAnimation(element) {
        element.style.transform = 'scale(1.1)';
        element.style.background = 'rgba(76, 175, 80, 0.3)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.background = '';
        }, 300);
    }

    // Show error animation
    showErrorAnimation(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        element.style.background = 'rgba(244, 67, 54, 0.3)';
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.background = '';
        }, 500);
    }

    // Setup tooltips
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.remove('hidden');
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (!tooltip.classList.contains('hidden')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }

    // Position tooltip
    positionTooltip(e, tooltip) {
        const rect = document.getElementById('main-container').getBoundingClientRect();
        const x = e.clientX - rect.left + 10;
        const y = e.clientY - rect.top - 30;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Zoom functionality
    zoomIn() {
        this.currentZoom = Math.min(this.currentZoom + 0.1, 2);
        this.applyZoom();
    }

    zoomOut() {
        this.currentZoom = Math.max(this.currentZoom - 0.1, 0.5);
        this.applyZoom();
    }

    resetZoom() {
        this.currentZoom = 1;
        this.applyZoom();
    }

    applyZoom() {
        const container = document.getElementById('elements-container');
        container.style.transform = `scale(${this.currentZoom})`;
        container.style.transformOrigin = 'top center';
        
        console.log('Zoom applied:', this.currentZoom);
    }

    // Clear all slots
    clearAll() {
        if (confirm('确定要清空所有内容吗？')) {
            document.querySelectorAll('.sentence-slot').forEach(slot => {
                this.clearSlot(slot);
            });
            
            console.log('All slots cleared');
        }
    }

    // Show example
    showExample() {
        document.getElementById('example-overlay').classList.remove('hidden');
    }

    // Hide example
    hideExample() {
        document.getElementById('example-overlay').classList.add('hidden');
    }

    // Print functionality
    printContent() {
        window.print();
    }
}

// CSS animation for shake effect
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.touch-helper {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
}
`;

// Add shake animation to document
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing concept mapping app...');
    new ConceptMappingApp();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Recalculate layout if needed
    console.log('Window resized');
});

// Prevent default drag behavior on images and other elements
document.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('draggable-item')) {
        e.preventDefault();
    }
});

// Add visual feedback for better user experience
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

console.log('Concept mapping script loaded successfully');