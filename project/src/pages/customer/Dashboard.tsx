import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Clock, ChevronRight, Package, Heart, Settings, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Order, Product } from '../../types';
import { mockProducts } from '../../data/mockData';

const CustomerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders
      const mockOrders: Order[] = [
        {
          id: '1',
          customerId: currentUser?.id || '',
          customerName: currentUser?.name || '',
          farmerId: 'f1',
          items: [
            {
              productId: '1',
              productName: 'Organic Whole Milk',
              quantity: 2,
              unitPrice: 4.99,
              subtotal: 9.98
            },
            {
              productId: '3',
              productName: 'Fresh Cheese',
              quantity: 1,
              unitPrice: 6.99,
              subtotal: 6.99
            }
          ],
          status: 'completed',
          total: 16.97,
          deliveryAddress: '123 Main St, Anytown',
          paymentMethod: 'card',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          customerId: currentUser?.id || '',
          customerName: currentUser?.name || '',
          farmerId: 'f2',
          items: [
            {
              productId: '4',
              productName: 'Natural Yogurt',
              quantity: 3,
              unitPrice: 3.49,
              subtotal: 10.47
            }
          ],
          status: 'processing',
          total: 10.47,
          deliveryAddress: '123 Main St, Anytown',
          paymentMethod: 'cash',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      // Get random products for recently viewed
      const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
      const recent = shuffled.slice(0, 4);
      
      setOrders(mockOrders);
      setRecentlyViewed(recent);
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, [currentUser]);
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60vh] items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-farm-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {currentUser?.name}!</p>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="font-medium text-gray-900">Dashboard Menu</div>
              </div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center px-4 py-3 text-farm-green-600 bg-farm-green-50 border-l-4 border-farm-green-600">
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  <span className="truncate">My Orders</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50">
                  <Heart className="mr-3 h-5 w-5 text-gray-400" />
                  <span className="truncate">Favorite Farms</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50">
                  <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                  <span className="truncate">Saved Addresses</span>
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50">
                  <Settings className="mr-3 h-5 w-5 text-gray-400" />
                  <span className="truncate">Settings</span>
                </a>
              </nav>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link to="#" className="text-farm-green-600 hover:text-farm-green-700 text-sm font-medium flex items-center">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">You don't have any orders yet.</p>
                    <Link
                      to="/search"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${
                            order.status === 'completed' ? 'bg-green-100' :
                            order.status === 'processing' ? 'bg-blue-100' :
                            order.status === 'confirmed' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <Package className={`h-6 w-6 ${
                              order.status === 'completed' ? 'text-green-600' :
                              order.status === 'processing' ? 'text-blue-600' :
                              order.status === 'confirmed' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              Order #{order.id}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </div>
                          <Link
                            to={`#order-${order.id}`}
                            className="mt-2 inline-flex items-center text-xs text-farm-green-600 hover:text-farm-green-700"
                          >
                            View Details <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        <p>Items: {order.items.map(item => item.productName).join(', ')}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Recently Viewed Products */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
                <Link to="/search" className="text-farm-green-600 hover:text-farm-green-700 text-sm font-medium flex items-center">
                  Browse More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recentlyViewed.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/products/${product.id}`}
                      className="group"
                    >
                      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-w-1 aspect-h-1 relative">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-farm-green-600">{product.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-farm-amber-500 fill-current" />
                          <span className="ml-1 text-xs text-gray-500">4.8</span>
                          <span className="mx-1 text-gray-300">•</span>
                          <span className="text-xs text-gray-500">{product.farmerName}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-farm-green-700">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;