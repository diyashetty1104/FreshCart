
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  category_id: string;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (!error && data) setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <section className="px-4 pt-10 pb-2 container mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Categories</h2>
      <div className="flex gap-4 flex-wrap items-center">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton className="h-10 w-32 rounded-full" key={i} />
              ))
          : categories.map(cat => (
            <Button
              key={cat.category_id}
              variant="secondary"
              className="rounded-full px-5 py-2 font-semibold text-base shadow hover:bg-secondary/90"
              style={{ textTransform: "capitalize" }}
            >
              {cat.name}
            </Button>
          ))}
      </div>
    </section>
  );
}
