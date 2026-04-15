import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import api from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/formatUrl';
import { ChevronRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'Tunisia',
    phone: '',
  });

  const [paymentMethod] = useState('Cash on Delivery');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 150 ? 0 : 20;
  const totalPrice = itemsPrice + shippingPrice;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      };

      const { data } = await api.post('/api/orders', orderData);
      toast.success('Order Placed Successfully');
      clearCart();
      navigate(`/payment-status?status=success&orderId=${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
      navigate('/payment-status?status=cancel');
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
       <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-10">
        <span>Shopping Bag</span>
        <ChevronRight size={12} />
        <span className="text-black">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Forms */}
        <div className="lg:col-span-7 space-y-16">
          {/* Shipping Section */}
          <section>
             <h2 className="text-xl font-display font-light uppercase tracking-tight mb-8">Shipping Information</h2>
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50">Address</label>
                      <input 
                        type="text" 
                        className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50">City</label>
                      <input 
                        type="text" 
                        className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50">Postal Code</label>
                      <input 
                        type="text" 
                        className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50">Country</label>
                      <input 
                        type="text" 
                        className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-50">Phone Number</label>
                      <input 
                        type="text" 
                        className="w-full border-b border-neutral-100 py-3 focus:outline-none focus:border-black transition-colors"
                        placeholder="+216 ... "
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        required
                      />
                   </div>
                </div>
             </div>
          </section>

          {/* Payment Section - Forced to COD */}
          <section>
             <h2 className="text-xl font-display font-light uppercase tracking-tight mb-8">Payment Method</h2>
             <div className="flex items-center justify-between p-6 border border-black bg-neutral-50">
                <div className="flex items-center space-x-4">
                   <div className="p-2 bg-black text-white rounded-full">
                      <Truck size={16} />
                   </div>
                   <span className="text-[10px] uppercase tracking-widest font-bold">Cash on Delivery</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest">Available</span>
             </div>
          </section>

          <div className="bg-neutral-50 p-8 border border-neutral-100 space-y-4">
             <div className="flex items-start space-x-4">
                <ShieldCheck size={20} className="text-neutral-400" />
                <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                   Your security is our priority. Your data is protected by industry-leading encryption and secure protocols.
                </p>
             </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="bg-white border border-neutral-100 p-10 sticky top-32 space-y-8">
              <h2 className="text-xs uppercase tracking-[0.3em] border-b border-neutral-100 pb-4">Order Summary</h2>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                 {cartItems.map((item, idx) => (
                    <div key={idx} className="flex space-x-4">
                       <img src={getImageUrl(item.image)} alt="" className="w-16 aspect-3/4 object-cover bg-neutral-100" />
                       <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                             <h4 className="text-[10px] uppercase tracking-widest w-2/3">{item.name}</h4>
                             <span className="text-[10px]">{item.price} TND</span>
                          </div>
                          <div className="flex justify-between text-[9px] uppercase tracking-tighter text-neutral-400">
                             <span>Size: {item.size} | Qty: {item.qty}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-100">
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Subtotal</span>
                    <span>{itemsPrice.toFixed(2)} TND</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Shipping</span>
                    <span>{shippingPrice === 0 ? 'FREE' : `${shippingPrice.toFixed(2)} TND`}</span>
                 </div>
                 <hr className="border-neutral-50" />
                 <div className="flex justify-between text-xl font-display uppercase tracking-tight">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} TND</span>
                 </div>
              </div>

              <button 
                onClick={placeOrderHandler}
                className="w-full bg-black text-white py-4 uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-colors"
                disabled={!shippingAddress.address || !shippingAddress.city}
              >
                 Complete Purchase
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
