
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "@/components/ProductList";
import FilterSidebar from "@/components/FilterSidebar";
import SearchBar from "@/components/SearchBar";
import { useProducts } from "@/context/ProductContext";

const ProductsPage = () => {
  const location = useLocation();
  const { setCategoryFilter } = useProducts();
  
  useEffect(() => {
    // Parse query parameters to set initial filters
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [location.search, setCategoryFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kənd Məhsulları</h1>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <FilterSidebar />
        </div>
        
        <div className="w-full md:w-3/4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
