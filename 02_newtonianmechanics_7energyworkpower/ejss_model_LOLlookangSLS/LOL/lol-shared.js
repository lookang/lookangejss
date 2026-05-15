// ================================================================
// LOL Energy Diagram – Enhanced Shared Logic  v2.0
// Loaded AFTER scenario scriptN.js; overrides shared functions.
// ================================================================

// ── Per-type fill colours ────────────────────────────────────────
var ENERGY_COLOR = {
  C: '#FF8C00',   // Chemical      – orange
  E: '#90EE90',   // Elastic       – light green
  G: '#6495ED',   // Gravitational – cornflower blue
  I: '#FF6B6B',   // Internal      – coral red
  K: '#FFD700',   // Kinetic       – gold
  N: '#9370DB'    // Nuclear       – medium purple
};

// ── Column descriptors – LEFT side ──────────────────────────────
var COL_L = {
  C: { ulClass:'CLC', qs:'.unit-CLR', ac:'activeC',  pre:'yellowCL', dropId:'selCL' },
  E: { ulClass:'CLE', qs:'.unit-CLY', ac:'activeE',  pre:'yellowEL', dropId:'selEL' },
  G: { ulClass:'CLG', qs:'.unit-CLG', ac:'activeG',  pre:'yellowGL', dropId:'selGL' },
  I: { ulClass:'CLI', qs:'.unit-CLB', ac:'activeI',  pre:'yellowIL', dropId:'selIL' },
  K: { ulClass:'CLK', qs:'.unit-CLO', ac:'activeK',  pre:'yellowKL', dropId:'selKL' },
  N: { ulClass:'CLN', qs:'.unit-CLP', ac:'activeN',  pre:'yellowNL', dropId:'selNL' }
};

// ── Column descriptors – RIGHT side ─────────────────────────────
var COL_R = {
  C: { ulClass:'CRC', qs:'.unit-CRR', ac:'activeRC', pre:'yellowCR', dropId:'selCR' },
  E: { ulClass:'CRE', qs:'.unit-CRY', ac:'activeRE', pre:'yellowER', dropId:'selER' },
  G: { ulClass:'CRG', qs:'.unit-CRG', ac:'activeRG', pre:'yellowGR', dropId:'selGR' },
  I: { ulClass:'CRI', qs:'.unit-CRB', ac:'activeRI', pre:'yellowIR', dropId:'selIR' },
  K: { ulClass:'CRK', qs:'.unit-CRO', ac:'activeRK', pre:'yellowKR', dropId:'selKR' },
  N: { ulClass:'CRN', qs:'.unit-CRP', ac:'activeRN', pre:'yellowNR', dropId:'selNR' }
};

// Globals (harmless re-declaration; values set before lol-shared runs)
var countCL=0, countEL=0, countGL=0, countIL=0, countKL=0, countNL=0, totalL=0;
var countCR=0, countER=0, countGR=0, countIR=0, countKR=0, countNR=0, totalR=0;
var selectedOptionL='', selectedOptionL2='', selectedOptionR1='', selectedOptionR2='';
var amtL=0, amtR=0;

// ── Rule-based pedagogical tutor ─────────────────────────────────
// Each key is a scenario number; value is a function that reads
// current DOM/global state and returns {t:'info'|'warn'|'ok', m:'...'}.
var TUTOR_RULES = {

  // Scenario 1 – Moving Toy Car (index.html)
  1: function() {
    var tinAmt   = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt  = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt  = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt = parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;

    // Forbidden initial energy types
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — a moving toy car only has Kinetic energy.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — a moving toy car only has Kinetic energy.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — a moving toy car only has Kinetic energy.'};
    if (countIL > 0) return {t:'warn', m:'Remove Internal energy from the initial state — a moving toy car only has Kinetic energy.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — a moving toy car only has Kinetic energy.'};
    // Required initial energy type
    if (countKL < 1) return {t:'info', m:'Add Kinetic energy to the initial (left) bar — the toy car is already moving before it speeds up.'};

    // Forbidden final energy types
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state — the speeding car only has Kinetic energy.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state — the speeding car only has Kinetic energy.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state — the speeding car only has Kinetic energy.'};
    if (countIR > 0) return {t:'warn', m:'Remove Internal energy from the final state — the speeding car only has Kinetic energy.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state — the speeding car only has Kinetic energy.'};
    // Required final energy type
    if (countKR < 1) return {t:'info', m:'Add Kinetic energy to the final (right) bar — the toy car is speeding up.'};
    // Final K must exceed initial K
    if (countKR <= countKL) return {t:'info', m:'Make the final Kinetic bar taller than the initial — the car is speeding up, so it gains kinetic energy.'};

    // Transfer OUT must be zero
    if (totalTout > 0)       return {t:'warn', m:'No energy leaves this system — set both Transfer Out amounts to zero.'};
    if (selectedOptionR1 !== '') return {t:'warn', m:'No energy leaves this system — remove the first Transfer Out energy type.'};
    if (selectedOptionR2 !== '') return {t:'warn', m:'No energy leaves this system — remove the second Transfer Out energy type.'};

    // Transfer IN type
    if (selectedOptionL === '') return {t:'info', m:'Select "Mechanically" as the Transfer In energy type — the motor pushes the car mechanically.'};
    if (selectedOptionL !== 'Mechanic') return {t:'warn', m:'Change the Transfer In type to "Mechanically" — the motor does mechanical work on the car.'};
    // Transfer IN amount
    if (totalTin < 1) return {t:'info', m:'Set the Transfer In amount (the number dropdown next to "Mechanically") to a positive value.'};

    // Conservation
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};

    return {t:'ok', m:'Well done! You have correctly modelled the toy car. The car gains Kinetic energy from mechanical work done by the motor.'};
  },

  // Scenario 10 – Releasing An Arrow (index2.html … index12.html)
  10: function() {
    var tinAmt   = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt  = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt  = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt = parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;

    // No Kinetic initially (arrow is at rest)
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the arrow starts at rest before it is released.'};
    // Forbidden initial types
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — only Elastic or Internal energy is stored in the drawn bow.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — ignore height changes for this scenario.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — only Elastic or Internal energy is stored in the drawn bow.'};
    // Required initial types
    if (countEL < 1 && countIL < 1) return {t:'info', m:'Add Elastic energy (the drawn bow) or Internal energy to the initial (left) bar.'};

    // No Transfer IN
    if (totalTin > 0)        return {t:'warn', m:'No energy flows into this system — set the Transfer In amounts to zero.'};
    if (selectedOptionL  !== '') return {t:'warn', m:'No energy flows into this system — remove the Transfer In energy type.'};
    if (selectedOptionL2 !== '') return {t:'warn', m:'No energy flows into this system — remove the second Transfer In energy type.'};

    // No Elastic in final (bow fully released)
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state — the bow has released, so all elastic energy has converted.'};
    // Forbidden final types
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state — ignore height changes for this scenario.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    // Required: Kinetic in final
    if (countKR < 1) return {t:'info', m:'Add Kinetic energy to the final (right) bar — the released arrow is moving.'};
    // Internal must not decrease (some energy becomes heat)
    if (countIR < countIL) return {t:'info', m:'Final Internal energy should be at least as large as the initial — some energy becomes heat when the arrow is released.'};

    // Transfer OUT: need both Mechanic and POWave
    var hasMechanic = (selectedOptionR1 === 'Mechanic' || selectedOptionR2 === 'Mechanic');
    var hasPOWave   = (selectedOptionR1 === 'POWave'   || selectedOptionR2 === 'POWave');
    if (!hasMechanic && !hasPOWave)
      return {t:'info', m:'Select the Transfer Out energy types — the flying arrow carries energy away both mechanically and as a sound wave.'};
    if (!hasMechanic) return {t:'info', m:'Select "Mechanically" as one Transfer Out type — the flying arrow carries kinetic energy away.'};
    if (!hasPOWave)   return {t:'info', m:'Select "Propagation of Waves" as the second Transfer Out type — releasing the arrow produces a sound wave.'};
    // Transfer OUT amount
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value using the number dropdowns.'};

    // Conservation
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};

    return {t:'ok', m:'Excellent! You have correctly modelled the arrow release. Stored bow energy becomes Kinetic energy, with some leaving as mechanical work and sound.'};
  },

  // ── Scenario 2: Charging A Power Bank ───────────────────────────
  2: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — a power bank stores Chemical and Internal energy only.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — a power bank stores Chemical and Internal energy only.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — a power bank stores Chemical and Internal energy only.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — a power bank stores Chemical and Internal energy only.'};
    if (countCL < 1) return {t:'info', m:'Add Chemical energy to the initial (left) bar — the power bank starts at 50% charge.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state — a power bank stores Chemical and Internal energy only.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state — a power bank stores Chemical and Internal energy only.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — a power bank stores Chemical and Internal energy only.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state — a power bank stores Chemical and Internal energy only.'};
    if (countCR < 1) return {t:'info', m:'Add Chemical energy to the final (right) bar — the fully charged bank has more chemical energy stored.'};
    if (countCR !== countCL * 2) return {t:'info', m:'The final Chemical bar should be exactly twice the initial — charging from 50% to 100% doubles the stored energy.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — the power bank became warm while charging.'};
    if (totalTout > 0) return {t:'warn', m:'No energy leaves this system — set both Transfer Out amounts to zero.'};
    if (selectedOptionR1 !== '' || selectedOptionR2 !== '') return {t:'warn', m:'No energy leaves this system — remove the Transfer Out energy type(s).'};
    if (selectedOptionL === '' && selectedOptionL2 === '') return {t:'info', m:'Select "Electrically" as the Transfer In type — energy enters from the electrical mains.'};
    var hasElec = (selectedOptionL === 'Electric' || selectedOptionL2 === 'Electric');
    if (!hasElec) return {t:'warn', m:'Change the Transfer In type to "Electrically" — the mains supply transfers energy electrically.'};
    if (totalTin < 1) return {t:'info', m:'Set the Transfer In amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Well done! Chemical energy in the power bank doubles as electrical energy from the mains charges it, and some becomes Internal energy as it warms up.'};
  },

  // ── Scenario 3: Lighting Up A Lamp ──────────────────────────────
  3: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — the circuit stores Chemical energy in the battery only.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — the circuit stores Chemical energy in the battery only.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the circuit stores Chemical energy in the battery only.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — the circuit stores Chemical energy in the battery only.'};
    if (countCL < 1) return {t:'info', m:'Add Chemical energy to the initial (left) bar — the battery stores chemical energy before the circuit is switched on.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countCR >= countCL) return {t:'info', m:'The final Chemical bar should be smaller than the initial — the battery drains as it powers the lamp.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — the lamp and wires get warmer over time.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasPOWave = (selectedOptionR1 === 'POWave' || selectedOptionR2 === 'POWave');
    if (!hasPOWave) return {t:'info', m:'Select "Propagation of Waves" as a Transfer Out type — the lamp emits light (and infrared radiation).'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Chemical energy in the battery converts to Internal energy (heat) and leaves as light waves — Propagation of Waves.'};
  },

  // ── Scenario 4: Sitting On A Swing ──────────────────────────────
  4: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — the system is the girl on the swing; only Gravitational energy is relevant.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — only Gravitational energy is relevant here.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the girl is sitting still before the push.'};
    if (countIL > 0) return {t:'warn', m:'Remove Internal energy from the initial state — only Gravitational energy applies here.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — only Gravitational energy applies here.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state — only Gravitational energy is relevant.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state — only Gravitational energy is relevant.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — the girl is at the highest point of her swing (momentarily at rest).'};
    if (countIR > 0) return {t:'warn', m:'Remove Internal energy from the final state — only Gravitational energy is relevant.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state — only Gravitational energy is relevant.'};
    if (countGR <= countGL) return {t:'info', m:'Make the final Gravitational bar taller than the initial — the girl swings higher after the push.'};
    if (totalTout > 0) return {t:'warn', m:'No energy leaves this system — set both Transfer Out amounts to zero.'};
    if (selectedOptionR1 !== '' || selectedOptionR2 !== '') return {t:'warn', m:'No energy leaves this system — remove the Transfer Out energy type(s).'};
    if (selectedOptionL === '' && selectedOptionL2 === '') return {t:'info', m:'Select "Mechanically" as the Transfer In type — the mother does mechanical work by pushing the swing.'};
    var hasMech = (selectedOptionL === 'Mechanic' || selectedOptionL2 === 'Mechanic');
    if (!hasMech) return {t:'warn', m:'Change the Transfer In type to "Mechanically" — the mother pushes the swing, doing mechanical work.'};
    if (totalTin < 1) return {t:'info', m:'Set the Transfer In amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! The mother\'s push transfers energy mechanically into the system, increasing the Gravitational energy of the girl on the swing.'};
  },

  // ── Scenario 5: Cooling A Hot Cup Of Tea ────────────────────────
  5: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — a hot cup of tea only has Internal energy.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — a hot cup of tea only has Internal energy.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — a hot cup of tea only has Internal energy.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — a hot cup of tea only has Internal energy.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — a hot cup of tea only has Internal energy.'};
    if (countIL < 1) return {t:'info', m:'Add Internal energy to the initial (left) bar — the hot tea has thermal energy stored in it.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state — the cooled tea still only has Internal energy.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countIR < 1) return {t:'info', m:'Add Internal energy to the final (right) bar — the tea is cooler but still has some thermal energy.'};
    if (countIR >= countIL) return {t:'info', m:'Make the final Internal bar smaller than the initial — the tea has cooled down, losing thermal energy.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasHeat = (selectedOptionR1 === 'Heat' || selectedOptionR2 === 'Heat');
    if (!hasHeat) return {t:'info', m:'Select "Heating" as a Transfer Out type — the tea loses energy by heating the surrounding air.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Internal energy in the hot tea transfers out by Heating (and possibly as infrared radiation), leaving the tea cooler.'};
  },

  // ── Scenario 6: A Falling Stone ─────────────────────────────────
  6: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — the falling stone only has Gravitational and Internal energy.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — the falling stone only has Gravitational and Internal energy.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the stone starts from rest.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — the falling stone only has Gravitational and Internal energy.'};
    if (countGL < 1) return {t:'info', m:'Add Gravitational energy to the initial (left) bar — the stone is held at a height before being released.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countKR < 1) return {t:'info', m:'Add Kinetic energy to the final (right) bar — the stone is moving as it falls.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — friction with air generates heat as the stone falls.'};
    if (countGR === 0 || countGL !== countGR * 2) return {t:'info', m:'The initial Gravitational bar should be exactly twice the final — the stone has fallen halfway.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasMech = (selectedOptionR1 === 'Mechanic' || selectedOptionR2 === 'Mechanic');
    if (!hasMech) return {t:'info', m:'Select "Mechanically" as the Transfer Out type — the stone does work against air resistance as it falls.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Gravitational energy converts to Kinetic and Internal energy as the stone falls, with some lost as mechanical work against air resistance.'};
  },

  // ── Scenario 7: Lighting Up A Lamp (battery) ────────────────────
  7: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — the system is just the lamp; only Internal energy applies.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — only Internal energy applies to the lamp.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — only Internal energy applies to the lamp.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — only Internal energy applies to the lamp.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state — only Internal energy applies to the lamp.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal bar larger than the initial — the lamp gets hotter as it is powered by the battery.'};
    if (selectedOptionL === '' && selectedOptionL2 === '') return {t:'info', m:'Select "Electrically" as the Transfer In type — the battery transfers energy to the lamp by electric current.'};
    var hasElec = (selectedOptionL === 'Electric' || selectedOptionL2 === 'Electric');
    if (!hasElec) return {t:'warn', m:'Change the Transfer In type to "Electrically" — the battery drives an electric current through the lamp.'};
    if (totalTin < 1) return {t:'info', m:'Set the Transfer In amount to a positive value.'};
    var hasPOWave = (selectedOptionR1 === 'POWave' || selectedOptionR2 === 'POWave');
    if (!hasPOWave) return {t:'info', m:'Select "Propagation of Waves" as a Transfer Out type — the lamp emits light (and infrared radiation).'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Electrical energy from the battery flows into the lamp, increasing its Internal energy and radiating light out as Propagation of Waves.'};
  },

  // ── Scenario 8: Radioactive Decay ───────────────────────────────
  8: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — a radioactive source only stores Nuclear energy.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — a radioactive source only stores Nuclear energy.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — a radioactive source only stores Nuclear energy.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — a radioactive source only stores Nuclear energy.'};
    if (countIL > 0) return {t:'warn', m:'Remove Internal energy from the initial state — a radioactive source only stores Nuclear energy.'};
    if (countNL < 1) return {t:'info', m:'Add Nuclear energy to the initial (left) bar — the radioactive nucleus stores nuclear energy before decay.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — the emitted particles\' kinetic energy leaves the system.'};
    if (countIR > 0) return {t:'warn', m:'Remove Internal energy from the final state — the thermal effect is outside the system for this scenario.'};
    if (countNR >= countNL) return {t:'info', m:'Make the final Nuclear bar smaller than the initial — the nucleus loses nuclear energy during decay.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasPOWave = (selectedOptionR1 === 'POWave' || selectedOptionR2 === 'POWave');
    if (!hasPOWave) return {t:'info', m:'Select "Propagation of Waves" as the Transfer Out type — nuclear decay emits gamma radiation (a wave).'};
    if (selectedOptionR1 !== '' && selectedOptionR1 !== 'POWave') return {t:'warn', m:'Only "Propagation of Waves" should be selected for Transfer Out — gamma radiation is the only emission here.'};
    if (selectedOptionR2 !== '' && selectedOptionR2 !== 'POWave') return {t:'warn', m:'Only "Propagation of Waves" should be selected for Transfer Out — remove the second transfer type.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Nuclear energy is released during radioactive decay and leaves the system as gamma radiation — Propagation of Waves.'};
  },

  // ── Scenario 9: Bungee Jumping ───────────────────────────────────
  9: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — the bungee jumper only has Gravitational and Internal energy at the top.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — the bungee cord is not yet stretched at the top.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the jumper starts from rest at the top.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state.'};
    if (countGL < 1) return {t:'info', m:'Add Gravitational energy to the initial (left) bar — the jumper is at height before leaping.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — the jumper is momentarily at rest at the lowest point.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countER < 1) return {t:'info', m:'Add Elastic energy to the final (right) bar — the bungee cord is fully stretched at the lowest point.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — friction and cord flexing generate heat.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasMech = (selectedOptionR1 === 'Mechanic' || selectedOptionR2 === 'Mechanic');
    if (!hasMech) return {t:'info', m:'Select "Mechanically" as the Transfer Out type — the jumper does work against air resistance.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Gravitational energy converts to Elastic energy in the stretched cord and Internal energy, with some leaving as mechanical work against air resistance.'};
  },

  // ── Scenario 11: Hammering A Nail ───────────────────────────────
  11: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countCL > 0) return {t:'warn', m:'Remove Chemical energy from the initial state — the hammer only has Gravitational and Internal energy when raised.'};
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — the hammer only has Gravitational and Internal energy when raised.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the hammer is held still before being swung.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state.'};
    if (countGL < 1) return {t:'info', m:'Add Gravitational energy to the initial (left) bar — the hammer is raised above the nail.'};
    if (countCR > 0) return {t:'warn', m:'Remove Chemical energy from the final state.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — the hammer has stopped after striking.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countGR > 0) return {t:'warn', m:'Remove Gravitational energy from the final state — all gravitational energy has been converted after the hammer strikes.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — the nail and hammer get warm from the impact.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasPOWave = (selectedOptionR1 === 'POWave' || selectedOptionR2 === 'POWave');
    if (!hasPOWave) return {t:'info', m:'Select "Propagation of Waves" as the Transfer Out type — hammering produces a loud sound wave.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Gravitational energy of the raised hammer converts to Internal energy on impact, and sound energy leaves as Propagation of Waves.'};
  },

  // ── Scenario 12: Raising A Load ─────────────────────────────────
  12: function() {
    var tinAmt  = parseInt((document.getElementById('energyamt-L1')||{value:'0'}).value||'0')||0;
    var tin2Amt = parseInt((document.getElementById('energyamt-L2')||{value:'0'}).value||'0')||0;
    var toutAmt = parseInt((document.getElementById('energyamt-R1')||{value:'0'}).value||'0')||0;
    var tout2Amt= parseInt((document.getElementById('energyamt-R2')||{value:'0'}).value||'0')||0;
    var totalTin  = tinAmt + tin2Amt;
    var totalTout = toutAmt + tout2Amt;
    if (countEL > 0) return {t:'warn', m:'Remove Elastic energy from the initial state — the crane system stores Chemical and Internal energy only.'};
    if (countKL > 0) return {t:'warn', m:'Remove Kinetic energy from the initial state — the system is at rest before the load is raised.'};
    if (countNL > 0) return {t:'warn', m:'Remove Nuclear energy from the initial state.'};
    if (countGL > 0) return {t:'warn', m:'Remove Gravitational energy from the initial state — the load starts at ground level, so initial gravitational energy is zero.'};
    if (countCL < 1) return {t:'info', m:'Add Chemical energy to the initial (left) bar — the crane\'s fuel stores chemical energy before operation.'};
    if (countER > 0) return {t:'warn', m:'Remove Elastic energy from the final state.'};
    if (countKR > 0) return {t:'warn', m:'Remove Kinetic energy from the final state — the load is stationary once raised.'};
    if (countNR > 0) return {t:'warn', m:'Remove Nuclear energy from the final state.'};
    if (countCR >= countCL) return {t:'info', m:'Make the final Chemical bar smaller than the initial — the fuel is consumed during the lifting operation.'};
    if (countGR < 1) return {t:'info', m:'Add Gravitational energy to the final (right) bar — the raised load has gained gravitational potential energy.'};
    if (countIR <= countIL) return {t:'info', m:'Make the final Internal energy bar larger than the initial — the crane motor and cables warm up during operation.'};
    if (totalTin > 0) return {t:'warn', m:'No energy enters this system — set both Transfer In amounts to zero.'};
    if (selectedOptionL !== '' || selectedOptionL2 !== '') return {t:'warn', m:'No energy enters this system — remove the Transfer In energy type(s).'};
    var hasPOWave = (selectedOptionR1 === 'POWave' || selectedOptionR2 === 'POWave');
    if (!hasPOWave) return {t:'info', m:'Select "Propagation of Waves" as the Transfer Out type — the crane makes noise as it operates.'};
    if (totalTout < 1) return {t:'info', m:'Set the Transfer Out amount to a positive value.'};
    if (totalL + totalTin !== totalR + totalTout)
      return {t:'warn', m:'Conservation: Initial ('+totalL+') + In ('+totalTin+') ≠ Out ('+totalTout+') + Final ('+totalR+'). Adjust the amounts.'};
    return {t:'ok', m:'Correct! Chemical energy from the fuel is used to raise the load, increasing its Gravitational energy, with some lost as Internal energy and sound waves.'};
  }
};

// ── Count filled cells in a column ──────────────────────────────
function getColCount(cfg) {
  return document.querySelectorAll(cfg.qs + ' .active').length;
}

// ── Enhancement 1+3: Fill a column bottom-up with type colour ───
// n=0 clears the column; n=1..10 fills exactly n cells from bottom.
function applyColumn(cfg, type, n) {
  var color = ENERGY_COLOR[type] || '#FFD700';
  for (var i = 1; i <= 10; i++) {
    var cell = document.getElementById(cfg.pre + i);
    if (!cell) continue;
    if (i <= n) {
      cell.style.backgroundColor = color;
      cell.classList.add('active');
      cell.classList.add(cfg.ac);
    } else {
      cell.style.backgroundColor = 'white';
      cell.classList.remove('active');
      cell.classList.remove(cfg.ac);
    }
  }
  // Sync the per-column dropdown
  var drop = document.getElementById(cfg.dropId);
  if (drop) drop.value = String(n);
}

// ── Recalculate totals then refresh live equation ────────────────
function recalcTotals() {
  countCL = getColCount(COL_L.C); countEL = getColCount(COL_L.E);
  countGL = getColCount(COL_L.G); countIL = getColCount(COL_L.I);
  countKL = getColCount(COL_L.K); countNL = getColCount(COL_L.N);
  totalL  = countCL + countEL + countGL + countIL + countKL + countNL;

  countCR = getColCount(COL_R.C); countER = getColCount(COL_R.E);
  countGR = getColCount(COL_R.G); countIR = getColCount(COL_R.I);
  countKR = getColCount(COL_R.K); countNR = getColCount(COL_R.N);
  totalR  = countCR + countER + countGR + countIR + countKR + countNR;

  updateLiveEquation();
}

// ── Enhancement 1: Bar click (LEFT) – systematic fill-from-bottom
// Clicking row n: sets fill to n. Clicking the current top row: reduces by 1.
function colorYellowL(id) {
  var cell = document.getElementById(id);
  var type = null, cfg = null;
  for (var t in COL_L) {
    if (cell.parentNode.classList.contains(COL_L[t].ulClass)) { type = t; cfg = COL_L[t]; break; }
  }
  if (!cfg) return;
  var n    = parseInt(id.replace(/\D/g, ''), 10);  // 1=bottom … 10=top
  var cur  = getColCount(cfg);
  var newN = (cur === n) ? n - 1 : n;              // toggle top off, or fill to n
  applyColumn(cfg, type, Math.max(0, newN));
  recalcTotals();
}

// ── Enhancement 1: Bar click (RIGHT) – systematic fill-from-bottom
function colorYellowR(id) {
  var cell = document.getElementById(id);
  var type = null, cfg = null;
  for (var t in COL_R) {
    if (cell.parentNode.classList.contains(COL_R[t].ulClass)) { type = t; cfg = COL_R[t]; break; }
  }
  if (!cfg) return;
  var n    = parseInt(id.replace(/\D/g, ''), 10);
  var cur  = getColCount(cfg);
  var newN = (cur === n) ? n - 1 : n;
  applyColumn(cfg, type, Math.max(0, newN));
  recalcTotals();
}

// ── Enhancement 2: Dropdown → column (LEFT) ─────────────────────
// typ may be 'C' or 'CL' (both work — charAt(0) extracts the letter key)
function setColumnL(typ, val) {
  var t = typ.charAt(0);
  var cfg = COL_L[t];
  if (cfg) { applyColumn(cfg, t, parseInt(val, 10) || 0); recalcTotals(); }
}

// ── Enhancement 2: Dropdown → column (RIGHT) ────────────────────
function setColumnR(typ, val) {
  var t = typ.charAt(0);
  var cfg = COL_R[t];
  if (cfg) { applyColumn(cfg, t, parseInt(val, 10) || 0); recalcTotals(); }
}

// ── Enhancement 5: Reset everything to zero ─────────────────────
function resetAll() {
  for (var t in COL_L) applyColumn(COL_L[t], t, 0);
  for (var t in COL_R) applyColumn(COL_R[t], t, 0);

  // Reset transfer dropdowns to 0
  ['energyamt-L1','energyamt-L2','energyamt-R1','energyamt-R2'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.selectedIndex = 0; }
  });

  // Redraw transfer boxes (both In and Out)
  var eL1 = document.getElementById('energyamt-L1');
  var eL2 = document.getElementById('energyamt-L2');
  var eR1 = document.getElementById('energyamt-R1');
  var eR2 = document.getElementById('energyamt-R2');
  if (eL1 && eL2) energyIn(eL1, eL2, '#transfer-box-in');
  if (eR1 && eR2) energyIn(eR1, eR2, '#transfer-box-out');

  // Clear feedback panels
  ['check', 'reply'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  selectedOptionL = ''; selectedOptionL2 = '';
  selectedOptionR1 = ''; selectedOptionR2 = '';

  window._tutorDismissed = false;
  recalcTotals();
}

// ── Enhancement 4: Live conservation equation display ────────────
function updateLiveEquation() {
  var el = document.getElementById('live-equation');
  if (!el) return;

  var eL1val = parseInt((document.getElementById('energyamt-L1') || {value:'0'}).value || '0') || 0;
  var eL2val = parseInt((document.getElementById('energyamt-L2') || {value:'0'}).value || '0') || 0;
  var eR1val = parseInt((document.getElementById('energyamt-R1') || {value:'0'}).value || '0') || 0;
  var eR2val = parseInt((document.getElementById('energyamt-R2') || {value:'0'}).value || '0') || 0;

  var tin  = eL1val + eL2val;
  var tout = eR1val + eR2val;
  var lhs  = totalL + tin;
  var rhs  = totalR + tout;
  var ok   = (lhs === rhs);

  el.innerHTML =
    '<b>Conservation:</b>&nbsp;&nbsp;' +
    'Initial&nbsp;<b>(' + totalL + ')</b>' +
    '&nbsp;+&nbsp;In&nbsp;<b>(' + tin + ')</b>' +
    '&nbsp;=&nbsp;Out&nbsp;<b>(' + tout + ')</b>' +
    '&nbsp;+&nbsp;Final&nbsp;<b>(' + totalR + ')</b>' +
    '&nbsp;&nbsp;<span style="font-size:1.3em">' + (ok ? '&#9989;' : '&#10060;') + '</span>';

  el.style.color           = ok ? '#155724' : '#721c24';
  el.style.backgroundColor = ok ? '#d4edda' : '#f8d7da';
  el.style.borderColor     = ok ? '#c3e6cb' : '#f5c6cb';

  updateTutor();
}

// ── Enhanced energyIn – also refreshes live equation ────────────
// Signature kept identical: energyIn(l2, l1, parentSelector)
// l2 = the select that just changed; l1 = the paired select to rebuild.
function energyIn(l2, l1, parent) {
  var amtL2 = parseInt(l2.value || '0', 10) || 0;
  var amtL1 = parseInt(l1.value || '0', 10) || 0;

  // Rebuild l1 options so the sum never exceeds 10
  l1.innerHTML = '';
  for (var i = 0; i <= 10 - amtL2; i++)
    l1.innerHTML += '<option value="' + i + '">' + i + '</option>';
  l1.value = (amtL1 <= 10 - amtL2) ? amtL1 : 0;

  // Colour transfer boxes left-to-right
  var box = document.querySelector(parent);
  if (box) {
    var total = parseInt(l1.value, 10) + amtL2;
    for (var j = 0; j < box.children.length; j++) {
      box.children[j].style.backgroundColor = (j < total) ? 'red' : 'white';
    }
  }
  updateLiveEquation();
}

// ── Energy type selection handlers (add updateLiveEquation call) ─

function SelectedEnergyL() {
  document.querySelectorAll('.options-L1 .option').forEach(function(element) {
    element.addEventListener('click', function(event) {
      selectedOptionL = event.target.value || '';
      var amt1 = document.getElementById('energyamt-L1');
      if (!selectedOptionL) {
        var v = parseInt(amt1.value, 10) || 0;
        amt1.style.pointerEvents = 'none';
        for (var i = 1; i <= 10; i++) {
          var b = document.getElementById('ET' + i);
          if (b && b.style.backgroundColor === 'red' && v > 0) { b.style.backgroundColor = 'white'; v--; }
        }
        amt1.selectedIndex = 0;
      } else {
        amt1.style.pointerEvents = 'auto';
      }
      updateLiveEquation();
    });
  });
}

function SelectedEnergyL2() {
  document.querySelectorAll('.options-L2 .option').forEach(function(element) {
    element.addEventListener('click', function(event) {
      selectedOptionL2 = event.target.value || '';
      var amt2 = document.getElementById('energyamt-L2');
      if (!selectedOptionL2) {
        var v = parseInt(amt2.value, 10) || 0;
        amt2.style.pointerEvents = 'none';
        for (var i = 1; i <= 10; i++) {
          var b = document.getElementById('ET' + i);
          if (b && b.style.backgroundColor === 'red' && v > 0) { b.style.backgroundColor = 'white'; v--; }
        }
        if (amt2.value !== '0') amt2.selectedIndex = 0;
      } else {
        amt2.style.pointerEvents = 'auto';
      }
      updateLiveEquation();
    });
  });
}

function SelectedEnergyR() {
  document.querySelectorAll('.options-R1 .option').forEach(function(element) {
    element.addEventListener('click', function(event) {
      selectedOptionR1 = event.target.value || '';
      var amtR1 = document.getElementById('energyamt-R1');
      if (!selectedOptionR1) {
        var v = parseInt(amtR1.value, 10) || 0;
        amtR1.style.pointerEvents = 'none';
        for (var i = 1; i <= 10; i++) {
          var b = document.getElementById('ETO' + i);
          if (b && b.style.backgroundColor === 'red' && v > 0) { b.style.backgroundColor = 'white'; v--; }
        }
        if (amtR1.value !== '0') amtR1.selectedIndex = 0;
      } else {
        amtR1.style.pointerEvents = 'auto';
      }
      updateLiveEquation();
    });
  });
}

function SelectedEnergyR2() {
  document.querySelectorAll('.options-R2 .option').forEach(function(element) {
    element.addEventListener('click', function(event) {
      selectedOptionR2 = event.target.value || '';
      var amtR2 = document.getElementById('energyamt-R2');
      if (!selectedOptionR2) {
        var v = parseInt(amtR2.value, 10) || 0;
        amtR2.style.pointerEvents = 'none';
        for (var i = 1; i <= 10; i++) {
          var b = document.getElementById('ETO' + i);
          if (b && b.style.backgroundColor === 'red' && v > 0) { b.style.backgroundColor = 'white'; v--; }
        }
        if (amtR2.value !== '0') amtR2.selectedIndex = 0;
      } else {
        amtR2.style.pointerEvents = 'auto';
      }
      updateLiveEquation();
    });
  });
}

// ── Enhancement: Transfer box click – left-to-right fill ─────────
// Clicking box at visual position P (left=1, right=10) fills boxes 1..P.
// Clicking the current rightmost filled box reduces total by 1 (toggle off).

function _transferClick(boxSel, amt1Id, amt2Id, rawNum) {
  var pos    = 11 - rawNum;                         // ET10/ETO10 → pos 1 (leftmost)
  var box    = document.querySelector(boxSel);
  if (!box) return;

  var curTotal = 0;
  for (var i = 0; i < box.children.length; i++) {
    if (box.children[i].style.backgroundColor === 'red') curTotal++;
  }
  var newTotal = (curTotal === pos) ? pos - 1 : pos;
  newTotal = Math.max(0, newTotal);

  var eAmt1 = document.getElementById(amt1Id);
  var eAmt2 = document.getElementById(amt2Id);
  if (!eAmt1 || !eAmt2) return;

  var amt2 = parseInt(eAmt2.value, 10) || 0;
  var newAmt1 = Math.min(Math.max(0, newTotal - amt2), 10 - amt2);

  eAmt1.value = String(newAmt1);
  energyIn(eAmt1, eAmt2, boxSel);
}

function clickTransferIn(id) {
  _transferClick('#transfer-box-in',  'energyamt-L1', 'energyamt-L2',
                 parseInt(id.replace(/\D/g, ''), 10));
}

function clickTransferOut(id) {
  _transferClick('#transfer-box-out', 'energyamt-R1', 'energyamt-R2',
                 parseInt(id.replace(/\D/g, ''), 10));
}

// ── Inject standardised styles ────────────────────────────────────
function _injectStyles() {
  var s = document.createElement('style');
  s.textContent = [
    /* Uniform select size */
    'select { font-size:11px !important; padding:2px 3px !important; box-sizing:border-box !important; cursor:pointer !important; }',
    /* Clickable transfer box cells */
    '.eng-box { cursor:pointer; transition:opacity 0.1s; }',
    '.eng-box:hover { opacity:0.75; }',

    /* ── Mobile responsive ─────────────────────────────────────────── */
    '@media (max-width:768px) {',
    /* Remove fixed 16:9 aspect ratio so content isn't clipped */
    '  #container { aspect-ratio:unset !important; width:100% !important; }',
    /* Let Bootstrap column stacking work properly */
    '  #main { display:block !important; width:100% !important; }',
    /* Override the desktop 920px fixed width on the L bar section */
    '  .Lbox { width:100% !important; }',
    /* Centre the six energy bar columns */
    '  #Lborder { justify-content:center !important; flex-wrap:wrap !important; }',
    '  #unit { margin-left:0 !important; }',
    '  #unit li { padding:4px !important; }',
    '  #unitsamnt { margin-top:12px !important; }',
    /* Wrap column label/select row so it fits without overflow */
    '  #Arrow { flex-wrap:wrap !important; justify-content:center !important; }',
    '  .center { width:auto !important; min-width:40px; margin:2px !important; }',
    /* Stack DIRECT child row of #circle only (Transfer-In | Circle | Transfer-Out) */
    '  #circle > .row { flex-direction:column !important; }',
    '  #circle .col-4 { width:100% !important; max-width:100% !important; flex:0 0 100% !important; padding:6px 10px !important; }',
    /* Restore horizontal direction for nested rows (transfer boxes) */
    '  #transfer-box-in, #transfer-box-out { flex-direction:row !important; flex-wrap:nowrap !important; justify-content:center !important; padding-left:0 !important; }',
    /* Fixed touch-friendly cell size – target li directly to beat col-1 max-width */
    '  #transfer-box-in > li, #transfer-box-out > li { flex:0 0 auto !important; width:9% !important; max-width:40px !important; min-height:30px !important; padding:10px 2px !important; box-sizing:border-box !important; }',
    /* Shrink the big operator/equation row */
    '  .signs { font-size:16px !important; padding:4px !important; }',
    '  .lables h5 { font-size:13px !important; }',
    '  .head5 { font-size:12px !important; }',
    /* Compact the live equation banner */
    '  #live-equation { font-size:12px !important; padding:5px 8px !important; }',
    /* Legend: 2 icons per row on mobile (avoids Bootstrap row overflow) */
    '  .super-box { flex:0 0 50% !important; max-width:50% !important; width:50% !important; }',
    /* Fix energy-type legend text – undo desktop width:11% and margin */
    '  #symbols { width:auto !important; }',
    '  #legend-T { margin-left:0 !important; }',
    '}',

    /* ── Discover toggle button ──────────────────────────────────── */
    '#discover-btn {',
    '  height:55px; padding:0 14px; white-space:nowrap;',
    '  border-radius:8%; border:1px solid #ccc; background:#fff;',
    '  cursor:pointer; font-size:13px; font-weight:bold; color:#0066cc;',
    '  display:block; margin-left:auto;',
    '}',
    '#discover-btn:hover { background:#e8f4ff; }',

    /* ── Pedagogical tutor panel ─────────────────────────────────── */
    '#tutor-panel {',
    '  position:fixed; bottom:0; left:0; right:0; z-index:9999;',
    '  padding:10px 16px; font-size:14px; font-weight:500;',
    '  background:#d1ecf1; color:#0c5460; border-top:2px solid #17a2b8;',
    '  display:flex; align-items:center; gap:10px;',
    '  box-shadow:0 -2px 8px rgba(0,0,0,0.15);',
    '  transition:background 0.3s,border-top-color 0.3s,color 0.3s;',
    '}',
    '#tutor-icon { font-size:18px; flex-shrink:0; }',
    '#tutor-msg  { flex:1; line-height:1.4; }',
    '#tutor-close { background:none; border:none; font-size:16px; cursor:pointer; opacity:0.5; flex-shrink:0; padding:2px 8px; border-radius:4px; }',
    '#tutor-close:hover { opacity:1; background:rgba(0,0,0,0.08); }',
    'body { padding-bottom:56px !important; }'
  ].join('\n');
  document.head.appendChild(s);
}

// ── Convert the full-width Discover banner into a compact toggle button ──
function _initDiscoverBanner() {
  // Locate the gradient banner that contains the Discover text
  var banner = null;
  var divs = document.querySelectorAll('body > div, body > .container > div');
  for (var i = 0; i < divs.length; i++) {
    var s = divs[i].getAttribute('style') || '';
    if (s.indexOf('linear-gradient') !== -1 && divs[i].textContent.indexOf('Discover') !== -1) {
      banner = divs[i]; break;
    }
  }
  if (!banner) return;

  var origStyle = banner.getAttribute('style');
  var origHTML  = banner.innerHTML;

  // Build collapsed content panel (keeps original blue gradient styling)
  var panel = document.createElement('div');
  panel.setAttribute('style', origStyle);
  panel.innerHTML = origHTML;
  panel.style.display = 'none';

  // Build the toggle button (matches Hint button size/look)
  var btn = document.createElement('button');
  btn.id = 'discover-btn';
  btn.textContent = 'Discover';

  btn.addEventListener('click', function() {
    var open = panel.style.display !== 'none';
    panel.style.display = open ? 'none' : 'block';
    btn.textContent = open ? 'Discover' : 'Discover ▲';
  });

  // Keep panel at the top of page (replaces banner position)
  var parent = banner.parentNode;
  parent.insertBefore(panel, banner);
  parent.removeChild(banner);

  // Place button in the empty col-4 of the scenario header row (same row as Hint)
  var headerRow = document.querySelector('#container .row.mt-3');
  var col4 = headerRow ? headerRow.querySelector('.col-4') : null;
  if (col4) {
    col4.style.display = 'flex';
    col4.style.alignItems = 'center';
    col4.style.justifyContent = 'flex-end';
    col4.appendChild(btn);
  } else {
    // Fallback: in hintcol or top of page
    var hintcol = document.querySelector('.hintcol');
    if (hintcol) hintcol.insertBefore(btn, hintcol.firstChild);
    else parent.insertBefore(btn, panel);
  }
}

// ── Create the tutor panel UI (called once on load) ──────────────
function _createTutorPanel() {
  if (document.getElementById('tutor-panel')) return;
  window._tutorDismissed = false;
  var panel = document.createElement('div');
  panel.id = 'tutor-panel';
  panel.innerHTML =
    '<span id="tutor-icon">💡</span>' +
    '<span id="tutor-msg">Interact with the diagram to receive personalised guidance.</span>' +
    '<button id="tutor-close" title="Close tutor">✕</button>';
  document.body.appendChild(panel);
  document.getElementById('tutor-close').addEventListener('click', function() {
    panel.style.display = 'none';
    window._tutorDismissed = true;
  });
}

// ── Evaluate rules and update tutor panel ────────────────────────
function updateTutor() {
  if (window._tutorDismissed) return;
  var panel = document.getElementById('tutor-panel');
  if (!panel) return;
  panel.style.display = 'flex';

  var scenarioNum = 0;
  var h2 = document.querySelector('h2');
  if (h2) {
    var m = h2.textContent.match(/Scenario\s*(\d+)/i);
    if (m) scenarioNum = parseInt(m[1], 10);
  }

  var rules = TUTOR_RULES[scenarioNum];
  if (!rules) { panel.style.display = 'none'; return; }

  var result = rules();
  var iconEl = document.getElementById('tutor-icon');
  var msgEl  = document.getElementById('tutor-msg');

  if (result.t === 'ok') {
    panel.style.background    = '#d4edda';
    panel.style.borderTopColor = '#28a745';
    panel.style.color          = '#155724';
    if (iconEl) iconEl.textContent = '✅';
  } else if (result.t === 'warn') {
    panel.style.background    = '#fff3cd';
    panel.style.borderTopColor = '#ffc107';
    panel.style.color          = '#856404';
    if (iconEl) iconEl.textContent = '⚠️';
  } else {
    panel.style.background    = '#d1ecf1';
    panel.style.borderTopColor = '#17a2b8';
    panel.style.color          = '#0c5460';
    if (iconEl) iconEl.textContent = '💡';
  }
  if (msgEl) msgEl.textContent = result.m;
}

// ── Initialise on page load ──────────────────────────────────────
window.onload = function() {
  _injectStyles();
  _initDiscoverBanner();
  _createTutorPanel();
  SelectedEnergyL();
  SelectedEnergyL2();
  SelectedEnergyR();
  SelectedEnergyR2();
  updateLiveEquation();

  // Event delegation for clickable transfer boxes + dropdown auto-close.
  // Use capture phase so the dropdown close fires before native radio behavior
  // can re-open the CSS checkbox-toggle dropdown.
  document.addEventListener('click', function(e) {
    var id = e.target.id;
    if (/^ET\d+$/.test(id))  clickTransferIn(id);
    else if (/^ETO\d+$/.test(id)) clickTransferOut(id);

    // Close any custom Type-Of-Transfer dropdown after an option is selected.
    // DOM structure: .option → div.options-L/R → div#select-box → input[checkbox]
    if (e.target.closest) {
      var opt = e.target.closest('.option');
      if (opt) {
        var optionsDiv = opt.parentNode;
        var selectBox  = optionsDiv && optionsDiv.parentNode;
        if (selectBox) {
          var cb = selectBox.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = false;
        }
      }
    }
  }, true);
};
