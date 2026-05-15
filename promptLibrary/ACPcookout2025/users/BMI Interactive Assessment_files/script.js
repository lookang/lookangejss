// BMI Interactive Assessment JavaScript

// ===== ANALYTICS CLASS =====
class Analytics {
    constructor() {
        this.startTime = Date.now();
        this.key = 'bmi_analytics';
        this._load();
        this.data.sessions = (this.data.sessions || 0) + 1;
        this._save();
    }

    _load() {
        try {
            const s = localStorage.getItem(this.key);
            this.data = s ? JSON.parse(s) : this._fresh();
        } catch(e) { this.data = this._fresh(); }
    }

    _fresh() {
        return { sliderMoves: 0, presetUses: {}, categoryVisits: {}, quizResults: {}, sessions: 0 };
    }

    _save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch(e) {}
    }

    track(type, value) {
        if (type === 'slider') {
            this.data.sliderMoves++;
        } else if (type === 'preset') {
            this.data.presetUses[value] = (this.data.presetUses[value] || 0) + 1;
        } else if (type === 'category') {
            this.data.categoryVisits[value] = (this.data.categoryVisits[value] || 0) + 1;
        } else if (type === 'quiz') {
            if (!this.data.quizResults[value.q]) {
                this.data.quizResults[value.q] = value.result;
            }
        }
        this._save();
    }

    getSummary() {
        const correct = Object.values(this.data.quizResults).filter(r => r === 'correct').length;
        const totalQ  = Object.keys(this.data.quizResults).length;
        const elapsed = Date.now() - this.startTime;
        const mins = Math.floor(elapsed / 60000);
        const secs = Math.floor((elapsed % 60000) / 1000);
        return { ...this.data, quizCorrect: correct, quizTotal: totalQ, timeOnTask: `${mins}m ${secs}s` };
    }

    clear() {
        localStorage.removeItem(this.key);
        this.data = this._fresh();
        this.startTime = Date.now();
    }
}

class BMICalculator {
    constructor() {
        // Slider inputs
        this.massSlider   = document.getElementById('mass-slider');
        this.heightSlider = document.getElementById('height-slider');

        // Display elements
        this.massValue    = document.getElementById('mass-value');
        this.heightValue  = document.getElementById('height-value');
        this.heightCm     = document.getElementById('height-cm');
        this.bmiNumber    = document.getElementById('bmi-number');
        this.bmiCategory  = document.getElementById('bmi-category');
        this.bmiOutput    = document.getElementById('bmi-output');
        this.formulaDisplay = document.getElementById('formula-display');
        this.didYouKnow   = document.getElementById('didYouKnow');
        this.successBadge = document.getElementById('successBadge');

        // Buttons
        this.resetBtn     = document.getElementById('reset-btn');
        this.hintsBtn     = document.getElementById('hints-btn');
        this.hintsModal   = document.getElementById('hints-modal');
        this.hintsList    = document.getElementById('hints-list');

        // Human figure body parts
        this.humanFigure  = document.getElementById('human-figure');
        this.bodyParts = {
            head:      document.getElementById('head'),
            neck:      document.getElementById('neck'),
            torso:     document.getElementById('torso'),
            leftArm:   document.getElementById('left-arm'),
            rightArm:  document.getElementById('right-arm'),
            leftHand:  document.getElementById('left-hand'),
            rightHand: document.getElementById('right-hand'),
            leftLeg:   document.getElementById('left-leg'),
            rightLeg:  document.getElementById('right-leg'),
            leftFoot:  document.getElementById('left-foot'),
            rightFoot: document.getElementById('right-foot')
        };

        // Defaults
        this.defaultMass   = 60;
        this.defaultHeight = 1.65;
        this.prevCategory  = null;
        this._successTimer = null;

        // Analytics
        this.analytics = new Analytics();

        // Quiz state
        this.quizScore     = 0;
        this.quizDone      = {};
        this.QUIZ_ANSWERS  = { 1: 'B', 2: 'B' };  // Q3 checked by BMI range

        this.init();
    }

    init() {
        // Sliders
        this.massSlider.addEventListener('input', () => {
            this.updateBMI();
            this.analytics.track('slider');
        });
        this.heightSlider.addEventListener('input', () => {
            this.updateBMI();
            this.analytics.track('slider');
        });

        // Action buttons
        this.resetBtn.addEventListener('click', () => this.resetValues());
        this.hintsBtn.addEventListener('click', () => this.showHints());

        // Hints modal close (scoped to avoid clash with analytics modal .close)
        document.querySelector('#hints-modal .close').addEventListener('click', () => this.hideHints());
        document.getElementById('closeHintsBtn').addEventListener('click', () => this.hideHints());
        window.addEventListener('click', (e) => {
            if (e.target === this.hintsModal) this.hideHints();
            const am = document.getElementById('analytics-modal');
            if (am && e.target === am) this.hideAnalytics();
        });

        // Learning banner dismiss
        const closeBanner = document.getElementById('closeBanner');
        if (closeBanner) {
            closeBanner.addEventListener('click', () => {
                const banner = document.getElementById('learningBanner');
                if (banner) banner.style.display = 'none';
            });
        }

        // Preset buttons (track analytics)
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.massSlider.value   = btn.dataset.mass;
                this.heightSlider.value = btn.dataset.height;
                this.updateBMI();
                const cat = [...btn.classList].find(c =>
                    ['preset-underweight','preset-healthy','preset-overweight','preset-obese'].includes(c)
                );
                if (cat) this.analytics.track('preset', cat.replace('preset-', ''));
            });
        });

        // Explore Q&A reveal toggles
        document.querySelectorAll('.reveal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.nextElementSibling;
                if (answer.hidden) {
                    answer.hidden = false;
                    btn.textContent = '▼ Hide';
                    btn.classList.add('revealed');
                } else {
                    answer.hidden = true;
                    btn.textContent = '▶ Answer';
                    btn.classList.remove('revealed');
                }
            });
        });

        // Panel tabs
        this.initTabs();

        // Quiz
        this.initQuiz();

        // Analytics button + modal
        const analyticsBtn = document.getElementById('analytics-btn');
        if (analyticsBtn) analyticsBtn.addEventListener('click', () => this.showAnalytics());
        document.getElementById('analytics-close').addEventListener('click', () => this.hideAnalytics());
        document.getElementById('analytics-clear-btn').addEventListener('click', () => {
            this.analytics.clear();
            this.renderAnalytics();
        });
        document.getElementById('analytics-hide-btn').addEventListener('click', () => this.hideAnalytics());

        // Initial calculation
        this.updateBMI();

        // Keyboard support
        this.addKeyboardSupport();
    }

    calculateBMI(mass, height) {
        return mass / (height * height);
    }

    updateBMI() {
        const mass   = parseFloat(this.massSlider.value);
        const height = parseFloat(this.heightSlider.value);

        this.massValue.textContent   = mass;
        this.heightValue.textContent = height.toFixed(2);
        this.heightCm.textContent    = Math.round(height * 100);

        const bmi      = this.calculateBMI(mass, height);
        const hSq      = (height * height).toFixed(2);
        const category = this.getBMICategory(bmi);

        this.bmiNumber.textContent   = bmi.toFixed(1);
        this.bmiCategory.textContent = category.name;

        // 2-line colour-coded formula
        this.formulaDisplay.innerHTML =
            `<span class="formula-step"><span class="formula-height">${height.toFixed(2)}</span> × <span class="formula-height">${height.toFixed(2)}</span> = <span class="formula-height">${hSq} m²</span></span>` +
            `<span class="formula-step">BMI = <span class="formula-mass">${mass}</span> ÷ <span class="formula-height">${hSq}</span> = <span class="formula-result ${category.class}">${bmi.toFixed(1)}</span></span>`;

        this.updateBMIVisuals(category);
        this.updateDidYouKnow(category);
        this.updateSuccessBadge(category);
        this.updateSliderHealthZones(mass, height);
        this.updateHumanFigure(mass, height, bmi);

        // Analytics: track category changes
        if (category.class !== this.prevCategory) {
            this.analytics.track('category', category.class);
        }

        // Quiz Q3: sync live BMI display
        const liveBmiEl = document.getElementById('quiz-bmi-live');
        if (liveBmiEl) {
            liveBmiEl.textContent = bmi.toFixed(1);
            liveBmiEl.className   = 'quiz-bmi-value ' + category.class;
        }

        this.prevCategory = category.class;
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) return { name: 'Underweight',    class: 'underweight', color: '#2196f3' };
        if (bmi < 25)   return { name: 'Healthy Weight', class: 'healthy',     color: '#4caf50' };
        if (bmi < 30)   return { name: 'Overweight',     class: 'overweight',  color: '#ff9800' };
        return               { name: 'Obese',            class: 'obese',       color: '#f44336' };
    }

    updateBMIVisuals(category) {
        this.bmiOutput.className = 'bmi-output ' + category.class;
    }

    updateDidYouKnow(category) {
        const facts = {
            underweight: '⚡ Being underweight can affect energy levels, bone strength, and immune function.',
            healthy:     '✅ A healthy BMI reduces risk of heart disease, type 2 diabetes, and other chronic conditions.',
            overweight:  '💡 Small, consistent lifestyle changes — like 30 min of daily walking — can make a big difference.',
            obese:       '🩺 A BMI over 30 is linked to higher risk of chronic conditions. Consider speaking with a healthcare professional.'
        };
        const factClass = category.class + '-fact';
        if (this.didYouKnow.dataset.cat !== category.class) {
            this.didYouKnow.className = 'did-you-know ' + factClass;
            this.didYouKnow.textContent = facts[category.class];
            this.didYouKnow.style.animation = 'none';
            void this.didYouKnow.offsetWidth;
            this.didYouKnow.style.animation = '';
            this.didYouKnow.dataset.cat = category.class;
        }
    }

    updateSuccessBadge(category) {
        if (category.class === 'healthy' && this.prevCategory && this.prevCategory !== 'healthy') {
            if (this._successTimer) clearTimeout(this._successTimer);
            this.successBadge.textContent = '🎉 Healthy BMI! Great combination.';
            this.successBadge.classList.add('show');
            this._successTimer = setTimeout(() => this.successBadge.classList.remove('show'), 2500);
        }
    }

    updateSliderHealthZones(mass, height) {
        const minHM = Math.max(30,  Math.min(120, 18.5 * height * height));
        const maxHM = Math.max(30,  Math.min(120, 24.9 * height * height));
        const s1 = ((minHM - 30) / 90 * 100).toFixed(1);
        const e1 = ((maxHM - 30) / 90 * 100).toFixed(1);
        this.massSlider.style.background =
            `linear-gradient(to right, #ddd 0%, #ddd ${s1}%, #a5d6a7 ${s1}%, #a5d6a7 ${e1}%, #ddd ${e1}%, #ddd 100%)`;

        const minHH = Math.max(1.30, Math.min(2.00, Math.sqrt(mass / 24.9)));
        const maxHH = Math.max(1.30, Math.min(2.00, Math.sqrt(mass / 18.5)));
        const s2 = ((minHH - 1.30) / 0.70 * 100).toFixed(1);
        const e2 = ((maxHH - 1.30) / 0.70 * 100).toFixed(1);
        this.heightSlider.style.background =
            `linear-gradient(to right, #ddd 0%, #ddd ${s2}%, #a5d6a7 ${s2}%, #a5d6a7 ${e2}%, #ddd ${e2}%, #ddd 100%)`;
    }

    updateHumanFigure(mass, height, bmi) {
        const floorY = 325;
        const cx     = 80;

        const figH = 200 + ((height - 1.30) / 0.70) * 110;
        const W    = 0.7  + ((mass - 30) / 90) * 0.7;

        const headTopY  = floorY - figH;
        const headCY    = floorY - figH * 0.9375;
        const headRY    = figH   * 0.0625;
        const neckTopY  = floorY - figH * 0.875;
        const shoulderY = floorY - figH * 0.820;
        const hipY      = floorY - figH * 0.520;

        const headRX = headRY * 0.82 * Math.pow(W, 0.50);
        const sHW    = 20 * W;
        const hHW    = 17 * W;
        const neckW  = 10 * Math.pow(W, 0.50);
        const armW   = 13 * Math.pow(W, 0.65);
        const legW   = 13 * Math.pow(W, 0.65);
        const footRX = 11 * Math.pow(W, 0.55);
        const handRX =  8 * Math.pow(W, 0.55);

        this._el('head', el => {
            el.setAttribute('cx', cx);
            el.setAttribute('cy', headCY.toFixed(1));
            el.setAttribute('rx', headRX.toFixed(1));
            el.setAttribute('ry', headRY.toFixed(1));
            el.removeAttribute('transform');
        });

        const eOff = headRX * 0.38;
        const eyeY = (headCY - headRY * 0.15).toFixed(1);
        const eyeR = (headRX * 0.13).toFixed(1);
        this._el('eye-left',  el => { el.setAttribute('cx', (cx - eOff).toFixed(1)); el.setAttribute('cy', eyeY); el.setAttribute('r', eyeR); });
        this._el('eye-right', el => { el.setAttribute('cx', (cx + eOff).toFixed(1)); el.setAttribute('cy', eyeY); el.setAttribute('r', eyeR); });
        this._el('mouth', el => {
            const my1 = (headCY + headRY * 0.30).toFixed(1);
            const my2 = (headCY + headRY * 0.52).toFixed(1);
            el.setAttribute('d', `M${(cx-eOff*0.9).toFixed(1)},${my1} Q${cx},${my2} ${(cx+eOff*0.9).toFixed(1)},${my1}`);
        });

        this._rect('neck', cx - neckW/2, neckTopY, neckW, shoulderY - neckTopY, 4);

        this._el('torso', el => {
            el.setAttribute('points', [
                `${(cx-sHW).toFixed(1)},${shoulderY.toFixed(1)}`,
                `${(cx+sHW).toFixed(1)},${shoulderY.toFixed(1)}`,
                `${(cx+hHW).toFixed(1)},${hipY.toFixed(1)}`,
                `${(cx-hHW).toFixed(1)},${hipY.toFixed(1)}`
            ].join(' '));
            el.removeAttribute('transform');
        });

        const armH = hipY - shoulderY + 10;
        const aXL  = cx - sHW - armW + 4;
        const aXR  = cx + sHW - 4;
        this._rect('left-arm',  aXL, shoulderY, armW, armH, 6);
        this._rect('right-arm', aXR, shoulderY, armW, armH, 6);

        const handY = shoulderY + armH + 2;
        this._ellipse('left-hand',  aXL + armW/2, handY, handRX, 6);
        this._ellipse('right-hand', aXR + armW/2, handY, handRX, 6);

        const legTop = hipY - 6;
        const legH   = floorY - legTop;
        const lXL    = cx - legW - 2;
        const lXR    = cx + 2;
        this._rect('left-leg',  lXL, legTop, legW, legH, 6);
        this._rect('right-leg', lXR, legTop, legW, legH, 6);

        this._ellipse('left-foot',  lXL + legW/2, floorY, footRX, 7);
        this._ellipse('right-foot', lXR + legW/2, floorY, footRX, 7);

        this._el('height-indicator', el => { el.setAttribute('y1', headTopY.toFixed(1)); el.setAttribute('y2', headTopY.toFixed(1)); });
        this._el('height-label',     el => { el.setAttribute('y', (headTopY + 3).toFixed(1)); el.textContent = height.toFixed(2) + 'm'; });
    }

    _el(id, fn)  { const el = document.getElementById(id); if (el) fn(el); }
    _rect(id, x, y, w, h, rx) {
        this._el(id, el => {
            el.setAttribute('x',      x.toFixed(1));
            el.setAttribute('y',      y.toFixed(1));
            el.setAttribute('width',  w.toFixed(1));
            el.setAttribute('height', h.toFixed(1));
            if (rx !== undefined) el.setAttribute('rx', rx);
            el.removeAttribute('transform');
        });
    }
    _ellipse(id, cx, cy, rx, ry) {
        this._el(id, el => {
            el.setAttribute('cx', cx.toFixed(1));
            el.setAttribute('cy', cy.toFixed(1));
            el.setAttribute('rx', rx.toFixed(1));
            el.setAttribute('ry', ry);
            el.removeAttribute('transform');
        });
    }

    scaleBodyPart(element, hScale, wScale, cx, cy) {
        if (!element) return;
        element.setAttribute('transform', `translate(${cx},${cy}) scale(${wScale},${hScale}) translate(${-cx},${-cy})`);
    }

    // ===== TABS =====
    initTabs() {
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetId = 'tab-' + tab.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(tc => {
                    tc.hidden = tc.id !== targetId;
                });
            });
        });
    }

    // ===== QUIZ =====
    initQuiz() {
        document.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.addEventListener('click', () => this.handleQuizAnswer(parseInt(btn.dataset.q), btn.dataset.ans));
        });

        const q3btn = document.getElementById('quiz-q3-btn');
        if (q3btn) {
            q3btn.addEventListener('click', () => {
                const bmi = parseFloat(this.bmiNumber.textContent);
                this.handleQuizAnswer(3, (bmi >= 18.5 && bmi < 25) ? 'healthy' : 'not-healthy');
            });
        }

        document.getElementById('quiz-reset-btn').addEventListener('click', () => {
            this.quizScore = 0;
            this.quizDone  = {};
            document.getElementById('quiz-score').textContent = '0';
            [1, 2, 3].forEach(q => {
                document.querySelectorAll(`[data-q="${q}"]`).forEach(b => {
                    b.disabled = false;
                    b.classList.remove('correct', 'wrong');
                });
                const fb = document.getElementById('quiz-fb-' + q);
                if (fb) { fb.hidden = true; fb.className = 'quiz-feedback'; }
            });
            const q3btn = document.getElementById('quiz-q3-btn');
            if (q3btn) q3btn.disabled = false;
        });
    }

    handleQuizAnswer(q, ans) {
        if (this.quizDone[q]) return;
        this.quizDone[q] = true;

        let correct  = false;
        let feedback = '';

        if (q === 1) {
            correct  = ans === 'B';
            feedback = correct
                ? '✅ Correct! Person B (90 kg) BMI = 90 ÷ 1.70² ≈ 31.1 vs Person A (45 kg) BMI ≈ 15.6. More mass → higher BMI at the same height.'
                : '❌ Not quite. Person B (90 kg) has the higher BMI (31.1 vs 15.6). Same height means mass directly determines BMI.';
            document.querySelectorAll('[data-q="1"]').forEach(b => {
                b.disabled = true;
                if (b.dataset.ans === 'B') b.classList.add('correct');
                if (!correct && b.dataset.ans === ans) b.classList.add('wrong');
            });
        } else if (q === 2) {
            correct  = ans === 'B';
            feedback = correct
                ? '✅ Correct! Person B (1.85 m) BMI = 70 ÷ 1.85² ≈ 20.5 (healthy). Person A (1.55 m) BMI ≈ 29.1 (overweight). Height is squared — being taller has a big effect!'
                : '❌ Not quite. Person B (1.85 m) has the lower BMI (20.5 vs 29.1). Height is squared in the formula, so taller → much lower BMI.';
            document.querySelectorAll('[data-q="2"]').forEach(b => {
                b.disabled = true;
                if (b.dataset.ans === 'B') b.classList.add('correct');
                if (!correct && b.dataset.ans === ans) b.classList.add('wrong');
            });
        } else if (q === 3) {
            correct = ans === 'healthy';
            if (correct) {
                const bmi = parseFloat(this.bmiNumber.textContent);
                feedback  = `✅ Well done! BMI ${bmi.toFixed(1)} is in the healthy range (18.5–24.9). You found the right combination!`;
                document.getElementById('quiz-q3-btn').disabled = true;
            } else {
                const bmi = parseFloat(this.bmiNumber.textContent);
                feedback  = `❌ Not yet — BMI is ${bmi.toFixed(1)}. Adjust the sliders to reach 18.5–24.9, then try again!`;
                this.quizDone[q] = false;  // allow retry
            }
        }

        // Show feedback
        const fb = document.getElementById('quiz-fb-' + q);
        if (fb) {
            fb.textContent = feedback;
            fb.className   = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
            fb.hidden      = false;
        }

        // Update score (count Q3 only once)
        if (correct && (q !== 3 || !this.quizDone._q3counted)) {
            this.quizScore++;
            if (q === 3) this.quizDone._q3counted = true;
            document.getElementById('quiz-score').textContent = this.quizScore;
        }

        this.analytics.track('quiz', { q, result: correct ? 'correct' : 'wrong' });
    }

    // ===== HINTS =====
    showHints() {
        const bmi = parseFloat(this.bmiNumber.textContent);
        let hints;

        if (bmi < 18.5) {
            hints = [
                `Your current BMI is <strong>${bmi.toFixed(1)}</strong> — that's underweight.`,
                'Try increasing the mass slider. What is the <em>minimum</em> mass for a healthy BMI at your current height?',
                'Use the formula: minimum healthy mass = 18.5 × height². Try calculating it!',
                'Notice the <strong>green zone</strong> on the mass slider — aim for that range.'
            ];
        } else if (bmi < 25) {
            hints = [
                `Your current BMI is <strong>${bmi.toFixed(1)}</strong> — that's healthy! 🎉`,
                'Try slowly increasing mass — at what point does the BMI tip into overweight?',
                'Now try reducing height slightly — why does BMI rise so quickly?',
                'This shows why height is squared in the formula: small height changes have big effects.'
            ];
        } else if (bmi < 30) {
            hints = [
                `Your current BMI is <strong>${bmi.toFixed(1)}</strong> — that's overweight.`,
                'Try increasing height by 5–10 cm. Notice how much the BMI drops. Why?',
                'Because height is <em>squared</em> in the formula, it has double the effect compared to mass.',
                'Notice the <strong>green zone</strong> on the height slider — aim for that range at your current mass.'
            ];
        } else {
            hints = [
                `Your current BMI is <strong>${bmi.toFixed(1)}</strong> — that's in the obese range.`,
                'Use the formula to calculate a target: healthy mass = 18.5 to 24.9 × height².',
                `At your current height of ${parseFloat(this.heightSlider.value).toFixed(2)} m, the healthy mass range is approximately <strong>${(18.5 * Math.pow(parseFloat(this.heightSlider.value),2)).toFixed(0)}–${(24.9 * Math.pow(parseFloat(this.heightSlider.value),2)).toFixed(0)} kg</strong>.`,
                'Look at the <strong>green zone</strong> on both sliders — that is your target range.'
            ];
        }

        this.hintsList.innerHTML = hints.map(h => `<li>${h}</li>`).join('');
        this.hintsModal.style.display = 'block';
        this.hintsModal.querySelector('.close').focus();
    }

    hideHints() {
        this.hintsModal.style.display = 'none';
        this.hintsBtn.focus();
    }

    // ===== ANALYTICS DASHBOARD =====
    showAnalytics() {
        this.renderAnalytics();
        document.getElementById('analytics-modal').style.display = 'block';
    }

    hideAnalytics() {
        document.getElementById('analytics-modal').style.display = 'none';
    }

    renderAnalytics() {
        const s = this.analytics.getSummary();
        const qLabels    = { 1: 'Q1: Mass comparison', 2: 'Q2: Height comparison', 3: 'Q3: Find healthy BMI' };
        const catColors  = { underweight: '#2196f3', healthy: '#4caf50', overweight: '#ff9800', obese: '#f44336' };
        const presetTotal = Object.values(s.presetUses).reduce((a, b) => a + b, 0);

        const quizRows = [1, 2, 3].map(q => {
            const r    = s.quizResults[q];
            const icon = r === 'correct' ? '✅' : r === 'wrong' ? '❌' : '—';
            return `<div class="analytics-quiz-row">${icon} ${qLabels[q]}</div>`;
        }).join('');

        const catPills = Object.entries(s.categoryVisits)
            .filter(([, v]) => v > 0)
            .map(([k, v]) => `<span class="a-pill" style="background:${catColors[k]}">${k} (${v}×)</span>`)
            .join('') || '<span style="color:#aaa;font-size:12px">none yet</span>';

        document.getElementById('analytics-body').innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="a-label">Quiz Score</div>
                    <div class="a-value">${s.quizCorrect}/${s.quizTotal || 3}</div>
                </div>
                <div class="analytics-card">
                    <div class="a-label">Slider Moves</div>
                    <div class="a-value">${s.sliderMoves}</div>
                </div>
                <div class="analytics-card">
                    <div class="a-label">Presets Used</div>
                    <div class="a-value">${presetTotal}</div>
                </div>
                <div class="analytics-card">
                    <div class="a-label">Time on Task</div>
                    <div class="a-value" style="font-size:15px">${s.timeOnTask}</div>
                </div>
            </div>
            <div style="margin-bottom:6px;font-size:13px"><strong>Quiz Results:</strong></div>
            ${quizRows}
            <div style="margin:10px 0 5px;font-size:13px"><strong>BMI Categories Explored:</strong></div>
            <div class="analytics-cat-pills">${catPills}</div>
            <div style="margin-top:10px;font-size:11px;color:#aaa">Sessions tracked: ${s.sessions || 1} | Data stored locally on this device.</div>
        `;
    }

    // ===== RESET / KEYBOARD =====
    resetValues() {
        this.massSlider.value   = this.defaultMass;
        this.heightSlider.value = this.defaultHeight;
        this.updateBMI();

        this.resetBtn.style.background = '#27ae60';
        this.resetBtn.textContent = 'Reset ✓';
        setTimeout(() => {
            this.resetBtn.style.background = '#4a90e2';
            this.resetBtn.textContent = 'Reset Values';
        }, 1000);
    }

    addKeyboardSupport() {
        [this.massSlider, this.heightSlider].forEach(slider => {
            slider.addEventListener('keydown', (e) => {
                const step = parseFloat(slider.step);
                let val    = parseFloat(slider.value);
                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowRight': val = Math.min(parseFloat(slider.max), val + step); break;
                    case 'ArrowDown':
                    case 'ArrowLeft':  val = Math.max(parseFloat(slider.min), val - step); break;
                    case 'Home': val = parseFloat(slider.min); break;
                    case 'End':  val = parseFloat(slider.max); break;
                    default: return;
                }
                e.preventDefault();
                slider.value = val;
                this.updateBMI();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.hintsModal.style.display === 'block') this.hideHints();
                const am = document.getElementById('analytics-modal');
                if (am && am.style.display === 'block') this.hideAnalytics();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }

    const bmiCalc = new BMICalculator();

    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', () => {
            if ('vibrate' in navigator) navigator.vibrate(10);
        });
    });

    console.log('BMI Interactive Assessment loaded successfully');
});
