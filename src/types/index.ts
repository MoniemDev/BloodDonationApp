export type UserRole = 'donor' | 'recipient';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type RequestStatus = 'active' | 'fulfilled' | 'expired';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profileCompleted: boolean;
}

export interface DonorProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  bloodType: BloodType;
  phone: string;
  city: string;
  lastDonationDate?: string;
  isAvailable: boolean;
}

export interface RecipientProfile {
  id: string;
  userId: string;
  name: string;
  hospitalName: string;
  phone: string;
  city: string;
  patientCondition?: string;
}

export interface BloodRequest {
  id: string;
  recipientId: string;
  recipientName: string;
  hospitalName: string;
  bloodType: BloodType;
  unitsNeeded: number;
  city: string;
  urgencyLevel: UrgencyLevel;
  patientNotes?: string;
  status: RequestStatus;
  createdAt: string;
  acceptedBy?: string[];
}

export interface DonationAcceptance {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  acceptedAt: string;
}