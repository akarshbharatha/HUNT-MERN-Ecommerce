import { createContext, useContext, useEffect, useState } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { token } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setWishlist([]);
      return;
    }

    loadWishlist();
  }, [token]);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist(token);

      setWishlist(data.wishlist);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId) => {
    try {
      await addToWishlist(productId, token);
      await loadWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId, token);
      await loadWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.product._id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addItem,
        removeItem,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}