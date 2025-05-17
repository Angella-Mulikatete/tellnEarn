
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Filter, Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string, value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="pl-8 bg-card text-white border-border/40 focus-visible:ring-tellnearn-yellow"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Select onValueChange={(value) => onFilterChange("category", value)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card text-white border-border/40 focus:ring-tellnearn-yellow">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-card text-white border-border/40">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="app">Mobile Apps</SelectItem>
              <SelectItem value="web">Web Platforms</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => onFilterChange("reward", value)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-card text-white border-border/40 focus:ring-tellnearn-yellow">
              <SelectValue placeholder="Reward" />
            </SelectTrigger>
            <SelectContent className="bg-card text-white border-border/40">
              <SelectItem value="all">All Rewards</SelectItem>
              <SelectItem value="high">Highest First</SelectItem>
              <SelectItem value="low">Lowest First</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="border-tellnearn-yellow/20 text-tellnearn-yellow hover:bg-tellnearn-yellow/10 hover:text-tellnearn-yellow"
          >
            <Filter size={16} className="mr-2" />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
