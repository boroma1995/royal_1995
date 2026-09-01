import React, { useState } from 'react';
import { LionCrest } from './LionCrest';
import { GoldDivider } from './GoldDivider';
import { UserProfile } from '../types';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  onLogin: (profile: UserProfile) => void;
  onSignUp: (profile: UserProfile) => void;
}

export function AuthModal({
  isOpen,
  currentUser,
  onLogin,
  onSignUp,
}: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  
  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState(currentUser.email || '');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sign Up Form Fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPin, setSignUpPin] = useState('');
  const [signUpAccountabilityEmail, setSignUpAccountabilityEmail] = useState('');
  const [showSignUpPin, setShowSignUpPin] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or username.');
      return;
    }

    const matchedUser: UserProfile = {
      ...currentUser,
      email: loginEmail.trim(),
      name: loginEmail.toLowerCase().includes('john')
        ? 'John Doe'
        : currentUser.name || loginEmail.split('@')[0],
      phone: currentUser.phone || '(555) 234-5678',
      accountabilityEmail: currentUser.accountabilityEmail || 'mentor@example.com',
      isRegistered: true,
      pin: loginPin || '1234',
    };

    onLogin(matchedUser);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'John Doe',
      phone: '(555) 234-5678',
      email: 'john.doe@example.com',
      accountabilityEmail: 'mentor.smith@example.com',
      isRegistered: true,
      pin: '1234',
      joinedDate: 'May 1, 2025',
    };
    onLogin(demoUser);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpName.trim()) {
      setSignUpError('Please enter your full name.');
      return;
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setSignUpError('Please enter a valid email address.');
      return;
    }

    const newUser: UserProfile = {
      name: signUpName.trim(),
      phone: signUpPhone.trim() || '(555) 234-5678',
      email: signUpEmail.trim(),
      accountabilityEmail: signUpAccountabilityEmail.trim() || 'mentor@example.com',
      isRegistered: true,
      pin: signUpPin || '1234',
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSignUp(newUser);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#030814]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="auth-modal-container"
        className="w-full max-w-[480px] bg-[#030814] border border-[#8b681f] rounded-2xl shadow-[0_0_50px_rgba(201,152,44,0.35)] overflow-hidden my-auto p-5 sm:p-7 text-center relative"
      >
        {/* Emblem */}
        <div className="flex justify-center mb-2">
          <LionCrest size={68} glow={true} />
        </div>

        <h2 className="font-serif-gold text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#f1ca63] uppercase m-0 leading-tight">
          LOOK AWAY
        </h2>
        <p className="text-[11px] text-[#b9b7ad] tracking-widest uppercase mt-1 mb-3">
          Eyes of Integrity • Visual Discipline Suite
        </p>

        <GoldDivider compact={true} />

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#02050c] p-1 rounded-xl border border-[#765b24]/60 my-4">
          <button
            type="button"
            id="tab-login-btn"
            onClick={() => {
              setTab('login');
              setLoginError('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-gradient-to-r from-[#c9982c] to-[#805c18] text-[#090d10] shadow-[0_0_12px_rgba(241,202,99,0.3)]'
                : 'text-[#b9b7ad] hover:text-[#f1ca63]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            id="tab-signup-btn"
            onClick={() => {
              setTab('signup');
              setSignUpError('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-gradient-to-r from-[#c9982c] to-[#805c18] text-[#090d10] shadow-[0_0_12px_rgba(241,202,99,0.3)]'
                : 'text-[#b9b7ad] hover:text-[#f1ca63]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Log In Tab Content */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="text-left space-y-3.5 mt-2">
            {loginError && (
              <div className="bg-red-950/60 border border-red-500/80 text-red-200 text-xs p-2.5 rounded-lg font-medium">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="auth-login-email-input"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full gold-input pl-10 text-xs sm:text-sm font-medium"
                />
                <Mail className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPin ? 'text' : 'password'}
                  id="auth-login-pin-input"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className="w-full gold-input pl-10 pr-10 text-xs sm:text-sm font-medium"
                />
                <Lock className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                <button
                  type="button"
                  onClick={() => setShowLoginPin(!showLoginPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b681f] hover:text-[#f1ca63] cursor-pointer"
                >
                  {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="auth-login-submit-btn"
              className="w-full btn-gold py-3 rounded-lg text-xs font-bold tracking-wider uppercase mt-3 cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#090d10]" strokeWidth={2} />
              Log In & Access App Features
            </button>

            {/* Quick Demo Login Option */}
            <button
              type="button"
              id="auth-quick-demo-btn"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-lg bg-[#02050c] border border-[#765b24]/70 text-[#f1ca63] text-xs font-bold hover:bg-[#07101f] hover:border-[#f1ca63] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm mt-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#f1ca63]" />
              Quick Demo Access (John Doe)
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-[#b9b7ad]">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className="text-[#f1ca63] font-bold hover:underline cursor-pointer ml-1"
                >
                  Sign Up here
                </button>
              </span>
            </div>
          </form>
        ) : (
          /* Sign Up Tab Content */
          <form onSubmit={handleSignUpSubmit} className="text-left space-y-3 mt-2">
            {signUpError && (
              <div className="bg-red-950/60 border border-red-500/80 text-red-200 text-xs p-2.5 rounded-lg font-medium">
                {signUpError}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="auth-signup-name-input"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full gold-input pl-10 text-xs sm:text-sm font-medium"
                />
                <User className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="auth-signup-email-input"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full gold-input pl-10 text-xs sm:text-sm font-medium"
                  />
                  <Mail className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                  Phone (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="auth-signup-phone-input"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full gold-input pl-10 text-xs sm:text-sm font-medium"
                  />
                  <Phone className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                Set Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type={showSignUpPin ? 'text' : 'password'}
                  id="auth-signup-pin-input"
                  value={signUpPin}
                  onChange={(e) => setSignUpPin(e.target.value)}
                  placeholder="Create 4-digit PIN (e.g. 1234)"
                  className="w-full gold-input pl-10 pr-10 text-xs sm:text-sm font-medium"
                />
                <Lock className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                <button
                  type="button"
                  onClick={() => setShowSignUpPin(!showSignUpPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b681f] hover:text-[#f1ca63] cursor-pointer"
                >
                  {showSignUpPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
                Accountability Partner Email (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="auth-signup-accountability-input"
                  value={signUpAccountabilityEmail}
                  onChange={(e) => setSignUpAccountabilityEmail(e.target.value)}
                  placeholder="mentor@example.com"
                  className="w-full gold-input pl-10 text-xs sm:text-sm font-medium"
                />
                <ShieldCheck className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
              </div>
            </div>

            <button
              type="submit"
              id="auth-signup-submit-btn"
              className="w-full btn-gold py-3 rounded-lg text-xs font-bold tracking-wider uppercase mt-3 cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#090d10]" strokeWidth={2} />
              Create Account & Unlock App
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-[#b9b7ad]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-[#f1ca63] font-bold hover:underline cursor-pointer ml-1"
                >
                  Log In here
                </button>
              </span>
            </div>
          </form>
        )}

        {/* Feature Highlights Unlocked After Login */}
        <div className="mt-5 pt-3 border-t border-[#765b24]/40 text-left">
          <span className="text-[10px] font-bold text-[#f1ca63] uppercase tracking-wider block mb-1.5">
            Features Unlocked Upon Sign In:
          </span>
          <ul className="space-y-1 text-[11px] text-[#b9b7ad]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" />
              <span>4-Tier Score scale tracking with location, attire & feelings analysis</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" />
              <span>Executive accountability dashboards with PDF & CSV export</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" />
              <span>Private, secure local storage with mentor email reporting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
