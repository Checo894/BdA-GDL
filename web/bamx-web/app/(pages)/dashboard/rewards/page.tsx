'use client';

import { useEffect, useState } from 'react';
import { getAllRewards } from '@/api/rewards/reward.get.service';
import { Rewards } from '@/model/Rewards';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from '@/api/firebase.service';

const RewardsList = () => {
    const [rewards, setRewards] = useState<Rewards[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                fetchRewards();
            } else {
                router.push('/sign-in');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchRewards = async () => {
        try {
            const fetchedRewards = await getAllRewards();
            setRewards(fetchedRewards);
        } catch (err) {
            setError("Failed to load rewards. Please try again.");
            console.error("Failed to load rewards:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRewardClick = (rewardId: string) => {
        router.push(`/dashboard/rewards/${rewardId}`);
    };

    const handleAddNewReward = () => {
        router.push('/dashboard/rewards/new');
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
                <h1 className="text-3xl font-bold">Reward List</h1>
                <button
                    onClick={handleAddNewReward}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Reward
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
                    {rewards.map((reward) => (
                        <div
                            key={reward.id}
                            onClick={() => handleRewardClick(reward.id)}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <img
                                src={reward.image_url}
                                alt={reward.name}
                                className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <h2 className="text-xl font-semibold mb-2">{reward.name}</h2>
                            <p className="text-gray-700 mb-4">{reward.description}</p>
                            <p className="font-bold mb-2">Points Cost: {reward.points_cost}</p>
                            <p className={`font-semibold ${reward.is_active ? "text-green-600" : "text-red-600"}`}>
                                {reward.is_active ? "Active" : "Inactive"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RewardsList;
