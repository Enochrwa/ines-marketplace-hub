
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchServices, setServiceSearchTerm } from '@/store/slices/servicesSlice';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFilters from '@/components/services/ServiceFilters';

const Services = () => {
  const dispatch = useAppDispatch();
  const { services, loading, searchTerm, filters } = useAppSelector(state => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setServiceSearchTerm(e.target.value));
  };

  // Filter services based on search term and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filters.category === 'All' || service.category === filters.category;
    const matchesPrice = service.price >= filters.priceRange[0] && 
                        (filters.priceRange[1] === 100 ? true : service.price <= filters.priceRange[1]);
    const matchesRating = filters.rating === 0 || service.provider.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent mb-4">
            Campus Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find tutoring, tech support, creative services, and more from your fellow students and staff
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search services, skills, or providers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 h-12 text-lg border-2 border-green-200 focus:border-green-400 rounded-xl"
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <ServiceFilters />
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search terms or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
