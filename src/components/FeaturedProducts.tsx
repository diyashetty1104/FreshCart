
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  product_id: string;
  name: string;
  price: number;
  old_price?: number;
  image: string;
  category_id: string;
  category: string;
  is_on_sale: boolean;
  rating?: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      
      const categoryMap: Record<string, string> = {};
      data.forEach(category => {
        categoryMap[category.category_id] = category.name;
      });
      setCategories(categoryMap);
    };

    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error("Error loading featured products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            price={Number(product.price)}
            oldPrice={product.old_price ? Number(product.old_price) : undefined}
            image={product.image || "/placeholder.svg"}
            category={categories[product.category_id] || "Uncategorized"}
            isOnSale={Boolean(product.is_on_sale)}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
