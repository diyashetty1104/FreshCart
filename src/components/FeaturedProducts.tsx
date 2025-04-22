
import ProductCard from "./ProductCard";
import { fruits } from "@/data/fruits";

const FeaturedProducts = () => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="text-3xl font-bold text-center mb-12">Featured Fruits</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {fruits.slice(0, 4).map((fruit) => (
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
  </section>
);

export default FeaturedProducts;
