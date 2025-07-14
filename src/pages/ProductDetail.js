import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../features/product/productSlice';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reduxDispatch = useReduxDispatch();
  const product = useSelector((state) => state.products.productDetail);
  const loading = useSelector((state) => state.products.loading);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setMainImage(
        product.main_image?.startsWith('http')
          ? product.main_image
          : `http://localhost:8000${product.main_image}`
      );
    }
  }, [product]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    reduxDispatch(
      addToCart({
        id: product.id,
        name: product.name,
        main_image: mainImage,
        selectedSize,
        selectedColor,
        price: parseFloat(displayPrice),
        quantity: 1,
      })
    );
    
    // Show success feedback
    setTimeout(() => setIsAddingToCart(false), 1500);
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-16 h-16 mb-4"></div>
          <div className="text-gray-700 font-light">Loading luxury details...</div>
        </div>
      </div>
    );
  }

  // Get unique sizes
  const uniqueSizes = product.variants
    .map((v) => v.size)
    .filter((s, index, self) => s && self.findIndex((x) => x?.id === s?.id) === index);

  // Get unique colors
  const uniqueColors = product.variants
    .map((v) => v.color)
    .filter((c, index, self) => c && self.findIndex((x) => x?.id === c?.id) === index);

  // Match variant by selected options
  const matchingVariant = product.variants.find(
    (v) =>
      (!selectedSize || v.size?.id === selectedSize.id) &&
      (!selectedColor || v.color?.id === selectedColor.id)
  );

  const displayPrice = matchingVariant?.price ?? product.base_price;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
            <span className="text-white font-serif text-xl font-bold">M</span>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-wider">MANWELL</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Gallery */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 flex items-center justify-center h-[550px] overflow-hidden shadow-lg">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 ease-out"
                />
              </div>
              
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 mt-6 overflow-x-auto py-2 px-1">
                {[product.main_image, ...product.images].map((img, index) => {
                  const imgUrl = img.startsWith('http')
                    ? img
                    : `http://localhost:8000${img}`;
                  return (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl cursor-pointer transition-all duration-300 ${
                        mainImage === imgUrl
                          ? 'ring-2 ring-black'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setMainImage(imgUrl)}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} variant ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 mb-1">
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">(24 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-semibold text-gray-900">
                    KSh {displayPrice.toLocaleString()}
                  </p>
                  {product.stock_status === 'in_stock' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-gray-500 mr-2">SKU:</span>
                  <span className="font-medium">{product.sku || 'MW-001'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Category:</span>
                  <span className="font-medium">{product.category?.name || 'Luxury Apparel'}</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            {uniqueSizes.length > 0 && (
              <div className="py-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Size</h3>
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    Size guide
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {uniqueSizes.map((size) => (
                    <button
                      key={size.id}
                      className={`py-3 px-4 rounded-xl border text-center transition-all transform hover:scale-105 ${
                        selectedSize?.id === size.id
                          ? 'bg-black text-white border-black shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {uniqueColors.length > 0 && (
              <div className="py-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Color</h3>
                  <span className="text-sm text-gray-500">{selectedColor ? selectedColor.name : 'Select'}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                        selectedColor?.id === color.id
                          ? 'ring-2 ring-offset-2 ring-gray-900'
                          : ''
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                    >
                      {selectedColor?.id === color.id && (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                className={`w-full py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                  !selectedSize || !selectedColor
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : isAddingToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800 transform hover:scale-[1.02]'
                }`}
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              
              <button className="w-full mt-4 py-4 px-6 rounded-xl border border-black text-black transition duration-300 flex items-center justify-center gap-2 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Premium Quality</h4>
                    <p className="text-gray-600 mt-1">Crafted with the finest materials for exceptional comfort and durability.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-gray-600 mt-1">All transactions are encrypted and secure with our payment partners.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Worldwide Shipping</h4>
                    <p className="text-gray-600 mt-1">Free express shipping on orders over $200. Easy returns within 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-64 w-full"></div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Luxury {item === 1 ? 'Silk' : item === 2 ? 'Wool' : item === 3 ? 'Cotton' : 'Linen'} Shirt</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">KSh {(15000 + item * 1000).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;