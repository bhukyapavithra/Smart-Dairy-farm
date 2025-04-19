import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, TrendingUp, Truck, Users, CreditCard, ChevronRight, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Order, Product } from '../../types';
import { mockProducts } from '../../data/mockData';

const FarmerDashboard: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    pendingOrders: 0,
    customers: 0,
    revenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders for this farmer
      const mockOrders: Order[] = [
        {
          id: '1',
          customerId: 'c1',
          customerName: 'Jane Smith',
          farmerId: currentUser?.id || '',
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
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          customerId: 'c2',
          customerName: 'John Doe',
          farmerId: currentUser?.id || '',
          items: [
            {
              productId: '4',
              productName: 'Natural Yogurt',
              quantity: 3,
              unitPrice: 3.49,
              subtotal: 10.47
            }
          ],
          status: 'pending',
          total: 10.47,
          deliveryAddress: '456 Oak St, Somewhere',
          paymentMethod: 'cash',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          customerId: 'c3',
          customerName: 'Alice Johnson',
          farmerId: currentUser?.id || '',
          items: [
            {
              productId: '2',
              productName: 'Organic Skim Milk',
              quantity: 1,
              unitPrice: 4.49,
              subtotal: 4.49
            }
          ],
          status: 'processing',
          total: 4.49,
          deliveryAddress: '789 Pine St, Elsewhere',
          paymentMethod: 'card',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      // Get products from this farmer
      const farmerProducts = mockProducts.filter(p => p.farmerId === currentUser?.id).slice(0, 5);
      
      // Calculate stats
      const totalSales = mockOrders.length;
      const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
      const uniqueCustomers = new Set(mockOrders.map(o => o.customerId)).size;
      const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
      
      setOrders(mockOrders);
      setProducts(farmerProducts);
      setStats({
        totalSales,
        pendingOrders,
        customers: uniqueCustomers,
        revenue: totalRevenue
      });
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
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {(userProfile as any)?.farmName || currentUser?.name}!
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-farm-green-100 text-farm-green-600">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-semibold text-gray-900">{stats.totalSales}</h3>
              </div>
            </div>
            <div className="mt-2 text-xs text-farm-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>12% increase from last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Package className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</h3>
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-600">
              <span>Requires your attention</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <h3 className="text-2xl font-semibold text-gray-900">{stats.customers}</h3>
              </div>
            </div>
            <div className="mt-2 text-xs text-purple-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>5 new customers this week</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-semibold text-gray-900">${stats.revenue.toFixed(2)}</h3>
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>8% increase from last month</span>
            </div>
          </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link to="/farmer/orders" className="text-farm-green-600 hover:text-farm-green-700 text-sm font-medium flex items-center">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">You don't have any orders yet.</p>
                  </div>
                ) : (
                  orders.slice(0, 5).map(order => (
                    <div key={order.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${
                            order.status === 'completed' ? 'bg-green-100' :
                            order.status === 'processing' ? 'bg-blue-100' :
                            order.status === 'confirmed' ? 'bg-yellow-100' :
                            'bg-red-100'
                          }`}>
                            <Package className={`h-6 w-6 ${
                              order.status === 'completed' ? 'text-green-600' :
                              order.status === 'processing' ? 'text-blue-600' :
                              order.status === 'confirmed' ? 'text-yellow-600' :
                              'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              Order #{order.id}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Customer: {order.customerName}
                            </div>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
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
                          <button
                            className={`mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${
                              order.status === 'pending' ? 'text-white bg-farm-green-600 hover:bg-farm-green-700' :
                              'text-farm-green-700 bg-farm-green-100 hover:bg-farm-green-200'
                            }`}
                          >
                            {order.status === 'pending' ? 'Accept Order' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
                <Link to="/farmer/products" className="text-farm-green-600 hover:text-farm-green-700 text-sm font-medium flex items-center">
                  Manage
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-200">
                {products.map(product => (
                  <div key={product.id} className="p-4 hover:bg-gray-50 flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-xs text-gray-500">${product.price.toFixed(2)} per {product.unit}</p>
                    </div>
                    <div className="ml-4 text-xs text-gray-500">
                      {product.quantity} available
                    </div>
                  </div>
                ))}
                
                <div className="p-4">
                  <Link
                    to="/farmer/products/new"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
                  >
                    + Add New Product
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Status</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-farm-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Scheduled for today</span>
                  </div>
                  <span className="text-sm font-medium">2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-700">Ready for pickup</span>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-700">Scheduled for tomorrow</span>
                  </div>
                  <span className="text-sm font-medium">5</span>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    to="/farmer/orders"
                    className="text-farm-green-600 hover:text-farm-green-700 text-sm font-medium flex items-center"
                  >
                    View Delivery Schedule
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;