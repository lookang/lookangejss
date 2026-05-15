// Speed and Velocity Mind Map Interactive
// This script handles all interactions, animations, and learning analytics

class SpeedVelocityMindMap {
    constructor() {
        // Initialize properties
        this.interactionCount = 0;
        this.conceptsExplored = new Set();
        this.startTime = Date.now();
        this.currentFilter = 'all';
        this.isAutoTour = false;
        this.autoTourIndex = 0;
        
        // Concept information database
        this.conceptInfo = {
            'main': {
                title: 'Speed and Velocity',
                content: `
                    <p><strong>Speed and Velocity</strong> are fundamental concepts in physics that describe motion.</p>
                    <p>Both measure how fast something moves, but they have important differences:</p>
                    <ul>
                        <li><strong>Speed:</strong> How fast (scalar quantity)</li>
                        <li><strong>Velocity:</strong> How fast and in which direction (vector quantity)</li>
                    </ul>
                `
            },
            'speed': {
                title: 'Speed',
                content: `
                    <p><strong>Speed</strong> is a scalar quantity that measures how fast an object moves.</p>
                    <p><strong>Formula:</strong> Speed = Distance ÷ Time (s = d/t)</p>
                    <p><strong>Key Points:</strong></p>
                    <ul>
                        <li>Only has magnitude (size)</li>
                        <li>Always positive</li>
                        <li>Common units: m/s, km/h</li>
                    </ul>
                `
            },
            'velocity': {
                title: 'Velocity',
                content: `
                    <p><strong>Velocity</strong> is a vector quantity that includes both speed and direction.</p>
                    <p><strong>Formula:</strong> Velocity = Displacement ÷ Time (with direction)</p>
                    <p><strong>Key Points:</strong></p>
                    <ul>
                        <li>Has magnitude and direction</li>
                        <li>Can be positive or negative</li>
                        <li>Direction: N, S, E, W, or angles</li>
                    </ul>
                `
            },
            'speed-scalar': {
                title: 'Speed as Scalar',
                content: `
                    <p><strong>Scalar Quantity:</strong> Has magnitude only, no direction.</p>
                    <p>Examples:</p>
                    <ul>
                        <li>"The car travels at 60 km/h"</li>
                        <li>"The runner moves at 5 m/s"</li>
                    </ul>
                    <p>Speed tells us <em>how fast</em> but not <em>where</em> the object is going.</p>
                `
            },
            'velocity-vector': {
                title: 'Velocity as Vector',
                content: `
                    <p><strong>Vector Quantity:</strong> Has both magnitude and direction.</p>
                    <p>Examples:</p>
                    <ul>
                        <li>"The car travels at 60 km/h eastward"</li>
                        <li>"The runner moves at 5 m/s forward"</li>
                    </ul>
                    <p>Velocity tells us both <em>how fast</em> and <em>which direction</em>.</p>
                `
            },
            'examples': {
                title: 'Real-World Examples',
                content: `
                    <p><strong>Everyday Examples:</strong></p>
                    <p><strong>Speed:</strong></p>
                    <ul>
                        <li>Speedometer in a car shows speed</li>
                        <li>Running speed on a treadmill</li>
                    </ul>
                    <p><strong>Velocity:</strong></p>
                    <ul>
                        <li>GPS navigation (speed + direction)</li>
                        <li>Weather reports (wind velocity)</li>
                    </ul>
                `
            },
            'differences': {
                title: 'Key Differences',
                content: `
                    <p><strong>Speed vs Velocity:</strong></p>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr style="background: #f0f0f0;">
                            <th style="padding: 5px; border: 1px solid #ddd;">Aspect</th>
                            <th style="padding: 5px; border: 1px solid #ddd;">Speed</th>
                            <th style="padding: 5px; border: 1px solid #ddd;">Velocity</th>
                        </tr>
                        <tr>
                            <td style="padding: 5px; border: 1px solid #ddd;">Type</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">Scalar</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">Vector</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; border: 1px solid #ddd;">Direction</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">No</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">Yes</td>
                        </tr>
                    </table>
                `
            }
        };
        
        // Auto tour sequence
        this.tourSequence = [
            'main', 'speed', 'speed-scalar', 'speed-units', 
            'velocity', 'velocity-vector', 'velocity-direction',
            'examples', 'car-example', 'runner-example',
            'differences', 'direction-diff', 'change-diff'
        ];
        
        this.init();
    }
    
    init() {
        // Initialize event listeners
        this.setupEventListeners();
        
        // Draw initial connections
        this.drawConnections();
        
        // Start analytics timer
        this.startAnalyticsTimer();
        
        // Add initial animations
        this.addInitialAnimations();
        
        console.log('Speed and Velocity Mind Map initialized');
    }
    
    setupEventListeners() {
        // Node click events
        document.querySelectorAll('.node').forEach(node => {
            node.addEventListener('click', (e) => this.handleNodeClick(e));
            node.addEventListener('touchstart', (e) => this.handleNodeClick(e));
        });
        
        // Control events
        document.getElementById('conceptFilter').addEventListener('change', (e) => {
            this.filterConcepts(e.target.value);
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetView();
        });
        
        document.getElementById('autoTourBtn').addEventListener('click', () => {
            this.startAutoTour();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.resetView();
            }
        });
        
        // Prevent context menu on touch devices
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    handleNodeClick(event) {
        event.preventDefault();
        const node = event.currentTarget;
        const concept = node.dataset.concept;
        
        // Update analytics
        this.interactionCount++;
        this.conceptsExplored.add(concept);
        this.updateAnalytics();
        
        // Visual feedback
        this.highlightNode(node);
        
        // Show concept information
        this.showConceptInfo(concept);
        
        // Highlight connections
        this.highlightConnections(node);
        
        console.log(`Concept explored: ${concept}`);
    }
    
    highlightNode(node) {
        // Remove previous highlights
        document.querySelectorAll('.node.active').forEach(n => {
            n.classList.remove('active');
        });
        
        // Add highlight to clicked node
        node.classList.add('active');
        
        // Add pulse animation
        node.classList.add('pulse');
        setTimeout(() => {
            node.classList.remove('pulse');
        }, 1000);
    }
    
    showConceptInfo(concept) {
        const infoPanel = document.getElementById('infoPanel');
        const infoContent = document.getElementById('infoContent');
        
        const info = this.conceptInfo[concept];
        if (info) {
            infoContent.innerHTML = `
                <h4>${info.title}</h4>
                ${info.content}
            `;
        } else {
            infoContent.innerHTML = `
                <h4>${concept.replace('-', ' ').toUpperCase()}</h4>
                <p>This concept is part of the Speed and Velocity mind map. Explore the connections to learn more!</p>
            `;
        }
        
        // Animate info panel
        infoPanel.classList.add('fade-in');
        setTimeout(() => {
            infoPanel.classList.remove('fade-in');
        }, 500);
    }
    
    drawConnections() {
        const svg = document.getElementById('connectionsSvg');
        const centralNode = document.getElementById('centralNode');
        const conceptNodes = document.querySelectorAll('.concept-node');
        
        // Clear existing connections
        svg.innerHTML = '';
        
        // Get central node position
        const centralRect = centralNode.getBoundingClientRect();
        const containerRect = svg.getBoundingClientRect();
        
        const centralX = centralRect.left + centralRect.width / 2 - containerRect.left;
        const centralY = centralRect.top + centralRect.height / 2 - containerRect.top;
        
        // Draw lines to concept nodes
        conceptNodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            const nodeX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
            const nodeY = nodeRect.top + nodeRect.height / 2 - containerRect.top;
            
            const line = document.createElementNS('vendor/external_0.txt', 'line');
            line.setAttribute('x1', centralX);
            line.setAttribute('y1', centralY);
            line.setAttribute('x2', nodeX);
            line.setAttribute('y2', nodeY);
            line.setAttribute('class', 'connection-line');
            line.setAttribute('data-target', node.id);
            
            svg.appendChild(line);
        });
        
        // Draw sub-node connections
        document.querySelectorAll('.branch').forEach(branch => {
            const conceptNode = branch.querySelector('.concept-node');
            const subNodes = branch.querySelectorAll('.sub-node');
            
            if (conceptNode) {
                const conceptRect = conceptNode.getBoundingClientRect();
                const conceptX = conceptRect.left + conceptRect.width / 2 - containerRect.left;
                const conceptY = conceptRect.top + conceptRect.height / 2 - containerRect.top;
                
                subNodes.forEach(subNode => {
                    const subRect = subNode.getBoundingClientRect();
                    const subX = subRect.left + subRect.width / 2 - containerRect.left;
                    const subY = subRect.top + subRect.height / 2 - containerRect.top;
                    
                    const line = document.createElementNS('vendor/external_0.txt', 'line');
                    line.setAttribute('x1', conceptX);
                    line.setAttribute('y1', conceptY);
                    line.setAttribute('x2', subX);
                    line.setAttribute('y2', subY);
                    line.setAttribute('class', 'connection-line');
                    line.setAttribute('data-target', subNode.id);
                    
                    svg.appendChild(line);
                });
            }
        });
    }
    
    highlightConnections(node) {
        // Reset all connection highlights
        document.querySelectorAll('.connection-line').forEach(line => {
            line.classList.remove('highlighted');
        });
        
        // Highlight connections to/from the selected node
        const nodeId = node.id;
        document.querySelectorAll(`[data-target="${nodeId}"]`).forEach(line => {
            line.classList.add('highlighted');
        });
    }
    
    filterConcepts(filter) {
        this.currentFilter = filter;
        
        // Show all first
        document.querySelectorAll('.branch, .node').forEach(element => {
            element.classList.remove('hidden');
        });
        
        // Apply filter
        switch (filter) {
            case 'speed':
                document.querySelectorAll('.velocity-branch, .examples-branch, .differences-branch').forEach(branch => {
                    branch.classList.add('hidden');
                });
                break;
            case 'velocity':
                document.querySelectorAll('.speed-branch, .examples-branch, .differences-branch').forEach(branch => {
                    branch.classList.add('hidden');
                });
                break;
            case 'examples':
                document.querySelectorAll('.speed-branch, .velocity-branch, .differences-branch').forEach(branch => {
                    branch.classList.add('hidden');
                });
                break;
            case 'differences':
                document.querySelectorAll('.speed-branch, .velocity-branch, .examples-branch').forEach(branch => {
                    branch.classList.add('hidden');
                });
                break;
        }
        
        // Update analytics
        this.interactionCount++;
        this.updateAnalytics();
        
        // Redraw connections after filter
        setTimeout(() => {
            this.drawConnections();
        }, 300);
    }
    
    resetView() {
        // Reset filter
        document.getElementById('conceptFilter').value = 'all';
        this.filterConcepts('all');
        
        // Remove all highlights
        document.querySelectorAll('.node.active').forEach(node => {
            node.classList.remove('active');
        });
        
        document.querySelectorAll('.connection-line.highlighted').forEach(line => {
            line.classList.remove('highlighted');
        });
        
        // Reset info panel
        document.getElementById('infoContent').innerHTML = 
            '<p>Click on any concept node to learn more about Speed and Velocity!</p>';
        
        // Stop auto tour
        this.isAutoTour = false;
        this.autoTourIndex = 0;
        
        // Update analytics
        this.interactionCount++;
        this.updateAnalytics();
        
        console.log('View reset');
    }
    
    startAutoTour() {
        this.isAutoTour = true;
        this.autoTourIndex = 0;
        
        const tourBtn = document.getElementById('autoTourBtn');
        tourBtn.textContent = 'Stop Tour';
        tourBtn.onclick = () => this.stopAutoTour();
        
        this.runAutoTour();
    }
    
    runAutoTour() {
        if (!this.isAutoTour || this.autoTourIndex >= this.tourSequence.length) {
            this.stopAutoTour();
            return;
        }
        
        const conceptId = this.tourSequence[this.autoTourIndex];
        const node = document.querySelector(`[data-concept="${conceptId}"]`);
        
        if (node && !node.classList.contains('hidden')) {
            // Simulate click
            this.handleNodeClick({ currentTarget: node, preventDefault: () => {} });
            
            // Scroll into view if needed
            node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        this.autoTourIndex++;
        
        // Continue tour after delay
        setTimeout(() => {
            this.runAutoTour();
        }, 2000);
    }
    
    stopAutoTour() {
        this.isAutoTour = false;
        this.autoTourIndex = 0;
        
        const tourBtn = document.getElementById('autoTourBtn');
        tourBtn.textContent = 'Auto Tour';
        tourBtn.onclick = () => this.startAutoTour();
    }
    
    updateAnalytics() {
        document.getElementById('conceptsExplored').textContent = this.conceptsExplored.size;
        document.getElementById('interactionCount').textContent = this.interactionCount;
        
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        document.getElementById('timeSpent').textContent = `${timeSpent}s`;
    }
    
    startAnalyticsTimer() {
        setInterval(() => {
            this.updateAnalytics();
        }, 1000);
    }
    
    addInitialAnimations() {
        // Stagger animation for nodes
        document.querySelectorAll('.node').forEach((node, index) => {
            node.style.animationDelay = `${index * 0.1}s`;
            node.classList.add('fade-in');
        });
        
        // Animate connections after nodes
        setTimeout(() => {
            document.querySelectorAll('.connection-line').forEach((line, index) => {
                line.style.animationDelay = `${index * 0.05}s`;
                line.classList.add('fade-in');
            });
        }, 500);
    }
    
    // Handle window resize for responsive connections
    handleResize() {
        setTimeout(() => {
            this.drawConnections();
        }, 100);
    }
}

// Initialize the mind map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mindMap = new SpeedVelocityMindMap();
    
    // Handle resize events
    window.addEventListener('resize', () => {
        mindMap.handleResize();
    });
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            mindMap.handleResize();
        }, 500);
    });
});

// Export for potential external use
window.SpeedVelocityMindMap = SpeedVelocityMindMap;