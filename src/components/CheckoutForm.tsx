
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationPicker from "./LocationPicker";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { UserLocation } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Ad ən az 2 simvol olmalıdır"),
  phone: z.string().min(9, "Telefon düzgün formatda deyil"),
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin").optional().or(z.literal("")),
});

const CheckoutForm = () => {
  const { items, userLocation, setUserLocation, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });
  
  const onLocationSelect = (location: UserLocation) => {
    setUserLocation(location);
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userLocation) {
      toast({
        variant: "destructive",
        title: "Çatdırılma məkanı seçilməyib",
        description: "Zəhmət olmasa, çatdırılma məkanını seçin.",
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Səbət boşdur",
        description: "Sifariş yerləşdirmək üçün səbətə məhsul əlavə edin.",
      });
      return;
    }
    
    try {
      const customerInfo = {
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
      };
      
      const order = await addOrder(items, customerInfo, userLocation);
      
      clearCart();
      
      toast({
        title: "Sifariş uğurla yerləşdirildi!",
        description: `Sifariş nömrəniz: ${order.id}`,
      });
      
      navigate("/order-success");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Xəta baş verdi",
        description: "Sifarişi yerləşdirmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Şəxsi məlumatlar</h3>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Ad və soyadınızı daxil edin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="+994 XX XXX XX XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-poçt (istəyə bağlı)</FormLabel>
                <FormControl>
                  <Input placeholder="E-poçt ünvanınız" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Çatdırılma məkanı</h3>
          <p className="text-sm text-gray-500">
            Çatdırılma haqqını hesablamaq üçün məkanınızı seçin
          </p>
          
          <LocationPicker
            onSelectLocation={onLocationSelect}
            selectedLocation={userLocation}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-farm-green hover:bg-farm-green/80"
          disabled={!userLocation || items.length === 0}
        >
          Sifarişi tamamla
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
