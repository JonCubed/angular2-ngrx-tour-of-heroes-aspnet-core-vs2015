import { Reducer, Action } from '@ngrx/store'

import { HEROES_SELECT } from '../actions'
import { Hero } from '../shared'
import { AppState } from '../../shared'

export const selectHeroReducer:Reducer<Hero> = (state:Hero, action: Action) => {
    
    switch (action.type) {
        case HEROES_SELECT:
            return action.payload;
                          
        default:
            return state;
    }
}
