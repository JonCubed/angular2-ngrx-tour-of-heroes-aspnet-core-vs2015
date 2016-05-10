import { Component, OnInit } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { Hero, HeroService, HeroDetailComponent } from './heroes/index';

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
    selectedHero: Hero;
    public heroes = [];
    
    constructor(private heroService: HeroService) { }
    
    ngOnInit() {
      this.getHeroes();
    }
    
    getHeroes() {
      this.heroes = this.heroService.getHeroes();
    }
    
    onSelect(hero: Hero) { this.selectedHero = hero; }
}
