
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productsSlice';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import FeaturedSection from '@/components/sections/FeaturedSection';
import StatsSection from '@/components/sections/StatsSection';
import ProductDetailsModal from '@/components/marketplace/ProductDetailsModal';
import ChatModal from '@/components/marketplace/ChatModal';
import SellItemModal from '@/components/marketplace/SellItemModal';
import { Product } from '@/store/slices/productsSlice';

const Index = () => {
  const dispatch = useAppDispatch();
  const { products, loading, searchTerm, selectedCategory } = useAppSelector(state => state.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [chatSeller, setChatSeller] = useState<{
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  } | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSeller = (product: Product) => {
    setChatSeller({
      id: product.seller.id,
      name: product.seller.name,
      avatar: product.seller.avatar || '',
      reputation: product.seller.reputation,
      verified: product.seller.verified
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Campus Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Buy, sell, and trade with your fellow students. Find textbooks, electronics, furniture, and more!
          </p>
        </motion.div>

        <FeaturedSection />
        <StatsSection />

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <CategoryFilter />
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onContactSeller={handleContactSeller}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onContactSeller={handleContactSeller}
        />
      )}

      {chatSeller && (
        <ChatModal
          isOpen={!!chatSeller}
          onClose={() => setChatSeller(null)}
          seller={chatSeller}
          itemTitle="Product inquiry"
        />
      )}

      <SellItemModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
      />
    </div>
  );
};

export default Index;
