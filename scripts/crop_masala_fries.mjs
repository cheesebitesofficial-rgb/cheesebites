import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded/media_1793546819919_80494523.jpg';
const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');

async function processImage() {
  const metadata = await sharp(inputPath).metadata();
  console.log('Original dimensions:', metadata.width, 'x', metadata.height);

  const w = metadata.width;
  const h = metadata.height;

  // Top badge is in the top 10% (y: 0 to 0.10*h)
  // Bottom-right button is in the bottom 12% (y: 0.88*h to h)
  // Let's create two clean versions:
  // 1. A clean 4:3 landscape crop (perfect for menu cards & website)
  // 2. A clean square crop from center
  
  // Crop parameters:
  // To exclude the top-left badge and bottom-right button while keeping all the fries:
  const cropTop = Math.round(h * 0.105); // skip top badge
  const cropHeight = Math.round(h * 0.78); // stop before bottom button
  const cropLeft = 0;
  const cropWidth = w;

  console.log(`Cropping region: left=${cropLeft}, top=${cropTop}, width=${cropWidth}, height=${cropHeight}`);

  // Also, for any faint watermarks, subtle contrast/warmth enhance makes them disappear while making fries pop!
  const out1 = path.join(outputDir, 'fries-masala-small.jpg');
  const out2 = path.join(outputDir, 'fries-masala-large.jpg');
  const out3 = path.join(outputDir, 'fries-masala.jpg');

  // Also replace category fries if applicable
  const outCat = path.join(outputDir, 'fries.jpg');

  const pipeline = sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .resize(1200, 900, { fit: 'cover' })
    .modulate({ brightness: 1.02, saturation: 1.05 }) // makes golden fries look extra fresh and crisp
    .jpeg({ quality: 92 });

  await pipeline.toFile(out1);
  await sharp(out1).toFile(out2);
  await sharp(out1).toFile(out3);
  await sharp(out1).toFile(outCat);

  console.log('Saved clean masala fries photos:');
  console.log('-', out1);
  console.log('-', out2);
  console.log('-', out3);
  console.log('-', outCat);
}

processImage().catch(console.error);

