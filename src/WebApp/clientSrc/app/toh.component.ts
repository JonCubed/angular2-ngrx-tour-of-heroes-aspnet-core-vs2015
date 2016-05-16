import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/combineLatest';

import { AppState, Map } from './index'
import {
    Hero,
    HeroService,
    HeroListComponent,
    HeroDetailComponent
} from './heroes/index';

@Component({
  moduleId: module.id,
  selector: 'toh-app',
  templateUrl: 'toh.component.html',
  styleUrls: ['toh.component.css'],
  directives: [
    MdToolbar,
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [ HeroService ]
})
export class TohAppComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero$: Observable<Hero>;
    heroes$: Observable<Hero[]>;

    constructor(private heroService: HeroService, public store: Store<AppState>){
        let heroes$ = this.heroService
                          .heroes$; 
                           
        this.heroes$ = heroes$.map((heroes)=> this.flattenMap<Hero>(heroes));
                                                    
        this.selectedHero$ = store.select<number>('selectHero')
                                  .combineLatest(
                                      heroes$, 
                                      (id, heroes) => heroes[id]
                                  );      
   }

    private flattenMap<V>(map: Map<V>) : V[] {
        let mapResult = [];
            for (let key in map){
                mapResult.push(map[key]);
            }
            return mapResult
    }
    
    ngOnInit() {
        this.heroService.loadHeroes();
    }

    onHeroListSelectChange(heroId: number) {
        this.heroService.select(heroId);
    }

    onHeroDetailsChange(event:{id:number, name:string}) {
        this.heroService.updateName(event.id, event.name);
    }
}
