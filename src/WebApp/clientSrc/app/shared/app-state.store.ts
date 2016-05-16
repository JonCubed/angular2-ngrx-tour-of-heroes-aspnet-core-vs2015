import { Hero } from '../heroes'
import { Map } from './map.model'

export interface AppState {
  entities: {
    heroes: Map<Hero>
  },
  selectedHero: number;
}