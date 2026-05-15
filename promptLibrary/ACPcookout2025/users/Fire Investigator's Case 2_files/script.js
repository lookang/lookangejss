// Fire Investigator's Case - Interactive Learning Game
// This game teaches fire classification through character-based investigation

class FireInvestigatorGame {
    constructor() {
        // Game state management
        this.currentMode = 'culprits'; // 'culprits' or 'victims'
        this.currentPanel = 'selection'; // 'selection', 'interview', 'matching', 'results'
        this.interviewedCharacters = new Set();
        this.matches = [];
        this.selectedCulprit = null;
        this.selectedVictim = null;
        
        // Initialize game data and UI
        this.initializeCharacters();
        this.initializeUI();
        this.showCharacterSelection();
    }

    // Character data with detailed personalities and dialogue
    initializeCharacters() {
        this.culprits = [
            {
                id: 'class-a',
                name: 'Mr. A. Combustible',
                emoji: '🔥',
                subtitle: 'The Everyday Arsonist',
                fireClass: 'Class A',
                openingStatement: "Look, I'm not proud of what I do, but I'm everywhere. Paper, wood, fabric - if it's solid and ordinary, I'm your guy. I burn steady and predictable, nothing fancy about me.",
                dialogueOptions: [
                    {
                        question: "What types of materials do you typically target?",
                        response: "Everyday stuff - books, curtains, wooden furniture, cardboard boxes. Anything solid that people take for granted. I leave behind ash and embers, real traditional-like.",
                        type: 'correct'
                    },
                    {
                        question: "How do you usually start your fires?",
                        response: "Heat, oxygen, and fuel - that's all I need. A cigarette butt, a candle too close to paper, overheated appliances. Simple stuff, really.",
                        type: 'neutral'
                    },
                    {
                        question: "What's your biggest weakness?",
                        response: "Water. Plain old water works great on me. Foam too. I'm not complicated - just douse me good and I'm done for.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you work with any accomplices?",
                        response: "Nah, I'm a solo act. Don't need chemicals or special conditions. Just me and whatever solid stuff is lying around.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'class-b',
                name: 'Ms. B. Liquid Flow',
                emoji: '⛽',
                subtitle: 'The Fluid Menace',
                fireClass: 'Class B',
                openingStatement: "I'm slippery, fast, and dangerous. Petrol, oil, paint - anything that flows, I can ignite. Water just spreads me around, making things worse.",
                dialogueOptions: [
                    {
                        question: "What's your preferred fuel source?",
                        response: "Flammable liquids are my specialty - gasoline, diesel, cooking oil, paint thinner. I spread fast across surfaces and burn hot and bright.",
                        type: 'correct'
                    },
                    {
                        question: "How do you spread so quickly?",
                        response: "Liquids flow, and so do I. Once I get started, I follow the fuel wherever it goes. Spills become highways for me.",
                        type: 'neutral'
                    },
                    {
                        question: "What happens when people use water on you?",
                        response: "Ha! Water just spreads my fuel around. Makes me bigger, not smaller. You need foam or CO2 to smother me properly.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you prefer indoor or outdoor locations?",
                        response: "Doesn't matter to me. I go where the liquids are. Could be anywhere really.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'class-c',
                name: 'Mr. C. Flammable Gas',
                emoji: '💨',
                subtitle: 'The Invisible Threat',
                fireClass: 'Class C',
                openingStatement: "You can't see me coming. I'm gas - propane, butane, natural gas. One spark and BOOM! I'm explosive and unpredictable.",
                dialogueOptions: [
                    {
                        question: "What makes you so dangerous?",
                        response: "I'm invisible until I ignite. Gas leaks, propane tanks, natural gas lines - I build up silently then explode with just a tiny spark.",
                        type: 'correct'
                    },
                    {
                        question: "How do people usually encounter you?",
                        response: "Gas stoves, heating systems, industrial equipment. Anywhere gas is stored or transported. I'm under pressure, ready to escape.",
                        type: 'neutral'
                    },
                    {
                        question: "What's the best way to stop you?",
                        response: "Cut off my gas supply first! Then use CO2 or dry powder. Never water - that doesn't work on gas fires.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you leave much evidence behind?",
                        response: "Not really. I burn clean when I'm pure gas. The real evidence is in the explosion damage I cause.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'class-d',
                name: 'Dr. D. Metal Burn',
                emoji: '⚗️',
                subtitle: 'The Rare Specialist',
                fireClass: 'Class D',
                openingStatement: "I'm rare, but when I strike, I'm spectacular. Magnesium, titanium, lithium - specialty metals are my domain. Most people never encounter me.",
                dialogueOptions: [
                    {
                        question: "What specific materials do you target?",
                        response: "Reactive metals - magnesium shavings, lithium batteries, titanium dust. Industrial settings, labs, specialized manufacturing. Very specific stuff.",
                        type: 'correct'
                    },
                    {
                        question: "Why are you so rare?",
                        response: "These metals aren't common in everyday life. You need special conditions and specific materials. I'm a specialist, not a generalist.",
                        type: 'neutral'
                    },
                    {
                        question: "What happens if someone uses water on you?",
                        response: "Disaster! Water reacts violently with burning metals. Creates hydrogen gas, makes explosions. Need special dry powder designed for metals.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you work in teams?",
                        response: "I'm usually solo. When I show up, it's because someone's working with very specific materials in controlled environments.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'class-f',
                name: 'Chef F. Fryer',
                emoji: '🍳',
                subtitle: 'The Kitchen Killer',
                fireClass: 'Class F',
                openingStatement: "I'm the kitchen nightmare. Cooking oils, deep fryers, woks - when fats and oils get too hot, I take over. Water is my best friend... for making things worse!",
                dialogueOptions: [
                    {
                        question: "What's your favorite hunting ground?",
                        response: "Commercial kitchens, deep fryers, woks with overheated oil. When cooking fats reach their flash point, I'm there instantly. Hot oil is my specialty.",
                        type: 'correct'
                    },
                    {
                        question: "What makes you particularly dangerous?",
                        response: "Hot oil splashes and spreads. I can jump from pan to pan, surface to surface. Plus, I burn extremely hot - much hotter than regular fires.",
                        type: 'neutral'
                    },
                    {
                        question: "What's the worst thing people do when fighting you?",
                        response: "Water! Never use water on me! It causes explosive spattering, spreads burning oil everywhere. Use a fire blanket or wet chemical system instead.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you only appear in restaurants?",
                        response: "Nah, home kitchens too. Anywhere people cook with oil. But commercial kitchens are where I really shine.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'electrical',
                name: 'E. Sparks "The Short"',
                emoji: '⚡',
                subtitle: 'The Current Culprit',
                fireClass: 'Electrical',
                openingStatement: "I'm powered by electricity gone wrong. Overloaded circuits, faulty wiring, damaged equipment - wherever current flows incorrectly, I follow. Turn off the power first!",
                dialogueOptions: [
                    {
                        question: "What causes you to appear?",
                        response: "Electrical faults - overloaded extension cords, damaged wiring, faulty appliances. When electricity arcs or overheats, I'm born from the sparks.",
                        type: 'correct'
                    },
                    {
                        question: "Where do you commonly strike?",
                        response: "Offices, server rooms, workshops - anywhere with lots of electrical equipment. Old buildings with outdated wiring are prime targets.",
                        type: 'neutral'
                    },
                    {
                        question: "What's the first thing people should do when facing you?",
                        response: "Cut the power! Turn off electricity at the source. Only then can you fight me safely with CO2 or dry powder. Never water while I'm live!",
                        type: 'neutral'
                    },
                    {
                        question: "Do you prefer day or night?",
                        response: "Doesn't matter to me. I strike whenever electrical systems fail, regardless of time. Though I do love busy offices with lots of equipment running.",
                        type: 'incorrect'
                    }
                ]
            }
        ];

        this.victims = [
            {
                id: 'hawker',
                name: 'Uncle Lim',
                emoji: '👨‍🍳',
                subtitle: 'Hawker Stall Owner',
                susceptibleTo: 'class-f',
                location: 'Newton Food Centre',
                openingStatement: "Wah, so scary lah! I was cooking char kway teow, oil very hot already. Then suddenly the wok catch fire! I panic and pour water... alamak, the fire become bigger!",
                dialogueOptions: [
                    {
                        question: "Tell me exactly what happened with the fire.",
                        response: "The oil in my wok was smoking, then suddenly whoosh! Big flame! I pour water thinking can put out, but the oil splash everywhere and fire spread to other stoves!",
                        type: 'correct'
                    },
                    {
                        question: "What type of cooking were you doing?",
                        response: "Char kway teow lah! Need very hot oil for wok hei. I cook this dish for 30 years already, but this time the oil too hot, I think.",
                        type: 'neutral'
                    },
                    {
                        question: "How did you eventually put out the fire?",
                        response: "My neighbor Uncle Wong got fire blanket, cover the wok. Then we turn off gas. Fire die down slowly. Lucky the fire department come fast.",
                        type: 'neutral'
                    },
                    {
                        question: "Do you have insurance for your stall?",
                        response: "Aiya, why you ask about insurance? I more worried about my customers and other stall owners. Money can earn back, but people cannot replace.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'student',
                name: 'Sarah Tan',
                emoji: '👩‍🎓',
                subtitle: 'University Student',
                susceptibleTo: 'class-a',
                location: 'NUS Hostel Room',
                openingStatement: "I was studying for finals, had papers and books everywhere. My desk lamp got too hot and somehow my notes caught fire. Everything just went up so fast!",
                dialogueOptions: [
                    {
                        question: "What materials were burning in your room?",
                        response: "My lecture notes, textbooks, curtains near my desk. All paper and fabric stuff. The fire spread from my desk to the bookshelf, then to my bed sheets.",
                        type: 'correct'
                    },
                    {
                        question: "How did the fire start exactly?",
                        response: "I think my desk lamp overheated. I had it on for hours while studying. It was touching some papers and they just started smoldering, then burst into flames.",
                        type: 'neutral'
                    },
                    {
                        question: "How did you manage to escape?",
                        response: "I grabbed my phone and ran out immediately. Pulled the fire alarm in the corridor. The sprinkler system activated and helped control the fire.",
                        type: 'neutral'
                    },
                    {
                        question: "Were you alone when this happened?",
                        response: "Yes, my roommate was at the library. I was so focused on studying, I didn't notice the lamp getting so hot until it was too late.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'mechanic',
                name: 'Ahmad bin Hassan',
                emoji: '👨‍🔧',
                subtitle: 'Car Mechanic',
                susceptibleTo: 'class-b',
                location: 'Automobile Workshop',
                openingStatement: "I was draining engine oil when some spilled on the floor. A spark from my welding work nearby ignited it. The fire spread so fast along the oil spill!",
                dialogueOptions: [
                    {
                        question: "What exactly caught fire in your workshop?",
                        response: "Engine oil that spilled on the concrete floor. Also had some petrol in containers nearby. The fire followed the oil spill like a river of flames.",
                        type: 'correct'
                    },
                    {
                        question: "How did the ignition happen?",
                        response: "I was doing some welding work on another car. A spark must have jumped to where the oil spilled. These liquids ignite so easily with just a tiny spark.",
                        type: 'neutral'
                    },
                    {
                        question: "What did you use to fight the fire?",
                        response: "I tried water first but it just spread the burning oil around! Then I used the foam extinguisher. That worked much better on the liquid fire.",
                        type: 'neutral'
                    },
                    {
                        question: "How long have you been a mechanic?",
                        response: "15 years already. I know workshop safety, but sometimes accidents happen. This reminded me why we need proper fire safety equipment.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'office-worker',
                name: 'Jennifer Wong',
                emoji: '👩‍💼',
                subtitle: 'IT Manager',
                susceptibleTo: 'electrical',
                location: 'CBD Office Building',
                openingStatement: "Our server room had an electrical fault. Sparks started flying from the main panel, then the whole rack caught fire. The sprinklers couldn't activate because we had to keep power on initially.",
                dialogueOptions: [
                    {
                        question: "What caused the electrical fire?",
                        response: "Overloaded circuit in our server rack. Too many high-power servers on one circuit. The wiring overheated and started arcing, then the insulation caught fire.",
                        type: 'correct'
                    },
                    {
                        question: "Why didn't you cut power immediately?",
                        response: "We have critical systems running 24/7. I was trying to isolate the problem circuit first, but the fire spread too quickly through the electrical panels.",
                        type: 'neutral'
                    },
                    {
                        question: "How was the fire eventually controlled?",
                        response: "We had to shut down main power, then used CO2 extinguishers. The fire department brought special electrical fire suppression equipment.",
                        type: 'neutral'
                    },
                    {
                        question: "How much data was lost?",
                        response: "That's not really relevant to the fire investigation. We had backups, but the important thing is understanding how to prevent electrical fires.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'chemist',
                name: 'Dr. Raj Patel',
                emoji: '👨‍🔬',
                subtitle: 'Industrial Chemist',
                susceptibleTo: 'class-d',
                location: 'Chemical Research Lab',
                openingStatement: "We were processing magnesium compounds when some metal shavings ignited. The fire was incredibly bright and hot. Water made it worse - created hydrogen gas and explosive reactions.",
                dialogueOptions: [
                    {
                        question: "What specific metals were involved in the fire?",
                        response: "Magnesium shavings and some lithium compounds. We were doing materials research. These metals burn extremely hot and react violently with water.",
                        type: 'correct'
                    },
                    {
                        question: "How did the metal ignition occur?",
                        response: "Static electricity, we think. Magnesium shavings are very sensitive. Even a small spark can ignite them, and once they start burning, they're very difficult to stop.",
                        type: 'neutral'
                    },
                    {
                        question: "What fire suppression methods work on metal fires?",
                        response: "Special Class D dry powder designed for metal fires. Sand can help smother small fires. Never water - it creates hydrogen gas and explosive reactions.",
                        type: 'neutral'
                    },
                    {
                        question: "How often do you work with these materials?",
                        response: "This is specialized research, so not daily. But when we do work with reactive metals, we follow strict safety protocols. This was an unusual accident.",
                        type: 'incorrect'
                    }
                ]
            },
            {
                id: 'warehouse',
                name: 'David Lim',
                emoji: '👷‍♂️',
                subtitle: 'Warehouse Supervisor',
                susceptibleTo: 'class-c',
                location: 'Industrial Gas Storage',
                openingStatement: "Gas leak from a damaged propane cylinder. We didn't notice until someone started a forklift nearby. The explosion was massive - blew out windows and damaged several storage units.",
                dialogueOptions: [
                    {
                        question: "What type of gas caused the explosion?",
                        response: "Propane from damaged cylinders in storage. The gas leaked slowly and accumulated in the warehouse. When the forklift engine sparked, everything went up at once.",
                        type: 'correct'
                    },
                    {
                        question: "How long was the gas leaking before ignition?",
                        response: "We're not sure. Could have been hours. Propane is heavier than air, so it settled in low areas. We didn't smell it because the warehouse is so large.",
                        type: 'neutral'
                    },
                    {
                        question: "What safety measures do you normally have?",
                        response: "Gas detectors, ventilation systems, no-smoking policies. But this leak was from a damaged valve we didn't notice during routine inspection.",
                        type: 'neutral'
                    },
                    {
                        question: "How many people were injured?",
                        response: "Thankfully only minor injuries. But that's not really what matters for understanding how gas fires work, is it?",
                        type: 'incorrect'
                    }
                ]
            }
        ];

        // Create correct matches mapping
        this.correctMatches = {
            'class-a': 'student',
            'class-b': 'mechanic', 
            'class-c': 'warehouse',
            'class-d': 'chemist',
            'class-f': 'hawker',
            'electrical': 'office-worker'
        };
    }

    // Initialize UI event listeners and elements
    initializeUI() {
        // Get DOM elements
        this.elements = {
            characterPanel: document.getElementById('characterPanel'),
            interviewPanel: document.getElementById('interviewPanel'),
            matchingPanel: document.getElementById('matchingPanel'),
            resultsPanel: document.getElementById('resultsPanel'),
            characterGrid: document.getElementById('characterGrid'),
            culpritsBtn: document.getElementById('culpritsBtn'),
            victimsBtn: document.getElementById('victimsBtn'),
            backBtn: document.getElementById('backBtn'),
            matchBackBtn: document.getElementById('matchBackBtn'),
            characterName: document.getElementById('characterName'),
            characterType: document.getElementById('characterType'),
            characterStatement: document.getElementById('characterStatement'),
            dialogueOptions: document.getElementById('dialogueOptions'),
            characterResponse: document.getElementById('characterResponse'),
            selectedCulprit: document.getElementById('selectedCulprit'),
            selectedVictim: document.getElementById('selectedVictim'),
            confirmMatchBtn: document.getElementById('confirmMatchBtn'),
            score: document.getElementById('score'),
            currentMode: document.getElementById('currentMode'),
            finalScore: document.getElementById('finalScore'),
            matchesSummary: document.getElementById('matchesSummary'),
            restartBtn: document.getElementById('restartBtn'),
            tooltip: document.getElementById('tooltip')
        };

        // Add event listeners
        this.elements.culpritsBtn.addEventListener('click', () => this.switchMode('culprits'));
        this.elements.victimsBtn.addEventListener('click', () => this.switchMode('victims'));
        this.elements.backBtn.addEventListener('click', () => this.showCharacterSelection());
        this.elements.matchBackBtn.addEventListener('click', () => this.showCharacterSelection());
        this.elements.confirmMatchBtn.addEventListener('click', () => this.confirmMatch());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());

        // Add tooltip functionality
        this.addTooltipListeners();
    }

    // Switch between culprits and victims view
    switchMode(mode) {
        this.currentMode = mode;
        this.elements.culpritsBtn.classList.toggle('active', mode === 'culprits');
        this.elements.victimsBtn.classList.toggle('active', mode === 'victims');
        this.elements.currentMode.textContent = mode === 'culprits' ? 'Investigating Culprits' : 'Interviewing Victims';
        this.renderCharacterGrid();
    }

    // Show character selection panel
    showCharacterSelection() {
        this.currentPanel = 'selection';
        this.hideAllPanels();
        this.elements.characterPanel.style.display = 'flex';
        this.renderCharacterGrid();
    }

    // Hide all panels
    hideAllPanels() {
        this.elements.characterPanel.style.display = 'none';
        this.elements.interviewPanel.style.display = 'none';
        this.elements.matchingPanel.style.display = 'none';
        this.elements.resultsPanel.style.display = 'none';
    }

    // Render character grid based on current mode
    renderCharacterGrid() {
        const characters = this.currentMode === 'culprits' ? this.culprits : this.victims;
        this.elements.characterGrid.innerHTML = '';

        characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            
            // Add status classes
            if (this.interviewedCharacters.has(character.id)) {
                card.classList.add('interviewed');
            }
            if (this.isCharacterMatched(character.id)) {
                card.classList.add('matched');
            }

            card.innerHTML = `
                <div class="character-emoji">${character.emoji}</div>
                <div class="character-name">${character.name}</div>
                <div class="character-subtitle">${character.subtitle}</div>
            `;

            // Add click handler
            card.addEventListener('click', () => {
                if (!this.isCharacterMatched(character.id)) {
                    this.selectCharacter(character);
                }
            });

            // Add tooltip
            card.setAttribute('data-tooltip', `${character.fireClass || character.location} - Click to interview`);

            this.elements.characterGrid.appendChild(card);
        });
    }

    // Check if character is already matched
    isCharacterMatched(characterId) {
        return this.matches.some(match => 
            match.culprit === characterId || match.victim === characterId
        );
    }

    // Select character for interview or matching
    selectCharacter(character) {
        if (this.currentMode === 'culprits') {
            if (this.selectedVictim) {
                // If victim already selected, go to matching
                this.selectedCulprit = character;
                this.showMatchingPanel();
            } else {
                // Interview culprit
                this.showInterview(character);
            }
        } else {
            if (this.selectedCulprit) {
                // If culprit already selected, go to matching
                this.selectedVictim = character;
                this.showMatchingPanel();
            } else {
                // Interview victim
                this.showInterview(character);
            }
        }
    }

    // Show interview panel
    showInterview(character) {
        this.currentPanel = 'interview';
        this.hideAllPanels();
        this.elements.interviewPanel.style.display = 'flex';

        // Set character info
        this.elements.characterName.textContent = character.name;
        this.elements.characterType.textContent = character.fireClass || character.location;
        this.elements.characterStatement.textContent = character.openingStatement;

        // Clear previous response
        this.elements.characterResponse.style.display = 'none';

        // Render dialogue options
        this.renderDialogueOptions(character);

        // Mark as interviewed
        this.interviewedCharacters.add(character.id);
    }

    // Render dialogue options for character
    renderDialogueOptions(character) {
        this.elements.dialogueOptions.innerHTML = '';

        character.dialogueOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'dialogue-btn';
            button.textContent = option.question;
            
            button.addEventListener('click', () => {
                // Remove previous selections
                document.querySelectorAll('.dialogue-btn').forEach(btn => 
                    btn.classList.remove('selected'));
                
                // Mark this button as selected
                button.classList.add('selected');
                
                // Show response
                this.showCharacterResponse(option.response);
                
                // Store character for potential matching
                if (this.currentMode === 'culprits') {
                    this.selectedCulprit = character;
                } else {
                    this.selectedVictim = character;
                }
            });

            this.elements.dialogueOptions.appendChild(button);
        });
    }

    // Show character response to dialogue
    showCharacterResponse(response) {
        this.elements.characterResponse.textContent = response;
        this.elements.characterResponse.style.display = 'block';
    }

    // Show matching panel
    showMatchingPanel() {
        this.currentPanel = 'matching';
        this.hideAllPanels();
        this.elements.matchingPanel.style.display = 'flex';

        // Display selected characters
        if (this.selectedCulprit) {
            this.elements.selectedCulprit.innerHTML = `
                <div class="character-emoji">${this.selectedCulprit.emoji}</div>
                <div class="character-name">${this.selectedCulprit.name}</div>
                <div class="character-subtitle">${this.selectedCulprit.fireClass}</div>
            `;
        }

        if (this.selectedVictim) {
            this.elements.selectedVictim.innerHTML = `
                <div class="character-emoji">${this.selectedVictim.emoji}</div>
                <div class="character-name">${this.selectedVictim.name}</div>
                <div class="character-subtitle">${this.selectedVictim.location}</div>
            `;
        }

        // Enable confirm button if both selected
        this.elements.confirmMatchBtn.disabled = !(this.selectedCulprit && this.selectedVictim);
    }

    // Confirm the match
    confirmMatch() {
        if (!this.selectedCulprit || !this.selectedVictim) return;

        const isCorrect = this.correctMatches[this.selectedCulprit.id] === this.selectedVictim.id;
        
        // Add match to results
        this.matches.push({
            culprit: this.selectedCulprit.id,
            victim: this.selectedVictim.id,
            culpritName: this.selectedCulprit.name,
            victimName: this.selectedVictim.name,
            correct: isCorrect
        });

        // Clear selections
        this.selectedCulprit = null;
        this.selectedVictim = null;

        // Update score
        this.updateScore();

        // Check if game complete
        if (this.matches.length === 6) {
            this.showResults();
        } else {
            this.showCharacterSelection();
        }
    }

    // Update score display
    updateScore() {
        const correctMatches = this.matches.filter(match => match.correct).length;
        this.elements.score.textContent = `${correctMatches}/6`;
    }

    // Show final results
    showResults() {
        this.currentPanel = 'results';
        this.hideAllPanels();
        this.elements.resultsPanel.style.display = 'flex';

        const correctMatches = this.matches.filter(match => match.correct).length;
        const percentage = Math.round((correctMatches / 6) * 100);

        this.elements.finalScore.textContent = `You solved ${correctMatches} out of 6 cases correctly (${percentage}%)`;

        // Generate matches summary
        let summaryHTML = '<h4>Case Summary:</h4>';
        this.matches.forEach(match => {
            const status = match.correct ? '✅' : '❌';
            summaryHTML += `<div>${status} ${match.culpritName} → ${match.victimName}</div>`;
        });

        // Add learning summary
        summaryHTML += '<br><h4>Fire Classification Review:</h4>';
        summaryHTML += '<div>Class A: Ordinary combustibles (wood, paper, fabric)</div>';
        summaryHTML += '<div>Class B: Flammable liquids (oil, gasoline, paint)</div>';
        summaryHTML += '<div>Class C: Flammable gases (propane, natural gas)</div>';
        summaryHTML += '<div>Class D: Combustible metals (magnesium, lithium)</div>';
        summaryHTML += '<div>Class F: Cooking oils and fats</div>';
        summaryHTML += '<div>Electrical: Live electrical equipment</div>';

        this.elements.matchesSummary.innerHTML = summaryHTML;
    }

    // Restart the game
    restartGame() {
        // Reset game state
        this.currentMode = 'culprits';
        this.currentPanel = 'selection';
        this.interviewedCharacters.clear();
        this.matches = [];
        this.selectedCulprit = null;
        this.selectedVictim = null;

        // Reset UI
        this.elements.score.textContent = '0/6';
        this.elements.currentMode.textContent = 'Investigation';
        this.switchMode('culprits');
        this.showCharacterSelection();
    }

    // Add tooltip functionality
    addTooltipListeners() {
        document.addEventListener('mouseover', (e) => {
            const tooltip = e.target.getAttribute('data-tooltip');
            if (tooltip) {
                this.showTooltip(e, tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.getAttribute('data-tooltip')) {
                this.hideTooltip();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.elements.tooltip.style.opacity === '1') {
                this.positionTooltip(e);
            }
        });
    }

    // Show tooltip
    showTooltip(event, text) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.style.opacity = '1';
        this.positionTooltip(event);
    }

    // Position tooltip
    positionTooltip(event) {
        const tooltip = this.elements.tooltip;
        const rect = this.elements.container || document.body.getBoundingClientRect();
        
        let x = event.clientX - rect.left + 10;
        let y = event.clientY - rect.top - 30;

        // Keep tooltip within bounds
        if (x + tooltip.offsetWidth > rect.width) {
            x = event.clientX - rect.left - tooltip.offsetWidth - 10;
        }
        if (y < 0) {
            y = event.clientY - rect.top + 20;
        }

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.style.opacity = '0';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect if running in iframe
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }
    
    // Start the game
    new FireInvestigatorGame();
});