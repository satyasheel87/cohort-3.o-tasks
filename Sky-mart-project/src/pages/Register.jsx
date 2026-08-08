import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User, Zap, } from "lucide-react";

const Register = () => {
  const { registerFormSubmit, navigate } = useAuth();

  // useform react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-8 shadow-2xl animate-[fadeIn_.4s_ease]">
        {/* Logo */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(200,244,0)]">
            <Zap
              size={20}
              strokeWidth={2.5}
              className="fill-black text-black"
            />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Sky<span className="text-[rgb(200,244,0)]">Mart</span>
          </h2>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-white">Create Account</h2>

        <p className="mt-2 text-sm text-zinc-400">
          Create your account to continue shopping.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit((data) => registerFormSubmit(data, reset))}
          className="mt-8 space-y-4"
        >
          {/* Name */}
          <div>
            <div className="flex items-center rounded-xl border border-zinc-700 bg-[#101010] px-4 transition focus-within:border-[rgb(200,244,0)]">
              <User size={18} className="text-zinc-500" />

              <input
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: "Full Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
              />
            </div>

            {errors.name && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
                className="text-zinc-500 hover:text-white transition"
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

          {/* Confirm password  */}
          <div>
            <div className="flex items-center rounded-xl border border-zinc-700 bg-[#101010] px-4 transition focus-within:border-[rgb(200,244,0)]">
              <LockKeyhole size={18} className="text-zinc-500" />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[rgb(200,244,0)] py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[.98]"
          >
            <span className="flex font-semibold items-center justify-center gap-2 w-full">
              Create Account
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-left text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-[rgb(200,244,0)] hover:underline"
          >
            Sign In
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Register;
