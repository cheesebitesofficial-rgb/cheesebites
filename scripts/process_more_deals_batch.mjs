import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');

const updates = [
  {
    src: 'media_1793712297873_d69da2d4.jpg',
    dest: 'deal-9-three-zingers-large-fries.jpg',
    deal: 'Deal 9 (3 Zinger Burgers, 1 Large Fries, 1 Drink 1.5 Litre)'
  },
  {
    src: 'media_1793712297857_8a55d61f.jpg',
    dest: 'deal-10-three-zingers-nuggets.jpg',
    deal: 'Deal 10 (3 Zinger Burgers, 5 Nuggets, 1 Drink 1 Litre)'
  },
  {
    src: 'media_1793712297856_d2a4e2a3.jpg',
    dest: 'deal-11-four-chicken-burgers-fries.jpg',
    deal: 'Deal 11 (4 Chicken Burgers, 1 Regular Fries, 1 Drink 1.5 Litre)'
  },
  {
    src: 'media_1793712297856_a69254f2.jpg',
    dest: 'deal-13-four-zingers-pasta.jpg',
    deal: 'Deal 13 (4 Zinger Burgers, 1 Small Pasta, 1 Drink 1.5 Litre)'
  },
  {
    src: 'media_1793712297920_67f87659.jpg',
    dest: 'deal-14-two-zingers-large-pizza.jpg',
    deal: 'Deal 14 (2 Zinger Burgers, 1 Large Pizza, 1 Drink 1.5 Litre)'
  }
];

async function run() {
  console.log('=== Processing 5 New Deals (9, 10, 11, 13, 14) ===');
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

