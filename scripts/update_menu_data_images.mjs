import fs from 'fs';
import path from 'path';

const menuDataPath = path.join(process.cwd(), 'src', 'data', 'menuData.ts');
let content = fs.readFileSync(menuDataPath, 'utf8');

const IMAGE_MAP = {
  // Special Pizza Offers
  'deal-duo-medium': '/images/menu/deal-duo-medium-two-pizzas.jpg',
  'deal-duo-large': '/images/menu/deal-duo-large-two-pizzas.jpg',

  // 1. Pizzas
  'pizza-vegie-max': '/images/menu/pizza-veggie-max.jpg',
  'pizza-cheese': '/images/menu/pizza-cheese.jpg',
  'pizza-half-half': '/images/menu/pizza-half-half.jpg',
  'pizza-chicken-tikka': '/images/menu/pizza-chicken-tikka.jpg',
  'pizza-fajita': '/images/menu/pizza-fajita.jpg',
  'pizza-supreme': '/images/menu/pizza-supreme.jpg',
  'pizza-bbq': '/images/menu/pizza-bbq.jpg',
  'pizza-tandoori': '/images/menu/pizza-tandoori.jpg',
  'pizza-chicken-grill-juice': '/images/menu/pizza-chicken-grill.jpg',
  'pizza-cheese-stuffer': '/images/menu/pizza-cheese-stuffer.jpg',
  'pizza-kabab-stuffer': '/images/menu/pizza-kabab-stuffer.jpg',
  'pizza-behari-kabab': '/images/menu/pizza-behari-kabab.jpg',
  'pizza-cream-melt': '/images/menu/pizza-cream-melt.jpg',
  'pizza-malai-boti': '/images/menu/pizza-malai-boti.jpg',
  'pizza-bites-special': '/images/menu/pizza-cheese-bites-special.jpg',
  'pizza-crown-crust': '/images/menu/pizza-crown-crust.jpg',

  // 2. Burgers
  'burger-chicken': '/images/menu/burger-chicken.jpg',
  'burger-zinger': '/images/menu/burger-zinger.jpg',
  'burger-grill': '/images/menu/burger-grill.jpg',
  'burger-double-zinger': '/images/menu/burger-double-zinger.jpg',
  'burger-jambo': '/images/menu/burger-jambo.jpg',
  'burger-double-jambo': '/images/menu/burger-double-jambo.jpg',
  'burger-tower': '/images/menu/burger-tower.jpg',

  // 3. Sandwiches
  'sandwich-mughlai': '/images/menu/sandwich-mughlai.jpg',
  'sandwich-crunch': '/images/menu/sandwich-crunch.jpg',
  'sandwich-grill': '/images/menu/sandwich-grill.jpg',
  'sandwich-bites-special': '/images/menu/sandwich-bites-special.jpg',

  // 4. Pastas
  'pasta-alfredo': '/images/menu/pasta-alfredo.jpg',
  'pasta-arabian': '/images/menu/pasta-arabian.jpg',
  'pasta-hot-spicy': '/images/menu/pasta-hot-spicy.jpg',
  'pasta-crunchy': '/images/menu/pasta-crunchy.jpg',
  'pasta-bites-special': '/images/menu/pasta-bites-special.jpg',

  // 5. Fried Chicken
  'fc-1pc': '/images/menu/chicken-fried-1pc.jpg',
  'fc-nuggets': '/images/menu/chicken-nuggets-10pcs.jpg',
  'fc-hot-wings': '/images/menu/chicken-hot-wings.jpg',
  'fc-bbq-wings': '/images/menu/chicken-bbq-wings.jpg',
  'fc-oven-baked': '/images/menu/chicken-oven-baked.jpg',
  'fc-bites-special': '/images/menu/chicken-bites-special.jpg',

  // 6. Roll Parathas
  'roll-zinger': '/images/menu/roll-zinger.jpg',
  'roll-mughlai': '/images/menu/roll-mughlai.jpg',
  'roll-kabab': '/images/menu/roll-kabab.jpg',
  'roll-chapli': '/images/menu/roll-chapli.jpg',
  'roll-creamy': '/images/menu/roll-creamy.jpg',
  'roll-bites-special': '/images/menu/roll-cheese-bites-special.jpg',

  // 7. Fries
  'fries-masala-small': '/images/menu/fries-masala-small.jpg',
  'fries-simple-medium': '/images/menu/fries-simple-medium.jpg',
  'fries-masala-large': '/images/menu/fries-masala-large.jpg',
  'fries-loaded': '/images/menu/fries-loaded.jpg',

  // 8. Combo Deals (1-20)
  'deal-1': '/images/menu/deal-1-chicken-burger-fries.jpg',
  'deal-2': '/images/menu/deal-2-zinger-burger-fries.jpg',
  'deal-3': '/images/menu/deal-3-chicken-burger-pizza.jpg',
  'deal-4': '/images/menu/deal-4-two-zingers-fries.jpg',
  'deal-5': '/images/menu/deal-5-spin-rolls-wings.jpg',
  'deal-6': '/images/menu/deal-6-small-pizza-burger.jpg',
  'deal-7': '/images/menu/deal-7-two-zingers-pasta.jpg',
  'deal-8': '/images/menu/deal-8-two-grill-burgers-pizza-fries.jpg',
  'deal-9': '/images/menu/deal-9-three-zingers-large-fries.jpg',
  'deal-10': '/images/menu/deal-10-three-zingers-nuggets.jpg',
  'deal-11': '/images/menu/deal-11-four-chicken-burgers-fries.jpg',
  'deal-12': '/images/menu/deal-12-two-zingers-medium-pizza.jpg',
  'deal-13': '/images/menu/deal-13-four-zingers-pasta.jpg',
  'deal-14': '/images/menu/deal-14-two-zingers-large-pizza.jpg',
  'deal-15': '/images/menu/deal-15-medium-pizza-two-zingers.jpg',
  'deal-16': '/images/menu/deal-16-three-zingers-small-pizza.jpg',
  'deal-17': '/images/menu/deal-17-two-large-pizzas-pasta.jpg',
  'deal-18': '/images/menu/deal-18-two-xl-pizzas-four-zingers.jpg',
  'deal-19': '/images/menu/deal-19-xl-pizza-wings-two-fries.jpg',
  'deal-20': '/images/menu/deal-20-two-xl-pizzas-pasta.jpg',
};

let replacedCount = 0;
for (const [id, imgPath] of Object.entries(IMAGE_MAP)) {
  // Regex matches object block with id: '<id>' up to image: '<old_image>'
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*)'[^']+'`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1'${imgPath}'`);
    replacedCount++;
  } else {
    console.warn('Could not find item with id:', id);
  }
}

fs.writeFileSync(menuDataPath, content, 'utf8');
console.log(`Updated ${replacedCount} image paths in src/data/menuData.ts!`);

// Also bump cache key in MenuContext.tsx
const menuContextPath = path.join(process.cwd(), 'src', 'context', 'MenuContext.tsx');
let ctxContent = fs.readFileSync(menuContextPath, 'utf8');
ctxContent = ctxContent.replace(/cheese_bites_menu_items_v\d+_[a-z0-9_]+/g, 'cheese_bites_menu_items_v8_brand_real');
ctxContent = ctxContent.replace(/cheese_bites_deals_items_v\d+_[a-z0-9_]+/g, 'cheese_bites_deals_items_v7_brand_real');
fs.writeFileSync(menuContextPath, ctxContent, 'utf8');
console.log('Bumped cache version in MenuContext.tsx!');
