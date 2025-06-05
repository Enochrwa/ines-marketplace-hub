
import { motion } from 'framer-motion';
import { Heart, MessageCircle, User, Clock, Eye, Share2, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/productsSlice';
import { Product } from '@/store/slices/productsSlice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onContactSeller?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductCard = ({ product, onContactSeller, onViewDetails }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.products);
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  const isFavorited = favorites.includes(product.id);

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'new': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to save favorites');
      return;
    }
    
    dispatch(toggleFavorite(product.id));
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleContactSeller = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to contact sellers');
      return;
    }
    onContactSeller?.(product);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(product);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full"
    >
      <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="w-full h-40 sm:h-48 md:h-52 lg:h-48 xl:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay with quick actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Badge className="bg-white/90 text-gray-800 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    {product.views}
                  </Badge>
                  <Badge className="bg-white/90 text-gray-800 text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    {product.likes}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Top badges */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
              <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white text-xs">
                {product.category}
              </Badge>
              {product.isFree && (
                <Badge className="bg-emerald-500 text-white text-xs">
                  FREE
                </Badge>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleFavoriteClick}
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isFavorited 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white/80 hover:bg-white text-gray-700'
                }`}
              >
                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-1">
              {product.title}
            </h3>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {product.isFree ? 'FREE' : `$${product.price}`}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3">
            <Badge variant="secondary" className={`${getConditionColor(product.condition)} text-xs`}>
              {product.condition}
            </Badge>
            {product.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Seller info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback className="text-xs">
                  {product.seller.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1 min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {product.seller.name}
                </span>
                {product.seller.verified && (
                  <Badge className="text-xs bg-emerald-500 text-white px-1 flex-shrink-0">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs flex-shrink-0">
              ⭐ {product.seller.reputation}
            </Badge>
          </div>

          {/* Location and time */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 gap-1 sm:gap-0">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{product.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
              <span>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-sm"
              onClick={handleContactSeller}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sm"
              onClick={handleViewDetails}
            >
              Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
