document.addEventListener('DOMContentLoaded', () => {
    const minuendInput = document.getElementById('minuendInput');
    const subtrahendInput = document.getElementById('subtrahendInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const actualResultEl = document.getElementById('actualResult');

    // Table cells for minuend
    const mTensEl = document.getElementById('mTens');
    const mOnesEl = document.getElementById('mOnes');
    const mTensStrikeEl = document.getElementById('mTensStrike');
    const mOnesStrikeEl = document.getElementById('mOnesStrike');
    const mTensNewEl = document.getElementById('mTensNew');
    const mOnesNewEl = document.getElementById('mOnesNew');

    // Table cells for subtrahend
    const sTensEl = document.getElementById('sTens');
    const sOnesEl = document.getElementById('sOnes');

    // Table cells for result
    const rTensEl = document.getElementById('rTens');
    const rOnesEl = document.getElementById('rOnes');

    const explanationEl = document.getElementById('explanation');

    const ANIMATION_DELAY = 2000; // ms

    let animationSteps = [];
    let currentStep = 0;

    calculateBtn.addEventListener('click', () => {
        const minuend = parseInt(minuendInput.value);
        const subtrahend = parseInt(subtrahendInput.value);

        if (isNaN(minuend) || isNaN(subtrahend)) {
            alert("Please enter valid numbers.");
            return;
        }
        if (minuend < 0 || minuend > 99 || subtrahend < 0 || subtrahend > 99) {
            alert("Please enter numbers between 0 and 99.");
            return;
        }
        if (minuend < subtrahend) {
            alert("Minuend must be greater than or equal to subtrahend for this demonstration.");
            return;
        }

        actualResultEl.textContent = minuend - subtrahend;
        resetTableAndAnimation();
        animationSteps = []; // Clear previous steps
        currentStep = 0;
        generateAnimationSteps(minuend, subtrahend);
        displayStep(currentStep);
        nextStepBtn.disabled = false;
        calculateBtn.disabled = true;
    });

    prevStepBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            displayStep(currentStep);
            nextStepBtn.disabled = false;
        }
        if (currentStep === 0) {
            prevStepBtn.disabled = true;
        }
    });

    nextStepBtn.addEventListener('click', () => {
        if (currentStep < animationSteps.length - 1) {
            currentStep++;
            displayStep(currentStep);
            prevStepBtn.disabled = false;
        }
        if (currentStep === animationSteps.length - 1) {
            nextStepBtn.disabled = true;
        }
    });

    function resetTableAndAnimation() {
        [mTensEl, mOnesEl, sTensEl, sOnesEl, rTensEl, rOnesEl, mTensNewEl, mOnesNewEl].forEach(el => {
            if (el) el.textContent = '';
        });
        [mTensStrikeEl, mOnesStrikeEl].forEach(el => {
            if (el) el.style.opacity = '0';
        });
        [mTensNewEl, mOnesNewEl].forEach(el => {
            if (el) el.style.opacity = '0';
        });
        explanationEl.textContent = '';
        calculateBtn.disabled = false;

        // Remove any lingering highlights
        [mOnesEl, sOnesEl, rOnesEl].forEach(el => el.parentElement.classList.remove('highlight-ones'));
        [mTensEl, sTensEl, rTensEl, mTensNewEl].forEach(el => el.parentElement.classList.remove('highlight-tens'));
    }

    function showExplanation(text, append = false) {
        if (append) {
            explanationEl.innerHTML += `<br>${text}`;
        } else {
            explanationEl.textContent = text;
        }
    }

    function generateAnimationSteps(minuend, subtrahend) {
        let mTens = Math.floor(minuend / 10);
        let mOnes = minuend % 10;
        const sTens = Math.floor(subtrahend / 10);
        const sOnes = subtrahend % 10;

        // Store initial state
        animationSteps.push({
            mTens: Math.floor(minuend / 10),
            mOnes: minuend % 10,
            sTens: sTens,
            sOnes: sOnes,
            rTens: '',
            rOnes: '',
            mTensStrikeOpacity: '0',
            mOnesStrikeOpacity: '0',
            mTensNew: '',
            mOnesNew: '',
            mTensNewOpacity: '0',
            mOnesNewOpacity: '0',
            explanation: "Let's subtract!",
            highlightOnes: false,
            highlightTens: false
        });

        // Step 2: Check Ones column
        animationSteps.push({
            ...animationSteps[animationSteps.length - 1],
            explanation: `We look at the ones column: ${mOnes} - ${sOnes}.`,
            highlightOnes: true
        });

        if (mOnes < sOnes) {
            // Step 3: Need to borrow
            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `${mOnes} is less than ${sOnes}. We need to borrow from the tens place.`
            });

            // Step 4: Animate borrowing from Tens
            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `Borrow 1 ten from the ${mTens} tens.`,
                mTensStrikeOpacity: '1',
                mTensNew: mTens - 1,
                mTensNewOpacity: '1',
                highlightTens: false
            });

            const originalMTens = mTens; // store for explanation
            mTens -= 1; // Update the value for subsequent steps

            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `${originalMTens} tens becomes ${mTens} tens.`
            });

            // Step 5: Animate adding to Ones
            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `Add the borrowed 10 to the ones: ${mOnes} + 10 = ${mOnes + 10}.`,
                mOnesStrikeOpacity: '1',
                mOnesNew: mOnes + 10,
                mOnesNewOpacity: '1'
            });

            const originalMOnes = mOnes; // store for explanation
            mOnes += 10; // Update the value for subsequent steps

            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `${originalMOnes} ones becomes ${mOnes} ones.`
            });

        } else {
            // Step 3 (alternative): No need to borrow
            animationSteps.push({
                ...animationSteps[animationSteps.length - 1],
                explanation: `${mOnes} is greater than or equal to ${sOnes}. No need to borrow.`
            });
        }

        // Step 6: Subtract Ones
        const resultOnes = mOnes - sOnes;
        animationSteps.push({
            ...animationSteps[animationSteps.length - 1],
            explanation: `Now subtract the ones: ${mOnes} - ${sOnes} = ${resultOnes}.`,
            rOnes: resultOnes,
            highlightOnes: false, // Remove ones highlight
            highlightTens: false // Remove tens highlight
        });


        // Step 7: Subtract Tens
        const resultTens = mTens - sTens;
        animationSteps.push({
            ...animationSteps[animationSteps.length - 1],
            explanation: `Subtract the tens: ${mTens} - ${sTens} = ${resultTens}.`,
            rTens: resultTens,
            highlightTens: true // Keep tens highlight for this step
        });

        // Final Step
        animationSteps.push({
            ...animationSteps[animationSteps.length - 1],
            explanation: `So, ${minuend} - ${subtrahend} = ${resultTens}${resultOnes}. Well done!`,
            highlightOnes: false,
            highlightTens: false
        });
    }

    function displayStep(stepIndex) {
        const step = animationSteps[stepIndex];
        if (!step) return;

        // Apply state from the step object
        mTensEl.textContent = step.mTens;
        mOnesEl.textContent = step.mOnes;
        sTensEl.textContent = step.sTens;
        sOnesEl.textContent = step.sOnes;
        rTensEl.textContent = step.rTens;
        rOnesEl.textContent = step.rOnes;

        mTensStrikeEl.style.opacity = step.mTensStrikeOpacity;
        mOnesStrikeEl.style.opacity = step.mOnesStrikeOpacity;
        mTensNewEl.textContent = step.mTensNew;
        mOnesNewEl.textContent = step.mOnesNew;
        mTensNewEl.style.opacity = step.mTensNewOpacity;
        mOnesNewEl.style.opacity = step.mOnesNewOpacity;

        showExplanation(step.explanation);

        // Apply highlights
        // Ones column
        mOnesEl.parentElement.classList.toggle('highlight-ones', step.highlightOnes);
        sOnesEl.classList.toggle('highlight-ones', step.highlightOnes);
        rOnesEl.classList.toggle('highlight-ones', step.highlightOnes);

        // Tens column
        mTensEl.parentElement.classList.toggle('highlight-tens', step.highlightTens);
        sTensEl.classList.toggle('highlight-tens', step.highlightTens);
        rTensEl.classList.toggle('highlight-tens', step.highlightTens);

        // Manage button states
        prevStepBtn.disabled = stepIndex === 0;
        nextStepBtn.disabled = stepIndex === animationSteps.length - 1;
        calculateBtn.disabled = true; // Keep calculate disabled during animation playback
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Initialize with default values shown in the image's problem statement
    minuendInput.value = "40";
    subtrahendInput.value = "27";
    // Manually trigger once on load if you want or just let user click
    // resetTableAndAnimation(); // Clear if any previous state (not needed on fresh load)
    // startAnimation(40,27); // Example: uncomment to auto-run on load
});