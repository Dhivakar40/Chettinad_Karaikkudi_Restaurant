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
  imageUrl?: string;
  imageAlt: string;           // Descriptive placeholder for real image
  allergens?: string[];
}

function createPlaceholderImageUrl(label: string) {
  return `https://placehold.co/900x600/png?text=${encodeURIComponent(label)}`;
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

const RAW_MENU_ITEMS: Dish[] = [
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
    imageUrl: 'https://i.pinimg.com/736x/a2/01/98/a201987ba02cacd8d1f968d7b6576f6d.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/06/ed/09/06ed09642a3fec94d114cfcf4aa78d20.jpg',
    imageAlt: '[Image: Creamy white vegetable soup in a white ceramic bowl, garnished with coconut cream swirl and roasted cashews]',
  },
  {
    id: 'soup-003',
    name: 'Kari Kozhambu Soup',
    nameInTamil: 'காரி கோழம்பு சூப்',
    category: 'Soups',
    description:
      'Thin, tangy tamarind and tomato broth infused with Chettinad spice paste. A traditional appetiser-soup that awakens the palate.',
    price: 160,
    isVeg: true,
    spiceLevel: 3,
    imageUrl: 'https://i.pinimg.com/1200x/a1/52/d7/a152d7a8d63f0798dacef961ab0daa6a.jpg',
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
    imageUrl: 'https://www.bing.com/th/id/OIG2.nYnavc2jNmCtPb8CgV53?w=540&h=540&c=6&r=0&o=5&cb=thfvnextfalcon2&dpr=1.3&pid=ImgGn',
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
    imageUrl: 'https://i.pinimg.com/736x/4c/6e/5a/4c6e5ac126f89c1337b58d9515c9dcf6.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/5e/61/8c/5e618c05d1c81bf13cdd925a9718bc09.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/23/d4/dc/23d4dcc1960434af0937ec14d06e42fd.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/c3/17/0e/c3170e61b9fbfbaf702e75046b89bee1.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/67/d1/9b/67d19bcbd284a3ba876851aad796e8dd.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/01/62/8b/01628b6fd94c3eab6ac837897cab307c.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/55/20/5e/55205e2dbac1ce1f22c48cc4b885ce6d.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/10/21/5f/10215f3e50a42ab56806c96a62c805fe.jpg',
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
    imageUrl: 'https://thfvnext.bing.com/th/id/OIG2.QO_Udc6CcdM3gkIkXqd4?w=270&h=270&c=6&r=0&o=5&cb=thfvnextfalcon2&dpr=1.3&pid=ImgGn',
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
    imageUrl: 'https://i.pinimg.com/736x/5e/61/8c/5e618c05d1c81bf13cdd925a9718bc09.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/78/95/b7/7895b7fb6001ff8f8093059471c2a57d.jpg',
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
    imageUrl: 'https://thechennaicafeaz.com/wp-content/uploads/2023/01/Barotta.png',
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
    imageUrl: 'https://thfvnext.bing.com/th/id/OIG4.sai_2S6kC5RYu4Kr9PUY?w=270&h=270&c=6&r=0&o=5&cb=thfvnextfalcon2&dpr=1.3&pid=ImgGn',
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
    imageUrl: 'https://i.pinimg.com/736x/7e/db/7e/7edb7edeaa4e1fedf896ff447d7ffd3a.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/a3/40/7a/a3407a3a96331f36e28c59438500f1d2.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/9e/df/21/9edf21c637de72d4fedde884b480b8f3.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/8a/8e/a1/8a8ea1984061f97b0e4c79bb8a6fe6c0.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/8b/85/78/8b85780e754cbd6f01e09f29345dda44.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/12/7c/bf/127cbf3658e5e4d678af5ae549c73e54.jpg',
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
    imageUrl: 'https://i.pinimg.com/1200x/5b/57/9b/5b579bc36549914e322b8f0d9592a4b1.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/cc/c5/66/ccc566a333103af70bc46baff3c0c621.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/12/7c/bf/127cbf3658e5e4d678af5ae549c73e54.jpg',
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
    imageUrl: 'https://i.pinimg.com/736x/5e/61/8c/5e618c05d1c81bf13cdd925a9718bc09.jpg',
    imageAlt: '[Image: A small clay cup of golden panakam drink garnished with a twist of dried ginger, served on a banana leaf]',
  },
];

export const MENU_ITEMS: Dish[] = RAW_MENU_ITEMS.map((dish) => ({
  ...dish,
  imageUrl: dish.imageUrl ?? createPlaceholderImageUrl(dish.name),
}));

// Helper: get dishes by category
export function getDishesByCategory(category: Category): Dish[] {
  return MENU_ITEMS.filter((dish) => dish.category === category);
}

// Helper: get bestseller dishes for homepage
export function getBestsellers(): Dish[] {
  return MENU_ITEMS.filter((dish) => dish.isBestseller);
}
