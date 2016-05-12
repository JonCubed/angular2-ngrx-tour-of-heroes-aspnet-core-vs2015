import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { TohAppComponent, environment,heroesReducer,selectHeroReducer } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(
  TohAppComponent, 
  [ provideStore({heroes: heroesReducer, selectHero:selectHeroReducer}, {heroes: []})]
);
