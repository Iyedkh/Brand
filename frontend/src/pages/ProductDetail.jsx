import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import useCartStore from '../store/useCartStore';
import { Heart, Plus, Minus, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/formatUrl';
import PageTransition from '../components/PageTransition';
import { Skeleton } from '../components/Skeleton';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');

  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
        setMainImage(data.images[0]);
        setSelectedColor(data.colors[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    toast.success('Added to bag', {
      style: {
        borderRadius: '0',
        background: '#000',
        color: '#fff',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
  };

  if (loading) {
    return (
      <PageTransition className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4">
             <Skeleton className="aspect-3/4" />
             <Skeleton className="aspect-3/4 hidden md:block" />
          </div>
          <div className="lg:w-5/12 space-y-6">
             <Skeleton className="h-10 w-3/4" />
             <Skeleton className="h-6 w-1/4" />
             <Skeleton className="h-4 w-1/2" />
             <div className="pt-8 space-y-4">
               <Skeleton className="h-12 w-full" />
               <Skeleton className="h-12 w-full" />
               <Skeleton className="h-14 w-full" />
             </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!product) {
    return (
      <PageTransition className="h-screen flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag size={48} className="text-neutral-200 mb-6" />
        <h2 className="text-3xl font-display uppercase tracking-widest mb-4">Product Not Found</h2>
        <p className="text-neutral-400 text-sm mb-8">The item you are looking for is no longer available or the link is incorrect.</p>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Images Grid */}
        <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4">
           {product.images.map((img, idx) => (
              <div key={idx} className="aspect-3/4 bg-neutral-100 overflow-hidden">
                <img src={getImageUrl(img)} alt={product.name} className="w-full h-full object-cover" />
              </div>
           ))}
        </div>

        {/* Info Container */}
        <div className="lg:w-5/12 lg:sticky lg:top-32 h-fit">
          <div className="border-b border-neutral-100 pb-8">
            <h1 className="text-3xl font-display font-light uppercase tracking-tight">{product.name}</h1>
            <p className="text-xl mt-4 font-light">{product.price} TND</p>
            <div className="flex items-center mt-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "black" : "none"} className={i < Math.floor(product.rating) ? "text-black" : "text-neutral-200"} />
              ))}
              <span className="text-[10px] text-neutral-400 uppercase ml-2">({product.numReviews} Reviews)</span>
            </div>
          </div>

          <div className="py-8 space-y-10">
            {/* Color Select */}
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-4">Color: <span className="text-neutral-500">{selectedColor}</span></p>
              <div className="flex space-x-4">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-1 ring-offset-2 ring-black' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Size Select */}
            <div>
              <div className="flex justify-between mb-4">
                <p className="text-[10px] uppercase tracking-widest">Select Size</p>
                <button className="text-[10px] uppercase tracking-widest underline opacity-60">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border text-xs tracking-widest transition-all ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'hover:border-black text-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
               <div className="flex items-center border border-neutral-200 w-fit">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="p-3 hover:bg-neutral-50"><Minus size={14}/></button>
                  <span className="w-12 text-center text-xs">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty+1))} className="p-3 hover:bg-neutral-50"><Plus size={14}/></button>
               </div>

               <div className="flex space-x-2">
                 <button
                   onClick={handleAddToCart}
                   className="flex-1 bg-black text-white py-4 uppercase text-xs tracking-[0.3em] font-medium hover:bg-neutral-800 transition-colors"
                 >
                   Add to Bag
                 </button>
                 <button className="p-4 border border-neutral-200 hover:bg-neutral-50">
                    <Heart size={20} />
                 </button>
               </div>
            </div>
          </div>

          {/* Details & Shipping */}
          <div className="mt-8 space-y-6 border-t border-neutral-100 pt-8">
            <div className="flex items-center space-x-4 opacity-70">
              <Truck size={18} />
              <p className="text-[10px] uppercase tracking-widest">Free shipping on orders over $150</p>
            </div>
            <div className="flex items-center space-x-4 opacity-70">
              <RefreshCw size={18} />
              <p className="text-[10px] uppercase tracking-widest">30-day extended returns</p>
            </div>
            <div className="flex items-center space-x-4 opacity-70">
              <ShieldCheck size={18} />
              <p className="text-[10px] uppercase tracking-widest">Secure checkout guarantee</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[10px] uppercase tracking-widest mb-4 opacity-60">Description</p>
            <p className="text-sm font-light leading-relaxed text-neutral-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
