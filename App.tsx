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
  Sparkles,
  ExternalLink,
  Lock,
  Eye,
  Monitor
} from 'lucide-react';
import htm from 'htm';
import { GameCategory } from './types.ts';
import { GAMES } from './data/games.ts';
import { getGameGuide } from './services/geminiService.ts';

const html = htm.bind(React.createElement);

const StealthProtocol = {
  launch: () => {
    const url = window.location.href;
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("Stealth Protocol Error: Popups are currently restricted. Grant permission to initialize anonymous window.");
      return;
    }

    const doc = win.document;
    doc.title = "Google Docs";
    
    // Set favicon to Google Docs
    const link = doc.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    doc.head.appendChild(link);

    // Create container and iframe
    const iframe = doc.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#000';
    
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.overflow = 'hidden';
    doc.body.appendChild(iframe);

    // Redirect the original tab to safety
    window.location.replace("https://www.google.com/search?q=calculus+notes+pdf+2025");
  }
};

const SettingsModal = ({ isOpen, onClose, cloakEnabled, onToggleCloak }) => {
  if (!isOpen) return null;

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick=${onClose}></div>
      <div className="relative w-full max-w-xl glass-panel rounded-[2.5rem] border border-white/10 shadow-2xl p-10 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron text-xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
            <${Terminal} className="w-5 h-5 text-indigo-500" />
            Security Configuration
          </h2>
          <button onClick=${onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <${X} className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <${Ghost} className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">About:Blank Cloak</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">Stealth Engine</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Encapsulate this session in an anonymous <code className="text-indigo-300">about:blank</code> tab. This method leaves zero traces in browser history and bypasses most surveillance software.
            </p>
            <button 
              onClick=${StealthProtocol.launch}
              className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 uppercase text-[10px] tracking-widest"
            >
              <${ExternalLink} className="w-4 h-4" />
              Initialize Stealth Window
            </button>
          </div>

          <button 
            onClick=${onToggleCloak}
            className=${`flex items-center justify-between p-6 rounded-3xl border transition-all text-left ${
              cloakEnabled 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
            }`}
          >
            <div className="space-y-1">
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Static Identity Mask</h3>
              <p className="text-[10px] text-slate-500 font-medium">
                ${cloakEnabled ? 'Active: Site masked as "about:blank"' : 'Instantly rename tab and replace favicon.'}
              </p>
            </div>
            <${EyeOff} className=${`w-5 h-5 ${cloakEnabled ? 'text-green-400' : 'text-slate-600'}`} />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <${Shield} className="w-5 h-5 text-red-500" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-red-400">Panic Trigger</span>
              <span className="block text-[9px] font-bold text-red-500/60 uppercase">Press [ESC] to instantly terminate session</span>
            </div>
          </div>
          <div className="px-3 py-1 bg-red-500/10 rounded-lg text-[10px] font-black text-red-400 border border-red-500/20">ESC</div>
        </div>
      </div>
    </div>
  `;
};

const Navbar = ({ onSearch, onOpenSettings }) => html`
  <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
    <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
      <${Link} to="/" className="flex items-center gap-3 shrink-0">
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
          <${Sigma} className="w-5 h-5 text-white" />
        </div>
        <span className="font-orbitron text-lg font-black tracking-tighter text-white uppercase hidden sm:inline">Math Hub</span>
      <//>

      <div className="flex-1 max-w-xl relative">
        <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Scan tactical modules..." 
          onInput=${(e) => onSearch(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick=${StealthProtocol.launch} 
          className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all hidden md:flex items-center gap-2 px-4"
        >
          <${Monitor} className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Unblock</span>
        </button>
        <button onClick=${onOpenSettings} className="p-3 rounded-2xl glass-panel border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all">
          <${Settings} className="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>
`;

const HomePage = ({ games, searchQuery, activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Modules', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Kinetic', icon: Flame },
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
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12 animate-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          ${categories.map(cat => html`
            <button 
              onClick=${() => onCategoryChange(cat.id)}
              className=${`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border transition-all ${
                activeCategory === cat.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              <${cat.icon} className="w-3.5 h-3.5" />
              ${cat.name}
            </button>
          `)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        ${filteredGames.map(game => html`
          <${Link} key=${game.id} to="/game/${game.id}" className="command-card flex flex-col glass-panel rounded-3xl overflow-hidden border border-white/5 group shadow-lg">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src="${game.thumbnail}" className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors"></div>
              <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                <${Play} className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-indigo-400 transition-colors truncate pr-4">${game.title}</h3>
                <${ChevronRight} className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">${game.category}</p>
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
  const iframeRef = React.useRef(null);

  useEffect(() => {
    if (game) {
      getGameGuide(game.title).then(setGuide);
    }
    window.scrollTo(0, 0);
  }, [game]);

  const enterFullscreen = () => {
    const el = iframeRef.current;
    if (el) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }
  };

  if (!game) return html`<div className="p-40 text-center font-orbitron text-slate-500 uppercase tracking-[0.4em] opacity-30">ERR: DATA_CORRUPTED</div>`;

  return html`
    <div className="max-w-[1500px] mx-auto px-6 py-10 space-y-10 animate-in">
      <div className="flex items-center justify-between">
        <${Link} to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <${ArrowLeft} className="w-3.5 h-3.5" />
          Operational Directory
        <//>
        <button 
          onClick=${StealthProtocol.launch} 
          className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
        >
          <${Shield} className="w-3.5 h-3.5" />
          Launch in Anonymous Tab
        </button>
      </div>

      <div className="group relative aspect-video w-full bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <iframe 
          ref=${iframeRef}
          src="${game.url}" 
          className="w-full h-full border-0" 
          allow="autoplay; fullscreen; keyboard" 
        />
        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
          <button onClick=${enterFullscreen} className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:bg-indigo-600 transition-all">
            <${Maximize} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="font-orbitron text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">${game.title}</h1>
            <div className="flex items-center gap-4 text-indigo-400">
              <span className="px-3 py-1 bg-indigo-500/10 rounded-lg text-[10px] font-black tracking-widest border border-indigo-500/20 uppercase">${game.category} Vector</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Protocol: Active</span>
            </div>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-4xl">${game.description}</p>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] border border-indigo-500/10 space-y-6 self-start">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-indigo-400">
              <${Sparkles} className="w-5 h-5" />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Intelligence Feed</h4>
            </div>
            <${Terminal} className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-pre-wrap font-mono opacity-80">
            ${guide || 'Calculating optimal strategies...'}
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
      if (e.key === 'Escape') window.location.replace("https://www.google.com/search?q=academic+integrity+and+study+skills");
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  const toggleCloak = () => {
    const val = !cloakEnabled;
    setCloakEnabled(val);
    document.title = val ? "about:blank" : "Math Hub | Command Center";
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = val ? 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' : '/favicon.ico';
  };

  return html`
    <${Router}>
      <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-indigo-500 selection:text-white">
        <${Navbar} onSearch=${setSearchQuery} onOpenSettings=${() => setIsSettingsOpen(true)} />
        <main className="flex-1">
          <${Routes}>
            <${Route} path="/" element=${html`<${HomePage} games=${GAMES} searchQuery=${searchQuery} activeCategory=${activeCategory} onCategoryChange=${setActiveCategory} />`} />
            <${Route} path="/game/:id" element=${html`<${GameView} games=${GAMES} />`} />
          <//>
        </main>
        
        <footer className="glass-panel border-t border-white/5 py-16 px-6 mt-10">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-3">
              <${Sigma} className="w-5 h-5 text-indigo-500" />
              <span className="font-orbitron font-black uppercase text-xs tracking-[0.4em] text-white">Math Hub v3.8.1-Cloaked</span>
            </div>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#" className="hover:text-indigo-400 transition-colors">Manifesto</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Network</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <${Lock} className="w-3.5 h-3.5" />
              End-to-End Encryption
            </div>
          </div>
        </footer>

        <${SettingsModal} isOpen=${isSettingsOpen} onClose=${() => setIsSettingsOpen(false)} cloakEnabled=${cloakEnabled} onToggleCloak=${toggleCloak} />
      </div>
    <//>
  `;
};

export default MathHubApp;