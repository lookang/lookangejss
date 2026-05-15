// Game state management
let gameState = {
    currentLevel: 1,
    totalLevels: 5,
    score: 0,
    decisions: [],
    knowledgeGained: []
};

// Updated game scenarios with Singapore-specific content and local context
const scenarios = {
    1: {
        icon: "🏢",
        title: "Singapore's Economic Security Challenge",
        story: "Singapore's economy heavily depends on global trade through its port and financial services. China, one of Singapore's largest trading partners, is implementing new trade restrictions that could affect Jurong Port operations and reduce cargo volume by 30%. The Maritime and Port Authority (MPA) reports potential job losses in logistics. How should Singapore respond?",
        decisions: [
            {
                text: "Activate Economic Development Board (EDB) to diversify trade partnerships with India, ASEAN, and EU markets",
                outcome: "Excellent strategy! Singapore successfully reduces dependency by strengthening ties with multiple partners, maintaining its position as Asia's trading hub.",
                knowledge: "Singapore's economic security relies on diversification - the EDB actively develops multiple trade relationships to ensure port and financial sector resilience.",
                points: 20
            },
            {
                text: "Deploy Ministry of Foreign Affairs (MFA) for direct diplomatic engagement with Beijing",
                outcome: "Smart diplomatic move! Singapore's neutral foreign policy and strong bilateral relations help resolve the trade dispute through dialogue.",
                knowledge: "Singapore's diplomatic approach emphasizes dialogue and mutual benefit, leveraging its reputation as a trusted neutral party in regional disputes.",
                points: 18
            },
            {
                text: "Implement immediate counter-tariffs through Singapore Customs",
                outcome: "This could escalate tensions and harm Singapore's reputation as a free trade advocate. Small states benefit more from diplomacy than trade wars.",
                knowledge: "As a small open economy, Singapore typically avoids protectionist measures that could damage its free trade reputation and invite retaliation.",
                points: 10
            }
        ]
    },
    2: {
        icon: "🔒",
        title: "Smart Nation Cybersecurity Crisis",
        story: "Singapore's Smart Nation initiative faces a major cyber attack targeting critical infrastructure. Hackers have infiltrated the national water management system (PUB), traffic control systems (LTA), and are threatening to disrupt MRT operations during peak hours. The Cyber Security Agency (CSA) reports this could affect 2 million daily commuters. What's the priority response?",
        decisions: [
            {
                text: "Activate CSA's national cybersecurity framework and enhance SingCERT incident response capabilities",
                outcome: "Excellent response! Singapore's robust cybersecurity infrastructure and trained personnel quickly contain the threat and restore services.",
                knowledge: "Singapore's cybersecurity strategy combines advanced technology with skilled professionals through CSA, SingCERT, and continuous capability building.",
                points: 20
            },
            {
                text: "Strengthen cooperation with international partners through ASEAN Cybersecurity Centre and Five Eyes intelligence sharing",
                outcome: "Great thinking! Cyber threats are borderless - Singapore's international partnerships provide crucial intelligence and coordinated response capabilities.",
                knowledge: "Singapore actively participates in regional and global cybersecurity cooperation, recognizing that cyber threats require collective defense.",
                points: 18
            },
            {
                text: "Temporarily shut down Smart Nation systems to prevent further infiltration",
                outcome: "This would cripple Singapore's digital economy and daily life. The cure would be worse than the disease for a Smart Nation.",
                knowledge: "Over-restriction of digital systems would undermine Singapore's competitive advantage as a Smart Nation and digital hub.",
                points: 8
            }
        ]
    },
    3: {
        icon: "💧",
        title: "Water Security and Climate Adaptation",
        story: "Rising sea levels threaten Singapore's coastline, while changing rainfall patterns affect water catchment in local reservoirs. PUB reports that Linggiu Reservoir water supply from Malaysia may be reduced due to drought. With Singapore's 'Four Taps' water strategy under pressure, and the Marina Barrage facing potential flooding, immediate action is needed to secure water independence by 2061.",
        decisions: [
            {
                text: "Accelerate NEWater expansion and invest in advanced desalination plants at Tuas and Changi",
                outcome: "Forward-thinking! Singapore's investment in water technology ensures long-term water security and reduces dependency on external sources.",
                knowledge: "Singapore's water security strategy emphasizes technological innovation and self-reliance through NEWater, desalination, and water recycling.",
                points: 20
            },
            {
                text: "Lead ASEAN regional water cooperation initiatives and climate adaptation programs",
                outcome: "Excellent leadership! Water security is a regional challenge requiring cooperation on transboundary water management and climate resilience.",
                knowledge: "Singapore recognizes that water security and climate adaptation require regional cooperation and knowledge sharing with ASEAN partners.",
                points: 18
            },
            {
                text: "Focus resources only on immediate economic priorities and delay water infrastructure investments",
                outcome: "Dangerous short-term thinking! Water security is fundamental to Singapore's survival and economic stability - delays could be catastrophic.",
                knowledge: "For Singapore, water security is an existential issue that cannot be compromised for short-term economic gains.",
                points: 5
            }
        ]
    },
    4: {
        icon: "🤝",
        title: "Racial Harmony and Social Cohesion Challenge",
        story: "Singapore faces increasing social tensions as global migration brings cultural changes to HDB heartlands. Online hate speech targeting different ethnic communities is rising, and there are concerns about foreign workers in dormitories. The Ethnic Integration Policy (EIP) in housing is being questioned, while some residents worry about preserving Singapore's unique multicultural identity. How should social harmony be maintained?",
        decisions: [
            {
                text: "Strengthen Inter-Racial and Religious Confidence Circles (IRCCs) and promote integration through community programs in void decks and community centers",
                outcome: "Excellent approach! Singapore's grassroots integration programs and IRCC networks help build understanding across communities while preserving harmony.",
                knowledge: "Singapore's social cohesion relies on active community engagement, grassroots programs, and institutional frameworks like IRCCs to maintain racial harmony.",
                points: 20
            },
            {
                text: "Enhance National Education programs in schools and expand SkillsFuture courses on cultural competency",
                outcome: "Great strategy! Education and skills development help Singaporeans understand diversity while building shared national identity and values.",
                knowledge: "Singapore uses education and lifelong learning to build social cohesion, ensuring all residents understand and appreciate the nation's multicultural heritage.",
                points: 18
            },
            {
                text: "Restrict foreign worker quotas and limit new permanent resident applications",
                outcome: "This could harm Singapore's economic competitiveness and contradict its open, multicultural values. Balance is needed, not isolation.",
                knowledge: "Over-restriction of immigration could undermine Singapore's economic dynamism and multicultural character that are key to its success.",
                points: 10
            }
        ]
    },
    5: {
        icon: "🌏",
        title: "ASEAN Diplomacy and Regional Security",
        story: "Tensions are rising in the South China Sea as major powers compete for influence in Southeast Asia. Singapore must navigate between US and Chinese interests while maintaining ASEAN unity. The upcoming ASEAN Summit in Singapore faces pressure as member states have different positions on regional security. Singapore's role as ASEAN coordinator and its strategic location at the Strait of Malacca make its diplomatic position crucial.",
        decisions: [
            {
                text: "Maintain Singapore's principled neutrality while strengthening ASEAN centrality and multilateral institutions",
                outcome: "Wise strategy! Singapore's neutral stance and commitment to ASEAN centrality allows it to bridge differences and maintain regional stability.",
                knowledge: "Singapore's foreign policy emphasizes neutrality, multilateralism, and ASEAN centrality to navigate great power competition while preserving sovereignty.",
                points: 20
            },
            {
                text: "Enhance ASEAN Plus mechanisms and strengthen the ASEAN Regional Forum (ARF) for conflict prevention",
                outcome: "Excellent! Singapore's leadership in multilateral institutions provides frameworks for dialogue and peaceful resolution of regional tensions.",
                knowledge: "Singapore believes in strengthening multilateral institutions and dialogue mechanisms to manage regional security challenges peacefully.",
                points: 18
            },
            {
                text: "Align Singapore closely with the strongest regional power to ensure security",
                outcome: "Risky strategy! Over-alignment could compromise Singapore's independence and effectiveness as an ASEAN mediator and neutral hub.",
                knowledge: "Over-dependence on any single power could limit Singapore's diplomatic flexibility and undermine its role as a trusted neutral party.",
                points: 12
            }
        ]
    }
};

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

// Initialize game state and display first scenario
function initializeGame() {
    gameState = {
        currentLevel: 1,
        totalLevels: 5,
        score: 0,
        decisions: [],
        knowledgeGained: []
    };
    
    updateProgress();
    displayScenario(1);
}

// Set up event listeners for interactive elements
function setupEventListeners() {
    // Add hover effects for tooltips
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Display current scenario content
function displayScenario(level) {
    const scenario = scenarios[level];
    if (!scenario) return;
    
    // Update scenario display
    document.getElementById('scenarioIcon').textContent = scenario.icon;
    document.getElementById('storyText').textContent = scenario.story;
    
    // Create decision buttons
    const decisionPanel = document.getElementById('decisionPanel');
    decisionPanel.innerHTML = '';
    
    scenario.decisions.forEach((decision, index) => {
        const button = document.createElement('button');
        button.className = 'decision-btn';
        button.textContent = decision.text;
        button.onclick = () => makeDecision(index);
        decisionPanel.appendChild(button);
    });
    
    // Update navigation
    document.getElementById('backBtn').disabled = level === 1;
}

// Handle decision making
function makeDecision(decisionIndex) {
    const currentScenario = scenarios[gameState.currentLevel];
    const decision = currentScenario.decisions[decisionIndex];
    
    // Store decision and update score
    gameState.decisions.push({
        level: gameState.currentLevel,
        decision: decisionIndex,
        points: decision.points,
        scenarioTitle: currentScenario.title // Modified: Added scenario title for breakdown
    });
    gameState.score += decision.points;
    gameState.knowledgeGained.push(decision.knowledge);
    
    // Modified: Only show celebration for good answers (points >= 15)
    if (decision.points >= 15) {
        showCelebration(decision.outcome, decision.knowledge);
    } else {
        // For poor answers, just show the knowledge discovery without celebration
        showKnowledgeDiscovery(decision.knowledge);
    }
    
    // Disable decision buttons
    document.querySelectorAll('.decision-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Progress to next level after showing feedback
    setTimeout(() => {
        hideCelebration();
        if (gameState.currentLevel < gameState.totalLevels) {
            gameState.currentLevel++;
            updateProgress();
            displayScenario(gameState.currentLevel);
        } else {
            showSummary();
        }
    }, 3000);
}

// Show celebration overlay with outcome (only for good answers)
function showCelebration(outcome, knowledge) {
    const overlay = document.getElementById('celebrationOverlay');
    const celebrationText = document.getElementById('celebrationText');
    const celebrationDetail = document.getElementById('celebrationDetail');
    
    celebrationText.textContent = "Great Decision!";
    celebrationDetail.textContent = outcome;
    
    overlay.classList.remove('hidden');
    
    // Show knowledge discovery after celebration
    setTimeout(() => {
        showKnowledgeDiscovery(knowledge);
    }, 1500);
}

// Hide celebration overlay
function hideCelebration() {
    document.getElementById('celebrationOverlay').classList.add('hidden');
}

// Show knowledge discovery panel
function showKnowledgeDiscovery(knowledge) {
    const infoPanel = document.getElementById('infoPanel');
    const infoText = document.getElementById('infoText');
    
    infoText.textContent = knowledge;
    infoPanel.classList.remove('hidden');
}

// Close information panel
function closeInfo() {
    document.getElementById('infoPanel').classList.add('hidden');
}

// Update progress bar and text
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = (gameState.currentLevel / gameState.totalLevels) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `Level ${gameState.currentLevel} of ${gameState.totalLevels}`;
}

// Modified: Enhanced summary display with detailed score breakdown
function showSummary() {
    const summaryPage = document.getElementById('summaryPage');
    const scenariosCompleted = document.getElementById('scenariosCompleted');
    const knowledgeGained = document.getElementById('knowledgeGained');
    const totalScore = document.getElementById('totalScore');
    const scoreDetails = document.getElementById('scoreDetails');
    
    // Calculate and display basic stats
    scenariosCompleted.textContent = `${gameState.totalLevels}/${gameState.totalLevels}`;
    const knowledgePercentage = Math.round((gameState.score / (gameState.totalLevels * 20)) * 100);
    knowledgeGained.textContent = `${knowledgePercentage}%`;
    totalScore.textContent = `${gameState.score}/100`;
    
    // Modified: Create detailed score breakdown
    scoreDetails.innerHTML = '';
    
    gameState.decisions.forEach((decision, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        
        // Determine score class based on points
        let scoreClass = 'score-poor';
        if (decision.points >= 18) scoreClass = 'score-excellent';
        else if (decision.points >= 15) scoreClass = 'score-good';
        
        scoreItem.innerHTML = `
            <span class="scenario-name">Level ${decision.level}: ${getScenarioShortTitle(decision.level)}</span>
            <span class="score-points ${scoreClass}">${decision.points}/20 points</span>
        `;
        
        scoreDetails.appendChild(scoreItem);
    });
    
    // Add total score row
    const totalItem = document.createElement('div');
    totalItem.className = 'score-item';
    totalItem.style.borderTop = '2px solid rgba(255, 255, 255, 0.3)';
    totalItem.style.fontWeight = 'bold';
    totalItem.style.marginTop = '8px';
    totalItem.style.paddingTop = '12px';
    
    totalItem.innerHTML = `
        <span class="scenario-name">Total Security Score:</span>
        <span class="score-points">${gameState.score}/100 points (${knowledgePercentage}%)</span>
    `;
    
    scoreDetails.appendChild(totalItem);
    
    summaryPage.classList.remove('hidden');
}

// Modified: Helper function to get short scenario titles for breakdown
function getScenarioShortTitle(level) {
    const shortTitles = {
        1: "Economic Security",
        2: "Cybersecurity Crisis", 
        3: "Water Security",
        4: "Social Cohesion",
        5: "Regional Diplomacy"
    };
    return shortTitles[level] || `Scenario ${level}`;
}

// Navigation functions
function goBack() {
    if (gameState.currentLevel > 1) {
        gameState.currentLevel--;
        updateProgress();
        displayScenario(gameState.currentLevel);
    }
}

// Updated hints with Singapore-specific context
function showHint() {
    const currentScenario = scenarios[gameState.currentLevel];
    let hint = "";
    
    switch(gameState.currentLevel) {
        case 1:
            hint = "Think about how Singapore's EDB and MFA work together to maintain economic resilience through diversification and diplomacy, avoiding trade wars that could hurt a small open economy.";
            break;
        case 2:
            hint = "Consider Singapore's Smart Nation strategy - how does CSA balance advanced cybersecurity technology with international cooperation to protect critical infrastructure?";
            break;
        case 3:
            hint = "Water security is existential for Singapore. Think about the 'Four Taps' strategy and how technology like NEWater and desalination ensure independence by 2061.";
            break;
        case 4:
            hint = "Singapore's success depends on racial harmony. Consider how IRCCs, community programs, and education maintain social cohesion while embracing diversity.";
            break;
        case 5:
            hint = "As an ASEAN member and neutral hub, how does Singapore navigate great power competition while maintaining regional stability and sovereignty?";
            break;
        default:
            hint = "Consider how Singapore's unique position as a small island nation influences its approach to security challenges.";
    }
    
    showKnowledgeDiscovery(hint);
}

// Reset game to beginning
function resetGame() {
    // Hide summary and info panels
    document.getElementById('summaryPage').classList.add('hidden');
    document.getElementById('infoPanel').classList.add('hidden');
    document.getElementById('celebrationOverlay').classList.add('hidden');
    
    // Reset game state
    initializeGame();
}

// Tooltip functionality
function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    const title = event.target.getAttribute('title');
    
    if (title) {
        tooltip.textContent = title;
        tooltip.classList.remove('hidden');
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Remove title to prevent browser tooltip
        event.target.setAttribute('data-title', title);
        event.target.removeAttribute('title');
    }
}

function hideTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('hidden');
    
    // Restore title attribute
    const title = event.target.getAttribute('data-title');
    if (title) {
        event.target.setAttribute('title', title);
        event.target.removeAttribute('data-title');
    }
}

// Add touch support for mobile devices
document.addEventListener('touchstart', function(event) {
    // Handle touch interactions for better mobile experience
    if (event.target.classList.contains('decision-btn') || 
        event.target.classList.contains('nav-btn')) {
        event.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(event) {
    // Reset touch effects
    if (event.target.classList.contains('decision-btn') || 
        event.target.classList.contains('nav-btn')) {
        setTimeout(() => {
            event.target.style.transform = '';
        }, 150);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '1':
        case '2':
        case '3':
            const decisionBtns = document.querySelectorAll('.decision-btn:not(:disabled)');
            const index = parseInt(event.key) - 1;
            if (decisionBtns[index]) {
                decisionBtns[index].click();
            }
            break;
        case 'h':
        case 'H':
            showHint();
            break;
        case 'r':
        case 'R':
            if (event.ctrlKey) {
                event.preventDefault();
                resetGame();
            }
            break;
    }
});