import { Reducer, Action } from '@ngrx/store'

import { HEROES_UPDATE_NAME, HEROES_LOAD } from '../actions'
import { Hero } from '../shared'
import { AppState } from '../../shared'

export const heroesReducer:Reducer<Hero[]> = (state:Hero[], action: Action) => {

    switch (action.type) {
        case HEROES_LOAD:
            return action.payload;

        case HEROES_UPDATE_NAME:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return Object.assign({}, item, action.payload);
                }

                return item;
            });

        default:
            return state;
    }
}
