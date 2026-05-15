// Environmental Degradation Concept Map Interactive
// Modified for categorization-based color changing functionality
// Designed for JC1 Geography students with cognitive load optimization

class ConceptMap {
    constructor() {
        // Initialize core properties
        this.isDragging = false;
        this.dragElement = null;
        this.connections = [];
        this.zoomLevel = 1;
        this.originalPositions = new Map();
        
        // New properties for categorization system
        this.categoryGroups = {
            types: ['Air Pollution', 'Water Pollution', 'Soil Degradation', 'Deforestation', 'Climate Change'],
            causes: ['Industrial Activities', 'Transportation', 'Agriculture', 'Urbanization', 'Population Growth'],
            effects: ['Health Issues', 'Biodiversity Loss', 'Economic Impact', 'Food Security'],
            mitigation: ['Renewable Energy', 'Conservation', 'Green Technology', 'Policy & Regulation'],
            stakeholders: ['Government', 'Businesses', 'Communities', 'NGOs']
        };
        
        this.categorizedNodes = {
            types: [],
            causes: [],
            effects: [],
            mitigation: [],
            stakeholders: []
        };
        
        // Get DOM elements
        this.container = document.getElementById('concept-map-container');
        this.svg = document.getElementById('connection-svg');
        this.centralNode = document.getElementById('central-node');
        
        // Initialize the concept map
        this.init();
    }

    init() {
        // Store original positions for reset functionality
        this.storeOriginalPositions();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize drag and drop functionality with drop zones
        this.initializeDragAndDrop();
        
        // Set up touch support for mobile devices
        this.setupTouchSupport();
        
        // Initialize drop zones
        this.initializeDropZones();
        
        console.log('Concept Map initialized successfully with categorization system');
    }

    // Store original positions of all draggable elements for reset functionality
    storeOriginalPositions() {
        const draggableNodes = document.querySelectorAll('.concept-node.draggable');
        draggableNodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            this.originalPositions.set(node.dataset.concept, {
                left: node.style.left || (rect.left - containerRect.left) + 'px',
                top: node.style.top || (rect.top - containerRect.top) + 'px',
                right: node.style.right || '',
                bottom: node.style.bottom || ''
            });
        });
    }

    // Set up all event listeners for the interface
    setupEventListeners() {
        // Control panel buttons
        document.getElementById('zoom-in-btn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out-btn').addEventListener('click', () => this.zoomOut());
        document.getElementById('template-btn').addEventListener('click', () => this.showTemplate());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetMap());
        document.getElementById('print-btn').addEventListener('click', () => this.printMap());
        
        // Template overlay
        document.getElementById('close-template').addEventListener('click', () => this.hideTemplate());
        
        // Window resize handler for responsive design
        window.addEventListener('resize', () => this.handleResize());
        
        // Prevent context menu on right click for better UX
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Initialize drop zones for categorization
    initializeDropZones() {
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dropZones.forEach(zone => {
            // Drag over events for visual feedback
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.parentElement.classList.add('drop-active');
            });
            
            zone.addEventListener('dragleave', (e) => {
                if (!zone.contains(e.relatedTarget)) {
                    zone.parentElement.classList.remove('drop-active');
                }
            });
            
            // Drop event for categorization
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.parentElement.classList.remove('drop-active');
                
                if (this.dragElement) {
                    this.categorizeNode(this.dragElement, zone.dataset.category);
                }
            });
        });
    }

    // Initialize drag and drop functionality with mouse and touch support
    initializeDragAndDrop() {
        const draggableNodes = document.querySelectorAll('.concept-node.draggable');
        
        draggableNodes.forEach(node => {
            // Make nodes draggable
            node.draggable = true;
            
            // Mouse events
            node.addEventListener('mousedown', (e) => this.startDrag(e, node));
            node.addEventListener('dragstart', (e) => this.handleDragStart(e, node));
            node.addEventListener('dragend', (e) => this.handleDragEnd(e, node));
            
            // Touch events for mobile support
            node.addEventListener('touchstart', (e) => this.startDrag(e, node), { passive: false });
            
            // Hover effects for better visual feedback
            node.addEventListener('mouseenter', () => this.showNodeInfo(node));
            node.addEventListener('mouseleave', () => this.hideNodeInfo());
        });

        // Global mouse and touch move/end events
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', (e) => this.endDrag(e));
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        document.addEventListener('touchend', (e) => this.endDrag(e));
    }

    // Handle drag start for HTML5 drag and drop
    handleDragStart(e, node) {
        this.dragElement = node;
        node.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', node.outerHTML);
    }

    // Handle drag end
    handleDragEnd(e, node) {
        node.classList.remove('dragging');
        this.dragElement = null;
        
        // Remove drop-active class from all drop zones
        document.querySelectorAll('.category-header').forEach(header => {
            header.classList.remove('drop-active');
        });
    }

    // Categorize a node into the correct drop zone
    categorizeNode(node, targetCategory) {
        const nodeCategory = node.dataset.category;
        const nodeConcept = node.dataset.concept;
        
        // Check if the node belongs to the target category
        if (nodeCategory === targetCategory) {
            // Correct categorization
            const dropZone = document.querySelector(`.drop-zone[data-category="${targetCategory}"]`);
            
            // Move node to drop zone
            node.style.position = 'relative';
            node.style.left = 'auto';
            node.style.top = 'auto';
            node.style.right = 'auto';
            node.style.bottom = 'auto';
            node.classList.add('in-drop-zone');
            
            dropZone.appendChild(node);
            
            // Add to categorized nodes
            if (!this.categorizedNodes[targetCategory].includes(nodeConcept)) {
                this.categorizedNodes[targetCategory].push(nodeConcept);
            }
            
            // Check if category is complete
            this.checkCategoryCompletion(targetCategory);
            
            // Provide positive feedback
            this.showFeedback(`Correct! ${nodeConcept} belongs to ${targetCategory}`, 'success');
            
        } else {
            // Incorrect categorization - provide feedback and return to original position
            this.showFeedback(`Incorrect! ${nodeConcept} does not belong to ${targetCategory}`, 'error');
            
            // Animate back to original position
            this.returnToOriginalPosition(node);
        }
    }

    // Check if a category has all correct nodes and update colors
    checkCategoryCompletion(category) {
        const expectedNodes = this.categoryGroups[category];
        const currentNodes = this.categorizedNodes[category];
        
        // Check if all expected nodes are present
        const isComplete = expectedNodes.length === currentNodes.length && 
                          expectedNodes.every(node => currentNodes.includes(node));
        
        if (isComplete) {
            // Change all nodes in this category to the correct color
            const dropZone = document.querySelector(`.drop-zone[data-category="${category}"]`);
            const nodesInZone = dropZone.querySelectorAll('.concept-node');
            
            nodesInZone.forEach(node => {
                // Remove neutral class and add category class
                node.classList.remove('neutral');
                node.classList.add(category);
            });
            
            // Mark category header as complete
            const categoryHeader = document.querySelector(`.category-header[data-category="${category}"]`);
            categoryHeader.classList.add('complete');
            
            // Provide completion feedback
            this.showFeedback(`Excellent! ${category} category completed!`, 'complete');
            
            // Check if all categories are complete
            this.checkOverallCompletion();
        }
    }

    // Check if all categories are completed
    checkOverallCompletion() {
        const allComplete = Object.keys(this.categoryGroups).every(category => {
            const expected = this.categoryGroups[category];
            const current = this.categorizedNodes[category];
            return expected.length === current.length && 
                   expected.every(node => current.includes(node));
        });
        
        if (allComplete) {
            this.showFeedback('🎉 Congratulations! All categories completed correctly!', 'victory');
            this.playVictorySound();
        }
    }

    // Return node to original position with animation
    returnToOriginalPosition(node) {
        const originalPos = this.originalPositions.get(node.dataset.concept);
        if (originalPos) {
            // Remove from any drop zone
            if (node.parentElement.classList.contains('drop-zone')) {
                document.querySelector('.concept-bank').appendChild(node);
            }
            
            // Reset positioning
            node.classList.remove('in-drop-zone');
            node.style.position = 'absolute';
            node.style.left = originalPos.left;
            node.style.top = originalPos.top;
            node.style.right = originalPos.right;
            node.style.bottom = originalPos.bottom;
            
            // Remove from categorized nodes if present
            Object.keys(this.categorizedNodes).forEach(category => {
                const index = this.categorizedNodes[category].indexOf(node.dataset.concept);
                if (index > -1) {
                    this.categorizedNodes[category].splice(index, 1);
                }
            });
        }
    }

    // Show feedback messages to the user
    showFeedback(message, type) {
        // Create or update feedback element
        let feedback = document.getElementById('feedback-message');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'feedback-message';
            feedback.style.cssText = `
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                padding: 10px 20px;
                border-radius: 6px;
                font-weight: bold;
                z-index: 1000;
                transition: all 0.3s ease;
                pointer-events: none;
            `;
            this.container.appendChild(feedback);
        }
        
        // Set message and style based on type
        feedback.textContent = message;
        
        const styles = {
            success: { background: '#4CAF50', color: 'white' },
            error: { background: '#f44336', color: 'white' },
            complete: { background: '#2196F3', color: 'white' },
            victory: { background: '#FF9800', color: 'white', fontSize: '18px' }
        };
        
        const style = styles[type] || styles.success;
        Object.assign(feedback.style, style);
        
        // Show and hide with animation
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(-50%) translateY(0)';
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(-50%) translateY(-20px)';
        }, 3000);
    }

    // Set up additional touch support for mobile devices
    setupTouchSupport() {
        // Prevent default touch behaviors that interfere with dragging
        this.container.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('draggable')) {
                e.preventDefault();
            }
        }, { passive: false });

        this.container.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Start dragging operation
    startDrag(e, node) {
        e.preventDefault();
        this.isDragging = true;
        this.dragElement = node;
        
        // Add visual feedback
        node.classList.add('dragging');
        
        // Get initial position
        const touch = e.touches ? e.touches[0] : e;
        const rect = node.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        // Store offset for smooth dragging
        this.dragOffset = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
        
        // Bring to front
        node.style.zIndex = '100';
        
        console.log(`Started dragging: ${node.dataset.concept}`);
    }

    // Handle dragging movement
    drag(e) {
        if (!this.isDragging || !this.dragElement) return;
        
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        const containerRect = this.container.getBoundingClientRect();
        
        // Calculate new position
        const newX = touch.clientX - containerRect.left - this.dragOffset.x;
        const newY = touch.clientY - containerRect.top - this.dragOffset.y;
        
        // Constrain to container bounds
        const maxX = this.container.clientWidth - this.dragElement.offsetWidth;
        const maxY = this.container.clientHeight - this.dragElement.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        // Only update position if not in drop zone
        if (!this.dragElement.classList.contains('in-drop-zone')) {
            this.dragElement.style.left = constrainedX + 'px';
            this.dragElement.style.top = constrainedY + 'px';
            this.dragElement.style.right = 'auto';
            this.dragElement.style.bottom = 'auto';
        }
        
        // Update connections in real-time
        this.updateConnections();
    }

    // End dragging operation
    endDrag(e) {
        if (!this.isDragging || !this.dragElement) return;
        
        // Remove visual feedback
        this.dragElement.classList.remove('dragging');
        this.dragElement.style.zIndex = '5';
        
        // Check if dropped on a drop zone
        const dropZone = this.getDropZoneUnderMouse(e);
        if (dropZone) {
            this.categorizeNode(this.dragElement, dropZone.dataset.category);
        }
        
        // Check if dropped near central node for connection
        if (this.isNearCentralNode(this.dragElement)) {
            this.createConnection(this.dragElement);
        }
        
        // Reset dragging state
        this.isDragging = false;
        this.dragElement = null;
        this.dragOffset = null;
        
        console.log('Drag operation completed');
    }

    // Get drop zone under mouse/touch position
    getDropZoneUnderMouse(e) {
        const touch = e.touches ? e.touches[0] : e;
        const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (elementUnder) {
            // Check if it's a drop zone or inside one
            if (elementUnder.classList.contains('drop-zone')) {
                return elementUnder;
            }
            
            const dropZone = elementUnder.closest('.drop-zone');
            if (dropZone) {
                return dropZone;
            }
        }
        
        return null;
    }

    // Check if a node is close enough to the central node for connection
    isNearCentralNode(node) {
        const nodeRect = node.getBoundingClientRect();
        const centralRect = this.centralNode.getBoundingClientRect();
        
        const distance = Math.sqrt(
            Math.pow(nodeRect.left + nodeRect.width/2 - (centralRect.left + centralRect.width/2), 2) +
            Math.pow(nodeRect.top + nodeRect.height/2 - (centralRect.top + centralRect.height/2), 2)
        );
        
        return distance < 150; // Connection threshold
    }

    // Create a visual connection between nodes
    createConnection(node) {
        const concept = node.dataset.concept;
        
        // Avoid duplicate connections
        if (this.connections.find(conn => conn.concept === concept)) {
            return;
        }
        
        // Add to connections array
        this.connections.push({
            concept: concept,
            node: node,
            category: node.dataset.category
        });
        
        // Add visual feedback
        node.classList.add('connected');
        
        // Create SVG line
        this.drawConnection(node);
        
        // Provide audio feedback (if supported)
        this.playConnectionSound();
        
        console.log(`Connection created: ${concept}`);
    }

    // Draw SVG connection line
    drawConnection(node) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        
        // Calculate positions
        const nodeRect = node.getBoundingClientRect();
        const centralRect = this.centralNode.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        const x1 = centralRect.left + centralRect.width/2 - containerRect.left;
        const y1 = centralRect.top + centralRect.height/2 - containerRect.top;
        const x2 = nodeRect.left + nodeRect.width/2 - containerRect.left;
        const y2 = nodeRect.top + nodeRect.height/2 - containerRect.top;
        
        // Set line attributes
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'connection-line');
        line.setAttribute('data-concept', node.dataset.concept);
        
        // Add color based on category
        const categoryColors = {
            types: '#ff6b6b',
            causes: '#ffa726',
            effects: '#ab47bc',
            mitigation: '#66bb6a',
            stakeholders: '#42a5f5'
        };
        
        line.setAttribute('stroke', categoryColors[node.dataset.category] || '#666');
        
        this.svg.appendChild(line);
    }

    // Update all connection lines (called during dragging)
    updateConnections() {
        this.connections.forEach(connection => {
            const line = this.svg.querySelector(`[data-concept="${connection.concept}"]`);
            if (line && connection.node) {
                const nodeRect = connection.node.getBoundingClientRect();
                const centralRect = this.centralNode.getBoundingClientRect();
                const containerRect = this.container.getBoundingClientRect();
                
                const x1 = centralRect.left + centralRect.width/2 - containerRect.left;
                const y1 = centralRect.top + centralRect.height/2 - containerRect.top;
                const x2 = nodeRect.left + nodeRect.width/2 - containerRect.left;
                const y2 = nodeRect.top + nodeRect.height/2 - containerRect.top;
                
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
            }
        });
    }

    // Zoom in functionality
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.1, 1.5);
        this.applyZoom();
    }

    // Zoom out functionality
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
        this.applyZoom();
    }

    // Apply zoom transformation
    applyZoom() {
        this.container.style.transform = `scale(${this.zoomLevel})`;
        console.log(`Zoom level: ${this.zoomLevel}`);
    }

    // Show example template overlay
    showTemplate() {
        const overlay = document.getElementById('template-overlay');
        overlay.classList.remove('hidden');
    }

    // Hide template overlay
    hideTemplate() {
        const overlay = document.getElementById('template-overlay');
        overlay.classList.add('hidden');
    }

    // Reset map to original state
    resetMap() {
        // Clear all connections
        this.connections = [];
        this.svg.innerHTML = '';
        
        // Reset categorized nodes tracking
        Object.keys(this.categorizedNodes).forEach(category => {
            this.categorizedNodes[category] = [];
        });
        
        // Reset node positions and states
        const draggableNodes = document.querySelectorAll('.concept-node.draggable');
        draggableNodes.forEach(node => {
            // Remove all category classes and add neutral
            node.classList.remove('connected', 'types', 'causes', 'effects', 'mitigation', 'stakeholders', 'in-drop-zone');
            node.classList.add('neutral');
            
            // Move back to concept bank
            if (node.parentElement.classList.contains('drop-zone')) {
                document.querySelector('.concept-bank').appendChild(node);
            }
            
            // Reset position
            node.style.position = 'absolute';
            const originalPos = this.originalPositions.get(node.dataset.concept);
            if (originalPos) {
                node.style.left = originalPos.left;
                node.style.top = originalPos.top;
                node.style.right = originalPos.right;
                node.style.bottom = originalPos.bottom;
            }
        });
        
        // Reset category headers
        document.querySelectorAll('.category-header').forEach(header => {
            header.classList.remove('complete');
        });
        
        // Reset zoom
        this.zoomLevel = 1;
        this.applyZoom();
        
        // Hide feedback message
        const feedback = document.getElementById('feedback-message');
        if (feedback) {
            feedback.style.opacity = '0';
        }
        
        console.log('Map reset to original state');
    }

    // Print functionality
    printMap() {
        window.print();
    }

    // Show node information tooltip
    showNodeInfo(node) {
        const tooltip = document.getElementById('info-tooltip');
        const concept = node.dataset.concept;
        const category = node.dataset.category;
        
        // Create informative tooltip content
        const infoText = this.getConceptInfo(concept, category);
        tooltip.textContent = infoText;
        tooltip.classList.remove('hidden');
        
        // Position tooltip near the node
        const rect = node.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width + 10) + 'px';
        tooltip.style.top = rect.top + 'px';
    }

    // Hide node information tooltip
    hideNodeInfo() {
        const tooltip = document.getElementById('info-tooltip');
        tooltip.classList.add('hidden');
    }

    // Get detailed information about concepts
    getConceptInfo(concept, category) {
        const conceptInfo = {
            'Air Pollution': 'Contamination of air by harmful substances like particulates, gases, and chemicals.',
            'Water Pollution': 'Contamination of water bodies by toxic substances, affecting aquatic life and human health.',
            'Soil Degradation': 'Deterioration of soil quality through erosion, contamination, and nutrient depletion.',
            'Deforestation': 'Large-scale removal of forests, leading to habitat loss and climate change.',
            'Climate Change': 'Long-term changes in global climate patterns due to human activities.',
            'Industrial Activities': 'Manufacturing and production processes that release pollutants.',
            'Transportation': 'Movement of people and goods contributing to emissions and pollution.',
            'Agriculture': 'Farming practices that can lead to soil degradation and water pollution.',
            'Urbanization': 'Growth of cities leading to habitat destruction and increased pollution.',
            'Population Growth': 'Increasing human population putting pressure on natural resources.',
            'Health Issues': 'Diseases and health problems caused by environmental degradation.',
            'Biodiversity Loss': 'Reduction in variety of plant and animal species.',
            'Economic Impact': 'Financial costs of environmental damage and cleanup.',
            'Food Security': 'Threat to stable food supply due to environmental changes.',
            'Renewable Energy': 'Clean energy sources like solar, wind, and hydroelectric power.',
            'Conservation': 'Protection and preservation of natural resources and ecosystems.',
            'Green Technology': 'Environmentally friendly technologies and innovations.',
            'Policy & Regulation': 'Government laws and policies to protect the environment.',
            'Government': 'Public sector role in environmental protection and regulation.',
            'Businesses': 'Private sector impact and responsibility in environmental issues.',
            'Communities': 'Local populations affected by and involved in environmental solutions.',
            'NGOs': 'Non-governmental organizations working on environmental protection.'
        };
        
        return conceptInfo[concept] || `${concept} - ${category} related to environmental degradation.`;
    }

    // Handle window resize for responsive design
    handleResize() {
        // Update SVG size
        this.svg.style.width = this.container.clientWidth + 'px';
        this.svg.style.height = this.container.clientHeight + 'px';
        
        // Update connections
        this.updateConnections();
    }

    // Play connection sound (if audio is supported)
    playConnectionSound() {
        try {
            // Create a simple audio context for feedback
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            // Audio not supported or blocked, continue silently
            console.log('Audio feedback not available');
        }
    }

    // Play victory sound when all categories are completed
    playVictorySound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Play a sequence of notes for victory
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            
            notes.forEach((frequency, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + index * 0.2);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.3);
                
                oscillator.start(audioContext.currentTime + index * 0.2);
                oscillator.stop(audioContext.currentTime + index * 0.2 + 0.3);
            });
        } catch (error) {
            console.log('Victory audio not available');
        }
    }
}

// Initialize the concept map when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in an iframe and adjust height accordingly
    const isInIframe = window.self !== window.top;
    const container = document.getElementById('main-container');
    
    if (!isInIframe && window.innerHeight > 500) {
        container.style.height = '90vh';
    }
    
    // Create and initialize the concept map
    const conceptMap = new ConceptMap();
    
    // Make it globally accessible for debugging
    window.conceptMap = conceptMap;
    
    console.log('Environmental Degradation Concept Map loaded successfully');
    console.log('Designed for JC1 Geography - Singapore Curriculum with categorization system');
});