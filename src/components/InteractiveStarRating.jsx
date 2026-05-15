"use client";

import { useState } from "react";
import { updateProductRating } from "../app/service/productService";
import { useSession } from "next-auth/react";

export default function InteractiveStarRating({ 
  productId, 
  initialRating = 0, 
  size = "sm", 
  showValue = true,
  accessToken 
}) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleStarClick = async (starRating) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateProductRating(productId, starRating, session?.accessToken || accessToken);
      setRating(starRating);
    } catch (error) {
      console.error('Failed to update rating:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    const isFilled = starValue <= (hoverRating || rating);
    const isHalfFilled = starValue - 0.5 <= (hoverRating || rating) && starValue > (hoverRating || rating);
    
    return (
      <button
        key={index}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => setHoverRating(starValue)}
        onMouseLeave={() => setHoverRating(0)}
        disabled={isUpdating}
        className={`${sizeClasses[size]} transition-all duration-200 ${
          isUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
        }`}
        aria-label={`Rate ${starValue} stars`}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isFilled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-colors duration-200 ${
            isFilled || isHalfFilled ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map(renderStar)}
      </div>
      {showValue && (
        <span className={`text-sm font-medium ${
          isUpdating ? 'text-gray-400' : 'text-gray-700'
        }`}>
          {rating.toFixed(1)}
        </span>
      )}
      {isUpdating && (
        <span className="text-xs text-gray-500">Updating...</span>
      )}
    </div>
  );
}
