
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Book, Monitor, Utensils, Armchair, Shirt, Dumbbell, Grid3X3 } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

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

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
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
                variant={selectedCategory === category.name ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  selectedCategory === category.name 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onCategoryChange(category.name)}
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
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>$1000+</span>
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
