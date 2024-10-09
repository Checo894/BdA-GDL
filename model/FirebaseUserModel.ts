export interface FirebaseUser {
    uid: string;
    providerData: {
        photoURL: string | null;
        displayName: string | null;
        email: string | null;
    }
}
