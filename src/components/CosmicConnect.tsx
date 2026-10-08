import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Compass, 
  Wind, 
  Brain, 
  Eye, 
  Check, 
  CheckCircle2, 
  Star,
  Flame,
  Volume2
} from 'lucide-react';
import { CONSTELLATIONS } from '../data/mockData';
import { Constellation, MemoryCard } from '../types';
import { audioEngine } from '../utils/audioEngine';

export const CosmicConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constellation' | 'breathe' | 'memory' | 'grounding'>('constellation');

  // --- Constellation Drawing State ---
  const [activeConstellationIndex, setActiveConstellationIndex] = useState(0);
  const currentConstellation = CONSTELLATIONS[activeConstellationIndex];
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);
  const [constellationCompleted, setConstellationCompleted] = useState(false);

  const handleNodeClick = (nodeId: number) => {
    if (constellationCompleted) return;

    if (!connectedNodes.includes(nodeId)) {
      const next = [...connectedNodes, nodeId];
      setConnectedNodes(next);
      audioEngine.playChime(300 + nodeId * 60);

      // Check if all nodes touched
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
    setActiveConstellationIndex((prev) => (prev + 1) % CONSTELLATIONS.length);
    setConnectedNodes([]);
    setConstellationCompleted(false);
  };

  // --- Star Breathe State ---
  const [breathePattern, setBreathePattern] = useState<'478' | 'box'>('478');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isBreatheActive, setIsBreatheActive] = useState(true);

  useEffect(() => {
    if (!isBreatheActive) return;

    let timerId: number;
    // Phases timings
    // 4-7-8: Inhale 4, Hold 7, Exhale 8
    // Box: Inhale 4, Hold 4, Exhale 4, Pause 4

    const tick = () => {
      setBreathTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
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
        } else {
          // Box Breathing
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
        }
      });
    };

    timerId = window.setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [isBreatheActive, breathPhase, breathePattern]);

  // --- Cosmic Memory Game State ---
  const initialSymbols = [
    { symbolId: 'sigil', name: 'Celestial Sigil', icon: '✦', color: '#818CF8' },
    { symbolId: 'wave', name: 'Solfeggio Wave', icon: '〰', color: '#38BDF8' },
    { symbolId: 'phoenix', name: 'Phoenix Fire', icon: '❖', color: '#F43F5E' },
    { symbolId: 'anchor', name: 'Sanity Anchor', icon: '⚓', color: '#34D399' },
    { symbolId: 'moon', name: 'Crescent Peace', icon: '☽', color: '#A78BFA' },
    { symbolId: 'lotus', name: 'Rebirth Lotus', icon: '❀', color: '#FBBF24' }
  ];

  const createShuffledDeck = (): MemoryCard[] => {
    const deck: MemoryCard[] = [];
    let idCounter = 1;

    [...initialSymbols, ...initialSymbols].forEach((item) => {
      deck.push({
        id: idCounter++,
        symbolId: item.symbolId,
        name: item.name,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false
      });
    });

    return deck.sort(() => Math.random() - 0.5);
  };

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(createShuffledDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) {
      return;
    }

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);
    audioEngine.playChime(350 + index * 25);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].symbolId === newCards[secondIdx].symbolId) {
        // Matched!
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setMemoryCards(matchedCards);
          setFlippedIndices([]);
          setMatchesCount((c) => c + 1);
          audioEngine.playChime(528);
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setMemoryCards(resetCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleResetMemory = () => {
    setMemoryCards(createShuffledDeck());
    setFlippedIndices([]);
    setMoves(0);
    setMatchesCount(0);
  };

  // --- 5-4-3-2-1 Sensory Grounding State ---
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
            <span>HUMAN SANITY HUB · INTERACTIVE CALMNESS</span>
            <span aria-hidden="true">·</span>
            <span>COSMIC CONNECT</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Cosmic Connect
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Gentle interactive mindfulness tools designed to quiet racing thoughts, activate the parasympathetic nervous system, and return your awareness safely to the physical present.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto overflow-x-auto">
          {[
            { id: 'constellation', label: 'Draw Constellation', icon: Sparkles },
            { id: 'breathe', label: 'Star Breathe', icon: Wind },
            { id: 'memory', label: 'Cosmic Memory', icon: Brain },
            { id: 'grounding', label: '5-4-3-2-1 Grounding', icon: Eye }
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
            {/* Ambient Nebula back-glow */}
            <div className="absolute inset-0 bg-radial from-indigo-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 border-b border-slate-800/80 pb-3">
              <div>
                <span className="font-mono text-indigo-400 uppercase">
                  {currentConstellation.title}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click the pulsing stars to trace the sacred celestial lines
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
                  Next Star Form
                </button>
              </div>
            </div>

            {/* Interactive Star Canvas SVG */}
            <div className="relative mx-auto w-full max-w-[420px] aspect-square rounded-xl bg-black/60 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="h-full w-full">
                {/* Drawn Connections */}
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
                      className="transition-all duration-500"
                    />
                  );
                })}

                {/* Star Nodes */}
                {currentConstellation.nodes.map((node) => {
                  const isTouched = connectedNodes.includes(node.id);
                  return (
                    <g key={node.id} className="cursor-pointer" onClick={() => handleNodeClick(node.id)}>
                      {/* Glow halo */}
                      {isTouched && (
                        <circle
                          cx={node.x}
                          y={node.y}
                          r={14}
                          fill="rgba(129, 140, 248, 0.25)"
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

              {/* Progress counter pill */}
              <div className="absolute bottom-3 left-3 rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-indigo-300">
                Nodes Connected: {connectedNodes.length} / {currentConstellation.nodes.length}
              </div>
            </div>
          </div>

          {/* Constellation Meaning & Affirmation Output */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-[#0f1426] to-[#090c17] p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{currentConstellation.symbol}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {currentConstellation.title}
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono">Celestial Anchor</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentConstellation.meaning}
              </p>

              {/* Revealed Affirmation */}
              <div className="mt-6 border-t border-slate-800 pt-4">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Sacred Grounding Affirmation
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
                      <span>Constellation Anchored · Breath Released</span>
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
        <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-[#0b0f1e] to-[#070912] p-8 text-center shadow-2xl">
          {/* Pattern Selector */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => {
                setBreathePattern('478');
                setBreathPhase('Inhale');
                setBreathTimer(4);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                breathePattern === '478'
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              4-7-8 Relaxing Breath (Nervous Reset)
            </button>
            <button
              onClick={() => {
                setBreathePattern('box');
                setBreathPhase('Inhale');
                setBreathTimer(4);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                breathePattern === 'box'
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Box Breathing 4-4-4-4 (High Focus)
            </button>
          </div>

          {/* Animated Celestial Breathing Sphere */}
          <div className="relative mx-auto my-10 flex h-64 w-64 items-center justify-center">
            {/* Outer rhythmic pulsing glow */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-indigo-500/20 blur-xl'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-purple-500/25 blur-2xl'
                  : 'scale-75 bg-sky-500/10 blur-md'
              }`}
            />

            {/* Core expanding sphere */}
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

          {/* Prompt description */}
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {breathPhase === 'Inhale' && 'Slowly breathe in deeply through your nose, expanding your belly.'}
            {breathPhase === 'Hold' && 'Hold gently without straining. Allow the oxygen to nourish every cell.'}
            {breathPhase === 'Exhale' && 'Release slowly with a gentle whoosh through your parted lips.'}
            {breathPhase === 'Pause' && 'Rest quietly in empty stillness before the next wave.'}
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 border-t border-slate-800 pt-6 text-xs font-mono text-slate-400">
            <div>Completed Waves: <span className="text-white font-bold">{completedCycles}</span></div>
            <div>Auditory Chimes: <span className="text-emerald-400 font-bold">Active</span></div>
          </div>
        </div>
      )}

      {/* --- Tab 3: Cosmic Memory Match --- */}
      {activeTab === 'memory' && (
        <div className="mt-8 mx-auto max-w-4xl rounded-2xl border border-indigo-900/40 bg-[#090c17] p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Mindful Memory Alignment
              </h3>
              <p className="text-xs text-slate-400">
                Gentle card matching to pull mental fog into clear sensory focus. Zero timers, zero pressure.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span>Moves: {moves}</span>
              <span>Matched: {matchesCount} / 6</span>
              <button
                onClick={handleResetMemory}
                className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
                      : 'border-slate-800 bg-slate-900/70 text-slate-500 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {isRevealed ? (
                    <div className="space-y-1">
                      <span className="text-2xl" style={{ color: card.color }}>
                        {card.icon}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 line-clamp-1">
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

          {matchesCount === 6 && (
            <div className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center">
              <span className="font-display text-base font-bold text-white">
                All Celestial Pairs Aligned!
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Notice how your focus narrowed and settled into the task. Take this stillness with you.
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- Tab 4: 5-4-3-2-1 Grounding Technique --- */}
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
