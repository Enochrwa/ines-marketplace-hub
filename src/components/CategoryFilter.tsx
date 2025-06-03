
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.name}
                variant={filters.category === category.name ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  filters.category === category.name 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => handleCategoryChange(category.name)}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                <span className="flex-1">{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Recently Added
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Price: Low to High
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Most Popular
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryFilter;
