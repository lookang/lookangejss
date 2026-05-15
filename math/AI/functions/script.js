// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // Fun Function Machine code
    // =========================

    // Helper to pick bright random colour for blocks
    function randomColor() {
        const colours = ["#ff3d00", "#ff6d00", "#dd2c00", "#00bfa5", "#2962ff", "#d500f9", "#ff1744", "#00c853", "#fbc02d", "#f57c00", "#4caf50", "#1976d2"]; // Added more colors
        return colours[Math.floor(Math.random() * colours.length)];
    }

    // A set of simple function rules pupils can discover
    // Updated to include more pattern variations including ^2 for square and ^3 for cube
    const rules = [
        { calc: x => x + 1, text: "Add 1", patterns: ["x+1", "+1", "1+", "plus 1", "add 1"] },
        { calc: x => x + 2, text: "Add 2", patterns: ["x+2", "+2", "2+", "plus 2", "add 2"] },
        { calc: x => x * 2, text: "Double", patterns: ["x*2", "*2", "2*", "x×2", "×2", "2×", "double", "times 2", "multiply by 2", "2x"] },
        { calc: x => x * 2 + 1, text: "Double then add 1", patterns: ["x*2+1", "2x+1", "double+1", "double then add 1", "times 2 plus 1", "*2+1"] },
        { calc: x => x - 1, text: "Minus 1", patterns: ["x-1", "-1", "subtract 1", "minus 1", "take away 1"] },
        { calc: x => x * 3, text: "Triple", patterns: ["x*3", "*3", "3*", "x×3", "×3", "3×", "triple", "times 3", "multiply by 3", "3x"] },
        { calc: x => x * x, text: "Square", patterns: ["x*x", "x²", "x^2", "^2", "square", "x squared", "power of 2"] }, // Added ^2 as requested
        { calc: x => x + 5, text: "Add 5", patterns: ["x+5", "+5", "5+", "plus 5", "add 5"] },
        // Added cube function with ^3 pattern as requested
        { calc: x => x * x * x, text: "Cube", patterns: ["x*x*x", "x³", "x^3", "^3", "cube", "x cubed", "power of 3"] }
    ];

    let currentRule; // stores the rule object in play
    let score = 0; // track student's score
    let blockInTransit = false; // Flag to prevent multiple blocks animating at once

    // DOM elements we need
    const numberBtnsContainer = document.getElementById("numberBtns");
    const outputDisplay = document.getElementById("outputDisplay");
    const attemptBody = document.querySelector("#attemptTable tbody");
    const revealBtn = document.getElementById("revealBtn");
    const newRuleBtn = document.getElementById("newRuleBtn");
    const machine = document.getElementById("machine");

    // New elements for student answer checking
    const functionGuessInput = document.getElementById("functionGuess");
    const checkAnswerBtn = document.getElementById("checkAnswerBtn");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const scoreDisplay = document.getElementById("scoreDisplay");

    // Check if all required elements exist before proceeding
    if (!numberBtnsContainer || !outputDisplay || !attemptBody || !revealBtn || !newRuleBtn || !machine || !functionGuessInput || !checkAnswerBtn || !feedbackMessage || !scoreDisplay) {
        console.error("Initialization failed: One or more required DOM elements not found.");
        // Display an error message to the user in the app itself
        const appContainer = document.getElementById('app');
        if(appContainer) {
            appContainer.innerHTML = '<p style="color: red; text-align: center; font-weight: bold;">Error: Could not load the Function Machine components. Please check the HTML structure.</p>';
        }
        return; // Stop script execution if elements are missing
    }


    // 1. Build number buttons 0-9
    for (let i = 0; i <= 9; i++) {
        const btn = document.createElement("button");
        btn.className = "numberBtn";
        btn.textContent = i;
        // give each button its own cheerful colour
        btn.style.background = randomColor();
        btn.addEventListener("click", () => processInput(i));
        numberBtnsContainer.appendChild(btn);
    }

    // 2. Select a random rule to start
    resetRule();

    function resetRule() {
        // Ensure a new rule is selected (different from the current one if possible)
        let newRuleIndex;
        // Handle the case where rules array might be empty
        if (rules.length === 0) {
            console.error("No rules defined!");
            feedbackMessage.textContent = "Error: No rules available.";
            feedbackMessage.className = "incorrect";
            return;
        }
        const currentRuleIndex = rules.indexOf(currentRule);
        do {
            newRuleIndex = Math.floor(Math.random() * rules.length);
        } while (rules.length > 1 && newRuleIndex === currentRuleIndex); // Avoid same rule if possible

        currentRule = rules[newRuleIndex];
        outputDisplay.textContent = "?";
        attemptBody.innerHTML = ""; // Clear the table body
        feedbackMessage.textContent = ""; // Clear feedback
        feedbackMessage.className = ""; // Reset feedback class
        functionGuessInput.value = ""; // Clear guess input
        blockInTransit = false; // Reset animation flag
        console.log("New rule selected:", currentRule.text); // For debugging
    }

    // 3. Handle an input chosen by the pupil
    function processInput(num) {
        // Prevent processing if a block is already moving
        if (blockInTransit) {
            console.log("Animation in progress, please wait.");
            // Maybe provide visual feedback that it's busy?
            // e.g., slightly grey out the number buttons
            return;
        }
        // Check if a rule is selected
        if (!currentRule) {
            console.error("No current rule selected.");
            feedbackMessage.textContent = "Error: No rule is active.";
            feedbackMessage.className = "incorrect";
            return;
        }

        blockInTransit = true; // Set the flag

        // calculate output using hidden rule
        let result;
        try {
             result = currentRule.calc(num);
        } catch (error) {
            console.error("Error calculating result:", error);
            feedbackMessage.textContent = "Error processing the number.";
            feedbackMessage.className = "incorrect";
            blockInTransit = false; // Reset flag on error
            return;
        }


        // Make an animated coloured block with the input number
        const block = document.createElement("div");
        block.className = "block";
        block.style.background = randomColor();
        block.textContent = num;

        // when animation ends, show output & record attempt
        block.addEventListener("animationend", () => {
            // remove block from DOM after travel
            // Check if the block still has a parent before removing
            if (block.parentNode) {
                block.remove();
            }
            showOutput(result);
            recordAttempt(num, result);
            blockInTransit = false; // Reset the flag
        }, { once: true }); // Use { once: true } to automatically remove the listener after it fires

        // Handle potential animation start issues (though less common)
        block.addEventListener("animationstart", () => {
            console.log("Block animation started for:", num);
        }, { once: true });

        // trigger animation via CSS keyframes
        // The animation duration should match the CSS @keyframes duration
        block.style.animation = "travel 1.8s forwards ease-in-out";
        machine.appendChild(block);

        // Clear output display while travelling
        outputDisplay.textContent = "...";
    }

    // Put the output big on the right
    function showOutput(value) {
        // Ensure the value is displayed correctly, handle potential undefined/null
        outputDisplay.textContent = (value !== null && value !== undefined) ? value : '?';
    }

    // Add a row to the attempts table so pupils can find the pattern
    function recordAttempt(inp, out) {
        const row = document.createElement("tr");
        // Sanitize input/output slightly if needed, though numbers are generally safe
        row.innerHTML = `<td>${inp}</td><td>${out}</td>`;
        // Prepend to show latest attempt at the top (optional)
        // attemptBody.prepend(row);
        attemptBody.appendChild(row); // Append to show oldest first
    }

    // Reveal button shows the rule in a custom message box & on page
    revealBtn.addEventListener("click", () => {
        if (!currentRule) {
             feedbackMessage.textContent = "No rule is active.";
             feedbackMessage.className = "incorrect";
             return;
        }
        // Use the feedback area to show the rule instead of alert()
        feedbackMessage.textContent = `The rule was: ${currentRule.text}`;
        // Add a specific class for styling the reveal message if desired
        feedbackMessage.className = "info";
    });

    // New rule button starts fresh
    newRuleBtn.addEventListener("click", () => {
        resetRule();
    });

    // --- Check student's answer ---
    function checkStudentAnswer() {
        if (!currentRule) {
             feedbackMessage.textContent = "No rule is active to check against.";
             feedbackMessage.className = "incorrect";
             return;
        }

        const studentGuessRaw = functionGuessInput.value;
        const studentGuess = studentGuessRaw.trim().toLowerCase()
                                // Replace common variations for better matching
                                .replace(/times/g, '*')
                                .replace(/multiply by/g, '*')
                                .replace(/plus/g, '+')
                                .replace(/add/g, '+')
                                .replace(/subtract/g, '-')
                                .replace(/minus/g, '-')
                                .replace(/take away/g, '-')
                                .replace(/squared/g, '^2')
                                .replace(/cubed/g, '^3')
                                .replace(/power of (\d)/g, '^$1') // e.g., power of 2 -> ^2
                                .replace(/\s+/g, ''); // Remove all spaces


        // Don't allow empty submissions
        if (!studentGuess) {
            feedbackMessage.textContent = "Please enter your guess first!";
            feedbackMessage.className = "incorrect";
            return;
        }

        // Normalize patterns for comparison (remove spaces, lowercase)
        // Ensure patterns exist before mapping
        const normalizedPatterns = (currentRule.patterns || []).map(p =>
            p.toLowerCase().replace(/\s+/g, '')
        );

        // Check if the student's normalized answer matches any of the acceptable normalized patterns
        const isCorrect = normalizedPatterns.some(pattern => studentGuess === pattern);

        if (isCorrect) {
            // Correct answer - award 1 mark
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            feedbackMessage.textContent = "Correct! Well done! +1 mark. Try the 'New Rule' button!";
            feedbackMessage.className = "correct";
            // Optionally disable input/button after correct guess until new rule
            // functionGuessInput.disabled = true;
            // checkAnswerBtn.disabled = true;
        } else {
            feedbackMessage.textContent = "Not quite right. Look at the table and try again!";
            feedbackMessage.className = "incorrect";
        }
    }

    // Add event listener for the check answer button
    checkAnswerBtn.addEventListener("click", checkStudentAnswer);

    // Also allow Enter key to submit answer in the input field
    functionGuessInput.addEventListener("keypress", (event) => {
        // event.key === 'Enter' is the modern standard
        if (event.key === "Enter") {
            // Prevent the default form submission behavior if it were in a form
            event.preventDefault();
            // Trigger the check answer function
            checkStudentAnswer();
        }
    });

}); // End of DOMContentLoaded
