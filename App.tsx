import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Flame, 
  Clock, 
  LayoutGrid,
  Sigma,
  ChevronRight,
  Target,
  Terminal,
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
  Monitor,
  Activity,
  Cpu,
  CheckCircle2,
  Zap,
  Layers,
  Wind,
  Trash2,
  RefreshCw,
  Sun
} from 'lucide-react';
import htm from 'htm';
import { GameCategory } from './types.ts';
import { GAMES } from './data/games.ts';
import { getGameGuide } from './services/geminiService.ts';

const html = htm.bind(React.createElement);

const PANIC_URL = "https://www.google.com/search?q=calculus+problem+solving+techniques+2025";

const StealthProtocol = {
  launch: () => {
    const url = window.location.href;
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("Stealth Protocol Blocked: Please enable popups to initialize the anonymous uplink.");
      return;
    }

    const doc = win.document;
    doc.title = "Google Docs";
    
    const link = doc.createElement('link') as HTMLLinkElement;
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
    doc.head.appendChild(link);

    const iframe = doc.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#020617';
    
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.overflow = 'hidden';
    doc.body.appendChild(iframe);

    setTimeout(() => {
      window.location.replace(PANIC_URL);
    }, 150);
  }
};

const SettingsView = ({ cloakEnabled, onToggleCloak, performanceSettings, onUpdatePerformance }) => {
  return html`
    <div className="space-y-12 animate-in max-w-4xl">
      <div className="space-y-2">
        <h2 className="font-orbitron text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
          <${Settings} className="w-8 h-8 text-indigo-500" />
          System Configuration
        </h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Global Operational Parameters & Optimization</p>
      </div>

      <!-- SECTION: SECURITY -->
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] flex items-center gap-2">
          <${Shield} className="w-3 h-3" />
          01 // Security Uplink
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 space-y-6">
            <div className="flex items-center gap-4 text-indigo-400">
              <${Ghost} className="w-6 h-6" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Anonymous Shell</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Initialize an isolated about:blank wrapper. This process clears the current tab's history and masks the URL from local surveillance.
            </p>
            <button 
              onClick=${StealthProtocol.launch}
              className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-600/20"
            >
              <${ExternalLink} className="w-4 h-4" />
              Execute Stealth Mode
            </button>
          </div>

          <button 
            onClick=${onToggleCloak}
            className=${`flex flex-col justify-between p-8 rounded-[2rem] border transition-all text-left ${
              cloakEnabled 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-8">
              <${EyeOff} className=${`w-6 h-6 ${cloakEnabled ? 'text-green-400' : 'text-slate-600'}`} />
              <div className=${`w-12 h-6 rounded-full relative transition-colors ${cloakEnabled ? 'bg-green-500' : 'bg-slate-700'}`}>
                <div className=${`absolute top-1.5 w-3 h-3 bg-white rounded-full transition-all ${cloakEnabled ? 'left-7' : 'left-2'}`}></div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Metadata Obfuscation</h3>
              <p className="text-xs text-slate-500 font-medium">Instantly mask tab identity as "Google Docs".</p>
            </div>
          </button>
        </div>
      </div>

      <!-- SECTION: PERFORMANCE -->
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] flex items-center gap-2">
          <${Zap} className="w-3 h-3" />
          02 // Neural Tuning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick=${() => onUpdatePerformance('gpuBoost', !performanceSettings.gpuBoost)}
            className=${`flex flex-col p-8 rounded-[2rem] border transition-all text-left ${
              performanceSettings.gpuBoost ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
            }`}
          >
            <${Cpu} className=${`w-6 h-6 mb-6 ${performanceSettings.gpuBoost ? 'text-indigo-400' : 'text-slate-600'}`} />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">GPU Uplink</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed">Prioritize hardware acceleration for game modules.</p>
          </button>

          <button 
            onClick=${() => onUpdatePerformance('lowActivity', !performanceSettings.lowActivity)}
            className=${`flex flex-col p-8 rounded-[2rem] border transition-all text-left ${
              performanceSettings.lowActivity ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
            }`}
          >
            <${Wind} className=${`w-6 h-6 mb-6 ${performanceSettings.lowActivity ? 'text-indigo-400' : 'text-slate-600'}`} />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Hub Throttle</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed">Deactivate background animations during active sessions.</p>
          </button>

          <button 
            onClick=${() => onUpdatePerformance('ultraLight', !performanceSettings.ultraLight)}
            className=${`flex flex-col p-8 rounded-[2rem] border transition-all text-left ${
              performanceSettings.ultraLight ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-900/50 border-white/5 hover:bg-white/5'
            }`}
          >
            <${Sun} className=${`w-6 h-6 mb-6 ${performanceSettings.ultraLight ? 'text-indigo-400' : 'text-slate-600'}`} />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Ultra Light</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed">Strip expensive blurs and shadows for extreme FPS stability.</p>
          </button>
        </div>
      </div>

      <!-- SECTION: SYSTEM -->
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] flex items-center gap-2">
          <${Activity} className="w-3 h-3" />
          03 // System Maintenance
        </h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick=${() => { localStorage.clear(); window.location.reload(); }}
            className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500/10 transition-all uppercase text-[10px] font-black tracking-widest"
          >
            <${Trash2} className="w-5 h-5" />
            Wipe System Cache
          </button>
          <button 
            onClick=${() => window.location.reload()}
            className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest"
          >
            <${RefreshCw} className="w-5 h-5" />
            Full System Reset
          </button>
        </div>
      </div>
    </div>
  `;
};

const Navbar = ({ onSearch }) => html`
  <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
    <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
      <${Link} to="/" className="flex items-center gap-3 shrink-0">
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg transition-transform hover:rotate-12">
          <${Sigma} className="w-5 h-5 text-white" />
        </div>
        <span className="font-orbitron text-lg font-black tracking-tighter text-white uppercase hidden sm:inline">Math Hub</span>
      <//>

      <div className="flex-1 max-w-xl relative group">
        <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Scan modules..." 
          onInput=${(e) => onSearch(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <${Link} to="/settings" className="p-3 rounded-2xl glass-panel border border-white/5 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all group">
          <${Settings} className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        <//>
      </div>
    </div>
  </nav>
`;

const Sidebar = () => {
  const location = useLocation();
  const categories = [
    { id: 'all', name: 'Modules', icon: LayoutGrid, path: '/' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return html`
    <aside className="w-64 hidden xl:block sticky top-24 h-[calc(100vh-8rem)] pr-6 space-y-10">
      <div className="space-y-1">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">Navigation</p>
        ${categories.map(cat => html`
          <${Link} 
            to="${cat.path}" 
            className=${`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
              location.pathname === cat.path 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <${cat.icon} className="w-4 h-4" />
            ${cat.name}
          <//>
        `)}
      </div>

      <div className="pt-10 border-t border-white/5 space-y-4">
        <div className="px-4 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Operational</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] font-bold text-slate-500">Live</span>
          </div>
        </div>
        <div className="p-5 glass-panel rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-500">Core Health</span>
            <span className="text-indigo-400">Stable</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-indigo-500 shadow-[0_0_8px_#6366f1]"></div>
          </div>
        </div>
      </div>
    </aside>
  `;
};

const HomePage = ({ games, searchQuery }) => {
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [games, searchQuery]);

  return html`
    <div className="animate-in space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Operational Modules</h2>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Baseline Logic Systems Online</p>
        </div>
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 py-2 glass-panel rounded-lg border border-white/5">
          ${filteredGames.length} Active Nodes
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        ${filteredGames.map(game => html`
          <${Link} key=${game.id} to="/game/${game.id}" className="command-card flex flex-col glass-panel rounded-3xl overflow-hidden border border-white/5 group shadow-lg">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src="${game.thumbnail}" className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors"></div>
              <div className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                <${Play} className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-orbitron text-sm font-bold text-white group-hover:text-indigo-400 transition-colors truncate pr-4">${game.title}</h3>
                <${ChevronRight} className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 transition-all" />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">${game.category}</p>
            </div>
          <//>
        `)}
      </div>
    </div>
  `;
};

const GameView = ({ games, performanceSettings }) => {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const game = games.find(g => g.id === id);
  const [guide, setGuide] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [operationalPhase, setOperationalPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const phases = [
    { text: 'Syncing core...', icon: Activity },
    { text: 'Decrypting...', icon: Lock },
    { text: 'Bypassing...', icon: Shield },
    { text: 'Ready.', icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (game) {
      getGameGuide(game.title).then(setGuide);
      setIsLoading(true);
      setOperationalPhase(0);
      setProgress(0);
    }
    window.scrollTo(0, 0);

    const phaseInterval = setInterval(() => {
      setOperationalPhase(prev => {
        if (prev < phases.length - 1) {
          const next = prev + 1;
          setProgress((next / (phases.length - 1)) * 90);
          return next;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(phaseInterval);
  }, [game]);

  const enterFullscreen = () => {
    const el = iframeRef.current;
    if (el) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
    }
  };

  const handleLoad = () => {
    setOperationalPhase(phases.length - 1);
    setProgress(100);
    setTimeout(() => setIsLoading(false), 400);
  };

  if (!game) return html`<div className="p-40 text-center font-orbitron text-slate-500 uppercase tracking-widest opacity-30">ERR: DATA_CORRUPTED</div>`;

  return html`
    <div className=${`max-w-[1500px] mx-auto px-6 py-10 space-y-10 animate-in transition-opacity duration-1000 ${isFocused ? 'opacity-90' : 'opacity-100'}`}>
      <div className=${`flex items-center justify-between transition-all duration-700 ${isFocused ? 'opacity-10 translate-y--4 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <${Link} to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <${ArrowLeft} className="w-3.5 h-3.5" />
          Return to Hub
        <//>
        <button onClick=${() => setIsFocused(!isFocused)} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white flex items-center gap-2 px-4 py-2 glass-panel rounded-xl border border-indigo-500/10">
          <${Layers} className="w-3.5 h-3.5" />
          ${isFocused ? 'Disable Focus' : 'Focus Mode'}
        </button>
      </div>

      <div className=${`group relative aspect-video w-full bg-slate-950 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl ${performanceSettings.gpuBoost ? 'gpu-uplink' : ''}`}>
        <div className=${`absolute inset-0 bg-[#020617] flex flex-col items-center justify-center z-40 transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="relative mb-12">
            <div className="w-32 h-32 border-[1px] border-indigo-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 m-auto w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-4 text-center w-full max-w-xs">
            <h2 className="font-orbitron text-xs font-black uppercase tracking-widest text-white">
              ${phases[operationalPhase].text}
            </h2>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-700 shadow-[0_0_10px_#6366f1]" style=${{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <iframe ref=${iframeRef} src="${game.url}" className="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" onLoad=${handleLoad} />
        
        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all z-30">
          <button onClick=${enterFullscreen} className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:bg-indigo-600 transition-all">
            <${Maximize} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className=${`grid grid-cols-1 lg:grid-cols-3 gap-10 transition-all duration-700 ${isFocused ? 'opacity-10 blur-sm translate-y-4 pointer-events-none' : 'opacity-100'}`}>
        <div className="lg:col-span-2 space-y-6">
          <h1 className="font-orbitron text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">${game.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">${game.description}</p>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-6">
          <div className="flex items-center gap-3 text-indigo-400">
            <${Sparkles} className="w-5 h-5" />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Tactical Feed</h4>
          </div>
          <div className="text-[11px] text-slate-300 font-medium font-mono whitespace-pre-wrap opacity-80 leading-relaxed">
            ${guide || 'Compiling intelligence...'}
          </div>
        </div>
      </div>
    </div>
  `;
};

const MathHubApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cloakEnabled, setCloakEnabled] = useState(() => localStorage.getItem('hub_cloak') === 'true');
  const [performanceSettings, setPerformanceSettings] = useState(() => {
    const saved = localStorage.getItem('hub_performance');
    return saved ? JSON.parse(saved) : { gpuBoost: true, lowActivity: true, ultraLight: false };
  });

  const location = useLocation();
  const isGameRoute = location.pathname.startsWith('/game/');

  useEffect(() => {
    const handlePanic = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.location.replace(PANIC_URL);
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  useEffect(() => {
    localStorage.setItem('hub_performance', JSON.stringify(performanceSettings));
    document.body.classList.toggle('ultra-light', performanceSettings.ultraLight);
  }, [performanceSettings]);

  const toggleCloak = () => {
    const val = !cloakEnabled;
    setCloakEnabled(val);
    localStorage.setItem('hub_cloak', val.toString());
    document.title = val ? "Google Docs" : "Math Hub | Command Center";
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = val ? 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' : '/favicon.ico';
  };

  const updatePerformance = (key, val) => {
    setPerformanceSettings(prev => ({ ...prev, [key]: val }));
  };

  return html`
    <div className=${`min-h-screen flex flex-col bg-[#020617] ${performanceSettings.lowActivity && isGameRoute ? 'throttled-animations' : ''}`}>
      <${Navbar} onSearch=${setSearchQuery} />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-12 flex gap-12">
        <${Sidebar} />
        
        <div className="flex-1 min-w-0">
          <${Routes}>
            <${Route} path="/" element=${html`<${HomePage} games=${GAMES} searchQuery=${searchQuery} />`} />
            <${Route} path="/game/:id" element=${html`<${GameView} games=${GAMES} performanceSettings=${performanceSettings} />`} />
            <${Route} path="/settings" element=${html`
              <${SettingsView} 
                cloakEnabled=${cloakEnabled} 
                onToggleCloak=${toggleCloak} 
                performanceSettings=${performanceSettings} 
                onUpdatePerformance=${updatePerformance} 
              />
            `} />
          <//>
        </div>
      </main>
      
      <footer className="glass-panel border-t border-white/5 py-12 px-6 mt-10 opacity-30">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <${Sigma} className="w-4 h-4 text-indigo-500" />
            <span>Math Hub Terminal v4.7.0</span>
          </div>
          <div className="flex gap-8">
            <${Link} to="/" className="hover:text-indigo-400 transition-colors">Directory<//>
            <${Link} to="/settings" className="hover:text-indigo-400 transition-colors">Settings<//>
          </div>
        </div>
      </footer>
    </div>
  `;
};

const RootWrapper = () => html`<${Router}><${MathHubApp} /><//>`;

export default RootWrapper;