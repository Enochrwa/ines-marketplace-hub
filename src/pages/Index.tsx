
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Users, 
  Calendar, 
  BookOpen, 
  Car, 
  Home,
  Star,
  TrendingUp,
  Heart,
  MessageSquare,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product } from '@/store/slices/productsSlice';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useAppSelector(state => state.products);
  const { user } = useAppSelector(state => state.auth);

  // Featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  const stats = [
    { label: 'Active Students', value: '2,847', icon: Users, color: 'text-blue-500' },
    { label: 'Items Listed', value: '1,234', icon: ShoppingBag, color: 'text-green-500' },
    { label: 'Study Groups', value: '156', icon: BookOpen, color: 'text-purple-500' },
    { label: 'Events This Week', value: '23', icon: Calendar, color: 'text-orange-500' }
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Marketplace',
      description: 'Buy and sell textbooks, electronics, and more',
      link: '/services',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Study Groups',
      description: 'Join collaborative learning sessions',
      link: '/study-groups',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Tutoring',
      description: 'Find tutors or become one',
      link: '/tutoring',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Discover campus events and activities',
      link: '/events',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Car,
      title: 'Rides',
      description: 'Share rides with fellow students',
      link: '/rides',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Home,
      title: 'Rooms',
      description: 'Find housing and roommates',
      link: '/rooms',
      color: 'from-teal-500 to-green-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
      text: 'Found my perfect study group and improved my grades significantly!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      text: 'Sold my textbooks quickly and at great prices. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      text: 'The tutoring feature helped me ace my calculus exam. Amazing platform!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Your Campus
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"> Community</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Connect, learn, and thrive with your fellow students. Buy, sell, study, and explore everything your campus has to offer.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for textbooks, tutors, events, and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-emerald-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link to="/services">
                  Explore Marketplace
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/study-groups">
                  Join Study Groups
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover all the ways to connect and succeed on campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={feature.link}>
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} text-white mb-6`}>
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700">
                        <span className="mr-2">Learn more</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Items
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Popular items from your fellow students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                asChild
              >
                <Link to="/services">
                  View All Items
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real stories from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Student
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already connecting, learning, and succeeding together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg"
              asChild
            >
              <Link to="/dashboard">
                {user ? 'Go to Dashboard' : 'Sign Up Now'}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              asChild
            >
              <Link to="/services">
                Explore Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
