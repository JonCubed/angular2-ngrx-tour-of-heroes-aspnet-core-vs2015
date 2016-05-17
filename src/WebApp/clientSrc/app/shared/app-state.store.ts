import { Hero, EntitiesInitialState, HeroesInitialState } from '../heroes'
import { Map } from './map.model'

export interface AppState {
  entities: {
    heroes: Map<Hero>
  },
  heroes: {
    list: number[],
    selected: number;
  }
}

export const AppInitialState:AppState = {
  entities: EntitiesInitialState,
  heroes: HeroesInitialState
}
