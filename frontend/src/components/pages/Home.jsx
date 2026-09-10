import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.products.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Background Image - public/Images/logo.png */}
      <section className="relative text-white py-20 min-h-[500px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/Images/logo.png")',
          }}
        >
          {/* Light overlay for text readability only */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/Images/1.png" 
              alt="Vantore Virelli" 
              className="h-20 w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80?text=VV';
              }}
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Vantore Virelli</h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Premium Perfumes & Fashion for the Discerning Individual
          </p>
          <Link to="/products" className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg font-medium inline-block">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="btn-primary">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;