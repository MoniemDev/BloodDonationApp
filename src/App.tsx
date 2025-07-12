import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { AuthForm } from './components/auth/AuthForm';
import { DonorProfileForm } from './components/profile/DonorProfileForm';
import { RecipientProfileForm } from './components/profile/RecipientProfileForm';
import { CreateRequestForm } from './components/requests/CreateRequestForm';
import { DonorDashboard } from './components/dashboard/DonorDashboard';
import { RecipientDashboard } from './components/dashboard/RecipientDashboard';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { t } = useTheme();
  const { user, donorProfile, recipientProfile } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // If not authenticated, show auth form
  if (!user) {
    return <AuthForm onSuccess={() => setCurrentPage('dashboard')} />;
  }

  // If authenticated but profile not completed, show profile form
  if (!user.profileCompleted) {
    if (user.role === 'donor') {
      return <DonorProfileForm onComplete={() => setCurrentPage('dashboard')} />;
    } else {
      return <RecipientProfileForm onComplete={() => setCurrentPage('dashboard')} />;
    }
  }

  // Main app content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return user.role === 'donor' ? (
          <DonorDashboard />
        ) : (
          <RecipientDashboard onCreateRequest={() => setCurrentPage('create-request')} />
        );
      
      case 'create-request':
        return user.role === 'recipient' ? (
          <CreateRequestForm onComplete={() => setCurrentPage('dashboard')} />
        ) : null;
      
      case 'profile':
        return user.role === 'donor' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('donorProfile')}</h2>
            {donorProfile && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('name')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{donorProfile.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bloodType')}</label>
                    <p className="mt-1 text-red-600 dark:text-red-400 font-bold">{donorProfile.bloodType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('age')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{donorProfile.age}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('gender')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white capitalize">{t(donorProfile.gender)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phone')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{donorProfile.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('city')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{donorProfile.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('availability')}</label>
                    <p className={`mt-1 font-medium ${donorProfile.isAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {donorProfile.isAvailable ? t('available') : t('notAvailable')}
                    </p>
                  </div>
                  {donorProfile.lastDonationDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('lastDonation')}</label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {new Date(donorProfile.lastDonationDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('recipientProfile')}</h2>
            {recipientProfile && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contactName')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{recipientProfile.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('hospital')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{recipientProfile.hospitalName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phone')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{recipientProfile.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('city')}</label>
                    <p className="mt-1 text-gray-900 dark:text-white">{recipientProfile.city}</p>
                  </div>
                  {recipientProfile.patientCondition && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('patientCondition')}</label>
                      <p className="mt-1 text-gray-900 dark:text-white">{recipientProfile.patientCondition}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;