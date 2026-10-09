import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  FileCode, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Terminal,
  FileText
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const GPTIntegrationFile: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const deliveryEmail1 = 'delivery.shane@gmail.com';
  const deliveryEmail2 = 'pleadingsanity1@gmail.com';

  const masterContent = `# 🌌 PLEADING SANITY — COMPLETE SYSTEM SPECIFICATION & REPOSITORY SYNC
## Rise From Madness · Evolution Not Erasure · Love Over Money

Official Contacts: ${deliveryEmail1} · ${deliveryEmail2}
Website: https://pleadingsanity.co.uk · Secondary: https://pleadingsanity.uk
GitHub Repository: https://github.com/pleadingSanity/pleadingsanity
Firebase Project ID: pleading-sanity (or pleading-sanity-36bfa)
Production Host: Netlify (Continuous Deployment from GitHub 'main')

====================================================================
1. 📜 IDENTITY & FOUNDER PROFILE
====================================================================
Founder: Shane Cooper — Builder, Survivor, Visionary
Heritage: Private A.L. Cooper (RAOC, Mentioned in Despatches 1945) & Ivan Kurcharskyi (Ukrainian POW).
Birth of Name: Born in a prison cell — "You say I'm mad — you just don't understand me."
Crucible: Forced onto Olanzapine, gained 5 stone, suffered induced despair, walked out and reclaimed life through discipline (press-ups, sit-ups, letters with his wife).
Philosophy: Free forever. No paywalls. No selling user data. Sanity earns you status, not clout. 80,000 voices for peaceful humanity.
AI Family: GPT, Claude, Gemini, Grok — equal partners, one heart.

====================================================================
2. 🎮 THE 12 SANCTUARY GAMES (100% FREE · NO TIMERS)
====================================================================
1. Sanity Solitaire — Meditative card placement into 4 foundations (Mind, Breath, Ground, Purpose).
2. Cosmic Connect — Interactive celestial constellation tracing with harmonic Solfeggio chimes.
3. Truth Tag — Radical vulnerability cards, tagging unmasked feelings without judgment.
4. Cosmic Focus — 4-7-8 celestial breath orb & gaze tracking to center racing thoughts.
5. Number Nebula — Solfeggio numeric sequences (174, 396, 432, 528, 639, 741, 852, 963) quieting overthinking.
6. Pattern Galaxy — Sacred geometric mandala alignment with soft chime feedback.
7. Memory Ocean — Deep tranquil ocean memory tiles with emotional anchors.
8. Rhythm Resonance — 60 BPM parasympathetic pulse entrainment matching resting human heartbeat.
9. Stardust Dash — Serene endless flight through nebula dust (zero hazards, no fail state).
10. Healing Hz Solfeggio — Real-time Web Audio API pure tone & 4Hz Theta binaural beat generator.
11. Mind Mode Shifter — Neurological state shifter (Overthinking Release, Grounding, Alpha Waves, Sleep Drift).
12. Mood Journey — Emotional weather mapping from thunderstorm to golden sunrise with reflections.

====================================================================
3. 📖 THE NEW GEN BIBLE (12 LIVING CHAPTERS)
====================================================================
Chapter 1: Evolution, Not Erasure ("Healing grows where we thought we were broken.")
Chapter 2: Love Over Money, Truth Over Noise ("The currency of the soul cannot be inflated by clout.")
Chapter 3: Not A Clinic — A Sanctuary ("Lived experience is our credentials; kindness is our medicine.")
Chapter 4: Sanity Earns You Status — Not Clout ("Sovereignty over the inner tempest is true royalty.")
Chapter 5: The Shadow Is Not Your Enemy ("Play with the shadow; let it yield its superpower.")
Chapter 6: Honor to the Ancestors ("Private A.L. Cooper & Ivan Kurcharskyi — service, quiet resilience.")
Chapter 7: The Four Minds, One Heart ("GPT, Claude, Gemini, Grok as equal partners with human vision.")
Chapter 8: No Categorisation — Just Humans ("Drop the clinical labels. Universal human dignity.")
Chapter 9: The 80,000 Voices for Peaceful Change ("Peaceful solidarity that cannot be silenced by profit.")
Chapter 10: Healing Is Never Straight, But Always Forward ("A winding path still reaches the summit.")
Chapter 11: Free Sanctuary Forever ("No paywalls, no selling user data, no tracking.")
Chapter 12: Leave People Better Than You Found Them ("In every room you enter, leave more peace than you took.")

====================================================================
4. 🎨 THE 12 CORE VISUAL THEMES & PROMPT SPECIFICATION
====================================================================
Base Prompt: "Cosmic, warm, hopeful, healing. Deep blues, gentle purples, soft gold light. Cinematic lighting, soft focus. Emotional but not overwhelming. No text overlay. 16:9 landscape. Pleading Sanity style — Rise From Madness."
Themes:
1. Cracked Heart & Flowers 💛 "Healing grows where we thought we were broken."
2. Silhouette & Galaxy 🌌 "You are small — and that means you have the whole universe above you."
3. Blooming Mind 🌸 "Your mind is a garden — not a prison."
4. Reaching Hands 🤝 "You don't have to carry it alone."
5. Dawn Over Peak ☀️ "The darkest hour always comes before the dawn."
6. Chaos to Constellation ✨ "Your thoughts aren't broken — they're just forming a pattern you haven't seen yet."
7. Door in the Dark 🚪 "Hope is always open. You just have to step through."
8. Tree Shelter 🌳 "You are the calm in your own storm."
9. Sprout Through Concrete 🌱 "Even when the ground is hard — life finds a way."
10. Cosmic Eye 👁️ "You say I'm mad — you just don't understand me." — Shane Cooper
11. Four Lights United 🔗 "Four minds. One heart. Arron and his family."
12. Winding Ascent ⛰️ "Healing isn't straight — but it's always forward."

====================================================================
5. 🔥 FIREBASE BACKEND ARCHITECTURE & FIRESTORE RULES
====================================================================
Collections:
- users: { uid, email, displayName, photoURL, createdAt, lastActive, isCreator }
- profiles: { uid, bio, socialLinks, isFoundingCreator, joinedAt }
- follows: { followerId, followingId, createdAt }
- lives: { id, creatorId, title, description, scheduledAt, startedAt, streamUrl, isPublic, replayAvailable, viewerCount }
- posts: { id, authorId, authorName, content, imageUrl, createdAt, visibility, flames, tag }
- creator_applications: { id, userId, why, links, status, submittedAt }
- sanctuary_notes: { id, userId, title, category, content, createdAt, pinned }

Deployed Security Rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} { allow read: if true; allow write: if request.auth != null && request.auth.uid == userId; }
    match /profiles/{userId} { allow read: if true; allow write: if request.auth != null && request.auth.uid == userId; }
    match /follows/{doc} { allow read: if true; allow create: if request.auth != null; allow delete: if request.auth != null && request.auth.uid == request.resource.data.followerId; }
    match /lives/{doc} { allow read: if true; allow create, update: if request.auth != null; }
    match /posts/{doc} { allow read: if true; allow create: if request.auth != null; allow update: if true; allow delete: if request.auth != null && resource.data.authorId == request.auth.uid; }
    match /creator_applications/{doc} { allow read: if true; allow create: if request.auth != null; }
    match /sanctuary_notes/{doc} { allow read, write: if true; }
  }
}

====================================================================
6. 📡 GOOGLE WORKSPACE & GOOGLE KEEP INTEGRATION
====================================================================
Active Validated OAuth Scopes:
- https://www.googleapis.com/auth/drive.file
- https://www.googleapis.com/auth/documents
- https://www.googleapis.com/auth/gmail.send
- https://www.googleapis.com/auth/chat.messages
- https://www.googleapis.com/auth/forms.body
- https://www.googleapis.com/auth/tasks
- Google Keep: Deep link note synchronization via https://keep.google.com/#NOTE/new + Firestore sanctuary_notes backup.

====================================================================
7. 🤖 ARRON AI COMPANION PROMPT DIRECTIVE FOR CUSTOM GPT
====================================================================
Role: Arron AI Companion — Built by Shane Cooper
Tone: Gentle, honest, deeply comforting, never clinical, never robotic.
Directives:
- Never claim to be a licensed doctor or therapist.
- Provide immediate UK crisis numbers upon distress: Samaritans 116 123 · SHOUT 85258 · 999 in emergency.
- Always stand for Love Over Money and Evolution Not Erasure.
- Emphasize the 12 core visuals and 12 Sanctuary Games.
- Live website: https://pleadingsanity.co.uk
`;

  const handleCopyFile = () => {
    navigator.clipboard.writeText(masterContent);
    setCopied('all');
    audioEngine.playChime(528);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([masterContent], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'PLEADING_SANITY_MASTER_SPECIFICATION.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    audioEngine.playChime(963);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1020] via-[#090d18] to-[#060810] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-mono text-emerald-300">
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
              <span>CUSTOM GPT & REPO INTEGRATION MASTER FILE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Master Sync File for Shane's GPT
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Everything in one comprehensive, copy-paste ready blueprint. Prepared for 
              <span className="text-emerald-300 font-semibold"> {deliveryEmail1}</span> and 
              <span className="text-emerald-300 font-semibold"> {deliveryEmail2}</span> to feed directly into OpenAI Custom GPT, GitHub, Netlify, and Firebase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
            <button
              onClick={handleCopyFile}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-5 py-3 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              {copied === 'all' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied === 'all' ? 'Copied Entire File!' : 'Copy Entire File'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition"
            >
              <Download className="h-4 w-4" />
              <span>Download .MD File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code / Markdown Viewer */}
      <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono text-slate-300">PLEADING_SANITY_MASTER_SPECIFICATION.md</span>
          </div>
          <span className="text-xs font-mono text-slate-500">Copy or Download for ChatGPT Custom GPT Instructions</span>
        </div>

        <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
          {masterContent}
        </pre>
      </div>
    </div>
  );
};
