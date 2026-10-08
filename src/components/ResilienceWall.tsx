import React, { useState } from 'react';
import { 
  Flame, 
  HeartHandshake, 
  Send, 
  X, 
  Check, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { COMMUNITY_STORIES } from '../data/mockData';
import { Story } from '../types';

export const ResilienceWall: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('ps_community_stories');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return COMMUNITY_STORIES;
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [kindledStoryIds, setKindledStoryIds] = useState<string[]>([]);

  // Submission Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTag, setNewTag] = useState('Neurodivergent');
  const [newText, setNewText] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleKindleFlame = (storyId: string) => {
    if (kindledStoryIds.includes(storyId)) return;

    setKindledStoryIds([...kindledStoryIds, storyId]);
    const updated = stories.map((s) => s.id === storyId ? { ...s, flames: s.flames + 1 } : s);
    setStories(updated);
    localStorage.setItem('ps_community_stories', JSON.stringify(updated));
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const newStory: Story = {
      id: `story-${Date.now()}`,
      author: newAuthor.trim() || 'Anonymous Warrior',
      location: newLocation.trim() || 'United Kingdom',
      title: newTitle.trim(),
      text: newText.trim(),
      tag: newTag,
      flames: 1,
      date: 'Just now'
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('ps_community_stories', JSON.stringify(updated));

    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewAuthor('');
    setNewLocation('');
    setNewText('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  const filteredStories = activeFilter === 'all'
    ? stories
    : stories.filter((s) => s.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Toast Alert */}
      {submittedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Your flame has been added to the Wall of Resilience.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>VOICES OF THE TRIBE</span>
            <span aria-hidden="true">·</span>
            <span>STORIES FROM THE ABYSS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Wall of Resilience
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Real testimonies of turning agony into armor. You are not alone in the depths, 
            and your survival proves that madness can be transmuted into meaning.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Flame className="h-4 w-4 text-amber-300" />
          <span>Kindle Your Story (Submit)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Testimonies' },
          { id: 'neurodivergent', label: 'Neurodivergence' },
          { id: 'panic', label: 'Panic & Sensory' },
          { id: 'depression', label: 'Depression & Men’s Health' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeFilter === f.id
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const isKindled = kindledStoryIds.includes(story.id);
          return (
            <div
              key={story.id}
              className="rounded-2xl border border-slate-800 bg-[#0c101c]/80 p-6 flex flex-col justify-between transition-all hover:border-indigo-500/40"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span className="text-indigo-400">{story.tag}</span>
                  <span>{story.date}</span>
                </div>

                <h3 className="font-display text-base font-bold text-white mb-2">
                  {story.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{story.text}"
                </p>
              </div>

              <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-xs font-bold text-white">{story.author}</div>
                  <div className="text-[11px] text-slate-500">{story.location}</div>
                </div>

                <button
                  onClick={() => handleKindleFlame(story.id)}
                  disabled={isKindled}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isKindled
                      ? 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-amber-500/30'
                  }`}
                  title="Send warmth to this survivor"
                >
                  <Flame className={`h-3.5 w-3.5 ${isKindled ? 'text-amber-400 fill-amber-400' : ''}`} />
                  <span>{story.flames}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-[#0c101d] p-6 shadow-2xl">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg bg-slate-800/80 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-amber-400" />
              <h3 className="font-display text-lg font-bold text-white">
                Share Your Journey of Survival
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Your words can be the life jacket someone desperately needs at 3 AM. 
              Share freely; you may use a pseudonym or remain anonymous.
            </p>

            <form onSubmit={handleStorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  TITLE OF YOUR TESTIMONY:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Learning to breathe after the breakdown"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    YOUR NAME OR ALIAS:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex T. or Anonymous"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    LOCATION:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leeds, UK"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  FOCUS / CATEGORY:
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Neurodivergent & Bipolar">Neurodivergent & Bipolar</option>
                  <option value="Panic & Sensory Overwhelm">Panic & Sensory Overwhelm</option>
                  <option value="Depression & Men’s Health">Depression & Men’s Health</option>
                  <option value="Grief & Rebirth">Grief & Rebirth</option>
                  <option value="Sobriety & Healing">Sobriety & Healing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  YOUR MESSAGE (WHAT HELPED YOU RISE FROM THE MADNESS?):
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell someone in the dark what helped you hold on..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
              >
                <Send className="h-4 w-4" />
                <span>Publish to Wall of Resilience</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
