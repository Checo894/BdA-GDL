import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, addDoc } from 'firebase/firestore';
import { testProducts as products } from '../const/testProducts';
import admin from 'firebase-admin';

// Jest test for uploading products to Firestore
let testEnv: RulesTestEnvironment;
let db: admin.firestore.Firestore;

describe('Firestore Upload Test', () => {
    beforeAll(async () => {
        // Initialize Firebase test environment
        testEnv = await initializeTestEnvironment({
            projectId: 'firestore-emulator-example',
            firestore: {
                host: 'localhost',
                port: 8080,
            },
        });

        // Initialize the admin SDK
        admin.initializeApp({
            credential: admin.credential.cert('./bamx_firestore_private_key.json'),
            databaseURL: 'https://firestore-emulator-example.firebaseio.com'
        });

        const context = testEnv.authenticatedContext('test-user');
        db = admin.firestore();
    });

    afterAll(async () => {
        await testEnv.cleanup();
    });

    it('should upload all products to Firestore', async () => {
        const productsCollection = collection(db, 'products');
        for (const product of products) {
            const docRef = await addDoc(productsCollection, product);
            expect(docRef.id).toBeDefined();
        }
    }, 10000);
});
