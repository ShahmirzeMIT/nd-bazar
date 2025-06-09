
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/mockData";
import Sebet from '@/assets/images/yumurta.jpg'
import Sebet2 from '@/assets/images/pendir.jpeg'
import Sebet3 from '@/assets/images/yag.jpeg'
const HomePage = () => {
  const { products } = useProducts();
  
  // Get 4 products for the featured section
  const featuredProducts = products.filter(product => product.inStock).slice(0, 4);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-farm-green/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold text-farm-green mb-4">
                Təzə Kənd Məhsulları Birbaşa Qapınıza
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Ekoloji təmiz, təzə və dadlı məhsulları birbaşa fermadan evinizə çatdırırıq.
                Yerli fermerlərə dəstək olun və keyfiyyətli qidalanın.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-farm-green hover:bg-farm-green/80">
                  <Link to="/products">Alış-verişə başla</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Daha ətraflı</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-farm-accent rounded-lg overflow-hidden">
                  <img
                    src={Sebet}
                    alt="Təzə məhsullar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-farm-brown-light rounded-lg overflow-hidden">
                  <img
                    src={Sebet2}
                    alt="Kənd məhsulları"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-farm-green-light rounded-lg overflow-hidden">
                  <img
                    src={Sebet3}
                    alt="Yumurta və süd"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-farm-brown rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Organik tərəvəzlər"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Məhsul Kateqoriyaları</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100"
              >
                <div className="absolute inset-0 bg-farm-green/20 group-hover:bg-farm-green/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-white bg-farm-green/70 px-3 py-1 rounded">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Seçilmiş Məhsullar</h2>
            <Button asChild variant="ghost" className="text-farm-green hover:text-farm-green/80">
              <Link to="/products">Hamısına bax</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Niyə Bizi Seçməlisiniz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-farm-green text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ekoloji təmiz məhsullar</h3>
              <p className="text-gray-600">
                Bütün məhsullarımız kimyəvi gübrə və pestisidlərdən uzaq, təbii şəraitdə yetişdirilir.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-farm-green text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sürətli çatdırılma</h3>
              <p className="text-gray-600">
                Sifarişlərinizi eyni gün içərisində və ya növbəti gün təzə şəkildə qapınıza çatdırırıq.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-farm-green text-2xl">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fermerləri dəstəkləyin</h3>
              <p className="text-gray-600">
                Bizdən alış-veriş edərək yerli fermerləri dəstəkləyir və kənd təsərrüfatının inkişafına töhfə verirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-farm-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Təzə məhsulları kəşf etməyə hazırsınız?
          </h2>
          <p className="text-farm-green-light mb-8 max-w-2xl mx-auto">
            İndi sifariş verin və kənd məhsullarının dadını çıxarın. Yerli fermadan birbaşa evinizə!
          </p>
          <Button asChild size="lg" className="bg-white text-farm-green hover:bg-farm-accent">
            <Link to="/products">İndi sifariş ver</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
