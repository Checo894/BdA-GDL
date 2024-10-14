// @ts-ignore
import { auth, db } from "../firebase.service";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { CartItem } from "../../context/CartContex";

const removeUndefinedFields = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
};

const getUserUuid = async (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            // @ts-ignore
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user.uid);
                } else {
                    reject(new Error("No user logged in."));
                }
            });
        } catch (error) {
            console.error("Error fetching user UUID:", error);
            reject(error);
        }
    });
};

export const setUserCart = async (cartItems: CartItem[]) => {
    try {
        const userUuid = await getUserUuid();
        const cleanedCartItems = cartItems.map(item => removeUndefinedFields(item));

        // @ts-ignore
        const cartRef = doc(db, "carts", userUuid);
        await setDoc(cartRef, { cartItems: cleanedCartItems });
        console.log("Cart saved successfully!");
    } catch (error) {
        console.error("Error saving cart:", error);
    }
};

export const getUserCart = async (): Promise<CartItem[]> => {
    try {
        const userUuid = await getUserUuid();
        // @ts-ignore
        const cartRef = doc(db, "carts", userUuid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
            console.log("Cart loaded successfully!");
            return cartDoc.data()?.cartItems || [];
        } else {
            console.log("No cart found.");
            return [];
        }
    } catch (error) {
        // @ts-ignore
        if (error.message === "No user logged in.") {
            return [];
        }

        console.error("Error loading cart:", error);
        return [];
    }
};
