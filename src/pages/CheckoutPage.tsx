
import React from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "@/components/CheckoutForm";
import CartItemCard from "@/components/CartItemCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";

const CheckoutPage = () => {
  const { items, subtotal, deliveryFee, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Səbətiniz boşdur</h1>
        <p className="text-gray-600 mb-8">
          Sifariş vermək üçün əvvəlcə səbətinizə məhsul əlavə edin.
        </p>
        <Button asChild className="bg-farm-green hover:bg-farm-green/80">
          <Link to="/products">Alış-verişə keçin</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sifarişi tamamla</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/5">
          <CheckoutForm />
        </div>
        
        <div className="w-full lg:w-2/5">
          <div className="bg-white rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Sifarişiniz</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6">
              {items.map((item) => (
                <CartItemCard key={item.product.id} item={item} />
              ))}
            </div>
            
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
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/cart">Səbətə qayıt</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
