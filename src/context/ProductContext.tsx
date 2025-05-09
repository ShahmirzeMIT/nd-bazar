
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../types";
import { mockProducts } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  filteredProducts: Product[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    // Apply category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply tag filter
    if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
    toast({
      title: "Məhsul əlavə edildi",
      description: `${product.name} məhsul kataloqa əlavə edildi.`,
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast({
      title: "Məhsul yeniləndi",
      description: `${updatedProduct.name} məhsulu yeniləndi.`,
    });
  };

  const deleteProduct = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== productId)
    );
    if (productToDelete) {
      toast({
        title: "Məhsul silindi",
        description: `${productToDelete.name} məhsulu silindi.`,
      });
    }
  };

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        filteredProducts,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        selectedTags,
        toggleTag,
        isLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
