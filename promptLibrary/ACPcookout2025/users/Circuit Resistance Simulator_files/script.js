/**
 * Circuit Resistance Simulator
 * Educational tool for Secondary 2 students to understand series and parallel circuits
 * Implements cognitive load theory and multimedia learning principles
 * IMPROVED: Added component description functionality
 * FIXED: Bulb text now properly disappears when other indicators are selected
 * MODIFIED: Repositioned text elements to avoid wire overlap
 */

class CircuitSimulator {
    constructor() {
        // Initialize circuit parameters
        this.voltage = 9; // Battery voltage in volts
        this.r1Value = 5; // Resistor 1 value in ohms
        this.r2Value = 10; // Resistor 2 value in ohms
        this.circuitType = 'series'; // Current circuit configuration
        this.outputType = 'bulb'; // Current output indicator
        
        // Component descriptions for educational purposes - NEW ADDITION
        this.componentDescriptions = {
            bulb: "A bulb is a light-emitting device that glows brighter as more current flows through it. The brightness indicates the amount of current in the circuit.",
            ammeter: "An ammeter is a measuring instrument used to measure the current in a circuit. It displays the exact amount of current flowing in amperes (A).",
            bell: "A bell is an audio output device that rings louder as more current flows through it. The volume indicates the strength of the current in the circuit."
        };
        
        // Get DOM elements for manipulation
        this.initializeElements();
        
        // Set up event listeners for user interactions
        this.setupEventListeners();
        
        // Calculate initial values and update display
        this.updateCircuit();
        
        // Start current flow animation
        this.startCurrentAnimation();
        
        // Initialize component description - NEW ADDITION
        this.updateComponentDescription();
    }

    /**
     * Initialize all DOM element references
     * Reduces DOM queries and improves performance
     * IMPROVED: Added component description element and junction labels
     */
    initializeElements() {
        // Control buttons
        this.seriesBtn = document.getElementById('series-btn');
        this.parallelBtn = document.getElementById('parallel-btn');
        this.bulbBtn = document.getElementById('bulb-btn');
        this.ammeterBtn = document.getElementById('ammeter-btn');
        this.bellBtn = document.getElementById('bell-btn');
        
        // Resistor controls
        this.r1Slider = document.getElementById('r1-slider');
        this.r2Slider = document.getElementById('r2-slider');
        this.r1ValueSpan = document.getElementById('r1-value');
        this.r2ValueSpan = document.getElementById('r2-value');
        
        // Circuit elements - FIXED: Now properly referencing the group elements
        this.seriesWires = document.getElementById('series-wires');
        this.parallelWires = document.getElementById('parallel-wires');
        this.bulbElement = document.getElementById('bulb');
        this.ammeterElement = document.getElementById('ammeter');
        this.bellElement = document.getElementById('bell');
        this.ammeterReading = document.getElementById('ammeter-reading');
        
        // Results display
        this.totalResistanceSpan = document.getElementById('total-resistance');
        this.currentValueSpan = document.getElementById('current-value');
        this.voltageValueSpan = document.getElementById('voltage-value');
        
        // SVG elements for text updates
        this.resistor1Text = document.querySelector('#resistor1 text');
        this.resistor2Text = document.querySelector('#resistor2 text');
        this.currentDotsContainer = document.getElementById('current-dots');
        
        // Component description element - NEW ADDITION
        this.componentTextElement = document.getElementById('component-text');
        
        // MODIFIED: Junction labels for parallel circuit visibility
        this.junction1Label = document.getElementById('junction1-label');
        this.junction2Label = document.getElementById('junction2-label');
    }

    /**
     * Set up all event listeners for user interactions
     * Implements touch-friendly design for mobile devices
     */
    setupEventListeners() {
        // Circuit type selection
        this.seriesBtn.addEventListener('click', () => this.setCircuitType('series'));
        this.parallelBtn.addEventListener('click', () => this.setCircuitType('parallel'));
        
        // Output indicator selection - IMPROVED: Added component description updates
        this.bulbBtn.addEventListener('click', () => this.setOutputType('bulb'));
        this.ammeterBtn.addEventListener('click', () => this.setOutputType('ammeter'));
        this.bellBtn.addEventListener('click', () => this.setOutputType('bell'));
        
        // Resistor value controls with real-time updates
        this.r1Slider.addEventListener('input', (e) => {
            this.r1Value = parseInt(e.target.value);
            this.updateResistorDisplay();
            this.updateCircuit();
        });
        
        this.r2Slider.addEventListener('input', (e) => {
            this.r2Value = parseInt(e.target.value);
            this.updateResistorDisplay();
            this.updateCircuit();
        });
        
        // Add touch support for mobile devices
        this.addTouchSupport();
    }

    /**
     * Add touch event support for better mobile interaction
     */
    addTouchSupport() {
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.click();
            });
        });
    }

    /**
     * Set the circuit type (series or parallel)
     * Updates visual representation and calculations
     * MODIFIED: Added junction label visibility control
     */
    setCircuitType(type) {
        this.circuitType = type;
        
        // Update button states with visual feedback
        this.seriesBtn.classList.toggle('active', type === 'series');
        this.parallelBtn.classList.toggle('active', type === 'parallel');
        
        // Switch wire display based on circuit type
        if (type === 'series') {
            this.seriesWires.style.display = 'block';
            this.parallelWires.style.display = 'none';
            // MODIFIED: Hide junction labels for series circuit
            if (this.junction1Label) this.junction1Label.style.display = 'none';
            if (this.junction2Label) this.junction2Label.style.display = 'none';
        } else {
            this.seriesWires.style.display = 'none';
            this.parallelWires.style.display = 'block';
            // MODIFIED: Show junction labels for parallel circuit
            if (this.junction1Label) this.junction1Label.style.display = 'block';
            if (this.junction2Label) this.junction2Label.style.display = 'block';
        }
        
        // Recalculate circuit values
        this.updateCircuit();
        
        // Provide audio feedback for accessibility
        this.playFeedbackSound();
    }

    /**
     * Set the output indicator type (bulb, ammeter, or bell)
     * Demonstrates different ways to visualize current
     * FIXED: Now properly hides all indicators first, then shows selected one
     */
    setOutputType(type) {
        this.outputType = type;
        
        // Update button states
        this.bulbBtn.classList.toggle('active', type === 'bulb');
        this.ammeterBtn.classList.toggle('active', type === 'ammeter');
        this.bellBtn.classList.toggle('active', type === 'bell');
        
        // FIXED: Hide all indicators first (including their text labels)
        this.bulbElement.style.display = 'none';
        this.ammeterElement.style.display = 'none';
        this.bellElement.style.display = 'none';
        
        // FIXED: Show only the selected indicator
        if (type === 'bulb') {
            this.bulbElement.style.display = 'block';
        } else if (type === 'ammeter') {
            this.ammeterElement.style.display = 'block';
        } else if (type === 'bell') {
            this.bellElement.style.display = 'block';
        }
        
        // Update the indicator display
        this.updateOutputIndicator();
        
        // Update component description - NEW FUNCTIONALITY
        this.updateComponentDescription();
    }

    /**
     * Update component description based on selected output type
     * NEW METHOD: Provides educational information about each component
     */
    updateComponentDescription() {
        if (this.componentTextElement) {
            // Add fade-out effect
            this.componentTextElement.classList.add('fade-out');
            
            // After fade-out completes, update text and fade-in
            setTimeout(() => {
                this.componentTextElement.textContent = this.componentDescriptions[this.outputType];
                this.componentTextElement.classList.remove('fade-out');
                this.componentTextElement.classList.add('fade-in');
                
                // Remove fade-in class after animation
                setTimeout(() => {
                    this.componentTextElement.classList.remove('fade-in');
                }, 300);
            }, 150); // Half of the fade-out duration
        }
    }

    /**
     * Update resistor value displays in real-time
     * Provides immediate feedback following Mayer's contiguity principle
     * MODIFIED: Repositioned text above resistors to avoid wire overlap
     */
    updateResistorDisplay() {
        this.r1ValueSpan.textContent = `${this.r1Value}Ω`;
        this.r2ValueSpan.textContent = `${this.r2Value}Ω`;
        
        // MODIFIED: Repositioned text above resistors to prevent wire overlap
        if (this.resistor1Text) {
            this.resistor1Text.textContent = `R1: ${this.r1Value}Ω`;
            this.resistor1Text.setAttribute('y', '-15'); // Moved above resistor
            this.resistor1Text.setAttribute('class', 'component-label'); // Added class for styling
        }
        if (this.resistor2Text) {
            this.resistor2Text.textContent = `R2: ${this.r2Value}Ω`;
            this.resistor2Text.setAttribute('y', '-15'); // Moved above resistor
            this.resistor2Text.setAttribute('class', 'component-label'); // Added class for styling
        }
    }

    /**
     * Calculate circuit values based on current configuration
     * Implements Ohm's law and resistor combination rules
     */
    calculateCircuitValues() {
        let totalResistance;
        
        if (this.circuitType === 'series') {
            // Series: R_total = R1 + R2
            totalResistance = this.r1Value + this.r2Value;
        } else {
            // Parallel: 1/R_total = 1/R1 + 1/R2
            totalResistance = (this.r1Value * this.r2Value) / (this.r1Value + this.r2Value);
        }
        
        // Calculate current using Ohm's law: I = V/R
        const current = this.voltage / totalResistance;
        
        return {
            totalResistance: totalResistance,
            current: current,
            voltage: this.voltage
        };
    }

    /**
     * Update all circuit displays and calculations
     * Central method that coordinates all visual updates
     * IMPROVED: Better formatting to prevent text overlap
     */
    updateCircuit() {
        const values = this.calculateCircuitValues();
        
        // Update numerical displays with appropriate precision and better formatting
        this.totalResistanceSpan.textContent = `${values.totalResistance.toFixed(1)}Ω`;
        this.currentValueSpan.textContent = `${values.current.toFixed(2)}A`;
        this.voltageValueSpan.textContent = `${values.voltage.toFixed(1)}V`;
        
        // Update ammeter reading if selected with better formatting
        if (this.outputType === 'ammeter' && this.ammeterReading) {
            this.ammeterReading.textContent = `${values.current.toFixed(2)}A`;
            // Ensure ammeter text doesn't overlap
            this.ammeterReading.setAttribute('y', '5');
        }
        
        // Update output indicator based on current value
        this.updateOutputIndicator(values.current);
        
        // Update current flow animation speed
        this.updateCurrentAnimation(values.current);
    }

    /**
     * Update the visual output indicator based on current value
     * Provides intuitive feedback about circuit behavior
     * FIXED: Now properly handles the bulb element reference
     */
    updateOutputIndicator(current = null) {
        if (!current) {
            const values = this.calculateCircuitValues();
            current = values.current;
        }
        
        // Normalize current to 0-1 range for visual effects
        const intensity = Math.min(current / 2, 1); // Assume max current of 2A for full intensity
        
        switch (this.outputType) {
            case 'bulb':
                // FIXED: Get the circle element within the bulb group
                const bulbCircle = this.bulbElement.querySelector('circle');
                if (bulbCircle) {
                    bulbCircle.style.opacity = 0.3 + (intensity * 0.7);
                    bulbCircle.style.filter = `brightness(${0.5 + intensity * 0.5})`;
                }
                break;
                
            case 'ammeter':
                // Ammeter needle position (simulated with color change)
                const color = `hsl(${120 * intensity}, 70%, 50%)`;
                const ammeterCircle = this.ammeterElement.querySelector('circle');
                if (ammeterCircle) {
                    ammeterCircle.style.fill = color;
                }
                break;
                
            case 'bell':
                // Bell vibration effect (simulated with scale animation)
                const scale = 1 + (intensity * 0.2);
                this.bellElement.style.transform = `scale(${scale})`;
                this.bellElement.style.filter = `brightness(${0.8 + intensity * 0.4})`;
                break;
        }
    }

    /**
     * Start animated current flow visualization
     * Helps students visualize current direction and magnitude
     */
    startCurrentAnimation() {
        // Create animated dots to show current flow
        this.animationInterval = setInterval(() => {
            this.createCurrentDot();
        }, 800);
    }

    /**
     * Create a single current flow dot
     * Visual representation of electron flow
     */
    createCurrentDot() {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '3');
        dot.setAttribute('class', 'current-dot');
        
        // Position dot at start of circuit path
        if (this.circuitType === 'series') {
            dot.setAttribute('cx', '80');
            dot.setAttribute('cy', '250');
        } else {
            dot.setAttribute('cx', '80');
            dot.setAttribute('cy', '250');
        }
        
        this.currentDotsContainer.appendChild(dot);
        
        // Animate dot along circuit path
        this.animateDot(dot);
        
        // Remove dot after animation
        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, 4000);
    }

    /**
     * Animate current dot along circuit path
     * Path depends on circuit type (series vs parallel)
     */
    animateDot(dot) {
        const values = this.calculateCircuitValues();
        const speed = Math.max(values.current * 1000, 500); // Minimum speed for visibility
        
        let path;
        if (this.circuitType === 'series') {
            path = [
                {x: 80, y: 250},   // Battery
                {x: 120, y: 250},  // To junction
                {x: 120, y: 150},  // Up to R1
                {x: 150, y: 150},  // Through R1
                {x: 250, y: 150},  // Through R2
                {x: 300, y: 150},  // To corner
                {x: 300, y: 50},   // Up to bulb
                {x: 200, y: 50},   // Through bulb
                {x: 100, y: 50},   // To corner
                {x: 100, y: 100},  // Down
                {x: 50, y: 100},   // To battery
                {x: 50, y: 235}    // Back to start
            ];
        } else {
            path = [
                {x: 80, y: 250},   // Battery
                {x: 120, y: 250},  // To junction
                {x: 120, y: 200},  // Junction point
                {x: 120, y: 150},  // To R1 (one branch)
                {x: 150, y: 150},  // Through R1
                {x: 200, y: 150},  // To upper junction
                {x: 200, y: 100},  // Up to bulb path
                {x: 200, y: 65},   // To bulb
                {x: 185, y: 50},   // Through bulb
                {x: 100, y: 50},   // To corner
                {x: 50, y: 100},   // Down to battery
                {x: 50, y: 235}    // Back to start
            ];
        }
        
        let pathIndex = 0;
        const animateStep = () => {
            if (pathIndex < path.length - 1) {
                const current = path[pathIndex];
                const next = path[pathIndex + 1];
                
                // Smooth transition between points
                dot.setAttribute('cx', next.x);
                dot.setAttribute('cy', next.y);
                
                pathIndex++;
                setTimeout(animateStep, speed / path.length);
            }
        };
        
        animateStep();
    }

    /**
     * Update current animation speed based on calculated current
     * Higher current = faster animation
     */
    updateCurrentAnimation(current) {
        // Clear existing animation
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        
        // Restart with new speed based on current
        const interval = Math.max(1200 - (current * 400), 400);
        this.animationInterval = setInterval(() => {
            this.createCurrentDot();
        }, interval);
    }

    /**
     * Provide audio feedback for interactions
     * Enhances accessibility and user experience
     */
    playFeedbackSound() {
        // Create a simple audio context for feedback
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const AudioCtx = AudioContext || webkitAudioContext;
                const audioContext = new AudioCtx();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Audio feedback not available, continue silently
            }
        }
    }
}

/**
 * Initialize the simulator when the page loads
 * Ensures all DOM elements are ready before starting
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create global simulator instance
    window.circuitSimulator = new CircuitSimulator();
    
    // Add keyboard shortcuts for accessibility - IMPROVED: Added component description updates
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case '1':
                window.circuitSimulator.setCircuitType('series');
                break;
            case '2':
                window.circuitSimulator.setCircuitType('parallel');
                break;
            case 'b':
            case 'B':
                window.circuitSimulator.setOutputType('bulb');
                break;
            case 'a':
            case 'A':
                window.circuitSimulator.setOutputType('ammeter');
                break;
            case 'e':
            case 'E':
                window.circuitSimulator.setOutputType('bell');
                break;
        }
    });
});

/**
 * Handle window resize for responsive design
 * Ensures proper display in different viewport sizes
 * IMPROVED: Added text overlap prevention on resize
 */
window.addEventListener('resize', () => {
    // Recalculate layout if needed
    const container = document.querySelector('.container');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
    
    // Refresh text positioning to prevent overlap after resize
    if (window.circuitSimulator) {
        window.circuitSimulator.updateResistorDisplay();
        window.circuitSimulator.updateCircuit();
        // Refresh component description display - NEW ADDITION
        window.circuitSimulator.updateComponentDescription();
    }
});