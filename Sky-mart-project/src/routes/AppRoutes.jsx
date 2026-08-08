import { createBrowserRouter, RouterProvider } from "react-router";
import LoginLayout from "../layout/LoginLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layout/AuthLayout";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "../pages/Shop";
import About from "../pages/About";
import ProductDetails from "../pages/ProductDetails";

const router = createBrowserRouter([
  // public route
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            element: <LoginLayout />,
            children: [
              {
                path: "",
                element: <Login />,
              },
            ],
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },

  // protected Layout
  {
    path: "/main",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "shop/:id",
            element: <ProductDetails />,
          },
          {
            path: "about",
            element: <About />,
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
