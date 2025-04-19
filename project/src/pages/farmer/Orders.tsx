import React, { useState, useEffect } from 'react';
import { Filter, Search, Truck, Calendar, Package, Clock, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Order } from '../../types';

const FarmerOrders: React.FC = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  useEffect(() => {
    const loadOrders = async () => {
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
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
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
        },
        {
          id: '4',
          customerId: 'c4',
          customerName: 'Bob Williams',
          farmerId: currentUser?.id || '',
          items: [
            {
              productId: '5',
              productName: 'Organic Butter',
              quantity: 2,
              unitPrice: 5.99,
              subtotal: 11.98
            }
          ],
          status: 'confirmed',
          total: 11.98,
          deliveryAddress: '101 Elm St, Nowhere',
          paymentMethod: 'card',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    };
    
    loadOrders();
  }, [currentUser]);
  
  useEffect(() => {
    // Apply filters whenever search term or status changes
    let filtered = [...orders];
    
    if (searchTerm) {
      filtered = filtered.filter(
        order => 
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.includes(searchTerm) ||
          order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (dateFilter === 'today') {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= today;
        });
      } else if (dateFilter === 'week') {
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= lastWeek;
        });
      } else if (dateFilter === 'month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= lastMonth;
        });
      }
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, dateFilter, orders]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is already handled in the useEffect
  };
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };
  
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Update filtered orders as well
    setFilteredOrders(prevFiltered => 
      prevFiltered.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
    
    showToast(`Order #${orderId} updated to ${newStatus}`, 'success');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="mt-2 text-gray-600">Manage and track customer orders</p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-farm-green-500 focus:border-farm-green-500 sm:text-sm"
                placeholder="Search by customer or product"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500 sm:text-sm rounded-md"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
              >
                Filter
              </button>
              
              {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDateFilter('all');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-green-600"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">No orders found matching your criteria.</p>
              <p className="text-gray-500">
                {orders.length === 0 
                  ? "You haven't received any orders yet."
                  : "Try adjusting your filters to see more results."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <div key={order.id} className={`overflow-hidden ${expandedOrderId === order.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${
                          order.status === 'completed' ? 'bg-green-100' :
                          order.status === 'processing' ? 'bg-blue-100' :
                          order.status === 'confirmed' ? 'bg-yellow-100' :
                          order.status === 'cancelled' ? 'bg-red-100' :
                          'bg-gray-100'
                        }`}>
                          <Package className={`h-6 w-6 ${
                            order.status === 'completed' ? 'text-green-600' :
                            order.status === 'processing' ? 'text-blue-600' :
                            order.status === 'confirmed' ? 'text-yellow-600' :
                            order.status === 'cancelled' ? 'text-red-600' :
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
                          <div className="mt-1 text-sm text-gray-500">
                            Customer: {order.customerName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <button
                          className="mt-2 text-farm-green-600 flex items-center text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOrderExpand(order.id);
                          }}
                        >
                          {expandedOrderId === order.id ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              View Details
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Order Details */}
                  {expandedOrderId === order.id && (
                    <div className="px-6 pb-6">
                      <div className="mt-2 mb-4 border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.productId} className="flex justify-between text-sm">
                              <div>
                                <span className="font-medium">{item.quantity}x</span> {item.productName}
                              </div>
                              <div className="text-gray-700">${item.subtotal.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Information</h4>
                          <p className="text-sm text-gray-600">
                            Address: {order.deliveryAddress}
                          </p>
                          <p className="text-sm text-gray-600">
                            Payment Method: {order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
                          <p className="text-sm text-gray-600">
                            Name: {order.customerName}
                          </p>
                          <button className="text-farm-green-600 text-sm mt-1">
                            View Customer Details
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-sm font-medium text-gray-900">Total: ${order.total.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Start Processing
                            </button>
                          )}
                          
                          {order.status === 'processing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                              <Truck className="mr-1 h-4 w-4" />
                              Mark as Delivered
                            </button>
                          )}
                          
                          {(order.status === 'completed' || order.status === 'cancelled') && (
                            <button
                              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Print Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;