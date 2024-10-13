'use client';

import { useEffect, useState } from 'react';
import { Rewards } from "@/model/Rewards";
import { getRewardById } from "@/api/rewards/reward.getById.service";
import { updateReward } from "@/api/rewards/reward.update.service";
import { deleteReward } from "@/api/rewards/delete.reward.service";
import { useRouter } from 'next/navigation';

const RewardDetail = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [loading, setLoading] = useState<boolean>(true);
    const [reward, setReward] = useState<Rewards | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [updatedFields, setUpdatedFields] = useState<Partial<Rewards>>({});
    const router = useRouter();

    useEffect(() => {
        const fetchReward = async () => {
            try {
                const fetchedReward = await getRewardById(id);
                if (fetchedReward) {
                    setReward(fetchedReward);
                } else {
                    setError("Reward not found");
                }
            } catch (e) {
                setError("Failed to fetch reward details");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchReward();
    }, [id]);

    const handleInputChange = (field: keyof Rewards, value: string | number | boolean) => {
        if (reward) {
            setReward({
                ...reward,
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
                await updateReward(id, updatedFields);
                setUpdatedFields({});
                alert("Reward updated successfully!");
            } else {
                alert("No changes to update.");
            }
        } catch (error) {
            console.error("Failed to update reward:", error);
            alert("Failed to update reward. Please try again.");
        }
    };

    const handleDeleteReward = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this reward?");
        if (confirmDelete) {
            try {
                await deleteReward(id);
                alert("Reward deleted successfully!");
                router.push('/dashboard/rewards');
            } catch (error) {
                console.error("Failed to delete reward:", error);
                alert("Failed to delete reward. Please try again.");
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
                    onClick={() => router.push('/dashboard/rewards')}
                >
                    ← Go Back
                </button>
                <h1 className="text-3xl font-bold mb-8 text-center">Reward Detail</h1>
                {reward && (
                    <ul className="space-y-4">
                        <li className="flex flex-col items-center">
                            <img
                                src={reward.image_url}
                                alt={reward.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <a
                                href={reward.image_url}
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
                                value={reward.image_url}
                                onChange={(e) => handleInputChange('image_url', e.target.value)}
                                className="p-2 border border-gray-300 rounded-md mb-2"
                            />
                        </li>

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
                )}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDeleteReward}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Delete Reward
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RewardDetail;
