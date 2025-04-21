
import { Button } from "@/components/ui/button";

const PromoBanners = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Banner 1 - Full width */}
        <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-primary/90 to-accent">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 flex-1">
              <span className="text-white/90 font-medium mb-2 block">Special Offers</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Save 25% on your first order
              </h3>
              <p className="text-white/90 mb-6">
                Use code FRESH25 at checkout to enjoy 25% off your first order over $50. Limited time offer!
              </p>
              <Button className="bg-white text-primary hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
            <div className="md:w-1/3 p-4">
              <img 
                src="https://images.unsplash.com/photo-1610725663727-08695a1ac3ff?q=80&auto=format&fit=crop" 
                alt="Fresh grocery vegetables" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Two column banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 2 */}
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="p-8">
                <span className="text-secondary font-medium mb-2 block">Weekend Sale</span>
                <h3 className="text-2xl font-bold mb-3">Fresh Organic Fruits</h3>
                <p className="text-gray-600 mb-4">Get up to 30% off on all organic fruits this weekend.</p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white">
                  View Products
                </Button>
              </div>
              <div className="mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&auto=format&fit=crop" 
                  alt="Fresh fruits" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Banner 3 */}
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="p-8">
                <span className="text-secondary font-medium mb-2 block">New Arrivals</span>
                <h3 className="text-2xl font-bold mb-3">Premium Quality Meats</h3>
                <p className="text-gray-600 mb-4">Fresh and premium quality meats now available.</p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white">
                  Shop Collection
                </Button>
              </div>
              <div className="mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&auto=format&fit=crop" 
                  alt="Premium meats" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
