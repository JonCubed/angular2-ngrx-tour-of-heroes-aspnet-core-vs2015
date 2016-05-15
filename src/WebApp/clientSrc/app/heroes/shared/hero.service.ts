import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {Store} from '@ngrx/store';

import {HEROES_UPDATE_NAME, HEROES_SELECT, HEROES_LOAD } from '../actions';
import { HEROES } from './mock-heroes';
import { Hero } from './hero.model';
import { AppState } from '../../shared';

@Injectable()
export class HeroService {
  heroes$: Observable<Hero[]>;

  constructor(public store: Store<AppState>) {
    this.heroes$ = store.select<Hero[]>('heroes');
  }

  loadHeroes() {
    let heroes = HEROES;

    this.store.dispatch({type:HEROES_LOAD, payload:heroes})
  }

  updateName(id: number, name:string) {
    this.store.dispatch({type:HEROES_UPDATE_NAME, payload:{id, name}})
  }

  select(hero: Hero) {
    this.store.dispatch({type:HEROES_SELECT, payload:hero})
  }

}
