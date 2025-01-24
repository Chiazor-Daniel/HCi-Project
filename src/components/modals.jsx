import React, { useState } from 'react';
import { User, Lock, Mail, X } from 'lucide-react';

const AuthModals = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here
    onLogin(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // In a real app, you'd handle registration here
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 w-full max-w-md overflow-hidden shadow-xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {showLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={showLogin ? handleLogin : handleRegister}>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-white
                           placeholder-slate-400 transition-all duration-300"
                  required
                />
              </div>

              {!showLogin && (
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-white
                             placeholder-slate-400 transition-all duration-300"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-sky-500/50 text-white
                           placeholder-slate-400 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-xl
                       flex items-center justify-center gap-2 transition-colors"
            >
              {showLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="text-slate-400 hover:text-sky-400 transition-colors"
            >
              {showLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModals;