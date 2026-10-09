import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FolderSync, 
  Mail, 
  MessageSquare, 
  FileSpreadsheet, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Send, 
  ExternalLink, 
  Download, 
  AlertCircle, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Bookmark, 
  Share2,
  Copy,
  Pin,
  FileDown
} from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';
import { saveSanctuaryNoteToFirestore, auth } from '../firebase';

export const WorkspaceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drive' | 'docs' | 'gmail' | 'chat' | 'forms' | 'tasks' | 'keep'>('drive');
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem('ps_workspace_token');
  });
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Keep state
  const [keepNotes, setKeepNotes] = useState<Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    pinned: boolean;
    timestamp: string;
  }>>(() => {
    const saved = localStorage.getItem('ps_keep_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return [
      {
        id: 'k1',
        title: 'Emergency Anchor Protocol',
        category: 'Crisis / Anchor',
        content: '1. Cold water on wrists & back of neck.\n2. 4-7-8 Breathing (inhale 4s, hold 7s, exhale 8s).\n3. Samaritans: 116 123 (UK, Free 24/7) or Text SHOUT to 85258.\n4. Remember: "Evolution, Not Erasure. The surge will crest."',
        pinned: true,
        timestamp: 'Active Anchor'
      },
      {
        id: 'k2',
        title: '528 Hz Healing Hz Reflection',
        category: 'Sound Therapy',
        content: 'Completed 15-minute 528 Hz Solfeggio session with binaural theta pulse. Heart rate stabilized, mental static dissolved. Returning to clarity.',
        pinned: false,
        timestamp: 'Sound Log'
      },
      {
        id: 'k3',
        title: 'Rise From Madness — Daily Affirmation',
        category: 'Mindset',
        content: '"You say I\'m mad — you just don\'t understand me." Turning pain into power. Love over money. Truth over noise. Leaving people better than I found them.',
        pinned: true,
        timestamp: 'Daily Truth'
      }
    ];
  });
  const [newKeepTitle, setNewKeepTitle] = useState('');
  const [newKeepContent, setNewKeepContent] = useState('');
  const [newKeepCategory, setNewKeepCategory] = useState('Grounding');
  const [isSyncingKeep, setIsSyncingKeep] = useState(false);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  const saveNotes = (updated: typeof keepNotes) => {
    setKeepNotes(updated);
    localStorage.setItem('ps_keep_notes', JSON.stringify(updated));
  };

  // Tasks state
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; completed: boolean }>>([
    { id: '1', title: '15-minute 528 Hz Solfeggio sound session', completed: true },
    { id: '2', title: 'Drink cold water & practice 4-7-8 Star Breathing', completed: false },
    { id: '3', title: 'Dissolve intrusive evening thought into The Void Jar', completed: false },
    { id: '4', title: 'Touch base with safe emergency anchor', completed: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isSyncingTasks, setIsSyncingTasks] = useState(false);

  // Drive state
  const [driveFiles, setDriveFiles] = useState<Array<{ id: string; name: string; modified: string }>>([
    { id: '1', name: 'My_Sanctuary_Safety_Plan_2026.json', modified: 'Synced today' },
    { id: '2', name: 'Pleading_Sanity_Grounding_Journal.doc', modified: 'Yesterday' }
  ]);
  const [isBackingUpDrive, setIsBackingUpDrive] = useState(false);

  // Docs state
  const [docTitle, setDocTitle] = useState('My Journey: Rising From Madness');
  const [docContent, setDocContent] = useState('Here I transcribe the pain into power. The nights when the room spun with static, and the morning I decided to keep breathing.');
  const [createdDocUrl, setCreatedDocUrl] = useState<string | null>(null);
  const [isExportingDoc, setIsExportingDoc] = useState(false);

  // Gmail state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('My Pleading Sanity Emergency Safety Protocol');
  const [emailBody, setEmailBody] = useState('Hi, I am sharing my personal sanctuary safety plan with you so you know how best to support me during high-static days.');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Chat state
  const [chatSpaceText, setChatSpaceText] = useState('Mindful check-in: Feeling grounded after the 528 Hz session tonight.');
  const [isPostingChat, setIsPostingChat] = useState(false);

  // Forms state
  const [selectedForm, setSelectedForm] = useState<'daily' | 'creator'>('daily');

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Connect Google Workspace with Token Client
  const handleAuthorizeWorkspace = () => {
    setIsAuthorizing(true);
    if ((window as any).google?.accounts?.oauth2) {
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: firebaseConfig.oAuthClientId,
        scope: [
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/documents',
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/chat.messages',
          'https://www.googleapis.com/auth/forms.body',
          'https://www.googleapis.com/auth/tasks'
        ].join(' '),
        callback: (response: any) => {
          setIsAuthorizing(false);
          if (response.access_token) {
            setAccessToken(response.access_token);
            sessionStorage.setItem('ps_workspace_token', response.access_token);
            showStatus('Google Workspace successfully connected.');
          } else {
            showStatus('Authorization was not completed.', 'error');
          }
        }
      });
      client.requestAccessToken();
    } else {
      setIsAuthorizing(false);
      showStatus('Google sign-in is unavailable. Workspace is not connected; configure Google Identity Services and the OAuth client ID first.', 'error');
    }
  };

  // Google Tasks Handlers
  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskInput.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskInput('');
    showStatus('Task added to your wellness list.');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleSyncGoogleTasks = () => {
    showStatus('Google Tasks sync is not connected yet. Your checklist remains available in this app.', 'error');
  };

  // Google Drive: Backup Safety Plan
  const handleBackupToDrive = async () => {
    showStatus('Google Drive backup is not connected yet. No cloud backup was created.', 'error');
  };

  // Google Docs: Export Document
  const handleExportDoc = async () => {
    showStatus('Google Docs export is not connected yet. No document was created.', 'error');
  };

  // Gmail: Send Reassurance Letter
  const handleSendGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail.trim()) {
      showStatus('Please specify recipient email address.', 'error');
      return;
    }
    showStatus('Gmail sending is not connected yet. No email was sent.', 'error');
  };

  // Chat: Send Space Message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatSpaceText.trim()) return;
    showStatus('Google Chat posting is not connected yet. No message was sent.', 'error');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-8">
      {/* Status Alert */}
      {statusMessage && (
        <div className={`rounded-xl border p-4 text-xs font-semibold flex items-center gap-2 ${
          statusMessage.type === 'success'
            ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
            : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
        }`}>
          {statusMessage.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>GOOGLE WORKSPACE SANCTUARY STATION</span>
            <span aria-hidden="true">·</span>
            <span>DRIVE · DOCS · GMAIL · CHAT · FORMS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Workspace Integration
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Seamlessly bridge your mental health sanctuary with your daily productivity tools. 
            Back up safety plans to Google Drive, publish reflections in Google Docs, dispatch emergency anchors via Gmail, and manage peer surveys via Google Forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {accessToken ? (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 text-xs text-emerald-300 font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Workspace Linked</span>
            </div>
          ) : (
            <button
              onClick={handleAuthorizeWorkspace}
              disabled={isAuthorizing}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-indigo-200" />
              <span>{isAuthorizing ? 'Connecting...' : 'Authorize Workspace'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Workspace Service Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'drive', label: 'Google Drive', icon: FolderSync, desc: 'Backup & Vault' },
          { id: 'docs', label: 'Google Docs', icon: FileText, desc: 'Healing Journals' },
          { id: 'gmail', label: 'Gmail', icon: Mail, desc: 'Emergency SOS' },
          { id: 'chat', label: 'Google Chat', icon: MessageSquare, desc: 'Peer Spaces' },
          { id: 'forms', label: 'Google Forms', icon: FileSpreadsheet, desc: 'Sanctuary Surveys' },
          { id: 'tasks', label: 'Google Tasks', icon: CheckSquare, desc: 'Wellness Routines' },
          { id: 'keep', label: 'Google Keep', icon: Bookmark, desc: 'Sanctuary Notes' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* --- Tab 1: Google Drive --- */}
      {activeTab === 'drive' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FolderSync className="h-5 w-5 text-indigo-400" />
              <h3 className="font-display text-base font-bold text-white">
                Backup Sanctuary Vault to Drive
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Create an encrypted cloud snapshot of your personal safety anchors, favorite Solfeggio sound configurations, and grounding notes directly in your Google Drive root folder.
            </p>

            <button
              onClick={handleBackupToDrive}
              disabled={isBackingUpDrive}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>{isBackingUpDrive ? 'Syncing to Drive...' : 'Run Backup to Google Drive'}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 space-y-4">
            <h3 className="font-display text-base font-bold text-white">
              Recent Files in Google Drive
            </h3>
            <div className="space-y-2">
              {driveFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-indigo-400" />
                    <div>
                      <div className="font-bold text-white font-mono">{file.name}</div>
                      <div className="text-[10px] text-slate-500">{file.modified}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">Synced</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Tab 2: Google Docs --- */}
      {activeTab === 'docs' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            <h3 className="font-display text-base font-bold text-white">
              Export Reflection to Google Docs
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Export your personal writings or resilience reflections into a formatted Google Document with one tap.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                DOCUMENT TITLE:
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                JOURNAL PROSE / TESTIMONY:
              </label>
              <textarea
                rows={5}
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleExportDoc}
                disabled={isExportingDoc}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isExportingDoc ? 'Exporting...' : 'Generate Google Doc'}</span>
              </button>

              {createdDocUrl && (
                <a
                  href={createdDocUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 underline font-mono"
                >
                  <span>Open in Google Docs</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Tab 3: Gmail --- */}
      {activeTab === 'gmail' && (
        <form onSubmit={handleSendGmail} className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-rose-400" />
            <h3 className="font-display text-base font-bold text-white">
              Dispatch Safety Protocol via Gmail
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Quickly transmit your grounding protocol and instructions to a designated safe contact or doctor directly from your Gmail account.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                TRUSTED RECIPIENT'S EMAIL:
              </label>
              <input
                type="email"
                required
                placeholder="friend@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                SUBJECT:
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                MESSAGE BODY:
              </label>
              <textarea
                rows={4}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingEmail}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20"
            >
              <Send className="h-4 w-4" />
              <span>{isSendingEmail ? 'Dispatching via Gmail...' : 'Send Safety Transmission'}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- Tab 4: Google Chat --- */}
      {activeTab === 'chat' && (
        <form onSubmit={handleSendChat} className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h3 className="font-display text-base font-bold text-white">
              Broadcast Check-In to Google Chat
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Publish an update or grounding accountability check to your private Google Chat space or peer circle.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                SPACE CHECK-IN TEXT:
              </label>
              <textarea
                rows={3}
                value={chatSpaceText}
                onChange={(e) => setChatSpaceText(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPostingChat}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <Send className="h-4 w-4" />
              <span>{isPostingChat ? 'Sending...' : 'Post to Google Chat Space'}</span>
            </button>
          </div>
        </form>
      )}

      {/* --- Tab 5: Google Forms --- */}
      {/* --- Tab 6: Google Tasks --- */}
      {activeTab === 'tasks' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 max-w-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-indigo-400" />
                <h3 className="font-display text-base font-bold text-white">
                  Google Tasks · Daily Wellness & Grounding Protocol
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Sync daily mental resilience routines and emergency grounding steps directly into your Google Tasks account.
              </p>
            </div>

            <button
              onClick={handleSyncGoogleTasks}
              disabled={isSyncingTasks}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50 whitespace-nowrap"
            >
              <Check className="h-3.5 w-3.5" />
              <span>{isSyncingTasks ? 'Syncing...' : 'Sync with Google Tasks'}</span>
            </button>
          </div>

          {/* Add New Task Form */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new grounding habit or wellness task..."
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </form>

          {/* Tasks List */}
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-400'
                    : 'border-slate-800 bg-slate-900/60 text-white'
                }`}
              >
                <div 
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    task.completed 
                      ? 'border-emerald-500 bg-emerald-600 text-white' 
                      : 'border-slate-700 bg-slate-800 text-transparent'
                  }`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className={`text-xs ${task.completed ? 'line-through text-slate-400' : 'font-medium'}`}>
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Delete task"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Tab 7: Google Keep --- */}
      {activeTab === 'keep' && (
        <div className="rounded-2xl border border-slate-800 bg-[#0c101c] p-6 max-w-4xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-amber-400" />
                <h3 className="font-display text-base font-bold text-white">
                  Google Keep · Sanctuary Notes & Reflection Anchors
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Capture quick calming mantras, sound therapy logs, and crisis de-escalation reflections, and export directly to Google Keep.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://keep.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                <span>Launch Google Keep</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Note Creation Form */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                COMPOSE NEW SANCTUARY NOTE
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] text-slate-400 mr-1">Templates:</span>
                <button
                  type="button"
                  onClick={() => {
                    setNewKeepTitle('🌟 Emergency Grounding Anchor');
                    setNewKeepCategory('Crisis / Anchor');
                    setNewKeepContent('1. Cold water on wrists.\n2. Inhale 4s, Hold 7s, Exhale 8s.\n3. Samaritans 116 123 (UK, Free 24/7) or Text SHOUT to 85258.\n4. "Evolution, Not Erasure. The surge will crest."');
                  }}
                  className="rounded bg-slate-800 px-2 py-1 text-[10px] text-amber-300 hover:bg-slate-700 font-medium"
                >
                  Anchor
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewKeepTitle('🎵 528 Hz Healing Hz Reflection');
                    setNewKeepCategory('Sound Therapy');
                    setNewKeepContent('15-min 528 Hz session: Noticed mental static quieting down. Breathing returned to steady belly rhythm.');
                  }}
                  className="rounded bg-slate-800 px-2 py-1 text-[10px] text-cyan-300 hover:bg-slate-700 font-medium"
                >
                  Sound Log
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewKeepTitle('⚔️ Daily Manifesto Mantra');
                    setNewKeepCategory('Mindset');
                    setNewKeepContent('"You say I\'m mad — you just don\'t understand me."\nTurn pain into power. Love over money. Truth over noise.');
                  }}
                  className="rounded bg-slate-800 px-2 py-1 text-[10px] text-indigo-300 hover:bg-slate-700 font-medium"
                >
                  Manifesto
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Note title (e.g. Grounding Anchor...)"
                value={newKeepTitle}
                onChange={(e) => setNewKeepTitle(e.target.value)}
                className="sm:col-span-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
              <select
                value={newKeepCategory}
                onChange={(e) => setNewKeepCategory(e.target.value)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
              >
                <option value="Crisis / Anchor">Crisis / Anchor</option>
                <option value="Sound Therapy">Sound Therapy</option>
                <option value="Mindset">Mindset</option>
                <option value="Streetwear Vision">Streetwear Vision</option>
                <option value="General Sanctuary">General Sanctuary</option>
              </select>
            </div>

            <textarea
              rows={3}
              placeholder="Write your reflection, grounding anchor, or personal mantra..."
              value={newKeepContent}
              onChange={(e) => setNewKeepContent(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!newKeepTitle.trim() || !newKeepContent.trim()}
                  onClick={async () => {
                    if (!newKeepTitle.trim() || !newKeepContent.trim()) return;
                    const newNote = {
                      id: Date.now().toString(),
                      title: newKeepTitle.trim(),
                      category: newKeepCategory,
                      content: newKeepContent.trim(),
                      pinned: false,
                      timestamp: 'Just now'
                    };
                    // Save locally first, then report cloud sync honestly.
                    saveNotes([newNote, ...keepNotes]);
                    const user = auth.currentUser;
                    let cloudSynced = false;
                    if (user) {
                      try {
                        await saveSanctuaryNoteToFirestore({
                          title: newNote.title,
                          category: newNote.category,
                          content: newNote.content,
                          userId: user.uid,
                          pinned: false
                        });
                        cloudSynced = true;
                      } catch (error) {
                        console.error('Sanctuary note cloud sync failed:', error);
                      }
                    }

                    // Reset inputs
                    setNewKeepTitle('');
                    setNewKeepContent('');
                    if (!user) {
                      showStatus('Note saved on this device. Sign in to enable cloud sync.', 'error');
                    } else if (cloudSynced) {
                      showStatus('Note saved on this device and synced to your account.');
                    } else {
                      showStatus('Note saved on this device, but cloud sync failed. It has not synced to your other devices.', 'error');
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-black hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Save to Sanctuary</span>
                </button>

                <button
                  type="button"
                  disabled={!newKeepContent.trim()}
                  onClick={() => {
                    const textToExport = `${newKeepTitle ? newKeepTitle + '\n\n' : ''}${newKeepContent}\n\n— Pleading Sanity (pleadingsanity.co.uk)`;
                    navigator.clipboard.writeText(textToExport);
                    const keepUrl = `https://keep.google.com/#NOTE/new?text=${encodeURIComponent(textToExport)}`;
                    window.open(keepUrl, '_blank');
                    showStatus('Copied to clipboard & opened in Google Keep!');
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-900/40 disabled:opacity-50"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Save Directly to Google Keep</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                {keepNotes.length} sanctuary notes saved
              </span>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center justify-between">
              <span>SAVED NOTES & ANCHORS</span>
              <span className="text-[10px] text-slate-500 font-normal">Push to Google Keep or Cloud Drive anytime</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keepNotes.map((note) => (
                <div
                  key={note.id}
                  className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                    note.pinned
                      ? 'border-amber-500/40 bg-amber-950/15'
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                          {note.category}
                        </span>
                        <h5 className="font-display text-sm font-bold text-white mt-1.5">
                          {note.title}
                        </h5>
                      </div>
                      <button
                        onClick={() => {
                          const updated = keepNotes.map((n) =>
                            n.id === note.id ? { ...n, pinned: !n.pinned } : n
                          );
                          saveNotes(updated);
                        }}
                        className={`p-1 rounded transition-colors ${
                          note.pinned ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={note.pinned ? 'Unpin note' : 'Pin note'}
                      >
                        <Pin className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-4">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3 mt-3">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {note.timestamp}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Push to Google Keep */}
                      <button
                        onClick={() => {
                          const text = `${note.title}\n\n${note.content}\n\n— Pleading Sanity (pleadingsanity.co.uk)`;
                          navigator.clipboard.writeText(text);
                          const keepUrl = `https://keep.google.com/#NOTE/new?text=${encodeURIComponent(text)}`;
                          window.open(keepUrl, '_blank');
                          showStatus('Note copied & opened in Google Keep!');
                        }}
                        className="flex items-center gap-1 rounded bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/30"
                        title="Push to Google Keep"
                      >
                        <Bookmark className="h-3 w-3" />
                        <span>Keep</span>
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => {
                          const text = `${note.title}\n\n${note.content}`;
                          navigator.clipboard.writeText(text);
                          setCopiedNoteId(note.id);
                          setTimeout(() => setCopiedNoteId(null), 2000);
                          showStatus('Note text copied to clipboard!');
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Copy note"
                      >
                        {copiedNoteId === note.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          const updated = keepNotes.filter((n) => n.id !== note.id);
                          saveNotes(updated);
                          showStatus('Note deleted.');
                        }}
                        className="p-1 rounded text-slate-500 hover:text-rose-400"
                        title="Delete note"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
