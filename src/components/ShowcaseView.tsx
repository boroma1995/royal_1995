import React from 'react';
import { UserProfile, EngagementRecord, NewEngagementDraft, FlowStep } from '../types';
import { LionCrest } from './LionCrest';
import { GoldDivider } from './GoldDivider';
import { RegisterScreen } from './Screens/RegisterScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { ScoreScreen } from './Screens/ScoreScreen';
import { FeelingScreen } from './Screens/FeelingScreen';
import { LocationScreen } from './Screens/LocationScreen';
import { AttireScreen } from './Screens/AttireScreen';
import { EyesScreen } from './Screens/EyesScreen';
import { BuildScreen } from './Screens/BuildScreen';
import { HairScreen } from './Screens/HairScreen';
import { CommentsScreen } from './Screens/CommentsScreen';
import { ReviewOrSubmitScreen } from './Screens/ReviewOrSubmitScreen';
import { ReviewScreen } from './Screens/ReviewScreen';
import { ConfirmationScreen } from './Screens/ConfirmationScreen';
import { CreateReportScreen } from './Screens/CreateReportScreen';
import { ReportsDashboard } from './Screens/ReportsDashboard';
import { Maximize2 } from 'lucide-react';

interface ShowcaseViewProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  draft: NewEngagementDraft;
  startDate: string;
  endDate: string;
  onSetDates: (start: string, end: string) => void;
  onOpenScreenInSimulator: (step: FlowStep) => void;
  onDeleteEngagement: (id: string) => void;
}

function MiniPhoneFrame({
  stepNumber,
  stepTitle,
  onClick,
  children,
}: {
  stepNumber: number;
  stepTitle: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center group">
      {/* Step Badge */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-5 h-5 rounded-full bg-[#f1ca63] text-[#020b12] text-[11px] font-black flex items-center justify-center shadow-md">
          {stepNumber}
        </span>
        <span className="text-[11px] font-black uppercase tracking-wider text-[#f1ca63]">
          {stepTitle}
        </span>
      </div>

      {/* Mini Smartphone Frame */}
      <div
        onClick={onClick}
        className="relative w-[270px] sm:w-[290px] h-[570px] sm:h-[590px] bg-[#030814] rounded-[38px] p-2 shadow-[0_0_0_1.5px_#765b24,0_15px_35px_rgba(0,0,0,0.95)] border border-[#f1ca63]/25 flex flex-col justify-between cursor-pointer hover:border-[#f1ca63] hover:shadow-[0_0_20px_rgba(241,202,99,0.3)] transition-all overflow-hidden"
      >
        {/* Scaled Content View */}
        <div className="flex-1 overflow-y-auto px-1 py-1 transform scale-[0.92] origin-top bg-[#030814]">
          {children}
        </div>

        {/* Hover Click to Expand Overlay */}
        <div className="absolute inset-0 bg-[#030814]/80 opacity-0 group-hover:opacity-100 backdrop-blur-xs flex items-center justify-center transition-opacity z-20">
          <span className="btn-gold px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-wider uppercase flex items-center gap-1 shadow-lg">
            <Maximize2 className="w-3 h-3 text-[#090d10]" />
            Test Screen {stepNumber}
          </span>
        </div>

        {/* Home Bar */}
        <div className="pb-1 flex justify-center shrink-0">
          <div className="w-20 h-1 bg-[#f1ca63]/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ShowcaseView({
  user,
  engagements,
  draft,
  startDate,
  endDate,
  onSetDates,
  onOpenScreenInSimulator,
  onDeleteEngagement,
}: ShowcaseViewProps) {
  // Mock draft with nice filled values for previewing poster screens
  const demoFilledDraft: NewEngagementDraft = {
    score: 2,
    feelings: ['Hungry', 'Tired', 'Bored'],
    feelingsOther: '',
    locations: ['Driving', 'On Phone'],
    locationsOther: '',
    attire: ['Yoga Pants', 'Tight Jeans'],
    attireOther: '',
    eyesWentTo: ['Butt', 'Legs'],
    eyesOther: '',
    herBuild: ['Curvy', 'Long Legs'],
    herBuildOther: '',
    hairColor: 'Brown',
    hairColorOther: '',
    comments: 'She caught me off guard while walking into the gas station.',
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto py-4 px-2 space-y-12 bg-[#030814]">
      {/* Poster Header Branding - No LOOK AWAY text or subtext */}
      <div className="text-center relative py-4 max-w-xl mx-auto">
        <div className="flex justify-center mb-2">
          <LionCrest size={96} glow={true} />
        </div>
        <GoldDivider glow={true} />
      </div>

      {/* Row 1: Screens 1 to 4 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[#8b681f] bg-[#030814] px-4 py-1 rounded-full border border-[#765b24]/40">
            PHASE 1: ONBOARDING & SEVERITY ASSESSMENT
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Screen 1: REGISTER */}
          <MiniPhoneFrame
            stepNumber={1}
            stepTitle="REGISTER"
            onClick={() => onOpenScreenInSimulator('register')}
          >
            <RegisterScreen user={user} onSaveProfile={() => {}} onContinue={() => {}} />
          </MiniPhoneFrame>

          {/* Screen 2: HOME */}
          <MiniPhoneFrame
            stepNumber={2}
            stepTitle="HOME"
            onClick={() => onOpenScreenInSimulator('home')}
          >
            <HomeScreen
              user={user}
              engagements={engagements}
              onStartLogging={() => {}}
              onCreateReport={() => {}}
              onViewReports={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 3: ENGAGEMENT SCORE */}
          <MiniPhoneFrame
            stepNumber={3}
            stepTitle="ENGAGEMENT SCORE"
            onClick={() => onOpenScreenInSimulator('score')}
          >
            <ScoreScreen
              selectedScore={2}
              onSelectScore={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 4: FEELING */}
          <MiniPhoneFrame
            stepNumber={4}
            stepTitle="FEELING"
            onClick={() => onOpenScreenInSimulator('feeling')}
          >
            <FeelingScreen
              selectedFeelings={['Hungry', 'Tired', 'Bored']}
              otherText=""
              onToggleFeeling={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>
        </div>
      </div>

      {/* Row 2: Screens 5 to 8 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[#8b681f] bg-[#030814] px-4 py-1 rounded-full border border-[#765b24]/40">
            PHASE 2: TRIGGER & ENVIRONMENT ANALYSIS
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Screen 5: LOCATION */}
          <MiniPhoneFrame
            stepNumber={5}
            stepTitle="LOCATION"
            onClick={() => onOpenScreenInSimulator('location')}
          >
            <LocationScreen
              selectedLocations={['Driving', 'On Phone']}
              otherText=""
              onToggleLocation={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 6: ATTIRE */}
          <MiniPhoneFrame
            stepNumber={6}
            stepTitle="ATTIRE"
            onClick={() => onOpenScreenInSimulator('attire')}
          >
            <AttireScreen
              selectedAttire={['Yoga Pants', 'Tight Jeans']}
              otherText=""
              onToggleAttire={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 7: EYES WENT TO */}
          <MiniPhoneFrame
            stepNumber={7}
            stepTitle="EYES WENT TO"
            onClick={() => onOpenScreenInSimulator('eyes')}
          >
            <EyesScreen
              selectedEyes={['Butt', 'Legs']}
              otherText=""
              onToggleEyes={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 8: HER BUILD */}
          <MiniPhoneFrame
            stepNumber={8}
            stepTitle="HER BUILD"
            onClick={() => onOpenScreenInSimulator('build')}
          >
            <BuildScreen
              selectedBuild={['Curvy', 'Long Legs']}
              otherText=""
              onToggleBuild={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>
        </div>
      </div>

      {/* Row 3: Screens 9 to 12 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[#8b681f] bg-[#030814] px-4 py-1 rounded-full border border-[#765b24]/40">
            PHASE 3: REFLECTION & SUBMISSION
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Screen 9: HAIR COLOR */}
          <MiniPhoneFrame
            stepNumber={9}
            stepTitle="HAIR COLOR"
            onClick={() => onOpenScreenInSimulator('hair')}
          >
            <HairScreen
              selectedHair="Brown"
              otherText=""
              onSelectHair={() => {}}
              onChangeOther={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 10: COMMENTS */}
          <MiniPhoneFrame
            stepNumber={10}
            stepTitle="COMMENTS"
            onClick={() => onOpenScreenInSimulator('comments')}
          >
            <CommentsScreen
              comments="She caught me off guard while walking into the gas station."
              onChangeComments={() => {}}
              onNext={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 11: REVIEW OR SUBMIT */}
          <MiniPhoneFrame
            stepNumber={11}
            stepTitle="REVIEW OR SUBMIT"
            onClick={() => onOpenScreenInSimulator('review_or_submit')}
          >
            <ReviewOrSubmitScreen
              onReview={() => {}}
              onSubmit={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 12: REVIEW */}
          <MiniPhoneFrame
            stepNumber={12}
            stepTitle="REVIEW"
            onClick={() => onOpenScreenInSimulator('review')}
          >
            <ReviewScreen
              draft={demoFilledDraft}
              onEdit={() => {}}
              onSubmit={() => {}}
            />
          </MiniPhoneFrame>
        </div>
      </div>

      {/* Row 4: Screens 13 to 14 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-[#8b681f] bg-[#030814] px-4 py-1 rounded-full border border-[#765b24]/40">
            PHASE 4: CONFIRMATION & ACCOUNTABILITY REPORTING
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
          {/* Screen 13: CONFIRMATION */}
          <MiniPhoneFrame
            stepNumber={13}
            stepTitle="CONFIRMATION"
            onClick={() => onOpenScreenInSimulator('confirmation')}
          >
            <ConfirmationScreen
              lastEngagement={engagements[0] || null}
              onHome={() => {}}
              onViewReports={() => {}}
              onLogAnother={() => {}}
            />
          </MiniPhoneFrame>

          {/* Screen 14: CREATE REPORT */}
          <MiniPhoneFrame
            stepNumber={14}
            stepTitle="CREATE REPORT"
            onClick={() => onOpenScreenInSimulator('create_report')}
          >
            <CreateReportScreen
              user={user}
              startDate={startDate}
              endDate={endDate}
              onUpdateDates={onSetDates}
              onGenerateReport={() => {}}
              onBack={() => {}}
            />
          </MiniPhoneFrame>
        </div>
      </div>

      {/* Bottom Section: Full Report Preview matching the poster */}
      <div className="pt-8 border-t border-[#765b24]/60">
        <ReportsDashboard
          user={user}
          engagements={engagements}
          startDate={startDate}
          endDate={endDate}
          onSetDates={onSetDates}
          onSelectNewEngagement={() => onOpenScreenInSimulator('score')}
          onDeleteEngagement={onDeleteEngagement}
        />
      </div>
    </div>
  );
}
