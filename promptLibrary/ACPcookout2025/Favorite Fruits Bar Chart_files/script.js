// JavaScript for interactive bar chart functionality
// Implements discovery learning and immediate feedback principles

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all fruit bar elements for interaction
    const fruitBars = document.querySelectorAll('.fruit-bar');
    const mostPopularDiv = document.getElementById('mostPopular');
    const popularFruitSpan = document.getElementById('popularFruit');
    
    // Track which bars have been clicked for progress monitoring
    let clickedBars = new Set();
    let allBarsClicked = false;
    
    // Data structure to store fruit information
    const fruitData = {};
    
    // Initialize fruit data from HTML data attributes
    fruitBars.forEach(bar => {
        const fruit = bar.dataset.fruit;
        const votes = parseInt(bar.dataset.votes);
        fruitData[fruit] = votes;
    });
    
    // Find the most popular fruit for later reveal
    const mostPopularFruit = Object.keys(fruitData).reduce((a, b) => 
        fruitData[a] > fruitData[b] ? a : b
    );
    
    // Add click event listeners to each fruit bar
    fruitBars.forEach(bar => {
        bar.addEventListener('click', function() {
            handleBarClick(this);
        });
        
        // Add touch support for mobile devices
        bar.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent double-tap zoom
            handleBarClick(this);
        });
    });
    
    // Main click handler function - implements immediate feedback
    function handleBarClick(clickedBar) {
        const fruit = clickedBar.dataset.fruit;
        const votes = clickedBar.dataset.votes;
        
        // Add visual feedback - bar has been clicked
        clickedBar.classList.add('clicked');
        
        // Show the vote count with animation
        const voteDisplay = clickedBar.querySelector('.vote-display');
        voteDisplay.textContent = votes + ' votes';
        
        // Add to clicked bars set for progress tracking
        clickedBars.add(fruit);
        
        // Provide audio feedback (if supported by browser)
        playClickSound();
        
        // Add visual emphasis to the clicked bar
        addClickAnimation(clickedBar);
        
        // Check if all bars have been clicked
        if (clickedBars.size === fruitBars.length && !allBarsClicked) {
            setTimeout(() => {
                revealMostPopular();
            }, 500);
            allBarsClicked = true;
        }
        
        // Update progress indicator
        updateProgress();
    }
    
    // Reveal the most popular fruit - delayed gratification principle
    function revealMostPopular() {
        popularFruitSpan.textContent = capitalizeFirst(mostPopularFruit);
        mostPopularDiv.style.display = 'block';
        
        // Add celebration animation
        mostPopularDiv.style.animation = 'bounce 0.6s ease-in-out';
        
        // Highlight the winning bar
        const winningBar = document.querySelector(`[data-fruit="${mostPopularFruit}"]`);
        winningBar.style.animation = 'pulse 1s ease-in-out 3';
    }
    
    // Add click animation for immediate visual feedback
    function addClickAnimation(bar) {
        bar.style.animation = 'clickPulse 0.3s ease-in-out';
        setTimeout(() => {
            bar.style.animation = '';
        }, 300);
    }
    
    // Update progress indicator (visual feedback on completion)
    function updateProgress() {
        const progressPercent = (clickedBars.size / fruitBars.length) * 100;
        
        // Change instruction text based on progress
        const instructionText = document.querySelector('.instructions p');
        if (clickedBars.size === 0) {
            instructionText.textContent = '👆 Click on any bar to see the number of votes!';
        } else if (clickedBars.size < fruitBars.length) {
            instructionText.textContent = `Great! Click ${fruitBars.length - clickedBars.size} more bars to see all votes!`;
        } else {
            instructionText.textContent = '🎉 Excellent! You\'ve explored all the data!';
        }
    }
    
    // Play click sound for audio feedback (if supported)
    function playClickSound() {
        try {
            // Create a simple audio context for click feedback
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported or blocked - silently continue
        }
    }
    
    // Utility function to capitalize first letter
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltip behavior for header information
    const mainPanel = document.getElementById('mainPanel');
    const tooltip = document.getElementById('tooltip');
    
    // Show tooltip on hover (desktop) or touch (mobile)
    let tooltipTimeout;
    
    mainPanel.addEventListener('mouseenter', function() {
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        }, 500);
    });
    
    mainPanel.addEventListener('mouseleave', function() {
        clearTimeout(tooltipTimeout);
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });
    
    // Touch support for tooltip
    mainPanel.addEventListener('touchstart', function() {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }, 2000);
    });
    
    console.log('Interactive bar chart initialized successfully!');
    console.log('Fruit data:', fruitData);
    console.log('Most popular fruit:', mostPopularFruit);
});

// Additional accessibility features
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('fruit-bar')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Make bars focusable for keyboard accessibility
document.addEventListener('DOMContentLoaded', function() {
    const fruitBars = document.querySelectorAll('.fruit-bar');
    fruitBars.forEach(bar => {
        bar.setAttribute('tabindex', '0');
        bar.setAttribute('role', 'button');
        bar.setAttribute('aria-label', `Click to see votes for ${bar.dataset.fruit}`);
    });
});