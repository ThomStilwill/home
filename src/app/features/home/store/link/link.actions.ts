import { createActionGroup, props } from '@ngrx/store';
import { Link } from './link.model';

export const LinkActions = createActionGroup({
    source: "Link",
    events: {
        'LoadLinks' : props<{loading: string}>(),
       
        'LoadLinksSuccess' : props<{loading: string,list: Link[]}>(),
        
        'LoadLinksFailure': props<{loading: string,error: Error}>(),
        
        'AddLink' : props<{Link: Link}>(),
        
        'AddLinksuccess' : props<{Link: Link}>(),
        
        'AddLinkFailure' : props<{error: Error}>(),
        
        'DeleteLink' : props<{id: string}>(),
        
        'DeleteLinksuccess' : props<{id: string}>(),
        
        'DeleteLinkFailure' : props<{error: Error}>(),
    }
})
