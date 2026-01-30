
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
  Star, 
  Play,
  LayoutGrid,
  Info
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
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-orbitron text-xl font-black tracking-tighter text-white">
            NOVAPLAY<span className="text-indigo-500">.</span>
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search games..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onAssistantToggle}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-indigo-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
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
      className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent opacity-60" />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur rounded text-[10px] font-bold text-slate-300 border border-slate-700">
          {game.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">{game.title}</h3>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            {game.rating}
          </div>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2">{game.description}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-indigo-600 p-2 rounded-full shadow-xl">
          <Play className="w-4 h-4 text-white fill-current" />
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
    { id: 'all', name: 'All Games', icon: LayoutGrid },
    { id: GameCategory.ACTION, name: 'Action', icon: Flame },
    { id: GameCategory.PUZZLE, name: 'Puzzle', icon: Trophy },
    { id: GameCategory.RETRO, name: 'Retro', icon: Clock },
    { id: GameCategory.ADVENTURE, name: 'Adventure', icon: Gamepad2 },
  ];

  return (
    <aside className="w-64 hidden lg:block space-y-6">
      <div className="space-y-1">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Categories</p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-800 border border-indigo-500/20">
        <h4 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Nova Pro
        </h4>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">Unlock ad-free gaming and premium server speeds.</p>
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
          Go Premium
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

  const featuredGames = useMemo(() => GAMES.filter(g => g.featured), []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {searchQuery === '' && activeCategory === 'all' && (
        <section className="relative h-[400px] rounded-3xl overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/hero/1200/600" 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600/20 backdrop-blur-md border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-bold mb-4 w-fit">
              <Flame className="w-3 h-3" /> Trending Now
            </span>
            <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              MASTER THE <br /><span className="text-indigo-500">DIGITAL ARENA</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Experience the next generation of unblocked gaming. High speeds, curated libraries, and AI-powered tips.
            </p>
            <div className="flex gap-4">
              <Link to="/game/pacman" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/30">
                Play Featured
              </Link>
              <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-md text-white font-bold rounded-xl border border-slate-700 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Game Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {activeCategory === 'all' ? 'All Games' : activeCategory} 
            <span className="text-sm font-normal text-slate-500">({filteredGames.length})</span>
          </h2>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 text-lg">No games found matching your search.</p>
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
    if (game) {
      setLoadingGuide(true);
      getGameGuide(game.title).then(res => {
        setGuide(res);
        setLoadingGuide(false);
      });
    }
  }, [game]);

  if (!game) return <div className="p-12 text-center text-slate-400">Game not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="relative aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <iframe 
          src={game.url} 
          title={game.title}
          className="w-full h-full border-0"
          allowFullScreen
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-slate-900/80 backdrop-blur hover:bg-slate-800 rounded-xl text-slate-200 border border-slate-700 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">{game.title}</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">
                  {game.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  {game.rating}
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
              Favorite
            </button>
          </div>
          <p className="text-slate-400 leading-relaxed text-lg">
            {game.description}
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 h-fit space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            AI Pro Guide
          </h3>
          <div className="text-sm text-slate-300 leading-relaxed space-y-3">
            {loadingGuide ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-full" />
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-700 rounded w-5/6" />
              </div>
            ) : (
              <div className="whitespace-pre-line bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                {guide}
              </div>
            )}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Similar Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4).map(g => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Nova AI Concierge</h3>
              <p className="text-xs text-slate-500">How are you feeling today?</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex-1 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Describe your mood</label>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I want something relaxing and slow paced..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-32 resize-none"
            />
          </div>

          <button 
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Thinking...' : 'Get Personalized Recommendation'}
          </button>

          {result && recommendedGame && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl">
                <p className="text-indigo-300 text-sm italic mb-4">" {result.reason} "</p>
                <div className="bg-slate-900 p-2 rounded-xl flex items-center gap-4">
                  <img src={recommendedGame.thumbnail} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{recommendedGame.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{recommendedGame.category}</p>
                    <Link 
                      to={`/game/${recommendedGame.id}`} 
                      onClick={onClose}
                      className="inline-block mt-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Play Now →
                    </Link>
                  </div>
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
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex gap-8">
          <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} activeCategory={activeCategory} />} />
              <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <span className="font-orbitron text-xl font-black text-white">
                  NOVAPLAY
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                The ultimate destination for unblocked entertainment. Fast, secure, and powered by intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm">Platform</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link to="/" className="hover:text-indigo-400 transition-colors">Browse All</Link></li>
                  <li><Link to="/" className="hover:text-indigo-400 transition-colors">Trending</Link></li>
                  <li><Link to="/" className="hover:text-indigo-400 transition-colors">Categories</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">DMCA</a></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm">Stay Updated</h4>
              <p className="text-xs text-slate-500 mb-4">Get the latest unblocked games delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1"
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2024 NovaPlay Unblocked. Built for speed and fun.
          </div>
        </footer>

        <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      </div>
    </Router>
  );
};

export default App;
