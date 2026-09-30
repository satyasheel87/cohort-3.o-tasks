import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
