import { GameCategory } from '../types.ts';

export const GAMES = [
  {
    id: 'granny',
    title: 'Granny',
    description: 'A stealth-based survival logic challenge. Analyze sound propagation and master environmental awareness.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600',
    url: '/granny/index.html',
    playCount: 54300,
    featured: true
  },
  {
    id: 'bad-parenting-1',
    title: 'Bad Parenting 1',
    description: 'A psychological survival strategy module. Navigate complex household dynamics and analyze environmental cues to maintain system stability.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1505632958218-4f23394784a6?auto=format&fit=crop&q=80&w=600',
    url: 'https://genizymath.github.io/iframe/166.html',
    playCount: 115000,
    featured: true
  },
  {
    id: 'escape-road',
    title: 'Escape Road',
    description: 'A high-stakes tactical navigation challenge. Plan your route through urban obstacles to evade pursuers using real-time spatial logic.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=600',
    url: 'https://genizymath.github.io/iframe/264.html',
    playCount: 110500,
    featured: true
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'A high-speed 3D spatial reasoning challenge. Navigate the ball through an endless obstacle course to test your reflexes and logic.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600',
    url: 'https://azgames.io/game/xlope/',
    playCount: 98200,
    featured: true
  },
  {
    id: 'kindergarten',
    title: 'Kindergarten',
    description: 'A strategic social interaction simulator with high-stakes decision making. Navigate hierarchies and solve puzzles.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600',
    url: 'https://genizymath.github.io/iframe/445.html',
    playCount: 88400,
    featured: true
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The ultimate idle game about baking cookies and optimizing resource management.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    playCount: 77120
  }
].sort((a, b) => b.playCount - a.playCount);