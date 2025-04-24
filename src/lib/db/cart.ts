
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

    // Check if item already in cart
    const { data: cartItems, error: itemsError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cart.cart_id);
      
    if (itemsError) throw itemsError;
    
    const existingItem = cartItems?.find(item => item.product_id === productId);

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
          product_id: productId,
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

