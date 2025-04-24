import ProductCard from "@/components/ProductCard";
import { fruits } from "@/data/fruits";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Derive unique categories from fruits dataset, for filter UI
const getCategories = () => {
  const set = new Set<string>();
  for (const fruit of fruits) set.add(fruit.category);
  return Array.from(set);
};

export default function Shop() {
  const navigate = useNavigate();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackToHome = () => {
    navigate("/");
  };

  // Get filtered products based on selected category
  const filteredFruits = selectedCategory
    ? fruits.filter((fruit) => fruit.category === selectedCategory)
    : fruits;

  // Remove duplicate products by name - keep only the first occurrence
  const uniqueProducts = filteredFruits.reduce((unique, item) => {
    // If we haven't seen this product name before, add it to our array
    if (!unique.some(product => product.name === item.name)) {
      unique.push(item);
    }
    return unique;
  }, [] as typeof fruits);

  // If there is no product for the selected category, show a no-products message
  const productGrid =
    uniqueProducts.length === 0 ? (
      <div className="col-span-full text-center text-gray-500 py-10">
        No products available in this category.
      </div>
    ) : (
      uniqueProducts.map((fruit) => (
        <ProductCard
          key={fruit.id}
          id={fruit.id}
          name={fruit.name}
          price={fruit.price}
          oldPrice={fruit.oldPrice}
          image={fruit.image}
          category={fruit.category}
          isOnSale={fruit.isOnSale}
          rating={fruit.rating}
          description={fruit.description}
        />
      ))
    );

  return (
    <div className="container mx-auto px-2 md:px-4 py-8 min-h-[80vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <h2 className="text-2xl md:text-3xl font-bold">Shop</h2>
        <Button 
          variant="outline" 
          onClick={handleBackToHome}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          key="all"
          className={`px-4 py-2 rounded-full font-semibold shadow border transition
            ${selectedCategory === null ? 
              "bg-primary text-white" 
              : "bg-background text-primary border-primary"}`}
          style={{ textTransform: "capitalize" }}
          type="button"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-semibold shadow border transition
              ${selectedCategory === category ?
                "bg-primary text-white"
                : "bg-background text-primary border-primary"}`}
            style={{ textTransform: "capitalize" }}
            type="button"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Responsive grid for products */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-6
          w-full
        "
      >
        {productGrid}
      </div>
    </div>
  );
}
