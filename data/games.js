import { GameCategory } from '../types.js';

export const GAMES = [
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    description: 'High-octane kinetic combat module. Optimize projectile trajectories and tactical positioning in a high-concurrency multiplayer environment.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&q=80&w=600',
    url: 'https://smash-karts.game-files.crazygames.com/smash-karts/177/index.html?skipPrerollFirstSession=true',
    playCount: 215000
  },
  {
    id: 'rocket-league',
    title: 'Rocket League',
    description: 'High-velocity physics-based soccer. Calculate complex ball trajectories and master aerial propulsion logic to dominate the arena.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&q=80&w=600',
    url: 'https://rocketgoal.io/?sdk=crazy&skipPrerollFirstSession=true',
    playCount: 185000
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