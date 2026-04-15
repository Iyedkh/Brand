import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';
import AdminNav from '../components/AdminNav';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/api/categories');
      setCategories(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/categories', { name, description });
      toast.success('Category created');
      setName('');
      setDescription('');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/api/categories/${id}`);
        toast.success('Category removed');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to remove category');
      }
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-light uppercase">Categories</h1>
        <p className="text-neutral-400 text-[10px] tracking-widest mt-2 uppercase">Organize your store structure</p>
      </div>

      <AdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-4 h-fit sticky top-32">
          <form onSubmit={submitHandler} className="bg-white border border-neutral-100 p-8 space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] border-b border-neutral-100 pb-4">Add Category</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-50">Name</label>
              <input 
                type="text" 
                className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors uppercase text-[10px]"
                placeholder="E.G. ACCESSORIES"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-50">Description</label>
              <textarea 
                className="w-full border border-neutral-100 p-4 focus:outline-none focus:border-black transition-colors text-xs font-light"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button 
               type="submit"
               className="w-full bg-black text-white py-4 uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors"
            >
               Create Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-8">
           <div className="bg-white border border-neutral-100 overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-neutral-50 border-b border-neutral-100">
                 <tr>
                   <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Name</th>
                   <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Description</th>
                   <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-neutral-50 text-[11px] uppercase tracking-wider text-neutral-600">
                 {loading ? (
                   [...Array(3)].map((_, i) => (
                     <tr key={i} className="animate-pulse h-16 bg-neutral-50/20"><td colSpan="3"></td></tr>
                   ))
                 ) : categories.length === 0 ? (
                   <tr><td colSpan="3" className="px-6 py-20 text-center text-neutral-400">No categories found</td></tr>
                 ) : (
                   categories.map(cat => (
                     <tr key={cat._id} className="group hover:bg-neutral-50/50 transition-colors">
                       <td className="px-6 py-4 font-medium text-black flex items-center">
                          <Tag size={12} className="mr-3 text-neutral-300" />
                          {cat.name}
                       </td>
                       <td className="px-6 py-4 text-[10px]  normal-case first-letter:uppercase">{cat.description || 'No description'}</td>
                       <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => deleteHandler(cat._id)}
                            className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                          >
                             <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
