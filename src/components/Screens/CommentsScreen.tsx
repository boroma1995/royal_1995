import { StepProgressBar } from '../StepProgressBar';
import { MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';

interface CommentsScreenProps {
  comments: string;
  onChangeComments: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CommentsScreen({
  comments,
  onChangeComments,
  onNext,
  onBack,
}: CommentsScreenProps) {
  const wordCount = comments.trim() ? comments.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-5">
      {/* Progress Bar: Step 8 of 8 */}
      <StepProgressBar currentStepIndex={8} totalSteps={8} stepTitle="Step 8 of 8 • Reflection Notes" />

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          COMMENTS
        </h2>
        <p className="text-xs sm:text-sm text-[#d5d4ca] font-medium tracking-wide mt-1.5">
          Describe the situation or mental state (Optional)
        </p>
      </div>

      {/* Text Area Card */}
      <div className="relative">
        <textarea
          id="comments-textarea"
          rows={6}
          value={comments}
          onChange={(e) => onChangeComments(e.target.value)}
          placeholder="Write your comments here... (e.g. What triggered the glance? How did you recover?)"
          className="w-full gold-input text-xs sm:text-sm leading-relaxed p-4 min-h-[160px] resize-none"
        />
        <div className="flex justify-between items-center mt-2 px-1 text-[11px] text-[#b9b7ad]">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#8b681f]" />
            Honest reflection builds discipline
          </span>
          <span className={wordCount > 500 ? 'text-[#ef4444] font-bold' : 'text-[#8b681f]'}>
            ({wordCount}/500 words max.)
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 mt-8 pt-4 border-t border-[#765b24]/40">
        <button
          type="button"
          id="comments-back-btn"
          onClick={onBack}
          className="btn-dark px-4 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#f1ca63]" />
          BACK
        </button>

        <button
          type="button"
          id="comments-next-btn"
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
