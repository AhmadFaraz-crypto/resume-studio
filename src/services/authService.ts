// Authentication Service - Handles Firebase auth with token management
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  TwitterAuthProvider,
  updateProfile,
  type User
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from '../config/firebase';
import { createUserProfile, getUserProfile, type UserProfile } from './userService';

// Token management utilities
export const setAuthToken = (token: string) => {
  try {
    // Store in localStorage for client-side access
    localStorage.setItem('authToken', token);
    // Store in cookie for server-side access with proper settings
    Cookies.set('authToken', token, { 
      expires: 7, // 7 days
      secure: true, // HTTPS only in production
      sameSite: 'strict' // CSRF protection
    });
  } catch (error) {
    console.error('Failed to set auth token:', error);
    throw new Error('Failed to save authentication token. Please try again.');
  }
};

export const setRefreshToken = (refreshToken: string) => {
  try {
    // Store refresh token securely
    localStorage.setItem('refreshToken', refreshToken);
    Cookies.set('refreshToken', refreshToken, { 
      expires: 30, // 30 days for refresh token
      secure: true,
      sameSite: 'strict'
    });
  } catch (error) {
    console.error('Failed to set refresh token:', error);
    throw new Error('Failed to save refresh token. Please try again.');
  }
};

export const getAuthToken = (): string | null => {
  try {
    // Try localStorage first
    const token = localStorage.getItem('authToken');
    if (token) {
      return token;
    }
    
    // Fallback to cookie
    const cookieToken = Cookies.get('authToken');
    return cookieToken || null;
  } catch (error) {
    console.error('Failed to get auth token:', error);
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  try {
    // Try localStorage first
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      return refreshToken;
    }
    
    // Fallback to cookie
    const cookieRefreshToken = Cookies.get('refreshToken');
    return cookieRefreshToken || null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
  } catch (error) {
    console.error('Failed to clear auth tokens:', error);
  }
};

// Enhanced authentication functions
export const signInWithEmail = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the ID token and refresh token
    const token = await user.getIdToken();
    const refreshToken = user.refreshToken;
    
    // Store both tokens
    setAuthToken(token);
    setRefreshToken(refreshToken);
    
    // Create or update user profile
    const userProfile = await createUserProfile(user);
    return userProfile;
  } catch (error) {
    console.error('Sign in with email error:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, displayName: string): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user display name
    await updateProfile(user, { displayName });
    
    // Get the ID token and refresh token
    const token = await user.getIdToken();
    const refreshToken = user.refreshToken;
    
    // Store both tokens
    setAuthToken(token);
    setRefreshToken(refreshToken);
    
    // Create user profile
    const userProfile = await createUserProfile(user);
    return userProfile;
  } catch (error) {
    console.error('Sign up with email error:', error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<UserProfile> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Get the ID token and refresh token
    const token = await user.getIdToken();
    const refreshToken = user.refreshToken;
    
    // Store both tokens
    setAuthToken(token);
    setRefreshToken(refreshToken);
    
    // Create or update user profile
    const userProfile = await createUserProfile(user);
    return userProfile;
  } catch (error) {
    console.error('Sign in with Google error:', error);
    throw error;
  }
};

export const signInWithTwitter = async (): Promise<UserProfile> => {
  try {
    const provider = new TwitterAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Get the ID token and refresh token
    const token = await user.getIdToken();
    const refreshToken = user.refreshToken;
    
    // Store both tokens
    setAuthToken(token);
    setRefreshToken(refreshToken);
    
    // Create or update user profile
    const userProfile = await createUserProfile(user);
    return userProfile;
  } catch (error) {
    console.error('Sign in with Twitter error:', error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    clearAuthToken();
    
    // Clear all localStorage data on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('draftResume');
    localStorage.removeItem('selectedTemplate');
    localStorage.removeItem('cvData');
    localStorage.removeItem('extractedResumeData');
    
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Token refresh utility
export const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Force refresh the ID token
      const token = await user.getIdToken(true);
      const refreshToken = user.refreshToken;
      
      // Update stored tokens
      setAuthToken(token);
      setRefreshToken(refreshToken);
      
      return token;
    }
    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};

// Check if token is expired or about to expire
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    // Consider token expired if it expires within 5 minutes
    return payload.exp < (currentTime + 300);
  } catch (error) {
    console.error('Token expiration check error:', error);
    return true; // Assume expired if we can't parse
  }
};

// Auto-refresh token if needed
export const ensureValidToken = async (): Promise<string | null> => {
  try {
    const currentToken = getAuthToken();
    
    if (!currentToken) {
      return null;
    }
    
    // Check if token is expired or about to expire
    if (isTokenExpired(currentToken)) {
      return await refreshAuthToken();
    }
    
    return currentToken;
  } catch (error) {
    console.error('Ensure valid token error:', error);
    return null;
  }
};

// Auth state listener with token management
export const onAuthStateChange = (callback: (user: User | null, userProfile: UserProfile | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Get fresh token and refresh token
        const token = await user.getIdToken();
        const refreshToken = user.refreshToken;
        
        // Store both tokens
        setAuthToken(token);
        setRefreshToken(refreshToken);
        
        // Get user profile
        const userProfile = await getUserProfile(user.uid);
        callback(user, userProfile);
      } catch (error) {
        console.error('Auth state change error:', error);
        callback(null, null);
      }
    } else {
      clearAuthToken();
      callback(null, null);
    }
  });
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Get current user profile
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const user = getCurrentUser();
    if (user) {
      return await getUserProfile(user.uid);
    }
    return null;
  } catch (error) {
    console.error('Get current user profile error:', error);
    return null;
  }
};

// Make authenticated API calls with automatic token refresh
export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    // Ensure we have a valid token
    const token = await ensureValidToken();
    
    if (!token) {
      throw new Error('No valid authentication token available');
    }
    
    // Add authorization header
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If token is invalid, try to refresh and retry once
    if (response.status === 401) {
      const refreshedToken = await refreshAuthToken();
      if (refreshedToken) {
        const retryHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${refreshedToken}`,
          'Content-Type': 'application/json',
        };
        
        return fetch(url, {
          ...options,
          headers: retryHeaders,
        });
      }
    }
    
    return response;
  } catch (error) {
    console.error('Authenticated request error:', error);
    throw error;
  }
};

