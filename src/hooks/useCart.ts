
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
      // Get the currently logged-in user's ID
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");

      // Use the database service to add to cart
      return addToCart(user.id, productId, quantity);
    },
    onSuccess: () => {
      // Invalidate the cart query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
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
