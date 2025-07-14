import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = product.main_image?.startsWith('http')
    ? product.main_image
    : `http://localhost:8000${product.main_image}`;

  return (
    <div className="mb-8">
      <div 
        className="relative group overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container with hover effects */}
        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square">
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Quick actions */}
          <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
          
          {/* Add to cart button */}
          <button className={`absolute bottom-0 left-0 right-0 w-full py-3 bg-gray-900 text-white font-medium transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Add to Cart
          </button>
        </div>
        
        {/* Product details */}
        <Link to={`/products/${product.slug}`}>
          <div className="pt-4">
            <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg font-semibold text-gray-900">KSh {product.base_price}</p>
              {product.original_price && (
                <p className="text-sm text-gray-500 line-through">KSh {product.original_price}</p>
              )}
            </div>
            
            {/* Color options */}
            {product.color_options && (
              <div className="flex space-x-2 mt-2">
                {product.color_options.split(',').map((color, index) => (
                  <div 
                    key={index} 
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.trim() }}
                    title={color.trim()}
                  />
                ))}
              </div>
            )}
            
            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${
                      star <= (product.rating || 4) ? 'text-amber-400' : 'text-gray-300'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.review_count || 24})</span>
            </div>
          </div>
        </Link>
        
        {/* Sale badge */}
        {product.is_on_sale && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            SALE
          </div>
        )}
        
        {/* New badge */}
        {product.is_new && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;