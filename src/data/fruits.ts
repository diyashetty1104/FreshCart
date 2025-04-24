
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

export const fruits: Fruit[] = [
  {
    id: "fruit-apple",
    name: "Apple",
    price: 100,
    oldPrice: 120,
    image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=400",
    category: "Fruits",
    isOnSale: true,
    rating: 4,
    description: "Fresh red apples, crisp and sweet.",
  },
  {
    id: "fruit-banana",
    name: "Banana",
    price: 40,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    category: "Fruits",
    rating: 5,
    description: "Fresh yellow bananas.",
  },
  {
    id: "fruit-orange",
    name: "Orange",
    price: 70,
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400",
    category: "Fruits",
    rating: 4,
    description: "Sweet juicy oranges.",
  },
  {
    id: "veg-tomato",
    name: "Tomato",
    price: 25,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    category: "Vegetables",
    rating: 4,
    description: "Fresh ripe tomatoes."
  },
  {
    id: "veg-cucumber",
    name: "Cucumber",
    price: 18,
    image: "https://images.unsplash.com/photo-1449300079323-02847456d222?w=400",
    category: "Vegetables",
    rating: 4,
    description: "Fresh green cucumbers."
  },
  {
    id: "bakery-bread",
    name: "Whole Wheat Bread",
    price: 50,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    category: "Bakery",
    rating: 5,
    description: "Freshly baked whole wheat bread."
  },
  {
    id: "dairy-milk",
    name: "Fresh Milk",
    price: 60,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    category: "Dairy",
    rating: 5,
    description: "Fresh cow's milk."
  },
  {
    id: "drinks-orange-juice",
    name: "Orange Juice",
    price: 80,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
    category: "Drinks",
    rating: 4,
    description: "Fresh squeezed orange juice."
  }
];
