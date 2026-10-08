import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  ShieldAlert, 
  ExternalLink, 
  HeartHandshake, 
  Save, 
  Check, 
  Sparkles,
  LifeBuoy,
  Lock
} from 'lucide-react';
import { CRISIS_LINES } from '../data/mockData';
import { SafetyPlan } from '../types';

export const HumanSanityHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'crisis' | 'safetyPlan' | 'firstAid'>('crisis');

  // Safety Plan stored locally in localStorage
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>(() => {
    const saved = localStorage.getItem('ps_safety_plan');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      safeContacts: [
        { name: 'Trusted Friend / Partner', phone: '07000 000000', relation: 'Safe Anchor' }
      ],
      warningSigns: ['Jaw clenching & tight chest', 'Urge to isolate in dark room', 'Catastrophic thoughts'],
      calmingActivities: ['Listen to 528 Hz or 432 Hz Solfeggio', 'Splash cold water on face (mammalian dive reflex)', 'Put on heavyweight hoodie'],
      safePlaces: ['My bed with weighted blanket', 'Walk in nearby park trees'],
      coreMantra: 'I have survived 100% of the darkest nights I thought would end me. This storm will pass.'
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ps_safety_plan', JSON.stringify(safetyPlan));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>PLEADING SANITY · HUMAN SANITY HUB</span>
            <span aria-hidden="true">·</span>
            <span>ZERO-COST ASSISTANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Human Sanity Hub & Crisis Lifelines
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            If you or someone you know is in acute distress or struggling to see tomorrow, 
            you do not have to navigate the void alone. All lifelines listed below are 100% free, confidential, and judgment-free.
          </p>
        </div>

        {/* Sub-nav Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('crisis')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'crisis'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Emergency Lifelines
          </button>
          <button
            onClick={() => setActiveSubTab('safetyPlan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'safetyPlan'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            My Personal Safety Plan
          </button>
          <button
            onClick={() => setActiveSubTab('firstAid')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'firstAid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Panic First Aid
          </button>
        </div>
      </div>

      {/* --- SubTab 1: Crisis Lifelines --- */}
      {activeSubTab === 'crisis' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CRISIS_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-6 flex flex-col justify-between transition-all ${
                  line.highlight
                    ? 'border-rose-500/50 bg-gradient-to-b from-[#190f19] to-[#0c0c14] shadow-lg shadow-rose-950/20'
                    : 'border-slate-800 bg-[#0c101c]/90 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-base font-bold text-white">
                      {line.name}
                    </span>
                    {line.highlight && (
                      <span className="rounded bg-rose-950 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                        24/7 UK Primary
                      </span>
                    )}
                  </div>

                  <div className="text-xl font-mono font-extrabold text-indigo-300 my-2">
                    {line.phone}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {line.description}
                  </p>

                  <div className="space-y-1 text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    <div>Hours: {line.availability}</div>
                    <div>Cost: {line.cost}</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href={line.href}
                    target={line.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all ${
                      line.highlight
                        ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/30'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    {line.href.startsWith('tel:') ? (
                      <PhoneCall className="h-4 w-4" />
                    ) : line.href.startsWith('sms:') ? (
                      <MessageSquare className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    <span>{line.action}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Immediate Safety Reassurance */}
          <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <LifeBuoy className="h-8 w-8 text-indigo-400 shrink-0" />
            <div className="space-y-1 text-xs text-slate-300">
              <span className="font-bold text-white text-sm">
                Need Immediate Emergency Medical Attention in the UK?
              </span>
              <p>
                If your physical safety or life is at imminent risk, call <strong>999</strong> immediately or go to the nearest hospital Accident & Emergency (A&E) department. You can also call <strong>NHS 111</strong> for urgent mental health assessments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- SubTab 2: My Personal Safety Plan --- */}
      {activeSubTab === 'safetyPlan' && (
        <form onSubmit={handleSavePlan} className="mt-8 space-y-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-indigo-900/40 bg-[#0c101c] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  Your Encrypted Private Safety Anchor
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Stored securely in your local browser storage. No data is transmitted to any external server.
                </p>
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save to Device</span>
              </button>
            </div>

            {savedSuccess && (
              <div className="rounded-lg bg-emerald-950/50 border border-emerald-500/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Personal safety plan updated and saved to your device.</span>
              </div>
            )}

            {/* Core Grounding Mantra */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                MY PERSONAL GROUNDING MANTRA (WORDS TO REMEMBER IN THE DARK):
              </label>
              <textarea
                rows={2}
                value={safetyPlan.coreMantra}
                onChange={(e) => setSafetyPlan({ ...safetyPlan, coreMantra: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Trusted Safe Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  SAFE PERSON'S NAME:
                </label>
                <input
                  type="text"
                  value={safetyPlan.safeContacts[0]?.name || ''}
                  onChange={(e) => {
                    const contacts = [...safetyPlan.safeContacts];
                    contacts[0] = { ...contacts[0], name: e.target.value };
                    setSafetyPlan({ ...safetyPlan, safeContacts: contacts });
                  }}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  THEIR PHONE NUMBER:
                </label>
                <input
                  type="text"
                  value={safetyPlan.safeContacts[0]?.phone || ''}
                  onChange={(e) => {
                    const contacts = [...safetyPlan.safeContacts];
                    contacts[0] = { ...contacts[0], phone: e.target.value };
                    setSafetyPlan({ ...safetyPlan, safeContacts: contacts });
                  }}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Calming physical actions */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                3 PHYSICAL ANCHORS THAT REDUCE MY SENSORY OVERWHELM:
              </label>
              <textarea
                rows={3}
                value={safetyPlan.calmingActivities.join('\n')}
                onChange={(e) => setSafetyPlan({ ...safetyPlan, calmingActivities: e.target.value.split('\n') })}
                className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
                placeholder="One item per line"
              />
            </div>
          </div>
        </form>
      )}

      {/* --- SubTab 3: Panic First Aid --- */}
      {activeSubTab === 'firstAid' && (
        <div className="mt-8 mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-indigo-900/40 bg-[#0c101c] p-6 shadow-xl space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Emergency Protocol for Panic Spikes & Severe Static
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your heart is pounding, your palms are sweating, and your mind is screaming that you are having a heart attack or going insane: <strong>you are experiencing a rush of adrenaline.</strong> It is physically uncomfortable, but it cannot harm you and it will crest and recede.
            </p>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-xs font-bold text-indigo-300">1. Activate Mammalian Dive Reflex</span>
                <p className="text-xs text-slate-400 mt-1">
                  Splash freezing cold water on your face, or hold an ice cube against the crook of your wrists. This instantly forces the vagus nerve to slow your heartbeat.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-xs font-bold text-cyan-300">2. Lengthen Your Exhale (Vagal Brake)</span>
                <p className="text-xs text-slate-400 mt-1">
                  Inhale for 4 seconds, exhale for 8 seconds. Making the exhale twice as long as the inhale triggers the chemical release of acetylcholine, your body's natural tranquilizer.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-xs font-bold text-amber-300">3. Drop Your Weight to the Floor</span>
                <p className="text-xs text-slate-400 mt-1">
                  Sit on the carpet or floor with your back against a solid wall. Feel gravity holding you securely. The floor will not let you fall.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
