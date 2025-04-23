
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAddToCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

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
  description?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isOnSale = false,
  rating = 5,
  description
}: ProductCardProps) => {
  const { toast } = useToast();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    // Remove the UUID regex validation since our product IDs don't follow UUID format
    if (id) {
      setIsAdding(true);
      addToCart(
        { productId: id, quantity: 1 },
        {
          onSuccess: () => {
            setIsAdding(false);
            setJustAdded(true);
            toast({
              title: "Added to cart!",
              description: `${name} was added to your cart.`,
              duration: 1500,
            });
            // Set justAdded false after a little while
            setTimeout(() => setJustAdded(false), 3000);
          },
          onError: (err: Error) => {
            setIsAdding(false);
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
      toast({
        title: "Could not add to cart",
        description: "Invalid product ID",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition border p-4 flex flex-col h-full relative overflow-hidden">
      {/* Sale badge */}
      {isOnSale && (
        <Badge variant="secondary" className="absolute z-10 top-3 left-3">
          Sale
        </Badge>
      )}
      {/* Product Image */}
      <div className="relative h-44 flex items-center justify-center mb-3 overflow-hidden transition-all rounded-lg bg-gray-50">
        <img
          src={image}
          alt={name}
          className="max-h-44 object-contain w-full group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>
      {/* Product Details */}
      <div className="flex-grow flex flex-col gap-1">
        <span className="text-xs text-gray-500 mb-0.5">{category}</span>
        <h3 className="font-semibold text-base line-clamp-2 mb-1">{name}</h3>
        {description && (
          <div className="text-xs text-muted-foreground line-clamp-2 mb-1">{description}</div>
        )}
        {/* Rating */}
        <div className="flex gap-0.5 mb-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < (rating || 5) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
        </div>
        {/* Price */}
        <div className="flex items-center gap-2 my-1">
          <span className="font-bold text-lg text-primary">₹{formatIndianNumber(price)}</span>
          {!!oldPrice && (
            <span className="text-gray-400 line-through text-sm">₹{formatIndianNumber(oldPrice)}</span>
          )}
        </div>
      </div>
      {/* Add to Cart UI */}
      <div className="mt-3">
        {justAdded ? (
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate("/cart")}
          >
            <Check className="h-4 w-4 text-green-600" />
            <span>Go to Cart</span>
          </Button>
        ) : (
          <Button
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-accent transition-all py-2 rounded-lg font-semibold"
            onClick={handleAddToCart}
            disabled={isPending || isAdding}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className={`h-4 w-4 ${isAdding ? 'animate-bounce' : ''}`} />
            <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
