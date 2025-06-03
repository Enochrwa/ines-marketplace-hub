
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm } from '@/store/slices/productsSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(state => state.products);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // Real-time search with debouncing
    dispatch(setSearchTerm(value));
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    dispatch(setSearchTerm(''));
  };

  const suggestedSearches = [
    'MacBook', 'Textbooks', 'Furniture', 'Electronics', 'Free items'
  ];

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex-1 max-w-2xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex group">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <Input
            type="text"
            placeholder="Search for books, electronics, furniture..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="pl-12 pr-12 py-4 w-full text-gray-800 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 rounded-2xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 shadow-xl text-lg placeholder:text-gray-500"
          />
          
          {localSearchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Button 
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-8 rounded-2xl rounded-l-none border-l-0 shadow-xl group-hover:shadow-2xl transition-all duration-300"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* AI-powered suggestions */}
      {!localSearchTerm && (
        <motion.div 
          className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-3">
            <Sparkles className="w-4 h-4 text-emerald-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Suggestions
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestedSearches.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors"
                  onClick={() => {
                    setLocalSearchTerm(suggestion);
                    dispatch(setSearchTerm(suggestion));
                  }}
                >
                  {suggestion}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default SearchBar;
