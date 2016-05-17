import { Injectable } from '@angular/core';
import { Observable,   } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { HEROES_UPDATE_NAME, HEROES_SELECT, HEROES_LOAD } from '../actions';
import { HEROES } from './mock-heroes';
import { Hero } from './hero.model';
import { AppState, Map } from '../../shared';

@Injectable()
export class HeroService {
  heroes$: Observable<Map<Hero>>;

  constructor(public store: Store<AppState>) {
    this.heroes$ = store.select(store => store.entities.heroes);
  }

  loadHeroes() {
    let heroes = HEROES;
    
    let heroEntities:Map<Hero> = {};
    let heroList:number[] = [];

    // Normalise heroes into a hash map
    heroes.forEach((hero)=> {
        heroEntities[hero.id] = hero;
        heroList.push(hero.id);        
    });
            
    this.store.dispatch({
      type:HEROES_LOAD, payload: { 
        entities: { 
          heroes: heroEntities
        },
        result: heroList
      }
    });
  }

  updateName(id: number, name:string) {
    let hero = {};
    hero[id] = {id, name};
    
    this.store.dispatch({
      type:HEROES_UPDATE_NAME,
      payload: {
        entities: {
          heroes: hero
        }
      }
    });
  }

  select(heroId: number) {
    this.store.dispatch({type:HEROES_SELECT, payload:heroId});
  }

}
