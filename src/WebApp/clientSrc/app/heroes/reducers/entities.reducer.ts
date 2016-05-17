import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { Map } from '../../shared'

interface IEntitiesState {
    heroes: Map<Hero>
}

export const EntitiesInitialState:IEntitiesState = {
    heroes: {}
}

export const entitiesReducer:Reducer<IEntitiesState> = (state:IEntitiesState = EntitiesInitialState, action: Action) => {        
    // updates state.entities state when any payload has .entities on it
    if (action.payload && action.payload.entities) {
        let payload:IEntitiesState = EntitiesInitialState;
        
        // merge individual entities first
        for(var entityType in action.payload.entities) {
            payload[entityType] = Object.assign({}, state[entityType], action.payload.entities[entityType]);
        }

        return Object.assign({}, state, payload);
    }

    return state; 
}
