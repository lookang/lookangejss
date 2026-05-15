// The Giver Concept Mapping Interactive
// Designed for Primary 5 students with mixed abilities
// Implements cognitive load theory and multimedia learning principles

class ConceptMapper {
    constructor() {
        // Initialize application state
        this.conceptItems = [];
        this.connections = [];
        this.selectedItems = [];
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        
        // Initialize the application
        this.init();
    }

    init() {
        // Set up event listeners for drag and drop functionality
        this.setupDragAndDrop();
        
        // Set up modal and UI interactions
        this.setupModalHandlers();
        
        // Set up control buttons
        this.setupControls();
        
        // Set up connection creation
        this.setupConnectionHandlers();
        
        console.log('Concept Mapper initialized successfully');
    }

    setupDragAndDrop() {
        const sidebar = document.querySelector('.sidebar');
        const conceptMap = document.getElementById('conceptMap');
        
        // Handle drag start from sidebar items
        sidebar.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    text: e.target.textContent,
                    category: e.target.dataset.category
                }));
            }
        });

        // Handle drag end
        sidebar.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                e.target.classList.remove('dragging');
            }
        });

        // Handle drop zone events
        conceptMap.addEventListener('dragover', (e) => {
            e.preventDefault();
            conceptMap.classList.add('drag-over');
        });

        conceptMap.addEventListener('dragleave', (e) => {
            if (!conceptMap.contains(e.relatedTarget)) {
                conceptMap.classList.remove('drag-over');
            }
        });

        conceptMap.addEventListener('drop', (e) => {
            e.preventDefault();
            conceptMap.classList.remove('drag-over');
            
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                this.createConceptItem(data, e.clientX, e.clientY);
            } catch (error) {
                console.error('Error parsing dropped data:', error);
            }
        });

        // Touch support for mobile devices
        this.setupTouchHandlers();
    }

    setupTouchHandlers() {
        const sidebar = document.querySelector('.sidebar');
        let touchItem = null;
        let touchOffset = { x: 0, y: 0 };

        sidebar.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                touchItem = e.target;
                const touch = e.touches[0];
                const rect = touchItem.getBoundingClientRect();
                touchOffset = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                };
                e.preventDefault();
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (touchItem) {
                e.preventDefault();
                const touch = e.touches[0];
                touchItem.style.position = 'fixed';
                touchItem.style.left = (touch.clientX - touchOffset.x) + 'px';
                touchItem.style.top = (touch.clientY - touchOffset.y) + 'px';
                touchItem.style.zIndex = '1000';
                touchItem.style.opacity = '0.8';
            }
        });

        document.addEventListener('touchend', (e) => {
            if (touchItem) {
                const touch = e.changedTouches[0];
                const conceptMap = document.getElementById('conceptMap');
                const mapRect = conceptMap.getBoundingClientRect();
                
                if (touch.clientX >= mapRect.left && touch.clientX <= mapRect.right &&
                    touch.clientY >= mapRect.top && touch.clientY <= mapRect.bottom) {
                    
                    const data = {
                        text: touchItem.textContent,
                        category: touchItem.dataset.category
                    };
                    this.createConceptItem(data, touch.clientX, touch.clientY);
                }
                
                // Reset touch item styles
                touchItem.style.position = '';
                touchItem.style.left = '';
                touchItem.style.top = '';
                touchItem.style.zIndex = '';
                touchItem.style.opacity = '';
                touchItem = null;
            }
        });
    }

    createConceptItem(data, clientX, clientY) {
        const conceptMap = document.getElementById('conceptMap');
        const mapRect = conceptMap.getBoundingClientRect();
        
        // Calculate position relative to concept map
        const x = clientX - mapRect.left - 50; // Center the item
        const y = clientY - mapRect.top - 20;
        
        // Create the concept item element
        const item = document.createElement('div');
        item.className = `concept-item ${data.category}`;
        item.textContent = data.text;
        item.style.left = Math.max(0, Math.min(x, mapRect.width - 100)) + 'px';
        item.style.top = Math.max(0, Math.min(y, mapRect.height - 40)) + 'px';
        
        // Add unique identifier
        item.dataset.id = 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        item.dataset.category = data.category;
        
        // Make item draggable within the map
        this.makeItemDraggable(item);
        
        // Add click handler for selection
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectItem(item);
        });
        
        conceptMap.appendChild(item);
        this.conceptItems.push(item);
        
        // Hide instructions if this is the first item
        if (this.conceptItems.length === 1) {
            const instructions = conceptMap.querySelector('.map-instructions');
            if (instructions) {
                instructions.style.opacity = '0.3';
            }
        }
        
        console.log('Created concept item:', data.text);
    }

    makeItemDraggable(item) {
        let isDragging = false;
        let startPos = { x: 0, y: 0 };
        let itemPos = { x: 0, y: 0 };

        // Mouse events
        item.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left mouse button
                isDragging = true;
                startPos = { x: e.clientX, y: e.clientY };
                itemPos = {
                    x: parseInt(item.style.left) || 0,
                    y: parseInt(item.style.top) || 0
                };
                item.style.zIndex = '20';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging && item) {
                const deltaX = e.clientX - startPos.x;
                const deltaY = e.clientY - startPos.y;
                
                const newX = itemPos.x + deltaX;
                const newY = itemPos.y + deltaY;
                
                const conceptMap = document.getElementById('conceptMap');
                const mapRect = conceptMap.getBoundingClientRect();
                
                item.style.left = Math.max(0, Math.min(newX, mapRect.width - item.offsetWidth)) + 'px';
                item.style.top = Math.max(0, Math.min(newY, mapRect.height - item.offsetHeight)) + 'px';
                
                // Update connections
                this.updateConnections();
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                item.style.zIndex = '10';
            }
        });

        // Touch events for mobile
        item.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            isDragging = true;
            startPos = { x: touch.clientX, y: touch.clientY };
            itemPos = {
                x: parseInt(item.style.left) || 0,
                y: parseInt(item.style.top) || 0
            };
            item.style.zIndex = '20';
            e.preventDefault();
        });

        item.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                const deltaX = touch.clientX - startPos.x;
                const deltaY = touch.clientY - startPos.y;
                
                const newX = itemPos.x + deltaX;
                const newY = itemPos.y + deltaY;
                
                const conceptMap = document.getElementById('conceptMap');
                const mapRect = conceptMap.getBoundingClientRect();
                
                item.style.left = Math.max(0, Math.min(newX, mapRect.width - item.offsetWidth)) + 'px';
                item.style.top = Math.max(0, Math.min(newY, mapRect.height - item.offsetHeight)) + 'px';
                
                this.updateConnections();
                e.preventDefault();
            }
        });

        item.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                item.style.zIndex = '10';
            }
        });
    }

    selectItem(item) {
        // Toggle selection
        if (item.classList.contains('selected')) {
            item.classList.remove('selected');
            this.selectedItems = this.selectedItems.filter(selected => selected !== item);
        } else {
            item.classList.add('selected');
            this.selectedItems.push(item);
        }
        
        // If two items are selected, prompt for connection
        if (this.selectedItems.length === 2) {
            this.promptForConnection();
        }
        
        // Clear selection if more than 2 items
        if (this.selectedItems.length > 2) {
            this.clearSelection();
            this.selectItem(item);
        }
    }

    clearSelection() {
        this.selectedItems.forEach(item => {
            item.classList.remove('selected');
        });
        this.selectedItems = [];
    }

    promptForConnection() {
        const modal = document.getElementById('connectionModal');
        modal.style.display = 'block';
        
        // Focus on the connection text input
        setTimeout(() => {
            document.getElementById('connectionText').focus();
        }, 100);
    }

    setupModalHandlers() {
        const modal = document.getElementById('connectionModal');
        const createBtn = document.getElementById('createConnection');
        const cancelBtn = document.getElementById('cancelConnection');
        const connectionText = document.getElementById('connectionText');

        createBtn.addEventListener('click', () => {
            this.createConnection();
            modal.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            this.clearSelection();
        });

        // Handle Enter key in text input
        connectionText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.createConnection();
                modal.style.display = 'none';
            }
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                this.clearSelection();
            }
        });
    }

    createConnection() {
        if (this.selectedItems.length !== 2) return;
        
        const connectionType = document.getElementById('connectionType').value;
        const connectionText = document.getElementById('connectionText').value;
        const fullText = connectionText || connectionType;
        
        const connection = {
            id: 'conn_' + Date.now(),
            from: this.selectedItems[0],
            to: this.selectedItems[1],
            label: fullText,
            type: connectionType
        };
        
        this.connections.push(connection);
        this.drawConnection(connection);
        this.clearSelection();
        
        // Clear the input for next use
        document.getElementById('connectionText').value = '';
        
        this.showSuccessMessage('Connection created successfully!');
        console.log('Created connection:', fullText);
    }

    drawConnection(connection) {
        const conceptMap = document.getElementById('conceptMap');
        
        // Create line element
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.dataset.connectionId = connection.id;
        
        // Create label element
        const label = document.createElement('div');
        label.className = 'connection-label';
        label.textContent = connection.label;
        label.dataset.connectionId = connection.id;
        
        conceptMap.appendChild(line);
        conceptMap.appendChild(label);
        
        // Store references
        connection.lineElement = line;
        connection.labelElement = label;
        
        // Position the connection
        this.updateConnectionPosition(connection);
    }

    updateConnectionPosition(connection) {
        const fromRect = connection.from.getBoundingClientRect();
        const toRect = connection.to.getBoundingClientRect();
        const mapRect = document.getElementById('conceptMap').getBoundingClientRect();
        
        // Calculate relative positions
        const fromX = fromRect.left - mapRect.left + fromRect.width / 2;
        const fromY = fromRect.top - mapRect.top + fromRect.height / 2;
        const toX = toRect.left - mapRect.left + toRect.width / 2;
        const toY = toRect.top - mapRect.top + toRect.height / 2;
        
        // Calculate line properties
        const deltaX = toX - fromX;
        const deltaY = toY - fromY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        // Position the line
        connection.lineElement.style.left = fromX + 'px';
        connection.lineElement.style.top = fromY + 'px';
        connection.lineElement.style.width = length + 'px';
        connection.lineElement.style.transform = `rotate(${angle}deg)`;
        
        // Position the label at the midpoint
        const midX = fromX + deltaX / 2;
        const midY = fromY + deltaY / 2;
        
        connection.labelElement.style.left = midX + 'px';
        connection.labelElement.style.top = midY + 'px';
        connection.labelElement.style.transform = 'translate(-50%, -50%)';
    }

    updateConnections() {
        // Update all connection positions when items are moved
        this.connections.forEach(connection => {
            if (connection.lineElement && connection.labelElement) {
                this.updateConnectionPosition(connection);
            }
        });
    }

    setupConnectionHandlers() {
        // Clear selection when clicking on empty space
        document.getElementById('conceptMap').addEventListener('click', (e) => {
            if (e.target.id === 'conceptMap') {
                this.clearSelection();
            }
        });
    }

    setupControls() {
        // Clear map button
        document.getElementById('clearMap').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the entire concept map?')) {
                this.clearMap();
            }
        });

        // Save reflection - Updated to remove the show/hide functionality since panel is always visible
        document.getElementById('saveReflection').addEventListener('click', () => {
            const reflection = document.getElementById('reflectionText').value;
            if (reflection.trim()) {
                this.saveReflection(reflection);
                this.showSuccessMessage('Reflection saved successfully!');
            }
        });

        // Export map - Updated to export as image
        document.getElementById('exportMap').addEventListener('click', () => {
            this.exportMapAsImage();
        });
    }

    clearMap() {
        // Remove all concept items
        this.conceptItems.forEach(item => {
            item.remove();
        });
        this.conceptItems = [];
        
        // Remove all connections
        this.connections.forEach(connection => {
            if (connection.lineElement) connection.lineElement.remove();
            if (connection.labelElement) connection.labelElement.remove();
        });
        this.connections = [];
        
        // Clear selection
        this.clearSelection();
        
        // Show instructions again
        const instructions = document.querySelector('.map-instructions');
        if (instructions) {
            instructions.style.opacity = '1';
        }
        
        console.log('Map cleared');
    }

    saveReflection(reflection) {
        // In a real application, this would save to a server or local storage
        localStorage.setItem('giverConceptMapReflection', reflection);
        console.log('Reflection saved:', reflection);
    }

    // Updated export method to create image instead of JSON
    async exportMapAsImage() {
        try {
            // Create a canvas to capture the mind map and reflection
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size (larger for better quality)
            canvas.width = 1200;
            canvas.height = 800;
            
            // Fill background with white
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add title
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('The Giver - Concept Map', canvas.width / 2, 40);
            
            // Get the concept map area
            const conceptMap = document.getElementById('conceptMap');
            const mapRect = conceptMap.getBoundingClientRect();
            
            // Calculate scale factors
            const scaleX = (canvas.width - 100) / mapRect.width;
            const scaleY = (canvas.height - 300) / mapRect.height; // Leave space for reflection
            const scale = Math.min(scaleX, scaleY);
            
            const offsetX = (canvas.width - mapRect.width * scale) / 2;
            const offsetY = 80; // Start below title
            
            // Draw connections first (so they appear behind items)
            this.connections.forEach(connection => {
                const fromRect = connection.from.getBoundingClientRect();
                const toRect = connection.to.getBoundingClientRect();
                
                const fromX = (fromRect.left - mapRect.left + fromRect.width / 2) * scale + offsetX;
                const fromY = (fromRect.top - mapRect.top + fromRect.height / 2) * scale + offsetY;
                const toX = (toRect.left - mapRect.left + toRect.width / 2) * scale + offsetX;
                const toY = (toRect.top - mapRect.top + toRect.height / 2) * scale + offsetY;
                
                // Draw connection line
                ctx.strokeStyle = '#ff6b6b';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.stroke();
                
                // Draw connection label
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                
                ctx.fillStyle = '#ff6b6b';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                
                // Add background for label
                const labelWidth = ctx.measureText(connection.label).width + 8;
                ctx.fillRect(midX - labelWidth / 2, midY - 8, labelWidth, 16);
                
                ctx.fillStyle = '#ffffff';
                ctx.fillText(connection.label, midX, midY + 4);
            });
            
            // Draw concept items
            this.conceptItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const x = (itemRect.left - mapRect.left) * scale + offsetX;
                const y = (itemRect.top - mapRect.top) * scale + offsetY;
                const width = itemRect.width * scale;
                const height = itemRect.height * scale;
                
                // Get category color
                let bgColor = '#3498db'; // default
                if (item.classList.contains('themes')) bgColor = '#2ecc71';
                else if (item.classList.contains('events')) bgColor = '#f1c40f';
                else if (item.classList.contains('devices')) bgColor = '#9b59b6';
                
                // Draw item background
                ctx.fillStyle = bgColor;
                ctx.fillRect(x, y, width, height);
                
                // Draw item text
                ctx.fillStyle = item.classList.contains('events') ? '#2c3e50' : '#ffffff';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.textContent, x + width / 2, y + height / 2 + 5);
            });
            
            // Add reflection section
            const reflection = document.getElementById('reflectionText').value;
            if (reflection.trim()) {
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 18px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('Reflection:', 50, canvas.height - 200);
                
                // Word wrap the reflection text
                ctx.font = '14px Arial';
                const maxWidth = canvas.width - 100;
                const words = reflection.split(' ');
                let line = '';
                let y = canvas.height - 170;
                
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    
                    if (testWidth > maxWidth && n > 0) {
                        ctx.fillText(line, 50, y);
                        line = words[n] + ' ';
                        y += 20;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, 50, y);
            }
            
            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'giver_concept_map_' + new Date().toISOString().slice(0, 10) + '.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showSuccessMessage('Mind-map exported as image successfully!');
            }, 'image/png');
            
        } catch (error) {
            console.error('Error exporting image:', error);
            this.showSuccessMessage('Error exporting image. Please try again.');
        }
    }

    showSuccessMessage(message) {
        // Create success message element
        const messageEl = document.createElement('div');
        messageEl.className = 'success-message';
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        // Show message with animation
        setTimeout(() => {
            messageEl.classList.add('show');
        }, 100);
        
        // Hide and remove message after 3 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.conceptMapper = new ConceptMapper();
    
    // Load any saved reflection
    const savedReflection = localStorage.getItem('giverConceptMapReflection');
    if (savedReflection) {
        document.getElementById('reflectionText').value = savedReflection;
    }
    
    console.log('The Giver Concept Mapping Activity loaded successfully');
});