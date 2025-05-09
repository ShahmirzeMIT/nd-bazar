
import { createContext, useContext, useState, ReactNode } from "react";
import { Order, CartItem, UserLocation } from "../types";
import { mockOrders } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { calculateDistance, calculateDeliveryFee, calculateSubtotal, calculateTotal } from "../utils/helpers";
import { adminLocation } from "../data/mockData";

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], customerInfo: { name: string; phone: string; email?: string }, location: UserLocation) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const addOrder = async (
    items: CartItem[],
    customerInfo: { name: string; phone: string; email?: string },
    userLocation: UserLocation
  ): Promise<Order> => {
    if (!userLocation) {
      throw new Error("Çatdırılma məkanı təyin edilməyib");
    }
    
    const distance = calculateDistance(
      adminLocation.latitude,
      adminLocation.longitude,
      userLocation.latitude,
      userLocation.longitude
    );
    
    const deliveryFee = calculateDeliveryFee(distance);
    const subtotal = calculateSubtotal(items);
    const total = calculateTotal(subtotal, deliveryFee);
    
    const address = userLocation.address || "Ünvan əlavə edilməyib";
    
    const newOrder: Order = {
      id: `order${Date.now()}`,
      items,
      customer: customerInfo,
      deliveryLocation: {
        address,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      },
      distance,
      deliveryFee,
      subtotal,
      total,
      status: "pending",
      timestamp: new Date().toISOString()
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    toast({
      title: "Sifariş yerləşdirildi",
      description: `Sifarişiniz uğurla qeydə alındı. Sifariş nömrəsi: ${newOrder.id}`,
    });
    
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    toast({
      title: "Sifariş statusu yeniləndi",
      description: `Sifariş #${orderId} statusu "${status}" olaraq yeniləndi.`,
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
