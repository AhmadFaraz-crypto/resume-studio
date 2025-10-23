import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { getUserResumes, deleteResume, type ResumeDocument } from '../services/resumeService';
import { onAuthStateChange } from '../services/authService';
import { getDraftResume, clearDraftResume } from '../services/draftService';
import { useErrorHandler } from '../hooks/useErrorHandler';
import {
  DashboardHeader,
  DraftResumeCard,
  EmptyState,
  NoSearchResults,
  ResumeGrid,
  QuickActions,
} from '../components/dashboard';

const DashboardPage: React.FC = () => {
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<ResumeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasDraft, setHasDraft] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { handleResumeError, handleResumeDeleted } = useErrorHandler();

  const loadResumes = useCallback(async (userId: string) => {
    try {
      const userResumes = await getUserResumes(userId);
      setResumes(userResumes);
      setFilteredResumes(userResumes);
    } catch (error) {
      handleResumeError(error);
    }
  }, [handleResumeError]);

  useEffect(() => {
    // Check for draft resume
    const draftResume = getDraftResume();
    setHasDraft(!!draftResume);
    
          // Listen for authentication state changes with token management
          const unsubscribe = onAuthStateChange(async (firebaseUser, userProfile) => {
            if (firebaseUser && userProfile) {
              await loadResumes(firebaseUser.uid);

              // Check if draft was converted to real resume
              const updatedDraftResume = getDraftResume();
              setHasDraft(!!updatedDraftResume);
            } else {
              navigate('/login');
            }
            setIsLoading(false);
          });

    return () => unsubscribe();
  }, [navigate, loadResumes]);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredResumes(resumes);
    } else {
      const filtered = resumes.filter(resume =>
        resume.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResumes(filtered);
    }
  };

  const handleClearSearch = () => {
    handleSearch('');
  };

  const handleCreateResume = () => {
    navigate('/wizard');
  };

  const handleEditResume = (resumeId: string) => {
    // Find the resume to get its template ID
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      navigate(`/editor/${resume.templateId}?resumeId=${resumeId}`);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(resumeId);
        const updatedResumes = resumes.filter(r => r.id !== resumeId);
        setResumes(updatedResumes);
        setFilteredResumes(updatedResumes);
        handleResumeDeleted();
      } catch (error) {
        handleResumeError(error);
      }
    }
  };


  const handleContinueDraft = () => {
    // Get the draft resume to get the template ID
    const draftResume = getDraftResume();
    if (draftResume) {
      // Navigate to editor with the template ID from the draft
      navigate(`/editor/${draftResume.templateId}`);
    } else {
      // Fallback to general editor if no draft found
      navigate('/editor');
    }
  };

  const handleDiscardDraft = () => {
    clearDraftResume();
    setHasDraft(false);
  };


  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your resumes...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Search */}
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onClearSearch={handleClearSearch}
          />

          {/* Draft Resume Section */}
          {hasDraft && (
            <DraftResumeCard
              onContinueDraft={handleContinueDraft}
              onDiscardDraft={handleDiscardDraft}
            />
          )}

          {filteredResumes.length === 0 && searchQuery === '' ? (
            <EmptyState onCreateResume={handleCreateResume} />
          ) : filteredResumes.length === 0 && searchQuery !== '' ? (
            <NoSearchResults
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />
          ) : (
            <ResumeGrid
              resumes={filteredResumes}
              searchQuery={searchQuery}
              onEditResume={handleEditResume}
              onDeleteResume={handleDeleteResume}
            />
          )}

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
