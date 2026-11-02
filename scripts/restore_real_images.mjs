import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function restoreAndResize() {
  console.log('1. Restoring Deal 1 (Special Offer 1) to full real image without blur...');
  const srcOffer1 = path.join(userMediaDir, 'media_1793553575576_becb870a.jpg');
  await sharp(fs.readFileSync(srcOffer1))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-medium-two-pizzas.jpg'));
  console.log('Saved real deal-duo-medium-two-pizzas.jpg');

  console.log('2. Restoring Deal 2 (Special Offer 2) to full real image without blur...');
  const srcOffer2 = path.join(userMediaDir, 'media_1793553575577_d64783f0.jpg');
  await sharp(fs.readFileSync(srcOffer2))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-large-two-pizzas.jpg'));
  console.log('Saved real deal-duo-large-two-pizzas.jpg');

  console.log('3. Restoring Kabab Stuffer Pizza to full real image (NO crop, just resize)...');
  const srcKabab = path.join(userMediaDir, 'media_1793598018396_62cd9fca.jpg');
  await sharp(fs.readFileSync(srcKabab))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-kabab-stuffer.jpg'));
  console.log('Saved full uncropped pizza-kabab-stuffer.jpg');

  console.log('4. Verifying The Big Flex (full real image resized)...');
  const srcBigFlex = path.join(userMediaDir, 'media_1793596972792_6bf73b09.jpg');
  await sharp(fs.readFileSync(srcBigFlex))
    .resize({ width: 950, withoutEnlargement: true })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-20-two-xl-pizzas-pasta.jpg'));
  
  if (fs.existsSync('public/images/real')) {
    fs.copyFileSync(
      path.join(outputDir, 'deal-20-two-xl-pizzas-pasta.jpg'),
      'public/images/real/deal-20.jpg'
    );
  }
  console.log('Saved full real deal-20 image');
}

restoreAndResize().catch(err => {
  console.error(err);
  process.exit(1);
});
