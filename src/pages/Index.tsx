
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Star, Users, BookOpen, Calendar, MapPin, Clock, Zap, Target, Award } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productsSlice';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ProductDetailsModal from '@/components/marketplace/ProductDetailsModal';
import ChatModal from '@/components/marketplace/ChatModal';
import SellItemModal from '@/components/marketplace/SellItemModal';
import FloatingActionButton from '@/components/ui/floating-action-button';
import { Product } from '@/store/slices/productsSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector(state => state.products);
  const { items: products = [], loading = false, searchTerm = '', filters = { category: 'All' } } = productsState || {};
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
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const stats = [
    { icon: Users, value: '15,247', label: 'Active Students', color: 'text-yellow-600', bgColor: 'bg-yellow-100/80' },
    { icon: BookOpen, value: '3,892', label: 'Items Listed', color: 'text-green-600', bgColor: 'bg-green-100/80' },
    { icon: Award, value: '94%', label: 'Success Rate', color: 'text-yellow-600', bgColor: 'bg-yellow-100/80' },
    { icon: Target, value: '1,247', label: 'Deals Completed', color: 'text-green-600', bgColor: 'bg-green-100/80' }
  ];

  const featuredCategories = [
    { name: 'Textbooks', icon: BookOpen, count: 847, color: 'from-green-400 to-green-600' },
    { name: 'Electronics', icon: Zap, count: 234, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Study Materials', icon: Target, count: 567, color: 'from-green-500 to-green-700' },
    { name: 'Events', icon: Calendar, count: 89, color: 'from-yellow-500 to-yellow-700' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 dark:from-gray-900 dark:via-green-900/20 dark:to-yellow-900/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
            <h1 className="relative text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-green-700 bg-clip-text text-transparent animate-gradient">
                Campus
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-green-600 to-yellow-700 bg-clip-text text-transparent animate-gradient">
                Marketplace
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Your university's premier marketplace for buying, selling, and trading with fellow students
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => setShowSellModal(true)}
            >
              Start Selling <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-green-500 text-green-700 hover:bg-green-50 px-8 py-3 text-lg font-semibold"
            >
              Browse Items
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <Card className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full ${stat.bgColor.replace('100/80', '200')} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover what your fellow students are buying and selling
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="perspective-1000"
              >
                <Card className="h-32 cursor-pointer overflow-hidden group hover:shadow-xl transition-all duration-300 transform-gpu">
                  <CardContent className={`h-full relative bg-gradient-to-br ${category.color} text-white p-4 flex flex-col justify-between`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative z-10">
                      <category.icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} items</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar />
            </div>
            <CategoryFilter />
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="h-64 bg-white/60 dark:bg-gray-800/60 rounded-xl animate-pulse backdrop-blur-sm"
                >
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-xl mb-4"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.slice(0, 10).map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handleViewDetails(product)}
                >
                  <Card className="h-64 overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-yellow-400 text-black text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      {product.isFree && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white text-xs">
                            FREE
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-3 h-32 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                          {product.title}
                        </h3>
                        <div className="text-lg font-bold text-green-600 mt-1">
                          {product.isFree ? 'FREE' : `$${product.price}`}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{product.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 py-16 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 rounded-3xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students making campus life more affordable and sustainable
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-12 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => setShowSellModal(true)}
          >
            <Plus className="mr-3 w-6 h-6" />
            List Your First Item
          </Button>
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

      <FloatingActionButton
        onClick={() => setShowSellModal(true)}
        icon={<Plus className="w-6 h-6" />}
        tooltip="Sell Item"
      />
    </div>
  );
};

export default Index;
