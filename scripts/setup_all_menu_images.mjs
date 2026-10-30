import fs from 'fs';
import path from 'path';

const MENU_DIR = path.join(process.cwd(), 'public', 'images', 'menu');
if (!fs.existsSync(MENU_DIR)) {
  fs.mkdirSync(MENU_DIR, { recursive: true });
}

const ITEMS_MAP = [
  // 1. Pizzas
  { filename: 'pizza-veggie-max.jpg', url: 'https://images.pexels.com/photos/36295120/pexels-photo-36295120.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-cheese.jpg', url: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-half-half.jpg', url: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-chicken-tikka.jpg', url: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-fajita.jpg', url: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-supreme.jpg', url: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-bbq.jpg', url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-tandoori.jpg', url: 'https://images.pexels.com/photos/35386737/pexels-photo-35386737.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-chicken-grill.jpg', url: 'https://images.pexels.com/photos/845811/pexels-photo-845811.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-cheese-stuffer.jpg', url: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-kabab-stuffer.jpg', url: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-behari-kabab.jpg', url: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-cream-melt.jpg', url: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-malai-boti.jpg', url: 'https://images.pexels.com/photos/4109078/pexels-photo-4109078.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-cheese-bites-special.jpg', url: 'https://images.pexels.com/photos/30504707/pexels-photo-30504707.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pizza-crown-crust.jpg', url: 'https://images.pexels.com/photos/31450842/pexels-photo-31450842.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 2. Burgers
  { filename: 'burger-chicken.jpg', url: 'https://images.pexels.com/photos/17121731/pexels-photo-17121731.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-zinger.jpg', url: 'https://images.pexels.com/photos/34407059/pexels-photo-34407059.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-grill.jpg', url: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-double-zinger.jpg', url: 'https://images.pexels.com/photos/9207184/pexels-photo-9207184.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-jambo.jpg', url: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-double-jambo.jpg', url: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'burger-tower.jpg', url: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 3. Sandwiches
  { filename: 'sandwich-mughlai.jpg', url: 'https://images.pexels.com/photos/29346178/pexels-photo-29346178.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'sandwich-crunch.jpg', url: 'https://images.pexels.com/photos/37228372/pexels-photo-37228372.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'sandwich-grill.jpg', url: 'https://images.pexels.com/photos/19034914/pexels-photo-19034914.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'sandwich-bites-special.jpg', url: 'https://images.pexels.com/photos/19674144/pexels-photo-19674144.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 4. Pastas
  { filename: 'pasta-alfredo.jpg', url: 'https://images.pexels.com/photos/10895517/pexels-photo-10895517.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pasta-arabian.jpg', url: 'https://images.pexels.com/photos/20794382/pexels-photo-20794382.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pasta-hot-spicy.jpg', url: 'https://images.pexels.com/photos/16525900/pexels-photo-16525900.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pasta-crunchy.jpg', url: 'https://images.pexels.com/photos/10895515/pexels-photo-10895515.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'pasta-bites-special.jpg', url: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 5. Fried Chicken
  { filename: 'chicken-fried-1pc.jpg', url: 'https://images.pexels.com/photos/9609716/pexels-photo-9609716.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'chicken-nuggets-10pcs.jpg', url: 'https://images.pexels.com/photos/5798939/pexels-photo-5798939.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'chicken-hot-wings.jpg', url: 'https://images.pexels.com/photos/7613556/pexels-photo-7613556.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'chicken-bbq-wings.jpg', url: 'https://images.pexels.com/photos/31189498/pexels-photo-31189498.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'chicken-oven-baked.jpg', url: 'https://images.pexels.com/photos/28157774/pexels-photo-28157774.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'chicken-bites-special.jpg', url: 'https://images.pexels.com/photos/30784013/pexels-photo-30784013.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 6. Roll Parathas
  { filename: 'roll-zinger.jpg', url: 'https://images.pexels.com/photos/29307775/pexels-photo-29307775.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'roll-mughlai.jpg', url: 'https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'roll-kabab.jpg', url: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'roll-chapli.jpg', url: 'https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'roll-creamy.jpg', url: 'https://images.pexels.com/photos/30379848/pexels-photo-30379848.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'roll-cheese-bites-special.jpg', url: 'https://images.pexels.com/photos/29955735/pexels-photo-29955735.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 7. Fries
  { filename: 'fries-simple-medium.jpg', url: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'fries-masala-small.jpg', url: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'fries-masala-large.jpg', url: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'fries-loaded.jpg', url: 'https://images.pexels.com/photos/27758758/pexels-photo-27758758.jpeg?auto=compress&cs=tinysrgb&w=800' },

  // 8. Combos (Deals 1 to 20 + 2 Duo Deals)
  { filename: 'deal-1-chicken-burger-fries.jpg', url: 'https://images.pexels.com/photos/34466111/pexels-photo-34466111.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-2-zinger-burger-fries.jpg', url: 'https://images.pexels.com/photos/15662151/pexels-photo-15662151.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-3-chicken-burger-pizza.jpg', url: 'https://images.pexels.com/photos/29938810/pexels-photo-29938810.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-4-two-zingers-fries.jpg', url: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-5-spin-rolls-wings.jpg', url: 'https://images.pexels.com/photos/13046463/pexels-photo-13046463.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-6-small-pizza-burger.jpg', url: 'https://images.pexels.com/photos/4109138/pexels-photo-4109138.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-7-two-zingers-pasta.jpg', url: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-8-two-grill-burgers-pizza-fries.jpg', url: 'https://images.pexels.com/photos/2741448/pexels-photo-2741448.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-9-three-zingers-large-fries.jpg', url: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-10-three-zingers-nuggets.jpg', url: 'https://images.pexels.com/photos/28848777/pexels-photo-28848777.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-11-four-chicken-burgers-fries.jpg', url: 'https://images.pexels.com/photos/11522295/pexels-photo-11522295.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-12-two-zingers-medium-pizza.jpg', url: 'https://images.pexels.com/photos/4109136/pexels-photo-4109136.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-13-four-zingers-pasta.jpg', url: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-14-two-zingers-large-pizza.jpg', url: 'https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-15-medium-pizza-two-zingers.jpg', url: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-16-three-zingers-small-pizza.jpg', url: 'https://images.pexels.com/photos/5640051/pexels-photo-5640051.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-17-two-large-pizzas-pasta.jpg', url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-18-two-xl-pizzas-four-zingers.jpg', url: 'https://images.pexels.com/photos/6937455/pexels-photo-6937455.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-19-xl-pizza-wings-two-fries.jpg', url: 'https://images.pexels.com/photos/13593259/pexels-photo-13593259.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-20-two-xl-pizzas-pasta.jpg', url: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-duo-medium-two-pizzas.jpg', url: 'https://images.pexels.com/photos/30379963/pexels-photo-30379963.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { filename: 'deal-duo-large-two-pizzas.jpg', url: 'https://images.pexels.com/photos/40135535/pexels-photo-40135535.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

async function downloadItem(item) {
  const filePath = path.join(MENU_DIR, item.filename);
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.status === 200) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`[OK] ${item.filename} (${buffer.length} bytes)`);
      return true;
    } else {
      console.error(`[FAIL ${res.status}] ${item.filename}`);
      return false;
    }
  } catch (err) {
    console.error(`[ERROR] ${item.filename}: ${err.message}`);
    return false;
  }
}

async function run() {
  console.log(`Starting download of ${ITEMS_MAP.length} menu images into public/images/menu/...`);
  let success = 0;
  for (const item of ITEMS_MAP) {
    const ok = await downloadItem(item);
    if (ok) success++;
  }
  console.log(`\nCompleted! Successfully downloaded ${success} of ${ITEMS_MAP.length} images.`);
}

run();
