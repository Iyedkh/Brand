import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import api from '../api';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products?pageNumber=1');
        setProducts(data.products.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pb-20">
      <Hero />

      {/* Featured Collections */}
      <section className="container mx-auto px-6 mt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display font-light">New Arrivals</h2>
            <p className="text-neutral-400 text-xs tracking-widest mt-2 uppercase">Discover the latest trends in high fashion.</p>
          </div>
          <Link to="/shop" className="group flex items-center text-xs uppercase tracking-widest hover:opacity-100 opacity-60 transition-opacity">
            View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-neutral-100 aspect-3/4 mb-4"></div>
                <div className="h-4 bg-neutral-100 w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-100 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Campaign Banner */}
      <section className="mt-32 relative h-500px overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070" 
          alt="Campaign" 
          className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-5xl font-display font-light uppercase tracking-tighter mb-6">Summer '26 Edit</h2>
            <Link to="/shop?category=Men" className="px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 uppercase text-xs tracking-widest">
              Explore Edit
            </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070' },
          { name: 'Men', img: 'https://static.bershka.net/assets/public/a24f/1f02/8cfd47e2bf67/e87f0f0f22a7/01307156401-p/01307156401-p.jpg?ts=1772550522057&w=1920' },
          { name: 'Kids', img: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=2070' }
        ].map(cat => (
          <Link to={`/shop?category=${cat.name}`} key={cat.name} className="relative aspect-4/5 overflow-hidden group">
            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/60 to-transparent">
              <h3 className="text-white text-2xl font-display">{cat.name}</h3>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mt-2">Discover Collection</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
