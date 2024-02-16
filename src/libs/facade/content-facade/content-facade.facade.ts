import { Injectable } from '@angular/core';
import {StoreService} from "../../services/store-service/store.service";
import {Item} from "../../model/item";
import {map, Observable, take} from "rxjs";
import {v4} from "uuid";
import {NavService} from "../../services/nav-service/nav.service";
import {Store} from "@ngrx/store";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";

@Injectable({
  providedIn: 'root'
})
export class ContentFacade {

  constructor(private storeService: StoreService,
              private navService: NavService,
              private store: Store) {
    this.loadContent();
  }

  loadContent() {
    this.store.dispatch({type: LoadContentActions.loadContents.type});
  }

  addContent(addedContent: Item) {
    addedContent.id = v4();
    console.log('Add Content CF');
    this.store.dispatch({type: AddContentActions.addContent.type, content: addedContent})
  }

  updateContent(contentEvent: Item) {
    console.log('Update Content CF');
    if (contentEvent.id) {
      // Weird quirk with the form the state of the expiration is still set
      // if it was previously and has expiration was unchecked, so clear it out here before saving
      if (!contentEvent.hasExpiration) {
        contentEvent.expirationDate = '';
      }
      this.store.dispatch(UpdateContentActions.updateContent({content: contentEvent}));
    } else {
      this.addContent(contentEvent);
    }
  }

  deleteContent(deletedContent: Item) {
    console.log('Delete Content CF');
    this.store.dispatch(DeleteContentActions.deleteContent({content: deletedContent}));
  }

  selectContentById(id: string | null) {
    this.storeService.contentSubscription$.subscribe(
      () => {
        this.storeService.contentList$.pipe(
          take(1),
          map(value => this.findContentById(value, id))
        ).subscribe(content => {
          console.log('Data At SCBI: ' + JSON.stringify(content));
          if (content) {
            this.selectContent(content);
          } else {
            this.selectContent(null);
          }
        });
      }
    );
  }

  selectContent(contentEvent: Item | null) {
    console.log('CF - Select: ' + JSON.stringify(contentEvent));
    this.storeService.selectedContent$.next(contentEvent);
  }

  goToContent(content: Item) {
    this.navService.navigateContent(content);
  }

  resetContent() {
    this.navService.navigateDashboard();
  }

  getContentList(): Observable<Item[]> {
    return this.storeService.contentList$.asObservable();
  }

  getSelectedContent(): Observable<Item | null> {
    return this.storeService.selectedContent$.asObservable();
  }

  // Eventually move this stuff to a util?
  private findContentById(content: Item[], toFind: string | null): Item | undefined {
    return content.find(content => content.id === toFind);
  }
}
