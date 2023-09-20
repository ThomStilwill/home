import { createActionGroup, props } from '@ngrx/store';

export const ProgressActions = createActionGroup({
    source: "Link",
    events: {
        'ShowProgress' : props<{message: string}>(),
        'HideProgress' : props<{message: string}>()
      }
})
