import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProducts, getAllOrders } from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, orders] = await Promise.all([
          getProducts(),
          getAllOrders(),
        ]);
        setStats({
          products: products.data.products.length,
          orders: orders.data.orders.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back, {user?.name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-gray-500 dark:text-gray-400">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.products}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-gray-500 dark:text-gray-400">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.orders}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-gray-500 dark:text-gray-400">Role</h3>
          <p className="text-3xl font-bold text-purple-600">Admin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/products" className="btn-primary text-center py-4 text-lg">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="btn-primary text-center py-4 text-lg bg-blue-600 hover:bg-blue-700">
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;