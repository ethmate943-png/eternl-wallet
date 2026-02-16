import React, { useState } from "react";
import ProductCard from "./ProductCard";

import { PRODUCTS } from "@/data/products";

import { useCartStore, Product } from "@/store/cartStore";

export default function InventoryGrid() {
    const addToCart = useCartStore((state) => state.addToCart);
    const [lastAdded, setLastAdded] = useState<string | null>(null);

    const handleAddToCart = (id: string) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            addToCart(product as Product);
            setLastAdded(product.name);
            setTimeout(() => setLastAdded(null), 3000);
        }
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-white">Curated Inventory</h2>
                <div className="flex items-center gap-3 bg-[#161616] px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-sm text-gray-400">Inventory Status:</span>
                    <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        Live
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            {/* Toast Notification */}
            {lastAdded && (
                <div className="fixed bottom-6 right-6 bg-pink-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-3 z-50">
                    <div className="bg-white/20 p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <span className="font-medium">Added <b>{lastAdded}</b> to cart</span>
                </div>
            )}
        </section>
    );
}
