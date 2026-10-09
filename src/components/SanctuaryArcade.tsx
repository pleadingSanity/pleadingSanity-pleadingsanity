import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  RotateCcw, 
  Compass, 
  Wind, 
  Brain, 
  Eye, 
  Check, 
  CheckCircle2, 
  Trash2,
  Send,
  Zap,
  Volume2,
  Heart,
  Layers,
  Activity,
  Waves,
  Sliders,
  Sun,
  Shield,
  Shuffle,
  ChevronRight,
  Flame,
  Star,
  Info
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { CosmicConnect } from './CosmicConnect';

export type GameId = 
  | 'solitaire'
  | 'connect'
  | 'truth'
  | 'focus'
  | 'nebula'
  | 'pattern'
  | 'ocean'
  | 'rhythm'
  | 'stardust'
  | 'healing'
  | 'mind'
  | 'mood';

interface GameMetadata {
  id: GameId;
  title: string;
  category: 'Calm Puzzle' | 'Centering' | 'Sound & Rhythm' | 'Introspection';
  badge: string;
  tagline: string;
  description: string;
  affirmation: string;
  icon: React.ElementType;
  gradient: string;
}

export const SANCTUARY_GAMES: GameMetadata[] = [
  {
    id: 'solitaire',
    title: 'Sanity Solitaire',
    category: 'Calm Puzzle',
    badge: 'Game 01',
    tagline: 'Order from inner chaos, one calm placement at a time.',
    description: 'A slow-paced, tranquil card placement ritual. Sort thoughts into 4 Foundations: Mind, Breath, Grounding, and Purpose. No rush, no timer, infinite undo.',
    affirmation: 'Every card finds its place. My thoughts are settling into natural order.',
    icon: Layers,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'connect',
    title: 'Cosmic Connect',
    category: 'Calm Puzzle',
    badge: 'Game 02',
    tagline: 'Trace celestial constellations with harmonic sound chimes.',
    description: 'Connect luminous cosmic nodes across 5 sacred constellations to activate ancient geometry and restorative affirmations.',
    affirmation: "Your thoughts are not broken — they are forming a pattern you haven't seen yet.",
    icon: Compass,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'truth',
    title: 'Truth Tag',
    category: 'Introspection',
    badge: 'Game 03',
    tagline: 'Tag what is real. Release what was forced upon you.',
    description: 'A gentle vulnerability reflection deck. Flip honest truth cards, tag your unmasked feelings without judgment, and release mental weight.',
    affirmation: 'Truth is lighter than pretense. I am allowed to be real today.',
    icon: Heart,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent'
  },
  {
    id: 'focus',
    title: 'Cosmic Focus',
    category: 'Centering',
    badge: 'Game 04',
    tagline: 'Zen focus orb & harmonic breath synchronization.',
    description: 'Gaze into the pulsating celestial singularity. Synchronize your inhalation and exhalation to expand your cognitive bandwidth.',
    affirmation: 'I am the calm center in the middle of any storm.',
    icon: Eye,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'nebula',
    title: 'Number Nebula',
    category: 'Calm Puzzle',
    badge: 'Game 05',
    tagline: 'Solfeggio numeric sequences that quiet overthinking.',
    description: 'Tap harmonious Solfeggio numbers (174, 396, 432, 528, 639, 741, 852, 963) in rising order to build a peaceful sonic ladder.',
    affirmation: 'Small steps create quiet clarity. The mind softens with simple sequence.',
    icon: Zap,
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent'
  },
  {
    id: 'pattern',
    title: 'Pattern Galaxy',
    category: 'Calm Puzzle',
    badge: 'Game 06',
    tagline: 'Galactic symmetry and sacred geometric balance.',
    description: 'Rotate celestial tiles to reveal harmonious galactic mandalas. Soft chime feedback on every satisfying connection.',
    affirmation: 'Balance exists beneath all complexity. I return to center.',
    icon: Sparkles,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'ocean',
    title: 'Memory Ocean',
    category: 'Calm Puzzle',
    badge: 'Game 07',
    tagline: 'Deep tranquil memory tiles with emotional anchors.',
    description: 'Gently uncover matching pairs of healing symbols and calming affirmations in the deep blue quiet. Zero penalties, infinite serenity.',
    affirmation: 'My memory holds resilience, tenderness, and quiet courage.',
    icon: Waves,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'rhythm',
    title: 'Rhythm Resonance',
    category: 'Sound & Rhythm',
    badge: 'Game 08',
    tagline: 'Tap in sync with natural resting heartbeats & 4-7-8 breath.',
    description: 'Tap with gentle rhythmic rings that pulse at 60 BPM. Entrain your autonomic nervous system into parasympathetic relaxation.',
    affirmation: 'My heart slows. My pulse grounds into the earth.',
    icon: Activity,
    gradient: 'from-red-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'stardust',
    title: 'Stardust Dash',
    category: 'Centering',
    badge: 'Game 09',
    tagline: 'Endless serene flight through nebula dust (No fail state).',
    description: 'Glide effortlessly through warm cosmic dust and collect glowing stardust sparks. No hazards, no game over, only ambient beauty.',
    affirmation: 'I am moving forward, softly and without pressure.',
    icon: Star,
    gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent'
  },
  {
    id: 'healing',
    title: 'Healing Hz Solfeggio',
    category: 'Sound & Rhythm',
    badge: 'Game 10',
    tagline: 'Interactive pure-tone Solfeggio & binaural beat sound bath.',
    description: 'Play pure 432 Hz Verdi tuning, 528 Hz DNA repair, and 639 Hz interpersonal harmony with live oscilloscope visualization.',
    affirmation: 'Every cell in my body responds to harmonious resonance.',
    icon: Volume2,
    gradient: 'from-indigo-500/20 via-emerald-500/10 to-transparent'
  },
  {
    id: 'mind',
    title: 'Mind Mode Shifter',
    category: 'Centering',
    badge: 'Game 11',
    tagline: 'Shift cognitive states: Overthinking, Alpha, Grounding, Sleep.',
    description: 'Interactive dial to shift internal neurological frequencies. Transition from high-frequency cortisol static to deep theta sanctuary.',
    affirmation: 'I have the authority to shift how I perceive my reality.',
    icon: Brain,
    gradient: 'from-purple-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'mood',
    title: 'Mood Journey',
    category: 'Introspection',
    badge: 'Game 12',
    tagline: 'Emotional weather map charting the journey from storm to sunrise.',
    description: 'Map where your soul is standing today — Thunderstorm, Heavy Fog, Passing Rain, Clearing Skies, or Golden Sunrise. Save gentle reflections.',
    affirmation: 'No weather is permanent. The sky outlives every thunderstorm.',
    icon: Sun,
    gradient: 'from-amber-500/20 via-rose-500/10 to-transparent'
  }
];

export const SanctuaryArcade: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameId>('solitaire');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const currentGame = SANCTUARY_GAMES.find(g => g.id === selectedGame) || SANCTUARY_GAMES[0];

  const categories = ['All', 'Calm Puzzle', 'Centering', 'Sound & Rhythm', 'Introspection'];

  const filteredGames = filterCategory === 'All' 
    ? SANCTUARY_GAMES 
    : SANCTUARY_GAMES.filter(g => g.category === filterCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1020] via-[#090d18] to-[#060810] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-mono text-indigo-300">
              <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
              <span>THE 12 SANCTUARY GAMES · 100% FREE · NO TIMERS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Rise From Madness Arcade
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every game here was crafted from lived experience by <span className="text-indigo-300 font-semibold">Shane Cooper</span>. 
              Designed to soothe high-voltage anxiety, slow racing thoughts, and remind you: <em className="text-amber-200">sanity earns you status, not clout</em>.
            </p>
          </div>

          {/* Quick Stats & Philosophy */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="rounded-2xl border border-slate-800 bg-[#0e1424]/80 p-4 text-center">
              <span className="block text-2xl font-bold font-mono text-indigo-400">12</span>
              <span className="text-xs text-slate-400">Calm Games</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-[#0e1424]/80 p-4 text-center">
              <span className="block text-2xl font-bold font-mono text-emerald-400">0s</span>
              <span className="text-xs text-slate-400">Zero Timers</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Game Carousel / Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredGames.map((game) => {
          const Icon = game.icon;
          const isSelected = selectedGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => {
                setSelectedGame(game.id);
                audioEngine.playChime(432);
              }}
              className={`group relative flex flex-col text-left p-3.5 rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? 'border-indigo-400 bg-gradient-to-b from-indigo-950/80 to-[#0e1428] shadow-lg shadow-indigo-500/20 scale-[1.02]'
                  : 'border-slate-800/80 bg-[#090d18]/70 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-indigo-400/80">{game.badge}</span>
                <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'}`} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 text-slate-400 group-hover:text-indigo-300'}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-200 line-clamp-1">
                {game.title}
              </h3>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                {game.category}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Game Stage */}
      <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-4 sm:p-8 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <currentGame.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-indigo-400">{currentGame.badge} · {currentGame.category}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white">{currentGame.title}</h2>
              <p className="text-xs text-slate-400">{currentGame.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 px-4 py-2 rounded-xl">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
            <span className="italic">"{currentGame.affirmation}"</span>
          </div>
        </div>

        {/* Dynamic Game Component Loader */}
        <div className="min-h-[480px]">
          {selectedGame === 'solitaire' && <SanitySolitaireGame />}
          {selectedGame === 'connect' && <CosmicConnect />}
          {selectedGame === 'truth' && <TruthTagGame />}
          {selectedGame === 'focus' && <CosmicFocusGame />}
          {selectedGame === 'nebula' && <NumberNebulaGame />}
          {selectedGame === 'pattern' && <PatternGalaxyGame />}
          {selectedGame === 'ocean' && <MemoryOceanGame />}
          {selectedGame === 'rhythm' && <RhythmResonanceGame />}
          {selectedGame === 'stardust' && <StardustDashGame />}
          {selectedGame === 'healing' && <HealingHzInteractiveGame />}
          {selectedGame === 'mind' && <MindModeGame />}
          {selectedGame === 'mood' && <MoodJourneyGame />}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 1: SANITY SOLITAIRE (Calm Meditative Card Sorting)
========================================================================= */
interface SolitaireCard {
  id: string;
  suit: 'Mind' | 'Breath' | 'Ground' | 'Purpose';
  value: number;
  label: string;
  affirmation: string;
}

const INITIAL_SOLITAIRE_CARDS: SolitaireCard[] = [
  { id: 'm1', suit: 'Mind', value: 1, label: 'Awareness', affirmation: 'I observe my thoughts without becoming them.' },
  { id: 'm2', suit: 'Mind', value: 2, label: 'Clarity', affirmation: 'The clouds move. The sky remains unchanged.' },
  { id: 'm3', suit: 'Mind', value: 3, label: 'Stillness', affirmation: 'Silence is not empty; it is full of peace.' },
  { id: 'b1', suit: 'Breath', value: 1, label: 'Inhale Peace', affirmation: 'Drawing fresh life into every cell.' },
  { id: 'b2', suit: 'Breath', value: 2, label: 'Hold Anchor', affirmation: 'Suspended in safety between breaths.' },
  { id: 'b3', suit: 'Breath', value: 3, label: 'Exhale Tension', affirmation: 'Releasing what I no longer need to carry.' },
  { id: 'g1', suit: 'Ground', value: 1, label: 'Feet on Earth', affirmation: 'Gravity holds me gently and securely.' },
  { id: 'g2', suit: 'Ground', value: 2, label: 'Rooted Oak', affirmation: 'Storms pass over; my roots reach deep.' },
  { id: 'g3', suit: 'Ground', value: 3, label: 'Tactile Safety', affirmation: 'I am here, in my physical sanctuary.' },
  { id: 'p1', suit: 'Purpose', value: 1, label: 'Rise From Madness', affirmation: 'Turn pain into power.' },
  { id: 'p2', suit: 'Purpose', value: 2, label: 'Love Over Money', affirmation: 'Sanity earns you status — not clout.' },
  { id: 'p3', suit: 'Purpose', value: 3, label: 'Evolution Not Erasure', affirmation: 'Leave people better than you found them.' }
];

const SanitySolitaireGame: React.FC = () => {
  const [deck, setDeck] = useState<SolitaireCard[]>([]);
  const [hand, setHand] = useState<SolitaireCard | null>(null);
  const [foundations, setFoundations] = useState<{ [key: string]: SolitaireCard[] }>({
    Mind: [],
    Breath: [],
    Ground: [],
    Purpose: []
  });
  const [completed, setCompleted] = useState(false);
  const [activeAffirmation, setActiveAffirmation] = useState('Draw a card from the Sanctuary deck to begin.');

  const initGame = () => {
    // Shuffle
    const shuffled = [...INITIAL_SOLITAIRE_CARDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setHand(null);
    setFoundations({
      Mind: [],
      Breath: [],
      Ground: [],
      Purpose: []
    });
    setCompleted(false);
    setActiveAffirmation('Draw a card to restore inner alignment.');
    audioEngine.playChime(432);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleDraw = () => {
    if (deck.length === 0) {
      setActiveAffirmation('Sanctuary deck cleared! Place your remaining cards into their foundations.');
      return;
    }
    const nextCard = deck[0];
    setHand(nextCard);
    setDeck(deck.slice(1));
    setActiveAffirmation(nextCard.affirmation);
    audioEngine.playChime(300 + nextCard.value * 80);
  };

  const handlePlace = (suit: 'Mind' | 'Breath' | 'Ground' | 'Purpose') => {
    if (!hand) return;
    if (hand.suit !== suit) {
      setActiveAffirmation(`This card belongs to the ${hand.suit} foundation.`);
      return;
    }

    const currentPile = foundations[suit];
    const expectedValue = currentPile.length + 1;

    if (hand.value === expectedValue) {
      const nextPile = [...currentPile, hand];
      const nextFoundations = { ...foundations, [suit]: nextPile };
      setFoundations(nextFoundations);
      setHand(null);
      audioEngine.playChime(528 + hand.value * 40);

      // Check win condition
      const totalPlaced = Object.values(nextFoundations).reduce((acc, p) => acc + p.length, 0);
      if (totalPlaced === INITIAL_SOLITAIRE_CARDS.length) {
        setCompleted(true);
        setActiveAffirmation('✨ All 4 Foundations aligned! Your mind has returned to peaceful equilibrium.');
        audioEngine.playChime(963);
      } else {
        setActiveAffirmation(`✨ Placed ${hand.label} into ${suit}! ${hand.affirmation}`);
      }
    } else {
      setActiveAffirmation(`Order matters: Place Tier ${expectedValue} before Tier ${hand.value}.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0d1222] border border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-white">How to Play Sanity Solitaire</h4>
          <p className="text-xs text-slate-400">
            Draw cards and place them into the 4 Foundations in ascending order (Tier 1 → Tier 2 → Tier 3). No penalties.
          </p>
        </div>
        <button
          onClick={initGame}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reshuffle Deck</span>
        </button>
      </div>

      {/* Affirmation Banner */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-center text-sm font-medium text-indigo-200">
        "{activeAffirmation}"
      </div>

      {/* Main Playfield: Deck + Hand + Foundations */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Draw Pile & Active Hand */}
        <div className="flex md:flex-col gap-4 items-center justify-center p-6 rounded-2xl bg-[#0d1326] border border-slate-800">
          <div className="text-center">
            <span className="text-xs font-mono text-slate-400 mb-2 block">Sanctuary Deck ({deck.length})</span>
            <button
              onClick={handleDraw}
              disabled={deck.length === 0}
              className={`h-36 w-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                deck.length > 0 
                  ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-900/60 to-purple-900/40 hover:scale-105 cursor-pointer shadow-lg shadow-indigo-900/30' 
                  : 'border-slate-800 bg-slate-900/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <Sparkles className="h-6 w-6 text-indigo-400 mb-1" />
              <span className="text-[11px] font-bold text-white">Draw</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-xs font-mono text-slate-400 mb-2 block">Active Hand</span>
            {hand ? (
              <div className="h-36 w-24 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-slate-900 to-amber-950/40 p-2 flex flex-col justify-between shadow-xl animate-fade-in">
                <div className="flex justify-between items-center text-[10px] font-mono text-amber-400">
                  <span>{hand.suit}</span>
                  <span>#{hand.value}</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-white block">{hand.label}</span>
                </div>
                <div className="text-[8px] text-slate-400 line-clamp-2 italic text-center">
                  {hand.affirmation}
                </div>
              </div>
            ) : (
              <div className="h-36 w-24 rounded-2xl border-2 border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-600">
                Empty
              </div>
            )}
          </div>
        </div>

        {/* 4 Foundations */}
        <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(['Mind', 'Breath', 'Ground', 'Purpose'] as const).map((suit) => {
            const pile = foundations[suit];
            const topCard = pile[pile.length - 1];
            return (
              <div 
                key={suit}
                onClick={() => handlePlace(suit)}
                className="flex flex-col items-center justify-between p-4 rounded-2xl bg-[#0c1020] border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all min-h-[220px]"
              >
                <div className="text-center mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">{suit}</span>
                  <span className="text-[10px] text-slate-500 block">Tier {pile.length}/3</span>
                </div>

                {topCard ? (
                  <div className="h-36 w-24 rounded-2xl border border-indigo-400/50 bg-gradient-to-b from-indigo-950/70 to-slate-900 p-2 flex flex-col justify-between shadow-lg">
                    <div className="flex justify-between text-[10px] font-mono text-indigo-300">
                      <span>{suit}</span>
                      <span>#{topCard.value}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-white block">{topCard.label}</span>
                    </div>
                    <div className="text-[8px] text-emerald-400 text-center font-bold">
                      Aligned ✓
                    </div>
                  </div>
                ) : (
                  <div className="h-36 w-24 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 gap-1">
                    <span className="text-[10px]">Tier 1</span>
                    <span className="text-[9px]">Tap to place</span>
                  </div>
                )}

                <button 
                  disabled={!hand || hand.suit !== suit}
                  className={`mt-3 w-full py-1.5 rounded-xl text-[11px] font-semibold transition ${
                    hand && hand.suit === suit 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md' 
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  Place Here
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 3: TRUTH TAG (Vulnerability & Honesty Reflections)
========================================================================= */
const TRUTH_CARDS = [
  {
    id: 1,
    tag: '#Unmasked',
    prompt: 'What are you tired of pretending is okay in your life?',
    quote: '"You say I\'m mad — you just don\'t understand me."',
    reflection: 'Admitting weariness is not failure; it is the first breath of true recovery.'
  },
  {
    id: 2,
    tag: '#LoveOverMoney',
    prompt: 'Where did you chase status or clout, and what did it cost your peace?',
    quote: '"Sanity earns you status — not clout."',
    reflection: 'The world rewards noise, but the soul only heals in quiet authenticity.'
  },
  {
    id: 3,
    tag: '#TheShadow',
    prompt: 'What negative voice in your head are you learning to play with instead of fearing?',
    quote: '"It\'s not me, it\'s my shadow, and overcoming it is my superpower."',
    reflection: 'Your shadow holds energy. Reclaim it as fuel for your art and purpose.'
  },
  {
    id: 4,
    tag: '#QuietResilience',
    prompt: 'Who taught you what quiet courage looks like without ever boasting?',
    quote: '"Honouring Private A.L. Cooper & Ivan Kurcharskyi — service, quiet resilience."',
    reflection: 'Strength does not roar. Often it is the quiet whisper saying: I will try again tomorrow.'
  },
  {
    id: 5,
    tag: '#EvolutionNotErasure',
    prompt: 'What part of your broken past are you now proud you survived?',
    quote: '"Healing grows where we thought we were broken."',
    reflection: 'We do not erase the scars; we evolve them into our greatest compass.'
  }
];

const TruthTagGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taggedReflections, setTaggedReflections] = useState<{ [id: number]: string }>({});
  const [userText, setUserText] = useState('');
  const [savedCount, setSavedCount] = useState(0);

  const card = TRUTH_CARDS[currentIndex];

  const handleSaveReflection = () => {
    if (!userText.trim()) return;
    setTaggedReflections({ ...taggedReflections, [card.id]: userText });
    setSavedCount(prev => prev + 1);
    setUserText('');
    audioEngine.playChime(528);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TRUTH_CARDS.length);
    setUserText(taggedReflections[TRUTH_CARDS[(currentIndex + 1) % TRUTH_CARDS.length].id] || '');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/30 via-[#0e1424] to-[#080b14] border border-rose-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-rose-400 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30">
            {card.tag}
          </span>
          <span className="text-xs font-mono text-slate-400">Card {currentIndex + 1} of {TRUTH_CARDS.length}</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
          {card.prompt}
        </h3>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 text-xs italic text-amber-200/90 font-mono">
          {card.quote}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {card.reflection}
        </p>

        {/* Input area */}
        <div className="space-y-2 pt-2">
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Tag your truth here in private honesty..."
            rows={3}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-rose-500 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleSaveReflection}
              disabled={!userText.trim()}
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 disabled:opacity-40 transition"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Tag Truth & Anchor</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <span>Next Card</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {savedCount > 0 && (
        <div className="text-center text-xs text-emerald-400 font-mono">
          ✓ {savedCount} truth reflection{savedCount > 1 ? 's' : ''} securely anchored into your sanctuary session.
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   GAME 4: COSMIC FOCUS (Zen Focus Orb & Gaze Tracking)
========================================================================= */
const CosmicFocusGame: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPhase((p) => {
            if (p === 'Inhale') {
              audioEngine.playChime(432);
              return 'Hold';
            }
            if (p === 'Hold') {
              audioEngine.playChime(528);
              return 'Exhale';
            }
            if (p === 'Exhale') {
              audioEngine.playChime(396);
              return 'Rest';
            }
            setCycleCount((c) => c + 1);
            audioEngine.playChime(639);
            return 'Inhale';
          });
          return 0;
        }
        return prev + 1.25;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-8">
      <div className="text-center max-w-md space-y-2">
        <span className="text-xs font-mono text-cyan-400">4-7-8 CELESTIAL BREATHING</span>
        <h3 className="text-2xl font-bold text-white">Anchored Focus Orb</h3>
        <p className="text-xs text-slate-400">
          Softly rest your eyes on the pulsating core. Match your lungs to the celestial expansion.
        </p>
      </div>

      {/* Breathing Sphere */}
      <div className="relative flex items-center justify-center h-64 w-64">
        {/* Outer Radiant Rings */}
        <div 
          className="absolute rounded-full border border-cyan-500/20 bg-cyan-500/5 transition-all duration-300"
          style={{
            height: `${140 + progress * 0.9}px`,
            width: `${140 + progress * 0.9}px`,
            opacity: 0.4 + (progress / 100) * 0.4
          }}
        />
        <div 
          className="absolute rounded-full border border-indigo-500/30 bg-indigo-500/10 blur-md transition-all duration-300"
          style={{
            height: `${100 + progress * 0.6}px`,
            width: `${100 + progress * 0.6}px`
          }}
        />

        {/* Center Glowing Singularity */}
        <div className="relative z-10 flex flex-col items-center justify-center h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-2xl shadow-cyan-500/40 text-center p-3">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-900 uppercase">
            {phase}
          </span>
          <span className="text-[10px] text-slate-900/80 font-mono mt-1 font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
        <span>Cycles Completed: <strong className="text-cyan-300">{cycleCount}</strong></span>
        <span>·</span>
        <span>Heart Coherence: <strong className="text-emerald-400">Harmonizing</strong></span>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 5: NUMBER NEBULA (Solfeggio Sequence Calmer)
========================================================================= */
const SOLFEGGIO_NUMBERS = [174, 285, 396, 417, 528, 639, 741, 852, 963];

const NumberNebulaGame: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const initRound = () => {
    // Shuffle the numbers
    const shuffled = [...SOLFEGGIO_NUMBERS].sort(() => Math.random() - 0.5);
    setSequence(shuffled);
    setTargetIndex(0);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleTapNumber = (num: number) => {
    const expected = SOLFEGGIO_NUMBERS[targetIndex];
    if (num === expected) {
      audioEngine.playChime(num);
      const nextIndex = targetIndex + 1;
      setTargetIndex(nextIndex);

      if (nextIndex === SOLFEGGIO_NUMBERS.length) {
        setCompletedCycles(c => c + 1);
        audioEngine.playChime(963);
        setTimeout(() => {
          initRound();
        }, 800);
      }
    } else {
      audioEngine.playChime(220); // Gentle low note, no harsh buzzer
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-violet-400">ASCENDING FREQUENCY CLIMB</span>
        <h3 className="text-xl font-bold text-white">Find {SOLFEGGIO_NUMBERS[targetIndex]} Hz</h3>
        <p className="text-xs text-slate-400">
          Tap the Solfeggio frequencies from lowest to highest. Let each tone settle in your chest.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-300"
          style={{ width: `${(targetIndex / SOLFEGGIO_NUMBERS.length) * 100}%` }}
        />
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        {sequence.map((num) => {
          const isSolved = SOLFEGGIO_NUMBERS.indexOf(num) < targetIndex;
          const isNext = num === SOLFEGGIO_NUMBERS[targetIndex];

          return (
            <button
              key={num}
              onClick={() => handleTapNumber(num)}
              disabled={isSolved}
              className={`h-20 rounded-2xl border font-mono text-lg font-bold transition-all duration-300 flex flex-col items-center justify-center ${
                isSolved
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400 opacity-60 scale-95'
                  : isNext
                  ? 'border-violet-500 bg-violet-950/60 text-white shadow-lg shadow-violet-500/20 hover:scale-105'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span>{num}</span>
              <span className="text-[10px] font-sans text-slate-500">Hz</span>
            </button>
          );
        })}
      </div>

      <div className="text-xs font-mono text-slate-400 pt-2">
        Full Resonances Completed: <strong className="text-violet-400">{completedCycles}</strong>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 6: PATTERN GALAXY (Galactic Symmetry Mandala)
========================================================================= */
const PatternGalaxyGame: React.FC = () => {
  const [rotations, setRotations] = useState<number[]>([90, 180, 270, 0]);
  const [isAligned, setIsAligned] = useState(false);

  const handleRotate = (index: number) => {
    const updated = [...rotations];
    updated[index] = (updated[index] + 90) % 360;
    setRotations(updated);
    audioEngine.playChime(350 + index * 75);

    // Check if all aligned to 0 or same orientation
    if (updated.every(r => r === 0)) {
      setIsAligned(true);
      audioEngine.playChime(528);
    } else {
      setIsAligned(false);
    }
  };

  const handleShuffle = () => {
    setRotations([90, 180, 270, 180]);
    setIsAligned(false);
    audioEngine.playChime(432);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-emerald-400">SACRED GEOMETRIC HARMONY</span>
        <h3 className="text-xl font-bold text-white">Galactic Symmetry</h3>
        <p className="text-xs text-slate-400">
          Tap each quadrant to rotate until all sacred arches meet in the center.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 rounded-3xl bg-[#0c1020] border border-slate-800 max-w-xs mx-auto">
        {rotations.map((rot, idx) => (
          <button
            key={idx}
            onClick={() => handleRotate(idx)}
            className="h-28 w-28 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-center transition-transform duration-300 relative overflow-hidden group"
          >
            <div 
              className="h-16 w-16 rounded-tl-full border-t-4 border-l-4 border-emerald-400 transition-transform duration-300 group-hover:scale-105"
              style={{ transform: `rotate(${rot}deg)` }}
            />
          </button>
        ))}
      </div>

      {isAligned ? (
        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 animate-pulse">
          ✨ Perfect Galactic Alignment Achieved! Inner harmony restored.
        </div>
      ) : (
        <button
          onClick={handleShuffle}
          className="text-xs text-slate-400 hover:text-white underline font-mono"
        >
          Reshuffle Geometry
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   GAME 7: MEMORY OCEAN (Tranquil Memory Tiles)
========================================================================= */
const OCEAN_SYMBOLS = ['🌊', '🌸', '✨', '💛', '🕊️', '🌿'];

const MemoryOceanGame: React.FC = () => {
  const [cards, setCards] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);

  const initGame = () => {
    const deck = [...OCEAN_SYMBOLS, ...OCEAN_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({ id, symbol, flipped: false, matched: false }));
    setCards(deck);
    setSelectedCards([]);
    setMatchesCount(0);
    audioEngine.playChime(432);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (selectedCards.length === 2) return;
    const clicked = cards.find(c => c.id === id);
    if (!clicked || clicked.flipped || clicked.matched) return;

    const updated = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(updated);
    audioEngine.playChime(300 + id * 30);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const first = updated.find(c => c.id === newSelected[0]);
      const second = updated.find(c => c.id === newSelected[1]);

      if (first && second && first.symbol === second.symbol) {
        // Matched
        setTimeout(() => {
          setCards(cards.map(c => (c.id === first.id || c.id === second.id) ? { ...c, matched: true, flipped: true } : c));
          setSelectedCards([]);
          setMatchesCount(m => m + 1);
          audioEngine.playChime(528);
        }, 500);
      } else {
        // Flip back
        setTimeout(() => {
          setCards(cards.map(c => (c.id === first?.id || c.id === second?.id) ? { ...c, flipped: false } : c));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-blue-400">TRANQUIL OCEAN PAIRS</span>
        <h3 className="text-xl font-bold text-white">Memory Ocean</h3>
        <p className="text-xs text-slate-400">
          Uncover serene matching pairs. Take all the time you need.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCardClick(c.id)}
            className={`h-20 rounded-2xl border text-2xl flex items-center justify-center transition-all duration-300 ${
              c.flipped || c.matched
                ? 'border-blue-400 bg-blue-950/60 shadow-lg shadow-blue-500/20'
                : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
            }`}
          >
            {c.flipped || c.matched ? c.symbol : '⚓'}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
        <span>Matches: <strong className="text-blue-400">{matchesCount} / {OCEAN_SYMBOLS.length}</strong></span>
        <button onClick={initGame} className="hover:text-white underline">
          Restart Ocean
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 8: RHYTHM RESONANCE (60 BPM Heart Entrainment)
========================================================================= */
const RhythmResonanceGame: React.FC = () => {
  const [pulseScale, setPulseScale] = useState(1);
  const [taps, setTaps] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('Tap when the circle matches the outer gold ring.');

  useEffect(() => {
    // 60 BPM = 1 beat per second
    const interval = setInterval(() => {
      setPulseScale(1.3);
      setTimeout(() => setPulseScale(1), 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    const now = Date.now();
    setTaps(prev => [...prev.slice(-4), now]);
    audioEngine.playChime(432);

    if (pulseScale > 1.15) {
      setFeedback('✨ Perfect Harmonic Sync! Your nervous system is settling.');
    } else {
      setFeedback('Gently slow down. Follow the steady 60 BPM cosmic pulse.');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center py-6">
      <div className="space-y-1">
        <span className="text-xs font-mono text-red-400">PARASYMPATHETIC 60 BPM PULSE</span>
        <h3 className="text-xl font-bold text-white">Rhythm Resonance</h3>
        <p className="text-xs text-slate-400">
          Synchronize your finger tap to the calm resting human heartbeat.
        </p>
      </div>

      <div className="relative flex items-center justify-center h-48 w-48 mx-auto">
        {/* Target Ring */}
        <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-amber-500/40" />

        {/* Pulsing Core */}
        <button
          onClick={handleTap}
          style={{ transform: `scale(${pulseScale})` }}
          className="relative z-10 h-28 w-28 rounded-full bg-gradient-to-br from-red-500 to-rose-700 shadow-xl shadow-red-500/30 flex items-center justify-center text-white font-bold transition-transform duration-300"
        >
          <Activity className="h-8 w-8 text-white animate-pulse" />
        </button>
      </div>

      <p className="text-xs text-slate-300 font-mono italic">
        {feedback}
      </p>
    </div>
  );
};

/* =========================================================================
   GAME 9: STARDUST DASH (Endless Serene Cosmic Flight)
========================================================================= */
const StardustDashGame: React.FC = () => {
  const [starsCollected, setStarsCollected] = useState(0);
  const [shipY, setShipY] = useState(50); // percentage

  const handleMove = (direction: 'up' | 'down') => {
    setShipY(prev => {
      const next = direction === 'up' ? Math.max(15, prev - 15) : Math.min(85, prev + 15);
      return next;
    });
    setStarsCollected(s => s + 1);
    audioEngine.playChime(300 + Math.random() * 400);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-yellow-400">SERENE FLIGHT · NO FAIL STATE</span>
        <h3 className="text-xl font-bold text-white">Stardust Dash</h3>
        <p className="text-xs text-slate-400">
          Glide gently through nebula dust. Gather stardust sparks without tension or obstacles.
        </p>
      </div>

      {/* Flight Canvas Box */}
      <div className="relative h-60 w-full rounded-3xl bg-gradient-to-r from-[#060812] via-[#0d1226] to-[#080d1e] border border-slate-800 overflow-hidden">
        {/* Ambient Stars */}
        <div className="absolute inset-0 flex items-center justify-around opacity-40">
          <span className="text-lg animate-pulse">✨</span>
          <span className="text-sm animate-pulse">⭐</span>
          <span className="text-xl animate-pulse">🌟</span>
          <span className="text-sm animate-pulse">✨</span>
        </div>

        {/* Player Orb */}
        <div 
          className="absolute left-10 h-10 w-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-xl shadow-yellow-500/50 flex items-center justify-center transition-all duration-300"
          style={{ top: `${shipY}%` }}
        >
          <Sparkles className="h-5 w-5 text-slate-900" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleMove('up')}
          className="rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
        >
          ↑ Ascend
        </button>
        <button
          onClick={() => handleMove('down')}
          className="rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
        >
          ↓ Descend
        </button>
      </div>

      <div className="text-xs font-mono text-yellow-400">
        Stardust Sparks Gathered: <strong>{starsCollected}</strong>
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 10: HEALING HZ INTERACTIVE
========================================================================= */
const HealingHzInteractiveGame: React.FC = () => {
  const [activeHz, setActiveHz] = useState(528);
  const [isPlaying, setIsPlaying] = useState(false);

  const frequencies = [
    { hz: 432, label: '432 Hz', desc: 'Verdi Harmony & Deep Calm' },
    { hz: 528, label: '528 Hz', desc: 'Miracle Tone & DNA Repair' },
    { hz: 639, label: '639 Hz', desc: 'Compassion & Connection' },
    { hz: 741, label: '741 Hz', desc: 'Detoxification & Intuition' },
    { hz: 852, label: '852 Hz', desc: 'Spiritual Alignment' },
    { hz: 963, label: '963 Hz', desc: 'Pure Cosmic Consciousness' }
  ];

  const togglePlay = (hz: number) => {
    setActiveHz(hz);
    if (isPlaying && activeHz === hz) {
      audioEngine.stopFrequency();
      setIsPlaying(false);
    } else {
      audioEngine.playFrequency(hz, 4);
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-indigo-400">SOLFEGGIO SOUND BATH GENERATOR</span>
        <h3 className="text-xl font-bold text-white">Pure Harmonic Tones</h3>
        <p className="text-xs text-slate-400">
          Synthesized in real-time via Web Audio API. Plug in headphones for the 4Hz Theta binaural beat.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {frequencies.map((f) => {
          const isSelected = activeHz === f.hz && isPlaying;
          return (
            <button
              key={f.hz}
              onClick={() => togglePlay(f.hz)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-400 bg-indigo-950/80 shadow-lg shadow-indigo-500/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">{f.label}</span>
                {isSelected && <Volume2 className="h-4 w-4 text-indigo-400 animate-pulse" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{f.desc}</p>
            </button>
          );
        })}
      </div>

      {isPlaying && (
        <button
          onClick={() => { audioEngine.stopFrequency(); setIsPlaying(false); }}
          className="rounded-xl bg-slate-800 px-6 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
        >
          Stop Audio Bath
        </button>
      )}
    </div>
  );
};

/* =========================================================================
   GAME 11: MIND MODE SHIFTER (Cognitive Dial)
========================================================================= */
const MindModeGame: React.FC = () => {
  const [mode, setMode] = useState<'Overthinking Release' | 'Grounding Anchor' | 'Alpha Waves' | 'Sleep Drift'>('Grounding Anchor');

  const modes = [
    { title: 'Overthinking Release', hz: '174 Hz', desc: 'Breaks frantic loop thoughts. Releases adrenaline.' },
    { title: 'Grounding Anchor', hz: '432 Hz', desc: 'Returns awareness to soles of feet and physical weight.' },
    { title: 'Alpha Waves', hz: '528 Hz', desc: 'Creative flow, relaxed alertness, serene confidence.' },
    { title: 'Sleep Drift', hz: 'Delta 2Hz', desc: 'Prepares brain for deep, healing, restorative sleep.' }
  ];

  return (
    <div className="max-w-lg mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-purple-400">COGNITIVE DIAL</span>
        <h3 className="text-xl font-bold text-white">Mind Mode Shifter</h3>
        <p className="text-xs text-slate-400">
          Select your desired neurological state to adapt your sensory sanctuary.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {modes.map((m) => (
          <button
            key={m.title}
            onClick={() => {
              setMode(m.title as any);
              audioEngine.playChime(432);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              mode === m.title
                ? 'border-purple-400 bg-purple-950/60 shadow-lg shadow-purple-500/20'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-mono text-purple-300 block mb-1">{m.hz}</span>
            <h4 className="text-sm font-bold text-white mb-1">{m.title}</h4>
            <p className="text-[11px] text-slate-400 leading-snug">{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-[#0d1222] border border-slate-800 text-xs text-slate-300">
        Current State: <strong className="text-purple-300">{mode}</strong> is active. Breathe into this space.
      </div>
    </div>
  );
};

/* =========================================================================
   GAME 12: MOOD JOURNEY (Emotional Weather Map)
========================================================================= */
const MoodJourneyGame: React.FC = () => {
  const [selectedWeather, setSelectedWeather] = useState('Clear Sky');

  const weatherOptions = [
    { weather: 'Thunderstorm', icon: '⚡', desc: 'Overwhelmed, sensory overload, heavy internal storm.' },
    { weather: 'Dense Fog', icon: '🌫️', desc: 'Dissociated, tired, hard to see the next step.' },
    { weather: 'Gentle Rain', icon: '🌧️', desc: 'Crying, releasing grief, letting sorrow rinse away.' },
    { weather: 'Sun Breaking Through', icon: '⛅', desc: 'Small warmth returning. Feeling a glimmer of hope.' },
    { weather: 'Golden Sunrise', icon: '🌅', desc: 'Clear, anchored, ready to rise from madness.' }
  ];

  return (
    <div className="max-w-lg mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <span className="text-xs font-mono text-amber-400">EMOTIONAL WEATHER MAP</span>
        <h3 className="text-xl font-bold text-white">Where is Your Soul Standing?</h3>
        <p className="text-xs text-slate-400">
          Honor whatever weather you are experiencing right now. No weather is a sin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {weatherOptions.map((w) => (
          <button
            key={w.weather}
            onClick={() => {
              setSelectedWeather(w.weather);
              audioEngine.playChime(528);
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedWeather === w.weather
                ? 'border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-500/20'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{w.icon}</span>
              <span className="text-sm font-bold text-white">{w.weather}</span>
            </div>
            <p className="text-[11px] text-slate-400">{w.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 text-xs italic text-amber-200">
        "The sky does not apologize for storms. Neither must you. Hold on — dawn always breaks."
      </div>
    </div>
  );
};
