"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, checkout, clearCart } = useCartStore();
    const router = useRouter();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        // Simulate processing
        const confirm = window.confirm("Confirm purchase of $" + total.toFixed(2) + "?");
        if (confirm) {
            checkout();
            router.push("/orders");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-6">
                <div className="text-6xl mb-6 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven&apos;t added any wallets yet.</p>
                <Link
                    href="/?open=true"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition"
                >
                    Browse Collection
                </Link>

                {/* Helper links */}
                <div className="mt-12 flex gap-6 text-sm text-gray-500">
                    <Link href="/orders" className="hover:text-white underline">View Order History</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white p-6 sm:p-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
                <Link href="/" className="text-gray-400 hover:text-white">
                    ← Continue Shopping
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#161616] border border-white/5 rounded-2xl p-4 sm:p-6 flex gap-6 items-center"
                        >
                            <div className="relative w-24 h-24 bg-[#1a1a1a] rounded-xl overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-400">{item.category}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-500 hover:text-red-400 transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-3 bg-[#0e0e0e] rounded-lg px-2 py-1 border border-white/10">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" />
                                            </svg>
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 5v14" />
                                                <path d="M5 12h14" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-lg font-bold text-pink-400">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-500 hover:text-white underline"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-[#161616] border border-white/5 rounded-2xl p-8 h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Tax (Estimated)</span>
                            <span>${(total * 0.08).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-xl font-bold mb-8">
                        <span>Total</span>
                        <span className="text-pink-400">${(total * 1.08).toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-pink-600/20"
                    >
                        Checkout Securely
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/orders" className="text-xs text-gray-500 hover:text-gray-300 underline">
                            View Past Orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
