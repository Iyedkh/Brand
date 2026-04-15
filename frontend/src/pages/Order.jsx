import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import api from '../api';
import { getImageUrl } from '../utils/formatUrl';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/api/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Loading order details...</div>;
  if (!order) return <div className="pt-40 text-center uppercase tracking-widest text-[10px]">Order not found</div>;

  const getStatusStep = () => {
    switch (order.status) {
      case 'Delivered': return 3;
      case 'Shipped': return 2;
      case 'Paid': return 1;
      default: return 0;
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      <div className="flex justify-between items-center mb-12">
        <Link to="/profile" className="flex items-center space-x-2 text-[10px] uppercase tracking-widest hover:opacity-100 opacity-60 transition-opacity">
          <ChevronLeft size={14} />
          <span>My Orders</span>
        </Link>
        <span className="text-[10px] text-neutral-400 font-mono">ORDER #{order._id}</span>
      </div>

      <div className="bg-white border border-neutral-100 p-10 space-y-16">
        {/* Status Header */}
        <section className="text-center space-y-4">
           <div className="flex justify-center">
              <CheckCircle size={48} strokeWidth={1} className="text-emerald-500" />
           </div>
           <h1 className="text-3xl font-display font-light uppercase tracking-tight">Order Placed</h1>
           <p className="text-[10px] uppercase tracking-widest text-neutral-400">Estimated delivery: {new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </section>

        {/* Tracking Bar */}
        <section className="relative px-4">
           <div className="flex justify-between items-center relative z-10 text-[9px] uppercase tracking-widest font-medium">
              {[
                { label: 'Confirmed', icon: <Package size={16} /> },
                { label: 'Processing', icon: <Clock size={16} /> },
                { label: 'Shipped', icon: <Truck size={16} /> },
                { label: 'Delivered', icon: <MapPin size={16} /> }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col items-center space-y-3 ${i <= getStatusStep() ? 'text-black' : 'text-neutral-200'}`}>
                   <div className={`p-3 rounded-full border ${i <= getStatusStep() ? 'bg-black text-white border-black' : 'bg-white border-neutral-100'}`}>
                      {step.icon}
                   </div>
                   <span>{step.label}</span>
                </div>
              ))}
           </div>
           {/* Line background */}
           <div className="absolute top-1/3 left-10 right-10 h-px bg-neutral-100 -translate-y-1/2"></div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-neutral-50">
           {/* Order Items */}
           <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest border-b border-neutral-100 pb-2 mb-6">Your Items</h3>
              <div className="space-y-4">
                 {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex space-x-4">
                       <img src={getImageUrl(item.image)} alt="" className="w-16 aspect-3/4 object-cover bg-neutral-100" />
                       <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-medium">{item.name}</p>
                            <p className="text-[9px] text-neutral-400 mt-1 uppercase tracking-tighter">Size: {item.size} | Qty: {item.qty}</p>
                          </div>
                          <p className="text-[10px] font-medium">${item.price}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Details Summary */}
           <div className="space-y-10">
              <div className="space-y-6">
                 <h3 className="text-xs uppercase tracking-widest border-b border-neutral-100 pb-2">Delivery & Payment</h3>
                 <div className="space-y-4 text-[10px] uppercase tracking-widest text-neutral-500">
                    <div className="flex items-start space-x-3">
                       <MapPin size={14} className="text-black shrink-0" />
                       <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    </div>
                    <div className="flex items-center space-x-3 text-black">
                       <span className="font-mono text-[9px]">TEL:</span>
                       <p>{order.shippingAddress.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                       <CreditCard size={14} className="text-black shrink-0" />
                       <p>{order.paymentMethod}</p>
                    </div>
                 </div>
              </div>

              <div className="bg-neutral-50 p-6 space-y-3">
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Items Subtotal</span>
                    <span>${order.itemsPrice.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Shipping Fee</span>
                    <span>{order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice.toFixed(2)}`}</span>
                 </div>
                 <hr className="border-neutral-200" />
                 <div className="flex justify-between text-sm uppercase tracking-widest font-bold">
                    <span>Grand Total</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon substitute
const Clock = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default Order;
