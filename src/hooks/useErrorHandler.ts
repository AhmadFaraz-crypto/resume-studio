import { useError } from './useError';
import { AUTH_ERRORS, RESUME_ERRORS, SUCCESS_MESSAGES, WARNING_MESSAGES, INFO_MESSAGES } from '../utils/errorMessages';

export const useErrorHandler = () => {
  const { showSuccess, showError, showWarning, showInfo } = useError();

  // Authentication error handlers
  const handleAuthError = (error: unknown) => {
    const errorObj = error as { code?: string; message?: string };
    const errorCode = errorObj?.code || '';
    
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        showError(AUTH_ERRORS.INVALID_CREDENTIALS.title, AUTH_ERRORS.INVALID_CREDENTIALS.message);
        break;
      case 'auth/email-already-in-use':
        showError(AUTH_ERRORS.EMAIL_ALREADY_EXISTS.title, AUTH_ERRORS.EMAIL_ALREADY_EXISTS.message);
        break;
      case 'auth/weak-password':
        showError(AUTH_ERRORS.WEAK_PASSWORD.title, AUTH_ERRORS.WEAK_PASSWORD.message);
        break;
      case 'auth/invalid-email':
        showError(AUTH_ERRORS.INVALID_EMAIL.title, AUTH_ERRORS.INVALID_EMAIL.message);
        break;
      case 'auth/too-many-requests':
        showError(AUTH_ERRORS.TOO_MANY_REQUESTS.title, AUTH_ERRORS.TOO_MANY_REQUESTS.message);
        break;
      case 'auth/network-request-failed':
        showError(AUTH_ERRORS.NETWORK_ERROR.title, AUTH_ERRORS.NETWORK_ERROR.message);
        break;
      case 'auth/popup-closed-by-user':
        showError('Sign-in Cancelled', 'Sign-in was cancelled. Please try again.');
        break;
      case 'auth/popup-blocked':
        showError('Popup Blocked', 'Please allow popups for this site to sign in.');
        break;
      default: {
        // Show the actual error message if available, otherwise show generic message
        const errorMessage = errorObj?.message || 'An unexpected error occurred. Please try again.';
        showError('Authentication Error', errorMessage);
        break;
      }
    }
  };

  // Resume error handlers
  const handleResumeError = (error: unknown) => {
    const errorObj = error as { message?: string; code?: string };
    const errorMessage = errorObj?.message || error?.toString() || '';
    const errorCode = errorObj?.code || '';
    
    // Handle specific Firebase errors
    if (errorCode === 'storage/unauthorized') {
      showError('Storage Error', 'You do not have permission to access this resource.');
    } else if (errorCode === 'storage/canceled') {
      showError('Upload Cancelled', 'The upload was cancelled.');
    } else if (errorCode === 'storage/unknown') {
      showError('Storage Error', 'An unknown error occurred with file storage.');
    } else if (errorMessage.includes('upload')) {
      showError(RESUME_ERRORS.UPLOAD_FAILED.title, RESUME_ERRORS.UPLOAD_FAILED.message);
    } else if (errorMessage.includes('processing')) {
      showError(RESUME_ERRORS.PROCESSING_FAILED.title, RESUME_ERRORS.PROCESSING_FAILED.message);
    } else if (errorMessage.includes('AI') || errorMessage.includes('optimization')) {
      showError(RESUME_ERRORS.AI_OPTIMIZATION_FAILED.title, RESUME_ERRORS.AI_OPTIMIZATION_FAILED.message);
    } else if (errorMessage.includes('save')) {
      showError(RESUME_ERRORS.SAVE_FAILED.title, RESUME_ERRORS.SAVE_FAILED.message);
    } else if (errorMessage.includes('load')) {
      showError(RESUME_ERRORS.LOAD_FAILED.title, RESUME_ERRORS.LOAD_FAILED.message);
    } else if (errorMessage.includes('delete')) {
      showError(RESUME_ERRORS.DELETE_FAILED.title, RESUME_ERRORS.DELETE_FAILED.message);
    } else if (errorMessage.includes('export')) {
      showError(RESUME_ERRORS.EXPORT_FAILED.title, RESUME_ERRORS.EXPORT_FAILED.message);
    } else if (errorMessage.includes('file type') || errorMessage.includes('PDF')) {
      showError(RESUME_ERRORS.INVALID_FILE_TYPE.title, RESUME_ERRORS.INVALID_FILE_TYPE.message);
    } else if (errorMessage.includes('size') || errorMessage.includes('large')) {
      showError(RESUME_ERRORS.FILE_TOO_LARGE.title, RESUME_ERRORS.FILE_TOO_LARGE.message);
    } else if (errorMessage.includes('text') || errorMessage.includes('readable')) {
      showError(RESUME_ERRORS.NO_TEXT_FOUND.title, RESUME_ERRORS.NO_TEXT_FOUND.message);
    } else {
      // Show the actual error message if available
      const displayMessage = errorMessage || 'An unexpected error occurred while processing your resume.';
      showError('Resume Error', displayMessage);
    }
  };

  // Success handlers
  const handleLoginSuccess = () => {
    showSuccess(SUCCESS_MESSAGES.LOGIN_SUCCESS.title, SUCCESS_MESSAGES.LOGIN_SUCCESS.message);
  };

  const handleSignupSuccess = () => {
    showSuccess(SUCCESS_MESSAGES.SIGNUP_SUCCESS.title, SUCCESS_MESSAGES.SIGNUP_SUCCESS.message);
  };

  const handleResumeSaved = () => {
    showSuccess(SUCCESS_MESSAGES.RESUME_SAVED.title, SUCCESS_MESSAGES.RESUME_SAVED.message);
  };

  const handleResumeDeleted = () => {
    showSuccess(SUCCESS_MESSAGES.RESUME_DELETED.title, SUCCESS_MESSAGES.RESUME_DELETED.message);
  };

  const handleResumeExported = () => {
    showSuccess(SUCCESS_MESSAGES.RESUME_EXPORTED.title, SUCCESS_MESSAGES.RESUME_EXPORTED.message);
  };

  const handleDraftSaved = () => {
    showSuccess(SUCCESS_MESSAGES.DRAFT_SAVED.title, SUCCESS_MESSAGES.DRAFT_SAVED.message);
  };

  // Warning handlers
  const handleUnsavedChanges = () => {
    showWarning(WARNING_MESSAGES.UNSAVED_CHANGES.title, WARNING_MESSAGES.UNSAVED_CHANGES.message);
  };

  const handleSessionExpired = () => {
    showWarning(WARNING_MESSAGES.SESSION_EXPIRED.title, WARNING_MESSAGES.SESSION_EXPIRED.message);
  };

  const handleDraftExists = () => {
    showWarning(WARNING_MESSAGES.DRAFT_EXISTS.title, WARNING_MESSAGES.DRAFT_EXISTS.message);
  };

  // Info handlers
  const handleLoading = () => {
    showInfo(INFO_MESSAGES.LOADING.title, INFO_MESSAGES.LOADING.message);
  };

  const handleProcessing = () => {
    showInfo(INFO_MESSAGES.PROCESSING.title, INFO_MESSAGES.PROCESSING.message);
  };

  const handleAIOptimizing = () => {
    showInfo(INFO_MESSAGES.AI_OPTIMIZING.title, INFO_MESSAGES.AI_OPTIMIZING.message);
  };

  return {
    // Error handlers
    handleAuthError,
    handleResumeError,
    
    // Success handlers
    handleLoginSuccess,
    handleSignupSuccess,
    handleResumeSaved,
    handleResumeDeleted,
    handleResumeExported,
    handleDraftSaved,
    
    // Warning handlers
    handleUnsavedChanges,
    handleSessionExpired,
    handleDraftExists,
    
    // Info handlers
    handleLoading,
    handleProcessing,
    handleAIOptimizing,
    
    // Direct toast methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
