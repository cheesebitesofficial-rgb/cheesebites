import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function processPizzas() {
  console.log('Processing Pizza 1: Cheese Pizza...');
  const cheeseSrc = path.join(userMediaDir, 'media_1793550014667_a349b302.jpg');
  await sharp(cheeseSrc)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-cheese.jpg'));
  console.log('Saved pizza-cheese.jpg');

  console.log('Processing Pizza 2: Veggie Pizza (Removing top text)...');
  const veggieSrc = path.join(userMediaDir, 'media_1793550080653_47045e2f.jpg');
  // In veggieSrc (1020x1024), the text box is at top left (x: 20..395, y: 25..155).
  // The wooden background at (x: 420..820, y: 15..175) has the exact vertical wooden grain.
  // We extract a 400x160 patch of pure wooden background and overlay it over (x: 15, y: 15).
  const woodPatch = await sharp(veggieSrc)
    .extract({ left: 420, top: 15, width: 400, height: 160 })
    .toBuffer();

  await sharp(veggieSrc)
    .composite([
      {
        input: woodPatch,
        left: 15,
        top: 15,
      }
    ])
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-veggie-max.jpg'));
  console.log('Saved pizza-veggie-max.jpg with text removed');

  console.log('Processing Pizza 3: Half & Half Pizza...');
  const halfSrc = path.join(userMediaDir, 'media_1793550325653_4ae7dfce.png');
  // Half & Half is 242x208, upscale nicely using lanczos3
  await sharp(halfSrc)
    .resize(600, 516, { kernel: 'lanczos3' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-half-half.jpg'));
  console.log('Saved pizza-half-half.jpg');

  console.log('Processing Pizza 4: Chicken Tikka Pizza...');
  const tikkaSrc = path.join(userMediaDir, 'media_1793550794283_caac1c9c.jpg');
  await sharp(tikkaSrc)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-chicken-tikka.jpg'));
  console.log('Saved pizza-chicken-tikka.jpg');

  console.log('Processing Pizza 5: Chicken Fajita Pizza...');
  const fajitaSrc = path.join(userMediaDir, 'media_1793550969277_7791496a.jpg');
  await sharp(fajitaSrc)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-fajita.jpg'));
  console.log('Saved pizza-fajita.jpg');
}

processPizzas().catch(err => {
  console.error('Error processing pizzas:', err);
  process.exit(1);
});
