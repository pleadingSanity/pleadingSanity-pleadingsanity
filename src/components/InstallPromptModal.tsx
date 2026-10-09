import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Globe 
} from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const [fallbackMessage, setFallbackMessage] = useState(false);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // In-UI instructions without window.alert
      setFallbackMessage(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl border border-indigo-500/40 bg-[#0c101d] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg bg-slate-800/80 p-2 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="h-5 w-5 text-indigo-400" />
          <h2 className="font-display text-lg font-bold text-white">
            Install Pleading Sanity App
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Experience Pleading Sanity as a native application on Android, Google Play environment, tablet, or desktop.
        </p>

        <div className="space-y-2 mb-6">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex items-center gap-3">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Full Offline Functionality</span>
              <p className="text-[11px] text-slate-400">Healing Hz frequencies and crisis numbers work without WiFi.</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex items-center gap-3">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Zero Browser Clutter</span>
              <p className="text-[11px] text-slate-400">Launches in standalone fullscreen mode like a native app.</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex items-center gap-3">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Encrypted Local Data</span>
              <p className="text-[11px] text-slate-400">Your safety anchors and notes never leave your personal hardware.</p>
            </div>
          </div>
        </div>

        {fallbackMessage && (
          <div className="mb-4 rounded-xl border border-indigo-500/40 bg-indigo-950/60 p-3 text-xs text-indigo-200">
            <strong>Install on Android / Chrome:</strong> Tap the 3 dots (⋮) in your browser menu, then select <em>"Install app"</em> or <em>"Add to Home screen"</em>.
          </div>
        )}

        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
        >
          <Download className="h-4 w-4" />
          <span>{isInstalled ? 'App Already Installed' : 'Install to Home Screen'}</span>
        </button>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            PWA / TWA Ready for Google Play · 0 MB Storage Footprint
          </p>
        </div>
      </div>
    </div>
  );
};
