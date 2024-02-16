import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {Item} from "../../model/item";
import {StoreService} from "../store-service/store.service";
import {ContentHttpService} from "../content-http-service/content-http.service";
import {NavService} from "../nav-service/nav.service";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private storeService: StoreService,
              private contentHttp: ContentHttpService,
              private navService: NavService) {
  }

  loadContent(): Observable<Item[]> {
    console.log('Load Content');
    this.storeService.contentSubscription$ = this.contentHttp.loadContent();
    return this.storeService.contentSubscription$;
  }

  addContent(addedContent: Item) {
    console.log('Add Content: ' + JSON.stringify(addedContent));
    return this.contentHttp.createContent(addedContent);
  }

  updateContent(updatedContent: Item) {
    console.log('Update Content: ' + JSON.stringify(updatedContent));
    return this.contentHttp.updateContent(updatedContent);
  }

  deleteContent(deletedContent: Item) {
    console.log('Delete Content: ' + JSON.stringify(deletedContent));
    return this.contentHttp.deleteContent(deletedContent);
  }

  resetSelectedContent() {
    console.log('Reset to Empty');
    this.navService.navigateDashboard();
    this.storeService.selectedContent$.next(null);
  }
}
