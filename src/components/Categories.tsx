
interface CategoryProps {
  title: string;
  image: string;
  count: number;
}

const CategoryItem = ({ title, image, count }: CategoryProps) => {
  return (
    <a href="#" className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-4 text-center">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm">{count} Products</p>
        </div>
      </div>
    </a>
  );
};

const Categories = () => {
  const categories = [
    {
      title: "Fresh Fruits",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&auto=format&fit=crop",
      count: 68
    },
    {
      title: "Vegetables",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&auto=format&fit=crop",
      count: 92
    },
    {
      title: "Meat & Fish",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&auto=format&fit=crop",
      count: 45
    },
    {
      title: "Bakery",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&auto=format&fit=crop",
      count: 34
    },
    {
      title: "Dairy & Eggs",
      image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&auto=format&fit=crop",
      count: 41
    },
    {
      title: "Beverages",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&auto=format&fit=crop",
      count: 56
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide selection of high-quality categories and find exactly what you need for your kitchen.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryItem key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
