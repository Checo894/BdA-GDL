import { signInWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from "@/api/firebase.service";

const adminUsers = process.env.NEXT_PUBLIC_ADMIN_USERS?.split(",");

export const login = async (email: string, password: string) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (adminUsers && adminUsers.includes(user.email!)) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error("Error during login:", error.message);
        throw error;
    }
};
