import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { Map } from '../../shared'
import { heroesReducer, HeroesInitialState } from './heroes.reducer'

export const EntitiesInitialState = {
    heroes: HeroesInitialState
}

export const entitiesReducer:Reducer<{heroes:Map<Hero>}> = (state = EntitiesInitialState, action) => {        
    return Object.assign({}, state, { heroes: heroesReducer(state.heroes, action) });
}