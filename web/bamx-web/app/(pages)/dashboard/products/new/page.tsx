'use client';

import { useState } from 'react';
import { Product } from "@/model/product";
import { createProduct } from "@/api/products/product.create.service";
import { useRouter } from 'next/navigation';

const NewProduct = () => {
    const [product, setProduct] = useState<Partial<Product>>({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        points_awarded: 0,
        image_url: "",
        is_active: false,
        is_featured: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
        setProduct({
            ...product,
            [field]: value,
        });
    };

    const handleSaveProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            await createProduct(product);
            alert("Product created successfully!");
            router.push('/dashboard/products');
        } catch (e) {
            console.error("Failed to create product:", e);
            setError("Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                <button
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                    onClick={() => router.push('/dashboard/products')}
                >
                    ← Go Back
                </button>
                <h1 className="text-3xl font-bold mb-8 text-center">Create New Product</h1>
                <ul className="space-y-4">
                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Name:</label>
                        <input
                            type="text"
                            value={product.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Description:</label>
                        <textarea
                            value={product.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Price:</label>
                        <input
                            type="number"
                            value={product.price}
                            onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Stock Quantity:</label>
                        <input
                            type="number"
                            value={product.stock_quantity}
                            onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value, 10))}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Points Awarded:</label>
                        <input
                            type="number"
                            value={product.points_awarded}
                            onChange={(e) => handleInputChange('points_awarded', parseInt(e.target.value, 10))}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Image URL:</label>
                        <input
                            type="text"
                            value={product.image_url}
                            onChange={(e) => handleInputChange('image_url', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Is Active:</label>
                        <input
                            type="checkbox"
                            checked={product.is_active}
                            onChange={(e) => handleInputChange('is_active', e.target.checked)}
                            className="w-6 h-6 mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Is Featured:</label>
                        <input
                            type="checkbox"
                            checked={product.is_featured}
                            onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                            className="w-6 h-6 mb-2"
                        />
                    </li>
                </ul>

                {error && (
                    <p className="text-red-600 mt-4">{error}</p>
                )}

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleSaveProduct}
                        disabled={loading}
                        className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewProduct;
