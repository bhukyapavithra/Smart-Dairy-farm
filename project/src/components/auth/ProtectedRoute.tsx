import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'farmer' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType 
}) => {
  const { isAuthenticated, userType: currentUserType, isLoading } = useAuth();
  
  // If still loading auth state, show loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-farm-green-600"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If userType is specified and doesn't match, redirect to appropriate dashboard
  if (userType && currentUserType !== userType) {
    const redirectPath = currentUserType === 'farmer' 
      ? '/farmer/dashboard' 
      : '/customer/dashboard';
    
    return <Navigate to={redirectPath} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;