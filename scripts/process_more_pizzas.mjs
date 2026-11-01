import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const userMediaDir = 'C:/Users/PrOFessiOnAL UsEr/.gemini/antigravity/brain/0f4e7372-6a1f-4db4-a032-b129fcbddf80/.user_uploaded';
const outputDir = path.resolve('public/images/menu');

async function main() {
  console.log('1. Processing Chicken Supreme Pizza...');
  const supremeSrc = path.join(userMediaDir, 'media_1793552540075_1292e978.jpg');
  await sharp(supremeSrc)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-supreme.jpg'));
  console.log('Saved pizza-supreme.jpg');

  console.log('2. Processing Tandoori Pizza...');
  const tandooriSrc = path.join(userMediaDir, 'media_1793553129239_2cf8e777.jpg');
  await sharp(tandooriSrc)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-tandoori.jpg'));
  console.log('Saved pizza-tandoori.jpg');

  console.log('3. Processing BBQ Pizza (Replacing bright yellow background with dark elegant theme)...');
  const bbqSrc = path.join(userMediaDir, 'media_1793553507700_fe82f3b5.jpg');
  const { data, info } = await sharp(bbqSrc)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const isYellow = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    return r > 200 && g > 170 && b < 85;
  };

  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    if (isYellow(x, 0)) { queue.push(x, 0); visited[0 * width + x] = 1; }
    if (isYellow(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isYellow(0, y)) { queue.push(0, y); visited[y * width + 0] = 1; }
    if (isYellow(width - 1, y)) { queue.push(width - 1, y); visited[y * width + width - 1] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && isYellow(nx, ny)) {
          visited[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Replace visited outer yellow pixels with dark background (#11131a with subtle dark wood/slate tone)
  const outData = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (visited[idx]) {
        const pidx = idx * channels;
        // Subtle radial dark gradient around center
        const dx = (x - width / 2) / (width / 2);
        const dy = (y - height / 2) / (height / 2);
        const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
        
        // Dark slate charcoal background matching Cheese Bites theme
        const bgR = Math.round(18 - dist * 8);
        const bgG = Math.round(19 - dist * 8);
        const bgB = Math.round(25 - dist * 8);

        outData[pidx] = bgR;
        outData[pidx + 1] = bgG;
        outData[pidx + 2] = bgB;
      }
    }
  }

  await sharp(outData, { raw: { width, height, channels } })
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'pizza-bbq.jpg'));
  console.log('Saved pizza-bbq.jpg with dark background');

  console.log('4. Processing Special Offer 1 banner (Image 5)...');
  const offer1Src = path.join(userMediaDir, 'media_1793553575576_becb870a.jpg');
  await sharp(offer1Src)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-medium-two-pizzas.jpg'));
  console.log('Saved deal-duo-medium-two-pizzas.jpg (Special Pizza Offer 1)');

  console.log('5. Processing Special Offer 2 banner (Image 4)...');
  const offer2Src = path.join(userMediaDir, 'media_1793553575577_d64783f0.jpg');
  await sharp(offer2Src)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(outputDir, 'deal-duo-large-two-pizzas.jpg'));
  console.log('Saved deal-duo-large-two-pizzas.jpg (Special Pizza Offer 2)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

