document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        divisorInput: document.getElementById('divisorInput'),
        d1_val: document.getElementById('d1_val'), 
        d2_val: document.getElementById('d2_val'), 
        d3_val: document.getElementById('d3_val'),
        q1_val: document.getElementById('q1_val'), 
        q2_val: document.getElementById('q2_val'), 
        q3_val: document.getElementById('q3_val'),
        
        subSign1: document.getElementById('subSign1'),
        m1_val: document.getElementById('m1_val'), 
        line1: document.getElementById('line1'),
        s1_res_val: document.getElementById('s1_res_val'), 
        d2_brought_val: document.getElementById('d2_brought_val'),
        
        subSign2: document.getElementById('subSign2'),
        m2_val_tens: document.getElementById('m2_val_tens'), 
        m2_val_ones: document.getElementById('m2_val_ones'), 
        line2: document.getElementById('line2'),
        s2_res_val: document.getElementById('s2_res_val'), 
        d3_brought_val: document.getElementById('d3_brought_val'),
        
        subSign3: document.getElementById('subSign3'),
        m3_val_tens: document.getElementById('m3_val_tens'), 
        m3_val_ones: document.getElementById('m3_val_ones'), 
        line3: document.getElementById('line3'),
        s3_res_val: document.getElementById('s3_res_val'),
        
        promptText: document.getElementById('promptText'), 
        startResetBtn: document.getElementById('startResetBtn'), 
        prevBtn: document.getElementById('prevStepBtn'), 
        nextBtn: document.getElementById('nextStepBtn'),
        speakBtn: document.getElementById('speakBtn')
    };

    let currentStepIdx = -1;
    let allStepsData = [];
    let lastHighlightedElementIds = [];
    let activeAnimationTimeouts = [];

    function speakText(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }

    const initialCalcDisplayState = {
        q1_val: '', q2_val: '', q3_val: '', 
        subSign1_style_visibility: 'hidden', m1_val: '', line1_style_visibility: 'hidden',
        s1_res_val: '', d2_brought_val: '', 
        subSign2_style_visibility: 'hidden', m2_val_tens: '', m2_val_ones: '', line2_style_visibility: 'hidden',
        s2_res_val: '', d3_brought_val: '', 
        subSign3_style_visibility: 'hidden', m3_val_tens: '', m3_val_ones: '', line3_style_visibility: 'hidden',
        s3_res_val: ''
    };

    function applyCalculationDisplayState(state) {
        for (const key in state) {
            const elementKey = key.replace('_style_visibility', '');
            if (elements[elementKey]) {
                if (key.endsWith('_style_visibility')) {
                    elements[elementKey].style.visibility = state[key];
                } else {
                    elements[elementKey].textContent = state[key];
                }
            }
        }
    }

    function clearOldAnimations() {
        activeAnimationTimeouts.forEach(clearTimeout);
        activeAnimationTimeouts = [];
        document.querySelectorAll('.animate-bring-down').forEach(el => el.classList.remove('animate-bring-down'));
    }

    function updateHighlights(newHighlightIds = []) {
        lastHighlightedElementIds.forEach(elId => {
            if (elements[elId]) elements[elId].classList.remove('highlight-active');
        });
        lastHighlightedElementIds = [];
        newHighlightIds.forEach(elId => {
            if (elements[elId]) {
                elements[elId].classList.add('highlight-active');
                lastHighlightedElementIds.push(elId);
            }
        });
    }
    
    function setProblemInputsDisabled(isDisabled) {
        elements.divisorInput.disabled = isDisabled;
        elements.d1_val.disabled = isDisabled;
        elements.d2_val.disabled = isDisabled;
        elements.d3_val.disabled = isDisabled;
    }

    function populateSelectWithOptions() {
        for (let i = 1; i <= 9; i++) {
            elements.divisorInput.add(new Option(i, i));
        }
        [elements.d1_val, elements.d2_val, elements.d3_val].forEach(sel => {
            for (let i = 0; i <= 9; i++) {
                sel.add(new Option(i, i));
            }
        });
    }

    function pageLoadSetup() {
        if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
        populateSelectWithOptions();
        elements.divisorInput.value = "6";
        elements.d1_val.value = "9"; 
        elements.d2_val.value = "9"; 
        elements.d3_val.value = "6";
        
        setProblemInputsDisabled(false);
        applyCalculationDisplayState(initialCalcDisplayState);
        clearOldAnimations(); 
        updateHighlights();
        const initialPrompt = "Select numbers for division, then click 'Start/Reset Division'.";
        elements.promptText.textContent = initialPrompt;
        speakText(initialPrompt);
        allStepsData = []; 
        currentStepIdx = -1;
        updateButtonStates();
    }
    
    function startOrResetDivision() {
        if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }

        if (allStepsData.length > 0) {
            clearOldAnimations();
            updateHighlights(); 
            applyCalculationDisplayState(initialCalcDisplayState);
            setProblemInputsDisabled(false);
            allStepsData = []; 
            currentStepIdx = -1;
            const resetPrompt = "Select new numbers, then click 'Start/Reset Division' again.";
            elements.promptText.textContent = resetPrompt;
            speakText(resetPrompt);
            updateButtonStates();
            return;
        }

        const divisorValue = elements.divisorInput.value;
        const d1Value = elements.d1_val.value;
        const d2Value = elements.d2_val.value;
        const d3Value = elements.d3_val.value;
        const divisor = parseInt(divisorValue);
        const dividendArr = [d1Value, d2Value, d3Value].map(Number);
        
        let newPrompt = "";
        if (isNaN(divisor) || dividendArr.some(isNaN) || divisor === 0) {
            newPrompt = "Error: Please select valid digits. The divisor cannot be zero.";
        } else {
            setProblemInputsDisabled(true);
            allStepsData = generateStepsForProblem(dividendArr, divisor);
            currentStepIdx = -1; 
            newPrompt = `Dividing ${d1Value}${d2Value}${d3Value} by ${divisorValue}. Click 'Next Step'.`;
        }
        
        elements.promptText.textContent = newPrompt;
        speakText(newPrompt);
        updateButtonStates();
    }

    function generateStepsForProblem(dividendArr, divisor) {
        const genSteps = []; 
        let state = { ...initialCalcDisplayState };
        
        let q1 = Math.floor(dividendArr[0] / divisor); 
        let m1 = q1 * divisor;
        state = { ...state, q1_val: q1.toString(), subSign1_style_visibility: 'visible', m1_val: m1.toString(), line1_style_visibility: 'visible' };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 1: How many times does ${divisor} go into ${dividendArr[0]}? It's ${q1}. Write ${q1} above. Now, multiply ${q1} times ${divisor} to get ${m1}.`, 
            highlights: ['divisorInput', 'd1_val', 'q1_val', 'm1_val'] 
        });
        
        let s1 = dividendArr[0] - m1;
        state = { ...state, s1_res_val: s1.toString(), d2_brought_val: dividendArr[1].toString() };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 2: Subtract ${m1} from ${dividendArr[0]} to get ${s1}. Then, bring down the next digit, ${dividendArr[1]}. Your new number is ${s1}${dividendArr[1]}.`, 
            highlights: ['d1_val', 'm1_val', 's1_res_val', 'd2_val', 'd2_brought_val'],
            animateTargetIds: ['d2_brought_val']
        });
        
        let num2 = s1 * 10 + dividendArr[1]; 
        let q2 = Math.floor(num2 / divisor); 
        let m2 = q2 * divisor;
        state = { ...state, q2_val: q2.toString(), subSign2_style_visibility: 'visible', m2_val_tens: Math.floor(m2/10).toString(), m2_val_ones: (m2%10).toString(), line2_style_visibility: 'visible' };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 3: How many times does ${divisor} go into ${num2}? It's ${q2}. Write ${q2} above. Now, multiply ${q2} times ${divisor} to get ${m2}.`, 
            highlights: ['divisorInput', 's1_res_val', 'd2_brought_val', 'q2_val', 'm2_val_tens', 'm2_val_ones'] 
        });
        
        let s2 = num2 - m2;
        state = { ...state, s2_res_val: s2.toString(), d3_brought_val: dividendArr[2].toString() };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 4: Subtract ${m2} from ${num2} to get ${s2}. Then, bring down the next digit, ${dividendArr[2]}. Your new number is ${s2}${dividendArr[2]}.`, 
            highlights: ['s1_res_val', 'd2_brought_val', 'm2_val_tens', 'm2_val_ones', 's2_res_val', 'd3_val', 'd3_brought_val'],
            animateTargetIds: ['d3_brought_val']
        });
        
        let num3 = s2 * 10 + dividendArr[2]; 
        let q3 = Math.floor(num3 / divisor); 
        let m3 = q3 * divisor;
        state = { ...state, q3_val: q3.toString(), subSign3_style_visibility: 'visible', m3_val_tens: Math.floor(m3/10).toString(), m3_val_ones: (m3%10).toString(), line3_style_visibility: 'visible' };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 5: How many times does ${divisor} go into ${num3}? It's ${q3}. Write ${q3} above. Now, multiply ${q3} times ${divisor} to get ${m3}.`, 
            highlights: ['divisorInput', 's2_res_val', 'd3_brought_val', 'q3_val', 'm3_val_tens', 'm3_val_ones'] 
        });
        
        let s3 = num3 - m3;
        state = { ...state, s3_res_val: s3.toString() };
        genSteps.push({ 
            state: { ...state }, 
            prompt: `Step 6: Subtract ${m3} from ${num3} to get ${s3}. There are no more digits to bring down. The remainder is ${s3}. The final answer is ${q1}${q2}${q3}. Great job!`, 
            highlights: ['s2_res_val', 'd3_brought_val', 'm3_val_tens', 'm3_val_ones', 's3_res_val'] 
        });
        return genSteps;
    }

    function updateButtonStates() {
        elements.prevBtn.disabled = currentStepIdx < 0 || allStepsData.length === 0;
        elements.nextBtn.disabled = currentStepIdx >= allStepsData.length - 1 || allStepsData.length === 0;
    }

    elements.startResetBtn.addEventListener('click', startOrResetDivision);
    elements.speakBtn.addEventListener('click', () => speakText(elements.promptText.textContent));

    elements.nextBtn.addEventListener('click', () => {
        if (allStepsData.length > 0 && currentStepIdx < allStepsData.length - 1) {
            currentStepIdx++; 
            const currentStepData = allStepsData[currentStepIdx];
            applyCalculationDisplayState(currentStepData.state); 
            clearOldAnimations(); 
            updateHighlights(currentStepData.highlights);
            (currentStepData.animateTargetIds || []).forEach(elId => {
                const el = elements[elId];
                if (el) {
                    el.classList.add('animate-bring-down');
                    const timeoutId = setTimeout(() => el.classList.remove('animate-bring-down'), 2000);
                    activeAnimationTimeouts.push(timeoutId);
                }
            });
            elements.promptText.textContent = currentStepData.prompt;
            speakText(currentStepData.prompt);
        }
        updateButtonStates();
    });

    elements.prevBtn.addEventListener('click', () => {
        if (allStepsData.length > 0 && currentStepIdx >= 0) {
            currentStepIdx--; 
            clearOldAnimations(); 
            let newPrompt = "";
            if (currentStepIdx >= 0) {
                const currentStepData = allStepsData[currentStepIdx];
                applyCalculationDisplayState(currentStepData.state);
                updateHighlights(currentStepData.highlights);
                newPrompt = currentStepData.prompt;
            } else {
                applyCalculationDisplayState(initialCalcDisplayState); 
                updateHighlights(); 
                const dSVal = elements.divisorInput.value;
                const d1SVal = elements.d1_val.value;
                const d2SVal = elements.d2_val.value;
                const d3SVal = elements.d3_val.value;
                newPrompt = `Dividing ${d1SVal}${d2SVal}${d3SVal} by ${dSVal}. Click 'Next Step'.`;
            }
            elements.promptText.textContent = newPrompt;
            speakText(newPrompt);
        }
        updateButtonStates();
    });
    
    pageLoadSetup();
});