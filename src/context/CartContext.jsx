import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Provider
export function CartProvider({ children }) {
  // Load cart from Local Storage when app starts
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hunt-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("hunt-cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity, size, color) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
          size,
          color,
        },
      ];
    });
  };

  // Remove one product
  const removeFromCart = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  // Increase quantity
// Increase quantity
const increaseQuantity = (id, size, color) => {
  setCart((prevCart) =>
    prevCart.map((item) => {
      if (
        item.id === id &&
        item.size === size &&
        item.color === color
      ) {
        // Stop increasing if maximum stock is reached
        if (item.quantity >= item.stock) {
          alert(`Only ${item.stock} item(s) available in stock.`);
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    })
  );
};

  // Decrease quantity
  const decreaseQuantity = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id &&
        item.size === size &&
        item.color === color
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Navbar count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export function useCart() {
  return useContext(CartContext);
}