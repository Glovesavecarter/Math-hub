
import { Game, GameCategory } from '../types';

export const GAMES: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    url: 'https://play2048.co/',
    rating: 4.8,
    featured: true
  },
  {
    id: 't-rex-run',
    title: 'Chrome Dino',
    description: 'The classic runner game from Google Chrome.',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/dino/400/300',
    url: 'https://chromedino.com/',
    rating: 4.5
  },
  {
    id: 'pacman',
    title: 'Google Pacman',
    description: 'Classic arcade action right in your browser.',
    category: GameCategory.RETRO,
    thumbnail: 'https://picsum.photos/seed/pacman/400/300',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    rating: 4.9,
    featured: true
  },
  {
    id: 'tetris',
    title: 'Classic Tetris',
    description: 'The world-famous block-stacking puzzle game.',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/tetris/400/300',
    url: 'https://tetris.com/play-tetris',
    rating: 4.7
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Avoid the pipes and fly as far as you can.',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/flappy/400/300',
    url: 'https://flappybird.io/',
    rating: 4.2
  },
  {
    id: 'snake',
    title: 'Google Snake',
    description: 'Grow your snake by eating apples.',
    category: GameCategory.RETRO,
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    url: 'https://www.google.com/logos/2010/pacman10-i.html', // Placeholder link
    rating: 4.6
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Drive a ball down a 3D slope for as long as possible.',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/slope/400/300',
    url: 'https://slope.io/',
    rating: 4.4,
    featured: true
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'The ultimate idle game about baking cookies.',
    category: GameCategory.ADVENTURE,
    thumbnail: 'https://picsum.photos/seed/cookie/400/300',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    rating: 4.9
  }
];
