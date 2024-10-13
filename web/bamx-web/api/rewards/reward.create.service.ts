import { addDoc, collection } from "firebase/firestore";
import { Rewards } from "@/model/Rewards";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const createReward = async (newReward: Partial<Rewards>): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    if (newReward.points_cost && typeof newReward.points_cost !== 'number') {
        throw new Error("Points cost must be a number.");
    }

    try {
        const rewardsCollection = collection(db, "Rewards");
        await addDoc(rewardsCollection, newReward);

        console.log("Reward created successfully:", newReward);
    } catch (e) {
        console.error("Error creating reward:", e);
        throw new Error("Failed to create reward.");
    }
};
