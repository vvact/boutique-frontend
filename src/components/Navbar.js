import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
  FaStore,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-xl py-2' 
          : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-xl font-bold"
            >
              <div className="relative">
                <FaStore className="text-amber-500 text-2xl mr-2" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <span 
                className={`font-serif tracking-wider ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                MANWELL
                <span className="text-amber-500 font-light"> Boutique</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`flex items-center font-medium transition-all duration-300 hover:text-amber-500 ${
                scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'
              }`}
            >
              <FaStore className="mr-2" />
              <span>Shop</span>
            </Link>

            <Link 
              to="/cart" 
              className={`flex items-center font-medium transition-all duration-300 hover:text-amber-500 relative ${
                scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'
              }`}
            >
              <FaShoppingCart className="mr-2" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`flex items-center font-medium transition-all duration-300 hover:text-amber-500 ${
                    scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  <FaUser className="mr-2" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center font-medium transition-all duration-300 hover:text-amber-500 ${
                    scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`flex items-center font-medium transition-all duration-300 hover:text-amber-500 ${
                  scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'
                }`}
              >
                <FaSignInAlt className="mr-2" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md focus:outline-none transition-colors ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className={`md:hidden transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-white border-t border-gray-100' 
              : 'bg-gray-800 border-t border-gray-700'
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 px-2">
            <Link 
              to="/products" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaStore className="mr-3" />
              Shop
            </Link>
            
            <Link 
              to="/cart" 
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors relative ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaShoppingCart className="mr-3" />
              Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-gray-50' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="mr-3" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-gray-50' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-50' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt className="mr-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;