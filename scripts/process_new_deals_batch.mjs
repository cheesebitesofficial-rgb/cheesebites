import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');

const updates = [
  {
    src: 'media_1793711370804_7c2c44e1.jpg',
    dest: 'deal-4-two-zingers-fries.jpg',
    deal: 'Deal 4 (2 Zinger Burgers, 1 Small Fries, 1 Regular Drink)'
  },
  {
    src: 'media_1793711370788_f2233f78.jpg',
    dest: 'deal-5-spin-rolls-wings.jpg',
    deal: 'Deal 5 (4 Spin Rolls, 5 Wings / Regular Fries, 1 Regular Drink)'
  },
  {
    src: 'media_1793711370734_8a1f6f0a.jpg',
    dest: 'deal-7-two-zingers-pasta.jpg',
    deal: 'Deal 7 (2 Zinger Burgers, 1 Small Pasta, 500ml Drink)'
  },
  {
    src: 'media_1793711370806_932dff9f.jpg',
    dest: 'deal-8-two-grill-burgers-pizza-fries.jpg',
    deal: 'Deal 8 (2 Grill Burgers, 1 Pizza Fries, 1 Drink 1 Litre)'
  },
  {
    src: 'media_1793711370747_e2d5c201.jpg',
    dest: 'deal-12-two-zingers-medium-pizza.jpg',
    deal: 'Deal 12 (2 Zinger Burgers, 1 Medium Pizza, 1 Drink 1.5 Litre)'
  }
];

async function run() {
  console.log('=== Processing 5 New Deal Images ===');
  for (const item of updates) {
    const srcPath = path.join(userMediaDir, item.src);
    const destPath = path.join(outputDir, item.dest);
    console.log(`Processing ${item.deal}...`);
    const buf = fs.readFileSync(srcPath);
    await sharp(buf)
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(destPath);
    console.log(`Saved ${item.dest}`);
  }
  console.log('=== All 5 Deal Images Processed Successfully! ===');
}

run().catch(console.error);

