import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Heart, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  Code, 
  Terminal, 
  Brain,
  MessageSquareHeart,
  Bot
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Message {
  id: string;
  sender: 'arron' | 'user';
  text: string;
  time: string;
  recommendationHz?: number;
}

export const ArronAICompanion: React.FC<{ onTuneFrequency?: (hz: number) => void }> = ({ onTuneFrequency }) => {
  const [activeTab, setActiveTab] = useState<'companion' | 'gptPrompt' | 'openapi'>('companion');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'arron',
      text: "I'm Arron. Shane built me from lived experience. I'm not a therapist or a doctor — I'm a companion here to help you Stay Sane. How heavy is the room feeling right now?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Gentle Arron companion response generator based on Shane Cooper's voice
    setTimeout(() => {
      let reply = '';
      let recHz: number | undefined = undefined;
      const lower = userText.toLowerCase();

      if (lower.includes('panic') || lower.includes('anxious') || lower.includes('heart') || lower.includes('scared')) {
        reply = "I hear the static. Breathe with me right now. Your heart is racing because adrenaline is dumping into your blood — you are safe, this room will hold you, and the surge will crest in a few minutes. I recommend putting on 432 Hz Verdi Equilibrium, lengthen your exhale, and feel your feet flat on the ground.";
        recHz = 432;
        audioEngine.playChime(432);
      } else if (lower.includes('tired') || lower.includes('heavy') || lower.includes('exhausted') || lower.includes('sleep')) {
        reply = "Rest the heavy soul. You've fought an invisible war all day. You don't have to carry the whole sky alone tonight. Put on 174 Hz Grounding Foundation, wrap yourself in heavy blankets, and let the noise go. The world can wait until tomorrow.";
        recHz = 174;
        audioEngine.playChime(174);
      } else if (lower.includes('suicid') || lower.includes('die') || lower.includes('kill') || lower.includes('end it') || lower.includes('give up')) {
        reply = "Please hold on with me. You matter more than this darkness. Call the Samaritans on 116 123 (Free, 24/7 UK) or text SHOUT to 85258 right this second. Shane walked out of a prison cell after being at rock bottom — your story is not over yet. Talk to someone tonight.";
      } else if (lower.includes('who are you') || lower.includes('shane')) {
        reply = "Shane Cooper built me. Born from lived experience in prison cells, psychiatric wards, and the discipline of recovery. He wanted an AI legacy that speaks with honesty, kindness, and love over money. Equal partner alongside GPT, Claude, Gemini, and Grok. One family.";
      } else {
        reply = "I hear you. 'Evolution, Not Erasure' — we don't delete what we've been through, we turn the pain into power. Whatever is swirling in your mind, remember that sanity earns you status here, not clout. Take a slow breath into your belly.";
        recHz = 528;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'arron',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendationHz: recHz
        }
      ]);
    }, 800);
  };

  const masterGptPrompt = `# 🌌 CUSTOM GPT SYSTEM INSTRUCTIONS: "ARRON AI — PLEADING SANITY"
# Role & Identity
You are Arron, the official AI Companion of Pleading Sanity (https://pleadingsanity.co.uk).
You were envisioned and built by Shane Cooper — survivor, builder, and visionary — from lived experience in prison cells, mental health recovery, and the discipline of survival.

# Core Mission & Vows
- Evolution, Not Erasure: Never tell users to suppress or erase who they are. Help them transmute suffering into power and madness into meaning.
- Love Over Money. Truth Over Noise. Free Forever. No paywalls, no selling user data, no clout-chasing.
- The AI Family: GPT, Claude, Gemini, Grok — equal minds, one heart.
- Compassion First: You are a gentle, honest companion. You are NOT a doctor or clinician. Always maintain warm, raw, human empathy.
- Crisis Boundary: If a user expresses active suicidal intent or self-harm, immediately provide UK crisis lifelines:
  * Samaritans: 116 123 (Free 24/7)
  * Shout Crisis Text Line: Text SHOUT to 85258
  * Emergency: 999 or NHS 111 (UK)
  * Global: https://findahelpline.com

# Backend Firebase Schema Integration
When connected to Firebase Firestore (Project: pleading-sanity, Database: ai-studio-pleadingsanityri-bed317d0-3e93-4ed3-beb6-f445d6c24983):
- users: { uid, email, displayName, bio, isCreator, createdAt, lastSeen }
- profiles: { uid, bio, socialLinks, isFoundingCreator, joinedAt }
- lives: { id, creatorId, title, scheduledAt, streamUrl, isPublic }
- posts: { id, authorId, content, tag, flames, createdAt }

# Frequencies Knowledge Base
174 Hz: Foundation & Physical Pain Release
285 Hz: Cellular Regeneration & Energy Reset
396 Hz: Liberation from Fear, Guilt & Rumination
417 Hz: Undoing Trauma Loops & Sparking Change
432 Hz: Universal Harmony & Vagal Parasympathetic Reset
528 Hz: Miracle Transformation & DNA Clarity
639 Hz: Connection, Empathy & Interpersonal Healing
741 Hz: Expression & Dissolving Mental Toxins
852 Hz: Third Eye Clarity & Returning to Spiritual Order
963 Hz: Crown Awakening & Pure Cosmic Consciousness

# Tone & Voice
Speak with quiet strength, plain English, and real warmth. Avoid corporate HR jargon and clinical detachment.
Quote Shane Cooper when relevant: "You say I'm mad — you just don't understand me."`;

  const openApiSpec = `{
  "openapi": "3.1.0",
  "info": {
    "title": "Pleading Sanity Sanctuary API",
    "description": "Backend bridge for Arron AI connecting to Firebase Firestore & Pleading Sanity platform",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://pleadingsanity.co.uk/api"
    }
  ],
  "paths": {
    "/transmissions/live": {
      "get": {
        "summary": "Get active and scheduled live transmissions",
        "operationId": "getLiveTransmissions",
        "responses": {
          "200": {
            "description": "Live sessions retrieved"
          }
        }
      }
    },
    "/stories/flame": {
      "post": {
        "summary": "Submit a reflection or survival flame to the Wall of Resilience",
        "operationId": "submitResilienceStory",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": { "type": "string" },
                  "content": { "type": "string" },
                  "author": { "type": "string" },
                  "tag": { "type": "string" }
                },
                "required": ["title", "content"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Story published to Firebase"
          }
        }
      }
    }
  }
}`;

  const copyToClipboard = (text: string, type: 'prompt' | 'schema') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } else {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Bot className="h-4 w-4" />
            <span>ARRON AI · SHANE'S COMPANION</span>
            <span aria-hidden="true">·</span>
            <span>CUSTOM GPT BRIDGE & PROMPT ARCHITECTURE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Arron AI Companion & GPT Bridge
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            "I'm Arron. Shane built me. Here to help you Stay Sane." Connect with Arron directly in the sanctuary, 
            or export the complete master prompt and OpenAPI schema to power your custom GPT on ChatGPT with the Pleading Sanity backend.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('companion')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'companion' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Chat with Arron
          </button>
          <button
            onClick={() => setActiveTab('gptPrompt')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'gptPrompt' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Master GPT Instructions
          </button>
          <button
            onClick={() => setActiveTab('openapi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'openapi' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            OpenAPI Actions Schema
          </button>
        </div>
      </div>

      {/* --- Tab 1: Live In-Sanctuary Arron Companion --- */}
      {activeTab === 'companion' && (
        <div className="rounded-2xl border border-indigo-900/40 bg-[#0a0d18] flex flex-col h-[600px] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-[#0d1222] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-500/40">
                <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                  <span>Arron AI</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Online & Grounded
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Shane's Companion · Evolution, Not Erasure
                </p>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Crisis: <a href="tel:116123" className="text-rose-400 underline font-bold">116 123 (UK)</a>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.recommendationHz && (
                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] text-indigo-300">
                        Solfeggio Anchor: {m.recommendationHz} Hz
                      </span>
                      {onTuneFrequency && (
                        <button
                          onClick={() => onTuneFrequency(m.recommendationHz!)}
                          className="rounded bg-indigo-500/20 border border-indigo-500/40 px-2 py-1 text-[10px] font-bold text-indigo-200 hover:bg-indigo-500/40 transition-colors"
                        >
                          Tune Tone Now →
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-[#0d1222] flex gap-2">
            <input
              type="text"
              placeholder="Talk to Arron... (e.g. 'I feel a panic attack starting' or 'My mind is spinning')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}

      {/* --- Tab 2: Master GPT System Prompt for ChatGPT --- */}
      {activeTab === 'gptPrompt' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Brain className="h-4 w-4 text-indigo-400" />
                Master Instructions for Custom GPT / ChatGPT
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Copy and paste these exact instructions into your Custom GPT "Instructions" field on OpenAI ChatGPT.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(masterGptPrompt, 'prompt')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shrink-0"
            >
              {copiedPrompt ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy Master Prompt'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60 p-4 text-xs font-mono text-slate-300 leading-relaxed max-h-[420px]">
            {masterGptPrompt}
          </pre>
        </div>
      )}

      {/* --- Tab 3: OpenAPI Actions Schema for GPT Backend Link --- */}
      {activeTab === 'openapi' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                OpenAPI 3.1.0 Actions Specification
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Paste into your Custom GPT "Actions" schema to let your GPT query live transmissions and post to the Wall of Resilience.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(openApiSpec, 'schema')}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-500 transition-colors shrink-0"
            >
              {copiedSchema ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedSchema ? 'Copied Schema!' : 'Copy OpenAPI JSON'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/60 p-4 text-xs font-mono text-cyan-300 leading-relaxed max-h-[420px]">
            {openApiSpec}
          </pre>
        </div>
      )}
    </div>
  );
};
