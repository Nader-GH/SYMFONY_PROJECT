import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Router, Shield, Server, Menu as MenuIcon } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Router className="h-6 w-6 text-teal-400" />
              <span className="text-xl font-bold">RxMarketplace</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="hover:text-teal-300 transition-colors">Products</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-teal-300 transition-colors">Admin</Link>
            )}
            <div className="relative">
              <Link to="/cart" className="hover:text-teal-300 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="hover:text-teal-300 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-teal-300 transition-colors">Login</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="mr-4 relative">
              <Link to="/cart" className="hover:text-teal-300 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
            <button 
              onClick={toggleMenu} 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-300 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/products" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-left hover:bg-blue-700"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
