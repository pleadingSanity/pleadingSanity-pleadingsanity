import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Check, 
  ShieldCheck, 
  Heart,
  Globe,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenCrisisModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCrisisModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-[#06080d] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-950/60">
                <Sparkles className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <span className="font-display text-base font-extrabold text-white tracking-tight">
                  PLEADING SANITY
                </span>
                <p className="text-[11px] font-mono text-indigo-400">
                  Rise From Madness · Evolution, Not Erasure
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              A mental health revolution disguised as a streetwear brand, a digital hub, and a global movement. 
              Transforming pain into power and madness into meaning. Founded in the UK to dismantle the shame around neurodivergence and psychological survival.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span className="text-white font-semibold">Official Domains:</span>
              <a 
                href="https://www.pleadingsanity.co.uk" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-indigo-300 transition-colors underline"
              >
                pleadingsanity.co.uk
              </a>
              <span>·</span>
              <a 
                href="https://shop.pleadingsanity.co.uk" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-indigo-300 transition-colors underline"
              >
                shop.pleadingsanity.co.uk
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>10% of all apparel proceeds fund UK grassroots peer mental health sanctuaries.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Sanctuary Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('arcade')} className="hover:text-white transition-colors text-indigo-300 font-semibold">
                  The 12 Sanctuary Games
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bible')} className="hover:text-white transition-colors text-amber-300 font-semibold">
                  The New Gen Bible (12 Tenets)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Shane Cooper's Lived Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visuals')} className="hover:text-white transition-colors">
                  12 Core Visual Themes Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('arron')} className="hover:text-white transition-colors">
                  Arron AI & Custom GPT Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gptfile')} className="hover:text-white transition-colors text-emerald-400">
                  Master GPT Integration File
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('healing')} className="hover:text-white transition-colors">
                  Healing Hz Sound Bath (10 Tones)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Streetwear Vault (450 GSM Armor)
                </button>
              </li>
              <li>
                <button onClick={onOpenCrisisModal} className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
                  <span>Emergency Lifelines (24/7 UK)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Transmission */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              The Sanity Transmission
            </h4>
            <p className="text-xs text-slate-400">
              Receive bi-weekly grounding letters, unreleased frequency drop alerts, and private streetwear drop codes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
              >
                <Send className="h-3 w-3" />
                <span>Join the Movement</span>
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Check className="h-3.5 w-3.5" />
                <span>Welcome to the tribe. First transmission sent.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Pleading Sanity. All rights reserved. Registered UK Community Brand.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Created with relentless love by Shane Cooper & the Pleading Sanity Tribe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
