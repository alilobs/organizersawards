import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  regions: string[];
}

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedRegion, 
  onRegionChange,
  regions 
}: SearchFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search organizers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-surface-elevated border-white/10 focus:border-primary/50 focus:ring-primary/20"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="glass"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-primary/20 border-primary/30" : ""}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Region Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          <Button
            variant={selectedRegion === "all" ? "gold" : "glass"}
            size="sm"
            onClick={() => onRegionChange("all")}
          >
            All Regions
          </Button>
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "gold" : "glass"}
              size="sm"
              onClick={() => onRegionChange(region)}
            >
              {region}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
