import { GameCategory } from '../types.js';

export const GAMES = [
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    description: 'The ultimate armchair quarterback challenge. Manage your team, draft players, and win the big game in this addictive retro-style football sim.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=600',
    url: 'https://unblocked-games.org/games/retro-bowl/',
    playCount: 155000
  },
  {
    id: 'escape-road-2',
    title: 'Escape Roads 2',
    description: 'A high-intensity strategic evasion simulator. Calculate optimal escape vectors and navigate complex road networks.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    url: 'https://1games.io/game/escape-road-2/',
    playCount: 142500
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'High-speed 3D spatial reasoning challenge. Navigate gravity-defying courses with precision.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=600',
    url: 'https://azgames.io/game/xlope/',
    playCount: 121000
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The ultimate idle game. Optimize your resource production and scale your empire.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    playCount: 88200
  },
  {
    id: 'granny',
    title: 'Granny',
    description: 'Survival logic challenge. Master stealth and environmental awareness to escape.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600',
    url: 'https://gnhustgames.org/granny-source/',
    playCount: 54300
  },
  {
    id: 'escape-road-classic',
    title: 'Escape Road',
    description: 'The tactical navigation challenge that started it all.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=600',
    url: 'https://azgames.io/game/escape-road/',
    playCount: 41000
  },
  {
    id: 't-rex-run',
    title: 'Chrome Dino',
    description: 'The classic runner game from Google Chrome.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600',
    url: 'https://chromedino.com/',
    playCount: 38900
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Avoid the obstacles and fly as far as you can.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    url: 'https://flappybird.io/',
    playCount: 22100
  }
].sort((a, b) => b.playCount - a.playCount);