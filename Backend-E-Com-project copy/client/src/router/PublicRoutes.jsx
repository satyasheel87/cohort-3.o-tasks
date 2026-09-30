import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyAuth } from "../context/AuthContext";

const PublicRoutes = () => {
  const { user, isLoading } = useContext(MyAuth);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
