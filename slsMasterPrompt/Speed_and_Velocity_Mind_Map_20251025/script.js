// Mind Map Interactive Controller
class MindMapController {
    constructor() {
        // Initialize properties for drag and drop functionality
        this.isDragging = false;
        this.currentBubble = null;
        this.offset = { x: 0, y: 0 };
        this.tooltip = document.getElementById('tooltip');
        this.svg = document.getElementById('connections');
        
        // Define connections between bubbles (parent-child relationships)
        this.connections = {
            'central': ['speed', 'velocity', 'measurement', 'examples'],
            'speed': ['distance-time', 'no-direction'],
            'velocity': ['speed-direction', 'vector'],
            'measurement': ['units', 'tools'],
            'examples': ['car', 'runner']
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.drawConnections();
        this.positionBubbles();
    }
    
    // Set up all event listeners for interaction
    setupEventListeners() {
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach(bubble => {
            // Mouse events
            bubble.addEventListener('mousedown', (e) => this.startDrag(e, bubble));
            bubble.addEventListener('mouseenter', (e) => this.showTooltip(e, bubble));
            bubble.addEventListener('mouseleave', () => this.hideTooltip());
            
            // Touch events for mobile compatibility
            bubble.addEventListener('touchstart', (e) => this.startDrag(e, bubble), { passive: false });
            bubble.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
            bubble.addEventListener('touchend', () => this.endDrag());
        });
        
        // Global mouse events
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Instructions tooltip
        const instructions = document.querySelector('.instructions');
        instructions.addEventListener('mouseenter', (e) => this.showTooltip(e, instructions));
        instructions.addEventListener('mouseleave', () => this.hideTooltip());
    }
    
    // Start dragging a bubble
    startDrag(e, bubble) {
        e.preventDefault();
        this.isDragging = true;
        this.currentBubble = bubble;
        bubble.classList.add('dragging');
        
        // Calculate offset for smooth dragging
        const rect = bubble.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.offset.x = clientX - rect.left - rect.width / 2;
        this.offset.y = clientY - rect.top - rect.height / 2;
        
        this.hideTooltip();
    }
    
    // Handle dragging movement
    drag(e) {
        if (!this.isDragging || !this.currentBubble) return;
        
        e.preventDefault();
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate new position relative to container
        let newX = clientX - containerRect.left - this.offset.x;
        let newY = clientY - containerRect.top - this.offset.y;
        
        // Boundary checking to keep bubbles within container
        const bubbleRect = this.currentBubble.getBoundingClientRect();
        const maxX = container.clientWidth - bubbleRect.width;
        const maxY = container.clientHeight - bubbleRect.height;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        // Apply new position
        if (this.currentBubble.id === 'central') {
            // Special handling for central bubble to maintain transform origin
            this.currentBubble.style.left = newX + 'px';
            this.currentBubble.style.top = newY + 'px';
            this.currentBubble.style.transform = 'scale(1.15)';
        } else {
            this.currentBubble.style.left = newX + 'px';
            this.currentBubble.style.top = newY + 'px';
        }
        
        // Redraw connections as bubble moves
        this.drawConnections();
    }
    
    // End dragging
    endDrag() {
        if (this.currentBubble) {
            this.currentBubble.classList.remove('dragging');
            
            // Reset central bubble transform
            if (this.currentBubble.id === 'central') {
                this.currentBubble.style.transform = 'translate(-50%, -50%)';
            }
        }
        
        this.isDragging = false;
        this.currentBubble = null;
        this.drawConnections();
    }
    
    // Show tooltip with bubble information
    showTooltip(e, element) {
        if (this.isDragging) return;
        
        const title = element.getAttribute('data-title');
        if (title) {
            this.tooltip.textContent = title;
            this.tooltip.classList.add('show');
            
            // Position tooltip near cursor
            const containerRect = document.querySelector('.container').getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;
            
            this.tooltip.style.left = (x + 10) + 'px';
            this.tooltip.style.top = (y - 10) + 'px';
            
            // Adjust if tooltip goes off screen
            setTimeout(() => {
                const tooltipRect = this.tooltip.getBoundingClientRect();
                const containerRect = document.querySelector('.container').getBoundingClientRect();
                
                if (tooltipRect.right > containerRect.right) {
                    this.tooltip.style.left = (x - tooltipRect.width - 10) + 'px';
                }
                if (tooltipRect.top < containerRect.top) {
                    this.tooltip.style.top = (y + 20) + 'px';
                }
            }, 10);
        }
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
    
    // Draw connection lines between related bubbles
    drawConnections() {
        // Clear existing connections
        this.svg.innerHTML = '';
        
        // Draw lines for each connection
        Object.keys(this.connections).forEach(parentId => {
            const parent = document.getElementById(parentId);
            if (!parent) return;
            
            this.connections[parentId].forEach(childId => {
                const child = document.getElementById(childId);
                if (!child) return;
                
                this.drawLine(parent, child);
            });
        });
    }
    
    // Draw a single connection line between two bubbles
    drawLine(parent, child) {
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        
        // Calculate center points of bubbles
        const parentX = parentRect.left + parentRect.width / 2 - containerRect.left;
        const parentY = parentRect.top + parentRect.height / 2 - containerRect.top;
        const childX = childRect.left + childRect.width / 2 - containerRect.left;
        const childY = childRect.top + childRect.height / 2 - containerRect.top;
        
        // Create SVG line element
        const line = document.createElementNS('external_0.txt', 'line');
        line.setAttribute('x1', parentX);
        line.setAttribute('y1', parentY);
        line.setAttribute('x2', childX);
        line.setAttribute('y2', childY);
        line.setAttribute('class', 'connection-line');
        
        this.svg.appendChild(line);
    }
    
    // Position bubbles in an organized layout initially
    positionBubbles() {
        const container = document.querySelector('.container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Adjust positions based on container size
        const bubbles = document.querySelectorAll('.bubble:not(.central-bubble)');
        bubbles.forEach(bubble => {
            const currentLeft = parseInt(bubble.style.left) || 0;
            const currentTop = parseInt(bubble.style.top) || 0;
            
            // Ensure bubbles are within bounds
            if (currentLeft === 0 && currentTop === 0) {
                // Position hasn't been set, use CSS positioning
                return;
            }
            
            const rect = bubble.getBoundingClientRect();
            const maxX = containerWidth - rect.width;
            const maxY = containerHeight - rect.height;
            
            bubble.style.left = Math.min(currentLeft, maxX) + 'px';
            bubble.style.top = Math.min(currentTop, maxY) + 'px';
        });
        
        // Initial connection drawing
        setTimeout(() => this.drawConnections(), 100);
    }
}

// Initialize the mind map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mindMap = new MindMapController();
    
    // Redraw connections on window resize
    window.addEventListener('resize', () => {
        setTimeout(() => mindMap.drawConnections(), 100);
    });
    
    // Add some visual feedback for successful initialization
    console.log('Speed and Velocity Mind Map initialized successfully!');
});