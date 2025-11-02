// Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Validate Firebase environment variables
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required environment variables are present
const envVarNames: Record<string, string> = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VITE_FIREBASE_APP_ID'
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value || (typeof value === 'string' && value.trim() === ''))
  .map(([key]) => envVarNames[key]);

if (missingVars.length > 0) {
  const errorMessage = `
🚨 Firebase Configuration Error

Missing required environment variables:
${missingVars.map(v => `  - ${v}`).join('\n')}

Please set these environment variables in your deployment platform (Netlify, Vercel, etc.).

For Netlify:
1. Go to Site settings > Environment variables
2. Add each variable with the "VITE_" prefix
3. Redeploy your site

For local development:
1. Copy env.example to .env.local
2. Fill in your Firebase configuration values

See README.md for detailed setup instructions.
  `.trim();

  console.error(errorMessage);
  
  // In development, throw error to make it obvious
  if (import.meta.env.DEV) {
    throw new Error('Firebase configuration is missing. Please check your environment variables.');
  }
}

// Firebase configuration from environment variables
export const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey || '',
  authDomain: requiredEnvVars.authDomain || '',
  projectId: requiredEnvVars.projectId || '',
  storageBucket: requiredEnvVars.storageBucket || '',
  messagingSenderId: requiredEnvVars.messagingSenderId || '',
  appId: requiredEnvVars.appId || ''
};

// Initialize Firebase only if we have valid configuration
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // In production, we might want to show a user-friendly error message
  if (!import.meta.env.DEV) {
    console.error('Firebase initialization failed. Please check your environment variables.');
  }
  throw error;
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to Firebase emulators in development
if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true') {
  try {
    // Connect to Auth emulator
    if (import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL) {
      connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL);
    }
    
    // Connect to Firestore emulator
    if (import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_URL) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    
    // Connect to Storage emulator
    if (import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_URL) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
    // Continue with production configuration even if emulators fail
  }
}

export default app;
