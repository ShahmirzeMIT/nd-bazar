
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

const CartConditionsList = () => {
  const { conditions, removeCondition, onlyInStock, toggleOnlyInStock } = useCart();
  const { products } = useProducts();
  
  if (conditions.length === 0 && !onlyInStock) {
    return null;
  }
  
  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Məhsul';
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Tətbiq edilmiş şərtlər:</h3>
      <div className="flex flex-wrap gap-2">
        {onlyInStock && (
          <Badge
            variant="secondary"
            className="bg-farm-green/10 hover:bg-farm-green/20 text-farm-green"
          >
            Yalnız stokda olanlar
            <button
              className="ml-1 rounded-full hover:bg-farm-green/20 p-0.5"
              onClick={toggleOnlyInStock}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        
        {conditions.map((condition) => (
          <Badge
            key={`${condition.type}-${condition.productId}`}
            variant={condition.type === 'include' ? 'default' : 'destructive'}
            className={
              condition.type === 'include'
                ? 'bg-farm-green hover:bg-farm-green/80'
                : ''
            }
          >
            {condition.type === 'include' ? 'Daxil et' : 'Xaric et'}: {getProductName(condition.productId)}
            <button
              className="ml-1 rounded-full hover:bg-white/20 p-0.5"
              onClick={() => removeCondition(condition.productId, condition.type)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CartConditionsList;
