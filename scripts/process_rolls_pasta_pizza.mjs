import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processAll() {
  console.log('=== Processing Rolls, Pasta & Cheese Pizza ===');

  // 1. Zinger Roll Paratha
  console.log('1. Zinger Roll Paratha...');
  const zingerRollSrc = path.join(userMediaDir, 'media_1793625291872_b7624086.jpg');
  await sharp(fs.readFileSync(zingerRollSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'roll-zinger.jpg'));
  console.log('Saved roll-zinger.jpg');

  // Also set category thumbnail
  fs.copyFileSync(path.join(outputDir, 'roll-zinger.jpg'), path.join(outputDir, 'roll-paratha.jpg'));
  console.log('Saved roll-paratha.jpg category image');

  // 2. Mughlai Roll Paratha
  console.log('2. Mughlai Roll Paratha...');
  const mughlaiSrc = path.join(userMediaDir, 'media_1793625406031_1290c28e.jpg');
  await sharp(fs.readFileSync(mughlaiSrc))
    .resize(800, 800, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'roll-mughlai.jpg'));
  console.log('Saved roll-mughlai.jpg');

  // 3. Kabab Roll Paratha
  console.log('3. Kabab Roll Paratha...');
  const kababSrc = path.join(userMediaDir, 'media_1793625673349_b764394f.jpg');
  await sharp(fs.readFileSync(kababSrc))
    .resize(800, 800, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'roll-kabab.jpg'));
  console.log('Saved roll-kabab.jpg');

  // 4. Chapli Kabab Roll
  console.log('4. Chapli Kabab Roll...');
  const chapliSrc = path.join(userMediaDir, 'media_1793625849620_4babb1b3.jpg');
  await sharp(fs.readFileSync(chapliSrc))
    .resize(800, 800, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'roll-chapli.jpg'));
  console.log('Saved roll-chapli.jpg');

  // 5. Creamy Melt Roll (remove bottom right Meta AI watermark)
  console.log('5. Creamy Melt Roll (Inpainting Meta AI watermark)...');
  const creamySrc = path.join(userMediaDir, 'media_1793626258672_513e00b9.jpg');
  const woodPatch = await sharp(fs.readFileSync(creamySrc))
    .extract({ left: 680, top: 642, width: 160, height: 38 })
    .toBuffer();

  await sharp(fs.readFileSync(creamySrc))
    .composite([
      { input: woodPatch, left: 860, top: 642 }
    ])
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'roll-creamy.jpg'));
  console.log('Saved roll-creamy.jpg (clean, no watermark)');

  // 6. Cheese Bites Special Paratha (From Link)
  console.log('6. Cheese Bites Special Paratha...');
  const specialRollSrc = 'scripts/tmp_roll.jpg';
  if (fs.existsSync(specialRollSrc)) {
    await sharp(fs.readFileSync(specialRollSrc))
      .resize(800, 800, { kernel: 'lanczos3' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'roll-cheese-bites-special.jpg'));
    console.log('Saved roll-cheese-bites-special.jpg');
  }

  // 7. Alfredo Pasta (From Google Share Link)
  console.log('7. Alfredo Pasta...');
  const pastaSrc = 'scripts/tmp_pasta.webp';
  if (fs.existsSync(pastaSrc)) {
    await sharp(fs.readFileSync(pastaSrc))
      .resize(800, 800, { kernel: 'lanczos3' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pasta-alfredo.jpg'));
    console.log('Saved pasta-alfredo.jpg');

    fs.copyFileSync(path.join(outputDir, 'pasta-alfredo.jpg'), path.join(outputDir, 'pasta.jpg'));
    console.log('Saved pasta.jpg category image');
  }

  // 8. Cheese Pizza (From Crossroads Bing link)
  console.log('8. Cheese Pizza...');
  const cheeseSrc = 'scripts/tmp_pizza.png';
  if (fs.existsSync(cheeseSrc)) {
    // 750x500 is 3:2. Pad slightly or frame to 4:3 (800x600) with dark background
    const buf = fs.readFileSync(cheeseSrc);
    const meta = await sharp(buf).metadata();
    const resized = await sharp(buf).resize({ width: 800 }).toBuffer();
    const rMeta = await sharp(resized).metadata();
    const padTop = Math.floor((600 - rMeta.height) / 2);
    const padBottom = 600 - rMeta.height - padTop;

    await sharp(resized)
      .extend({
        top: padTop,
        bottom: padBottom,
        left: 0,
        right: 0,
        background: '#0c0d14'
      })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pizza-cheese.jpg'));
    console.log('Saved framed 4:3 pizza-cheese.jpg');
  }

  // Clean up temp files
  try {
    if (fs.existsSync('scripts/tmp_pasta.webp')) fs.unlinkSync('scripts/tmp_pasta.webp');
    if (fs.existsSync('scripts/tmp_roll.jpg')) fs.unlinkSync('scripts/tmp_roll.jpg');
    if (fs.existsSync('scripts/tmp_pizza.png')) fs.unlinkSync('scripts/tmp_pizza.png');
  } catch (e) {}

  console.log('All processed successfully!');
}

processAll().catch(err => {
  console.error(err);
  process.exit(1);
});

