# Building an Interactive Gear Simulation

This post details the process of creating an interactive web simulation that demonstrates how interlocking gears rotate and how to determine when they realign. The simulation allows users to change the number of teeth on three gears (A, B, and C) and observe the resulting motion. The core challenge presented is: "How many times must the first wheel turn to make all of the dots line up again?"

## The Goal

We want to visualize three gears (A, B, C) meshed together. When Gear A turns, Gears B and C should turn accordingly based on their teeth ratios. Each gear has a reference dot. The user can change the number of teeth and then incrementally turn Gear A. The simulation tracks full rotations, and the user can try to figure out how many turns of Gear A are needed for all three dots to return to their starting position simultaneously.

## 1. HTML Structure (`index.html`)

The foundation is standard HTML. We need:

*   **A Title:** An `<h1>` tag to state the simulation's purpose/question.
*   **Gear Elements:** Three `div` elements (`id="gearA"`, `id="gearB"`, `id="gearC"`) represent the gears. Inside each, we place:
    *   A `div` with class `radius-line` (visualized by CSS).
    *   A `div` with class `dot` (visualized by CSS).
*   **Controls:**
    *   Buttons for "Turn" (`id="turnButton"`) and "Reset" (`id="resetButton"`).
*   **Inputs & Labels:**
    *   `input type="number"` fields (`id="teethA"`, `id="teethB"`, `id="teethC"`) for users to set the teeth count.
    *   Labels (`A`, `B`, `C`) and `span` elements (`id="rotCountA"`, etc.) to display the full rotation count for each gear.
*   **Answer Check Area:** An `input type="number"` (`id="answerA"`) for the user's guess, a "Check Answer" button (`id="checkAnswerButton"`), and a `p` tag (`id="feedbackMessage"`) for feedback.
*   **Linking:** `<link>` tag for `style.css` and `<script>` tag for `script.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Interlocking Gears</title>
    <link rel="stylesheet" href="style.css">
    <!-- ... other head elements ... -->
</head>
<body>
    <h1>How many times must each wheel turn to make all of the dots line up again?</h1>

    <div class="controls wide-controls">
        <button id="turnButton" class="wide-button">Turn</button>
        <button id="resetButton" class="wide-button">Reset</button>
    </div>

    <div class="simulation-container">
        <div class="gear-assembly">
            <!-- Gear A -->
            <div class="gear gear-a" id="gearA">
                <div class="radius-line"></div>
                <div class="dot"></div>
            </div>
            <!-- Gear B -->
            <div class="gear gear-b" id="gearB">
                <div class="radius-line"></div>
                <div class="dot"></div>
            </div>
            <!-- Gear C -->
            <div class="gear gear-c" id="gearC">
                <div class="radius-line"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="labels">
            <!-- Label Group A -->
            <div class="label-group">
                <span class="label-text">A</span>
                <input type="number" class="teeth-input" id="teethA" value="8" min="1">
                <span class="rotation-count" id="rotCountA">0</span>
            </div>
            <!-- Label Group B -->
            <div class="label-group">
                <span class="label-text">B</span>
                <input type="number" class="teeth-input" id="teethB" value="16" min="1">
                 <span class="rotation-count" id="rotCountB">0</span>
            </div>
            <!-- Label Group C -->
            <div class="label-group">
                <span class="label-text">C</span>
                <input type="number" class="teeth-input" id="teethC" value="24" min="1">
                 <span class="rotation-count" id="rotCountC">0</span>
            </div>
        </div>
        <div class="answer-check-inline">
            <label for="answerA">Turns of A for alignment:</label>
            <input type="number" id="answerA" min="1">
            <button id="checkAnswerButton">Check Answer</button>
            <p id="feedbackMessage" class="feedback-message"></p>
        </div>
    </div>

    <script src="script.js"></script>
    <!-- ... footer ... -->
</body>
</html>
```

## 2. CSS Styling (`style.css`)

CSS brings the structure to life:

*   **Gear Appearance:** Use `border-radius: 50%` to make the gear divs circular. Add background color and borders. A `::before` pseudo-element can create the central axle visually.
*   **Dot & Line:** Style the `.dot` (small, red circle) and `.radius-line` (thin line from center to edge) and position them appropriately within the gear div.
*   **Positioning:** Crucially, set `position: absolute` for the `.gear` class. This allows JavaScript to calculate and set their exact `top` and `left` positions to make them appear meshed. The container (`.simulation-container`) uses `position: relative`.
*   **Rotation Animation:** Apply `transition: transform 0.5s linear;` to the `.gear` class. This makes the rotation smooth when JavaScript updates the `transform: rotate()` style.
*   **Layout:** Use Flexbox and positioning to arrange the controls, labels, and answer section.
*   **Responsiveness:** Employ `@media` queries to adjust styles for different screen sizes, ensuring usability on mobile devices.

```css
/* Key CSS Snippets */
.gear {
    position: absolute; /* Positioned by JS */
    border-radius: 50%;
    background-color: var(--gear-color);
    border: 3px solid var(--gear-border);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s linear; /* Smooth rotation */
}

.gear::before { /* Axle */
    content: '';
    position: absolute;
    width: 20%; height: 20%;
    background-color: var(--axle-color);
    border-radius: 50%;
    border: 3px solid var(--axle-border);
}

.radius-line {
    position: absolute;
    width: 2px; height: 50%;
    background-color: #333;
    left: 50%; top: 0;
    transform-origin: bottom center;
    transform: translateX(-50%);
}

.dot {
    position: absolute;
    width: 12px; height: 12px;
    background-color: var(--dot-color);
    border-radius: 50%;
    top: 8px; left: 50%;
    transform: translateX(-50%);
}

.simulation-container {
    position: relative;
    /* ... other styles ... */
}
```

## 3. JavaScript Logic (`script.js`)

This file orchestrates the simulation's behavior:

*   **Initialization:** Get references to all the interactive HTML elements using `document.getElementById`.
*   **`updateGearVisuals()` Function:**
    *   Reads teeth counts from the inputs.
    *   Calculates gear radii (e.g., `radiusA = teethA * BASE_RADIUS_PER_TOOTH`).
    *   Calculates the `width`, `height`, `left`, and `top` CSS properties for each gear div to position them correctly side-by-side based on their radii.
    *   Applies these styles dynamically. This is called on load and whenever teeth counts change.
*   **`applyRotation()` Function:**
    *   Triggered by the "Turn" button.
    *   Increments Gear A's rotation angle (`currentRotationA += 360`).
    *   Calculates Gear B's rotation: `additionalRotationB = -additionalRotationA * (teethA / teethB)`. (Negative for opposite direction).
    *   Calculates Gear C's rotation relative to B: `additionalRotationC = additionalRotationB * -(teethB / teethC)`. (Negative of B's rotation, so same direction as A).
    *   Updates the `element.style.transform = \`rotate(${angle}deg)\`;` for each gear.
    *   Updates the displayed rotation counts.
*   **`resetGears()` Function:**
    *   Resets rotation angles to 0.
    *   Resets teeth inputs to defaults.
    *   Clears the answer field and feedback.
    *   Calls `updateGearVisuals()` to redraw.
*   **Answer Calculation (`calculateCorrectAnswer()`):**
    *   This is the mathematical core. It finds the number of turns of A needed for *both* B and C to complete an integer number of turns simultaneously relative to A.
    *   Uses helper functions `gcd` (Greatest Common Divisor) and `lcm` (Least Common Multiple).
    *   Turns for B alignment = `teethB / gcd(teethA, teethB)`
    *   Turns for C alignment = `teethC / gcd(teethA, teethC)`
    *   Final Answer = `lcm(turnsForB, turnsForC)`
*   **`checkAnswer()` Function:** Compares the user's input to the `calculateCorrectAnswer()` result and displays feedback.
*   **Event Listeners:** Attach the functions (`applyRotation`, `resetGears`, `updateGearVisuals`, `checkAnswer`) to the relevant events (button clicks, input changes).

```javascript
// Key JavaScript Snippets

let currentRotationA = 0, currentRotationB = 0, currentRotationC = 0;
const BASE_RADIUS_PER_TOOTH = 5;

function updateGearVisuals() {
    const teethA = parseInt(teethAInput.value) || 1;
    // ... get teethB, teethC ...

    const radiusA = teethA * BASE_RADIUS_PER_TOOTH;
    // ... calc radiusB, radiusC ...

    // Calculate positions based on radii to make them touch
    const centerAX = /* starting X */;
    const centerBX = centerAX + radiusA + radiusB;
    const centerCX = centerBX + radiusB + radiusC;

    gearA.style.width = gearA.style.height = `${2 * radiusA}px`;
    gearA.style.left = `${centerAX - radiusA}px`;
    // ... set styles for B and C ...
}

function applyRotation() {
    const teethA = parseInt(teethAInput.value) || 1;
    // ... get teethB, teethC ...

    const additionalRotationA = 360;
    const additionalRotationB = -additionalRotationA * (teethA / teethB);
    const additionalRotationC = -additionalRotationB * (teethB / teethC); // Note the double negative

    currentRotationA += additionalRotationA;
    currentRotationB += additionalRotationB;
    currentRotationC += additionalRotationC;

    gearA.style.transform = `rotate(${currentRotationA}deg)`;
    gearB.style.transform = `rotate(${currentRotationB}deg)`;
    gearC.style.transform = `rotate(${currentRotationC}deg)`;

    // ... update rotation counts ...
}

function gcd(a, b) { /* Euclidean algorithm */ }
function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

function calculateCorrectAnswer() {
    const teethA = /* ... */; const teethB = /* ... */; const teethC = /* ... */;
    const turnsForB = teethB / gcd(teethA, teethB);
    const turnsForC = teethC / gcd(teethA, teethC);
    return lcm(turnsForB, turnsForC);
}

// Add event listeners for buttons and inputs
turnButton.addEventListener('click', applyRotation);
resetButton.addEventListener('click', resetGears);
teethAInput.addEventListener('input', updateGearVisuals);
// ... listeners for teethB, teethC, checkAnswerButton ...

// Initial setup
resetGears();
```

## Replication

To replicate this:
1.  Save the HTML structure into an `index.html` file.
2.  Save the CSS rules into a `style.css` file in the same directory.
3.  Save the JavaScript logic into a `script.js` file in the same directory.
4.  Open `index.html` in your web browser.

You can then experiment with different teeth numbers and observe the gear interactions and alignment patterns.

## Conclusion

This simulation combines HTML for structure, CSS for visual styling and animation hints, and JavaScript for dynamic calculations, interaction logic, and updating the display. The core mathematical concept involves using the Least Common Multiple (LCM) based on gear teeth ratios to find the point of simultaneous realignment.
