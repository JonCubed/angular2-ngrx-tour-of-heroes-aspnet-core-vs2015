import { Component, OnInit, Input } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { Hero } from '../shared/index'

@Component({
  moduleId: module.id,
  selector: 'toh-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css'],
  directives: [ MD_INPUT_DIRECTIVES ]
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor() {}

  ngOnInit() {
  }

}