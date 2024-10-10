import React, { createContext, useState, useContext } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price?: number;
    points_cost?: number;
    image_url?: string;
    type: 'product' | 'reward';
    cartItemId?: string;
    points_awarded: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (cartItemId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const updatedItem = { ...item, cartItemId: item.cartItemId || generateUniqueId() };
        setCartItems(prevItems => [...prevItems, updatedItem]);
    };

    const removeFromCart = (cartItemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const generateUniqueId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
