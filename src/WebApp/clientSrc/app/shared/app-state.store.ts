import {Hero} from '../heroes/shared/hero.model'

export interface AppState {
  heroes: Hero[];
  selectedHero: Hero;
}