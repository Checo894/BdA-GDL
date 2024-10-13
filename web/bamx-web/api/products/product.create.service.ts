import { addDoc, collection } from "firebase/firestore";
import { Product } from "@/model/product";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const createProduct = async (newProduct: Partial<Product>): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    if (newProduct.price && typeof newProduct.price !== 'number') {
        throw new Error("Price must be a number.");
    }

    try {
        const productsCollection = collection(db, "Product");
        await addDoc(productsCollection, newProduct);

    } catch (e) {
        console.error("Error creating product:", e);
        throw new Error("Failed to create product.");
    }
};
