import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateContentEffects } from './update-content.effects';

describe('UpdateContentEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateContentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateContentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UpdateContentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
