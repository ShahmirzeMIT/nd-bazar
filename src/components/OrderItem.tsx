
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Truck, X } from "lucide-react";
import { Order } from "@/types";
import { useOrders } from "@/context/OrderContext";
import { formatPrice } from "@/utils/helpers";

interface OrderItemProps {
  order: Order;
  isAdmin?: boolean;
}

const OrderItem = ({ order, isAdmin = false }: OrderItemProps) => {
  const { updateOrderStatus } = useOrders();
  
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
            Gözləmədə
          </span>
        );
      case "accepted":
        return (
          <span className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
            Qəbul edilib
          </span>
        );
      case "delivered":
        return (
          <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            <Check className="mr-1 h-3 w-3" />
            Çatdırılıb
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
            <X className="mr-1 h-3 w-3" />
            Ləğv edilib
          </span>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("az-AZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-farm-green flex items-center">
              Sifariş #{order.id.replace("order", "")}
              <span className="ml-3">{getStatusBadge(order.status)}</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(order.timestamp)}
            </p>
          </div>
          
          {isAdmin && order.status === "pending" && (
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button
                onClick={() => updateOrderStatus(order.id, "accepted")}
                variant="default"
                size="sm"
                className="bg-farm-green hover:bg-farm-green/80"
              >
                <Check className="mr-1 h-4 w-4" />
                Qəbul et
              </Button>
              <Button
                onClick={() => updateOrderStatus(order.id, "cancelled")}
                variant="destructive"
                size="sm"
              >
                <X className="mr-1 h-4 w-4" />
                Ləğv et
              </Button>
            </div>
          )}
          
          {isAdmin && order.status === "accepted" && (
            <Button
              onClick={() => updateOrderStatus(order.id, "delivered")}
              variant="default"
              size="sm"
              className="bg-farm-green hover:bg-farm-green/80 mt-2 sm:mt-0"
            >
              <Truck className="mr-1 h-4 w-4" />
              Çatdırılıb
            </Button>
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-medium mb-2">Sifarişdə olan məhsullar</h4>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t border-gray-100 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span>Məhsulların cəmi</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="flex items-center">
              Çatdırılma ({order.distance} km)
            </span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center mt-2 font-bold">
            <span>Cəmi</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="font-medium mb-2">Müştəri məlumatları</h4>
          <p>{order.customer.name}</p>
          <p>{order.customer.phone}</p>
          {order.customer.email && <p>{order.customer.email}</p>}
        </div>
        
        <div className="border-t border-gray-100 mt-4 pt-4">
          <h4 className="font-medium mb-2">Çatdırılma ünvanı</h4>
          <p>{order.deliveryLocation.address}</p>
          <div className="mt-2 h-32 w-full rounded bg-gray-100"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
