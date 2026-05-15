document.addEventListener('DOMContentLoaded', () => {
    const mainMenuScreen = document.getElementById('main-menu-screen');
    const branchScreen = document.getElementById('branch-screen');
    const quizScreen = document.getElementById('quiz-screen');

    const branchTitle = document.getElementById('branch-title');
    const questionText = document.getElementById('question-text');
    const optionsArea = document.getElementById('options-area');
    const feedbackArea = document.getElementById('feedback-area');
    const submitBranchAnswerButton = document.getElementById('submit-branch-answer');
    const nextPhaseButton = document.getElementById('next-phase-button');

    // Infographic display elements
    const infographicDisplayImg = document.getElementById('infographic-display'); // If using full image
    const legislatureInfoPanel = document.getElementById('legislature-info');
    const executiveInfoPanel = document.getElementById('executive-info');
    const judiciaryInfoPanel = document.getElementById('judiciary-info');
    const allInfoPanels = [legislatureInfoPanel, executiveInfoPanel, judiciaryInfoPanel];


    // Quiz screen elements
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizOptionsArea = document.getElementById('quiz-options-area');
    const submitQuizAnswerButton = document.getElementById('submit-quiz-answer');
    const quizFeedbackArea = document.getElementById('quiz-feedback-area');
    const quizNextButton = document.getElementById('quiz-next-button');
    const quizScoreDisplay = document.getElementById('quiz-score');


    let currentBranch = '';
    let currentPhase = ''; // 'composition' or 'function'
    let quizScore = 0;
    let currentQuizQuestionIndex = 0;

    const branchData = {
        legislature: {
            titleColor: '#00A99D',
            infoPanelId: 'legislature-info',
            composition: {
                question: "The Legislature consists of:", // Q2
                options: ["The President and Parliament", "The President and the Cabinet", "The Parliament and the Prime Minister"],
                correctAnswer: "The President and Parliament"
            },
            functionScenario: {
                question: "A proposal is made to create a new law for environmental protection. As part of the Legislature, what is your primary action?",
                options: [
                    { text: "Implement the environmental protection plan.", correct: false, feedback: "This is an Executive function." },
                    { text: "Debate, draft, and vote on the proposed law.", correct: true, feedback: "Correct! The Legislature makes and passes laws." },
                    { text: "Judge a company for violating an existing environmental law.", correct: false, feedback: "This is a Judiciary function." }
                ],
                correctAnswerText: "Debate, draft, and vote on the proposed law." // For checking
            }
        },
        executive: {
            titleColor: '#6A0DAD',
            infoPanelId: 'executive-info',
            composition: {
                question: "The Executive consists of:", // Q3
                options: ["The President and Parliament", "The President and the Cabinet, led by the Prime Minister", "The Chief Justice and the Courts"],
                correctAnswer: "The President and the Cabinet, led by the Prime Minister"
            },
            functionScenario: {
                question: "A new 'Safe Roads Act' has just been passed. As part of the Executive, what is your primary action?",
                options: [
                    { text: "Debate whether the 'Safe Roads Act' is fair.", correct: false, feedback: "Debating laws is primarily for the Legislature." },
                    { text: "Develop plans for new road safety measures and ensure police enforce the new rules.", correct: true, feedback: "Correct! The Executive implements and enforces laws." },
                    { text: "Decide if a driver has broken the 'Safe Roads Act' in a court case.", correct: false, feedback: "Judging legal breaches is for the Judiciary." }
                ],
                correctAnswerText: "Develop plans for new road safety measures and ensure police enforce the new rules."
            }
        },
        judiciary: {
            titleColor: '#D81B60',
            infoPanelId: 'judiciary-info',
            composition: { // Q4
                question: "The Judiciary consists of (select all that apply):",
                options: ["The Family Justice Courts", "The International Court of Justice", "The State Courts", "The Supreme Court", "The Parliament"],
                correctAnswers: ["The Family Justice Courts", "The State Courts", "The Supreme Court"],
                type: 'checkbox'
            },
            functionScenario: {
                question: "Two companies have a dispute over a contract. As part of the Judiciary, what is your primary action?",
                options: [
                    { text: "Create a new law about contracts.", correct: false, feedback: "Creating laws is for the Legislature." },
                    { text: "Administer a government program to help companies write contracts.", correct: false, feedback: "This sounds more like an Executive agency's role." },
                    { text: "Interpret the existing contract law and make a formal judgement on the dispute.", correct: true, feedback: "Correct! The Judiciary interprets laws and resolves disputes." }
                ],
                correctAnswerText: "Interpret the existing contract law and make a formal judgement on the dispute."
            }
        }
    };

    const finalQuizData = [
        { // Q1 adapted
            question: "Match the primary function to the correct branch: 'Makes and passes laws'.",
            options: ["Legislature", "Executive", "Judiciary"],
            correctAnswer: "Legislature"
        },
        {
            question: "Match the primary function to the correct branch: 'Implements and enforces laws'.",
            options: ["Legislature", "Executive", "Judiciary"],
            correctAnswer: "Executive"
        },
        {
            question: "Match the primary function to the correct branch: 'Interprets and applies laws'.",
            options: ["Legislature", "Executive", "Judiciary"],
            correctAnswer: "Judiciary"
        },
        { // Q6
            question: "Do the three branches of government have unlimited power to make decisions or carry out policies?",
            options: ["Yes", "No"],
            correctAnswer: "No"
        }
    ];

    // --- Main Menu Logic ---
    document.querySelectorAll('.branch-button').forEach(button => {
        button.addEventListener('click', (e) => {
            currentBranch = e.target.dataset.branch;
            mainMenuScreen.style.display = 'none';
            branchScreen.style.display = 'block';
            quizScreen.style.display = 'none';
            branchTitle.textContent = currentBranch.charAt(0).toUpperCase() + currentBranch.slice(1);
            branchTitle.style.backgroundColor = branchData[currentBranch].titleColor;
            
            allInfoPanels.forEach(panel => panel.style.display = 'none');
            document.getElementById(branchData[currentBranch].infoPanelId).style.display = 'block';
            
            startBranchPhase('composition');
        });
    });

    document.getElementById('final-quiz-button').addEventListener('click', () => {
        mainMenuScreen.style.display = 'none';
        branchScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        currentQuizQuestionIndex = 0;
        quizScore = 0;
        quizScoreDisplay.textContent = quizScore;
        loadQuizQuestion();
    });


    // --- Branch Screen Logic ---
    function startBranchPhase(phase) {
        currentPhase = phase;
        feedbackArea.innerHTML = '';
        optionsArea.innerHTML = '';
        nextPhaseButton.style.display = 'none';
        submitBranchAnswerButton.style.display = 'block';

        const data = (phase === 'composition') ? branchData[currentBranch].composition : branchData[currentBranch].functionScenario;
        questionText.textContent = data.question;

        const inputType = data.type === 'checkbox' ? 'checkbox' : 'radio';
        data.options.forEach((optionTextOrObj, index) => {
            const optionValue = typeof optionTextOrObj === 'string' ? optionTextOrObj : optionTextOrObj.text;
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = inputType;
            input.name = 'branch_option';
            input.value = optionValue;
            input.id = `option${index}`;
            label.appendChild(input);
            label.appendChild(document.createTextNode(optionValue));
            optionsArea.appendChild(label);
        });
    }

    submitBranchAnswerButton.addEventListener('click', () => {
        const data = (currentPhase === 'composition') ? branchData[currentBranch].composition : branchData[currentBranch].functionScenario;
        let isCorrect = false;

        if (data.type === 'checkbox') {
            const selectedOptions = Array.from(optionsArea.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            if (selectedOptions.length === 0) {
                 feedbackArea.textContent = 'Please select at least one option.';
                 feedbackArea.className = 'incorrect';
                 return;
            }
            // Check if all correct answers are selected and no incorrect answers are selected
            const allCorrectSelected = data.correctAnswers.every(ans => selectedOptions.includes(ans));
            const noIncorrectSelected = selectedOptions.every(sel => data.correctAnswers.includes(sel));
            isCorrect = allCorrectSelected && noIncorrectSelected && selectedOptions.length === data.correctAnswers.length;
            feedbackArea.textContent = isCorrect ? "Correct!" : `Not quite. The correct selections are: ${data.correctAnswers.join(', ')}`;

        } else { // Radio buttons
            const selected = optionsArea.querySelector('input[type="radio"]:checked');
            if (!selected) {
                feedbackArea.textContent = 'Please select an answer.';
                feedbackArea.className = 'incorrect';
                return;
            }
            const correctAnswer = (currentPhase === 'composition') ? data.correctAnswer : data.correctAnswerText;
            isCorrect = selected.value === correctAnswer;

            if (currentPhase === 'composition') {
                 feedbackArea.textContent = isCorrect ? "Correct!" : `Incorrect. The correct answer is: ${correctAnswer}`;
            } else { // function scenario
                const selectedOptionObj = data.options.find(opt => opt.text === selected.value);
                feedbackArea.textContent = selectedOptionObj.feedback;
            }
        }

        feedbackArea.className = isCorrect ? 'correct' : 'incorrect';
        if (isCorrect) {
            nextPhaseButton.style.display = 'block';
            submitBranchAnswerButton.style.display = 'none';
        } else {
            nextPhaseButton.style.display = 'none'; // Or allow to proceed anyway after incorrect
        }
    });

    nextPhaseButton.addEventListener('click', () => {
        if (currentPhase === 'composition') {
            startBranchPhase('function');
        } else { // Finished function phase
            mainMenuScreen.style.display = 'block';
            branchScreen.style.display = 'none';
        }
    });

    // --- Quiz Screen Logic ---
    function loadQuizQuestion() {
        quizFeedbackArea.innerHTML = '';
        quizOptionsArea.innerHTML = '';
        quizNextButton.style.display = 'none';
        submitQuizAnswerButton.style.display = 'block';

        if (currentQuizQuestionIndex < finalQuizData.length) {
            const qData = finalQuizData[currentQuizQuestionIndex];
            quizQuestionText.textContent = qData.question;
            qData.options.forEach((option, i) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'quiz_option';
                input.value = option;
                input.id = `quiz_option${i}`;
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                quizOptionsArea.appendChild(label);
            });
        } else {
            quizQuestionText.textContent = "Quiz Complete!";
            quizOptionsArea.innerHTML = `Your final score is ${quizScore} out of ${finalQuizData.length}.`;
            submitQuizAnswerButton.style.display = 'none';
            quizNextButton.textContent = "Back to Menu";
            quizNextButton.style.display = 'block';
            quizNextButton.onclick = () => { // Change action for the last button
                 mainMenuScreen.style.display = 'block';
                 quizScreen.style.display = 'none';
            };
        }
    }

    submitQuizAnswerButton.addEventListener('click', () => {
        const selected = quizOptionsArea.querySelector('input[name="quiz_option"]:checked');
        if (!selected) {
            quizFeedbackArea.textContent = "Please select an answer.";
            quizFeedbackArea.className = 'incorrect';
            return;
        }

        const qData = finalQuizData[currentQuizQuestionIndex];
        const isCorrect = selected.value === qData.correctAnswer;

        if (isCorrect) {
            quizFeedbackArea.textContent = "Correct!";
            quizFeedbackArea.className = 'correct';
            quizScore++;
            quizScoreDisplay.textContent = quizScore;
        } else {
            quizFeedbackArea.textContent = `Incorrect. The correct answer is: ${qData.correctAnswer}`;
            quizFeedbackArea.className = 'incorrect';
        }
        submitQuizAnswerButton.style.display = 'none';
        quizNextButton.textContent = "Next Question";
        quizNextButton.style.display = 'block';
        quizNextButton.onclick = loadNextQuizQuestion; // Ensure it's set to default next action
    });

    function loadNextQuizQuestion() {
         currentQuizQuestionIndex++;
         loadQuizQuestion();
    }
    quizNextButton.addEventListener('click', loadNextQuizQuestion); // Initial assignment for "Next Question"

});