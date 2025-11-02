# 🚀 CV Template Builder

A modern, open-source CV/Resume builder application built with React, TypeScript, and Tailwind CSS. Create, edit, and export professional CVs with multiple beautiful template options.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎨 Multiple Beautiful Templates (11 Unique Designs)
- **Professional Timeline**: Features a timeline-based work experience section with elegant accent colors
- **Modern Header**: Clean design with a colored header section and traditional layout
- **Minimalist Two-Column**: Clean two-column layout with left-aligned dates and section labels for easy scanning
- **Decorative Pattern**: Unique geometric SVG pattern header with colored accent bars on each section
- **Centered Classic**: Centered layout with bordered header, highlighted summary box, and pill-shaped skill badges
- **Accent Tabs**: Stylish colored tab-style section headers with circular icon backgrounds for contact information
- **Full Header**: Bold full-width colored header with integrated summary and contact grid, underlined section titles
- **Light Contact**: Minimalist design with subtle light background on contact section and 3-column skills grid
- **Bookmark Ribbon**: Elegant design with decorative SVG bookmark ribbon and clean bordered sections
- **Sidebar Labels**: Sophisticated two-column layout with section labels on left and content on right with border separators
- **Gray Background**: Modern light gray background with vertical dividers between titles/companies and comma-separated skills

### 🖼️ Template Gallery
- Visual template showcase with live previews
- Side-by-side comparison of all available templates
- Interactive selection with detailed descriptions
- Smooth transition from gallery to editor

### ✏️ Full Editing Capabilities
- Edit personal information (name, email, phone, location, LinkedIn)
- Add/edit/remove work experience entries
- Add/edit/remove education entries
- Manage skills (comma-separated list)
- Real-time preview of changes
- User dashboard with resume management
- Save drafts and manage multiple resumes

### 📥 Export Options
- **PDF Export**: High-quality multi-page PDF generation with A4 standard dimensions
- **DOCX Export**: Microsoft Word-compatible documents using docx library
- **Page Break Preview**: Visual indicators show exactly where pages will break
- **WYSIWYG**: What You See Is What You Get - preview matches exported PDF exactly

### 🔐 Authentication & Data Persistence
- Email/Password authentication
- Google Sign-In
- Twitter Sign-In
- Secure user data storage with Firebase
- Draft resume management

### 🎯 Modern UI/UX
- Responsive design with Tailwind CSS
- Toggle editor visibility for focused preview
- Template selection with visual indicators
- Clean, professional interface
- Toast notifications for user feedback

## 🛠️ Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication, Firestore, and Storage
- **React Router** - Client-side routing
- **html2canvas** - HTML to canvas conversion for PDF
- **jsPDF** - PDF generation
- **docx** - DOCX file generation
- **file-saver** - File download functionality
- **classnames** - Conditional class management

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A **Firebase account** (free tier works perfectly)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cv-templates.git
cd cv-templates
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

#### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if you want)

#### Step 2: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the **Web icon** `</>` to add a web app
5. Register your app (you can use any nickname)
6. Copy the Firebase configuration object

#### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id-here
   ```

   Replace the placeholder values with your actual Firebase config values.

#### Step 4: Enable Firebase Services

1. **Authentication**: 
   - Go to Authentication in Firebase Console
   - Click "Get started"
   - Enable "Email/Password", "Google", and "Twitter" sign-in methods

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select your preferred location

3. **Storage**:
   - Go to Storage
   - Click "Get started"
   - Choose "Start in test mode" (for development)
   - Select your preferred location

> 💡 **Tip**: For detailed Firebase setup instructions, check out [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 4. Start the Development Server

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

🎉 **Congratulations!** You're all set up and ready to build amazing CVs!

## 📖 Usage

### Browsing Templates

1. When you first open the app, you'll see the **Template Gallery**
2. Browse through visual previews of all available templates
3. Click on any template card to select it
4. Click "Start Editing Your CV" or "Edit This Template" to begin

### Creating Your First Resume

1. **Sign Up**: Create an account or sign in
2. **Select Template**: Choose from 11 beautiful templates
3. **Fill Information**: 
   - Personal details
   - Work experience
   - Education
   - Skills
4. **Preview**: See your CV update in real-time
5. **Export**: Download as PDF or DOCX

### Editing Your CV

- Toggle between editor and preview modes
- Switch templates anytime
- Save your progress automatically
- Manage multiple resume drafts

### Exporting Your CV

1. Review your CV in the preview
2. Page break indicators show where pages will split
3. Click "Export PDF" for multi-page PDF (A4 format)
4. Click "Export DOCX" for Word document
5. Files are automatically named based on your name

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   ├── templates/        # CV template components (11 templates)
│   └── wizard/           # Resume creation wizard steps
├── config/
│   └── firebase.ts       # Firebase configuration
├── contexts/             # React contexts (Error handling, etc.)
├── data/                 # Default data and templates
├── hooks/                # Custom React hooks
├── pages/                # Page components
├── services/             # Firebase services (auth, storage, etc.)
├── types/                # TypeScript type definitions
└── utils/                # Utility functions (PDF export, etc.)
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

All environment variables are prefixed with `VITE_` (required by Vite). See `env.example` for all available options:

- Firebase configuration (required)
- File upload settings
- Firebase emulator settings (optional, for local development)

### Customization

- **Templates**: Add new templates in `src/components/templates/`
- **Default Data**: Modify `src/data/defaultCV.ts`
- **Accent Colors**: Edit template definitions in `src/data/templates.ts`

## 🤝 Contributing

Contributions are welcome! This project is open source and we love to see community involvement.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- 🎨 New template designs
- 🐛 Bug fixes
- 📚 Documentation improvements
- ♿ Accessibility enhancements
- 🌍 Internationalization (i18n)
- 🧪 Tests
- 🎯 Performance optimizations

Please read our contributing guidelines (if available) before submitting PRs.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font: [Arimo from Google Fonts](https://fonts.google.com/specimen/Arimo)
- Built with ❤️ by the open-source community

## 👨‍💻 Author

**Ahmad Faraz**

- GitHub: [@ahmadfaraz](https://github.com/ahmadfaraz)

## 🌟 Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ for the open-source community**
