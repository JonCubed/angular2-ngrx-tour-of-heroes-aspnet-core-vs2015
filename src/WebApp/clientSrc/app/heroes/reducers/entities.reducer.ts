import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { Map } from '../../shared'
import { HEROES_UPDATE_NAME } from '../actions'
import { EntitiesHeroInitialState, entitiesHeroesReducer } from './entities-heroes.reducer'

interface IEntitiesState {
    heroes: Map<Hero>
}

export const EntitiesInitialState:IEntitiesState = {
    heroes: EntitiesHeroInitialState
}

export const entitiesReducer:Reducer<IEntitiesState> = (state:IEntitiesState = EntitiesInitialState, action: Action) => {        
    // updates state.entities state when any payload has .entities on it
    if (action.payload && action.payload.entities) {
        return Object.assign({}, state, action.payload.entities);
    }

    switch(action.type) {    
            
        case HEROES_UPDATE_NAME:
            return Object.assign({}, state, { heroes: entitiesHeroesReducer(state.heroes, action) });
            
         default:
            return state;            
    }
}

