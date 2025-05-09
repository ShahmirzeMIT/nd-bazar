
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ArrowLeft } from "lucide-react";

const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const handleSubmit = (product: Product) => {
    addProduct(product);
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold ml-2">Yeni Məhsul Əlavə et</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ProductForm
            onSubmit={handleSubmit}
            buttonText="Məhsulu əlavə et"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAddProductPage;
