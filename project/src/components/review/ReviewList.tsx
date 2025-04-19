import React from 'react';
import { Star, ThumbsUp, Check, MessageSquare } from 'lucide-react';
import { Review } from '../../types';

interface ReviewListProps {
  reviews: Review[];
  productId: string;
  onAddReview?: () => void;
  isCustomer?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  productId, 
  onAddReview,
  isCustomer = false
}) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const verifiedCount = reviews.filter(review => review.verified).length;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-farm-amber-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                Based on {reviews.length} reviews
              </span>
            </div>
          </div>
          
          {isCustomer && onAddReview && (
            <button
              onClick={onAddReview}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-farm-green-600 hover:bg-farm-green-700"
            >
              Write a Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(review => review.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              
              return (
                <div key={rating} className="flex items-center">
                  <span className="w-12 text-sm text-gray-600">{rating} stars</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-farm-amber-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {verifiedCount} verified purchases
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
              {reviews.filter(review => review.response).length} seller responses
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ThumbsUp className="h-5 w-5 text-farm-amber-500 mr-2" />
              {reviews.reduce((acc, review) => acc + (review.helpful || 0), 0)} helpful votes
            </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-farm-amber-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="mt-1 font-medium text-gray-900">{review.customerName}</h4>
                <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
              </div>
              
              <button className="text-gray-400 hover:text-gray-500">
                <ThumbsUp className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mt-4 text-gray-600">{review.comment}</p>
            
            {review.images && review.images.length > 0 && (
              <div className="mt-4 flex space-x-2">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            
            {review.helpful && (
              <div className="mt-4 text-sm text-gray-500">
                {review.helpful} people found this helpful
              </div>
            )}
            
            {review.response && (
              <div className="mt-4 pl-4 border-l-4 border-gray-200">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Response from {review.response.farmerName}</span>
                  <span className="text-gray-500"> • {formatDate(review.response.createdAt)}</span>
                </div>
                <p className="mt-1 text-gray-600">{review.response.comment}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;