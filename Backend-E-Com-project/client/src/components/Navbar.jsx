import React, { useContext } from "react";
import { useNavigate } from "react-router";
import useApi from "../shared/UseApi";
import { MyAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setUser } = useContext(MyAuth);
  const api = useApi();

  const logOutUser = async () => {
    try {
      await api.post("/auth/logout");
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-black border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-orange-500">E-Com</h1>
        </div>

        {/* Middle Links */}
        <div className="flex items-center gap-8">
          <a
            onClick={() => {
              navigate("/");
            }}
            className="text-zinc-300 cursor-pointer hover:text-orange-500 transition-colors duration-300"
          >
            Home
          </a>

          <a
            onClick={() => {
              navigate("shop");
            }}
            className="text-zinc-300 cursor-pointer hover:text-orange-500 transition-colors duration-300"
          >
            Shop
          </a>

          <a
            onClick={() => {
              navigate("addProduct");
            }}
            className="text-zinc-300 cursor-pointer hover:text-orange-500 transition-colors duration-300"
          >
            Add Product
          </a>
        </div>

        {/* Logout */}
        <button
          onClick={logOutUser}
          className="px-4 py-2 rounded-lg cursor-pointer bg-orange-500 text-black font-semibold hover:bg-orange-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
