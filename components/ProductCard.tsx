import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    onAddToCart: (id: string) => void;
}

export default function ProductCard({
    id,
    name,
    price,
    image,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="bg-[#161616] rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-pink-500/50 transition-colors group">
            <Link href={`/product/${id}`} className="block">
                <div className="relative h-64 w-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden cursor-pointer">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="px-5 pt-5 pb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors">{name}</h3>
                </div>
            </Link>
            <div className="px-5 pb-5">
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-pink-400">${price.toFixed(2)}</span>
                    <button
                        onClick={() => onAddToCart(id)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
