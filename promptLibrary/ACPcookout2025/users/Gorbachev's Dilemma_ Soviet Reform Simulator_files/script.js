// Gorbachev's Dilemma: Soviet Reform Simulator
// Game state management and interactive functionality

class GorbachevGame {
    constructor() {
        // Game state variables
        this.currentScreen = 'intro';
        this.gameLength = 8; // Default to long game
        this.currentRound = 1;
        this.totalRounds = 8;
        
        // Player metrics (1-10 scale)
        this.metrics = {
            unity: 5,
            economy: 5,
            power: 5,
            international: 5
        };
        
        // Game scenarios and events
        this.scenarios = [
            {
                crisis: "The Chernobyl nuclear disaster has shaken public confidence. International pressure mounts while domestic critics question your leadership. How do you respond to this unprecedented crisis?",
                options: {
                    conservative: "Minimize information release and maintain state control over the narrative",
                    moderate: "Acknowledge the incident while emphasizing Soviet technical capabilities",
                    radical: "Implement full transparency and international cooperation (Glasnost)"
                },
                effects: {
                    conservative: { unity: -1, economy: -1, power: 1, international: -2 },
                    moderate: { unity: 0, economy: -1, power: 0, international: 0 },
                    radical: { unity: 1, economy: -2, power: -1, international: 2 }
                },
                responses: {
                    conservative: {
                        pravda: "Soviet Nuclear Program Demonstrates Resilience in Face of Technical Challenge",
                        international: "Western media criticizes Soviet secrecy and lack of transparency",
                        citizens: ["Party officials praise measured response", "Scientists privately express concern about information restrictions", "Citizens remain largely uninformed about true extent"]
                    },
                    moderate: {
                        pravda: "Leadership Addresses Nuclear Incident with Characteristic Soviet Resolve",
                        international: "Mixed international reaction to limited Soviet disclosure",
                        citizens: ["Some appreciation for acknowledgment", "Continued uncertainty among population", "Technical experts call for more openness"]
                    },
                    radical: {
                        pravda: "General Secretary Demonstrates New Era of Openness in Crisis Response",
                        international: "International community welcomes unprecedented Soviet transparency",
                        citizens: ["Public shocked by full disclosure", "Growing trust in reform agenda", "Some party hardliners express concern"]
                    }
                }
            },
            {
                crisis: "Economic stagnation continues as consumer goods remain scarce. The black market thrives while official stores stand empty. Your economic advisors present conflicting recommendations.",
                options: {
                    conservative: "Strengthen central planning and crack down on black market activities",
                    moderate: "Allow limited private enterprise while maintaining state control",
                    radical: "Introduce market mechanisms and reduce state economic control (Perestroika)"
                },
                effects: {
                    conservative: { unity: 1, economy: -1, power: 1, international: -1 },
                    moderate: { unity: 0, economy: 1, power: 0, international: 0 },
                    radical: { unity: -1, economy: 2, power: -1, international: 1 }
                },
                responses: {
                    conservative: {
                        pravda: "State Strengthens Economic Discipline Against Speculation and Corruption",
                        international: "Western economists note continued Soviet resistance to market reforms",
                        citizens: ["Party loyalists support crackdown", "Black market traders go deeper underground", "Consumers face continued shortages"]
                    },
                    moderate: {
                        pravda: "Balanced Economic Reforms Preserve Socialist Principles While Addressing Needs",
                        international: "Cautious international interest in limited Soviet economic opening",
                        citizens: ["Small entrepreneurs cautiously optimistic", "Party officials uncertain about changes", "Some improvement in consumer goods availability"]
                    },
                    radical: {
                        pravda: "Revolutionary Economic Restructuring Promises New Era of Prosperity",
                        international: "International business community shows strong interest in Soviet market opening",
                        citizens: ["Entrepreneurs enthusiastic about opportunities", "Workers worried about job security", "Party hardliners deeply concerned about ideological drift"]
                    }
                }
            },
            {
                crisis: "Nationalist movements in the Baltic republics are gaining momentum. Estonia, Latvia, and Lithuania demand greater autonomy. The military suggests forceful intervention while reformers advocate negotiation.",
                options: {
                    conservative: "Deploy military forces to maintain order and Soviet unity",
                    moderate: "Negotiate limited autonomy while preserving federal structure",
                    radical: "Allow republican self-determination and democratic processes"
                },
                effects: {
                    conservative: { unity: -2, economy: 0, power: 2, international: -2 },
                    moderate: { unity: 0, economy: 0, power: 0, international: 0 },
                    radical: { unity: -1, economy: -1, power: -2, international: 2 }
                },
                responses: {
                    conservative: {
                        pravda: "Soviet Armed Forces Restore Constitutional Order in Baltic Region",
                        international: "International condemnation of Soviet military intervention",
                        citizens: ["Military leadership supports decisive action", "Baltic populations resist occupation", "Russian citizens divided on use of force"]
                    },
                    moderate: {
                        pravda: "Constructive Dialogue Addresses Regional Concerns Within Soviet Framework",
                        international: "International observers cautiously monitor Soviet federal negotiations",
                        citizens: ["Baltic leaders engage in careful negotiations", "Some progress on cultural autonomy", "Federal structure remains intact"]
                    },
                    radical: {
                        pravda: "Democratic Principles Guide Resolution of Republican Aspirations",
                        international: "Western democracies praise Soviet commitment to self-determination",
                        citizens: ["Baltic populations celebrate new freedoms", "Russian nationalists express alarm", "Other republics watch developments closely"]
                    }
                }
            },
            {
                crisis: "The Berlin Wall stands as a symbol of division, but pressure mounts from both East Germans and international community. Your Warsaw Pact allies look to Moscow for guidance on handling growing protests.",
                options: {
                    conservative: "Maintain the wall and support East German authorities in controlling protests",
                    moderate: "Allow limited travel while preserving East German state structure",
                    radical: "Support German reunification and democratic transition"
                },
                effects: {
                    conservative: { unity: 0, economy: -1, power: 1, international: -2 },
                    moderate: { unity: 0, economy: 0, power: -1, international: 1 },
                    radical: { unity: -1, economy: -1, power: -2, international: 3 }
                },
                responses: {
                    conservative: {
                        pravda: "Socialist Unity Preserved Through Firm Leadership and Fraternal Support",
                        international: "Western criticism of Soviet support for East German crackdown",
                        citizens: ["Warsaw Pact allies relieved by Soviet backing", "East Germans continue underground resistance", "Some Soviet citizens question intervention"]
                    },
                    moderate: {
                        pravda: "Humanitarian Approach Balances Security with Human Dignity",
                        international: "Cautious international approval of limited Soviet flexibility",
                        citizens: ["East Germans appreciate travel opportunities", "Limited but meaningful family reunions", "Gradual pressure release without system collapse"]
                    },
                    radical: {
                        pravda: "Historic Decision Supports German People's Democratic Aspirations",
                        international: "International acclaim for Soviet leadership in ending Cold War division",
                        citizens: ["Emotional scenes of German reunification", "Warsaw Pact allies uncertain about future", "Soviet hardliners question abandonment of allies"]
                    }
                }
            },
            {
                crisis: "Afghanistan continues to drain Soviet resources and morale. The mujahideen resistance, supported by Western weapons, shows no signs of weakening. Military commanders request more troops while diplomats suggest withdrawal.",
                options: {
                    conservative: "Escalate military commitment to achieve decisive victory",
                    moderate: "Maintain current force levels while seeking political solution",
                    radical: "Begin immediate withdrawal of Soviet forces"
                },
                effects: {
                    conservative: { unity: -2, economy: -2, power: 0, international: -1 },
                    moderate: { unity: -1, economy: -1, power: 0, international: 0 },
                    radical: { unity: 1, economy: 1, power: -1, international: 2 }
                },
                responses: {
                    conservative: {
                        pravda: "Soviet Forces Intensify Efforts to Restore Peace and Stability in Afghanistan",
                        international: "International criticism of Soviet military escalation",
                        citizens: ["Military families worried about increased casualties", "Economic burden grows heavier", "Public support for war continues to decline"]
                    },
                    moderate: {
                        pravda: "Balanced Approach Seeks Political Resolution While Maintaining Security",
                        international: "Some international interest in Soviet diplomatic initiatives",
                        citizens: ["Continued casualties without clear progress", "Diplomatic efforts show limited results", "War fatigue grows among population"]
                    },
                    radical: {
                        pravda: "Courageous Decision Prioritizes Peace and Soviet Lives Over Military Pride",
                        international: "International praise for Soviet commitment to peace",
                        citizens: ["Families celebrate return of soldiers", "Economic resources freed for domestic needs", "Some military leaders question retreat"]
                    }
                }
            },
            {
                crisis: "The Communist Party hardliners are organizing opposition to your reforms. They control key positions in the military, KGB, and party apparatus. Intelligence reports suggest they may be planning to challenge your authority.",
                options: {
                    conservative: "Compromise with hardliners and slow the pace of reform",
                    moderate: "Outmaneuver opponents through careful political maneuvering",
                    radical: "Confront hardliners directly and accelerate democratic reforms"
                },
                effects: {
                    conservative: { unity: 1, economy: -1, power: 0, international: -1 },
                    moderate: { unity: 0, economy: 0, power: 1, international: 0 },
                    radical: { unity: -1, economy: 1, power: -2, international: 2 }
                },
                responses: {
                    conservative: {
                        pravda: "Party Unity Strengthened Through Constructive Dialogue and Compromise",
                        international: "Western observers note slowing of Soviet reform momentum",
                        citizens: ["Party hardliners satisfied with moderated approach", "Reform supporters express disappointment", "Pace of change noticeably slows"]
                    },
                    moderate: {
                        pravda: "Skilled Leadership Navigates Complex Political Challenges",
                        international: "International analysts praise Gorbachev's political acumen",
                        citizens: ["Gradual marginalization of hardline opposition", "Reform continues at measured pace", "Political stability maintained"]
                    },
                    radical: {
                        pravda: "Democratic Forces Triumph Over Conservative Resistance",
                        international: "International democratic movements celebrate Soviet political opening",
                        citizens: ["Reform supporters energized by bold leadership", "Hardliners plan more serious opposition", "Political confrontation intensifies"]
                    }
                }
            },
            {
                crisis: "Economic crisis deepens as shortages spread beyond consumer goods to basic necessities. Bread lines form in major cities while regional authorities hoard supplies. The ruble's value plummets on international markets.",
                options: {
                    conservative: "Implement emergency rationing and strengthen state distribution systems",
                    moderate: "Allow regional flexibility while maintaining central coordination",
                    radical: "Accelerate market reforms and accept short-term economic disruption"
                },
                effects: {
                    conservative: { unity: 0, economy: -1, power: 1, international: -1 },
                    moderate: { unity: -1, economy: 0, power: 0, international: 0 },
                    radical: { unity: -2, economy: 1, power: -1, international: 1 }
                },
                responses: {
                    conservative: {
                        pravda: "State Emergency Measures Ensure Fair Distribution of Essential Goods",
                        international: "International concern about Soviet economic crisis deepening",
                        citizens: ["Orderly but limited distribution of goods", "Long queues but guaranteed basic supplies", "Growing frustration with continued shortages"]
                    },
                    moderate: {
                        pravda: "Regional Flexibility Addresses Local Needs While Maintaining National Coordination",
                        international: "Mixed international reaction to decentralized Soviet approach",
                        citizens: ["Some regions manage better than others", "Inequality between regions increases", "Local officials gain more influence"]
                    },
                    radical: {
                        pravda: "Bold Economic Transformation Promises Long-term Prosperity Despite Short-term Challenges",
                        international: "International financial institutions offer cautious support",
                        citizens: ["Severe short-term hardship for many families", "Some entrepreneurs begin to prosper", "Social tensions rise dramatically"]
                    }
                }
            },
            {
                crisis: "The August 1991 coup attempt by hardliners has failed, but the Soviet Union's authority is shattered. Republic leaders declare independence while Boris Yeltsin emerges as a rival power center in Russia.",
                options: {
                    conservative: "Attempt to restore central authority and preserve the Soviet Union",
                    moderate: "Negotiate a new confederation with willing republics",
                    radical: "Accept the dissolution and focus on peaceful transition"
                },
                effects: {
                    conservative: { unity: -2, economy: -1, power: -1, international: -2 },
                    moderate: { unity: 0, economy: -1, power: -1, international: 1 },
                    radical: { unity: -1, economy: 0, power: -2, international: 3 }
                },
                responses: {
                    conservative: {
                        pravda: "Constitutional Order Must Be Restored to Preserve Soviet Socialist Achievement",
                        international: "International concern about potential Soviet civil conflict",
                        citizens: ["Limited support for restoration efforts", "Republic leaders resist central authority", "Military divided on intervention"]
                    },
                    moderate: {
                        pravda: "New Union Treaty Offers Framework for Voluntary Association",
                        international: "International support for negotiated transition",
                        citizens: ["Some republics interested in loose confederation", "Complex negotiations over sovereignty", "Gradual emergence of new structures"]
                    },
                    radical: {
                        pravda: "Historic Peaceful Transition Demonstrates Democratic Maturity",
                        international: "International praise for peaceful end to Cold War superpower",
                        citizens: ["Emotional farewell to Soviet era", "Uncertainty but hope for future", "Gorbachev's legacy as peacemaker secured"]
                    }
                }
            }
        ];
        
        this.initializeGame();
    }
    
    // Initialize game event listeners and setup
    initializeGame() {
        // Introduction screen buttons
        document.getElementById('shortGame').addEventListener('click', () => {
            this.gameLength = 5;
            this.totalRounds = 5;
            this.showObjectives();
        });
        
        document.getElementById('longGame').addEventListener('click', () => {
            this.gameLength = 8;
            this.totalRounds = 8;
            this.showObjectives();
        });
        
        // Objectives screen buttons
        document.getElementById('needClarification').addEventListener('click', () => {
            this.showClarification();
        });
        
        document.getElementById('noClarification').addEventListener('click', () => {
            this.startGame();
        });
        
        // Clarification screen button
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        // Decision buttons
        document.getElementById('option1').addEventListener('click', () => {
            this.makeDecision('conservative');
        });
        
        document.getElementById('option2').addEventListener('click', () => {
            this.makeDecision('moderate');
        });
        
        document.getElementById('option3').addEventListener('click', () => {
            this.makeDecision('radical');
        });
        
        // Continue and restart buttons
        document.getElementById('continueBtn').addEventListener('click', () => {
            this.nextRound();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // Initialize tooltip functionality
        this.initializeTooltips();
        
        // Update initial status display
        this.updateStatusDisplay();
    }
    
    // Show objectives screen
    showObjectives() {
        this.switchScreen('objectives');
    }
    
    // Show clarification screen
    showClarification() {
        this.switchScreen('clarification');
    }
    
    // Start the main game
    startGame() {
        this.switchScreen('game');
        this.currentRound = 1;
        this.updateRoundDisplay();
        this.presentScenario();
    }
    
    // Switch between different game screens
    switchScreen(screenName) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Show target screen
        const targetScreen = document.getElementById(screenName + 'Screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;
    }
    
    // Present current scenario to player
    presentScenario() {
        const scenario = this.scenarios[this.currentRound - 1];
        if (!scenario) return;
        
        // Update crisis text
        document.getElementById('crisisText').textContent = scenario.crisis;
        
        // Update option descriptions
        document.querySelector('#option1 .option-description').textContent = scenario.options.conservative;
        document.querySelector('#option2 .option-description').textContent = scenario.options.moderate;
        document.querySelector('#option3 .option-description').textContent = scenario.options.radical;
    }
    
    // Handle player decision
    makeDecision(choice) {
        const scenario = this.scenarios[this.currentRound - 1];
        if (!scenario) return;
        
        // Apply effects to metrics
        const effects = scenario.effects[choice];
        Object.keys(effects).forEach(metric => {
            this.metrics[metric] = Math.max(1, Math.min(10, this.metrics[metric] + effects[metric]));
        });
        
        // Show results
        this.showResults(scenario, choice);
        
        // Update status display
        this.updateStatusDisplay();
    }
    
    // Show results of player's decision
    showResults(scenario, choice) {
        const responses = scenario.responses[choice];
        
        // Update Pravda headline
        document.getElementById('pravdaText').textContent = responses.pravda;
        
        // Update international reaction
        document.getElementById('internationalText').textContent = responses.international;
        
        // Update citizen responses
        const responsesList = document.getElementById('responsesList');
        responsesList.innerHTML = '';
        responses.citizens.forEach(response => {
            const div = document.createElement('div');
            div.className = 'response-item';
            div.textContent = response;
            responsesList.appendChild(div);
        });
        
        this.switchScreen('results');
    }
    
    // Proceed to next round or end game
    nextRound() {
        // Check for game end conditions
        if (this.checkGameEnd()) {
            return;
        }
        
        this.currentRound++;
        
        // Check if game should end due to round limit
        if (this.currentRound > this.totalRounds) {
            this.endGame();
            return;
        }
        
        this.updateRoundDisplay();
        this.presentScenario();
        this.switchScreen('game');
    }
    
    // Check for victory or defeat conditions
    checkGameEnd() {
        // Check for crisis (any metric at 1-2)
        const inCrisis = Object.values(this.metrics).some(value => value <= 2);
        if (inCrisis) {
            this.endGame('crisis');
            return true;
        }
        
        // Check for victory conditions
        const stableMetrics = Object.values(this.metrics).filter(value => value >= 7).length;
        
        if (stableMetrics === 4) {
            this.endGame('reformed_union');
            return true;
        } else if (stableMetrics >= 3) {
            this.endGame('controlled_transition');
            return true;
        }
        
        return false;
    }
    
    // End the game with appropriate message
    endGame(condition = 'normal') {
        let title, message;
        
        switch (condition) {
            case 'crisis':
                title = "Crisis and Collapse";
                message = "Comrade General Secretary, the situation has spiraled beyond control. The Soviet Union faces an unprecedented crisis that threatens its very existence. Your reforms, while well-intentioned, could not prevent the collapse of the system.";
                break;
            case 'reformed_union':
                title = "The Reformed Union";
                message = "Extraordinary achievement, Comrade General Secretary! You have successfully transformed the Soviet Union while maintaining its unity and strength. Your balanced approach to reform has created a stable, prosperous, and internationally respected nation.";
                break;
            case 'controlled_transition':
                title = "Controlled Transition";
                message = "Well done, Comrade General Secretary. While not achieving complete transformation, you have managed a controlled transition that preserves most of the Union's stability while implementing significant reforms. History will remember your pragmatic leadership.";
                break;
            default:
                title = "The End of an Era";
                message = "Your tenure as General Secretary has concluded. The Soviet Union faces an uncertain future, shaped by the decisions you made during these critical years. The full consequences of your choices will unfold in the years to come.";
        }
        
        document.getElementById('endTitle').textContent = title;
        document.getElementById('endMessage').textContent = message;
        
        // Display final statistics
        this.displayFinalStats();
        
        this.switchScreen('end');
    }
    
    // Display final statistics
    displayFinalStats() {
        const finalStats = document.getElementById('finalStats');
        finalStats.innerHTML = `
            <h4>Final Status:</h4>
            <div>Unity: ${this.getStatusText('unity')} (${this.metrics.unity}/10)</div>
            <div>Economy: ${this.getStatusText('economy')} (${this.metrics.economy}/10)</div>
            <div>Power: ${this.getStatusText('power')} (${this.metrics.power}/10)</div>
            <div>International: ${this.getStatusText('international')} (${this.metrics.international}/10)</div>
        `;
    }
    
    // Update round display
    updateRoundDisplay() {
        document.getElementById('currentRound').textContent = this.currentRound;
        document.getElementById('totalRounds').textContent = this.totalRounds;
    }
    
    // Update status meters display
    updateStatusDisplay() {
        document.getElementById('unityStatus').textContent = this.getStatusText('unity') + ` (${this.metrics.unity}/10)`;
        document.getElementById('economyStatus').textContent = this.getStatusText('economy') + ` (${this.metrics.economy}/10)`;
        document.getElementById('powerStatus').textContent = this.getStatusText('power') + ` (${this.metrics.power}/10)`;
        document.getElementById('internationalStatus').textContent = this.getStatusText('international') + ` (${this.metrics.international}/10)`;
    }
    
    // Get status text with color emoji
    getStatusText(metric) {
        const value = this.metrics[metric];
        if (value >= 7) return 'Stable 🟢';
        if (value >= 4) return 'Concerning 🟡';
        return 'Crisis 🔴';
    }
    
    // Restart the game
    restartGame() {
        // Reset all game state
        this.currentRound = 1;
        this.metrics = {
            unity: 5,
            economy: 5,
            power: 5,
            international: 5
        };
        
        // Return to introduction screen
        this.switchScreen('intro');
        this.updateStatusDisplay();
    }
    
    // Initialize tooltip functionality
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        const gameContainer = document.getElementById('gameContainer');
        
        // Show tooltip on hover for elements with title attribute
        gameContainer.addEventListener('mouseenter', (e) => {
            if (e.target.title) {
                tooltip.textContent = e.target.title;
                tooltip.style.display = 'block';
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        gameContainer.addEventListener('mousemove', (e) => {
            if (tooltip.style.display === 'block') {
                this.updateTooltipPosition(e, tooltip);
            }
        });
        
        gameContainer.addEventListener('mouseleave', (e) => {
            if (!gameContainer.contains(e.relatedTarget)) {
                tooltip.style.display = 'none';
            }
        });
    }
    
    // Update tooltip position
    updateTooltipPosition(event, tooltip) {
        const rect = document.getElementById('gameContainer').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GorbachevGame();
});