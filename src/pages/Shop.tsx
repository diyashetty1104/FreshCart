
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

  // Handle product filtering by selected category and pad to at least 10 items
  let filteredFruits = selectedCategory
    ? fruits.filter((fruit) => fruit.category === selectedCategory)
    : fruits;

  // Pad with existing items to reach at least 10, if needed
  if (filteredFruits.length > 0 && filteredFruits.length < 10) {
    const pad = [];
    let idx = 0;
    // Avoid infinite loop if source is empty (shouldn't happen)
    while (pad.length + filteredFruits.length < 10 && filteredFruits.length > 0) {
      pad.push(filteredFruits[idx % filteredFruits.length]);
      idx++;
    }
    filteredFruits = filteredFruits.concat(pad);
  }

  // If there is no product for the selected category, show a no-products message
  const productGrid =
    filteredFruits.length === 0 ? (
      <div className="col-span-full text-center text-gray-500 py-10">
        No products available in this category.
      </div>
    ) : (
      filteredFruits.slice(0, 10).map((fruit, i) => (
        <ProductCard
          key={`${fruit.id}-${i}`}
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

