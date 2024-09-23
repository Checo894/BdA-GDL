// Configuración de react-native-gesture-handler para Jest
import 'react-native-gesture-handler/jestSetup';

// Mock de NativeAnimatedHelper para evitar errores relacionados con animaciones nativas
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock de AsyncStorage
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-constants', () => ({
    __esModule: true,
    default: {
      expoConfig: {
        extra: {
          FIREBASE_API_KEY: 'test-api-key',
          AUTH_DOMAIN: 'test-auth-domain',
          PROJECT_ID: 'test-project-id',
          STORAGE_BUCKET: 'test-storage-bucket',
          MESSAGING_SENDER_ID: 'test-messaging-sender-id',
          MOBILDESK_APP_ID: 'test-app-id',
        },
      },
    },
  }));
  
  jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(() => ({
      name: 'test-app',
      options: {},
      automaticDataCollectionEnabled: false,
    })),
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: null,
    })),
    initializeAuth: jest.fn(() => ({
      currentUser: null,
    })),
    getReactNativePersistence: jest.fn(),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: 'test-uid' });
      return jest.fn(); // Retorna una función de desuscripción simulada
    }),
    signOut: jest.fn(() => Promise.resolve()),
  })); 
  