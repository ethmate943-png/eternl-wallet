"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function OrderHistoryPage() {
    const orders = useCartStore((state) => state.orders);

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-6">
                <div className="text-6xl mb-6 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m7.5 4.27 9 5.15" />
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
                <p className="text-gray-400 mb-8">You haven&apos;t purchased anything from us yet.</p>
                <Link
                    href="/"
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition border border-white/5"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white p-6 sm:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold">Order History</h1>
                <div className="flex gap-4">
                    <Link href="/cart" className="text-gray-400 hover:text-white text-sm">Cart</Link>
                    <Link href="/" className="text-gray-400 hover:text-white text-sm">Shop</Link>
                </div>
            </div>

            <div className="space-y-8">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden"
                    >
                        {/* Order Header */}
                        <div className="bg-white/5 p-6 flex flex-wrap gap-6 justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order Placed</p>
                                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
                                <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order #</p>
                                <p className="font-medium text-gray-300">{order.id}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6 space-y-6">
                            {order.items.map((item, idx) => (
                                <div key={`${order.id}-${idx}`} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 bg-[#0e0e0e] rounded-lg overflow-hidden shrink-0 border border-white/5">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="grow">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-green-500/5 p-4 text-center border-t border-white/5">
                            <span className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <path d="m9 11 3 3L22 4" />
                                </svg>
                                Order Completed
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
