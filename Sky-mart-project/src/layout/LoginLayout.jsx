import React from "react";
import { Outlet } from "react-router";
import { Zap } from "lucide-react";

const LoginLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0B] lg:grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="relative hidden overflow-hidden border-r border-white/10 lg:flex flex-col justify-between px-14 py-12">

        {/* Background Glow */}
        <div className="absolute -left-40 top-40 h-105 w-105 rounded-full bg-[rgb(200,244,0)]/8 blur-[120px]" />
        <div className="absolute -right-45 -bottom-37.5 h-105 w-105 rounded-full bg-[rgb(200,244,0)]/5 blur-[140px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(200,244,0)]">
            <Zap
              size={20}
              strokeWidth={2.8}
              className="fill-black text-black"
            />
          </div>

          <h2 className="text-[28px] font-semibold tracking-tight text-white">
            Sky<span className="text-[rgb(200,244,0)]">Mart</span>
          </h2>
        </div>

        {/* Hero */}
        <div className="relative z-10 max-w-140">
          <p className="mb-6 text-[15px] font-semibold tracking-[2px] uppercase text-[rgb(200,244,0)]">
            Welcome Back
          </p>

          <h1 className="text-[72px] font-semibold leading-19 tracking-[-3px] text-white">
            Shop the future.
            <br />
            <span className="text-[rgb(200,244,0)]">Today.</span>
          </h1>

          <p className="mt-8 max-w-125 text-[20px] leading-9 text-zinc-500">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-6">
          <div className="flex h-28.75 w-55 flex-col items-center justify-center rounded-3xl border border-white/15 bg-[#121212]/70 backdrop-blur-sm">
            <h3 className="text-[38px] font-semibold text-[rgb(200,244,0)]">
              20K+
            </h3>
            <p className="mt-1 text-[16px] text-zinc-500">Products</p>
          </div>

          <div className="flex h-28.75 w-55 flex-col items-center justify-center rounded-3xl border border-white/15 bg-[#121212]/70 backdrop-blur-sm">
            <h3 className="text-[38px] font-semibold text-[rgb(200,244,0)]">
              50K+
            </h3>
            <p className="mt-1 text-[16px] text-zinc-500">Users</p>
          </div>

          <div className="flex h-28.75 w-55 flex-col items-center justify-center rounded-3xl border border-white/15 bg-[#121212]/70 backdrop-blur-sm">
            <h3 className="text-[38px] font-semibold text-[rgb(200,244,0)]">
              4.9★
            </h3>
            <p className="mt-1 text-[16px] text-zinc-500">Rating</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex h-screen items-center justify-center p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;