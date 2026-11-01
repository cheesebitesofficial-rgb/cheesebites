import fs from 'fs';
import path from 'path';

const TARGET_DIR = path.join(process.cwd(), 'public', 'images', 'menu');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const CATEGORY_IMAGES = [
  {
    category: 'Pizza',
    filename: 'pizza.jpg',
    url: 'https://images.unsplash.com/photo-1754047167137-67ea6bc803b7?auto=format&fit=crop&w=1200&q=85',
    description: 'Hot artisan gourmet pizza with rich mozzarella'
  },
  {
    category: 'Burgers',
    filename: 'burgers.jpg',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    description: 'Juicy close-up gourmet cheeseburger with melting cheddar'
  },
  {
    category: 'Deals',
    filename: 'deals.jpg',
    url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1200&q=85',
    description: 'Fast food combo feast with burgers, wings, and loaded fries'
  },
  {
    category: 'Roll Paratha',
    filename: 'roll-paratha.jpg',
    url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85',
    description: 'Crispy golden grilled chicken wrap roll'
  },
  {
    category: 'Pasta',
    filename: 'pasta.jpg',
    url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=85',
    description: 'Creamy Alfredo pasta bowl with parmesan'
  },
  {
    category: 'Fried Chicken',
    filename: 'fried-chicken.jpg',
    url: 'https://images.unsplash.com/photo-1625937759420-26d7e003e04c?auto=format&fit=crop&w=1200&q=85',
    description: 'Golden crispy fried chicken with fries'
  },
  {
    category: 'Fries',
    filename: 'fries.jpg',
    url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1200&q=85',
    description: 'Loaded cheese fries with savory sauces'
  },
  {
    category: 'Sandwiches',
    filename: 'sandwiches.jpg',
    url: 'https://images.unsplash.com/photo-1703219342329-fce8488cf443?auto=format&fit=crop&w=1200&q=85',
    description: 'Toasted gourmet crispy chicken sandwich'
  }
];

async function downloadAll() {
  console.log(`Starting download of 8 category card HD images into ${TARGET_DIR}...`);
  for (const item of CATEGORY_IMAGES) {
    const filePath = path.join(TARGET_DIR, item.filename);
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`[SUCCESS] ${item.filename} (${(buffer.length / 1024).toFixed(1)} KB) - ${item.description}`);
    } catch (err) {
      console.error(`[ERROR] Failed to download ${item.filename}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

downloadAll();
