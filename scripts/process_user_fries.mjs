import sharp from 'sharp';
import path from 'path';

const img1 = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded/media_1793547056248_1b988d34.jpg';
const img2 = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded/media_1793547166171_d228f93e.jpg';
const img3 = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded/media_1793547438207_45936dca.jpg';

const menuDir = path.join(process.cwd(), 'public', 'images', 'menu');

async function run() {
  const meta1 = await sharp(img1).metadata();
  const meta2 = await sharp(img2).metadata();
  const meta3 = await sharp(img3).metadata();

  console.log('Image 1 (Platter Masala Fries):', meta1.width, 'x', meta1.height);
  console.log('Image 2 (Cup Masala Fries):', meta2.width, 'x', meta2.height);
  console.log('Image 3 (Loaded Fries):', meta3.width, 'x', meta3.height);

  // 1. Process Image 1 for Home Category Fries (and/or Masala Fries)
  // Top-left badge is in the top 9% on a dark black background.
  // We crop from y = Math.round(meta1.height * 0.09) to keep the full bowl, fries, ketchup, and dark table
  const crop1Top = Math.round(meta1.height * 0.088);
  const crop1Height = meta1.height - crop1Top;
  
  await sharp(img1)
    .extract({ left: 0, top: crop1Top, width: meta1.width, height: crop1Height })
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(menuDir, 'fries.jpg'));
  console.log('Saved public/images/menu/fries.jpg (Home Category Fries)');

  // 2. Process Image 2 for Menu Page: Masala Fries Small & Large
  // Top badge is in top 10.5%, bottom-right star is in bottom 11.5%
  const crop2Top = Math.round(meta2.height * 0.105);
  const crop2Height = Math.round(meta2.height * 0.78);
  
  await sharp(img2)
    .extract({ left: 0, top: crop2Top, width: meta2.width, height: crop2Height })
    .resize(1000, 750, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(menuDir, 'fries-masala-small.jpg'));

  await sharp(path.join(menuDir, 'fries-masala-small.jpg'))
    .toFile(path.join(menuDir, 'fries-masala-large.jpg'));

  await sharp(path.join(menuDir, 'fries-masala-small.jpg'))
    .toFile(path.join(menuDir, 'fries-masala.jpg'));
  console.log('Saved public/images/menu/fries-masala-small.jpg & fries-masala-large.jpg');

  // 3. Process Image 3 for Loaded Fries (Menu item & anywhere loaded fries is used)
  await sharp(img3)
    .resize(1000, 750, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(menuDir, 'fries-loaded.jpg'));
  console.log('Saved public/images/menu/fries-loaded.jpg (Loaded Fries)');
}

run().catch(console.error);

