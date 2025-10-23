// Resume Service - Handles resume data operations
import { 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CVData } from '../types/cv.types';

export interface ResumeDocument {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  data: CVData;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  previewUrl?: string;
  downloadCount: number;
}

// Create a new resume
export const createResume = async (
  userId: string, 
  title: string, 
  templateId: string, 
  data: CVData
): Promise<string> => {
  try {
    const resumeRef = await addDoc(collection(db, 'resumes'), {
      userId,
      title,
      templateId,
      data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublic: false,
      downloadCount: 0
    });

    return resumeRef.id;
  } catch (error) {
    console.error('Create resume error:', error);
    throw error;
  }
};

// Get resume by ID
export const getResume = async (resumeId: string): Promise<ResumeDocument | null> => {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    const resumeSnap = await getDoc(resumeRef);
    
    if (resumeSnap.exists()) {
      return { id: resumeSnap.id, ...resumeSnap.data() } as ResumeDocument;
    }
    return null;
  } catch (error) {
    console.error('Get resume error:', error);
    throw error;
  }
};

// Get all resumes for a user
export const getUserResumes = async (userId: string): Promise<ResumeDocument[]> => {
  try {
    const resumesRef = collection(db, 'resumes');
    
    const q = query(
      resumesRef,
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    const resumes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ResumeDocument[];
    
    // Sort by updatedAt in JavaScript (newest first)
    resumes.sort((a, b) => {
      const dateA = a.updatedAt instanceof Date ? a.updatedAt : new Date(a.updatedAt);
      const dateB = b.updatedAt instanceof Date ? b.updatedAt : new Date(b.updatedAt);
      return dateB.getTime() - dateA.getTime();
    });
    
    return resumes;
  } catch (error) {
    console.error('Get user resumes error:', error);
    throw error;
  }
};

// Update resume
export const updateResume = async (
  resumeId: string, 
  updates: Partial<ResumeDocument>
): Promise<void> => {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    await updateDoc(resumeRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Update resume error:', error);
    throw error;
  }
};

// Delete resume
export const deleteResume = async (resumeId: string): Promise<void> => {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    await deleteDoc(resumeRef);
  } catch (error) {
    console.error('Delete resume error:', error);
    throw error;
  }
};

// Duplicate resume
export const duplicateResume = async (
  resumeId: string, 
  newTitle: string
): Promise<string> => {
  try {
    const originalResume = await getResume(resumeId);
    if (!originalResume) {
      throw new Error('Resume not found');
    }
    
    const newResumeId = await createResume(
      originalResume.userId,
      newTitle,
      originalResume.templateId,
      originalResume.data
    );
    
    return newResumeId;
  } catch (error) {
    console.error('Duplicate resume error:', error);
    throw error;
  }
};

// Get public resumes (for templates showcase)
export const getPublicResumes = async (limitCount: number = 10): Promise<ResumeDocument[]> => {
  try {
    const resumesRef = collection(db, 'resumes');
    const q = query(
      resumesRef,
      where('isPublic', '==', true),
      orderBy('downloadCount', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ResumeDocument[];
  } catch (error) {
    console.error('Get public resumes error:', error);
    throw error;
  }
};

// Increment download count
export const incrementDownloadCount = async (resumeId: string): Promise<void> => {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    const resumeSnap = await getDoc(resumeRef);
    
    if (resumeSnap.exists()) {
      const currentCount = resumeSnap.data().downloadCount || 0;
      await updateDoc(resumeRef, {
        downloadCount: currentCount + 1
      });
    }
  } catch (error) {
    console.error('Increment download count error:', error);
    throw error;
  }
};
