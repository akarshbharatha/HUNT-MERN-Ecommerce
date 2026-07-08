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

// Contexts
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col">

            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>

            <Footer />

          </div>
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;