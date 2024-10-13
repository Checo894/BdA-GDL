import { doc, deleteDoc } from "firebase/firestore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { db } from "@/api/firebase.service";

export const deleteReward = async (id: string): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    try {
        const rewardRef = doc(db, "Rewards", id);
        await deleteDoc(rewardRef);

        console.log("Reward deleted successfully:", id);
    } catch (e) {
        console.error("Error deleting reward:", e);
        throw new Error("Failed to delete reward.");
    }
};
