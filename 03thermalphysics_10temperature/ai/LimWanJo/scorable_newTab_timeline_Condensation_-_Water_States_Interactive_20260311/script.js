// Main application state
// MODIFIED: Removed textBoxes state object as text boxes and placeholders are no longer needed
const state = {
    temperature: 20,
    condensationRate: 2000 // milliseconds between drops
};

// Analytics logging
const analytics = {
    log: [],
    add(action, details) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = {
            time: timestamp,
            action: action,
            details: details
        };
        this.log.push(entry);
        this.display();
    },
    display() {
        const logElement = document.getElementById('analytics-log');
        const lastEntries = this.log.slice(-10); // Show last 10 entries
        logElement.innerHTML = lastEntries.map(entry => 
            `<div class="log-entry">
                <span class="log-time">[${entry.time}]</span> 
                ${entry.action}: ${entry.details}
            </div>`
        ).join('');
        logElement.scrollTop = logElement.scrollHeight;
    },
    clear() {
        this.log = [];
        this.display();
    }
};

// Initialize the application
function init() {
    // Check if in iframe
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    }
    
    // Set up event listeners
    // REMOVED: setupDragAndDrop() call removed as text boxes are no longer needed
    setupTemperatureControl();
    setupAnalyticsPanel();
    setupAnimations();
    
    // Log initialization
    analytics.add('🚀 Simulation Started', 'Condensation interactive loaded');
}

// REMOVED: All drag and drop functionality removed as text boxes are no longer needed
// REMOVED: setupDragAndDrop()
// REMOVED: handleDragStart()
// REMOVED: handleDragMove()
// REMOVED: handleDragEnd()
// REMOVED: handleTouchStart()
// REMOVED: handleTouchMove()
// REMOVED: handleTouchEnd()
// REMOVED: calculateOverlap()
// REMOVED: checkPlacement()

// Temperature control
function setupTemperatureControl() {
    const slider = document.getElementById('temp-slider');
    const valueDisplay = document.getElementById('temp-value');
    const resetBtn = document.getElementById('reset-btn');
    
    slider.addEventListener('input', (e) => {
        state.temperature = parseInt(e.target.value);
        valueDisplay.textContent = state.temperature + '°C';
        updateTemperatureVisuals();
        updateCondensationRate();
        
        analytics.add('🌡️ Temperature Changed', `Steel plate: ${state.temperature}°C`);
    });
    
    resetBtn.addEventListener('click', resetSimulation);
}

// Update visual representation of temperature
function updateTemperatureVisuals() {
    const tempFill = document.getElementById('temp-fill');
    const tempHandle = document.getElementById('temp-handle');
    
    // Calculate fill height (inverse - higher temp = less fill from bottom)
    const fillHeight = (100 - state.temperature);
    const fillY = 180 + (100 - fillHeight);
    
    tempFill.setAttribute('y', fillY);
    tempFill.setAttribute('height', fillHeight);
    tempHandle.setAttribute('cy', fillY);
    
    // Color based on temperature
    const color = state.temperature < 30 ? '#6bb6ff' : 
                  state.temperature < 60 ? '#ff9966' : '#ff6b6b';
    tempFill.setAttribute('fill', color);
}

// Update condensation rate based on temperature
function updateCondensationRate() {
    // Higher temperature = slower condensation
    // At 0°C: 1 drop per 1 second
    // At 100°C: 1 drop per 5 seconds
    state.condensationRate = 1000 + (state.temperature * 40);
}

// MODIFIED: Reset simulation - simplified as text boxes are no longer needed
function resetSimulation() {
    // Reset temperature
    state.temperature = 20;
    document.getElementById('temp-slider').value = 20;
    document.getElementById('temp-value').textContent = '20°C';
    updateTemperatureVisuals();
    updateCondensationRate();
    
    // REMOVED: Text box reset code removed as text boxes are no longer needed
    
    analytics.add('🔄 Reset', 'Simulation reset to initial state');
}

// Analytics panel toggle
function setupAnalyticsPanel() {
    const toggleBtn = document.getElementById('toggle-analytics');
    const panel = document.getElementById('analytics-panel');
    const clearBtn = document.getElementById('clear-log-btn');
    
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('collapsed');
    });
    
    clearBtn.addEventListener('click', () => {
        analytics.clear();
        analytics.add('🗑️ Log Cleared', 'Analytics log cleared');
    });
}

// Animation setup
function setupAnimations() {
    createBubbles();
    createSteam();
    createDropletsOnPlate();
    startDropletFall();
}

// Create bubbles in boiling water
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    
    setInterval(() => {
        const bubble = document.createElementNS('vendor/external_0.txt', 'circle');
        const x = 170 + Math.random() * 60; // Random position in beaker
        const y = 310;
        const r = 2 + Math.random() * 4;
        
        bubble.setAttribute('cx', x);
        bubble.setAttribute('cy', y);
        bubble.setAttribute('r', r);
        bubble.setAttribute('fill', 'rgba(255,255,255,0.6)');
        bubble.setAttribute('class', 'bubble');
        bubble.style.animationDelay = Math.random() * 0.5 + 's';
        
        bubblesContainer.appendChild(bubble);
        
        // Remove after animation
        setTimeout(() => {
            bubble.remove();
        }, 2000);
    }, 300);
}

// Create steam particles
function createSteam() {
    const steamContainer = document.getElementById('steam');
    
    setInterval(() => {
        const steam = document.createElementNS('vendor/external_0.txt', 'ellipse');
        const x = 190 + Math.random() * 20;
        const y = 245;
        const rx = 8 + Math.random() * 8;
        const ry = 12 + Math.random() * 12;
        const drift = (Math.random() - 0.5) * 40;
        
        steam.setAttribute('cx', x);
        steam.setAttribute('cy', y);
        steam.setAttribute('rx', rx);
        steam.setAttribute('ry', ry);
        steam.setAttribute('fill', 'url(#steamGradient)');
        steam.setAttribute('class', 'steam-particle');
        steam.style.setProperty('--drift', drift + 'px');
        steam.style.animationDelay = Math.random() * 0.5 + 's';
        
        steamContainer.appendChild(steam);
        
        // Remove after animation
        setTimeout(() => {
            steam.remove();
        }, 3000);
    }, 200);
}

// Create water droplets on tilted steel plate
function createDropletsOnPlate() {
    const dropletsContainer = document.getElementById('droplets-on-plate');
    
    setInterval(() => {
        // Condensation rate affected by temperature
        if (Math.random() > state.temperature / 100) {
            const droplet = document.createElementNS('vendor/external_0.txt', 'circle');
            // Steel plate tilted from (170, 150) to (280, 240)
            // Droplets form on the underside, slightly offset
            const t = Math.random(); // Random position along the plate
            const x = 170 + t * 110 + 2; // Slight offset for underside
            const y = 150 + t * 90 + 5; // Slight offset for underside
            const r = 1.5 + Math.random() * 1.5;
            
            droplet.setAttribute('cx', x);
            droplet.setAttribute('cy', y);
            droplet.setAttribute('r', r);
            droplet.setAttribute('fill', 'rgba(100,180,255,0.8)');
            
            dropletsContainer.appendChild(droplet);
            
            // Remove after some time (simulate coalescence)
            setTimeout(() => {
                droplet.remove();
            }, 3000 + Math.random() * 2000);
        }
    }, 500);
}

// Droplet falling vertically from lower tip of steel plate to petri dish
function startDropletFall() {
    function dropFall() {
        const droplet = document.createElementNS('vendor/external_0.txt', 'ellipse');
        // Droplets fall vertically from lower tip (278, 248) to dish at (278, 465)
        droplet.setAttribute('cx', 278);
        droplet.setAttribute('cy', 248); // Lower tip of steel plate
        droplet.setAttribute('rx', 3);
        droplet.setAttribute('ry', 5);
        droplet.setAttribute('fill', 'rgba(100,180,255,0.8)');
        droplet.setAttribute('class', 'falling-droplet');
        
        document.getElementById('lab-canvas').appendChild(droplet);
        
        // Create ripple when droplet hits
        setTimeout(() => {
            createRipple();
            droplet.remove();
        }, 1500);
        
        // Schedule next drop based on condensation rate
        setTimeout(dropFall, state.condensationRate);
    }
    
    dropFall();
}

// Create ripple effect in petri dish (positioned at x:278, y:465)
function createRipple() {
    const ripplesContainer = document.getElementById('ripples');
    const ripple = document.createElementNS('vendor/external_0.txt', 'circle');
    
    // Dish is now at x:278, y:465 (vertically below steel plate lower end)
    ripple.setAttribute('cx', 278);
    ripple.setAttribute('cy', 465);
    ripple.setAttribute('r', 0);
    ripple.setAttribute('fill', 'none');
    ripple.setAttribute('stroke', 'rgba(100,180,255,0.6)');
    ripple.setAttribute('stroke-width', 1);
    ripple.setAttribute('class', 'ripple');
    
    ripplesContainer.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);