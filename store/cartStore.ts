import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
}

interface CartState {
    cart: CartItem[];
    orders: Order[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    checkout: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            orders: [],
            addToCart: (product) => {
                const { cart } = get();
                const existingItem = cart.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },
            removeFromCart: (productId) => {
                set({ cart: get().cart.filter((item) => item.id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    cart: get().cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ cart: [] }),
            checkout: () => {
                const { cart, orders } = get();
                if (cart.length === 0) return;

                const newOrder: Order = {
                    id: Math.random().toString(36).substring(2, 9),
                    date: new Date().toISOString(),
                    items: [...cart],
                    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                };

                set({
                    orders: [newOrder, ...orders],
                    cart: [],
                });
            },
        }),
        {
            name: 'eternal-wallet-storage',
        }
    )
);
