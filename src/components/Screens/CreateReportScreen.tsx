import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Calendar, Mail, FileText, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CreateReportScreenProps {
  user: UserProfile;
  startDate: string;
  endDate: string;
  onUpdateDates: (start: string, end: string) => void;
  onGenerateReport: (emailToSend: string) => void;
  onBack: () => void;
}

export function CreateReportScreen({
  user,
  startDate,
  endDate,
  onUpdateDates,
  onGenerateReport,
  onBack,
}: CreateReportScreenProps) {
  const [email, setEmail] = useState(user.accountabilityEmail || user.email || '');
  const [start, setStart] = useState(startDate || '2025-05-01');
  const [end, setEnd] = useState(endDate || '2025-05-21');
  const [reportFormat, setReportFormat] = useState<'full' | 'summary'>('full');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDates(start, end);
    onGenerateReport(email);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          CREATE REPORT
        </h2>
        <p className="text-xs sm:text-sm text-[#d5d4ca] font-medium tracking-wide mt-1.5 leading-relaxed">
          Select a date range and accountability recipient to compile comprehensive visual engagement analytics.
        </p>
      </div>

      {/* Report Config Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-black tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#f1ca63]" />
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="report-start-date"
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full gold-input pl-10 text-xs sm:text-sm"
            />
            <Calendar className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#f1ca63]" />
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="report-end-date"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full gold-input pl-10 text-xs sm:text-sm"
            />
            <Calendar className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#f1ca63]" />
            Email Address (Accountability Partner)
          </label>
          <div className="relative">
            <input
              type="email"
              id="report-email-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="accountability@mentor.com"
              className="w-full gold-input pl-10 text-xs sm:text-sm"
            />
            <Mail className="w-4 h-4 text-[#8b681f] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Quick Date Presets */}
        <div className="pt-1">
          <span className="text-[10px] uppercase font-bold text-[#8b681f] tracking-wider block mb-1.5">
            Quick Date Presets:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setStart('2025-05-15');
                setEnd('2025-05-21');
              }}
              className="py-1.5 px-2 bg-[#030814] border border-[#765b24]/60 rounded text-[10px] font-bold text-[#f1ca63] hover:border-[#f1ca63] transition-colors"
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => {
                setStart('2025-05-01');
                setEnd('2025-05-21');
              }}
              className="py-1.5 px-2 bg-[#030814] border border-[#765b24]/60 rounded text-[10px] font-bold text-[#f1ca63] hover:border-[#f1ca63] transition-colors"
            >
              Month to Date
            </button>
            <button
              type="button"
              onClick={() => {
                setStart('2025-01-01');
                setEnd('2025-05-21');
              }}
              className="py-1.5 px-2 bg-[#030814] border border-[#765b24]/60 rounded text-[10px] font-bold text-[#f1ca63] hover:border-[#f1ca63] transition-colors"
            >
              All Time
            </button>
          </div>
        </div>

        <button
          type="submit"
          id="generate-report-submit-btn"
          className="w-full btn-gold py-3.5 rounded-md text-xs sm:text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
        >
          <FileText className="w-4 h-4 text-[#090d10]" />
          GENERATE REPORT
        </button>
      </form>

      <div className="mt-5 pt-3 border-t border-[#765b24]/40 flex justify-center">
        <button
          type="button"
          id="create-report-back-btn"
          onClick={onBack}
          className="text-xs text-[#b9b7ad] hover:text-[#f1ca63] flex items-center gap-1 font-bold uppercase tracking-wider cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          BACK
        </button>
      </div>
    </div>
  );
}
