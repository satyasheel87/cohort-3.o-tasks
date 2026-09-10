import { createHashRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ComponentLayout from "../layouts/ComponentLayout";
import HomePage from "../pages/HomePage";
import ButtonPage from "../pages/components/ButtonPage";
import CardPage from "@/pages/components/CardPage";
import ModalPage from "@/pages/components/ModalPage";
import InputPage from "@/pages/components/InputPage";
import NavbarPage from "@/pages/components/NavbarPage";
import ToolTip from "@/pages/components/ToolTipPage";
import Layout from "@/pages/components/Layout";
import Carousel from "@/pages/components/Carousel";

const AppRouter = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "components",
          element: <ComponentLayout />,
          children: [
            {
              path: "button",
              element: <ButtonPage />,
            },
            {
              path: "card",
              element: <CardPage />,
            },
            {
              path: "modal",
              element: <ModalPage />,
            },
            {
              path: "input",
              element: <InputPage />,
            },
            {
              path: "navbar",
              element: <NavbarPage />,
            },
            {
              path: "tooltip",
              element: <ToolTip />,
            },
            {
              path: "carousel",
              element: <Carousel />,
            },
            {
              path: "layout",
              element: <Layout />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;