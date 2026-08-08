import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { MyStore } from "../context/ProductContext";

const Shop = () => {
  const {
    products,
    filteredProducts,
    loadingProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
  } = useContext(MyStore);

  const [searchParams] = useSearchParams();

  // Sync ?category=electronics from the URL (e.g. clicked from Home)
  // into the shared selectedCategory filter.
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams, categories]);

  return (
    <section className="min-h-screen bg-[#0B0B0B] py-10 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            All Products
          </h1>

          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            {filteredProducts.length} Products Found
          </p>
        </div>

        {/* Search + Filters */}

        <div className="rounded-[30px] border border-white/10 bg-[#101010] p-4 transition-all duration-300 focus-within:border-[rgb(200,244,0)]/40 focus-within:shadow-[0_0_30px_rgba(200,244,0,.08)]">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}

            <div className="flex h-16 flex-1 items-center rounded-2xl border border-white/10 bg-[#1A1A1A] px-5 transition-all duration-300 hover:border-white/20 focus-within:border-[rgb(200,244,0)] focus-within:ring-4 focus-within:ring-[rgb(200,244,0)]/10">
              <Search size={20} className="mr-4 shrink-0 text-zinc-500" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Category */}

            <div className="relative w-full lg:w-60">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-16 w-full appearance-none rounded-2xl border border-white/10 bg-[#1A1A1A] px-6 pr-12 text-[15px] font-medium text-white outline-none transition-all duration-300 hover:border-white/20 focus:border-[rgb(200,244,0)] focus:ring-4 focus:ring-[rgb(200,244,0)]/10"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>

            {/* Sort */}

            <div className="relative w-full lg:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-16 w-full appearance-none rounded-2xl border border-white/10 bg-[#1A1A1A] px-6 pr-12 text-[15px] font-medium text-white outline-none transition-all duration-300 hover:border-white/20 focus:border-[rgb(200,244,0)] focus:ring-4 focus:ring-[rgb(200,244,0)]/10"
              >
                <option value="">Sort By</option>
                <option value="lowToHigh">Price : Low to High</option>
                <option value="highToLow">Price : High to Low</option>
                <option value="aToZ">Name : A-Z</option>
                <option value="zToA">Name : Z-A</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full flex min-h-75 items-center justify-center">
              <div className="flex flex-col items-center">
                {loadingProducts ? (
                  <>
                    <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[rgb(200,244,0)]"></div>

                    <p className="text-zinc-400">Loading Products...</p>
                  </>
                ) : (
                  <>
                    <Search size={55} className="mb-4 text-zinc-600" />

                    <h2 className="mb-2 text-xl font-semibold text-white">
                      No Products Found
                    </h2>

                    <p className="max-w-md text-center text-zinc-500">
                      Try changing your search, category or sort options to see
                      more products.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;