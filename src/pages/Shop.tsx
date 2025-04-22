
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Category {
  category_id: string;
  name: string;
}

interface Product {
  product_id: string;
  name: string;
  price: number;
  old_price?: number;
  image: string | null;
  category_id: string;
  is_on_sale: boolean;
  rating?: number;
  description?: string;
}

export default function Shop() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (!error && data) setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchProducts() {
      let query = supabase.from("products").select("*").order("created_at", { ascending: false });
      if (activeCategory) query = query.eq("category_id", activeCategory);
      const { data, error } = await query;
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-4">Shop</h2>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory ? "outline" : "default"}
          onClick={() => setActiveCategory(null)}
          size="sm"
        >
          All
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.category_id}
            variant={activeCategory === cat.category_id ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.category_id)}
            size="sm"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div className="h-96 bg-gray-100 rounded-xl animate-pulse" key={i} />
              ))
          : products.length === 0
          ? (
              <div className="col-span-full text-center text-muted-foreground py-16 text-xl">
                No products found.
              </div>
            )
          : products.map(product => (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                price={Number(product.price)}
                oldPrice={product.old_price ? Number(product.old_price) : undefined}
                image={product.image || "/placeholder.svg"}
                category={
                  categories.find(cat => cat.category_id === product.category_id)?.name || ""
                }
                isOnSale={Boolean(product.is_on_sale)}
                rating={product.rating}
                description={product.description}
              />
            ))}
      </div>
    </div>
  );
}
