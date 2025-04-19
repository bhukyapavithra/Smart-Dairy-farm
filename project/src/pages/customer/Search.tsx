import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, MapPin, List, Map as MapIcon } from 'lucide-react';
import ProductGrid from '../../components/product/ProductGrid';
import Map from '../../components/location/Map';
import { Product } from '../../types';
import { mockProducts, mockFarmers } from '../../data/mockData';

type ViewMode = 'grid' | 'map';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter products based on search term and category
      let filteredProducts = [...mockProducts];
      
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(
          product => product.category === category
        );
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, [searchTerm, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const farmLocations = mockFarmers.map(farmer => ({
    id: farmer.id,
    name: farmer.farmName,
    coordinates: farmer.location
  }));

  const handleLocationSelect = (farmerId: string) => {
    // Filter products by farm
    setFilterOpen(false);
    const farmProducts = mockProducts.filter(product => product.farmerId === farmerId);
    setProducts(farmProducts);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-farm-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Find Fresh Milk Near You</h1>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <div className="flex shadow-sm">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-transparent rounded-l-md focus:ring-farm-green-500 focus:border-farm-green-500 sm:text-sm"
                  placeholder="Search for farms, products, or locations"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-farm-green-700 hover:bg-farm-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
              >
                Search
              </button>
            </div>
            
            {filterOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Category</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCategory('all')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'all'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        All Products
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('milk')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'milk'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Milk
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('cheese')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'cheese'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Cheese
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('yogurt')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'yogurt'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Yogurt
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('butter')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'butter'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Butter
                      </button>
                      <button
                        type="button"
                        onClick={() => setCategory('other')}
                        className={`px-3 py-2 text-sm rounded-md ${
                          category === 'other'
                            ? 'bg-farm-green-100 text-farm-green-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Other
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Nearby Farms</h3>
                    <div className="max-h-40 overflow-y-auto">
                      {mockFarmers.map(farmer => (
                        <button
                          key={farmer.id}
                          type="button"
                          onClick={() => handleLocationSelect(farmer.id)}
                          className="flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                        >
                          <MapPin className="h-4 w-4 text-farm-green-600 mr-2" />
                          {farmer.farmName}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setFilterOpen(false)}
                      className="text-sm font-medium text-farm-green-600 hover:text-farm-green-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoading ? 'Searching...' : `${products.length} products found`}
            </h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-farm-green-100 text-farm-green-800'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Grid view"
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md ${
                viewMode === 'map'
                  ? 'bg-farm-green-100 text-farm-green-800'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Map view"
            >
              <MapIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {viewMode === 'grid' ? (
          <ProductGrid products={products} loading={isLoading} />
        ) : (
          <div className="space-y-6">
            <Map 
              locations={farmLocations} 
              onLocationSelect={handleLocationSelect}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockFarmers.map(farmer => (
                <Link 
                  key={farmer.id}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLocationSelect(farmer.id);
                    setViewMode('grid');
                  }}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-farm-green-800">{farmer.farmName}</h3>
                  <p className="text-gray-600 text-sm mb-2">{farmer.description.substring(0, 60)}...</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>3.5 miles away</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;