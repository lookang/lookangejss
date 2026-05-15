// Trade Receivables Impairment Simulation
// This script handles the interactive calculation of impairment losses and financial statement updates

class TradeReceivablesSimulation {
    constructor() {
        // Given constants as per requirements
        this.GIVEN_TRADE_RECEIVABLES = 10000;
        this.GIVEN_ALLOWANCE = 500;
        
        // Initialize DOM elements
        this.initializeElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Perform initial calculation
        this.calculate();
    }
    
    // Initialize all DOM element references
    initializeElements() {
        this.uncollectibleSelect = document.getElementById('uncollectible');
        this.percentageSelect = document.getElementById('percentage');
        this.showWorkingsCheckbox = document.getElementById('showWorkings');
        
        // Result display elements
        this.impairmentLabel = document.getElementById('impairmentLabel');
        this.impairmentValue = document.getElementById('impairmentValue');
        this.impairmentWorking = document.getElementById('impairmentWorking');
        
        this.tradeReceivablesValue = document.getElementById('tradeReceivablesValue');
        this.tradeReceivablesWorking = document.getElementById('tradeReceivablesWorking');
        
        this.allowanceValue = document.getElementById('allowanceValue');
        this.allowanceWorking = document.getElementById('allowanceWorking');
        
        this.netReceivablesValue = document.getElementById('netReceivablesValue');
        this.netReceivablesWorking = document.getElementById('netReceivablesWorking');
    }
    
    // Set up event listeners for interactive elements
    setupEventListeners() {
        // Recalculate when dropdown values change
        this.uncollectibleSelect.addEventListener('change', () => this.calculate());
        this.percentageSelect.addEventListener('change', () => this.calculate());
        
        // Toggle workings display
        this.showWorkingsCheckbox.addEventListener('change', () => this.toggleWorkings());
        
        // Add hover effect for tooltip
        document.querySelector('.container').addEventListener('mouseenter', this.showTooltip);
        document.querySelector('.container').addEventListener('mouseleave', this.hideTooltip);
    }
    
    // Main calculation function implementing the business logic
    calculate() {
        // Get current input values
        const amountConfirmedUncollectible = parseInt(this.uncollectibleSelect.value);
        const percentageEstimatedUncollectible = parseFloat(this.percentageSelect.value);
        
        // Perform calculations as per requirements
        // Trade receivables = Given trade receivables minus amount confirmed uncollectible
        const tradeReceivables = this.GIVEN_TRADE_RECEIVABLES - amountConfirmedUncollectible;
        
        // Allowance for impairment = % x Trade receivables
        const allowanceForImpairment = (percentageEstimatedUncollectible / 100) * tradeReceivables;
        
        // Impairment loss = Allowance for impairment - (Given Allowance - amount confirmed uncollectible)
        const adjustedGivenAllowance = this.GIVEN_ALLOWANCE - amountConfirmedUncollectible;
        const impairmentLoss = allowanceForImpairment - adjustedGivenAllowance;
        
        // Net trade receivables = Trade receivables - Allowance for impairment
        const netTradeReceivables = tradeReceivables - allowanceForImpairment;
        
        // Update display with calculated values
        this.updateDisplay({
            tradeReceivables,
            allowanceForImpairment,
            impairmentLoss,
            netTradeReceivables,
            amountConfirmedUncollectible,
            percentageEstimatedUncollectible,
            adjustedGivenAllowance
        });
    }
    
    // Update the display with calculated values and workings
    updateDisplay(values) {
        const {
            tradeReceivables,
            allowanceForImpairment,
            impairmentLoss,
            netTradeReceivables,
            amountConfirmedUncollectible,
            percentageEstimatedUncollectible,
            adjustedGivenAllowance
        } = values;
        
        // Handle impairment loss display (positive or reversal)
        // Modified: Updated to display workings in brackets next to the label
        if (impairmentLoss < 0) {
            this.impairmentLabel.innerHTML = `Reversal of impairment loss on trade receivables <span class="working" id="impairmentWorking">(${allowanceForImpairment.toLocaleString()} - ${adjustedGivenAllowance.toLocaleString()})</span>`;
            this.impairmentValue.textContent = `(${Math.abs(impairmentLoss).toLocaleString()})`;
            this.impairmentValue.classList.add('negative');
        } else {
            this.impairmentLabel.innerHTML = `Impairment loss on trade receivables <span class="working" id="impairmentWorking">(${allowanceForImpairment.toLocaleString()} - ${adjustedGivenAllowance.toLocaleString()})</span>`;
            this.impairmentValue.textContent = `${impairmentLoss.toLocaleString()}`;
            this.impairmentValue.classList.remove('negative');
        }
        
        // Update other values with animation
        this.updateValueWithAnimation(this.tradeReceivablesValue, `${tradeReceivables.toLocaleString()}`);
        this.updateValueWithAnimation(this.allowanceValue, `(${allowanceForImpairment.toLocaleString()})`);
        this.updateValueWithAnimation(this.netReceivablesValue, `${netTradeReceivables.toLocaleString()}`);
        
        // Modified: Update workings to display in brackets next to labels
        // Re-get the working elements after innerHTML update
        this.impairmentWorking = document.getElementById('impairmentWorking');
        this.tradeReceivablesWorking.textContent = `(${this.GIVEN_TRADE_RECEIVABLES.toLocaleString()} - ${amountConfirmedUncollectible})`;
        this.allowanceWorking.textContent = `(${percentageEstimatedUncollectible}% × ${tradeReceivables.toLocaleString()})`;
        this.netReceivablesWorking.textContent = `(${tradeReceivables.toLocaleString()} - ${allowanceForImpairment.toLocaleString()})`;
    }
    
    // Add visual feedback when values change
    updateValueWithAnimation(element, newValue) {
        if (element.textContent !== newValue) {
            element.classList.add('value-change');
            element.textContent = newValue;
            setTimeout(() => element.classList.remove('value-change'), 500);
        }
    }
    
    // Toggle visibility of calculation workings
    toggleWorkings() {
        const workings = document.querySelectorAll('.working');
        const isChecked = this.showWorkingsCheckbox.checked;
        
        workings.forEach(working => {
            if (isChecked) {
                working.classList.add('show');
            } else {
                working.classList.remove('show');
            }
        });
    }
    
    // Tooltip functionality for header information
    showTooltip() {
        const tooltip = document.getElementById('headerTooltip');
        tooltip.style.opacity = '1';
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('headerTooltip');
        tooltip.style.opacity = '0';
    }
}

// Initialize the simulation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TradeReceivablesSimulation();
});

// Additional utility functions for enhanced user experience

// Format currency values consistently
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Ensure proper tab order for accessibility
        const focusableElements = document.querySelectorAll('select, input[type="checkbox"]');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (e.shiftKey && currentIndex === 0) {
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
        } else if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
            e.preventDefault();
            focusableElements[0].focus();
        }
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Enhance dropdown interaction on touch devices
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('touchstart', function() {
            this.focus();
        });
    });
}