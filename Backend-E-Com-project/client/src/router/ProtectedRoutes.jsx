import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { MyAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { user, isLoading } = useContext(MyAuth);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
