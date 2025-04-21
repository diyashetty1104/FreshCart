
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Benefits from "@/components/Benefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanners from "@/components/PromoBanners";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <Categories />
        <FeaturedProducts />
        <PromoBanners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
