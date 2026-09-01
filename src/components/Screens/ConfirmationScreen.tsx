import { GoldDivider } from '../GoldDivider';
import { EngagementRecord } from '../../types';
import { CheckCircle2, Home, BarChart2, ShieldCheck } from 'lucide-react';

interface ConfirmationScreenProps {
  lastEngagement: EngagementRecord | null;
  onHome: () => void;
  onViewReports: () => void;
  onLogAnother: () => void;
}

export function ConfirmationScreen({
  lastEngagement,
  onHome,
  onViewReports,
}: ConfirmationScreenProps) {
  const dateStr = lastEngagement?.dateStr || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = lastEngagement?.timeStr || new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-6 text-center">
      {/* Golden Glowing Checkmark */}
      <div className="relative my-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#030814] border border-[#f1ca63] flex items-center justify-center shadow-[0_0_25px_rgba(241,202,99,0.35)]">
          <CheckCircle2 className="w-8 h-8 text-[#f1ca63]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Title */}
      <h2 className="font-serif-gold text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
        ENGAGEMENT LOGGED
      </h2>

      {/* Spearline Divider */}
      <GoldDivider compact={true} />
      
      <p className="text-xs text-[#d5d4ca] font-medium my-2 leading-relaxed">
        Your entry has been recorded and encrypted in your accountability log.
      </p>

      {/* Timestamp Badge */}
      <div className="inline-block bg-[#030814] border border-[#6c5424] rounded-lg px-4 py-2 my-2 shadow-inner">
        <span className="text-xs font-bold text-[#f7f4e8] tracking-wider block">
          {dateStr}
        </span>
        <span className="text-xs font-bold text-[#f1ca63] tracking-widest block mt-0.5">
          {timeStr}
        </span>
      </div>

      {/* Encouragement Quote */}
      <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-3.5 my-4 text-left relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1 text-[#f1ca63]">
          <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            AWARENESS IS VICTORY
          </span>
        </div>
        <p className="text-xs text-[#b9b7ad] italic leading-relaxed m-0">
          "The first step in breaking unconscious looking habits is total honesty with yourself and tracking every glance."
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-2.5 max-w-xs mx-auto pt-2">
        <button
          type="button"
          id="confirmation-home-btn"
          onClick={onHome}
          className="w-full btn-gold py-3 rounded-md text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Home className="w-3.5 h-3.5 text-[#090d10]" strokeWidth={1.5} />
          BACK TO HOME
        </button>

        <button
          type="button"
          id="confirmation-reports-btn"
          onClick={onViewReports}
          className="w-full btn-dark py-3 rounded-md text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <BarChart2 className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
          VIEW IN REPORTS
        </button>
      </div>
    </div>
  );
}
