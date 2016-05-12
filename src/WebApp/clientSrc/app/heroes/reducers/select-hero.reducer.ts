import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { AppState } from '../../shared'

export const HEROES_SELECT = 'HEROES_SELECT'

export const selectHeroReducer:Reducer<Hero> = (state:Hero, action: Action) => {
    
    switch (action.type) {
        case HEROES_SELECT:
            return action.payload;
                          
        default:
            console.log('Skip SelectHeroReducer, state:'+state+',action: '+action.type+',payload:'+action.payload)
            return state;
    }
}
