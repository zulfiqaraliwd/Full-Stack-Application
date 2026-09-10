import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan',
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          country: formData.country,
        },
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      };

      await createOrder(orderData);
      clearCart();
      toast.success('Your order has been dispatched! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
      
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <span className="text-gray-700 dark:text-gray-300">
              {item.name} × {item.quantity}
            </span>
            <span className="text-gray-900 dark:text-white font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-lg font-bold">
          <span className="text-gray-900 dark:text-white">Total:</span>
          <span className="text-purple-600 dark:text-purple-400">${getTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="03XX-XXXXXXX"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              placeholder="House #, Street, Area"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-lg mt-4"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;