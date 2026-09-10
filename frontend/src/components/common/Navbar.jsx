import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - public/Images/1.png */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/Images/1.png" 
              alt="Vantore Virelli" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48x48?text=VV';
              }}
            />
         
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                {link.label}
              </Link>
            ))}
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <ShoppingCartIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-primary">Login</Link>
                <Link to="/register" className="btn-secondary">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <Link to="/cart" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
            Cart ({getItemCount()})
          </Link>

          {user ? (
            <>
              <div className="text-gray-700 dark:text-gray-300">{user.name}</div>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="btn-danger w-full text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link to="/login" className="btn-primary block text-center" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn-secondary block text-center" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;