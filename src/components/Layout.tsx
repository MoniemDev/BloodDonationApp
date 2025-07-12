import React from 'react';
import { Heart, LogOut, User, Home, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const { theme, language, toggleTheme, toggleLanguage, t } = useTheme();

  const navItems = user?.role === 'donor' 
    ? [
        { id: 'dashboard', label: t('dashboard'), icon: Home },
        { id: 'profile', label: t('profile'), icon: User },
      ]
    : [
        { id: 'dashboard', label: t('dashboard'), icon: Home },
        { id: 'create-request', label: t('newRequest'), icon: Heart },
        { id: 'profile', label: t('profile'), icon: User },
      ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-red-600 dark:bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8" />
              <h1 className="text-xl font-bold">{t('appName')}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-red-200 hover:text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                title={theme === 'light' ? t('darkMode') : t('lightMode')}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 p-2 rounded-lg text-red-200 hover:text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                title={t('language')}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'EN' : 'ع'}
                </span>
              </button>
              
              {user && (
                <span className="text-sm">
                  {user.email} ({user.role === 'donor' ? t('donateBlood') : t('requestBlood')})
                </span>
              )}
              
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-red-200 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('logout')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {user && (
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 whitespace-nowrap transition-colors ${
                      currentPage === item.id
                        ? 'border-red-500 text-red-600 dark:text-red-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};