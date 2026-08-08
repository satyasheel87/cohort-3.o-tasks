import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MyStore } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

import {
  ArrowLeft,
  Star,
  Minus,
  Plus,
  Heart,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const ProductDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    products,
    loadingProducts,
    cartItems,
    setCartItems,
    setIsCartOpen,
  } = useContext(MyStore);

  const product = useMemo(() => {
    if (!products) return null;
    return products.find((item) => item.id === Number(id));
  }, [products, id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (item) => item.category === product.category && item.id !== product.id,
      )
      .slice(0, 5);
  }, [products, product]);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0B0B0B] text-white">
        {loadingProducts ? (
          <>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[rgb(200,244,0)]" />
            <p className="text-zinc-400">Loading product...</p>
          </>
        ) : (
          <>
            <p className="text-zinc-400">Product not found.</p>
            <button
              onClick={() => navigate("/main/shop")}
              className="rounded-xl bg-[rgb(200,244,0)] px-5 py-2.5 font-semibold text-black"
            >
              Back to Shop
            </button>
          </>
        )}
      </div>
    );
  }

  const cartItem = cartItems?.find((item) => item.id === product.id);

  const isInCart = !!cartItem;

  const reviewCount = product.reviews?.length ?? null;

  const currentIndex = products.findIndex((item) => item.id === Number(id));

  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null;

  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const changeQty = (delta) => {
    if (isInCart) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        ),
      );
    } else {
      setQuantity((prev) => Math.max(1, prev + delta));
    }
  };

  const handleAddToCart = () => {
    if (isInCart) return;

    const newItem = {
      ...product,
      quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-white/30">
        <button
          onClick={() => navigate("/main/shop")}
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          Products
        </button>
        <span>/</span>
        <span className="capitalize text-white/50">{product.category}</span>
        <span>/</span>
        <span className="line-clamp-1 max-w-50 text-white/70">
          {product.title}
        </span>
      </nav>

      <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 xl:gap-16">
        {/* Image */}
        <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-10">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full border border-[rgb(200,244,0)]/20 bg-[rgb(200,244,0)]/10 px-3 py-1 text-xs capitalize text-[rgb(200,244,0)]">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className={
                    index < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-white/15 text-white/15"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-white/70">
              {product.rating}
            </span>
            {reviewCount !== null && (
              <span className="text-sm text-white/30">
                ({reviewCount} reviews)
              </span>
            )}
            <span className="text-sm text-white/30">
              · {product.stock} in stock
            </span>
          </div>

          <div className="border-y border-white/8 py-4">
            <span className="text-4xl font-bold text-[rgb(200,244,0)]">
              £{product.price}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-white/50">
            {product.description}
          </p>

          {/* Quantity / In-cart control */}
          <div className="flex h-14 items-center justify-between rounded-2xl border border-white/10 px-5">
            <span className="text-sm text-zinc-400">
              {isInCart ? "In cart:" : "Quantity"}
            </span>

            <div className="flex items-center gap-4">
              <button
                onClick={() => changeQty(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/5"
              >
                <Minus size={14} />
              </button>

              <span className="w-4 text-center text-sm font-semibold">
                {isInCart ? cartItem.quantity : quantity}
              </span>

              <button
                onClick={() => changeQty(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/5"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold transition-all duration-200 active:scale-95 ${
                isInCart
                  ? "border border-green-800 bg-green-950 text-green-400"
                  : "bg-[rgb(200,244,0)] text-black hover:opacity-90"
              }`}
            >
              {isInCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>

            <button className="rounded-2xl border border-white/10 p-3.5 text-white/30 transition-all hover:border-red-500/30 hover:text-red-400">
              <Heart size={20} />
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="-mt-2 flex items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm text-white/70 transition hover:bg-white/5"
          >
            View Cart
          </button>

          {/* Feature mini-cards */}
          <div className="mt-1 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/6 bg-white/3 p-3 text-center">
              <Truck size={16} className="mx-auto mb-1.5 text-[rgb(200,244,0)]" />
              <p className="text-[11px] font-semibold text-white/60">
                Free Delivery
              </p>
              <p className="text-[10px] text-white/25">On orders £50+</p>
            </div>
            <div className="rounded-2xl border border-white/6 bg-white/3 p-3 text-center">
              <ShieldCheck
                size={16}
                className="mx-auto mb-1.5 text-[rgb(200,244,0)]"
              />
              <p className="text-[11px] font-semibold text-white/60">
                Secure Pay
              </p>
              <p className="text-[10px] text-white/25">256-bit SSL</p>
            </div>
            <div className="rounded-2xl border border-white/6 bg-white/3 p-3 text-center">
              <RotateCcw
                size={16}
                className="mx-auto mb-1.5 text-[rgb(200,244,0)]"
              />
              <p className="text-[11px] font-semibold text-white/60">
                Easy Returns
              </p>
              <p className="text-[10px] text-white/25">30-day policy</p>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-1 flex gap-3">
            <button
              disabled={!previousProduct}
              onClick={() =>
                previousProduct &&
                navigate(`/main/shop/${previousProduct.id}`)
              }
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all ${
                previousProduct
                  ? "border-white/10 bg-white/10 text-white hover:bg-white/15"
                  : "cursor-not-allowed border-white/5 text-white/20"
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              disabled={!nextProduct}
              onClick={() =>
                nextProduct && navigate(`/main/shop/${nextProduct.id}`)
              }
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                nextProduct
                  ? "border-[rgb(200,244,0)] bg-[rgb(200,244,0)] text-black hover:opacity-90"
                  : "cursor-not-allowed border-white/5 text-white/20"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProducts.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;