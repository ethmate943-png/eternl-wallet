export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "The Executive Bifold",
        price: 89.99,
        image: "/wallet.png",
        category: "Bifold",
        description: "A classic bifold wallet designed for the modern executive. Crafted from premium leather with ample space for cards and cash."
    },
    {
        id: "2",
        name: "Minimalist Cardholder",
        price: 45.00,
        image: "/wallet2.png",
        category: "Cardholder",
        description: "Slim, sleek, and perfect for carrying just the essentials. Fits comfortably in any pocket without adding bulk."
    },
    {
        id: "3",
        name: "Travel Passport Wallet",
        price: 120.00,
        image: "/wallet3.png",
        category: "Travel",
        description: "The ultimate travel companion. Securely holds your passport, boarding passes, cards, and currency in one stylish package."
    },
    {
        id: "4",
        name: "Smart AirTag Wallet",
        price: 65.50,
        image: "/wallet4.png",
        category: "Smart",
        description: "Never lose your wallet again. Features a dedicated slot for an Apple AirTag, combining security with smart functionality."
    },
    {
        id: "5",
        name: "Legacy Trifold",
        price: 95.00,
        image: "/wallet5.png",
        category: "Trifold",
        description: "A traditional trifold design with a modern twist. maximize storage capacity without compromising on style or durability."
    },
    {
        id: "6",
        name: "Carbon Fiber Clip",
        price: 55.00,
        image: "/wallet.png",
        category: "Clip",
        description: "High-tech carbon fiber construction meets minimalist design. Features a strong money clip and RFID blocking technology."
    }
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find(product => product.id === id);
}
