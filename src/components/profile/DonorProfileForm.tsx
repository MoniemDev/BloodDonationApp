import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, Droplet } from 'lucide-react';
import { BloodType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface DonorProfileFormProps {
  onComplete: () => void;
}

export const DonorProfileForm: React.FC<DonorProfileFormProps> = ({ onComplete }) => {
  const { t } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    bloodType: 'O+' as BloodType,
    phone: '',
    city: '',
    lastDonationDate: '',
    isAvailable: true
  });

  const { updateDonorProfile } = useAuth();

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDonorProfile({
      ...formData,
      age: parseInt(formData.age)
    });
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 m-4">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <User className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('completeDonorProfile')}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{t('helpConnectDonors')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('fullName')}
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

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('age')}
            </label>
            <input
              id="age"
              type="number"
              min="18"
              max="65"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={t('yourAge')}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('gender')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'male' })}
                className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.gender === 'male'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {t('male')}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'female' })}
                className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.gender === 'female'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {t('female')}
              </button>
            </div>
          </div>

          {/* Blood Type */}
          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('bloodType')}
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
                placeholder={t('yourPhone')}
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
                placeholder={t('yourCity')}
                required
              />
            </div>
          </div>
        </div>

        {/* Last Donation Date */}
        <div>
          <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('lastDonationDate')}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="lastDonationDate"
              type="date"
              value={formData.lastDonationDate}
              onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
              className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center space-x-3">
          <input
            id="isAvailable"
            type="checkbox"
            checked={formData.isAvailable}
            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
           className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
          />
         <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 dark:text-gray-300">
           {t('currentlyAvailable')}
          </label>
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