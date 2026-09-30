// ===useApi main thing===
import useApi from "../shared/UseApi.js";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { error, setError, setUser, setAccessToken } = useContext(MyAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      // console.log(response.data);
      setUser(response.data.data.user);
      setAccessToken(response.data.accessToken);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid Email Or Password!");
    }
  };

  return (
    <div className=" min-h-screen bg-black flex items-center justify-center px-4">
      <div className="animate-[zoomIn_0.5s_ease-in-out] w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="mt-2 text-zinc-400">
            Login to your E-Com Store account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-orange-500 transition"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-orange-500 transition"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <span
            className="text-orange-500 hover:text-orange-400 cursor-pointer"
            onClick={() => {
              setError("");
              navigate("/");
            }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
