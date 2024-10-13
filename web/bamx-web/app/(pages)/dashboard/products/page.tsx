'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/api/products/get.products.service';
import { Product } from '@/model/product';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from '@/api/firebase.service';

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                fetchProducts();
            } else {
                router.push('/sign-in');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts);
        } catch (err) {
            setError("Failed to load products. Please try again.");
            console.error("Failed to load products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = (productId: string) => {
        router.push(`/dashboard/products/${productId}`);
    };

    const handleAddNewProduct = () => {
        router.push('/dashboard/products/new');
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <button
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                    onClick={() => router.push('/dashboard')}
                >
                    ← Go Back
                </button>
                <h1 className="text-3xl font-bold">Product List</h1>
                <button
                    onClick={handleAddNewProduct}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Product
                </button>
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xl font-bold text-gray-600">Loading...</p>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <p className="font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-gray-600 mb-2">Points Awarded: {product.points_awarded}</p>
                            <p className={`font-semibold ${product.stock_quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                                {product.stock_quantity > 0 ? `In Stock: ${product.stock_quantity}` : "Out of Stock"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsList;
