
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ProductCategories from '@/components/marketplace/ProductCategories';
import EnhancedProductGrid from '@/components/marketplace/EnhancedProductGrid';
import ProductDetailsModal from '@/components/marketplace/ProductDetailsModal';
import ChatModal from '@/components/marketplace/ChatModal';
import SellItemModal from '@/components/marketplace/SellItemModal';
import WishlistModal from '@/components/marketplace/WishlistModal';
import FloatingActionButton from '@/components/ui/floating-action-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Plus,
  Grid3x3,
  List,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product } from '@/store/slices/productsSlice';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [chatContact, setChatContact] = useState<any>(null);

  const { products, favorites } = useAppSelector(state => state.products);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.views - a.views;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleContactSeller = (product: Product) => {
    if (!isAuthenticated) return;
    setChatContact(product.seller);
    setShowChatModal(true);
  };

  const categories = [
    { id: 'all', name: 'All Items', count: products.length },
    { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
    { id: 'textbooks', name: 'Textbooks', count: products.filter(p => p.category === 'textbooks').length },
    { id: 'furniture', name: 'Furniture', count: products.filter(p => p.category === 'furniture').length },
    { id: 'clothing', name: 'Clothing', count: products.filter(p => p.category === 'clothing').length },
    { id: 'other', name: 'Other', count: products.filter(p => p.category === 'other').length },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Campus Marketplace
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Buy and sell with your fellow students
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {products.length} Active Listings
                </Badge>
                <Button onClick={() => setShowSellModal(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Sell Item
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {searchTerm ? `Search results for "${searchTerm}"` : 'All Products'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {sortedProducts.length} items found
              </p>
            </div>
            
            {favorites.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowWishlistModal(true)}
                className="hidden sm:flex"
              >
                View Wishlist ({favorites.length})
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <EnhancedProductGrid
              products={sortedProducts}
              viewMode={viewMode}
              onProductClick={handleProductClick}
              onContactSeller={handleContactSeller}
            />
          ) : (
            <Card className="p-12 text-center">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No items found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or browse different categories
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setShowSellModal(true)}
        tooltip="Sell an item"
      />

      {/* Modals */}
      <ProductDetailsModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onContactSeller={handleContactSeller}
      />

      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        seller={chatContact}
        itemTitle={selectedProduct?.title || ''}
      />

      <SellItemModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
      />

      <WishlistModal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
      />
    </div>
  );
};

export default Services;
