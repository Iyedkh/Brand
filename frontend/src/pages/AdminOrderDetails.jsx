import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, CheckCircle, Package, ArrowLeft, MapPin, CreditCard, User } from 'lucide-react';
import api from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/formatUrl';
import AdminNav from '../components/AdminNav';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/api/orders/${id}`);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load order');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (endpoint) => {
    try {
      await api.put(`/api/orders/${id}/${endpoint}`);
      toast.success('Status updated');
      fetchOrder();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Loading...</div>;
  if (!order) return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Order not found</div>;

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
           <Link to="/admin/orders" className="flex items-center space-x-2 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity mb-2">
              <ArrowLeft size={14} />
              <span>Back to Orders</span>
           </Link>
           <h1 className="text-4xl font-display font-light uppercase">Order Details</h1>
           <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">ID: {order._id}</p>
        </div>

        <div className="flex space-x-2">
           {order.isPaid && order.status === 'Paid' && (
              <button 
                onClick={() => updateStatus('ship')}
                className="bg-black text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                 <Truck size={14} />
                 <span>Mark as Shipped</span>
              </button>
           )}
           {order.isPaid && order.status === 'Shipped' && (
              <button 
                onClick={() => updateStatus('deliver')}
                className="bg-emerald-600 text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                 <CheckCircle size={14} />
                 <span>Mark as Delivered</span>
              </button>
           )}
        </div>
      </div>

      <AdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Items & Info */}
        <div className="lg:col-span-8 space-y-12">
           {/* Customer Info */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-50 p-8 border border-neutral-100">
              <div className="space-y-4">
                 <h3 className="flex items-center text-[10px] uppercase tracking-widest font-bold">
                    <User size={14} className="mr-2" /> Customer
                 </h3>
                 <p className="text-[11px] uppercase tracking-wider text-neutral-600">{order.user?.username}</p>
                 <p className="text-[11px] lowercase text-neutral-400">{order.user?.email}</p>
                 <p className="text-[11px] text-black font-medium mt-1">Tel: {order.shippingAddress.phone}</p>
              </div>
              <div className="space-y-4">
                 <h3 className="flex items-center text-[10px] uppercase tracking-widest font-bold">
                    <MapPin size={14} className="mr-2" /> Shipping Address
                 </h3>
                 <p className="text-[11px] uppercase tracking-wider text-neutral-600 leading-relaxed">
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}
                 </p>
              </div>
           </div>

           {/* Items Table */}
           <div className="bg-white border border-neutral-100 overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-neutral-50 border-b border-neutral-100 font-display">
                    <tr>
                       <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium">Product</th>
                       <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-center">Qty</th>
                       <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-medium text-right">Price</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-neutral-50">
                    {order.orderItems.map((item, idx) => (
                       <tr key={idx}>
                          <td className="px-6 py-4 flex items-center space-x-4">
                             <img src={getImageUrl(item.image)} alt="" className="w-12 h-16 object-cover bg-neutral-100 border border-neutral-100" />
                             <div>
                                <p className="text-[10px] uppercase tracking-widest font-medium">{item.name}</p>
                                <p className="text-[9px] text-neutral-400 mt-1 uppercase font-light">{item.size} | {item.color}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-[10px] text-center">{item.qty}</td>
                          <td className="px-6 py-4 text-[10px] text-right font-medium">{item.price} TND</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Right: Order Status Summary */}
        <div className="lg:col-span-4 h-fit sticky top-32">
           <div className="bg-white border border-neutral-100 p-8 space-y-10">
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium border-b border-neutral-100 pb-4">Order Status</h3>
              
              <div className="space-y-6">
                 {[
                   { label: 'Payment', status: order.isPaid ? 'PAID' : 'PENDING', sub: order.isPaid ? order.paidAt?.substring(0, 10) || 'Paid' : order.paymentMethod, active: order.isPaid },
                   { label: 'Shipping', status: (order.status === 'Shipped' || order.status === 'Delivered') ? 'SHIPPED' : 'AWAITING', sub: 'Standard Delivery', active: order.status === 'Shipped' || order.status === 'Delivered' },
                   { label: 'Delivery', status: order.isDelivered ? 'DELIVERED' : 'IN TRANSIT', sub: order.isDelivered ? order.deliveredAt?.substring(0, 10) || 'Delivered' : 'Estimated 5-7 days', active: order.isDelivered },
                 ].map((step, i) => (
                   <div key={i} className="flex space-x-4 relative">
                      <div className={`mt-1 h-3 w-3 rounded-full border-2 ${step.active ? 'bg-black border-black' : 'bg-transparent border-neutral-200'}`}></div>
                      {i < 2 && <div className="absolute left-[5px] top-4 w-px h-10 bg-neutral-100"></div>}
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase tracking-widest opacity-50">{step.label}</span>
                            <span className={`text-[9px] font-bold tracking-tighter ${step.active ? 'text-black' : 'text-neutral-200'}`}>{step.status}</span>
                         </div>
                         <p className="text-[9px] text-neutral-400 mt-1 uppercase">{step.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-10 border-t border-neutral-50 space-y-4">
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Subtotal</span>
                    <span>{order.itemsPrice.toFixed(2)} TND</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Shipping</span>
                    <span>{order.shippingPrice.toFixed(2)} TND</span>
                 </div>
                 <div className="flex justify-between text-sm uppercase tracking-widest font-bold">
                    <span>Grand Total</span>
                    <span>{order.totalPrice.toFixed(2)} TND</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
