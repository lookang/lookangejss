// Trade Receivables Impairment Simulation
// This script handles the interactive calculation of trade receivables impairment

class TradeReceivablesSimulation {
    constructor() {
        // Given constants as per requirements
        this.GIVEN_TRADE_RECEIVABLES = 10000;
        this.GIVEN_ALLOWANCE = 500;
        
        // Get DOM elements
        this.uncollectibleSelect = document.getElementById('uncollectible');
        this.percentageSelect = document.getElementById('percentage');
        this.showWorkingsCheckbox = document.getElementById('showWorkings');
        
        // Result display elements - Updated to target new structure
        this.impairmentLabel = document.getElementById('impairment-label');
        this.impairmentValue = document.getElementById('impairment-value');
        this.impairmentWorking = document.getElementById('impairment-working');
        this.tradeReceivables = document.getElementById('trade-receivables');
        this.tradeReceivablesWorking = document.getElementById('trade-receivables-working');
        this.allowanceValue = document.getElementById('allowance-value');
        this.allowanceWorking = document.getElementById('allowance-working');
        this.netReceivables = document.getElementById('net-receivables');
        this.netWorking = document.getElementById('net-working');
        
        this.initializeEventListeners();
        this.calculate(); // Initial calculation
    }
    
    initializeEventListeners() {
        // Add change listeners to dropdowns
        this.uncollectibleSelect.addEventListener('change', () => {
            this.showWorkingsCheckbox.checked = false; // Uncheck workings when variables change
            this.calculate();
        });
        
        this.percentageSelect.addEventListener('change', () => {
            this.showWorkingsCheckbox.checked = false; // Uncheck workings when variables change
            this.calculate();
        });
        
        // Add listener for show workings checkbox
        this.showWorkingsCheckbox.addEventListener('change', () => {
            this.toggleWorkings();
        });
    }
    
    calculate() {
        // Get current input values
        const uncollectibleAmount = parseInt(this.uncollectibleSelect.value);
        const estimatedPercentage = parseInt(this.percentageSelect.value);
        
        // Perform calculations as per the given logic
        
        // 1. Trade receivables = Given trade receivables minus amount confirmed uncollectible
        const tradeReceivablesAmount = this.GIVEN_TRADE_RECEIVABLES - uncollectibleAmount;
        
        // 2. Allowance for impairment = % x Trade receivables
        const allowanceAmount = (estimatedPercentage / 100) * tradeReceivablesAmount;
        
        // 3. Impairment loss = Allowance for impairment - (Given Allowance - amount confirmed uncollectible)
        const adjustedGivenAllowance = this.GIVEN_ALLOWANCE - uncollectibleAmount;
        const impairmentLoss = allowanceAmount - adjustedGivenAllowance;
        
        // 4. Net trade receivables = Trade receivables - Allowance for impairment
        const netReceivablesAmount = tradeReceivablesAmount - allowanceAmount;
        
        // Update display with calculated values
        this.updateDisplay({
            tradeReceivablesAmount,
            allowanceAmount,
            impairmentLoss,
            netReceivablesAmount,
            uncollectibleAmount,
            estimatedPercentage,
            adjustedGivenAllowance
        });
    }
    
    updateDisplay(values) {
        const {
            tradeReceivablesAmount,
            allowanceAmount,
            impairmentLoss,
            netReceivablesAmount,
            uncollectibleAmount,
            estimatedPercentage,
            adjustedGivenAllowance
        } = values;
        
        // Update trade receivables
        this.tradeReceivables.textContent = this.formatCurrency(tradeReceivablesAmount);
        // Working now appears next to the label, not the value
        this.tradeReceivablesWorking.textContent = `(${this.formatCurrency(this.GIVEN_TRADE_RECEIVABLES)} - ${this.formatCurrency(uncollectibleAmount)})`;
        
        // Update allowance (always show as negative)
        this.allowanceValue.textContent = `(${this.formatCurrency(allowanceAmount)})`;
        // Working now appears next to the label, not the value
        this.allowanceWorking.textContent = `(${estimatedPercentage}% × ${this.formatCurrency(tradeReceivablesAmount)})`;
        
        // Update net receivables
        this.netReceivables.textContent = this.formatCurrency(netReceivablesAmount);
        // Working now appears next to the label, not the value
        this.netWorking.textContent = `(${this.formatCurrency(tradeReceivablesAmount)} - ${this.formatCurrency(allowanceAmount)})`;
        
        // Handle impairment loss or reversal
        if (impairmentLoss < 0) {
            // Show as reversal (negative value becomes positive in brackets)
            this.impairmentLabel.textContent = 'Reversal of impairment loss on trade receivables';
            this.impairmentLabel.classList.add('reversal');
            this.impairmentValue.textContent = `(${this.formatCurrency(Math.abs(impairmentLoss))})`;
            this.impairmentValue.classList.add('reversal');
        } else {
            // Show as regular impairment loss
            this.impairmentLabel.textContent = 'Impairment loss on trade receivables';
            this.impairmentLabel.classList.remove('reversal');
            this.impairmentValue.textContent = this.formatCurrency(impairmentLoss);
            this.impairmentValue.classList.remove('reversal');
        }
        
        // Set working for impairment - now appears next to the label, not the value
        this.impairmentWorking.textContent = `(${this.formatCurrency(allowanceAmount)} - ${this.formatCurrency(adjustedGivenAllowance)})`;
        
        // Add animation effect for value changes
        this.animateValueChange();
        
        // Update workings visibility
        this.toggleWorkings();
    }
    
    toggleWorkings() {
        const showWorkings = this.showWorkingsCheckbox.checked;
        const workingElements = document.querySelectorAll('.working');
        
        workingElements.forEach(element => {
            element.style.display = showWorkings ? 'inline-block' : 'none';
        });
    }
    
    formatCurrency(amount) {
        // Format number as currency without decimal places for whole numbers
        if (amount % 1 === 0) {
            return `${amount.toLocaleString()}`;
        } else {
            return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }
    
    animateValueChange() {
        // Add highlight animation to value elements
        const valueElements = [
            this.impairmentValue,
            this.tradeReceivables,
            this.allowanceValue,
            this.netReceivables
        ];
        
        valueElements.forEach(element => {
            element.classList.remove('value-change');
            // Force reflow
            element.offsetHeight;
            element.classList.add('value-change');
        });
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TradeReceivablesSimulation();
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, { passive: true });

// Handle responsive behavior
window.addEventListener('resize', () => {
    // Adjust layout if needed for different screen sizes
    const container = document.querySelector('.container');
    if (window.innerHeight > 600) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation
    if (e.key === 'Tab') {
        // Ensure proper tab order
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