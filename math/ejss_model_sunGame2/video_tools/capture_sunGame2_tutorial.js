const fs = require('fs');
const path = require('path');
const {chromium} = require('playwright');

const simDir = path.resolve(__dirname, '..');
const outputDir = path.join(simDir, 'video_output');
const screensDir = path.join(outputDir, 'screens');
const manifestPath = path.join(outputDir, 'scene_manifest.json');

fs.mkdirSync(screensDir, {recursive: true});

const simUrl = 'file:///' + path.join(simDir, 'index.html').replace(/\\/g, '/');
const introDemoEdgeIndex = 41;

const puzzleGrids = {
  'puzzle 1': [2, 4, 1, 3, 2, 2, 3, 6, 1, 3, 2, 4, 6, 8, 1, 2, 2, 6, 4, 4, 1, 2, 2, 4, 1],
  'puzzle 2': [2, 3, 3, 3, 1, 3, 6, 7, 5, 1, 4, 4, 6, 6, 5, 5, 5, 7, 4, 2, 2, 5, 2, 4, 1],
  'puzzle 3': [1, 2, 2, 4, 2, 1, 5, 6, 3, 3, 4, 3, 5, 2, 3, 3, 7, 7, 6, 2, 2, 1, 3, 3, 2],
  'puzzle 4': [2, 2, 3, 4, 2, 1, 7, 6, 4, 4, 2, 5, 1, 6, 3, 4, 5, 7, 5, 1, 2, 3, 4, 1, 2],
};

const scenes = [
  {
    slug: '01_intro',
    title: 'How To Play Sun Game',
    subtitle: 'Rules, teacher tools, and puzzle strategies',
    narration: 'In this video, we will learn how to play Sun Game, how the buttons work, and how to solve the built in puzzles step by step.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
    },
  },
  {
    slug: '02_goal',
    title: 'The Goal',
    subtitle: 'Make each clue match its touching active edges',
    narration: 'Each circle contains a clue. The number tells us exactly how many active edges must touch that circle. The aim is to make every clue match its surrounding active edges.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
    },
  },
  {
    slug: '03_click_once',
    title: 'Click Once',
    subtitle: 'A black line becomes active and starts to count',
    narration: 'When you click an edge once, it turns black and becomes active. This means the edge now counts toward the clues that touch it.',
    focusHotspotIndex: introDemoEdgeIndex,
    focusSegmentIndex: introDemoEdgeIndex,
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await clickSegment(page, introDemoEdgeIndex);
    },
  },
  {
    slug: '04_click_twice',
    title: 'Click Twice',
    subtitle: 'A flagged edge marks a line that should stay off',
    narration: 'Click the same edge a second time to flag it as impossible. A flagged edge is your way of marking that this edge should stay off.',
    focusHotspotIndex: introDemoEdgeIndex,
    focusSegmentIndex: introDemoEdgeIndex,
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await clickSegment(page, introDemoEdgeIndex);
      await clickSegment(page, introDemoEdgeIndex);
    },
  },
  {
    slug: '05_click_three_times',
    title: 'Click Three Times',
    subtitle: 'The edge returns to undecided',
    narration: 'A third click returns the edge to undecided. This three state cycle lets you keep track of what must be on, what must be off, and what you still need to test.',
    focusHotspotIndex: introDemoEdgeIndex,
    focusSegmentIndex: introDemoEdgeIndex,
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await clickSegment(page, introDemoEdgeIndex);
      await clickSegment(page, introDemoEdgeIndex);
      await clickSegment(page, introDemoEdgeIndex);
    },
  },
  {
    slug: '06_teacher_tools',
    title: 'Teacher Mode',
    subtitle: 'Hint, Next Step, Play Thinking, and Solve Now',
    narration: 'Teacher Mode reveals the learning tools. Hint points to the next idea. Next Step performs that move. Play Thinking keeps going with explainable local deductions. Solve Now lets the computer finish the board.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
    },
  },
  {
    slug: '07_puzzle1_hint',
    title: 'Puzzle 1 Opening',
    subtitle: 'Start with the strong clue near the center right',
    narration: 'Puzzle one is the best place to start. The clue eight near the center right touches eight possible edges, so all eight of them must be active. This is the first major forced move.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await clickButton(page, '#hintBtn');
    },
  },
  {
    slug: '08_puzzle1_play',
    title: 'Play Thinking',
    subtitle: 'Watch one deduction create the next',
    narration: 'After that, neighboring clues become easier to read. Some are already full, so their remaining undecided edges must stay off. Play Thinking is helpful here because it shows the chain of consequences one step at a time.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await clickButton(page, '#playBtn');
      await waitForPlaybackToSettle(page);
    },
  },
  {
    slug: '09_solve_now',
    title: 'Solve Now',
    subtitle: 'Let the computer finish from the current position',
    narration: 'If you want the finished board, Solve Now completes the puzzle from the current position. In this version, Play Thinking stops cleanly when no more simple teacher steps remain, so students can see where logic ends and full search begins.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await clickButton(page, '#autoSolveBtn');
      await page.waitForTimeout(1000);
      await dismissDialogs(page);
    },
  },
  {
    slug: '10_puzzle2',
    title: 'Puzzle 2',
    subtitle: 'A strong opening creates a chain reaction',
    narration: 'Puzzle two also has a strong opening. The clue five on the right side touches five possible edges, so all of them must be active. This puzzle is good for showing how one forced move creates new information nearby.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await applyStaticPuzzle(page, 'puzzle 2', {
        highlightShapes: [14],
        activeSegments: [31, 32, 45, 49, 50],
      });
    },
  },
  {
    slug: '11_puzzle3',
    title: 'Puzzle 3',
    subtitle: 'No immediate forced move under the basic local rules',
    narration: 'Puzzle three is different. At the start, the basic local rules do not give an immediate forced move. That is a useful teaching moment. Students can scan for the most restricted clues, test ideas, and compare their thinking with the teacher tools.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await applyStaticPuzzle(page, 'puzzle 3');
    },
  },
  {
    slug: '12_puzzle4',
    title: 'Puzzle 4',
    subtitle: 'A challenge puzzle that needs stronger reasoning',
    narration: 'Puzzle four behaves similarly. A hint at the start shows that there is no single node deduction available yet. That makes puzzle three and puzzle four better challenge puzzles than beginner puzzles.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await applyStaticPuzzle(page, 'puzzle 4');
    },
  },
  {
    slug: '13_recap',
    title: 'Two Core Patterns',
    subtitle: 'Already full means off. All needed means on.',
    narration: 'To play well, remember the two core patterns. If a clue is already full, the remaining edges around it must stay off. If a clue still needs all of its undecided edges, then all of those edges must turn on. Try puzzle one first, then puzzle two, and use teacher mode to build confidence before tackling the harder boards.',
    setup: async (page) => {
      await resetPuzzle(page, 'puzzle 1');
      await ensureTeacherMode(page);
      await clickButton(page, '#hintBtn');
    },
  },
];

async function launchBrowser() {
  try {
    return await chromium.launch({channel: 'msedge', headless: true});
  } catch (_err) {
    return await chromium.launch({headless: true});
  }
}

async function resetPuzzle(page, puzzleName) {
  const currentValue = await page.locator('#comboBox').inputValue();
  if (currentValue !== puzzleName) {
    await page.locator('#comboBox').selectOption({label: puzzleName});
  } else {
    await page.locator('#reset').click();
  }
  await page.waitForTimeout(900);
}

async function ensureTeacherMode(page) {
  const text = await page.locator('#teacherModeBtn').innerText();
  if (text.includes('Off')) {
    await page.locator('#teacherModeBtn').click();
  }
  await page.waitForTimeout(400);
}

async function waitForPlaybackToSettle(page) {
  try {
    await page.waitForFunction(() => {
      const btn = document.getElementById('playBtn');
      return btn && btn.textContent.includes('Play Thinking');
    }, {timeout: 7000});
  } catch (_err) {
    await clickButton(page, '#playBtn');
  }
  await page.waitForTimeout(400);
}

async function clickButton(page, selector) {
  await page.locator(selector).click();
  await page.waitForTimeout(500);
}

async function clickSegment(page, index) {
  await page.locator(`ellipse[id="hotclickpoints[${index}]"]`).click({force: true});
  await page.waitForTimeout(300);
}

async function clearCaptureOverlay(page) {
  await page.evaluate(() => {
    document.getElementById('codexCaptureOverlayRoot')?.remove();
  });
}

async function showCaptureOverlay(page, hotspotIndex, segmentIndex = hotspotIndex) {
  await page.evaluate(({hotspotIndex, segmentIndex}) => {
    document.getElementById('codexCaptureOverlayRoot')?.remove();

    const hotspot = document.getElementById(`hotclickpoints[${hotspotIndex}]`);
    const segment = document.getElementById(`segmentSet[${segmentIndex}]`);
    if (!hotspot || !segment) return;

    const hotspotRect = hotspot.getBoundingClientRect();
    const segmentRect = segment.getBoundingClientRect();
    const hotspotX = hotspotRect.left + hotspotRect.width / 2;
    const hotspotY = hotspotRect.top + hotspotRect.height / 2;
    const segmentX = segmentRect.left + segmentRect.width / 2;
    const segmentY = segmentRect.top + segmentRect.height / 2;

    const root = document.createElement('div');
    root.id = 'codexCaptureOverlayRoot';
    root.style.position = 'fixed';
    root.style.inset = '0';
    root.style.pointerEvents = 'none';
    root.style.zIndex = '999999';

    const spotlight = document.createElement('div');
    spotlight.style.position = 'fixed';
    spotlight.style.left = `${segmentX - 44}px`;
    spotlight.style.top = `${segmentY - 44}px`;
    spotlight.style.width = '88px';
    spotlight.style.height = '88px';
    spotlight.style.borderRadius = '999px';
    spotlight.style.border = '4px solid rgba(255, 193, 7, 0.98)';
    spotlight.style.background = 'rgba(255, 235, 59, 0.16)';
    spotlight.style.boxShadow = '0 0 0 8px rgba(255, 235, 59, 0.12)';

    const pulse = document.createElement('div');
    pulse.style.position = 'fixed';
    pulse.style.left = `${hotspotX - 12}px`;
    pulse.style.top = `${hotspotY - 12}px`;
    pulse.style.width = '24px';
    pulse.style.height = '24px';
    pulse.style.borderRadius = '999px';
    pulse.style.background = 'rgba(255, 87, 34, 0.88)';
    pulse.style.boxShadow = '0 0 0 8px rgba(255, 87, 34, 0.18)';

    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = `${hotspotX - 14}px`;
    cursor.style.top = `${hotspotY - 54}px`;
    cursor.style.width = '42px';
    cursor.style.height = '56px';
    cursor.innerHTML = `
      <svg viewBox="0 0 42 56" width="42" height="56" aria-hidden="true">
        <path d="M4 3 L32 31 L22 33 L28 51 L20 54 L14 36 L6 43 Z"
          fill="#ffffff" stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
      </svg>
    `;
    cursor.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.28))';

    root.appendChild(spotlight);
    root.appendChild(pulse);
    root.appendChild(cursor);
    document.body.appendChild(root);
  }, {hotspotIndex, segmentIndex});
}

async function dismissDialogs(page) {
  const okButton = page.locator('[id=".myBoxPanelOk.okbt"]');
  if (await okButton.count()) {
    await okButton.click({force: true}).catch(() => {});
  }
  const cancelButton = page.locator('[id=".myBoxPanelOk.cancelbt"]');
  if (await cancelButton.count()) {
    await cancelButton.click({force: true}).catch(() => {});
  }
  await page.keyboard.press('Enter').catch(() => {});
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(300);
}

async function applyStaticPuzzle(page, puzzleName, options = {}) {
  const grid = puzzleGrids[puzzleName];
  await page.evaluate(({puzzleName, grid, highlightShapes, activeSegments}) => {
    document.getElementById('comboBox').value = puzzleName;
    for (let i = 0; i < 25; i++) {
      const text = document.getElementById(`textSet[${i}].text`);
      if (text) {
        text.textContent = String(grid[i]);
      }
      const shape = document.getElementById(`shapeSet[${i}]`);
      if (shape) {
        shape.setAttribute('fill', 'white');
      }
    }
    for (let i = 0; i < 72; i++) {
      const segment = document.getElementById(`segmentSet[${i}]`);
      if (!segment) continue;
      segment.setAttribute('stroke', '#90a4ae');
      segment.setAttribute('stroke-dasharray', '10 5');
    }
    (highlightShapes || []).forEach((idx) => {
      const shape = document.getElementById(`shapeSet[${idx}]`);
      if (shape) {
        shape.setAttribute('fill', '#ffd970');
      }
    });
    (activeSegments || []).forEach((idx) => {
      const segment = document.getElementById(`segmentSet[${idx}]`);
      if (segment) {
        segment.setAttribute('stroke', 'black');
        segment.setAttribute('stroke-dasharray', '0');
      }
    });
  }, {puzzleName, grid, highlightShapes: options.highlightShapes || [], activeSegments: options.activeSegments || []});
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: {width: 1280, height: 720},
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(simUrl, {waitUntil: 'load'});
  await page.waitForSelector('#playBtn');
  await page.waitForTimeout(1200);

  const manifest = [];

  for (const scene of scenes) {
    await clearCaptureOverlay(page);
    await scene.setup(page);
    if (scene.focusHotspotIndex !== undefined) {
      await showCaptureOverlay(page, scene.focusHotspotIndex, scene.focusSegmentIndex);
      await page.waitForTimeout(120);
    }
    const screenshotPath = path.join(screensDir, `${scene.slug}.png`);
    await page.screenshot({path: screenshotPath, type: 'png'});
    manifest.push({
      slug: scene.slug,
      title: scene.title,
      subtitle: scene.subtitle,
      narration: scene.narration,
      image: screenshotPath,
    });
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  await browser.close();
  console.log(`Captured ${manifest.length} tutorial scenes.`);
  console.log(manifestPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
