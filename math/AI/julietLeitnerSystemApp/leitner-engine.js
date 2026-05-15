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
    gameProfile: 'leitner_game_profile_v1',
    mood: 'leitner_mood_log',          // SE check-in history
    goals: 'leitner_goals',            // per-topic goal dates
    factAttempts: 'leitner_fact_attempts', // teacher log: per-fact attempt counts
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
  const SESSION_CARD_LIMIT = 10;  // 10 per level so students taste success quickly

  // ── State ──────────────────────────────────────────────────
  let state = {
    student: { name: 'Student', startDate: new Date().toISOString() },
    cards: [],
    achievements: {},
    records: [],
    gameProfile: null,
    actionLog: [],
    sessionStartTime: Date.now(),
    inputType: 'mouse',
  };

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function createGameProfile(name) {
    const cleanName = (name || 'Student').trim().slice(0, 30) || 'Student';
    const id = 'local-' + cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);
    return {
      id,
      name: cleanName,
      handle: cleanName.replace(/\s+/g, ''),
      avatar: 'rookie',
      xp: 0,
      league: 'Bronze',
      streak: 0,
      bestStreak: 0,
      lastActiveDate: null,
      dailyGoal: 20,
      today: { date: todayKey(), cards: 0, correct: 0, xp: 0 },
      badges: [],
      createdAt: new Date().toISOString(),
    };
  }

  function cloudUserKey(user) {
    if (!user) return null;
    return user.id ? 'cloud-' + user.id : (user.username ? 'cloud-username-' + user.username : null);
  }

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

  function getPracticeSessionCards(topic, limit = SESSION_CARD_LIMIT) {
    const due = getCardsForTopic(topic);
    const priority = { A: 0, B: 1, C: 2 };
    return [...due]
      .sort((a, b) => {
        const packGap = (priority[a.pack] || 0) - (priority[b.pack] || 0);
        if (packGap) return packGap;
        const aReviewed = a.lastReviewed ? Date.parse(a.lastReviewed) : 0;
        const bReviewed = b.lastReviewed ? Date.parse(b.lastReviewed) : 0;
        return aReviewed - bReviewed;
      })
      .slice(0, limit);
  }

  function sessionKey(topic) {
    return 'leitner_practice_session_' + topic + '_v1';
  }

  function savePracticeSession(topic, data) {
    if (!topic || !data || !Array.isArray(data.cards)) return false;
    const payload = {
      date: todayKey(),
      topic,
      cardIds: data.cards.map(card => card && card.id).filter(Boolean),
      idx: Math.max(0, Number(data.idx || 0)),
      correct: Math.max(0, Number(data.correct || 0)),
      retryCounts: data.retryCounts || {},
      extra: data.extra || {},
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(sessionKey(topic), JSON.stringify(payload));
      return true;
    } catch (e) {
      console.warn('Practice session save failed', e);
      return false;
    }
  }

  function loadPracticeSession(topic) {
    try {
      const raw = localStorage.getItem(sessionKey(topic));
      if (!raw) return null;
      const saved = JSON.parse(raw);
      if (!saved || saved.date !== todayKey() || !Array.isArray(saved.cardIds)) {
        clearPracticeSession(topic);
        return null;
      }
      const byId = new Map(state.cards.map(card => [card.id, card]));
      const cards = saved.cardIds.map(id => byId.get(id)).filter(Boolean);
      if (!cards.length || Number(saved.idx || 0) >= cards.length) {
        clearPracticeSession(topic);
        return null;
      }
      return {
        cards,
        idx: Math.max(0, Number(saved.idx || 0)),
        correct: Math.max(0, Number(saved.correct || 0)),
        retryCounts: saved.retryCounts || {},
        extra: saved.extra || {},
      };
    } catch (e) {
      console.warn('Practice session load failed', e);
      clearPracticeSession(topic);
      return null;
    }
  }

  function clearPracticeSession(topic) {
    try {
      localStorage.removeItem(sessionKey(topic));
    } catch (e) {
      console.warn('Practice session clear failed', e);
    }
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

    awardGameProgress(correct, card.topic);
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
    if (card.hintLevel === 3 && b > 20) return _subtractionBarModel(a, b);
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
    if (range > 24) {
      return op === '-' ? _subtractionBarModel(a, b) : _additionBreakApart(a, b);
    }
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

  function _additionBreakApart(a, b) {
    const onesA = a % 10;
    const makeTen = onesA === 0 ? 0 : 10 - onesA;
    if (makeTen > 0 && makeTen < b) {
      return `<div class="hint-text">ðŸ’¡ Break apart <strong>${b}</strong>: add <strong>${makeTen}</strong> first to make <strong>${a + makeTen}</strong>, then add <strong>${b - makeTen}</strong> more.</div>`;
    }
    return `<div class="hint-text">ðŸ’¡ Add by place value: tens with tens, ones with ones, then combine.</div>`;
  }

  function _subtractionBarModel(a, b) {
    const result = a - b;
    const pct = Math.max(12, Math.min(88, Math.round((b / a) * 100)));
    return `<div class="bar-model-hint" role="img" aria-label="Bar model for subtraction">
      <div class="hint-text">ðŸ’¡ Bar model: start with <strong>${a}</strong>, take away <strong>${b}</strong>, find what is left.</div>
      <div class="bar-model">
        <span class="bar-away" style="width:${pct}%">take away ${b}</span>
        <span class="bar-left">left ${result}</span>
      </div>
      <div class="hint-text"><strong>${a}</strong> âˆ’ <strong>${b}</strong> = <strong>?</strong></div>
    </div>`;
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

  // ── Text to speech ─────────────────────────────────────────
  function numberToWords(n) {
    n = Number(n);
    if (!Number.isFinite(n)) return '';
    if (n < 0) return 'minus ' + numberToWords(Math.abs(n));
    const ones = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numberToWords(n % 100) : '');
    return String(n);
  }

  function operationWord(op) {
    if (op === '+') return 'plus';
    if (op === '-' || op === '−') return 'minus';
    if (op === '×' || op.toLowerCase() === 'x') return 'times';
    if (op === '÷') return 'divided by';
    return op;
  }

  function cardSpeechText(card, includeAnswer) {
    if (!card) return '';
    const normalized = String(card.question || '')
      .replace(/âˆ’/g, '−')
      .replace(/Ã—/g, '×')
      .replace(/Ã·/g, '÷');
    const m = normalized.match(/(\d+)\s*([+\-−×x÷])\s*(\d+)/i);
    if (!m) return normalized.replace('?', includeAnswer ? String(card.answer || '') : 'what');
    const left = numberToWords(m[1]);
    const op = operationWord(m[2]);
    const right = numberToWords(m[3]);
    const end = includeAnswer ? numberToWords(card.answer) : 'what';
    return `${left} ${op} ${right} equals ${end}`;
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      logAction('Audio is not available in this browser');
      return false;
    }
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return false;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-SG';
    utterance.rate = 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  function speakCard(card, includeAnswer = false) {
    const text = cardSpeechText(card, includeAnswer);
    const ok = speak(text);
    if (ok) logAction('Audio played: ' + text);
    return ok;
  }

  function speakProblem(problem, includeAnswer = false) {
    if (!problem) return false;
    const text = includeAnswer
      ? `${problem.question} The answer is ${numberToWords(problem.answer)}. ${problem.sentence || ''}`
      : problem.question;
    const ok = speak(text);
    if (ok) logAction('Audio played: word problem');
    return ok;
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
      localStorage.setItem(STORAGE_KEYS.gameProfile, JSON.stringify(state.gameProfile));
    } catch (e) { console.warn('LeitnerEngine save failed', e); }
  }

  function load() {
    try {
      const sc = localStorage.getItem(STORAGE_KEYS.cards);
      const ss = localStorage.getItem(STORAGE_KEYS.student);
      const sa = localStorage.getItem(STORAGE_KEYS.achievements);
      const sr = localStorage.getItem(STORAGE_KEYS.records);
      const sg = localStorage.getItem(STORAGE_KEYS.gameProfile);

      if (ss) state.student = JSON.parse(ss);
      if (sa) state.achievements = JSON.parse(sa);
      if (sr) state.records = JSON.parse(sr);
      state.gameProfile = sg ? JSON.parse(sg) : createGameProfile(state.student.name);
      if (!state.gameProfile.today || state.gameProfile.today.date !== todayKey()) {
        state.gameProfile.today = { date: todayKey(), cards: 0, correct: 0, xp: 0 };
      }

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
      state.gameProfile = createGameProfile(state.student.name);
    }
  }

  function getLeagueForXp(xp) {
    if (xp >= 5000) return 'Legend';
    if (xp >= 3000) return 'Diamond';
    if (xp >= 1800) return 'Platinum';
    if (xp >= 900) return 'Gold';
    if (xp >= 300) return 'Silver';
    return 'Bronze';
  }

  function ensureTodayProfile() {
    if (!state.gameProfile) state.gameProfile = createGameProfile(state.student.name);
    if (!state.gameProfile.today || state.gameProfile.today.date !== todayKey()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);
      state.gameProfile.streak = state.gameProfile.lastActiveDate === yKey ? state.gameProfile.streak : 0;
      state.gameProfile.today = { date: todayKey(), cards: 0, correct: 0, xp: 0 };
    }
    return state.gameProfile;
  }

  function awardGameProgress(correct, source) {
    const profile = ensureTodayProfile();
    const wasInactiveToday = profile.lastActiveDate !== todayKey();
    const xp = correct ? 12 : 3;
    profile.xp += xp;
    profile.today.cards += 1;
    profile.today.xp += xp;
    if (correct) profile.today.correct += 1;
    if (wasInactiveToday) profile.streak += 1;
    profile.lastActiveDate = todayKey();
    profile.bestStreak = Math.max(profile.bestStreak || 0, profile.streak || 0);
    profile.league = getLeagueForXp(profile.xp);

    if ((profile.today.cards || 0) >= profile.dailyGoal && !profile.badges.includes('daily-goal')) {
      profile.badges.push('daily-goal');
    }
    if ((profile.streak || 0) >= 7 && !profile.badges.includes('week-streak')) {
      profile.badges.push('week-streak');
    }
    if ((profile.xp || 0) >= 1000 && !profile.badges.includes('xp-1000')) {
      profile.badges.push('xp-1000');
    }

    logAction((correct ? 'XP earned' : 'Practice XP earned') + ': +' + xp, { source: source || 'practice', xp });
    save();
    if (window.LeitnerCloud && typeof window.LeitnerCloud.queueSave === 'function') {
      window.LeitnerCloud.queueSave(LeitnerEngine);
    }
    return { xp, profile };
  }

  function getAllTopicStats() {
    return ['addition', 'subtraction', 'multiplication', 'division'].map(t => ({
      topic: t,
      counts: getPackCounts(t),
      dueToday: getCardsForTopic(t).length,
    }));
  }

  function getGameSummary() {
    const profile = ensureTodayProfile();
    const all = state.cards || [];
    const mastered = all.filter(c => c.pack === 'C').length;
    const due = getAllTopicStats().reduce((sum, s) => sum + s.dueToday, 0);
    const accuracy = profile.today.cards ? Math.round((profile.today.correct / profile.today.cards) * 100) : 0;
    const nextLeagueXp = profile.league === 'Bronze' ? 300 : profile.league === 'Silver' ? 900 : profile.league === 'Gold' ? 1800 : profile.league === 'Platinum' ? 3000 : profile.league === 'Diamond' ? 5000 : profile.xp;
    return {
      profile,
      due,
      mastered,
      total: all.length,
      accuracy,
      dailyGoalPct: Math.min(100, Math.round((profile.today.cards / profile.dailyGoal) * 100)),
      masteryPct: all.length ? Math.round((mastered / all.length) * 100) : 0,
      nextLeagueXp,
    };
  }

  function exportCloudState() {
    const profile = ensureTodayProfile();
    return {
      student: state.student,
      profile,
      cards: state.cards,
      achievements: state.achievements,
      records: state.records,
      exportedAt: new Date().toISOString(),
    };
  }

  function importCloudState(cloud) {
    const options = arguments[1] || {};
    const cloudUser = options.cloudUser || null;
    const incomingCloudKey = cloudUserKey(cloudUser);
    if (!cloud || typeof cloud !== 'object') return false;
    const localProfile = ensureTodayProfile();
    if (cloud.profile) {
      const cloudProfile = cloud.profile;
      const sameCloudUser = incomingCloudKey && localProfile.cloudUserKey === incomingCloudKey;
      const localToday = localProfile.today || { date: todayKey(), cards: 0, correct: 0, xp: 0 };
      const cloudToday = cloudProfile.today || {};
      const sameToday = localToday.date === todayKey() && cloudToday.date === todayKey();
      const mergedToday = sameCloudUser && sameToday ? {
        date: todayKey(),
        cards: Math.max(Number(localToday.cards || 0), Number(cloudToday.cards || 0)),
        correct: Math.max(Number(localToday.correct || 0), Number(cloudToday.correct || 0)),
        xp: Math.max(Number(localToday.xp || 0), Number(cloudToday.xp || 0)),
      } : (cloudToday.date === todayKey() ? cloudToday : localToday);
      state.gameProfile = {
        ...(sameCloudUser ? localProfile : createGameProfile(state.student.name)),
        ...cloudProfile,
        xp: sameCloudUser ? Math.max(Number(localProfile.xp || 0), Number(cloudProfile.xp || 0)) : Number(cloudProfile.xp || 0),
        streak: sameCloudUser ? Math.max(Number(localProfile.streak || 0), Number(cloudProfile.streak || 0)) : Number(cloudProfile.streak || 0),
        bestStreak: sameCloudUser ? Math.max(Number(localProfile.bestStreak || 0), Number(cloudProfile.bestStreak || 0)) : Number(cloudProfile.bestStreak || 0),
        today: mergedToday,
        badges: sameCloudUser ? Array.from(new Set([...(localProfile.badges || []), ...(cloudProfile.badges || [])])) : (cloudProfile.badges || []),
        cloudUserKey: incomingCloudKey || localProfile.cloudUserKey || null,
        name: state.student.name,
        handle: state.student.name.replace(/\s+/g, ''),
      };
    }
    if (cloud.cards && Array.isArray(cloud.cards)) {
      const byId = new Map(cloud.cards.map(card => [card.id, card]));
      state.cards = state.cards.map(card => byId.has(card.id) ? { ...card, ...byId.get(card.id) } : card);
    }
    if (cloud.achievements && typeof cloud.achievements === 'object') {
      state.achievements = cloud.achievements;
    }
    if (cloud.records) {
      state.records = cloud.records;
    }
    save();
    return true;
  }

  // ── Touch helpers ──────────────────────────────────────────
  function addTouchButton(el, handler) {
    if (!el) return;
    let ts = null;
    let lastTouchHandled = 0;
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
      if (dx < 15 && dy < 15) {
        lastTouchHandled = Date.now();
        dh(e);
      }
      ts = null;
    });
    el.addEventListener('click', e => {
      if (Date.now() - lastTouchHandled < 650) return;
      handler(e);
    });
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
    get gameProfile(){ return ensureTodayProfile(); },
    PACK_COLORS,
    PACK_SCHEDULE,
    SESSION_CARD_LIMIT,
    cardBank: getAllBaseCards(),

    setStudentName(name) {
      state.student.name = name;
      ensureTodayProfile().name = name;
      save();
    },
    loginLocalProfile(name) {
      state.student.name = (name || 'Student').trim() || 'Student';
      state.gameProfile = createGameProfile(state.student.name);
      save();
      return state.gameProfile;
    },
    getGameSummary,
    awardGameProgress,
    exportCloudState,
    importCloudState,
    getTodayPacks,
    getCardsForTopic,
    getPracticeSessionCards,
    savePracticeSession,
    loadPracticeSession,
    clearPracticeSession,
    getPackCounts,
    getMilestoneProgress,
    evaluateCard,
    getHintHTML,
    getMisconceptionTip,
    generateWordProblem,
    speak,
    speakCard,
    speakProblem,
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
    getAllTopicStats,

    // ── Mood / SE check-in ─────────────────────────────────────
    saveMoodCheckin(mood, note) {
      const log = JSON.parse(localStorage.getItem(STORAGE_KEYS.mood) || '[]');
      log.push({ date: todayKey(), mood, note: note || '', ts: Date.now() });
      if (log.length > 90) log.splice(0, log.length - 90); // keep 90 days
      localStorage.setItem(STORAGE_KEYS.mood, JSON.stringify(log));
    },
    getTodayMood() {
      const log = JSON.parse(localStorage.getItem(STORAGE_KEYS.mood) || '[]');
      const today = todayKey();
      const entry = log.filter(e => e.date === today).pop();
      return entry ? entry.mood : null;
    },
    getMoodLog() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.mood) || '[]');
    },

    // ── Goal setting ───────────────────────────────────────────
    setGoal(topic, targetDate) {
      const goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.goals) || '{}');
      goals[topic] = { targetDate, setOn: todayKey() };
      localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(goals));
    },
    getGoal(topic) {
      const goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.goals) || '{}');
      return goals[topic] || null;
    },
    getAllGoals() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.goals) || '{}');
    },

    // ── Fact-attempt teacher log ───────────────────────────────
    recordFactAttempt(cardId, correct) {
      const log = JSON.parse(localStorage.getItem(STORAGE_KEYS.factAttempts) || '{}');
      if (!log[cardId]) log[cardId] = { total: 0, correct: 0, sessions: [] };
      log[cardId].total++;
      if (correct) log[cardId].correct++;
      const today = todayKey();
      const lastSession = log[cardId].sessions[log[cardId].sessions.length - 1];
      if (!lastSession || lastSession.date !== today) {
        log[cardId].sessions.push({ date: today, count: 1, correct: correct ? 1 : 0 });
      } else {
        lastSession.count++;
        if (correct) lastSession.correct++;
      }
      localStorage.setItem(STORAGE_KEYS.factAttempts, JSON.stringify(log));
    },
    getFactAttempts() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.factAttempts) || '{}');
    },
  };
})();
