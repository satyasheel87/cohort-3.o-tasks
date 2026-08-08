import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Star, ShoppingCart, Check } from "lucide-react";
import { MyStore } from "../context/ProductContext";

const ProductCard = ({ product, index = 0 }) => {
  const { id, title, category, price, rating, reviews, thumbnail } = product;
  const reviewCount = reviews?.length ?? 0;
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useContext(MyStore);
  const added = cartItems?.some((item) => item.id === id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) return;
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <Link
      onClick={() => navigate(`/main/shop/${product.id}`)}
      className=" group cursor-pointer flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] font-semibold transition-all duration-300 ease-out hover:border-[rgb(200,244,0)]/70 hover:shadow-[0_0_25px_rgba(200,244,0,0.12),0_15px_35px_rgba(0,0,0,0.45)] focus:ring-4 focus:ring-[rgb(200,244,0)]/10 "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="badge absolute px-2 py-1 rounded-full left-3 top-3 bg-black/60 text-[10px] capitalize text-white/80 backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-body text-[10px] uppercase tracking-widest text-white/30">
          {category}
        </p>

        <h3 className="clamp-2 flex-1 font-body text-sm font-medium leading-snug text-white/85">
          {title}
        </h3>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-white/10 text-white/10"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-white/30">({reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-3">
          <span className="font-heading text-lg font-bold text-volt text-[rgb(200,244,0)]">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAdd}
            disabled={added}
            className={`cursor-pointer flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-body text-xs font-semibold
              transition-all duration-200 active:scale-95 ${
                added
                  ? "bg-green-900/40 text-green-400"
                  : "bg-volt text-black hover:bg-volt-light bg-[rgb(200,244,0)]"
              }`}
          >
            {added ? (
              <>
                <Check size={12} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={12} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;