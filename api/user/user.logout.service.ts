import { getAuth, signOut } from "firebase/auth";

export const signOutUser = async () => {
    try {
        const auth = getAuth();
        await signOut(auth);
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Error signing out:', error);
    }
};


