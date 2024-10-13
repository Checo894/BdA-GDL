import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/const/firebase';

let db;
let auth;

const initializeFirebase = () => {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = initializeAuth(app);
    } catch (error) {
        console.error("Firebase initialization error:", error);
    } finally {
        console.log("Firebase initialized successfully!");
    }
}

initializeFirebase();

export { db, auth, initializeFirebase };
