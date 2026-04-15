import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const { register, user, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      register(username, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md p-10 border border-neutral-100 shadow-sm"
      >
        <h1 className="text-3xl font-display font-light uppercase tracking-tighter text-center mb-10">Create Account</h1>
        
        {(error || message) && (
          <div className="bg-red-50 text-red-500 text-[10px] uppercase p-4 mb-6">
            {error || message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-50">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="YOUR SURNAME"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-50">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="YOUR@EMAIL.COM"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-50">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-50">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-all disabled:bg-neutral-300"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-neutral-50 flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-400">
          <span>Already registered?</span>
          <Link to={`/login?redirect=${redirect}`} className="text-black underline">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
