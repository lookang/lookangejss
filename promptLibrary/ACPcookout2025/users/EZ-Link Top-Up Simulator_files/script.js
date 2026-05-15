// EZ-Link Top-Up Simulator JavaScript
// This script handles all interactive functionality for the kiosk simulation

class EZLinkSimulator {
    constructor() {
        // Initialize state variables
        this.currentStep = 1;
        this.totalSteps = 6;
        this.selectedPaymentMethod = null;
        this.selectedAmount = null;
        this.currentBalance = 8.50;
        this.insertedCash = 0;
        this.pinEntered = '';
        this.transactionId = '';
        
        // Initialize the simulator
        this.init();
    }
    
    init() {
        console.log('Initializing EZ-Link Top-Up Simulator...');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Set up drag and drop functionality
        this.setupDragAndDrop();
        
        // Initialize audio feedback
        this.setupAudio();
        
        // Show welcome screen
        this.showScreen('welcomeScreen');
        
        console.log('Simulator initialized successfully');
    }
    
    setupEventListeners() {
        // Welcome screen - touch to start
        const welcomeScreen = document.getElementById('welcomeScreen');
        welcomeScreen.addEventListener('click', () => {
            this.playSound('click');
            this.nextStep('paymentMethodScreen');
        });
        
        // Payment method selection
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                this.selectedPaymentMethod = e.currentTarget.dataset.method;
                this.nextStep('amountScreen');
            });
        });
        
        // Amount selection
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                this.selectedAmount = parseInt(e.currentTarget.dataset.amount);
                this.nextStep('paymentScreen');
            });
        });
        
        // PIN pad functionality
        document.querySelectorAll('.key-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handlePinInput(e.currentTarget.dataset.key);
            });
        });
        
        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });
        
        // Modal close
        document.getElementById('closeHelp').addEventListener('click', () => {
            this.hideHelp();
        });
        
        // Receipt and restart buttons
        document.getElementById('receiptBtn').addEventListener('click', () => {
            this.printReceipt();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restart();
        });
        
        // Error handling buttons
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.retry();
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    setupDragAndDrop() {
        // Make wallet items draggable
        document.querySelectorAll('.note, .card').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: item.classList.contains('note') ? 'cash' : 'card',
                    value: item.dataset.value || item.className,
                    element: item.outerHTML
                }));
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
            });
        });
        
        // Set up drop zones
        this.setupDropZones();
    }
    
    setupDropZones() {
        // Cash acceptor drop zone
        const cashSlot = document.getElementById('cashSlot');
        this.setupDropZone(cashSlot, (data) => {
            if (data.type === 'cash') {
                this.handleCashInsert(parseInt(data.value));
            } else {
                this.showError('Please insert cash notes only');
            }
        });
        
        // Card slot drop zone
        const cardSlot = document.getElementById('cardSlot');
        this.setupDropZone(cardSlot, (data) => {
            if (data.type === 'card' && (data.value.includes('nets') || data.value.includes('credit'))) {
                this.handleCardInsert();
            } else {
                this.showError('Please insert NETS or Credit card only');
            }
        });
        
        // EZ-Link card reader drop zone
        const cardReader = document.getElementById('cardReader');
        this.setupDropZone(cardReader, (data) => {
            if (data.type === 'card' && data.value.includes('ezlink')) {
                this.handleEZLinkCardPlace();
            } else {
                this.showError('Please place your EZ-Link card on the reader');
            }
        });
    }
    
    setupDropZone(element, callback) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.classList.add('drag-over');
        });
        
        element.addEventListener('dragleave', () => {
            element.classList.remove('drag-over');
        });
        
        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
            
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                callback(data);
            } catch (error) {
                console.error('Error parsing drop data:', error);
                this.showError('Invalid item dropped');
            }
        });
    }
    
    setupAudio() {
        // Initialize audio player for feedback sounds
        this.audioPlayer = document.getElementById('audioPlayer');
        
        // Create audio feedback for different actions
        this.sounds = {
            click: this.createBeep(800, 100),
            success: this.createBeep(1000, 200),
            error: this.createBeep(400, 300),
            cash: this.createBeep(600, 150)
        };
    }
    
    createBeep(frequency, duration) {
        // Create simple beep sound using Web Audio API
        return () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration / 1000);
            } catch (error) {
                console.log('Audio not supported');
            }
        };
    }
    
    playSound(soundType) {
        if (this.sounds[soundType]) {
            this.sounds[soundType]();
        }
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen-content').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Show selected screen
        document.getElementById(screenId).classList.remove('hidden');
        
        // Update screen-specific UI
        this.updateScreenUI(screenId);
    }
    
    updateScreenUI(screenId) {
        switch (screenId) {
            case 'paymentScreen':
                this.setupPaymentScreen();
                break;
            case 'cardPlacementScreen':
                // No specific setup needed
                break;
            case 'completionScreen':
                this.updateCompletionScreen();
                break;
        }
    }
    
    setupPaymentScreen() {
        const paymentTitle = document.getElementById('paymentTitle');
        const cashSlot = document.getElementById('cashSlot');
        const cardSlot = document.getElementById('cardSlot');
        const pinPad = document.getElementById('pinPad');
        
        // Hide all payment methods initially
        cashSlot.classList.add('hidden');
        cardSlot.classList.add('hidden');
        pinPad.classList.add('hidden');
        
        // Show appropriate payment method
        switch (this.selectedPaymentMethod) {
            case 'cash':
                paymentTitle.textContent = `Insert $${this.selectedAmount} in Cash`;
                cashSlot.classList.remove('hidden');
                break;
            case 'nets':
                paymentTitle.textContent = 'Insert NETS Card and Enter PIN';
                cardSlot.classList.remove('hidden');
                break;
            case 'credit':
                paymentTitle.textContent = 'Insert Credit Card and Enter PIN';
                cardSlot.classList.remove('hidden');
                break;
        }
    }
    
    handleCashInsert(amount) {
        this.playSound('cash');
        this.insertedCash += amount;
        
        const paymentStatus = document.getElementById('paymentStatus');
        
        if (this.insertedCash >= this.selectedAmount) {
            const change = this.insertedCash - this.selectedAmount;
            paymentStatus.innerHTML = `
                <div class="payment-status success">
                    Payment received: $${this.insertedCash}<br>
                    ${change > 0 ? `Change: $${change}` : 'Exact amount received'}
                </div>
            `;
            
            setTimeout(() => {
                this.nextStep('cardPlacementScreen');
            }, 1500);
        } else {
            const remaining = this.selectedAmount - this.insertedCash;
            paymentStatus.innerHTML = `
                <div class="payment-status">
                    Received: $${this.insertedCash}<br>
                    Remaining: $${remaining}
                </div>
            `;
        }
    }
    
    handleCardInsert() {
        this.playSound('click');
        const pinPad = document.getElementById('pinPad');
        pinPad.classList.remove('hidden');
        
        const paymentStatus = document.getElementById('paymentStatus');
        paymentStatus.innerHTML = `
            <div class="payment-status">
                Card detected. Please enter your PIN.
            </div>
        `;
    }
    
    handlePinInput(key) {
        this.playSound('click');
        const pinInput = document.getElementById('pinInput');
        
        switch (key) {
            case 'clear':
                this.pinEntered = '';
                pinInput.value = '';
                break;
            case 'confirm':
                if (this.pinEntered.length === 4) {
                    this.processCardPayment();
                } else {
                    this.showError('Please enter a 4-digit PIN');
                }
                break;
            default:
                if (this.pinEntered.length < 4) {
                    this.pinEntered += key;
                    pinInput.value = '*'.repeat(this.pinEntered.length);
                }
                break;
        }
    }
    
    processCardPayment() {
        const paymentStatus = document.getElementById('paymentStatus');
        paymentStatus.innerHTML = `
            <div class="payment-status">
                Processing payment...
            </div>
        `;
        
        // Simulate processing delay
        setTimeout(() => {
            // Simulate random success/failure for educational purposes
            const success = Math.random() > 0.2; // 80% success rate
            
            if (success) {
                paymentStatus.innerHTML = `
                    <div class="payment-status success">
                        Payment approved: $${this.selectedAmount}
                    </div>
                `;
                setTimeout(() => {
                    this.nextStep('cardPlacementScreen');
                }, 1500);
            } else {
                this.showError('Payment declined. Please try again or use a different card.');
            }
        }, 2000);
    }
    
    handleEZLinkCardPlace() {
        this.playSound('success');
        
        // Simulate card reading
        const cardReader = document.getElementById('cardReader');
        cardReader.innerHTML = `
            <p>Reading card...</p>
            <div class="reader-indicator">📖 Processing...</div>
        `;
        
        setTimeout(() => {
            this.completeTransaction();
        }, 2000);
    }
    
    completeTransaction() {
        // Generate transaction ID
        this.transactionId = 'TXN' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Update balance
        this.currentBalance += this.selectedAmount;
        
        // Show completion screen
        this.nextStep('completionScreen');
        this.playSound('success');
    }
    
    updateCompletionScreen() {
        document.getElementById('topupAmount').textContent = `$${this.selectedAmount}`;
        document.getElementById('newBalance').textContent = `$${this.currentBalance.toFixed(2)}`;
        document.getElementById('transactionId').textContent = this.transactionId;
        
        // Update EZ-Link card balance in wallet
        const ezlinkCard = document.querySelector('.ezlink-card .balance');
        if (ezlinkCard) {
            ezlinkCard.textContent = `$${this.currentBalance.toFixed(2)}`;
        }
    }
    
    printReceipt() {
        this.playSound('click');
        
        // Create receipt content
        const receiptContent = `
            EZ-Link Top-Up Receipt
            =====================
            Date: ${new Date().toLocaleDateString()}
            Time: ${new Date().toLocaleTimeString()}
            
            Transaction ID: ${this.transactionId}
            Payment Method: ${this.selectedPaymentMethod.toUpperCase()}
            Top-up Amount: $${this.selectedAmount}
            Previous Balance: $${(this.currentBalance - this.selectedAmount).toFixed(2)}
            New Balance: $${this.currentBalance.toFixed(2)}
            
            Thank you for using EZ-Link!
        `;
        
        // Show receipt in a simple alert (in real implementation, this would print)
        alert(receiptContent);
    }
    
    restart() {
        this.playSound('click');
        
        // Reset all state variables
        this.currentStep = 1;
        this.selectedPaymentMethod = null;
        this.selectedAmount = null;
        this.insertedCash = 0;
        this.pinEntered = '';
        this.transactionId = '';
        
        // Reset UI
        this.updateProgress();
        this.showScreen('welcomeScreen');
        
        // Clear payment status
        const paymentStatus = document.getElementById('paymentStatus');
        paymentStatus.innerHTML = '';
        
        // Reset PIN input
        const pinInput = document.getElementById('pinInput');
        pinInput.value = '';
        
        console.log('Simulator restarted');
    }
    
    retry() {
        this.playSound('click');
        
        // Go back to payment screen
        this.currentStep = 4;
        this.updateProgress();
        this.showScreen('paymentScreen');
        
        // Reset payment-specific state
        this.insertedCash = 0;
        this.pinEntered = '';
        
        // Clear payment status
        const paymentStatus = document.getElementById('paymentStatus');
        paymentStatus.innerHTML = '';
        
        // Reset PIN input
        const pinInput = document.getElementById('pinInput');
        pinInput.value = '';
    }
    
    nextStep(screenId) {
        this.currentStep++;
        this.updateProgress();
        this.showScreen(screenId);
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const percentage = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
        
        const stepTexts = [
            'Touch screen to begin',
            'Select payment method',
            'Choose top-up amount',
            'Complete payment',
            'Place EZ-Link card',
            'Transaction complete'
        ];
        
        progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}: ${stepTexts[this.currentStep - 1]}`;
    }
    
    showError(message) {
        this.playSound('error');
        
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        
        this.showScreen('errorScreen');
    }
    
    showHelp() {
        document.getElementById('helpModal').classList.remove('hidden');
    }
    
    hideHelp() {
        document.getElementById('helpModal').classList.add('hidden');
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing EZ-Link simulator...');
    
    // Create global simulator instance
    window.ezlinkSimulator = new EZLinkSimulator();
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Escape':
                if (!document.getElementById('helpModal').classList.contains('hidden')) {
                    window.ezlinkSimulator.hideHelp();
                }
                break;
            case 'F1':
                e.preventDefault();
                window.ezlinkSimulator.showHelp();
                break;
            case 'r':
            case 'R':
                if (e.ctrlKey) {
                    e.preventDefault();
                    window.ezlinkSimulator.restart();
                }
                break;
        }
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Adjust layout if needed
        const container = document.getElementById('mainContainer');
        if (window.innerHeight > 500) {
            container.style.height = '90vh';
        } else {
            container.style.height = '450px';
        }
    });
    
    // Prevent context menu on drag items for better UX
    document.querySelectorAll('.note, .card').forEach(item => {
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
    
    console.log('EZ-Link Top-Up Simulator fully loaded and ready!');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EZLinkSimulator;
}