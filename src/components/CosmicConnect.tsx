import React, { useState, useEffect, useRef } from 'react';
import { 
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
  Volume2
} from 'lucide-react';
import { CONSTELLATIONS } from '../data/mockData';
import { Constellation, MemoryCard } from '../types';
import { audioEngine } from '../utils/audioEngine';

// Extended Constellation Catalog (5 Master Constellations)
const EXTENDED_CONSTELLATIONS: Constellation[] = [
  ...CONSTELLATIONS,
  {
    id: 'c-heart',
    title: 'The Unbroken Heart',
    symbol: '💛',
    meaning: 'Healing grows where you thought you were completely broken. Fractured stone wrapped in wildflower stars.',
    affirmation: 'My heart has broken open, not broken down. Life and compassion pour through the cracks.',
    nodes: [
      { id: 1, x: 200, y: 150, name: 'Inner Cleft' },
      { id: 2, x: 130, y: 90, name: 'Left Atrium' },
      { id: 3, x: 70, y: 160, name: 'Left Arch' },
      { id: 4, x: 130, y: 250, name: 'Left Ventricle' },
      { id: 5, x: 200, y: 320, name: 'Apex of Renewal' },
      { id: 6, x: 270, y: 250, name: 'Right Ventricle' },
      { id: 7, x: 330, y: 160, name: 'Right Arch' },
      { id: 8, x: 270, y: 90, name: 'Right Atrium' }
    ],
    connections: [
      [1, 2], [2, 3], [3, 4], [4, 5],
      [1, 8], [8, 7], [7, 6], [6, 5]
    ]
  },
  {
    id: 'c-crown',
    title: 'The Crown of Serenity',
    symbol: '👑',
    meaning: 'Sanity earns you status — not clout. Quiet sovereignty over your inner universe.',
    affirmation: 'I crown myself with patience. I do not have to perform for a world that does not understand my silence.',
    nodes: [
      { id: 1, x: 100, y: 260, name: 'Left Base' },
      { id: 2, x: 200, y: 270, name: 'Center Base' },
      { id: 3, x: 300, y: 260, name: 'Right Base' },
      { id: 4, x: 80, y: 150, name: 'Left Spire' },
      { id: 5, x: 150, y: 190, name: 'Valley L' },
      { id: 6, x: 200, y: 90, name: 'Solar Apex' },
      { id: 7, x: 250, y: 190, name: 'Valley R' },
      { id: 8, x: 320, y: 150, name: 'Right Spire' }
    ],
    connections: [
      [1, 2], [2, 3],
      [1, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 3]
    ]
  }
];

export const CosmicConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constellation' | 'breathe' | 'memory' | 'dissolver' | 'grounding'>('constellation');

  // --- Constellation Drawing State ---
  const [activeConstellationIndex, setActiveConstellationIndex] = useState(0);
  const currentConstellation = EXTENDED_CONSTELLATIONS[activeConstellationIndex];
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const [constellationCompleted, setConstellationCompleted] = useState(false);

  const handleNodeClick = (nodeId: number) => {
    if (constellationCompleted) return;

    if (!connectedNodes.includes(nodeId)) {
      const next = [...connectedNodes, nodeId];
      setConnectedNodes(next);
      audioEngine.playChime(300 + nodeId * 45);

      if (next.length === currentConstellation.nodes.length) {
        setConstellationCompleted(true);
        audioEngine.playChime(528);
      }
    }
  };

  const handleResetConstellation = () => {
    setConnectedNodes([]);
    setConstellationCompleted(false);
  };

  const handleNextConstellation = () => {
    setActiveConstellationIndex((prev) => (prev + 1) % EXTENDED_CONSTELLATIONS.length);
    setConnectedNodes([]);
    setConstellationCompleted(false);
  };

  // --- Star Breathe State ---
  const [breathePattern, setBreathePattern] = useState<'478' | 'box' | '48'>('478');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    const tick = () => {
      setBreathTimer((prev) => {
        if (prev > 1) return prev - 1;

        if (breathePattern === '478') {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            audioEngine.playChime(432);
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            audioEngine.playChime(396);
            return 8;
          } else {
            setBreathPhase('Inhale');
            audioEngine.playChime(528);
            setCompletedCycles((c) => c + 1);
            return 4;
          }
        } else if (breathePattern === 'box') {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            audioEngine.playChime(432);
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            audioEngine.playChime(396);
            return 4;
          } else if (breathPhase === 'Exhale') {
            setBreathPhase('Pause');
            audioEngine.playChime(285);
            return 4;
          } else {
            setBreathPhase('Inhale');
            audioEngine.playChime(528);
            setCompletedCycles((c) => c + 1);
            return 4;
          }
        } else {
          // 4-8 Vagal Release
          if (breathPhase === 'Inhale') {
            setBreathPhase('Exhale');
            audioEngine.playChime(396);
            return 8;
          } else {
            setBreathPhase('Inhale');
            audioEngine.playChime(528);
            setCompletedCycles((c) => c + 1);
            return 4;
          }
        }
      });
    };

    const timerId = window.setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [breathPhase, breathePattern]);

  // --- 16-Card Cosmic Memory Game ---
  const initialSymbols = [
    { symbolId: 'sigil', name: 'Sanity Sigil', icon: '✦', color: '#818CF8' },
    { symbolId: 'wave', name: 'Solfeggio 528', icon: '〰', color: '#38BDF8' },
    { symbolId: 'phoenix', name: 'Phoenix Fire', icon: '❖', color: '#F43F5E' },
    { symbolId: 'anchor', name: 'Ocean Anchor', icon: '⚓', color: '#34D399' },
    { symbolId: 'moon', name: 'Crescent Peace', icon: '☽', color: '#A78BFA' },
    { symbolId: 'lotus', name: 'Wild Rebirth', icon: '❀', color: '#FBBF24' },
    { symbolId: 'star', name: 'Guiding Compass', icon: '★', color: '#60A5FA' },
    { symbolId: 'heart', name: 'Unbroken Soul', icon: '♥', color: '#FB7185' }
  ];

  const createDeck = (): MemoryCard[] => {
    const deck: MemoryCard[] = [];
    let counter = 1;
    [...initialSymbols, ...initialSymbols].forEach((s) => {
      deck.push({
        id: counter++,
        symbolId: s.symbolId,
        name: s.name,
        icon: s.icon,
        color: s.color,
        isFlipped: false,
        isMatched: false
      });
    });
    return deck.sort(() => Math.random() - 0.5);
  };

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(createDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    const next = [...memoryCards];
    next[index].isFlipped = true;
    setMemoryCards(next);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    audioEngine.playChime(320 + index * 20);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (next[first].symbolId === next[second].symbolId) {
        setTimeout(() => {
          const matched = [...next];
          matched[first].isMatched = true;
          matched[second].isMatched = true;
          setMemoryCards(matched);
          setFlippedIndices([]);
          setMatchesCount((c) => c + 1);
          audioEngine.playChime(639);
        }, 400);
      } else {
        setTimeout(() => {
          const reset = [...next];
          reset[first].isFlipped = false;
          reset[second].isFlipped = false;
          setMemoryCards(reset);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleResetMemory = () => {
    setMemoryCards(createDeck());
    setFlippedIndices([]);
    setMoves(0);
    setMatchesCount(0);
  };

  // --- The Void Jar (Thought Dissolver) ---
  const [voidThought, setVoidThought] = useState('');
  const [isDissolving, setIsDissolving] = useState(false);
  const [dissolvedParticles, setDissolvedParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [affirmationResult, setAffirmationResult] = useState<string | null>(null);

  const handleDissolveThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voidThought.trim()) return;

    setIsDissolving(true);
    audioEngine.playChime(174);

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: -Math.random() * 250 - 50
      });
    }
    setDissolvedParticles(particles);

    setTimeout(() => {
      audioEngine.playChime(528);
      setIsDissolving(false);
      setVoidThought('');
      setDissolvedParticles([]);
      const affirmations = [
        'That thought has dissipated into the cosmic ether. You are not your intrusive thoughts.',
        'The static has cleared. You remain steady, grounded, and unshakeable.',
        'Pain transmuted into stardust. Take a deep, slow breath.',
        'You have surrendered the burden. Carry only your light forward.'
      ];
      setAffirmationResult(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, 1800);
  };

  // --- 5-4-3-2-1 Grounding State ---
  const [groundingChecks, setGroundingChecks] = useState<Record<string, boolean>>({});
  const toggleGroundingCheck = (key: string) => {
    setGroundingChecks((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      audioEngine.playChime(432);
      return updated;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>HUMAN SANITY HUB · MINDFULNESS SUITE</span>
            <span aria-hidden="true">·</span>
            <span>COSMIC CONNECT</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Cosmic Connect
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Interactive nervous-system de-escalation games and sacred mindfulness tools. 
            Connect stars, regulate respiration, dissolve heavy thoughts into stardust, and sharpen mental clarity.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto overflow-x-auto">
          {[
            { id: 'constellation', label: 'Star Drawing', icon: Sparkles },
            { id: 'breathe', label: 'Star Breathe', icon: Wind },
            { id: 'memory', label: 'Cosmic Memory', icon: Brain },
            { id: 'dissolver', label: 'Thought Dissolver', icon: Zap },
            { id: 'grounding', label: '5-4-3-2-1 Guide', icon: Eye }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Tab 1: Constellation Drawing --- */}
      {activeTab === 'constellation' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 rounded-2xl border border-indigo-900/40 bg-[#090c17] p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800/80 pb-3">
              <div>
                <span className="font-mono text-indigo-400 uppercase font-bold">
                  {currentConstellation.title}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click the pulsing stars to trace the sacred geometry lines
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetConstellation}
                  className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleNextConstellation}
                  className="rounded bg-indigo-600/30 border border-indigo-500/40 px-2.5 py-1 text-xs text-indigo-300 hover:bg-indigo-600/50"
                >
                  Next ({activeConstellationIndex + 1}/{EXTENDED_CONSTELLATIONS.length})
                </button>
              </div>
            </div>

            {/* Interactive Star Canvas SVG */}
            <div className="relative mx-auto w-full max-w-[420px] aspect-square rounded-xl bg-black/70 border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                {/* Lines */}
                {currentConstellation.connections.map(([fromId, toId], idx) => {
                  const fromNode = currentConstellation.nodes.find((n) => n.id === fromId);
                  const toNode = currentConstellation.nodes.find((n) => n.id === toId);
                  const isVisible = connectedNodes.includes(fromId) && connectedNodes.includes(toId);

                  if (!fromNode || !toNode) return null;

                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isVisible ? '#818CF8' : 'rgba(255, 255, 255, 0.08)'}
                      strokeWidth={isVisible ? 2.5 : 1}
                      strokeDasharray={isVisible ? 'none' : '4 4'}
                    />
                  );
                })}

                {/* Nodes */}
                {currentConstellation.nodes.map((node) => {
                  const isTouched = connectedNodes.includes(node.id);
                  return (
                    <g key={node.id} className="cursor-pointer" onClick={() => handleNodeClick(node.id)}>
                      {isTouched && (
                        <circle
                          cx={node.x}
                          y={node.y}
                          r={14}
                          fill="rgba(129, 140, 248, 0.3)"
                          className="animate-pulse"
                        />
                      )}
                      <circle
                        cx={node.x}
                        y={node.y}
                        r={isTouched ? 6 : 4}
                        fill={isTouched ? '#FFFFFF' : '#818CF8'}
                        stroke="#6366F1"
                        strokeWidth={isTouched ? 2 : 1}
                      />
                      <text
                        x={node.x}
                        y={node.y + 18}
                        textAnchor="middle"
                        fill={isTouched ? '#C7D2FE' : '#64748B'}
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-indigo-300">
                Nodes Linked: {connectedNodes.length} / {currentConstellation.nodes.length}
              </div>
            </div>
          </div>

          {/* Meaning & Affirmation Output */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-indigo-900/40 bg-[#0f1426] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentConstellation.symbol}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {currentConstellation.title}
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono">Sacred Form</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentConstellation.meaning}
              </p>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Grounding Truth
                </span>
                <div className={`mt-2 rounded-xl p-4 border transition-all ${
                  constellationCompleted 
                    ? 'border-indigo-500/60 bg-indigo-950/40 text-white shadow-lg shadow-indigo-900/30' 
                    : 'border-slate-800 bg-slate-900/30 text-slate-500'
                }`}>
                  <p className="font-serif text-sm italic leading-relaxed">
                    "{currentConstellation.affirmation}"
                  </p>
                  {constellationCompleted && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Constellation Anchored · Peace Unlocked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Tab 2: Star Breathe --- */}
      {activeTab === 'breathe' && (
        <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-indigo-900/40 bg-[#0b0f1e] p-8 text-center shadow-2xl space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: '478', label: '4-7-8 Relaxing Breath' },
              { id: 'box', label: 'Box Breathing 4-4-4-4' },
              { id: '48', label: '4-8 Vagal Release' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setBreathePattern(p.id as any);
                  setBreathPhase('Inhale');
                  setBreathTimer(4);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  breathePattern === p.id
                    ? 'border-indigo-500 bg-indigo-600 text-white'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="relative mx-auto my-10 flex h-64 w-64 items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-indigo-500/20 blur-xl'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-purple-500/25 blur-2xl'
                  : 'scale-75 bg-sky-500/10 blur-md'
              }`}
            />
            <div
              className={`relative flex h-48 w-48 items-center justify-center rounded-full border border-indigo-400/30 transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-105 bg-indigo-900/50 shadow-2xl shadow-indigo-500/40'
                  : breathPhase === 'Hold'
                  ? 'scale-105 bg-purple-900/60 shadow-2xl shadow-purple-500/50'
                  : 'scale-75 bg-slate-900/80 shadow-md'
              }`}
            >
              <div className="space-y-1">
                <span className="font-display text-2xl font-extrabold text-white">
                  {breathPhase}
                </span>
                <div className="font-mono text-3xl font-bold text-indigo-300">
                  {breathTimer}s
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 border-t border-slate-800 pt-4 text-xs font-mono text-slate-400">
            <div>Completed Waves: <span className="text-white font-bold">{completedCycles}</span></div>
            <div>Acoustic Entrainment: <span className="text-emerald-400 font-bold">Online</span></div>
          </div>
        </div>
      )}

      {/* --- Tab 3: 16-Tile Cosmic Memory --- */}
      {activeTab === 'memory' && (
        <div className="mt-8 mx-auto max-w-4xl rounded-2xl border border-indigo-900/40 bg-[#090c17] p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Mindful Sensory Focus (16 Tiles)
              </h3>
              <p className="text-xs text-slate-400">
                Align the 8 cosmic resilience symbols. Zero timer pressure, clean tactile chimes.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span>Moves: {moves}</span>
              <span>Matched: {matchesCount} / 8</span>
              <button
                onClick={handleResetMemory}
                className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {memoryCards.map((card, idx) => {
              const isRevealed = card.isFlipped || card.isMatched;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${
                    card.isMatched
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-white opacity-80'
                      : isRevealed
                      ? 'border-indigo-500 bg-indigo-950/60 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {isRevealed ? (
                    <div className="space-y-0.5">
                      <span className="text-2xl" style={{ color: card.color }}>
                        {card.icon}
                      </span>
                      <span className="text-[9px] font-mono text-slate-300 line-clamp-1">
                        {card.name}
                      </span>
                    </div>
                  ) : (
                    <Sparkles className="h-4 w-4 text-slate-600" />
                  )}
                </button>
              );
            })}
          </div>

          {matchesCount === 8 && (
            <div className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center">
              <span className="font-display text-base font-bold text-white">
                All 8 Sacred Pairs Aligned!
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Your focus has anchored. Stillness is always accessible.
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Tab 4: The Void Jar (Thought Dissolver) --- */}
      {activeTab === 'dissolver' && (
        <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-indigo-900/40 bg-[#090c17] p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-6">
            <h3 className="font-display text-xl font-bold text-white flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              The Void Jar · Thought Dissolver
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Type the intrusive thought, catastrophe, or grief spinning in your head. 
              Press dissolve to turn it into celestial stardust and let it go.
            </p>
          </div>

          <form onSubmit={handleDissolveThought} className="space-y-4">
            <div className="relative">
              <textarea
                rows={3}
                placeholder="What heavy thought is weighing on your mind right now?..."
                value={voidThought}
                onChange={(e) => setVoidThought(e.target.value)}
                disabled={isDissolving}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all"
              />

              {/* Floating stardust animation particles */}
              {isDissolving && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {dissolvedParticles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute h-2 w-2 rounded-full bg-amber-400 animate-ping"
                      style={{
                        transform: `translate(${p.x}px, ${p.y}px)`,
                        transition: 'transform 1.5s ease-out'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isDissolving || !voidThought.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isDissolving ? 'Dissolving into the Cosmos...' : 'Dissolve Into Stardust'}</span>
            </button>
          </form>

          {affirmationResult && (
            <div className="mt-6 rounded-xl border border-indigo-500/40 bg-indigo-950/40 p-4 text-center">
              <p className="text-xs font-serif text-slate-200 italic">
                "{affirmationResult}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Tab 5: 5-4-3-2-1 Grounding Technique --- */}
      {activeTab === 'grounding' && (
        <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-indigo-900/40 bg-[#090c17] p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-display text-lg font-bold text-white">
              5-4-3-2-1 Sensory Grounding Technique
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Used by trauma therapists and crisis specialists to break acute panic spikes and sensory dissociation. Tap each step as you anchor your physical senses.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { num: '5', label: 'Look around and name 5 distinct things you can SEE', tip: 'e.g. A reflection on glass, grain of wood, a light switch, shadow on the floor, your own hand.' },
              { num: '4', label: 'Acknowledge 4 physical sensations you can TOUCH', tip: 'e.g. The texture of your clothing, cold air on your wrists, firmness of the chair, feet against the floor.' },
              { num: '3', label: 'Listen carefully for 3 subtle sounds you can HEAR', tip: 'e.g. Ambient room hum, distant traffic or wind, your own steady breath.' },
              { num: '2', label: 'Notice 2 aromas or scents you can SMELL', tip: 'e.g. Fresh coffee, laundry detergent, crisp outdoor air, or cold water.' },
              { num: '1', label: 'Focus on 1 sensation you can TASTE or whisper a personal truth', tip: 'e.g. The cool taste of fresh water, or repeating: "I am safe in this room right now."' }
            ].map((step) => {
              const checked = !!groundingChecks[step.num];
              return (
                <div
                  key={step.num}
                  onClick={() => toggleGroundingCheck(step.num)}
                  className={`group cursor-pointer rounded-xl border p-4 transition-all flex items-start gap-4 ${
                    checked
                      ? 'border-indigo-500/60 bg-indigo-950/30'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold ${
                    checked ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {checked ? <Check className="h-4 w-4" /> : step.num}
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${checked ? 'text-white' : 'text-slate-200'}`}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {step.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

