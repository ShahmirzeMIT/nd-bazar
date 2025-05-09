
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, CartCondition, Product, UserLocation } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { calculateSubtotal, calculateDeliveryFee, calculateDistance, calculateTotal } from "../utils/helpers";
import { adminLocation } from "../data/mockData";

interface CartContextType {
  items: CartItem[];
  conditions: CartCondition[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addCondition: (condition: CartCondition) => void;
  removeCondition: (productId: string, type: 'include' | 'exclude') => void;
  onlyInStock: boolean;
  toggleOnlyInStock: () => void;
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [conditions, setConditions] = useState<CartCondition[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const { toast } = useToast();
  
  // Calculate totals
  const subtotal = calculateSubtotal(items);
  const distance = userLocation 
    ? calculateDistance(
        adminLocation.latitude,
        adminLocation.longitude,
        userLocation.latitude,
        userLocation.longitude
      )
    : 0;
  const deliveryFee = calculateDeliveryFee(distance);
  const total = calculateTotal(subtotal, deliveryFee);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedConditions = localStorage.getItem("cartConditions");
    const savedInStock = localStorage.getItem("onlyInStock");
    const savedLocation = localStorage.getItem("userLocation");
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart", error);
      }
    }
    
    if (savedConditions) {
      try {
        setConditions(JSON.parse(savedConditions));
      } catch (error) {
        console.error("Failed to parse saved conditions", error);
      }
    }
    
    if (savedInStock) {
      setOnlyInStock(JSON.parse(savedInStock));
    }
    
    if (savedLocation) {
      try {
        setUserLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error("Failed to parse saved location", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("cartConditions", JSON.stringify(conditions));
    localStorage.setItem("onlyInStock", JSON.stringify(onlyInStock));
    if (userLocation) {
      localStorage.setItem("userLocation", JSON.stringify(userLocation));
    }
  }, [items, conditions, onlyInStock, userLocation]);

  const addItem = (product: Product, quantity: number = 1) => {
    // Don't add out of stock items if onlyInStock is true
    if (onlyInStock && !product.inStock) {
      toast({
        variant: "destructive",
        title: "Məhsul mövcud deyil",
        description: "Bu məhsul hazırda stokda yoxdur.",
      });
      return;
    }
    
    // Check if product has exclude condition
    const hasExcludeCondition = conditions.some(
      c => c.productId === product.id && c.type === 'exclude'
    );
    
    if (hasExcludeCondition) {
      toast({
        variant: "destructive",
        title: "Məhsul əlavə edilə bilmədi",
        description: "Bu məhsul istisna şərtinə görə əlavə edilə bilməz.",
      });
      return;
    }
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      return [...prevItems, { product, quantity }];
    });
    
    toast({
      title: "Məhsul səbətə əlavə edildi",
      description: `${product.name} səbətinizə əlavə edildi.`,
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setConditions([]);
    toast({
      title: "Səbət təmizləndi",
      description: "Bütün məhsullar səbətdən silindi.",
    });
  };

  const addCondition = (condition: CartCondition) => {
    // Remove existing condition of same type for the same product
    const filteredConditions = conditions.filter(
      c => !(c.productId === condition.productId && c.type === condition.type)
    );
    
    setConditions([...filteredConditions, condition]);
    
    // If adding an include condition, make sure to remove any exclude condition for the same product
    if (condition.type === 'include') {
      setConditions(prev => 
        prev.filter(c => !(c.productId === condition.productId && c.type === 'exclude'))
      );
    }
    
    // If adding an exclude condition, make sure to remove any include condition for the same product
    if (condition.type === 'exclude') {
      setConditions(prev => 
        prev.filter(c => !(c.productId === condition.productId && c.type === 'include'))
      );
      
      // Also remove any items with this product from the cart
      setItems(prev => prev.filter(item => item.product.id !== condition.productId));
    }
  };

  const removeCondition = (productId: string, type: 'include' | 'exclude') => {
    setConditions(prevConditions => 
      prevConditions.filter(c => !(c.productId === productId && c.type === type))
    );
  };

  const toggleOnlyInStock = () => {
    setOnlyInStock(prev => !prev);
    
    // If toggling to only in stock, remove out of stock items
    if (!onlyInStock) {
      setItems(prev => prev.filter(item => item.product.inStock));
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        conditions,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        addCondition,
        removeCondition,
        onlyInStock,
        toggleOnlyInStock,
        userLocation,
        setUserLocation,
        subtotal,
        deliveryFee,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
