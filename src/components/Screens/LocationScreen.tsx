import { LOCATION_OPTIONS } from '../../data/constants';
import { StepProgressBar } from '../StepProgressBar';
import {
  Home,
  Briefcase,
  Car,
  ShoppingBag,
  Church,
  Smartphone,
  Tv,
  Monitor,
  Compass,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';

interface LocationScreenProps {
  selectedLocations: string[];
  otherText: string;
  onToggleLocation: (location: string) => void;
  onChangeOther: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationScreen({
  selectedLocations,
  otherText,
  onToggleLocation,
  onChangeOther,
  onNext,
  onBack,
}: LocationScreenProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'home':
        return <Home className="w-4 h-4 text-[#f1ca63]" />;
      case 'work':
        return <Briefcase className="w-4 h-4 text-[#f1ca63]" />;
      case 'driving':
        return <Car className="w-4 h-4 text-[#f1ca63]" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-[#f1ca63]" />;
      case 'church':
        return <Church className="w-4 h-4 text-[#f1ca63]" />;
      case 'on_phone':
        return <Smartphone className="w-4 h-4 text-[#f1ca63]" />;
      case 'on_tv':
        return <Tv className="w-4 h-4 text-[#f1ca63]" />;
      case 'on_computer':
        return <Monitor className="w-4 h-4 text-[#f1ca63]" />;
      default:
        return <Compass className="w-4 h-4 text-[#f1ca63]" />;
    }
  };

  const isOtherSelected = selectedLocations.includes('OTHER');

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-5">
      {/* Progress Bar: Step 3 of 8 */}
      <StepProgressBar currentStepIndex={3} totalSteps={8} stepTitle="Step 3 of 8 • Location & Environment" />

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          WHERE WERE YOU?
        </h2>
        <p className="text-xs sm:text-sm text-[#d5d4ca] font-medium tracking-wide mt-1.5">
          Select environment / platform
        </p>
      </div>

      {/* Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {LOCATION_OPTIONS.map((item) => {
          const isSelected = selectedLocations.includes(item.label);
          return (
            <button
              key={item.id}
              type="button"
              id={`loc-opt-${item.id}`}
              onClick={() => onToggleLocation(item.label)}
              className={`p-3.5 rounded-md border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#c9982c] to-[#805c18] border-[#f0c65c] text-[#090d10] font-black shadow-[0_0_10px_rgba(241,202,99,0.25)]'
                  : 'bg-[#030814] border-[#6c5424] text-[#eee] hover:border-[#f1ca63] hover:bg-[#07101f]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isSelected ? 'text-[#090d10]' : ''}>{getIcon(item.id)}</span>
                <span className="text-xs font-black tracking-wider uppercase">
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
            Specify Other Location:
          </label>
          <input
            type="text"
            id="loc-other-input"
            value={otherText}
            onChange={(e) => onChangeOther(e.target.value)}
            placeholder="e.g. Gym, beach, hotel lobby..."
            className="w-full gold-input text-xs"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-4 border-t border-[#765b24]/40">
        <button
          type="button"
          id="location-back-btn"
          onClick={onBack}
          className="btn-dark px-4 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#f1ca63]" />
          BACK
        </button>

        <button
          type="button"
          id="location-next-btn"
          onClick={onNext}
          className="btn-gold px-6 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          NEXT
          <ArrowRight className="w-4 h-4 text-[#090d10]" />
        </button>
      </div>
    </div>
  );
}
