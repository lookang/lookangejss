// Concept Mapping Interactive Application
// Manages student input processing, concept node generation, and connection visualization

class ConceptMapper {
    constructor() {
        // Initialize application state
        this.concepts = [];
        this.connections = [];
        this.selectedNodes = [];
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        
        // Get DOM elements
        this.canvas = document.getElementById('connectionCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.mappingArea = document.getElementById('mappingArea');
        this.conceptNodes = document.getElementById('conceptNodes');
        this.actionSuggestions = document.getElementById('actionSuggestions');
        this.connectionIndicator = document.getElementById('connectionIndicator');
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Set up canvas dimensions
        this.resizeCanvas();
        
        // Bind event listeners
        this.bindEvents();
        
        // Check if running in iframe
        this.checkIframeMode();
        
        // Generate initial action plan suggestions
        this.generateActionSuggestions();
    }
    
    checkIframeMode() {
        // Detect if running in iframe and adjust height accordingly
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    bindEvents() {
        // Input and control button events
        document.getElementById('generateMap').addEventListener('click', () => this.generateConceptMap());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('resetZoom').addEventListener('click', () => this.resetView());
        document.getElementById('printMap').addEventListener('click', () => this.printMap());
        
        // Canvas and mapping area events
        this.mappingArea.addEventListener('click', (e) => this.handleMapClick(e));
        this.mappingArea.addEventListener('mousedown', (e) => this.startDrag(e));
        this.mappingArea.addEventListener('mousemove', (e) => this.handleDrag(e));
        this.mappingArea.addEventListener('mouseup', () => this.endDrag());
        
        // Touch events for mobile support
        this.mappingArea.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.mappingArea.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.mappingArea.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Window resize event
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        // Adjust canvas size to match mapping area
        const rect = this.mappingArea.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.redrawConnections();
    }
    
    generateConceptMap() {
        // Extract and process user inputs to generate concept nodes
        const inputs = {
            qualities: document.getElementById('qualities').value.trim(),
            aspirations: document.getElementById('aspirations').value.trim(),
            community: document.getElementById('community').value.trim(),
            work: document.getElementById('work').value.trim()
        };
        
        // Validate inputs
        const filledInputs = Object.values(inputs).filter(input => input.length > 0);
        if (filledInputs.length === 0) {
            this.showMessage('Please fill in at least one field to generate the concept map.');
            return;
        }
        
        // Clear existing concepts
        this.clearConcepts();
        
        // Process each input category
        Object.entries(inputs).forEach(([category, text], index) => {
            if (text) {
                this.processInput(category, text, index);
            }
        });
        
        // Auto-generate intelligent connections
        this.generateIntelligentConnections();
        
        // Update action suggestions based on generated concepts
        this.updateActionSuggestions();
        
        // Show connection indicator
        this.showConnectionIndicator();
    }
    
    processInput(category, text, categoryIndex) {
        // Extract key themes and sub-themes from input text
        const themes = this.extractThemes(text);
        const colors = {
            qualities: '#ff6b6b',
            aspirations: '#4ecdc4',
            community: '#45b7d1',
            work: '#96ceb4'
        };
        
        // Create concept nodes for each theme
        themes.forEach((theme, themeIndex) => {
            const concept = {
                id: `${category}_${themeIndex}`,
                text: theme,
                category: category,
                color: colors[category],
                x: this.calculateNodePosition(categoryIndex, themeIndex, themes.length).x,
                y: this.calculateNodePosition(categoryIndex, themeIndex, themes.length).y,
                connections: []
            };
            
            this.concepts.push(concept);
            this.createConceptNode(concept);
        });
    }
    
    extractThemes(text) {
        // Simple theme extraction using keyword analysis and sentence splitting
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const themes = [];
        
        sentences.forEach(sentence => {
            const cleaned = sentence.trim();
            if (cleaned.length > 15 && cleaned.length < 100) {
                themes.push(cleaned);
            }
        });
        
        // If no good sentences found, split by commas or use whole text
        if (themes.length === 0) {
            const parts = text.split(',').map(part => part.trim()).filter(part => part.length > 5);
            if (parts.length > 1) {
                themes.push(...parts.slice(0, 4)); // Limit to 4 themes per category
            } else {
                themes.push(text.substring(0, 80) + (text.length > 80 ? '...' : ''));
            }
        }
        
        return themes.slice(0, 3); // Limit to 3 themes per category for visual clarity
    }
    
    calculateNodePosition(categoryIndex, themeIndex, totalThemes) {
        // Calculate optimal positioning for concept nodes in a circular/radial layout
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
        
        // Position categories in quadrants
        const categoryAngles = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
        const baseAngle = categoryAngles[categoryIndex % 4];
        
        // Spread themes within each category
        const angleSpread = Math.PI / 6; // 30 degrees spread
        const themeAngle = baseAngle + (themeIndex - (totalThemes - 1) / 2) * (angleSpread / Math.max(totalThemes - 1, 1));
        
        return {
            x: centerX + Math.cos(themeAngle) * radius,
            y: centerY + Math.sin(themeAngle) * radius
        };
    }
    
    createConceptNode(concept) {
        // Create DOM element for concept node
        const nodeElement = document.createElement('div');
        nodeElement.className = `concept-node ${concept.category}`;
        nodeElement.id = concept.id;
        nodeElement.textContent = concept.text;
        nodeElement.style.left = `${concept.x - 60}px`; // Center the node
        nodeElement.style.top = `${concept.y - 30}px`;
        
        // Add click event for connection creation
        nodeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectNode(concept);
        });
        
        // Add tooltip for long text
        if (concept.text.length > 50) {
            nodeElement.title = concept.text;
        }
        
        this.conceptNodes.appendChild(nodeElement);
    }
    
    selectNode(concept) {
        // Handle node selection for creating connections
        const nodeElement = document.getElementById(concept.id);
        
        if (this.selectedNodes.includes(concept)) {
            // Deselect node
            this.selectedNodes = this.selectedNodes.filter(node => node.id !== concept.id);
            nodeElement.classList.remove('selected');
        } else {
            // Select node
            this.selectedNodes.push(concept);
            nodeElement.classList.add('selected');
            
            // Create connection if two nodes are selected
            if (this.selectedNodes.length === 2) {
                this.createConnection(this.selectedNodes[0], this.selectedNodes[1]);
                this.clearSelection();
            }
        }
        
        // Update connection indicator
        if (this.selectedNodes.length === 1) {
            this.connectionIndicator.textContent = 'Select another concept to create a connection';
            this.connectionIndicator.classList.add('show');
        } else {
            this.connectionIndicator.classList.remove('show');
        }
    }
    
    createConnection(node1, node2) {
        // Create visual connection between two nodes
        const connectionId = `${node1.id}_${node2.id}`;
        
        // Check if connection already exists
        if (this.connections.some(conn => conn.id === connectionId || conn.id === `${node2.id}_${node1.id}`)) {
            return;
        }
        
        const connection = {
            id: connectionId,
            node1: node1,
            node2: node2,
            strength: this.calculateConnectionStrength(node1, node2)
        };
        
        this.connections.push(connection);
        node1.connections.push(node2.id);
        node2.connections.push(node1.id);
        
        this.redrawConnections();
        this.updateActionSuggestions();
    }
    
    calculateConnectionStrength(node1, node2) {
        // Calculate connection strength based on text similarity and category relationships
        const categoryStrength = {
            'qualities-aspirations': 0.9,
            'aspirations-community': 0.8,
            'community-work': 0.7,
            'work-qualities': 0.8,
            'qualities-community': 0.6,
            'aspirations-work': 0.7
        };
        
        const key1 = `${node1.category}-${node2.category}`;
        const key2 = `${node2.category}-${node1.category}`;
        
        return categoryStrength[key1] || categoryStrength[key2] || 0.5;
    }
    
    generateIntelligentConnections() {
        // Auto-generate logical connections between concepts
        const categories = ['qualities', 'aspirations', 'community', 'work'];
        
        categories.forEach(cat1 => {
            categories.forEach(cat2 => {
                if (cat1 !== cat2) {
                    const nodes1 = this.concepts.filter(c => c.category === cat1);
                    const nodes2 = this.concepts.filter(c => c.category === cat2);
                    
                    // Create one connection between categories if nodes exist
                    if (nodes1.length > 0 && nodes2.length > 0) {
                        const node1 = nodes1[0];
                        const node2 = nodes2[0];
                        
                        if (this.calculateConnectionStrength(node1, node2) > 0.6) {
                            this.createConnection(node1, node2);
                        }
                    }
                }
            });
        });
    }
    
    redrawConnections() {
        // Clear and redraw all connections on canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.connections.forEach(connection => {
            this.drawConnection(connection);
        });
    }
    
    drawConnection(connection) {
        // Draw animated connection line between nodes
        const node1Elem = document.getElementById(connection.node1.id);
        const node2Elem = document.getElementById(connection.node2.id);
        
        if (!node1Elem || !node2Elem) return;
        
        const rect1 = node1Elem.getBoundingClientRect();
        const rect2 = node2Elem.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2 - canvasRect.left;
        const y1 = rect1.top + rect1.height / 2 - canvasRect.top;
        const x2 = rect2.left + rect2.width / 2 - canvasRect.left;
        const y2 = rect2.top + rect2.height / 2 - canvasRect.top;
        
        // Draw connection line with gradient
        const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, connection.node1.color);
        gradient.addColorStop(1, connection.node2.color);
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = Math.max(2, connection.strength * 4);
        this.ctx.lineCap = 'round';
        
        // Draw curved line
        this.ctx.beginPath();
        const controlX = (x1 + x2) / 2;
        const controlY = (y1 + y2) / 2 - 30;
        this.ctx.moveTo(x1, y1);
        this.ctx.quadraticCurveTo(controlX, controlY, x2, y2);
        this.ctx.stroke();
        
        // Draw connection strength indicator
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 15;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.beginPath();
        this.ctx.arc(midX, midY, 8, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#333';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(Math.round(connection.strength * 100) + '%', midX, midY + 3);
    }
    
    generateActionSuggestions() {
        // Generate initial action plan suggestions
        const suggestions = [
            {
                title: "Self-Reflection",
                content: "Regularly assess your personal qualities and how they align with your aspirations."
            },
            {
                title: "Skill Development",
                content: "Identify skills needed for your future goals and create a learning plan."
            },
            {
                title: "Community Engagement",
                content: "Find opportunities to contribute to your community while building experience."
            },
            {
                title: "Work Experience",
                content: "Seek internships or volunteer work that matches your interests and values."
            }
        ];
        
        this.displayActionSuggestions(suggestions);
    }
    
    updateActionSuggestions() {
        // Update action suggestions based on created connections
        const suggestions = [];
        
        if (this.connections.length > 0) {
            suggestions.push({
                title: "Connection Analysis",
                content: `You've identified ${this.connections.length} key relationships. Focus on strengthening these connections.`
            });
        }
        
        const categories = [...new Set(this.concepts.map(c => c.category))];
        if (categories.includes('qualities') && categories.includes('aspirations')) {
            suggestions.push({
                title: "Leverage Strengths",
                content: "Use your personal qualities as stepping stones toward your aspirations."
            });
        }
        
        if (categories.includes('community') && categories.includes('work')) {
            suggestions.push({
                title: "Career Path",
                content: "Align your work attitude with community contribution goals for meaningful career development."
            });
        }
        
        if (suggestions.length === 0) {
            this.generateActionSuggestions();
        } else {
            this.displayActionSuggestions(suggestions);
        }
    }
    
    displayActionSuggestions(suggestions) {
        // Display action suggestions as thought bubbles
        this.actionSuggestions.innerHTML = '';
        
        suggestions.forEach((suggestion, index) => {
            const bubble = document.createElement('div');
            bubble.className = 'thought-bubble';
            bubble.innerHTML = `
                <h4>${suggestion.title}</h4>
                <p>${suggestion.content}</p>
            `;
            
            // Stagger animation
            setTimeout(() => {
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateX(20px)';
                this.actionSuggestions.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.style.transition = 'all 0.5s ease';
                    bubble.style.opacity = '1';
                    bubble.style.transform = 'translateX(0)';
                }, 50);
            }, index * 200);
        });
    }
    
    clearSelection() {
        // Clear all selected nodes
        this.selectedNodes.forEach(node => {
            const nodeElement = document.getElementById(node.id);
            if (nodeElement) {
                nodeElement.classList.remove('selected');
            }
        });
        this.selectedNodes = [];
        this.connectionIndicator.classList.remove('show');
    }
    
    clearConcepts() {
        // Clear all concepts and connections
        this.concepts = [];
        this.connections = [];
        this.selectedNodes = [];
        this.conceptNodes.innerHTML = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.connectionIndicator.classList.remove('show');
    }
    
    clearAll() {
        // Clear everything including inputs
        this.clearConcepts();
        document.getElementById('qualities').value = '';
        document.getElementById('aspirations').value = '';
        document.getElementById('community').value = '';
        document.getElementById('work').value = '';
        this.generateActionSuggestions();
    }
    
    zoom(factor) {
        // Implement zoom functionality
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(2, this.zoomLevel));
        
        this.conceptNodes.style.transform = `scale(${this.zoomLevel})`;
        this.redrawConnections();
    }
    
    resetView() {
        // Reset zoom and pan
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.conceptNodes.style.transform = 'scale(1)';
        this.redrawConnections();
    }
    
    printMap() {
        // Prepare and trigger print functionality
        const printWindow = window.open('', '_blank');
        const mapContent = this.mappingArea.innerHTML;
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Personal Aspirations Concept Map</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .mapping-area { position: relative; width: 100%; height: 600px; }
                        .concept-node { position: absolute; background: white; border-radius: 15px; 
                                      padding: 12px; border: 3px solid; font-size: 12px; }
                        .concept-node.qualities { border-color: #ff6b6b; background: #ff6b6b; color: white; }
                        .concept-node.aspirations { border-color: #4ecdc4; background: #4ecdc4; color: white; }
                        .concept-node.community { border-color: #45b7d1; background: #45b7d1; color: white; }
                        .concept-node.work { border-color: #96ceb4; background: #96ceb4; color: white; }
                    </style>
                </head>
                <body>
                    <h1>Personal Aspirations Concept Map</h1>
                    <div class="mapping-area">${mapContent}</div>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
    
    showConnectionIndicator() {
        // Show connection mode indicator
        this.connectionIndicator.textContent = 'Click on concepts to create connections';
        this.connectionIndicator.classList.add('show');
        
        setTimeout(() => {
            this.connectionIndicator.classList.remove('show');
        }, 3000);
    }
    
    showMessage(message) {
        // Show temporary message to user
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px;
            z-index: 1000; font-size: 14px; text-align: center; max-width: 300px;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.startDrag({ clientX: touch.clientX, clientY: touch.clientY });
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleDrag({ clientX: touch.clientX, clientY: touch.clientY });
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.endDrag();
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
    }
    
    handleDrag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.dragStart.x;
        const deltaY = e.clientY - this.dragStart.y;
        
        this.panOffset.x += deltaX;
        this.panOffset.y += deltaY;
        
        this.conceptNodes.style.transform = `scale(${this.zoomLevel}) translate(${this.panOffset.x}px, ${this.panOffset.y}px)`;
        
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.redrawConnections();
    }
    
    endDrag() {
        this.isDragging = false;
    }
    
    handleMapClick(e) {
        // Handle clicks on empty map area
        if (e.target === this.mappingArea) {
            this.clearSelection();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConceptMapper();
});