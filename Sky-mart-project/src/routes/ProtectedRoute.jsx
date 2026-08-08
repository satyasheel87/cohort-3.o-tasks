import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router"; // FIX: Route ki jagah Outlet mangwaya
import { Auth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { loggedInUser } = useContext(Auth);

  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
