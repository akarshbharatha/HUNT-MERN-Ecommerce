import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("hunt-token") || ""
  );
  const [loading, setLoading] = useState(true);

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile(token);
        setUser(data.user);
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register
  const register = async (userData) => {
    return await registerUser(userData);
  };

  // Login
  const login = async (userData) => {
    const data = await loginUser(userData);

    localStorage.setItem("hunt-token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("hunt-token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}