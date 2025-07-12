import React from 'react';
import { Heart, Plus, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RequestCard } from '../requests/RequestCard';
import { useTheme } from '../../context/ThemeContext';

interface RecipientDashboardProps {
  onCreateRequest: () => void;
}

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({ onCreateRequest }) => {
  const { t } = useTheme();
  const { recipientProfile } = useAuth();
  const { getRequestsByRecipient, getAcceptancesByRequest } = useData();

  if (!recipientProfile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{t('completeProfileFirst')}</p>
      </div>
    );
  }

  const myRequests = getRequestsByRecipient(recipientProfile.userId);
  const activeRequests = myRequests.filter(req => req.status === 'active');
  const fulfilledRequests = myRequests.filter(req => req.status === 'fulfilled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('welcome')}, {recipientProfile.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{recipientProfile.hospitalName}</p>
            </div>
          </div>
          
          <button
            onClick={onCreateRequest}
            className="flex items-center space-x-2 rtl:space-x-reverse bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>{t('newRequest')}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-400">{t('activeRequests')}</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeRequests.length}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-900 dark:text-green-400">{t('fulfilled')}</span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fulfilledRequests.length}</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-900 dark:text-purple-400">{t('totalRequests')}</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{myRequests.length}</p>
          </div>
        </div>
      </div>

      {/* Active Requests */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('activeRequests')} ({activeRequests.length})
        </h2>

        {activeRequests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noActiveRequests')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('noActiveRequestsDesc')}
            </p>
            <button
              onClick={onCreateRequest}
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>{t('createFirstRequest')}</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {activeRequests.map((request) => {
              const acceptances = getAcceptancesByRequest(request.id);
              return (
                <div key={request.id} className="space-y-4">
                  <RequestCard
                    request={request}
                    acceptedCount={acceptances.length}
                  />
                  
                  {/* Acceptances */}
                  {acceptances.length > 0 && (
                   <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 ml-4">
                     <h4 className="font-medium text-green-900 dark:text-green-400 mb-3">
                       {t('donorsWhoResponded')} ({acceptances.length}):
                      </h4>
                      <div className="space-y-2">
                        {acceptances.map((acceptance) => (
                         <div key={acceptance.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
                            <div>
                             <p className="font-medium text-gray-900 dark:text-white">{acceptance.donorName}</p>
                             <p className="text-sm text-gray-600 dark:text-gray-400">
                               {t('respondedOn')} {new Date(acceptance.acceptedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                             <p className="font-medium text-green-600 dark:text-green-400">{acceptance.donorPhone}</p>
                             <p className="text-sm text-gray-600 dark:text-gray-400">{t('contactDirectly')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Request History */}
      {fulfilledRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('requestHistory')} ({fulfilledRequests.length})
          </h2>
          <div className="grid gap-6">
            {fulfilledRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                acceptedCount={getAcceptancesByRequest(request.id).length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};