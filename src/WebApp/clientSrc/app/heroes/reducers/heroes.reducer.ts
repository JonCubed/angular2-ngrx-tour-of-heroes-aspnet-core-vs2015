import { Reducer, Action } from '@ngrx/store'

import { HEROES_LOAD, HEROES_SELECT } from '../actions'
import { Hero } from '../shared'
import { Map } from '../../shared'

interface IHeroesState {
    list: number[];
    selected: number;
}

export const HeroesInitialState:IHeroesState = {
    list: [],
    selected: null
}

export const heroesReducer:Reducer<IHeroesState> = (state:IHeroesState = HeroesInitialState, action: Action) => {
    
    switch (action.type) {
        case HEROES_LOAD:   
            return Object.assign({}, state, { list: action.payload.result });

         case HEROES_SELECT:
            return Object.assign({}, state, { selected: action.payload });
            
        default:
            return state;
    }
}
