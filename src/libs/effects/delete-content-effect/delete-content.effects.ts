import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {catchError, EMPTY, exhaustMap, map, tap} from "rxjs";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {StoreService} from "../../services/store-service/store.service";

@Injectable()
export class DeleteContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService, private storeService: StoreService) {}

  // Initial delete handler
  deleteContent$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContent),
    exhaustMap( (action) =>
      this.contentService.deleteContent(action.content).pipe(
        tap(value => console.log('Delete Content Res: ' + JSON.stringify(action.content))),
        map((value) => DeleteContentActions.deleteContentSuccess({id: action.content.id})),
        catchError(() => EMPTY))
    )
  ));

  // reload content on successful delete
  deleteContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContentSuccess),
    map(LoadContentActions.loadContents)
  ));

  // Cleanup of selected item if it was the deleted item
  resetSelectedOnDelete$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContentSuccess),
    tap((value) => {
      if (this.storeService.selectedContent$.getValue()?.id === value.id) {
        this.contentService.resetSelectedContent();
      }
    })
  ), {dispatch: false});
}
