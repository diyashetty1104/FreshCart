
import { supabase } from './supabaseClient';

// User related functions
export const createUser = async (userData: { name: string; email: string; password: string; phone?: string; address?: string }) => {
  // First create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });
  
  if (authError) throw authError;
  
  // Then add user profile data
  if (authData.user) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          user_id: authData.user.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || null,
          address: userData.address || null
        }
      ]);
      
    if (error) throw error;
    return data;
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) throw error;
  return data;
};

// Product related functions
export const getProducts = async (categoryId?: string, limit = 10, page = 0) => {
  let query = supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('product_id', productId)
    .single();
    
  if (error) throw error;
  return data;
};

// Category related functions
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data;
};

// Cart related functions
export const getUserCart = async (userId: string) => {
  // Get or create cart for user
  let { data: cart, error: cartError } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (cartError && cartError.code === 'PGRST116') {
    // Cart doesn't exist, create one
    const { data: newCart, error: createError } = await supabase
      .from('cart')
      .insert({ user_id: userId })
      .select()
      .single();
      
    if (createError) throw createError;
    cart = newCart;
  } else if (cartError) {
    throw cartError;
  }
  
  // Get cart items
  const { data: cartItems, error: itemsError } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('cart_id', cart.cart_id);
    
  if (itemsError) throw itemsError;
  
  return { cart, items: cartItems };
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  // Get user's cart or create one
  let { data: cart, error: cartError } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (cartError && cartError.code === 'PGRST116') {
    // Cart doesn't exist, create one
    const { data: newCart, error: createError } = await supabase
      .from('cart')
      .insert({ user_id: userId })
      .select()
      .single();
      
    if (createError) throw createError;
    cart = newCart;
  } else if (cartError) {
    throw cartError;
  }
  
  // Check if item already in cart
  const { data: existingItem, error: checkError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.cart_id)
    .eq('product_id', productId)
    .single();
    
  if (checkError && checkError.code !== 'PGRST116') throw checkError;
  
  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('cart_item_id', existingItem.cart_item_id)
      .select();
      
    if (error) throw error;
    return data;
  } else {
    // Add new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cart.cart_id,
        product_id: productId,
        quantity
      })
      .select();
      
    if (error) throw error;
    return data;
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('cart_item_id', cartItemId)
    .select();
    
  if (error) throw error;
  return data;
};

export const removeCartItem = async (cartItemId: string) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_item_id', cartItemId);
    
  if (error) throw error;
  return true;
};

// More functions for orders, reviews, etc. can be added as needed
