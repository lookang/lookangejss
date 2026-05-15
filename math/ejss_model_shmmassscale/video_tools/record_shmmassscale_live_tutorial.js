const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const simDir = path.resolve(__dirname, '..');
const outputDir = path.join(simDir, 'video_output_live');
const rawDir = path.join(outputDir, 'raw');
const recordingPath = path.join(rawDir, 'shmmassscale_live_recording.webm');
const metadataPath = path.join(outputDir, 'live_recording_metadata.json');
const simUrl = 'file:///' + path.join(simDir, 'index.html').replace(/\\/g, '/');
const WAIT_SCALE = 1.55;

fs.mkdirSync(rawDir, { recursive: true });

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'msedge', headless: true });
  } catch (_error) {
    return await chromium.launch({ headless: true });
  }
}

async function wait(page, ms) {
  await page.waitForTimeout(Math.round(ms * WAIT_SCALE));
}

async function installOverlay(page) {
  await page.evaluate(() => {
    document.getElementById('codexLiveTutorialOverlay')?.remove();

    const style = document.createElement('style');
    style.id = 'codexLiveTutorialStyle';
    style.textContent = `
      #codexLiveTutorialOverlay {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        pointer-events: none;
        font-family: Georgia, "Times New Roman", serif;
      }
      #codexLiveTutorialCard {
        position: fixed;
        left: 28px;
        bottom: 34px;
        width: min(30vw, 560px);
        max-width: calc(100vw - 90px);
        padding: 18px 22px;
        border-radius: 20px;
        background: rgba(250, 245, 233, 0.92);
        border: 2px solid rgba(124, 91, 27, 0.22);
        box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);
        color: #2d1d10;
      }
      #codexLiveTutorialTitle {
        font-size: clamp(28px, 2vw, 40px);
        line-height: 1.15;
        font-weight: 700;
      }
      #codexLiveTutorialSubtitle {
        margin-top: 8px;
        font-size: clamp(18px, 1.15vw, 24px);
        line-height: 1.35;
      }
      #codexLiveTutorialFocus {
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
        transition: all 0.18s ease;
      }
      #codexLiveTutorialCursor {
        position: fixed;
        left: 80px;
        top: 930px;
        width: 54px;
        height: 72px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.28));
        transform: translate(-8px, -8px);
      }
      #codexLiveTutorialPulse {
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
      #codexLiveTutorialFooter {
        position: fixed;
        right: 28px;
        bottom: 28px;
        padding: 12px 18px;
        border-radius: 999px;
        background: rgba(255, 250, 240, 0.88);
        border: 1px solid rgba(112, 86, 38, 0.18);
        color: #4e351c;
        font-size: 18px;
      }
      @keyframes codexPulse {
        0% { transform: scale(0.7); opacity: 0.95; }
        100% { transform: scale(1.9); opacity: 0; }
      }
    `;

    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = 'codexLiveTutorialOverlay';
    root.innerHTML = `
      <div id="codexLiveTutorialCard">
        <div id="codexLiveTutorialTitle">Mass Scale Tutorial</div>
        <div id="codexLiveTutorialSubtitle">Using the interactive calmly and productively</div>
      </div>
      <div id="codexLiveTutorialFocus"></div>
      <div id="codexLiveTutorialPulse"></div>
      <div id="codexLiveTutorialCursor">
        <svg viewBox="0 0 42 56" width="54" height="72" aria-hidden="true">
          <path d="M4 3 L32 31 L22 33 L28 51 L20 54 L14 36 L6 43 Z"
            fill="#ffffff" stroke="#111111" stroke-width="3" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div id="codexLiveTutorialFooter">Use still mode first. Then use hints, replay, and reset for practice.</div>
    `;

    document.body.appendChild(root);
  });
}

async function setCard(page, title, subtitle, footer) {
  await page.evaluate(({ titleText, subtitleText, footerText }) => {
    const title = document.getElementById('codexLiveTutorialTitle');
    const subtitle = document.getElementById('codexLiveTutorialSubtitle');
    const footerNode = document.getElementById('codexLiveTutorialFooter');
    if (title) title.textContent = titleText;
    if (subtitle) subtitle.textContent = subtitleText;
    if (footerNode) footerNode.textContent = footerText;
  }, {
    titleText: title,
    subtitleText: subtitle,
    footerText: footer,
  });
}

async function setCursor(page, x, y) {
  await page.evaluate(({ xPos, yPos }) => {
    const cursor = document.getElementById('codexLiveTutorialCursor');
    if (!cursor) return;
    cursor.style.left = `${xPos}px`;
    cursor.style.top = `${yPos}px`;
  }, { xPos: x, yPos: y });
}

async function triggerPulse(page, x, y) {
  await page.evaluate(({ xPos, yPos }) => {
    const pulse = document.getElementById('codexLiveTutorialPulse');
    if (!pulse) return;
    pulse.style.left = `${xPos - 11}px`;
    pulse.style.top = `${yPos - 11}px`;
    pulse.style.opacity = '1';
    pulse.style.animation = 'none';
    pulse.getBoundingClientRect();
    pulse.style.animation = 'codexPulse 0.6s ease-out forwards';
  }, { xPos: x, yPos: y });
}

async function clearFocus(page) {
  await page.evaluate(() => {
    const focus = document.getElementById('codexLiveTutorialFocus');
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
    const focus = document.getElementById('codexLiveTutorialFocus');
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
    const cursor = document.getElementById('codexLiveTutorialCursor');
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

  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
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

async function selectOption(page, selector, label) {
  await focusSelectors(page, [selector]);
  await moveToSelector(page, selector, 700);
  await triggerPulse(page, ...(Object.values(await getCenterForSelector(page, selector))));
  await page.locator(selector).selectOption({ label });
  await wait(page, 900);
}

async function setExactReading(page, options) {
  if (options.scaleLabel) {
    await selectOption(page, '#comboBox', options.scaleLabel);
  }

  await page.evaluate((config) => {
    const state = JSON.parse(_model.serialize());
    const max = config.scaleType === 1 ? 1 : (config.scaleType === 4 ? 4 : 5);
    const decimal = config.scaleType === 5 ? 1 : 2;

    state.model.scaletype = config.scaleType;
    state.model.decimal = decimal;
    state.model.gramshow = config.gramshow;
    state.model.massscaleo = config.massKg;
    state.model.massscale = config.massKg;
    state.model.thetao = 2 * Math.PI - (config.massKg / max) * (2 * Math.PI);
    state.model.theta = config.stillMode ? state.model.thetao : 2 * Math.PI;
    state.model.stillMode = config.stillMode;
    state.model.disabled = config.stillMode;
    state.model.omega = 0;
    state.model.alpha = 0;
    state.model.hintStage = 0;
    state.model.answershow = false;
    state.model.showAnswerFlag = false;
    state.model.justRevealedAnswer = false;
    state.model.counter = 0;
    state.model.functionY = '';
    state.model.K1fcorrect = '';
    state.model.K1fcorrectbackground = 'rgba(255,255,255,255)';
    state.model.text = config.stillMode
      ? 'Read the scale and enter your answer.'
      : 'Watch the pointer settle, then read the scale.';

    _model.unserialize(JSON.stringify(state));
  }, options);

  await wait(page, options.stillMode ? 600 : 3800);
}

async function applyHintStage(page, count, pauseMs = 1800) {
  for (let i = 0; i < count; i++) {
    await clickSelector(page, '#hintButton', { delayAfterMs: pauseMs });
  }
}

async function typeAnswer(page, value) {
  await clickSelector(page, '#answer', { delayAfterMs: 500 });
  await focusSelectors(page, ['#fField']);
  await moveToSelector(page, '#fField', 500);
  await triggerPulse(page, ...(Object.values(await getCenterForSelector(page, '#fField'))));
  await page.locator('#fField').click({ force: true });
  await wait(page, 250);
  if (value) {
    await page.locator('#fField').fill('');
    await page.keyboard.type(value, { delay: 160 });
    await wait(page, 1600);
  }
}

async function showDialFocus(page) {
  await focusSelectors(page, ['#theta', '#shapedrag'], 26);
  await moveToSelector(page, '#shapedrag', 800, 0, -8);
}

async function recordLesson(page) {
  console.log('Chapter 1: interface overview');
  await setCard(
    page,
    'Learn The Scale Calmly',
    'We will use still mode, hints, replay, and reset in a student-friendly way.',
    'Start with the 1.00 kg face and answer in grams first.'
  );
  await clearFocus(page);
  await wait(page, 2400);

  await focusSelectors(page, ['#comboBox']);
  await moveToSelector(page, '#comboBox', 900);
  await wait(page, 1500);
  await focusSelectors(page, ['#g']);
  await moveToSelector(page, '#g', 800);
  await wait(page, 1500);
  await focusSelectors(page, ['#hintButton']);
  await moveToSelector(page, '#hintButton', 800);
  await wait(page, 1200);
  await focusSelectors(page, ['#modeButton']);
  await moveToSelector(page, '#modeButton', 700);
  await wait(page, 1200);
  await focusSelectors(page, ['#userreset']);
  await moveToSelector(page, '#userreset', 700);
  await wait(page, 1200);
  await focusSelectors(page, ['#resetButton2']);
  await moveToSelector(page, '#resetButton2', 700);
  await wait(page, 1600);

  console.log('Chapter 2: one kilogram reading');
  await setCard(
    page,
    'Step 1: Begin With One Scale',
    'Use the 1.00 kg face first so each small division is easier to understand.',
    'Look at the pointer before touching the answer controls.'
  );
  await setExactReading(page, {
    scaleLabel: '1.00 kg',
    scaleType: 1,
    massKg: 0.14,
    gramshow: true,
    stillMode: false,
  });
  await showDialFocus(page);
  await wait(page, 3600);

  console.log('Chapter 3: still mode');
  await setCard(
    page,
    'Step 2: Freeze The Reading',
    'Still mode lowers cognitive load because the answer stays in one place.',
    'Notice that the pointer is just past one hundred grams.'
  );
  await clickSelector(page, '#modeButton', { delayAfterMs: 800 });
  await showDialFocus(page);
  await wait(page, 5200);

  console.log('Chapter 4: answer entry');
  await setCard(
    page,
    'Step 3: Enter An Answer',
    'Students can use the dropdown, or click question equals to type their answer.',
    'Typing is useful once the child is ready to answer independently.'
  );
  await typeAnswer(page, '');
  await wait(page, 3800);

  console.log('Chapter 5: hints');
  await setCard(
    page,
    'Step 4: Use Hints Productively',
    'Try to answer first. Use Hint only when the student needs the next thinking step.',
    'Hint one checks the range. Hint two checks the value of each small division.'
  );
  await applyHintStage(page, 1, 1900);
  await wait(page, 4400);
  await showDialFocus(page);
  await applyHintStage(page, 1, 1900);
  await wait(page, 6200);
  await applyHintStage(page, 1, 1900);
  await wait(page, 3400);

  console.log('Chapter 6: unit comparison');
  await setCard(
    page,
    'Step 5: Compare Units',
    'The mass does not change. Only the unit and the way we write the number changes.',
    'One hundred forty grams is the same as zero point one four kilograms.'
  );
  await clickSelector(page, '#g', { delayAfterMs: 900 });
  await showDialFocus(page);
  await wait(page, 6200);
  await wait(page, 3000);

  console.log('Chapter 7: replay');
  await setCard(
    page,
    'Step 6: Replay The Same Reading',
    'Replay helps students watch the same reading again without changing the question.',
    'Use replay when a child wants to inspect the pointer movement one more time.'
  );
  await clickSelector(page, '#modeButton', { delayAfterMs: 900 });
  await clickSelector(page, '#userreset', { delayAfterMs: 900 });
  await wait(page, 7600);
  await clickSelector(page, '#modeButton', { delayAfterMs: 900 });
  await wait(page, 2000);

  console.log('Chapter 8: reset');
  await setCard(
    page,
    'Step 7: Reset For New Practice',
    'Reset keeps the same scale face but gives a new reading to solve.',
    'This is good for quick independent practice with the same difficulty.'
  );
  await clickSelector(page, '#resetButton2', { delayAfterMs: 1200 });
  await showDialFocus(page);
  await wait(page, 6200);

  console.log('Chapter 9: four kilogram face');
  await setCard(
    page,
    'Step 8: Move To The 4.00 kg Face',
    'Now each small division is worth fifty grams, or zero point zero five kilograms.',
    'Teach the child to work out the division value before counting.'
  );
  await setExactReading(page, {
    scaleLabel: '4.00 kg',
    scaleType: 4,
    massKg: 1.25,
    gramshow: false,
    stillMode: true,
  });
  await focusSelectors(page, ['#kg']);
  await moveToSelector(page, '#kg', 700);
  await showDialFocus(page);
  await wait(page, 7800);
  await applyHintStage(page, 2, 1800);
  await wait(page, 5200);

  console.log('Chapter 10: five kilogram face');
  await setCard(
    page,
    'Step 9: Move To The 5.0 kg Face',
    'On this face, each small division is one hundred grams, or zero point one kilograms.',
    'This is a good point to ask the student to say the division value aloud.'
  );
  await setExactReading(page, {
    scaleLabel: '5.0 kg',
    scaleType: 5,
    massKg: 2.3,
    gramshow: false,
    stillMode: true,
  });
  await showDialFocus(page);
  await wait(page, 7800);
  await applyHintStage(page, 2, 1800);
  await wait(page, 5200);

  console.log('Chapter 11: everyday object');
  await setCard(
    page,
    'Step 10: Try An Everyday Object',
    'Object examples make scale reading more meaningful because students can estimate first.',
    'Ask for a guess before showing the answer.'
  );
  await selectOption(page, '#comboBox', 'apple');
  await showDialFocus(page);
  await wait(page, 6200);
  await applyHintStage(page, 3, 1700);
  await wait(page, 4200);

  console.log('Chapter 12: recap');
  await setCard(
    page,
    'A Simple Practice Routine',
    'Choose one scale face, read in grams first, use hints sparingly, then replay or reset.',
    'Range, division value, count to the pointer, and write the correct unit.'
  );
  await setExactReading(page, {
    scaleLabel: '1.00 kg',
    scaleType: 1,
    massKg: 0.14,
    gramshow: true,
    stillMode: true,
  });
  await focusSelectors(page, ['#comboBox']);
  await moveToSelector(page, '#comboBox', 650);
  await wait(page, 1800);
  await focusSelectors(page, ['#hintButton']);
  await moveToSelector(page, '#hintButton', 650);
  await wait(page, 1800);
  await focusSelectors(page, ['#userreset']);
  await moveToSelector(page, '#userreset', 650);
  await wait(page, 1800);
  await focusSelectors(page, ['#resetButton2']);
  await moveToSelector(page, '#resetButton2', 650);
  await wait(page, 2200);
  await showDialFocus(page);
  await wait(page, 6200);
  await clearFocus(page);
  await wait(page, 2200);
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
  await wait(page, 1800);
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
