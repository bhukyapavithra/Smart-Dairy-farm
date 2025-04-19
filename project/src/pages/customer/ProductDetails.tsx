import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, ShoppingCart, Plus, Minus, MapPin, ChevronLeft, ChevronRight, Truck, Clock } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { Product } from '../../types';
import { mockProducts, mockFarmers } from '../../data/mockData';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [farmerInfo, setFarmerInfo] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find product by ID
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get farmer info
        const farmer = mockFarmers.find(f => f.id === foundProduct.farmerId);
        setFarmerInfo(farmer);
        
        // Get related products (same farmer or category, excluding current)
        const related = mockProducts
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.farmerId === foundProduct.farmerId || p.category === foundProduct.category)
          )
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showToast(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`, 'success');
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    } else {
      showToast('Maximum available quantity reached', 'info');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

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

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/search" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/search" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>
        
        {/* Product details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-96 md:h-auto">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isFeatured && (
                <div className="absolute top-4 left-4 bg-farm-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-farm-amber-500 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.8</span>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <Link 
                      to={`#farm-${product.farmerId}`} 
                      className="text-farm-green-600 hover:text-farm-green-700 font-medium"
                    >
                      {product.farmerName}
                    </Link>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-farm-green-700">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500">per {product.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 mt-auto">
                  <div className="flex items-center">
                    <div className="mr-4 text-gray-700">Quantity:</div>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                      <button 
                        onClick={incrementQuantity}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        disabled={quantity >= product.quantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      {product.quantity} available
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                    <button
                      onClick={handleAddToCart}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 w-full sm:w-auto"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>
                    <Link
                      to="/customer/checkout"
                      className="inline-flex items-center justify-center px-6 py-3 border border-farm-green-600 text-base font-medium rounded-md text-farm-green-700 bg-white hover:bg-farm-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green-500 w-full sm:w-auto"
                    >
                      Buy Now
                    </Link>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="mr-2 h-4 w-4 text-farm-green-600" />
                      <span>Free delivery on orders over $30</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4 text-farm-green-600" />
                      <span>Same-day delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Farmer Info */}
        {farmerInfo && (
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden" id={`farm-${product.farmerId}`}>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Farm</h2>
              
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <img 
                    src="https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt={farmerInfo.farmName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="w-full md:w-2/3 md:pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{farmerInfo.farmName}</h3>
                  
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-farm-green-600 mr-1" />
                    <span className="text-gray-600">3.5 miles away</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{farmerInfo.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-farm-amber-100 text-farm-amber-800">
                      Grass-fed
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-farm-green-100 text-farm-green-800">
                      Organic
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Family-owned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="p-1 rounded-full border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img 
                      src={relatedProduct.imageUrl} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-500">{relatedProduct.farmerName}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-farm-green-700">${relatedProduct.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-farm-amber-500 fill-current" />
                        <span className="ml-1 text-xs text-gray-600">4.8</span>
                      </div>
                    </div>
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

export default ProductDetails;