import { SCORE_OPTIONS } from '../../data/constants';
import { ScoreLevel } from '../../types';
import { StepProgressBar } from '../StepProgressBar';
import { GoldDivider } from '../GoldDivider';
import { Eye, EyeOff, Clock, Heart, ChevronLeft, ArrowRight, Check } from 'lucide-react';

interface ScoreScreenProps {
  selectedScore: ScoreLevel | null;
  onSelectScore: (score: ScoreLevel) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ScoreScreen({
  selectedScore,
  onSelectScore,
  onNext,
  onBack,
}: ScoreScreenProps) {
  const getIcon = (level: ScoreLevel) => {
    switch (level) {
      case 1:
        return <Eye className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />;
      case 2:
        return <EyeOff className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />;
      case 3:
        return <Clock className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />;
      case 4:
        return <Heart className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />;
    }
  };

  const handlePick = (level: ScoreLevel) => {
    onSelectScore(level);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-5">
      {/* Progress Bar: Step 1 of 8 */}
      <StepProgressBar currentStepIndex={1} totalSteps={8} stepTitle="Step 1 of 8 • Severity" />

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif-gold text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          ENGAGEMENT SCORE
        </h2>
        <GoldDivider compact={true} />
        <p className="text-xs text-[#d5d4ca] font-medium tracking-wide">
          How serious was the engagement?
        </p>
      </div>

      {/* Score Option Cards */}
      <div className="space-y-2.5">
        {SCORE_OPTIONS.map((opt) => {
          const isSelected = selectedScore === opt.level;
          return (
            <button
              key={opt.level}
              type="button"
              id={`score-option-${opt.level}`}
              onClick={() => handlePick(opt.level)}
              className={`w-full p-3.5 rounded-lg border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#c9982c] to-[#805c18] border-[#f0c65c] text-[#090d10] shadow-[0_0_15px_rgba(241,202,99,0.3)]'
                  : 'bg-[#030814] border-[#6c5424] text-[#eee] hover:border-[#f1ca63] hover:bg-[#07101f]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-[#090d10] bg-[#090d10]/20 text-[#090d10]'
                      : 'border-[#8b681f] bg-[#030814] text-[#f1ca63]'
                  }`}
                >
                  {getIcon(opt.level)}
                </div>
                <div>
                  <h4
                    className={`font-serif-gold text-xs sm:text-sm font-bold tracking-wider uppercase m-0 ${
                      isSelected ? 'text-[#090d10]' : 'text-[#f1ca63]'
                    }`}
                  >
                    {opt.title}
                  </h4>
                  <p
                    className={`text-[11px] leading-tight mt-0.5 ${
                      isSelected ? 'text-[#1a2329]' : 'text-[#b9b7ad]'
                    }`}
                  >
                    {opt.description}
                  </p>
                </div>
              </div>

              {/* Gold Check Indicator */}
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold ${
                  isSelected
                    ? 'border-[#090d10] bg-[#090d10] text-[#f1ca63]'
                    : 'border-[#927329] bg-[#030814]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#f1ca63]" strokeWidth={2} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-[#765b24]/40">
        <button
          type="button"
          id="score-back-btn"
          onClick={onBack}
          className="btn-dark px-4 py-2 rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
          BACK
        </button>

        <button
          type="button"
          id="score-next-btn"
          disabled={!selectedScore}
          onClick={onNext}
          className={`btn-gold px-5 py-2 rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer ${
            !selectedScore ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          NEXT
          <ArrowRight className="w-3.5 h-3.5 text-[#090d10]" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
