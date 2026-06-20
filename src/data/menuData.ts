// ============================================================
// Menu Data — Srimathi Karaikudi Chettinad Restaurant
// Replace prices, descriptions, and images with real data.
// ============================================================

export type Category =
  | 'Soups'
  | 'Starters'
  | 'Main Course'
  | 'Breads'
  | 'Rice & Biryani'
  | 'Desserts'
  | 'Beverages';

export interface Dish {
  id: string;
  name: string;
  nameInTamil?: string;
  category: Category;
  description: string;
  price: number;              // in INR
  isVeg: boolean;
  spiceLevel: 1 | 2 | 3 | 4; // 1=mild, 4=fiery
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  imageAlt: string;           // Descriptive placeholder for real image
  allergens?: string[];
}

export const MENU_CATEGORIES: Category[] = [
  'Soups',
  'Starters',
  'Main Course',
  'Breads',
  'Rice & Biryani',
  'Desserts',
  'Beverages',
];

export const MENU_ITEMS: Dish[] = [
  // ── SOUPS ──────────────────────────────────────────────────
  {
    id: 'soup-001',
    name: 'Nattu Kozhi Rasam',
    nameInTamil: 'நாட்டு கோழி ரசம்',
    category: 'Soups',
    description:
      'A soul-warming country chicken broth, slow-cooked with freshly ground black pepper, star anise, and hand-pounded spices. Deeply aromatic and intensely flavourful.',
    price: 180,
    isVeg: false,
    spiceLevel: 3,
    isBestseller: true,
    imageAlt: '[Image: Steaming bowl of dark, aromatic Nattu Kozhi Rasam garnished with fresh coriander and a wedge of lime, on a rustic clay plate]',
  },
  {
    id: 'soup-002',
    name: 'Vellai Kuruma Soup',
    nameInTamil: 'வெள்ளை குருமா சூப்',
    category: 'Soups',
    description:
      'A delicate, coconut-milk based vegetable soup with white pepper, cashews, and fragrant kewra. Mild and comforting.',
    price: 150,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: Creamy white vegetable soup in a white ceramic bowl, garnished with coconut cream swirl and roasted cashews]',
  },
  {
    id: 'soup-003',
    name: 'Kari Kozhambu Soup',
    category: 'Soups',
    description:
      'Thin, tangy tamarind and tomato broth infused with Chettinad spice paste. A traditional appetiser-soup that awakens the palate.',
    price: 160,
    isVeg: true,
    spiceLevel: 3,
    imageAlt: '[Image: Bright, reddish-brown tamarind rasam in a brass tumbler, steam rising, with curry leaves floating on top]',
  },

  // ── STARTERS ────────────────────────────────────────────────
  {
    id: 'start-001',
    name: 'Kavuni Varuval',
    nameInTamil: 'கவுனி வறுவல்',
    category: 'Starters',
    description:
      'Crispy fried lamb pieces marinated overnight in a Chettinad masala of kalpasi (stone flower), marathi mokku, and freshly ground red chillies. Garnished with crispy shallots.',
    price: 380,
    isVeg: false,
    spiceLevel: 4,
    isChefSpecial: true,
    isBestseller: true,
    imageAlt: '[Image: Close-up of golden-brown Kavuni Varuval lamb pieces piled on a banana leaf, deep red spice crust visible, with lemon wedge and sliced onions]',
  },
  {
    id: 'start-002',
    name: 'Chettinad Chicken 65',
    category: 'Starters',
    description:
      'Bite-sized chicken pieces marinated in a fiery yoghurt-and-spice batter, deep-fried to perfection. Tossed in curry leaves, dried chillies, and garlic.',
    price: 320,
    isVeg: false,
    spiceLevel: 3,
    isBestseller: true,
    imageAlt: '[Image: A heap of bright orange Chicken 65 pieces tossed with green curry leaves, served on a sizzling iron plate with mint chutney]',
  },
  {
    id: 'start-003',
    name: 'Kuzhi Paniyaram',
    nameInTamil: 'குழி பணியாரம்',
    category: 'Starters',
    description:
      'Traditional puffed rice dumplings made from fermented batter, cooked in a special kuzhi paniyaram pan. Served with two chutneys: coconut and tomato.',
    price: 180,
    isVeg: true,
    spiceLevel: 1,
    isBestseller: true,
    imageAlt: '[Image: Six golden kuzhi paniyaram balls in a wooden serving tray, with white coconut chutney and red tomato chutney in small clay bowls]',
  },
  {
    id: 'start-004',
    name: 'Prawn Varuval',
    category: 'Starters',
    description:
      'Tiger prawns tossed in a fiery dry-roasted masala of Guntur chillies, cumin, and freshly grated coconut. A coastal Chettinad delicacy.',
    price: 420,
    isVeg: false,
    spiceLevel: 4,
    imageAlt: '[Image: Large tiger prawns coated in dark red spice, stir-fried with curry leaves and dried red chillies in a black iron wok]',
  },
  {
    id: 'start-005',
    name: 'Veg Cutlet Chettinad',
    category: 'Starters',
    description:
      'Crispy potato and vegetable patties seasoned with Chettinad masala, pan-fried golden. Served with green chutney and pickled onions.',
    price: 220,
    isVeg: true,
    spiceLevel: 2,
    imageAlt: '[Image: Three oval-shaped golden vegetable cutlets on a slate board, with vibrant green mint chutney and pickled pink onions]',
  },

  // ── MAIN COURSE ─────────────────────────────────────────────
  {
    id: 'main-001',
    name: 'Chettinad Chicken Masala',
    nameInTamil: 'செட்டிநாடு சிக்கன் மசாலா',
    category: 'Main Course',
    description:
      'Our signature preparation — bone-in chicken slow-cooked in a complex masala of over 20 freshly ground spices including kalpasi, marathi mokku, and dried kalpasi flowers. Rich, thick gravy with deep red colour.',
    price: 420,
    isVeg: false,
    spiceLevel: 3,
    isChefSpecial: true,
    isBestseller: true,
    imageAlt: '[Image: Overhead shot of Chettinad Chicken Masala in a traditional brass handi, deep burgundy gravy, with fresh coriander sprigs and golden oil pooling on the surface]',
  },
  {
    id: 'main-002',
    name: 'Mutton Chukka',
    nameInTamil: 'ஆட்டு சுக்கா',
    category: 'Main Course',
    description:
      'Tender pieces of mutton slow-cooked until dry-roasted in a masala of whole spices, shallots, and freshly grated coconut. A celebration dish of Chettinad households.',
    price: 480,
    isVeg: false,
    spiceLevel: 3,
    isBestseller: true,
    isChefSpecial: true,
    imageAlt: '[Image: High-resolution overhead shot of steaming Mutton Chukka served on a banana leaf, dark roasted pieces glistening with spice-infused oil, garnished with fried curry leaves]',
  },
  {
    id: 'main-003',
    name: 'Nandu Masala (Crab Curry)',
    nameInTamil: 'நண்டு மசாலா',
    category: 'Main Course',
    description:
      'Whole mud crab cooked in a fiery coconut-and-spice gravy with freshly ground Chettinad masala. Best enjoyed with hand-rolled appam.',
    price: 650,
    isVeg: false,
    spiceLevel: 4,
    imageAlt: '[Image: A whole mud crab halved and submerged in thick, vibrant orange-red coconut curry in a clay pot, with green curry leaves and sliced tomatoes on top]',
  },
  {
    id: 'main-004',
    name: 'Paneer Kuzhambu',
    category: 'Main Course',
    description:
      'Soft paneer cubes simmered in a tangy tamarind and tomato-based Chettinad gravy, perfumed with freshly ground spices and fenugreek.',
    price: 340,
    isVeg: true,
    spiceLevel: 2,
    imageAlt: '[Image: Golden paneer cubes in a dark, glossy tamarind-spice gravy in an earthen pot, garnished with fresh coriander]',
  },
  {
    id: 'main-005',
    name: 'Nethili Meen Kuzhambu',
    category: 'Main Course',
    description:
      'Anchovies slow-cooked in a traditional sour tamarind and tomato fish curry with freshly ground Chettinad masala. Pairs beautifully with steamed rice.',
    price: 380,
    isVeg: false,
    spiceLevel: 3,
    imageAlt: '[Image: Small anchovies in a deep red tamarind fish curry in a clay kadai, with curry leaves and raw mango pieces visible]',
  },
  {
    id: 'main-006',
    name: 'Kaikari Kuruma',
    category: 'Main Course',
    description:
      'A fragrant mixed vegetable curry in a cashew and coconut milk white gravy, scented with kewra and whole spices. Mild, creamy, and aromatic.',
    price: 300,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: Colourful mixed vegetables in a creamy white coconut gravy in a silver serving bowl, garnished with roasted cashews and rose water]',
  },

  // ── BREADS ──────────────────────────────────────────────────
  {
    id: 'bread-001',
    name: 'Parotta',
    category: 'Breads',
    description:
      'Flaky, layered South Indian flat bread made with maida, folded and puffed on a griddle. Best paired with our Chettinad gravies.',
    price: 60,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: Three golden, flaky parottas stacked on a banana leaf, showing their layered texture, steam rising]',
  },
  {
    id: 'bread-002',
    name: 'Veechu Parotta',
    category: 'Breads',
    description:
      'The Karaikudi specialty — a wafer-thin, circular parotta made by spinning the dough. Light, crispy, and irresistible.',
    price: 70,
    isVeg: true,
    spiceLevel: 1,
    isBestseller: true,
    imageAlt: '[Image: A round, paper-thin veechu parotta on a banana leaf, translucent edges visible, with dhal on the side]',
  },
  {
    id: 'bread-003',
    name: 'Appam',
    category: 'Breads',
    description:
      'Soft, fluffy fermented rice pancakes with lacy, crispy edges. Traditionally served with coconut milk or stew.',
    price: 80,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: Three appams in a round pan, soft white centres and golden-brown lacy edges, served with coconut milk in a small clay cup]',
  },
  {
    id: 'bread-004',
    name: 'Idiappam',
    category: 'Breads',
    description:
      'Steamed rice flour noodles pressed through a mould, soft and delicate. Served with coconut chutney or korma.',
    price: 90,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: A neat bundle of soft white idiappam strings on a banana leaf with freshly grated coconut and orange-coloured stew]',
  },

  // ── RICE & BIRYANI ──────────────────────────────────────────
  {
    id: 'rice-001',
    name: 'Chettinad Chicken Biryani',
    nameInTamil: 'செட்டிநாடு கோழி பிரியாணி',
    category: 'Rice & Biryani',
    description:
      'Fragrant basmati rice layered with tender chicken marinated in Chettinad spices, slow-cooked in a sealed pot (dum style). Served with raita and salna.',
    price: 380,
    isVeg: false,
    spiceLevel: 3,
    isBestseller: true,
    imageAlt: '[Image: A sealed clay pot being opened at the table, fragrant steam billowing from a golden Chettinad chicken biryani, saffron strands and caramelised onions visible on top]',
  },
  {
    id: 'rice-002',
    name: 'Ghee Rice with Dalcha',
    category: 'Rice & Biryani',
    description:
      'Aromatic ghee-fried basmati rice served with a rich mutton and lentil dalcha. A Chettinad wedding feast staple.',
    price: 280,
    isVeg: false,
    spiceLevel: 2,
    imageAlt: '[Image: A mound of golden ghee rice on a banana leaf with a generous ladle of dark brown dalcha alongside, fried onions scattered on top]',
  },
  {
    id: 'rice-003',
    name: 'Veg Dum Biryani',
    category: 'Rice & Biryani',
    description:
      'Seasonal vegetables and basmati rice cooked dum-style in a sealed handi with saffron milk, rose water, and a blend of whole spices.',
    price: 280,
    isVeg: true,
    spiceLevel: 2,
    imageAlt: '[Image: Fluffy, saffron-tinged vegetable biryani in an open clay pot, with fried cashews, golden onions, and fresh mint leaves as garnish]',
  },

  // ── DESSERTS ────────────────────────────────────────────────
  {
    id: 'dessert-001',
    name: 'Kavuni Arisi Payasam',
    nameInTamil: 'கவுனி அரிசி பாயாசம்',
    category: 'Desserts',
    description:
      'The iconic black rice pudding of Chettinad — slow-cooked kavuni (black glutinous rice) in coconut milk, sweetened with jaggery and flavoured with cardamom. Nutty, earthy, and utterly unique.',
    price: 180,
    isVeg: true,
    spiceLevel: 1,
    isBestseller: true,
    isChefSpecial: true,
    imageAlt: '[Image: A bowl of deep purple-black Kavuni Arisi Payasam with a spiral of thick coconut cream, garnished with pistachios, on a floral Athangudi tile background]',
  },
  {
    id: 'dessert-002',
    name: 'Adirasam',
    nameInTamil: 'அதிரசம்',
    category: 'Desserts',
    description:
      'Traditional Chettinad fried sweet made from rice flour and jaggery, deep-fried until golden and soft inside. A festival favourite.',
    price: 120,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: Three round, golden adirasam sweets stacked in a pyramid on a silver plate, with a sprig of tulsi and powdered sugar dusting]',
  },
  {
    id: 'dessert-003',
    name: 'Paalkova',
    nameInTamil: 'பால்கோவா',
    category: 'Desserts',
    description:
      'Slow-cooked whole milk reduced to a thick, fudge-like confection with sugar and cardamom. A Karaikudi specialty sold at every corner sweet shop.',
    price: 140,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: A generous portion of off-white, creamy paalkova in a small clay cup, scattered with slivers of almond and a light dusting of cardamom powder]',
  },

  // ── BEVERAGES ────────────────────────────────────────────────
  {
    id: 'bev-001',
    name: 'Filter Kaapi',
    nameInTamil: 'ஃபில்டர் காப்பி',
    category: 'Beverages',
    description:
      'The quintessential South Indian coffee — strong, dark decoction blended with hot milk and frothed by pouring between tumblers. Served in a traditional davara.',
    price: 60,
    isVeg: true,
    spiceLevel: 1,
    isBestseller: true,
    imageAlt: '[Image: A brass davara-tumbler set with dark brown filter coffee being poured from height, frothy and steaming, on a wet marble surface]',
  },
  {
    id: 'bev-002',
    name: 'Nannari Sherbet',
    category: 'Beverages',
    description:
      'A cooling, floral drink made from sarsaparilla root syrup, mixed with tender coconut water and a squeeze of lime. A traditional summer cooler.',
    price: 100,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: A tall glass of pale amber Nannari sherbet with basil seeds, ice cubes, and a wedge of lime on the rim, condensation on the glass]',
  },
  {
    id: 'bev-003',
    name: 'Panakam',
    category: 'Beverages',
    description:
      'Traditional jaggery drink with dried ginger, cardamom, and a hint of black pepper. Served cold — a festive and digestive drink.',
    price: 80,
    isVeg: true,
    spiceLevel: 1,
    imageAlt: '[Image: A small clay cup of golden panakam drink garnished with a twist of dried ginger, served on a banana leaf]',
  },
];

// Helper: get dishes by category
export function getDishesByCategory(category: Category): Dish[] {
  return MENU_ITEMS.filter((dish) => dish.category === category);
}

// Helper: get bestseller dishes for homepage
export function getBestsellers(): Dish[] {
  return MENU_ITEMS.filter((dish) => dish.isBestseller);
}
