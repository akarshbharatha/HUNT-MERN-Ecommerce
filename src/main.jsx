import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"
  gutter={12}
  containerStyle={{
    top: 20,
    right: 20,
  }}
  toastOptions={{
    duration: 2500,
    success: {
      style: {
        background: "#111827",
        color: "#fff",
        border: "1px solid #22c55e",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      style: {
        background: "#111827",
        color: "#fff",
        border: "1px solid #ef4444",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>
  </StrictMode>
);