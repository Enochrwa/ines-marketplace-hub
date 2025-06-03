
import { useState } from 'react';
import { Search, Filter, Plus, User, MessageCircle, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';

// Mock data for initial demo
const mockProducts = [
  {
    id: 1,
    title: "Engineering Textbooks Bundle",
    price: 45,
    condition: "Good",
    category: "Books",
    image: "/placeholder.svg",
    seller: "John Doe",
    description: "Set of 5 engineering textbooks including Calculus, Physics, and Chemistry",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "MacBook Air M1",
    price: 800,
    condition: "Excellent",
    category: "Electronics",
    image: "/placeholder.svg",
    seller: "Sarah Smith",
    description: "Perfect for students, barely used, includes charger and case",
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Dorm Room Furniture Set",
    price: 120,
    condition: "Good",
    category: "Furniture",
    image: "/placeholder.svg",
    seller: "Mike Johnson",
    description: "Study desk, chair, and small bookshelf. Perfect for dorm rooms",
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "Kitchen Appliances",
    price: 35,
    condition: "Fair",
    category: "Kitchenware",
    image: "/placeholder.svg",
    seller: "Emily Brown",
    description: "Microwave, coffee maker, and blender. Great for student apartments",
    posted: "1 week ago"
  },
  {
    id: 5,
    title: "Scientific Calculator",
    price: 25,
    condition: "Excellent",
    category: "Electronics",
    image: "/placeholder.svg",
    seller: "David Wilson",
    description: "TI-84 Plus CE, perfect for math and science courses",
    posted: "5 days ago"
  },
  {
    id: 6,
    title: "Business Textbooks",
    price: 60,
    condition: "Good",
    category: "Books",
    image: "/placeholder.svg",
    seller: "Lisa Garcia",
    description: "Economics, Marketing, and Finance textbooks for business students",
    posted: "4 days ago"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            INES-Ruhengeri Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Buy, Sell & Recycle within your university community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchTerm} />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
              <Plus className="w-5 h-5 mr-2" />
              Post Item
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "All" ? "All Items" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} items found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
