import { GameCategory } from '../types.js';

export const GAMES = [
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
    id: 'pacman',
    title: 'Google Pacman',
    description: 'The definitive retro arcade experience. Navigate the grid and clear the board.',
    category: GameCategory.RETRO,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    playCount: 98400
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
    id: 'tetris',
    title: 'Classic Tetris',
    description: 'World-famous geometric puzzle game. Clear lines and manage your stack.',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1605898835518-07d8d2b9044d?auto=format&fit=crop&q=80&w=600',
    url: 'https://tetris.com/play-tetris',
    playCount: 76000
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
    id: 'snake',
    title: 'Google Snake',
    description: 'Classical spatial growth simulation. Manage your length within the grid.',
    category: GameCategory.RETRO,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    playCount: 44100
  },
  {
    id: 'escape-road-classic',
    title: 'Escape Road',
    description: 'The tactical navigation challenge that started it all.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=600',
    url: 'https://azgames.io/game/escape-road/',
    playCount: 41000
  }
].sort((a, b) => b.playCount - a.playCount);