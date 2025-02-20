import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { Product } from "@/model/product";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const getProductById = async (id: string): Promise<Product[]> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'Product'),
        where(documentId(), '==', id)
    )

    try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
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
                points_awarded: data.points_awarded,
            };
            return product;
        })
    } catch (e) {
        console.log(e);
        throw e;
    }
}
