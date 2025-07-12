import React, { useState } from 'react';
import { User, Building2, Phone, MapPin, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface RecipientProfileFormProps {
  onComplete: () => void;
}

export const RecipientProfileForm: React.FC<RecipientProfileFormProps> = ({ onComplete }) => {
  const { t } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    hospitalName: '',
    phone: '',
    city: '',
    patientCondition: ''
  });

  const { updateRecipientProfile } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRecipientProfile(formData);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 m-4">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Building2 className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('completeRecipientProfile')}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{t('helpDonorsFind')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('contactName')}
            </label>
            <div className="relative">
              <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('enterFullName')}
                required
              />
            </div>
          </div>

          {/* Hospital Name */}
          <div>
            <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('hospitalName')}
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="hospitalName"
                type="text"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('hospitalName')}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('phoneNumber')}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('contactNumber')}
                required
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('city')}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('hospitalCity')}
                required
              />
            </div>
          </div>
        </div>

        {/* Patient Condition */}
        <div>
          <label htmlFor="patientCondition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('patientCondition')}
          </label>
          <div className="relative">
            <FileText className="absolute left-3 rtl:right-3 rtl:left-auto top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="patientCondition"
              value={formData.patientCondition}
              onChange={(e) => setFormData({ ...formData, patientCondition: e.target.value })}
              rows={3}
              className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={t('patientConditionDesc')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 dark:bg-red-700 text-white py-3 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
        >
          {t('completeProfile')}
        </button>
      </form>
    </div>
  );
};