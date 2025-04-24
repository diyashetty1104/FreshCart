
import { supabase } from "@/lib/supabaseClient";

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

