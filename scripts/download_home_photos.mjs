import fs from 'fs';
import path from 'path';

const HOME_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'home');
if (!fs.existsSync(HOME_IMG_DIR)) {
  fs.mkdirSync(HOME_IMG_DIR, { recursive: true });
}

// Curated royalty-free, high-definition (HD), unbranded photography (Pexels CC0 / Unsplash license)
const HOME_IMAGES = [
  {
    filename: 'hero-pizza-burger-wide.jpg',
    url: 'https://images.pexels.com/photos/4109138/pexels-photo-4109138.jpeg?auto=compress&cs=tinysrgb&w=1920',
    description: '1920x1080 Wide HD Feast with Artisanal Pizza, Burgers, Fries & Drinks',
  },
  {
    filename: 'hero-pizza-main.jpg',
    url: 'https://images.pexels.com/photos/30504707/pexels-photo-30504707.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Close-up Fresh Hot Artisan Loaded Pizza with Molten Mozzarella',
  },
  {
    filename: 'hero-badge-pizza.jpg',
    url: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Cheese Pull Pizza Slice for Floating Badge',
  },
  {
    filename: 'hero-badge-burger.jpg',
    url: 'https://images.pexels.com/photos/34407059/pexels-photo-34407059.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Crispy Golden Chicken Zinger Burger for Floating Badge (ref: Foodpanda)',
  },
  {
    filename: 'cat-pizza.jpg',
    url: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Pizza - Gourmet Artisan Stuffed Crust Pizza (ref: Todays Parent)',
  },
  {
    filename: 'cat-burgers.jpg',
    url: 'https://images.pexels.com/photos/17121731/pexels-photo-17121731.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Burgers - Crispy Golden Crumb Fried Chicken Burger (ref: Foodpanda)',
  },
  {
    filename: 'cat-loaded-fries.jpg',
    url: 'https://images.pexels.com/photos/27758758/pexels-photo-27758758.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Loaded Fries - Melted Cheddar & Jalapeno Loaded Fries (ref: Swiggy)',
  },
  {
    filename: 'cat-chicken-wings.jpg',
    url: 'https://images.pexels.com/photos/31189498/pexels-photo-31189498.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Wings - Golden Fried Chicken & Saucy Wings (ref: Talabat)',
  },
  {
    filename: 'cat-creamy-pasta.jpg',
    url: 'https://images.pexels.com/photos/10895515/pexels-photo-10895515.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Pasta - Creamy White Chicken Alfredo Pasta (ref: Bakstunden)',
  },
  {
    filename: 'cat-roll-paratha.jpg',
    url: 'https://images.pexels.com/photos/29307775/pexels-photo-29307775.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Roll Paratha - Crispy Zinger Paratha Wrap',
  },
  {
    filename: 'cat-sandwiches.jpg',
    url: 'https://images.pexels.com/photos/29346178/pexels-photo-29346178.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Category: Sandwiches - Toasted Gourmet Club Sandwich',
  },
  {
    filename: 'cat-deals.jpg',
    url: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Category: Deals - Mega Fast Food Combo Spread with Pizzas & Burgers',
  },
  {
    filename: 'big-flex-deal.jpg',
    url: 'https://images.pexels.com/photos/13046463/pexels-photo-13046463.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'The Big Flex Featured Campaign - Mega Family Feast Deal',
  },
];

async function downloadFile(item) {
  const filePath = path.join(HOME_IMG_DIR, item.filename);
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.status === 200) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`[SAVED] ${item.filename} (${buffer.length} bytes) - ${item.description}`);
      return true;
    } else {
      console.error(`[FAIL ${res.status}] ${item.filename}`);
      return false;
    }
  } catch (err) {
    console.error(`[ERR] ${item.filename}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Downloading ${HOME_IMAGES.length} HD images into public/images/home/...`);
  let success = 0;
  for (const item of HOME_IMAGES) {
    const ok = await downloadFile(item);
    if (ok) success++;
  }
  console.log(`\nFinished: ${success} of ${HOME_IMAGES.length} saved successfully.`);
}

main();
