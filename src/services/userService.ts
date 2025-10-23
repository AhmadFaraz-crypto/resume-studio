// User Service - Handles user data operations
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Date;
  lastLoginAt: Date;
  subscription: 'free' | 'premium' | 'pro';
  resumeCount: number;
}

// Create or update user profile
export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  const userData: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || null,
    createdAt: userSnap.exists() ? userSnap.data().createdAt : new Date(),
    lastLoginAt: new Date(),
    subscription: userSnap.exists() ? userSnap.data().subscription : 'free',
    resumeCount: userSnap.exists() ? userSnap.data().resumeCount : 0
  };

  await setDoc(userRef, userData);
  return userData;
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

// Update user profile
export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: new Date()
  });
};

// Update user's resume count
export const updateUserResumeCount = async (uid: string, increment: number = 1): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const currentCount = userSnap.data().resumeCount || 0;
    await updateDoc(userRef, {
      resumeCount: currentCount + increment
    });
  }
};

// Get user's subscription limits
export const getUserLimits = (subscription: string) => {
  const limits = {
    free: { resumes: 3, templates: 'basic' },
    premium: { resumes: 10, templates: 'all' },
    pro: { resumes: -1, templates: 'all' } // unlimited
  };
  
  return limits[subscription as keyof typeof limits] || limits.free;
};
