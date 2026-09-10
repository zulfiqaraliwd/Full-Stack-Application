import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            
            <img 
              src="/Images/2.png" 
              alt="Vantore Virelli" 
              className="h-16 w-auto object-contain mb-3"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x64?text=VV';
              }}
            />
          
            <p className="text-sm mt-1">Premium Perfumes & Fashion</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-purple-400 transition">Products</Link></li>
              <li><Link to="/cart" className="hover:text-purple-400 transition">Cart</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p className="text-sm">Email: support@vantore.com</p>
            <p className="text-sm">Phone: +923465147766</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm">
          <p>© 2026 Vantore Virelli. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;