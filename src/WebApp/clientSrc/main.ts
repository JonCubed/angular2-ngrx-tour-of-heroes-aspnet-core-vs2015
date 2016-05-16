import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { TohAppComponent, environment, selectHeroReducer, entitiesReducer } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(
  TohAppComponent, 
  [ provideStore({entities: entitiesReducer, selectHero:selectHeroReducer}, {entities: {heroes: []}}) ]
);
