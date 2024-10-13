'use client';

import { useEffect, useState } from 'react';
import { Product } from "@/model/product";
import { getProduct } from "@/api/actions/product/getProduct";
import { updateProduct } from "@/api/products/product.update.service";
import { deleteProduct } from "@/api/products/delete.product.service";
import { useRouter } from 'next/navigation';

const ProductDetail = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<Product>>({});
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProduct(id);
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                } else {
                    setError("Product not found");
                }
            } catch (e) {
                setError("Failed to fetch product details");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
        if (product) {
            setProduct({
                ...product,
                [field]: value,
            });

            setUpdatedFields((prevFields) => ({
                ...prevFields,
                [field]: value,
            }));
        }
    };

    const handleSaveChanges = async () => {
        try {
            if (Object.keys(updatedFields).length > 0) {
                await updateProduct(id, updatedFields);
                setUpdatedFields({});
                alert("Product updated successfully!");
            } else {
                alert("No changes to update.");
            }
        } catch (error) {
            console.error("Failed to update product:", error);
            alert("Failed to update product. Please try again.");
        }
    };

    const handleDeleteProduct = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await deleteProduct(id);
                alert("Product deleted successfully!");
                router.push('/dashboard/products');
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <section className="flex items-center justify-center h-screen">
                <p className="text-xl font-bold text-gray-600">Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex items-center justify-center h-screen">
                <p className="text-xl font-bold text-red-600">{error}</p>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                <button
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                    onClick={() => router.push('/dashboard/products')}
                >
                    ← Go Back
                </button>
                <h1 className="text-3xl font-bold mb-8 text-center">Product Detail</h1>
                {product && (
                    <ul className="space-y-4">
                        <li className="flex flex-col items-center">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <a
                                href={product.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mb-2"
                            >
                                View Full Image
                            </a>
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
                )}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDeleteProduct}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
