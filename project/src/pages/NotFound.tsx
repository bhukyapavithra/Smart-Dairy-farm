import React from 'react';
import { Link } from 'react-router-dom';
import { Cog as Cow, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center">
          <Cow className="h-16 w-16 text-farm-green-600" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base text-gray-600">
          Sorry, we couldn't find the page you're looking for. The cow might have wandered off with it.
        </p>
        <div className="mt-10">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Homepage
          </Link>
        </div>
        <div className="mt-6 flex justify-center">
          <img 
            src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Cow in field" 
            className="rounded-lg shadow-md w-full max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;