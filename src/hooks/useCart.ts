
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export function useAddToCart() {
  // This assumes you have authentication set up and the user is logged in.
  // If not, you might want to request users to log in first.
  return useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
    }: {
      productId: number;
      quantity?: number;
    }) => {
      // Get the currently logged-in user's ID
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");

      // Insert or update (upsert) the product in the cart table
      const { data, error } = await supabase
        .from("cart")
        .upsert(
          [{ user_id: user.id, product_id: productId, quantity }],
          { onConflict: "user_id,product_id" }
        )
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
  });
}
