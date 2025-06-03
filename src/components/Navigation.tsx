
import { useState } from 'react';
import { User, MessageCircle, Heart, Menu, X, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will be managed by auth later

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IM</span>
            </div>
            <span className="text-xl font-bold text-gray-800">INES Marketplace</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Browse</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Sell</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <MessageCircle className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    2
                  </Badge>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                  Log In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Browse</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Sell</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">About</a>
              
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                    Log In
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
