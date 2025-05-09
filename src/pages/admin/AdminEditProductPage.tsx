
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ArrowLeft } from "lucide-react";

const AdminEditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const product = getProductById(productId || "");

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Məhsul tapılmadı</h2>
        <p className="mb-4">İstədiyiniz məhsul mövcud deyil və ya silinib.</p>
        <Button
          onClick={() => navigate("/admin/products")}
          className="bg-farm-green hover:bg-farm-green/80"
        >
          Məhsul siyahısına qayıt
        </Button>
      </div>
    );
  }

  const handleSubmit = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold ml-2">Məhsulu Redaktə et</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            buttonText="Məhsulu yenilə"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEditProductPage;
