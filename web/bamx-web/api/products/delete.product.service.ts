import { doc, deleteDoc } from "firebase/firestore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const deleteProduct = async (id: string): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    try {
        const productRef = doc(db, "Product", id);
        await deleteDoc(productRef);

        console.log("Product deleted successfully:", id);
    } catch (e) {
        console.error("Error deleting product:", e);
        throw new Error("Failed to delete product.");
    }
};
