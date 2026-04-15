import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5696c4c840667ada3219e632/1457332117591-JG996EK5Z84XI42UXZEN/header+new.jpg?format=2500w"
          alt="Fashion Hero"
          className="w-full h-full object-cover scale-105 mt-22"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity hover:opacity-20 duration-700"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.5em] mb-4 drop-shadow-md"
        >
          New Collection 2026
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-display font-light mb-8 uppercase tracking-tight drop-shadow-lg text-amber-50"
        >
          Effortless <br /> Elegance
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link to="/shop" className="px-10 py-4 bg-white text-black uppercase text-xs tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 backdrop-blur-sm">
            Shop Now
          </Link>
          <Link to="/shop?category=Women" className="px-10 py-4 border border-white text-white uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300">
            Collections
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white opacity-60"
      >
        <div className="w-px h-12 bg-white mx-auto"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
