const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const simDir = path.resolve(__dirname, '..');
const outputDir = path.join(simDir, 'video_output');
const screensDir = path.join(outputDir, 'screens');
const manifestPath = path.join(outputDir, 'scene_manifest.json');

fs.mkdirSync(screensDir, { recursive: true });

const simUrl = 'file:///' + path.join(simDir, 'index.html').replace(/\\/g, '/');

const scenes = [
  {
    slug: '01_intro',
    title: 'How To Read A Mass Scale',
    subtitle: 'A guided walkthrough of the interactive controls',
    narration: 'In this video, we will learn how to read a mass scale, switch between grams and kilograms, and use the interactive buttons with confidence.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true });
      await showFocus(page, ['#shapedrag']);
    },
  },
  {
    slug: '02_read_the_pointer',
    title: 'Start With The Pointer',
    subtitle: 'Read the value where the blue pointer lands',
    narration: 'Always begin by looking at where the blue pointer lands. On this one kilogram scale face, the pointer is between one hundred grams and two hundred grams.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true });
      await showFocus(page, ['#theta', '#shapedrag']);
    },
  },
  {
    slug: '03_answer_menu',
    title: 'Choose Or Type The Answer',
    subtitle: 'Use the answer menu, or click question equals to type',
    narration: 'You can answer with the dropdown menu, or click the question equals button to switch to typing with the keyboard.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true });
      await page.locator('#answer').click();
      await page.waitForTimeout(350);
      await showFocus(page, ['#answer', '#fField']);
    },
  },
  {
    slug: '04_hint_one',
    title: 'Hint One',
    subtitle: 'First identify the scale range and the unit',
    narration: 'Hint one reminds students to identify the full scale range first, and then check whether they should answer in grams or kilograms.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true, hintStage: 1 });
      await showFocus(page, ['#hintButton']);
    },
  },
  {
    slug: '05_hint_two',
    title: 'Hint Two',
    subtitle: 'Work out the value of each small division',
    narration: 'Hint two is the key teaching step. On this scale, each small division is worth twenty grams, so students count up in equal steps from the nearest labelled mark.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true, hintStage: 2 });
      await showFocus(page, ['#hintButton', '#theta', '#shapedrag']);
    },
  },
  {
    slug: '06_same_mass_kg',
    title: 'Same Mass, Different Unit',
    subtitle: 'One hundred forty grams is zero point one four kilograms',
    narration: 'The mass does not change when the unit changes. One hundred forty grams is the same as zero point one four kilograms.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: false, stillMode: true, hintStage: 3 });
      await showFocus(page, ['#kg']);
    },
  },
  {
    slug: '07_still_and_replay',
    title: 'Still Mode And Replay',
    subtitle: 'Freeze the reading, then replay the same mass again',
    narration: 'Still mode reduces cognitive load because the pointer jumps straight to the answer position. Replay is useful when students want to inspect the same reading one more time.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true });
      await showFocus(page, ['#modeButton']);
    },
  },
  {
    slug: '08_reset_new_question',
    title: 'Reset For A New Question',
    subtitle: 'Keep the same scale face and generate a fresh reading',
    narration: 'Use Reset when you want a new question on the current scale face. This makes quick practice easy without changing the overall difficulty.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true });
      await showFocus(page, ['#resetButton2']);
    },
  },
  {
    slug: '09_scale_face_four',
    title: 'The Four Kilogram Scale Face',
    subtitle: 'Each small division is zero point zero five kilograms or fifty grams',
    narration: 'On the four kilogram scale face, each small division is worth zero point zero five kilograms, or fifty grams. This reading shows one point two five kilograms.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '4.00 kg', scaleType: 4, massKg: 1.25, gramshow: false, stillMode: true, hintStage: 3 });
      await showFocus(page, ['#shapedrag']);
    },
  },
  {
    slug: '10_scale_face_five',
    title: 'The Five Kilogram Scale Face',
    subtitle: 'Each small division is zero point one kilograms or one hundred grams',
    narration: 'On the five kilogram scale face, each small division is worth zero point one kilograms, or one hundred grams. This reading shows two point three kilograms.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '5.0 kg', scaleType: 5, massKg: 2.3, gramshow: false, stillMode: true, hintStage: 3 });
      await showFocus(page, ['#shapedrag']);
    },
  },
  {
    slug: '11_everyday_object',
    title: 'Try An Everyday Object',
    subtitle: 'Estimate first, then reveal the answer',
    narration: 'The object examples make the reading more meaningful. Students can estimate the mass first, then reveal the answer and compare their thinking.',
    setup: async (page) => {
      await page.locator('#modeButton').click();
      await page.waitForTimeout(350);
      await page.locator('#comboBox').selectOption({ label: 'apple' });
      await page.waitForTimeout(900);
      await applyHintStage(page, 3);
      await showFocus(page, ['#comboBox']);
    },
  },
  {
    slug: '12_recap',
    title: 'A Reliable Reading Strategy',
    subtitle: 'Range, division value, then count to the pointer',
    narration: 'A reliable routine is simple. First identify the scale range. Next work out the value of each small division. Then count carefully to the pointer and write the answer with the correct unit.',
    setup: async (page) => {
      await setExactReading(page, { scaleLabel: '1.00 kg', scaleType: 1, massKg: 0.14, gramshow: true, stillMode: true, hintStage: 2 });
      await showFocus(page, ['#theta', '#shapedrag']);
    },
  },
];

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'msedge', headless: true });
  } catch (_err) {
    return await chromium.launch({ headless: true });
  }
}

async function openFreshSim(page) {
  await page.goto(simUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1400);
}

async function clearCaptureOverlay(page) {
  await page.evaluate(() => {
    document.getElementById('codexCaptureOverlayRoot')?.remove();
  });
}

async function showFocus(page, selectors) {
  await page.evaluate((selectorList) => {
    document.getElementById('codexCaptureOverlayRoot')?.remove();

    const elements = selectorList
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);

    if (!elements.length) return;

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

    const pad = 16;
    left -= pad;
    top -= pad;
    right += pad;
    bottom += pad;

    const width = right - left;
    const height = bottom - top;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const root = document.createElement('div');
    root.id = 'codexCaptureOverlayRoot';
    root.style.position = 'fixed';
    root.style.inset = '0';
    root.style.pointerEvents = 'none';
    root.style.zIndex = '999999';

    const ring = document.createElement('div');
    ring.style.position = 'fixed';
    ring.style.left = `${left}px`;
    ring.style.top = `${top}px`;
    ring.style.width = `${width}px`;
    ring.style.height = `${height}px`;
    ring.style.borderRadius = '18px';
    ring.style.border = '4px solid rgba(255, 193, 7, 0.98)';
    ring.style.background = 'rgba(255, 235, 59, 0.14)';
    ring.style.boxShadow = '0 0 0 10px rgba(255, 235, 59, 0.12)';

    const pulse = document.createElement('div');
    pulse.style.position = 'fixed';
    pulse.style.left = `${centerX - 11}px`;
    pulse.style.top = `${centerY - 11}px`;
    pulse.style.width = '22px';
    pulse.style.height = '22px';
    pulse.style.borderRadius = '999px';
    pulse.style.background = 'rgba(255, 87, 34, 0.9)';
    pulse.style.boxShadow = '0 0 0 8px rgba(255, 87, 34, 0.18)';

    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = `${Math.max(20, left - 6)}px`;
    cursor.style.top = `${Math.max(20, top - 42)}px`;
    cursor.style.width = '42px';
    cursor.style.height = '56px';
    cursor.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.28))';
    cursor.innerHTML = `
      <svg viewBox="0 0 42 56" width="42" height="56" aria-hidden="true">
        <path d="M4 3 L32 31 L22 33 L28 51 L20 54 L14 36 L6 43 Z"
          fill="#ffffff" stroke="#111111" stroke-width="3" stroke-linejoin="round"/>
      </svg>
    `;

    root.appendChild(ring);
    root.appendChild(pulse);
    root.appendChild(cursor);
    document.body.appendChild(root);
  }, selectors);
}

async function selectScale(page, label) {
  await page.locator('#comboBox').selectOption({ label });
  await page.waitForTimeout(900);
}

async function setExactReading(page, options) {
  await selectScale(page, options.scaleLabel);

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

  await page.waitForTimeout(450);

  if (options.hintStage) {
    await applyHintStage(page, options.hintStage);
  }
}

async function applyHintStage(page, count) {
  for (let i = 0; i < count; i++) {
    await page.locator('#hintButton').click();
    await page.waitForTimeout(260);
  }
}

async function main() {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const manifest = [];

  for (const scene of scenes) {
    await openFreshSim(page);
    await clearCaptureOverlay(page);
    await scene.setup(page);
    await page.waitForTimeout(150);
    const screenshotPath = path.join(screensDir, `${scene.slug}.png`);
    await page.screenshot({ path: screenshotPath, type: 'png' });
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
