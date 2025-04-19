import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart`, 'success');
  };

  return (
    <Link to={`/products/${product.id}`} className="group relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 bg-gray-200">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-farm-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-farm-green-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-farm-amber-500 fill-current" />
              <span className="ml-1 text-sm text-gray-600">4.8</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{product.farmerName}</p>
          
          <div className="mt-2 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-farm-green-700 font-bold">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 text-sm ml-1">per {product.unit}</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-farm-green-100 text-farm-green-600 hover:bg-farm-green-600 hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;