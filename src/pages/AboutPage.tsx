
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-farm-green">Haqqımızda</h1>
        
        <div className="bg-white rounded-lg overflow-hidden mb-12">
          <img
            src="/placeholder.svg"
            alt="Ferma Məhsulları"
            className="w-full h-64 object-cover"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Ferma Məhsulları Azərbaycanda yerli fermerlərdən təzə və keyfiyyətli
            kənd məhsullarını birbaşa istehlakçılara çatdıran onlayn platformadır.
            Missiyamız şəhərdə yaşayan insanların ekoloji təmiz və təzə
            məhsullara əlçatanlığını təmin etməkdir.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Bizim Hekayəmiz</h2>
          <p>
            Ferma Məhsulları layihəsi 2023-cü ildə bir qrup kənd təsərrüfatı
            həvəskarları tərəfindən yaradılıb. Şəhərdə yaşayan insanların 
            keyfiyyətli qida məhsullarına əlçatanlığının məhdud olduğunu görərək,
            yerli fermerlərlə şəhər sakinlərini birləşdirən bir platforma qurmağı
            qərara aldıq.
          </p>
          
          <p>
            Başlanğıcda kiçik bir layihə kimi fəaliyyətə başlasaq da, qısa müddətdə
            həm müştərilərimizin, həm də fermerlərimizin sayı artdı. Hazırda
            Azərbaycanın müxtəlif bölgələrindən onlarla fermer bizim platformamız
            vasitəsilə məhsullarını satır.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Dəyərlərimiz</h2>
          <ul>
            <li>
              <strong>Keyfiyyət:</strong> Bütün məhsullarımız keyfiyyətə nəzarət 
              edilir və yalnız ən yaxşı kənd məhsulları müştərilərimizə çatdırılır.
            </li>
            <li>
              <strong>Şəffaflıq:</strong> Məhsullarımızın mənbəyini və istehsal
              üsullarını açıq şəkildə bölüşürük.
            </li>
            <li>
              <strong>Davamlılıq:</strong> Ekoloji təmiz kənd təsərrüfatını
              dəstəkləyirik və ətraf mühitə minimum təsir göstərən praktikalara üstünlük veririk.
            </li>
            <li>
              <strong>Yerli iqtisadiyyatı dəstək:</strong> Yerli fermerləri 
              dəstəkləyərək kənd təsərrüfatının inkişafına və yerli iqtisadiyyata töhfə veririk.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Bizim Fərqimiz</h2>
          <p>
            Ferma Məhsulları olaraq, biz aşağıdakı xüsusiyyətlərimizlə fərqlənirik:
          </p>
          
          <ul>
            <li>
              <strong>Birbaşa fermadan:</strong> Məhsullarımız vasitəçilər olmadan
              birbaşa fermerlərdən alınır, beləliklə həm təzəlik təmin edilir, həm
              də qiymətlər daha əlçatan olur.
            </li>
            <li>
              <strong>Şəxsi yanaşma:</strong> Hər bir müştəriyə fərdi yanaşır
              və onların tələblərini qarşılamaq üçün əlimizdən gələni edirik.
            </li>
            <li>
              <strong>Sürətli çatdırılma:</strong> Məhsullarımızı sifarişdən
              sonra ən qısa zamanda çatdırırıq ki, təzəliyini qoruyaq.
            </li>
            <li>
              <strong>Mövsümi məhsullar:</strong> İlin fəsillərinə uyğun olaraq
              təzə və mövsümi məhsulları təqdim edirik.
            </li>
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Təzə kənd məhsullarını kəşf edin
          </h3>
          <Button asChild className="bg-farm-green hover:bg-farm-green/80">
            <Link to="/products">Məhsullarımıza baxın</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
