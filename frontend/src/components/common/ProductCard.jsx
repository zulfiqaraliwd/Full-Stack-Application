import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const isFullUrl = (url) => /^https?:\/\//i.test(url || '');

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL || 'https://backend-fullstackapplication-zulfiqarali.vercel.app';
  const imageSrc = isFullUrl(product.image) ? product.image : `${API_URL}${product.image}`;

  return (
    <div className="card group">
      <Link to={`/product/${product._id}`}>
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">${product.salePrice}</span>
                <span className="text-sm text-gray-400 line-through">${product.price}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">${product.price}</span>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => addToCart(product, quantity)}
            className="btn-primary text-sm px-4 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;