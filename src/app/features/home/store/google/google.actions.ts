import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LinkBase } from '../models/linkbase.model';

export const GoogleActions = createActionGroup({
    source: "Home",
    events: {
        'LoadGoogle' : emptyProps(),
        'LoadGoogleSuccess' : props<{links: LinkBase[]}>(),
        'LoadGoogleFailure': props<{error: Error}>(),
    }
})
