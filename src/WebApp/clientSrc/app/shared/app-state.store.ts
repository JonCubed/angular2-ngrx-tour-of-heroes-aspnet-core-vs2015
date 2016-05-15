import { Hero } from '../heroes'

export interface AppState {
  heroes: Hero[];
  selectedHero: Hero;
}