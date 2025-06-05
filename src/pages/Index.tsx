
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, ShoppingBag, Sparkles, TrendingUp, Users, Heart, MessageCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedSection from '@/components/sections/FeaturedSection';
import ChatModal from '@/components/marketplace/ChatModal';
import WishlistModal from '@/components/marketplace/WishlistModal';
import ProductDetailsModal from '@/components/marketplace/ProductDetailsModal';
import SellItemModal from '@/components/marketplace/SellItemModal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productsSlice';
import { Product } from '@/store/slices/productsSlice';
import toast, { Toaster } from 'react-hot-toast';

const Index = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, searchTerm, filters } = useAppSelector(state => state.products);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesCondition = filters.condition.length === 0 || filters.condition.includes(product.condition);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesCondition;
  });

  const handleContactSeller = (product: Product) => {
    setSelectedProduct(product);
    setIsChatModalOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const handleSellItem = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to sell items');
      return;
    }
    setIsSellModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Navigation />
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-green-600 to-yellow-500" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl"
          />
        </div>

        <div className="relative container mx-auto px-4 py-20 sm:py-24 md:py-32 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-yellow-500 text-black border-yellow-400 hover:bg-yellow-600 font-semibold text-sm sm:text-lg px-4 sm:px-6 py-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              AI-Powered Campus Marketplace
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                GreenLoop
              </span>
              <br />
              <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">INES-Ruhengeri Exchange</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed px-4">
              Your comprehensive campus marketplace for buying, selling, and sharing.
              <br className="hidden md:block" />
              <span className="font-semibold text-yellow-300">Reuse. Recycle. Rethink Resources.</span>
            </p>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto mb-8 sm:mb-10 px-4">
              <div className="flex-1 w-full max-w-2xl">
                <SearchBar />
              </div>
              <Button 
                size="lg" 
                onClick={handleSellItem}
                className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all w-full lg:w-auto"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Post Item
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center gap-3 sm:gap-6 flex-wrap mb-6 sm:mb-8 px-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsWishlistModalOpen(true)}
                className="bg-white/15 border-white/40 text-white hover:bg-white/25 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Wishlist</span>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setIsChatModalOpen(true)}
                className="bg-white/15 border-white/40 text-white hover:bg-white/25 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Messages</span>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/15 border-white/40 text-white hover:bg-white/25 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Alerts</span>
              </Button>
            </div>

            {isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-300 mt-4 sm:mt-6 text-lg sm:text-xl font-semibold px-4"
              >
                Welcome back, {user.name}! 👋
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Items */}
      <FeaturedSection />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar Filters */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CategoryFilter />
          </motion.div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <motion.div 
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {filters.category === "All" ? "All Items" : filters.category}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {filteredProducts.length} items found
                  {searchTerm && (
                    <span className="ml-2">
                      for "<span className="font-semibold">{searchTerm}</span>"
                    </span>
                  )}
                  {filters.condition.length > 0 && (
                    <span className="ml-2">
                      • Condition: {filters.condition.join(', ')}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs sm:text-sm">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Trending
                </Badge>
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50 text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {products.length}+ Active
                </Badge>
              </div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 sm:h-80"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <ProductCard 
                      product={product} 
                      onContactSeller={handleContactSeller}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <motion.div 
                className="text-center py-16 sm:py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-6" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                  No items found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6 max-w-md mx-auto px-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <SellItemModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />
      
      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)}
        seller={selectedProduct ? selectedProduct.seller : {
          id: "seller1",
          name: "Marie Uwimana",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
          reputation: 4.9,
          verified: true
        }}
        itemTitle={selectedProduct?.title || "Item"}
        productId={selectedProduct?.id}
      />
      
      <WishlistModal isOpen={isWishlistModalOpen} onClose={() => setIsWishlistModalOpen(false)} />
      
      <ProductDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={selectedProduct}
        onContactSeller={handleContactSeller}
      />
    </div>
  );
};

export default Index;
