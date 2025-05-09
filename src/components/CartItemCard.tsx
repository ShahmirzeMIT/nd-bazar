
import React from "react";
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
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  const itemTotal = product.price * quantity;

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-24 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex flex-1 flex-col p-4">
          <div className="flex justify-between">
            <h3 className="font-semibold">{product.name}</h3>
            <span className="font-bold text-farm-green">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={handleDecrease}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-farm-green text-farm-green"
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="mx-3 w-8 text-center">{quantity}</span>
              
              <Button
                onClick={handleIncrease}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-farm-green text-farm-green"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-semibold">
                {formatPrice(itemTotal)}
              </span>
              
              <Button
                onClick={handleRemove}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
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
