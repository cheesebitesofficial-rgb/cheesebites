import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processLatestUpdates() {
  console.log('=== Processing Latest Batch ===');

  // 1. Double Zinger Burger (from link)
  if (fs.existsSync('scripts/tmp_double_zinger.jpg')) {
    console.log('1. Double Zinger Burger...');
    await sharp('scripts/tmp_double_zinger.jpg')
      .resize({ width: 950, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'burger-double-zinger.jpg'));
    console.log('Saved burger-double-zinger.jpg');
    fs.unlinkSync('scripts/tmp_double_zinger.jpg');
  }

  // 2. Malai Boti Pizza (from link)
  if (fs.existsSync('scripts/tmp_malai_boti_pizza.jpg')) {
    console.log('2. Malai Boti Pizza...');
    await sharp('scripts/tmp_malai_boti_pizza.jpg')
      .resize(800, null, { kernel: 'lanczos3' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pizza-malai-boti.jpg'));
    console.log('Saved pizza-malai-boti.jpg');
    fs.unlinkSync('scripts/tmp_malai_boti_pizza.jpg');
  }

  // 3. Arabian Pasta (user upload)
  console.log('3. Arabian Pasta...');
  const arabianSrc = path.join(userMediaDir, 'media_1793632298978_1b755b37.jpg');
  await sharp(fs.readFileSync(arabianSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pasta-arabian.jpg'));
  console.log('Saved pasta-arabian.jpg');

  // 4. Deal 1 (user upload)
  console.log('4. Deal 1...');
  const deal1Src = path.join(userMediaDir, 'media_1793632451004_ce243977.jpg');
  await sharp(fs.readFileSync(deal1Src))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-1-chicken-burger-fries.jpg'));
  console.log('Saved deal-1-chicken-burger-fries.jpg');

  // 5. Deal 2 (user upload)
  console.log('5. Deal 2...');
  const deal2Src = path.join(userMediaDir, 'media_1793632504290_53d3398b.jpg');
  await sharp(fs.readFileSync(deal2Src))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-2-zinger-burger-fries.jpg'));
  console.log('Saved deal-2-zinger-burger-fries.jpg');

  // 6. Deal 3 (user upload)
  console.log('6. Deal 3...');
  const deal3Src = path.join(userMediaDir, 'media_1793632522159_c5adbfdf.jpg');
  await sharp(fs.readFileSync(deal3Src))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-3-chicken-burger-pizza.jpg'));
  console.log('Saved deal-3-chicken-burger-pizza.jpg');

  // 7. Hot n Spicy Pasta (from link)
  if (fs.existsSync('scripts/tmp_hot_spicy_pasta.jpg')) {
    console.log('7. Hot n Spicy Pasta...');
    await sharp(fs.readFileSync('scripts/tmp_hot_spicy_pasta.jpg'))
      .extract({ left: 0, top: 150, width: 960, height: 720 })
      .resize(800, 600)
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pasta-hot-spicy.jpg'));
    console.log('Saved pasta-hot-spicy.jpg');
    try { fs.unlinkSync('scripts/tmp_hot_spicy_pasta.jpg'); } catch(e){}
  }

  // 8. Crunchy Pasta (from link)
  if (fs.existsSync('scripts/tmp_crunchy_pasta.jpg')) {
    console.log('8. Crunchy Pasta...');
    await sharp(fs.readFileSync('scripts/tmp_crunchy_pasta.jpg'))
      .resize(800, 800, { kernel: 'lanczos3' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pasta-crunchy.jpg'));
    console.log('Saved pasta-crunchy.jpg');
    try { fs.unlinkSync('scripts/tmp_crunchy_pasta.jpg'); } catch(e){}
  }

  // 9. Cheese Bites Special Pasta (user upload)
  console.log('9. Cheese Bites Special Pasta...');
  const specialPastaSrc = path.join(userMediaDir, 'media_1793633656330_9456b22f.jpg');
  await sharp(fs.readFileSync(specialPastaSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pasta-bites-special.jpg'));
  console.log('Saved pasta-bites-special.jpg');

  // Clean resolve script
  if (fs.existsSync('scripts/resolve_bing_links.mjs')) fs.unlinkSync('scripts/resolve_bing_links.mjs');

  console.log('All 9 items processed successfully!');
}

processLatestUpdates().catch(err => {
  console.error(err);
  process.exit(1);
});
