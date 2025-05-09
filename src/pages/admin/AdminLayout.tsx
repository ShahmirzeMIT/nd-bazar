
import React from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  const navItems = [
    {
      to: "/admin",
      label: "İdarəetmə Paneli",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
    },
    {
      to: "/admin/products",
      label: "Məhsullar",
      icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    },
    {
      to: "/admin/orders",
      label: "Sifarişlər",
      icon: <Truck className="h-5 w-5 mr-2" />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 flex items-center justify-between bg-white border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <Button variant="ghost" onClick={toggleMobileMenu} size="icon">
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex bg-farm-green text-white w-64 flex-shrink-0 flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/admin"}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md ${
                        isActive
                          ? "bg-farm-green-light/20 text-white font-medium"
                          : "text-farm-green-light hover:bg-farm-green-light/10"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-farm-green-light/20">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center text-white hover:bg-farm-green-light/20"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Çıxış
            </Button>
          </div>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-farm-green text-white flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-farm-green-light/20">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <Button variant="ghost" onClick={toggleMobileMenu} size="icon">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-md ${
                          isActive
                            ? "bg-farm-green-light/20 text-white font-medium"
                            : "text-farm-green-light hover:bg-farm-green-light/10"
                        }`
                      }
                      onClick={toggleMobileMenu}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-farm-green-light/20">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center text-white hover:bg-farm-green-light/20"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
