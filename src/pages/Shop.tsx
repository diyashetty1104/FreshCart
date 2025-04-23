
import ProductCard from "@/components/ProductCard";
import { fruits } from "@/data/fruits";
import React from "react";

// Derive unique categories from fruits dataset, for filter UI
const getCategories = () => {
  const set = new Set<string>();
  for (const fruit of fruits) set.add(fruit.category);
  return Array.from(set);
};

export default function Shop() {
  const categories = getCategories();

  // No filtering by category, just list all available
  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-4">Shop Fruits</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="bg-primary text-white px-4 py-2 rounded-full font-semibold shadow"
            style={{ textTransform: "capitalize" }}
            type="button"
            // Not filtering for now; these are visual only per request
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {fruits.map((fruit) => (
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
        ))}
      </div>
    </div>
  );
}
