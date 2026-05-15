// Recorder Fingering Interactive - JavaScript
// This script handles note selection, fingering visualization, sound generation, and analytics

// Check if running standalone or in iframe
if (window.self === window.top) {
    document.body.classList.add('standalone');
}

// Recorder fingering chart - Singapore curriculum standard
// Format: [thumb, hole1, hole2, hole3, hole4, hole5, hole6, hole7]
// 1 = closed, 0 = open, 0.5 = half-closed
const fingeringChart = {
    'C': [1, 1, 1, 1, 1, 1, 1, 1],
    'D': [1, 1, 1, 1, 1, 1, 1, 0],
    'E': [1, 1, 1, 1, 1, 1, 0, 0],
    'F': [1, 1, 1, 1, 1, 0, 0, 0],
    'G': [1, 1, 1, 1, 0, 0, 0, 0],
    'A': [1, 1, 1, 0, 0, 0, 0, 0],
    'B': [1, 1, 0, 0, 0, 0, 0, 0],
    'C\'': [1, 0, 0, 0, 0, 0, 0, 0],
    'D\'': [0.5, 1, 1, 1, 1, 1, 1, 0]
};

// Note frequencies for sound generation (Hz)
const noteFrequencies = {
    'C': 523.25,   // C5
    'D': 587.33,   // D5
    'E': 659.25,   // E5
    'F': 698.46,   // F5
    'G': 783.99,   // G5
    'A': 880.00,   // A5
    'B': 987.77,   // B5
    'C\'': 1046.50, // C6
    'D\'': 1174.66  // D6
};

// Playing tips for each note
const playingTips = {
    'C': 'Cover all holes completely. Blow gently for a clear tone.',
    'D': 'Lift the bottom finger (hole 7). Keep other holes covered.',
    'E': 'Lift holes 6 and 7. Maintain steady breath support.',
    'F': 'Lift holes 5, 6, and 7. Keep fingers close to the recorder.',
    'G': 'Lift holes 4, 5, 6, and 7. This is a common note in many songs.',
    'A': 'Lift holes 3, 4, 5, 6, and 7. Keep thumb firmly on back hole.',
    'B': 'Only cover thumb, holes 1 and 2. Blow steadily.',
    'C\'': 'Only cover the thumb hole. Blow gently for high C.',
    'D\'': 'Half-cover thumb hole, lift hole 7. This requires practice!'
};

// Global variables
let audioContext;
let currentNote = null;
let startTime = Date.now();
let actionCount = 0;
let analyticsCollapsed = false;

// Initialize the interactive on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAudioContext();
    createNoteButtons();
    logAction('🎬 Interactive started', 'Ready to explore recorder fingerings');
});

// Initialize Web Audio API context
function initializeAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error('Web Audio API not supported', e);
        logAction('⚠️ Audio initialization failed', 'Sound may not work on this device');
    }
}

// Create note buttons dynamically
function createNoteButtons() {
    const noteButtonsContainer = document.getElementById('note-buttons');
    const notes = Object.keys(fingeringChart);
    
    notes.forEach(note => {
        const button = document.createElement('button');
        button.className = 'note-btn';
        button.textContent = note.replace('\'', '′'); // Use prime symbol for high notes
        button.setAttribute('data-note', note);
        
        // Add click event listener
        button.addEventListener('click', function() {
            handleNoteClick(note, this);
        });
        
        // Add touch event for mobile
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleNoteClick(note, this);
        });
        
        noteButtonsContainer.appendChild(button);
    });
}

// Handle note button click
function handleNoteClick(note, buttonElement) {
    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Update active button state
    document.querySelectorAll('.note-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    buttonElement.classList.add('active', 'playing');
    
    // Update current note display
    currentNote = note;
    document.getElementById('current-note').textContent = note.replace('\'', '′');
    
    // Update fingering visualization
    updateFingering(note);
    
    // Update info panel
    updateInfoPanel(note);
    
    // Play note sound
    playNote(note);
    
    // Log action
    const fingeringStr = fingeringChart[note].map((h, i) => {
        const holeName = i === 0 ? 'Thumb' : i;
        if (h === 1) return `${holeName}:●`;
        if (h === 0) return `${holeName}:○`;
        return `${holeName}:◐`;
    }).join(' ');
    
    logAction(`🎵 Note ${note} selected`, `Fingering: ${fingeringStr}`);
    
    // Remove playing animation after sound
    setTimeout(() => {
        buttonElement.classList.remove('playing');
    }, 500);
}

// Update recorder fingering visualization
function updateFingering(note) {
    const fingering = fingeringChart[note];
    
    // Update thumb hole
    const thumbHole = document.getElementById('hole-thumb');
    updateHoleState(thumbHole, fingering[0]);
    
    // Update front holes (0-6 map to holes 1-7)
    for (let i = 0; i < 7; i++) {
        const hole = document.getElementById(`hole-${i}`);
        updateHoleState(hole, fingering[i + 1]);
    }
}

// Update individual hole state with visual feedback
function updateHoleState(holeElement, state) {
    // Remove all state classes
    holeElement.classList.remove('hole-closed', 'hole-open', 'hole-half');
    
    // Add appropriate class based on state
    if (state === 1) {
        holeElement.classList.add('hole-closed');
    } else if (state === 0) {
        holeElement.classList.add('hole-open');
    } else if (state === 0.5) {
        holeElement.classList.add('hole-half');
    }
}

// Update information panel
function updateInfoPanel(note) {
    document.getElementById('info-note').textContent = note.replace('\'', '′');
    
    // Create fingering text description
    const fingering = fingeringChart[note];
    const fingeringDesc = [];
    
    if (fingering[0] === 1) fingeringDesc.push('Thumb: Closed');
    else if (fingering[0] === 0.5) fingeringDesc.push('Thumb: Half-closed');
    else fingeringDesc.push('Thumb: Open');
    
    for (let i = 1; i < fingering.length; i++) {
        const holeNum = i;
        if (fingering[i] === 1) fingeringDesc.push(`Hole ${holeNum}: Closed`);
        else if (fingering[i] === 0.5) fingeringDesc.push(`Hole ${holeNum}: Half-closed`);
        else fingeringDesc.push(`Hole ${holeNum}: Open`);
    }
    
    document.getElementById('fingering-text').innerHTML = fingeringDesc.join('<br>');
    
    // Update playing tips
    document.getElementById('playing-tips').textContent = playingTips[note];
}

// Play note sound using Web Audio API
function playNote(note) {
    if (!audioContext) {
        console.warn('Audio context not available');
        return;
    }
    
    const frequency = noteFrequencies[note];
    const duration = 1.0; // seconds
    
    // Create oscillator for recorder-like tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Use sine wave for a softer, recorder-like tone
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Create envelope for natural sound (ADSR)
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);  // Decay
    gainNode.gain.setValueAtTime(0.2, now + duration - 0.1); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play sound
    oscillator.start(now);
    oscillator.stop(now + duration);
}

// Analytics functions
function logAction(action, state) {
    actionCount++;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">t=${elapsed}s</span> | 
        <span class="log-action">${action}</span> | 
        <span class="log-state">${state}</span>
    `;
    
    const logContainer = document.getElementById('analytics-log');
    logContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Update action count
    document.getElementById('action-count').textContent = `Actions: ${actionCount}`;
}

function toggleAnalytics() {
    const container = document.getElementById('analytics-container');
    analyticsCollapsed = !analyticsCollapsed;
    
    if (analyticsCollapsed) {
        container.classList.add('collapsed');
    } else {
        container.classList.remove('collapsed');
    }
    
    logAction('📊 Analytics panel toggled', analyticsCollapsed ? 'Collapsed' : 'Expanded');
}

function clearAnalytics() {
    const logContainer = document.getElementById('analytics-log');
    logContainer.innerHTML = '';
    actionCount = 0;
    startTime = Date.now();
    document.getElementById('action-count').textContent = 'Actions: 0';
    
    logAction('🔄 Analytics cleared', 'Log reset');
}

// Touch event handling for better mobile experience
document.addEventListener('touchstart', function() {
    // Initialize audio context on first touch (mobile requirement)
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.note-btn')) {
        e.preventDefault();
    }
}, { passive: false });