import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('public/images/menu');

async function processRequestedImages() {
  console.log('=== Processing Tower Burger, Grill Burger, Half & Half Pizza ===');

  // 1. Tower Burger (from Vecteezy link: 980x980 double cheeseburger on wooden background)
  if (fs.existsSync('scripts/tmp_tower.jpg')) {
    console.log('1. Tower Burger...');
    await sharp('scripts/tmp_tower.jpg')
      .resize({ width: 950, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'burger-tower.jpg'));
    console.log('Saved burger-tower.jpg');
    fs.unlinkSync('scripts/tmp_tower.jpg');
  }

  // 2. Grill Burger (from Adobe Stock / Bing link: 639x360)
  if (fs.existsSync('scripts/tmp_grill.jpg')) {
    console.log('2. Grill Burger...');
    await sharp('scripts/tmp_grill.jpg')
      .resize(800, null, { kernel: 'lanczos3' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'burger-grill.jpg'));
    console.log('Saved burger-grill.jpg');
    fs.unlinkSync('scripts/tmp_grill.jpg');
  }

  // 3. Half and Half Pizza (from Secret Harbour Pizza link: 1000x1000)
  if (fs.existsSync('scripts/tmp_half.jpg')) {
    console.log('3. Half & Half Pizza...');
    await sharp('scripts/tmp_half.jpg')
      .resize({ width: 950, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pizza-half-half.jpg'));
    console.log('Saved pizza-half-half.jpg');
    fs.unlinkSync('scripts/tmp_half.jpg');
  }

  console.log('Done processing all 3 images!');
}

processRequestedImages().catch(err => {
  console.error(err);
  process.exit(1);
});

