"use client";

import { useCartStore } from "@/src/presentation/stores/cartStore";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useToastStore } from "@/src/presentation/stores/toastStore";
import Link from "next/link";

export function CartView() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { items, removeItem, clearCart, getTotal, getItemCount } = useCartStore();
  const { addToast } = useToastStore();

  const handleRemove = (id: string) => {
    removeItem(id);
    addToast("Item removed from cart", "info");
  };

  const handleCheckout = () => {
    addToast("Checkout feature coming soon!", "info");
  };

  // Retro Layout
  if (currentLayout === "retro") {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🛒 Shopping Cart</h1>

        {getItemCount() === 0 ? (
          <div className="retro-card" style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ marginBottom: "12px" }}>Your cart is empty.</p>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">Browse Components</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="retro-groupbox" style={{ marginBottom: "12px" }}>
              <span className="retro-groupbox-title">📦 Cart Items ({getItemCount()})</span>
              <div style={{ padding: "8px" }}>
                {items.map((item) => (
                  <div key={item.component.id} className="retro-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "11px" }}>{item.component.name}</div>
                      <div style={{ fontSize: "10px", color: "gray" }}>${item.component.price}</div>
                    </div>
                    <button onClick={() => handleRemove(item.component.id)} className="retro-btn" style={{ fontSize: "10px" }}>Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="retro-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>Total: ${getTotal()}</div>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={clearCart} className="retro-btn">Clear</button>
                <button onClick={handleCheckout} className="retro-btn retro-btn-primary">Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Modern Layout
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🛒 Shopping Cart</h1>

      {getItemCount() === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Your cart is empty.</p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Items */}
          <div className="main-card">
            {items.map((item, idx) => (
              <div key={item.component.id} className={`flex items-center justify-between py-4 ${idx !== items.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}`}>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.component.previewUrl} alt={item.component.name} className="w-16 h-16 rounded object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.component.name}</h3>
                    <p className="text-sm text-gray-500">Added {new Date(item.addedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900 dark:text-white">${item.component.price}</span>
                  <button onClick={() => handleRemove(item.component.id)} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="main-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-400">Subtotal ({getItemCount()} items)</span>
              <span className="font-bold text-xl text-gray-900 dark:text-white">${getTotal()}</span>
            </div>
            <div className="flex gap-4">
              <button onClick={clearCart} className="main-btn main-btn-secondary flex-1">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="main-btn main-btn-primary flex-1">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
