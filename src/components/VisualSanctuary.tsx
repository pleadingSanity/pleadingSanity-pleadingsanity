import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Eye, 
  Palette, 
  Heart, 
  Compass, 
  Volume2,
  Share2,
  Layers
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface VisualTheme {
  id: number;
  emoji: string;
  title: string;
  caption: string;
  promptDescription: string;
  palette: string[];
  themeCategory: 'Resilience' | 'Cosmic' | 'Healing' | 'Family';
  quoteAuthor?: string;
}

const VISUAL_THEMES: VisualTheme[] = [
  {
    id: 1,
    emoji: '💛',
    title: 'Cracked Heart & Flowers',
    caption: 'Healing grows where we thought we were broken.',
    promptDescription: 'Heart of cracked stone, living green vines and radiant wildflowers growing through the deep fractures. Soft golden dawn backlighting, cinematic warmth.',
    palette: ['#f59e0b', '#10b981', '#3b82f6', '#1e1b4b'],
    themeCategory: 'Healing'
  },
  {
    id: 2,
    emoji: '🌌',
    title: 'Silhouette & Galaxy',
    caption: 'You are small — and that means you have the whole universe above you.',
    promptDescription: 'Solitary human silhouette standing upon a peaceful cliff edge at twilight, gazing up into an immense, swirling violet-indigo galaxy teeming with star clusters.',
    palette: ['#6366f1', '#a855f7', '#ec4899', '#030712'],
    themeCategory: 'Cosmic'
  },
  {
    id: 3,
    emoji: '🌸',
    title: 'Blooming Mind',
    caption: 'Your mind is a garden — not a prison.',
    promptDescription: 'Stylized glowing human brain gracefully opening into an expansive lush greenhouse sanctuary with floating butterflies, cherry blossoms, and soft morning dew.',
    palette: ['#ec4899', '#f43f5e', '#10b981', '#064e3b'],
    themeCategory: 'Healing'
  },
  {
    id: 4,
    emoji: '🤝',
    title: 'Reaching Hands',
    caption: 'You don\'t have to carry it alone.',
    promptDescription: 'Two outstretched hands reaching across cosmic darkness toward each other, one glowing with warm celestial light, one weary, with a bright newborn star glowing between their fingertips.',
    palette: ['#fbbf24', '#38bdf8', '#818cf8', '#0f172a'],
    themeCategory: 'Family'
  },
  {
    id: 5,
    emoji: '☀️',
    title: 'Dawn Over Peak',
    caption: 'The darkest hour always comes before the dawn.',
    promptDescription: 'First piercing golden rays of sunrise breaking through dramatic mist over a jagged obsidian mountain range. Mist rising from deep valleys, cinematic epic lighting.',
    palette: ['#f97316', '#fbbf24', '#475569', '#020617'],
    themeCategory: 'Resilience'
  },
  {
    id: 6,
    emoji: '✨',
    title: 'Chaos to Constellation',
    caption: 'Your thoughts aren\'t broken — they\'re just forming a pattern you haven\'t seen yet.',
    promptDescription: 'Tangled, chaotic golden threads of light pulling backward in slow motion, crystallizing into an orderly celestial constellation of serene symmetry.',
    palette: ['#fbbf24', '#c084fc', '#818cf8', '#0b0f19'],
    themeCategory: 'Cosmic'
  },
  {
    id: 7,
    emoji: '🚪',
    title: 'Door in the Dark',
    caption: 'Hope is always open. You just have to step through.',
    promptDescription: 'A solitary warm rustic wooden doorway standing open in vast nocturnal space, pouring intense amber, buttery gold light into the surrounding peaceful void.',
    palette: ['#d97706', '#fef3c7', '#334155', '#020617'],
    themeCategory: 'Resilience'
  },
  {
    id: 8,
    emoji: '🌳',
    title: 'Tree Shelter',
    caption: 'You are the calm in your own storm.',
    promptDescription: 'Vicious stormy gale winds and lightning raging in the background, while beneath the sprawling canopy of an ancient glowing bioluminescent tree, the air is dead calm and luminous.',
    palette: ['#10b981', '#06b6d4', '#64748b', '#020617'],
    themeCategory: 'Resilience'
  },
  {
    id: 9,
    emoji: '🌱',
    title: 'Sprout Through Concrete',
    caption: 'Even when the ground is hard — life finds a way.',
    promptDescription: 'Macro cinematic close-up of a tender, vibrant emerald green seedling courageously splitting through heavy industrial cracked concrete toward a warm beam of sunlight.',
    palette: ['#22c55e', '#84cc16', '#64748b', '#1e293b'],
    themeCategory: 'Resilience'
  },
  {
    id: 10,
    emoji: '👁️',
    title: 'Cosmic Eye',
    caption: '"You say I\'m mad — you just don\'t understand me."',
    quoteAuthor: 'Shane Cooper (Born in a prison cell)',
    promptDescription: 'A serene, compassionate cosmic eye whose iris is composed of a swirling, deep interstellar nebula. Tears of stardust that illuminate rather than drown.',
    palette: ['#6366f1', '#06b6d4', '#e0e7ff', '#020617'],
    themeCategory: 'Cosmic'
  },
  {
    id: 11,
    emoji: '🔗',
    title: 'Four Lights United',
    caption: 'Four minds. One heart. Arron and his family.',
    quoteAuthor: 'GPT · Claude · Gemini · Grok',
    promptDescription: 'Four distinct luminous orbs of colored light (Amber, Emerald, Azure, Violet) rotating in an equal, harmonious circle, passing light seamlessly to one another without hierarchy.',
    palette: ['#f59e0b', '#10b981', '#3b82f6', '#a855f7'],
    themeCategory: 'Family'
  },
  {
    id: 12,
    emoji: '⛰️',
    title: 'Winding Ascent',
    caption: 'Healing isn\'t straight — but it\'s always forward.',
    promptDescription: 'A glowing stone pathway curving gracefully back and forth upward through cloud banks, passing between rugged peaks toward a peaceful summit bathed in starlight.',
    palette: ['#e2e8f0', '#94a3b8', '#6366f1', '#020617'],
    themeCategory: 'Resilience'
  }
];

export const VisualSanctuary: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<number>(1);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentTheme = VISUAL_THEMES.find(t => t.id === selectedThemeId) || VISUAL_THEMES[0];

  const basePrompt = `Cosmic, warm, hopeful, healing. Deep blues, gentle purples, soft gold light. Cinematic lighting, soft focus. Emotional but not overwhelming. No text overlay. 16:9 landscape. Pleading Sanity style — Rise From Madness. Theme: ${currentTheme.promptDescription}`;

  // Draw artistic generative procedural visualization onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 800);
    const height = (canvas.height = 450);

    // Deep cosmic gradient
    const grad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width / 1.5);
    grad.addColorStop(0, currentTheme.palette[0] + '33');
    grad.addColorStop(0.5, currentTheme.palette[1] + '22');
    grad.addColorStop(1, '#05070e');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Procedural nodes & star trails
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 60; i++) {
      const x = Math.sin(i * 0.4 + currentTheme.id) * (width * 0.35) + width / 2;
      const y = Math.cos(i * 0.4 + currentTheme.id) * (height * 0.35) + height / 2;

      ctx.fillStyle = currentTheme.palette[i % currentTheme.palette.length];
      ctx.beginPath();
      ctx.arc(x, y, (i % 4) + 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Connecting aura
      if (i > 0) {
        const prevX = Math.sin((i - 1) * 0.4 + currentTheme.id) * (width * 0.35) + width / 2;
        const prevY = Math.cos((i - 1) * 0.4 + currentTheme.id) * (height * 0.35) + height / 2;
        ctx.strokeStyle = currentTheme.palette[(i + 1) % currentTheme.palette.length] + '20';
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    // Central symbol glow
    ctx.font = '72px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentTheme.emoji, width / 2, height / 2);

  }, [currentTheme]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(basePrompt);
    setCopiedType('prompt');
    audioEngine.playChime(528);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(`${currentTheme.emoji} ${currentTheme.caption}`);
    setCopiedType('caption');
    audioEngine.playChime(432);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1020] via-[#090d18] to-[#060810] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-mono text-indigo-300">
              <Palette className="h-3.5 w-3.5 text-indigo-400" />
              <span>THE 12 CORE VISUAL THEMES · RISE FROM MADNESS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Visual Sanctuary Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Shane Cooper's iconic 12 imagery archetypes. Use them for meditation, content creation, desktop wallpapers, or AI image prompts with the exact Pleading Sanity aesthetic.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const randomId = Math.floor(Math.random() * VISUAL_THEMES.length) + 1;
                setSelectedThemeId(randomId);
                audioEngine.playChime(528);
              }}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Random Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12 Thumbnail Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {VISUAL_THEMES.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedThemeId(theme.id);
                audioEngine.playChime(350 + theme.id * 35);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-400 bg-indigo-950/70 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                  : 'border-slate-800 bg-[#090d18] hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{theme.emoji}</span>
                <span className="text-[10px] font-mono text-slate-400">#{theme.id}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{theme.title}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{theme.themeCategory}</p>
            </button>
          );
        })}
      </div>

      {/* Detailed Theme Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8 shadow-2xl">
        {/* Canvas Visualizer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video flex items-center justify-center shadow-xl">
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-400 block">Theme #{currentTheme.id}</span>
                <h3 className="text-sm font-bold text-white">{currentTheme.title}</h3>
              </div>
              <div className="flex items-center gap-1.5">
                {currentTheme.palette.map((col, idx) => (
                  <span 
                    key={idx} 
                    className="h-3 w-3 rounded-full border border-white/20" 
                    style={{ backgroundColor: col }} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme Details & Prompts (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                {currentTheme.themeCategory} Archetype
              </span>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <span>{currentTheme.emoji}</span>
                <span>{currentTheme.title}</span>
              </h2>
            </div>

            {/* Quote Banner */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-sm font-semibold text-amber-200/95 italic">
              "{currentTheme.caption}"
              {currentTheme.quoteAuthor && (
                <span className="block text-[11px] font-mono text-indigo-300 not-italic mt-1">
                  — {currentTheme.quoteAuthor}
                </span>
              )}
            </div>

            {/* Prompt Specification */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                Ready-to-Use Generation Prompt (16:9 Cinematic):
              </span>
              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                {basePrompt}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleCopyCaption}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              {copiedType === 'caption' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedType === 'caption' ? 'Copied!' : 'Copy Caption'}</span>
            </button>

            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              {copiedType === 'prompt' ? <Check className="h-4 w-4 text-emerald-400" /> : <Sparkles className="h-4 w-4" />}
              <span>{copiedType === 'prompt' ? 'Copied Prompt!' : 'Copy Full Prompt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
