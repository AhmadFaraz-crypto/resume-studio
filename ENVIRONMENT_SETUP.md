# Environment Variables Setup Guide

## 🚀 Quick Setup

### 1. Copy Environment Template
```bash
cp env.example .env.local
```

### 2. Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps"
5. Click "Web" icon (`</>`)
6. Register app with name "Resume Studio Web"
7. Copy the config values

### 3. Update .env.local
Replace the placeholder values in `.env.local`:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=resume-studio-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=resume-studio-12345
VITE_FIREBASE_STORAGE_BUCKET=resume-studio-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## 🔧 Development Setup

### Firebase Emulator (Optional)
For local development, you can use Firebase emulators:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Start emulators
firebase emulators:start
```

Then update `.env.local`:
```env
VITE_FIREBASE_USE_EMULATOR=true
VITE_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099
VITE_FIREBASE_FIRESTORE_EMULATOR_URL=http://localhost:8080
VITE_FIREBASE_STORAGE_EMULATOR_URL=http://localhost:9199
```

## 🔒 Security Best Practices

### 1. Never Commit .env.local
Make sure `.env.local` is in your `.gitignore`:
```
.env.local
.env
```

### 2. Use Different Configs for Different Environments
- **Development**: `.env.local` (local development)
- **Staging**: `.env.staging` (staging environment)
- **Production**: Environment variables in hosting platform

### 3. Firebase Security Rules
Set up proper security rules in Firebase Console:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resume-previews/{resumeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy with `vercel --prod`

### Netlify
1. Add environment variables in Netlify dashboard
2. Deploy with `netlify deploy --prod`

### Firebase Hosting
1. Add environment variables in Firebase Console
2. Deploy with `firebase deploy`

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot find module 'firebase/auth'"**
   - Run `npm install firebase`
   - Restart your development server

2. **"Invalid API key"**
   - Check your `.env.local` file
   - Verify Firebase project settings
   - Make sure API key is correct

3. **"Permission denied"**
   - Check Firebase security rules
   - Verify user authentication
   - Check Firestore/Storage rules

4. **Environment variables not loading**
   - Make sure file is named `.env.local`
   - Restart development server
   - Check variable names start with `VITE_`

### Debug Mode:
Add this to your component to debug environment variables:
```typescript
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
});
```

## 📋 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | ✅ |
| `VITE_FIREBASE_USE_EMULATOR` | Use Firebase emulators (dev only) | ❌ |
| `VITE_FIREBASE_AUTH_EMULATOR_URL` | Auth emulator URL | ❌ |
| `VITE_FIREBASE_FIRESTORE_EMULATOR_URL` | Firestore emulator URL | ❌ |
| `VITE_FIREBASE_STORAGE_EMULATOR_URL` | Storage emulator URL | ❌ |

## 🎯 Next Steps

1. **Set up Firebase project** (follow Firebase setup guide)
2. **Copy environment template** (`cp env.example .env.local`)
3. **Add your Firebase config** to `.env.local`
4. **Test the connection** by running the app
5. **Set up security rules** in Firebase Console
6. **Deploy to production** with proper environment variables
