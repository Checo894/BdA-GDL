'use client';

import { useState } from 'react';
import { Rewards } from "@/model/Rewards";
import { createReward } from "@/api/rewards/reward.create.service";
import { useRouter } from 'next/navigation';

const NewReward = () => {
    const [reward, setReward] = useState<Partial<Rewards>>({
        name: "",
        description: "",
        points_cost: 0,
        image_url: "",
        is_active: false,
        is_featured: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (field: keyof Rewards, value: string | number | boolean) => {
        setReward({
            ...reward,
            [field]: value,
        });
    };

    const handleSaveReward = async () => {
        setLoading(true);
        setError(null);
        try {
            await createReward(reward);
            alert("Reward created successfully!");
            router.push('/dashboard/rewards');
        } catch (e) {
            console.error("Failed to create reward:", e);
            setError("Failed to create reward. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                <button
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                    onClick={() => router.push('/dashboard/rewards')}
                >
                    ← Go Back
                </button>
                <h1 className="text-3xl font-bold mb-8 text-center">Create New Reward</h1>
                <ul className="space-y-4">
                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Name:</label>
                        <input
                            type="text"
                            value={reward.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Description:</label>
                        <textarea
                            value={reward.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Points Cost:</label>
                        <input
                            type="number"
                            value={reward.points_cost}
                            onChange={(e) => handleInputChange('points_cost', parseInt(e.target.value, 10))}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Image URL:</label>
                        <input
                            type="text"
                            value={reward.image_url}
                            onChange={(e) => handleInputChange('image_url', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Is Active:</label>
                        <input
                            type="checkbox"
                            checked={reward.is_active}
                            onChange={(e) => handleInputChange('is_active', e.target.checked)}
                            className="w-6 h-6 mb-2"
                        />
                    </li>

                    <li className="flex flex-col">
                        <label className="font-semibold mb-1">Is Featured:</label>
                        <input
                            type="checkbox"
                            checked={reward.is_featured}
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
                        onClick={handleSaveReward}
                        disabled={loading}
                        className={`bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Saving...' : 'Save Reward'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewReward;
