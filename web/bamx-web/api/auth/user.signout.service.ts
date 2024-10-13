import { signOut } from "firebase/auth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from "@/api/firebase.service";

export const logout = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        await signOut(auth);
        console.log("User signed out successfully");
        localStorage.removeItem('isAuthenticated');
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
};
