import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, Truck, DollarSign, Cog as Cow, Milk, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch featured products
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter featured products
      const featured = mockProducts.filter(product => product.isFeatured).slice(0, 4);
      setFeaturedProducts(featured);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Farm with cows grazing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Fresh Milk. <br/>
              <span className="text-farm-amber-400">Directly From Farmers.</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Connect with local dairy farmers and get pure, unpasteurized milk and dairy products delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/search" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-farm-green-900 bg-white hover:bg-gray-100 transition-colors"
              >
                Find Nearby Farms
                <Search className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 transition-colors"
              >
                Join as a Farmer
                <Cow className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Farm Direct?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how you access dairy products, supporting local farmers and ensuring you get the freshest milk possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-farm-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center mb-4">
                <Milk className="h-6 w-6 text-farm-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pure & Fresh</h3>
              <p className="text-gray-600">
                Get chemical-free, unpasteurized milk directly from the source, preserving all natural nutrients.
              </p>
            </div>
            
            <div className="bg-farm-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-farm-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All our partner farms follow strict quality standards and ethical farming practices.
              </p>
            </div>
            
            <div className="bg-farm-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-farm-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Delivery</h3>
              <p className="text-gray-600">
                Find farms near you for quick delivery or pickup, ensuring maximum freshness.
              </p>
            </div>
            
            <div className="bg-farm-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-farm-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-farm-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Farmers</h3>
              <p className="text-gray-600">
                Farmers receive fair prices for their products, strengthening the local economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-lg text-gray-600">
                Discover the finest dairy products from local farms
              </p>
            </div>
            <Link 
              to="/search" 
              className="text-farm-green-600 hover:text-farm-green-700 flex items-center font-medium"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} loading={isLoading} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Getting fresh milk directly from local farmers is simple with our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-farm-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-farm-green-600" />
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-farm-green-100">
                  <div className="absolute right-0 -top-1 w-3 h-3 border-t-2 border-r-2 border-farm-green-100 transform rotate-45"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Local Farms</h3>
              <p className="text-gray-600">
                Search for dairy farms near your location using our map-based search.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-farm-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Milk className="h-8 w-8 text-farm-green-600" />
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-farm-green-100">
                  <div className="absolute right-0 -top-1 w-3 h-3 border-t-2 border-r-2 border-farm-green-100 transform rotate-45"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Products</h3>
              <p className="text-gray-600">
                Browse the available milk and dairy products and add them to your cart.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-farm-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-farm-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get it Delivered</h3>
              <p className="text-gray-600">
                Arrange pickup or delivery and enjoy fresh farm products at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-farm-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to taste the difference?</h2>
              <p className="text-lg text-farm-green-100 mb-6">
                Join thousands of customers who enjoy fresh milk delivered directly from local farms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/search" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-farm-green-900 bg-white hover:bg-gray-100 transition-colors"
                >
                  Find Farms Near You
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-farm-green-100 text-base font-medium rounded-md text-white hover:bg-farm-green-600 transition-colors"
                >
                  Create an Account
                </Link>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <img 
                src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Milk bottles" 
                className="h-64 w-full lg:w-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;