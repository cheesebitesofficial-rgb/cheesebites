import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const menuDir = path.resolve('public/images/menu');

async function optimizeImages() {
  const files = fs.readdirSync(menuDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Optimizing ${files.length} images for fast mobile loading...`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    const fullPath = path.join(menuDir, f);
    const inputBuffer = fs.readFileSync(fullPath);
    totalBefore += inputBuffer.length;

    const img = sharp(inputBuffer);
    const meta = await img.metadata();

    let pipeline = sharp(inputBuffer);
    if (meta.width && meta.width > 850) {
      pipeline = pipeline.resize({ width: 850, withoutEnlargement: true });
    }

    const optimizedBuffer = await pipeline
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toBuffer();

    fs.writeFileSync(fullPath, optimizedBuffer);
    totalAfter += optimizedBuffer.length;

    console.log(`${f}: ${(inputBuffer.length / 1024).toFixed(0)}KB -> ${(optimizedBuffer.length / 1024).toFixed(0)}KB`);
  }

  console.log(`\nOptimization Complete!`);
  console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% bandwidth!`);
}

optimizeImages().catch(err => {
  console.error(err);
  process.exit(1);
});
