import React from 'react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  ShieldAlert, 
  Heart,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import { CRISIS_LINES } from '../data/mockData';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-rose-500/50 bg-[#0e0c14] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg bg-slate-800/80 p-2 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 text-rose-400 mb-2">
          <ShieldAlert className="h-6 w-6 animate-pulse" />
          <h2 className="font-display text-xl font-bold text-white">
            Immediate Free Crisis Support
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          If you are in danger, feeling suicidal, or unable to keep yourself safe, please reach out to one of the trained, compassionate services below. They are 100% free, confidential, and available right now.
        </p>

        {/* Priority 24/7 UK Direct Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-rose-300 font-mono mb-1">
                <span>SAMARITANS (UK & ROI)</span>
                <span>24/7 FREE</span>
              </div>
              <div className="text-2xl font-mono font-extrabold text-white my-1">
                116 123
              </div>
              <p className="text-xs text-slate-300">
                Talk to a real person who will listen without judging. Will not show up on your phone bill.
              </p>
            </div>
            <a
              href="tel:116123"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors shadow-md shadow-rose-600/30"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Call 116 123 Now</span>
            </a>
          </div>

          <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-indigo-300 font-mono mb-1">
                <span>SHOUT CRISIS TEXT LINE</span>
                <span>24/7 FREE</span>
              </div>
              <div className="text-2xl font-mono font-extrabold text-white my-1">
                Text 85258
              </div>
              <p className="text-xs text-slate-300">
                If speaking out loud is too hard, text "SHOUT" to 85258 for silent, confidential crisis support.
              </p>
            </div>
            <a
              href="sms:85258?body=SHOUT"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Text SHOUT to 85258</span>
            </a>
          </div>
        </div>

        {/* Additional Emergency Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white">
            <LifeBuoy className="h-4 w-4 text-amber-400" />
            <span>Emergency Services</span>
          </div>
          <p>
            If your physical safety or someone else’s life is in immediate danger, please call <strong>999</strong> immediately.
          </p>
          <p>
            For urgent NHS mental health support or triage, call <strong>NHS 111</strong>.
          </p>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span>Outside the United Kingdom?</span>
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
            >
              <span>Find A Helpline Worldwide</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
