import React, { useState } from 'react';
import { LionCrest } from '../LionCrest';
import { GoldDivider } from '../GoldDivider';
import { UserProfile } from '../../types';
import { User, Phone, Mail, Lock } from 'lucide-react';

interface RegisterScreenProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onContinue: () => void;
}

export function RegisterScreen({ user, onSaveProfile, onContinue }: RegisterScreenProps) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [email, setEmail] = useState(user.email || '');
  const [accountabilityEmail, setAccountabilityEmail] = useState(user.accountabilityEmail || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      name: name.trim() || 'John Doe',
      phone: phone.trim() || '(555) 234-5678',
      email: email.trim() || 'john.doe@example.com',
      accountabilityEmail: accountabilityEmail.trim() || 'mentor@example.com',
      isRegistered: true,
    });
    onContinue();
  };

  return (
    <div className="w-full max-w-[460px] mx-auto p-4 sm:p-6 text-center">
      {/* Brand Logo - No Text "LOOK AWAY" */}
      <div className="flex justify-center mb-1">
        <LionCrest size={76} glow={true} />
      </div>

      {/* Gold Spearline Divider */}
      <GoldDivider compact={true} />

      <p className="text-[12px] text-[#e6c866] font-bold tracking-widest uppercase mb-5">
        {isLoginMode ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT'}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        {!isLoginMode && (
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="register-name-input"
                required={!isLoginMode}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full gold-input pl-10 text-sm font-medium"
              />
              <User className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
        )}

        {!isLoginMode && (
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="register-phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 234-5678"
                className="w-full gold-input pl-10 text-sm font-medium"
              />
              <Phone className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="register-email-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className="w-full gold-input pl-10 text-sm font-medium"
            />
            <Mail className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
          </div>
        </div>

        {!isLoginMode && (
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
              Accountability Partner Email (Optional)
            </label>
            <div className="relative">
              <input
                type="email"
                id="register-accountability-input"
                value={accountabilityEmail}
                onChange={(e) => setAccountabilityEmail(e.target.value)}
                placeholder="mentor@example.com"
                className="w-full gold-input pl-10 text-sm font-medium"
              />
              <Lock className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>
        )}

        <button
          type="submit"
          id="register-submit-btn"
          className="w-full btn-gold py-3.5 rounded-md text-sm font-bold tracking-wider uppercase mt-3 cursor-pointer shadow-lg"
        >
          {isLoginMode ? 'LOG IN' : 'REGISTER'}
        </button>
      </form>

      {/* Switch Mode */}
      <div className="mt-5 text-xs text-[#b9b7ad]">
        {isLoginMode ? (
          <span>
            Don't have an account?{' '}
            <button
              type="button"
              id="switch-to-register-btn"
              onClick={() => setIsLoginMode(false)}
              className="text-[#f1ca63] font-bold hover:underline ml-1 cursor-pointer"
            >
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button
              type="button"
              id="switch-to-login-btn"
              onClick={() => setIsLoginMode(true)}
              className="text-[#f1ca63] font-bold hover:underline ml-1 cursor-pointer"
            >
              Login
            </button>
          </span>
        )}
      </div>

      {/* Trust Quote */}
      <div className="mt-8 pt-2">
        <GoldDivider compact={true} />
        <p className="text-[11px] text-[#b9b7ad] italic leading-relaxed mt-2">
          "I will set before my eyes no vile thing."
        </p>
        <span className="text-[10px] text-[#8b681f] font-bold uppercase tracking-wider block mt-1">
          Psalm 101:3
        </span>
      </div>
    </div>
  );
}
