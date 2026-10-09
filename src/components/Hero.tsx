import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Radio, 
  ShoppingBag, 
  Compass, 
  Zap, 
  Anchor, 
  Flame, 
  Wind,
  Gamepad2,
  BookOpen,
  Scroll,
  Palette,
  Bot
} from 'lucide-react';
import { hoodieImg, teeImg, nebulaImg } from '../data/mockData';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenFrequency: (hz: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenFrequency }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Starfield particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = 600;
    };
    window.addEventListener('resize', handleResize);

    const stars: { x: number; y: number; r: number; alpha: number; speed: number; pulse: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        pulse: Math.random() * Math.PI
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry nodes
      stars.forEach((star) => {
        star.pulse += star.speed;
        const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.pulse));

        ctx.fillStyle = `rgba(224, 231, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle celestial constellation lines between nearby stars
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const moodRecommendations = {
    anxious: {
      title: 'High Voltage / Racing Static',
      recommendation: '432 Hz Verdi Equilibrium & 4-7-8 Star Breathing',
      description: 'Your nervous system is running too high. Ground the pulse and let your breath anchor the tempest.',
      actionLabel: 'Launch 432 Hz Resonance',
      actionTab: 'healing',
      actionHz: 432
    },
    heavy: {
      title: 'Severe Heaviness & Soul Exhaustion',
      recommendation: '174 Hz Anesthetic Grounding & Heavyweight Sanctuary Fleece',
      description: 'You do not have to carry the whole sky alone today. Rest the body in heavy tactile safety.',
      actionLabel: 'Tune to 174 Hz Foundation',
      actionTab: 'healing',
      actionHz: 174
    },
    numb: {
      title: 'Dissociation / Feeling Untethered',
      recommendation: '528 Hz Miracle Tone & Cosmic Connect Constellations',
      description: 'Gentle tactile interaction to tether the conscious mind back into physical reality.',
      actionLabel: 'Open Constellation Drawing',
      actionTab: 'connect',
      actionHz: 528
    },
    seeking: {
      title: 'Seeking Strength & Purpose',
      recommendation: 'Streetwear Armor & Stories from the Abyss',
      description: 'Transform what tried to kill you into armour that empowers someone else.',
      actionLabel: 'Explore Streetwear Drops',
      actionTab: 'shop',
      actionHz: null
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#07090e]">
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Radiant Cosmic Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-indigo-900/20 via-purple-900/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-80 right-0 h-96 w-96 rounded-full bg-cyan-900/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:pt-20 lg:pb-28">
        {/* Top Editorial Kicker */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 mb-6">
          <span className="font-mono text-indigo-400">WWW.PLEADINGSANITY.CO.UK</span>
          <span aria-hidden="true">·</span>
          <span>EST. UK</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300">EVOLUTION, NOT ERASURE</span>
        </div>

        {/* Primary Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            RISE FROM <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">MADNESS</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            A mental health revolution disguised as a streetwear brand, a digital sanctuary, and a global movement. 
            Transforming pain into power and madness into meaning.
          </p>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('arcade')}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all"
            >
              <Gamepad2 className="h-4 w-4 text-indigo-200" />
              <span>The 12 Sanctuary Games</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('bible')}
              className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-950/40 px-5 py-3 text-xs font-bold text-amber-200 hover:bg-amber-900/40 transition-all"
            >
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span>The New Gen Bible</span>
            </button>

            <button
              onClick={() => onNavigate('story')}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition-all"
            >
              <Scroll className="h-4 w-4 text-indigo-400" />
              <span>Shane's Story</span>
            </button>

            <button
              onClick={() => onNavigate('visuals')}
              className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/30 px-4 py-3 text-xs font-bold text-purple-200 hover:bg-purple-900/30 transition-all"
            >
              <Palette className="h-4 w-4 text-purple-400" />
              <span>12 Visuals</span>
            </button>

            <button
              onClick={() => onNavigate('arron')}
              className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-xs font-bold text-emerald-200 hover:bg-emerald-900/30 transition-all"
            >
              <Bot className="h-4 w-4 text-emerald-400" />
              <span>Arron AI & GPT</span>
            </button>

            <button
              onClick={() => onNavigate('healing')}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-slate-900 transition-all"
            >
              <Radio className="h-4 w-4 text-cyan-400" />
              <span>Healing Hz</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-slate-900 transition-all"
            >
              <ShoppingBag className="h-4 w-4 text-slate-400" />
              <span>Streetwear</span>
            </button>
          </div>
        </div>

        {/* Interactive Celestial Grounding Compass */}
        <div className="mt-16 mx-auto max-w-3xl rounded-xl border border-indigo-900/40 bg-[#0e1322]/80 p-6 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Daily Celestial Compass
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                How heavy does your sky feel right now? Select your pulse for immediate alignment:
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-400">Zero Judgment Sanctuary</span>
          </div>

          {/* Mood Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
            <button
              onClick={() => setSelectedMood('anxious')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                selectedMood === 'anxious'
                  ? 'border-indigo-500 bg-indigo-950/60 text-white ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Zap className="h-5 w-5 mb-1.5 text-amber-400" />
              <span className="text-xs font-semibold">Electric / Racing</span>
              <span className="text-[10px] text-slate-500">Sensory static</span>
            </button>

            <button
              onClick={() => setSelectedMood('heavy')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                selectedMood === 'heavy'
                  ? 'border-indigo-500 bg-indigo-950/60 text-white ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Anchor className="h-5 w-5 mb-1.5 text-rose-400" />
              <span className="text-xs font-semibold">Heavy / Exhausted</span>
              <span className="text-[10px] text-slate-500">Crushing gravity</span>
            </button>

            <button
              onClick={() => setSelectedMood('numb')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                selectedMood === 'numb'
                  ? 'border-indigo-500 bg-indigo-950/60 text-white ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Wind className="h-5 w-5 mb-1.5 text-cyan-400" />
              <span className="text-xs font-semibold">Numb / Detached</span>
              <span className="text-[10px] text-slate-500">Dissociation</span>
            </button>

            <button
              onClick={() => setSelectedMood('seeking')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                selectedMood === 'seeking'
                  ? 'border-indigo-500 bg-indigo-950/60 text-white ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Flame className="h-5 w-5 mb-1.5 text-emerald-400" />
              <span className="text-xs font-semibold">Seeking Fire</span>
              <span className="text-[10px] text-slate-500">Reclaiming drive</span>
            </button>
          </div>

          {/* Dynamic Recommendation Panel */}
          {selectedMood && (
            <div className="mt-4 rounded-lg bg-indigo-950/30 border border-indigo-500/30 p-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                    Recommended Pathway
                  </span>
                  <h3 className="font-display text-sm font-semibold text-white">
                    {moodRecommendations[selectedMood as keyof typeof moodRecommendations].recommendation}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    {moodRecommendations[selectedMood as keyof typeof moodRecommendations].description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const rec = moodRecommendations[selectedMood as keyof typeof moodRecommendations];
                    if (rec.actionHz) {
                      onOpenFrequency(rec.actionHz);
                    } else {
                      onNavigate(rec.actionTab);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-indigo-500 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-400 transition-colors whitespace-nowrap"
                >
                  <span>{moodRecommendations[selectedMood as keyof typeof moodRecommendations].actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Featured Visual Spotlight (Lookbook preview & Cosmic Sigil) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Streetwear Highlight 1 */}
          <div 
            onClick={() => onNavigate('shop')}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-indigo-500/50 hover:bg-slate-900/90"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-black">
              <img
                src={hoodieImg}
                alt="Rise From Madness Heavyweight Hoodie"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-400 font-mono">450 GSM FRENCH TERRY</p>
                <h4 className="font-display text-sm font-bold text-white">Rise From Madness Hoodie</h4>
              </div>
              <span className="font-mono text-sm font-bold text-slate-200">£85</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>£8.50 donated to youth crisis care</span>
            </div>
          </div>

          {/* Cosmic Healing Hz Gateway */}
          <div 
            onClick={() => onNavigate('healing')}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900/60 p-5 transition-all hover:border-indigo-400"
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black mb-3">
              <img
                src={nebulaImg}
                alt="Cosmic Resonance Hub"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="text-xs text-indigo-400 font-mono">SACRED SOUND THERAPY</p>
            <h4 className="font-display text-base font-bold text-white mt-1">10 Solfeggio Healing Waves</h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Synthesized pure frequency wave generator with binaural theta entrainment and natural ambient layers.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-300 group-hover:text-indigo-200">
              <span>Activate Audio Sanctuary</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Streetwear Highlight 2 */}
          <div 
            onClick={() => onNavigate('shop')}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-indigo-500/50 hover:bg-slate-900/90"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-black">
              <img
                src={teeImg}
                alt="Evolution, Not Erasure Vintage Tee"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-400 font-mono">280 GSM MINERAL WASH</p>
                <h4 className="font-display text-sm font-bold text-white">Evolution, Not Erasure Tee</h4>
              </div>
              <span className="font-mono text-sm font-bold text-slate-200">£42</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>£4.20 donated to youth crisis care</span>
            </div>
          </div>
        </div>

        {/* Mission Adjacency Proof Bar */}
        <div className="mt-16 border-t border-slate-800/80 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-white font-mono">10%</div>
            <div className="text-xs text-slate-400 mt-0.5">Direct Grassroots Pledge</div>
            <div className="text-[11px] text-slate-500">To UK mental health charities</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white font-mono">10 Hz</div>
            <div className="text-xs text-slate-400 mt-0.5">Solfeggio Sound Library</div>
            <div className="text-[11px] text-slate-500">Scientific calming frequencies</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Organic Certified Cotton</div>
            <div className="text-[11px] text-slate-500">450 GSM heavyweight sanctuary</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white font-mono">24/7</div>
            <div className="text-xs text-slate-400 mt-0.5">Zero-Gate Crisis Links</div>
            <div className="text-[11px] text-slate-500">Samaritans & Shout UK verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};
