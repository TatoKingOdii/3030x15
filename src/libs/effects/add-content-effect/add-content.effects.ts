import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {catchError, EMPTY, exhaustMap, map, tap} from "rxjs";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";

@Injectable()
export class AddContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService) {}

  // Initial add handler
  addContent$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContent),
    exhaustMap( (action) =>
      this.contentService.addContent(action.content).pipe(
        tap(value => console.log('Add Content Res: ' + JSON.stringify(value))),
        map(AddContentActions.addContentSuccess),
        catchError(() => EMPTY))
    ))
  );

  // Refresh on success
  addContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContentSuccess),
    tap(() => {
      console.log('Add Success!');
      this.contentService.resetSelectedContent();
    }),
    map(LoadContentActions.loadContents)
  ));
}
