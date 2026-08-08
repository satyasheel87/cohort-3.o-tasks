import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/geist";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ContextProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 1500 }}
      />
    </ContextProvider>
  </AuthProvider>,
);
