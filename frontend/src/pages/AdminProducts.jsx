import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';
import AdminNav from '../components/AdminNav';
import { getImageUrl } from '../utils/formatUrl';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/api/products');
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        toast.success('Product removed');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-light uppercase">Products</h1>
          <p className="text-neutral-400 text-[10px] tracking-widest mt-2 uppercase">Manage your store catalog</p>
        </div>

        <div className="flex w-full md:w-auto space-x-4">
           <div className="relative grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH PRODUCTS..." 
                className="w-full pl-10 pr-4 py-3 border border-neutral-100 text-[10px] tracking-widest focus:outline-none focus:border-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <Link to="/admin/product/new" className="bg-black text-white px-6 py-3 flex items-center space-x-2 text-[10px] tracking-widest uppercase hover:bg-neutral-800 transition-colors">
              <Plus size={16} />
              <span>Add Product</span>
           </Link>
        </div>
      </div>

      <AdminNav />

      <div className="overflow-x-auto bg-white border border-neutral-100">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Image</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Name</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-[11px] uppercase tracking-wider text-neutral-600">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="6" className="px-6 py-8 h-16 bg-neutral-50/50"></td>
                </tr>
              ))
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-20 text-center text-neutral-400">No products found</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <img src={getImageUrl(product.images[0])} alt="" className="w-12 h-16 object-cover bg-neutral-100 border border-neutral-100" />
                  </td>
                  <td className="px-6 py-4 font-medium text-black">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.price} TND</td>
                  <td className="px-6 py-4">
                    <span className={product.stock < 5 ? 'text-red-500 font-bold' : ''}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/product/${product._id}`} target="_blank" className="p-2 hover:bg-white border border-transparent hover:border-neutral-100 transition-all">
                        <ExternalLink size={14} className="text-neutral-400" />
                      </Link>
                      <Link to={`/admin/product/${product._id}/edit`} className="p-2 hover:bg-white border border-transparent hover:border-neutral-100 transition-all text-blue-500">
                        <Edit size={14} />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 hover:bg-white border border-transparent hover:border-neutral-100 transition-all text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
