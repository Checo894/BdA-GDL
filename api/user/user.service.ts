/** Workflow
 * Fetch user uuid from firebase auth
 * check if user uuid matches user uuid in firestore
 * if yes, fetch user points from firestore
 * if no, create new user in firestore with firebase auth user uuid
 * return user points
 */

import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { User } from "../../model/UserModel";
import { FirebaseUser } from "../../model/FirebaseUserModel";

// @ts-ignore - Implicit any typescript error ignore
import { auth } from "../firebase.service";
// @ts-ignore
import { db } from "../firebase.service";

const getUserUuid = async (): Promise<FirebaseUser> => {
    return new Promise<FirebaseUser>((resolve, reject) => {
        try {
            // @ts-ignore
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const firebaseUser: FirebaseUser = {
                        uid: user.uid,
                        providerData: {
                            photoURL: user.providerData[0]?.photoURL || null,
                            displayName: user.providerData[0]?.displayName || null,
                            email: user.providerData[0]?.email || null,
                        }
                    };
                    resolve(firebaseUser);
                } else {
                    reject(new Error("No user logged in."));
                }
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            reject(error);
        }
    });
};


// : Promise<User>
export const getUser = async (): Promise<User[]> => {
    const firebaseUser = await getUserUuid();

    // @ts-ignore
    if (!db) {
        throw new Error("Firestore has not been initialized.");
    }

    const q = query(
        collection(db, 'User'),
        where('Firebase_uuid', '==', firebaseUser.uid),
        limit(1)
    );

    try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            const newUser: User = {
                Firebase_uuid: firebaseUser.uid,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
                last_login: Timestamp.now(),
                points_balance: 0,
                email: firebaseUser.providerData.email,
            };

            await addDoc(collection(db, 'User'), newUser);
            return [newUser];
        }

        return snapshot.docs.map((doc) => {
            const data = doc.data();

            const user: User = {
                Firebase_uuid: data.Firebase_uuid,
                created_at: data.created_at,
                updated_at: data.updated_at,
                last_login: data.last_login,
                points_balance: data.points_balance,
                email: data.email,
            };
            return user;
        });

    } catch (error) {
        console.error("Error fetching user points:", error);
        throw error;
    }
};
