import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Package, TrendingUp } from 'lucide-react';
import api from '../api';
import AdminNav from '../components/AdminNav';
import useAuthStore from '../store/useAuthStore';
import PageTransition from '../components/PageTransition';
import { Skeleton } from '../components/Skeleton';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    usersCount: 0,
    productsCount: 0
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await api.get('/api/dashboard', config);
        setStats(data.stats);
        setActivities(data.activities);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error(error);
        setLoading(false);
      }
    };
    if (user?.token) fetchDashboardData();
  }, [user]);

  if (loading) {
     return (
        <PageTransition className="pt-32 pb-20 container mx-auto px-6">
           <Skeleton className="h-10 w-1/4 mb-12" />
           <Skeleton className="h-14 w-full mb-8" />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1,2,3,4].map(n => <Skeleton key={n} className="h-40 w-full" />)}
           </div>
        </PageTransition>
     )
  }

  return (
    <PageTransition className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex items-center space-x-4 mb-12">
        <LayoutDashboard size={32} strokeWidth={1} />
        <h1 className="text-4xl font-display font-light uppercase">Dashboard</h1>
      </div>

      <AdminNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', value: `${stats.totalSales} TND`, icon: <DollarSign className='text-emerald-500'/>, trend: '+12.5%' },
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
               {activities.length === 0 ? <p className="text-[10px] uppercase text-neutral-400">No recent activities</p> : null}
               {activities.map((order) => (
                 <div key={order._id} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
                    <div className="flex items-center space-x-4">
                       <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[10px]">
                         {order.user?.username ? order.user.username.substring(0, 2).toUpperCase() : 'OA'}
                       </div>
                       <div>
                          <p className="text-[10px] uppercase tracking-widest">Order #{order._id.substring(0, 8)}</p>
                          <p className="text-[9px] text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <span className="text-[10px] font-medium">{(order.totalPrice || 0).toFixed(2)} TND</span>
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
    </PageTransition>
  );
};

export default AdminDashboard;
