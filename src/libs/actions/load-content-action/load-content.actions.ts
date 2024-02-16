import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";

export const LoadContentActions = createActionGroup({
  source: 'LoadContent',
  events: {
    'Load Contents': emptyProps(),
    'Load Contents Success': props<{ content: Item[] }>(),
    'Load Contents Failure': props<{ error: string }>(),
  }
});
