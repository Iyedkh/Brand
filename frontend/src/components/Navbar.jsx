import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Heart, Menu, X, Search } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links - Left */}
        <div className="hidden lg:flex space-x-8">
          <Link to="/shop?category=Women" className="nav-link">Women</Link>
          <Link to="/shop?category=Men" className="nav-link">Men</Link>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-display font-bold tracking-[0.2em] uppercase absolute left-1/2 -translate-x-1/2"
        >
          GRAVITY
        </Link>

        {/* Icons - Right */}
        <div className="flex items-center space-x-6">
          <button className="hover:opacity-60 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <div className="relative group">
            <Link to={user ? "/profile" : "/login"} className="hover:opacity-60 transition-opacity flex items-center">
              <User size={20} strokeWidth={1.5} />
              {user && <span className="hidden lg:block ml-2 text-xs uppercase tracking-widest">{user.username}</span>}
            </Link>
            {user && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-neutral-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/profile" className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-neutral-50">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-neutral-50 text-red-500">Dashboard</Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest hover:bg-neutral-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link to="/wishlist" className="hover:opacity-60 transition-opacity relative">
            <Heart size={20} strokeWidth={1.5} />
          </Link>

          <Link to="/cart" className="hover:opacity-60 transition-opacity relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col p-10 space-y-8">
          <Link to="/shop?category=Women" className="text-2xl uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Women</Link>
          <Link to="/shop?category=Men" className="text-2xl uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Men</Link>
          <hr className="border-neutral-100" />
          <Link to="/profile" className="text-lg uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>My Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
