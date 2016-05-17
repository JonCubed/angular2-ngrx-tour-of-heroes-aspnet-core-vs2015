import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideStore, usePostMiddleware, Middleware } from '@ngrx/store';

import { TohAppComponent, environment, AppStateReducer, AppInitialState } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(
  TohAppComponent, 
  [ provideStore(AppStateReducer, AppInitialState) ]
);
