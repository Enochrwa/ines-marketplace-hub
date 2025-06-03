
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Real-time search
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-lg">
      <div className="relative flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for books, electronics, furniture..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-10 pr-4 py-3 w-full text-gray-800 bg-white border-0 rounded-l-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button 
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 rounded-r-lg rounded-l-none border-l-0"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
