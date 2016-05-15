import {Hero} from '../heroes/shared/hero.model'

export interface AppState {
  heroes: Array<Hero>;
  selectedHero: Hero;
}