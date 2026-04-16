import React, { useEffect, useState } from 'react';
import { Users, MoreHorizontal, Mail, Shield, Trash2, CheckCircle, XCircle } from 'lucide-react';
import api from '../api';
import useAuthStore from '../store/useAuthStore';
import AdminNav from '../components/AdminNav';
import PageTransition from '../components/PageTransition';
import { Skeleton } from '../components/Skeleton';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await api.get('/api/users', config);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load users');
        console.error(error);
        setLoading(false);
      }
    };
    if (user?.token) fetchUsers();
  }, [user]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
       // In a complete implementation, this would call DELETE /api/users/:id
       toast.error('User deletion demo only');
    }
  };

  return (
    <PageTransition className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex items-center space-x-4 mb-12">
        <Users size={32} strokeWidth={1} />
        <h1 className="text-4xl font-display font-light uppercase">Users Management</h1>
      </div>

      <AdminNav />

      {loading ? (
        <div className="space-y-4">
           {[1, 2, 3, 4, 5].map(n => <Skeleton key={n} className="h-16 w-full" />)}
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">ID</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">Name</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">Email</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400">Admin</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                  <td className="p-6 text-xs font-mono text-neutral-500">{u._id?.substring(0, 8)}...</td>
                  <td className="p-6">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] font-medium text-neutral-600">
                           {u.username?.substring(0, 2).toUpperCase() || 'US'}
                        </div>
                        <span className="text-sm">{u.username}</span>
                     </div>
                  </td>
                  <td className="p-6">
                     <a href={`mailto:${u.email}`} className="text-xs hover:underline flex items-center space-x-2 text-neutral-500 hover:text-black">
                        <Mail size={12} />
                        <span>{u.email}</span>
                     </a>
                  </td>
                  <td className="p-6">
                     {u.role === 'admin' ? (
                        <CheckCircle size={16} className="text-emerald-500" />
                     ) : (
                        <XCircle size={16} className="text-red-500" />
                     )}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => deleteHandler(u._id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageTransition>
  );
};

export default AdminUsers;
