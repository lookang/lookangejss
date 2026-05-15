// Global variables for application state
let currentScene = 0;
const totalScenes = 5;
let timerInterval = null;
let timeRemaining = 15 * 60; // 15 minutes in seconds
let isTimerRunning = false;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application with default states
 */
function initializeApp() {
    updateSceneDisplay();
    updateTimerDisplay();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add touch support for mobile devices
    addTouchSupport();
    
    console.log('口语互动活动已初始化');
}

/**
 * Handle keyboard navigation for accessibility
 */
function handleKeyboardNavigation(event) {
    switch(event.key) {
        case 'ArrowLeft':
            previousScene();
            break;
        case 'ArrowRight':
            nextScene();
            break;
        case ' ': // Spacebar
            event.preventDefault();
            if (isTimerRunning) {
                pauseTimer();
            } else {
                startTimer();
            }
            break;
    }
}

/**
 * Add touch support for better mobile interaction
 */
function addTouchSupport() {
    const storySection = document.querySelector('.story-section');
    let startX = 0;
    let startY = 0;
    
    storySection.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    storySection.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextScene(); // Swipe left - next scene
            } else {
                previousScene(); // Swipe right - previous scene
            }
        }
    });
}

/**
 * Navigate to the previous scene
 */
function previousScene() {
    if (currentScene > 0) {
        currentScene--;
        updateSceneDisplay();
        
        // Add haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

/**
 * Navigate to the next scene
 */
function nextScene() {
    if (currentScene < totalScenes - 1) {
        currentScene++;
        updateSceneDisplay();
        
        // Add haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

/**
 * Update the scene display and navigation controls
 */
function updateSceneDisplay() {
    // Hide all scenes
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));
    
    // Show current scene
    const currentSceneElement = document.getElementById(`scene${currentScene + 1}`);
    if (currentSceneElement) {
        currentSceneElement.classList.add('active');
    }
    
    // Update scene indicator
    const indicator = document.querySelector('.scene-indicator');
    if (indicator) {
        indicator.textContent = `${currentScene + 1}/${totalScenes}`;
    }
    
    // Update navigation button states
    const prevBtn = document.querySelector('.nav-btn:first-child');
    const nextBtn = document.querySelector('.nav-btn:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = currentScene === 0;
        prevBtn.style.opacity = currentScene === 0 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentScene === totalScenes - 1;
        nextBtn.style.opacity = currentScene === totalScenes - 1 ? '0.5' : '1';
    }
    
    console.log(`切换到场景 ${currentScene + 1}`);
}

/**
 * Toggle the expansion state of a prompt card
 */
function toggleCard(cardElement) {
    const isExpanded = cardElement.classList.contains('expanded');
    
    // Close all other cards first (accordion behavior)
    const allCards = document.querySelectorAll('.prompt-card');
    allCards.forEach(card => {
        if (card !== cardElement) {
            card.classList.remove('expanded');
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        cardElement.classList.remove('expanded');
    } else {
        cardElement.classList.add('expanded');
        
        // Focus on the first editable element if available
        const firstBlank = cardElement.querySelector('.fill-blank');
        if (firstBlank) {
            setTimeout(() => firstBlank.focus(), 300);
        }
    }
    
    // Add visual feedback
    cardElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cardElement.style.transform = 'scale(1)';
    }, 150);
    
    console.log(`${isExpanded ? '收起' : '展开'}讨论卡片`);
}

/**
 * Start the activity timer
 */
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        
        // Update button states
        updateTimerButtons();
        
        console.log('计时器已开始');
    }
}

/**
 * Pause the activity timer
 */
function pauseTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        
        // Update button states
        updateTimerButtons();
        
        console.log('计时器已暂停');
    }
}

/**
 * Reset the activity timer
 */
function resetTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    timeRemaining = 15 * 60; // Reset to 15 minutes
    
    updateTimerDisplay();
    updateTimerButtons();
    
    console.log('计时器已重置');
}

/**
 * Update the timer countdown
 */
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
        
        // Alert when time is running low
        if (timeRemaining === 60) { // 1 minute remaining
            showTimerAlert('还剩1分钟！');
        } else if (timeRemaining === 0) {
            showTimerAlert('时间到！');
            pauseTimer();
        }
    }
}

/**
 * Update the timer display
 */
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = display;
        
        // Change color when time is running low
        if (timeRemaining <= 60) {
            timerElement.style.color = '#f44336';
        } else if (timeRemaining <= 300) { // 5 minutes
            timerElement.style.color = '#ff9800';
        } else {
            timerElement.style.color = '#1976d2';
        }
    }
}

/**
 * Update timer button states
 */
function updateTimerButtons() {
    const buttons = document.querySelectorAll('.timer-controls .control-btn');
    buttons.forEach((btn, index) => {
        switch(index) {
            case 0: // Start button
                btn.disabled = isTimerRunning;
                btn.style.opacity = isTimerRunning ? '0.5' : '1';
                break;
            case 1: // Pause button
                btn.disabled = !isTimerRunning;
                btn.style.opacity = !isTimerRunning ? '0.5' : '1';
                break;
            case 2: // Reset button
                // Reset is always available
                break;
        }
    });
}

/**
 * Show timer alert message
 */
function showTimerAlert(message) {
    // Create temporary alert element
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #f44336;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1001;
        box-shadow: 0 4px 16px rgba(244, 67, 54, 0.3);
        animation: alertPulse 0.5s ease-out;
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes alertPulse {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Update group mode based on selection
 */
function updateGroupMode() {
    const select = document.getElementById('groupMode');
    const mode = select.value;
    
    // You can add specific logic here for different group modes
    console.log(`活动模式切换为: ${mode === 'pair' ? '两人讨论' : '小组讨论'}`);
    
    // Visual feedback
    select.style.transform = 'scale(0.95)';
    setTimeout(() => {
        select.style.transform = 'scale(1)';
    }, 150);
}

/**
 * Toggle summary section expansion
 */
function toggleSummary() {
    const content = document.getElementById('summaryContent');
    const icon = document.getElementById('summaryIcon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('expanded');
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
        
        // Focus on textarea when expanded
        const textarea = content.querySelector('textarea');
        if (textarea) {
            setTimeout(() => textarea.focus(), 300);
        }
    }
    
    console.log('切换总结区域显示状态');
}

/**
 * Clear summary content
 */
function clearSummary() {
    const textarea = document.querySelector('.summary-content textarea');
    if (textarea) {
        if (confirm('确定要清空总结内容吗？')) {
            textarea.value = '';
            textarea.focus();
            console.log('总结内容已清空');
        }
    }
}

/**
 * Share summary content
 */
function shareSummary() {
    const textarea = document.querySelector('.summary-content textarea');
    if (textarea && textarea.value.trim()) {
        // Create a simple sharing mechanism
        const content = textarea.value;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: '一千桶水 - 讨论总结',
                text: content
            }).then(() => {
                console.log('总结已分享');
            }).catch(err => {
                console.log('分享失败:', err);
                fallbackShare(content);
            });
        } else {
            fallbackShare(content);
        }
    } else {
        alert('请先输入总结内容！');
    }
}

/**
 * Fallback sharing method
 */
function fallbackShare(content) {
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(content).then(() => {
            showShareSuccess('总结已复制到剪贴板！');
        }).catch(() => {
            showShareFallback(content);
        });
    } else {
        showShareFallback(content);
    }
}

/**
 * Show sharing success message
 */
function showShareSuccess(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 13px;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }
    }, 3000);
}

/**
 * Show sharing fallback dialog
 */
function showShareFallback(content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    dialog.innerHTML = `
        <h3 style="margin: 0 0 12px 0; color: #333;">讨论总结</h3>
        <textarea readonly style="width: 100%; height: 150px; border: 1px solid #ddd; border-radius: 4px; padding: 8px; font-family: inherit; resize: none;">${content}</textarea>
        <div style="margin-top: 12px; text-align: right;">
            <button onclick="this.closest('.modal').remove()" style="background: #2196f3; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">关闭</button>
        </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Show tooltip with activity information
 */
function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');
    
    // Position tooltip near the help button
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = (rect.left - 250) + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    
    // Adjust position if tooltip goes off-screen
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    if (tooltipRect.left < 0) {
        tooltip.style.left = '10px';
    }
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Add CSS animations for sharing notifications
const shareAnimations = document.createElement('style');
shareAnimations.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(shareAnimations);