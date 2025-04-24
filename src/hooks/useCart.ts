import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { addToCart, getUserCart, removeCartItem, updateCartItem } from "@/lib/db";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
    }: {
      productId: string;
      quantity?: number;
    }) => {
      console.log("Starting addToCart mutation with productId:", productId);
      
      if (!isAuthenticated || !user) {
        throw new Error("Please login before adding items to cart");
      }

      // Use the database service to add to cart
      return addToCart(user.id, productId, quantity);
    },
    onSuccess: (data) => {
      console.log("Successfully added to cart:", data);
      // Invalidate the cart query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      console.error("Error in useAddToCart mutation:", error);
      
      // If the error is about authentication, redirect to login
      if (error.message.includes("login") || error.message.includes("auth")) {
        setTimeout(() => navigate("/auth"), 1500);
      }
    }
  });
}

export function useGetCart() {
  const { isAuthenticated, user } = useAuth();

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!isAuthenticated || !user) {
        throw new Error("User not authenticated");
      }

      return getUserCart(user.id);
    },
    // Don't refetch on window focus, as cart data isn't likely to change from other tabs/windows
    refetchOnWindowFocus: false,
    // Only run this query if the user is authenticated
    enabled: isAuthenticated && !!user,
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
