import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0B0B0B] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-6 text-center">
        <h2 className="text-2xl tracking-tight text-[rgb(200,244,0)]">
          SkyMart
        </h2>

        <p className="text-sm text-zinc-500">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </div>
    </footer>
  );
};

export default Footer;