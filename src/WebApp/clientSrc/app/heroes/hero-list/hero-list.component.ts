import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Hero } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'toh-hero-list',
  templateUrl: 'hero-list.component.html',
  styleUrls: ['hero-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {

  @Input() heroes: Hero[];
  @Input() selectedHero: number;
  @Output() select = new EventEmitter<number>(true);  

  onSelect(heroId: number) {
    this.select.emit(heroId);
  }
}
