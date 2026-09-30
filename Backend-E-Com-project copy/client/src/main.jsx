import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./router/AppRoutes.jsx";
import { ContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <AppRoutes />
  </ContextProvider>,
);
