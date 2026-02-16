"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

function CartCount() {
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cart.length === 0) return null;

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-[#0e0e0e]">
      {count}
    </span>
  );
}

/* Navbar with gradient underline */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
      <div className="w-full">
        <nav className="h-12 flex items-center px-3 sm:px-4">
          {/* Left: brand text + logo */}
          <div className="flex items-center gap-2">
            <div className="leading-tight">
              <div className="text-white font-semibold -mb-0.5">Eternal Wallet</div>
            </div>
            {/* <img
              src="/brand/eternl.svg"
              alt="Logo"
              className="h-8 w-8 rounded-sm rotate-90"
            /> */}
          </div>

          {/* Spacer to push everything left */}
          <div className="flex-1" />

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 text-white hover:text-pink-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <CartCount />
          </Link>
        </nav>
      </div>

      {/* 1px gradient underline */}
      <div className="h-px w-full bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" />
    </header>
  );
}
