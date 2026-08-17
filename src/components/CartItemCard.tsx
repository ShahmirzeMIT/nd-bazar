import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
import { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      handleRemove();
    }
  };
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(product.id);
    }, 300);
  };
  
  const itemTotal = product.price * quantity;

  return (
    <Card
      className={`mb-4 overflow-hidden transition-all duration-300 ease-in-out transform ${
        isRemoving
          ? "opacity-0 -translate-x-full scale-95 max-h-0 mb-0 p-0 border-none pointer-events-none"
          : "opacity-100 translate-x-0 scale-100 max-h-96"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-24 bg-gray-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex flex-1 flex-col p-4 justify-between">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{product.name}</h3>
            <span className="font-bold text-farm-green transition-all duration-200">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={handleDecrease}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white transition-colors"
                disabled={isRemoving}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="mx-3 w-8 text-center font-medium transition-all duration-200">
                {quantity}
              </span>
              
              <Button
                onClick={handleIncrease}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white transition-colors"
                disabled={isRemoving}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg text-gray-800 transition-all duration-200">
                {formatPrice(itemTotal)}
              </span>
              
              <Button
                onClick={handleRemove}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                disabled={isRemoving}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;