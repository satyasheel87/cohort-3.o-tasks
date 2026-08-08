import React, { useContext } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { MyStore } from "../context/ProductContext";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, setCartItems } = useContext(MyStore);

  const items = cartItems || [];

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    clearCart();
    toast.success("Order Confirmed! 🎉");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-70 flex h-screen w-full max-w-md flex-col bg-[#0B0B0B] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[rgb(200,244,0)]" />
            <h2 className="text-xl font-bold text-white">Cart</h2>
            <span className="rounded-full bg-[rgb(200,244,0)]/15 px-3 py-1 text-xs font-semibold text-[rgb(200,244,0)]">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={40} className="text-zinc-700" />
            <p className="text-sm text-zinc-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/10 p-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-16 w-16 rounded-xl object-cover bg-white"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-medium text-zinc-200">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[rgb(200,244,0)]">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-500">
                        £{item.price} each
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition hover:border-white/30"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition hover:border-white/30"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="w-full border-t border-white/10 bg-[#0B0B0B] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">Total</span>
              <span className="text-2xl font-bold text-white">
                £{total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(200,244,0)] py-3.5 font-semibold text-black transition hover:opacity-90"
            >
              Checkout
              <ArrowRight size={18} />
            </button>

            <button
              onClick={clearCart}
              className="mt-4 w-full text-center text-sm font-medium text-red-500 transition hover:text-red-400"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;