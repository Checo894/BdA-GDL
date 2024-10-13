import { collection, getDocs, query } from "firebase/firestore";
import { Rewards } from "@/model/Rewards";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const getAllRewards = async (): Promise<Rewards[]> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'Rewards'),
    );

    try {
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.warn('No matching documents found.');
            return [];
        }
        return snapshot.docs.map((doc) => {
            const data = doc.data();

            const reward: Rewards = {
                id: doc.id,
                created_at: data.created_at,
                description: data.description,
                image_url: data.image_url,
                is_active: data.is_active,
                name: data.name,
                points_cost: data.points_cost,
                is_featured: data.is_featured,
            };
            return reward;
        });
    } catch (error) {
        console.error("Error fetching rewards:", error);
        throw error;
    }
};
