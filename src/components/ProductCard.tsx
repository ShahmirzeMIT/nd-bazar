
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Check } from "lucide-react";
import { Product, CartCondition } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items, addCondition, removeCondition, conditions } = useCart();
  
  const isInCart = items.some(item => item.product.id === product.id);
  const quantity = items.find(item => item.product.id === product.id)?.quantity || 0;
  
  const hasIncludeCondition = conditions.some(
    c => c.productId === product.id && c.type === 'include'
  );
  
  const hasExcludeCondition = conditions.some(
    c => c.productId === product.id && c.type === 'exclude'
  );
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handleIncludeProduct = () => {
    addCondition({ type: 'include', productId: product.id });
  };

  const handleExcludeProduct = () => {
    addCondition({ type: 'exclude', productId: product.id });
  };

  const handleRemoveCondition = (type: 'include' | 'exclude') => {
    removeCondition(product.id, type);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white">
              Mövcud deyil
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.tags.map((tag) => (
            <Badge key={tag} className="bg-farm-accent text-farm-brown">
              {tag === "fresh" && "Təzə"}
              {tag === "organic" && "Ekoloji"}
              {tag === "local" && "Yerli"}
              {tag === "seasonal" && "Mövsümi"}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="font-bold text-farm-green">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mb-2 text-sm text-gray-600">{product.description}</p>
        <div className="mb-1 flex items-center">
          <Badge variant="outline" className="border-farm-green text-farm-green">
            {product.category === "dairy" && "Süd məhsulları"}
            {product.category === "eggs" && "Yumurta"}
            {product.category === "vegetables" && "Tərəvəzlər"}
            {product.category === "fruits" && "Meyvələr"}
            {product.category === "nuts" && "Qoz-fındıq"}
            {product.category === "honey" && "Bal"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          {isInCart ? (
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Səbətdə:</span>
              <span className="font-semibold">{quantity}</span>
            </div>
          ) : (
            <span className="text-sm font-medium">Səbətə əlavə et</span>
          )}
          
          <Button
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="bg-farm-green hover:bg-farm-green/80"
            disabled={!product.inStock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="flex gap-2">
            <Button
              onClick={hasIncludeCondition ? () => handleRemoveCondition('include') : handleIncludeProduct}
              variant={hasIncludeCondition ? "default" : "outline"}
              size="sm"
              className={`text-xs ${
                hasIncludeCondition
                ? "bg-farm-green hover:bg-farm-green/80"
                : "border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
              }`}
            >
              {hasIncludeCondition && <Check className="mr-1 h-3 w-3" />}
              Daxil et
            </Button>
            
            <Button
              onClick={hasExcludeCondition ? () => handleRemoveCondition('exclude') : handleExcludeProduct}
              variant={hasExcludeCondition ? "destructive" : "outline"}
              size="sm"
              className={`text-xs ${
                !hasExcludeCondition && "border-destructive text-destructive hover:bg-destructive hover:text-white"
              }`}
            >
              {hasExcludeCondition && <Check className="mr-1 h-3 w-3" />}
              Xaric et
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
