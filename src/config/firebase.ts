// Firebase services
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, type FirebaseStorage } from 'firebase/storage';

// Check if Firebase is configured
const isFirebaseConfigured = (): boolean => {
  const requiredVars = [
    import.meta.env.VITE_FIREBASE_API_KEY,
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    import.meta.env.VITE_FIREBASE_APP_ID
  ];
  
  return requiredVars.every(v => v && typeof v === 'string' && v.trim() !== '');
};

// Export Firebase availability flag
export const isFirebaseAvailable = isFirebaseConfigured();

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseAvailable) {
  try {
    // Firebase configuration from environment variables
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    // Reset all to null if initialization fails
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
  // Log a friendly message in development
  if (import.meta.env.DEV) {
    console.warn(`
⚠️ Firebase is not configured. The app will run in demo mode.
Features like authentication and data persistence are disabled.

To enable Firebase features:
1. Copy env.example to .env.local
2. Fill in your Firebase configuration values
3. Restart the development server

See README.md for detailed setup instructions.
    `.trim());
  }
}

// Export Firebase services (may be null if not configured)
export { auth, db, storage };

// Connect to Firebase emulators in development
if (isFirebaseAvailable && import.meta.env.DEV && import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true') {
  try {
    // Connect to Auth emulator
    if (auth && import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL) {
      connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL);
    }
    
    // Connect to Firestore emulator
    if (db && import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_URL) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    
    // Connect to Storage emulator
    if (storage && import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_URL) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
    // Continue with production configuration even if emulators fail
  }
}

export default app;
