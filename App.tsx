
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Gamepad2, 
  Search, 
  Flame, 
  Trophy, 
  Clock, 
  Sparkles, 
  Menu, 
  X, 
  LayoutGrid,
  Sigma,
  ChevronRight
} from 'lucide-react';
import { GAMES } from './data/games';
import { Game, GameCategory } from './types';
import { getGameRecommendation, getGameGuide } from './services/geminiService';

// --- Components ---

const Navbar: React.FC<{ 
  onSearch: (q: string) => void;
  onAssistantToggle: () => void;
}> = ({ onSearch, onAssistantToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-600/20">
            <Sigma className="w-6 h-6 text-white" />
          </div>
          <span className="font-orbitron text-xl font-black tracking-tighter text-white uppercase">
            Math Hub<span className="text-indigo-500">.</span>
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onAssistantToggle}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>
          
          <button 
            className="md:hidden p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="group bg-slate-800/40 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60" />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xl text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2 tracking-tight">
            {game.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">
            {game.description}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-indigo-400 text-xs font-bold uppercase tracking-widest">
          Launch Module
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

const Sidebar: React.FC<{ 
  activeCategory: string; 
  onCategoryChange: (cat: string) => void;
}> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Resources', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Logic', icon: Flame },
    { id: GameCategory.PUZZLE, name: 'Spatial', icon: Trophy },
    { id: GameCategory.RETRO, name: 'Classic', icon: Clock },
    { id: GameCategory.ADVENTURE, name: 'Strategy', icon: Gamepad2 },
  ];

  return (
    <aside className="w-64 hidden lg:block sticky top-24 h-fit space-y-8">
      <div className="space-y-2">
        <p className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Core Sections</p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeCategory === cat.id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white' : 'text-slate-500'}`} />
            {cat.name}
          </button>
        ))}
      </div>
      
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-500" />
        </div>
        <h4 className="text-white font-bold text-sm">Study Mode</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Unlock performance tracking and advanced AI simulation guides.
        </p>
        <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors border border-slate-700">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

// --- Pages ---

const HomePage: React.FC<{ searchQuery: string; activeCategory: string }> = ({ searchQuery, activeCategory }) => {
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-12 page-fade-in">
      {searchQuery === '' && activeCategory === 'all' && (
        <section className="relative h-[340px] rounded-[40px] overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200" 
            alt="Math Hub Hero" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-10 md:px-20 max-w-3xl">
            <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
              COGNITIVE <br /><span className="text-indigo-500">ACCELERATION</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl font-medium">
              Access premium interactive resources designed for high-performance learning and logic development.
            </p>
            <div className="flex gap-4">
              <Link to="/game/escape-road-2" className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-600/40 active:scale-95 uppercase text-sm tracking-widest">
                Start Training
              </Link>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
            {activeCategory === 'all' ? 'Active Modules' : activeCategory}
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full py-32 text-center bg-slate-900/50 rounded-[40px] border border-dashed border-slate-800">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-slate-500 text-lg font-bold">No resources found in current parameters.</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-indigo-500 font-bold hover:underline">Reset Search</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const GameDetail: React.FC = () => {
  const { pathname } = useLocation();
  const gameId = pathname.split('/').pop();
  const game = useMemo(() => GAMES.find(g => g.id === gameId), [gameId]);
  const [guide, setGuide] = useState<string | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (game) {
      setLoadingGuide(true);
      getGameGuide(game.title).then(res => {
        setGuide(res);
        setLoadingGuide(false);
      });
    }
  }, [game]);

  if (!game) return <div className="p-20 text-center text-slate-400 font-bold">Resource parameter undefined.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 page-fade-in">
      <div className="relative aspect-video w-full bg-black rounded-[40px] overflow-hidden border border-slate-800 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
        <iframe 
          src={game.url} 
          title={game.title}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">{game.title}</h1>
            <div className="flex gap-3">
              <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-400 text-xs font-black rounded-full border border-indigo-500/20 uppercase tracking-widest">
                {game.category}
              </span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-xl font-medium">
            {game.description}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Logic Analysis
            </h3>
            <div className="text-sm text-slate-400 leading-relaxed">
              {loadingGuide ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-800 rounded-full w-full" />
                  <div className="h-4 bg-slate-800 rounded-full w-4/5" />
                  <div className="h-4 bg-slate-800 rounded-full w-full" />
                </div>
              ) : (
                <div className="whitespace-pre-line bg-slate-950 p-6 rounded-2xl border border-slate-800 font-medium leading-loose text-slate-300">
                  {guide}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAssistant: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ gameId: string; reason: string } | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const recommendation = await getGameRecommendation(query, GAMES);
    setResult(recommendation);
    setLoading(false);
  };

  const recommendedGame = useMemo(() => {
    if (!result) return null;
    return GAMES.find(g => g.id === result.gameId);
  }, [result]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tight">Assistant</h3>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Cognitive Advisor</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 flex-1 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Describe Goal</p>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I need to improve my spatial navigation and reflexes..."
              className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-36 resize-none font-medium placeholder:text-slate-700"
            />
          </div>

          <button 
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-3xl transition-all shadow-xl shadow-indigo-600/30 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Analyzing Parameters...
              </div>
            ) : 'Generate Analysis'}
          </button>

          {result && recommendedGame && (
            <div className="p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-[32px] space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <p className="text-indigo-300 text-sm font-bold leading-relaxed">"{result.reason}"</p>
              <div className="bg-slate-950 p-4 rounded-2xl flex items-center gap-5 border border-slate-800">
                <img src={recommendedGame.thumbnail} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-black text-white uppercase text-sm tracking-tight mb-1">{recommendedGame.title}</h4>
                  <Link to={`/game/${recommendedGame.id}`} onClick={onClose} className="text-xs font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
                    Launch →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500 selection:text-white">
        <Navbar onSearch={setSearchQuery} onAssistantToggle={() => setIsAssistantOpen(true)} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex gap-16">
          <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} activeCategory={activeCategory} />} />
              <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-slate-950 border-t border-slate-900 py-16 px-6 text-center">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 opacity-40 grayscale">
              <Sigma className="w-5 h-5" />
              <span className="font-orbitron font-black uppercase text-sm">Math Hub</span>
            </div>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
              Precision Resources for Educational Exploration
            </p>
            <div className="text-[10px] text-slate-800 font-bold uppercase tracking-widest mt-4">
              © 2024 Hub Network. Optimized for static web distribution.
            </div>
          </div>
        </footer>

        <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      </div>
    </Router>
  );
};

export default App;
