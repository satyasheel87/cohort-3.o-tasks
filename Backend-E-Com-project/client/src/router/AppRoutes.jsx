import { createBrowserRouter, RouterProvider } from "react-router";
import React, { useContext, useEffect } from "react";
import PublicRoutes from "./PublicRoutes";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/HomePage";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/DashBoardLayout";
import { MyAuth } from "../context/AuthContext";
import useApi from "../shared/UseApi";
import ShopPage from "../pages/ShopPage";
import AddProductForm from "../pages/AddProductForm";
import ProductDetail from "../pages/ProductDetails";

const AppRoutes = () => {
  const api = useApi();
  const { user, setUser, setIsLoading, setAccessToken } = useContext(MyAuth);
  console.log("mai hu  user -->", user);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const response = await api.post("/auth/refresh");
        setAccessToken(response.data.data.accessToken);
        setUser(response.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    refreshAuth();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <RegisterPage />,
            },
            {
              path: "login",
              element: <LoginPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashBoardLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "shop",
              element: <ShopPage />,
            },
            {
              path: "shop/:id",
              element: <ProductDetail />,
            },
            {
              path: "addProduct",
              element: <AddProductForm />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
