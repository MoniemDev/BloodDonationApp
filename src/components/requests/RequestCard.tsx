import React from 'react';
import { MapPin, Clock, Droplet, Building2, AlertTriangle, Users } from 'lucide-react';
import { BloodRequest } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface RequestCardProps {
  request: BloodRequest;
  showAcceptButton?: boolean;
  acceptedCount?: number;
  onAccept?: () => void;
  isDonor?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({ 
  request, 
  showAcceptButton = false, 
  acceptedCount = 0,
  onAccept,
  isDonor = false 
}) => {
  const { t } = useTheme();
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400';
      case 'critical': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    return urgency === 'critical' ? <AlertTriangle className="h-4 w-4" /> : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const hasUserAccepted = request.acceptedBy?.includes('current-user-id') || false; // This would be dynamic in a real app

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
            <Droplet className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-600">{request.bloodType}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {request.unitsNeeded} {request.unitsNeeded === 1 ? t('unit') : t('units')} {t('unitsNeeded2')}
            </p>
          </div>
        </div>
        
        <div className={`inline-flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgencyLevel)}`}>
          {getUrgencyIcon(request.urgencyLevel)}
          <span className="capitalize">{t(request.urgencyLevel)}</span>
        </div>
      </div>

      {/* Hospital Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">{request.hospitalName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">{request.city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">{t('posted')} {formatDate(request.createdAt)}</span>
        </div>
      </div>

      {/* Patient Notes */}
      {request.patientNotes && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">{request.patientNotes}</p>
        </div>
      )}

      {/* Contact Info */}
      <div className="border-t pt-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{t('contact')}:</span> {request.recipientName}
        </p>
      </div>

      {/* Acceptance Count */}
      {acceptedCount > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            {acceptedCount} {t('donorsResponded')}
          </span>
        </div>
      )}

      {/* Action Button */}
      {showAcceptButton && isDonor && (
        <button
          onClick={onAccept}
          disabled={hasUserAccepted}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            hasUserAccepted
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600'
          }`}
        >
          {hasUserAccepted ? t('alreadyResponded') : t('willingToDonate')}
        </button>
      )}
    </div>
  );
};