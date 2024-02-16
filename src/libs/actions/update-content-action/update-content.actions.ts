import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";

export const UpdateContentActions = createActionGroup({
  source: 'UpdateContent',
  events: {
    'Update Content': props<{ content: Item }>(),
    'Update Content Success': emptyProps(),
    'Update Content Failure': props<{ error: string }>(),
  }
});
