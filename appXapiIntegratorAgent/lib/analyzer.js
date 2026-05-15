/**
 * Content Analysis Engine
 * Analyzes HTML/JS content to detect interactive elements and recommend integration mode
 */

export async function analyzeContent(htmlContent, jsContent = '') {
  const analysis = {
    hasRadioButtons: false,
    hasCheckboxes: false,
    hasTextInputs: false,
    hasDragDrop: false,
    hasGameState: false,
    hasScore: false,
    hasCanvas: false,
    hasPlayPause: false,
    hasForm: false,
    hasQuestions: false,
    questionCount: 0,
    hasMediaControls: false,
    hasCustomTracking: false,
    // Button-grid style quiz (no traditional <form>)
    hasAnswerGrid: false,
    recommendations: []
  };

  // Analyze HTML structure
  const htmlLower = htmlContent.toLowerCase();
  
  // Check for form elements
  analysis.hasRadioButtons = /type\s*=\s*['"]?radio['"]?/i.test(htmlContent);
  analysis.hasCheckboxes = /type\s*=\s*['"]?checkbox['"]?/i.test(htmlContent);
  analysis.hasTextInputs = /type\s*=\s*['"]?text['"]?|<textarea/i.test(htmlContent);
  analysis.hasForm = /<form|<fieldset/i.test(htmlContent);
  
  // Count questions (common patterns)
  const questionPatterns = [
    /<h[2-4][^>]*>.*?question/gi,
    /Question\s+\d+/gi,
    /Q\d+[:\s]/gi
  ];
  let questionMatches = [];
  questionPatterns.forEach(pattern => {
    const matches = htmlContent.match(pattern) || [];
    questionMatches.push(...matches);
  });
  analysis.hasQuestions = questionMatches.length > 0;
  analysis.questionCount = questionMatches.length;

  // Detect button-grid quizzes (common pattern in Claude-generated interactives)
  // Even if there is no explicit <form> or "Question" text, these are quizzes.
  const hasAnswerGrid = /id\s*=\s*['"]answerGrid['"]/i.test(htmlContent)
    || /class\s*=\s*['"][^'"]*answer-btn[^'"]*['"]/i.test(htmlContent)
    || /questionsToAdvance/i.test(jsContent)
    || /totalAttempts/i.test(jsContent)
    || /correctCount/i.test(jsContent);

  if (hasAnswerGrid) {
    analysis.hasAnswerGrid = true;
    // Heuristic: treat as having questions even if headings don't say "Question".
    if (!analysis.hasQuestions) {
      analysis.hasQuestions = true;
      if (!analysis.questionCount) {
        analysis.questionCount = 5; // typical level length in these games
      }
    }
  }
  
  // Check for interactive elements
  analysis.hasDragDrop = /drag|drop|ondragstart|ondrop/i.test(htmlContent + jsContent);
  analysis.hasCanvas = /<canvas/i.test(htmlContent);
  analysis.hasPlayPause = /play|pause|video|audio/i.test(htmlContent + jsContent);
  analysis.hasMediaControls = /<video|<audio|controls/i.test(htmlContent);
  
  // Analyze JavaScript for game/state patterns
  analysis.hasGameState = /gameState|game\.state|state\s*=|Score|Points/i.test(jsContent);
  analysis.hasScore = /score|points|result|answered|correct/i.test(jsContent);
  analysis.hasCustomTracking = /xAPI|statement|lrs|endpoint|auth/i.test(jsContent);

  // Generate recommendations
  let modeScores = {
    quiz: 0,
    timeline: 0,
    minimal: 100,
    agent: 0
  };

  // Quiz mode indicators
  if (analysis.hasForm || analysis.hasRadioButtons || analysis.hasCheckboxes) {
    modeScores.quiz += 30;
  }
  if (analysis.hasQuestions || analysis.questionCount > 0) {
    modeScores.quiz += 40;
  }
  if (analysis.hasScore) {
    modeScores.quiz += 20;
  }

   // Button-grid quiz patterns (e.g. Math Facts Automaticity Builder)
   if (analysis.hasAnswerGrid) {
     modeScores.quiz += 40; // strong signal this is a quiz
   }

  // Timeline mode indicators
  if (analysis.hasCanvas) {
    modeScores.timeline += 25;
  }
  if (analysis.hasDragDrop) {
    modeScores.timeline += 25;
  }
  if (analysis.hasPlayPause || analysis.hasMediaControls) {
    modeScores.timeline += 20;
  }
  if (analysis.hasGameState) {
    modeScores.timeline += 20;
  }

  // AI Agent mode always gets a baseline score if content seems custom
  if (jsContent.length > 1000 || analysis.hasCustomTracking) {
    modeScores.agent += 40;
  }
  
  if (analysis.hasCanvas || analysis.hasDragDrop) {
    modeScores.agent += 20;
  }

  // Determine recommended mode
  // Quiz mode is currently disabled in the UI; timeline is the unified mode.
  // If content looks quiz-like, recommend timeline so it still gets quiz
  // semantics that are injected in timeline mode.
  let recommendedMode = 'minimal';
  let confidence = 100;

  if (modeScores.quiz > modeScores.timeline && modeScores.quiz > modeScores.minimal) {
    recommendedMode = 'timeline';
    confidence = Math.min(95, 50 + modeScores.quiz);
  } else if (modeScores.timeline > modeScores.minimal) {
    recommendedMode = 'timeline';
    confidence = Math.min(95, 50 + modeScores.timeline);
  } else if (modeScores.agent > 60) {
    recommendedMode = 'agent';
    confidence = Math.min(95, 50 + modeScores.agent);
  }

  // Build reasons
  const reasons = [];
  
  if (analysis.hasQuestions && analysis.questionCount > 0) {
    reasons.push(`Detected ${analysis.questionCount} questions`);
  }
  if (analysis.hasForm) {
    reasons.push('Contains form elements');
  }
  if (analysis.hasRadioButtons || analysis.hasCheckboxes) {
    reasons.push('Has selectable options (radio/checkbox)');
  }
  if (analysis.hasCanvas) {
    reasons.push('Interactive canvas drawing');
  }
  if (analysis.hasDragDrop) {
    reasons.push('Supports drag-and-drop interactions');
  }
  if (analysis.hasScore) {
    reasons.push('Tracks scoring/results');
  }
  if (analysis.hasCustomTracking) {
    reasons.push('May already have custom tracking code');
  }
  if (jsContent.length > 2000) {
    reasons.push('Complex JavaScript logic detected');
  }

  return {
    recommendedMode,
    confidence: Math.round(confidence),
    detectedFeatures: analysis,
    reasons: reasons.length > 0 ? reasons : ['Generic interactive content'],
    modeScores
  };
}

/**
 * Analyze HTML structure for specific patterns
 */
export function findContentDir(files) {
  // Look for index.html
  const indexCandidates = Object.keys(files).filter(k => 
    k.toLowerCase().endsWith('index.html')
  );

  if (indexCandidates.length === 0) {
    return { contentDir: '', indexPath: null };
  }

  // Choose the shortest (shallowest) path
  const sorted = indexCandidates.sort((a, b) => {
    const da = a.split('/').length;
    const db = b.split('/').length;
    if (da !== db) return da - db;
    return a.length - b.length;
  });

  const indexPath = sorted[0];
  const dir = indexPath.slice(0, indexPath.length - 'index.html'.length);
  
  return { contentDir: dir, indexPath };
}

/**
 * Extract JavaScript files from content
 */
export function extractJsFiles(files, contentDir) {
  return Object.keys(files)
    .filter(path => {
      // Only JS files in content directory
      return path.startsWith(contentDir) && 
             path.endsWith('.js') &&
             !path.includes('node_modules') &&
             !path.includes('vendor');
    })
    .slice(0, 3); // Limit to first 3 JS files
}
