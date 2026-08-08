import React, { useContext, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Cart from "../pages/Cart";
import Footer from "../components/Footer";
import { MyStore } from "../context/ProductContext";

const MainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0B] text-white">
      {/* Navbar */}
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Cart */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
