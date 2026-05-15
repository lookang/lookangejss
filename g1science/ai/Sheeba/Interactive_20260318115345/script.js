// Global variables for simulation state
let startTime = Date.now();
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

// New variables for pedagogical features
let currentDay = 0;
let simulationInterval = null;
let hypothesisMade = false;
let journal = {
    temp: false,
    moisture: false,
    type: false
};

// Patch data
let breadPatches = { A: [], B: [] };

function initMouldPatches() {
    breadPatches = { A: [], B: [] };
    const colors = [
        'radial-gradient(circle, rgba(34,139,34,0.85) 0%, rgba(85,107,47,0.5) 60%, transparent 100%)',
        'radial-gradient(circle, rgba(46,125,50,0.85) 0%, rgba(107,142,35,0.5) 60%, transparent 100%)',
        'radial-gradient(circle, rgba(85,107,47,0.85) 0%, rgba(34,139,34,0.4) 60%, transparent 100%)',
        'radial-gradient(circle, rgba(0,100,0,0.85)   0%, rgba(85,107,47,0.5) 60%, transparent 100%)',
        'radial-gradient(circle, rgba(160,160,160,0.7) 0%, rgba(100,100,100,0.4) 60%, transparent 100%)'
    ];
    
    for (const bread of ['A', 'B']) {
        const layer = document.getElementById(`mould${bread}`);
        if(layer) layer.innerHTML = ''; // Ensure clear on init
        
        for (let i = 0; i < 40; i++) {
            let p = {
                id: i,
                x: Math.random() * 80 + 10, // 10% to 90% space
                y: Math.random() * 80 + 10,
                baseSize: Math.random() * 15 + 10, // 10px to 25px initial max
                color: colors[Math.floor(Math.random() * colors.length)],
                appearAtScore: Math.random() * 9 + 0.5 // Appears at score > 0.5
            };
            breadPatches[bread].push(p);
            
            // Create DOM element and keep it hidden/size 0
            if(layer) {
                let patchEl = document.createElement('div');
                patchEl.id = `patch-${bread}-${p.id}`;
                patchEl.className = 'mould-patch';
                patchEl.style.background = p.color;
                patchEl.style.width = '0px';
                patchEl.style.height = '0px';
                patchEl.style.left = `${p.x}%`;
                patchEl.style.top = `${p.y}%`;
                layer.appendChild(patchEl);
            }
        }
    }
}

// Initial conditions for both breads
const initialConditions = {
    A: { temp: 'room', moisture: 'damp', type: 'not-toasted' },
    B: { temp: 'room', moisture: 'damp', type: 'not-toasted' }
};

// Current conditions (will be updated by user)
let currentConditions = {
    A: { ...initialConditions.A },
    B: { ...initialConditions.B }
};

// Initialize the simulation when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSimulation();
    setupEventListeners();
});

/**
 * Initialize the simulation with default values
 */
function initializeSimulation() {
    // Set initial dropdown values
    document.getElementById('tempA').value = initialConditions.A.temp;
    document.getElementById('moistureA').value = initialConditions.A.moisture;
    document.getElementById('typeA').value = initialConditions.A.type;
    
    document.getElementById('tempB').value = initialConditions.B.temp;
    document.getElementById('moistureB').value = initialConditions.B.moisture;
    document.getElementById('typeB').value = initialConditions.B.type;
    
    // Reset bread visuals (which also inits patches)
    resetBreadVisuals();
}

/**
 * Setup all event listeners for controls and buttons
 */
function setupEventListeners() {
    // Bread A controls
    document.getElementById('tempA').addEventListener('change', (e) => {
        currentConditions.A.temp = e.target.value;
        logAction(`🌡️ Bread A temperature changed to: ${e.target.value}`);
    });
    
    document.getElementById('moistureA').addEventListener('change', (e) => {
        currentConditions.A.moisture = e.target.value;
        logAction(`💧 Bread A moisture changed to: ${e.target.value}`);
    });
    
    document.getElementById('typeA').addEventListener('change', (e) => {
        currentConditions.A.type = e.target.value;
        logAction(`🍞 Bread A type changed to: ${e.target.value}`);
        updateBreadAppearance('A');
    });
    
    // Bread B controls
    document.getElementById('tempB').addEventListener('change', (e) => {
        currentConditions.B.temp = e.target.value;
        logAction(`🌡️ Bread B temperature changed to: ${e.target.value}`);
    });
    
    document.getElementById('moistureB').addEventListener('change', (e) => {
        currentConditions.B.moisture = e.target.value;
        logAction(`💧 Bread B moisture changed to: ${e.target.value}`);
    });
    
    document.getElementById('typeB').addEventListener('change', (e) => {
        currentConditions.B.type = e.target.value;
        logAction(`🍞 Bread B type changed to: ${e.target.value}`);
        updateBreadAppearance('B');
    });
    
    // Hypothesis controls
    document.getElementById('hypoBread').addEventListener('change', (e) => {
        hypothesisMade = true;
        document.getElementById('hypoWarning').style.display = 'none';
        logAction(`🧪 Hypothesis recorded: Predicted ${e.target.value}`);
    });
    
    // Action buttons
    document.getElementById('runBtn').addEventListener('click', runSimulation);
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);
    
    // Recording buttons
    document.getElementById('startRecBtn').addEventListener('click', startRecording);
    document.getElementById('stopRecBtn').addEventListener('click', stopRecording);
    document.getElementById('downloadRecBtn').addEventListener('click', downloadRecording);
}

/**
 * Update bread appearance based on type (toasted/not toasted)
 */
function updateBreadAppearance(bread) {
    const breadBase = document.querySelector(`#bread${bread} .bread-base`);
    if (currentConditions[bread].type === 'toasted') {
        breadBase.classList.add('toasted');
    } else {
        breadBase.classList.remove('toasted');
    }
}

/**
 * Calculate max 0-10 mould growth score based on conditions
 */
function calculateMaxMouldScore(conditions) {
    let score = 0;
    
    // Temperature contribution
    if (conditions.temp === 'warm') score += 5;
    else if (conditions.temp === 'room') score += 2;
    else if (conditions.temp === 'cold') score += 0;
    
    // Moisture contribution
    if (conditions.moisture === 'damp') score += 3;
    else if (conditions.moisture === 'dry') score += 0;
    
    // Type contribution (toasted bread resists mould slightly)
    if (conditions.type === 'not-toasted') score += 2;
    
    return score;
}

/**
 * Get visual description word from the 0-10 numeric score
 */
function getMouldDescription(score) {
    if (score === 0) return 'None';
    if (score <= 2) return 'Slight';
    if (score <= 5) return 'Noticeable';
    if (score <= 8) return 'Heavy';
    return 'Severe';
}



/**
 * Run the simulation - calculate and display mould growth over time
 */
function runSimulation() {
    // Check if hypothesis is made
    if (!hypothesisMade) {
        document.getElementById('hypoWarning').style.display = 'block';
        document.getElementById('hypoWarning').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    logAction('▶️ Run Simulation button clicked');
    
    // Disable run button during simulation
    document.getElementById('runBtn').disabled = true;
    document.getElementById('timeDisplay').style.display = 'block';
    
    // Reset day and visuals first
    currentDay = 0;
    document.getElementById('dayCounter').textContent = currentDay;
    document.getElementById('resultsArea').style.display = 'none';
    resetBreadVisuals();
    
    // Calculate final mould growth for both breads
    const maxScoreA = calculateMaxMouldScore(currentConditions.A);
    const maxScoreB = calculateMaxMouldScore(currentConditions.B);
    
    let currentScoreA = 0;
    let currentScoreB = 0;
    
    // Start animation over 7 days
    clearInterval(simulationInterval);
    simulationInterval = setInterval(() => {
        currentDay++;
        document.getElementById('dayCounter').textContent = currentDay;
        
        // As days progress, mould score increases progressively towards the max target
        currentScoreA = Math.round((currentDay / 7) * maxScoreA);
        currentScoreB = Math.round((currentDay / 7) * maxScoreB);
        
        // Update numeric scoring UI
        document.getElementById('scoreA').textContent = currentScoreA;
        document.getElementById('descA').textContent = getMouldDescription(currentScoreA);
        document.getElementById('scoreB').textContent = currentScoreB;
        document.getElementById('descB').textContent = getMouldDescription(currentScoreB);
        
        // Update visual patches dynamically based on current score
        updateMouldDisplay('A', currentScoreA);
        updateMouldDisplay('B', currentScoreB);
        
        if (currentDay === 7) {
            clearInterval(simulationInterval);
            document.getElementById('runBtn').disabled = false;
            
            // Check if it's a fair test at the end of the simulation
            checkFairTest();
            
            // Log results
            logAction(`📊 Final results: Bread A Score: ${currentScoreA}/10 | Bread B Score: ${currentScoreB}/10`);
        }
    }, 500); // 500ms per day
}

/**
 * Update the mould display on bread by expanding patches
 */
function updateMouldDisplay(bread, score) {
    if (!breadPatches[bread]) return;
    
    breadPatches[bread].forEach(p => {
        let patchEl = document.getElementById(`patch-${bread}-${p.id}`);
        if (!patchEl) return;
        
        if (score >= p.appearAtScore) {
            // Calculate size based on how far past appear score we are
            let growth = (score - p.appearAtScore) * 6; 
            let currentSize = p.baseSize + growth;
            if (currentSize > 80) currentSize = 80; // max size limit
            
            patchEl.style.width = `${currentSize}px`;
            patchEl.style.height = `${currentSize}px`;
            patchEl.style.left = `calc(${p.x}% - ${currentSize/2}px)`;
            patchEl.style.top = `calc(${p.y}% - ${currentSize/2}px)`;
            patchEl.style.opacity = '1';
        } else {
            patchEl.style.opacity = '0';
            patchEl.style.width = '0px';
            patchEl.style.height = '0px';
        }
    });
}

/**
 * Check if the test is fair (only one variable changed)
 */
function checkFairTest() {
    const condA = currentConditions.A;
    const condB = currentConditions.B;
    
    let changedVariables = [];
    let controlledVariables = [];
    
    if (condA.temp !== condB.temp) changedVariables.push('Temperature');
    else controlledVariables.push('Temperature');
    
    if (condA.moisture !== condB.moisture) changedVariables.push('Moisture');
    else controlledVariables.push('Moisture');
    
    if (condA.type !== condB.type) changedVariables.push('Bread Type');
    else controlledVariables.push('Bread Type');
    
    let differences = changedVariables.length;
    
    // Display results
    const resultsArea = document.getElementById('resultsArea');
    const resultMessage = document.getElementById('resultMessage');
    
    resultsArea.style.display = 'block';
    
    if (differences === 0) {
        resultMessage.innerHTML = '⚠️ Both breads have the exact same conditions. Try changing exactly one variable to see the difference!';
        resultMessage.style.color = '#e67e22';
        logAction('⚠️ Fair test check: No variables changed');
    } else if (differences === 1) {
        const indVar = changedVariables[0];
        resultMessage.innerHTML = `✅ Good! This is a fair test.<br><br>
            <strong>Independent Variable</strong> (what you changed): ${indVar}<br>
            <strong>Controlled Variables</strong> (what you kept the same): ${controlledVariables.join(', ')}<br>
            <strong>Dependent Variable</strong> (what we measured): Mould Growth`;
            
        resultMessage.style.color = '#27ae60';
        logAction(`✅ Fair test check: PASS (Independent Variable: ${indVar})`);
        
        // Update Science Journal
        updateJournal(indVar);
        
    } else {
        resultMessage.innerHTML = `❌ This is not a fair test.<br><br>
            You changed ${differences} variables: <strong>${changedVariables.join(' AND ')}</strong>.<br>
            To find out what causes mould, you must change <strong>only one</strong> thing at a time. Try making one of those the same for both breads!`;
        resultMessage.style.color = '#c0392b';
        logAction(`❌ Fair test check: FAIL (${changedVariables.join(' and ')} changed)`);
    }
    
    // Scroll to results
    resultsArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Update the Science Journal based on successful fair tests
 */
function updateJournal(variable) {
    if (variable === 'Temperature') {
        if (!journal.temp) {
            journal.temp = true;
            const el = document.getElementById('journalTemp');
            el.innerHTML = '✅ You tested how Temperature affects mould!';
            el.classList.add('completed');
            logAction('🏆 Science Journal: Temperature test completed');
        }
    } else if (variable === 'Moisture') {
        if (!journal.moisture) {
            journal.moisture = true;
            const el = document.getElementById('journalMoist');
            el.innerHTML = '✅ You tested how Moisture affects mould!';
            el.classList.add('completed');
            logAction('🏆 Science Journal: Moisture test completed');
        }
    } else if (variable === 'Bread Type') {
        if (!journal.type) {
            journal.type = true;
            const el = document.getElementById('journalType');
            el.innerHTML = '✅ You tested how Bread Type affects mould!';
            el.classList.add('completed');
            logAction('🏆 Science Journal: Bread Type test completed');
        }
    }
}

/**
 * Reset the simulation to initial state
 */
function resetSimulation() {
    logAction('🔄 Reset button clicked');
    
    // Clear intervals and unlock button
    clearInterval(simulationInterval);
    document.getElementById('runBtn').disabled = false;
    currentDay = 0;
    document.getElementById('dayCounter').textContent = currentDay;
    
    // Reset conditions
    currentConditions = {
        A: { ...initialConditions.A },
        B: { ...initialConditions.B }
    };
    
    // Reset dropdowns
    document.getElementById('tempA').value = initialConditions.A.temp;
    document.getElementById('moistureA').value = initialConditions.A.moisture;
    document.getElementById('typeA').value = initialConditions.A.type;
    
    document.getElementById('tempB').value = initialConditions.B.temp;
    document.getElementById('moistureB').value = initialConditions.B.moisture;
    document.getElementById('typeB').value = initialConditions.B.type;
    
    // Reset visuals
    resetBreadVisuals();
    
    // Hide results and time
    document.getElementById('resultsArea').style.display = 'none';
    document.getElementById('timeDisplay').style.display = 'none';
    
    // Reset hypothesis
    hypothesisMade = false;
    document.getElementById('hypoBread').value = '';
    document.getElementById('hypoWarning').style.display = 'none';
    
    logAction('✨ Simulation reset to initial state');
}

/**
 * Reset bread visuals to initial state
 */
function resetBreadVisuals() {
    // Initialize standard DOM patches
    initMouldPatches();
    
    // Reset bread appearance
    document.querySelector('#breadA .bread-base').classList.remove('toasted');
    document.querySelector('#breadB .bread-base').classList.remove('toasted');
    
    // Reset score UI
    if(document.getElementById('scoreA')) document.getElementById('scoreA').textContent = '0';
    if(document.getElementById('descA')) document.getElementById('descA').textContent = 'None';
    if(document.getElementById('scoreB')) document.getElementById('scoreB').textContent = '0';
    if(document.getElementById('descB')) document.getElementById('descB').textContent = 'None';
}

/**
 * Show tooltip with header information
 */
function showTooltip() {
    const tooltip = document.getElementById('headerTooltip');
    tooltip.classList.add('show');
    logAction('ℹ️ Info tooltip opened');
}

/**
 * Close tooltip
 */
function closeTooltip() {
    const tooltip = document.getElementById('headerTooltip');
    tooltip.classList.remove('show');
}

/**
 * Toggle analytics panel
 */
function toggleAnalytics() {
    const content = document.getElementById('analyticsContent');
    const icon = document.getElementById('toggleIcon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.classList.remove('rotated');
    } else {
        content.classList.add('expanded');
        icon.classList.add('rotated');
    }
}

/**
 * Clear analytics log
 */
function clearAnalytics() {
    const log = document.getElementById('analyticsLog');
    log.innerHTML = '<div class="log-entry"><span class="timestamp">t=0s</span><span class="action">🎬 Simulation started</span></div>';
    startTime = Date.now();
    logAction('🗑️ Analytics log cleared');
}

/**
 * Log an action to the analytics panel
 */
function logAction(actionText) {
    const log = document.getElementById('analyticsLog');
    const timestamp = Math.floor((Date.now() - startTime) / 1000);
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span class="timestamp">t=${timestamp}s</span>
        <span class="action">${actionText}</span>
    `;
    
    log.appendChild(entry);
    
    // Auto-scroll to bottom
    log.scrollTop = log.scrollHeight;
}

/**
 * Start screen recording
 */
async function startRecording() {
    try {
        // Request screen capture
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' },
            audio: false
        });
        
        // Create media recorder
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });
        
        recordedChunks = [];
        
        // Handle data available event
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        // Handle stop event
        mediaRecorder.onstop = () => {
            stream.getTracks().forEach(track => track.stop());
            document.getElementById('downloadRecBtn').style.display = 'inline-block';
            document.getElementById('recordingStatus').textContent = '';
        };
        
        // Start recording
        mediaRecorder.start();
        isRecording = true;
        
        // Update UI
        document.getElementById('startRecBtn').style.display = 'none';
        document.getElementById('stopRecBtn').style.display = 'inline-block';
        document.getElementById('recordingStatus').textContent = '🔴 Recording...';
        
        logAction('🎥 Screen recording started');
        
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Could not start recording. Please make sure you granted screen capture permission.');
        logAction('❌ Screen recording failed to start');
    }
}

/**
 * Stop screen recording
 */
function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        // Update UI
        document.getElementById('startRecBtn').style.display = 'inline-block';
        document.getElementById('stopRecBtn').style.display = 'none';
        
        logAction('⏹️ Screen recording stopped');
    }
}

/**
 * Download the recorded video
 */
function downloadRecording() {
    if (recordedChunks.length === 0) {
        alert('No recording available to download.');
        return;
    }
    
    // Create blob from recorded chunks
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mould-experiment-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    logAction('⬇️ Recording downloaded');
    
    // Hide download button after download
    document.getElementById('downloadRecBtn').style.display = 'none';
}