import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApi from "../shared/UseApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useApi();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const getProductById = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      console.log(response.data);
      setProduct(response.data.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-zinc-400 transition hover:text-orange-500"
        >
          ← Back to Shop
        </button>

        <div className="grid gap-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:grid-cols-2 md:p-8">
          {/* ================= IMAGES ================= */}
          <div>
            {/* Main Image */}
            <div className="h-112.5 overflow-hidden rounded-xl bg-zinc-800">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-500">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 0 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={img._id}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === index
                        ? "border-orange-500"
                        : "border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title}-${index}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <span className="mb-3 w-fit rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold md:text-4xl">{product.title}</h1>

            {/* Description */}
            <p className="mt-5 leading-7 text-zinc-400">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-7">
              <span className="text-3xl font-bold text-orange-500">
                ₹{product.price}
              </span>
            </div>

            {/* Product Details */}
            <div className="mt-7 grid grid-cols-2 gap-4">
              {/* Stock */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">Stock</p>

                <p className="mt-1 font-semibold">{product.stock} available</p>
              </div>

              {/* Size */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">Size</p>

                <p className="mt-1 font-semibold">
                  {product.size || "Not Applicable"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                className="flex-1 rounded-lg bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400"
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => navigate("/home/shop")}
                className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold transition hover:border-orange-500 hover:text-orange-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
