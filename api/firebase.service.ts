import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../constants/firebase';
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let db;
let auth;

const initializeFirebase = async () => {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
}

export { initializeFirebase, db, auth };
