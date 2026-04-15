import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, ChevronRight } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/formatUrl';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id && id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    images: [],
    category: '',
    stock: 0,
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black']
  });
  
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: catData } = await api.get('/api/categories');
        setCategories(catData);

        if (isEditMode) {
          const { data: productData } = await api.get(`/api/products/${id}`);
          setFormData({
            ...productData,
            images: productData.images || []
          });
        }
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.post('/api/upload', uploadData, config);
      setFormData({ ...formData, images: [...formData.images, data] });
      setUploading(false);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Upload failed');
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/products/${id}`, formData);
        toast.success('Product updated');
      } else {
        await api.post('/api/products', formData);
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  if (loading) return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Loading...</div>;

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-10">
        <Link to="/admin/products" className="hover:text-black transition-colors">Products</Link>
        <ChevronRight size={12} />
        <span className="text-black">{isEditMode ? 'Edit Product' : 'New Product'}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h1 className="text-4xl font-display font-light uppercase">
          {isEditMode ? 'Edit Product' : 'Create Product'}
        </h1>
        <Link to="/admin/products" className="flex items-center space-x-2 text-[10px] uppercase tracking-widest hover:opacity-60 transition-opacity">
          <ArrowLeft size={16} />
          <span>Cancel & Back</span>
        </Link>
      </div>

      <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-neutral-100 p-10">
        <div className="lg:col-span-12 space-y-10">
           {/* Basic Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest opacity-50">Product Name</label>
                 <input 
                   type="text" 
                   className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   required
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest opacity-50">Category</label>
                 <select 
                   className="w-full border-b border-neutral-100 py-3 focus:outline-none bg-transparent"
                   value={formData.category}
                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                   required
                 >
                   <option value="">SELECT CATEGORY</option>
                   <option value="Women">WOMEN</option>
                   <option value="Men">MEN</option>
                   <option value="Kids">KIDS</option>
                   {categories.map(c => <option key={c._id} value={c.name}>{c.name.toUpperCase()}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest opacity-50">Price ($)</label>
                 <input 
                   type="number" 
                   className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black"
                   value={formData.price}
                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                   required
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest opacity-50">Stock Quantity</label>
                 <input 
                   type="number" 
                   className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black"
                   value={formData.stock}
                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                   required
                 />
              </div>
           </div>

           {/* Description */}
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-50">Description</label>
              <textarea 
                className="w-full border border-neutral-100 p-4 min-h-[150px] focus:outline-none focus:border-black transition-colors text-sm font-light leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
           </div>

           {/* Image Upload */}
           <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest opacity-50 block">Product Images</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-3/4 bg-neutral-100 border border-neutral-50 group">
                       <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                       <button 
                         type="button"
                         onClick={() => removeImage(idx)}
                         className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <X size={14} />
                       </button>
                    </div>
                 ))}
                 <label className="aspect-3/4 border-2 border-dashed border-neutral-100 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
                    <Upload size={24} className="text-neutral-300 mb-2" />
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400">{uploading ? 'UPLOADING...' : 'ADD IMAGE'}</span>
                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                 </label>
              </div>
           </div>

           {/* Submit */}
           <div className="pt-10 border-t border-neutral-50 flex justify-end">
              <button 
                type="submit"
                className="bg-black text-white px-16 py-4 uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-colors"
              >
                {isEditMode ? 'Save Changes' : 'Create Product'}
              </button>
           </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEdit;
