import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LogOut, Menu, ShoppingCart, X, Zap } from "lucide-react";
import { MyStore } from "../context/ProductContext";

const Navbar = ({ onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedInUser, logOutUser } = useAuth();
  const { cartItems } = useContext(MyStore);

  const itemCount = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition ${
      isActive ? "text-[rgb(200,244,0)]" : "text-zinc-500 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/95 backdrop-blur">
      {/* desktop navbar  */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/main" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(200,244,0)]">
            <Zap
              size={16}
              strokeWidth={2.5}
              className="fill-black text-black"
            />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Sky<span className="text-[rgb(200,244,0)]">Mart</span>
          </h2>
        </NavLink>

        {/* Nav Links - desktop only */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/main" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/main/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/main/about" className={navLinkClass}>
            About
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* User - desktop only */}
          <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-[#171717] py-1 pl-1 pr-4 transition hover:border-[rgb(200,244,0)] md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(200,244,0)] text-sm font-semibold text-black">
              {loggedInUser?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="max-w-28 truncate text-sm text-zinc-300">
              {loggedInUser?.name}
            </span>
          </button>

          {/* Cart - always visible */}
          <button
            onClick={onCartClick}
            className="relative cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#171717] transition hover:border-[rgb(200,244,0)]"
          >
            <ShoppingCart size={19} className="text-white" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(200,244,0)] text-[10px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </button>

          {/* Logout - desktop only */}
          <button
            onClick={logOutUser}
            className="hidden cursor-pointer h-11 w-11 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 transition hover:bg-red-500/20 md:flex"
          >
            <LogOut size={18} />
          </button>

          {/* Hamburger - mobile/tablet only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#171717] text-white md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-[#0B0B0B] px-6 py-4 md:hidden">
          <NavLink
            to="/main"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/main/shop"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Shop
          </NavLink>
          <NavLink
            to="/main/about"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            About
          </NavLink>

          <button
            onClick={() => {
              logOutUser();
              setMenuOpen(false);
            }}
            className="mt-3 cursor-pointer flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;