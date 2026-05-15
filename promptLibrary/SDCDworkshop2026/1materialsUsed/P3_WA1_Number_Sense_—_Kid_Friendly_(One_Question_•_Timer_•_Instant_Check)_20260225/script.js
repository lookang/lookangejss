/**
 * P3 WA1 Number Sense Interactive
 * 
 * This script generates and manages a set of Primary 3 number sense questions.
 * Features:
 * - Multiple question types (counting, words, place value, ordering, patterns, etc.)
 * - Teacher controls for customization
 * - Timer with audio alert on time-up
 * - Instant feedback and scoring
 * - Fullscreen mode when teacher panel is hidden
 * - Drag-and-drop for ordering questions
 * - Confetti animation for correct answers
 * 
 * Architecture:
 * - Question generators create question objects with data and answer
 * - Rendering functions build DOM for each question type
 * - Grading functions check user input against correct answer
 * - Timer runs per question with optional countdown display
 */

(function(){
  'use strict';

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  /**
   * Generate random integer between min and max (inclusive)
   */
  const rand = (min, max) => Math.floor(Math.random() * (min - max + 1)) + min;

  /**
   * Pick random element from array
   */
  const pick = (arr) => arr[rand(0, arr.length - 1)];

  /**
   * Clamp number between min and max
   */
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  /**
   * Get element by ID (shorthand)
   */
  const byId = (id) => document.getElementById(id);

  /**
   * Shuffle array (Fisher-Yates algorithm)
   */
  const shuffle = (a) => {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
    return x;
  };

  /**
   * Format number with commas (Singapore style)
   */
  const fmt = (n) => Number(n).toLocaleString("en-SG");

  // ========================================
  // REGROUPING DETECTION (for add/sub)
  // ========================================

  /**
   * Check if addition requires carrying
   */
  function hasCarry(a, b) {
    let carry = 0;
    while (a > 0 || b > 0) {
      const da = a % 10, db = b % 10;
      if (da + db + carry >= 10) return true;
      carry = (da + db + carry >= 10) ? 1 : 0;
      a = Math.floor(a / 10);
      b = Math.floor(b / 10);
    }
    return false;
  }

  /**
   * Check if subtraction requires borrowing
   */
  function hasBorrow(a, b) {
    let borrow = 0;
    while (a > 0 || b > 0) {
      const da = a % 10, db = b % 10;
      if (da - borrow < db) return true;
      borrow = (da - borrow < db) ? 1 : 0;
      a = Math.floor(a / 10);
      b = Math.floor(b / 10);
    }
    return false;
  }

  // ========================================
  // UNIQUE 4-DIGIT NUMBER (for place value questions)
  // ========================================

  /**
   * Generate a 4-digit number with all unique digits (no repeats)
   * Used ONLY for place value / digit value questions
   */
  function unique4Digit() {
    const digits = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
    // Ensure first digit is not 0
    if (digits[0] === 0) {
      for (let i = 1; i < 4; i++) {
        if (digits[i] !== 0) {
          [digits[0], digits[i]] = [digits[i], digits[0]];
          break;
        }
      }
    }
    return digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];
  }

  /**
   * Get number range based on digit mode
   */
  function digitsRange(mode) {
    if (mode === "3") return [100, 999];
    if (mode === "4") return [1000, 9999];
    if (mode === "mix34") return Math.random() < 0.5 ? [100, 999] : [1000, 9999];
    if (mode === "mix35") {
      const r = Math.random();
      if (r < 0.40) return [100, 999];
      if (r < 0.85) return [1000, 9999];
      return [10000, 99999];
    }
    return [1000, 9999];
  }

  /**
   * Generate a number (may have repeated digits)
   */
  function getNumber(mode) {
    if (mode === "mix34") {
      return Math.random() < 0.5 ? rand(100, 999) : rand(1000, 9999);
    }
    if (mode === "mix35") {
      const r = Math.random();
      if (r < 0.40) return rand(100, 999);
      if (r < 0.85) return rand(1000, 9999);
      return rand(10000, 99999);
    }
    const [lo, hi] = digitsRange(mode);
    return rand(lo, hi);
  }

  // ========================================
  // NUMBER TO WORDS (Singapore style with "and")
  // ========================================

  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function twoDigitsToWords(n) {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const t = Math.floor(n / 10), u = n % 10;
    if (u === 0) return tens[t];
    return tens[t] + "-" + ones[u];
  }

  function threeDigitsToWords(n, useAnd = true) {
    if (n < 100) return twoDigitsToWords(n);
    const h = Math.floor(n / 100), r = n % 100;
    if (r === 0) return ones[h] + " hundred";
    return ones[h] + " hundred" + (useAnd ? " and " : " ") + twoDigitsToWords(r);
  }

  function numberToWordsSG(n, useAnd = true) {
    n = Math.floor(Math.abs(n));
    if (n < 1000) return threeDigitsToWords(n, useAnd);
    const th = Math.floor(n / 1000), r = n % 1000;
    const thPart = (th < 100) ? (th < 10 ? ones[th] : twoDigitsToWords(th)) : threeDigitsToWords(th, useAnd);
    if (r === 0) return thPart + " thousand";
    const needAnd = useAnd && r < 100;
    return thPart + " thousand" + (needAnd ? " and " : " ") + threeDigitsToWords(r, useAnd);
  }

  /**
   * Normalize words for comparison (remove punctuation, "and", extra spaces)
   */
  function normalizeWords(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[^a-z\s-]/g, " ")
      .replace(/-/g, " ")
      .replace(/\band\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ========================================
  // AUDIO (time-up sound)
  // ========================================

  let audioCtx = null;

  /**
   * Ensure AudioContext is created and resumed
   */
  function ensureAudio() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    } catch (e) {}
    return audioCtx;
  }

  /**
   * Fallback: synthesize a loud clock ring using Web Audio API
   */
  function loudClockRingFallback() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(1.0, now + 0.01); // LOUD
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
    master.connect(ctx.destination);

    function bellHit(t) {
      const hitGain = ctx.createGain();
      hitGain.gain.setValueAtTime(0.0001, t);
      hitGain.gain.exponentialRampToValueAtTime(1.0, t + 0.006);
      hitGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      hitGain.connect(master);

      // Bright bell partials
      const freqs = [880, 1320, 1760, 2640, 3520];
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(f, t);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.34 / (i + 1), t);
        o.connect(g);
        g.connect(hitGain);
        o.start(t);
        o.stop(t + 0.62);
      });

      // Sharp click for "ring"
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      noise.buffer = buffer;

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(2200, t);
      bp.Q.setValueAtTime(1.2, t);

      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0.0001, t);
      ng.gain.exponentialRampToValueAtTime(1.0, t + 0.004);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

      noise.connect(bp);
      bp.connect(ng);
      ng.connect(hitGain);
      noise.start(t);
      noise.stop(t + 0.2);
    }

    // Double ring
    bellHit(now);
    bellHit(now + 0.28);
  }

  /**
   * Play time-up sound (tries MP3 first, falls back to synthesized)
   */
  async function playTimeUpSound() {
    const a = byId("timeupAudio");
    try {
      if (a) {
        a.currentTime = 0;
        a.volume = 1.0;
        const p = a.play();
        if (p && typeof p.then === "function") await p;
        return;
      }
    } catch (e) {}
    loudClockRingFallback();
  }

  /**
   * Unlock audio (required by browsers after user interaction)
   */
  function unlockAudio() {
    try {
      const a = byId("timeupAudio");
      if (a) {
        a.muted = true;
        a.play().then(() => {
          a.pause();
          a.currentTime = 0;
          a.muted = false;
        }).catch(() => {
          a.muted = false;
        });
      }
    } catch (e) {}
    ensureAudio();
  }

  // ========================================
  // CONFETTI ANIMATION
  // ========================================

  /**
   * Trigger confetti animation on correct answer
   */
  function confettiBoom() {
    const box = byId("confetti");
    box.innerHTML = "";
    box.style.display = "block";
    const N = 80;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("i");
      p.style.left = rand(0, 100) + "vw";
      p.style.animationDelay = (Math.random() * 0.25) + "s";
      p.style.background = `hsla(${rand(0, 360)}, 95%, 65%, .98)`;
      p.style.width = rand(8, 12) + "px";
      p.style.height = rand(10, 16) + "px";
      p.style.transform = `rotate(${rand(0, 180)}deg)`;
      box.appendChild(p);
    }
    setTimeout(() => {
      box.style.display = "none";
      box.innerHTML = "";
    }, 1600);
  }

  // ========================================
  // DIGIT FORMING (permutations)
  // ========================================

  /**
   * Generate all permutations of an array
   */
  function permutations(arr) {
    const out = [];
    function rec(a, i) {
      if (i === a.length) {
        out.push(a.slice());
        return;
      }
      for (let j = i; j < a.length; j++) {
        [a[i], a[j]] = [a[j], a[i]];
        rec(a, i + 1);
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    rec(arr.slice(), 0);
    return out;
  }

  /**
   * Find best number from given digits matching criteria
   */
  function bestNumberFromDigits(digs, want) {
    const perms = permutations(digs);
    let best = null;
    for (const p of perms) {
      if (p[0] === 0) continue; // No leading zero
      const last = p[p.length - 1];
      if (want.parity === "odd" && last % 2 === 0) continue;
      if (want.parity === "even" && last % 2 !== 0) continue;
      const num = p.reduce((acc, d) => acc * 10 + d, 0);
      if (best === null) best = num;
      else if (want.minmax === "min" && num < best) best = num;
      else if (want.minmax === "max" && num > best) best = num;
    }
    return best;
  }

  // ========================================
  // QUESTION GENERATORS
  // ========================================

  /**
   * Generate counting question (place value discs)
   */
  function genCounting(mode) {
    const n = getNumber(mode);
    const s = String(n).padStart(4, "0");
    const th = Number(s[s.length - 4]);
    const h = Number(s[s.length - 3]);
    const t = Number(s[s.length - 2]);
    const o = Number(s[s.length - 1]);

    return {
      type: "counting",
      name: "Counting (place value discs)",
      prompt: "Count the place value discs and write the total value.",
      data: { th, h, t, o, total: n },
      answerText: String(n),
      explain: `Total = ${th}×1000 + ${h}×100 + ${t}×10 + ${o}.`
    };
  }

  /**
   * Generate words question (number ↔ words)
   */
  function genWords(mode) {
    const n = getNumber(mode);
    const words = numberToWordsSG(n, true);
    const askType = Math.random() < 0.5 ? "numToWords" : "wordsToNum";
    return {
      type: "words",
      name: "Writing in words / number",
      prompt: askType === "numToWords"
        ? `Write <b>${n}</b> in words.`
        : `Write <b>${words}</b> in number.`,
      data: { n, words, askType },
      answerText: askType === "numToWords" ? words : String(n),
      explain: askType === "numToWords"
        ? `One correct way: "${words}".`
        : `The number is ${n}.`
    };
  }

  /**
   * Generate place value / digit value question
   * ✅ ONLY this question type uses unique 4-digit numbers
   */
  function genValue(mode) {
    let n;

    if (mode === "4") {
      n = unique4Digit(); // Always 4-digit unique
    } else if (mode === "mix34") {
      n = (Math.random() < 0.5) ? rand(100, 999) : unique4Digit();
    } else if (mode === "mix35") {
      const r = Math.random();
      if (r < 0.40) n = rand(100, 999);
      else if (r < 0.85) n = unique4Digit(); // 4-digit portion is unique
      else n = rand(10000, 99999); // 5-digit can repeat (allowed)
    } else {
      n = rand(100, 999);
    }

    const s = String(n);
    const idxFromLeft = rand(0, s.length - 1);
    const digit = Number(s[idxFromLeft]);
    const placePow = (s.length - 1 - idxFromLeft);
    const placeValue = digit * Math.pow(10, placePow);

    const placeNames = ["ones", "tens", "hundreds", "thousands", "ten-thousands"];
    const placeName = placeNames[placePow] || "ones";

    const variant = pick(["standFor", "whichDigit", "valueOfDigitInNumber", "placeValueOfUnderlined"]);

    if (variant === "standFor") {
      return {
        type: "value",
        name: "Digit value",
        prompt: `In <b>${n}</b>, the digit <b>${digit}</b> stands for <b>_____</b>.`,
        data: { answer: placeValue },
        answerText: String(placeValue),
        explain: `${digit} in the ${placeName} place = ${placeValue}.`
      };
    }
    if (variant === "whichDigit") {
      return {
        type: "value",
        name: "Place value",
        prompt: `In <b>${n}</b>, which digit is in the <b>${placeName}</b> place?`,
        data: { answer: digit },
        answerText: String(digit),
        explain: `The ${placeName} digit is ${digit}.`
      };
    }
    if (variant === "valueOfDigitInNumber") {
      return {
        type: "value",
        name: "Value of a digit",
        prompt: `What is the value of digit <b>${digit}</b> in <b>${n}</b>?`,
        data: { answer: placeValue },
        answerText: String(placeValue),
        explain: `Digit ${digit} is in the ${placeName} place, so its value is ${placeValue}.`
      };
    }

    const underlined = s.split("").map((ch, i) =>
      i === idxFromLeft
        ? `<span style="text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:4px">${ch}</span>`
        : ch
    ).join("");

    return {
      type: "value",
      name: "Place value of underlined digit",
      prompt: `What is the value of the underlined digit in <b>${underlined}</b>?`,
      data: { answer: placeValue },
      answerText: String(placeValue),
      explain: `Underlined digit is ${digit} in the ${placeName} place → ${placeValue}.`
    };
  }

  /**
   * Generate ordering question
   */
  function genOrdering(mode) {
    const count = (Math.random() < 0.65) ? 3 : 4;
    const nums = [];
    while (nums.length < count) {
      const x = getNumber(mode);
      if (!nums.includes(x)) nums.push(x);
    }
    let dir = byId("selOrderDir").value;
    if (dir === "mix") dir = Math.random() < 0.5 ? "asc" : "desc";
    const sorted = nums.slice().sort((a, b) => dir === "asc" ? a - b : b - a);

    return {
      type: "ordering",
      name: "Ordering numbers",
      prompt: `Arrange from <b>${dir === "asc" ? "smallest" : "greatest"}</b> to <b>${dir === "asc" ? "greatest" : "smallest"}</b>.`,
      data: { nums, sorted, dir },
      answerText: sorted.join(", "),
      explain: `Correct order: ${sorted.join(", ")}.`
    };
  }

  /**
   * Generate number pattern question
   */
  function genPattern(mode) {
    const kind = pick(["easy", "alt"]);
    const len = 7;
    let seq = [];

    if (kind === "easy") {
      const base = getNumber(mode);
      const step = pick([5, 10, 20, 25, 50, 100, -5, -10, -20, -25, -50, -100]);
      seq = Array.from({ length: len }, (_, i) => base + i * step);
    } else {
      const base = getNumber(mode);
      const a = pick([10, 20, 50, 100]);
      const b = pick([1, 2, 5, 10]);
      seq = [base];
      for (let i = 1; i < len; i++) {
        const prev = seq[i - 1];
        seq.push(prev + (i % 2 === 1 ? a : -b));
      }
    }

    const blankIndex = rand(3, 5);
    const answer = seq[blankIndex];
    const display = seq.map((v, i) => i === blankIndex ? "____" : v);

    return {
      type: "pattern",
      name: "Number patterns",
      prompt: "Fill in the missing number.",
      data: { display, answer },
      answerText: String(answer),
      explain: `Full pattern: ${seq.join(", ")}`
    };
  }

  /**
   * Generate form number with digits question
   */
  function genFormDigits() {
    const minmax = Math.random() < 0.5 ? "min" : "max";
    const parity = Math.random() < 0.5 ? "odd" : "even";

    let digits;
    for (let tries = 0; tries < 200; tries++) {
      const pool = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      digits = pool.slice(0, 4);
      const hasParity = digits.some(d => (parity === "odd" ? d % 2 === 1 : d % 2 === 0));
      const hasNonZero = digits.some(d => d !== 0);
      if (!hasParity || !hasNonZero) continue;
      const best = bestNumberFromDigits(digits, { minmax, parity });
      if (best !== null) {
        return {
          type: "formDigits",
          name: "Form number with digits",
          prompt: `Use the digits in the boxes to form the <b>${minmax === "min" ? "smallest" : "greatest"}</b> <b>4-digit ${parity}</b> number. Use each digit <b>only once</b>.`,
          data: { digits, answer: best },
          answerText: String(best),
          explain: `Answer: ${best}. (4-digit, first digit not 0, last digit is ${parity}.)`
        };
      }
    }
    const fallback = [0, 3, 1, 9];
    return {
      type: "formDigits",
      name: "Form number with digits",
      prompt: `Use the digits in the boxes to form the <b>smallest</b> <b>4-digit odd</b> number. Use each digit <b>only once</b>.`,
      data: { digits: fallback, answer: 1039 },
      answerText: "1039",
      explain: "Answer: 1039."
    };
  }

  /**
   * Generate 4-digit addition / subtraction question
   */
  function genAddSub() {
    let op, a, b, ans;
    let tries = 0;
    const wantRegroup = Math.random() < 0.80; // Mostly regrouping

    while (true) {
      tries++;
      op = (Math.random() < 0.5) ? "+" : "-";

      if (op === "+") {
        // Keep sum within 4 digits (<= 9999)
        const sum = rand(2000, 9999);
        a = rand(1000, sum - 1000);
        b = sum - a;
        if (a < 1000 || b < 1000 || a > 9999 || b > 9999) continue;

        ans = a + b;
        if (wantRegroup && !hasCarry(a, b) && tries < 80) continue;

      } else {
        a = rand(1000, 9999);
        b = rand(1000, 9999);
        if (b > a) [a, b] = [b, a];

        ans = a - b;
        if (wantRegroup && !hasBorrow(a, b) && tries < 80) continue;
      }

      break;
    }

    return {
      type: "addsub",
      name: "4-digit addition / subtraction",
      prompt: `Calculate: <b>${fmt(a)} ${op} ${fmt(b)}</b>.`,
      data: { a, b, op, ans },
      answerText: String(ans),
      explain: `${fmt(a)} ${op} ${fmt(b)} = ${fmt(ans)}.`
    };
  }

  // ========================================
  // STATE
  // ========================================

  let Q = []; // Array of question objects
  let qi = 0; // Current question index
  let score = 0; // Total score
  let checkedThisQ = false; // Prevent double-scoring
  let timer = null; // Timer interval
  let timeLeft = 0; // Seconds remaining

  // ========================================
  // UI REFERENCES
  // ========================================

  const qIndexEl = byId("qIndex");
  const qTotalEl = byId("qTotal");
  const scoreEl = byId("scoreNow");
  const qBadge = byId("qBadge");
  const qName = byId("qName");
  const qType = byId("qType");
  const qBody = byId("qBody");
  const timerBox = byId("timerBox");
  const timeLeftEl = byId("timeLeft");
  const overlay = byId("overlay");
  const ovAns = byId("ovAns");

  // Teacher controls
  const inpTotal = byId("inpTotal");
  const selDigits = byId("selDigits");
  const inpTime = byId("inpTime");
  const selShowTimer = byId("selShowTimer");
  const ckCount = byId("ckCount");
  const ckWords = byId("ckWords");
  const ckValue = byId("ckValue");
  const ckOrder = byId("ckOrder");
  const ckPattern = byId("ckPattern");
  const ckFormDigits = byId("ckFormDigits");
  const ckAddSub = byId("ckAddSub");

  // Buttons
  const btnNewSet = byId("btnNewSet");
  const btnResetScore = byId("btnResetScore");
  const btnCheck = byId("btnCheck");
  const btnShowAns = byId("btnShowAns");
  const btnPrev = byId("btnPrev");
  const btnNext = byId("btnNext");
  const btnToggleTeacher = byId("btnToggleTeacher");

  // ========================================
  // TIMER
  // ========================================

  /**
   * Stop the timer
   */
  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  /**
   * Update timer UI (show/hide, color)
   */
  function updateTimerUI() {
    const show = selShowTimer.value === "show";
    timerBox.classList.toggle("timerHide", !show);
    timeLeftEl.textContent = (timeLeft > 0 ? String(timeLeft) : "--");
    if (show) {
      const dot = timerBox.querySelector(".timerDot");
      if (dot) {
        if (timeLeft > 0 && timeLeft <= 5) {
          dot.style.background = "var(--c5)";
          dot.style.boxShadow = "0 0 0 4px rgba(239,68,68,.18)";
        } else {
          dot.style.background = "var(--c4)";
          dot.style.boxShadow = "0 0 0 4px rgba(245,158,11,.18)";
        }
      }
    }
  }

  /**
   * Start the timer for current question
   */
  function startTimer() {
    stopTimer();
    const secs = clamp(Number(inpTime.value || 0), 0, 999);
    if (secs <= 0) {
      timeLeft = 0;
      updateTimerUI();
      return;
    }
    timeLeft = secs;
    updateTimerUI();
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        timeLeft = 0;
        updateTimerUI();
        stopTimer();
        onTimeUp();
      } else {
        updateTimerUI();
      }
    }, 1000);
  }

  /**
   * Handle time-up event
   */
  async function onTimeUp() {
    if (checkedThisQ) return;
    showAnswer(true);
    await playTimeUpSound();
    overlay.style.display = "flex";
    ovAns.textContent = "Answer: " + Q[qi].answerText;
  }

  // ========================================
  // RENDERING HELPERS
  // ========================================

  /**
   * Update top bar (progress, score)
   */
  function updateTop() {
    qIndexEl.textContent = String(qi + 1);
    qTotalEl.textContent = String(Q.length);
    scoreEl.textContent = String(score);
    qBadge.textContent = String(qi + 1);
  }

  /**
   * Create result box for feedback
   */
  function makeResultBox() {
    const box = document.createElement("div");
    box.className = "result";
    box.id = "resultBox";
    box.innerHTML = `<h3 id="resultTitle">Result</h3><p id="resultText"></p>`;
    return box;
  }

  /**
   * Render input field
   */
  function renderInput(labelText, type, id, placeholder) {
    const wrap = document.createElement("div");
    wrap.className = "answerArea";
    wrap.innerHTML = `
      <div class="grow">
        <label>${labelText}</label>
        <input id="${id}" type="${type}" ${type === "number" ? 'inputmode="numeric"' : ''} placeholder="${placeholder || ""}"/>
      </div>
    `;
    return wrap;
  }

  /**
   * Create a place value disc
   */
  function makeDisc(text, cls) {
    const d = document.createElement("div");
    d.className = "disc " + cls;
    d.innerHTML = `<span class="txt">${text}</span>`;
    return d;
  }

  /**
   * Render place value discs board
   */
  function renderPVDiscs({ th, h, t, o }) {
    const board = document.createElement("div");
    board.className = "pvBoard";
    board.innerHTML = `
      <div class="pvHead">
        <div>Thousands</div><div>Hundreds</div><div>Tens</div><div>Ones</div>
      </div>
      <div class="pvCols">
        <div class="pvCol" id="pvTh"></div>
        <div class="pvCol" id="pvH"></div>
        <div class="pvCol" id="pvT"></div>
        <div class="pvCol" id="pvO"></div>
      </div>
    `;
    const thCol = board.querySelector("#pvTh");
    const hCol = board.querySelector("#pvH");
    const tCol = board.querySelector("#pvT");
    const oCol = board.querySelector("#pvO");

    for (let i = 0; i < th; i++) thCol.appendChild(makeDisc("1000", "th"));
    for (let i = 0; i < h; i++) hCol.appendChild(makeDisc("100", "h"));
    for (let i = 0; i < t; i++) tCol.appendChild(makeDisc("10", "t"));
    for (let i = 0; i < o; i++) oCol.appendChild(makeDisc("1", "o"));
    return board;
  }

  /**
   * Render digit boxes (for form number question)
   */
  function renderDigitsBoxes(digits) {
    const row = document.createElement("div");
    row.className = "digitsRow";
    digits.forEach(d => {
      const b = document.createElement("div");
      b.className = "digitBox";
      b.textContent = String(d);
      row.appendChild(b);
    });
    return row;
  }

  /**
   * Render pattern line (with blank)
   */
  function renderPatternLine(display) {
    const row = document.createElement("div");
    row.className = "digitsRow";
    row.style.background = "linear-gradient(135deg, rgba(34,197,94,.10), rgba(6,182,212,.08))";
    display.forEach(v => {
      const b = document.createElement("div");
      b.className = "digitBox";
      b.style.width = "92px";
      b.textContent = String(v);
      row.appendChild(b);
    });
    return row;
  }

  /**
   * Enable drag-and-drop reordering for tiles
   */
  function enableDragReorder(container) {
    let dragged = null;
    container.addEventListener("dragstart", (e) => {
      const t = e.target.closest(".digitBox");
      if (!t) return;
      dragged = t;
      e.dataTransfer.setData("text/plain", t.dataset.val || "");
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => { t.style.opacity = ".55"; }, 0);
    });
    container.addEventListener("dragend", (e) => {
      const t = e.target.closest(".digitBox");
      if (t) t.style.opacity = "1";
      dragged = null;
    });
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const over = e.target.closest(".digitBox");
      if (!dragged || !over || over === dragged) return;
      const rect = over.getBoundingClientRect();
      const after = (e.clientX - rect.left) > rect.width / 2;
      if (after) over.after(dragged);
      else over.before(dragged);
    });
    container.addEventListener("drop", (e) => e.preventDefault());
  }

  /**
   * Render ordering tiles (draggable)
   */
  function renderOrderingTiles(nums) {
    const area = document.createElement("div");
    area.className = "digitsRow";
    area.style.background = "linear-gradient(135deg, rgba(6,182,212,.10), rgba(99,102,241,.08))";
    area.id = "orderArea";

    shuffle(nums).forEach(n => {
      const t = document.createElement("div");
      t.className = "digitBox";
      t.style.cursor = "grab";
      t.style.userSelect = "none";
      t.draggable = true;
      t.dataset.val = String(n);
      t.textContent = String(n);
      area.appendChild(t);
    });

    enableDragReorder(area);
    return area;
  }

  /**
   * Set result box content
   */
  function setResult(ok, title, html) {
    const box = byId("resultBox");
    const t = byId("resultTitle");
    const p = byId("resultText");
    box.style.display = "block";
    box.classList.toggle("bad", !ok);
    t.textContent = title;
    p.innerHTML = html;
  }

  // ========================================
  // RENDER QUESTION
  // ========================================

  /**
   * Render current question
   */
  function renderQ() {
    stopTimer();
    checkedThisQ = false;

    updateTop();
    const q = Q[qi];
    qName.textContent = q.name;
    qType.textContent = q.type;

    qBody.innerHTML = "";

    const prompt = document.createElement("div");
    prompt.className = "prompt";
    prompt.innerHTML = q.prompt + `<small>Press <b>Check ✅</b> for instant scoring.</small>`;
    qBody.appendChild(prompt);

    if (q.type === "counting") {
      qBody.appendChild(renderPVDiscs(q.data));
      qBody.appendChild(renderInput("Total value", "number", "ansInput", "e.g., 3952"));
    } else if (q.type === "formDigits") {
      qBody.appendChild(renderDigitsBoxes(q.data.digits));
      qBody.appendChild(renderInput("Ans", "number", "ansInput", "4-digit answer"));
    } else if (q.type === "words") {
      if (q.data.askType === "wordsToNum") {
        qBody.appendChild(renderInput("Your answer", "number", "ansInput", "Type the number"));
      } else {
        qBody.appendChild(renderInput("Your answer", "text", "ansInput", "Type words (e.g., three thousand nine hundred and fifty-two)"));
      }
    } else if (q.type === "value") {
      qBody.appendChild(renderInput("Your answer", "number", "ansInput", "Answer"));
    } else if (q.type === "ordering") {
      qBody.appendChild(renderOrderingTiles(q.data.nums));
      const tip = document.createElement("div");
      tip.className = "hint";
      tip.style.marginTop = "8px";
      tip.textContent = "Drag the tiles to order them.";
      qBody.appendChild(tip);
    } else if (q.type === "addsub") {
      qBody.appendChild(renderInput("Your answer", "number", "ansInput", "Answer"));
    } else if (q.type === "pattern") {
      qBody.appendChild(renderPatternLine(q.data.display));
      qBody.appendChild(renderInput("Your answer", "number", "ansInput", "Missing number"));
    }

    qBody.appendChild(makeResultBox());

    startTimer();
    btnPrev.disabled = (qi === 0);
  }

  // ========================================
  // GRADING
  // ========================================

  /**
   * Grade current question
   */
  function grade(q) {
    if (q.type === "ordering") {
      const area = byId("orderArea");
      const vals = Array.from(area?.querySelectorAll(".digitBox") || []).map(x => Number(x.dataset.val));
      const expected = q.data.sorted;
      return vals.length === expected.length && vals.every((n, i) => n === expected[i]);
    }
    const inp = byId("ansInput");
    const raw = (inp ? inp.value : "").trim();

    if (q.type === "counting" || q.type === "value" || q.type === "pattern" || q.type === "formDigits" || q.type === "addsub") {
      return Number(raw) === Number(q.answerText);
    }
    if (q.type === "words") {
      if (q.data.askType === "wordsToNum") return Number(raw) === q.data.n;
      return normalizeWords(raw) === normalizeWords(q.data.words);
    }
    return false;
  }

  /**
   * Check current answer
   */
  function checkCurrent() {
    unlockAudio();
    const q = Q[qi];

    const ok = grade(q);
    if (ok) {
      // Prevent double-scoring
      if (!checkedThisQ) {
        score++;
        scoreEl.textContent = String(score);
      }
      checkedThisQ = true;
      stopTimer();
      setResult(true, "Correct ✅",
        `Great job! <b>${q.answerText}</b> is correct.<br/><span style="color:var(--muted)">${q.explain}</span>`);
      confettiBoom();
    } else {
      setResult(false, "Not yet ✗",
        `Try again. <b>Hint:</b> check carefully.<br/><span style="color:var(--muted)">You can press <b>Show Answer</b> to learn.</span>`);
      // Keep timer running (if enabled)
    }
  }

  /**
   * Show answer (from button or time-up)
   */
  function showAnswer(fromTimeUp = false) {
    unlockAudio();
    const q = Q[qi];
    setResult(false, fromTimeUp ? "Time's up ⏰" : "Answer 👀",
      `The correct answer is: <b>${q.answerText}</b><br/><span style="color:var(--muted)">${q.explain}</span>`);
    checkedThisQ = true;
    stopTimer();
  }

  // ========================================
  // NAVIGATION
  // ========================================

  /**
   * Navigate to next/prev question
   */
  function go(delta) {
    const next = qi + delta;
    if (next < 0 || next >= Q.length) return;
    overlay.style.display = "none";
    qi = next;
    renderQ();
  }

  // ========================================
  // BUILD SET
  // ========================================

  /**
   * Build a new set of questions
   */
  function buildSet() {
    const total = clamp(Number(inpTotal.value || 10), 5, 40);
    const mode = selDigits.value;

    const types = [];
    if (ckCount.checked) types.push("counting");
    if (ckWords.checked) types.push("words");
    if (ckValue.checked) types.push("value");
    if (ckOrder.checked) types.push("ordering");
    if (ckPattern.checked) types.push("pattern");
    if (ckFormDigits.checked) types.push("formDigits");
    if (ckAddSub.checked) types.push("addsub");
    if (types.length === 0) {
      alert("Please tick at least 1 question type.");
      return;
    }

    Q = [];
    for (let i = 0; i < total; i++) {
      const t = pick(types);
      let q;
      if (t === "counting") q = genCounting(mode);
      if (t === "words") q = genWords(mode);
      if (t === "value") q = genValue(mode); // ✅ unique 4-digit digits ONLY here
      if (t === "ordering") q = genOrdering(mode);
      if (t === "pattern") q = genPattern(mode);
      if (t === "formDigits") q = genFormDigits();
      if (t === "addsub") q = genAddSub(); // ✅ NEW
      Q.push(q);
    }

    qi = 0;
    score = 0;
    scoreEl.textContent = "0";
    renderQ();
    qTotalEl.textContent = String(Q.length);
  }

  // ========================================
  // TIME-UP OVERLAY
  // ========================================

  byId("btnCloseOverlay").addEventListener("click", () => {
    overlay.style.display = "none";
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });

  // ========================================
  // TEACHER FULLSCREEN TOGGLE
  // ========================================

  let teacherHidden = false;

  /**
   * Toggle teacher panel visibility (fullscreen mode)
   */
  function setTeacherHidden(h) {
    teacherHidden = !!h;
    document.body.classList.toggle("fullscreenQ", teacherHidden);
    btnToggleTeacher.textContent = teacherHidden ? "Show Teacher" : "Hide Teacher";
  }

  btnToggleTeacher.addEventListener("click", () => {
    unlockAudio();
    setTeacherHidden(!teacherHidden);
  });

  // ========================================
  // WIRING
  // ========================================

  byId("btnNewSet").addEventListener("click", () => {
    unlockAudio();
    buildSet();
  });
  byId("btnResetScore").addEventListener("click", () => {
    score = 0;
    scoreEl.textContent = "0";
  });

  byId("btnCheck").addEventListener("click", checkCurrent);
  byId("btnShowAns").addEventListener("click", () => showAnswer(false));
  byId("btnPrev").addEventListener("click", () => go(-1));
  byId("btnNext").addEventListener("click", () => go(1));

  selShowTimer.addEventListener("change", updateTimerUI);

  // Unlock audio on first interaction
  window.addEventListener("pointerdown", () => unlockAudio(), { once: true });

  // ========================================
  // INIT
  // ========================================

  setTeacherHidden(false);
  buildSet();

  // Clear localStorage on load (as per original)
  const ACTIVITY_ID = "vendor/external_0.txt";
  window.__ACTIVITY_ID__ = ACTIVITY_ID;
  try {
    localStorage.removeItem(ACTIVITY_ID);
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(ACTIVITY_ID + "::") || k.startsWith("sls_scope::" + ACTIVITY_ID) ||
        k.startsWith("UFCO-firstSubmit::" + ACTIVITY_ID) || k.startsWith("sls_unlike_payload::" + ACTIVITY_ID)) {
        localStorage.removeItem(k);
      }
    });
    sessionStorage.removeItem(ACTIVITY_ID);
  } catch (e) {}

})();