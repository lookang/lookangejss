// Peribahasa data with meanings for Secondary 1 lower progress students
const peribahasaData = [
    {
        id: 1,
        peribahasa: "Air dicencang tidak akan putus",
        maksud: "Hubungan keluarga tidak akan terputus walaupun ada masalah",
        explanation: "Peribahasa ini bermaksud hubungan darah dalam keluarga sangat kuat dan tidak mudah putus walaupun ada perselisihan atau masalah."
    },
    {
        id: 2,
        peribahasa: "Bagai aur dengan tebing",
        maksud: "Hubungan yang sangat rapat dan saling memerlukan",
        explanation: "Seperti pokok aur yang tumbuh rapat dengan tebing sungai, menggambarkan hubungan yang sangat erat dan saling bergantung."
    },
    {
        id: 3,
        peribahasa: "Seperti katak di bawah tempurung",
        maksud: "Orang yang berfikiran sempit dan tidak tahu dunia luar",
        explanation: "Menggambarkan seseorang yang tidak mengetahui keadaan sebenar dunia kerana terlalu terkurung dalam persekitaran yang terhad."
    },
    {
        id: 4,
        peribahasa: "Berat sama dipikul, ringan sama dijinjing",
        maksud: "Berkongsi tanggungjawab dalam suka dan duka",
        explanation: "Bermaksud bekerjasama dalam menghadapi kesukaran dan berkongsi kebahagiaan bersama-sama."
    },
    {
        id: 5,
        peribahasa: "Seperti mencurah air ke daun keladi",
        maksud: "Nasihat yang tidak didengar atau dihiraukan",
        explanation: "Air yang dicurahkan ke daun keladi akan mengalir turun tanpa diserap, seperti nasihat yang tidak diterima dengan baik."
    },
    {
        id: 6,
        peribahasa: "Hangat-hangat tahi ayam",
        maksud: "Semangat yang tidak kekal lama",
        explanation: "Seperti tahi ayam yang panas seketika sahaja, menggambarkan semangat atau minat yang cepat hilang."
    }
];

// Game state variables
let currentMatches = {};
let correctMatches = 0;
let gameCompleted = false;

// DOM elements
let peribahasaContainer, dropZones, progressFill, progressText, feedback;
let resetBtn, checkBtn, centerTooltip, closeTooltip;

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

/**
 * Initialize the game by setting up DOM references and creating game elements
 */
function initializeGame() {
    // Get DOM references
    peribahasaContainer = document.getElementById('peribahasaContainer');
    dropZones = document.getElementById('dropZones');
    progressFill = document.getElementById('progressFill');
    progressText = document.getElementById('progressText');
    feedback = document.getElementById('feedback');
    resetBtn = document.getElementById('resetBtn');
    checkBtn = document.getElementById('checkBtn');
    centerTooltip = document.getElementById('centerTooltip');
    closeTooltip = document.getElementById('closeTooltip');

    // Create game elements
    createPeribahasaItems();
    createDropZones();
    updateProgress();
}

/**
 * Create draggable peribahasa items
 */
function createPeribahasaItems() {
    peribahasaContainer.innerHTML = '';
    
    // Shuffle the peribahasa for variety
    const shuffledData = [...peribahasaData].sort(() => Math.random() - 0.5);
    
    shuffledData.forEach(item => {
        const element = document.createElement('div');
        element.className = 'peribahasa-item';
        element.draggable = true;
        element.dataset.id = item.id;
        element.textContent = item.peribahasa;
        
        // Add touch and mouse event listeners for dragging
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile support
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);
        
        // Click event to show detailed explanation
        element.addEventListener('click', () => showTooltip(item));
        
        peribahasaContainer.appendChild(element);
    });
}

/**
 * Create drop zones for meanings
 */
function createDropZones() {
    dropZones.innerHTML = '';
    
    peribahasaData.forEach(item => {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.dataset.id = item.id;
        zone.textContent = item.maksud;
        
        // Add drag and drop event listeners
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
        
        // Click event to show detailed explanation
        zone.addEventListener('click', () => showTooltip(item));
        
        dropZones.appendChild(zone);
    });
}

/**
 * Handle drag start event
 */
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.target.classList.add('dragging');
}

/**
 * Handle drag end event
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

/**
 * Handle drag over event for drop zones
 */
function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

/**
 * Handle drag leave event for drop zones
 */
function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

/**
 * Handle drop event
 */
function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const draggedId = e.dataTransfer.getData('text/plain');
    const dropZoneId = e.target.dataset.id;
    
    // Check if drop zone is already filled
    if (e.target.classList.contains('filled')) {
        showFeedback('Kotak ini sudah diisi!', 'warning');
        return;
    }
    
    // Make the match
    makeMatch(draggedId, dropZoneId, e.target);
}

// Touch handling variables
let touchItem = null;
let touchOffset = { x: 0, y: 0 };

/**
 * Handle touch start for mobile drag and drop
 */
function handleTouchStart(e) {
    touchItem = e.target;
    const touch = e.touches[0];
    const rect = touchItem.getBoundingClientRect();
    touchOffset.x = touch.clientX - rect.left;
    touchOffset.y = touch.clientY - rect.top;
    
    touchItem.classList.add('dragging');
}

/**
 * Handle touch move for mobile drag and drop
 */
function handleTouchMove(e) {
    if (!touchItem) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    
    // Move the item with touch
    touchItem.style.position = 'fixed';
    touchItem.style.left = (touch.clientX - touchOffset.x) + 'px';
    touchItem.style.top = (touch.clientY - touchOffset.y) + 'px';
    touchItem.style.zIndex = '1000';
    
    // Find element under touch point
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Highlight drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    if (elementBelow && elementBelow.classList.contains('drop-zone')) {
        elementBelow.classList.add('drag-over');
    }
}

/**
 * Handle touch end for mobile drag and drop
 */
function handleTouchEnd(e) {
    if (!touchItem) return;
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Reset item position
    touchItem.style.position = '';
    touchItem.style.left = '';
    touchItem.style.top = '';
    touchItem.style.zIndex = '';
    touchItem.classList.remove('dragging');
    
    // Clear drag over states
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    // Check if dropped on valid zone
    if (elementBelow && elementBelow.classList.contains('drop-zone') && !elementBelow.classList.contains('filled')) {
        const draggedId = touchItem.dataset.id;
        const dropZoneId = elementBelow.dataset.id;
        makeMatch(draggedId, dropZoneId, elementBelow);
    }
    
    touchItem = null;
}

/**
 * Make a match between peribahasa and meaning
 */
function makeMatch(peribahasaId, dropZoneId, dropZone) {
    // Store the match
    currentMatches[dropZoneId] = peribahasaId;
    
    // Update drop zone appearance
    dropZone.classList.add('filled');
    const peribahasaText = peribahasaData.find(item => item.id == peribahasaId).peribahasa;
    dropZone.innerHTML = `<strong>${peribahasaText}</strong><br><small>${dropZone.textContent}</small>`;
    
    // Hide the dragged item
    const draggedItem = document.querySelector(`[data-id="${peribahasaId}"]`);
    if (draggedItem && draggedItem.classList.contains('peribahasa-item')) {
        draggedItem.style.display = 'none';
    }
    
    // Update progress
    updateProgress();
    
    // Check if game is complete
    if (Object.keys(currentMatches).length === peribahasaData.length) {
        setTimeout(() => {
            showFeedback('Semua pasangan telah dibuat! Klik "Semak Jawapan" untuk melihat keputusan.', 'info');
        }, 500);
    }
}

/**
 * Update progress indicator
 */
function updateProgress() {
    const totalMatches = peribahasaData.length;
    const currentMatchCount = Object.keys(currentMatches).length;
    const percentage = (correctMatches / totalMatches) * 100;
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${correctMatches}/${totalMatches} Betul`;
}

/**
 * Check all answers and provide feedback
 */
function checkAnswers() {
    if (Object.keys(currentMatches).length === 0) {
        showFeedback('Sila buat padanan terlebih dahulu!', 'warning');
        return;
    }
    
    correctMatches = 0;
    let feedbackMessage = '';
    
    // Check each match
    Object.keys(currentMatches).forEach(dropZoneId => {
        const peribahasaId = currentMatches[dropZoneId];
        const dropZone = document.querySelector(`[data-id="${dropZoneId}"].drop-zone`);
        
        if (dropZoneId == peribahasaId) {
            // Correct match
            correctMatches++;
            dropZone.classList.remove('incorrect');
            dropZone.classList.add('correct');
        } else {
            // Incorrect match
            dropZone.classList.remove('correct');
            dropZone.classList.add('incorrect');
        }
    });
    
    // Update progress
    updateProgress();
    
    // Provide feedback
    const totalMatches = peribahasaData.length;
    const percentage = (correctMatches / totalMatches) * 100;
    
    if (correctMatches === totalMatches) {
        feedbackMessage = '🎉 Tahniah! Semua jawapan betul!';
        gameCompleted = true;
    } else if (percentage >= 70) {
        feedbackMessage = `✅ Bagus! ${correctMatches}/${totalMatches} betul. Cuba lagi untuk jawapan yang salah.`;
    } else if (percentage >= 50) {
        feedbackMessage = `👍 Tidak buruk! ${correctMatches}/${totalMatches} betul. Teruskan usaha!`;
    } else {
        feedbackMessage = `💪 ${correctMatches}/${totalMatches} betul. Jangan berputus asa, cuba lagi!`;
    }
    
    showFeedback(feedbackMessage, correctMatches === totalMatches ? 'success' : 'info');
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    currentMatches = {};
    correctMatches = 0;
    gameCompleted = false;
    
    // Reset all drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('filled', 'correct', 'incorrect', 'drag-over');
        const originalText = peribahasaData.find(item => item.id == zone.dataset.id).maksud;
        zone.textContent = originalText;
    });
    
    // Show all peribahasa items
    document.querySelectorAll('.peribahasa-item').forEach(item => {
        item.style.display = 'flex';
        item.classList.remove('dragging');
    });
    
    // Update progress
    updateProgress();
    
    // Clear feedback
    feedback.textContent = '';
    
    showFeedback('Permainan telah dimulakan semula!', 'info');
}

/**
 * Show feedback message with different styles
 */
function showFeedback(message, type = 'info') {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    
    // Auto-hide after 3 seconds for non-success messages
    if (type !== 'success') {
        setTimeout(() => {
            feedback.textContent = '';
        }, 3000);
    }
}

/**
 * Show detailed tooltip with explanation
 */
function showTooltip(item) {
    document.getElementById('tooltipTitle').textContent = item.peribahasa;
    document.getElementById('tooltipBody').innerHTML = `
        <p><strong>Maksud:</strong> ${item.maksud}</p>
        <br>
        <p><strong>Penjelasan:</strong> ${item.explanation}</p>
    `;
    centerTooltip.style.display = 'flex';
}

/**
 * Hide the center tooltip
 */
function hideTooltip() {
    centerTooltip.style.display = 'none';
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Button event listeners
    resetBtn.addEventListener('click', resetGame);
    checkBtn.addEventListener('click', checkAnswers);
    
    // Tooltip event listeners
    closeTooltip.addEventListener('click', hideTooltip);
    centerTooltip.addEventListener('click', (e) => {
        if (e.target === centerTooltip) {
            hideTooltip();
        }
    });
    
    // Keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideTooltip();
        }
    });
    
    // Header tooltip functionality
    const headerTooltip = document.getElementById('headerTooltip');
    headerTooltip.addEventListener('click', () => {
        showTooltip({
            peribahasa: 'Panduan Permainan',
            maksud: 'Cara bermain permainan padanan peribahasa',
            explanation: 'Seret peribahasa dari sebelah kiri ke kotak maksud yang betul di sebelah kanan. Klik pada mana-mana item untuk melihat penjelasan lanjut. Gunakan butang "Semak Jawapan" untuk melihat keputusan dan "Mula Semula" untuk bermain lagi.'
        });
    });
}

// Prevent default drag behavior on images and other elements
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());