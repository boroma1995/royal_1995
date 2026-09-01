import { useState, useEffect } from 'react';
import {
  UserProfile,
  EngagementRecord,
  NewEngagementDraft,
  FlowStep,
  ViewMode,
  ScoreLevel,
} from './types';
import { INITIAL_ENGAGEMENTS, INITIAL_USER, SCORE_OPTIONS } from './data/constants';
import { Header, BottomNavBar } from './components/Navigation';
import { PhoneSimulator } from './components/PhoneSimulator';
import { ShowcaseView } from './components/ShowcaseView';
import { RegisterScreen } from './components/Screens/RegisterScreen';
import { HomeScreen } from './components/Screens/HomeScreen';
import { ScoreScreen } from './components/Screens/ScoreScreen';
import { FeelingScreen } from './components/Screens/FeelingScreen';
import { LocationScreen } from './components/Screens/LocationScreen';
import { AttireScreen } from './components/Screens/AttireScreen';
import { EyesScreen } from './components/Screens/EyesScreen';
import { BuildScreen } from './components/Screens/BuildScreen';
import { HairScreen } from './components/Screens/HairScreen';
import { CommentsScreen } from './components/Screens/CommentsScreen';
import { ReviewOrSubmitScreen } from './components/Screens/ReviewOrSubmitScreen';
import { ReviewScreen } from './components/Screens/ReviewScreen';
import { ConfirmationScreen } from './components/Screens/ConfirmationScreen';
import { CreateReportScreen } from './components/Screens/CreateReportScreen';
import { ReportsDashboard } from './components/Screens/ReportsDashboard';
import { SettingsScreen } from './components/Screens/SettingsScreen';

const EMPTY_DRAFT: NewEngagementDraft = {
  score: null,
  feelings: [],
  feelingsOther: '',
  locations: [],
  locationsOther: '',
  attire: [],
  attireOther: '',
  eyesWentTo: [],
  eyesOther: '',
  herBuild: [],
  herBuildOther: '',
  hairColor: '',
  hairColorOther: '',
  comments: '',
};

export default function App() {
  // Load state from localStorage or initialize defaults
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('lookaway_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [engagements, setEngagements] = useState<EngagementRecord[]>(() => {
    try {
      const saved = localStorage.getItem('lookaway_engagements');
      return saved ? JSON.parse(saved) : INITIAL_ENGAGEMENTS;
    } catch {
      return INITIAL_ENGAGEMENTS;
    }
  });

  const [currentStep, setCurrentStep] = useState<FlowStep>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [draft, setDraft] = useState<NewEngagementDraft>(EMPTY_DRAFT);
  const [lastLoggedEngagement, setLastLoggedEngagement] = useState<EngagementRecord | null>(
    engagements[0] || null
  );

  const [startDate, setStartDate] = useState<string>('2025-05-01');
  const [endDate, setEndDate] = useState<string>('2025-05-21');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('lookaway_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('lookaway_engagements', JSON.stringify(engagements));
    } catch (e) {
      console.error(e);
    }
  }, [engagements]);

  // Handlers for logging flow
  const handleStartLogging = () => {
    setDraft(EMPTY_DRAFT);
    setCurrentStep('score');
  };

  const handleSelectScore = (score: ScoreLevel) => {
    setDraft((prev) => ({ ...prev, score }));
  };

  const handleToggleFeeling = (feeling: string) => {
    setDraft((prev) => {
      const exists = prev.feelings.includes(feeling);
      return {
        ...prev,
        feelings: exists
          ? prev.feelings.filter((f) => f !== feeling)
          : [...prev.feelings, feeling],
      };
    });
  };

  const handleToggleLocation = (loc: string) => {
    setDraft((prev) => {
      const exists = prev.locations.includes(loc);
      return {
        ...prev,
        locations: exists
          ? prev.locations.filter((l) => l !== loc)
          : [...prev.locations, loc],
      };
    });
  };

  const handleToggleAttire = (attire: string) => {
    setDraft((prev) => {
      const exists = prev.attire.includes(attire);
      return {
        ...prev,
        attire: exists
          ? prev.attire.filter((a) => a !== attire)
          : [...prev.attire, attire],
      };
    });
  };

  const handleToggleEyes = (eyeTarget: string) => {
    setDraft((prev) => {
      const exists = prev.eyesWentTo.includes(eyeTarget);
      return {
        ...prev,
        eyesWentTo: exists
          ? prev.eyesWentTo.filter((e) => e !== eyeTarget)
          : [...prev.eyesWentTo, eyeTarget],
      };
    });
  };

  const handleToggleBuild = (build: string) => {
    setDraft((prev) => {
      const exists = prev.herBuild.includes(build);
      return {
        ...prev,
        herBuild: exists
          ? prev.herBuild.filter((b) => b !== build)
          : [...prev.herBuild, build],
      };
    });
  };

  const handleSelectHair = (color: string) => {
    setDraft((prev) => ({ ...prev, hairColor: color }));
  };

  const handleSubmitEngagement = () => {
    const now = new Date();
    const scoreObj = SCORE_OPTIONS.find((s) => s.level === (draft.score || 2));
    const scoreLabel = scoreObj ? scoreObj.title : '2 - LOOK';

    // Format fields with other text
    const formatItems = (items: string[], other: string) => {
      const res = [...items];
      if (res.includes('OTHER') && other.trim()) {
        const idx = res.indexOf('OTHER');
        res[idx] = other.trim();
      }
      return res.length > 0 ? res : ['General'];
    };

    const finalFeelings = formatItems(draft.feelings, draft.feelingsOther);
    const finalLocations = formatItems(draft.locations, draft.locationsOther);
    const finalAttire = formatItems(draft.attire, draft.attireOther);
    const finalEyes = formatItems(draft.eyesWentTo, draft.eyesOther);
    const finalBuild = formatItems(draft.herBuild, draft.herBuildOther);
    const finalHair =
      draft.hairColor === 'OTHER' && draft.hairColorOther.trim()
        ? draft.hairColorOther.trim()
        : draft.hairColor || 'Brown';

    const newRecord: EngagementRecord = {
      id: `eng-${Date.now()}`,
      timestamp: now.toISOString(),
      dateStr: now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timeStr: now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      score: (draft.score as ScoreLevel) || 2,
      scoreLabel,
      feelings: finalFeelings,
      locations: finalLocations,
      attire: finalAttire,
      eyesWentTo: finalEyes,
      herBuild: finalBuild,
      hairColor: finalHair,
      comments: draft.comments.trim() || 'Visual engagement logged.',
    };

    setEngagements((prev) => [newRecord, ...prev]);
    setLastLoggedEngagement(newRecord);
    setCurrentStep('confirmation');
  };

  const handleDeleteEngagement = (id: string) => {
    if (window.confirm('Delete this engagement log?')) {
      setEngagements((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleResetSampleData = () => {
    if (window.confirm('Reset data to the reference poster sample engagements?')) {
      setEngagements(INITIAL_ENGAGEMENTS);
      setUser(INITIAL_USER);
      alert('Sample data reset successfully!');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL engagement logs?')) {
      setEngagements([]);
      alert('All engagement logs cleared.');
    }
  };

  const handleImportData = (newEngagements: EngagementRecord[]) => {
    setEngagements(newEngagements);
  };

  // Render specific active step screen
  const renderScreen = () => {
    switch (currentStep) {
      case 'register':
        return (
          <RegisterScreen
            user={user}
            onSaveProfile={(p) => setUser(p)}
            onContinue={() => setCurrentStep('home')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            user={user}
            engagements={engagements}
            onStartLogging={handleStartLogging}
            onCreateReport={() => setCurrentStep('create_report')}
            onViewReports={() => setCurrentStep('reports')}
          />
        );

      case 'score':
        return (
          <ScoreScreen
            selectedScore={draft.score}
            onSelectScore={handleSelectScore}
            onNext={() => setCurrentStep('feeling')}
            onBack={() => setCurrentStep('home')}
          />
        );

      case 'feeling':
        return (
          <FeelingScreen
            selectedFeelings={draft.feelings}
            otherText={draft.feelingsOther}
            onToggleFeeling={handleToggleFeeling}
            onChangeOther={(t) => setDraft((p) => ({ ...p, feelingsOther: t }))}
            onNext={() => setCurrentStep('location')}
            onBack={() => setCurrentStep('score')}
          />
        );

      case 'location':
        return (
          <LocationScreen
            selectedLocations={draft.locations}
            otherText={draft.locationsOther}
            onToggleLocation={handleToggleLocation}
            onChangeOther={(t) => setDraft((p) => ({ ...p, locationsOther: t }))}
            onNext={() => setCurrentStep('attire')}
            onBack={() => setCurrentStep('feeling')}
          />
        );

      case 'attire':
        return (
          <AttireScreen
            selectedAttire={draft.attire}
            otherText={draft.attireOther}
            onToggleAttire={handleToggleAttire}
            onChangeOther={(t) => setDraft((p) => ({ ...p, attireOther: t }))}
            onNext={() => setCurrentStep('eyes')}
            onBack={() => setCurrentStep('location')}
          />
        );

      case 'eyes':
        return (
          <EyesScreen
            selectedEyes={draft.eyesWentTo}
            otherText={draft.eyesOther}
            onToggleEyes={handleToggleEyes}
            onChangeOther={(t) => setDraft((p) => ({ ...p, eyesOther: t }))}
            onNext={() => setCurrentStep('build')}
            onBack={() => setCurrentStep('attire')}
          />
        );

      case 'build':
        return (
          <BuildScreen
            selectedBuild={draft.herBuild}
            otherText={draft.herBuildOther}
            onToggleBuild={handleToggleBuild}
            onChangeOther={(t) => setDraft((p) => ({ ...p, herBuildOther: t }))}
            onNext={() => setCurrentStep('hair')}
            onBack={() => setCurrentStep('eyes')}
          />
        );

      case 'hair':
        return (
          <HairScreen
            selectedHair={draft.hairColor}
            otherText={draft.hairColorOther}
            onSelectHair={handleSelectHair}
            onChangeOther={(t) => setDraft((p) => ({ ...p, hairColorOther: t }))}
            onNext={() => setCurrentStep('comments')}
            onBack={() => setCurrentStep('build')}
          />
        );

      case 'comments':
        return (
          <CommentsScreen
            comments={draft.comments}
            onChangeComments={(t) => setDraft((p) => ({ ...p, comments: t }))}
            onNext={() => setCurrentStep('review_or_submit')}
            onBack={() => setCurrentStep('hair')}
          />
        );

      case 'review_or_submit':
        return (
          <ReviewOrSubmitScreen
            onReview={() => setCurrentStep('review')}
            onSubmit={handleSubmitEngagement}
            onBack={() => setCurrentStep('comments')}
          />
        );

      case 'review':
        return (
          <ReviewScreen
            draft={draft}
            onEdit={(stepName) => setCurrentStep((stepName as FlowStep) || 'score')}
            onSubmit={handleSubmitEngagement}
          />
        );

      case 'confirmation':
        return (
          <ConfirmationScreen
            lastEngagement={lastLoggedEngagement}
            onHome={() => setCurrentStep('home')}
            onViewReports={() => setCurrentStep('reports')}
            onLogAnother={handleStartLogging}
          />
        );

      case 'create_report':
        return (
          <CreateReportScreen
            user={user}
            startDate={startDate}
            endDate={endDate}
            onUpdateDates={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
            onGenerateReport={() => setCurrentStep('reports')}
            onBack={() => setCurrentStep('home')}
          />
        );

      case 'reports':
        return (
          <ReportsDashboard
            user={user}
            engagements={engagements}
            startDate={startDate}
            endDate={endDate}
            onSetDates={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
            onSelectNewEngagement={handleStartLogging}
            onDeleteEngagement={handleDeleteEngagement}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            user={user}
            engagements={engagements}
            onSaveProfile={(p) => setUser(p)}
            onResetSampleData={handleResetSampleData}
            onClearAllData={handleClearAllData}
            onImportData={handleImportData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-20 sm:pb-24">
      {/* App Container */}
      <div className="w-full max-w-[1180px] mx-auto px-2.5 sm:px-6 py-2.5 sm:py-5">
        {/* Header */}
        <Header
          user={user}
          currentStep={currentStep}
          viewMode={viewMode}
          onSetViewMode={setViewMode}
          onNavigate={(step) => setCurrentStep(step)}
          streakDays={7}
        />

        {/* View Mode Switching */}
        {viewMode === 'mobile' ? (
          <PhoneSimulator currentStep={currentStep} onSetStep={setCurrentStep}>
            {renderScreen()}
          </PhoneSimulator>
        ) : viewMode === 'showcase' ? (
          <ShowcaseView
            user={user}
            engagements={engagements}
            draft={draft}
            startDate={startDate}
            endDate={endDate}
            onSetDates={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
            onOpenScreenInSimulator={(step) => {
              setCurrentStep(step);
              setViewMode('mobile');
            }}
            onDeleteEngagement={handleDeleteEngagement}
          />
        ) : (
          /* Web Suite Dashboard Mode */
          <main className="w-full">
            {/* Active flow screen card */}
            <div className="gold-card p-3 sm:p-6 md:p-8 max-w-[840px] mx-auto mb-8 shadow-2xl">
              {renderScreen()}
            </div>

            {/* If on home or reports, render the full reports suite below */}
            {currentStep !== 'reports' && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#765b24]/50">
                <ReportsDashboard
                  user={user}
                  engagements={engagements}
                  startDate={startDate}
                  endDate={endDate}
                  onSetDates={(s, e) => {
                    setStartDate(s);
                    setEndDate(e);
                  }}
                  onSelectNewEngagement={handleStartLogging}
                  onDeleteEngagement={handleDeleteEngagement}
                />
              </div>
            )}
          </main>
        )}

        {/* Footer Note matching reference HTML */}
        <div className="text-center text-[#777e80] text-xs font-semibold my-6 sm:my-8 select-none">
          Look Away demo • Data is stored in this browser using localStorage.
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar matching reference */}
      <BottomNavBar currentStep={currentStep} onNavigate={(step) => setCurrentStep(step)} />
    </div>
  );
}
