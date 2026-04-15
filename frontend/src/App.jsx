import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import PaymentStatus from './pages/PaymentStatus';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetails from './pages/AdminOrderDetails';
import AdminCategories from './pages/AdminCategories';
import AdminUsers from './pages/AdminUsers';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster position="bottom-center" />
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="product/:id/edit" element={<AdminProductEdit />} />
              <Route path="product/new" element={<AdminProductEdit />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="order/:id" element={<AdminOrderDetails />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            {/* Profile Routes would go here */}
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-neutral-50 px-6 py-20 border-t border-neutral-100 mt-20">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-[10px] uppercase tracking-widest text-neutral-400">
            <div>
              <h4 className="text-black mb-6">Support</h4>
              <ul className="space-y-3">
                <li><Link to="#">Order Status</Link></li>
                <li><Link to="#">Shipping & Delivery</Link></li>
                <li><Link to="#">Returns</Link></li>
                <li><Link to="#">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black mb-6">Account</h4>
              <ul className="space-y-3">
                <li><Link to="/login">My Account</Link></li>
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="#">Wishlist</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black mb-6">Company</h4>
              <ul className="space-y-3">
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Sustainability</Link></li>
                <li><Link to="#">Press</Link></li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h4 className="text-black mb-6">Newsletter</h4>
              <p className="mb-6 leading-relaxed">Join for exclusive early access and fashion news.</p>
              <div className="flex border-b border-black pb-2">
                <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-transparent flex-1 focus:outline-none" />
                <ArrowRight size={14} className="text-black" />
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-20 pt-10 border-t border-neutral-100 flex justify-between items-center text-[9px] uppercase tracking-widest text-neutral-400">
             <p>© 2026 GRAVITY FASHION. ALL RIGHTS RESERVED.</p>
             <div className="flex space-x-6">
                <span>Instagram</span>
                <span>TikTok</span>
                <span>Threads</span>
             </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
