import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase.service";
import { Product } from "../../model/ProductModel";

export const getFeaturedProducts = async (): Promise<Product[]> => {
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'Product'),
        // where('is_featured', '==', true),
        limit(6)
    );

    try {
        const snapshot = await getDocs(q);
        console.log(snapshot.size);
        if (snapshot.empty) {
            console.warn('No matching documents found.');
            return [];
        }
        return snapshot.docs.map((doc) => {
            const data = doc.data();

            const product: Product = {
                id: doc.id,
                created_at: data.created_at,
                description: data.description,
                image_url: data.image_url,
                is_active: data.is_active,
                name: data.name,
                price: data.price,
                stock_quantity: data.stock_quantity,
                updated_at: data.updated_at,
                is_featured: data.is_featured,
            };
            return product;
        });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        throw error;
    }
};
