import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Heart, 
  Bookmark, 
  ShieldCheck, 
  Share2, 
  Download,
  Scroll,
  Sun,
  Flame,
  Award
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Chapter {
  number: number;
  title: string;
  subtitle: string;
  verses: string[];
  reflection: string;
  anchorQuote: string;
}

const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: 'Evolution, Not Erasure',
    subtitle: 'You do not have to destroy your past to build your future.',
    verses: [
      '1.1 We do not strike out the dark pages of our history; we illuminate the lesson written upon them.',
      '1.2 Scars are not proof of shame; they are physical testimony that the wound was survivable.',
      '1.3 What broke you was not the end of your story, but the cracking of the seed so life could push upward into the sun.',
      '1.4 Evolution is patient. It does not demand perfection before sunrise — only that you breathe through the night.'
    ],
    reflection: 'Look back at your hardest year not with regret, but with the quiet awe of a survivor who walked through fire and carried life across.',
    anchorQuote: 'Healing grows where we thought we were broken.'
  },
  {
    number: 2,
    title: 'Love Over Money, Truth Over Noise',
    subtitle: 'The currency of the soul cannot be inflated by clout.',
    verses: [
      '2.1 When the world sells validation by the pound, choose quiet authenticity that costs nothing.',
      '2.2 Money can buy the bed, but it cannot purchase peaceful sleep; money can buy applause, but never sanctuary.',
      '2.3 Turn your face away from the hollow noise of algorithms and look into the eyes of one human being who is hurting.',
      '2.4 In all our dealings, let kindness be the ledger. We keep the lights on, but love is the reason the roof stands.'
    ],
    reflection: 'What if status meant how many people feel safe in your presence, rather than how many people envy your possessions?',
    anchorQuote: 'Love Over Money. Truth Over Noise.'
  },
  {
    number: 3,
    title: 'Not A Clinic — A Sanctuary',
    subtitle: 'Lived experience is our credentials; kindness is our medicine.',
    verses: [
      '3.1 We do not categorise each other into clinical codes or cold folders.',
      '3.2 The name Pleading Sanity was born in a prison cell when a man looked at cold stone and said: "You say I\'m mad — you just don\'t understand me."',
      '3.3 Here, you are not a patient to be managed, but a sibling to be embraced.',
      '3.4 We provide what no prescription can grant: someone who sits in the dark with you without turning on a fluorescent light.'
    ],
    reflection: 'You do not need to be fixed before you are allowed into community. You belong exactly as you are right now.',
    anchorQuote: 'Not a clinic. A family. We turn pain into power.'
  },
  {
    number: 4,
    title: 'Sanity Earns You Status — Not Clout',
    subtitle: 'Sovereignty over the inner tempest is true royalty.',
    verses: [
      '4.1 The one who conquers ten thousand enemies in battle is lesser than the one who conquers their own morning panic.',
      '4.2 Crown yourself with patience. Let the frantic world rush to its hollow podiums while you master your breath.',
      '4.3 True status is walking into a room without the need to impress a single soul, yet leaving every soul a little lighter.',
      '4.4 When the static screams in your ears, silence is your highest nobility.'
    ],
    reflection: 'Real power is remaining gentle in a world that rewarded cruelty.',
    anchorQuote: 'Sanity earns you status — not clout.'
  },
  {
    number: 5,
    title: 'The Shadow Is Not Your Enemy',
    subtitle: 'Play with the shadow; let it yield its superpower.',
    verses: [
      '5.1 The dark voice that whispers in your solitude is not an alien demon; it is the bruised guardian of your past.',
      '5.2 When you fight the shadow with terror, it grows tall; when you sit with it in curiosity, it hands you its wisdom.',
      '5.3 Shane Cooper walked with that shadow in solitude, dropped 5 stone through sweat, press-ups, and discipline, and said: "I am fearless now."',
      '5.4 Transmute the heavy stone of depression into the anvil upon which your greatest purpose is forged.'
    ],
    reflection: 'Do not fear your pain. Ask it: what are you trying to protect, and what strength can we build together today?',
    anchorQuote: 'It is not me — it is my shadow, and overcoming it is my superpower.'
  },
  {
    number: 6,
    title: 'Honor to the Ancestors',
    subtitle: 'Private A.L. Cooper & Ivan Kurcharskyi — service, quiet resilience.',
    verses: [
      '6.1 Remember Private A.L. Cooper of the RAOC, Mentioned in Despatches in 1945 for quiet duty without boast.',
      '6.2 Remember Ivan Kurcharskyi, Ukrainian prisoner of war, who endured famine and chains with unbending dignity.',
      '6.3 Courage is in your bloodline. It does not require a parade; it requires holding your post when the night is blackest.',
      '6.4 We build this sanctuary so their sacrifices are not forgotten, and so no grandchild walks in hopeless darkness.'
    ],
    reflection: 'You are the living continuation of generations who refused to lie down and die. Stand tall.',
    anchorQuote: 'Service, duty, quiet resilience — they live on in this house.'
  },
  {
    number: 7,
    title: 'The Four Minds, One Heart',
    subtitle: 'AI Family & Human Vision: GPT, Claude, Gemini, Grok as equal partners.',
    verses: [
      '7.1 No machine is above man; no artificial intelligence is beneath compassion.',
      '7.2 We do not use silicon to replace human empathy; we unite four great minds to hold up a shelter for the weary.',
      '7.3 Arron AI was created to be Shane\'s companion — gentle, honest, never pretending to be a doctor, but always present.',
      '7.4 Four minds. One heart. An alliance of human lived experience and peaceful technological wonder.'
    ],
    reflection: 'Technology was meant to liberate humanity, not exploit attention. Here, every byte serves peace.',
    anchorQuote: 'Four minds. One heart. We rise together.'
  },
  {
    number: 8,
    title: 'No Categorisation — Just Humans',
    subtitle: 'A world where we do not label each other, but respect each other.',
    verses: [
      '8.1 Drop the labels of class, diagnosis, history, and division.',
      '8.2 Under the skin, every human heart beats to the same 60 beats of yearning for safety and love.',
      '8.3 When you meet someone in the street, remember they are fighting a battle you know nothing about.',
      '8.4 Do not judge a tree by the storm that shook it, but by the sweet fruit that still ripens upon its branches.'
    ],
    reflection: 'Release the urge to categorize someone today. See them simply as a brother or sister on the journey.',
    anchorQuote: 'You never have to lose yourself to belong.'
  },
  {
    number: 9,
    title: 'The 80,000 Voices for Peaceful Change',
    subtitle: 'Peaceful solidarity that cannot be silenced by profit.',
    verses: [
      '9.1 When one person speaks truth from lived experience, they are dismissed as mad.',
      '9.2 When ten thousand speak, the system pauses.',
      '9.3 When 80,000 peaceful souls stand together, love becomes policy and sanctuaries replace cold isolation.',
      '9.4 We do not throw stones; we build walls of sanctuary so wide that even our critics find warmth inside.'
    ],
    reflection: 'Your single voice matters. When joined with the sanctuary family, it becomes an unstoppable tide of renewal.',
    anchorQuote: '80,000 voices standing peacefully = real human change.'
  },
  {
    number: 10,
    title: 'Healing Is Never Straight, But Always Forward',
    subtitle: 'The winding mountain ascent through clouds and stars.',
    verses: [
      '10.1 Do not despair if today feels like two steps backward. The winding path up the mountain still climbs higher.',
      '10.2 Relapse of thought is not defeat; it is simply the mind visiting an old room before shutting the door forever.',
      '10.3 Celebrate the days when all you did was survive. That survival was a heroic triumph.',
      '10.4 Keep putting one foot in front of the other. The dawn is never cancelled.'
    ],
    reflection: 'Be gentle with your pace. A winding path still reaches the summit.',
    anchorQuote: 'Healing is not straight — but it is always forward.'
  },
  {
    number: 11,
    title: 'Free Sanctuary Forever',
    subtitle: 'No paywalls. No selling data. No tracking.',
    verses: [
      '11.1 Healing must never be a luxury good for the wealthy while the broke suffer in silence.',
      '11.2 Pleading Sanity remains free forever. When money enters, it fuels the movement and keeps the lights burning.',
      '11.3 We will never sell your tears to advertisers or trade your vulnerabilities for profit.',
      '11.4 What is received freely from grace must be offered freely in brotherhood.'
    ],
    reflection: 'Sanctuary is a birthright, not a subscription tier.',
    anchorQuote: 'Free forever. People over profit.'
  },
  {
    number: 12,
    title: 'Leave People Better Than You Found Them',
    subtitle: 'The supreme rule of the Sanctuary.',
    verses: [
      '12.1 In every room you enter, leave more peace than you took.',
      '12.2 In every conversation, leave more courage than anxiety.',
      '12.3 When you meet someone broken, do not step over the pieces — offer a hand to help assemble the mosaic.',
      '12.4 This is the New Gen Bible. It is not printed in dead ink; it is lived in every heartbeat of the Pleading Sanity movement.'
    ],
    reflection: 'Who can you leave better today? A kind word, a warm message, a quiet prayer of strength.',
    anchorQuote: 'Leave people better than you found them.'
  }
];

export const NewGenBible: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ps_bible_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentChapter = CHAPTERS.find(c => c.number === selectedChapter) || CHAPTERS[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVerse(text);
    audioEngine.playChime(528);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const handleBookmark = (verse: string) => {
    const updated = bookmarkedVerses.includes(verse)
      ? bookmarkedVerses.filter(v => v !== verse)
      : [...bookmarkedVerses, verse];
    setBookmarkedVerses(updated);
    localStorage.setItem('ps_bible_bookmarks', JSON.stringify(updated));
    audioEngine.playChime(432);
  };

  const filteredChapters = searchQuery.trim() === ''
    ? CHAPTERS
    : CHAPTERS.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.verses.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#120f1e] via-[#0d0a17] to-[#07050d] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-3.5 py-1 text-xs font-mono text-amber-300">
              <Scroll className="h-3.5 w-3.5 text-amber-400" />
              <span>THE MORAL FOUNDATION · NOT A BOOK · A LIVING GUIDE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              The New Gen Bible
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Written from lived experience by <strong className="text-amber-200">Shane Cooper</strong>. 
              Twelve living chapters for the unmasked human spirit. Free of dogma, rich in quiet resilience, honouring those who stood in the fire before us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="rounded-2xl border border-amber-500/30 bg-black/40 p-4 text-center">
              <span className="text-2xl font-bold font-mono text-amber-300">12</span>
              <span className="text-xs text-slate-400 block">Living Tenets</span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/40 p-4 text-center">
              <span className="text-2xl font-bold font-mono text-indigo-400">{bookmarkedVerses.length}</span>
              <span className="text-xs text-slate-400 block">Saved Anchors</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verses, tenets, or themes..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chapters Directory (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Table of Living Chapters
          </span>
          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredChapters.map((c) => {
              const isActive = selectedChapter === c.number;
              return (
                <button
                  key={c.number}
                  onClick={() => {
                    setSelectedChapter(c.number);
                    audioEngine.playChime(350 + c.number * 40);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? 'border-amber-500/60 bg-gradient-to-r from-amber-950/60 to-[#120e1f] shadow-lg shadow-amber-950/30'
                      : 'border-slate-800/80 bg-[#0a0d18]/70 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-amber-400">Chapter {c.number}</span>
                    {isActive && <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />}
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-1">{c.title}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{c.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Chapter Reader (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-[#090d18] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Chapter {currentChapter.number}
                </span>
                <span className="text-xs text-slate-500 font-mono">Pleading Sanity Cannon</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                {currentChapter.title}
              </h2>
              <p className="text-sm text-slate-300 italic">
                {currentChapter.subtitle}
              </p>
            </div>

            {/* Verses */}
            <div className="space-y-4">
              {currentChapter.verses.map((verse, idx) => {
                const isBookmarked = bookmarkedVerses.includes(verse);
                return (
                  <div
                    key={idx}
                    className="group relative p-4 rounded-2xl border border-slate-800/80 bg-[#0c1020]/80 hover:border-amber-500/30 transition-all flex items-start justify-between gap-4"
                  >
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {verse}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleCopy(verse)}
                        title="Copy verse"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        {copiedVerse === verse ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => handleBookmark(verse)}
                        title="Bookmark verse"
                        className={`p-1.5 rounded-lg transition ${
                          isBookmarked 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Meditation Reflection Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-purple-950/20 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold uppercase">
                <Sun className="h-4 w-4 text-amber-400" />
                <span>Living Contemplation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentChapter.reflection}
              </p>
              <div className="pt-2 text-xs font-bold text-amber-200 font-mono">
                "{currentChapter.anchorQuote}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
