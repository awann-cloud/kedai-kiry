/**
 * Login.tsx - Landing/Login Page
 * 
 * A dummy login page that allows navigation to:
 * - Display (Home) - The main kitchen order management system
 * - Admin - The admin dashboard for managing employees and menu
 */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDisplayLogin = () => {
    navigate('/home');
  };

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#4D236E] flex items-center justify-center p-8">
      <div className="bg-[#3c044d] rounded-3xl shadow-2xl p-12 w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl mb-2">Kedai Kiry</h1>
          <p className="text-white/70 text-lg">Order Management System</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-white/80 mb-2 text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white/80 mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>

          {/* Login Buttons */}
          <div className="space-y-3 pt-4">
            {/* Display Login Button */}
            <button
              onClick={handleDisplayLogin}
              className="w-full h-14 bg-white text-[#4D236E] rounded-xl font-['Poppins:Bold',sans-serif] text-lg hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
            >
              Login to Display
            </button>

            {/* Admin Login Button */}
            <button
              onClick={handleAdminLogin}
              className="w-full h-14 bg-[rgba(126,42,126,0.46)] border border-[rgba(251,100,182,0.2)] text-white rounded-xl font-['Poppins:Bold',sans-serif] text-lg hover:bg-[rgba(126,42,126,0.6)] active:scale-95 transition-all"
            >
              Login to Admin
            </button>
          </div>

          {/* Hint Text */}
          <div className="text-center pt-4">
            <p className="text-white/50 text-xs">
              This is a demo login page. Click any button to proceed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
