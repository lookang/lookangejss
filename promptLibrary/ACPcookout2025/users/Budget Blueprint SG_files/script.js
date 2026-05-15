// Budget Blueprint SG - Interactive Game
// Educational simulation about Singapore National Budget management

// Flag to prevent duplicate initGame calls from the intro modal
let gameInitialized = false;

// Game State - Central data store for all game variables
let gameState = {
    round: 1,
    funds: 10,
    manpower: 0,
    nwp: 0,
    workersAvailable: 3,
    sectorsFilled: [],
    activePriorities: [],
    globalEvent: null,
    globalEventDeck: [],
    priorityDeck: [],
    // Added: Track game decisions for summary
    gameHistory: {
        fundedProjects: [], // Track all funded projects
        sectorDeployments: {}, // Track deployments per sector
        totalFundsSpent: 0,
        totalManpowerUsed: 0,
        totalNWPGained: 0
    }
};

// National Sectors Data - Where ministry teams can be deployed
const allSectors = {
    'moh': { name: 'Ministry of Health (MOH)', reward: { funds: 3 } },
    'mindef': { name: 'Ministry of Defence (MINDEF)', reward: { manpower: 1 } },
    'mti': { name: 'Ministry of Trade & Industry (MTI)', reward: { funds: 5 } },
    'msf': { name: 'Ministry of Social & Family Dev (MSF)', reward: { funds: 2 } },
    'mse': { name: 'Ministry of Sustainability (MSE)', reward: { funds: 2 } },
    'moe': { name: 'Ministry of Education (MOE)', reward: { manpower: 1 } }
};

// Global Reality Cards - Events that affect each round
const globalRealityCards = {
    g1: { 
        title: 'Global Pandemic!', 
        text: 'Healthcare policies cost 2 extra Funds this year.', 
        effect: { type: 'costIncrease', category: 'Health', amount: 2 } 
    },
    g2: { 
        title: 'Regional Tensions!', 
        text: 'Defence priorities are critical. Funding Defence gains +3 NWP.', 
        effect: { type: 'bonusNWP', category: 'Defence', amount: 3 } 
    },
    g3: { 
        title: 'Tech Breakthrough!', 
        text: 'Bonus revenue! Gain 4 extra Funds immediately.', 
        effect: { type: 'bonusResource', resource: 'funds', amount: 4 } 
    },
    g4: { 
        title: 'Supply Chain Disruption', 
        text: 'All priorities cost 1 extra Fund this year.', 
        effect: { type: 'costIncrease', category: 'All', amount: 1 } 
    },
    g5: { 
        title: 'Economic Slowdown', 
        text: 'MTI (Trade & Industry) only generates 3 Funds instead of 5 this year.', 
        effect: { type: 'nerfSector', sectorId: 'mti', newReward: { funds: 3 } } 
    },
    g6: { 
        title: 'Aging Population', 
        text: 'Social priorities are in high demand. Funding Social gains +3 NWP.', 
        effect: { type: 'bonusNWP', category: 'Social', amount: 3 } 
    }
};

// National Priority Cards - Projects that can be funded for NWP
const nationalPriorityCards = {
    p1: { title: 'Build New Polyclinic', cost: { funds: 6 }, reward: { nwp: 10 }, category: 'Health', helps: 'Seniors, Families' },
    p2: { title: 'Digital Skills Package', cost: { funds: 4, manpower: 1 }, reward: { nwp: 8 }, category: 'Economy', helps: 'Workers, Students' },
    p3: { title: 'Support for Low-Income', cost: { funds: 5 }, reward: { nwp: 7 }, category: 'Social', helps: 'Vulnerable groups' },
    p4: { title: 'Bolster Cyber Defence', cost: { funds: 4, manpower: 1 }, reward: { nwp: 8 }, category: 'Defence', helps: 'National Security' },
    p5: { title: 'Invest in Green Energy', cost: { funds: 7 }, reward: { nwp: 9 }, category: 'Sustainability', helps: 'Future Generations' },
    p6: { title: 'Upgrade School Facilities', cost: { funds: 3, manpower: 1 }, reward: { nwp: 6 }, category: 'Education', helps: 'Students' },
    p7: { title: 'Enhance Elder-care Services', cost: { funds: 4 }, reward: { nwp: 6 }, category: 'Health', helps: 'Seniors' },
    p8: { title: 'Boost Local Startups', cost: { funds: 6, manpower: 1 }, reward: { nwp: 10 }, category: 'Economy', helps: 'Entrepreneurs' },
    p9: { title: 'New Public Housing', cost: { funds: 8 }, reward: { nwp: 11 }, category: 'Social', helps: 'Young Families' },
    p10: { title: 'Acquire New Naval Vessels', cost: { funds: 7, manpower: 2 }, reward: { nwp: 15 }, category: 'Defence', helps: 'National Security' },
    p11: { title: 'Develop Food Resilience Tech', cost: { funds: 5 }, reward: { nwp: 7 }, category: 'Sustainability', helps: 'Food Security' },
    p12: { title: 'Expand University Grants', cost: { funds: 4 }, reward: { nwp: 5 }, category: 'Education', helps: 'Students' }
};

// Utility Functions
function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm for randomizing card order
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function drawCard(deck) {
    // Draw a card from the deck, return null if empty
    return deck.length > 0 ? deck.pop() : null;
}

// Core Game Logic Functions

function initGame() {
    // Initialize game state and start first round
    console.log('Initializing Budget Blueprint SG...');
    
    // Reset game state to starting values
    gameState = {
        round: 1,
        funds: 10,
        manpower: 0,
        nwp: 0,
        workersAvailable: 3,
        sectorsFilled: [],
        activePriorities: [],
        globalEvent: null,
        globalEventDeck: shuffleArray(Object.keys(globalRealityCards)),
        priorityDeck: shuffleArray(Object.keys(nationalPriorityCards)),
        // Reset game history tracking
        gameHistory: {
            fundedProjects: [],
            sectorDeployments: {},
            totalFundsSpent: 0,
            totalManpowerUsed: 0,
            totalNWPGained: 0
        }
    };
    
    // Draw initial 3 priorities
    for (let i = 0; i < 3; i++) {
        const cardKey = drawCard(gameState.priorityDeck);
        if (cardKey) {
            gameState.activePriorities.push({ key: cardKey, ...nationalPriorityCards[cardKey] });
        }
    }
    
    startRound();
}

function startRound() {
    // Start a new fiscal year round
    console.log(`Starting Fiscal Year ${gameState.round}`);
    
    // Check if game should end
    if (gameState.round > 4) {
        endGame();
        return;
    }
    
    // Reset round-specific state
    gameState.workersAvailable = 3;
    gameState.sectorsFilled = [];
    
    // Draw global event for this round
    const eventKey = drawCard(gameState.globalEventDeck);
    if (eventKey) {
        gameState.globalEvent = { key: eventKey, ...globalRealityCards[eventKey] };
        
        // Handle immediate event effects
        if (gameState.globalEvent.effect.type === 'bonusResource') {
            if (gameState.globalEvent.effect.resource === 'funds') {
                gameState.funds += gameState.globalEvent.effect.amount;
            } else if (gameState.globalEvent.effect.resource === 'manpower') {
                gameState.manpower += gameState.globalEvent.effect.amount;
            }
        }
        
        // Show global event modal
        showGlobalEventModal();
    }

    updateEventBanner();
    updateUI();
}

function onSectorClick(sectorId) {
    // Handle ministry team deployment to sectors
    console.log(`Attempting to deploy team to ${sectorId}`);
    
    // Validate deployment
    if (gameState.workersAvailable <= 0) {
        console.log('No ministry teams available');
        return;
    }
    
    if (gameState.sectorsFilled.includes(sectorId)) {
        console.log('Sector already filled this round');
        return;
    }
    
    // Deploy team
    gameState.workersAvailable--;
    gameState.sectorsFilled.push(sectorId);

    // Visual feedback: flash the card green briefly
    const deployedCard = document.getElementById(sectorId);
    deployedCard.classList.add('just-deployed');
    setTimeout(() => deployedCard.classList.remove('just-deployed'), 600);

    // Track deployment in game history
    if (!gameState.gameHistory.sectorDeployments[sectorId]) {
        gameState.gameHistory.sectorDeployments[sectorId] = 0;
    }
    gameState.gameHistory.sectorDeployments[sectorId]++;
    
    // Calculate reward (check for global event modifications)
    let reward = { ...allSectors[sectorId].reward };
    
    // Apply global event sector nerfs
    if (gameState.globalEvent && 
        gameState.globalEvent.effect.type === 'nerfSector' && 
        gameState.globalEvent.effect.sectorId === sectorId) {
        reward = { ...gameState.globalEvent.effect.newReward };
    }
    
    // Add resources to game state
    if (reward.funds) {
        gameState.funds += reward.funds;
        console.log(`Gained ${reward.funds} funds from ${sectorId}`);
    }
    if (reward.manpower) {
        gameState.manpower += reward.manpower;
        console.log(`Gained ${reward.manpower} manpower from ${sectorId}`);
    }
    
    updateUI();
}

function onFundPriorityClick(priorityIndex) {
    // Handle funding of national priorities
    const priority = gameState.activePriorities[priorityIndex];
    if (!priority) return;
    
    console.log(`Attempting to fund: ${priority.title}`);
    
    // Calculate final cost with global event modifiers
    let finalCost = { ...priority.cost };
    
    if (gameState.globalEvent) {
        const effect = gameState.globalEvent.effect;
        
        // Apply cost increases
        if (effect.type === 'costIncrease') {
            if (effect.category === 'All' || effect.category === priority.category) {
                finalCost.funds = (finalCost.funds || 0) + effect.amount;
            }
        }
    }
    
    // Check affordability
    const canAfford = (gameState.funds >= (finalCost.funds || 0)) && 
                     (gameState.manpower >= (finalCost.manpower || 0));
    
    if (!canAfford) {
        console.log('Cannot afford this priority');
        return;
    }
    
    // Deduct resources
    gameState.funds -= (finalCost.funds || 0);
    gameState.manpower -= (finalCost.manpower || 0);
    
    // Track spending in game history
    gameState.gameHistory.totalFundsSpent += (finalCost.funds || 0);
    gameState.gameHistory.totalManpowerUsed += (finalCost.manpower || 0);
    
    // Calculate final reward with global event bonuses
    let finalReward = { ...priority.reward };
    
    if (gameState.globalEvent && gameState.globalEvent.effect.type === 'bonusNWP') {
        if (gameState.globalEvent.effect.category === priority.category) {
            finalReward.nwp += gameState.globalEvent.effect.amount;
        }
    }
    
    // Add NWP
    gameState.nwp += finalReward.nwp;
    gameState.gameHistory.totalNWPGained += finalReward.nwp;
    console.log(`Gained ${finalReward.nwp} NWP from ${priority.title}`);
    
    // Track funded project in game history
    gameState.gameHistory.fundedProjects.push({
        title: priority.title,
        category: priority.category,
        nwpGained: finalReward.nwp,
        round: gameState.round
    });
    
    // Remove completed priority and draw new one
    gameState.activePriorities.splice(priorityIndex, 1);
    
    const newCardKey = drawCard(gameState.priorityDeck);
    if (newCardKey) {
        gameState.activePriorities.push({ key: newCardKey, ...nationalPriorityCards[newCardKey] });
    }
    
    updateUI();
}

function onEndTurnClick() {
    // Handle end of fiscal year
    if (gameState.workersAvailable > 0) {
        console.log('Cannot end turn - ministry teams still available');
        return;
    }
    
    console.log(`Ending Fiscal Year ${gameState.round}`);
    gameState.round++;
    startRound();
}

function endGame() {
    // Handle game completion
    console.log(`Game completed with ${gameState.nwp} NWP`);
    showGameOverModal();
}

// UI Update Functions

function updateUI() {
    // Master UI update function - called after any game state change
    updateResourceDisplay();
    updateWorkerPool();
    updateSectorCards();
    updatePriorityCards();
    updateEndTurnButton();
    updateHints();
}

function updateHints() {
    const allDeployed = gameState.workersAvailable === 0;

    // --- Sector card glow: pulse when a team is still available ---
    Object.keys(allSectors).forEach(sectorId => {
        const card = document.getElementById(sectorId);
        if (!card) return;
        const canDeploy = !allDeployed && !gameState.sectorsFilled.includes(sectorId);
        card.classList.toggle('hint-pulse', canDeploy);
    });

    // --- Fund button shimmer: highlight buttons the player can afford ---
    gameState.activePriorities.forEach((priority, index) => {
        const card = document.getElementById(`priority${index}`);
        if (!card) return;
        const btn = card.querySelector('.fund-button');
        if (btn) btn.classList.toggle('hint-pulse', !btn.disabled);
    });

    // --- End Turn button: pulse strongly when all teams are deployed ---
    const endBtn = document.getElementById('endTurnBtn');
    endBtn.classList.toggle('hint-ready', allDeployed);

    // --- Next-Step banner ---
    const banner  = document.getElementById('nextStepBanner');
    const textEl  = document.getElementById('nextStepText');
    if (!banner || !textEl) return;

    if (!allDeployed) {
        const n = gameState.workersAvailable;
        banner.className = 'next-step-banner phase-deploy';
        textEl.textContent = `Step 1 — Deploy ${n} more team${n > 1 ? 's' : ''}: click any glowing sector card below ↓`;
    } else {
        // Check if any priority is affordable right now
        const canFundAny = gameState.activePriorities.some((p, i) => {
            const btn = document.querySelector(`#priority${i} .fund-button`);
            return btn && !btn.disabled;
        });

        if (canFundAny) {
            banner.className = 'next-step-banner phase-fund';
            textEl.textContent = '✓ All teams deployed! Step 2 — Fund a glowing priority below, then End Fiscal Year ↓';
        } else {
            banner.className = 'next-step-banner phase-end';
            textEl.textContent = '✓ All teams deployed! Click End Fiscal Year to advance to the next year →';
        }
    }
}

function updateResourceDisplay() {
    // Update resource dashboard
    document.getElementById('roundDisplay').textContent = `${gameState.round} / 4`;
    document.getElementById('fundsDisplay').textContent = `${gameState.funds}M`;
    document.getElementById('manpowerDisplay').textContent = gameState.manpower.toString();
    document.getElementById('nwpDisplay').textContent = gameState.nwp.toString();
}

function updateWorkerPool() {
    // Update ministry team visual indicators
    const workers = document.querySelectorAll('.worker');
    workers.forEach((worker, index) => {
        if (index < gameState.workersAvailable) {
            worker.className = 'worker available';
        } else {
            worker.className = 'worker used';
        }
    });

    // Update the count badge
    const countEl = document.getElementById('workerCount');
    if (countEl) {
        const n = gameState.workersAvailable;
        countEl.textContent = n > 0 ? `${n} of 3 free` : 'all deployed ✓';
        countEl.className = 'worker-count' + (n === 0 ? ' depleted' : '');
    }

    // Hide the instructional hint once all teams are deployed
    const hintEl = document.getElementById('workerHint');
    if (hintEl) {
        hintEl.style.display = gameState.workersAvailable > 0 ? 'block' : 'none';
    }
}

function updateSectorCards() {
    // Update sector card states
    Object.keys(allSectors).forEach(sectorId => {
        const card = document.getElementById(sectorId);
        if (gameState.sectorsFilled.includes(sectorId)) {
            card.classList.add('filled');
        } else {
            card.classList.remove('filled');
        }
    });
}

// Map category names to CSS class suffixes
const categoryClassMap = {
    'Health': 'health',
    'Economy': 'economy',
    'Social': 'social',
    'Defence': 'defence',
    'Sustainability': 'sustainability',
    'Education': 'education'
};

function updatePriorityCards() {
    // Update priority cards and fund button states
    gameState.activePriorities.forEach((priority, index) => {
        const card = document.getElementById(`priority${index}`);
        if (!card) return;

        // Apply category colour class
        const catKey = categoryClassMap[priority.category] || '';
        card.className = 'priority-card' + (catKey ? ' cat-' + catKey : '');

        // Update card content
        card.querySelector('.priority-title').textContent = priority.title;
        const catEl = card.querySelector('.priority-category');
        catEl.textContent = priority.category;
        catEl.className = 'priority-category' + (catKey ? ' cat-badge-' + catKey : '');
        card.querySelector('.priority-helps').textContent = `Helps: ${priority.helps}`;
        
        // Calculate display cost with global event modifiers
        let displayCost = { ...priority.cost };
        if (gameState.globalEvent) {
            const effect = gameState.globalEvent.effect;
            if (effect.type === 'costIncrease') {
                if (effect.category === 'All' || effect.category === priority.category) {
                    displayCost.funds = (displayCost.funds || 0) + effect.amount;
                }
            }
        }
        
        // Format cost display
        let costText = '';
        if (displayCost.funds) costText += `${displayCost.funds}M`;
        if (displayCost.manpower) {
            if (costText) costText += ', ';
            costText += `${displayCost.manpower} Manpower`;
        }
        card.querySelector('.priority-cost').textContent = `Cost: ${costText}`;
        
        // Calculate display reward with global event bonuses
        let displayReward = priority.reward.nwp;
        if (gameState.globalEvent && gameState.globalEvent.effect.type === 'bonusNWP') {
            if (gameState.globalEvent.effect.category === priority.category) {
                displayReward += gameState.globalEvent.effect.amount;
            }
        }
        card.querySelector('.priority-reward').textContent = `Reward: ${displayReward} NWP`;
        
        // Update fund button state
        const fundButton = card.querySelector('.fund-button');
        const needFunds = (displayCost.funds || 0) - gameState.funds;
        const needManpower = (displayCost.manpower || 0) - gameState.manpower;
        const canAfford = needFunds <= 0 && needManpower <= 0;
        fundButton.disabled = !canAfford;

        // Show affordability hint on disabled button
        if (!canAfford) {
            const hints = [];
            if (needFunds > 0) hints.push(`$${needFunds}M more funds`);
            if (needManpower > 0) hints.push(`${needManpower} more manpower`);
            fundButton.title = `Cannot afford — need ${hints.join(' and ')}`;
        } else {
            fundButton.title = '';
        }
    });
}

function updateEndTurnButton() {
    // Update end turn button state
    const endTurnBtn = document.getElementById('endTurnBtn');
    endTurnBtn.disabled = gameState.workersAvailable > 0;
}

// Modal Functions

function showGlobalEventModal() {
    // Display global event modal
    const modal = document.getElementById('globalEventModal');
    const title = document.getElementById('eventTitle');
    const text = document.getElementById('eventText');
    
    title.textContent = gameState.globalEvent.title;
    text.textContent = gameState.globalEvent.text;
    
    modal.style.display = 'block';
}

function showGameOverModal() {
    // Display game over modal with final score and decision summary
    const modal = document.getElementById('gameOverModal');
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    
    finalScore.textContent = `${gameState.nwp} NWP`;
    
    // Generate performance message based on score
    let message = '';
    if (gameState.nwp >= 80) {
        message = 'Outstanding leadership! Singapore thrives under your guidance.';
    } else if (gameState.nwp >= 60) {
        message = 'Excellent work! The nation is well-managed and prosperous.';
    } else if (gameState.nwp >= 40) {
        message = 'Good effort! There\'s room for improvement in future budgets.';
    } else if (gameState.nwp >= 20) {
        message = 'Challenging times ahead. Consider different strategic approaches.';
    } else {
        message = 'Singapore faces difficulties. Learn from this experience!';
    }
    
    scoreMessage.textContent = message;

    // Populate decision summary and reflection
    populateDecisionSummary();
    populateCoverageSummary();

    const reflectionContainer = document.getElementById('reflectionPrompts');
    const prompts = generateReflectionPrompts();
    reflectionContainer.innerHTML = prompts
        .map(p => `<div class="reflection-prompt">${p}</div>`)
        .join('');

    modal.style.display = 'block';
}

// Added: Function to populate decision summary in game over modal
function populateDecisionSummary() {
    // Populate funded projects list
    const fundedProjectsList = document.getElementById('fundedProjectsList');
    if (gameState.gameHistory.fundedProjects.length > 0) {
        fundedProjectsList.innerHTML = gameState.gameHistory.fundedProjects
            .map(project => `
                <div class="project-item">
                    <div class="project-name">${project.title}</div>
                    <div class="project-nwp">+${project.nwpGained} NWP</div>
                </div>
            `).join('');
    } else {
        fundedProjectsList.innerHTML = '<div class="no-projects">No projects were funded during your term.</div>';
    }
    
    // Populate deployment summary
    const deploymentSummary = document.getElementById('deploymentSummary');
    const deploymentStats = Object.entries(gameState.gameHistory.sectorDeployments)
        .map(([sectorId, count]) => `
            <div class="stat-item">
                <span>${allSectors[sectorId].name}:</span>
                <span class="stat-value">${count} deployment${count > 1 ? 's' : ''}</span>
            </div>
        `).join('');
    
    if (deploymentStats) {
        deploymentSummary.innerHTML = deploymentStats;
    } else {
        deploymentSummary.innerHTML = '<div class="no-projects">No ministry teams were deployed.</div>';
    }
    
    // Populate resource summary
    const resourceSummary = document.getElementById('resourceSummary');
    resourceSummary.innerHTML = `
        <div class="stat-item">
            <span>Total Funds Spent:</span>
            <span class="stat-value">$${gameState.gameHistory.totalFundsSpent}M</span>
        </div>
        <div class="stat-item">
            <span>Total Manpower Used:</span>
            <span class="stat-value">${gameState.gameHistory.totalManpowerUsed} units</span>
        </div>
        <div class="stat-item">
            <span>Projects Completed:</span>
            <span class="stat-value">${gameState.gameHistory.fundedProjects.length}</span>
        </div>
        <div class="stat-item">
            <span>Final Funds Remaining:</span>
            <span class="stat-value">$${gameState.funds}M</span>
        </div>
        <div class="stat-item">
            <span>Final Manpower Remaining:</span>
            <span class="stat-value">${gameState.manpower} units</span>
        </div>
    `;
}

// Update the persistent event banner shown during gameplay
function updateEventBanner() {
    const banner = document.getElementById('currentEventBanner');
    if (gameState.globalEvent) {
        document.getElementById('bannerEventTitle').textContent = gameState.globalEvent.title;
        document.getElementById('bannerEventText').textContent = gameState.globalEvent.text;
        banner.style.display = 'flex';
    } else {
        banner.style.display = 'none';
    }
}

// Populate the policy area coverage grid in the end-game modal
function populateCoverageSummary() {
    const allCategories = ['Health', 'Economy', 'Social', 'Defence', 'Sustainability', 'Education'];
    const fundedCategories = new Set(gameState.gameHistory.fundedProjects.map(p => p.category));

    const coverageEl = document.getElementById('coverageSummary');
    const items = allCategories.map(cat => {
        const isFunded = fundedCategories.has(cat);
        return `<div class="coverage-item ${isFunded ? 'funded' : 'not-funded'}">
            <span>${isFunded ? '✅' : '❌'}</span>
            <span>${cat}</span>
        </div>`;
    }).join('');

    const count = fundedCategories.size;
    coverageEl.innerHTML = items +
        `<div class="coverage-score">You funded projects in ${count} of ${allCategories.length} policy areas</div>`;
}

// Generate dynamic reflection prompts based on the player's actual decisions
function generateReflectionPrompts() {
    const history = gameState.gameHistory;
    const prompts = [];

    // Prompt 1: top deployed sector
    const deployEntries = Object.entries(history.sectorDeployments);
    if (deployEntries.length > 0) {
        const topEntry = deployEntries.sort((a, b) => b[1] - a[1])[0];
        const topName = allSectors[topEntry[0]].name;
        prompts.push(
            `You deployed most frequently to <strong>${topName}</strong>. ` +
            `What government needs drove that decision? Were there areas that received less attention as a result?`
        );
    }

    // Prompt 2: unfunded categories (or balanced coverage)
    const allCategories = ['Health', 'Economy', 'Social', 'Defence', 'Sustainability', 'Education'];
    const fundedCategories = new Set(history.fundedProjects.map(p => p.category));
    const unfunded = allCategories.filter(c => !fundedCategories.has(c));

    if (unfunded.length > 0) {
        const list = unfunded.map(c => `<strong>${c}</strong>`).join(', ');
        prompts.push(
            `You did not fund any ${list} projects. ` +
            `How might Singaporeans who rely on those services have been affected?`
        );
    } else {
        prompts.push(
            `You funded projects across <strong>all 6 policy areas</strong> — great balance! ` +
            `How did you decide which project to prioritise when funds were tight?`
        );
    }

    // Prompt 3: unspent funds or strategy change
    if (gameState.funds >= 5) {
        prompts.push(
            `You finished with <strong>$${gameState.funds}M unspent</strong>. In real government budgeting, ` +
            `unused funds often return to reserves or roll over. Should you have invested more? What held you back?`
        );
    } else {
        prompts.push(
            `If you could go back and change your <strong>first fiscal year</strong> strategy, what would you do differently? ` +
            `Why does the <em>order</em> of decisions matter in budget planning?`
        );
    }

    return prompts;
}

// Tooltip System

function initTooltips() {
    // Initialize tooltip system for enhanced UX
    const tooltip = document.getElementById('tooltip');
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.classList.add('show');
            
            // Position tooltip
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 8 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    });
}

// Event Listeners Setup

function setupEventListeners() {
    // Setup all interactive event listeners

    // Intro modal: "Start as Finance Minister" button
    document.getElementById('startGameBtn').addEventListener('click', () => {
        document.getElementById('introModal').style.display = 'none';
        if (!gameInitialized) {
            gameInitialized = true;
            initGame();
        }
    });

    // How to Play button (reopens intro modal mid-game)
    document.getElementById('howToPlayBtn').addEventListener('click', () => {
        document.getElementById('introModal').style.display = 'block';
    });

    // Sector click handlers
    Object.keys(allSectors).forEach(sectorId => {
        const card = document.getElementById(sectorId);
        card.addEventListener('click', () => onSectorClick(sectorId));
    });
    
    // Priority fund button handlers
    for (let i = 0; i < 3; i++) {
        const button = document.querySelector(`#priority${i} .fund-button`);
        button.addEventListener('click', () => onFundPriorityClick(i));
    }
    
    // End turn button handler
    document.getElementById('endTurnBtn').addEventListener('click', onEndTurnClick);
    
    // Modal close handlers
    document.getElementById('closeEventModal').addEventListener('click', () => {
        document.getElementById('globalEventModal').style.display = 'none';
    });
    
    document.getElementById('restartGame').addEventListener('click', () => {
        document.getElementById('gameOverModal').style.display = 'none';
        initGame();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const eventModal = document.getElementById('globalEventModal');
        const gameOverModal = document.getElementById('gameOverModal');
        const introModal = document.getElementById('introModal');

        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
        if (e.target === gameOverModal) {
            gameOverModal.style.display = 'none';
        }
        // Allow closing intro modal by clicking outside only if game is already running
        if (e.target === introModal && gameInitialized) {
            introModal.style.display = 'none';
        }
    });
}

// Game Initialization

document.addEventListener('DOMContentLoaded', () => {
    // Initialize game when DOM is loaded
    console.log('Budget Blueprint SG - Loading...');

    setupEventListeners();
    initTooltips();

    // Show intro modal first; game starts when player clicks "Start as Finance Minister"
    document.getElementById('introModal').style.display = 'block';

    console.log('Budget Blueprint SG - Ready to play!');
});

// Responsive height adjustment for iframe vs new tab
function adjustHeight() {
    // Detect if running in iframe vs new browser tab
    const container = document.querySelector('.game-container');
    if (window.self !== window.top) {
        // Running in iframe
        container.style.height = '450px';
    } else {
        // Running in new tab
        container.style.height = '90vh';
    }
}

window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);