import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {DetailComponent} from "../detail/detail.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ContentFacade} from "../../libs/facade/content-facade/content-facade.facade";
import {AuthFacade} from "../../libs/facade/auth-facade/auth-facade.facade";
import {filter, take} from "rxjs";
import {StoreService} from "../../libs/services/store-service/store.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent,
    DetailComponent,
    NgIf,
    UnauthorizedComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(public readonly contentFacade: ContentFacade,
              public readonly authFacade: AuthFacade,
              public readonly route: ActivatedRoute,
              private storeService: StoreService) {}

  ngOnInit(): void {
    //Rely on the id in the route to know what content to select
    this.route.params.subscribe(params => {
      if (params) {
        let id = params['id'];

        this.storeService.contentList$.pipe(take(1)).subscribe(content => {
          let idx = content.findIndex(item => item.id === id);
          if (idx !== -1) {
            this.contentFacade.selectContentById(id);
          } else {
            this.contentFacade.resetContent();
          }
        });
      }
    });
  }
}
