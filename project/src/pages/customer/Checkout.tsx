import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cash',
    deliveryOption: 'delivery',
    deliveryNotes: '',
  });
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };
  
  const handleDeliveryOptionChange = (option: string) => {
    setFormData(prev => ({ ...prev, deliveryOption: option }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    clearCart();
    setStep(3); // Success step
  };
  
  const continueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const goBackToDelivery = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };
  
  const returnToShopping = () => {
    navigate('/search');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/search" className="text-farm-green-600 hover:text-farm-green-700 flex items-center font-medium">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          {step < 3 && (
            <div className="mt-4 flex justify-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-farm-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`w-20 h-1 ${step >= 2 ? 'bg-farm-green-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-farm-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`w-20 h-1 ${step >= 3 ? 'bg-farm-green-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-farm-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
            </div>
          )}
        </div>
        
        {items.length === 0 && step < 3 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
            <Link 
              to="/search" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
                  
                  <form onSubmit={continueToPayment}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">Delivery Option</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div
                            className={`border rounded-md p-4 cursor-pointer ${
                              formData.deliveryOption === 'delivery'
                                ? 'border-farm-green-500 bg-farm-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handleDeliveryOptionChange('delivery')}
                          >
                            <div className="flex items-start">
                              <input
                                type="radio"
                                id="delivery"
                                name="deliveryOption"
                                value="delivery"
                                checked={formData.deliveryOption === 'delivery'}
                                onChange={() => {}}
                                className="h-4 w-4 mt-1 text-farm-green-600 focus:ring-farm-green-500 border-gray-300"
                              />
                              <label htmlFor="delivery" className="ml-3 cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">Home Delivery</span>
                                <span className="block text-sm text-gray-500">Delivered to your doorstep</span>
                              </label>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-md p-4 cursor-pointer ${
                              formData.deliveryOption === 'pickup'
                                ? 'border-farm-green-500 bg-farm-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handleDeliveryOptionChange('pickup')}
                          >
                            <div className="flex items-start">
                              <input
                                type="radio"
                                id="pickup"
                                name="deliveryOption"
                                value="pickup"
                                checked={formData.deliveryOption === 'pickup'}
                                onChange={() => {}}
                                className="h-4 w-4 mt-1 text-farm-green-600 focus:ring-farm-green-500 border-gray-300"
                              />
                              <label htmlFor="pickup" className="ml-3 cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">Farm Pickup</span>
                                <span className="block text-sm text-gray-500">Collect from the farm</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">Delivery Notes (Optional)</label>
                        <textarea
                          id="deliveryNotes"
                          name="deliveryNotes"
                          value={formData.deliveryNotes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                          placeholder="Any special instructions for delivery"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
                      >
                        <Truck className="mr-2 h-5 w-5" />
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {step === 2 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</p>
                        <div className="space-y-3">
                          <div
                            className={`border rounded-md p-4 cursor-pointer ${
                              formData.paymentMethod === 'cash'
                                ? 'border-farm-green-500 bg-farm-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handlePaymentMethodChange('cash')}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="cash"
                                name="paymentMethod"
                                value="cash"
                                checked={formData.paymentMethod === 'cash'}
                                onChange={() => {}}
                                className="h-4 w-4 text-farm-green-600 focus:ring-farm-green-500 border-gray-300"
                              />
                              <label htmlFor="cash" className="ml-3 cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                              </label>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-md p-4 cursor-pointer ${
                              formData.paymentMethod === 'card'
                                ? 'border-farm-green-500 bg-farm-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handlePaymentMethodChange('card')}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="card"
                                name="paymentMethod"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={() => {}}
                                className="h-4 w-4 text-farm-green-600 focus:ring-farm-green-500 border-gray-300"
                              />
                              <label htmlFor="card" className="ml-3 cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">Credit/Debit Card</span>
                              </label>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-md p-4 cursor-pointer ${
                              formData.paymentMethod === 'bank'
                                ? 'border-farm-green-500 bg-farm-green-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => handlePaymentMethodChange('bank')}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="bank"
                                name="paymentMethod"
                                value="bank"
                                checked={formData.paymentMethod === 'bank'}
                                onChange={() => {}}
                                className="h-4 w-4 text-farm-green-600 focus:ring-farm-green-500 border-gray-300"
                              />
                              <label htmlFor="bank" className="ml-3 cursor-pointer">
                                <span className="block text-sm font-medium text-gray-900">Bank Transfer</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'card' && (
                        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                                />
                                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input
                                  type="text"
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                                />
                              </div>
                              <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                <input
                                  type="text"
                                  id="cvc"
                                  placeholder="123"
                                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                              <input
                                type="text"
                                id="nameOnCard"
                                placeholder="John Doe"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-farm-green-500 focus:border-farm-green-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={goBackToDelivery}
                        className="sm:w-1/3 inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`sm:w-2/3 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 ${
                          isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-5 w-5" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {step === 3 && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 bg-farm-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-farm-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for your order. We've received your payment and will process your order shortly.
                    You will receive a confirmation email with order details.
                  </p>
                  
                  <div className="mt-8">
                    <button
                      onClick={returnToShopping}
                      className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {step < 3 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.product.id} className="flex">
                        <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="mt-1 flex justify-between text-sm text-gray-500">
                            <p>{item.product.farmerName}</p>
                            <p>Qty {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 pb-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>Subtotal</p>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <p>Delivery</p>
                      <p>{totalPrice >= 30 ? 'Free' : '$5.00'}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${(totalPrice >= 30 ? totalPrice : totalPrice + 5).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Free delivery on orders over $30
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;