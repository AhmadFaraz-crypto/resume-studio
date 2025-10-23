# 🔥 Firebase Setup Guide for Resume Studio

## Prerequisites
- Firebase account created ✅
- Project created in Firebase Console

## Step-by-Step Setup

### 1. Firebase Project Configuration

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**
3. **Go to Project Settings** (gear icon)
4. **Scroll to "Your apps" section**
5. **Click "Add app" → Web (</>)**
6. **App nickname**: `resume-studio-web`
7. **Copy the configuration object**

### 2. Environment Variables Setup

Create a `.env` file in your project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# File Upload Settings
VITE_MAX_FILE_SIZE=52428800

# Firebase Emulator (Development)
VITE_FIREBASE_USE_EMULATOR=false
VITE_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099
VITE_FIREBASE_FIRESTORE_EMULATOR_URL=http://localhost:8080
VITE_FIREBASE_STORAGE_EMULATOR_URL=http://localhost:9199
```

### 3. Enable Authentication

1. **Go to Authentication** in Firebase Console
2. **Click "Get started"**
3. **Go to "Sign-in method" tab**
4. **Enable providers**:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Twitter

### 4. Create Firestore Database

1. **Go to Firestore Database**
2. **Click "Create database"**
3. **Choose "Start in test mode"**
4. **Select location** (closest to your users)
5. **Click "Done"**

### 5. Set Up Storage

1. **Go to Storage**
2. **Click "Get started"**
3. **Choose "Start in test mode"**
4. **Select location**
5. **Click "Done"**

### 6. Security Rules (Important!)

#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Resumes are private to each user
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Test Your Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test authentication**:
   - Go to `/login`
   - Try signing up with email/password
   - Try Google sign-in

3. **Test data persistence**:
   - Complete the wizard
   - Check if data is saved to Firestore

### 8. Production Deployment

1. **Update security rules** for production
2. **Set up proper authentication domains**
3. **Configure CORS for your domain**
4. **Set up monitoring and alerts**

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**:
   - Check if `.env` file exists
   - Verify environment variable names
   - Restart development server

2. **Authentication not working**:
   - Check if providers are enabled
   - Verify domain is authorized
   - Check browser console for errors

3. **Firestore permission denied**:
   - Check security rules
   - Verify user is authenticated
   - Check if user ID matches document

### Debug Commands:

```bash
# Check environment variables
npm run dev

# Check Firebase connection
# Open browser console and look for Firebase logs
```

## 📚 Next Steps

1. **Set up user dashboard** with real Firebase data
2. **Implement resume CRUD operations**
3. **Add file upload to Firebase Storage**
4. **Set up email notifications**
5. **Add analytics and monitoring**

## 🚀 Production Checklist

- [ ] Environment variables configured
- [ ] Authentication providers enabled
- [ ] Firestore database created
- [ ] Storage bucket created
- [ ] Security rules configured
- [ ] Domain authorized for authentication
- [ ] Error handling implemented
- [ ] User data validation
- [ ] Backup strategy in place

---

**Need Help?** Check the Firebase documentation or create an issue in the project repository.