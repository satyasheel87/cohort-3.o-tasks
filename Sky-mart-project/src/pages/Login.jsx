import React, { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, Zap } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginFormSubmit, navigate } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#171717] p-8 shadow-2xl animate-[fadeIn_.4s_ease]">
      {/* Mobile Logo */}
      <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(200,244,0)]">
          <Zap size={20} className="fill-black text-black" strokeWidth={2.5} />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Sky<span className="text-[rgb(200,244,0)]">Mart</span>
        </h2>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>

      <p className="mt-2 text-sm font-normal text-zinc-400">
        Sign in to continue shopping.
      </p>

      <form
        onSubmit={handleSubmit((data) => loginFormSubmit(data, reset))}
        className="mt-8 space-y-4"
      >
        {/* Email */}
        <div>
          <div className="flex items-center rounded-xl border border-zinc-700 bg-[#101010] px-4 transition focus-within:border-[rgb(200,244,0)]">
            <Mail size={18} className="text-zinc-500" />

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
            />
          </div>

          {errors.email && (
            <p className="mt-1 ml-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center rounded-xl border border-zinc-700 bg-[#101010] px-4 transition focus-within:border-[rgb(200,244,0)]">
            <LockKeyhole size={18} className="text-zinc-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 chars)"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-500 cursor-pointer hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 ml-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-[rgb(200,244,0)] py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[.98]"
        >
          <span className="flex font-semibold items-center justify-center gap-2 w-full">
            Sign In
            <LogIn size={18} strokeWidth={2.5} />
          </span>
        </button>
      </form>

      <p className="mt-8 text-left text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-[rgb(200,244,0)] transition hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
