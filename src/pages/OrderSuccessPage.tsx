
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Home, ShoppingBag } from "lucide-react";

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Sifarişiniz qəbul edildi!</h1>
      
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Təşəkkür edirik! Sifarişiniz uğurla qəbul edildi.
        Bizim komanda ən qısa zamanda sizə təzə kənd məhsullarını çatdıracaq.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-farm-green hover:bg-farm-green/80">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Ana səhifəyə qayıt
          </Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Alış-verişə davam et
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
