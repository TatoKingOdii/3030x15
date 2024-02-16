import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, map, tap} from "rxjs";
import {ContentService} from "../../services/content-service/content.service";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {StoreService} from "../../services/store-service/store.service";

@Injectable({
  providedIn: 'root'
})
export class LoadContentEffects {
  constructor(private actions$: Actions, private contentService: ContentService, private storeService: StoreService) {}

  // Initial content load handler
  contentLoadEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LoadContentActions.loadContents),
    exhaustMap(() => this.contentService.loadContent().pipe(
      tap(value => console.log('Load Content Res: ' + JSON.stringify(value))),
      map(content => LoadContentActions.loadContentsSuccess({content})),
      catchError(() => EMPTY)
    ))
  ));

  // Update store on success
  contentLoadSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LoadContentActions.loadContentsSuccess),
    tap((action) => this.storeService.contentList$.next(action.content))
  ), {dispatch: false});
}
