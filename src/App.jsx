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
import { AuthProvider } from "./context/AuthContext";

// Contexts
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <ProductsProvider>
    <AuthProvider>
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
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  </CartProvider>
</AuthProvider>
    </ProductsProvider>
  );
}

export default App;