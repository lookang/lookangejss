// -------------- WORD‑BANK GAME LOGIC --------------
// Complete list of vocabulary words and their definitions
const WORD_BANK = [
  {word:'silent', definition:'making no sound'},
  {word:'gigantic', definition:'extremely large'},
  {word:'brisk', definition:'quick and energetic'},
  {word:'dim', definition:'not bright or clear'},
  {word:'fragile', definition:'easily broken'},
  {word:'ancient', definition:'very old'},
  {word:'shimmer', definition:'to shine with flickering light'},
  {word:'drowsy', definition:'feeling sleepy'},
  {word:'hasty', definition:'done with too much speed'},
  {word:'marvel', definition:'something that causes wonder'}
];

// DOM elements we will manipulate
const questionBox = document.getElementById('questionBox');
const optionsBox  = document.getElementById('optionsBox');
const feedback    = document.getElementById('feedback');
const scoreSpan   = document.getElementById('score');
const progressSpan= document.getElementById('progress');
const nextBtn     = document.getElementById('nextBtn');
const summaryScreen = document.getElementById('summaryScreen');
const logList       = document.getElementById('logList');
const retryBtn      = document.getElementById('retryBtn');

// GAME STATE VARIABLES
let currentIndex = 0;     // which question we are on (0‑9)
let score = 0;            // learner score (0‑99)
let log = [];            // store history of attempts {definition, answer, correct}
let questionSet = [];

// -------------- HELPER FUNCTIONS --------------
// Shuffle helper (Fisher‑Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Prepare a new game session
function initGame(){
  // Reset state
  currentIndex = 0;
  score = 0;
  log.length = 0;
  scoreSpan.textContent = `Score: ${score}`;
  summaryScreen.classList.add('hidden');
  nextBtn.classList.add('hidden');
  feedback.textContent = '';

  // Choose 10 unique questions (or all if less than 10)
  questionSet = shuffle([...WORD_BANK]).slice(0,10);

  // Start first question
  renderQuestion();
}

// Render the current question & options
function renderQuestion(){
  const entry = questionSet[currentIndex];
  questionBox.textContent = entry.definition;

  // Progress HUD
  progressSpan.textContent = `Question ${currentIndex+1} / ${questionSet.length}`;

  // Build option list: correct word + 3 random distractors
  const otherWords = shuffle(WORD_BANK.filter(e => e.word!==entry.word)).slice(0,3).map(e=>e.word);
  const options = shuffle([entry.word, ...otherWords]);

  // Clear old buttons & feedback
  optionsBox.innerHTML = '';
  feedback.textContent = '';

  // Create buttons
  options.forEach(word=>{
    const btn = document.createElement('button');
    btn.textContent = word;
    btn.addEventListener('click', ()=>handleAnswer(btn, word === entry.word, entry, word));
    optionsBox.appendChild(btn);
  });
}

// Handle the learner's selection
function handleAnswer(button, isCorrect, entry, selectedWord){
  // Disable all option buttons to prevent multi‑clicks
  Array.from(optionsBox.children).forEach(btn=>btn.disabled=true);

  // Style the clicked button
  if(isCorrect){
    button.classList.add('correct');
    feedback.textContent = 'Correct! 🎉';
    feedback.className = 'correct';
    score = Math.min(99, score + 1); // increment by 1, cap at 99
    scoreSpan.textContent = `Score: ${score}`;
  }else{
    button.classList.add('wrong');
    feedback.textContent = 'Try again next time!';
    feedback.className = 'wrong';
  }

  // Save log
  log.push({ definition: entry.definition, userAnswer: selectedWord, correctAnswer: entry.word, correct:isCorrect});

  // Show correct answer for learning (highlight)
  Array.from(optionsBox.children).forEach(btn=>{
    if(btn.textContent === entry.word){ btn.classList.add('correct'); }
  });

  // Reveal NEXT button
  nextBtn.classList.remove('hidden');
}

// Move to next question or finish game
nextBtn.addEventListener('click', ()=>{
  currentIndex++;
  if(currentIndex < questionSet.length){
    nextBtn.classList.add('hidden');
    renderQuestion();
  }else{
    finishGame();
  }
});

// Generate summary screen and encourage retry
function finishGame(){
  questionBox.textContent = '';
  optionsBox.innerHTML   = '';
  feedback.textContent   = '';
  nextBtn.classList.add('hidden');
  progressSpan.textContent = 'Finished!';

  // Build log list
  logList.innerHTML = '';
  log.forEach((item, idx)=>{
    const li = document.createElement('li');
    li.textContent = `Q${idx+1}: ${item.definition}  –  your answer: ${item.userAnswer}`;
    li.className = item.correct ? 'correct' : 'wrong';
    logList.appendChild(li);
  });

  summaryScreen.classList.remove('hidden');

  // Google Analytics event (optional)
  if(typeof gtag === 'function'){ gtag('event','game_complete',{score:score}); }
}

// Restart handler
retryBtn.addEventListener('click', initGame);

// Auto‑start the game on page load
initGame();
