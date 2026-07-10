import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hunt-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("hunt-cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (
    product,
    quantity = 1,
    size = "M",
    color = "Black"
  ) => {
    let added = false;

    setCart((prevCart) => {
      const exists = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (exists) {
        return prevCart;
      }

      added = true;

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

    return added;
  };

  // Remove product
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
  const increaseQuantity = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.id === id &&
          item.size === size &&
          item.color === color
        ) {
          if (item.quantity >= item.stock) {
            // alert(`Only ${item.stock} item(s) available in stock.`);
            toast.error(`Only ${item.stock} item(s) available in stock.`);
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
      prevCart.map((item) => {
        if (
          item.id === id &&
          item.size === size &&
          item.color === color
        ) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          };
        }

        return item;
      })
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Cart count
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

export function useCart() {
  return useContext(CartContext);
}