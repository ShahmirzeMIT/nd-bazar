
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-farm-green sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-white text-xl font-bold">Ferma Məhsulları</span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-white hover:text-farm-accent px-3 py-2 rounded-md font-medium ${
                isActive("/") ? "bg-farm-green-light/20" : ""
              }`}
            >
              Ana Səhifə
            </Link>
            <Link
              to="/products"
              className={`text-white hover:text-farm-accent px-3 py-2 rounded-md font-medium ${
                isActive("/products") ? "bg-farm-green-light/20" : ""
              }`}
            >
              Məhsullar
            </Link>
            <Link
              to="/about"
              className={`text-white hover:text-farm-accent px-3 py-2 rounded-md font-medium ${
                isActive("/about") ? "bg-farm-green-light/20" : ""
              }`}
            >
              Haqqımızda
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-farm-accent px-3 py-2 rounded-md font-medium ${
                isActive("/contact") ? "bg-farm-green-light/20" : ""
              }`}
            >
              Əlaqə
            </Link>
            
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className={`text-white hover:text-farm-accent px-3 py-2 rounded-md font-medium ${
                  location.pathname.startsWith("/admin") ? "bg-farm-green-light/20" : ""
                }`}
              >
                Admin Panel
              </Link>
            )}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} className="border-white text-white hover:text-farm-green hover:bg-white">
                Çıxış
              </Button>
            ) : (
              <Link to="/admin/login">
                <Button variant="outline" className="border-white text-white hover:text-farm-green hover:bg-white">
                  Admin Giriş
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="text-white hover:bg-farm-green-light/20">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-farm-accent text-farm-brown">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
