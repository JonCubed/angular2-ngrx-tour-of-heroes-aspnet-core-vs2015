import { Reducer, Action } from '@ngrx/store'

import { HEROES_UPDATE_NAME, HEROES_LOAD } from '../actions'
import { Hero } from '../shared'
import { Map } from '../../shared'

export const heroesReducer:Reducer<Map<Hero>> = (state:Map<Hero> ={}, action: Action) => {

    switch (action.type) {
        case HEROES_LOAD:
            let heroes:Map<Hero> = {};

            // Normalise heroes
            (<Hero[]>action.payload).forEach((hero)=> {
                heroes[hero.id] = hero;
            });

            return Object.assign({}, state, heroes);

        case HEROES_UPDATE_NAME:
            let newState:Map<Hero> = {};
            newState[action.payload.id] = Object.assign({}, state[action.payload.id], action.payload);

            return Object.assign({}, state, newState);

        default:
            return state;
    }
}
