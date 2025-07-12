import React, { useState } from 'react';
import { Heart, MapPin, Droplet, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RequestCard } from '../requests/RequestCard';
import { BloodType, UrgencyLevel } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const DonorDashboard: React.FC = () => {
  const { t } = useTheme();
  const { donorProfile } = useAuth();
  const { getMatchingRequests, acceptRequest } = useData();
  const [filters, setFilters] = useState({
    urgency: '' as UrgencyLevel | '',
    showOnlyMyCity: true
  });

  if (!donorProfile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{t('completeProfileFirst')}</p>
      </div>
    );
  }

  const allMatchingRequests = getMatchingRequests(donorProfile.bloodType, donorProfile.city);
  
  const filteredRequests = allMatchingRequests.filter(request => {
    if (filters.urgency && request.urgencyLevel !== filters.urgency) {
      return false;
    }
    if (filters.showOnlyMyCity && request.city.toLowerCase() !== donorProfile.city.toLowerCase()) {
      return false;
    }
    return true;
  });

  const handleAcceptRequest = (requestId: string) => {
    acceptRequest(requestId, {
      id: donorProfile.userId,
      name: donorProfile.name,
      phone: donorProfile.phone
    });
  };

  const urgencyLevels: UrgencyLevel[] = ['low', 'medium', 'high', 'critical'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
            <Heart className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('welcomeBack')}, {donorProfile.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t('readyToSave')}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Droplet className="h-5 w-5 text-red-600" />
            <span className="font-medium text-gray-900 dark:text-white">{t('bloodType')}: {donorProfile.bloodType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white">{t('location')}: {donorProfile.city}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${donorProfile.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-gray-900 dark:text-white">{donorProfile.isAvailable ? t('available') : t('notAvailable')}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('filterRequests')}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('urgencyLevel2')}
            </label>
            <select
              id="urgency"
              value={filters.urgency}
              onChange={(e) => setFilters({ ...filters, urgency: e.target.value as UrgencyLevel | '' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">{t('allUrgencyLevels')}</option>
              {urgencyLevels.map(level => (
                <option key={level} value={level} className="capitalize">{t(level)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <input
              id="showOnlyMyCity"
              type="checkbox"
              checked={filters.showOnlyMyCity}
              onChange={(e) => setFilters({ ...filters, showOnlyMyCity: e.target.checked })}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="showOnlyMyCity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('showOnlyMyCity')}
            </label>
          </div>
        </div>
      </div>

      {/* Matching Requests */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('matchingRequests')} ({filteredRequests.length})
          </h2>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('noMatchingRequests')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {allMatchingRequests.length === 0 
                ? t('noRequestsDesc')
                : t('noRequestsFilters')
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                showAcceptButton={true}
                isDonor={true}
                onAccept={() => handleAcceptRequest(request.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};