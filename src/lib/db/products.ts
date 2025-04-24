
import { supabase } from "@/lib/supabaseClient";

export const getProducts = async (categoryId?: string, limit = 50, page = 0) => {
  console.log("Getting products with categoryId:", categoryId || "All categories");
  
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  
  // Only apply limit and pagination if specifically requested
  if (limit < 50) {
    query = query.range(page * limit, (page + 1) * limit - 1);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  console.log(`Found ${data?.length || 0} products`);
  return data || [];
};

export const getProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_id", productId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

