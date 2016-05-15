import { 
  Component
  , Input
  , Output
  , EventEmitter
  ,ChangeDetectionStrategy 
} from '@angular/core';

import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { Hero } from '../shared/index'

@Component({
  moduleId: module.id,
  selector: 'toh-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  directives: [ MD_INPUT_DIRECTIVES ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent {

  @Input() hero: Hero;
  @Output() change = new EventEmitter(true);

  onNameChange(name:string) {
    this.change.emit({id: this.hero.id, name});
  }
}