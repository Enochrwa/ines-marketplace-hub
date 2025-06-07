
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/store/hooks';
import { 
  ShoppingBag, 
  MessageCircle, 
  Calendar, 
  Users, 
  TrendingUp,
  Heart,
  Star,
  Settings,
  Bell,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { products } = useAppSelector(state => state.products);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <Card className="p-8 text-center max-w-md">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Access Denied
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please log in to access your dashboard.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const userProducts = products.filter(product => product.seller.name === user.name);
  const recentActivities = [
    {
      id: '1',
      type: 'sale',
      title: 'MacBook Pro sold',
      description: 'Your MacBook Pro has been sold to Sarah Johnson',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: '2',
      type: 'message',
      title: 'New message',
      description: 'Mike Chen sent you a message about the iPhone',
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      id: '3',
      type: 'favorite',
      title: 'Item favorited',
      description: 'Your Study Desk was added to 3 wishlists',
      time: '1 day ago',
      icon: Heart,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-16">
        {/* Quick Stats Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {userProducts.length} Active Listings
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    5 Unread Messages
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.reputation} Rating
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <UserDashboard />

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 left-6 space-y-3 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <Plus className="w-4 h-4 mr-2" />
                List New Item
              </Button>
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <MessageCircle className="w-4 h-4 mr-2" />
                View Messages
              </Button>
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <Calendar className="w-4 h-4 mr-2" />
                Join Study Group
              </Button>
              <Button size="sm" className="w-full justify-start" variant="ghost">
                <Users className="w-4 h-4 mr-2" />
                Find Tutor
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
