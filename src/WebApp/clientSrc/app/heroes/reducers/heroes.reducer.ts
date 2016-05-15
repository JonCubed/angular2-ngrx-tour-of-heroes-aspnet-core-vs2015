import { Reducer, Action } from '@ngrx/store'

import { Hero } from '../shared'
import { AppState } from '../../shared'

export const HEROES_UPDATE_NAME = 'HEROES_UPDATE_NAME'
export const HEROES_LOAD = 'HEROES_LOAD'

export const heroesReducer:Reducer<Array<Hero>> = (state:Array<Hero>, action: Action) => {

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
