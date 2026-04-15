import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Package, TrendingUp } from 'lucide-react';
import api from '../api';
import AdminNav from '../components/AdminNav';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    usersCount: 0,
    productsCount: 0
  });

  useEffect(() => {
    // In a real app, fetch statistics here
    setStats({
      totalSales: 12450.50,
      ordersCount: 45,
      usersCount: 120,
      productsCount: 32
    });
  }, []);

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex items-center space-x-4 mb-12">
        <LayoutDashboard size={32} strokeWidth={1} />
        <h1 className="text-4xl font-display font-light uppercase">Dashboard</h1>
      </div>

      <AdminNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', value: `$${stats.totalSales}`, icon: <DollarSign className='text-emerald-500'/>, trend: '+12.5%' },
          { label: 'Total Orders', value: stats.ordersCount, icon: <ShoppingBag className='text-blue-500'/>, trend: '+5.2%' },
          { label: 'Total Users', value: stats.usersCount, icon: <Users className='text-purple-500'/>, trend: '+8.1%' },
          { label: 'Products in Catalog', value: stats.productsCount, icon: <Package className='text-amber-500'/>, trend: '+2' },
        ].map((item, idx) => (
          <div key={idx} className="bg-neutral-50 p-8 border border-neutral-100 group hover:border-black transition-all duration-500">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-full border border-neutral-100">{item.icon}</div>
                <span className="text-[10px] text-emerald-600 font-medium">{item.trend}</span>
             </div>
             <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">{item.label}</p>
             <h3 className="text-3xl font-display font-light">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Simple Activity List */}
         <div className="bg-white border border-neutral-100 p-8">
            <h3 className="text-xs uppercase tracking-[0.3em] border-b border-neutral-100 pb-4 mb-6">Recent Activities</h3>
            <div className="space-y-6">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                    <div className="flex items-center space-x-4">
                       <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[10px]">OA</div>
                       <div>
                          <p className="text-[10px] uppercase tracking-widest">Order #3245 created</p>
                          <p className="text-[9px] text-neutral-400">2 hours ago</p>
                       </div>
                    </div>
                    <span className="text-[10px] font-medium">$129.00</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Stats Chart Placeholder */}
         <div className="bg-black text-white p-8 overflow-hidden relative">
            <h3 className="text-xs uppercase tracking-[0.3em] border-b border-white/10 pb-4 mb-6">Sales Performance</h3>
            <div className="h-64 flex items-end space-x-4">
               {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                 <div key={i} className="flex-1 bg-white/20 hover:bg-white transition-all cursor-pointer" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <div className="mt-6 flex justify-between text-[9px] uppercase tracking-widest text-white/40">
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
               <span>Sun</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
