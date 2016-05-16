import { Reducer, Action } from '@ngrx/store'

import { HEROES_SELECT } from '../actions'

export const selectHeroReducer:Reducer<number> = (state:number = null, action: Action) => {

    switch (action.type) {
        case HEROES_SELECT:
            return action.payload;

        default:
            return state;
    }
}
