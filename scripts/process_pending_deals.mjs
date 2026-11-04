// Process pending deal images: Deal 6, 16, 17
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const destDir = path.join(__dirname, '../public/images/menu');

const updates = [
  {
    src: 'media_1793723183463_cdbafc5d.jpg',
    dest: 'deal-6-small-pizza-burger.jpg',
    label: 'Deal 6 - Small Pizza + Chicken Burger + Reg Drink'
  },
  {
    src: 'media_1793723183463_8c49451b.jpg',
    dest: 'deal-16-three-zingers-small-pizza.jpg',
    label: 'Deal 16 - 3 Zingers + Small Pizza + 1.5L Drink'
  },
  {
    src: 'media_1793723183463_61b474da.jpg',
    dest: 'deal-17-two-large-pizzas-pasta.jpg',
    label: 'Deal 17 - 2 Large Pizzas + Large Pasta + 1.5L Drink'
  },
];

for (const { src, dest, label } of updates) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`❌ Source not found: ${srcPath}`);
    continue;
  }

  const buf = fs.readFileSync(srcPath);
  await sharp(buf)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toFile(destPath);

  const stats = fs.statSync(destPath);
  console.log(`✅ ${label}`);
  console.log(`   → ${dest} (${Math.round(stats.size / 1024)}KB)`);
}

console.log('\n🎉 All 3 deal images processed!');

