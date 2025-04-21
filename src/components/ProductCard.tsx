
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAddToCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

function formatIndianNumber(num: number) {
  const x = num.toFixed(2);
  const afterPoint = x.indexOf('.') > 0 ? x.substring(x.indexOf('.')) : '';
  let n = Math.floor(num).toString();
  let lastThree = n.substring(n.length - 3);
  const otherNumbers = n.substring(0, n.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  return res;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isOnSale?: boolean;
  rating?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isOnSale = false,
  rating = 5
}: ProductCardProps) => {
  const { toast } = useToast();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log("Adding product to cart:", id);
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    // Make sure id is a valid UUID and not just a number
    if (typeof id === 'string' && id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      addToCart(
        { productId: id, quantity: 1 },
        {
          onSuccess: () => {
            toast({
              title: "Item added!",
              description: `${name} was added to your cart.`,
            });
          },
          onError: (err: Error) => {
            console.error("Error adding to cart:", err);
            toast({
              title: "Could not add to cart",
              description: err?.message || "An error occurred",
              variant: "destructive",
            });
            
            if (err.message.includes("login") || err.message.includes("auth")) {
              setTimeout(() => navigate("/auth"), 1500);
            }
          },
        }
      );
    } else {
      console.error("Invalid product ID format:", id);
      toast({
        title: "Could not add to cart",
        description: "Invalid product ID format",
        variant: "destructive",
      });
    }
  };

  return (
    
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border p-4 flex flex-col h-full group">
      {/* Product image */}
      <div className="relative mb-4 rounded-md overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover object-center group-hover:scale-105 transition duration-300"
        />
        {isOnSale && (
          <Badge className="absolute top-2 left-2 bg-secondary">Sale</Badge>
        )}
      </div>

      {/* Product details */}
      <div className="flex-grow">
        <span className="text-sm text-gray-500 mb-1 block">{category}</span>
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{name}</h3>
        
        {/* Rating */}
        <div className="flex mb-2">
          {Array(5).fill(0).map((_, i) => (
            <svg 
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg">₹{formatIndianNumber(price)}</span>
          {oldPrice && (
            <span className="text-gray-500 line-through text-sm">₹{formatIndianNumber(oldPrice)}</span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        className="w-full bg-primary hover:bg-accent flex items-center justify-center gap-2 mt-2"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{isPending ? "Adding..." : "Add to Cart"}</span>
      </Button>
    </div>
  );
};

export default ProductCard;
