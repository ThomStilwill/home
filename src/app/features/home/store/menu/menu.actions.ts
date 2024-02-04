import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Menu } from './menu';

export const MenuActions = createActionGroup({
    source: "Menu",
    events: {
        'LoadMenus' : emptyProps(),
        'LoadMenuSuccess' : props<{menus: Menu[]}>(),
        'LoadMenuFailure': props<{error: Error}>(),
    }
})
