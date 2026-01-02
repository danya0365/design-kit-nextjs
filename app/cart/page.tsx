// Cart Page - Shopping cart with checkout
'use client';

import { useCartStore } from '@/src/presentation/stores/cartStore';
import { useLayoutStore } from '@/src/presentation/stores/layoutStore';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const currentLayout = useLayoutStore((state) => state.currentLayout);
  const { items, removeItem, clearCart, getTotal } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful! (Mock)');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  if (currentLayout === 'retro') {
    return (
      <div className="retro-page">
        <h1 className="retro-page-title">🛒 Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="retro-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '16px' }}>Your cart is empty.</p>
            <Link href="/components">
              <button className="retro-btn retro-btn-primary">Browse Components</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="retro-groupbox" style={{ marginBottom: '12px' }}>
              <span className="retro-groupbox-title">Cart Items ({items.length})</span>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#c0c0c0' }}>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #808080' }}>Component</th>
                    <th style={{ padding: '8px', textAlign: 'right', border: '1px solid #808080' }}>Price</th>
                    <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #808080' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.component.id}>
                      <td style={{ padding: '8px', border: '1px solid #808080' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{item.component.category?.icon || '📦'}</span>
                          <span>{item.component.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right', border: '1px solid #808080' }}>
                        ${item.component.price}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #808080' }}>
                        <button
                          className="retro-btn"
                          onClick={() => removeItem(item.component.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#e0e0e0' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold', border: '1px solid #808080' }}>Total</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', border: '1px solid #808080' }}>
                      ${getTotal().toFixed(2)}
                    </td>
                    <td style={{ border: '1px solid #808080' }}></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="retro-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                className="retro-btn retro-btn-primary"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Main Layout
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🛒 Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="main-card text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse our components and add some to your cart!
          </p>
          <Link href="/components" className="main-btn main-btn-primary">
            Browse Components
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="main-card">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.component.id}
                  className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.component.previewUrl}
                    alt={item.component.name}
                    className="w-20 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.component.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.component.category?.name}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${item.component.price}
                  </div>
                  <button
                    onClick={() => removeItem(item.component.id)}
                    className="main-btn main-btn-ghost text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="main-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-white">$0.00</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${getTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button onClick={clearCart} className="main-btn main-btn-secondary">
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="main-btn main-btn-primary"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
