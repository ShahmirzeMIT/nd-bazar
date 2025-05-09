
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrdersList from "@/components/OrdersList";
import { useOrders } from "@/context/OrderContext";

const AdminOrdersPage = () => {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    // Apply status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Apply search query (search in customer name, order ID)
    if (searchQuery) {
      const searchTermLower = searchQuery.toLowerCase();
      return (
        order.customer.name.toLowerCase().includes(searchTermLower) ||
        order.id.toLowerCase().includes(searchTermLower) ||
        order.customer.phone.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sifarişlər</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Sifariş axtar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-xs"
        />
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Bütün statuslar</SelectItem>
            <SelectItem value="pending">Gözləmədə</SelectItem>
            <SelectItem value="accepted">Qəbul edilib</SelectItem>
            <SelectItem value="delivered">Çatdırılıb</SelectItem>
            <SelectItem value="cancelled">Ləğv edilib</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length > 0 ? (
        <OrdersList isAdmin={true} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <h3 className="text-xl font-semibold text-farm-green mb-2">
            Sifariş tapılmadı
          </h3>
          <p className="text-gray-600">
            Seçilmiş filtrlərə uyğun sifariş yoxdur.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
