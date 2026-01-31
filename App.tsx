import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Flame, 
  Trophy, 
  Clock, 
  LayoutGrid,
  Sigma,
  ChevronRight,
  Target,
  Terminal,
  Zap,
  Play,
  ArrowLeft,
  Maximize,
  Settings,
  Shield,
  Ghost,
  X,
  EyeOff,
  Sparkles
} from 'lucide-react';
import htm from 'htm';
import { GameCategory } from './types.ts';
import { GAMES } from './data/games.ts';
import { getGameGuide } from './services/geminiService.ts';

const html = htm.bind(React.createElement);

const SettingsModal = ({ isOpen, onClose, cloakEnabled, onToggleCloak }) => {
  if (!isOpen) return null;

  const launchStealth = () => {
    const url = window.location.href;
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("Popup blocked! Please allow popups to initialize Stealth Engine.");
      return;
    }
    const doc = win.document;
    doc.title = "Math Assignment - Unit 4";
    const iframe = doc.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    doc.body.style.margin = '0';
    doc.body.appendChild(iframe);
    window.location.replace("https://www.google.com/search?q=calculus+notes");
  };

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick=${onClose}></div>
      <div className="relative w-full max-w-xl glass-panel rounded-[2rem] border border-white/10 shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <${Settings} className="w-5 h-5 text-indigo-500" />
            Config
          </h2>
          <button onClick=${onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all">
            <${X} className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button onClick=${launchStealth} className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 transition-all text-left">
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Stealth Mode</h3>
              <p className="text-[10px] text-slate-400">Launch in blank tab and redirect current.</p>
            </div>
            <${Ghost} className="w-5 h-5 text-indigo-400" />
          </button>

          <button onClick=${onToggleCloak} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-white/5 transition-all text-left">
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Mask Identity</h3>
              <p className="text-[10px] text-slate-400">${cloakEnabled ? 'Active: about:blank' : 'Normal tab title'}</p>
            </div>
            <${EyeOff} className="w-5 h-5 text-indigo-400" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <${Shield} className="w-5 h-5 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Panic Protocol: [ESC]</span>
          </div>
        </div>
      </div>
    </div>
  `;
};

const Navbar = ({ onSearch, onOpenSettings }) => html`
  <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
    <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
      <${Link} to="/" className="flex items-center gap-3 shrink-0">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
          <${Sigma} className="w-5 h-5 text-white" />
        </div>
        <span className="font-orbitron text-lg font-black tracking-tighter text-white uppercase hidden sm:inline">Math Hub</span>
      <//>

      <div className="flex-1 max-w-xl relative">
        <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search modules..." 
          onInput=${(e) => onSearch(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200"
        />
      </div>

      <button onClick=${onOpenSettings} className="p-2 rounded-xl glass-panel border border-white/5 text-slate-400 hover:text-indigo-400 transition-all">
        <${Settings} className="w-5 h-5" />
      </button>
    </div>
  </nav>
`;

const HomePage = ({ games, searchQuery, activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Combat', icon: Flame },
    { id: GameCategory.STRATEGY, name: 'Tactical', icon: Target },
    { id: GameCategory.RETRO, name: 'Archive', icon: Clock },
  ];

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return html`
    <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-12 animate-in">
      <div className="flex flex-wrap gap-2">
        ${categories.map(cat => html`
          <button 
            onClick=${() => onCategoryChange(cat.id)}
            className=${`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border transition-all ${
              activeCategory === cat.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <${cat.icon} className="w-3 h-3" />
            ${cat.name}
          </button>
        `)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        ${filteredGames.map(game => html`
          <${Link} key=${game.id} to="/game/${game.id}" className="command-card flex flex-col glass-panel rounded-2xl overflow-hidden border border-white/5 group">
            <div className="aspect-video overflow-hidden">
              <img src="${game.thumbnail}" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">${game.title}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">${game.category}</p>
            </div>
          <//>
        `)}
      </div>
    </div>
  `;
};

const GameView = ({ games }) => {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const game = games.find(g => g.id === id);
  const [guide, setGuide] = useState('');

  useEffect(() => {
    if (game) {
      getGameGuide(game.title).then(setGuide);
    }
    window.scrollTo(0, 0);
  }, [game]);

  if (!game) return html`<div className="p-20 text-center uppercase tracking-widest opacity-50">Vector Invalid</div>`;

  return html`
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8 animate-in">
      <${Link} to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
        <${ArrowLeft} className="w-3 h-3" />
        Back to Directory
      <//>

      <div className="aspect-video w-full bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
        <iframe src="${game.url}" className="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="font-orbitron text-3xl font-black text-white uppercase tracking-tighter">${game.title}</h1>
          <p className="text-slate-400 leading-relaxed font-medium">${game.description}</p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/10 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <${Sparkles} className="w-4 h-4" />
            <h4 className="text-[10px] font-black uppercase tracking-widest">Tactical Briefing</h4>
          </div>
          <div className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
            ${guide || 'Calculating optimal strategy...'}
          </div>
        </div>
      </div>
    </div>
  `;
};

const MathHubApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cloakEnabled, setCloakEnabled] = useState(false);

  useEffect(() => {
    const handlePanic = (e) => {
      if (e.key === 'Escape') window.location.replace("https://www.google.com/search?q=calculus+notes");
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  const toggleCloak = () => {
    const val = !cloakEnabled;
    setCloakEnabled(val);
    document.title = val ? "about:blank" : "Math Hub | Command Center";
  };

  return html`
    <${Router}>
      <div className="min-h-screen flex flex-col">
        <${Navbar} onSearch=${setSearchQuery} onOpenSettings=${() => setIsSettingsOpen(true)} />
        <main className="flex-1">
          <${Routes}>
            <${Route} path="/" element=${html`<${HomePage} games=${GAMES} searchQuery=${searchQuery} activeCategory=${activeCategory} onCategoryChange=${setActiveCategory} />`} />
            <${Route} path="/game/:id" element=${html`<${GameView} games=${GAMES} />`} />
          <//>
        </main>
        <${SettingsModal} isOpen=${isSettingsOpen} onClose=${() => setIsSettingsOpen(false)} cloakEnabled=${cloakEnabled} onToggleCloak=${toggleCloak} />
      </div>
    <//>
  `;
};

export default MathHubApp;