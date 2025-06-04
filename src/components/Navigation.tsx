
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MessageCircle, Heart, Menu, X, Bell, Settings, 
  Sun, Moon, Shield, LogOut, Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';
import AuthModal from './modals/AuthModal';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.ui);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path: string) => location.pathname === path;

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GL</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    GreenLoop
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Campus Exchange</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className={`hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                    isActive('/') ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''
                  }`}
                  asChild
                >
                  <Link to="/">Marketplace</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                    isActive('/services') ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''
                  }`}
                  asChild
                >
                  <Link to="/services">Services</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                    isActive('/resources') ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''
                  }`}
                  asChild
                >
                  <Link to="/resources">Resources</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${
                    isActive('/events') ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''
                  }`}
                  asChild
                >
                  <Link to="/events">Events</Link>
                </Button>
              </nav>
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(toggleTheme())}
                className="h-9 w-9"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      3
                    </Badge>
                  </Button>

                  {/* Messages */}
                  <Button variant="ghost" size="sm" className="relative">
                    <MessageCircle className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      2
                    </Badge>
                  </Button>

                  {/* Favorites */}
                  <Button variant="ghost" size="sm">
                    <Heart className="w-5 h-5" />
                  </Button>

                  {/* Sell Button */}
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Sell Item
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                          <div className="flex items-center space-x-2 pt-1">
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {user.reputation}
                            </Badge>
                            {user.verified && (
                              <Badge variant="default" className="text-xs bg-emerald-500">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowAuthModal(true)}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(toggleTheme())}
                className="h-8 w-8"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
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
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-3">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/">Marketplace</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/services">Services</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/resources">Resources</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/events">Events</Link>
                  </Button>
                  
                  {!isAuthenticated && (
                    <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowAuthModal(true)}
                      >
                        Log In
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                        onClick={() => setShowAuthModal(true)}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Navigation;
