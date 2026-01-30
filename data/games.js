import { GameCategory } from '../types.js';

export const GAMES = [
  {
    id: 'escape-road-2',
    title: 'Escape Roads 2',
    description: 'High-intensity strategic evasion simulator. Master spatial logic and pathing under extreme pressure.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
    url: 'https://1games.io/game/escape-road-2/',
    playCount: 125430
  },
  {
    id: 'escape-road',
    title: 'Escape Road',
    description: 'The original tactical navigation challenge. Calculate routes to evade obstacles in real-time.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=400',
    url: 'https://azgames.io/game/escape-road/',
    playCount: 110500
  },
  {
    id: 'slope',
    title: 'Slope',
    description: '3D spatial reasoning test. Navigate high-speed gravity courses while maintaining trajectory logic.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=400',
    url: 'https://azgames.io/game/xlope/',
    playCount: 98200
  },
  {
    id: 'pacman',
    title: 'Google Pacman',
    description: 'Pattern recognition and grid navigation logic. The quintessential retro classic.',
    category: GameCategory.RETRO,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    playCount: 85400
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'Optimization and resource management strategy. Scale your production through efficient upgrades.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    playCount: 77120
  },
  {
    id: 'granny',
    title: 'Granny',
    description: 'Stealth-based logic challenge. Master environmental awareness and sound propagation.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400',
    url: 'https://gnhustgames.org/granny-source/',
    playCount: 54300
  },
  {
    id: 'tetris',
    title: 'Classic Tetris',
    description: 'World-renowned spatial logic puzzle. Clear lines with high-speed geometric arrangement.',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1605898835518-07d8d2b9044d?auto=format&fit=crop&q=80&w=400',
    url: 'https://tetris.com/play-tetris',
    playCount: 41200
  },
  {
    id: 'snake',
    title: 'Google Snake',
    description: 'Grid management and growth logic simulator. Classic coordination training.',
    category: GameCategory.RETRO,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    playCount: 31500
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'High-precision timing and coordination challenge. Test your trajectory logic.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    url: 'https://flappybird.io/',
    playCount: 22100
  }
].sort((a, b) => b.playCount - a.playCount);