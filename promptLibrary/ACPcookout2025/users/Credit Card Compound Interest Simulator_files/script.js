// Credit Card Compound Interest Simulator
// This JavaScript handles all the interactive functionality for the simulation

class CreditCardSimulator {
    constructor() {
        // Initialize simulation state
        this.currentBalance = 0;
        this.creditLimit = 3000;
        this.interestRate = 0.26; // 26% annual rate
        this.monthlyInterestRate = this.interestRate / 12;
        this.minPaymentRate = 0.03; // 3% minimum payment
        this.balanceHistory = [];
        this.monthCounter = 0;
        this.totalInterestPaid = 0;
        this.totalAmountRepaid = 0;
        
        // Initialize the simulation
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.initializeChart();
    }

    // Get references to DOM elements
    initializeElements() {
        this.elements = {
            creditLimit: document.getElementById('creditLimit'),
            currentBalance: document.getElementById('currentBalance'),
            minPayment: document.getElementById('minPayment'),
            paymentSlider: document.getElementById('paymentSlider'),
            paymentAmount: document.getElementById('paymentAmount'),
            customAmount: document.getElementById('customAmount'),
            balanceChart: document.getElementById('balanceChart'),
            minPaymentCard: document.getElementById('minPaymentCard'),
            fullPaymentCard: document.getElementById('fullPaymentCard'),
            minTotal: document.getElementById('minTotal'),
            minTime: document.getElementById('minTime'),
            fullTotal: document.getElementById('fullTotal'),
            fullTime: document.getElementById('fullTime'),
            summarySection: document.getElementById('summarySection'),
            totalRepaid: document.getElementById('totalRepaid'),
            totalInterest: document.getElementById('totalInterest'),
            timeTolear: document.getElementById('timeTolear'),
            projectionPeriod: document.getElementById('projectionPeriod'),
            tooltip: document.getElementById('tooltip'),
            modal: document.getElementById('modal'),
            modalBody: document.getElementById('modalBody')
        };
        
        this.chartContext = this.elements.balanceChart.getContext('2d');
    }

    // Bind event listeners to interactive elements
    bindEvents() {
        // Credit limit change
        this.elements.creditLimit.addEventListener('change', (e) => {
            this.creditLimit = parseInt(e.target.value);
            this.updatePaymentSlider();
        });

        // Purchase buttons
        document.querySelectorAll('.purchase-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                const item = e.target.dataset.item;
                this.makePurchase(amount, item);
            });
        });

        // Custom purchase
        document.getElementById('customPurchaseBtn').addEventListener('click', () => {
            const amount = parseInt(this.elements.customAmount.value);
            if (amount && amount > 0) {
                this.makePurchase(amount, 'Custom Item');
                this.elements.customAmount.value = '';
            }
        });

        // Payment slider
        this.elements.paymentSlider.addEventListener('input', (e) => {
            this.elements.paymentAmount.textContent = e.target.value;
            this.updatePaymentOptions();
        });

        // Payment option buttons
        document.querySelectorAll('.payment-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.setPaymentOption(type);
                this.updatePaymentOptions(type);
            });
        });

        // Make payment button
        document.getElementById('makePaymentBtn').addEventListener('click', () => {
            const paymentAmount = parseInt(this.elements.paymentSlider.value);
            this.makePayment(paymentAmount);
        });

        // What-if analysis
        document.getElementById('whatIfBtn').addEventListener('click', () => {
            this.runWhatIfAnalysis();
        });

        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetSimulation();
        });

        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHints();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.elements.modal.style.display = 'none';
        });

        // Tooltip functionality
        this.initializeTooltips();
    }

    // Initialize tooltip system for educational content
    initializeTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target.title, e);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    // Show educational tooltip
    showTooltip(text, event) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.style.left = event.pageX + 10 + 'px';
        this.elements.tooltip.style.top = event.pageY - 10 + 'px';
        this.elements.tooltip.classList.add('show');
    }

    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }

    // Make a purchase on the credit card
    makePurchase(amount, item) {
        if (this.currentBalance + amount > this.creditLimit) {
            this.showModal('Credit Limit Exceeded', 
                `You cannot purchase ${item} for $${amount} as it would exceed your credit limit of $${this.creditLimit}.`);
            return;
        }

        this.currentBalance += amount;
        this.updateDisplay();
        this.updatePaymentSlider();
        this.updateChart();
        this.calculateComparison();
        
        // Show purchase confirmation with educational content
        this.showModal('Purchase Made', 
            `You purchased ${item} for $${amount}. Your new balance is $${this.currentBalance.toFixed(2)}. 
            Remember: This amount will start accruing interest at 26% annually if not paid in full!`);
    }

    // Process a payment
    makePayment(amount) {
        if (amount <= 0) {
            this.showModal('Invalid Payment', 'Please select a payment amount greater than $0.');
            return;
        }

        if (amount > this.currentBalance) {
            amount = this.currentBalance;
        }

        // Calculate interest on remaining balance
        const remainingBalance = this.currentBalance - amount;
        const interestCharged = remainingBalance * this.monthlyInterestRate;
        
        this.currentBalance = remainingBalance + interestCharged;
        this.totalInterestPaid += interestCharged;
        this.totalAmountRepaid += amount;
        this.monthCounter++;

        // Record balance for chart
        this.balanceHistory.push({
            month: this.monthCounter,
            balance: this.currentBalance,
            payment: amount,
            interest: interestCharged
        });

        this.updateDisplay();
        this.updatePaymentSlider();
        this.updateChart();
        this.calculateComparison();
        this.updateSummary();

        // Show payment result with educational insight
        let message = `Payment of $${amount.toFixed(2)} processed. `;
        if (interestCharged > 0) {
            message += `Interest charged: $${interestCharged.toFixed(2)}. New balance: $${this.currentBalance.toFixed(2)}.`;
        } else {
            message += `Balance cleared! No interest charged.`;
        }
        
        this.showModal('Payment Processed', message);
    }

    // Set payment option (minimum, half, full)
    setPaymentOption(type) {
        let amount = 0;
        
        switch(type) {
            case 'minimum':
                amount = Math.max(this.currentBalance * this.minPaymentRate, 10);
                break;
            case 'half':
                amount = this.currentBalance / 2;
                break;
            case 'full':
                amount = this.currentBalance;
                break;
        }
        
        this.elements.paymentSlider.value = Math.round(amount);
        this.elements.paymentAmount.textContent = Math.round(amount);
    }

    // Update payment option button states
    updatePaymentOptions(activeType = null) {
        document.querySelectorAll('.payment-option-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (activeType) {
            document.querySelector(`[data-type="${activeType}"]`).classList.add('active');
        }
    }

    // Update payment slider range based on current balance
    updatePaymentSlider() {
        this.elements.paymentSlider.max = Math.max(this.currentBalance, 100);
        if (parseInt(this.elements.paymentSlider.value) > this.currentBalance) {
            this.elements.paymentSlider.value = this.currentBalance;
            this.elements.paymentAmount.textContent = Math.round(this.currentBalance);
        }
    }

    // Update all display elements
    updateDisplay() {
        this.elements.currentBalance.textContent = `$${this.currentBalance.toFixed(2)}`;
        this.elements.minPayment.textContent = `$${Math.max(this.currentBalance * this.minPaymentRate, 10).toFixed(2)}`;
    }

    // Initialize and update the balance chart
    initializeChart() {
        this.updateChart();
    }

    updateChart() {
        const ctx = this.chartContext;
        ctx.clearRect(0, 0, this.elements.balanceChart.width, this.elements.balanceChart.height);
        
        if (this.balanceHistory.length === 0) {
            ctx.fillStyle = '#666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Make purchases and payments to see balance over time', 
                this.elements.balanceChart.width / 2, this.elements.balanceChart.height / 2);
            return;
        }

        // Draw chart background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, this.elements.balanceChart.width, this.elements.balanceChart.height);

        // Calculate chart dimensions
        const padding = 40;
        const chartWidth = this.elements.balanceChart.width - 2 * padding;
        const chartHeight = this.elements.balanceChart.height - 2 * padding;
        
        const maxBalance = Math.max(...this.balanceHistory.map(h => h.balance), this.currentBalance);
        const maxMonth = Math.max(this.balanceHistory.length, 1);

        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.stroke();

        // Draw balance line
        if (this.balanceHistory.length > 1) {
            ctx.strokeStyle = '#dc3545';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            this.balanceHistory.forEach((point, index) => {
                const x = padding + (index / maxMonth) * chartWidth;
                const y = padding + chartHeight - (point.balance / maxBalance) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        }

        // Add current balance point
        if (this.currentBalance > 0) {
            const x = padding + (this.monthCounter / maxMonth) * chartWidth;
            const y = padding + chartHeight - (this.currentBalance / maxBalance) * chartHeight;
            
            ctx.fillStyle = '#dc3545';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Add labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Months', padding + chartWidth / 2, this.elements.balanceChart.height - 5);
        
        ctx.save();
        ctx.translate(15, padding + chartHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Balance ($)', 0, 0);
        ctx.restore();
    }

    // Calculate comparison between minimum and full payment scenarios
    calculateComparison() {
        if (this.currentBalance === 0) {
            this.elements.minTotal.textContent = '$0';
            this.elements.minTime.textContent = '0 months';
            this.elements.fullTotal.textContent = '$0';
            this.elements.fullTime.textContent = '0 months';
            return;
        }

        // Calculate minimum payment scenario
        let minBalance = this.currentBalance;
        let minMonths = 0;
        let minTotalPaid = 0;
        
        while (minBalance > 0.01 && minMonths < 120) { // Cap at 10 years
            const payment = Math.max(minBalance * this.minPaymentRate, 10);
            const interest = (minBalance - payment) * this.monthlyInterestRate;
            minBalance = minBalance - payment + interest;
            minTotalPaid += payment;
            minMonths++;
            
            if (minBalance <= payment) {
                minTotalPaid += minBalance;
                minBalance = 0;
                break;
            }
        }

        // Full payment scenario
        const fullTotalPaid = this.currentBalance;
        const fullMonths = 1;

        this.elements.minTotal.textContent = `$${minTotalPaid.toFixed(0)}`;
        this.elements.minTime.textContent = `${minMonths} months`;
        this.elements.fullTotal.textContent = `$${fullTotalPaid.toFixed(0)}`;
        this.elements.fullTime.textContent = `${fullMonths} month`;

        // Highlight the more expensive option
        if (minTotalPaid > fullTotalPaid) {
            this.elements.minPaymentCard.classList.add('highlight');
            this.elements.fullPaymentCard.classList.remove('highlight');
        }
    }

    // Run what-if analysis for different time periods
    runWhatIfAnalysis() {
        const months = parseInt(this.elements.projectionPeriod.value);
        
        if (this.currentBalance === 0) {
            this.showModal('What-If Analysis', 'Make a purchase first to see projections.');
            return;
        }

        let projectedBalance = this.currentBalance;
        let projectedInterest = 0;
        let projectedPayments = 0;

        for (let i = 0; i < months; i++) {
            const minPayment = Math.max(projectedBalance * this.minPaymentRate, 10);
            const interest = (projectedBalance - minPayment) * this.monthlyInterestRate;
            projectedBalance = projectedBalance - minPayment + interest;
            projectedInterest += interest;
            projectedPayments += minPayment;
            
            if (projectedBalance <= 0) break;
        }

        const message = `
            <h3>What-If Analysis (${months} months)</h3>
            <p><strong>If you pay only the minimum each month:</strong></p>
            <ul>
                <li>Projected balance after ${months} months: $${projectedBalance.toFixed(2)}</li>
                <li>Total payments made: $${projectedPayments.toFixed(2)}</li>
                <li>Total interest paid: $${projectedInterest.toFixed(2)}</li>
            </ul>
            <p><strong>Key Insight:</strong> Notice how compound interest makes your debt grow even while making payments!</p>
        `;
        
        this.showModal('What-If Analysis Results', message);
    }

    // Update summary section
    updateSummary() {
        if (this.monthCounter > 0) {
            this.elements.summarySection.style.display = 'block';
            this.elements.totalRepaid.textContent = `$${this.totalAmountRepaid.toFixed(2)}`;
            this.elements.totalInterest.textContent = `$${this.totalInterestPaid.toFixed(2)}`;
            this.elements.timeTolear.textContent = `${this.monthCounter} months`;
        }
    }

    // Reset the entire simulation
    resetSimulation() {
        this.currentBalance = 0;
        this.monthCounter = 0;
        this.totalInterestPaid = 0;
        this.totalAmountRepaid = 0;
        this.balanceHistory = [];
        
        this.updateDisplay();
        this.updatePaymentSlider();
        this.updateChart();
        this.calculateComparison();
        this.elements.summarySection.style.display = 'none';
        this.elements.paymentSlider.value = 0;
        this.elements.paymentAmount.textContent = '0';
        this.updatePaymentOptions();
        
        this.showModal('Simulation Reset', 'All data has been cleared. Start by making a purchase!');
    }

    // Show hints modal with financial tips
    showHints() {
        const hints = `
            <h3>💡 Credit Card Management Tips</h3>
            <div style="text-align: left;">
                <h4>Key Terms:</h4>
                <ul>
                    <li><strong>Principal:</strong> The original amount you borrowed</li>
                    <li><strong>Interest Rate:</strong> The cost of borrowing money (26% annually)</li>
                    <li><strong>Minimum Payment:</strong> The smallest amount you must pay (3% of balance)</li>
                    <li><strong>Compound Interest:</strong> Interest charged on both principal and accumulated interest</li>
                </ul>
                
                <h4>Smart Strategies:</h4>
                <ul>
                    <li>🎯 Always pay the full balance to avoid interest</li>
                    <li>📅 Pay more than the minimum to reduce total cost</li>
                    <li>⚡ Pay early in the month to minimize interest</li>
                    <li>🛡️ Keep balances low relative to credit limit</li>
                    <li>📊 Track spending to avoid overspending</li>
                </ul>
                
                <h4>Warning Signs:</h4>
                <ul>
                    <li>🚨 Only making minimum payments</li>
                    <li>📈 Balance growing despite payments</li>
                    <li>💸 Using credit for daily expenses</li>
                    <li>🔄 Making cash advances</li>
                </ul>
            </div>
        `;
        
        this.showModal('Financial Literacy Tips', hints);
    }

    // Show modal with custom content
    showModal(title, content) {
        this.elements.modalBody.innerHTML = `<h2>${title}</h2><div>${content}</div>`;
        this.elements.modal.style.display = 'block';
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CreditCardSimulator();
    
    // Add some visual feedback for interactions
    document.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            e.target.classList.add('pulse');
            setTimeout(() => e.target.classList.remove('pulse'), 600);
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('modal').style.display = 'none';
        }
    });
});