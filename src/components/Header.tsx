
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGetCart } from "@/hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: cartData } = useGetCart();

  // Count total items in cart
  const cartItemCount = cartData?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Navigation helper for shop page
  const navToShop = () => {
    if (location.pathname !== "/shop") {
      navigate("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top header with logo, search, and icons */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary no-underline hover:opacity-80">
            <span className="text-secondary">Fresh</span>Cart
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-grow max-w-md mx-4 relative">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search for products..." 
              className="pl-3 pr-10 py-2 w-full rounded-full border focus:border-primary focus:ring-primary" 
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-between">
            <ul className="flex space-x-6 py-3">
              <li>
                <Link to="/" className="font-medium hover:text-secondary transition">Home</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navToShop}
                  className="font-medium hover:text-secondary transition bg-transparent border-0 outline-none"
                  style={{ background: "none", padding: 0, cursor: "pointer" }}
                >
                  Shop
                </button>
              </li>
              <li>
                <a href="#" className="font-medium hover:text-secondary transition">Categories</a>
              </li>
              <li>
                <a href="#" className="font-medium hover:text-secondary transition">Deals</a>
              </li>
              <li>
                <Link to="/cart" className="font-medium hover:text-secondary transition">Cart</Link>
              </li>
            </ul>
            <div className="py-3">
              <span className="font-medium">Call us: +91 12345 67890</span>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between py-3">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <span className="font-medium">Menu</span>
            </button>
            <div>
              <span className="font-medium">Call us: +91 12345 67890</span>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/10">
            <div className="container mx-auto px-4">
              <ul className="py-3 space-y-2">
                <li><Link to="/" className="block font-medium hover:text-secondary transition">Home</Link></li>
                <li><button onClick={navToShop} className="bg-transparent border-0 font-medium hover:text-secondary w-full text-left transition">Shop</button></li>
                <li><a href="#" className="block font-medium hover:text-secondary transition">Categories</a></li>
                <li><a href="#" className="block font-medium hover:text-secondary transition">Deals</a></li>
                <li><Link to="/cart" className="block font-medium hover:text-secondary transition">Cart</Link></li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
