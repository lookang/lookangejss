const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const simDir = path.resolve(__dirname, '..');
const outputDir = path.join(simDir, 'video_output_live');
const rawDir = path.join(outputDir, 'raw');
const recordingPath = path.join(rawDir, 'archimedes_live_recording.webm');
const metadataPath = path.join(outputDir, 'live_recording_metadata.json');
const simUrl = 'file:///' + path.join(simDir, 'index.html').replace(/\\/g, '/');

fs.mkdirSync(rawDir, { recursive: true });

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'msedge', headless: true });
  }
  catch (_error) {
    return await chromium.launch({ headless: true });
  }
}

async function wait(page, ms) {
  await page.waitForTimeout(ms);
}

async function installOverlay(page) {
  await page.evaluate(() => {
    document.getElementById('codexArchimedesOverlay')?.remove();
    document.getElementById('codexArchimedesOverlayStyle')?.remove();

    const style = document.createElement('style');
    style.id = 'codexArchimedesOverlayStyle';
    style.textContent = `
      #codexArchimedesOverlay {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        pointer-events: none;
        font-family: Georgia, "Times New Roman", serif;
      }
      #codexArchimedesCard {
        position: fixed;
        left: 18px;
        bottom: 10px;
        width: min(36vw, 720px);
        max-width: calc(100vw - 60px);
        padding: 18px 22px;
        border-radius: 20px;
        background: rgba(255, 250, 241, 0.95);
        border: 2px solid rgba(125, 92, 21, 0.26);
        box-shadow: 0 16px 30px rgba(0, 0, 0, 0.18);
        color: #2f2012;
      }
      #codexArchimedesTitle {
        font-size: clamp(26px, 1.8vw, 40px);
        line-height: 1.12;
        font-weight: 700;
      }
      #codexArchimedesSubtitle {
        margin-top: 8px;
        font-size: clamp(17px, 1.02vw, 24px);
        line-height: 1.34;
      }
      #codexArchimedesFooter {
        margin-top: 10px;
        color: #654321;
        font-size: clamp(14px, 0.92vw, 19px);
        line-height: 1.3;
      }
      #codexArchimedesFocus {
        position: fixed;
        left: -9999px;
        top: -9999px;
        width: 0;
        height: 0;
        border-radius: 18px;
        border: 4px solid rgba(255, 193, 7, 0.98);
        background: rgba(255, 235, 59, 0.12);
        box-shadow: 0 0 0 10px rgba(255, 235, 59, 0.12);
        opacity: 0;
        transition: all 0.16s ease;
      }
      #codexArchimedesCursor {
        position: fixed;
        left: 140px;
        top: 980px;
        width: 54px;
        height: 72px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.28));
        transform: translate(-8px, -8px);
      }
      #codexArchimedesPulse {
        position: fixed;
        left: -9999px;
        top: -9999px;
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255, 87, 34, 0.92);
        box-shadow: 0 0 0 8px rgba(255, 87, 34, 0.14);
        opacity: 0;
      }
      @keyframes codexArchimedesPulse {
        0% { transform: scale(0.7); opacity: 0.95; }
        100% { transform: scale(1.9); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = 'codexArchimedesOverlay';
    root.innerHTML = `
      <div id="codexArchimedesCard">
        <div id="codexArchimedesTitle">Archimedes Lesson Walkthrough</div>
        <div id="codexArchimedesSubtitle">We will compare density, forces, and the meaning of the spring and lower scales.</div>
        <div id="codexArchimedesFooter">Watch the cursor, the arrows, the teacher note, and the equation panel together.</div>
      </div>
      <div id="codexArchimedesFocus"></div>
      <div id="codexArchimedesPulse"></div>
      <div id="codexArchimedesCursor">
        <svg viewBox="0 0 42 56" width="54" height="72" aria-hidden="true">
          <path d="M4 3 L32 31 L22 33 L28 51 L20 54 L14 36 L6 43 Z"
            fill="#ffffff" stroke="#111111" stroke-width="3" stroke-linejoin="round"></path>
        </svg>
      </div>
    `;
    document.body.appendChild(root);
  });
}

async function setCard(page, title, subtitle, footer) {
  await page.evaluate(({ titleText, subtitleText, footerText }) => {
    const title = document.getElementById('codexArchimedesTitle');
    const subtitle = document.getElementById('codexArchimedesSubtitle');
    const footerNode = document.getElementById('codexArchimedesFooter');
    if (title) title.textContent = titleText;
    if (subtitle) subtitle.textContent = subtitleText;
    if (footerNode) footerNode.textContent = footerText;
  }, { titleText: title, subtitleText: subtitle, footerText: footer });
}

async function setCursor(page, x, y) {
  await page.evaluate(({ xPos, yPos }) => {
    const cursor = document.getElementById('codexArchimedesCursor');
    if (!cursor) return;
    cursor.style.left = `${xPos}px`;
    cursor.style.top = `${yPos}px`;
  }, { xPos: x, yPos: y });
}

async function triggerPulse(page, x, y) {
  await page.evaluate(({ xPos, yPos }) => {
    const pulse = document.getElementById('codexArchimedesPulse');
    if (!pulse) return;
    pulse.style.left = `${xPos - 11}px`;
    pulse.style.top = `${yPos - 11}px`;
    pulse.style.opacity = '1';
    pulse.style.animation = 'none';
    pulse.getBoundingClientRect();
    pulse.style.animation = 'codexArchimedesPulse 0.6s ease-out forwards';
  }, { xPos: x, yPos: y });
}

async function clearFocus(page) {
  await page.evaluate(() => {
    const focus = document.getElementById('codexArchimedesFocus');
    if (!focus) return;
    focus.style.opacity = '0';
    focus.style.left = '-9999px';
    focus.style.top = '-9999px';
    focus.style.width = '0';
    focus.style.height = '0';
  });
}

async function focusSelectors(page, selectors, padding = 16) {
  await page.evaluate(({ selectorList, pad }) => {
    const focus = document.getElementById('codexArchimedesFocus');
    if (!focus) return;

    const elements = selectorList
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);

    if (!elements.length) {
      focus.style.opacity = '0';
      return;
    }

    let left = Infinity;
    let top = Infinity;
    let right = -Infinity;
    let bottom = -Infinity;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      left = Math.min(left, rect.left);
      top = Math.min(top, rect.top);
      right = Math.max(right, rect.right);
      bottom = Math.max(bottom, rect.bottom);
    });

    left -= pad;
    top -= pad;
    right += pad;
    bottom += pad;

    focus.style.left = `${left}px`;
    focus.style.top = `${top}px`;
    focus.style.width = `${right - left}px`;
    focus.style.height = `${bottom - top}px`;
    focus.style.opacity = '1';
  }, { selectorList: selectors, pad: padding });
}

async function moveCursor(page, targetX, targetY, durationMs = 700, steps = 24) {
  const start = await page.evaluate(() => {
    const cursor = document.getElementById('codexArchimedesCursor');
    return {
      x: parseFloat(cursor?.style.left || '48'),
      y: parseFloat(cursor?.style.top || '640'),
    };
  });

  for (let step = 1; step <= steps; step++) {
    const ratio = step / steps;
    const eased = ratio < 0.5
      ? 2 * ratio * ratio
      : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
    const x = start.x + ((targetX - start.x) * eased);
    const y = start.y + ((targetY - start.y) * eased);
    await setCursor(page, x, y);
    await wait(page, Math.max(12, Math.round(durationMs / steps)));
  }
}

async function getCenterForSelector(page, selector) {
  const box = await page.locator(selector).boundingBox();
  if (!box) {
    throw new Error(`Unable to locate ${selector}`);
  }
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function moveToSelector(page, selector, durationMs = 700, offsetX = 0, offsetY = 0) {
  const center = await getCenterForSelector(page, selector);
  await moveCursor(page, center.x + offsetX, center.y + offsetY, durationMs);
  return center;
}

async function clickSelector(page, selector, options = {}) {
  const {
    delayAfterMs = 500,
    moveDurationMs = 700,
    focus = true,
    offsetX = 0,
    offsetY = 0,
  } = options;

  if (focus) {
    await focusSelectors(page, [selector]);
  }

  const center = await moveToSelector(page, selector, moveDurationMs, offsetX, offsetY);
  await triggerPulse(page, center.x + offsetX, center.y + offsetY);
  await page.locator(selector).click({ force: true });
  await wait(page, delayAfterMs);
}

async function hoverSelector(page, selector, options = {}) {
  const { delayAfterMs = 450, moveDurationMs = 700 } = options;
  await focusSelectors(page, [selector]);
  await moveToSelector(page, selector, moveDurationMs);
  await wait(page, delayAfterMs);
}

async function animateSlider(page, sliderId, targetValue, options = {}) {
  const {
    durationMs = 1200,
    steps = 12,
    delayAfterMs = 650,
    highlightSelector = null,
  } = options;
  const sliderSelector = `[id="${sliderId}"]`;
  const groupSelector = highlightSelector || sliderSelector;

  await focusSelectors(page, [groupSelector]);
  const meta = await page.locator(sliderSelector).evaluate((el) => ({
    min: parseFloat(el.min),
    max: parseFloat(el.max),
    value: parseFloat(el.value),
  }));
  const box = await page.locator(sliderSelector).boundingBox();
  if (!box) {
    throw new Error(`Unable to locate slider ${sliderId}`);
  }

  const y = box.y + box.height / 2;
  const valueToX = (value) => {
    const ratio = (value - meta.min) / (meta.max - meta.min);
    return box.x + 8 + (Math.max(0, Math.min(1, ratio)) * (box.width - 16));
  };

  await moveCursor(page, valueToX(meta.value), y, 500);
  await triggerPulse(page, valueToX(meta.value), y);

  for (let step = 1; step <= steps; step++) {
    const ratio = step / steps;
    const value = meta.value + ((targetValue - meta.value) * ratio);
    const x = valueToX(value);
    await setCursor(page, x, y);
    await page.evaluate(({ id, valueText }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = valueText;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    }, { id: sliderId, valueText: String(value) });
    await wait(page, Math.max(18, Math.round(durationMs / steps)));
  }

  await page.evaluate(({ id, valueText }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = valueText;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  }, { id: sliderId, valueText: String(targetValue) });

  await triggerPulse(page, valueToX(targetValue), y);
  await wait(page, delayAfterMs);
}

async function resetSim(page) {
  await clickSelector(page, '#resetButton2', { delayAfterMs: 900 });
}

async function ensureTeacherAndEquationOn(page) {
  const state = await page.evaluate(() => ({
    teacherMode: JSON.parse(_model.serialize()).model.teacherMode,
    showEquationPanel: JSON.parse(_model.serialize()).model.showEquationPanel,
  }));
  if (!state.teacherMode) {
    await clickSelector(page, '#teacherModeButton', { delayAfterMs: 450 });
  }
  if (!state.showEquationPanel) {
    await clickSelector(page, '#equationButton', { delayAfterMs: 450 });
  }
}

async function ensureCheckbox(page, checkboxId, desired) {
  const selector = `[id="${checkboxId}"]`;
  const checked = await page.locator(selector).isChecked();
  if (checked !== desired) {
    const labelId = checkboxId.replace('.checkbox', '');
    await clickSelector(page, `#${labelId}`, { delayAfterMs: 500 });
  }
}

async function waitForPause(page, timeoutMs, settleMs = 900) {
  const startedAt = Date.now();
  while ((Date.now() - startedAt) < timeoutMs) {
    const paused = await page.evaluate(() => _model.isPaused());
    if (paused) {
      await wait(page, settleMs);
      return true;
    }
    await wait(page, 450);
  }
  return false;
}

async function playUntilPause(page, timeoutMs, settleMs = 1000) {
  await clickSelector(page, '#playPauseButton', { delayAfterMs: 350 });
  const paused = await waitForPause(page, timeoutMs, settleMs);
  if (!paused) {
    await wait(page, settleMs);
  }
  return paused;
}

async function pauseIfPlaying(page) {
  const paused = await page.evaluate(() => _model.isPaused());
  if (!paused) {
    await clickSelector(page, '#playPauseButton', { delayAfterMs: 300 });
  }
}

async function showPanels(page) {
  await hoverSelector(page, '#teacherModeButton');
  await hoverSelector(page, '#equationButton');
  await focusSelectors(page, ['#drawingPanel'], 12);
  await wait(page, 1200);
}

async function recordLesson(page) {
  console.log('Chapter 1: intro');
  await setCard(
    page,
    'Archimedes Principle In Action',
    'This live tutorial uses the real interactive to compare density, upthrust, apparent weight, and collected liquid.',
    'We will look at solution densities 0.6, 1.0, and 2.0, and one equal-density case.'
  );
  await clearFocus(page);
  await wait(page, 2200);

  console.log('Chapter 2: controls');
  await setCard(
    page,
    'Start With The Controls',
    'The three sliders change the solution density, the cube volume, and the cube mass.',
    'The checkboxes reveal the force arrows. Teacher and Eq show the explanation panels.'
  );
  await focusSelectors(page, ['#controls'], 12);
  await moveToSelector(page, '#rhoS', 850);
  await wait(page, 900);
  await moveToSelector(page, '#V2', 850);
  await wait(page, 700);
  await moveToSelector(page, '#M2', 850);
  await wait(page, 900);

  await clickSelector(page, '#weight', { delayAfterMs: 650 });
  await clickSelector(page, '#upthrust', { delayAfterMs: 650 });
  await wait(page, 500);

  await clickSelector(page, '#teacherModeButton', { delayAfterMs: 600 });
  await clickSelector(page, '#teacherModeButton', { delayAfterMs: 650 });
  await clickSelector(page, '#equationButton', { delayAfterMs: 600 });
  await clickSelector(page, '#equationButton', { delayAfterMs: 800 });
  await showPanels(page);

  console.log('Chapter 3: default rho 1.0');
  await setCard(
    page,
    'Case 1: Solution Density 1.0 g/cm^3',
    'The default cube density is 0.8 g/cm^3 because the mass is 800 g and the volume is 1000 cm^3.',
    'Since the solution is denser than the cube, the cube floats when upthrust balances its weight.'
  );
  await resetSim(page);
  await ensureTeacherAndEquationOn(page);
  await ensureCheckbox(page, 'weight.checkbox', true);
  await ensureCheckbox(page, 'upthrust.checkbox', true);
  await focusSelectors(page, ['#rhoS', '#M2', '#V2'], 14);
  await wait(page, 1100);
  await playUntilPause(page, 26000, 1600);
  await focusSelectors(page, ['#drawingPanel'], 10);
  await wait(page, 2400);

  console.log('Chapter 4: sink at rho 0.6');
  await setCard(
    page,
    'Case 2: Solution Density 0.6 g/cm^3',
    'Now the solution is less dense than the cube, so the buoyant force is weaker.',
    'Watch the lower scale grow as the cube sinks and finally rests at the bottom.'
  );
  await resetSim(page);
  await animateSlider(page, 'rhoS.slider', 0.6, { highlightSelector: '#rhoS', durationMs: 900, steps: 8 });
  await playUntilPause(page, 41000, 1700);
  await focusSelectors(page, ['#drawingPanel'], 10);
  await wait(page, 2800);

  console.log('Chapter 5: equal densities at 1.0');
  await setCard(
    page,
    'Case 3: Equal Densities At 1.0',
    'To make cube density equal to the solution, keep volume at 1000 cm^3 and move mass to 1000 g.',
    'When rho_solution equals rho_cube, the cube reaches neutral buoyancy and stays suspended.'
  );
  await resetSim(page);
  await animateSlider(page, 'rhoS.slider', 1.0, { highlightSelector: '#rhoS', durationMs: 800, steps: 8 });
  await animateSlider(page, 'M2.slider', 1000, { highlightSelector: '#M2', durationMs: 900, steps: 6 });
  await playUntilPause(page, 30000, 1700);
  await focusSelectors(page, ['#drawingPanel'], 10);
  await wait(page, 2600);

  console.log('Chapter 6: very dense solution at rho 2.0');
  await setCard(
    page,
    'Case 4: Solution Density 2.0 g/cm^3',
    'This time the solution is much denser than the cube, so the upthrust becomes strong very quickly.',
    'The cube rises to a higher floating position and the spring scale loses its load faster.'
  );
  await resetSim(page);
  await animateSlider(page, 'M2.slider', 800, { highlightSelector: '#M2', durationMs: 900, steps: 6 });
  await animateSlider(page, 'rhoS.slider', 2.0, { highlightSelector: '#rhoS', durationMs: 1100, steps: 10 });
  await playUntilPause(page, 18000, 1700);
  await focusSelectors(page, ['#drawingPanel'], 10);
  await wait(page, 2400);

  console.log('Chapter 7: recap');
  await setCard(
    page,
    'How To Use This Interactive Well',
    'First compare the two densities. Then turn on the force arrows, watch the pause points, and read the teacher and equation panels.',
    'If you have a question, leave a comment below. I will read the comments and try to answer them like a real teacher.'
  );
  await hoverSelector(page, '#weight');
  await hoverSelector(page, '#upthrust');
  await hoverSelector(page, '#teacherModeButton');
  await hoverSelector(page, '#equationButton');
  await wait(page, 3200);
  await pauseIfPlaying(page);
  await clearFocus(page);
  await wait(page, 1200);
}

async function main() {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: rawDir,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  await page.goto(simUrl, { waitUntil: 'load' });
  await wait(page, 2200);
  await installOverlay(page);
  await wait(page, 400);

  console.log('Recording lesson...');
  await recordLesson(page);

  const video = page.video();
  console.log('Finalizing recorded page...');
  await page.close();
  const sourceVideoPath = await video.path();
  console.log(`Playwright video saved to ${sourceVideoPath}`);
  await context.close();
  await browser.close();
  fs.copyFileSync(sourceVideoPath, recordingPath);

  fs.writeFileSync(
    metadataPath,
    JSON.stringify(
      {
        recordedAt: new Date().toISOString(),
        simUrl,
        recordingPath,
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(`Recorded live tutorial to ${recordingPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
