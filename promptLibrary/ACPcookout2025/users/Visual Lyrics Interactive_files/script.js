// Visual Lyrics Interactive JavaScript
// Handles card flipping, audio playback, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Get all interactive elements
    const imageCards = document.querySelectorAll('.image-card');
    const playButton = document.getElementById('playButton');
    const resetButton = document.getElementById('resetButton');
    const songAudio = document.getElementById('songAudio');
    
    // Track which cards are currently flipped
    let flippedCards = new Set();
    
    // Initialize the interactive
    initializeInteractive();
    
    function initializeInteractive() {
        // Add click listeners to all image cards
        imageCards.forEach((card, index) => {
            card.addEventListener('click', () => handleCardClick(card, index));
            
            // Add touch support for mobile devices
            card.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent double-tap zoom
                handleCardClick(card, index);
            });
            
            // Add keyboard support for accessibility
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card, index);
                }
            });
        });
        
        // Add play button functionality
        playButton.addEventListener('click', handlePlayButtonClick);
        playButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handlePlayButtonClick();
        });
        
        // Add reset button functionality
        resetButton.addEventListener('click', handleResetButtonClick);
        resetButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleResetButtonClick();
        });
        
        // Create audio context for song playback (simulated)
        setupAudioPlayback();
        
        console.log('Visual Lyrics Interactive initialized successfully');
    }
    
    function handleCardClick(card, index) {
        // Add visual feedback for the click
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Toggle the flipped state
        const isFlipped = card.classList.contains('flipped');
        
        if (isFlipped) {
            // Flip back to image
            card.classList.remove('flipped');
            flippedCards.delete(index);
            console.log(`Card ${index} flipped back to image`);
        } else {
            // Flip to show word
            card.classList.add('flipped');
            flippedCards.add(index);
            console.log(`Card ${index} flipped to show word: ${card.dataset.word}`);
        }
        
        // Add a subtle sound effect (visual feedback)
        createClickFeedback(card);
        
        // Check if all cards are revealed for encouragement
        if (flippedCards.size === imageCards.length) {
            showEncouragement();
        }
    }
    
    function handlePlayButtonClick() {
        // Visual feedback for button press
        playButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playButton.style.transform = '';
        }, 150);
        
        // Since we can't include actual audio files, we'll simulate playback
        simulateAudioPlayback();
        
        console.log('Play button clicked - simulating song playback');
    }
    
    function handleResetButtonClick() {
        // Visual feedback for button press
        resetButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resetButton.style.transform = '';
        }, 150);
        
        // Reset all cards to show images
        imageCards.forEach((card, index) => {
            if (card.classList.contains('flipped')) {
                // Add a small delay for each card to create a wave effect
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, index * 100);
            }
        });
        
        // Clear the flipped cards set
        flippedCards.clear();
        
        console.log('All cards reset to show images');
        
        // Show reset confirmation
        showResetFeedback();
    }
    
    function setupAudioPlayback() {
        // In a real implementation, you would load the actual audio file
        // For this demo, we'll create a visual simulation of audio playback
        
        // Create a simple tone generator for demonstration
        // Note: This is a simplified version - in production you'd use actual audio files
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContextClass = AudioContext || webkitAudioContext;
            window.audioContext = new AudioContextClass();
        }
    }
    
    function simulateAudioPlayback() {
        // Change button text to show playing state
        const buttonText = playButton.querySelector('.button-text');
        const originalText = buttonText.textContent;
        
        buttonText.textContent = 'Playing...';
        playButton.disabled = true;
        playButton.style.opacity = '0.7';
        
        // Create visual indication of playback
        let playbackIndicator = document.createElement('div');
        playbackIndicator.className = 'playback-indicator';
        playbackIndicator.innerHTML = '🎵 Playing "You Are My Sunshine" 🎵';
        playbackIndicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 3s ease-in-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(playbackIndicator);
        
        // Simulate song duration (30 seconds for demo)
        setTimeout(() => {
            buttonText.textContent = originalText;
            playButton.disabled = false;
            playButton.style.opacity = '1';
            
            if (playbackIndicator.parentNode) {
                playbackIndicator.remove();
            }
        }, 3000); // 3 seconds for demo, would be longer for full song
        
        // Add CSS animation for the indicator
        if (!document.querySelector('#playback-animation-style')) {
            const style = document.createElement('style');
            style.id = 'playback-animation-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function createClickFeedback(card) {
        // Create a visual ripple effect for card clicks
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
        
        // Add ripple animation if not already present
        if (!document.querySelector('#ripple-animation-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showEncouragement() {
        // Show encouraging message when all cards are revealed
        const encouragement = document.createElement('div');
        encouragement.innerHTML = '🌟 Great job! You found all the words! 🌟';
        encouragement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #2C3E50;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 1000;
            animation: encouragementBounce 2s ease-in-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(encouragement);
        
        setTimeout(() => {
            if (encouragement.parentNode) {
                encouragement.remove();
            }
        }, 2000);
        
        // Add encouragement animation
        if (!document.querySelector('#encouragement-animation-style')) {
            const style = document.createElement('style');
            style.id = 'encouragement-animation-style';
            style.textContent = `
                @keyframes encouragementBounce {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
                    20% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.1); }
                    40% { transform: translateX(-50%) translateY(0) scale(1); }
                    80% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.9); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showResetFeedback() {
        // Show brief feedback for reset action
        const feedback = document.createElement('div');
        feedback.innerHTML = '🔄 Cards reset!';
        feedback.style.cssText = `
            position: fixed;
            bottom: 60px;
            right: 20px;
            background: rgba(255, 152, 0, 0.9);
            color: white;
            padding: 8px 15px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
            animation: slideInOut 1.5s ease-in-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 1500);
        
        // Add slide animation
        if (!document.querySelector('#slide-animation-style')) {
            const style = document.createElement('style');
            style.id = 'slide-animation-style';
            style.textContent = `
                @keyframes slideInOut {
                    0% { opacity: 0; transform: translateX(100px); }
                    20% { opacity: 1; transform: translateX(0); }
                    80% { opacity: 1; transform: translateX(0); }
                    100% { opacity: 0; transform: translateX(100px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Adjust layout if needed for different screen sizes
        console.log('Window resized, layout adjusted');
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Allow space bar to trigger focused elements
        if (e.key === ' ' && e.target.classList.contains('image-card')) {
            e.preventDefault();
        }
    });
    
    console.log('Visual Lyrics Interactive script loaded and ready');
});