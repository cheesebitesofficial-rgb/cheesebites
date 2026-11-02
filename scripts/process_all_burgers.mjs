import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processBurgers() {
  console.log('=== Processing All Burgers ===');

  // 1. Chicken Burger
  console.log('1. Chicken Burger...');
  const chickenSrc = path.join(userMediaDir, 'media_1793624175441_3010bc54.jpg');
  await sharp(fs.readFileSync(chickenSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'burger-chicken.jpg'));
  console.log('Saved burger-chicken.jpg');

  // 2. Zinger Burger
  console.log('2. Zinger Burger...');
  const zingerSrc = path.join(userMediaDir, 'media_1793624276601_990eb6cc.jpg');
  await sharp(fs.readFileSync(zingerSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'burger-zinger.jpg'));
  console.log('Saved burger-zinger.jpg');

  // 3. Grill Burger
  console.log('3. Grill Burger...');
  const grillSrc = path.join(userMediaDir, 'media_1793624346322_6e6cdc14.jpg');
  await sharp(fs.readFileSync(grillSrc))
    .resize(800, null, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'burger-grill.jpg'));
  console.log('Saved burger-grill.jpg');

  // 4. Double Zinger Burger
  console.log('4. Double Zinger Burger...');
  const dblZingerSrc = path.join(userMediaDir, 'media_1793624392531_b50f629a.jpg');
  await sharp(fs.readFileSync(dblZingerSrc))
    .resize(800, null, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'burger-double-zinger.jpg'));
  console.log('Saved burger-double-zinger.jpg');

  // 5. Double Jambo Burger
  console.log('5. Double Jambo Burger...');
  const dblJamboSrc = path.join(userMediaDir, 'media_1793624534782_f24c3343.jpg');
  await sharp(fs.readFileSync(dblJamboSrc))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'burger-double-jambo.jpg'));
  console.log('Saved burger-double-jambo.jpg');

  // 6. Jambo Burger (Downloaded from Freepik)
  console.log('6. Jambo Burger...');
  const jamboPath = path.join(outputDir, 'burger-jambo.jpg');
  if (fs.existsSync(jamboPath)) {
    const jamboBuf = fs.readFileSync(jamboPath);
    await sharp(jamboBuf)
      .resize({ width: 850, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(jamboPath + '.tmp');
    fs.renameSync(jamboPath + '.tmp', jamboPath);
    console.log('Optimized burger-jambo.jpg');
  }

  // 7. Tower Burger (Pad horizontally to 4:3 so tall burger is not cropped)
  console.log('7. Tower Burger...');
  const towerPath = path.join(outputDir, 'burger-tower.jpg');
  if (fs.existsSync(towerPath)) {
    const towerBuf = fs.readFileSync(towerPath);
    const towerMeta = await sharp(towerBuf).metadata();
    // towerMeta is 384x672. Target 4:3 height is 672, width is 672 * (4/3) = 896
    const targetW = Math.round(towerMeta.height * (4 / 3));
    const padX = Math.round((targetW - towerMeta.width) / 2);

    await sharp(towerBuf)
      .extend({
        top: 0,
        bottom: 0,
        left: padX,
        right: padX,
        background: '#0d0d11'
      })
      .resize(800, 600)
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(towerPath + '.tmp');
    fs.renameSync(towerPath + '.tmp', towerPath);
    console.log('Framed and saved burger-tower.jpg (4:3 NO CROP)');
  }

  // Also update burger category thumbnail
  if (fs.existsSync(path.join(outputDir, 'burger-zinger.jpg'))) {
    fs.copyFileSync(path.join(outputDir, 'burger-zinger.jpg'), path.join(outputDir, 'burgers.jpg'));
    console.log('Updated burgers.jpg category image');
  }

  console.log('All 7 burgers processed successfully!');
}

processBurgers().catch(err => {
  console.error(err);
  process.exit(1);
});

