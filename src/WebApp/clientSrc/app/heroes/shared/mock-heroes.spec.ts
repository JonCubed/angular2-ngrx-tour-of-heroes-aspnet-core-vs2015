import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {MockHeroes} from './mock-heroes';

describe('MockHeroes', () => {
  it('should create an instance', () => {
    expect(new MockHeroes()).toBeTruthy();
  });
});
