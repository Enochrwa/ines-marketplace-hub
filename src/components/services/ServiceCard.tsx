
import { motion } from 'framer-motion';
import { Star, MessageCircle, MapPin, Clock, Shield, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Service } from '@/store/slices/servicesSlice';
import toast from 'react-hot-toast';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'on-campus': return '🏫';
      case 'off-campus': return '🏠';
      case 'remote': return '💻';
      case 'flexible': return '📍';
      default: return '📍';
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'hourly': return 'bg-green-100 text-green-800';
      case 'fixed': return 'bg-blue-100 text-blue-800';
      case 'negotiable': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContact = () => {
    toast.success('Opening chat with service provider...');
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-green-500/10">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={service.images[0]} 
              alt={service.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className="bg-white/90 text-gray-800 text-xs">
                {service.category}
              </Badge>
              <Badge className={`text-xs ${getServiceTypeColor(service.serviceType)}`}>
                {service.serviceType}
              </Badge>
            </div>

            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
              <Eye className="w-3 h-3 text-white" />
              <span className="text-white text-xs">{service.views}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors flex-1 pr-2">
              {service.title}
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${service.price}
                {service.serviceType === 'hourly' && <span className="text-sm font-normal">/hr</span>}
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Provider info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={service.provider.avatar} />
                <AvatarFallback className="text-xs">
                  {service.provider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {service.provider.name}
                  </span>
                  {service.provider.verified && (
                    <Shield className="w-3 h-3 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < Math.floor(service.provider.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({service.provider.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{getLocationIcon(service.location)} {service.location.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>{service.availability}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white"
              onClick={handleContact}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Provider
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-green-50 dark:hover:bg-green-900/20">
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
