import React from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero Section */}
      <section className="flex min-h-[80vh] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">

          <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
            MERN Stack E-Commerce Project
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Manage Your Products
            <br />
            <span className="text-orange-500">
              Simple. Secure. Efficient.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            A full-stack product management application built with
            React, Node.js, Express, and MongoDB. Manage products,
            authentication, images, and CRUD operations through a
            clean and responsive interface.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => navigate("/home/shop")}
              className="rounded-lg bg-orange-500 px-7 py-3 font-semibold text-black transition hover:bg-orange-400"
            >
              Explore Products
            </button>

            <button
              onClick={() => navigate("/home/addProduct")}
              className="rounded-lg border border-orange-500 px-7 py-3 font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-black"
            >
              Add Product
            </button>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">
              Project <span className="text-orange-500">Features</span>
            </h2>

            <p className="mt-3 text-zinc-400">
              Everything required for a complete product management system.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Authentication */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">🔐</div>

              <h3 className="text-xl font-semibold">
                Authentication
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Secure user registration, login, logout, access token
                authentication, refresh token handling, and protected
                routes.
              </p>
            </div>

            {/* Product CRUD */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">📦</div>

              <h3 className="text-xl font-semibold">
                Product CRUD
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Create, read, update, and delete products with a simple
                and user-friendly interface.
              </p>
            </div>

            {/* Image Upload */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">🖼️</div>

              <h3 className="text-xl font-semibold">
                Image Upload
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Upload multiple product images and display them using
                ImageKit-powered image storage.
              </p>
            </div>

            {/* Validation */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">✅</div>

              <h3 className="text-xl font-semibold">
                Form Validation
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Client-side validation with React Hook Form and
                server-side validation using Express Validator.
              </p>
            </div>

            {/* Responsive */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">📱</div>

              <h3 className="text-xl font-semibold">
                Responsive UI
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                A responsive interface designed with Tailwind CSS
                for desktop, tablet, and mobile screens.
              </p>
            </div>

            {/* API */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 text-3xl">⚡</div>

              <h3 className="text-xl font-semibold">
                REST APIs
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                RESTful backend APIs built using Node.js, Express.js,
                MongoDB, and Mongoose.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-zinc-800 px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-3xl font-bold">
            Technology <span className="text-orange-500">Stack</span>
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            {[
              "React.js",
              "React Router",
              "React Hook Form",
              "Tailwind CSS",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Mongoose",
              "JWT",
              "bcrypt",
              "Multer",
              "ImageKit",
              "Axios",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center">
        <p className="text-sm text-zinc-500">
          Built as a full-stack authentication and product CRUD project.
        </p>
      </footer>

    </div>
  );
};

export default HomePage;