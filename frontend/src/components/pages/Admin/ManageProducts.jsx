import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../../services/api';
import toast from 'react-hot-toast';
import { TrashIcon, PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const isFullUrl = (url) => /^https?:\/\//i.test(url || '');

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', 
    description: '', 
    price: '', 
    salePrice: '',
    image: '', 
    category: 'perfume',  // ← String value
    productType: 'perfume', 
    gender: 'men',
    stock: '', 
    status: 'active', 
    fragranceCategory: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        salePrice: product.salePrice || '',
        image: product.image || '',
        category: product.category || 'perfume',
        productType: product.productType || 'perfume',
        gender: product.gender || 'men',
        stock: product.stock || '',
        status: product.status || 'active',
        fragranceCategory: product.fragranceCategory || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', 
        description: '', 
        price: '', 
        salePrice: '',
        image: '', 
        category: 'perfume',
        productType: 'perfume', 
        gender: 'men',
        stock: '', 
        status: 'active', 
        fragranceCategory: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Name, Price and Image are required!');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description || '',
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        image: formData.image.trim(),
        category: formData.category,  // ← String value bhej rahe hain
        productType: formData.productType || 'perfume',
        gender: formData.gender || 'men',
        stock: parseInt(formData.stock) || 0,
        status: formData.status || 'active',
        fragranceCategory: formData.fragranceCategory || '',
      };

      console.log('Sending product data:', productData);

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(productData);
        toast.success('Product created successfully!');
      }
      
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No products found. Click "Add Product" to create one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={isFullUrl(product.image) ? product.image : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image}`}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                        }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {product.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    ${product.price}
                    {product.salePrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">${product.salePrice}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? product.stock : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-800 mr-3 transition">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800 transition">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="input-field" 
                    required 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows="2" 
                    className="input-field" 
                  />
                </div>

                {/* Category - String Values */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="perfume">Perfume</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="fragrance">Fragrance</option>
                    <option value="beauty">Beauty</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price *</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="input-field" 
                    step="0.01" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sale Price</label>
                  <input 
                    type="number" 
                    name="salePrice" 
                    value={formData.salePrice} 
                    onChange={handleChange} 
                    className="input-field" 
                    step="0.01" 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL *</label>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    className="input-field" 
                    placeholder="https://example.com/image.jpg or /images/products/product-name.jpg" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Type</label>
                  <select name="productType" value={formData.productType} onChange={handleChange} className="input-field">
                    <option value="perfume">Perfume</option>
                    <option value="clothing">Clothing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input 
                    type="number" 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleChange} 
                    className="input-field" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {formData.productType === 'perfume' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fragrance Category</label>
                    <select 
                      name="fragranceCategory" 
                      value={formData.fragranceCategory} 
                      onChange={handleChange} 
                      className="input-field"
                    >
                      <option value="">None</option>
                      <option value="floral">Floral</option>
                      <option value="woody">Woody</option>
                      <option value="oriental">Oriental</option>
                      <option value="fresh">Fresh</option>
                      <option value="citrus">Citrus</option>
                      <option value="aromatic">Aromatic</option>
                      <option value="aquatic">Aquatic</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;