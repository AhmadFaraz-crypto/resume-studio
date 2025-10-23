// Authentication Error Messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    title: 'Invalid Credentials',
    message: 'The email or password you entered is incorrect. Please try again.',
  },
  EMAIL_ALREADY_EXISTS: {
    title: 'Email Already Exists',
    message: 'An account with this email already exists. Please sign in instead.',
  },
  WEAK_PASSWORD: {
    title: 'Weak Password',
    message: 'Please choose a stronger password with at least 8 characters.',
  },
  INVALID_EMAIL: {
    title: 'Invalid Email',
    message: 'Please enter a valid email address.',
  },
  TOO_MANY_REQUESTS: {
    title: 'Too Many Attempts',
    message: 'Too many failed attempts. Please try again later.',
  },
  NETWORK_ERROR: {
    title: 'Network Error',
    message: 'Unable to connect. Please check your internet connection.',
  },
  GOOGLE_SIGNIN_FAILED: {
    title: 'Google Sign-in Failed',
    message: 'Unable to sign in with Google. Please try again.',
  },
  TWITTER_SIGNIN_FAILED: {
    title: 'Twitter Sign-in Failed',
    message: 'Unable to sign in with Twitter. Please try again.',
  },
  LOGOUT_FAILED: {
    title: 'Logout Failed',
    message: 'Unable to sign out. Please try again.',
  },
} as const;

// Resume Error Messages
export const RESUME_ERRORS = {
  UPLOAD_FAILED: {
    title: 'Upload Failed',
    message: 'Failed to upload resume. Please try again.',
  },
  PROCESSING_FAILED: {
    title: 'Processing Failed',
    message: 'Failed to process resume. Please try again.',
  },
  AI_OPTIMIZATION_FAILED: {
    title: 'AI Optimization Failed',
    message: 'Failed to optimize resume with AI. Please try again.',
  },
  SAVE_FAILED: {
    title: 'Save Failed',
    message: 'Failed to save resume. Please try again.',
  },
  LOAD_FAILED: {
    title: 'Load Failed',
    message: 'Failed to load resume. Please try again.',
  },
  DELETE_FAILED: {
    title: 'Delete Failed',
    message: 'Failed to delete resume. Please try again.',
  },
  EXPORT_FAILED: {
    title: 'Export Failed',
    message: 'Failed to export resume to PDF. Please try again.',
  },
  INVALID_FILE_TYPE: {
    title: 'Invalid File Type',
    message: 'Please upload a PDF file.',
  },
  FILE_TOO_LARGE: {
    title: 'File Too Large',
    message: 'File size must be less than 10MB.',
  },
  NO_TEXT_FOUND: {
    title: 'No Text Found',
    message: 'No readable text found in PDF. Please ensure the PDF contains text.',
  },
} as const;

// Form Error Messages
export const FORM_ERRORS = {
  REQUIRED_FIELD: {
    title: 'Required Field',
    message: 'This field is required.',
  },
  INVALID_FORMAT: {
    title: 'Invalid Format',
    message: 'Please enter a valid format.',
  },
  VALIDATION_FAILED: {
    title: 'Validation Failed',
    message: 'Please check your input and try again.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: {
    title: 'Welcome Back!',
    message: 'You have successfully signed in.',
  },
  SIGNUP_SUCCESS: {
    title: 'Account Created!',
    message: 'Your account has been created successfully.',
  },
  RESUME_SAVED: {
    title: 'Resume Saved',
    message: 'Your resume has been saved successfully.',
  },
  RESUME_DELETED: {
    title: 'Resume Deleted',
    message: 'Your resume has been deleted successfully.',
  },
  RESUME_EXPORTED: {
    title: 'Resume Exported',
    message: 'Your resume has been exported successfully.',
  },
  DRAFT_SAVED: {
    title: 'Draft Saved',
    message: 'Your resume draft has been saved.',
  },
  PROFILE_UPDATED: {
    title: 'Profile Updated',
    message: 'Your profile has been updated successfully.',
  },
} as const;

// Warning Messages
export const WARNING_MESSAGES = {
  UNSAVED_CHANGES: {
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to leave?',
  },
  SESSION_EXPIRED: {
    title: 'Session Expired',
    message: 'Your session has expired. Please sign in again.',
  },
  DRAFT_EXISTS: {
    title: 'Draft Resume Found',
    message: 'You have a draft resume. Would you like to continue editing?',
  },
} as const;

// Info Messages
export const INFO_MESSAGES = {
  LOADING: {
    title: 'Loading...',
    message: 'Please wait while we process your request.',
  },
  PROCESSING: {
    title: 'Processing...',
    message: 'Please wait while we process your resume.',
  },
  AI_OPTIMIZING: {
    title: 'AI Optimizing',
    message: 'Our AI is optimizing your resume content.',
  },
} as const;
