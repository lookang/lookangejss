// Trade Receivables Impairment Simulation
// This script handles the interactive calculation of impairment loss/reversal

class ImpairmentSimulation {
    constructor() {
        // Initialize DOM elements
        this.tradeReceivablesSelect = document.getElementById('tradeReceivables');
        this.percentageSelect = document.getElementById('percentage');
        this.calculationDisplay = document.getElementById('calculationDisplay');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Formula display elements
        this.percentagePart = document.getElementById('percentagePart');
        this.balancePart = document.getElementById('balancePart');
        this.endingAllowance = document.getElementById('endingAllowance');
        
        // Results display elements
        this.endingAllowanceResult = document.getElementById('endingAllowanceResult');
        this.differenceResult = document.getElementById('differenceResult');
        this.conclusion = document.getElementById('conclusion');
        this.conclusionText = document.getElementById('conclusionText');
        
        // Modified working calculation elements for horizontal layout
        this.workingCalculation = document.getElementById('workingCalculation');
        this.workingEndingAmount = document.getElementById('workingEndingAmount');
        this.workingDifferenceAmount = document.getElementById('workingDifferenceAmount');
        this.resultIndication = document.getElementById('resultIndication');
        
        // Constants
        this.BEGINNING_ALLOWANCE = 10000;
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Initialize tooltip functionality
        this.initializeTooltips();
        
        console.log('Impairment Simulation initialized');
    }
    
    initializeEventListeners() {
        // Add change listeners to dropdowns
        this.tradeReceivablesSelect.addEventListener('change', () => {
            this.calculateImpairment();
            this.addHighlightAnimation();
        });
        
        this.percentageSelect.addEventListener('change', () => {
            this.calculateImpairment();
            this.addHighlightAnimation();
        });
        
        // Reset button functionality
        this.resetBtn.addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Add hover effects for better UX
        this.addHoverEffects();
    }
    
    initializeTooltips() {
        // Create tooltip element if it doesn't exist
        let tooltip = document.getElementById('tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'tooltip';
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
        }
        
        // Add tooltip functionality to container
        const container = document.querySelector('.container');
        container.addEventListener('mouseenter', (e) => {
            const title = container.getAttribute('title');
            if (title) {
                tooltip.textContent = title;
                tooltip.classList.add('show');
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        container.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('show')) {
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        container.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    }
    
    updateTooltipPosition(e, tooltip) {
        const rect = tooltip.getBoundingClientRect();
        let x = e.clientX + 10;
        let y = e.clientY - rect.height - 10;
        
        // Adjust if tooltip goes off screen
        if (x + rect.width > window.innerWidth) {
            x = e.clientX - rect.width - 10;
        }
        if (y < 0) {
            y = e.clientY + 10;
        }
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    addHoverEffects() {
        // Add visual feedback for interactive elements
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('focus', () => {
                dropdown.parentElement.style.transform = 'scale(1.02)';
            });
            
            dropdown.addEventListener('blur', () => {
                dropdown.parentElement.style.transform = 'scale(1)';
            });
        });
    }
    
    calculateImpairment() {
        // Get selected values
        const tradeReceivablesValue = parseFloat(this.tradeReceivablesSelect.value);
        const percentageValue = parseFloat(this.percentageSelect.value);
        
        // Check if both values are selected
        if (!tradeReceivablesValue || !percentageValue) {
            this.resetDisplay();
            return;
        }
        
        // Calculate ending allowance
        const endingAllowanceAmount = (percentageValue / 100) * tradeReceivablesValue;
        
        // Update formula display
        this.updateFormulaDisplay(percentageValue, tradeReceivablesValue, endingAllowanceAmount);
        
        // Calculate difference (impairment loss or reversal)
        const difference = endingAllowanceAmount - this.BEGINNING_ALLOWANCE;
        
        // Update results display
        this.updateResultsDisplay(endingAllowanceAmount, difference);
        
        // Show and update working calculation with horizontal layout - Modified functionality
        this.updateWorkingCalculationHorizontal(endingAllowanceAmount, difference);
        
        console.log(`Calculation: ${percentageValue}% × ${tradeReceivablesValue.toLocaleString()} = ${endingAllowanceAmount.toLocaleString()}`);
        console.log(`Difference: ${difference.toLocaleString()}`);
    }
    
    updateFormulaDisplay(percentage, balance, result) {
        // Update formula parts with animation
        this.percentagePart.textContent = `${percentage}%`;
        this.balancePart.textContent = `$${balance.toLocaleString()}`;
        this.endingAllowance.textContent = `$${result.toLocaleString()}`;
        
        // Add highlight animation
        [this.percentagePart, this.balancePart, this.endingAllowance].forEach(element => {
            element.classList.add('value-change');
            setTimeout(() => element.classList.remove('value-change'), 600);
        });
    }
    
    updateResultsDisplay(endingAllowance, difference) {
        // Update ending allowance result
        this.endingAllowanceResult.textContent = `$${endingAllowance.toLocaleString()}`;
        this.endingAllowanceResult.classList.add('value-change');
        setTimeout(() => this.endingAllowanceResult.classList.remove('value-change'), 600);
        
        // Update difference result with brackets for negative amounts - Modified functionality
        const formattedDifference = this.formatDifferenceAmount(difference);
        
        this.differenceResult.textContent = formattedDifference;
        this.differenceResult.classList.add('value-change');
        
        // Add negative styling if difference is negative
        if (difference < 0) {
            this.differenceResult.classList.add('negative-amount');
        } else {
            this.differenceResult.classList.remove('negative-amount');
        }
        
        setTimeout(() => this.differenceResult.classList.remove('value-change'), 600);
        
        // Update conclusion
        this.updateConclusion(difference);
    }
    
    // Added method to format difference amount with brackets for negative values
    formatDifferenceAmount(difference) {
        if (difference < 0) {
            return `($${Math.abs(difference).toLocaleString()})`;
        } else if (difference > 0) {
            return `$${difference.toLocaleString()}`;
        } else {
            return '$0';
        }
    }
    
    // Modified method to update working calculation display with horizontal layout
    updateWorkingCalculationHorizontal(endingAllowance, difference) {
        // Show the working calculation section
        this.workingCalculation.style.display = 'block';
        
        // Update working calculation amounts in horizontal format
        this.workingEndingAmount.textContent = `$${endingAllowance.toLocaleString()}`;
        
        // Format difference amount with brackets for negative values
        const formattedDifference = this.formatDifferenceAmount(difference);
        this.workingDifferenceAmount.textContent = formattedDifference;
        
        // Add negative styling if difference is negative
        if (difference < 0) {
            this.workingDifferenceAmount.classList.add('negative-amount');
        } else {
            this.workingDifferenceAmount.classList.remove('negative-amount');
        }
        
        // Update result indication with arrow pointing down
        this.updateResultIndication(difference);
        
        // Add animation to working calculation
        this.workingCalculation.classList.add('value-change');
        setTimeout(() => this.workingCalculation.classList.remove('value-change'), 600);
    }
    
    // Modified method to update result indication with proper formatting
    updateResultIndication(difference) {
        // Remove existing classes
        this.resultIndication.className = 'result-indication';
        
        let indicationText = '';
        let className = '';
        
        if (difference > 0) {
            // Impairment loss
            indicationText = `📈 Impairment Loss on Trade Receivables: $${difference.toLocaleString()}`;
            className = 'impairment-loss';
        } else if (difference < 0) {
            // Reversal of impairment loss
            indicationText = `📉 Reversal of Impairment Loss on Trade Receivables: $${Math.abs(difference).toLocaleString()}`;
            className = 'reversal';
        } else {
            // No change
            indicationText = `⚖️ No Impairment Adjustment Required`;
            className = 'neutral';
        }
        
        // Apply changes with animation
        this.resultIndication.classList.add(className);
        this.resultIndication.textContent = indicationText;
    }
    
    updateConclusion(difference) {
        // Remove existing classes
        this.conclusion.className = 'conclusion';
        
        let conclusionText = '';
        let className = '';
        
        if (difference > 0) {
            // Impairment loss
            conclusionText = `📈 Impairment Loss on Trade Receivables: $${difference.toLocaleString()}`;
            className = 'impairment-loss';
            
            // Add detailed explanation
            const explanation = document.createElement('div');
            explanation.style.fontSize = '0.9em';
            explanation.style.marginTop = '10px';
            explanation.style.color = '#666';
            explanation.innerHTML = `Since ending allowance ($${(this.BEGINNING_ALLOWANCE + difference).toLocaleString()}) > beginning allowance ($${this.BEGINNING_ALLOWANCE.toLocaleString()}), we record an impairment loss.`;
            
        } else if (difference < 0) {
            // Reversal of impairment loss - Modified to show proper formatting
            conclusionText = `📉 Reversal of Impairment Loss on Trade Receivables: $${Math.abs(difference).toLocaleString()}`;
            className = 'reversal';
            
        } else {
            // No change
            conclusionText = `⚖️ No Impairment Adjustment Required`;
            className = 'neutral';
        }
        
        // Apply changes with animation
        this.conclusion.classList.add(className);
        this.conclusionText.textContent = conclusionText;
        
        // Add bounce animation
        this.conclusion.style.animation = 'none';
        setTimeout(() => {
            this.conclusion.style.animation = 'highlight 0.6s ease-in-out';
        }, 10);
    }
    
    addHighlightAnimation() {
        // Add visual feedback when calculation updates
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    section.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
    
    resetDisplay() {
        // Reset formula display
        this.percentagePart.textContent = '___%';
        this.balancePart.textContent = '$___';
        this.endingAllowance.textContent = '$___';
        
        // Reset results display
        this.endingAllowanceResult.textContent = '$___';
        this.differenceResult.textContent = '$___';
        this.differenceResult.classList.remove('negative-amount');
        
        // Hide working calculation - Modified functionality for horizontal layout
        this.workingCalculation.style.display = 'none';
        this.workingEndingAmount.textContent = '$___';
        this.workingDifferenceAmount.textContent = '$___';
        this.workingDifferenceAmount.classList.remove('negative-amount');
        this.resultIndication.className = 'result-indication neutral';
        this.resultIndication.textContent = 'Select parameters to see result';
        
        // Reset conclusion
        this.conclusion.className = 'conclusion neutral';
        this.conclusionText.textContent = 'Select parameters above to see the impairment analysis';
    }
    
    resetSimulation() {
        // Reset dropdown selections
        this.tradeReceivablesSelect.value = '';
        this.percentageSelect.value = '';
        
        // Reset display
        this.resetDisplay();
        
        // Add reset animation
        const container = document.querySelector('.container');
        container.style.animation = 'highlight 0.8s ease-in-out';
        setTimeout(() => {
            container.style.animation = 'none';
        }, 800);
        
        console.log('Simulation reset');
        
        // Show reset confirmation
        this.showResetConfirmation();
    }
    
    showResetConfirmation() {
        // Create temporary confirmation message
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
            animation: slideDown 0.3s ease-out;
        `;
        confirmation.textContent = '✓ Simulation Reset Successfully';
        
        // Add slide down animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(confirmation);
        
        // Remove after 2 seconds
        setTimeout(() => {
            confirmation.style.animation = 'slideDown 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(confirmation);
                document.head.removeChild(style);
            }, 300);
        }, 2000);
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing simulation...');
    
    // Create simulation instance
    const simulation = new ImpairmentSimulation();
    
    // Add accessibility features
    addAccessibilityFeatures();
    
    // Add mobile-specific optimizations
    addMobileOptimizations();
    
    console.log('Simulation ready for use');
});

// Accessibility enhancements
function addAccessibilityFeatures() {
    // Add ARIA labels and descriptions
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown, index) => {
        dropdown.setAttribute('aria-describedby', `help-${index}`);
        
        // Add keyboard navigation support
        dropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                dropdown.click();
            }
        });
    });
    
    // Add focus management
    const focusableElements = document.querySelectorAll('select, button');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '3px solid #4285f4';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Mobile-specific optimizations
function addMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile-specific styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            .dropdown {
                font-size: 16px; /* Prevent zoom on iOS */
                padding: 15px;
            }
            
            .section {
                padding: 20px 15px;
            }
            
            .formula {
                font-size: 1.1em;
            }
            
            .reset-btn {
                padding: 15px 40px;
                font-size: 1.1em;
            }
        `;
        document.head.appendChild(mobileStyles);
        
        // Add touch feedback
        const touchElements = document.querySelectorAll('.dropdown, .reset-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
        
        console.log('Mobile optimizations applied');
    }
}

// Error handling and validation
window.addEventListener('error', (e) => {
    console.error('Simulation error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #f44336;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1001;
    `;
    errorDiv.textContent = 'An error occurred. Please refresh the page.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        document.body.removeChild(errorDiv);
    }, 5000);
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
        if (entry.duration > 100) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
        }
    });
});

performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });