import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { addToCart, getUserCart, removeCartItem, updateCartItem } from "@/lib/databaseService";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
    }: {
      productId: string;
      quantity?: number;
    }) => {
      console.log("Starting addToCart mutation with productId:", productId);
      
      // Check if we have an authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      
      console.log("Auth check result:", user ? "User found" : "No user", userError ? `Error: ${userError.message}` : "No error");
      
      if (userError) throw new Error(`Authentication error: ${userError.message}`);
      if (!user) throw new Error("Please login before adding items to cart");

      // Use the database service to add to cart
      return addToCart(user.id, productId, quantity);
    },
    onSuccess: (data) => {
      console.log("Successfully added to cart:", data);
      // Invalidate the cart query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error("Error in useAddToCart mutation:", error);
    }
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");

      return getUserCart(user.id);
    },
    // Don't refetch on window focus, as cart data isn't likely to change from other tabs/windows
    refetchOnWindowFocus: false,
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartItemId,
      quantity,
    }: {
      cartItemId: string;
      quantity: number;
    }) => {
      return updateCartItem(cartItemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      return removeCartItem(cartItemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
