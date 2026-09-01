import { NewEngagementDraft } from '../../types';
import { SCORE_OPTIONS } from '../../data/constants';
import {
  Eye,
  Smile,
  MapPin,
  Layers,
  Sparkles,
  User,
  Palette,
  MessageSquare,
  Edit2,
  CheckCheck,
} from 'lucide-react';

interface ReviewScreenProps {
  draft: NewEngagementDraft;
  onEdit: (stepName?: string) => void;
  onSubmit: () => void;
}

export function ReviewScreen({ draft, onEdit, onSubmit }: ReviewScreenProps) {
  const scoreObj = SCORE_OPTIONS.find((s) => s.level === draft.score);
  const scoreLabel = scoreObj ? scoreObj.title : 'Not specified';

  // Format arrays with 'Other' if provided
  const formatList = (items: string[], otherVal: string) => {
    const list = [...items];
    if (list.includes('OTHER') && otherVal.trim()) {
      const idx = list.indexOf('OTHER');
      list[idx] = `Other (${otherVal.trim()})`;
    }
    return list.length > 0 ? list.join(', ') : 'None selected';
  };

  const feelingsText = formatList(draft.feelings, draft.feelingsOther);
  const locationsText = formatList(draft.locations, draft.locationsOther);
  const attireText = formatList(draft.attire, draft.attireOther);
  const eyesText = formatList(draft.eyesWentTo, draft.eyesOther);
  const buildText = formatList(draft.herBuild, draft.herBuildOther);
  const hairText =
    draft.hairColor === 'OTHER' && draft.hairColorOther.trim()
      ? `Other (${draft.hairColorOther.trim()})`
      : draft.hairColor || 'Not selected';

  const rows = [
    {
      icon: <Eye className="w-4 h-4 text-[#f1ca63]" />,
      label: 'SCORE',
      value: scoreLabel,
      step: 'score',
    },
    {
      icon: <Smile className="w-4 h-4 text-[#f1ca63]" />,
      label: 'FEELING',
      value: feelingsText,
      step: 'feeling',
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#f1ca63]" />,
      label: 'LOCATION',
      value: locationsText,
      step: 'location',
    },
    {
      icon: <Layers className="w-4 h-4 text-[#f1ca63]" />,
      label: 'ATTIRE',
      value: attireText,
      step: 'attire',
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#f1ca63]" />,
      label: 'EYES WENT TO',
      value: eyesText,
      step: 'eyes',
    },
    {
      icon: <User className="w-4 h-4 text-[#f1ca63]" />,
      label: 'HER BUILD',
      value: buildText,
      step: 'build',
    },
    {
      icon: <Palette className="w-4 h-4 text-[#f1ca63]" />,
      label: 'HAIR COLOR',
      value: hairText,
      step: 'hair',
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-[#f1ca63]" />,
      label: 'COMMENTS',
      value: draft.comments.trim() || 'No additional comments provided.',
      step: 'comments',
    },
  ];

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          REVIEW ENGAGEMENT
        </h2>
        <p className="text-xs text-[#d5d4ca] font-medium tracking-wide mt-1">
          Verify your engagement details
        </p>
      </div>

      {/* Review Card List */}
      <div className="space-y-2 bg-[#030814] border border-[#765b24]/60 rounded-xl p-3.5 sm:p-4 shadow-inner">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-start justify-between py-2 border-b border-[#765b24]/25 last:border-0 gap-3"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="mt-0.5 shrink-0">{r.icon}</span>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#e6c866] block">
                  {r.label}:
                </span>
                <span className="text-xs text-[#f7f4e8] font-semibold leading-snug break-words">
                  {r.value}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEdit(r.step)}
              title={`Edit ${r.label}`}
              className="text-[#8b681f] hover:text-[#f1ca63] p-1 shrink-0 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6 pt-2">
        <button
          type="button"
          id="review-edit-btn"
          onClick={() => onEdit('score')}
          className="btn-dark py-3 rounded-md text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#f1ca63]" />
          EDIT
        </button>

        <button
          type="button"
          id="review-submit-btn"
          onClick={onSubmit}
          className="btn-gold py-3 rounded-md text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
        >
          <CheckCheck className="w-4 h-4 text-[#090d10]" />
          SUBMIT
        </button>
      </div>
    </div>
  );
}
