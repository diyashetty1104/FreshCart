import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useGetCart, useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCart";
import { toast } from "sonner";

export default function Cart() {
  const { data: cartData, isLoading, error, refetch } = useGetCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (cartData?.items) {
      // Calculate subtotal
      const total = cartData.items.reduce((sum, item) => {
        const price = parseFloat(String(item.products.price));
        return sum + (price * item.quantity);
      }, 0);
      setSubtotal(total);
    }
  }, [cartData]);

  const handleQuantityChange = (cartItemId: string, currentQty: number, change: number) => {
    const newQuantity = currentQty + change;
    if (newQuantity < 1) return;
    
    updateCartItem.mutate(
      { cartItemId, quantity: newQuantity },
      {
        onSuccess: () => {
          refetch();
          toast.success("Cart updated");
        },
        onError: () => {
          toast.error("Failed to update cart");
        }
      }
    );
  };
  
  const handleRemoveItem = (cartItemId: string) => {
    removeCartItem.mutate(cartItemId, {
      onSuccess: () => {
        refetch();
        toast.success("Item removed from cart");
      },
      onError: () => {
        toast.error("Failed to remove item");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-24 h-24 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="p-6 text-center">
          <p className="text-red-500 mb-4">Error loading cart</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!cartData?.items || cartData.items.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="p-10 text-center border rounded-lg">
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Browse our products and add items to your cart</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartData.items.map((item) => (
            <div key={item.cart_item_id} className="flex gap-6 mb-6 pb-6 border-b">
              <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                {item.products.image ? (
                  <img 
                    src={item.products.image} 
                    alt={item.products.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium mb-1">{item.products.name}</h3>
                <p className="text-green-600 font-medium mb-3">${parseFloat(String(item.products.price)).toFixed(2)}</p>
                
                <div className="flex items-center">
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleQuantityChange(item.cart_item_id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                      className="h-8 px-2"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleQuantityChange(item.cart_item_id, item.quantity, 1)}
                      className="h-8 px-2"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-transparent"
                    onClick={() => handleRemoveItem(item.cart_item_id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <span className="font-medium">
                  ${(parseFloat(String(item.products.price)) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="md:col-span-1">
          <div className="border rounded-lg p-6 bg-gray-50 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="border-t my-4 pt-4">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <Button className="w-full">Proceed to Checkout</Button>
              <Button 
                asChild 
                variant="outline" 
                className="w-full mt-2"
              >
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
