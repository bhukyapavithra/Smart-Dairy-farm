import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, FarmerProfile, CustomerProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: FarmerProfile | CustomerProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, userType: 'farmer' | 'customer') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userType: 'farmer' | 'customer' | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock authentication for the MVP
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FarmerProfile | CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'farmer' | 'customer' | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('farmDirect_user');
    const savedUserType = localStorage.getItem('farmDirect_userType');
    
    if (savedUser && savedUserType) {
      setCurrentUser(JSON.parse(savedUser));
      setUserType(savedUserType as 'farmer' | 'customer');
      
      // Mock profile fetch
      const mockProfile = savedUserType === 'farmer' 
        ? {
            farmName: 'Green Pastures Dairy',
            location: { lat: 40.7128, lng: -74.0060 },
            description: 'Family-owned dairy farm with grass-fed cows',
            founded: '1982',
            contactPhone: '555-123-4567'
          } as FarmerProfile
        : {
            address: '123 Main St, Anytown',
            preferredPaymentMethod: 'credit_card',
            deliveryInstructions: 'Leave at the door'
          } as CustomerProfile;
      
      setUserProfile(mockProfile);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll create a mock user based on email
    const isFarmer = email.includes('farmer');
    const user: User = {
      id: '123',
      name: isFarmer ? 'John Farmer' : 'Jane Customer',
      email,
      phone: '555-123-4567',
      createdAt: new Date().toISOString(),
    };
    
    const type = isFarmer ? 'farmer' : 'customer';
    
    // Set user in state and localStorage
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem('farmDirect_user', JSON.stringify(user));
    localStorage.setItem('farmDirect_userType', type);
    
    // Mock profile
    const mockProfile = isFarmer
      ? {
          farmName: 'Green Pastures Dairy',
          location: { lat: 40.7128, lng: -74.0060 },
          description: 'Family-owned dairy farm with grass-fed cows',
          founded: '1982',
          contactPhone: '555-123-4567'
        } as FarmerProfile
      : {
          address: '123 Main St, Anytown',
          preferredPaymentMethod: 'credit_card',
          deliveryInstructions: 'Leave at the door'
        } as CustomerProfile;
    
    setUserProfile(mockProfile);
    setIsLoading(false);
  };

  const register = async (userData: Partial<User>, type: 'farmer' | 'customer') => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || 'New User',
      email: userData.email || '',
      phone: userData.phone || '',
      createdAt: new Date().toISOString(),
    };
    
    // Set user in state and localStorage
    setCurrentUser(newUser);
    setUserType(type);
    localStorage.setItem('farmDirect_user', JSON.stringify(newUser));
    localStorage.setItem('farmDirect_userType', type);
    
    // Create empty profile
    const emptyProfile = type === 'farmer'
      ? {
          farmName: '',
          location: { lat: 0, lng: 0 },
          description: '',
          founded: '',
          contactPhone: userData.phone || ''
        } as FarmerProfile
      : {
          address: '',
          preferredPaymentMethod: 'cash',
          deliveryInstructions: ''
        } as CustomerProfile;
    
    setUserProfile(emptyProfile);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('farmDirect_user');
    localStorage.removeItem('farmDirect_userType');
    setCurrentUser(null);
    setUserProfile(null);
    setUserType(null);
  };

  const value = {
    currentUser,
    userProfile,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    userType
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};