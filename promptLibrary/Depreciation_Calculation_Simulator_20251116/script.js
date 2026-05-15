// Depreciation Calculator Simulation
// This script handles the interactive calculation of depreciation expenses
// using both straight-line and reducing-balance methods

class DepreciationCalculator {
    constructor() {
        // Equipment details as per scenario
        this.equipmentCost = 12000;
        this.depreciationRate = 0.20; // 20%
        
        // Get DOM elements
        this.purchaseDateSelect = document.getElementById('purchaseDate');
        this.yearEndSelect = document.getElementById('yearEnd');
        this.fullYearCheckbox = document.getElementById('fullYearPolicy');
        this.resetButton = document.getElementById('resetBtn');
        
        // Result display elements
        this.resultElements = {
            sl2023: document.getElementById('sl2023'),
            sl2024: document.getElementById('sl2024'),
            sl2025: document.getElementById('sl2025'),
            rb2023: document.getElementById('rb2023'),
            rb2024: document.getElementById('rb2024'),
            rb2025: document.getElementById('rb2025')
        };
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Calculate initial values
        this.calculateDepreciation();
    }
    
    initializeEventListeners() {
        // Add change event listeners to all input controls
        this.purchaseDateSelect.addEventListener('change', () => this.calculateDepreciation());
        this.yearEndSelect.addEventListener('change', () => this.calculateDepreciation());
        this.fullYearCheckbox.addEventListener('change', () => this.calculateDepreciation());
        this.resetButton.addEventListener('click', () => this.resetForm());
        
        // Add hover effects for better UX
        this.addHoverEffects();
    }
    
    addHoverEffects() {
        // Add visual feedback for interactive elements
        const interactiveElements = [this.purchaseDateSelect, this.yearEndSelect, this.resetButton];
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-1px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }
    
    calculateDepreciation() {
        // Get current input values
        const purchaseDate = new Date(this.purchaseDateSelect.value);
        const yearEndValue = this.yearEndSelect.value;
        const fullYearPolicy = this.fullYearCheckbox.checked;
        
        // Parse year end date
        const [month, day] = yearEndValue.split('-');
        
        // Calculate depreciation for each year and method
        const straightLineResults = this.calculateStraightLine(purchaseDate, month, day, fullYearPolicy);
        const reducingBalanceResults = this.calculateReducingBalance(purchaseDate, month, day, fullYearPolicy);
        
        // Update display with animation
        this.updateResults(straightLineResults, reducingBalanceResults);
    }
    
    calculateStraightLine(purchaseDate, yearEndMonth, yearEndDay, fullYearPolicy) {
        const results = { 2023: 0, 2024: 0, 2025: 0 };
        const annualDepreciation = this.equipmentCost * this.depreciationRate; // $2,400
        
        // Calculate months in use for each year
        const monthsInUse = this.calculateMonthsInUse(purchaseDate, yearEndMonth, yearEndDay, fullYearPolicy);
        
        // Apply straight-line calculation
        results[2023] = fullYearPolicy && purchaseDate.getFullYear() === 2023 ? 
            annualDepreciation : (annualDepreciation * monthsInUse[2023] / 12);
        results[2024] = annualDepreciation * monthsInUse[2024] / 12;
        results[2025] = annualDepreciation * monthsInUse[2025] / 12;
        
        return results;
    }
    
    calculateReducingBalance(purchaseDate, yearEndMonth, yearEndDay, fullYearPolicy) {
        const results = { 2023: 0, 2024: 0, 2025: 0 };
        let netBookValue = this.equipmentCost;
        
        // Calculate months in use for each year
        const monthsInUse = this.calculateMonthsInUse(purchaseDate, yearEndMonth, yearEndDay, fullYearPolicy);
        
        // 2023 calculation
        if (fullYearPolicy && purchaseDate.getFullYear() === 2023) {
            results[2023] = netBookValue * this.depreciationRate;
        } else {
            results[2023] = netBookValue * this.depreciationRate * monthsInUse[2023] / 12;
        }
        netBookValue -= results[2023];
        
        // 2024 calculation
        results[2024] = netBookValue * this.depreciationRate * monthsInUse[2024] / 12;
        netBookValue -= results[2024];
        
        // 2025 calculation
        results[2025] = netBookValue * this.depreciationRate * monthsInUse[2025] / 12;
        
        return results;
    }
    
    calculateMonthsInUse(purchaseDate, yearEndMonth, yearEndDay, fullYearPolicy) {
        const monthsInUse = { 2023: 0, 2024: 0, 2025: 0 };
        
        // Create year-end dates for each year
        const yearEnd2023 = new Date(2023, parseInt(yearEndMonth) - 1, parseInt(yearEndDay));
        const yearEnd2024 = new Date(2024, parseInt(yearEndMonth) - 1, parseInt(yearEndDay));
        const yearEnd2025 = new Date(2025, parseInt(yearEndMonth) - 1, parseInt(yearEndDay));
        
        // Adjust year-end dates if they fall before the current year
        if (yearEnd2023 < new Date(2023, 0, 1)) {
            yearEnd2023.setFullYear(2024);
        }
        if (yearEnd2024 < new Date(2024, 0, 1)) {
            yearEnd2024.setFullYear(2025);
        }
        if (yearEnd2025 < new Date(2025, 0, 1)) {
            yearEnd2025.setFullYear(2026);
        }
        
        // Calculate months for 2023
        if (purchaseDate <= yearEnd2023) {
            if (fullYearPolicy) {
                monthsInUse[2023] = 12;
            } else {
                const startDate = purchaseDate;
                const endDate = yearEnd2023;
                monthsInUse[2023] = this.getMonthsDifference(startDate, endDate);
            }
        }
        
        // Calculate months for 2024
        const start2024 = new Date(Math.max(purchaseDate.getTime(), yearEnd2023.getTime() + 86400000)); // Day after 2023 year-end
        if (start2024 <= yearEnd2024) {
            monthsInUse[2024] = this.getMonthsDifference(start2024, yearEnd2024);
        }
        
        // Calculate months for 2025
        const start2025 = new Date(Math.max(purchaseDate.getTime(), yearEnd2024.getTime() + 86400000)); // Day after 2024 year-end
        if (start2025 <= yearEnd2025) {
            monthsInUse[2025] = this.getMonthsDifference(start2025, yearEnd2025);
        }
        
        return monthsInUse;
    }
    
    getMonthsDifference(startDate, endDate) {
        // Calculate the number of months between two dates
        const yearDiff = endDate.getFullYear() - startDate.getFullYear();
        const monthDiff = endDate.getMonth() - startDate.getMonth();
        const dayDiff = endDate.getDate() - startDate.getDate();
        
        let totalMonths = yearDiff * 12 + monthDiff;
        
        // Add partial month if end day is greater than or equal to start day
        if (dayDiff >= 0) {
            totalMonths += 1;
        }
        
        return Math.max(0, Math.min(12, totalMonths));
    }
    
    updateResults(straightLineResults, reducingBalanceResults) {
        // Update straight-line results with animation
        Object.keys(straightLineResults).forEach(year => {
            const element = this.resultElements[`sl${year}`];
            const value = straightLineResults[year];
            this.animateValueChange(element, value);
        });
        
        // Update reducing-balance results with animation
        Object.keys(reducingBalanceResults).forEach(year => {
            const element = this.resultElements[`rb${year}`];
            const value = reducingBalanceResults[year];
            this.animateValueChange(element, value);
        });
    }
    
    animateValueChange(element, value) {
        // Add animation class for visual feedback
        element.classList.add('updated');
        
        // Format and update the value
        element.textContent = `$${value.toFixed(0)}`;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('updated');
        }, 600);
    }
    
    resetForm() {
        // Reset all form controls to default values
        this.purchaseDateSelect.value = '2023-01-01';
        this.yearEndSelect.value = '12-31';
        this.fullYearCheckbox.checked = false;
        
        // Recalculate with default values
        this.calculateDepreciation();
        
        // Add visual feedback for reset action
        this.resetButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.resetButton.style.transform = 'scale(1)';
        }, 150);
    }
}

// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new DepreciationCalculator();
});

// Add keyboard navigation support for accessibility
document.addEventListener('keydown', (event) => {
    // Allow Enter key to trigger reset button
    if (event.key === 'Enter' && event.target.id === 'resetBtn') {
        event.target.click();
    }
    
    // Allow Space key to toggle checkbox
    if (event.key === ' ' && event.target.type === 'checkbox') {
        event.preventDefault();
        event.target.checked = !event.target.checked;
        event.target.dispatchEvent(new Event('change'));
    }
});