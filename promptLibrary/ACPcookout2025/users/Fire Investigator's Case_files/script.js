// Fire Investigator's Case - Interactive Learning Experience
// This script manages the three-phase investigation game

class FireInvestigatorGame {
    constructor() {
        // Game state management
        this.currentPhase = 'character-selection';
        this.interviewedCharacters = new Set();
        this.currentCharacter = null;
        this.selectedQuestion = null;
        this.matches = new Map(); // For final matching phase
        this.gameData = this.initializeGameData();
        
        // Initialize the game
        this.init();
    }

    // Initialize game data with all characters and their dialogue
    initializeGameData() {
        return {
            culprits: {
                'mr-a-combustible': {
                    name: 'Mr. A. Combustible',
                    type: 'Class A Fire',
                    avatar: 'A',
                    opening: "They have me caged, Officer, but you can't contain nature. I deal in the common, the everyday. Wood, paper, fabric—the fuel of ordinary life. I am everywhere, and I leave little behind but fine ash and lingering heat.",
                    questions: [
                        {
                            text: "What happens when someone tries to extinguish you with a bucket of water?",
                            value: "high",
                            response: "Water is my natural enemy. It cools my temperature below my ignition point. It dampens my solid fuel sources and stops the chain reaction. It's the simplest way to kill me."
                        },
                        {
                            text: "Do you leave behind any residue other than ash, like grease or liquid trails?",
                            value: "low",
                            response: "Absolutely not. My business is burning solids clean. I don't slosh or flow. I am a slow, deep burn that turns matter into carbon and smoke."
                        },
                        {
                            text: "Is your smoke typically heavy and black, or lighter in colour?",
                            value: "probing",
                            response: "When I first start, the smoke is usually quite light, grey, or white, depending on how fast I burn the paper or the cloth. It's not the thick, oily black stuff of my liquid counterparts."
                        },
                        {
                            text: "What is your opinion on the state of fire safety in residential buildings?",
                            value: "neutral",
                            response: "The average Singapore flat is a haven for me. Too many books, too much furniture, too many textiles. Complacency is my best friend."
                        }
                    ]
                },
                'ms-b-liquid': {
                    name: 'Ms. B. Liquid Flow',
                    type: 'Class B Fire',
                    avatar: 'B',
                    opening: "I am slippery and swift. I don't just burn up, I flow and pool, seeking out any nearby surface area. They call me reckless, but liquids are just looking for freedom, Officer. They should have contained their fuels better.",
                    questions: [
                        {
                            text: "If someone tried to use a dry chemical or foam extinguisher on you, how effective would that be?",
                            value: "high",
                            response: "That's how they finally beat me. The foam creates a blanket that stops the fuel vapour from reaching the oxygen. Smother me, and I can't breathe or burn. That's the proper way to fight me."
                        },
                        {
                            text: "Did you smell anything like natural gas or propane before the ignition?",
                            value: "low",
                            response: "Gas? No, this is an auto-repair shop. We deal in liquid fossil fuels, not kitchen gases. There was no hiss, just a quick flash and then a terrible rush."
                        },
                        {
                            text: "Is your fire generally localized or does it spread rapidly across a distance?",
                            value: "probing",
                            response: "I am famous for my surface spread. If the spill is long, my flame front will follow it instantly. I don't go deep; I skim the top and vaporize the fuel as I go."
                        },
                        {
                            text: "Do you have a preference for certain types of industries or environments?",
                            value: "neutral",
                            response: "I love mechanics, garages, refineries—anywhere they carelessly handle large quantities of flammable solvents and oils."
                        }
                    ]
                },
                'mr-c-gas': {
                    name: 'Mr. C. Flammable Gas',
                    type: 'Class C Fire',
                    avatar: 'C',
                    opening: "The problem with gas, Officer, is that it only takes a single, tiny spark to ignite the whole thing. I am invisible until I am a deadly flame, and I burn with incredible intensity, focused right at the point of the leak. I'm hard to see, but impossible to ignore.",
                    questions: [
                        {
                            text: "What is the single most important action to stop your fire from continuing to burn?",
                            value: "high",
                            response: "You must stop the flow of the fuel. Find the valve, turn it off, and I vanish. If you don't cut the line, I'll keep jetting out, burning as long as the pressure holds."
                        },
                        {
                            text: "Does your fire usually leave a lot of ash or residual soot after the event?",
                            value: "low",
                            response: "I'm one of the cleanest burns around. Gases are highly efficient. I might melt the container I was escaping from, but you won't find a big pile of glowing embers from me."
                        },
                        {
                            text: "Do you typically announce your presence with a distinctive sound before the fire starts?",
                            value: "probing",
                            response: "If the pipe or container is breached, you'll hear me. A very recognizable hissing sound as the pressurized gas forces its way out before the ignition point."
                        },
                        {
                            text: "Are you restricted mainly to industrial or commercial settings?",
                            value: "neutral",
                            response: "No, I'm in every home that uses propane for the BBQ or has natural gas running to the stove. I'm an everyday risk in a concentrated form."
                        }
                    ]
                },
                'dr-d-metal': {
                    name: 'Dr. D. Metal Burn',
                    type: 'Class D Fire',
                    avatar: 'D',
                    opening: "I am a specialist. I deal in the exotic: Magnesium, Potassium, Sodium, Titanium. My fire is bright, it's beautiful, and it burns hotter than almost anything else. I am not to be trifled with, and certainly not to be fought with common methods.",
                    questions: [
                        {
                            text: "If someone sprayed you with water, what would be the immediate outcome?",
                            value: "high",
                            response: "It would be an explosion. The water is immediately broken down into hydrogen and oxygen by my intense heat, and that reaction is violent and instantaneous. It's the worst possible mistake."
                        },
                        {
                            text: "What kind of visual appearance does your fire have that makes it distinct?",
                            value: "probing",
                            response: "It's the light. Not yellow or red like wood or liquid, but an incredibly dazzling, brilliant white light that can be harmful to look at directly. I am intense and concentrated."
                        },
                        {
                            text: "Is it true that you can be easily put out with a blanket or sand?",
                            value: "low",
                            response: "Sand? No. You need a specialized powder agent that actually adheres to the surface of the burning metal to smother the reaction. Anything else is useless or dangerous."
                        },
                        {
                            text: "Are you primarily encountered in commercial or domestic settings?",
                            value: "neutral",
                            response: "Almost exclusively in industrial, laboratory, or aerospace settings where these rare earth metals are stored or processed."
                        }
                    ]
                },
                'chef-f-fryer': {
                    name: 'Chef F. Fryer',
                    type: 'Class F Fire',
                    avatar: 'F',
                    opening: "I am born of the kitchen, Officer. High heat, deep oil, and an operator who turns their back for one second. I may start small in the wok, but my heat is so sustained that even if you smother me, I'll re-ignite because the cooking oil stays super-hot.",
                    questions: [
                        {
                            text: "What is the critical danger of trying to extinguish you with water?",
                            value: "high",
                            response: "It's a guaranteed fireball. The water instantly vaporizes into steam, dragging the burning oil up and out of the container, causing a massive, spreading flare-up. The damage is explosive."
                        },
                        {
                            text: "What type of extinguishing agent is most effective against your high-temperature fuel?",
                            value: "probing",
                            response: "You need a wet chemical agent. It causes a reaction called 'saponification,' forming a soapy foam that both seals and cools the burning oil simultaneously."
                        },
                        {
                            text: "Do you spread easily across the floor like a petrol fire?",
                            value: "low",
                            response: "No, I am typically contained within my vessel—a fryer or wok. I am an in-place fire. My danger is my high temperature and my violent reaction to water."
                        },
                        {
                            text: "What types of businesses are most susceptible to your activities?",
                            value: "neutral",
                            response: "Any restaurant, hawker stall, or food factory that uses deep-fryers or industrial quantities of animal fats and vegetable oils."
                        }
                    ]
                },
                'e-sparks': {
                    name: 'E. Sparks (The "Short")',
                    type: 'Electrical Fire',
                    avatar: 'E',
                    opening: "I am the silent killer in the walls and behind the screens. I'm born of overloaded circuits and resistance heating. I am alive only as long as the current flows. Once the power is cut, my life source is gone, but I can leave a real mess behind.",
                    questions: [
                        {
                            text: "If you are actively burning, what is the safest and most effective first step to stop you?",
                            value: "high",
                            response: "The most important thing is to disconnect the power source. Throw the circuit breaker or pull the plug. If the equipment isn't energized, I can't be an electrical fire anymore."
                        },
                        {
                            text: "What would happen if someone used a water-based fire extinguisher on you while you were energized?",
                            value: "probing",
                            response: "They would risk electrocution. Water conducts current, turning the extinguisher user into part of my circuit. You need a non-conductive agent like CO2 or dry chemical powder."
                        },
                        {
                            text: "Do you typically burn as brightly and as intensely as a flammable metal fire?",
                            value: "low",
                            response: "No, my heat comes from concentrated resistance. I'm not as intensely bright as a metal burn. I'm more concerned with melting plastic, wires, and circuit boards."
                        },
                        {
                            text: "Are you often found in older buildings with outdated wiring systems?",
                            value: "neutral",
                            response: "Age is definitely a factor, but so is modern gadgetry. People plug too many high-draw devices into one circuit. That creates the heat I need."
                        }
                    ]
                }
            },
            victims: {
                'madam-lye': {
                    name: 'Madam Lye Peng',
                    type: 'Hawker Stall Owner',
                    avatar: 'L',
                    opening: "Officer, this is a tragedy! Thirty years of serving the best kway teow and now my wok station is ruined. The fire came out of nowhere, right from the deep oil in the pan. I just thank my lucky stars no customers were hurt!",
                    questions: [
                        {
                            text: "Madam, what exactly did you use to try and put out the flames initially?",
                            value: "high",
                            response: "I grabbed the nearest thing, the water hose from the sink! But when I splashed it in, it was like an explosion! The flames just flew out and spread everywhere immediately. It was terrifying."
                        },
                        {
                            text: "How long have you been running this particular stall in the hawker center?",
                            value: "neutral",
                            response: "Since the centre opened, forty years ago. We are a pioneer generation stall! We take great pride in our hygiene and safety standards, this is not my fault."
                        },
                        {
                            text: "Were there any electrical devices near the wok that may have short-circuited?",
                            value: "low",
                            response: "Electrical? No, no. This was hot oil, not a hairdryer! The current was fine, the fan was working normally right up until the fire."
                        },
                        {
                            text: "Did you notice any smoke or strange smells before the fire started?",
                            value: "probing",
                            response: "Only the usual smell of burning chilli and delicious caramelisation. It flared up suddenly. It was very thick, dark grey smoke, then the flames took over."
                        }
                    ]
                },
                'ben-tan': {
                    name: 'Ben Tan',
                    type: 'University Student',
                    avatar: 'T',
                    opening: "It was my project deadline, so I was up late, working. I just woke up to the smell. It wasn't a bang or a spark, just... smoke. I couldn't believe how quickly the fire ate through all my textbooks and notes.",
                    questions: [
                        {
                            text: "What material comprised the bulk of the items that were burning hottest?",
                            value: "high",
                            response: "It was mainly the big stack of old newspapers, my research print-outs, and a pile of old cotton laundry I hadn't folded yet. They just kept smoldering after the main flames died down."
                        },
                        {
                            text: "Were you using any external heating sources, like a space heater or a gas burner?",
                            value: "low",
                            response: "No, officer. It's Singapore! Why would I need a heater? The air-conditioning unit was actually running to keep the room cool."
                        },
                        {
                            text: "Describe the smoke and the appearance of the burnt materials after the flames died down.",
                            value: "probing",
                            response: "The smoke was light, almost white or grey, and thick. The things that burned were reduced to fine, light ash and there were bits that were glowing red hot, even after they stopped actively burning."
                        },
                        {
                            text: "Did you manage to save any of your literary manuscripts or personal items?",
                            value: "neutral",
                            response: "A few hard drives, thankfully. But the originals, the hand-written notes—all gone. It's a huge setback for my graduation thesis."
                        }
                    ]
                },
                'raju-pillay': {
                    name: 'Raju Pillay',
                    type: 'Workshop Manager',
                    avatar: 'R',
                    opening: "We followed all protocols, Officer. But one tiny spill near the welding bay—that was enough. The fire didn't just burn up, it sloshed and spread across the floor, like water, only much, much faster. It was all over within minutes.",
                    questions: [
                        {
                            text: "What was the nature of the fuel source that allowed the fire to spread so quickly?",
                            value: "high",
                            response: "We were working on a major overhaul, so there were containers of engine oil, gear lubricant, and a small drum of high-octane fuel nearby. It was definitely a liquid that caught the flame."
                        },
                        {
                            text: "Did you smell anything like natural gas or propane before the ignition?",
                            value: "low",
                            response: "Gas? No, this is an auto-repair shop. We deal in liquid fossil fuels, not kitchen gases. There was no hiss, just a quick flash and then a terrible rush."
                        },
                        {
                            text: "Did the fire appear to burn on a surface or travel upwards vertically?",
                            value: "probing",
                            response: "It was all on the ground level. It seemed to flow quickly across the concrete floor, chasing the path of any oil or grease it could find. We couldn't contain the surface spread."
                        },
                        {
                            text: "What is your typical schedule and how many employees were in the bay at the time?",
                            value: "neutral",
                            response: "We operate 24 hours a day to meet shipping deadlines. There were four men in that specific bay, and they all evacuated safely, thank goodness."
                        }
                    ]
                },
                'cheryl-lim': {
                    name: 'Ms. Cheryl Lim',
                    type: 'IT Auditor',
                    avatar: 'C',
                    opening: "I was doing a routine inspection of the main data rack when the smell hit me—not smoke, but that awful, distinct smell of hot plastic and melting wiring. Then, this little blue spark jumped out from the back of the power supply unit. It was the equipment that was the culprit.",
                    questions: [
                        {
                            text: "Was the fire primarily extinguished by applying water or by shutting off the main power?",
                            value: "high",
                            response: "The fire suppression system kicked in, but the flames only truly began to die down once the emergency power cut-off switch was thrown. We had to de-energize the entire rack before it was safe to approach."
                        },
                        {
                            text: "What kind of data was being stored on the server that caught fire?",
                            value: "neutral",
                            response: "Sensitive client information, all backed up, thankfully. My main concern is the structural integrity of the rack and the remaining network infrastructure."
                        },
                        {
                            text: "Did you notice any residual metallic powder or unusual ash on the surrounding floor?",
                            value: "low",
                            response: "Metallic powder? No, it was a clean server room environment. Just melted casing, black charring, and that really acrid, ozone-like smell."
                        },
                        {
                            text: "Did the equipment appear to be overloaded or was it running above recommended temperature?",
                            value: "probing",
                            response: "We had been installing a new patch, so the processors were definitely working hard and running hot, maybe hotter than they should. The cabinet alarm for high amperage had just triggered."
                        }
                    ]
                },
                'kenneth-koh': {
                    name: 'Dr. Kenneth Koh',
                    type: 'Metallurgist',
                    avatar: 'K',
                    opening: "This was a highly unfortunate industrial incident. The fire originated within a specialized process chamber designed for handling rare earth compounds. The heat was immense, and the resulting light was almost blinding.",
                    questions: [
                        {
                            text: "What were the primary elements being processed in the chamber when the incident occurred?",
                            value: "high",
                            response: "It was a mix of powdered Magnesium and Titanium alloy. They are necessary for the product, but we know their risks. The fire had a fierce, dazzling white colour that was hard to look at."
                        },
                        {
                            text: "Can you describe the extinguishing agent used to bring the fire under control?",
                            value: "probing",
                            response: "We had to use the specialized powder extinguisher (a Class D agent). We knew from our training that using carbon dioxide or, heaven forbid, water, would have simply made the metallic reaction far, far worse."
                        },
                        {
                            text: "Was there any attempt to spray down the surrounding area with a hose or water system?",
                            value: "low",
                            response: "Absolutely not. That would be catastrophic. Introducing water to these materials at high temperatures would have caused a violent, explosive reaction and vaporised the water instantly."
                        },
                        {
                            text: "What is the typical safety protocol for material handling in that specific research laboratory?",
                            value: "neutral",
                            response: "Triple-redundancy on safety locks and personal protective equipment. This incident was due to a material failure, not a human one."
                        }
                    ]
                },
                'siti-ali': {
                    name: 'Siti Binti Ali',
                    type: 'Logistics Coordinator',
                    avatar: 'S',
                    opening: "I was just signing the manifest for a container going to Malaysia when I heard a faint hissing sound near the portable generator. Next thing I knew, there was a jet of flame shooting out like a blowtorch. It was a terrifying, fast burn.",
                    questions: [
                        {
                            text: "What substance was being stored or used that provided the fuel for that 'jet of flame'?",
                            value: "high",
                            response: "It came from the high-pressure cylinder attached to the generator—LPG (Liquefied Petroleum Gas), used for fuelling. The fire was intense, but it had a distinct, almost invisible base near the leak point."
                        },
                        {
                            text: "What was the critical action that finally brought the intense flame under control?",
                            value: "probing",
                            response: "The first step was to get to the main valve on the gas tank and shut off the supply. Once the flow of gas was cut off, the fire essentially starved and went out quickly."
                        },
                        {
                            text: "Did the fire appear to leave significant solid residue or deep-seated charring?",
                            value: "low",
                            response: "Not really. It was a clean, hot burn. It damaged the plastic casing around the tank, but it wasn't the kind of fire that leaves glowing embers everywhere."
                        },
                        {
                            text: "What was the status of the container that was being processed at the time of the incident?",
                            value: "neutral",
                            response: "It was waiting for final customs clearance. Luckily, the flames didn't spread far enough to damage any of the cargo inside, which was mainly dry goods."
                        }
                    ]
                }
            },
            // Correct matching solutions
            correctMatches: {
                'mr-a-combustible': 'ben-tan',
                'ms-b-liquid': 'raju-pillay',
                'mr-c-gas': 'siti-ali',
                'dr-d-metal': 'kenneth-koh',
                'chef-f-fryer': 'madam-lye',
                'e-sparks': 'cheryl-lim'
            }
        };
    }

    // Initialize the game interface and event listeners
    init() {
        this.setupEventListeners();
        this.populateCharacterLists();
        this.updateProgress();
        this.detectIframeMode();
    }

    // Detect if running in iframe and adjust styling accordingly
    detectIframeMode() {
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            document.body.classList.add('iframe-mode');
        }
    }

    // Set up all event listeners for the game
    setupEventListeners() {
        // Character selection listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('character-card')) {
                this.selectCharacter(e.target.dataset.characterId);
            }
        });

        // Interview screen listeners
        document.getElementById('back-to-selection').addEventListener('click', () => {
            this.showPhase('character-selection');
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('question-option')) {
                this.selectQuestion(e.target);
            }
        });

        document.getElementById('mark-complete').addEventListener('click', () => {
            this.completeInterview();
        });

        // Matching screen listeners
        document.getElementById('proceed-to-matching').addEventListener('click', () => {
            this.initializeMatchingPhase();
        });

        document.getElementById('clear-matches').addEventListener('click', () => {
            this.clearAllMatches();
        });

        document.getElementById('submit-matches').addEventListener('click', () => {
            this.submitFinalMatches();
        });

        document.getElementById('restart-game').addEventListener('click', () => {
            this.restartGame();
        });

        // Matching interaction listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('match-item')) {
                this.handleMatchSelection(e.target);
            }
        });
    }

    // Populate the character lists in the selection screen
    populateCharacterLists() {
        const culpritsList = document.getElementById('culprits-list');
        const victimsList = document.getElementById('victims-list');

        // Clear existing content
        culpritsList.innerHTML = '';
        victimsList.innerHTML = '';

        // Populate culprits
        Object.entries(this.gameData.culprits).forEach(([id, character]) => {
            const card = this.createCharacterCard(id, character, 'culprit');
            culpritsList.appendChild(card);
        });

        // Populate victims
        Object.entries(this.gameData.victims).forEach(([id, character]) => {
            const card = this.createCharacterCard(id, character, 'victim');
            victimsList.appendChild(card);
        });
    }

    // Create a character card element
    createCharacterCard(id, character, type) {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.characterId = id;
        card.dataset.characterType = type;
        
        if (this.interviewedCharacters.has(id)) {
            card.classList.add('interviewed');
        }

        card.innerHTML = `
            <div class="character-name">${character.name}</div>
        `;

        return card;
    }

    // Select a character for interview
    selectCharacter(characterId) {
        const characterType = document.querySelector(`[data-character-id="${characterId}"]`).dataset.characterType;
        const character = characterType === 'culprit' ? 
            this.gameData.culprits[characterId] : 
            this.gameData.victims[characterId];

        this.currentCharacter = { id: characterId, type: characterType, data: character };
        this.setupInterviewScreen();
        this.showPhase('interview-screen');
    }

    // Set up the interview screen with character data
    setupInterviewScreen() {
        const { data } = this.currentCharacter;
        
        document.getElementById('current-avatar').textContent = data.avatar;
        document.getElementById('character-name').textContent = data.name;
        document.getElementById('character-type').textContent = data.type;
        document.getElementById('opening-statement').textContent = data.opening;

        // Populate questions
        const questionsContainer = document.getElementById('question-options');
        questionsContainer.innerHTML = '';

        data.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-option';
            questionElement.dataset.questionIndex = index;
            questionElement.textContent = question.text;
            questionsContainer.appendChild(questionElement);
        });

        // Reset response section
        document.getElementById('response-section').style.display = 'none';
        this.selectedQuestion = null;
    }

    // Handle question selection
    selectQuestion(questionElement) {
        // Clear previous selection
        document.querySelectorAll('.question-option').forEach(q => q.classList.remove('selected'));
        
        // Select current question
        questionElement.classList.add('selected');
        const questionIndex = parseInt(questionElement.dataset.questionIndex);
        this.selectedQuestion = this.currentCharacter.data.questions[questionIndex];

        // Show response
        document.getElementById('character-response').textContent = this.selectedQuestion.response;
        document.getElementById('response-section').style.display = 'block';
    }

    // Complete the current interview
    completeInterview() {
        if (this.selectedQuestion) {
            this.interviewedCharacters.add(this.currentCharacter.id);
            this.updateProgress();
            this.showPhase('character-selection');
            this.populateCharacterLists(); // Refresh to show completed status
        }
    }

    // Update the progress indicator
    updateProgress() {
        const totalCharacters = Object.keys(this.gameData.culprits).length + Object.keys(this.gameData.victims).length;
        const completed = this.interviewedCharacters.size;
        
        document.getElementById('interview-progress').textContent = `Interviews Completed: ${completed}/${totalCharacters}`;
        
        // Enable proceed button if all interviews are complete
        const proceedBtn = document.getElementById('proceed-to-matching');
        proceedBtn.disabled = completed < totalCharacters;
    }

    // Initialize the matching phase
    initializeMatchingPhase() {
        this.populateMatchingColumns();
        this.showPhase('matching-screen');
    }

    // Populate the matching columns
    populateMatchingColumns() {
        const suspectsColumn = document.getElementById('suspects-column');
        const victimsColumn = document.getElementById('victims-column');

        suspectsColumn.innerHTML = '';
        victimsColumn.innerHTML = '';

        // Populate suspects
        Object.entries(this.gameData.culprits).forEach(([id, character]) => {
            const item = document.createElement('div');
            item.className = 'match-item suspect';
            item.dataset.characterId = id;
            item.textContent = character.name;
            suspectsColumn.appendChild(item);
        });

        // Populate victims
        Object.entries(this.gameData.victims).forEach(([id, character]) => {
            const item = document.createElement('div');
            item.className = 'match-item victim';
            item.dataset.characterId = id;
            item.textContent = character.name;
            victimsColumn.appendChild(item);
        });
    }

    // Handle match selection logic
    handleMatchSelection(element) {
        const characterId = element.dataset.characterId;
        const isSelected = element.classList.contains('selected');

        if (isSelected) {
            // Deselect
            element.classList.remove('selected');
            return;
        }

        // Check if this is a suspect or victim
        const isSuspect = element.classList.contains('suspect');
        
        if (isSuspect) {
            // Clear other suspect selections
            document.querySelectorAll('.match-item.suspect.selected').forEach(item => {
                item.classList.remove('selected');
            });
        } else {
            // Clear other victim selections
            document.querySelectorAll('.match-item.victim.selected').forEach(item => {
                item.classList.remove('selected');
            });
        }

        // Select current item
        element.classList.add('selected');

        // Check if we have both suspect and victim selected
        const selectedSuspect = document.querySelector('.match-item.suspect.selected');
        const selectedVictim = document.querySelector('.match-item.victim.selected');

        if (selectedSuspect && selectedVictim) {
            // Create match
            const suspectId = selectedSuspect.dataset.characterId;
            const victimId = selectedVictim.dataset.characterId;
            
            this.createMatch(suspectId, victimId);
            
            // Clear selections and mark as matched
            selectedSuspect.classList.remove('selected');
            selectedVictim.classList.remove('selected');
            selectedSuspect.classList.add('matched');
            selectedVictim.classList.add('matched');
        }
    }

    // Create a match between suspect and victim
    createMatch(suspectId, victimId) {
        this.matches.set(suspectId, victimId);
    }

    // Clear all matches
    clearAllMatches() {
        this.matches.clear();
        document.querySelectorAll('.match-item').forEach(item => {
            item.classList.remove('selected', 'matched');
        });
    }

    // Submit final matches and show results
    submitFinalMatches() {
        if (this.matches.size < 6) {
            alert('Please complete all matches before submitting.');
            return;
        }

        const results = this.evaluateMatches();
        this.showResults(results);
    }

    // Evaluate the matches against correct answers
    evaluateMatches() {
        const results = {
            correct: 0,
            total: 6,
            matches: [],
            score: 0
        };

        this.matches.forEach((victimId, suspectId) => {
            const isCorrect = this.gameData.correctMatches[suspectId] === victimId;
            const suspectName = this.gameData.culprits[suspectId].name;
            const victimName = this.gameData.victims[victimId].name;
            
            results.matches.push({
                suspect: suspectName,
                victim: victimName,
                correct: isCorrect,
                suspectId: suspectId,
                victimId: victimId
            });

            if (isCorrect) {
                results.correct++;
            }
        });

        results.score = Math.round((results.correct / results.total) * 100);
        return results;
    }

    // Show the results screen
    showResults(results) {
        const resultsContent = document.getElementById('results-content');
        
        let html = `
            <div class="score-display">
                <h4>Final Score: ${results.score}%</h4>
                <p>Correct Matches: ${results.correct}/${results.total}</p>
            </div>
            <div class="matches-review">
        `;

        results.matches.forEach(match => {
            const statusClass = match.correct ? 'correct' : 'incorrect';
            const statusIcon = match.correct ? '✓' : '✗';
            
            html += `
                <div class="match-result ${statusClass}">
                    <span class="status-icon">${statusIcon}</span>
                    <span class="match-text">${match.suspect} ↔ ${match.victim}</span>
                </div>
            `;
        });

        html += '</div>';

        // Add feedback for incorrect matches
        if (results.correct < results.total) {
            html += '<div class="feedback-section"><h4>Review Hints:</h4>';
            results.matches.forEach(match => {
                if (!match.correct) {
                    const correctVictimId = this.gameData.correctMatches[match.suspectId];
                    const correctVictimName = this.gameData.victims[correctVictimId].name;
                    html += `<p><strong>${match.suspect}</strong> should be matched with <strong>${correctVictimName}</strong>. Review the key evidence from your interviews.</p>`;
                }
            });
            html += '</div>';
        }

        resultsContent.innerHTML = html;
        document.getElementById('results-section').style.display = 'block';
    }

    // Restart the entire game
    restartGame() {
        this.interviewedCharacters.clear();
        this.matches.clear();
        this.currentCharacter = null;
        this.selectedQuestion = null;
        
        document.getElementById('results-section').style.display = 'none';
        this.populateCharacterLists();
        this.updateProgress();
        this.showPhase('character-selection');
    }

    // Show a specific phase of the game
    showPhase(phaseName) {
        document.querySelectorAll('.phase').forEach(phase => {
            phase.classList.remove('active');
        });
        
        document.getElementById(phaseName).classList.add('active');
        this.currentPhase = phaseName;
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FireInvestigatorGame();
});

// Add some CSS for results styling
const additionalCSS = `
.score-display {
    background: rgba(255, 215, 0, 0.2);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    text-align: center;
}

.score-display h4 {
    color: #ffd700;
    font-size: 18px;
    margin-bottom: 5px;
}

.matches-review {
    margin-bottom: 15px;
}

.match-result {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
}

.match-result.correct {
    background: rgba(0, 255, 0, 0.2);
}

.match-result.incorrect {
    background: rgba(255, 0, 0, 0.2);
}

.status-icon {
    font-weight: bold;
    font-size: 16px;
}

.match-result.correct .status-icon {
    color: #00ff00;
}

.match-result.incorrect .status-icon {
    color: #ff0000;
}

.feedback-section {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
}

.feedback-section h4 {
    color: #ffd700;
    margin-bottom: 10px;
}

.feedback-section p {
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 1.4;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);