import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { FC } from 'react';
import { ErrorProvider } from './contexts/ErrorContextProvider';
import GalleryPage from './pages/GalleryPage';
import EditorPage from './pages/EditorPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeWizard from './pages/ResumeWizard';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ResumeUploadPage from './pages/ResumeUploadPage';

const App: FC = () => {
  return (
    <ErrorProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/wizard" element={<ResumeWizard />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upload" element={<ResumeUploadPage />} />
            <Route path="/editor/:templateId" element={<EditorPage />} />
            <Route path="/editor" element={<Navigate to="/editor/1" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorProvider>
  );
};

export default App;