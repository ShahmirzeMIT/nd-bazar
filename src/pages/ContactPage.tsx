
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Mesajınız göndərildi",
      description: "Tezliklə sizinlə əlaqə saxlayacağıq.",
    });
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-farm-green">Əlaqə</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Bizimlə Əlaqə Saxlayın</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Ad Soyad
                </label>
                <Input id="name" placeholder="Adınızı daxil edin" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-poçt
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="E-poçt ünvanınızı daxil edin" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefon
                </label>
                <Input id="phone" placeholder="Telefon nömrənizi daxil edin" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mesajınız
                </label>
                <Textarea
                  id="message"
                  placeholder="Mesajınızı daxil edin"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-farm-green hover:bg-farm-green/80">
                Göndər
              </Button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4">Əlaqə Məlumatları</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-3 text-farm-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">Ünvan</h3>
                  <p className="text-gray-600">Bakı şəh., Azadlıq pr. 89, Azərbaycan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-3 text-farm-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-gray-600">+994 50 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-3 text-farm-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">E-poçt</h3>
                  <p className="text-gray-600">info@ferma-mehsullari.az</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-3 text-farm-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">İş saatları</h3>
                  <p className="text-gray-600">Bazar ertəsi - Şənbə: 09:00 - 18:00</p>
                  <p className="text-gray-600">Bazar: İstirahət günü</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm h-64">
            {/* Map placeholder */}
            <div className="h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Xəritə görüntüsü</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
