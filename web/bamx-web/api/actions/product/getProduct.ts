import { getProductById } from "@/api/products/getById.product.service";
import { Product } from "@/model/product";

export const getProduct = async (id: string): Promise<Product | null> => {
    try {
        const products = await getProductById(id);
        return products.length > 0 ? products[0] : null;
    } catch (e) {
        console.error("Error fetching product:", e);
        throw e;
    }
};
