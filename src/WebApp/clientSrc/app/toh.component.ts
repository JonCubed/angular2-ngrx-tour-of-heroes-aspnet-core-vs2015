import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './index'
import { Hero, HeroService, HeroDetailComponent, HEROES_UPDATE_NAME } from './heroes/index';

@Component({
  moduleId: module.id,
  selector: 'toh-app',
  templateUrl: 'toh.component.html',
  styleUrls: ['toh.component.css'],
  directives: [ 
    MdToolbar, 
    MD_CARD_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    HeroDetailComponent 
  ],
  providers: [HeroService] 
})
export class TohAppComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero$: Observable<Hero>;    
    heroes$: Observable<Hero[]>;
    
    constructor(private heroService: HeroService, public store: Store<AppState>){
        this.heroes$ = this.heroService.heroes$;
        this.selectedHero$ = store.select<Hero>('selectHero'); 
    }
        
    ngOnInit() {
      this.heroService.loadHeroes();
    }    
    
    onSelect(hero: Hero) { 
        this.heroService.select(hero);
    }
    
    onHeroDetailsChange(event:{id:number, name:string}) {
        this.heroService.updateName(event.id, event.name);
    }
}

