import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Package,
  TrendingUp,
  Star,
  Tag,
  Zap,
  Shield,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { MyStore } from "../context/ProductContext";
import { useAuth } from "../hooks/useAuth";

const CATEGORY_EMOJI = {
  electronics: "💻",
  clothing: "👕",
  furniture: "🛋️",
  home: "🏠",
  sports: "⚽",
  beauty: "💄",
  groceries: "🛒",
  accessories: "👜",
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Home = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const { products, categories, cartItems, setCartItems } =
    useContext(MyStore);

  const cartCount = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const cartValue = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const topRated = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [products]);

  const newArrivals = useMemo(() => {
    return [...products].slice(0, 5);
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const shownCategories = categories.filter((c) => c !== "All Categories");

  const highRatedCount = products.filter((p) => p.rating >= 4.5).length;

  const quickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const alreadyInCart = cartItems?.some((c) => c.id === product.id);
    if (alreadyInCart) return;
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/8 bg-[#111] p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 h-80 w-80 rounded-full bg-[rgb(200,244,0)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-[rgb(200,244,0)]/4 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[rgb(200,244,0)]/70">
                {getGreeting()} 👋
              </p>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Welcome back,
                <br />
                <span className="text-[rgb(200,244,0)]">
                  {loggedInUser?.name || "there"}!
                </span>
              </h1>
              <p className="max-w-md text-white/40">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/main/shop")}
                  className="flex items-center gap-2 rounded-full bg-[rgb(200,244,0)] px-6 py-3 font-semibold text-black transition hover:opacity-90"
                >
                  Shop Now <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("/main/shop")}
                  className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30"
                >
                  View All Products
                </button>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <div className="rounded-2xl border border-[rgb(200,244,0)]/20 bg-[rgb(200,244,0)]/10 px-6 py-4 text-center">
                <p className="text-4xl font-bold text-[rgb(200,244,0)]">
                  {products.length}+
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Products Available
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/4 px-6 py-4 text-center">
                <p className="text-2xl font-bold text-white">Free</p>
                <p className="mt-1 text-xs text-white/40">
                  Delivery on £50+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="flex items-start gap-4 rounded-3xl border border-white/8 bg-[#111] p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgb(200,244,0)]/10 text-[rgb(200,244,0)]">
              <Package size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{cartCount}</p>
              <p className="text-sm text-white/50">Cart Items</p>
              <p className="mt-0.5 text-xs text-white/25">In your bag</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-3xl border border-white/8 bg-[#111] p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                £{cartValue.toFixed(2)}
              </p>
              <p className="text-sm text-white/50">Cart Value</p>
              <p className="mt-0.5 text-xs text-white/25">
                Ready to checkout
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-3xl border border-white/8 bg-[#111] p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <Star size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {highRatedCount}
              </p>
              <p className="text-sm text-white/50">Top Products</p>
              <p className="mt-0.5 text-xs text-white/25">Highly rated</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-3xl border border-white/8 bg-[#111] p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Tag size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {shownCategories.length}
              </p>
              <p className="text-sm text-white/50">Categories</p>
              <p className="mt-0.5 text-xs text-white/25">To explore</p>
            </div>
          </div>
        </div>

        {/* Shop by Category */}
        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Shop by Category</h2>
            <button
              onClick={() => navigate("/main/shop")}
              className="flex items-center gap-1 text-sm text-[rgb(200,244,0)] transition hover:opacity-80"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shownCategories.map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/main/shop?category=${category}`)}
                className="group rounded-2xl border border-black/10 bg-white p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95"
              >
                <div className="mb-3 text-3xl">
                  {CATEGORY_EMOJI[category] || "📦"}
                </div>
                <p className="truncate text-sm font-semibold capitalize text-black/80">
                  {category}
                </p>
                <p className="mt-1 text-xs text-black/50">
                  {categoryCounts[category] || 0} items
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Top Rated + New Arrivals */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Rated */}
          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-black">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                Top Rated
              </h2>
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-1 text-xs text-[rgb(160,196,0)] transition hover:opacity-80"
              >
                See all <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-2">
              {topRated.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/main/shop/${item.id}`)}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 p-3 transition-all duration-200 hover:border-[rgb(200,244,0)]/40 hover:bg-black/3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f5] p-1.5">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-black/70">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[rgb(160,196,0)]">
                      £{item.price}
                    </p>
                  </div>
                  <button
                    onClick={(e) => quickAdd(e, item)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(200,244,0)]/10 text-[rgb(160,196,0)] transition-all hover:bg-[rgb(200,244,0)] hover:text-black"
                  >
                    <ShoppingBag size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-black">
                <Zap size={18} className="fill-[rgb(200,244,0)] text-[rgb(200,244,0)]" />
                New Arrivals
              </h2>
              <button
                onClick={() => navigate("/main/shop")}
                className="flex items-center gap-1 text-xs text-[rgb(160,196,0)] transition hover:opacity-80"
              >
                See all <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-2">
              {newArrivals.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/main/shop/${item.id}`)}
                  className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 p-3 transition-all duration-200 hover:border-[rgb(200,244,0)]/40 hover:bg-black/3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f5] p-1.5">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-black/70">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[rgb(160,196,0)]">
                      £{item.price}
                    </p>
                  </div>
                  <button
                    onClick={(e) => quickAdd(e, item)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(200,244,0)]/10 text-[rgb(160,196,0)] transition-all hover:bg-[rgb(200,244,0)] hover:text-black"
                  >
                    <ShoppingBag size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#111] p-5">
            <Zap size={24} className="text-[rgb(200,244,0)]" />
            <div>
              <p className="text-sm font-semibold text-white/80">
                Fast Delivery
              </p>
              <p className="text-xs text-white/30">
                Same-day on select items
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#111] p-5">
            <Shield size={24} className="text-blue-400" />
            <div>
              <p className="text-sm font-semibold text-white/80">
                Secure Payments
              </p>
              <p className="text-xs text-white/30">
                100% encrypted checkout
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#111] p-5">
            <Tag size={24} className="text-green-400" />
            <div>
              <p className="text-sm font-semibold text-white/80">
                Best Prices
              </p>
              <p className="text-xs text-white/30">Price-match guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;