export interface Fruit {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isOnSale?: boolean;
  rating?: number;
  description?: string;
}

// Existing Fruits products
export const fruits: Fruit[] = [
  {
    id: "fruit-apple",
    name: "Apple",
    price: 100,
    oldPrice: 120,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
    category: "Fruits",
    isOnSale: true,
    rating: 4,
    description: "Fresh apples, crisp and sweet.",
  },
  {
    id: "fruit-banana",
    name: "Banana",
    price: 40,
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=400",
    category: "Fruits",
    isOnSale: false,
    rating: 5,
    description: "Sweet ripe bananas.",
  },
  {
    id: "fruit-orange",
    name: "Orange",
    price: 70,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
    category: "Fruits",
    isOnSale: false,
    rating: 4,
    description: "Juicy oranges packed with vitamin C.",
  },
  {
    id: "fruit-kiwi",
    name: "Kiwi",
    price: 90,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400",
    category: "Fruits",
    isOnSale: true,
    rating: 5,
    description: "Tangy, fresh kiwis.",
  },
  // NEW: Vegetables category
  {
    id: "veg-tomato",
    name: "Tomato",
    price: 25,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400",
    category: "Vegetables",
    isOnSale: false,
    rating: 4,
    description: "Red, ripe tomatoes perfect for salads."
  },
  {
    id: "veg-cucumber",
    name: "Cucumber",
    price: 18,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
    category: "Vegetables",
    isOnSale: false,
    rating: 4,
    description: "Cool, fresh cucumbers."
  },
  // NEW: Bakery category
  {
    id: "bakery-wholewheat-bread",
    name: "Whole Wheat Bread",
    price: 50,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    category: "Bakery",
    isOnSale: false,
    rating: 5,
    description: "Healthy whole wheat bread, baked fresh daily."
  },
  {
    id: "bakery-croissant",
    name: "Croissant",
    price: 30,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400",
    category: "Bakery",
    isOnSale: false,
    rating: 5,
    description: "Flaky, buttery French croissants."
  },
  // NEW: Dairy category
  {
    id: "dairy-milk",
    name: "Milk",
    price: 60,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&fit=crop",
    category: "Dairy",
    isOnSale: false,
    rating: 5,
    description: "Pure and fresh pasteurized milk."
  },
  {
    id: "dairy-cheese",
    name: "Cheddar Cheese",
    price: 140,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    category: "Dairy",
    isOnSale: false,
    rating: 5,
    description: "Rich, creamy cheddar cheese."
  },
  // NEW: Drinks category
  {
    id: "drinks-orange-juice",
    name: "Orange Juice",
    price: 80,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&fit=crop",
    category: "Drinks",
    isOnSale: false,
    rating: 4,
    description: "Freshly squeezed orange juice."
  },
  {
    id: "drinks-cola",
    name: "Cola Can",
    price: 40,
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400",
    category: "Drinks",
    isOnSale: false,
    rating: 4,
    description: "Chilled fizzy cola."
  },
  {
    id: "beverages-green-tea",
    name: "Green Tea",
    price: 99,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
    category: "Beverages",
    isOnSale: false,
    rating: 4,
    description: "Refreshing green tea, full of antioxidants.",
  },
  {
    id: "snacks-chips",
    name: "Potato Chips",
    price: 50,
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400",
    category: "Snacks",
    isOnSale: false,
    rating: 4,
    description: "Crunchy, salted potato chips.",
  },
  {
    id: "spices-black-pepper",
    name: "Black Pepper",
    price: 40,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400",
    category: "Spices",
    isOnSale: false,
    rating: 5,
    description: "Premium quality black pepper.",
  },
  {
    id: "meat-chicken-breast",
    name: "Chicken Breast",
    price: 180,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
    category: "Meat",
    isOnSale: false,
    rating: 5,
    description: "Skinless, boneless chicken breast fillet.",
  },
];
