// World War II Concept Mapping Interactive
// Implements drag-and-drop functionality with educational feedback
// Follows cognitive load theory and multimedia learning principles
// Modified to remove automatic dotted connections while keeping manual connection mode
// Updated with larger, color-coded category zones
// Added different colored connection lines for manual connections

// Added Line class to handle manual connections between factors with color cycling
class Line {
    constructor(startFactor, endFactor, svg, colorIndex) {
        this.startFactor = startFactor;
        this.endFactor = endFactor;
        this.svg = svg;
        this.element = null;
        this.id = `${startFactor.id}-${endFactor.id}`;
        this.colorIndex = colorIndex; // Added color index for different colored lines
        this.createLine();
    }

    createLine() {
        // Create SVG line element for manual connections with color cycling
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.element.setAttribute('class', `manual-connection-line connection-color-${this.colorIndex}`);
        this.element.dataset.connectionId = this.id;
        
        // Add click event to remove connection
        this.element.addEventListener('click', () => this.remove());
        
        this.updatePosition();
        this.svg.appendChild(this.element);
    }

    updatePosition() {
        if (!this.startFactor.placement || !this.endFactor.placement) return;

        // Calculate connection points (center of each factor card)
        const x1 = this.startFactor.placement.x + 70; // Half of card width
        const y1 = this.startFactor.placement.y + 22; // Half of card height
        const x2 = this.endFactor.placement.x + 70;
        const y2 = this.endFactor.placement.y + 22;

        this.element.setAttribute('x1', x1);
        this.element.setAttribute('y1', y1);
        this.element.setAttribute('x2', x2);
        this.element.setAttribute('y2', y2);
    }

    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    // Check if this line connects two specific factors
    connects(factor1Id, factor2Id) {
        return (this.startFactor.id === factor1Id && this.endFactor.id === factor2Id) ||
               (this.startFactor.id === factor2Id && this.endFactor.id === factor1Id);
    }
}

class ConceptMapper {
    constructor() {
        // Historical factors data with categories and detailed information
        // Removed the connections array from each factor since we're not using automatic connections
        this.factors = [
            {
                id: 'invasion-poland',
                text: 'German Invasion of Poland (Sept 1939)',
                category: 'trigger',
                detail: 'Hitler\'s invasion of Poland on 1 September 1939 was the immediate trigger that led Britain and France to declare war on Germany.'
            },
            {
                id: 'nazi-aggression',
                text: 'Nazi Aggressive Expansion',
                category: 'contributory',
                detail: 'Hitler\'s systematic expansion including Austria (1938) and Czechoslovakia (1939) demonstrated Nazi Germany\'s aggressive intentions.'
            },
            {
                id: 'appeasement-failure',
                text: 'Failure of Appeasement Policy',
                category: 'contributory',
                detail: 'Britain and France\'s policy of giving in to Hitler\'s demands to avoid war ultimately failed and emboldened Nazi aggression.'
            },
            {
                id: 'treaty-versailles',
                text: 'Treaty of Versailles (1919)',
                category: 'underlying',
                detail: 'The harsh terms imposed on Germany after WWI created resentment and economic hardship that Hitler exploited.'
            },
            {
                id: 'economic-depression',
                text: 'Great Depression (1929-1939)',
                category: 'underlying',
                detail: 'Economic crisis led to political instability across Europe and helped extremist parties like the Nazis gain power.'
            },
            {
                id: 'rise-hitler',
                text: 'Rise of Adolf Hitler',
                category: 'underlying',
                detail: 'Hitler\'s rise to power in Germany (1933) brought a leader determined to overturn the post-WWI order through force.'
            },
            {
                id: 'munich-agreement',
                text: 'Munich Agreement (1938)',
                category: 'contributory',
                detail: 'The agreement allowing Germany to annex Sudetenland showed Hitler that Western powers would not resist his expansion.'
            },
            {
                id: 'militarization',
                text: 'German Rearmament',
                category: 'contributory',
                detail: 'Hitler\'s secret rearmament program violated the Treaty of Versailles and prepared Germany for aggressive war.'
            }
        ];

        // Track placed factors - removed automatic connections tracking
        this.placedFactors = new Map();
        this.draggedElement = null;
        this.dragOffset = { x: 0, y: 0 };

        // Connection mode properties for manual connections only
        this.connectionMode = false;
        this.selectedFactorForConnection = null;
        this.manualConnections = new Map(); // Store manual Line objects
        this.tempLine = null; // Temporary line while drawing connection
        this.connectionColorIndex = 1; // Track current color index for cycling through colors

        // Initialize the interface
        this.initializeInterface();
        this.setupEventListeners();
        this.populateFactors();
    }

    initializeInterface() {
        // Set up instructions toggle
        const toggleBtn = document.getElementById('toggleInstructions');
        const instructionsContent = document.getElementById('instructionsContent');
        
        toggleBtn.addEventListener('click', () => {
            instructionsContent.classList.toggle('expanded');
            toggleBtn.textContent = instructionsContent.classList.contains('expanded') 
                ? '📋 Hide Instructions' : '📋 Instructions';
        });

        // Initialize with instructions collapsed to save space
        instructionsContent.classList.remove('expanded');
    }

    setupEventListeners() {
        // Control button event listeners
        document.getElementById('resetBtn').addEventListener('click', () => this.resetMapping());
        document.getElementById('checkBtn').addEventListener('click', () => this.checkConnections());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        
        // Connection mode button event listener
        document.getElementById('connectionBtn').addEventListener('click', () => this.toggleConnectionMode());

        // Set up drag and drop zones
        this.setupDropZones();

        // Touch and mouse event handling for responsive interaction
        this.setupDragAndDrop();

        // Tooltip functionality
        this.setupTooltips();

        // Mouse move event for temporary connection line
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    // Toggle connection mode for manual connections
    toggleConnectionMode() {
        this.connectionMode = !this.connectionMode;
        const connectionBtn = document.getElementById('connectionBtn');
        
        if (this.connectionMode) {
            connectionBtn.classList.add('connection-active');
            connectionBtn.textContent = '🔗 Exit Connect';
            this.showFeedback('Connection mode active! Click on two factors to connect them with colored lines.', 'success');
            
            // Add connection mode class to all placed factor cards
            this.placedFactors.forEach((placement) => {
                placement.element.classList.add('connection-mode');
            });
        } else {
            connectionBtn.classList.remove('connection-active');
            connectionBtn.textContent = '🔗 Connect Mode';
            this.selectedFactorForConnection = null;
            this.removeTempLine();
            
            // Remove connection mode class from all factor cards
            document.querySelectorAll('.factor-card').forEach(card => {
                card.classList.remove('connection-mode', 'selected-for-connection');
            });
        }
    }

    // Handle mouse movement for temporary connection line
    handleMouseMove(e) {
        if (this.connectionMode && this.selectedFactorForConnection && this.tempLine) {
            const mappingArea = document.getElementById('mappingArea');
            const rect = mappingArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.tempLine.setAttribute('x2', x);
            this.tempLine.setAttribute('y2', y);
        }
    }

    // Create temporary connection line
    createTempLine(startX, startY) {
        const svg = document.getElementById('connectionOverlay');
        this.tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.tempLine.setAttribute('class', 'temp-connection-line');
        this.tempLine.setAttribute('x1', startX);
        this.tempLine.setAttribute('y1', startY);
        this.tempLine.setAttribute('x2', startX);
        this.tempLine.setAttribute('y2', startY);
        svg.appendChild(this.tempLine);
    }

    // Remove temporary connection line
    removeTempLine() {
        if (this.tempLine && this.tempLine.parentNode) {
            this.tempLine.parentNode.removeChild(this.tempLine);
            this.tempLine = null;
        }
    }

    // Handle factor clicks for manual connections
    handleFactorClick(factorElement) {
        if (!this.connectionMode || !factorElement.classList.contains('placed')) return;

        const factorId = factorElement.dataset.factorId;
        const factor = this.factors.find(f => f.id === factorId);
        
        if (!this.selectedFactorForConnection) {
            // First factor selected
            this.selectedFactorForConnection = { id: factorId, element: factorElement, factor: factor };
            factorElement.classList.add('selected-for-connection');
            
            // Create temporary line
            const placement = this.placedFactors.get(factorId);
            const startX = placement.x + 70;
            const startY = placement.y + 22;
            this.createTempLine(startX, startY);
            
            this.showFeedback(`Selected ${factor.text}. Click another factor to connect.`, 'success');
        } else if (this.selectedFactorForConnection.id === factorId) {
            // Same factor clicked - deselect
            this.selectedFactorForConnection = null;
            factorElement.classList.remove('selected-for-connection');
            this.removeTempLine();
            this.showFeedback('Connection cancelled.', 'success');
        } else {
            // Second factor selected - create connection with next color
            this.createManualConnection(this.selectedFactorForConnection, { id: factorId, element: factorElement, factor: factor });
            
            // Reset selection
            this.selectedFactorForConnection.element.classList.remove('selected-for-connection');
            this.selectedFactorForConnection = null;
            this.removeTempLine();
        }
    }

    // Create manual connections between factors with color cycling
    createManualConnection(factor1, factor2) {
        const connectionId = `${Math.min(factor1.id, factor2.id)}-${Math.max(factor1.id, factor2.id)}`;
        
        // Check if connection already exists
        if (this.manualConnections.has(connectionId)) {
            this.showFeedback('Connection already exists!', 'error');
            return;
        }

        // Create new Line object with current color index
        const svg = document.getElementById('connectionOverlay');
        const line = new Line(
            { id: factor1.id, placement: this.placedFactors.get(factor1.id) },
            { id: factor2.id, placement: this.placedFactors.get(factor2.id) },
            svg,
            this.connectionColorIndex // Pass current color index
        );

        this.manualConnections.set(connectionId, line);
        
        // Cycle to next color (1-8 colors available)
        this.connectionColorIndex = (this.connectionColorIndex % 8) + 1;
        
        this.showFeedback(`Connected ${factor1.factor.text} to ${factor2.factor.text} with color ${this.connectionColorIndex - 1}`, 'success');
    }

    // Update all manual connection positions
    updateManualConnections() {
        this.manualConnections.forEach((line) => {
            line.updatePosition();
        });
    }

    // Remove a manual connection
    removeManualConnection(connectionId) {
        if (this.manualConnections.has(connectionId)) {
            this.manualConnections.get(connectionId).remove();
            this.manualConnections.delete(connectionId);
        }
    }

    populateFactors() {
        const factorsGrid = document.getElementById('factorsGrid');
        factorsGrid.innerHTML = '';

        this.factors.forEach(factor => {
            if (!this.placedFactors.has(factor.id)) {
                const factorCard = this.createFactorCard(factor);
                factorsGrid.appendChild(factorCard);
            }
        });
    }

    createFactorCard(factor) {
        const card = document.createElement('div');
        card.className = 'factor-card';
        card.draggable = true;
        card.dataset.factorId = factor.id;
        card.dataset.category = factor.category;
        card.textContent = factor.text;
        card.title = factor.detail; // Tooltip for additional information

        // Click event listener for connection mode
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleFactorClick(card);
        });

        return card;
    }

    setupDragAndDrop() {
        const mappingArea = document.getElementById('mappingArea');
        const factorsGrid = document.getElementById('factorsGrid');

        // Handle drag start for both touch and mouse
        const handleDragStart = (e, element) => {
            // Don't drag if in connection mode
            if (this.connectionMode) {
                e.preventDefault();
                return;
            }

            this.draggedElement = element;
            element.classList.add('dragging');

            // Calculate offset for precise positioning
            const rect = element.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            this.dragOffset = {
                x: clientX - rect.left,
                y: clientY - rect.top
            };

            // Prevent default to enable custom drag behavior
            e.preventDefault();
        };

        // Handle drag move
        const handleDragMove = (e) => {
            if (!this.draggedElement || this.connectionMode) return;

            e.preventDefault();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            // Update element position
            this.draggedElement.style.position = 'fixed';
            this.draggedElement.style.left = `${clientX - this.dragOffset.x}px`;
            this.draggedElement.style.top = `${clientY - this.dragOffset.y}px`;
            this.draggedElement.style.zIndex = '1000';

            // Check for drop zone highlighting
            this.highlightDropZones(clientX, clientY);
        };

        // Handle drag end
        const handleDragEnd = (e) => {
            if (!this.draggedElement || this.connectionMode) return;

            const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
            const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

            // Check if dropped in mapping area
            const mappingRect = mappingArea.getBoundingClientRect();
            const isInMappingArea = clientX >= mappingRect.left && 
                                   clientX <= mappingRect.right && 
                                   clientY >= mappingRect.top && 
                                   clientY <= mappingRect.bottom;

            if (isInMappingArea) {
                this.placeFactor(this.draggedElement, clientX - mappingRect.left, clientY - mappingRect.top);
            } else {
                // Return to original position
                this.returnFactorToGrid(this.draggedElement);
            }

            // Clean up
            this.draggedElement.classList.remove('dragging');
            this.draggedElement.style.position = '';
            this.draggedElement.style.left = '';
            this.draggedElement.style.top = '';
            this.draggedElement.style.zIndex = '';
            this.draggedElement = null;

            // Remove drop zone highlights
            this.clearDropZoneHighlights();
        };

        // Mouse events
        factorsGrid.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('factor-card')) {
                handleDragStart(e, e.target);
            }
        });

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);

        // Touch events for mobile support
        factorsGrid.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('factor-card')) {
                handleDragStart(e, e.target);
            }
        }, { passive: false });

        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('touchend', handleDragEnd);

        // Handle dragging of already placed factors
        mappingArea.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('factor-card') && e.target.classList.contains('placed')) {
                handleDragStart(e, e.target);
            }
        });

        mappingArea.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('factor-card') && e.target.classList.contains('placed')) {
                handleDragStart(e, e.target);
            }
        }, { passive: false });
    }

    setupDropZones() {
        const zones = document.querySelectorAll('.category-zone');
        
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                if (this.draggedElement) {
                    const zoneRect = zone.getBoundingClientRect();
                    const mappingRect = document.getElementById('mappingArea').getBoundingClientRect();
                    
                    this.placeFactor(
                        this.draggedElement, 
                        zoneRect.left - mappingRect.left + zoneRect.width / 2,
                        zoneRect.top - mappingRect.top + zoneRect.height / 2
                    );
                }
            });
        });
    }

    highlightDropZones(clientX, clientY) {
        const zones = document.querySelectorAll('.category-zone');
        zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const isOver = clientX >= rect.left && clientX <= rect.right && 
                          clientY >= rect.top && clientY <= rect.bottom;
            
            zone.classList.toggle('drag-over', isOver);
        });
    }

    clearDropZoneHighlights() {
        document.querySelectorAll('.category-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
    }

    placeFactor(element, x, y) {
        const mappingArea = document.getElementById('mappingArea');
        const factorId = element.dataset.factorId;
        const factor = this.factors.find(f => f.id === factorId);

        // Remove from grid if it was there
        if (element.parentNode.id === 'factorsGrid') {
            element.remove();
        }

        // Create new placed element or update existing one
        let placedElement = element;
        if (!element.classList.contains('placed')) {
            placedElement = this.createFactorCard(factor);
            placedElement.classList.add('placed');
            
            // Add connection mode class if in connection mode
            if (this.connectionMode) {
                placedElement.classList.add('connection-mode');
            }
        }

        // Position the element - adjusted for larger category zones
        placedElement.style.position = 'absolute';
        placedElement.style.left = `${Math.max(10, Math.min(x - 70, mappingArea.clientWidth - 140))}px`;
        placedElement.style.top = `${Math.max(10, Math.min(y - 22, mappingArea.clientHeight - 44))}px`;

        // Add to mapping area
        mappingArea.appendChild(placedElement);
        
        // Track placement
        this.placedFactors.set(factorId, {
            element: placedElement,
            x: parseInt(placedElement.style.left),
            y: parseInt(placedElement.style.top),
            factor: factor
        });

        // Update manual connections only (removed automatic connection updates)
        this.updateManualConnections();
        
        // Provide feedback
        this.showFeedback(`${factor.text} placed! Use Connect Mode to link it to related factors with colored lines.`, 'success');
    }

    returnFactorToGrid(element) {
        const factorId = element.dataset.factorId;
        
        // Remove from placed factors if it was placed
        if (this.placedFactors.has(factorId)) {
            this.placedFactors.delete(factorId);
            element.remove();
            
            // Remove any manual connections involving this factor
            const connectionsToRemove = [];
            this.manualConnections.forEach((line, connectionId) => {
                if (line.connects(factorId, line.startFactor.id) || line.connects(factorId, line.endFactor.id)) {
                    connectionsToRemove.push(connectionId);
                }
            });
            
            connectionsToRemove.forEach(connectionId => {
                this.removeManualConnection(connectionId);
            });
        }

        // Re-populate the grid
        this.populateFactors();
    }

    checkConnections() {
        const placedCount = this.placedFactors.size;
        const manualConnectionCount = this.manualConnections.size;
        
        // Calculate score based on correct placements and manual connections
        let score = 0;
        let feedback = '';

        // Check category placements - updated for larger zones
        let correctPlacements = 0;
        this.placedFactors.forEach((placement, id) => {
            const factor = placement.factor;
            const zones = document.querySelectorAll('.category-zone');
            
            zones.forEach(zone => {
                const rect = zone.getBoundingClientRect();
                const mappingRect = document.getElementById('mappingArea').getBoundingClientRect();
                const elementRect = placement.element.getBoundingClientRect();
                
                // Check if element overlaps with correct zone - improved detection for larger zones
                const isInZone = !(elementRect.right < rect.left || 
                                 elementRect.left > rect.right || 
                                 elementRect.bottom < rect.top || 
                                 elementRect.top > rect.bottom);
                
                const zoneCategory = zone.classList.contains('trigger-zone') ? 'trigger' :
                                   zone.classList.contains('contributory-zone') ? 'contributory' : 'underlying';
                
                if (isInZone && factor.category === zoneCategory) {
                    correctPlacements++;
                }
            });
        });

        score = Math.round((correctPlacements / this.factors.length) * 100);

        if (score >= 80) {
            feedback = `Excellent work! ${correctPlacements}/${this.factors.length} factors correctly categorized with ${manualConnectionCount} colored connections. You've demonstrated a strong understanding of the causes of WWII.`;
        } else if (score >= 60) {
            feedback = `Good progress! ${correctPlacements}/${this.factors.length} factors correctly placed with ${manualConnectionCount} colored connections. Consider the timeline and impact of each factor.`;
        } else {
            feedback = `Keep trying! ${correctPlacements}/${this.factors.length} factors correctly placed. Remember: Trigger = immediate causes, Contributory = escalating events, Underlying = long-term conditions.`;
        }

        this.showFeedback(feedback, score >= 60 ? 'success' : 'error');
    }

    showHint() {
        const hints = [
            "Start with the Treaty of Versailles - it's a foundational underlying factor that created conditions for conflict.",
            "The German invasion of Poland was the immediate trigger that started the war in Europe.",
            "Consider the timeline: underlying factors (1919-1933), contributory factors (1933-1939), trigger factors (1939).",
            "Appeasement policy failed because it encouraged Hitler's aggressive expansion rather than stopping it.",
            "Economic depression helped extremist parties gain power across Europe, not just in Germany.",
            "Use Connect Mode to create custom colored connections between factors that you think are related!",
            "Each new connection you create will be a different color - up to 8 different colors available!",
            "The larger colored zones now make it easier to organize factors - red for triggers, orange for contributory, green for underlying!"
        ];

        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showFeedback(`💡 Hint: ${randomHint}`, 'success');
    }

    resetMapping() {
        // Clear all placed factors - removed automatic connections clearing
        this.placedFactors.clear();

        // Clear manual connections
        this.manualConnections.forEach((line) => line.remove());
        this.manualConnections.clear();

        // Reset connection color index
        this.connectionColorIndex = 1;

        // Reset connection mode
        if (this.connectionMode) {
            this.toggleConnectionMode();
        }

        // Remove placed elements from mapping area
        const mappingArea = document.getElementById('mappingArea');
        const placedElements = mappingArea.querySelectorAll('.factor-card.placed');
        placedElements.forEach(element => element.remove());

        // Clear all connections (manual connections only now)
        document.getElementById('connectionOverlay').innerHTML = '';

        // Repopulate factors grid
        this.populateFactors();

        this.showFeedback('Concept map reset. Start organizing the factors again!', 'success');
    }

    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Show tooltip on hover for factor cards
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('factor-card')) {
                const factorId = e.target.dataset.factorId;
                const factor = this.factors.find(f => f.id === factorId);
                
                if (factor && factor.detail) {
                    tooltip.textContent = factor.detail;
                    tooltip.classList.add('show');
                    
                    // Position tooltip
                    const rect = e.target.getBoundingClientRect();
                    tooltip.style.left = `${rect.left + rect.width / 2}px`;
                    tooltip.style.top = `${rect.top - 10}px`;
                    tooltip.style.transform = 'translate(-50%, -100%)';
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('factor-card')) {
                tooltip.classList.remove('show');
            }
        });
    }

    showFeedback(message, type = 'success') {
        const feedbackPanel = document.getElementById('feedbackPanel');
        const feedbackContent = document.getElementById('feedbackContent');
        
        feedbackContent.textContent = message;
        feedbackPanel.className = `feedback-panel ${type}`;
        feedbackPanel.classList.add('show');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            feedbackPanel.classList.remove('show');
        }, 4000);
    }
}

// Initialize the concept mapper when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConceptMapper();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Adjust layout if needed for different screen sizes
    const container = document.querySelector('.container');
    if (window.innerHeight > 600) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});