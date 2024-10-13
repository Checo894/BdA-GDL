import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { Rewards } from "@/model/Rewards";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const getRewardById = async (id: string): Promise<Rewards | null> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'Rewards'),
        where(documentId(), '==', id)
    );

    try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
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
    } catch (e) {
        console.error("Error fetching reward:", e);
        throw e;
    }
};
