import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, ShoppingBag, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); // 'success' or 'cancel'
  const orderId = queryParams.get('orderId');

  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white border border-neutral-100 p-12 text-center"
      >
        <div className="flex justify-center mb-8">
          {isSuccess ? (
            <div className="p-4 bg-emerald-50 rounded-full">
              <CheckCircle2 size={64} strokeWidth={1} className="text-emerald-500" />
            </div>
          ) : (
            <div className="p-4 bg-red-50 rounded-full">
              <XCircle size={64} strokeWidth={1} className="text-red-500" />
            </div>
          )}
        </div>

        <h1 className="text-4xl font-display font-light uppercase tracking-tight mb-4">
          {isSuccess ? 'Payment Successful' : 'Payment Denied'}
        </h1>
        
        <p className="text-xs uppercase tracking-widest text-neutral-400 leading-relaxed mb-12">
          {isSuccess 
            ? `Your order #${orderId?.slice(-8)} has been confirmed. You will receive an email shortly with your receipt and tracking details.`
            : 'We were unable to process your payment. Please check your card details or try a different payment method to complete your purchase.'
          }
        </p>

        <div className="space-y-4">
          {isSuccess ? (
            <Link 
              to={`/order/${orderId}`}
              className="w-full bg-black text-white py-4 px-8 uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Track My Order</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            <Link 
              to="/checkout"
              className="w-full bg-black text-white py-4 px-8 uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Try Again</span>
            </Link>
          )}

          <Link 
            to="/shop"
            className="w-full border border-neutral-200 py-4 px-8 uppercase text-xs tracking-[0.3em] hover:bg-neutral-50 transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={14} />
            <span>{isSuccess ? 'Continue Shopping' : 'Back to Shop'}</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-50 flex justify-center items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-400">
           <HelpCircle size={14} />
           <span>Need assistance? Contact our concierge</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
