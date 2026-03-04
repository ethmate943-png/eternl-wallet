"use client";

import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-white/60 text-lg mb-8">
          After restoring your wallet, you can start exploring products and add items to your cart.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors"
        >
          ← Back to collection
        </Link>
      </div>
    </div>
  );
}

