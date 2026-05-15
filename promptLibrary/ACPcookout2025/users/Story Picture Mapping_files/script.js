// Concept Mapping Interactive for Primary 3 Chinese Students
// This script handles drag and drop functionality, visual feedback, and progress tracking
// Modified to support centered layout positioning

class ConceptMapping {
    constructor() {
        // Initialize properties
        this.zoomLevel = 1;
        this.connections = new Map();
        this.placedConcepts = new Set();
        this.totalConcepts = 8;
        
        // Get DOM elements
        this.mappingArea = document.getElementById('mappingArea');
        this.connectionSvg = document.getElementById('connectionSvg');
        this.feedback = document.getElementById('feedback');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.exampleOverlay = document.getElementById('exampleOverlay');
        
        // Store original positions for centered layout
        this.originalPositions = new Map();
        
        // Bind methods
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.storeOriginalPositions(); // Store centered positions
        this.updateProgress();
        this.resizeSvg();
        
        // Show welcome message
        this.showFeedback('拖拽图片到对应的故事情节中！', 'info');
    }
    
    // Store original centered positions for reset functionality
    storeOriginalPositions() {
        const concepts = document.querySelectorAll('.concept-item');
        concepts.forEach(concept => {
            const computedStyle = getComputedStyle(concept);
            this.originalPositions.set(concept.id, {
                top: computedStyle.top,
                left: computedStyle.left,
                transform: computedStyle.transform
            });
        });
    }
    
    setupEventListeners() {
        // Control buttons
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('resetZoom').addEventListener('click', () => this.resetZoom());
        document.getElementById('showExample').addEventListener('click', () => this.showExample());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('printMap').addEventListener('click', () => this.printMap());
        document.getElementById('closeExample').addEventListener('click', () => this.hideExample());
        
        // Window resize handler
        window.addEventListener('resize', () => this.resizeSvg());
    }
    
    setupDragAndDrop() {
        const concepts = document.querySelectorAll('.concept-item');
        const dropZones = document.querySelectorAll('.drop-area');
        
        // Setup draggable concepts
        concepts.forEach(concept => {
            concept.addEventListener('dragstart', (e) => this.handleDragStart(e));
            concept.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch events for mobile
            concept.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            concept.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            concept.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        });
        
        // Setup drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }
    
    handleDragStart(e) {
        const concept = e.target.closest('.concept-item');
        concept.classList.add('dragging');
        e.dataTransfer.setData('text/plain', concept.id);
        e.dataTransfer.effectAllowed = 'move';
        
        // Store original position using our centered positioning system
        const originalPos = this.originalPositions.get(concept.id);
        if (originalPos) {
            concept.dataset.originalTop = originalPos.top;
            concept.dataset.originalLeft = originalPos.left;
            concept.dataset.originalTransform = originalPos.transform;
        }
    }
    
    handleDragEnd(e) {
        const concept = e.target.closest('.concept-item');
        concept.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        const scenario = e.target.closest('.scenario-zone');
        if (scenario) {
            scenario.classList.add('drag-over');
        }
    }
    
    handleDragLeave(e) {
        const scenario = e.target.closest('.scenario-zone');
        if (scenario && !scenario.contains(e.relatedTarget)) {
            scenario.classList.remove('drag-over');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        const conceptId = e.dataTransfer.getData('text/plain');
        const concept = document.getElementById(conceptId);
        const dropArea = e.target.closest('.drop-area');
        const scenario = e.target.closest('.scenario-zone');
        
        if (dropArea && concept) {
            scenario.classList.remove('drag-over');
            
            const scenarioType = dropArea.dataset.scenario;
            const conceptCategory = concept.dataset.category;
            
            // Check if it's a correct match
            if (scenarioType === conceptCategory) {
                this.placeConcept(concept, dropArea, scenario);
                this.showFeedback('太棒了！放对了！', 'success');
                this.playSuccessAnimation(concept);
            } else {
                this.showFeedback('再试试看，这个图片属于其他情节', 'error');
                this.returnToOriginalPosition(concept);
            }
        }
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        const concept = e.target.closest('.concept-item');
        concept.classList.add('dragging');
        
        // Store touch information
        this.touchData = {
            concept: concept,
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
            offsetX: e.touches[0].clientX - concept.getBoundingClientRect().left,
            offsetY: e.touches[0].clientY - concept.getBoundingClientRect().top
        };
        
        // Store original position using centered positioning system
        const originalPos = this.originalPositions.get(concept.id);
        if (originalPos) {
            concept.dataset.originalTop = originalPos.top;
            concept.dataset.originalLeft = originalPos.left;
            concept.dataset.originalTransform = originalPos.transform;
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.touchData) return;
        
        const touch = e.touches[0];
        const concept = this.touchData.concept;
        
        // Update concept position
        const newX = touch.clientX - this.touchData.offsetX;
        const newY = touch.clientY - this.touchData.offsetY;
        
        concept.style.position = 'fixed';
        concept.style.left = newX + 'px';
        concept.style.top = newY + 'px';
        concept.style.transform = 'none'; // Remove centered transform during drag
        concept.style.zIndex = '1000';
        
        // Check for drop zone hover
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropArea = elementBelow?.closest('.drop-area');
        const scenario = elementBelow?.closest('.scenario-zone');
        
        // Remove previous hover effects
        document.querySelectorAll('.scenario-zone.drag-over').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        // Add hover effect to current drop zone
        if (scenario) {
            scenario.classList.add('drag-over');
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.touchData) return;
        
        const touch = e.changedTouches[0];
        const concept = this.touchData.concept;
        
        // Find drop target
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropArea = elementBelow?.closest('.drop-area');
        const scenario = elementBelow?.closest('.scenario-zone');
        
        // Remove hover effects
        document.querySelectorAll('.scenario-zone.drag-over').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        if (dropArea && scenario) {
            const scenarioType = dropArea.dataset.scenario;
            const conceptCategory = concept.dataset.category;
            
            if (scenarioType === conceptCategory) {
                this.placeConcept(concept, dropArea, scenario);
                this.showFeedback('太棒了！放对了！', 'success');
                this.playSuccessAnimation(concept);
            } else {
                this.showFeedback('再试试看，这个图片属于其他情节', 'error');
                this.returnToOriginalPosition(concept);
            }
        } else {
            this.returnToOriginalPosition(concept);
        }
        
        concept.classList.remove('dragging');
        this.touchData = null;
    }
    
    placeConcept(concept, dropArea, scenario) {
        // Remove from original position and reset positioning
        concept.style.position = 'relative';
        concept.style.left = '';
        concept.style.top = '';
        concept.style.transform = '';
        concept.style.zIndex = '';
        concept.classList.add('placed');
        concept.draggable = false;
        
        // Add to drop area
        dropArea.appendChild(concept);
        
        // Track placement
        this.placedConcepts.add(concept.id);
        this.connections.set(concept.id, scenario.id);
        
        // Update progress
        this.updateProgress();
        
        // Check completion
        if (this.placedConcepts.size === this.totalConcepts) {
            setTimeout(() => {
                this.showFeedback('恭喜！你完成了整个故事的概念图！', 'complete');
                this.celebrateCompletion();
            }, 500);
        }
    }
    
    // Modified to use centered positioning system
    returnToOriginalPosition(concept) {
        const originalPos = this.originalPositions.get(concept.id);
        if (originalPos) {
            concept.style.position = 'absolute';
            concept.style.left = originalPos.left;
            concept.style.top = originalPos.top;
            concept.style.transform = originalPos.transform;
            concept.style.zIndex = '10';
        }
    }
    
    playSuccessAnimation(concept) {
        concept.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            concept.style.animation = '';
        }, 600);
    }
    
    showFeedback(message, type = 'info') {
        this.feedback.textContent = message;
        this.feedback.className = `feedback show ${type}`;
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.feedback.classList.remove('show');
        }, 3000);
    }
    
    updateProgress() {
        const progress = (this.placedConcepts.size / this.totalConcepts) * 100;
        this.progressFill.style.width = progress + '%';
        this.progressText.textContent = `进度: ${this.placedConcepts.size}/${this.totalConcepts}`;
    }
    
    celebrateCompletion() {
        // Add celebration animation
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉 完成！🎉';
        celebration.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: #4CAF50;
            animation: celebrate 2s ease;
            z-index: 2000;
            pointer-events: none;
        `;
        
        // Add celebration keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebrate {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.2); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes bounce {
                0%, 20%, 60%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                80% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
        
        this.mappingArea.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }
    
    // Control functions
    zoom(factor) {
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(2, this.zoomLevel));
        this.mappingArea.style.transform = `scale(${this.zoomLevel})`;
        this.resizeSvg();
    }
    
    resetZoom() {
        this.zoomLevel = 1;
        this.mappingArea.style.transform = 'scale(1)';
        this.resizeSvg();
    }
    
    showExample() {
        this.exampleOverlay.style.display = 'flex';
    }
    
    hideExample() {
        this.exampleOverlay.style.display = 'none';
    }
    
    // Modified clearAll function to use centered positioning
    clearAll() {
        if (confirm('确定要清除所有连线吗？')) {
            // Reset all concepts to original centered positions
            this.placedConcepts.forEach(conceptId => {
                const concept = document.getElementById(conceptId);
                if (concept) {
                    concept.classList.remove('placed');
                    concept.draggable = true;
                    
                    // Return to mapping area with centered positioning
                    this.mappingArea.appendChild(concept);
                    this.returnToOriginalPosition(concept);
                }
            });
            
            // Clear tracking data
            this.placedConcepts.clear();
            this.connections.clear();
            
            // Update progress
            this.updateProgress();
            
            this.showFeedback('已清除所有连线', 'info');
        }
    }
    
    printMap() {
        // Create a printable version
        const printWindow = window.open('', '_blank');
        const printContent = `
            <html>
                <head>
                    <title>故事概念图</title>
                    <style>
                        body { font-family: 'Microsoft YaHei', Arial, sans-serif; margin: 20px; }
                        .print-header { text-align: center; margin-bottom: 20px; }
                        .print-content { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
                        .scenario-print { border: 2px solid #ccc; padding: 15px; border-radius: 8px; min-width: 200px; text-align: center; }
                        .scenario-title { font-weight: bold; margin-bottom: 10px; color: #333; }
                        .concept-print { background: #f5f5f5; padding: 5px 10px; margin: 5px 0; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="print-header">
                        <h2>故事图片概念图</h2>
                        <p>学生姓名: _____________ 日期: _____________</p>
                    </div>
                    <div class="print-content">
                        ${this.generatePrintContent()}
                    </div>
                </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }
    
    generatePrintContent() {
        const scenarios = {
            'morning': '早晨准备 (Morning Preparation)',
            'school': '在学校 (At School)',
            'home': '回到家 (Back Home)',
            'evening': '晚上活动 (Evening Activities)'
        };
        
        let content = '';
        
        Object.entries(scenarios).forEach(([key, title]) => {
            content += `<div class="scenario-print">`;
            content += `<div class="scenario-title">${title}</div>`;
            
            // Find concepts in this scenario
            const dropArea = document.querySelector(`[data-scenario="${key}"]`);
            if (dropArea) {
                const concepts = dropArea.querySelectorAll('.concept-item');
                concepts.forEach(concept => {
                    const text = concept.querySelector('.concept-text').textContent;
                    const image = concept.querySelector('.concept-image').textContent;
                    content += `<div class="concept-print">${image} ${text}</div>`;
                });
            }
            
            content += `</div>`;
        });
        
        return content;
    }
    
    resizeSvg() {
        // Resize SVG to match container
        const rect = this.mappingArea.getBoundingClientRect();
        this.connectionSvg.setAttribute('width', rect.width);
        this.connectionSvg.setAttribute('height', rect.height);
    }
}

// Initialize the concept mapping when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConceptMapping();
});

// Handle iframe detection and responsive behavior
function detectIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Adjust layout based on environment
if (detectIframe()) {
    document.body.classList.add('iframe-mode');
} else {
    document.body.classList.add('standalone-mode');
}