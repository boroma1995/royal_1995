import React from 'react';
import { FlowStep } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhoneSimulatorProps {
  currentStep: FlowStep;
  onSetStep: (step: FlowStep) => void;
  children: React.ReactNode;
}

const FLOW_STEPS_ORDER: { step: FlowStep; num: number; label: string }[] = [
  { step: 'register', num: 1, label: 'Register' },
  { step: 'home', num: 2, label: 'Home' },
  { step: 'score', num: 3, label: 'Score' },
  { step: 'feeling', num: 4, label: 'Feeling' },
  { step: 'location', num: 5, label: 'Location' },
  { step: 'attire', num: 6, label: 'Attire' },
  { step: 'eyes', num: 7, label: 'Eyes Went To' },
  { step: 'build', num: 8, label: 'Her Build' },
  { step: 'hair', num: 9, label: 'Hair Color' },
  { step: 'comments', num: 10, label: 'Comments' },
  { step: 'review_or_submit', num: 11, label: 'Review / Submit' },
  { step: 'review', num: 12, label: 'Review' },
  { step: 'confirmation', num: 13, label: 'Confirmation' },
  { step: 'create_report', num: 14, label: 'Create Report' },
  { step: 'reports', num: 15, label: 'Reports' },
  { step: 'settings', num: 16, label: 'Settings' },
];

export function PhoneSimulator({ currentStep, onSetStep, children }: PhoneSimulatorProps) {
  const currentIdx = FLOW_STEPS_ORDER.findIndex((s) => s.step === currentStep);

  const handlePrevStep = () => {
    if (currentIdx > 0) {
      onSetStep(FLOW_STEPS_ORDER[currentIdx - 1].step);
    }
  };

  const handleNextStep = () => {
    if (currentIdx < FLOW_STEPS_ORDER.length - 1) {
      onSetStep(FLOW_STEPS_ORDER[currentIdx + 1].step);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 px-1">
      {/* Quick Step Bar above Phone */}
      <div className="w-full max-w-[440px] mb-3 flex items-center justify-between bg-[#030814] border border-[#765b24]/60 rounded-xl p-2 shadow-lg">
        <button
          onClick={handlePrevStep}
          disabled={currentIdx <= 0}
          className="p-1 text-[#d9bd61] hover:text-[#fff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Previous screen"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 max-w-[320px]">
          {FLOW_STEPS_ORDER.slice(0, 14).map((s) => (
            <button
              key={s.step}
              onClick={() => onSetStep(s.step)}
              title={`${s.num}. ${s.label}`}
              className={`w-6 h-6 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer ${
                currentStep === s.step
                  ? 'bg-gradient-to-b from-[#f1ca63] to-[#c9982c] text-[#030814] ring-2 ring-[#f1ca63]/60 scale-110 shadow-md'
                  : 'bg-[#030814] border border-[#765b24]/60 text-[#d9bd61] hover:border-[#f1ca63]'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextStep}
          disabled={currentIdx >= FLOW_STEPS_ORDER.length - 1}
          className="p-1 text-[#d9bd61] hover:text-[#fff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Next screen"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dark Royal Blue Phone Frame / Native Container on Mobile */}
      <div className="relative w-full max-w-[440px] sm:w-[390px] sm:h-[810px] min-h-[580px] bg-[#030814] rounded-2xl sm:rounded-[52px] p-2 sm:p-3 sm:shadow-[0_0_0_2px_#765b24,0_0_0_5px_#030814,0_25px_60px_rgba(0,0,0,0.95)] border border-[#765b24]/50 sm:border-[#f1ca63]/30 flex flex-col justify-between select-none">
        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#030814] rounded-xl sm:rounded-[42px] overflow-hidden flex flex-col justify-between border border-[#765b24]/40 shadow-inner">
          {/* Screen Content Area with Smooth Scroll */}
          <div className="flex-1 overflow-y-auto px-1.5 sm:px-2 py-3 select-text">
            {children}
          </div>

          {/* Bottom Home Indicator */}
          <div className="pb-2 pt-1 flex justify-center shrink-0 z-30">
            <div className="w-24 sm:w-32 h-1 bg-[#f1ca63]/40 rounded-full hover:bg-[#f1ca63] transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
