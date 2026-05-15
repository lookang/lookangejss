/**
 * Leitner Engine — Core logic for Factual Fluency interactive app
 * P3-4 Mathematics | 3-Pack System (A=Daily, B=Tue/Thu, C=Friday)
 * credit: weelookang@gmail.com using Claude Sonnet 4.6
 */

const LeitnerEngine = (() => {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  const STORAGE_KEYS = {
    cards: 'leitner_cards_v2',
    student: 'leitner_student',
    achievements: 'leitner_achievements',
    records: 'leitner_records',
  };

  // Sunday=0 ... Saturday=6
  const DAY_PACKS = {
    0: ['A'],
    1: ['A'],
    2: ['A', 'B'],
    3: ['A'],
    4: ['A', 'B'],
    5: ['A', 'B', 'C'],
    6: ['A'],
  };

  const PACK_COLORS = { A: '#ef4444', B: '#f59e0b', C: '#22c55e' };
  const PACK_SCHEDULE = {
    A: 'Every day',
    B: 'Tuesday & Thursday',
    C: 'Friday',
  };

  // ── State ──────────────────────────────────────────────────
  let state = {
    student: { name: 'Student', startDate: new Date().toISOString() },
    cards: [],
    achievements: {},
    records: [],
    actionLog: [],
    sessionStartTime: Date.now(),
    inputType: 'mouse',
  };

  // ── Device Detection ───────────────────────────────────────
  function detectInputType() {
    if (window.matchMedia('(pointer: coarse)').matches) {
      state.inputType = navigator.maxTouchPoints > 1 ? 'capacitive' : 'IR-touch';
    } else {
      state.inputType = 'mouse';
    }
    return state.inputType;
  }

  // ── Utility ────────────────────────────────────────────────
  function debounce(fn, delay = 50) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function relativeTime() {
    const elapsed = Math.round((Date.now() - state.sessionStartTime) / 1000);
    return `t=${elapsed}s`;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Card Factory ───────────────────────────────────────────
  function makeCard(id, topic, milestone, question, answer, extra = {}) {
    return {
      id, topic, milestone, question, answer,
      pack: 'A',
      attempts: [],
      hintLevel: 3,
      commonErrors: {},
      lastReviewed: null,
      ...extra,
    };
  }

  // ── Card Bank Generation ───────────────────────────────────
  function generateAdditionCards() {
    const cards = [];
    // M1: within 20
    for (let a = 1; a <= 10; a++) {
      for (let b = 1; b <= 10; b++) {
        if (a + b <= 20) {
          cards.push(makeCard(`add-${a}-${b}`, 'addition', 1, `${a} + ${b} = ?`, String(a + b)));
        }
      }
    }
    // M1 extended: 2-digit additions (P3-4 level)
    const pairs = [[23,14],[45,32],[67,28],[84,15],[36,47],[52,39],[71,26],[43,58],[65,27],[38,54],
                   [123,45],[234,61],[308,75],[142,89],[276,43]];
    pairs.forEach(([a, b]) => {
      cards.push(makeCard(`add-${a}-${b}`, 'addition', 1, `${a} + ${b} = ?`, String(a + b)));
    });
    return cards;
  }

  function generateSubtractionCards() {
    const cards = [];
    // M1: within 20
    for (let a = 2; a <= 20; a++) {
      for (let b = 1; b < a && b <= 9; b++) {
        cards.push(makeCard(`sub-${a}-${b}`, 'subtraction', 1, `${a} − ${b} = ?`, String(a - b)));
      }
    }
    // M1 extended: 2-digit subtractions
    const pairs = [[37,14],[65,32],[82,47],[54,28],[73,36],[91,45],[68,39],[47,23],[86,52],[75,48],
                   [135,42],[268,73],[304,85],[197,63],[452,128]];
    pairs.forEach(([a, b]) => {
      cards.push(makeCard(`sub-${a}-${b}`, 'subtraction', 1, `${a} − ${b} = ?`, String(a - b)));
    });
    return cards;
  }

  function generateMultiplicationCards() {
    const cards = [];
    // M3 & M5: 2×, 3×, 4×, 5×, 10×
    [2, 3, 4, 5, 10].forEach(mult => {
      for (let n = 1; n <= 10; n++) {
        cards.push(makeCard(`mult-${mult}x${n}`, 'multiplication', 3, `${mult} × ${n} = ?`, String(mult * n)));
      }
    });
    // M7 & M9: 6×, 7×, 8×, 9×
    [6, 7, 8, 9].forEach(mult => {
      for (let n = 1; n <= 10; n++) {
        cards.push(makeCard(`mult-${mult}x${n}`, 'multiplication', 7, `${mult} × ${n} = ?`, String(mult * n)));
      }
    });
    return cards;
  }

  function generateDivisionCards() {
    const cards = [];
    // M4 & M5: ÷2,3,4,5,10
    [2, 3, 4, 5, 10].forEach(div => {
      for (let q = 1; q <= 10; q++) {
        const dvd = div * q;
        cards.push(makeCard(`div-${dvd}by${div}`, 'division', 4, `${dvd} ÷ ${div} = ?`, String(q)));
      }
    });
    // M8 & M9: ÷6,7,8,9
    [6, 7, 8, 9].forEach(div => {
      for (let q = 1; q <= 10; q++) {
        const dvd = div * q;
        cards.push(makeCard(`div-${dvd}by${div}`, 'division', 8, `${dvd} ÷ ${div} = ?`, String(q)));
      }
    });
    return cards;
  }

  function getAllBaseCards() {
    return [
      ...generateAdditionCards(),
      ...generateSubtractionCards(),
      ...generateMultiplicationCards(),
      ...generateDivisionCards(),
    ];
  }

  // ── Pack Schedule ──────────────────────────────────────────
  function getTodayPacks() {
    return DAY_PACKS[new Date().getDay()] || ['A'];
  }

  function getCardsForTopic(topic) {
    const todayPacks = getTodayPacks();
    return state.cards.filter(c => c.topic === topic && todayPacks.includes(c.pack));
  }

  function getPackCounts(topic) {
    const cards = topic ? state.cards.filter(c => c.topic === topic) : state.cards;
    return {
      A: cards.filter(c => c.pack === 'A').length,
      B: cards.filter(c => c.pack === 'B').length,
      C: cards.filter(c => c.pack === 'C').length,
      total: cards.length,
    };
  }

  function getMilestoneProgress(milestone) {
    const cards = state.cards.filter(c => c.milestone === milestone);
    if (!cards.length) return 0;
    return Math.round((cards.filter(c => c.pack === 'C').length / cards.length) * 100);
  }

  // ── AI Feature 1: Adaptive Difficulty ─────────────────────
  function evaluateCard(cardId, correct, answerGiven) {
    const card = state.cards.find(c => c.id === cardId);
    if (!card) return null;

    card.attempts.push({
      date: new Date().toISOString(),
      correct,
      answerGiven: answerGiven || '',
      hintUsed: card.hintLevel > 0,
    });
    if (card.attempts.length > 10) card.attempts.shift();
    card.lastReviewed = new Date().toISOString();

    if (!correct && answerGiven) {
      card.commonErrors[answerGiven] = (card.commonErrors[answerGiven] || 0) + 1;
    }

    const last5 = card.attempts.slice(-5);
    if (last5.length >= 5) {
      const ratio = last5.filter(a => a.correct).length / 5;
      if (ratio >= 0.8) promoteCard(card);
      else if (ratio < 0.5) demoteCard(card);
    }

    save();
    return card;
  }

  function promoteCard(card) {
    if (card.pack === 'A') {
      card.pack = 'B';
      card.hintLevel = Math.max(0, card.hintLevel - 1);
    } else if (card.pack === 'B') {
      card.pack = 'C';
      card.hintLevel = Math.max(0, card.hintLevel - 1);
    }
  }

  function demoteCard(card) {
    card.pack = 'A';
    card.hintLevel = 3;
    card.attempts = [];
  }

  // ── AI Feature 2: Progressive Hints ───────────────────────
  function getHintHTML(card) {
    if (!card || card.hintLevel === 0) return '';
    switch (card.topic) {
      case 'addition':       return _additionHint(card);
      case 'subtraction':    return _subtractionHint(card);
      case 'multiplication': return _multiplicationHint(card);
      case 'division':       return _divisionHint(card);
      default:               return '';
    }
  }

  function _additionHint(card) {
    const m = card.question.match(/(\d+)\s*\+\s*(\d+)/);
    if (!m) return '';
    const a = +m[1], b = +m[2];
    if (card.hintLevel === 3) return _numberLineSVG(a, b, '+');
    if (card.hintLevel === 2) return `<div class="hint-text">💡 Start with <strong>${a}</strong>, then count up <strong>${b}</strong> more</div>`;
    return `<div class="hint-text">💡 <strong>${a}</strong> + <strong>${b}</strong> = ?</div>`;
  }

  function _subtractionHint(card) {
    const m = card.question.match(/(\d+)\s*[−\-]\s*(\d+)/);
    if (!m) return '';
    const a = +m[1], b = +m[2];
    if (card.hintLevel === 3) return _numberLineSVG(a, b, '-');
    if (card.hintLevel === 2) return `<div class="hint-text">💡 Start at <strong>${a}</strong>, count back <strong>${b}</strong> steps</div>`;
    return `<div class="hint-text">💡 <strong>${a}</strong> − <strong>${b}</strong> = ?</div>`;
  }

  function _multiplicationHint(card) {
    const m = card.question.match(/(\d+)\s*[×x]\s*(\d+)/);
    if (!m) return '';
    const a = +m[1], b = +m[2];
    if (card.hintLevel === 3) return _multiplicationGrid(a, b);
    if (card.hintLevel === 2) {
      const rows = [];
      for (let i = 1; i <= b; i++) rows.push(`${a}×${i}=${a * i}`);
      return `<div class="hint-text">💡 <strong>${a}× table:</strong> ${rows.join(', ')}</div>`;
    }
    const fd = String(a * b)[0];
    return `<div class="hint-text">💡 The answer starts with <strong>${fd}...</strong></div>`;
  }

  function _divisionHint(card) {
    const m = card.question.match(/(\d+)\s*÷\s*(\d+)/);
    if (!m) return '';
    const dvd = +m[1], div = +m[2];
    const q = dvd / div;
    if (card.hintLevel === 3) return `<div class="hint-text">💡 Think multiplication: <strong>${div} × ? = ${dvd}</strong></div><div class="hint-text">Use the ${div}× table to help you!</div>`;
    if (card.hintLevel === 2) {
      const lo = Math.max(1, Math.floor(q * 0.5)), hi = Math.ceil(q * 1.5);
      return `<div class="hint-text">💡 <strong>${div} × __ = ${dvd}</strong> &nbsp;|&nbsp; Answer is between ${lo} and ${hi}</div>`;
    }
    return `<div class="hint-text">💡 How many <strong>${div}s</strong> make <strong>${dvd}</strong>?</div>`;
  }

  function _numberLineSVG(a, b, op) {
    const result = op === '+' ? a + b : a - b;
    const min = op === '+' ? 0 : Math.max(0, result - 1);
    const max = op === '+' ? result + 1 : a + 1;
    const range = max - min;
    const W = 360, H = 72, pad = 20;
    const xOf = v => pad + ((v - min) / range) * (W - pad * 2);

    let s = `<svg viewBox="0 0 ${W} ${H}" class="hint-svg" role="img" aria-label="Number line hint">`;
    s += `<defs>
      <marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b"/></marker>
      <marker id="al" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse"><path d="M0,3 L6,0 L6,6 Z" fill="#f59e0b"/></marker>
    </defs>`;
    s += `<line x1="${pad}" y1="36" x2="${W - pad}" y2="36" stroke="#94a3b8" stroke-width="2"/>`;
    for (let i = min; i <= max; i++) {
      const x = xOf(i);
      s += `<line x1="${x}" y1="31" x2="${x}" y2="41" stroke="#94a3b8" stroke-width="1.5"/>`;
      s += `<text x="${x}" y="56" text-anchor="middle" font-size="11" fill="#475569">${i}</text>`;
    }
    const sx = xOf(a), ex = xOf(result);
    s += `<circle cx="${sx}" cy="36" r="9" fill="#3b82f6"/>`;
    s += `<text x="${sx}" y="40" text-anchor="middle" font-size="10" fill="white" font-weight="bold">${a}</text>`;
    const mid = (sx + ex) / 2, arc = op === '+' ? 'M' + sx + ',28 Q' + mid + ',12 ' + ex + ',28' : 'M' + sx + ',28 Q' + mid + ',12 ' + ex + ',28';
    const marker = op === '+' ? 'ar' : 'al';
    s += `<path d="${arc}" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#${marker})"/>`;
    s += `<circle cx="${ex}" cy="36" r="9" fill="#22c55e"/>`;
    s += `<text x="${ex}" y="40" text-anchor="middle" font-size="10" fill="white" font-weight="bold">${result}</text>`;
    s += `</svg>`;
    return s;
  }

  function _multiplicationGrid(a, b) {
    const maxA = Math.min(a, 10), maxB = Math.min(b, 10);
    let h = `<div class="hint-grid-wrap"><table class="hint-grid" aria-label="Multiplication grid"><tr><th>×</th>`;
    for (let c = 1; c <= maxB; c++) h += `<th class="${c === b ? 'hcol' : ''}">${c}</th>`;
    h += `</tr>`;
    for (let r = 1; r <= maxA; r++) {
      h += `<tr>`;
      h += `<th class="${r === a ? 'hrow' : ''}">${r}</th>`;
      for (let c = 1; c <= maxB; c++) {
        const isT = r === a && c === b;
        const cls = isT ? 'hcell' : (r === a || c === b ? 'hpart' : '');
        h += `<td class="${cls}">${isT ? '?' : ''}</td>`;
      }
      h += `</tr>`;
    }
    h += `</table></div>`;
    return h;
  }

  // ── AI Feature 3: Misconception Detection ─────────────────
  const TIPS = {
    offByOne:   'Check: did you count the last step carefully?',
    doubled:    'Hmm — looks like you might have doubled. Try the × table again!',
    halved:     'Hmm — looks like you might have halved. Check the ÷ table!',
    wrongTable: 'Make sure you\'re using the right times table.',
    regroup:    'Don\'t forget to carry over when a column adds up to 10 or more!',
  };

  function getMisconceptionTip(card) {
    if (!card || !card.commonErrors) return '';
    const correct = parseInt(card.answer, 10);
    for (const [wrong, count] of Object.entries(card.commonErrors)) {
      if (count < 2) continue;
      const w = parseInt(wrong, 10);
      if (Math.abs(w - correct) === 1) return TIPS.offByOne;
      if (w === correct * 2) return TIPS.doubled;
      if (w === Math.round(correct / 2)) return TIPS.halved;
    }
    if (card.topic === 'multiplication' || card.topic === 'division') return TIPS.wrongTable;
    if (card.topic === 'addition' || card.topic === 'subtraction') return TIPS.regroup;
    return '';
  }

  // ── AI Feature 4: Word Problem Template Engine ─────────────
  const NAMES  = ['Ahmad', 'Meiling', 'Priya', 'Siti', 'Ravi', 'Ali', 'Min', 'Arjun', 'Lily', 'John', 'Nadia', 'Wei'];
  const ITEMS  = ['stickers', 'sweets', 'marbles', 'erasers', 'pencils', 'cookies', 'balloons', 'stamps', 'apples', 'fish', 'books', 'toy cars'];
  const CONTS  = ['bag', 'box', 'basket', 'row', 'plate', 'jar', 'packet'];

  const WP_TEMPLATES = {
    addition: [
      '{n1} has {a} {item}. {n2} gives {n1} {b} more {item}. How many {item} does {n1} have now?',
      '{n1} collected {a} {item} on Monday and {b} {item} on Tuesday. How many {item} did {n1} collect altogether?',
      'There are {a} {item} in one box and {b} {item} in another. How many {item} are there in total?',
      '{n1} scored {a} points in the first game and {b} points in the second game. What is {n1}\'s total score?',
      'A shop sold {a} {item} in the morning and {b} {item} in the afternoon. How many {item} were sold in all?',
    ],
    subtraction: [
      '{n1} has {a} {item}. She gives {b} {item} to {n2}. How many {item} does {n1} have left?',
      'There were {a} {item} on the shelf. {b} {item} were taken. How many {item} are left?',
      '{n1} had {a} {item}. He used {b} of them. How many {item} does {n1} still have?',
      'A class has {a} students. {b} students are absent today. How many students are present?',
      '{n1} saved {a} stickers. She gave {b} stickers to her friend. How many stickers does {n1} have now?',
    ],
    multiplication: [
      'There are {a} {cont}s with {b} {item} in each {cont}. How many {item} are there altogether?',
      '{n1} packs {b} {item} into each box. She fills {a} boxes. How many {item} does she pack?',
      'Each child gets {b} {item}. There are {a} children. How many {item} are needed?',
      'A bookshelf has {a} rows with {b} books on each row. How many books are there altogether?',
      '{n1} earns ${b} each day. How much does {n1} earn in {a} days?',
      'There are {a} tables in the hall. Each table has {b} chairs. How many chairs are there in all?',
    ],
    division: [
      '{n1} has {dvd} {item}. She puts them equally into {b} {cont}s. How many {item} are in each {cont}?',
      '{dvd} {item} are shared equally among {b} children. How many {item} does each child get?',
      'There are {dvd} chairs arranged in {b} equal rows. How many chairs are in each row?',
      '{n1} cuts a ribbon {dvd} cm long into pieces of {b} cm each. How many pieces does {n1} get?',
      '{dvd} {item} are packed into {cont}s of {b} each. How many {cont}s are needed?',
      '{n1} reads {b} pages each day. How many days does {n1} need to read {dvd} pages?',
    ],
    mixed: [
      '{n1} buys {a} {cont}s of {item}. Each {cont} has {b} {item}. She gives {c} {item} away. How many {item} does {n1} have left?',
      'There are {a} {cont}s with {b} {item} each. {n1} adds {c} more {item}. How many {item} are there now?',
      '{n1} has {a} packets of {item} with {b} in each packet. She eats {c}. How many {item} are left?',
    ],
  };

  function generateWordProblem(milestone) {
    let type;
    let numA, numB, numC;

    if (milestone <= 2) {
      type = Math.random() < 0.5 ? 'addition' : 'subtraction';
      numA = _rand(5, 18); numB = _rand(1, Math.min(numA - 1, 9)); numC = _rand(1, 5);
      if (type === 'addition') { numA = _rand(3, 12); numB = _rand(1, 8); }
    } else if (milestone <= 6) {
      const r = Math.random();
      type = r < 0.35 ? 'multiplication' : r < 0.65 ? 'division' : 'mixed';
      numA = _rand(2, 5); numB = _rand(2, 5); numC = _rand(1, 4);
    } else {
      const r = Math.random();
      type = r < 0.35 ? 'multiplication' : r < 0.65 ? 'division' : 'mixed';
      numA = _rand(6, 9); numB = _rand(6, 9); numC = _rand(1, 5);
    }

    const n1   = pickRandom(NAMES);
    const n2   = pickRandom(NAMES.filter(n => n !== n1));
    const item = pickRandom(ITEMS);
    const cont = pickRandom(CONTS);
    const dvd  = numA * numB;

    let answer, sentence;
    switch (type) {
      case 'addition':      answer = String(numA + numB); sentence = `${numA} + ${numB} = ${answer}`; break;
      case 'subtraction':   answer = String(numA - numB); sentence = `${numA} − ${numB} = ${answer}`; break;
      case 'multiplication':answer = String(numA * numB); sentence = `${numA} × ${numB} = ${answer}`; break;
      case 'division':      answer = String(numA);        sentence = `${dvd} ÷ ${numB} = ${answer}`; break;
      case 'mixed':         answer = String(numA * numB - numC); sentence = `(${numA} × ${numB}) − ${numC} = ${answer}`; break;
    }

    const template = pickRandom(WP_TEMPLATES[type]);
    const question = template
      .replace(/{n2}/g, n2).replace(/{n1}/g, n1)
      .replace(/{item}/g, item).replace(/{cont}/g, cont)
      .replace(/{dvd}/g, dvd)
      .replace(/{a}/g, numA).replace(/{b}/g, numB).replace(/{c}/g, numC);

    return {
      question, answer, sentence, type, milestone,
      hintData: {
        numbers: type === 'division' ? [dvd, numB] : type === 'mixed' ? [numA, numB, numC] : [numA, numB],
        operation: { addition: 'Add (+)', subtraction: 'Subtract (−)', multiplication: 'Multiply (×)', division: 'Divide (÷)', mixed: 'Two steps: × then −' }[type],
      },
    };
  }

  function _rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ── Analytics ──────────────────────────────────────────────
  function logAction(description, data) {
    const entry = { time: relativeTime(), description, data: data || {}, inputType: state.inputType };
    state.actionLog.push(entry);
    document.dispatchEvent(new CustomEvent('leitner:log', { detail: entry }));
    return entry;
  }

  function logQuizResult(cardId, question, studentAnswer, correct, attemptNum) {
    const card = state.cards.find(c => c.id === cardId);
    const entry = {
      time: relativeTime(), type: 'quiz',
      cardId, question, studentAnswer,
      correctAnswer: card ? card.answer : '?',
      correct, attemptNum, inputType: state.inputType,
    };
    state.actionLog.push(entry);
    document.dispatchEvent(new CustomEvent('leitner:quiz', { detail: entry }));
    return entry;
  }

  function clearLog() {
    state.actionLog = [];
    state.sessionStartTime = Date.now();
  }

  // ── localStorage ───────────────────────────────────────────
  function save() {
    try {
      localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(state.cards));
      localStorage.setItem(STORAGE_KEYS.student, JSON.stringify(state.student));
      localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(state.achievements));
      localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(state.records));
    } catch (e) { console.warn('LeitnerEngine save failed', e); }
  }

  function load() {
    try {
      const sc = localStorage.getItem(STORAGE_KEYS.cards);
      const ss = localStorage.getItem(STORAGE_KEYS.student);
      const sa = localStorage.getItem(STORAGE_KEYS.achievements);
      const sr = localStorage.getItem(STORAGE_KEYS.records);

      if (ss) state.student = JSON.parse(ss);
      if (sa) state.achievements = JSON.parse(sa);
      if (sr) state.records = JSON.parse(sr);

      const fresh = getAllBaseCards();
      if (sc) {
        const saved = JSON.parse(sc);
        state.cards = fresh.map(f => {
          const ex = saved.find(s => s.id === f.id);
          return ex ? { ...f, ...ex } : f;
        });
      } else {
        state.cards = fresh;
      }
    } catch (e) {
      console.warn('LeitnerEngine load failed', e);
      state.cards = getAllBaseCards();
    }
  }

  // ── Touch helpers ──────────────────────────────────────────
  function addTouchButton(el, handler) {
    if (!el) return;
    let ts = null;
    const dh = debounce(handler, 50);
    el.addEventListener('touchstart', e => {
      el.dataset.touchActive = 'true';
      ts = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    el.addEventListener('touchend', e => {
      el.dataset.touchActive = 'false';
      if (!ts) return;
      const dx = Math.abs(e.changedTouches[0].clientX - ts.x);
      const dy = Math.abs(e.changedTouches[0].clientY - ts.y);
      if (dx < 15 && dy < 15) dh(e);
      ts = null;
    });
    el.addEventListener('click', handler);
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    init() {
      detectInputType();
      load();
      state.sessionStartTime = Date.now();
      return this;
    },
    get student()    { return state.student; },
    get cards()      { return state.cards; },
    get actionLog()  { return state.actionLog; },
    get inputType()  { return state.inputType; },
    PACK_COLORS,
    PACK_SCHEDULE,

    setStudentName(name) { state.student.name = name; save(); },
    getTodayPacks,
    getCardsForTopic,
    getPackCounts,
    getMilestoneProgress,
    evaluateCard,
    getHintHTML,
    getMisconceptionTip,
    generateWordProblem,
    logAction,
    logQuizResult,
    clearLog,
    save,

    markAchievement(milestone) {
      if (!state.achievements[milestone]) {
        state.achievements[milestone] = new Date().toISOString().split('T')[0];
        save();
        return true;
      }
      return false;
    },
    getAchievementDate(milestone) { return state.achievements[milestone] || null; },

    updateRecord(week, day, packData) {
      if (!state.records[week]) state.records[week] = {};
      if (!state.records[week][day]) state.records[week][day] = {};
      Object.assign(state.records[week][day], packData);
      save();
    },
    getRecords() { return state.records; },

    addTouchButton,
    debounce,
    relativeTime,
    getAllTopicStats() {
      return ['addition', 'subtraction', 'multiplication', 'division'].map(t => ({
        topic: t,
        counts: getPackCounts(t),
        dueToday: getCardsForTopic(t).length,
      }));
    },
  };
})();
