import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processPizzas() {
  console.log('1. Chicken Grill Pizza...');
  const src1 = path.join(userMediaDir, 'media_1793597280306_76851261.jpg');
  await sharp(fs.readFileSync(src1))
    .resize({ width: 850, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-chicken-grill.jpg'));
  console.log('Saved pizza-chicken-grill.jpg');

  console.log('2. Cheese Stuffer Pizza...');
  const src2 = path.join(userMediaDir, 'media_1793597319483_1884ce61.jpg');
  await sharp(fs.readFileSync(src2))
    .resize({ width: 850, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-cheese-stuffer.jpg'));
  console.log('Saved pizza-cheese-stuffer.jpg');

  console.log('3. BBQ Pizza...');
  const src3 = path.join(userMediaDir, 'media_1793597446086_0bc0b56c.jpg');
  await sharp(fs.readFileSync(src3))
    .resize({ width: 850, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-bbq.jpg'));
  console.log('Saved pizza-bbq.jpg');

  console.log('4. Tandoori Pizza...');
  const src4 = path.join(userMediaDir, 'media_1793597730336_42ebf512.jpg');
  await sharp(fs.readFileSync(src4))
    .resize({ width: 850, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-tandoori.jpg'));
  console.log('Saved pizza-tandoori.jpg');

  console.log('5. Kabab Stuffer Pizza (cropping watermark banner on left)...');
  const src5 = path.join(userMediaDir, 'media_1793598018396_62cd9fca.jpg');
  await sharp(fs.readFileSync(src5))
    .extract({ left: 135, top: 0, width: 889, height: 576 })
    .resize({ width: 850, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-kabab-stuffer.jpg'));
  console.log('Saved pizza-kabab-stuffer.jpg');
}

processPizzas().catch(err => {
  console.error(err);
  process.exit(1);
});
