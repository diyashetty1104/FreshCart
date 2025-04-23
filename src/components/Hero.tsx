
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <section className="relative bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <span className="text-secondary font-medium mb-2 block">100% Natural Food</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh &amp; Organic <br />Groceries Delivery</h1>
            <p className="text-gray-600 mb-6 text-lg">
              Get fresh groceries delivered to your doorstep within 30 minutes with free delivery on your first order.
            </p>
            <Button 
              onClick={handleShopNow} 
              className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-full text-lg font-medium"
            >
              Shop Now
            </Button>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&auto=format&fit=crop" 
              alt="Fresh vegetables and fruits" 
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
              style={{ height: '400px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
