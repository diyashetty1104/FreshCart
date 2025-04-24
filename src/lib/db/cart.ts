
import { supabase } from "@/lib/supabaseClient";

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
  try {
    console.log(`Adding product ${productId} to cart for user ${userId}`);
    
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

    // First, find the product by ID or name (to handle both UUID and string IDs)
    let productQuery;
    
    // Check if productId is a UUID format or a string format
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (uuidPattern.test(productId)) {
      // It's a UUID format
      console.log("Using UUID query for product:", productId);
      productQuery = supabase
        .from("products")
        .select("product_id")
        .eq("product_id", productId)
        .single();
    } else {
      // It's a string format (like "fruit-apple")
      // Try to find by name or any other identifier that might match
      console.log("Using name-based query for product:", productId);
      
      // Extract a potential name from the ID (e.g., "fruit-apple" -> "apple")
      const possibleName = productId.split('-').pop();
      
      productQuery = supabase
        .from("products")
        .select("product_id")
        .ilike("name", `%${possibleName}%`)
        .single();
    }
    
    const { data: product, error: productError } = await productQuery;
    
    if (productError || !product) {
      console.error("Error finding product:", productError);
      throw new Error(`Product not found with ID: ${productId}`);
    }
    
    // Use the actual database product_id for cart operations
    const actualProductId = product.product_id;
    console.log("Found product in database with ID:", actualProductId);

    // Check if item already in cart
    const { data: cartItems, error: itemsError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cart.cart_id);
      
    if (itemsError) throw itemsError;
    
    const existingItem = cartItems?.find(item => item.product_id === actualProductId);

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
      const { data, error } = await supabase
        .from("cart_items")
        .insert({
          cart_id: cart.cart_id,
          product_id: actualProductId,
          quantity,
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("Error adding item to cart:", error);
        throw error;
      }
      
      return data;
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw error;
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
