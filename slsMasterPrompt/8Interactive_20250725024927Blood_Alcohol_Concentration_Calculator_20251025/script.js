// Blood Alcohol Concentration Calculator
// Based on the formula: BAC (%) = (0.0116 × X) / (R × M) × 100 - 0.015 × t

class BACCalculator {
    constructor() {
        // DOM elements
        this.massField = document.getElementById('massField');
        this.massSlider = document.getElementById('massSlider');
        this.timeField = document.getElementById('timeField');
        this.timeSlider = document.getElementById('timeSlider');
        this.beerField = document.getElementById('beerField');
        this.beerSlider = document.getElementById('beerSlider');
        this.genderSelect = document.getElementById('genderSelect');
        this.resultValue = document.getElementById('resultValue');
        this.bacStatus = document.getElementById('bacStatus');
        this.errorMessage = document.getElementById('errorMessage');

        // Constants for BAC calculation
        this.constants = {
            alcoholConstant: 0.0116,  // Constant for alcohol absorption
            metabolismRate: 0.015     // Alcohol metabolism rate per hour
        };

        // Initialize the calculator
        this.init();
    }

    init() {
        // Bind event listeners for all inputs
        this.bindEvents();
        
        // Perform initial calculation
        this.calculate();
        
        // Check for knowledge base
        this.checkKnowledgeBase();
    }

    bindEvents() {
        // Mass input synchronization
        this.massField.addEventListener('input', (e) => {
            this.massSlider.value = e.target.value;
            this.calculate();
        });

        this.massSlider.addEventListener('input', (e) => {
            this.massField.value = e.target.value;
            this.calculate();
        });

        // Time input synchronization
        this.timeField.addEventListener('input', (e) => {
            this.timeSlider.value = e.target.value;
            this.calculate();
        });

        this.timeSlider.addEventListener('input', (e) => {
            this.timeField.value = e.target.value;
            this.calculate();
        });

        // Beer glasses input synchronization
        this.beerField.addEventListener('input', (e) => {
            this.beerSlider.value = e.target.value;
            this.calculate();
        });

        this.beerSlider.addEventListener('input', (e) => {
            this.beerField.value = e.target.value;
            this.calculate();
        });

        // Gender selection
        this.genderSelect.addEventListener('change', () => {
            this.calculate();
        });

        // Add validation to prevent invalid inputs
        this.addInputValidation();
    }

    addInputValidation() {
        // Validate mass input
        this.massField.addEventListener('blur', (e) => {
            const value = parseFloat(e.target.value);
            if (value < 30) e.target.value = 30;
            if (value > 100) e.target.value = 100;
            this.massSlider.value = e.target.value;
            this.calculate();
        });

        // Validate time input
        this.timeField.addEventListener('blur', (e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) e.target.value = 0;
            if (value > 24) e.target.value = 24;
            this.timeSlider.value = e.target.value;
            this.calculate();
        });

        // Validate beer input
        this.beerField.addEventListener('blur', (e) => {
            const value = parseFloat(e.target.value);
            if (value < 1) e.target.value = 1;
            if (value > 12) e.target.value = 12;
            this.beerSlider.value = e.target.value;
            this.calculate();
        });
    }

    calculate() {
        try {
            // Get input values
            const mass = parseFloat(this.massField.value);
            const time = parseFloat(this.timeField.value);
            const beerGlasses = parseFloat(this.beerField.value);
            const bodyWaterRatio = parseFloat(this.genderSelect.value);

            // Validate inputs
            if (isNaN(mass) || isNaN(time) || isNaN(beerGlasses) || isNaN(bodyWaterRatio)) {
                throw new Error('Invalid input values');
            }

            // BAC Formula: BAC (%) = (0.0116 × X) / (R × M) × 100 - 0.015 × t
            // Where:
            // X = number of glasses of beer
            // M = mass of person (kg)
            // R = body water ratio (0.55 for female, 0.60 for male)
            // t = time after drinking (hours)
            
            const bacCalculation = (this.constants.alcoholConstant * beerGlasses) / (bodyWaterRatio * mass) * 100 - this.constants.metabolismRate * time;
            
            // Ensure BAC cannot be negative (body has metabolized all alcohol)
            const bac = Math.max(bacCalculation, 0);

            // Display result with 3 decimal places
            this.resultValue.textContent = bac.toFixed(3);

            // Update BAC status
            this.updateBACStatus(bac);

            // Clear any error messages
            this.hideError();

        } catch (error) {
            this.showError('Calculation error: ' + error.message);
            console.error('BAC Calculation Error:', error);
        }
    }

    updateBACStatus(bac) {
        let statusText = '';
        let statusClass = '';

        if (bac === 0) {
            statusText = 'Sober';
            statusClass = 'safe';
        } else if (bac < 0.02) {
            statusText = 'Minimal Effect';
            statusClass = 'safe';
        } else if (bac < 0.05) {
            statusText = 'Slight Impairment';
            statusClass = 'safe';
        } else if (bac < 0.08) {
            statusText = 'Caution';
            statusClass = 'caution';
        } else if (bac < 0.15) {
            statusText = 'Legally Impaired';
            statusClass = 'danger';
        } else if (bac < 0.30) {
            statusText = 'Severely Impaired';
            statusClass = 'danger';
        } else {
            statusText = 'Life Threatening';
            statusClass = 'critical';
        }

        this.bacStatus.textContent = statusText;
        this.bacStatus.className = 'bac-status ' + statusClass;
    }

    checkKnowledgeBase() {
        // For assessment purposes, knowledge base is hidden
        // This function checks if the knowledge base exists and reports if not found
        const knowledgeBase = document.getElementById('knowledgeBase');
        
        if (!knowledgeBase) {
            console.warn('Knowledge base element not found');
            this.showError('Knowledge base not found - this is expected for assessment mode');
            setTimeout(() => this.hideError(), 3000);
        } else {
            console.log('Knowledge base found but hidden for assessment');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }

    // Method to show knowledge base (for educational purposes)
    showKnowledgeBase() {
        const knowledgeBase = document.getElementById('knowledgeBase');
        if (knowledgeBase) {
            knowledgeBase.style.display = 'block';
        }
    }

    // Method to hide knowledge base (for assessment)
    hideKnowledgeBase() {
        const knowledgeBase = document.getElementById('knowledgeBase');
        if (knowledgeBase) {
            knowledgeBase.style.display = 'none';
        }
    }

    // Method to get current calculation details (for debugging)
    getCalculationDetails() {
        const mass = parseFloat(this.massField.value);
        const time = parseFloat(this.timeField.value);
        const beerGlasses = parseFloat(this.beerField.value);
        const bodyWaterRatio = parseFloat(this.genderSelect.value);
        const gender = this.genderSelect.options[this.genderSelect.selectedIndex].text;

        return {
            inputs: {
                mass: mass,
                time: time,
                beerGlasses: beerGlasses,
                bodyWaterRatio: bodyWaterRatio,
                gender: gender
            },
            formula: `BAC = (${this.constants.alcoholConstant} × ${beerGlasses}) / (${bodyWaterRatio} × ${mass}) × 100 - ${this.constants.metabolismRate} × ${time}`,
            result: this.resultValue.textContent
        };
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance for potential external access
    window.bacCalculator = new BACCalculator();
    
    console.log('Blood Alcohol Concentration Calculator initialized');
    console.log('Formula: BAC (%) = (0.0116 × X) / (R × M) × 100 - 0.015 × t');
    console.log('X = glasses of beer, M = mass (kg), R = body water ratio, t = time (hours)');
    console.log('R values: Female = 0.55, Male = 0.60');
    
    // For assessment mode, ensure knowledge base is hidden
    window.bacCalculator.hideKnowledgeBase();
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Allow normal tab navigation
        return;
    }
    
    if (e.key === 'Enter') {
        // Recalculate on Enter key
        if (window.bacCalculator) {
            window.bacCalculator.calculate();
        }
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    // Prevent zoom on double tap for input elements
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        e.preventDefault();
    }
}, { passive: false });

// Responsive height adjustment
function adjustHeight() {
    const container = document.querySelector('.container');
    if (window.self !== window.top) {
        // We're in an iframe
        container.style.height = '450px';
    } else {
        // We're in a standalone window
        container.style.height = '90vh';
    }
}

// Call on load and resize
window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);