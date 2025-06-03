
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
import PostItemModal from '@/components/marketplace/PostItemModal';
import ChatModal from '@/components/marketplace/ChatModal';
import WishlistModal from '@/components/marketplace/WishlistModal';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productsSlice';
import toast, { Toaster } from 'react-hot-toast';

const Index = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, searchTerm, filters } = useAppSelector(state => state.products);
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-yellow-500 text-black border-yellow-400 hover:bg-yellow-600 font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Campus Marketplace
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                GreenLoop
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-normal">INES-Ruhengeri Exchange</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive campus marketplace for buying, selling, and sharing.
              <br className="hidden md:block" />
              <span className="font-semibold text-yellow-300">Reuse. Recycle. Rethink Resources.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto mb-8">
              <div className="flex-1 w-full">
                <SearchBar />
              </div>
              <Button 
                size="lg" 
                onClick={() => setIsPostModalOpen(true)}
                className="bg-yellow-500 text-black hover:bg-yellow-600 font-semibold px-8 shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post Item
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                variant="outline" 
                onClick={() => setIsWishlistModalOpen(true)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsChatModalOpen(true)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button 
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </Button>
            </div>

            {isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-300 mt-4"
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
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
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
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {filters.category === "All" ? "All Items" : filters.category}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
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
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trending
                </Badge>
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                  <Users className="w-4 h-4 mr-1" />
                  {products.length}+ Active
                </Badge>
              </div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag className="w-20 h-20 mx-auto text-gray-400 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                  No items found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6 max-w-md mx-auto">
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
      <PostItemModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)}
        seller={{
          name: "Marie Uwimana",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
          reputation: 4.9,
          verified: true
        }}
        itemTitle="Engineering Mathematics Textbook"
      />
      <WishlistModal isOpen={isWishlistModalOpen} onClose={() => setIsWishlistModalOpen(false)} />
    </div>
  );
};

export default Index;
