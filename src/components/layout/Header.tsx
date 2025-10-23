import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { exportToPDF } from '../../utils/exportPDF';
import { isAuthenticated, signOutUser } from '../../services/authService';
import { saveDraftResume } from '../../services/draftService';
import { useCVData } from '../../hooks/useCVData';
import { useSelectedTemplate } from '../../hooks/useSelectedTemplate';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cvData } = useCVData();
  const { selectedTemplate } = useSelectedTemplate();
  const { handleResumeError, handleAuthError } = useErrorHandler();
  const isActive = (path: string) => location.pathname === path;
  const isEditorPage = location.pathname.startsWith('/editor');

  const handleExportPDF = async () => {
    try {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        // Save current resume as draft
        if (cvData && selectedTemplate) {
          saveDraftResume(cvData, selectedTemplate);
        }
        
        // Redirect to login page
        navigate('/login?redirect=/editor&action=export');
        return;
      }

      // User is authenticated, proceed with export
      await exportToPDF('cv-export-content', 'cv.pdf');
    } catch (error) {
      handleResumeError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/');
    } catch (error) {
      // Handle logout error silently
      handleAuthError(error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'Pricing', path: '/pricing' },
  ];

  // Add Dashboard link if user is authenticated
  if (isAuthenticated()) {
    navItems.push({ name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo-creative.svg" 
              alt="Resume Studio" 
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={classnames(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  {
                    'text-blue-600 bg-blue-50 shadow-sm': isActive(item.path),
                    'text-gray-600 hover:text-blue-600 hover:bg-gray-50': !isActive(item.path),
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isEditorPage ? (
              <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              </button>
            ) : (
              !isAuthenticated() && (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  Sign In
                </Link>
              )
            )}
            
            {/* Show Create and Upload buttons only when not on editor page */}
            {!isEditorPage && (
              <>
                <Link
                  to="/wizard"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Resume
                </Link>
                <Link
                  to="/upload"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Upload Resume
                </Link>
              </>
            )}
            
            {/* Show logout button if authenticated */}
            {isAuthenticated() && (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-50 flex items-center"
                title="Logout"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={classnames(
                    'block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200',
                    {
                      'text-blue-600 bg-blue-50': isActive(item.path),
                      'text-gray-600 hover:text-blue-600 hover:bg-gray-50': !isActive(item.path),
                    }
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isEditorPage ? (
                <button
                  onClick={() => {
                    handleExportPDF();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </button>
              ) : isAuthenticated() ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full mt-4 text-gray-600 hover:text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              ) : (
                !isAuthenticated() && (
                  <Link
                    to="/login"
                    className="block w-full text-gray-600 hover:text-blue-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )
              )}
              
              {/* Show Create and Upload buttons in mobile only when not on editor page */}
              {!isEditorPage && (
                <div className="mt-4 space-y-2">
                  <Link
                    to="/wizard"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Resume
                  </Link>
                  <Link
                    to="/upload"
                    className="block w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-orange-700 hover:to-red-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Upload Resume
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
