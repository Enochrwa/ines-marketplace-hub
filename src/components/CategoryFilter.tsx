
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Book, Monitor, Utensils, Armchair, Shirt, Dumbbell, Grid3X3 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCategory, setPriceRange } from '@/store/slices/productsSlice';

const categories = [
  { name: "All", icon: Grid3X3, count: 150 },
  { name: "Books", icon: Book, count: 45 },
  { name: "Electronics", icon: Monitor, count: 32 },
  { name: "Furniture", icon: Armchair, count: 28 },
  { name: "Kitchenware", icon: Utensils, count: 22 },
  { name: "Clothing", icon: Shirt, count: 18 },
  { name: "Sports", icon: Dumbbell, count: 15 }
];

const conditions = ["Excellent", "Good", "Fair", "Poor"];

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.products);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceRange(value));
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-black to-gray-800 text-white rounded-t-lg">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.name}
                variant={filters.category === category.name ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  filters.category === category.name 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "hover:bg-yellow-50 dark:hover:bg-gray-800 hover:text-green-600"
                }`}
                onClick={() => handleCategoryChange(category.name)}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                <span className="flex-1">{category.name}</span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    filters.category === category.name 
                      ? 'bg-white/20 text-white' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-green-500 text-black rounded-t-lg">
          <CardTitle className="text-lg font-bold">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">${filters.priceRange[0]}</span>
              <span className="font-semibold">${filters.priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condition */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-black text-white rounded-t-lg">
          <CardTitle className="text-lg">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-800 p-2 rounded">
              <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="text-sm font-medium">{condition}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-t-lg">
          <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <Button variant="outline" className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50">
            Recently Added
          </Button>
          <Button variant="outline" className="w-full justify-start border-yellow-200 text-yellow-600 hover:bg-yellow-50">
            Price: Low to High
          </Button>
          <Button variant="outline" className="w-full justify-start border-black text-black hover:bg-gray-50">
            Most Popular
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryFilter;
