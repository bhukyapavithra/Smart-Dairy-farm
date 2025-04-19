import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cog as Cow, Mail, Lock, User, Phone, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'farmer' | 'customer' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: 'farmer' | 'customer') => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      showToast('Please select a user type', 'error');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }, userType);
      
      showToast('Registration successful!', 'success');
      
      // Redirect to the appropriate dashboard
      navigate(userType === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Failed to register. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center">
            <Cow className="h-10 w-10 text-farm-green-600" />
            <span className="ml-2 text-2xl font-bold text-farm-green-800">FarmDirect</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-farm-green-600 hover:text-farm-green-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {/* Step indicator */}
        <div className="flex items-center justify-center mt-8">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-farm-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-farm-green-600' : 'bg-gray-200'}`}></div>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-farm-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            2
          </div>
        </div>
        
        {step === 1 ? (
          <div className="mt-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">I want to register as a:</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleUserTypeSelect('farmer')}
                className="group relative flex items-center justify-between p-6 border-2 border-gray-300 rounded-lg hover:border-farm-green-600 focus:outline-none focus:ring-2 focus:ring-farm-green-500 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center">
                    <Cow className="h-6 w-6 text-farm-green-600" />
                  </div>
                  <div className="ml-4 text-left">
                    <h4 className="text-lg font-medium text-gray-900">Farmer</h4>
                    <p className="text-sm text-gray-500">Sell your dairy products directly to customers</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-farm-green-600" />
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('customer')}
                className="group relative flex items-center justify-between p-6 border-2 border-gray-300 rounded-lg hover:border-farm-green-600 focus:outline-none focus:ring-2 focus:ring-farm-green-500 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-farm-green-600" />
                  </div>
                  <div className="ml-4 text-left">
                    <h4 className="text-lg font-medium text-gray-900">Customer</h4>
                    <p className="text-sm text-gray-500">Buy fresh dairy products from local farmers</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-farm-green-600" />
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {userType === 'farmer' ? 'Farmer Information' : 'Personal Information'}
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                    placeholder={userType === 'farmer' ? 'Farm or Farmer Name' : 'Full Name'}
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                    placeholder="Phone number"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-farm-green-600 focus:ring-farm-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-farm-green-600 hover:text-farm-green-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-farm-green-600 hover:text-farm-green-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="group relative w-1/4 flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-3/4 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  </span>
                ) : null}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;