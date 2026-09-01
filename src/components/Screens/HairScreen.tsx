import { HAIR_OPTIONS } from '../../data/constants';
import { StepProgressBar } from '../StepProgressBar';
import { ChevronLeft, ArrowRight } from 'lucide-react';

interface HairScreenProps {
  selectedHair: string;
  otherText: string;
  onSelectHair: (color: string) => void;
  onChangeOther: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function HairScreen({
  selectedHair,
  otherText,
  onSelectHair,
  onChangeOther,
  onNext,
  onBack,
}: HairScreenProps) {
  const isOtherSelected = selectedHair === 'OTHER';

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-5">
      {/* Progress Bar: Step 7 of 8 */}
      <StepProgressBar currentStepIndex={7} totalSteps={8} stepTitle="Step 7 of 8 • Hair Tone" />

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          HER HAIR COLOR
        </h2>
        <p className="text-xs sm:text-sm text-[#d5d4ca] font-medium tracking-wide mt-1.5">
          Select prominent hair color
        </p>
      </div>

      {/* Choices Grid */}
      <div className="space-y-2.5">
        {HAIR_OPTIONS.map((item) => {
          const isSelected = selectedHair === item.label;
          return (
            <button
              key={item.id}
              type="button"
              id={`hair-opt-${item.id}`}
              onClick={() => onSelectHair(item.label)}
              className={`w-full p-3.5 rounded-md border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#c9982c] to-[#805c18] border-[#f0c65c] text-[#090d10] font-black shadow-[0_0_10px_rgba(241,202,99,0.25)]'
                  : 'bg-[#030814] border-[#6c5424] text-[#eee] hover:border-[#f1ca63] hover:bg-[#07101f]'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Color Dot swatch */}
                <div
                  className="w-6 h-6 rounded-full border-2 border-[#fff]/40 shadow-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
                  {item.label}
                </span>
              </div>

              <div
                className={`w-4 h-4 rounded-xs border flex items-center justify-center text-[10px] font-black ${
                  isSelected
                    ? 'border-[#090d10] bg-[#090d10] text-[#f1ca63]'
                    : 'border-[#927329] bg-[#030814]'
                }`}
              >
                {isSelected ? '✓' : ''}
              </div>
            </button>
          );
        })}
      </div>

      {/* Other text input */}
      {isOtherSelected && (
        <div className="mt-3">
          <label className="block text-[10px] font-bold tracking-wider text-[#f1ca63] uppercase mb-1">
            Specify Other Hair Color:
          </label>
          <input
            type="text"
            id="hair-other-input"
            value={otherText}
            onChange={(e) => onChangeOther(e.target.value)}
            placeholder="e.g. Highlights, dyed blue, silver..."
            className="w-full gold-input text-xs"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-4 border-t border-[#765b24]/40">
        <button
          type="button"
          id="hair-back-btn"
          onClick={onBack}
          className="btn-dark px-4 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#f1ca63]" />
          BACK
        </button>

        <button
          type="button"
          id="hair-next-btn"
          disabled={!selectedHair}
          onClick={onNext}
          className={`btn-gold px-6 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer ${
            !selectedHair ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          NEXT
          <ArrowRight className="w-4 h-4 text-[#090d10]" />
        </button>
      </div>
    </div>
  );
}
