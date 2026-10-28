const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const menuFlyer = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity-ide/brain/107fcca7-e1c5-413f-b758-6836674ba8df/.user_uploaded/media_1793175597992.jpg';
const dealsFlyer = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity-ide/brain/107fcca7-e1c5-413f-b758-6836674ba8df/.user_uploaded/media_1793175598118.jpg';
const outDir = path.join(__dirname, 'public/images/real');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Crops from Menu Flyer (1024 x 730)
const menuCrops = [
  { name: 'crown-crust-pizza.jpg', left: 75, top: 485, width: 235, height: 165 },
  { name: 'burgers-trio.jpg', left: 375, top: 185, width: 315, height: 160 },
  { name: 'burger-single-zinger.jpg', left: 460, top: 185, width: 135, height: 155 },
  { name: 'sandwich-grill.jpg', left: 590, top: 380, width: 95, height: 85 },
  { name: 'roll-paratha-trio.jpg', left: 375, top: 595, width: 300, height: 125 },
  { name: 'pasta-bowl.jpg', left: 785, top: 145, width: 140, height: 110 },
  { name: 'fried-chicken-platter.jpg', left: 685, top: 415, width: 315, height: 175 },
  { name: 'fries-loaded-masala.jpg', left: 860, top: 595, width: 145, height: 125 },
  // Full sections as high-res reference cards
  { name: 'section-pizza.jpg', left: 40, top: 10, width: 345, height: 710 },
  { name: 'section-burgers-rolls.jpg', left: 375, top: 10, width: 310, height: 710 },
  { name: 'section-pasta-chicken.jpg', left: 685, top: 10, width: 330, height: 710 },
];

// Crops from Deals Flyer (1024 x 848)
const dealsCrops = [
  { name: 'cheese-bites-badge-logo.png', left: 650, top: 35, width: 275, height: 325 },
  { name: 'deal-duo-medium.jpg', left: 645, top: 440, width: 125, height: 135 },
  { name: 'deal-duo-large.jpg', left: 810, top: 440, width: 125, height: 135 },
  { name: 'deal-1.jpg', left: 30, top: 140, width: 95, height: 100 },
  { name: 'deal-2.jpg', left: 190, top: 140, width: 95, height: 100 },
  { name: 'deal-3.jpg', left: 30, top: 265, width: 95, height: 100 },
  { name: 'deal-4.jpg', left: 190, top: 265, width: 95, height: 100 },
  { name: 'deal-5.jpg', left: 35, top: 425, width: 105, height: 95 },
  { name: 'deal-6.jpg', left: 175, top: 425, width: 105, height: 95 },
  { name: 'deal-7.jpg', left: 25, top: 550, width: 110, height: 95 },
  { name: 'deal-8.jpg', left: 185, top: 545, width: 105, height: 100 },
  { name: 'deal-9.jpg', left: 25, top: 675, width: 115, height: 95 },
  { name: 'deal-10.jpg', left: 195, top: 675, width: 105, height: 95 },
  { name: 'deal-11.jpg', left: 325, top: 135, width: 120, height: 95 },
  { name: 'deal-12.jpg', left: 485, top: 135, width: 105, height: 95 },
  { name: 'deal-13.jpg', left: 325, top: 260, width: 110, height: 95 },
  { name: 'deal-14.jpg', left: 485, top: 260, width: 105, height: 95 },
  { name: 'deal-15.jpg', left: 330, top: 415, width: 105, height: 95 },
  { name: 'deal-16.jpg', left: 490, top: 415, width: 110, height: 95 },
  { name: 'deal-17.jpg', left: 330, top: 535, width: 120, height: 95 },
  { name: 'deal-18.jpg', left: 490, top: 535, width: 115, height: 95 },
  { name: 'deal-19.jpg', left: 325, top: 680, width: 120, height: 95 },
  { name: 'deal-20.jpg', left: 490, top: 680, width: 115, height: 95 },
  // Full deal flyer copy
  { name: 'deals-flyer-full.jpg', left: 0, top: 0, width: 1024, height: 848 },
  { name: 'menu-flyer-full.jpg', left: 0, top: 0, width: 1024, height: 730, source: 'menu' },
];

async function extract() {
  console.log('Extracting menu flyer crops...');
  for (const crop of menuCrops) {
    const target = path.join(outDir, crop.name);
    await sharp(menuFlyer)
      .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
      .jpeg({ quality: 95 })
      .toFile(target);
    console.log(`Saved: ${crop.name}`);
  }

  console.log('Extracting deals flyer crops...');
  for (const crop of dealsCrops) {
    const source = crop.source === 'menu' ? menuFlyer : dealsFlyer;
    const target = path.join(outDir, crop.name);
    const pipeline = sharp(source).extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height });
    if (crop.name.endsWith('.png')) {
      await pipeline.png().toFile(target);
    } else {
      await pipeline.jpeg({ quality: 95 }).toFile(target);
    }
    console.log(`Saved: ${crop.name}`);
  }

  // Also copy full flyers to public/images/ so users can view the full original flyers in modal / tab!
  fs.copyFileSync(menuFlyer, path.join(__dirname, 'public/images/real/menu-original-flyer.jpg'));
  fs.copyFileSync(dealsFlyer, path.join(__dirname, 'public/images/real/deals-original-flyer.jpg'));
  console.log('Original flyers saved!');
}

extract().catch(console.error);
