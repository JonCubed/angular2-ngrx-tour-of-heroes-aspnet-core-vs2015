import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { Map } from '../../shared'
import { HEROES_UPDATE_NAME } from '../actions'

export const EntitiesHeroInitialState:Map<Hero> = {}

export const entitiesHeroesReducer:Reducer<Map<Hero>> = (state:Map<Hero> = EntitiesHeroInitialState, action:Action) => {
    
    switch(action.type) {    
            
        case HEROES_UPDATE_NAME:
            let newState:Map<Hero> = {};
            newState[action.payload.id] = Object.assign({}, state[action.payload.id], action.payload);

            return Object.assign({}, state, newState );
            
         default:
            return state;
            
    }
}
