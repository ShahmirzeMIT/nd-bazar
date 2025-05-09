
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { useProducts } from "@/context/ProductContext";

const AdminDashboardPage = () => {
  const { orders } = useOrders();
  const { products } = useProducts();

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  
  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);
  
  const outOfStockProducts = products.filter((product) => !product.inStock);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">İdarəetmə Paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gözləyən Sifarişlər
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingOrders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tamamlanmış Sifarişlər
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{deliveredOrders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ümumi Gəlir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRevenue.toFixed(2)} AZN</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bitmiş Məhsullar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{outOfStockProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Son Sifarişlər</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">Sifariş #{order.id.replace("order", "")}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.name} - {new Date(order.timestamp).toLocaleDateString('az-AZ')}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status === "pending" && "Gözləyir"}
                        {order.status === "accepted" && "Qəbul edilib"}
                        {order.status === "delivered" && "Çatdırılıb"}
                        {order.status === "cancelled" && "Ləğv edilib"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Hələ sifariş yoxdur.</p>
            )}
            
            {orders.length > 0 && (
              <div className="mt-4 text-center">
                <Link
                  to="/admin/orders"
                  className="text-farm-green hover:underline text-sm font-medium"
                >
                  Bütün sifarişlərə baxın
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Stokda Olmayan Məhsullar</CardTitle>
          </CardHeader>
          <CardContent>
            {outOfStockProducts.length > 0 ? (
              <div className="space-y-4">
                {outOfStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.price} AZN
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-farm-green hover:underline text-sm"
                      >
                        Redaktə et
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Bütün məhsullar stokdadır.
              </p>
            )}
            
            {outOfStockProducts.length > 0 && (
              <div className="mt-4 text-center">
                <Link
                  to="/admin/products"
                  className="text-farm-green hover:underline text-sm font-medium"
                >
                  Bütün məhsullara baxın
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
