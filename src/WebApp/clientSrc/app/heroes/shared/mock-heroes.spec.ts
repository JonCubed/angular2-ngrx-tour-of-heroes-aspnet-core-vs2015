import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {HEROES} from './mock-heroes';

describe('MockHeroes', () => {
  it('should create an instance', () => {
    expect(HEROES).toBeTruthy();
  });
});
