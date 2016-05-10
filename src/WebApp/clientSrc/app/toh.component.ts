import { Component, OnInit } from '@angular/core';
import { Hero, HeroService, HeroDetailComponent } from './heroes/index';

@Component({
  moduleId: module.id,
  selector: 'toh-app',
  templateUrl: 'toh.component.html',
  styleUrls: ['toh.component.css'],
  directives: [ HeroDetailComponent ],
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
