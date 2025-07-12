import React, { createContext, useContext, useState, useEffect } from 'react';
import { BloodRequest, DonationAcceptance } from '../types';

interface DataContextType {
  requests: BloodRequest[];
  acceptances: DonationAcceptance[];
  createRequest: (request: Omit<BloodRequest, 'id' | 'createdAt' | 'status' | 'acceptedBy'>) => void;
  acceptRequest: (requestId: string, donorData: { id: string; name: string; phone: string }) => void;
  getRequestsByRecipient: (recipientId: string) => BloodRequest[];
  getMatchingRequests: (bloodType: string, city: string) => BloodRequest[];
  getAcceptancesByRequest: (requestId: string) => DonationAcceptance[];
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [acceptances, setAcceptances] = useState<DonationAcceptance[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedRequests = localStorage.getItem('bloodRequests');
    const storedAcceptances = localStorage.getItem('donationAcceptances');

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
    if (storedAcceptances) {
      setAcceptances(JSON.parse(storedAcceptances));
    }
  }, []);

  const createRequest = (requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'status' | 'acceptedBy'>) => {
    const newRequest: BloodRequest = {
      ...requestData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'active',
      acceptedBy: []
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));
  };

  const acceptRequest = (requestId: string, donorData: { id: string; name: string; phone: string }) => {
    const acceptance: DonationAcceptance = {
      id: Math.random().toString(36).substr(2, 9),
      requestId,
      donorId: donorData.id,
      donorName: donorData.name,
      donorPhone: donorData.phone,
      acceptedAt: new Date().toISOString()
    };

    const updatedAcceptances = [...acceptances, acceptance];
    setAcceptances(updatedAcceptances);
    localStorage.setItem('donationAcceptances', JSON.stringify(updatedAcceptances));

    // Update the request's acceptedBy array
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, acceptedBy: [...(req.acceptedBy || []), donorData.id] }
        : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));
  };

  const getRequestsByRecipient = (recipientId: string) => {
    return requests.filter(req => req.recipientId === recipientId);
  };

  const getMatchingRequests = (bloodType: string, city: string) => {
    return requests.filter(req => 
      req.status === 'active' && 
      req.bloodType === bloodType && 
      req.city.toLowerCase() === city.toLowerCase()
    );
  };

  const getAcceptancesByRequest = (requestId: string) => {
    return acceptances.filter(acc => acc.requestId === requestId);
  };

  return (
    <DataContext.Provider value={{
      requests,
      acceptances,
      createRequest,
      acceptRequest,
      getRequestsByRecipient,
      getMatchingRequests,
      getAcceptancesByRequest
    }}>
      {children}
    </DataContext.Provider>
  );
};