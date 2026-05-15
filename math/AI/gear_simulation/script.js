document.addEventListener('DOMContentLoaded', () => {
    const gearA = document.getElementById('gearA');
    const gearB = document.getElementById('gearB');
    const gearC = document.getElementById('gearC');

    // turnsAInput removed as element no longer exists
    // const turnsAInput = document.getElementById('turnsA');

    const teethAInput = document.getElementById('teethA');
    const teethBInput = document.getElementById('teethB');
    const teethCInput = document.getElementById('teethC');

    const turnButton = document.getElementById('turnButton');
    const resetButton = document.getElementById('resetButton');

    // Answer Checking Elements
    const answerAInput = document.getElementById('answerA');
    const checkAnswerButton = document.getElementById('checkAnswerButton');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Rotation Count Elements
    const rotCountA = document.getElementById('rotCountA');
    const rotCountB = document.getElementById('rotCountB');
    const rotCountC = document.getElementById('rotCountC');


    let currentRotationA = 0;
    let currentRotationB = 0;
    let currentRotationC = 0;

    // --- Pan & Zoom State ---
    let scale = 1.0;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let lastDragX = 0;
    let lastDragY = 0;
    const minScale = 0.2;
    const maxScale = 4.0;
    // --- End Pan & Zoom State ---

    const BASE_RADIUS_PER_TOOTH = 5; // px per tooth - determines overall scale

    // Function to apply the main transform to the gear assembly
    function applyAssemblyTransform() {
        const gearAssembly = document.querySelector('.gear-assembly');
        if (gearAssembly) {
            // Centering the transform origin can make scaling feel more natural
            gearAssembly.style.transformOrigin = 'center center';
            gearAssembly.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        }
    }

    function updateGearVisuals() {
        // Container reference might still be useful for context, but not direct positioning
        const container = document.querySelector('.simulation-container');
        if (!container) return;

        // Removed dynamic centering logic based on container size.
        // Gears will now be positioned relative to the assembly's origin (0,0)
        // The pan/zoom transform will handle the overall positioning.

        // Define a fixed starting point *within the assembly's coordinate system*
        const initialOffsetX = 50; // Start gear A slightly offset from the left edge of the assembly
        const initialOffsetY = 150; // Vertical position within the assembly


        const teethA = parseInt(teethAInput.value) || 1;
        const teethB = parseInt(teethBInput.value) || 1;
        const teethC = parseInt(teethCInput.value) || 1;

        const safeTeethA = Math.max(1, teethA);
        const safeTeethB = Math.max(1, teethB);
        const safeTeethC = Math.max(1, teethC);

        // Calculate radii and dimensions
        const radiusA = safeTeethA * BASE_RADIUS_PER_TOOTH;
        const radiusB = safeTeethB * BASE_RADIUS_PER_TOOTH;
        const radiusC = safeTeethC * BASE_RADIUS_PER_TOOTH;

        const widthA = 2 * radiusA;
        const heightA = 2 * radiusA;
        const widthB = 2 * radiusB;
        const heightB = 2 * radiusB;
        const widthC = 2 * radiusC;
        const heightC = 2 * radiusC;

        // Calculate relative center positions starting from initial offsets
        const centerAX = initialOffsetX + radiusA;
        const centerAY = initialOffsetY;

        const distAB = radiusA + radiusB; // Distance between centers
        const centerBX = centerAX + distAB;
        const centerBY = initialOffsetY;

        const distBC = radiusB + radiusC; // Distance between centers
        const centerCX = centerBX + distBC;
        const centerCY = initialOffsetY;

        // Calculate CSS top/left based on relative centers and radii
        const leftA = centerAX - radiusA;
        const topA = centerAY - radiusA;
        const leftB = centerBX - radiusB;
        const topB = centerBY - radiusB;
        const leftC = centerCX - radiusC;
        const topC = centerCY - radiusC;

        // Apply styles for size and position
        gearA.style.width = `${widthA}px`;
        gearA.style.height = `${heightA}px`;
        gearA.style.left = `${leftA}px`;
        gearA.style.top = `${topA}px`;

        gearB.style.width = `${widthB}px`;
        gearB.style.height = `${heightB}px`;
        gearB.style.left = `${leftB}px`;
        gearB.style.top = `${topB}px`;

        gearC.style.width = `${widthC}px`;
        gearC.style.height = `${heightC}px`;
        gearC.style.left = `${leftC}px`;
        gearC.style.top = `${topC}px`;

        // Removed container resizing logic - rely on CSS overflow/min-height
        // Clear feedback when visuals update
         clearFeedback();

        // Apply the overall assembly transform AFTER setting individual gear sizes/positions
        applyAssemblyTransform();
    }

    // --- Helper Functions for Answer Calculation ---
    function gcd(a, b) {
        // Euclidean algorithm for Greatest Common Divisor
        while (b) {
            a %= b;
            [a, b] = [b, a]; // Swap
        }
        return a;
    }

    function lcm(a, b) {
        // Formula: lcm(a, b) = |a * b| / gcd(a, b)
        return Math.abs(a * b) / gcd(a, b);
    }

    function calculateCorrectAnswer() {
        const teethA = parseInt(teethAInput.value) || 1;
        const teethB = parseInt(teethBInput.value) || 1;
        const teethC = parseInt(teethCInput.value) || 1;

        const safeTeethA = Math.max(1, teethA);
        const safeTeethB = Math.max(1, teethB);
        const safeTeethC = Math.max(1, teethC);

        // Calculate turns of A needed for B to complete full rotations
        // Gear B completes a turn when A turns teethB/teethA times.
        // We need the smallest integer N (turns of A) such that N * (safeTeethA / safeTeethB) is an integer.
        // This simplifies to N being a multiple of safeTeethB / gcd(safeTeethA, safeTeethB).
        const turnsForB = safeTeethB / gcd(safeTeethA, safeTeethB);

        // Calculate turns of A needed for C to complete full rotations
        const turnsForC = safeTeethC / gcd(safeTeethA, safeTeethC);

        // The answer is the LCM of the turns needed for B and C (and 1, for A itself)
        const correctAnswer = lcm(turnsForB, turnsForC);

        return correctAnswer;
    }

    function clearFeedback() {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message'; // Reset classes
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerAInput.value);
        if (isNaN(userAnswer)) {
            feedbackMessage.textContent = 'Please enter a valid number.';
            feedbackMessage.className = 'feedback-message incorrect';
            return;
        }

        const correctAnswer = calculateCorrectAnswer();

        if (userAnswer === correctAnswer) {
            feedbackMessage.textContent = 'Correct!';
            feedbackMessage.className = 'feedback-message correct';
        } else {
            // Provide a hint based on whether the guess is too high or too low
            let hint = "Incorrect. ";
            if (userAnswer < correctAnswer) {
                hint += "Try a larger number.";
            } else {
                 hint += "Try a smaller number.";
            }
             hint += " Remember, all dots must return to the top simultaneously.";

            feedbackMessage.textContent = hint;
            feedbackMessage.className = 'feedback-message incorrect';
        }
    }


    function applyRotation() {
        // Always perform 1 turn when the button is clicked
        const turnsA = 1;

        // Read the number of teeth from their input fields, default to 1 if invalid/zero
        const teethA = parseInt(teethAInput.value) || 1;
        const teethB = parseInt(teethBInput.value) || 1;
        const teethC = parseInt(teethCInput.value) || 1;

        // Ensure teeth counts are positive
        const safeTeethA = Math.max(1, teethA);
        const safeTeethB = Math.max(1, teethB);
        const safeTeethC = Math.max(1, teethC);


        // Calculate the additional rotation for Gear A in degrees
        const additionalRotationA = turnsA * 360;

        // Calculate linked rotations based on DYNAMIC gear ratios
        // Gear B ratio relative to A, opposite direction (-)
        const ratioB = safeTeethA / safeTeethB;
        const additionalRotationB = -additionalRotationA * ratioB;

        // Gear C ratio relative to B, opposite direction (-)
        // Overall direction relative to A is same (+)
        const ratioC = safeTeethB / safeTeethC;
        const additionalRotationC = additionalRotationB * -ratioC; // Rotation B * (- ratio C/B) = Rotation A * (- ratio A/B) * (- ratio B/C) = Rotation A * (ratio A/C)
        // Or directly relative to A: Rotation A * (safeTeethA / safeTeethC)
        // const additionalRotationC = additionalRotationA * (safeTeethA / safeTeethC); // Let's use the chained calculation for clarity

        // Update total rotation angles
        currentRotationA += additionalRotationA;
        currentRotationB += additionalRotationB;
        currentRotationC += additionalRotationC;

        // Apply the transform
        gearA.style.transform = `rotate(${currentRotationA}deg)`;
        gearB.style.transform = `rotate(${currentRotationB}deg)`;
        gearC.style.transform = `rotate(${currentRotationC}deg)`;

        // Update rotation counts display
        // Use Math.abs because gear B rotates negatively, but we want a positive count
        rotCountA.textContent = Math.floor(Math.abs(currentRotationA) / 360);
        rotCountB.textContent = Math.floor(Math.abs(currentRotationB) / 360);
        rotCountC.textContent = Math.floor(Math.abs(currentRotationC) / 360);

        // Optionally clear only Gear A's input after turning
        // turnsAInput.value = '';
    }

    function resetGears() {
        currentRotationA = 0;
        currentRotationB = 0;
        currentRotationC = 0;

        gearA.style.transform = `rotate(0deg)`;
        gearB.style.transform = `rotate(0deg)`;
        gearC.style.transform = `rotate(0deg)`;

        // Reset turns inputs - No longer needed
        // turnsAInput.value = '';

        // Reset teeth inputs to default values
        teethAInput.value = 8;
        teethBInput.value = 16;
        teethCInput.value = 24;

        // Clear answer input and feedback
        answerAInput.value = '';
        clearFeedback();

        // Reset pan/zoom state
        scale = 1.0;
        offsetX = 0;
        offsetY = 0;
        isDragging = false;

        // Update visuals to reflect reset state (will also apply transform)
        updateGearVisuals();

        // Reset rotation counts display
        rotCountA.textContent = '0';
        rotCountB.textContent = '0';
        rotCountC.textContent = '0';
    }

    // Event listeners
    turnButton.addEventListener('click', applyRotation);
    resetButton.addEventListener('click', resetGears);

    // Update visuals whenever teeth counts change
    teethAInput.addEventListener('input', updateGearVisuals);
    teethBInput.addEventListener('input', updateGearVisuals);
    teethCInput.addEventListener('input', updateGearVisuals);

    // Remove event listener for Enter key on turnsA input
    // turnsAInput.addEventListener('keypress', function (e) { ... });

    checkAnswerButton.addEventListener('click', checkAnswer);
     answerAInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          checkAnswer(); // Trigger check on Enter key
        }
    });

    // --- Pan Event Listeners ---
    // Attach listeners to the container, not just the assembly
    const containerElementForDrag = document.querySelector('.simulation-container');
    const gearAssemblyElement = document.querySelector('.gear-assembly'); // Still need reference for cursor

    if (containerElementForDrag && gearAssemblyElement) {
        containerElementForDrag.addEventListener('mousedown', (e) => {
            // Only start drag if the target is not an input or button
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('input')) {
                return; // Do not start dragging
            }
            isDragging = true;
            lastDragX = e.clientX;
            lastDragY = e.clientY;
            containerElementForDrag.style.cursor = 'grabbing'; // Change container cursor
            // Prevent text selection during drag
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - lastDragX;
            const dy = e.clientY - lastDragY;
            offsetX += dx;
            offsetY += dy;
            lastDragX = e.clientX;
            lastDragY = e.clientY;
            applyAssemblyTransform(); // Update transform immediately
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                containerElementForDrag.style.cursor = 'grab'; // Restore container cursor
            }
        });

        // Optional: Reset cursor if mouse leaves the window while dragging
        window.addEventListener('mouseleave', () => {
             if (isDragging) {
                isDragging = false;
                 containerElementForDrag.style.cursor = 'grab';
             }
        });

         // Set initial cursor style on the container
         containerElementForDrag.style.cursor = 'grab';

        // --- Touch Event Listeners for Pan ---
        containerElementForDrag.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) { // Only pan with one finger
                isDragging = true;
                lastDragX = e.touches[0].clientX;
                lastDragY = e.touches[0].clientY;
                // No cursor change needed for touch
                e.preventDefault(); // Prevent page scroll during drag
            }
        }, { passive: false }); // Need passive: false to call preventDefault

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const dx = e.touches[0].clientX - lastDragX;
            const dy = e.touches[0].clientY - lastDragY;
            offsetX += dx;
            offsetY += dy;
            lastDragX = e.touches[0].clientX;
            lastDragY = e.touches[0].clientY;
            applyAssemblyTransform();
            e.preventDefault(); // Prevent page scroll during drag
        }, { passive: false }); // Need passive: false to call preventDefault

        window.addEventListener('touchend', (e) => {
            if (isDragging) {
                isDragging = false;
            }
        });

        window.addEventListener('touchcancel', (e) => { // Handle interruption
             if (isDragging) {
                isDragging = false;
            }
        });
        // --- End Touch Event Listeners ---
    }

    // --- Zoom Event Listener ---
    const containerElement = document.querySelector('.simulation-container'); // Re-use variable
    if (containerElement) {
        containerElement.addEventListener('wheel', (e) => {
            e.preventDefault(); // Prevent page scroll

            const scaleAmount = -e.deltaY * 0.001; // Adjust sensitivity
            const newScale = Math.max(minScale, Math.min(maxScale, scale + scaleAmount));

            // Calculate mouse position relative to the container
            const rect = containerElement.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate the point in the assembly coordinate system under the mouse
            // Inverse transform: (mouseX - offsetX) / scale
            const pointX = (mouseX - offsetX) / scale;
            const pointY = (mouseY - offsetY) / scale;

            // Adjust offset so the point under the mouse stays in the same place
            offsetX = mouseX - pointX * newScale;
            offsetY = mouseY - pointY * newScale;

            scale = newScale;
            applyAssemblyTransform();
        });
    }
    // --- End Zoom Event Listener ---


    // Initial setup
    resetGears(); // This now also calls updateGearVisuals and clearFeedback
});
