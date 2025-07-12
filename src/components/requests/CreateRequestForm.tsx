import React, { useState } from 'react';
import { Heart, Droplet, MapPin, Building2, FileText, AlertTriangle } from 'lucide-react';
import { BloodType, UrgencyLevel } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

interface CreateRequestFormProps {
  onComplete: () => void;
}

export const CreateRequestForm: React.FC<CreateRequestFormProps> = ({ onComplete }) => {
  const { t } = useTheme();
  const { recipientProfile } = useAuth();
  const { createRequest } = useData();

  const [formData, setFormData] = useState({
    bloodType: 'O+' as BloodType,
    unitsNeeded: 1,
    urgencyLevel: 'medium' as UrgencyLevel,
    patientNotes: ''
  });

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels: { value: UrgencyLevel; label: string; color: string }[] = [
    { value: 'low', label: t('lowPriority'), color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-600' },
    { value: 'medium', label: t('mediumPriority'), color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-600' },
    { value: 'high', label: t('highPriority'), color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-600' },
    { value: 'critical', label: t('criticalEmergency'), color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientProfile) return;

    createRequest({
      recipientId: recipientProfile.userId,
      recipientName: recipientProfile.name,
      hospitalName: recipientProfile.hospitalName,
      city: recipientProfile.city,
      ...formData
    });

    onComplete();
  };

  if (!recipientProfile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{t('completeProfileFirst')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 m-4">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Heart className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('createBloodRequest')}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{t('helpConnectDonors2')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hospital Info Display */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">{recipientProfile.hospitalName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{recipientProfile.city}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Blood Type */}
          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('bloodTypeNeeded')}
            </label>
            <div className="relative">
              <Droplet className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value as BloodType })}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Units Needed */}
          <div>
            <label htmlFor="unitsNeeded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('unitsNeeded')}
            </label>
            <input
              id="unitsNeeded"
              type="number"
              min="1"
              max="10"
              value={formData.unitsNeeded}
              onChange={(e) => setFormData({ ...formData, unitsNeeded: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Urgency Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('urgencyLevel')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {urgencyLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, urgencyLevel: level.value })}
                className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.urgencyLevel === level.value
                    ? level.color
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  {level.value === 'critical' && <AlertTriangle className="h-4 w-4" />}
                  <span>{level.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Notes */}
        <div>
          <label htmlFor="patientNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('additionalNotes')}
          </label>
          <div className="relative">
            <FileText className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="patientNotes"
              value={formData.patientNotes}
              onChange={(e) => setFormData({ ...formData, patientNotes: e.target.value })}
              rows={4}
              className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={t('additionalNotesDesc')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 dark:bg-red-700 text-white py-3 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium flex items-center justify-center space-x-2 rtl:space-x-reverse"
        >
          <Heart className="h-5 w-5" />
          <span>{t('createRequest')}</span>
        </button>
      </form>
    </div>
  );
};