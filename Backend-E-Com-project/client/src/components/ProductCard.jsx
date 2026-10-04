import React from "react";
import { useNavigate } from "react-router";
import useApi from "../shared/UseApi";

const ProductCard = ({ product, getAllProducts }) => {
  const navigate = useNavigate();
  const api = useApi();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/product/${product._id}`);
      await getAllProducts();
      alert("Product deleted successfully")
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleUpdate = () => {
    navigate("/home/addProduct", {
      state: {
        product,
        isUpdate: true,
      },
    });
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-orange-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-zinc-800">
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/500"}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs text-orange-400">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="truncate text-lg font-semibold text-white">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">
            ₹{product.price}
          </span>

          <span className="text-sm text-zinc-500">Stock: {product.stock}</span>
        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {/* View */}
          <button
            onClick={() => navigate(`/home/shop/${product._id}`)}
            className="rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            View
          </button>

          {/* Update */}
          <button
            onClick={handleUpdate}
            className="rounded-lg border border-orange-500 py-2.5 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-black"
          >
            Update
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-500 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
