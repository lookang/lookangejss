// Singapore History Concept Mapping Interactive
// This script handles drag-and-drop functionality, connection creation, and validation

class ConceptMap {
    constructor() {
        // Initialize core properties
        this.canvas = document.getElementById('canvas');
        this.svg = document.getElementById('connections-svg');
        this.nodes = new Map(); // Store all concept nodes
        this.connections = new Map(); // Store all connections
        this.selectedNodes = []; // For creating connections
        this.draggedElement = null;
        this.zoomLevel = 1;
        this.connectionCounter = 0;
        
        // Initialize the application
        this.init();
        this.setupEventListeners();
        this.createArrowMarker();
    }
    
    init() {
        // Set up initial state and detect if running in iframe
        this.detectIframeMode();
        this.setupDragAndDrop();
        this.showWelcomeTooltip();
    }
    
    detectIframeMode() {
        // Adjust layout based on whether running in iframe or full browser
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    showWelcomeTooltip() {
        // Show header tooltip briefly on load
        const tooltip = document.getElementById('header-tooltip');
        setTimeout(() => {
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.opacity = '0';
            }, 3000);
        }, 500);
    }
    
    setupEventListeners() {
        // Tool button event listeners
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('example-btn').addEventListener('click', () => this.showExample());
        document.getElementById('validate-btn').addEventListener('click', () => this.validateConnections());
        document.getElementById('export-btn').addEventListener('click', () => this.exportMap());
        
        // Modal event listeners
        document.getElementById('save-connection').addEventListener('click', () => this.saveConnection());
        document.getElementById('cancel-connection').addEventListener('click', () => this.cancelConnection());
        document.getElementById('close-example').addEventListener('click', () => this.closeExample());
        
        // Canvas click for deselection
        this.canvas.addEventListener('click', (e) => {
            if (e.target === this.canvas) {
                this.clearSelection();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' && this.selectedNodes.length > 0) {
                this.deleteSelected();
            }
            if (e.key === 'Escape') {
                this.clearSelection();
                this.cancelConnection();
            }
        });
    }
    
    setupDragAndDrop() {
        // Set up drag and drop for content bank items
        const draggableItems = document.querySelectorAll('.draggable-item');
        
        draggableItems.forEach(item => {
            // Mouse events
            item.addEventListener('mousedown', (e) => this.startDrag(e, item));
            
            // Touch events for mobile
            item.addEventListener('touchstart', (e) => this.startDrag(e, item), { passive: false });
        });
        
        // Global mouse/touch move and end events
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', (e) => this.endDrag(e));
        document.addEventListener('touchmove', (e) => this.handleDrag(e), { passive: false });
        document.addEventListener('touchend', (e) => this.endDrag(e));
    }
    
    startDrag(e, item) {
        // Initialize drag operation
        e.preventDefault();
        this.draggedElement = item.cloneNode(true);
        this.draggedElement.classList.add('dragging');
        
        // Style the dragged element
        this.draggedElement.style.position = 'fixed';
        this.draggedElement.style.zIndex = '1000';
        this.draggedElement.style.pointerEvents = 'none';
        this.draggedElement.style.transform = 'scale(1.1)';
        this.draggedElement.style.opacity = '0.8';
        
        document.body.appendChild(this.draggedElement);
        
        // Update position immediately
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.draggedElement.style.left = (clientX - 50) + 'px';
        this.draggedElement.style.top = (clientY - 20) + 'px';
    }
    
    handleDrag(e) {
        // Update dragged element position
        if (!this.draggedElement) return;
        
        e.preventDefault();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.draggedElement.style.left = (clientX - 50) + 'px';
        this.draggedElement.style.top = (clientY - 20) + 'px';
    }
    
    endDrag(e) {
        // Complete drag operation
        if (!this.draggedElement) return;
        
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
        
        // Check if dropped on canvas
        const canvasRect = this.canvas.getBoundingClientRect();
        
        if (clientX >= canvasRect.left && clientX <= canvasRect.right &&
            clientY >= canvasRect.top && clientY <= canvasRect.bottom) {
            
            // Create concept node on canvas
            this.createConceptNode(
                this.draggedElement.textContent,
                this.draggedElement.dataset.type,
                this.draggedElement.dataset.id,
                this.draggedElement.className,
                clientX - canvasRect.left,
                clientY - canvasRect.top
            );
        }
        
        // Clean up
        document.body.removeChild(this.draggedElement);
        this.draggedElement = null;
    }
    
    createConceptNode(text, type, id, className, x, y) {
        // Create a new concept node on the canvas
        const nodeId = `node-${id}-${Date.now()}`;
        const node = document.createElement('div');
        
        node.className = `concept-node ${className}`;
        node.textContent = text;
        node.dataset.type = type;
        node.dataset.id = id;
        node.id = nodeId;
        
        // Position the node
        node.style.left = (x - 60) + 'px';
        node.style.top = (y - 20) + 'px';
        
        // Add event listeners
        node.addEventListener('click', (e) => this.selectNode(e, node));
        node.addEventListener('mousedown', (e) => this.startNodeDrag(e, node));
        node.addEventListener('touchstart', (e) => this.startNodeDrag(e, node), { passive: false });
        
        // Add to canvas and store reference
        this.canvas.appendChild(node);
        this.nodes.set(nodeId, {
            element: node,
            type: type,
            id: id,
            text: text
        });
        
        // Animate appearance
        node.style.opacity = '0';
        node.style.transform = 'scale(0.5)';
        
        requestAnimationFrame(() => {
            node.style.transition = 'all 0.3s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        });
        
        this.showFeedback('Node added! Click two nodes to connect them.', 'success');
    }
    
    startNodeDrag(e, node) {
        // Start dragging an existing node
        e.stopPropagation();
        this.draggedNode = node;
        this.dragOffset = {
            x: (e.clientX || e.touches[0].clientX) - node.offsetLeft,
            y: (e.clientY || e.touches[0].clientY) - node.offsetTop
        };
        
        document.addEventListener('mousemove', this.handleNodeDrag.bind(this));
        document.addEventListener('mouseup', this.endNodeDrag.bind(this));
        document.addEventListener('touchmove', this.handleNodeDrag.bind(this), { passive: false });
        document.addEventListener('touchend', this.endNodeDrag.bind(this));
    }
    
    handleNodeDrag(e) {
        // Handle node dragging
        if (!this.draggedNode) return;
        
        e.preventDefault();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        const canvasRect = this.canvas.getBoundingClientRect();
        const newX = clientX - canvasRect.left - this.dragOffset.x;
        const newY = clientY - canvasRect.top - this.dragOffset.y;
        
        // Keep within canvas bounds
        const maxX = this.canvas.offsetWidth - this.draggedNode.offsetWidth;
        const maxY = this.canvas.offsetHeight - this.draggedNode.offsetHeight;
        
        this.draggedNode.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
        this.draggedNode.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
        
        // Update connections
        this.updateConnections();
    }
    
    endNodeDrag(e) {
        // End node dragging
        this.draggedNode = null;
        this.dragOffset = null;
        
        document.removeEventListener('mousemove', this.handleNodeDrag.bind(this));
        document.removeEventListener('mouseup', this.endNodeDrag.bind(this));
        document.removeEventListener('touchmove', this.handleNodeDrag.bind(this));
        document.removeEventListener('touchend', this.endNodeDrag.bind(this));
    }
    
    selectNode(e, node) {
        // Handle node selection for creating connections
        e.stopPropagation();
        
        if (node.classList.contains('selected')) {
            // Deselect
            node.classList.remove('selected');
            this.selectedNodes = this.selectedNodes.filter(n => n !== node);
        } else {
            // Select
            node.classList.add('selected');
            this.selectedNodes.push(node);
            
            // If two nodes selected, create connection
            if (this.selectedNodes.length === 2) {
                this.showConnectionModal();
            }
        }
    }
    
    showConnectionModal() {
        // Show modal for connection details
        const modal = document.getElementById('connection-modal');
        modal.style.display = 'flex';
        document.getElementById('connection-label').focus();
    }
    
    saveConnection() {
        // Save the connection between selected nodes
        const label = document.getElementById('connection-label').value.trim();
        const note = document.getElementById('connection-note').value.trim();
        
        if (!label) {
            this.showFeedback('Please enter a relationship label.', 'error');
            return;
        }
        
        if (this.selectedNodes.length === 2) {
            this.createConnection(this.selectedNodes[0], this.selectedNodes[1], label, note);
        }
        
        this.cancelConnection();
    }
    
    cancelConnection() {
        // Cancel connection creation
        document.getElementById('connection-modal').style.display = 'none';
        document.getElementById('connection-label').value = '';
        document.getElementById('connection-note').value = '';
        this.clearSelection();
    }
    
    createConnection(node1, node2, label, note) {
        // Create visual connection between two nodes
        const connectionId = `connection-${this.connectionCounter++}`;
        
        // Create connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('connection-line');
        line.id = connectionId;
        
        // Create label
        const labelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelElement.classList.add('connection-label');
        labelElement.textContent = label;
        labelElement.id = `${connectionId}-label`;
        
        // Add to SVG
        this.svg.appendChild(line);
        this.svg.appendChild(labelElement);
        
        // Store connection data
        this.connections.set(connectionId, {
            node1: node1,
            node2: node2,
            label: label,
            note: note,
            line: line,
            labelElement: labelElement
        });
        
        // Update visual positions
        this.updateConnection(connectionId);
        
        this.showFeedback(`Connection created: "${label}"`, 'success');
    }
    
    updateConnections() {
        // Update all connection positions
        this.connections.forEach((connection, id) => {
            this.updateConnection(id);
        });
    }
    
    updateConnection(connectionId) {
        // Update specific connection position
        const connection = this.connections.get(connectionId);
        if (!connection) return;
        
        const rect1 = connection.node1.getBoundingClientRect();
        const rect2 = connection.node2.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Calculate relative positions
        const x1 = rect1.left + rect1.width / 2 - canvasRect.left;
        const y1 = rect1.top + rect1.height / 2 - canvasRect.top;
        const x2 = rect2.left + rect2.width / 2 - canvasRect.left;
        const y2 = rect2.top + rect2.height / 2 - canvasRect.top;
        
        // Update line
        connection.line.setAttribute('x1', x1);
        connection.line.setAttribute('y1', y1);
        connection.line.setAttribute('x2', x2);
        connection.line.setAttribute('y2', y2);
        
        // Update label position (midpoint)
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        
        connection.labelElement.setAttribute('x', midX);
        connection.labelElement.setAttribute('y', midY - 5);
    }
    
    createArrowMarker() {
        // Create arrow marker for connection lines
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        
        marker.id = 'arrowhead';
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#666');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        this.svg.appendChild(defs);
    }
    
    clearSelection() {
        // Clear all selected nodes
        this.selectedNodes.forEach(node => {
            node.classList.remove('selected');
        });
        this.selectedNodes = [];
    }
    
    zoom(factor) {
        // Zoom canvas in/out
        this.zoomLevel *= factor;
        this.zoomLevel = Math.max(0.5, Math.min(2, this.zoomLevel));
        
        this.canvas.style.transform = `scale(${this.zoomLevel})`;
        this.canvas.style.transformOrigin = 'center center';
        
        this.showFeedback(`Zoom: ${Math.round(this.zoomLevel * 100)}%`, 'success');
    }
    
    showExample() {
        // Show example overlay
        document.getElementById('example-overlay').style.display = 'flex';
    }
    
    closeExample() {
        // Close example overlay
        document.getElementById('example-overlay').style.display = 'none';
    }
    
    validateConnections() {
        // Validate historical accuracy of connections
        const validConnections = [
            { from: 'raffles', to: 'founding', relationship: 'established' },
            { from: 'raffles-site', to: 'founding', relationship: 'location' },
            { from: 'fall', to: 'occupation', relationship: 'led to' },
            { from: 'lky', to: 'independence', relationship: 'led' },
            { from: 'city-hall', to: 'independence', relationship: 'declared at' }
        ];
        
        let score = 0;
        let feedback = 'Validation Results:\n';
        
        // Check for key connections
        this.connections.forEach(connection => {
            const node1Id = connection.node1.dataset.id;
            const node2Id = connection.node2.dataset.id;
            
            const isValid = validConnections.some(valid => 
                (valid.from === node1Id && valid.to === node2Id) ||
                (valid.from === node2Id && valid.to === node1Id)
            );
            
            if (isValid) {
                score++;
                feedback += `✓ ${connection.label}\n`;
            } else {
                feedback += `? ${connection.label} (verify accuracy)\n`;
            }
        });
        
        feedback += `\nScore: ${score}/${validConnections.length} key connections found.`;
        
        if (score >= 3) {
            this.showFeedback('Great work! Strong historical connections identified.', 'success');
        } else {
            this.showFeedback('Good start! Try adding more key historical relationships.', 'info');
        }
    }
    
    exportMap() {
        // Export concept map data
        const mapData = {
            nodes: Array.from(this.nodes.entries()).map(([id, node]) => ({
                id: id,
                text: node.text,
                type: node.type,
                position: {
                    x: node.element.offsetLeft,
                    y: node.element.offsetTop
                }
            })),
            connections: Array.from(this.connections.entries()).map(([id, connection]) => ({
                id: id,
                from: connection.node1.id,
                to: connection.node2.id,
                label: connection.label,
                note: connection.note
            }))
        };
        
        // Create downloadable JSON
        const dataStr = JSON.stringify(mapData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'singapore-history-concept-map.json';
        link.click();
        
        URL.revokeObjectURL(url);
        
        this.showFeedback('Concept map exported successfully!', 'success');
    }
    
    deleteSelected() {
        // Delete selected nodes and their connections
        this.selectedNodes.forEach(node => {
            // Remove connections involving this node
            this.connections.forEach((connection, id) => {
                if (connection.node1 === node || connection.node2 === node) {
                    connection.line.remove();
                    connection.labelElement.remove();
                    this.connections.delete(id);
                }
            });
            
            // Remove node
            this.nodes.delete(node.id);
            node.remove();
        });
        
        this.selectedNodes = [];
        this.showFeedback('Selected items deleted.', 'success');
    }
    
    showFeedback(message, type = 'success') {
        // Show user feedback
        const feedback = document.getElementById('validation-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type} show`;
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    }
}

// Initialize the concept map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConceptMap();
});

// Handle window resize to update connections
window.addEventListener('resize', () => {
    setTimeout(() => {
        if (window.conceptMap) {
            window.conceptMap.updateConnections();
        }
    }, 100);
});