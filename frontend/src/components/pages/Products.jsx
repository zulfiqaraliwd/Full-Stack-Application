import React, { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard'; 
import { getProducts } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (category) params.category = category;
        if (gender) params.gender = gender;
        const res = await getProducts(params);
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, gender]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Products</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field w-auto min-w-[150px]"
        >
          <option value="">All Categories</option>
          <option value="perfume">Perfumes</option>
          <option value="clothing">Clothing</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input-field w-auto min-w-[150px]"
        >
          <option value="">All Genders</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;