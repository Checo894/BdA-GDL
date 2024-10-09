import { Rewards } from "../../model/RewardsModel";
import {collection, getDocs, limit, query, where} from "firebase/firestore";

// @ts-ignore
import { db } from "../firebase.service";

export const getFeaturedRewards = async (): Promise<Rewards[]> => {
    // @ts-ignore
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'Rewards'),
        where('is_featured', '==', true),
        where('is_active', '==', true),
        limit(4)
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
                name: data.name,
                created_at: data.created_at,
                description: data.description,
                image_url: data.image_url,
                is_active: data.is_active,
                points_cost: data.points_cost,
                is_featured: data.is_featured,
            };
            return reward;
        });
    } catch (error) {
        console.error("Error fetching featured rewards:", error);
        throw error;
    }
}
