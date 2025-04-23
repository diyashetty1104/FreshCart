
import { fruits } from "@/data/fruits";
import React from "react";

// Get unique categories from dataset, pairing with the first image found for that category
const getCategoriesWithImages = () => {
  const categoryMap: { [cat: string]: string } = {};
  for (const fruit of fruits) {
    if (!(fruit.category in categoryMap)) {
      categoryMap[fruit.category] = fruit.image;
    }
  }
  return Object.entries(categoryMap).map(([category, image]) => ({
    category,
    image,
  }));
};

export default function Categories() {
  const categories = getCategoriesWithImages();

  return (
    <section className="px-4 pt-10 pb-2 container mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Categories</h2>
      <div className="flex gap-4 flex-wrap items-center">
        {categories.map(({ category, image }) => (
          <button
            key={category}
            className="flex items-center gap-2 bg-primary text-white rounded-full px-5 py-2 font-semibold text-base shadow hover:bg-primary/90"
            style={{ textTransform: "capitalize" }}
          >
            <img
              src={image}
              alt={category}
              className="w-8 h-8 object-cover rounded-full"
            />
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
