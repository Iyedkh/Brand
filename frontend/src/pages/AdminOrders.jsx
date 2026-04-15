import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';
import AdminNav from '../components/AdminNav';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/api/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, type) => {
    try {
      if (type === 'deliver') {
        await api.put(`/api/orders/${id}/deliver`);
        toast.success('Order marked as delivered');
      }
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Paid': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-neutral-50 text-neutral-400 border-neutral-100';
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-light uppercase">Orders</h1>
        <p className="text-neutral-400 text-[10px] tracking-widest mt-2 uppercase">Manage customer transactions</p>
      </div>

      <AdminNav />

      <div className="overflow-x-auto bg-white border border-neutral-100">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Order ID</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Customer</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Date</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Total</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Paid</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-[11px] tracking-wider text-neutral-600 uppercase">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse h-16 bg-neutral-50/20">
                  <td colSpan="7"></td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-20 text-center text-neutral-400">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-[10px] text-neutral-400">#{order._id.slice(-8)}</td>
                  <td className="px-6 py-4 font-medium text-black">{order.user?.username || 'Guest'}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-black">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                       <span className="flex items-center text-emerald-500"><CheckCircle size={14} className="mr-2" /> {order.paidAt.substring(0, 10)}</span>
                    ) : (
                       <span className="flex items-center text-red-400"><X size={14} className="mr-2" /> Not Paid</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full border text-[9px] font-medium ${getStatusStyle(order.status)}`}>
                       {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                       {order.isPaid && !order.isDelivered && (
                         <button 
                           onClick={() => updateStatus(order._id, 'deliver')}
                           className="flex items-center space-x-1 px-3 py-1 bg-black text-white text-[9px] uppercase hover:bg-neutral-800 transition-all"
                         >
                            <Truck size={12} />
                            <span>Mark Delivered</span>
                         </button>
                       )}
                       <Link to={`/admin/order/${order._id}`} className="p-2 hover:bg-neutral-100 transition-all">
                          <Eye size={16} strokeWidth={1.5} />
                       </Link>
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

// Simple X icon substitute for paid status
const X = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default AdminOrders;
