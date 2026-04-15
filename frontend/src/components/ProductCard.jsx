import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/formatUrl';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={getImageUrl(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={getImageUrl(product.images[1])}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center space-x-2 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
            <ShoppingBag size={18} />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
            <Heart size={18} />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
            <Eye size={18} />
          </button>
        </div>

        {/* Labels */}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1">
            Sold Out
          </div>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <Link
            to={`/product/${product._id}`}
            className="text-xs uppercase tracking-widest hover:opacity-100 opacity-80"
          >
            {product.name}
          </Link>
          <p className="text-neutral-400 text-[10px] uppercase tracking-tighter mt-1">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-light">{product.price} TND</p>
      </div>

      {/* Quick Sizes (Optional) */}
      <div className="mt-2 flex space-x-2 overflow-hidden items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
          <span key={size} className="text-[9px] text-neutral-400 border border-neutral-200 px-1 hover:border-black cursor-pointer">
            {size}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
