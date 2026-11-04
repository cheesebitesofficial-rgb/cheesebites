import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { MenuProvider } from './context/MenuContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Protected Route Guard
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Layouts
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingButtons } from './components/common/FloatingButtons';
import { AdminLayout } from './components/layout/AdminLayout';

// Customer Pages
import { Home } from './pages/Home';
import { MenuPage } from './pages/Menu';
import { DealsPage } from './pages/Deals';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { OrderConfirmationPage } from './pages/OrderConfirmation';
import { OrderTrackingPage } from './pages/OrderTracking';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminOrderDetails } from './pages/admin/AdminOrderDetails';
import { AdminProducts } from './pages/admin/AdminProducts';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main Customer Shell
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                
                {/* CUSTOMER FACING ROUTES (PUBLIC ACCESS) */}
                <Route
                  path="/"
                  element={
                    <CustomerLayout>
                      <Home />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <CustomerLayout>
                      <MenuPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/deals"
                  element={
                    <CustomerLayout>
                      <DealsPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <CustomerLayout>
                      <CartPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <CustomerLayout>
                      <CheckoutPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/confirmation/:orderId"
                  element={
                    <CustomerLayout>
                      <OrderConfirmationPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/tracking/:orderId"
                  element={
                    <CustomerLayout>
                      <OrderTrackingPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <CustomerLayout>
                      <AboutPage />
                    </CustomerLayout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <CustomerLayout>
                      <ContactPage />
                    </CustomerLayout>
                  }
                />

                {/* PUBLIC ADMIN LOGIN ROUTE */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* PROTECTED ADMIN & POS PORTAL ROUTES */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:orderId" element={<AdminOrderDetails />} />
                  <Route path="products" element={<AdminProducts />} />
                </Route>

                {/* PROTECTED ROUTE ALIASES: /pos, /dashboard */}
                <Route
                  path="/pos"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                </Route>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                </Route>

                {/* FALLBACK REDIRECT FOR UNKNOWN ROUTES */}
                <Route
                  path="*"
                  element={
                    <CustomerLayout>
                      <Home />
                    </CustomerLayout>
                  }
                />

              </Routes>
            </Router>
          </CartProvider>
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
