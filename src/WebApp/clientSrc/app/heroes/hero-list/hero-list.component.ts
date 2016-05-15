import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Hero } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'toh-hero-list',
  templateUrl: 'hero-list.component.html',
  styleUrls: ['hero-list.component.css']
})
export class HeroListComponent {

  @Input() heroes: Array<Hero>;
  @Input() selectedHero: Hero;
  @Output() select = new EventEmitter<Hero>(true);  

  onSelect(hero: Hero) {
    this.select.emit(hero);
  }

}
