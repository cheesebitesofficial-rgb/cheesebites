import React, { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'en' | 'ur';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  isUrdu: boolean;
  dir: 'ltr' | 'rtl';
}

const translations: Record<string, Record<Lang, string>> = {
  // Header Nav
  'nav.home': { en: 'Home', ur: 'ہوم' },
  'nav.menu': { en: 'Menu', ur: 'مینو' },
  'nav.deals': { en: 'Deals', ur: 'ڈیلز' },
  'nav.about': { en: 'About', ur: 'ہمارے بارے میں' },
  'nav.contact': { en: 'Contact', ur: 'رابطہ' },
  'nav.orderOnline': { en: 'Order Online', ur: 'آن لائن آرڈر' },
  'nav.orderOnlineNow': { en: 'Order Online Now', ur: 'ابھی آرڈر کریں' },
  'nav.searchPlaceholder': { en: 'Enter your delivery location...', ur: 'اپنا پتہ درج کریں...' },

  // Footer
  'footer.quickLinks': { en: 'Quick Links', ur: 'فوری لنکس' },
  'footer.specialties': { en: 'Our Specialties', ur: 'ہماری خصوصیات' },
  'footer.orderHotline': { en: 'Order Hotline', ur: 'آرڈر ہاٹ لائن' },
  'footer.callToOrder': { en: 'Call To Order', ur: 'آرڈر کے لیے کال کریں' },
  'footer.deliveryHours': { en: 'Delivery Hours', ur: 'ڈیلیوری اوقات' },
  'footer.storeLocation': { en: 'Store Location', ur: 'دکان کا پتہ' },
  'footer.followUs': { en: 'Follow Us', ur: 'ہمیں فالو کریں' },
  'footer.homePage': { en: 'Home Page', ur: 'ہوم پیج' },
  'footer.fullMenu': { en: 'Full Food Menu', ur: 'مکمل مینو' },
  'footer.combos': { en: 'Special Combo Deals', ur: 'خصوصی کومبو ڈیلز' },
  'footer.aboutUs': { en: 'About Cheese Bites', ur: 'چیز بائٹس کے بارے میں' },
  'footer.contactDelivery': { en: 'Contact & Delivery', ur: 'رابطہ اور ڈیلیوری' },
  'footer.viewCart': { en: 'View Cart', ur: 'کارٹ دیکھیں' },
  'footer.thanks': { en: 'THANK YOU FOR CHOOSING CHEESE BITES', ur: 'چیز بائٹس کا انتخاب کرنے کا شکریہ' },
  'footer.madeWith': { en: 'Made with', ur: '' },
  'footer.forLovers': { en: 'for Pizza Lovers', ur: 'پیزا لورز کے لیے' },
  'footer.rights': { en: 'Cheese Bites Restaurant. All Rights Reserved.', ur: 'چیز بائٹس ریسٹورنٹ۔ جملہ حقوق محفوظ ہیں۔' },
  'footer.desc': { en: 'Serving hot, cheesy, freshly prepared pizzas, crispy zinger burgers, stuffed crusts, and family deals made with premium ingredients.', ur: 'گرم، پنیری، تازہ تیار پیزا، کرسپی زنگر برگر، سٹفڈ کرسٹ، اور پریمیم اجزاء سے بنے فیملی ڈیلز۔' },

  // Checkout
  'checkout.title': { en: 'Checkout', ur: 'چیک آؤٹ' },
  'checkout.subtitle': { en: 'Complete your contact info and order options', ur: 'اپنی رابطہ معلومات اور آرڈر آپشنز مکمل کریں' },
  'checkout.backToBasket': { en: 'Back to Basket', ur: 'واپس ٹوکری پر' },
  'checkout.orderType': { en: 'Choose Order Type:', ur: 'آرڈر کی قسم منتخب کریں:' },
  'checkout.delivery': { en: 'Home Delivery', ur: 'ہوم ڈیلیوری' },
  'checkout.deliverySub': { en: 'Delivered hot to your door', ur: 'گرما گرم آپ کے گھر تک' },
  'checkout.takeaway': { en: 'Self Takeaway', ur: 'خود لے جائیں' },
  'checkout.takeawaySub': { en: 'Pick up at 17 Meel Stop ISB', ur: '17 میل سٹاپ ISB سے لیں' },
  'checkout.contactDetails': { en: 'Contact & Address Details:', ur: 'رابطہ اور پتے کی تفصیلات:' },
  'checkout.fullName': { en: 'Full Name', ur: 'پورا نام' },
  'checkout.phone': { en: 'Phone Number', ur: 'فون نمبر' },
  'checkout.address': { en: 'Street / House Delivery Address', ur: 'گلی / مکان ڈیلیوری ایڈریس' },
  'checkout.notes': { en: 'Special Order Instructions / Notes (Optional)', ur: 'خصوصی ہدایات / نوٹس (اختیاری)' },
  'checkout.payment': { en: 'Payment Method:', ur: 'ادائیگی کا طریقہ:' },
  'checkout.review': { en: 'Order Review', ur: 'آرڈر کا جائزہ' },
  'checkout.items': { en: 'Items', ur: 'آئٹمز' },
  'checkout.subtotal': { en: 'Subtotal', ur: 'سب ٹوٹل' },
  'checkout.deliveryCharge': { en: 'Delivery Charge', ur: 'ڈیلیوری چارج' },
  'checkout.free': { en: 'FREE', ur: 'مفت' },
  'checkout.totalPayable': { en: 'Total Payable', ur: 'کل قابل ادائیگی' },
  'checkout.placeOrder': { en: 'ORDER VIA WHATSAPP', ur: 'واٹس ایپ پر آرڈر کریں' },
  'checkout.placing': { en: 'OPENING WHATSAPP...', ur: 'واٹس ایپ کھل رہا ہے...' },
  'checkout.noItems': { en: 'No Items to Checkout', ur: 'چیک آؤٹ کے لیے کوئی آئٹم نہیں' },
  'checkout.backToMenu': { en: 'Back to Menu', ur: 'مینو پر واپس' },

  // Confirmation
  'confirm.thanks': { en: 'Thank you for choosing Cheese Bites!', ur: 'چیز بائٹس کا انتخاب کرنے کا شکریہ!' },
  'confirm.title': { en: 'Order Sent to WhatsApp!', ur: 'آرڈر واٹس ایپ پر بھیج دیا گیا!' },
  'confirm.received': { en: 'We have received your order. Please wait for confirmation.', ur: 'ہمیں آپ کا آرڈر موصول ہو گیا ہے۔ براہ کرم تصدیق کا انتظار کریں۔' },
  'confirm.orderNumber': { en: 'Your Order Number', ur: 'آپ کا آرڈر نمبر' },
  'confirm.summary': { en: 'Order Summary & Delivery Details', ur: 'آرڈر کی تفصیلات' },
  'confirm.customerName': { en: 'Customer Name', ur: 'گاہک کا نام' },
  'confirm.phoneNumber': { en: 'Phone Number', ur: 'فون نمبر' },
  'confirm.orderType': { en: 'Order Type', ur: 'آرڈر کی قسم' },
  'confirm.paymentMethod': { en: 'Payment Method', ur: 'ادائیگی کا طریقہ' },
  'confirm.deliveryAddress': { en: 'Delivery Address', ur: 'ڈیلیوری کا پتہ' },
  'confirm.specialInstructions': { en: 'Special Instructions', ur: 'خصوصی ہدایات' },
  'confirm.itemsOrdered': { en: 'Items Ordered:', ur: 'آرڈر کی گئی آئٹمز:' },
  'confirm.totalCharged': { en: 'Total Charged Amount', ur: 'کل رقم' },
  'confirm.orderMore': { en: 'Order More Food', ur: 'مزید آرڈر کریں' },
  'confirm.whatsappNote': { en: 'Your order has been sent to our WhatsApp. Our team will confirm it shortly.', ur: 'آپ کا آرڈر ہمارے واٹس ایپ پر بھیج دیا گیا ہے۔ ہماری ٹیم جلد تصدیق کرے گی۔' },
  'confirm.notFound': { en: 'Order Not Found', ur: 'آرڈر نہیں ملا' },

  // ============== HOME PAGE ==============
  'home.badge': { en: 'Freshly Made • Premium Ingredients • Always Hot', ur: 'تازہ تیار • عمدہ اجزاء • ہمیشہ گرم' },
  'home.headline1': { en: 'Satisfy Your', ur: 'اپنی' },
  'home.headline2': { en: 'Pizza Cravings', ur: 'پیزا خواہش پوری کریں' },
  'home.subtitle': { en: 'Welcome to Cheese Bites, where we serve the most mouthwatering pizzas in town. Our menu is filled with a variety of flavors and toppings to satisfy your cravings.', ur: 'چیز بائٹس میں خوش آمدید، جہاں ہم شہر کے سب سے مزیدار پیزا پیش کرتے ہیں۔ ہمارا مینو مختلف ذائقوں اور ٹاپنگز سے بھرا ہوا ہے۔' },
  'home.orderNow': { en: 'Order Now', ur: 'ابھی آرڈر کریں' },
  'home.seeMenu': { en: 'See The Menu', ur: 'مینو دیکھیں' },
  'home.cheesePizza': { en: 'Cheese Pizza', ur: 'چیز پیزا' },
  'home.crownCrust': { en: 'Crown Crust', ur: 'کراؤن کرسٹ' },
  'home.fastDelivery': { en: 'Fast Delivery To Home', ur: 'گھر تک فوری ڈیلیوری' },
  'home.fastDeliveryDesc': { en: 'Get delivery fastest ever within 30-45 minutes', ur: '30-45 منٹ میں تیز ترین ڈیلیوری حاصل کریں' },
  'home.qualityGuaranteed': { en: 'Quality Guaranteed', ur: 'معیار کی ضمانت' },
  'home.qualityDesc': { en: '100% real mozzarella & fresh daily dough', ur: '100% اصل موزاریلا اور روزانہ تازہ آٹا' },
  'home.trackOrder': { en: 'Track Your Order', ur: 'اپنا آرڈر ٹریک کریں' },
  'home.trackOrderDesc': { en: 'Live real-time order tracking to your door', ur: 'آپ کے دروازے تک ریئل ٹائم آرڈر ٹریکنگ' },

  // Home - Category Section
  'home.menuLabel': { en: 'THE CHEESE BITES MENU', ur: 'چیز بائٹس مینو' },
  'home.browseCategories': { en: 'Browse Categories', ur: 'کیٹیگریز دیکھیں' },
  'home.exploreFullMenu': { en: 'EXPLORE FULL MENU', ur: 'مکمل مینو دیکھیں' },
  'home.items': { en: 'Items', ur: 'آئٹمز' },

  // Category tags
  'cat.pizza': { en: 'Pizza', ur: 'پیزا' },
  'cat.burgers': { en: 'Burgers', ur: 'برگرز' },
  'cat.deals': { en: 'Deals', ur: 'ڈیلز' },
  'cat.rollParatha': { en: 'Roll Paratha', ur: 'رول پراٹھا' },
  'cat.pasta': { en: 'Pasta', ur: 'پاستا' },
  'cat.friedChicken': { en: 'Fried Chicken', ur: 'فرائیڈ چکن' },
  'cat.fries': { en: 'Fries', ur: 'فرائیز' },
  'cat.sandwiches': { en: 'Sandwiches', ur: 'سینڈوچز' },
  'cat.tag.pizza': { en: 'Stuffed Crust & Gourmet', ur: 'سٹفڈ کرسٹ اور گورمے' },
  'cat.tag.burgers': { en: 'Crispy Zinger Fillets', ur: 'کرسپی زنگر فلٹس' },
  'cat.tag.deals': { en: 'Deals 1 to 20', ur: 'ڈیل 1 سے 20' },
  'cat.tag.rollParatha': { en: 'Crispy Grilled Rolls', ur: 'کرسپی گرلڈ رولز' },
  'cat.tag.pasta': { en: 'Creamy Alfredo Bowls', ur: 'کریمی الفریڈو باولز' },
  'cat.tag.friedChicken': { en: 'Golden Glazed Wings', ur: 'گولڈن گلیزڈ ونگز' },
  'cat.tag.fries': { en: 'Hot Loaded Cheese', ur: 'گرم لوڈڈ چیز' },
  'cat.tag.sandwiches': { en: 'Toasted Mughlai Clubs', ur: 'ٹوسٹڈ مغلائی کلبز' },

  // Home - Campaign Deal
  'home.featuredDeal': { en: 'FEATURED CAMPAIGN DEAL', ur: 'خصوصی مہم ڈیل' },
  'home.theBig': { en: 'THE BIG', ur: 'دی بِگ' },
  'home.flex': { en: 'FLEX', ur: 'فلیکس' },
  'home.bigFlexDesc': { en: 'Feed the entire crew with our grand flex deal:', ur: 'ہماری گرینڈ فلیکس ڈیل سے پوری ٹیم کو کھلائیں:' },
  'home.xlPizzas': { en: '2 XL Pizzas', ur: '2 ایکس ایل پیزا' },
  'home.largePasta': { en: '1 Large Alfredo Pasta', ur: '1 لارج الفریڈو پاستا' },
  'home.drink': { en: '1.5L Drink', ur: '1.5 لیٹر ڈرنک' },
  'home.claimDeal': { en: 'CLAIM BIG FLEX DEAL', ur: 'بِگ فلیکس ڈیل لیں' },
  'home.saveHuge': { en: 'SAVE HUGE', ur: 'بڑی بچت' },

  // Home - Best Sellers
  'home.mostCraved': { en: 'MOST CRAVED FAVORITES', ur: 'سب سے زیادہ پسندیدہ' },
  'home.bestSellers': { en: 'Best Sellers', ur: 'بیسٹ سیلرز' },
  'home.viewCompleteMenu': { en: 'VIEW COMPLETE MENU', ur: 'مکمل مینو دیکھیں' },

  // Home - Story Section
  'home.qualityCommitment': { en: 'OUR QUALITY COMMITMENT', ur: 'ہمارا معیار کا وعدہ' },
  'home.craftedWith': { en: 'Crafted With Passion &', ur: 'جذبے سے بنایا گیا اور' },
  'home.realCheese': { en: '100% Real Cheese', ur: '100% اصل پنیر' },
  'home.storyDesc': { en: 'From our freshly kneaded dough to our signature cheese bites stuffed with premium mozzarella, every single bite is made hot to order. No shortcuts, just real flavor.', ur: 'ہمارے تازہ گوندھے ہوئے آٹے سے لے کر پریمیم موزاریلا سے بھرے ہمارے خاص چیز بائٹس تک، ہر لقمہ آرڈر پر گرم بنایا جاتا ہے۔ کوئی شارٹ کٹ نہیں، صرف اصل ذائقہ۔' },
  'home.realMozzarella': { en: 'Real Mozzarella', ur: 'اصل موزاریلا' },
  'home.gourmetDeals': { en: 'Gourmet Deals', ur: 'گورمے ڈیلز' },
  'home.expressDelivery': { en: 'Express Delivery', ur: 'ایکسپریس ڈیلیوری' },

  // Home - Reviews
  'home.realCustomerStories': { en: 'REAL CUSTOMER STORIES', ur: 'حقیقی گاہکوں کے تجربات' },
  'home.whatFoodiesSay': { en: 'What Foodies Are Saying', ur: 'کھانے کے شوقین کیا کہتے ہیں' },
  'home.verifiedBuyer': { en: 'Verified Buyer', ur: 'تصدیق شدہ خریدار' },
  'home.review1': { en: 'The cheese pull on the crown crust pizza is insane! Best pizza spot in town by far.', ur: 'کراؤن کرسٹ پیزا کا چیز پل لاجواب ہے! شہر کی بہترین پیزا جگہ۔' },
  'home.review2': { en: 'Loaded cheese fries and Zinger burgers are super crispy and delicious. 10/10 recommended!', ur: 'لوڈڈ چیز فرائیز اور زنگر برگر بہت کرسپی اور مزیدار ہیں۔ 10/10 تجویز کردہ!' },
  'home.review3': { en: 'Fast delivery, steaming hot food, and deal 20 fed our entire family easily. Great value!', ur: 'تیز ڈیلیوری، گرما گرم کھانا، اور ڈیل 20 نے ہماری پوری فیملی کو آسانی سے کھلایا۔ بہترین قیمت!' },
  'home.reviewer1': { en: 'Hamza Khan', ur: 'حمزہ خان' },
  'home.reviewer2': { en: 'Ayesha Malik', ur: 'عائشہ ملک' },
  'home.reviewer3': { en: 'Bilal Ahmed', ur: 'بلال احمد' },
  'home.2daysAgo': { en: '2 days ago', ur: '2 دن پہلے' },
  'home.1weekAgo': { en: '1 week ago', ur: '1 ہفتے پہلے' },
  'home.3daysAgo': { en: '3 days ago', ur: '3 دن پہلے' },

  // Home - Final CTA
  'home.hungryYet': { en: 'HUNGRY YET?', ur: 'بھوک لگی ہے؟' },
  'home.orderCheeseBites': { en: 'Order Your Cheese Bites Now!', ur: 'ابھی چیز بائٹس آرڈر کریں!' },
  'home.ctaDesc': { en: 'Hot, fresh, and bursting with mozzarella — delivered straight to your door in 30 minutes.', ur: 'گرم، تازہ، اور موزاریلا سے بھرپور — 30 منٹ میں آپ کے دروازے تک۔' },
  'home.exploreMenuOrder': { en: 'EXPLORE MENU & ORDER', ur: 'مینو دیکھیں اور آرڈر کریں' },
  'home.viewSpecialDeals': { en: '🔥 VIEW SPECIAL DEALS', ur: '🔥 خصوصی ڈیلز دیکھیں' },

  // ============== MENU PAGE ==============
  'menu.onlineSelection': { en: 'ONLINE SELECTION', ur: 'آن لائن انتخاب' },
  'menu.ourComplete': { en: 'Our Complete', ur: 'ہمارا مکمل' },
  'menu.menuTitle': { en: 'Menu', ur: 'مینو' },
  'menu.description': { en: 'Explore our handcrafted stuffed crust pizzas, crispy zinger burgers, fresh rolls, creamy pastas, and combo deals. Made fresh and delivered hot.', ur: 'ہمارے ہاتھ سے بنے سٹفڈ کرسٹ پیزا، کرسپی زنگر برگر، تازہ رولز، کریمی پاستا، اور کومبو ڈیلز دیکھیں۔ تازہ بنائے اور گرم ڈیلیور کیے جاتے ہیں۔' },
  'menu.searchPlaceholder': { en: 'Search pizza flavor, zinger burger, pasta, deal...', ur: 'پیزا فلیور، زنگر برگر، پاستا، ڈیل تلاش کریں...' },
  'menu.all': { en: 'All', ur: 'سب' },
  'menu.showing': { en: 'Showing', ur: 'دکھا رہے ہیں' },
  'menu.menuOptions': { en: 'menu options', ur: 'مینو آپشنز' },
  'menu.clearFilters': { en: 'Clear Filters', ur: 'فلٹرز صاف کریں' },
  'menu.noItems': { en: 'No menu items found', ur: 'کوئی مینو آئٹم نہیں ملا' },
  'menu.noItemsDesc': { en: "We couldn't find anything matching", ur: 'ہمیں کچھ نہیں ملا جو مماثل ہو' },
  'menu.trySearching': { en: 'Try searching for another term like "Tikka", "Zinger", or "Deal".', ur: '"ٹکا"، "زنگر"، یا "ڈیل" جیسی کوئی اور ٹرم تلاش کریں۔' },
  'menu.resetSearch': { en: 'Reset Search', ur: 'تلاش ری سیٹ کریں' },
  'menu.individualDishes': { en: 'Individual Dishes', ur: 'انفرادی ڈشز' },
  'menu.specialComboDeals': { en: 'Special Combo Deals', ur: 'خصوصی کومبو ڈیلز' },
  'menu.dealsRange': { en: 'Deals 1 through 20', ur: 'ڈیل 1 سے 20' },

  // ============== CART PAGE ==============
  'cart.emptyTitle': { en: 'Your Basket is Empty', ur: 'آپ کی ٹوکری خالی ہے' },
  'cart.emptyDesc': { en: "Looks like you haven't added any Cheese Bites pizzas, zinger burgers, or deal packages to your cart yet.", ur: 'لگتا ہے آپ نے ابھی تک کوئی چیز بائٹس پیزا، زنگر برگر، یا ڈیل پیکج اپنی ٹوکری میں نہیں ڈالا۔' },
  'cart.browseMenu': { en: 'Browse Full Menu', ur: 'مکمل مینو دیکھیں' },
  'cart.yourFood': { en: 'Your Food', ur: 'آپ کا کھانا' },
  'cart.basket': { en: 'Basket', ur: 'ٹوکری' },
  'cart.reviewItems': { en: 'Review your order items before checkout', ur: 'چیک آؤٹ سے پہلے اپنے آرڈر کے آئٹمز دیکھیں' },
  'cart.clearBasket': { en: 'Clear Basket', ur: 'ٹوکری خالی کریں' },
  'cart.size': { en: 'Size', ur: 'سائز' },
  'cart.includes': { en: 'Includes', ur: 'شامل ہیں' },
  'cart.toppings': { en: 'Toppings', ur: 'ٹاپنگز' },
  'cart.continueShopping': { en: 'Continue Shopping', ur: 'خریداری جاری رکھیں' },
  'cart.orderSummary': { en: 'Order Summary', ur: 'آرڈر کا خلاصہ' },
  'cart.itemsSubtotal': { en: 'Items Subtotal', ur: 'آئٹمز سب ٹوٹل' },
  'cart.deliveryFee': { en: 'Delivery Fee', ur: 'ڈیلیوری فیس' },
  'cart.free': { en: 'FREE', ur: 'مفت' },
  'cart.totalAmount': { en: 'Total Amount', ur: 'کل رقم' },
  'cart.proceedCheckout': { en: 'PROCEED TO CHECKOUT', ur: 'چیک آؤٹ کریں' },
  'cart.fastDelivery': { en: 'Fast 30-Minute Guaranteed Delivery', ur: '30 منٹ فوری ڈیلیوری کی ضمانت' },

  // ============== ABOUT PAGE ==============
  'about.storyBadge': { en: 'The Cheese Bites Story', ur: 'چیز بائٹس کی کہانی' },
  'about.fresh': { en: 'Fresh. Cheesy.', ur: 'تازہ۔ پنیری۔' },
  'about.delicious': { en: 'Delicious.', ur: 'لذیذ۔' },
  'about.heroDesc': { en: "Crafting Islamabad's finest stuffed crust pizzas, crispy zinger burgers, hand-folded roll parathas, and rich oven-baked pastas with passion and 100% pure cheese.", ur: 'اسلام آباد کے بہترین سٹفڈ کرسٹ پیزا، کرسپی زنگر برگر، ہاتھ سے بنے رول پراٹھے، اور اوون بیکڈ پاستا جذبے اور 100% خالص پنیر سے بنائے جاتے ہیں۔' },
  'about.heritageLabel': { en: 'OUR CULINARY HERITAGE', ur: 'ہمارا پکوان ورثہ' },
  'about.passionTitle': { en: 'Passion for Real Taste', ur: 'اصل ذائقے کا جذبہ' },
  'about.para1': { en: 'Cheese Bites was established with a single mission: to bring gourmet fast-food quality at everyday affordable prices. We source 100% real mozzarella cheese, premium halal chicken breast fillets, and fresh garden vegetables daily.', ur: 'چیز بائٹس ایک مقصد کے ساتھ قائم ہوا: ہر روز کی سستی قیمتوں پر گورمے فاسٹ فوڈ کا معیار لانا۔ ہم 100% اصل موزاریلا چیز، پریمیم حلال چکن بریسٹ فلٹس، اور تازہ سبزیاں روزانہ حاصل کرتے ہیں۔' },
  'about.para2': { en: 'Whether you are craving a Solo Era meal, sharing a Squad Goals deal with friends, or indulging in our signature Cheese Stuffer Pizza late at night, our kitchen guarantees explosive flavor in every single bite.', ur: 'چاہے آپ کو سولو ایرا میل کی خواہش ہو، دوستوں کے ساتھ سکواڈ گولز ڈیل شیئر کر رہے ہوں، یا رات کو ہمارے خاص چیز سٹفر پیزا سے لطف اندوز ہو رہے ہوں، ہمارا کچن ہر لقمے میں لاجواب ذائقے کی ضمانت دیتا ہے۔' },
  'about.valueCombos': { en: 'Value Combos', ur: 'ویلیو کومبوز' },
  'about.realMozzarella': { en: 'Real Mozzarella', ur: 'اصل موزاریلا' },
  'about.dailyDelivery': { en: 'Daily Delivery', ur: 'روزانہ ڈیلیوری' },
  'about.readyTitle': { en: 'Ready to Experience Cheese Bites?', ur: 'چیز بائٹس کا تجربہ کرنے کو تیار ہیں؟' },
  'about.readyDesc': { en: 'Order online now for hot 30-minute delivery or pickup at 17 Meel Stop Japan Dam Road ISB.', ur: 'ابھی آن لائن آرڈر کریں گرم 30 منٹ ڈیلیوری کے لیے یا 17 میل سٹاپ جاپان ڈیم روڈ ISB سے لے جائیں۔' },
  'about.orderOnlineNow': { en: 'ORDER ONLINE NOW', ur: 'ابھی آن لائن آرڈر کریں' },

  // ============== CONTACT PAGE ==============
  'contact.getInTouch': { en: 'GET IN TOUCH', ur: 'ہم سے رابطہ کریں' },
  'contact.contactTitle': { en: 'Contact &', ur: 'رابطہ اور' },
  'contact.location': { en: 'Location', ur: 'مقام' },
  'contact.heroDesc': { en: 'Have a question about your order or want to cater a large event? Reach out to Cheese Bites hotline.', ur: 'اپنے آرڈر کے بارے میں کوئی سوال ہے یا کسی بڑے ایونٹ کی کیٹرنگ چاہتے ہیں؟ چیز بائٹس ہاٹ لائن سے رابطہ کریں۔' },
  'contact.storeDetails': { en: 'Official Store Details', ur: 'دکان کی سرکاری تفصیلات' },
  'contact.orderHotline': { en: 'Order Hotline', ur: 'آرڈر ہاٹ لائن' },
  'contact.deliveryHours': { en: 'Delivery Hours', ur: 'ڈیلیوری اوقات' },
  'contact.restaurantAddress': { en: 'Restaurant Address', ur: 'ریسٹورنٹ کا پتہ' },
  'contact.sendMessage': { en: 'Send Us a Direct Message', ur: 'ہمیں براہ راست پیغام بھیجیں' },
  'contact.yourName': { en: 'Your Name *', ur: 'آپ کا نام *' },
  'contact.enterName': { en: 'Enter full name', ur: 'پورا نام درج کریں' },
  'contact.phoneNumber': { en: 'Phone Number *', ur: 'فون نمبر *' },
  'contact.enterPhone': { en: 'Enter phone number', ur: 'فون نمبر درج کریں' },
  'contact.yourMessage': { en: 'Your Message / Feedback *', ur: 'آپ کا پیغام / رائے *' },
  'contact.howHelp': { en: 'How can we assist you?', ur: 'ہم آپ کی کیسے مدد کر سکتے ہیں؟' },
  'contact.sendBtn': { en: 'SEND MESSAGE', ur: 'پیغام بھیجیں' },
  'contact.sentSuccess': { en: 'Message Sent Successfully!', ur: 'پیغام کامیابی سے بھیج دیا گیا!' },
  'contact.sentDesc': { en: 'Our restaurant team will contact you shortly on', ur: 'ہماری ریسٹورنٹ ٹیم جلد آپ سے رابطہ کرے گی' },

  // ============== DEALS PAGE ==============
  'deals.badge': { en: 'Official Cheese Bites Saver Combos', ur: 'آفیشل چیز بائٹس سیور کومبوز' },
  'deals.title': { en: 'Special Combo', ur: 'خصوصی کومبو' },
  'deals.titleHighlight': { en: 'Deals', ur: 'ڈیلز' },
  'deals.description': { en: 'From Deal 1 to Deal 20 — enjoy authentic Cheese Bites combinations with fresh pizzas, zinger burgers, paratha rolls, fries, wings, and cold drinks.', ur: 'ڈیل 1 سے ڈیل 20 تک — تازہ پیزا، زنگر برگر، پراٹھا رولز، فرائیز، ونگز، اور کولڈ ڈرنکس کے ساتھ چیز بائٹس کے اصلی کومبو سے لطف اندوز ہوں۔' },
  'deals.soloEra': { en: 'Solo Era', ur: 'سولو ایرا' },
  'deals.soloEraDesc': { en: 'Single portion meals crafted for solo hunger & fast quick bites', ur: 'اکیلے کی بھوک اور فوری کھانے کے لیے بنائے گئے سنگل پورشن میلز' },
  'deals.hitsDifferent': { en: 'Hits Different', ur: 'ہٹس ڈفرنٹ' },
  'deals.hitsDifferentDesc': { en: 'Perfect combos for two or late night snack craving duos', ur: 'دو لوگوں یا رات کے سنیک کی خواہش کے لیے بہترین کومبو' },
  'deals.squadGoals': { en: 'Squad Goals', ur: 'سکواڈ گولز' },
  'deals.squadGoalsDesc': { en: 'Great value meal platters for friends, roommates & squads', ur: 'دوستوں، روم میٹس اور گروپس کے لیے بہترین ویلیو میل پلیٹرز' },
  'deals.theBigFlex': { en: 'The Big Flex', ur: 'دی بِگ فلیکس' },
  'deals.theBigFlexDesc': { en: 'Grand feasts loaded with large pizzas, burgers, pasta & 1.5L drinks', ur: 'بڑے پیزا، برگر، پاستا اور 1.5 لیٹر ڈرنکس سے بھری شاندار دعوتیں' },
  'deals.dealsLabel': { en: 'Deals', ur: 'ڈیلز' },
  'deals.duoPizzaDesc': { en: 'Two pizzas from Legend & Premium flavours with cold drink — perfect duo combo', ur: 'لیجنڈ اور پریمیم فلیورز سے دو پیزا کولڈ ڈرنک کے ساتھ — بہترین ڈوو کومبو' },

  // ============== ORDER TRACKING PAGE ==============
  'tracking.liveTracking': { en: 'LIVE FOOD ORDER TRACKING', ur: 'لائیو فوڈ آرڈر ٹریکنگ' },
  'tracking.order': { en: 'Order', ur: 'آرڈر' },
  'tracking.createdAt': { en: 'Created at', ur: 'بنایا گیا' },
  'tracking.estDelivery': { en: 'Est. Delivery', ur: 'متوقع ڈیلیوری' },
  'tracking.mins': { en: 'mins', ur: 'منٹ' },
  'tracking.refreshing': { en: 'Refreshing...', ur: 'ریفریش ہو رہا ہے...' },
  'tracking.updated': { en: 'Updated', ur: 'اپ ڈیٹ ہوا' },
  'tracking.callHotline': { en: 'Call Hotline', ur: 'ہاٹ لائن پر کال کریں' },
  'tracking.cancelled': { en: 'This Order Has Been Cancelled', ur: 'یہ آرڈر منسوخ ہو گیا ہے' },
  'tracking.cancelledDesc': { en: 'Please contact restaurant hotline', ur: 'براہ کرم ریسٹورنٹ ہاٹ لائن سے رابطہ کریں' },
  'tracking.forAssistance': { en: 'for assistance.', ur: 'مدد کے لیے۔' },
  'tracking.currentStatus': { en: 'Current Status', ur: 'موجودہ حالت' },
  'tracking.livePOS': { en: 'Live POS Updates Active', ur: 'لائیو POS اپ ڈیٹس فعال' },
  'tracking.timeline': { en: 'Preparation Timeline', ur: 'تیاری کی ٹائم لائن' },
  'tracking.inProgress': { en: 'IN PROGRESS', ur: 'جاری ہے' },
  'tracking.orderNotFound': { en: 'Order Not Found', ur: 'آرڈر نہیں ملا' },
  'tracking.couldNotFind': { en: 'Could not find order ID', ur: 'آرڈر ID نہیں ملی' },
  'tracking.backHome': { en: 'Back to Home', ur: 'ہوم پر واپس' },
  'tracking.orderInfo': { en: 'Order Info summary', ur: 'آرڈر کی معلومات' },
  'tracking.customer': { en: 'Customer', ur: 'گاہک' },
  'tracking.deliveryLocation': { en: 'Delivery Location', ur: 'ڈیلیوری مقام' },
  'tracking.paymentInfo': { en: 'Payment Info', ur: 'ادائیگی کی معلومات' },
  'tracking.itemsLabel': { en: 'Items', ur: 'آئٹمز' },

  // Tracking statuses
  'status.pending': { en: 'Order Received', ur: 'آرڈر موصول ہوا' },
  'status.pendingDesc': { en: 'Order submitted & waiting for kitchen confirmation', ur: 'آرڈر جمع ہو گیا اور کچن کی تصدیق کا انتظار ہے' },
  'status.confirmed': { en: 'Confirmed', ur: 'تصدیق ہو گئی' },
  'status.confirmedDesc': { en: 'Order accepted by Cheese Bites kitchen team', ur: 'چیز بائٹس کچن ٹیم نے آرڈر قبول کر لیا' },
  'status.preparing': { en: 'Preparing Food', ur: 'کھانا تیار ہو رہا ہے' },
  'status.preparingDesc': { en: 'Baking pizza dough & frying zinger chicken fresh', ur: 'پیزا کا آٹا بیک ہو رہا ہے اور زنگر چکن تازہ فرائی ہو رہا ہے' },
  'status.ready': { en: 'Order Ready', ur: 'آرڈر تیار ہے' },
  'status.readyDesc': { en: 'Packed hot in insulated delivery box', ur: 'گرم انسولیٹڈ ڈیلیوری باکس میں پیک ہو گیا' },
  'status.outForDelivery': { en: 'Out for Delivery', ur: 'ڈیلیوری کے لیے روانہ' },
  'status.outForDeliveryDesc': { en: 'Rider is on the way to your delivery address', ur: 'رائیڈر آپ کے ڈیلیوری ایڈریس کی طرف آ رہا ہے' },
  'status.delivered': { en: 'Delivered', ur: 'ڈیلیور ہو گیا' },
  'status.deliveredDesc': { en: 'Enjoy your hot & cheesy feast!', ur: 'اپنے گرم اور پنیری کھانے سے لطف اندوز ہوں!' },

  // ============== PRODUCT CARD ==============
  'product.quickCustomize': { en: 'Quick Customize', ur: 'فوری کسٹمائز' },
  'product.hotPopular': { en: 'Hot Popular', ur: 'مقبول ترین' },
  'product.chefSpecial': { en: 'Chef Special', ur: 'شیف اسپیشل' },
  'product.startingFrom': { en: 'Starting from', ur: 'شروع' },
  'product.options': { en: 'Options', ur: 'آپشنز' },
  'product.add': { en: 'Add', ur: 'شامل کریں' },

  // ============== PRODUCT DETAILS MODAL ==============
  'modal.popularChoice': { en: 'Popular Choice', ur: 'مقبول انتخاب' },
  'modal.selectSize': { en: 'Select Size:', ur: 'سائز منتخب کریں:' },
  'modal.addToppings': { en: 'Add Extra Toppings:', ur: 'اضافی ٹاپنگز شامل کریں:' },
  'modal.perTopping': { en: 'per topping', ur: 'فی ٹاپنگ' },
  'modal.addToOrder': { en: 'Add To Order', ur: 'آرڈر میں شامل کریں' },

  // ============== DEAL CARD ==============
  'deal.deal': { en: 'DEAL', ur: 'ڈیل' },
  'deal.hotDeal': { en: 'Hot Deal', ur: 'گرم ڈیل' },
  'deal.includesCombo': { en: 'Includes Combo Meal:', ur: 'کومبو میل شامل ہے:' },
  'deal.comboPrice': { en: 'Combo Price', ur: 'کومبو قیمت' },
  'deal.addToCart': { en: 'Add To Cart', ur: 'کارٹ میں شامل کریں' },

  // General
  'lang.switch': { en: 'اردو', ur: 'English' },
  'cart.empty': { en: 'Your cart is empty.', ur: 'آپ کی ٹوکری خالی ہے۔' },
  'error.name': { en: 'Please enter your full name.', ur: 'براہ کرم اپنا پورا نام درج کریں۔' },
  'error.phone': { en: 'Please enter a valid phone number so our rider can contact you.', ur: 'براہ کرم درست فون نمبر درج کریں تاکہ رائیڈر آپ سے رابطہ کر سکے۔' },
  'error.address': { en: 'Please enter your delivery street address.', ur: 'براہ کرم اپنا ڈیلیوری ایڈریس درج کریں۔' },
  'error.failed': { en: 'Failed to place order. Please try again.', ur: 'آرڈر دینے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('cb_lang') as Lang) || 'en';
    } catch { return 'en'; }
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'ur' : 'en';
      try { localStorage.setItem('cb_lang', next); } catch {}
      return next;
    });
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[lang] || key;
  }, [lang]);

  const dir = lang === 'ur' ? 'rtl' as const : 'ltr' as const;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isUrdu: lang === 'ur', dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
