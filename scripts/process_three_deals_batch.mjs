import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');

const updates = [
  {
    src: 'media_1793713125562_f51adc59.jpg',
    dest: 'deal-18-two-xl-pizzas-four-zingers.jpg',
    desc: 'Deal 18 (2 XL Pizzas, 4 Zinger Burgers, 1 Drink 1.5 Litre)'
  },
  {
    src: 'media_1793713125559_ad495f8f.jpg',
    dest: 'deal-19-xl-pizza-wings-two-fries.jpg',
    desc: 'Deal 19 (1 XL Pizza, 2 Large Fries, 1 Crispy Wings, 1 Drink 1.5 Litre)'
  },
  {
    src: 'media_1793713125536_80ad7241.jpg',
    dest: 'deals.jpg',
    desc: 'Deals Category & Feast Showcase (1 XL Pizza, 2 Large Fries, Wings, 1.5L Drink)'
  }
];

async function run() {
  console.log('=== Processing Latest 3 Deal Images ===');
  for (const item of updates) {
    const srcPath = path.join(userMediaDir, item.src);
    const destPath = path.join(outputDir, item.dest);
    console.log(`Processing ${item.desc}...`);
    const buf = fs.readFileSync(srcPath);
    await sharp(buf)
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(destPath);
    console.log(`Saved ${item.dest}`);
  }
  console.log('=== Done! ===');
}

run().catch(console.error);
