import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

// Helper to create a dark restaurant wooden tabletop texture buffer
async function createDarkTableBackground(width, height) {
  // SVG gradient with subtle wood-like dark tones (#110d0a to #1c1510) with warm ambient glow
  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tableGlow" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#2a2018" stop-opacity="1"/>
        <stop offset="45%" stop-color="#19130e" stop-opacity="1"/>
        <stop offset="85%" stop-color="#0e0b08" stop-opacity="1"/>
        <stop offset="100%" stop-color="#060504" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="warmSpot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff9900" stop-opacity="0.08"/>
        <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#tableGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#warmSpot)"/>
  </svg>
  `;
  return Buffer.from(svg);
}

async function run() {
  console.log('=== Processing All Pizzas ===');

  // -------------------------------------------------------------
  // 1. BEHARI KABAB PIZZA (Change white background to dark wood)
  // -------------------------------------------------------------
  console.log('1. Behari Kabab Pizza...');
  const behariSrc = path.join(userMediaDir, 'media_1793619009886_c49ea616.jpg');
  const behariRaw = await sharp(fs.readFileSync(behariSrc)).raw().toBuffer({ resolveWithObject: true });
  const bW = behariRaw.info.width;
  const bH = behariRaw.info.height;

  // Flood fill from corners to find white background
  const bIsBg = new Uint8Array(bW * bH);
  const bQueue = [
    [0, 0], [bW - 1, 0], [0, bH - 1], [bW - 1, bH - 1],
    [Math.floor(bW / 2), 0], [0, Math.floor(bH / 2)], [bW - 1, Math.floor(bH / 2)]
  ];
  for (const [qx, qy] of bQueue) bIsBg[qy * bW + qx] = 1;
  let bHead = 0;
  while (bHead < bQueue.length) {
    const [x, y] = bQueue[bHead++];
    const nbrs = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (const [nx, ny] of nbrs) {
      if (nx >= 0 && nx < bW && ny >= 0 && ny < bH) {
        const idx = ny * bW + nx;
        if (!bIsBg[idx]) {
          const pi = idx * 3;
          const r = behariRaw.data[pi], g = behariRaw.data[pi + 1], b = behariRaw.data[pi + 2];
          // Near white check
          if (r > 238 && g > 238 && b > 238) {
            bIsBg[idx] = 1;
            bQueue.push([nx, ny]);
          }
        }
      }
    }
  }

  // Create RGBA buffer: 0 alpha for background, 255 for pizza/wood
  const behariRgba = Buffer.alloc(bW * bH * 4);
  for (let i = 0; i < bW * bH; i++) {
    const pi = i * 3;
    const po = i * 4;
    behariRgba[po] = behariRaw.data[pi];
    behariRgba[po + 1] = behariRaw.data[pi + 1];
    behariRgba[po + 2] = behariRaw.data[pi + 2];
    behariRgba[po + 3] = bIsBg[i] ? 0 : 255;
  }

  // Soft feathering on edges of alpha
  const behariPng = await sharp(behariRgba, { raw: { width: bW, height: bH, channels: 4 } })
    .png()
    .toBuffer();

  const darkBg1 = await createDarkTableBackground(bW, bH);
  await sharp(darkBg1)
    .composite([
      { input: behariPng, blend: 'over' }
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-behari-kabab.jpg'));
  console.log('Saved pizza-behari-kabab.jpg with dark background!');

  // -------------------------------------------------------------
  // 2. CREAMY MELT PIZZA
  // -------------------------------------------------------------
  console.log('2. Creamy Melt Pizza...');
  const creamSrc = path.join(userMediaDir, 'media_1793619156335_5bc7681e.jpg');
  await sharp(fs.readFileSync(creamSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-cream-melt.jpg'));
  console.log('Saved pizza-cream-melt.jpg');

  // -------------------------------------------------------------
  // 3. MALAI BOTI PIZZA (Replace red background outside platter)
  // -------------------------------------------------------------
  console.log('3. Malai Boti Pizza...');
  const malaiSrc = path.join(userMediaDir, 'media_1793619750937_3e2e7a39.jpg');
  const malaiRaw = await sharp(fs.readFileSync(malaiSrc)).raw().toBuffer({ resolveWithObject: true });
  const mW = malaiRaw.info.width;
  const mH = malaiRaw.info.height;

  // Flood fill from borders to identify red background
  const mIsBg = new Uint8Array(mW * mH);
  const mQueue = [
    [0, 0], [mW - 1, 0], [0, mH - 1], [mW - 1, mH - 1],
    [Math.floor(mW / 2), 0], [0, Math.floor(mH / 2)], [mW - 1, Math.floor(mH / 2)], [Math.floor(mW / 2), mH - 1]
  ];
  for (const [qx, qy] of mQueue) mIsBg[qy * mW + qx] = 1;
  let mHead = 0;
  while (mHead < mQueue.length) {
    const [x, y] = mQueue[mHead++];
    const nbrs = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (const [nx, ny] of nbrs) {
      if (nx >= 0 && nx < mW && ny >= 0 && ny < mH) {
        const idx = ny * mW + nx;
        if (!mIsBg[idx]) {
          const pi = idx * 3;
          const r = malaiRaw.data[pi], g = malaiRaw.data[pi + 1], b = malaiRaw.data[pi + 2];
          // Red check: red channel is clearly dominant
          if (r > 90 && (r - g > 35) && (r - b > 35)) {
            mIsBg[idx] = 1;
            mQueue.push([nx, ny]);
          }
        }
      }
    }
  }

  // Create RGBA for Malai Boti
  const malaiRgba = Buffer.alloc(mW * mH * 4);
  for (let i = 0; i < mW * mH; i++) {
    const pi = i * 3;
    const po = i * 4;
    malaiRgba[po] = malaiRaw.data[pi];
    malaiRgba[po + 1] = malaiRaw.data[pi + 1];
    malaiRgba[po + 2] = malaiRaw.data[pi + 2];
    malaiRgba[po + 3] = mIsBg[i] ? 0 : 255;
  }

  const malaiPng = await sharp(malaiRgba, { raw: { width: mW, height: mH, channels: 4 } })
    .png()
    .toBuffer();

  // Create high-res 800x800 dark restaurant background
  const outW = 800, outH = 800;
  const darkBg3 = await createDarkTableBackground(outW, outH);
  
  // Resize malaiPng cleanly to 700x700
  const malaiResized = await sharp(malaiPng)
    .resize(700, 700, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(darkBg3)
    .composite([
      { input: malaiResized, gravity: 'center', blend: 'over' }
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-malai-boti.jpg'));
  console.log('Saved pizza-malai-boti.jpg with dark background!');

  // -------------------------------------------------------------
  // 4. CROWN CRUST PIZZA
  // -------------------------------------------------------------
  console.log('4. Crown Crust Pizza...');
  const crownSrc = path.join(userMediaDir, 'media_1793619951865_aa370e61.jpg');
  await sharp(fs.readFileSync(crownSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-crown-crust.jpg'));

  if (fs.existsSync('public/images/real')) {
    fs.copyFileSync(
      path.join(outputDir, 'pizza-crown-crust.jpg'),
      'public/images/real/crown-crust-pizza.jpg'
    );
  }
  console.log('Saved pizza-crown-crust.jpg');

  // -------------------------------------------------------------
  // 5. SPECIAL PIZZA (Cheese Bites Special Pizza)
  // -------------------------------------------------------------
  console.log('5. Special Pizza...');
  const specialSrc = path.join(userMediaDir, 'media_1793620184424_ff9b983e.jpg');
  await sharp(fs.readFileSync(specialSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-cheese-bites-special.jpg'));
  console.log('Saved pizza-cheese-bites-special.jpg');

  // -------------------------------------------------------------
  // 6. FIX PIZZA 1 & 2 CROPPING (Veggie Max & Cheese Pizza)
  // -------------------------------------------------------------
  console.log('6. Ensuring Pizza 1 (Vegie Max) & Pizza 2 (Cheese) are framed in 4:3 with ZERO crop...');
  
  // Veggie Max: Source is 1020x1024. Remove text, then pad horizontally to 4:3 (1365x1024)
  const veggieSrc = path.join(userMediaDir, 'media_1793550080653_47045e2f.jpg');
  const woodPatch = await sharp(fs.readFileSync(veggieSrc))
    .extract({ left: 420, top: 15, width: 400, height: 160 })
    .toBuffer();

  const veggieClean = await sharp(fs.readFileSync(veggieSrc))
    .composite([{ input: woodPatch, left: 15, top: 15 }])
    .toBuffer();

  // Resize veggieClean to 800x800 and pad onto a 1066x800 (4:3) dark wood background
  const veggiePadded = await sharp(veggieClean)
    .resize(780, 780, { fit: 'contain' })
    .toBuffer();

  const darkBgVeggie = await createDarkTableBackground(1040, 780);
  await sharp(darkBgVeggie)
    .composite([{ input: veggiePadded, gravity: 'center' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-veggie-max.jpg'));
  console.log('Saved framed 4:3 pizza-veggie-max.jpg (NO CROP)!');

  // Cheese Pizza: Source is 768x528 (1.45:1). Fit cleanly inside 4:3 without cropping
  const cheeseSrc = path.join(userMediaDir, 'media_1793550014667_a349b302.jpg');
  const cheeseResized = await sharp(fs.readFileSync(cheeseSrc))
    .resize(800, 550, { fit: 'contain' })
    .toBuffer();

  const darkBgCheese = await createDarkTableBackground(800, 600);
  await sharp(darkBgCheese)
    .composite([{ input: cheeseResized, gravity: 'center' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-cheese.jpg'));
  console.log('Saved framed 4:3 pizza-cheese.jpg (NO CROP)!');

  console.log('All pizzas processed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

