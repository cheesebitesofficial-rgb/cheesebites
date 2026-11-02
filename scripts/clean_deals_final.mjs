import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processBigFlex() {
  console.log('--- Processing The Big Flex ---');
  const bigFlexSrc = path.join(userMediaDir, 'media_1793596972792_6bf73b09.jpg');
  const bigFlexBuf = fs.readFileSync(bigFlexSrc);
  
  await sharp(bigFlexBuf)
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-20-two-xl-pizzas-pasta.jpg'));

  const realDir = path.resolve('public/images/real');
  if (fs.existsSync(realDir)) {
    fs.copyFileSync(
      path.join(outputDir, 'deal-20-two-xl-pizzas-pasta.jpg'),
      path.join(realDir, 'deal-20.jpg')
    );
  }
  console.log('Saved Big Flex image to deal-20-two-xl-pizzas-pasta.jpg and deal-20.jpg');
}

async function cleanOffer1() {
  console.log('--- Cleaning Deal 1 / Special Offer 1 Text ---');
  const src1 = path.join(userMediaDir, 'media_1793553575576_becb870a.jpg');
  const buf1 = fs.readFileSync(src1);

  // In Offer 1 (1024x682):
  // Clean background patch from top left (x: 0..420, y: 0..160)
  // We extract a 420x150 patch, resize to 430x380, and blur
  const patchW = 430;
  const patchH = 380;
  
  const maskSvg = `<svg width="${patchW}" height="${patchH}">
    <defs>
      <linearGradient id="fadeH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="white"/>
        <stop offset="85%" stop-color="white"/>
        <stop offset="100%" stop-color="black"/>
      </linearGradient>
      <linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="white"/>
        <stop offset="90%" stop-color="white"/>
        <stop offset="100%" stop-color="black"/>
      </linearGradient>
    </defs>
    <rect width="${patchW}" height="${patchH}" fill="url(#fadeH)"/>
    <rect width="${patchW}" height="${patchH}" fill="url(#fadeV)" style="mix-blend-mode: multiply;"/>
  </svg>`;

  const topPatch = await sharp(buf1)
    .extract({ left: 0, top: 0, width: 420, height: 160 })
    .resize(patchW, patchH, { fit: 'fill' })
    .blur(18)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Bottom table wood patch for "Cheese Bites" sticker (x: 20..320, y: 520..630)
  const tablePatchW = 340;
  const tablePatchH = 120;
  const tableMaskSvg = `<svg width="${tablePatchW}" height="${tablePatchH}">
    <defs>
      <radialGradient id="rad" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stop-color="white"/>
        <stop offset="100%" stop-color="black"/>
      </radialGradient>
    </defs>
    <rect width="${tablePatchW}" height="${tablePatchH}" fill="url(#rad)"/>
  </svg>`;

  const tablePatch = await sharp(buf1)
    .extract({ left: 0, top: 560, width: 340, height: 120 })
    .resize(tablePatchW, tablePatchH, { fit: 'fill' })
    .blur(14)
    .composite([{ input: Buffer.from(tableMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(buf1)
    .composite([
      { input: topPatch, left: 0, top: 160 },
      { input: tablePatch, left: 10, top: 515 }
    ])
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-medium-two-pizzas.jpg'));

  console.log('Saved cleaned deal-duo-medium-two-pizzas.jpg');
}

async function cleanOffer2() {
  console.log('--- Cleaning Deal 2 / Special Offer 2 Text ---');
  const src2 = path.join(userMediaDir, 'media_1793553575577_d64783f0.jpg');
  const buf2 = fs.readFileSync(src2);

  // In Offer 2 (1024x682):
  // Upper text zone: x: 520..1024, y: 20..500
  const patchW = 504;
  const patchH = 480;

  const maskSvg = `<svg width="${patchW}" height="${patchH}">
    <defs>
      <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="black"/>
        <stop offset="15%" stop-color="white"/>
        <stop offset="100%" stop-color="white"/>
      </linearGradient>
      <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="white"/>
        <stop offset="85%" stop-color="white"/>
        <stop offset="100%" stop-color="black"/>
      </linearGradient>
    </defs>
    <rect width="${patchW}" height="${patchH}" fill="url(#fadeLeft)"/>
    <rect width="${patchW}" height="${patchH}" fill="url(#fadeBottom)" style="mix-blend-mode: multiply;"/>
  </svg>`;

  const topBokehPatch = await sharp(buf2)
    .extract({ left: 750, top: 0, width: 274, height: 100 })
    .resize(patchW, patchH, { fit: 'fill' })
    .blur(22)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Bottom table patch for "Grab This Amazing Deal" bubble (x: 700..1024, y: 500..670)
  const tablePatchW = 340;
  const tablePatchH = 175;
  const tableMask = `<svg width="${tablePatchW}" height="${tablePatchH}">
    <defs>
      <linearGradient id="fadeT" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="black"/>
        <stop offset="18%" stop-color="white"/>
        <stop offset="100%" stop-color="white"/>
      </linearGradient>
    </defs>
    <rect width="${tablePatchW}" height="${tablePatchH}" fill="url(#fadeT)"/>
  </svg>`;

  const tablePatch = await sharp(buf2)
    .extract({ left: 0, top: 520, width: 340, height: 160 })
    .resize(tablePatchW, tablePatchH, { fit: 'fill' })
    .blur(16)
    .composite([{ input: Buffer.from(tableMask), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(buf2)
    .composite([
      { input: topBokehPatch, left: 520, top: 20 },
      { input: tablePatch, left: 684, top: 500 }
    ])
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-large-two-pizzas.jpg'));

  console.log('Saved cleaned deal-duo-large-two-pizzas.jpg');
}

async function main() {
  await processBigFlex();
  await cleanOffer1();
  await cleanOffer2();
  console.log('All updates completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

