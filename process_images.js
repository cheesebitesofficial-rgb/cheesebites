const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\PrOFessiOnAL UsEr\\.gemini\\antigravity\\brain\\730c2f11-10a8-415e-a3ca-48c058fca381';
const outputDir = path.join(__dirname, '../public/assets');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToProcess = [
  { input: path.join(brainDir, 'crown_crust_pizza_1789742667531.jpg'), output: path.join(outputDir, 'hero-crown-pizza.png'), threshold: 22 },
  { input: path.join(brainDir, 'pizza_slice_lift_1789742711567.jpg'), output: path.join(outputDir, 'hero-pizza-slice.png'), threshold: 22 },
  { input: path.join(brainDir, 'basil_leaf_1789742767042.jpg'), output: path.join(outputDir, 'ingredient-basil.png'), threshold: 25 },
  { input: path.join(brainDir, 'pepperoni_slice_1789742833056.jpg'), output: path.join(outputDir, 'ingredient-pepperoni.png'), threshold: 22 },
  { input: path.join(brainDir, 'onion_ring_1789742889048.jpg'), output: path.join(outputDir, 'ingredient-onion.png'), threshold: 22 },
  { input: path.join(brainDir, 'mushroom_slice_1789742962104.jpg'), output: path.join(outputDir, 'ingredient-mushroom.png'), threshold: 22 },
];

async function removeBlackBackground(item) {
  const { data, info } = await sharp(item.input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const threshold = item.threshold;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const brightness = Math.max(r, g, b);
    if (brightness < threshold) {
      data[i + 3] = 0; // Fully transparent
    } else if (brightness < threshold + 20) {
      // Smooth alpha transition edge
      const alphaFraction = (brightness - threshold) / 20;
      data[i + 3] = Math.floor(alphaFraction * 255);
    }
  }

  await sharp(data, {
    raw: { width, height, channels }
  })
  .png({ compressionLevel: 8 })
  .toFile(item.output);

  console.log(`Successfully processed: ${item.output}`);
}

async function run() {
  for (const img of imagesToProcess) {
    await removeBlackBackground(img);
  }
}

run().catch(console.error);
