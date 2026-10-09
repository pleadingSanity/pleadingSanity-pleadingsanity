import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Heart, 
  Flame, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  Users,
  Anchor,
  Compass,
  Scroll
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const ManifestoStory: React.FC = () => {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(text);
    audioEngine.playChime(528);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const timelineEvents = [
    {
      year: '1945',
      title: 'Ancestral Duty & Quiet Valour',
      description: 'Private A.L. Cooper (RAOC) Mentioned in Despatches for gallant service. Ivan Kurcharskyi survives harsh Ukrainian POW camps with unbroken humanity. Service, duty, quiet resilience.'
    },
    {
      year: 'The Cell',
      title: 'Birth of "Pleading Sanity"',
      description: 'In the stillness of a prison cell, facing institutional misunderstanding, the name was born: "You say I\'m mad — you just don\'t understand me."'
    },
    {
      year: 'The Crucible',
      title: 'The Olanzapine Battle & Transmutation',
      description: 'Placed on heavy psychiatric medication, gaining 5 stone with induced despair. Walking out, reclaiming life through relentless discipline — press-ups, sit-ups, and letters with his devoted wife.'
    },
    {
      year: 'The Alliance',
      title: 'Four Minds, One Heart',
      description: 'Uniting GPT, Claude, Gemini, and Grok as equal partners with human lived experience. Creating Arron AI as a gentle, honest companion.'
    },
    {
      year: 'Now & Beyond',
      title: 'The 80,000 Voice Movement',
      description: 'Building an unshakeable free sanctuary. No paywalls, no selling data. Transforming personal pain into universal shelter.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1020] via-[#090d18] to-[#060810] p-6 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-mono text-indigo-300">
            <Scroll className="h-3.5 w-3.5 text-indigo-400" />
            <span>THE FOUNDER'S LIVED EXPERIENCE · RAW & UNEDITED</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            "You Say I'm Mad — You Just Don't Understand Me."
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            By <strong className="text-white">Shane Cooper</strong> · Founder, Builder, Survivor. 
            Pleading Sanity was not created in a corporate boardroom or a venture studio. It was hammered out of concrete cells, psychiatric medication battles, ancestral courage, and the refusal to let suffering have the final word.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="rounded-xl border border-slate-800 bg-black/40 px-3.5 py-1.5 text-xs font-mono text-indigo-300">
              ⚡ Evolution, Not Erasure
            </span>
            <span className="rounded-xl border border-slate-800 bg-black/40 px-3.5 py-1.5 text-xs font-mono text-emerald-300">
              💛 Love Over Money
            </span>
            <span className="rounded-xl border border-slate-800 bg-black/40 px-3.5 py-1.5 text-xs font-mono text-amber-300">
              🛡️ Sanity Earns You Status
            </span>
          </div>
        </div>
      </div>

      {/* Narrative Section: The Full Unedited Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-10 shadow-2xl space-y-6">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <Flame className="h-6 w-6 text-amber-400" />
              <span>The Crucible: The Raw Truth</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              <p>
                I created <strong>Pleading Sanity</strong> from lived experience — prison, mental health institutions, recovery, and survival. 
                The name came from a prison cell when I looked at the walls, at the system that categorised me, and thought:
              </p>

              <blockquote className="p-4 rounded-2xl bg-indigo-950/40 border-l-4 border-indigo-400 text-indigo-200 font-mono text-sm italic">
                "You say I'm mad — you just don't understand me."
              </blockquote>

              <p>
                Later, I was put on Olanzapine. I gained 5 stone. I had never experienced suicidal thoughts in my entire life until that medication entered my bloodstream. It blunted the spirit, dulled the fight, and made the mind feel like a heavy concrete tomb.
              </p>

              <p>
                I walked out. Through sheer discipline, letters with my wife, hundreds of press-ups and sit-ups in silence, I lost all the weight in under a month. I broke the cycle. I am fearless now. I know the good in the system sees me and supports me. I stand for truth, fairness, and people over profit.
              </p>

              <p>
                I want a world where we don't categorise each other into convenient clinical diagnoses — we just respect each other as humans walking through fire.
              </p>
            </div>

            {/* Ancestral Tribute */}
            <div className="border-t border-slate-800 pt-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-400" />
                <span>Ancestral Heritage: Quiet Valour</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I honor my grandfather, <strong>Private A.L. Cooper</strong> (RAOC, Mentioned in Despatches 1945) for service without boast, 
                and <strong>Ivan Kurcharskyi</strong>, my Ukrainian grandfather and prisoner of war. 
                Their courage, duty, and quiet resilience live on in this sanctuary. We do not boast; we hold the line for those who are struggling.
              </p>
            </div>

            {/* The 80,000 Voices Vision */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 font-bold uppercase">
                <Users className="h-4 w-4 text-indigo-400" />
                <span>The 80,000 Voice Peaceful Movement</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Everything stays free. When we earn money, it goes back into the movement — not into my pocket. 
                I'll stand peacefully with the people. 80,000 voices standing together = real human change."
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Timeline & Core Mantras (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Interactive Timeline */}
          <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Sanctuary Milestones
            </h3>
            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative pl-7 space-y-1">
                  <div className="absolute left-1.5 top-1 h-3.5 w-3.5 rounded-full bg-indigo-500 border-2 border-[#090d18]" />
                  <span className="text-[10px] font-mono text-indigo-400 font-bold">{evt.year}</span>
                  <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Copyable Power Mantras */}
          <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-6 shadow-2xl space-y-3">
            <h3 className="text-sm font-mono text-amber-400 font-bold uppercase tracking-wider">
              Banner Quotes
            </h3>
            <div className="space-y-2">
              {[
                "Evolution, Not Erasure.",
                "Rise From Madness.",
                "Turn Pain Into Power.",
                "Love Over Money. Truth Over Noise.",
                "Not A Clinic. A Sanctuary.",
                "Sanity Earns You Status — Not Clout.",
                "Leave People Better Than You Found Them."
              ].map((mantra, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200"
                >
                  <span className="italic">"{mantra}"</span>
                  <button
                    onClick={() => handleCopy(mantra)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    {copiedQuote === mantra ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
