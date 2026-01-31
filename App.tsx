import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  ExternalLink,
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
    const win = window.open();
    if (!win) {
      alert("Popup blocked! Please allow popups to initialize Stealth Engine.");
      return;
    }
    win.document.title = "about:blank";
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.backgroundColor = '#020617';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = url;
    win.document.body.appendChild(iframe);
    window.location.replace("https://start.dvusd.org/");
  };

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick=${onClose}></div>
      <div className="relative w-full max-w-xl glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl p-10 space-y-8 border border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <${Settings} className="w-5 h-5 text-indigo-500" />
            Config
          </h2>
          <button onClick=${onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <${X} className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3 text-indigo-400">
              <${Ghost} className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-widest">Stealth</h3>
            </div>
            <p className="text-[10px] text-slate-500">Launch in about:blank tab.</p>
            <button onClick=${launchStealth} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-[9px] uppercase tracking-widest transition-all active:scale-95">
              Launch Cloaked
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-slate-200">
              <${EyeOff} className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xs font-black uppercase tracking-widest">Masking</h3>
            </div>
            <p className="text-[10px] text-slate-500">Rename current tab.</p>
            <button onClick=${onToggleCloak} className=${`w-full py-3 font-black rounded-xl text-[9px] uppercase tracking-widest border transition-all active:scale-95 ${cloakEnabled ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-slate-400 border-white/10 hover:bg-white/5'}`}>
              ${cloakEnabled ? 'Mask Active' : 'Enable Mask'}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-red-400">
            <div className="flex items-center gap-3">
              <${Shield} className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-widest">Panic Key</h3>
            </div>
            <span className="text-[10px] opacity-60 bg-white/5 px-2 py-1 rounded border border-white/5 font-mono">[ESC]</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">Instant redirect to educational dashboard.</p>
        </div>
      </div>
    </div>
  `;
};

const Navbar = ({ onSearch, onOpenSettings }) => {
  return html`
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-12">
        <${Link} to="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-indigo-500/50 shadow-lg">
            <${Sigma} className="w-5 h-5 text-white" />
          </div>
          <span className="font-orbitron text-xl font-black tracking-tighter text-white uppercase hidden sm:inline">
            Math Hub
          </span>
        <//>

        <div className="flex-1 max-w-2xl relative">
          <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text" 
            placeholder="Search Modules..." 
            onInput=${(e) => onSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200"
          />
        </div>

        <button onClick=${onOpenSettings} className="p-2.5 rounded-xl glass-panel border border-white/5 text-slate-400 hover:text-indigo-400 transition-all active:scale-95 shadow-lg">
          <${Settings} className="w-5 h-5" />
        </button>
      </div>
    </nav>
  `;
};

const Sidebar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Directory', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Combat', icon: Flame },
    { id: GameCategory.PUZZLE, name: 'Spatial', icon: Trophy },
    { id: GameCategory.STRATEGY, name: 'Tactical', icon: Target },
    { id: GameCategory.RETRO, name: 'Archive', icon: Clock },
  ];

  return html`
    <aside className="w-64 hidden xl:block sticky top-24 h-fit">
      <div className="space-y-1">
        ${categories.map((cat) => html`
          <button
            key=${cat.id}
            onClick=${() => onCategoryChange(cat.id)}
            className=${`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeCategory === cat.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <${cat.icon} className="w-4 h-4" />
            ${cat.name}
          </button>
        `)}
      </div>
    </aside>
  `;
};

const HomePage = ({ games, searchQuery, activeCategory }) => {
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return html`
    <div className="space-y-12 animate-in">
      ${searchQuery === '' && activeCategory === 'all' && html`
        <header className="relative h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-12">
            <h1 className="font-orbitron text-5xl font-black text-white mb-6 uppercase tracking-tighter">Cognitive<br />Command</h1>
            <${Link} to="/game/kindergarten" className="w-fit px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 active:scale-95">
              Initialize
            <//>
          </div>
        </header>
      `}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
            <${Terminal} className="w-4 h-4 text-indigo-500" />
            Active Vectors
          </h2>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">${filteredGames.length} Found</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          ${filteredGames.map(game => html`
            <${Link} to="/game/${game.id}" className="group flex flex-col glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10">
              <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                <img src="${game.thumbnail}" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-orbitron text-sm font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">${game.title}</h3>
                <p className="text-[10px] text-slate-500 line-clamp-1 uppercase tracking-widest font-black">${game.category}</p>
              </div>
            <//>
          `)}
        </div>
      </section>
    </div>
  `;
};

const GameDetail = ({ games }) => {
  const { pathname } = useLocation();
  const gameId = pathname.split('/').pop();
  const game = useMemo(() => games.find(g => g.id === gameId), [games, gameId]);
  const [guide, setGuide] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (game) {
      setIsLoading(true);
      getGameGuide(game.title).then(res => {
        setGuide(res);
        setIsLoading(false);
      }).catch(() => {
        setGuide("Tactical briefing unavailable.");
        setIsLoading(false);
      });
    }
  }, [game]);

  if (!game) return html`<div className="p-20 text-center font-orbitron text-slate-500 tracking-widest">MODULE NOT FOUND</div>`;

  return html`
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in">
      <div className="aspect-video w-full bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative group">
        <iframe src="${game.url}" className="w-full h-full border-0" allowFullScreen allow="autoplay; fullscreen" />
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50">
            Interactive Session Active
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="font-orbitron text-4xl font-black text-white uppercase tracking-tighter">${game.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">${game.description}</p>
        </div>
        <div className="p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/10 space-y-4 h-fit">
          <h3 className="text-xs font-black text-indigo-400 flex items-center gap-3 uppercase tracking-[0.2em]">
            <${Sparkles} className="w-4 h-4" />
            AI Briefing
          </h3>
          <div className="text-[11px] text-slate-300 leading-relaxed font-medium bg-slate-900/40 p-4 rounded-xl border border-white/5">
            ${isLoading ? html`<div className="animate-pulse flex space-x-2">Decrypting tactics...</div>` : guide}
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
    const saved = localStorage.getItem('mathhub_cloak') === 'true';
    if (saved) {
      setCloakEnabled(true);
      document.title = "about:blank";
    }

    const handlePanic = (e) => {
      if (e.key === 'Escape') window.location.replace("https://start.dvusd.org/");
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  const toggleCloak = () => {
    const newVal = !cloakEnabled;
    setCloakEnabled(newVal);
    localStorage.setItem('mathhub_cloak', newVal.toString());
    document.title = newVal ? "about:blank" : "Math Hub | Command Center";
  };

  return html`
    <${Router}>
      <div className="min-h-screen flex flex-col bg-slate-950">
        <${Navbar} onSearch=${setSearchQuery} onOpenSettings=${() => setIsSettingsOpen(true)} />
        <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-12 flex gap-12">
          <${Sidebar} activeCategory=${activeCategory} onCategoryChange=${setActiveCategory} />
          <div className="flex-1 min-w-0">
            <${Routes}>
              <${Route} path="/" element=${html`<${HomePage} games=${GAMES} searchQuery=${searchQuery} activeCategory=${activeCategory} />`} />
              <${Route} path="/game/:id" element=${html`<${GameDetail} games=${GAMES} />`} />
            <//>
          </div>
        </main>
        <${SettingsModal} isOpen=${isSettingsOpen} onClose=${() => setIsSettingsOpen(false)} cloakEnabled=${cloakEnabled} onToggleCloak=${toggleCloak} />
      </div>
    <//>
  `;
};

export default MathHubApp;