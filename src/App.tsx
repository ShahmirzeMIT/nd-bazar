
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

// Layout
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLayout from "@/pages/admin/AdminLayout";

// User Pages
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminAddProductPage from "@/pages/admin/AdminAddProductPage";
import AdminEditProductPage from "@/pages/admin/AdminEditProductPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="products/add" element={<AdminAddProductPage />} />
                    <Route path="products/edit/:productId" element={<AdminEditProductPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                  </Route>
                  
                  {/* User Routes with Layout */}
                  <Route
                    path="/"
                    element={
                      <>
                        <Header />
                        <HomePage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <>
                        <Header />
                        <ProductsPage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <>
                        <Header />
                        <CartPage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <>
                        <Header />
                        <CheckoutPage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/order-success"
                    element={
                      <>
                        <Header />
                        <OrderSuccessPage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <>
                        <Header />
                        <AboutPage />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <>
                        <Header />
                        <ContactPage />
                        <Footer />
                      </>
                    }
                  />
                  
                  {/* 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
