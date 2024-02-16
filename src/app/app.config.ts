import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideEffects} from "@ngrx/effects";
import {LoadContentEffects} from "../libs/effects/load-content-effect/load-content.effects";
import {provideStore} from "@ngrx/store";
import {AddContentEffects} from "../libs/effects/add-content-effect/add-content.effects";
import {UpdateContentEffects} from "../libs/effects/update-content-effect/update-content.effects";
import {DeleteContentEffects} from "../libs/effects/delete-content-effect/delete-content.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    provideEffects([LoadContentEffects, AddContentEffects, UpdateContentEffects, DeleteContentEffects]),
    provideStore()]
};
