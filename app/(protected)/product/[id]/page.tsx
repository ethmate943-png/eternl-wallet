"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCartStore, Product } from "@/store/cartStore";
import { useState } from "react";

export default function ProductPage() {
    const params = useParams();
    const id = params?.id as string;
    const product = PRODUCTS.find((p) => p.id === id);
    const addToCart = useCartStore((state) => state.addToCart);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors">
                    ← Back to Collection
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product as Product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Image Section */}
                <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden bg-[#161616] border border-white/5">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Info Section */}
                <div>
                    <Link href="/" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors">
                        ← Back to Collection
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-pink-400 font-semibold mb-6">${product.price.toFixed(2)}</p>

                    <div className="prose prose-invert mb-8">
                        <p className="text-white/70 text-lg leading-relaxed">
                            {product.description || "Experience the perfect blend of style and functionality. Crafted with premium materials for durability and elegance."}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 py-4 rounded-full font-bold transition-all ${added
                                ? "bg-green-500 text-white"
                                : "bg-white text-black hover:scale-[1.02]"
                                }`}
                        >
                            {added ? "Added to Cart! ✓" : "Add to Cart"}
                        </button>
                    </div>

                    {/* Additional Details (Static for now) */}
                    <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                        <div>
                            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-1">Material</h3>
                            <p>Premium Leather</p>
                        </div>
                        <div>
                            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-1">Warranty</h3>
                            <p>Lifetime</p>
                        </div>
                        <div>
                            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-1">Shipping</h3>
                            <p>Free Worldwide</p>
                        </div>
                        <div>
                            <h3 className="text-white/40 text-sm uppercase tracking-wider mb-1">Returns</h3>
                            <p>30 Days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
