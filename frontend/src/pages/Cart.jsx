import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../utils/formatUrl';
import useAuthStore from '../store/useAuthStore';
import PageTransition from '../components/PageTransition';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <PageTransition className="pt-40 pb-20 container mx-auto px-6 flex flex-col items-center justify-center min-h-[70vh]">
        <ShoppingBag size={48} className="mx-auto text-neutral-200 mb-6" />
        <h1 className="text-3xl font-display uppercase tracking-widest mb-4">Your bag is empty</h1>
        <p className="text-neutral-400 text-xs uppercase tracking-widest mb-10">Look around and find something you like</p>
        <Link to="/shop" className="btn-primary">
          Go to Shop
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-20 container mx-auto px-6">
      <h1 className="text-4xl font-display font-light uppercase border-b border-neutral-100 pb-8 mb-12">Shopping Bag ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          {cartItems.map((item) => (
            <div key={`${item.product}-${item.size}-${item.color}`} className="flex gap-6 pb-8 border-b border-neutral-50 last:border-0">
               <div className="w-32 aspect-3/4 bg-neutral-100 overflow-hidden">
                  <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
               </div>
               
               <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div>
                        <Link to={`/product/${item.product}`} className="text-xs uppercase tracking-widest hover:underline">{item.name}</Link>
                        <div className="flex space-x-4 mt-2 text-[10px] uppercase text-neutral-400 tracking-tighter">
                           <span>Size: {item.size}</span>
                           <span>Color: {item.color}</span>
                        </div>
                     </div>
                     <p className="text-sm font-light">{item.price} TND</p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border border-neutral-100 h-fit">
                        <button 
                          onClick={() => addToCart({_id: item.product, ...item}, Math.max(1, item.qty - 1), item.size, item.color)} 
                          className="p-2 hover:bg-neutral-50"
                        >
                          <Minus size={12}/>
                        </button>
                        <span className="w-10 text-center text-[10px]">{item.qty}</span>
                        <button 
                          onClick={() => addToCart({_id: item.product, ...item}, Math.min(item.countInStock || 99, item.qty + 1), item.size, item.color)} 
                          className="p-2 hover:bg-neutral-50"
                        >
                          <Plus size={12}/>
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.product, item.size, item.color)}
                        className="text-neutral-300 hover:text-black transition-colors"
                      >
                         <Trash2 size={18} strokeWidth={1} />
                      </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
           <div className="bg-neutral-50 p-8 space-y-6 sticky top-32">
              <h2 className="text-xs uppercase tracking-[0.3em] font-medium border-b border-neutral-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Subtotal</span>
                    <span>{subtotal} TND</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Estimated Shipping</span>
                    <span>FREE</span>
                 </div>
                 <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>Tax</span>
                    <span>0.00 TND</span>
                 </div>
                 <hr className="border-neutral-200" />
                 <div className="flex justify-between text-sm uppercase tracking-widest font-medium">
                    <span>Total</span>
                    <span>{subtotal} TND</span>
                 </div>
              </div>

              <button 
                onClick={() => navigate(user ? '/checkout' : '/login?redirect=checkout')}
                className="w-full bg-black text-white py-4 uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-2"
              >
                 <span>Proceed to Checkout</span>
                 <ArrowRight size={14} />
              </button>

              <div className="pt-4 border-t border-neutral-200 mt-6">
                 <p className="text-[9px] uppercase tracking-widest text-neutral-400 text-center">
                    Complimentary standard shipping on all orders over $150. Returns are free and easy within 30 days.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
