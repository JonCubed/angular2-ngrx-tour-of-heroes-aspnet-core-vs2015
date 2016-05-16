import { Hero, EntitiesInitialState, selectHeroInitialState } from '../heroes'
import { Map } from './map.model'

export interface AppState {
  entities: {
    heroes: Map<Hero>
  },
  selectedHero: number;
}

export const AppInitialState :AppState = {
  entities: EntitiesInitialState,
  selectedHero: selectHeroInitialState
}