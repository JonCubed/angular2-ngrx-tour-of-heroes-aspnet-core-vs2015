import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { Map } from '../../shared'
import { heroesReducer } from './heroes.reducer'

export const entitiesReducer:Reducer<{heroes:Map<Hero>}> = (state = {heroes: {}}, action) => {        
    return Object.assign({}, state, { heroes: heroesReducer(state.heroes, action) });
}