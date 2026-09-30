import { MyAuth } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useApi from "../shared/UseApi.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { setUser, setAccessToken, error, setError } = useContext(MyAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegister = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log(response.data);
      setUser(response.data.data);
      setAccessToken(response.data.accessToken);
      navigate("/home");
    } catch (error) {
      // console.log(data);
      // console.log(error);
      setError(
        error.response?.data?.error?.[0]?.message || "User Already Registered",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="animate-[zoomIn_0.5s_ease-in-out] w-full max-w-5xl min-h-150 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-zinc-800">
        {/* Left Section */}
        <div className="hidden md:flex bg-orange-500 p-12 flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black">E-Com Store</h1>

            <p className="mt-4 text-black/70 text-lg max-w-sm">
              Everything you need, all in one place. Create your account and
              start shopping.
            </p>
          </div>

          {/* E-Commerce Image */}
          <div className="flex justify-center my-8">
            <img
              src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=800&q=80"
              alt="E-commerce shopping"
              className="w-full max-w-md h-72 object-cover rounded-2xl shadow-xl"
            />
          </div>

          <p className="text-black/60 text-sm">Simple. Fast. Reliable.</p>
        </div>

        {/* Right Section */}
        <div className="bg-zinc-950 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-semibold">Create an account</h2>

            <p className="text-zinc-400 mt-2 mb-8">
              Register to continue to E-Com Store
            </p>

            <form onSubmit={handleSubmit(onRegister)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition-colors duration-300"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Email
                </label>

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
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition-colors duration-300"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Password
                </label>

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
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition-colors duration-300"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              {/* <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-orange-500 transition-colors duration-300"
                />
              </div> */}

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-zinc-400 text-sm mt-6">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setError("");
                  navigate("/login");
                }}
                className="text-orange-500 hover:text-orange-400 cursor-pointer transition-colors duration-300"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
