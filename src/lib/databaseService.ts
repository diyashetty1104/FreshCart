
import { supabase } from "@/integrations/supabase/client";

// --- USER related functions ---

export const createUser = async (userData: { name: string; email: string; password: string; phone?: string; address?: string }) => {
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (authError) throw authError;

  // Insert user data in public.users table
  if (authData.user) {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          user_id: authData.user.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || null,
          address: userData.address || null,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// --- PRODUCT related functions ---

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

// --- CATEGORY related functions ---

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

// --- CART related functions ---

export const getUserCart = async (userId: string) => {
  // Get or create cart for user
  let { data: cart, error: cartError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (cartError) throw cartError;

  if (!cart) {
    // Cart doesn't exist, create one
    const { data: newCart, error: createError } = await supabase
      .from("cart")
      .insert({ user_id: userId })
      .select()
      .maybeSingle();

    if (createError) throw createError;
    cart = newCart;
  }

  // Get cart items with product details
  const { data: cartItems, error: itemsError } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("cart_id", cart.cart_id);

  if (itemsError) throw itemsError;

  return { cart, items: cartItems };
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  // Get user's cart or create one
  let { data: cart, error: cartError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (cartError) throw cartError;

  if (!cart) {
    // Cart doesn't exist, create one
    const { data: newCart, error: createError } = await supabase
      .from("cart")
      .insert({ user_id: userId })
      .select()
      .maybeSingle();

    if (createError) throw createError;
    cart = newCart;
  }

  // First check if there's an existing product in the database with this ID
  const { data: existingProduct, error: productError } = await supabase
    .from("products")
    .select("product_id")
    .eq("product_id", productId)
    .maybeSingle();

  // If the product doesn't exist in the database, we need to add it
  // In a real application, you would want to properly sync this data
  // For now, we'll just allow the non-UUID format product ID
  
  // Check if item already in cart
  const { data: existingItem, error: checkError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.cart_id)
    .eq("product_id", productId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("cart_item_id", existingItem.cart_item_id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  } else {
    // Add new item
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        cart_id: cart.cart_id,
        product_id: productId,
        quantity,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("cart_item_id", cartItemId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const removeCartItem = async (cartItemId: string) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_item_id", cartItemId);

  if (error) throw error;
  return true;
};

// More functions for orders, reviews, etc. can be added as needed

