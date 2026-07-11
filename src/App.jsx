import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import OrderDetails from "./pages/OrderDetails";
// import { OrderDetails } from "./pages/OrderDetails";
import OrderDetails from "./pages/OrderDetails";
import Addresses from "./pages/Addresses";
// Protected Route
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Checkout from "./pages/checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
// Contexts
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { WishlistProvider } from "./context/WishlistContext";
// import { OrderProvider } from "./context/OrderContext";


function App() {
  return (
    <ProductsProvider>
      <AuthProvider>
        <WishlistProvider>
          {/* <OrderProvider> */}
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">

                <Navbar />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                    />
                    <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                    />

                    <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute>
                      <Wishlist />
                      </ProtectedRoute>
                    }
                    />
                    <Route
                    path="/checkout"
                    element={
                    <ProtectedRoute>
                    <Checkout />
                    </ProtectedRoute>
                    }
                    />
                    <Route
                    path="/order-success"
                    element={
                    <ProtectedRoute>
                    <OrderSuccess />
                    </ProtectedRoute>
                    }
                    />
<Route
path="/my-orders"
element={
<ProtectedRoute>
<MyOrders />
</ProtectedRoute>
}
/>
<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/addresses"
  element={
    <ProtectedRoute>
      <Addresses />
    </ProtectedRoute>
  }
/>
                  </Routes>

                </main>

                <Footer />

              </div>
            </BrowserRouter>
          </CartProvider>
          {/* </OrderProvider> */}
        </WishlistProvider>
      </AuthProvider>
    </ProductsProvider>
  );
}

export default App;