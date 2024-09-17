import type { IMatch } from './IMatch';

export interface IRound {
  round: number;
  games: IMatch[];
}
