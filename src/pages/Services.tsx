
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Users, TrendingUp, ServiceIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFilters from '@/components/services/ServiceFilters';
import SearchBar from '@/components/SearchBar';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchServices } from '@/store/slices/servicesSlice';

const Services = () => {
  const dispatch = useAppDispatch();
  const { services, loading, searchTerm, filters } = useAppSelector(state => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const filteredServices = services.filter(service => {
    const matchesCategory = filters.category === 'All' || service.category === filters.category;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1];
    const matchesRating = filters.rating === 0 || service.provider.rating >= filters.rating;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-yellow-500 to-black" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-yellow-500 text-black border-yellow-400 hover:bg-yellow-600 font-semibold">
              <ServiceIcon className="w-4 h-4 mr-2" />
              Campus Services Hub
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                Services
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-normal">Find & Offer Skills</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Connect with fellow students and staff to find tutoring, tech support, creative services, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="flex-1 w-full">
                <SearchBar />
              </div>
              <Button 
                size="lg" 
                className="bg-yellow-500 text-black hover:bg-yellow-600 font-semibold px-8 shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Offer Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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
            <ServiceFilters />
          </motion.div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <motion.div 
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {filters.category === "All" ? "All Services" : filters.category}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredServices.length} services available
                  {searchTerm && (
                    <span className="ml-2">
                      for "<span className="font-semibold">{searchTerm}</span>"
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                  <Users className="w-4 h-4 mr-1" />
                  {services.length}+ Providers
                </Badge>
              </div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80"></div>
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
                {filteredServices.map((service) => (
                  <motion.div 
                    key={service.id} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredServices.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ServiceIcon className="w-20 h-20 mx-auto text-gray-400 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                  No services found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find services you need.
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
    </div>
  );
};

export default Services;
