
import { Heart, MessageCircle, User, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  title: string;
  price: number;
  condition: string;
  category: string;
  image: string;
  seller: string;
  description: string;
  posted: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button 
            variant="ghost" 
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              ${product.price}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className={getConditionColor(product.condition)}>
            {product.condition}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{product.seller}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{product.posted}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Seller
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
