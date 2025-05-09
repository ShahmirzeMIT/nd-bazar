
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItemCard from "@/components/CartItemCard";
import CartConditionsList from "@/components/CartConditionsList";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";

const CartPage = () => {
  const { items, clearCart, subtotal, deliveryFee, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Səbətiniz boşdur</h1>
        <p className="text-gray-600 mb-8">
          Səbətinizə məhsullar əlavə etmək üçün məhsul səhifəsinə keçin.
        </p>
        <Button asChild className="bg-farm-green hover:bg-farm-green/80">
          <Link to="/products">Alış-verişə davam et</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alış-veriş səbətiniz</h1>
      
      <CartConditionsList />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="border-farm-green text-farm-green hover:text-white hover:bg-farm-green"
            >
              Səbəti təmizlə
            </Button>
            
            <Button asChild variant="ghost">
              <Link to="/products">Alış-verişə davam et</Link>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Sifariş xülasəsi</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Məhsulların cəmi</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Çatdırılma</span>
                <span>
                  {deliveryFee > 0
                    ? formatPrice(deliveryFee)
                    : "Hesablanacaq"}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Cəmi</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            
            <Button asChild className="w-full bg-farm-green hover:bg-farm-green/80">
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
