import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItemCard from "@/components/CartItemCard";
import CartConditionsList from "@/components/CartConditionsList";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";

const CartPage = () => {
  const { items, clearCart, subtotal, deliveryFee, total, itemCount } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Səbətiniz boşdur</h1>
        <p className="text-gray-600 mb-8">
          Səbətinizə məhsullar əlavə etmək üçün məhsul səhifəsinə keçin.
        </p>
        <Button asChild className="bg-farm-green hover:bg-farm-green/80 transition-colors">
          <Link to="/products">Alış-verişə davam et</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Alış-veriş səbətiniz</h1>
        <span className="text-sm text-gray-500 font-medium">
          {itemCount} məhsul
        </span>
      </div>
      
      <CartConditionsList />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard key={item.product.id} item={item} />
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={clearCart}
              className="border-farm-green text-farm-green hover:text-white hover:bg-farm-green transition-colors"
            >
              Səbəti təmizlə
            </Button>
            
            <Button asChild variant="ghost">
              <Link to="/products">Alış-verişə davam et</Link>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg border p-6 sticky top-20 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sifariş xülasəsi</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Məhsulların cəmi</span>
                <span className="font-medium text-gray-900 transition-all duration-200">
                  {formatPrice(subtotal)}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Çatdırılma</span>
                <span className="font-medium text-gray-900 transition-all duration-200">
                  {deliveryFee > 0
                    ? formatPrice(deliveryFee)
                    : "Hesablanacaq"}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Cəmi</span>
                  <span className="text-farm-green transition-all duration-200">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button asChild className="w-full bg-farm-green hover:bg-farm-green/80 transition-colors">
              <Link to="/checkout">Sifarişi tamamla</Link>
            </Button>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              Çatdırılma haqqı məkanınıza görə hesablanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;