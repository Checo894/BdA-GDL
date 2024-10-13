import { doc, updateDoc } from "firebase/firestore";
import { Product } from "@/model/product";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const updateProduct = async (id: string, updatedFields: Partial<Product>): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    if (updatedFields.price && typeof updatedFields.price !== 'number') {
        throw new Error("Price must be a number.");
    }

    try {
        const productRef = doc(db, "Product", id);
        await updateDoc(productRef, updatedFields);

    } catch (e) {
        console.error("Error updating product:", e);
        throw new Error("Failed to update product.");
    }
};
