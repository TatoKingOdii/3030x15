import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadContentEffects } from './load-content.effects';

describe('LoadContentEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadContentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadContentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoadContentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
