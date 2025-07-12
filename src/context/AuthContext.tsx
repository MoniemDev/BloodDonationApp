import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DonorProfile, RecipientProfile } from '../types';

interface AuthContextType {
  user: User | null;
  donorProfile: DonorProfile | null;
  recipientProfile: RecipientProfile | null;
  login: (email: string, password: string, role: 'donor' | 'recipient') => Promise<boolean>;
  register: (email: string, password: string, role: 'donor' | 'recipient') => Promise<boolean>;
  logout: () => void;
  updateDonorProfile: (profile: Omit<DonorProfile, 'id' | 'userId'>) => void;
  updateRecipientProfile: (profile: Omit<RecipientProfile, 'id' | 'userId'>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [donorProfile, setDonorProfile] = useState<DonorProfile | null>(null);
  const [recipientProfile, setRecipientProfile] = useState<RecipientProfile | null>(null);

  useEffect(() => {
    // Load user data from localStorage on app start
    const storedUser = localStorage.getItem('user');
    const storedDonorProfile = localStorage.getItem('donorProfile');
    const storedRecipientProfile = localStorage.getItem('recipientProfile');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedDonorProfile) {
      setDonorProfile(JSON.parse(storedDonorProfile));
    }
    if (storedRecipientProfile) {
      setRecipientProfile(JSON.parse(storedRecipientProfile));
    }
  }, []);

  const login = async (email: string, password: string, role: 'donor' | 'recipient'): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        profileCompleted: false
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, role: 'donor' | 'recipient'): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        profileCompleted: false
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setDonorProfile(null);
    setRecipientProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('donorProfile');
    localStorage.removeItem('recipientProfile');
  };

  const updateDonorProfile = (profile: Omit<DonorProfile, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newProfile: DonorProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
    };
    
    setDonorProfile(newProfile);
    setUser({ ...user, profileCompleted: true });
    localStorage.setItem('donorProfile', JSON.stringify(newProfile));
    localStorage.setItem('user', JSON.stringify({ ...user, profileCompleted: true }));
  };

  const updateRecipientProfile = (profile: Omit<RecipientProfile, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newProfile: RecipientProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
    };
    
    setRecipientProfile(newProfile);
    setUser({ ...user, profileCompleted: true });
    localStorage.setItem('recipientProfile', JSON.stringify(newProfile));
    localStorage.setItem('user', JSON.stringify({ ...user, profileCompleted: true }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      donorProfile,
      recipientProfile,
      login,
      register,
      logout,
      updateDonorProfile,
      updateRecipientProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};