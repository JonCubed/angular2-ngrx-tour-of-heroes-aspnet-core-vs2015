import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {HEROES_LOAD,HEROES_SELECT, HEROES_UPDATE_NAME} from './hero.actions';

describe('Hero Load Actions', () => {
  it('should exist', () => {
    expect(HEROES_LOAD).toBeTruthy();
  });
});

describe('Hero select actions', () => {
  it('should exist', () => {
    expect(HEROES_SELECT).toBeTruthy();
  });
});

describe('Hero update name action', () => {
  it('should exist', () => {
    expect(HEROES_UPDATE_NAME).toBeTruthy();
  });
});
