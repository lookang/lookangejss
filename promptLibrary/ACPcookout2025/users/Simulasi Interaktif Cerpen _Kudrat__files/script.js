// Global variables for simulation state
let currentPanel = 'character';
let selectedCharacter = null;
let dialogProgress = {};
let relationshipData = [];
let adviceCollection = [];
let totalProgress = 0;

// Character data with dialog trees and personality traits
const characters = {
    kudrat: {
        name: 'Kudrat',
        emoji: '🐸',
        personality: 'Rendah diri, mendambakan perubahan',
        thoughts: 'Mengapa aku tidak boleh mempunyai sayap seperti burung?',
        dialogs: [
            {
                text: 'Aku sentiasa bermimpi untuk terbang tinggi seperti burung. Adakah itu salah?',
                options: [
                    { text: 'Tidak salah untuk bermimpi, tetapi kau sudah istimewa sebagai katak', response: 'advice1' },
                    { text: 'Mengapa kau tidak bersyukur dengan apa yang ada?', response: 'defensive' },
                    { text: 'Ceritakan lebih lanjut tentang impian kau', response: 'explore' }
                ]
            }
        ]
    },
    karong: {
        name: 'Karong',
        emoji: '🐸',
        personality: 'Penyokong, bijaksana, empati tinggi',
        thoughts: 'Kudrat perlu belajar menghargai dirinya sendiri',
        dialogs: [
            {
                text: 'Kudrat, kau tidak perlu sayap untuk menjadi istimewa. Lihat betapa pandainya kau melompat dan berenang!',
                options: [
                    { text: 'Betul, setiap haiwan ada kelebihan masing-masing', response: 'agree' },
                    { text: 'Tetapi Kudrat mahukan sesuatu yang berbeza', response: 'understand' },
                    { text: 'Bagaimana kita boleh membantu Kudrat?', response: 'help' }
                ]
            }
        ]
    },
    monyet: {
        name: 'Monyet',
        emoji: '🐒',
        personality: 'Suka mengejek, kurang empati',
        thoughts: 'Katak yang pelik, selalu bermimpi bukan-bukan',
        dialogs: [
            {
                text: 'Haha! Katak nak terbang? Kau patut puas hati jadi katak biasa sahaja!',
                options: [
                    { text: 'Jangan ejek Kudrat, setiap orang boleh bermimpi', response: 'defend' },
                    { text: 'Mengapa kau suka mengejek orang lain?', response: 'confront' },
                    { text: 'Adakah kau pernah ada impian yang diejek orang?', response: 'reflect' }
                ]
            }
        ]
    },
    ibu: {
        name: 'Ibu Kudrat',
        emoji: '🐸',
        personality: 'Penyayang, pelindung, memahami',
        thoughts: 'Anakku, aku faham perasaanmu tetapi kau sudah sempurna',
        dialogs: [
            {
                text: 'Anakku, ibu faham kau rasa berbeza. Tetapi ingat, Allah ciptakan kita dengan sempurna.',
                options: [
                    { text: 'Nasihat ibu sangat bermakna untuk Kudrat', response: 'appreciate' },
                    { text: 'Bagaimana ibu membantu Kudrat menerima dirinya?', response: 'guidance' },
                    { text: 'Adakah ibu pernah rasa seperti Kudrat?', response: 'relate' }
                ]
            }
        ]
    },
    bapa: {
        name: 'Bapa Kudrat',
        emoji: '🐸',
        personality: 'Bijaksana, tegas tetapi penyayang',
        thoughts: 'Kudrat mesti belajar bahawa kekuatan sebenar datang dari dalam',
        dialogs: [
            {
                text: 'Kudrat, kekuatan sebenar bukan dari sayap, tetapi dari hati yang berani dan jiwa yang kuat.',
                options: [
                    { text: 'Kata-kata bapa sangat dalam maknanya', response: 'wisdom' },
                    { text: 'Bagaimana Kudrat boleh mencari kekuatan dalaman?', response: 'method' },
                    { text: 'Apakah contoh kekuatan yang bapa maksudkan?', response: 'example' }
                ]
            }
        ]
    },
    ketua: {
        name: 'Ketua Kampung',
        emoji: '🐘',
        personality: 'Berwibawa, adil, berpengalaman',
        thoughts: 'Setiap ahli komuniti punya peranan penting',
        dialogs: [
            {
                text: 'Dalam komuniti kita, setiap haiwan mempunyai peranan unik. Katak seperti Kudrat penting untuk keseimbangan alam.',
                options: [
                    { text: 'Betul, setiap makhluk ada fungsi dalam ekosistem', response: 'ecosystem' },
                    { text: 'Bagaimana Kudrat boleh menyumbang kepada komuniti?', response: 'contribute' },
                    { text: 'Apakah nasihat ketua untuk Kudrat?', response: 'leadership' }
                ]
            }
        ]
    }
};

// Decision scenarios with outcomes
const decisionScenarios = [
    {
        question: 'Kudrat memutuskan untuk...',
        options: [
            {
                text: 'Menerima dirinya dan fokus mengembangkan bakat semula jadi',
                outcome: 'Kudrat belajar menghargai kemampuan melompat dan berenangnya. Dia menjadi lebih yakin dan membantu katak-katak muda lain.',
                moral: 'Penerimaan diri membawa kepada kebahagiaan hakiki'
            },
            {
                text: 'Terus bermimpi tetapi juga bersyukur dengan apa yang ada',
                outcome: 'Kudrat menyeimbangkan impian dengan realiti. Dia tetap bermimpi tetapi tidak lagi merasa rendah diri.',
                moral: 'Bermimpi itu baik, tetapi bersyukur lebih penting'
            },
            {
                text: 'Mencari cara untuk membantu burung-burung sebagai rakan kerja',
                outcome: 'Kudrat membina persahabatan dengan burung dan membantu mereka mencari makanan di kolam. Dia rasa berguna.',
                moral: 'Kerjasama membawa kepada pencapaian yang bermakna'
            }
        ]
    }
];

// Initialize the simulation
document.addEventListener('DOMContentLoaded', function() {
    initializeSimulation();
    setupEventListeners();
    showPanel('character');
});

// Initialize simulation components
function initializeSimulation() {
    // Initialize dialog progress tracking
    Object.keys(characters).forEach(char => {
        dialogProgress[char] = 0;
    });
    
    // Setup character cards with click handlers
    setupCharacterCards();
    
    // Initialize tooltip system
    setupTooltips();
    
    console.log('Simulasi Kudrat initialized successfully');
}

// Setup character card interactions
function setupCharacterCards() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            const characterId = this.dataset.character;
            selectCharacter(characterId);
        });
        
        // Add hover effects with character info
        card.addEventListener('mouseenter', function() {
            const characterId = this.dataset.character;
            const character = characters[characterId];
            showTooltip(this, `${character.personality}\n"${character.thoughts}"`);
        });
        
        card.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Character selection and dialog initiation
function selectCharacter(characterId) {
    selectedCharacter = characterId;
    const character = characters[characterId];
    
    // Update current character display
    const characterDisplay = document.getElementById('currentCharacterDisplay');
    const thoughtBubble = document.getElementById('thoughtBubble');
    
    characterDisplay.textContent = character.emoji;
    thoughtBubble.textContent = character.thoughts;
    
    // Load character dialog
    loadCharacterDialog(characterId);
    
    // Switch to dialog panel
    showPanel('dialog');
    
    // Update progress
    updateProgress();
    
    console.log(`Selected character: ${character.name}`);
}

// Load and display character dialog
function loadCharacterDialog(characterId) {
    const character = characters[characterId];
    const currentDialog = character.dialogs[dialogProgress[characterId]] || character.dialogs[0];
    
    const dialogText = document.getElementById('dialogText');
    const dialogOptions = document.getElementById('dialogOptions');
    
    // Display dialog text
    dialogText.textContent = currentDialog.text;
    
    // Clear previous options
    dialogOptions.innerHTML = '';
    
    // Create dialog options
    currentDialog.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'dialog-option';
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => handleDialogResponse(characterId, option, index));
        dialogOptions.appendChild(optionElement);
    });
}

// Handle dialog responses and collect advice
function handleDialogResponse(characterId, option, optionIndex) {
    const character = characters[characterId];
    
    // Add to advice collection
    const advice = {
        character: character.name,
        advice: option.text,
        context: option.response
    };
    
    adviceCollection.push(advice);
    updateNotebook();
    
    // Provide feedback based on response
    const dialogText = document.getElementById('dialogText');
    let feedback = generateFeedback(characterId, option.response);
    
    dialogText.innerHTML = `<strong>Respons anda:</strong> "${option.text}"<br><br><strong>${character.name}:</strong> ${feedback}`;
    
    // Clear options and show continue button
    const dialogOptions = document.getElementById('dialogOptions');
    dialogOptions.innerHTML = `
        <button class="dialog-option" onclick="returnToCharacterHub()">
            Kembali ke Hub Watak
        </button>
    `;
    
    // Update progress
    dialogProgress[characterId]++;
    updateProgress();
    
    console.log(`Dialog response recorded for ${character.name}`);
}

// Generate contextual feedback based on character and response type
function generateFeedback(characterId, responseType) {
    const feedbackMap = {
        kudrat: {
            advice1: 'Terima kasih... mungkin kau betul. Aku perlu belajar menghargai diri sendiri.',
            defensive: 'Aku tahu aku patut bersyukur, tetapi perasaan ini sukar untuk dikawal.',
            explore: 'Aku selalu lihat burung terbang bebas. Aku nak rasa kebebasan itu juga.'
        },
        karong: {
            agree: 'Betul sekali! Kita semua istimewa dengan cara kita sendiri.',
            understand: 'Aku faham perasaan Kudrat. Kita kena sabar membimbingnya.',
            help: 'Kita boleh tunjukkan kepada Kudrat betapa hebatnya dia sebagai katak.'
        },
        monyet: {
            defend: 'Hmph... korang terlalu lembut dengan dia.',
            confront: 'Aku cuma cakap kebenaran. Katak ya katak lah!',
            reflect: 'Eh... aku tak pernah fikir macam tu. Mungkin aku salah...'
        },
        ibu: {
            appreciate: 'Ibu akan sentiasa sayang Kudrat apa pun yang berlaku.',
            guidance: 'Ibu akan tunjukkan kepada Kudrat semua perkara hebat yang dia boleh buat.',
            relate: 'Ibu pun pernah rasa tidak cukup baik, tetapi ibu belajar bersyukur.'
        },
        bapa: {
            wisdom: 'Bapa harap Kudrat akan faham maksud bapa suatu hari nanti.',
            method: 'Melalui cabaran dan dengan menerima diri sendiri sepenuhnya.',
            example: 'Seperti bagaimana katak boleh hidup di darat dan air - itu kelebihan unik!'
        },
        ketua: {
            ecosystem: 'Tepat sekali. Setiap makhluk ada tempat dalam rancangan alam.',
            contribute: 'Kudrat boleh membantu menjaga kebersihan kolam dan memakan serangga perosak.',
            leadership: 'Kudrat perlu belajar memimpin dengan teladan, bukan dengan sayap.'
        }
    };
    
    return feedbackMap[characterId]?.[responseType] || 'Terima kasih atas pandangan anda.';
}

// Return to character selection hub
function returnToCharacterHub() {
    showPanel('character');
}

// Update digital notebook with collected advice
function updateNotebook() {
    const adviceList = document.getElementById('adviceList');
    adviceList.innerHTML = '';
    
    adviceCollection.forEach((advice, index) => {
        const adviceItem = document.createElement('div');
        adviceItem.className = 'advice-item';
        adviceItem.innerHTML = `
            <strong>${advice.character}:</strong> ${advice.advice}
        `;
        adviceList.appendChild(adviceItem);
    });
}

// Panel navigation system
function showPanel(panelName) {
    // Hide all panels
    const panels = ['characterHub', 'dialogPanel', 'relationshipPanel', 'notebookPanel', 'decisionPanel'];
    panels.forEach(panel => {
        document.getElementById(panel).style.display = 'none';
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected panel
    let targetPanel, targetButton;
    switch(panelName) {
        case 'character':
            targetPanel = 'characterHub';
            targetButton = 0;
            break;
        case 'dialog':
            targetPanel = 'dialogPanel';
            targetButton = 0;
            break;
        case 'relationship':
            targetPanel = 'relationshipPanel';
            targetButton = 1;
            initializeRelationshipCanvas();
            break;
        case 'notebook':
            targetPanel = 'notebookPanel';
            targetButton = 2;
            break;
        case 'decision':
            targetPanel = 'decisionPanel';
            targetButton = 3;
            loadDecisionScenarios();
            break;
    }
    
    if (targetPanel) {
        document.getElementById(targetPanel).style.display = 'block';
        document.querySelectorAll('.nav-btn')[targetButton].classList.add('active');
    }
    
    currentPanel = panelName;
    console.log(`Switched to panel: ${panelName}`);
}

// Initialize relationship mapping canvas
function initializeRelationshipCanvas() {
    const canvas = document.getElementById('relationshipCanvas');
    canvas.innerHTML = '<div class="canvas-instructions">Seret watak untuk membina peta hubungan</div>';
    
    // Add draggable character elements
    Object.keys(characters).forEach(charId => {
        const character = characters[charId];
        const charElement = document.createElement('div');
        charElement.className = 'relationship-character';
        charElement.innerHTML = `
            <div class="char-avatar">${character.emoji}</div>
            <div class="char-name">${character.name}</div>
        `;
        charElement.style.cssText = `
            position: absolute;
            top: ${Math.random() * 60 + 10}%;
            left: ${Math.random() * 60 + 10}%;
            background: white;
            padding: 8px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            cursor: move;
            text-align: center;
            min-width: 60px;
        `;
        
        // Make draggable
        makeDraggable(charElement);
        canvas.appendChild(charElement);
    });
}

// Make elements draggable for relationship mapping
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
        isDragging = true;
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        
        startX = clientX;
        startY = clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', stopDrag);
        
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        element.style.left = (initialX + deltaX) + 'px';
        element.style.top = (initialY + deltaY) + 'px';
        
        e.preventDefault();
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }
}

// Load decision making scenarios
function loadDecisionScenarios() {
    const decisionOptions = document.getElementById('decisionOptions');
    const scenario = decisionScenarios[0]; // Use first scenario
    
    decisionOptions.innerHTML = '';
    
    scenario.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'decision-option';
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => makeDecision(option, index));
        decisionOptions.appendChild(optionElement);
    });
}

// Handle decision making
function makeDecision(option, index) {
    const decisionResult = document.getElementById('decisionResult');
    
    decisionResult.innerHTML = `
        <h3>Keputusan Anda:</h3>
        <p><strong>${option.text}</strong></p>
        <h4>Hasil:</h4>
        <p>${option.outcome}</p>
        <h4>Nilai Moral:</h4>
        <p><em>${option.moral}</em></p>
    `;
    
    decisionResult.style.display = 'block';
    
    // Update progress to completion
    totalProgress = 100;
    updateProgress();
    
    console.log(`Decision made: ${option.text}`);
}

// Progress tracking system
function updateProgress() {
    const completedDialogs = Object.values(dialogProgress).reduce((sum, val) => sum + val, 0);
    const totalPossibleDialogs = Object.keys(characters).length;
    const adviceProgress = Math.min(adviceCollection.length * 10, 50);
    
    totalProgress = Math.min(
        (completedDialogs / totalPossibleDialogs) * 50 + adviceProgress,
        100
    );
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = totalProgress + '%';
    progressText.textContent = `Kemajuan: ${Math.round(totalProgress)}%`;
}

// Tooltip system for contextual help
function setupTooltips() {
    const tooltip = document.getElementById('tooltip');
    
    // Add tooltip to navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                showTooltip(this, title);
            }
        });
        
        btn.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(element, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.opacity = '1';
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = '0';
}

// Utility functions for relationship canvas
function addRelationshipLine() {
    // Simple implementation - in a full version, this would allow drawing connections
    alert('Klik dan seret antara watak untuk membuat hubungan. Gunakan label untuk menerangkan jenis hubungan.');
}

function clearCanvas() {
    initializeRelationshipCanvas();
}

// Event listeners setup
function setupEventListeners() {
    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        // Adjust layout if needed
        console.log('Window resized, adjusting layout');
    });
    
    // Handle personal reflection textarea
    const reflectionTextarea = document.getElementById('personalReflection');
    if (reflectionTextarea) {
        reflectionTextarea.addEventListener('input', function() {
            // Auto-save reflection (in a full implementation)
            console.log('Personal reflection updated');
        });
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            showPanel('character');
        }
    });
}

// Audio narration system (placeholder for future implementation)
function playNarration(characterId, text) {
    // In a full implementation, this would use Web Speech API or audio files
    console.log(`Playing narration for ${characterId}: ${text}`);
}

// Assessment and rubric system (placeholder)
function generateAssessment() {
    const assessment = {
        themeUnderstanding: calculateThemeScore(),
        characterDevelopment: calculateCharacterScore(),
        relationshipAnalysis: calculateRelationshipScore(),
        decisionMaking: calculateDecisionScore(),
        moralValues: calculateMoralScore()
    };
    
    console.log('Assessment generated:', assessment);
    return assessment;
}

function calculateThemeScore() {
    // Based on dialog interactions and advice collection
    return Math.min(adviceCollection.length * 20, 100);
}

function calculateCharacterScore() {
    // Based on number of characters interacted with
    const interactedCharacters = Object.values(dialogProgress).filter(val => val > 0).length;
    return (interactedCharacters / Object.keys(characters).length) * 100;
}

function calculateRelationshipScore() {
    // Based on relationship mapping activity
    return 75; // Placeholder
}

function calculateDecisionScore() {
    // Based on decision making completion
    return totalProgress >= 100 ? 100 : 50;
}

function calculateMoralScore() {
    // Based on reflection and decision quality
    const reflection = document.getElementById('personalReflection').value;
    return reflection.length > 50 ? 90 : 60;
}

console.log('Kudrat Interactive Story Simulation loaded successfully');