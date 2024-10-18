import React, { createContext, useState, useContext, useEffect } from 'react';
import { setUserCart, getUserCart, clearUserCart } from '../api/cart/user.cart.service'; // Importamos la función para limpiar el carrito en Firebase

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
    clearCart: () => Promise<void>; // Nueva función para limpiar el carrito
    setCartItems: (items: CartItem[]) => void; // Exponer setCartItems si es necesario desde otros componentes
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const loadedCartItems = await getUserCart();
                setCartItems(loadedCartItems);
            } catch (error) {
                console.error("Error loading cart:", error);
            }
        };

        loadCart();
    }, []);

    const addToCart = (item: CartItem) => {
        const updatedItem = { ...item, cartItemId: item.cartItemId || generateUniqueId() };
        const updatedCartItems = [...cartItems, updatedItem];
        setCartItems(updatedCartItems);
        setUserCart(updatedCartItems);
    };

    const removeFromCart = (cartItemId: string) => {
        const updatedCartItems = cartItems.filter(item => item.cartItemId !== cartItemId);
        setCartItems(updatedCartItems);
        setUserCart(updatedCartItems);
    };

    // Nueva función para limpiar el carrito en Firebase y el estado local
    const clearCart = async () => {
        try {
            await clearUserCart(); // Limpiar el carrito en Firebase
            setCartItems([]); // Limpiar el estado local del carrito
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, setCartItems }}>
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

