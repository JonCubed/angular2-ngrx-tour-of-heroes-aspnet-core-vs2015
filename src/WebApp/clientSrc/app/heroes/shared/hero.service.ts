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
    this.heroes$=store.select<Map<Hero>>(s => s.entities.heroes);
  }

  loadHeroes() {
    let heroes = HEROES;

    this.store.dispatch({type:HEROES_LOAD, payload:heroes})
  }

  updateName(id: number, name:string) {
    this.store.dispatch({type:HEROES_UPDATE_NAME, payload:{id, name}})
  }

  select(heroId: number) {
    this.store.dispatch({type:HEROES_SELECT, payload:heroId})
  }

}
