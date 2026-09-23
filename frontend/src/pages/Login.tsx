import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, Users, Sparkles, Check, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo, LogoIcon } from '../components/BrandLogo';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const authenticatedUser = await login(email, password);

    if (!authenticatedUser) {
      setLoginError('Unable to sign in with those credentials.');
      return;
    }

    if (authenticatedUser.role === 'admin') {
      navigate('/admin');
    } else if (authenticatedUser.role === 'coordinator') {
      navigate('/coordinator');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#070b14] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b1120] shadow-2xl">
        {/* Left Side: Campus Imagery with Handwritten Note */}
        <div className="relative hidden lg:flex lg:col-span-6 flex-col justify-between p-10 overflow-hidden bg-slate-900 text-white">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
            alt="Campus"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-[#0b1120]/80" />

          {/* Top content */}
          <div className="relative z-10">
            <span className="font-handwriting text-3xl sm:text-4xl text-slate-100 block leading-tight">
              Good Events <br />
              Better <span className="text-rose-400">♥</span>
            </span>
          </div>

          {/* Bottom Happen Branding */}
          <div className="relative z-10">
            <BrandLogo size="lg" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center text-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="flex items-center gap-3.5">
              <LogoIcon
                size="lg"
                rounded="rounded-2xl"
                className="ring-2 ring-indigo-400/30 shadow-lg shadow-indigo-500/20 shrink-0"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Login to manage events and create amazing experiences.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    id="login-username-input"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="login-password-input"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 pr-10 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>

                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-indigo-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              {loginError && (
                <p role="alert" className="text-xs text-rose-400">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                id="login-submit-btn"
                className="w-full rounded-full bg-indigo-600 hover:bg-indigo-500 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
              >
                Login to Dashboard
              </button>
            </form>

            <p className="text-[11px] text-center text-slate-500 pt-2">
              Your account permissions determine which dashboard you can access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
