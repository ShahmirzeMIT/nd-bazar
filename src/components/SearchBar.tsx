
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useProducts();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Məhsul axtar..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
