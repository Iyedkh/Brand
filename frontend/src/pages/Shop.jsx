import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { ProductSkeleton } from '../components/Skeleton';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const keyword = queryParams.get('keyword');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/products`, {
          params: {
            pageNumber: currentPage,
            keyword: keyword || '',
            category: category || '',
          }
        });
        setProducts(data.products);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, keyword, category]);

  return (
    <PageTransition className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-neutral-100 pb-8">
        <div>
          <h1 className="text-4xl font-display font-light uppercase">
            {category ? category : keyword ? `Search: ${keyword}` : 'All Collection'}
          </h1>
          <p className="text-neutral-400 text-[10px] tracking-widest mt-2 uppercase">
            {products.length} Products Found
          </p>
        </div>

        <div className="flex space-x-6 mt-6 md:mt-0">
          <button className="flex items-center text-[10px] uppercase tracking-widest border-b border-black pb-1">
            Sort By <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="flex items-center text-[10px] uppercase tracking-widest border-b border-black pb-1">
            Filter <Filter size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <ProductSkeleton key={n} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-neutral-400 uppercase tracking-widest">No products found in this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-20 space-x-2">
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setCurrentPage(x + 1)}
                  className={`w-10 h-10 border border-neutral-100 text-[10px] uppercase transition-all ${
                    currentPage === x + 1 ? 'bg-black text-white' : 'hover:bg-neutral-50'
                  }`}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </PageTransition>
  );
};

export default Shop;
