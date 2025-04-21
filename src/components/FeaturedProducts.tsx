import ProductCard from "@/components/ProductCard";

const FeaturedProducts = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 499, // Changed from 4.99 to 499 for realistic Indian prices
      oldPrice: 699,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&auto=format&fit=crop",
      category: "Fruits",
      isOnSale: true,
      rating: 5
    },
    {
      id: 2,
      name: "Fresh Red Tomatoes",
      price: 349,
      image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&auto=format&fit=crop",
      category: "Vegetables",
      rating: 4
    },
    {
      id: 3,
      name: "Farm Fresh Eggs (Dozen)",
      price: 599,
      oldPrice: 749,
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&auto=format&fit=crop",
      category: "Dairy & Eggs",
      isOnSale: true,
      rating: 5
    },
    {
      id: 4,
      name: "Whole Grain Bread",
      price: 399,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&auto=format&fit=crop",
      category: "Bakery",
      rating: 4
    },
    {
      id: 5,
      name: "Fresh Atlantic Salmon",
      price: 1299,
      oldPrice: 1599,
      image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&auto=format&fit=crop",
      category: "Fish",
      isOnSale: true,
      rating: 5
    },
    {
      id: 6,
      name: "Organic Avocado (Pack of 4)",
      price: 699,
      image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&auto=format&fit=crop",
      category: "Fruits",
      rating: 4
    },
    {
      id: 7,
      name: "Organic Bell Peppers Mix",
      price: 549,
      oldPrice: 729,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&auto=format&fit=crop",
      category: "Vegetables",
      isOnSale: true,
      rating: 4
    },
    {
      id: 8,
      name: "Premium Ground Coffee",
      price: 899,
      image: "https://images.unsplash.com/photo-1559056199-641700fd58ff?q=80&auto=format&fit=crop",
      category: "Beverages",
      rating: 5
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <a href="#" className="text-primary hover:text-accent font-medium">View All</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
