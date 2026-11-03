import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');
const imagesDir = path.join(process.cwd(), 'public', 'images');

async function processAll() {
  console.log('=== Processing Sandwiches & Home Assets ===');

  // 1. Mughlai Sandwiches (user upload)
  console.log('1. Mughlai Sandwiches...');
  const mughlaiSrc = path.join(userMediaDir, 'media_1793634708143_42d0fb7f.jpg');
  if (fs.existsSync(mughlaiSrc)) {
    const buf = fs.readFileSync(mughlaiSrc);
    await sharp(buf)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'sandwich-mughlai.jpg'));
    console.log('Saved sandwich-mughlai.jpg');
  }

  // 2. Crunch Sandwiches (crunch chicken stripe sandwiches from link)
  console.log('2. Crunch Sandwiches...');
  if (fs.existsSync('scripts/tmp_crunch_sandwich.jpg')) {
    const buf = fs.readFileSync('scripts/tmp_crunch_sandwich.jpg');
    await sharp(buf)
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'sandwich-crunch.jpg'));
    console.log('Saved sandwich-crunch.jpg');
  }

  // 3. Grill Sandwiches (from link)
  console.log('3. Grill Sandwiches...');
  if (fs.existsSync('scripts/tmp_grill_sandwich.jpg')) {
    const buf = fs.readFileSync('scripts/tmp_grill_sandwich.jpg');
    await sharp(buf)
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'sandwich-grill.jpg'));
    console.log('Saved sandwich-grill.jpg');
  }

  // 4. Bites Special Sandwich (cheese special bites from link)
  console.log('4. Bites Special Sandwich...');
  if (fs.existsSync('scripts/tmp_bites_special_sandwich.jpg')) {
    const buf = fs.readFileSync('scripts/tmp_bites_special_sandwich.jpg');
    await sharp(buf)
      .resize({ width: 960, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'sandwich-bites-special.jpg'));
    console.log('Saved sandwich-bites-special.jpg');
  }

  // 5. Update Home Pizza Image & Pizza Category Card
  console.log('5. Home Pizza & Category Pizza...');
  const pizzaSrc = path.join(outputDir, 'pizza-crown-crust.jpg');
  if (fs.existsSync(pizzaSrc)) {
    const buf = fs.readFileSync(pizzaSrc);
    // hero pizza
    await sharp(buf)
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(imagesDir, 'hero-pizza-user.jpg'));
    console.log('Saved public/images/hero-pizza-user.jpg');

    // pizza category card
    await sharp(buf)
      .resize({ width: 800, height: 600, fit: 'cover' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'pizza.jpg'));
    console.log('Saved public/images/menu/pizza.jpg');
  }

  // 6. Update Deals Category Card with Real Cheese Bites Deal Feast
  console.log('6. Deals Category Card...');
  const bigFlexSrc = path.join(userMediaDir, 'media_1793596972792_6bf73b09.jpg');
  if (fs.existsSync(bigFlexSrc)) {
    const buf = fs.readFileSync(bigFlexSrc);
    await sharp(buf)
      .resize({ width: 800, height: 600, fit: 'cover' })
      .jpeg({ quality: 95, progressive: true, mozjpeg: true })
      .toFile(path.join(outputDir, 'deals.jpg'));
    console.log('Saved public/images/menu/deals.jpg');
  } else {
    const deal20Src = path.join(outputDir, 'deal-20-two-xl-pizzas-pasta.jpg');
    if (fs.existsSync(deal20Src)) {
      const buf = fs.readFileSync(deal20Src);
      await sharp(buf)
        .resize({ width: 800, height: 600, fit: 'cover' })
        .jpeg({ quality: 95, progressive: true, mozjpeg: true })
        .toFile(path.join(outputDir, 'deals.jpg'));
      console.log('Saved public/images/menu/deals.jpg from deal-20');
    }
  }

  console.log('=== All Sandwiches & Home Images Processed! ===');
}

processAll().catch(console.error);

