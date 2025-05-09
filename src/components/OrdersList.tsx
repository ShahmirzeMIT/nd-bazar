
import React from "react";
import { useOrders } from "@/context/OrderContext";
import OrderItem from "./OrderItem";

interface OrdersListProps {
  isAdmin?: boolean;
}

const OrdersList = ({ isAdmin = false }: OrdersListProps) => {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-farm-green mb-2">
          {isAdmin ? "Hələ sifariş yoxdur" : "Sizin hələ sifarişiniz yoxdur"}
        </h3>
        <p className="text-gray-600">
          {isAdmin
            ? "Müştərilərdən sifarişlər gəldikdə, burada görünəcək."
            : "Sifariş verdiyiniz zaman, burada görünəcək."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default OrdersList;
