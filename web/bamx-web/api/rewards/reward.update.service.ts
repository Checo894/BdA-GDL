import { doc, updateDoc } from "firebase/firestore";
import { Rewards } from "@/model/Rewards";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const updateReward = async (id: string, updatedFields: Partial<Rewards>): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    if (updatedFields.points_cost && typeof updatedFields.points_cost !== 'number') {
        throw new Error("Points cost must be a number.");
    }

    try {
        const rewardRef = doc(db, "Rewards", id);
        await updateDoc(rewardRef, updatedFields);

    } catch (e) {
        console.error("Error updating reward:", e);
        throw new Error("Failed to update reward.");
    }
};
