
import ProductCard from "@/components/ProductCard";
import { fruits } from "@/data/fruits";

export default function Shop() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-4">Shop Fruits</h2>

      {/* Only Fruits as category */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className="bg-primary text-white px-4 py-2 rounded-full font-semibold shadow"
          style={{ textTransform: "capitalize" }}
        >
          Fruits
        </button>
      </div>

      {/* Products grid */}
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
