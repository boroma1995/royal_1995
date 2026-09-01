import { HeroSilhouette } from '../LionCrest';
import { GoldDivider } from '../GoldDivider';
import { UserProfile, EngagementRecord } from '../../types';
import { PlusCircle, FileText, Shield } from 'lucide-react';

interface HomeScreenProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  onStartLogging: () => void;
  onCreateReport: () => void;
  onViewReports: () => void;
}

export function HomeScreen({
  engagements,
  onStartLogging,
  onCreateReport,
  onViewReports,
}: HomeScreenProps) {
  const totalEngagements = engagements.length;
  const avgScore = totalEngagements
    ? (engagements.reduce((acc, curr) => acc + curr.score, 0) / totalEngagements).toFixed(1)
    : '0.0';

  const lastLogged = engagements[0];

  return (
    <div className="w-full max-w-[480px] mx-auto p-2 sm:p-5 text-center flex flex-col justify-between">
      {/* Top Header */}
      <div>
        {/* Gold Spearline Top Divider */}
        <GoldDivider compact={true} />

        {/* Hero Logo Graphic without background or box */}
        <HeroSilhouette />

        {/* Gold Spearline Bottom Divider */}
        <GoldDivider compact={true} />

        {/* Quick Discipline Badge Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-2.5 sm:my-3.5">
          <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2 sm:p-2.5 text-center">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#b9b7ad] block tracking-wider">
              Total Logged
            </span>
            <span className="text-base sm:text-lg font-serif-gold font-bold text-[#f1ca63]">
              {totalEngagements}
            </span>
          </div>

          <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2 sm:p-2.5 text-center">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#b9b7ad] block tracking-wider">
              Avg Score
            </span>
            <span className="text-base sm:text-lg font-serif-gold font-bold text-[#f1ca63]">
              {avgScore}
            </span>
          </div>

          <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2 sm:p-2.5 text-center">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#b9b7ad] block tracking-wider">
              Status
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-[#4ade80] flex items-center justify-center gap-1 mt-0.5 sm:mt-1">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4ade80]" strokeWidth={1.5} /> Armed
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-2.5 sm:space-y-3 my-2">
        <button
          type="button"
          id="home-log-engagement-btn"
          onClick={onStartLogging}
          className="w-full btn-gold py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(201,152,44,0.35)]"
        >
          <PlusCircle className="w-4 h-4 text-[#090d10]" strokeWidth={1.75} />
          LOG ENGAGEMENT
        </button>

        <button
          type="button"
          id="home-create-report-btn"
          onClick={onCreateReport}
          className="w-full btn-dark py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
          CREATE REPORT
        </button>
      </div>

      {/* Recent Activity Footnote */}
      {lastLogged && (
        <div
          onClick={onViewReports}
          className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-[#030814] border border-[#6c5424] rounded-lg text-left text-xs cursor-pointer hover:border-[#f1ca63] transition-colors flex items-center justify-between"
        >
          <div className="truncate pr-2">
            <span className="text-[9px] sm:text-[10px] text-[#8b681f] font-bold uppercase tracking-wider block">
              Last Engagement: {lastLogged.dateStr} • {lastLogged.timeStr}
            </span>
            <span className="text-[#f7f4e8] font-semibold text-[10px] sm:text-[11px] truncate block">
              {lastLogged.scoreLabel} • {lastLogged.locations.join(', ') || 'General'}
            </span>
          </div>
          <span className="text-[10px] font-black text-[#f1ca63] uppercase shrink-0">
            View &rarr;
          </span>
        </div>
      )}
    </div>
  );
}
