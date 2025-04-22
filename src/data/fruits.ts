
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

// Placeholder fruit images (unsplash or the default placeholder)
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
];
