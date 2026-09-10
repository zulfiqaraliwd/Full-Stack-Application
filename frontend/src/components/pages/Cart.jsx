import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const isFullUrl = (url) => /^https?:\/\//i.test(url || '');

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://full-stack-application-rd4h.vercel.app/';

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Start shopping and add items to your cart!</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="card flex flex-col sm:flex-row items-center gap-4 p-4">
              <img
                src={isFullUrl(item.image) ? item.image : `${API_URL}${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                }}
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-1/3">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="btn-primary w-full mt-4 py-3 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;