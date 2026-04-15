import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Tag, Users } from 'lucide-react';

const AdminNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/admin', icon: <LayoutDashboard size={14} /> },
    { label: 'Products', path: '/admin/products', icon: <Package size={14} /> },
    { label: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={14} /> },
    { label: 'Categories', path: '/admin/categories', icon: <Tag size={14} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={14} /> },
  ];

  return (
    <div className="flex space-x-8 border-b border-neutral-100 mb-12 pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 ${
              isActive ? 'border-black text-black opacity-100' : 'border-transparent text-neutral-400 opacity-60 hover:opacity-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminNav;
