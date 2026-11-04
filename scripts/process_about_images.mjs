// Process About Us section food images
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const destDir = path.join(__dirname, '../public/images/about');

// Create about images dir if not exists
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const images = [
  { src: 'media_1793778310443_be7a8f20.jpg', dest: 'about-cheeseburger.jpg',   label: 'Cheeseburger' },
  { src: 'media_1793778317419_0ce4e338.jpg', dest: 'about-cheesy-fries.jpg',   label: 'Cheesy Fries' },
  { src: 'media_1793778328016_5ff941c8.jpg', dest: 'about-chicken-wings.jpg',  label: 'Chicken Wings' },
  { src: 'media_1793778336839_471b9147.jpg', dest: 'about-pizza.jpg',          label: 'Pizza' },
];

for (const { src, dest, label } of images) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (!fs.existsSync(srcPath)) { console.error(`❌ Missing: ${src}`); continue; }
  const buf = fs.readFileSync(srcPath);
  await sharp(buf)
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(destPath);
  const { size } = fs.statSync(destPath);
  console.log(`✅ ${label} → ${dest} (${Math.round(size/1024)}KB)`);
}
console.log('\n🎉 About images ready!');

