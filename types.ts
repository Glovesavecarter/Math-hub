
export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  url: string;
  rating: number;
  featured?: boolean;
}

export enum GameCategory {
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  RETRO = 'Retro',
  ADVENTURE = 'Adventure',
  MULTIPLAYER = 'Multiplayer'
}

export interface Recommendation {
  gameId: string;
  reason: string;
}
