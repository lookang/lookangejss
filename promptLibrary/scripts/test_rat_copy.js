// Quick functional test for RAT influence on the Prompt (~2k) copy.
//
// Why: Puppeteer screenshot capture can time out when the page shows huge output
// or when modal dialogs appear. This script validates the core requirement
// (RAT selection influences the ~2k prompt copy) by executing the page's
// inline <script> in a stubbed DOM environment.

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'ai-prompt-library.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const m = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/i);
if (!m) {
  console.error('FAIL: Could not find inline <script> in ai-prompt-library.html');
  process.exit(2);
}
const scriptContent = m[1];

function makeElement(initial = {}) {
  return {
    value: initial.value ?? '',
    textContent: initial.textContent ?? '',
    innerHTML: initial.innerHTML ?? '',
    style: initial.style ?? {},
    id: initial.id,
    classList: { add() {}, remove() {} },
    scrollIntoView() {},
    addEventListener() {},
    closest() { return this; }
  };
}

function runCase(selectedRAT) {
  const elementsById = new Map();
  const getEl = (id) => {
    if (!elementsById.has(id)) elementsById.set(id, makeElement({ id }));
    return elementsById.get(id);
  };

  // Required elements accessed at evaluation-time
  getEl('topic');
  getEl('gradeLevel');
  getEl('subject');
  getEl('interactionType');
  getEl('specificRequirements');
  getEl('output');
  getEl('copyHelp');
  getEl('clearHighlightBtn');
  getEl('toggleCopiedOnlyBtn');
  getEl('successMsg');
  getEl('successMsgForum');
  getEl('successMsgDetails');
  getEl('copyBtnTop');
  getEl('copyBtnBottom');
  getEl('copyForumBtnTop');
  getEl('copyForumBtnBottom');
  getEl('copyDetailsBtnTop');
  getEl('copyDetailsBtnBottom');
  getEl('selectedRAT');

  let lastTextarea = null;

  const documentStub = {
    getElementById: (id) => getEl(id),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: (tag) => {
      if (tag.toLowerCase() === 'textarea') {
        lastTextarea = makeElement({ id: 'TEMP_TEXTAREA' });
        lastTextarea.select = () => {};
        return lastTextarea;
      }
      return makeElement({ id: tag });
    },
    body: {
      appendChild: () => {},
      removeChild: () => {}
    },
    execCommand: (cmd) => {
      // Copy triggered. We just accept it.
      return cmd === 'copy';
    }
  };

  const sandbox = {
    window: {},
    document: documentStub,
    navigator: { webdriver: true },
    console,
    setTimeout: (fn) => fn(),
    alert: () => {},
    confirm: () => false
  };
  sandbox.window = sandbox;
  sandbox.window.open = () => {};
  sandbox.window.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} });
  sandbox.window.scrollY = 0;
  sandbox.window.scrollX = 0;
  sandbox.window.innerWidth = 900;

  // Evaluate the page script
  vm.createContext(sandbox);
  vm.runInContext(scriptContent, sandbox, { filename: 'ai-prompt-library.html:<script>' });

  // Provide context as if generatePrompt ran
  sandbox.window.currentPromptContext = {
    topic: 'Projectile Motion interactive lab',
    gradeLevel: 'Secondary 3-4',
    subject: 'Physics',
    interactionType: 'Simulation',
    selectedRAT: selectedRAT,
    specificRequirements: '',
    generatedDate: 'TEST'
  };
  sandbox.window.currentPrompt = 'FULL_PROMPT_TEST';

  sandbox.copyToClipboard();

  const copied = lastTextarea ? lastTextarea.value : '';
  return copied;
}

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    console.error(`FAIL: ${label} - expected to include: ${needle}`);
    process.exitCode = 1;
  }
}

function assertNotIncludes(haystack, needle, label) {
  if (haystack.includes(needle)) {
    console.error(`FAIL: ${label} - expected NOT to include: ${needle}`);
    process.exitCode = 1;
  }
}

// Amplify case
const amplifyOut = runCase('amplify');
assertIncludes(amplifyOut, 'PEDAGOGICAL APPROACH (RAT): AMPLIFY', 'Amplify RAT block present');
assertIncludes(amplifyOut, 'hands-on manipulation', 'Amplify guidance present');

// Transform case
const transformOut = runCase('transform');
assertIncludes(transformOut, 'PEDAGOGICAL APPROACH (RAT): TRANSFORM', 'Transform RAT block present');
assertIncludes(transformOut, 'novel experience', 'Transform guidance present');

// Not specified case
const noneOut = runCase('Not specified');
assertNotIncludes(noneOut, 'PEDAGOGICAL APPROACH (RAT):', 'No RAT block when not specified');

if (process.exitCode) {
  console.error('RAT copy test FAILED');
  process.exit(process.exitCode);
}
console.log('PASS: RAT selection influences Prompt (~2k) copy output');
