import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processFriedChicken() {
  console.log('=== Processing Fried Chicken Category ===');

  // 1. Fried Chicken 1PC
  console.log('1. Fried Chicken 1PC...');
  const fried1pcSrc = path.join(userMediaDir, 'media_1793628964643_63f9ec7f.jpg');
  await sharp(fs.readFileSync(fried1pcSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'chicken-fried-1pc.jpg'));
  console.log('Saved chicken-fried-1pc.jpg');

  // Category thumbnail
  fs.copyFileSync(path.join(outputDir, 'chicken-fried-1pc.jpg'), path.join(outputDir, 'fried-chicken.jpg'));
  console.log('Saved fried-chicken.jpg category image');

  // 2. Chicken Nuggets
  console.log('2. Chicken Nuggets...');
  const nuggetsSrc = path.join(userMediaDir, 'media_1793629132971_ca7969cb.jpg');
  await sharp(fs.readFileSync(nuggetsSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'chicken-nuggets-10pcs.jpg'));
  console.log('Saved chicken-nuggets-10pcs.jpg');

  // 3. Hot Wings
  console.log('3. Hot Wings...');
  const hotWingsSrc = path.join(userMediaDir, 'media_1793629440210_2119dd97.jpg');
  await sharp(fs.readFileSync(hotWingsSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'chicken-hot-wings.jpg'));
  console.log('Saved chicken-hot-wings.jpg');

  // 4. BBQ Wings
  console.log('4. BBQ Wings...');
  const bbqWingsSrc = path.join(userMediaDir, 'media_1793629549546_34869cfe.jpg');
  await sharp(fs.readFileSync(bbqWingsSrc))
    .resize(800, null, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'chicken-bbq-wings.jpg'));
  console.log('Saved chicken-bbq-wings.jpg');

  // 5. Oven Baked Wings
  console.log('5. Oven Baked Wings...');
  const ovenBakedSrc = path.join(userMediaDir, 'media_1793630013751_382daf4d.jpg');
  await sharp(fs.readFileSync(ovenBakedSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'chicken-oven-baked.jpg'));
  console.log('Saved chicken-oven-baked.jpg');

  // 6. Cheese Bites Special Wings (Garlic Parmesan Cheese Wings from link)
  console.log('6. Cheese Bites Special Chicken...');
  if (fs.existsSync('scripts/tmp_special_chicken.jpg')) {
    await sharp('scripts/tmp_special_chicken.jpg')
      .extract({ left: 0, top: 150, width: 960, height: 720 })
      .resize(800, 600)
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'chicken-bites-special.jpg'));
    console.log('Saved chicken-bites-special.jpg');
    fs.unlinkSync('scripts/tmp_special_chicken.jpg');
  }

  // Clean inspect_link.mjs
  if (fs.existsSync('scripts/inspect_link.mjs')) fs.unlinkSync('scripts/inspect_link.mjs');

  console.log('All Fried Chicken items processed successfully!');
}

processFriedChicken().catch(err => {
  console.error(err);
  process.exit(1);
});
