import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";

export const AddContentActions = createActionGroup({
  source: 'AddContent',
  events: {
    'Add Content': props<{ content: Item }>(),
    'Add Content Success': emptyProps(),
    'Add Content Failure': props<{ error: string }>(),
  }
});
