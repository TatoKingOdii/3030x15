import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AddContentEffects } from './add-content.effects';

describe('AddContentEffects', () => {
  let actions$: Observable<any>;
  let effects: AddContentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddContentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AddContentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
