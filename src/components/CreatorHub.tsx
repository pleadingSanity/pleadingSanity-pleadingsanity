import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Sparkles, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Tv, 
  Award, 
  UserCheck, 
  AlertCircle,
  Play
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth, db, PSLive, PSProfile } from '../firebase';

interface CreatorHubProps {
  onOpenAuth: () => void;
}

export const CreatorHub: React.FC<CreatorHubProps> = ({ onOpenAuth }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [profile, setProfile] = useState<PSProfile | null>(null);
  const [activeLiveTab, setActiveLiveTab] = useState<'live' | 'scheduled' | 'past'>('live');
  const [lives, setLives] = useState<PSLive[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    { id: '1', user: 'Shane Cooper', text: 'Welcome to Pleading Sanity. You are safe here tonight.', time: '20:00' },
    { id: '2', user: 'Nova_Tribe', text: 'The 528 Hz frequency literally stopped my panic attack earlier.', time: '20:03' },
    { id: '3', user: 'Liam (Manchester)', text: 'Four minds, one heart. Love over money.', time: '20:05' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isFoundingClaimed, setIsFoundingClaimed] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // New stream schedule state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newPrivacy, setNewPrivacy] = useState<'public' | 'friends'>('public');

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profSnap = await getDoc(doc(db, 'profiles', currentUser.uid));
        if (profSnap.exists()) {
          const profData = profSnap.data() as PSProfile;
          setProfile(profData);
          setIsFoundingClaimed(profData.isFoundingCreator || false);
        }
      } else {
        setProfile(null);
        setIsFoundingClaimed(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Lives collection in Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'lives'));
      const unsub = onSnapshot(q, (snapshot) => {
        const liveItems: PSLive[] = [];
        snapshot.forEach((doc) => {
          liveItems.push({ id: doc.id, ...(doc.data() as any) });
        });
        if (liveItems.length > 0) {
          setLives(liveItems);
        } else {
          // Provide default curated sanctuary broadcasts
          setLives([
            {
              id: 'live-shane-01',
              creatorId: 'shane-cooper',
              creatorName: 'Shane Cooper',
              title: 'Rise From Madness: Evening Grounding & Honest Dialogue',
              description: 'An open space talking about raw mental health, surviving prison cells, and transmuting suffering into art. Love over money.',
              streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', // Calm ambient lofi video stream
              isPublic: true,
              replayAvailable: true,
              startedAt: 'Live Now',
              viewerCount: 84
            },
            {
              id: 'live-shane-02',
              creatorId: 'shane-cooper',
              creatorName: 'Shane Cooper',
              title: 'Sunday Solfeggio & Sound Therapy Deep Dive',
              description: 'Exploring the 10 healing frequencies with live synthesized tones and breathwork.',
              scheduledAt: 'Sunday 8:00 PM GMT',
              isPublic: true,
              replayAvailable: false
            }
          ]);
        }
      }, (error) => {
        // Silently handle permission or offline delays without crashing
        console.warn('Firestore live listener notice:', error.message);
      });
      return () => unsub();
    } catch {
      // Offline fallback
    }
  }, []);

  // Claim Founding Creator Status
  const handleClaimFoundingCreator = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    try {
      const profileRef = doc(db, 'profiles', user.uid);
      await updateDoc(profileRef, { isFoundingCreator: true });
      setIsFoundingClaimed(true);
      if (profile) setProfile({ ...profile, isFoundingCreator: true });
    } catch {
      setIsFoundingClaimed(true); // optimistic
    }
  };

  // Send Kind Chat Message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      user: user?.displayName || user?.email?.split('@')[0] || 'Anonymous Traveler',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
  };

  // Schedule a Live Broadcast
  const handleScheduleLive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (!user) {
      onOpenAuth();
      return;
    }

    try {
      await addDoc(collection(db, 'lives'), {
        creatorId: user.uid,
        creatorName: user.displayName || user.email?.split('@')[0] || 'Creator',
        title: newTitle.trim(),
        description: newDesc.trim(),
        streamUrl: newStreamUrl.trim() || null,
        isPublic: newPrivacy === 'public',
        replayAvailable: true,
        scheduledAt: new Date().toLocaleDateString('en-GB') + ' 20:00 GMT',
        createdAt: serverTimestamp()
      });
      setIsScheduleModalOpen(false);
      setNewTitle('');
      setNewDesc('');
      setNewStreamUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  const currentLive = lives.find((l) => l.startedAt) || lives[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-12">
      {/* Live Active Red Banner (Visible but calm) */}
      <div className="rounded-xl border border-rose-500/50 bg-rose-950/20 px-4 py-3 flex items-center justify-between text-xs backdrop-blur-md">
        <div className="flex items-center gap-2.5 text-rose-300">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <span className="font-mono uppercase font-bold text-white tracking-wider">
            SANCTUARY TRANSMISSION ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span className="hidden sm:inline text-slate-300 italic">
            "{currentLive?.title}"
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            {currentLive?.viewerCount || 84} Minds Connected
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>COMMUNITY & CREATOR HUB</span>
            <span aria-hidden="true">·</span>
            <span>LOVE OVER MONEY</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Creator Sanctuary & Live Transmissions
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            A safe space where lived experience becomes collective medicine. 
            Sanity earns you status — not clout.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Radio className="h-4 w-4" />
              <span>Broadcast a Live</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-4 py-2 text-xs font-bold text-indigo-200 hover:bg-indigo-900/60 transition-colors"
            >
              <UserCheck className="h-4 w-4" />
              <span>Sign In to Broadcast</span>
            </button>
          )}
        </div>
      </div>

      {/* 🌟 FOUNDING CREATOR OFFER — FIRST 1,000 */}
      <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-[#111628] via-[#0d1222] to-[#111628] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="h-64 w-64 text-indigo-300" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Award className="h-4 w-4" />
            <span>FOUNDING CREATOR OFFER · FIRST 1,000 ONLY</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Keep 90% of What You Create. Forever.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We are building this platform from lived experience. Not a business, but a family. 
            For our first 1,000 creators, you keep 90% of all income your content generates. 
            We keep 10% — just enough to keep the servers running and the lights on.
          </p>

          {/* Core Terms Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-mono font-bold text-emerald-400">90% Yours</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Highest creator split in digital media.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-mono font-bold text-indigo-300">10% Platform</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Just enough to keep the lights on.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-mono font-bold text-cyan-300">£0 = £0</span>
              <p className="text-[11px] text-slate-400 mt-0.5">No hidden hosting fees or gotchas.</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-mono font-bold text-amber-300">Locked In</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Yours for as long as you stay.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400">
              ⚠️ Payout infrastructure launching soon — your earnings track in your dashboard
            </div>

            {isFoundingClaimed ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Founding Creator Status Active (90/10 Locked)</span>
              </div>
            ) : (
              <button
                onClick={handleClaimFoundingCreator}
                className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>Lock in Founding Creator Split</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 📡 LIVE STREAM SECTION */}
      <div className="space-y-6">
        {/* Navigation Tabs for Lives */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'live', label: 'Live Now' },
              { id: 'scheduled', label: 'Scheduled Transmissions' },
              { id: 'past', label: 'Past Replays' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLiveTab(tab.id as typeof activeLiveTab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeLiveTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-indigo-400">
            Native Streaming: <span className="text-amber-400 font-bold">🔜 COMING SOON</span>
          </span>
        </div>

        {/* Tab 1: Live Now Player & Community Chat */}
        {activeLiveTab === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Player Container */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#090c16] overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {currentLive?.streamUrl ? (
                  <iframe
                    src={currentLive.streamUrl}
                    title={currentLive.title}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center p-8 space-y-2">
                    <Tv className="h-12 w-12 text-indigo-500/40 mx-auto" />
                    <h3 className="font-display text-base font-bold text-white">
                      Embed YouTube / Twitch / Kick Stream
                    </h3>
                    <p className="text-xs text-slate-400">
                      Native WebRTC low-latency streaming infrastructure is currently being forged.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-slate-800 bg-[#0c101d]">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>HOST: {currentLive?.creatorName || 'Shane Cooper'}</span>
                  <span className="text-emerald-400">Privacy: Public</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {currentLive?.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {currentLive?.description}
                </p>
              </div>
            </div>

            {/* Simple, Kind, Moderated Community Chat */}
            <div className="rounded-2xl border border-slate-800 bg-[#090c16] flex flex-col h-[480px]">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-400" />
                  <span className="font-display text-xs font-bold text-white">Sanctuary Live Chat</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Kindness First</span>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-indigo-300">{msg.user}</span>
                      <span className="text-slate-600">{msg.time}</span>
                    </div>
                    <p className="text-slate-200 bg-slate-900/60 rounded-lg p-2 border border-slate-800/80">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 bg-[#0c101d]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Send a kind thought..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Scheduled Transmissions */}
        {activeLiveTab === 'scheduled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lives.filter((l) => l.scheduledAt).map((l) => (
              <div key={l.id} className="rounded-xl border border-slate-800 bg-[#0c101c] p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {l.scheduledAt}
                  </span>
                  <span>Host: {l.creatorName || 'Shane Cooper'}</span>
                </div>
                <h4 className="font-display text-base font-bold text-white">{l.title}</h4>
                <p className="text-xs text-slate-300">{l.description}</p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    Reminder saved to your sanctuary calendar.
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Past Lives */}
        {activeLiveTab === 'past' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lives.map((l) => (
              <div key={l.id} className="rounded-xl border border-slate-800 bg-[#0c101c] p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Replay Available</span>
                  <span>Host: {l.creatorName || 'Shane Cooper'}</span>
                </div>
                <h4 className="font-display text-base font-bold text-white">{l.title}</h4>
                <p className="text-xs text-slate-300">{l.description}</p>
                <button
                  onClick={() => setActiveLiveTab('live')}
                  className="mt-2 flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 underline font-mono"
                >
                  <Play className="h-3 w-3" />
                  <span>Watch Archive Transmission</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Broadcast Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-[#0c101d] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-2">
              Broadcast a Live Transmission
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Share your story, sound session, or peer conversation. No clout, only genuine connection.
            </p>

            <form onSubmit={handleScheduleLive} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  SESSION TITLE:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surviving the Abyss — Live Q&A"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  DESCRIPTION & ETHOS:
                </label>
                <textarea
                  rows={3}
                  placeholder="What will we explore together?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  STREAM EMBED LINK (YOUTUBE / TWITCH / KICK):
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={newStreamUrl}
                  onChange={(e) => setNewStreamUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Native streaming arriving soon. For now, embed your live URL.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  PRIVACY:
                </label>
                <select
                  value={newPrivacy}
                  onChange={(e) => setNewPrivacy(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="public">Public (Everyone welcome)</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="rounded-lg border border-slate-800 px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  Publish Transmission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
