import { getUser } from "./user.service";
import {collection, doc, getDoc, getDocs, limit, query, Timestamp, updateDoc, where} from "firebase/firestore";
import { getUserUuid } from "./user.service"; 
import { db } from "../firebase.service";

export const getUserPoints = async (): Promise<number> => {
    const user = await getUser();
    return user.map((u) => u.points_balance).reduce((acc, val) => acc + val, 0);
};


export const updateUserPoints = async (pointsToAdd: number): Promise<void> => {
    try {
        const firebaseUser = await getUserUuid();

        const userQuery = query(
            collection(db, 'User'),
            where('Firebase_uuid', '==', firebaseUser.uid),
            limit(1)
        );

        const snapshot = await getDocs(userQuery);

        if (snapshot.empty) {
            console.error("User not found in Firestore.");
            return;
        }

        const userDocRef = snapshot.docs[0].ref;
        const currentUserPoints = snapshot.docs[0].data().points_balance;
        const newPointsBalance = currentUserPoints + pointsToAdd;

        await updateDoc(userDocRef, {
            points_balance: newPointsBalance,
            updated_at: Timestamp.now()
        });

        console.log("User points updated successfully!");
    } catch (error) {
        console.error("Error updating user points:", error);
        throw error;
    }
};