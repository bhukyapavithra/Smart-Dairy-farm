import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Cog as Cow, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, userType, logout, currentUser } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Cow className="h-8 w-8 text-farm-green-600" />
              <span className="ml-2 text-xl font-bold text-farm-green-800">FarmDirect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-farm-green-600 font-medium">Home</Link>
            <Link to="/search" className="text-gray-700 hover:text-farm-green-600 font-medium">Find Farms</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={userType === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'} 
                  className="text-gray-700 hover:text-farm-green-600 font-medium">
                  Dashboard
                </Link>
                
                {userType === 'customer' && (
                  <Link to="/customer/checkout" className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-farm-green-600" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-farm-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center text-gray-700 focus:outline-none">
                    <User className="h-6 w-6" />
                    <span className="ml-2">{currentUser?.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link to={`/${userType}/profile`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-farm-green-600 font-medium">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-farm-green-600 text-white px-4 py-2 rounded-md hover:bg-farm-green-700 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && userType === 'customer' && (
              <Link to="/customer/checkout" className="relative mr-4">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-farm-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-farm-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
            <Link to="/search" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Find Farms</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={userType === 'farmer' ? '/farmer/dashboard' : '/customer/dashboard'} 
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Dashboard
                </Link>
                <Link to={`/${userType}/profile`} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 bg-farm-green-600 text-white rounded-md hover:bg-farm-green-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;