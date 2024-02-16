import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeleteContentEffects } from './delete-content.effects';

describe('DeleteContentEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteContentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteContentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeleteContentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
