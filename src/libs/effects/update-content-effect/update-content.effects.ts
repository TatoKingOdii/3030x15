import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {catchError, EMPTY, exhaustMap, map, tap, throwError} from "rxjs";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";



@Injectable()
export class UpdateContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService) {}

  // Initial update handler
  updateContent$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateContentActions.updateContent),
    exhaustMap( (action) =>
      this.contentService.updateContent(action.content).pipe(
        tap(value => console.log('Update Content Res: ' + JSON.stringify(value))),
        map(UpdateContentActions.updateContentSuccess),
        catchError(() => EMPTY))
    )
  ));

  // Refresh on success
  updateContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateContentActions.updateContentSuccess),
    tap(() => {
      console.log('Update Success!');
      this.contentService.resetSelectedContent();
    }),
    map(LoadContentActions.loadContents)
  ));
}
