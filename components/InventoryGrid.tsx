import React from "react";
import ProductCard from "./ProductCard";

import { PRODUCTS } from "@/data/products";

export default function InventoryGrid() {
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
                    />
                ))}
            </div>
        </section>
    );
}
