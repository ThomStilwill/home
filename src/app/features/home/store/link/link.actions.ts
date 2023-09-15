import { createAction, props } from '@ngrx/store';
import { Link } from './link.model';

const prefix = "[Link]";




export const LoadLinks = createAction(
    `${prefix} Load Links`,
    props<{loading: string}>(),
)

export const LoadLinksSuccess = createAction(
    `${prefix} Load Links success`,
    props<{loading: string,list: Link[]}>(),
)

export const LoadLinksFailure = createAction(
    `${prefix} Load Links failure`,
    props<{loading: string,error: Error}>(),
)

export const AddLink = createAction(
    `${prefix} Add Link`,
    props<{Link: Link}>(),
)

export const AddLinksuccess = createAction(
    `${prefix} Add Link success`,
    props<{Link: Link}>(),
)

export const AddLinkFailure = createAction(
    `${prefix} Add Link failure`,
    props<{error: Error}>(),
)

export const DeleteLink = createAction(
    `${prefix} Delete Link`,
    props<{id: string}>(),
)

export const DeleteLinksuccess = createAction(
    `${prefix} Delete Link success`,
    props<{id: string}>(),
)

export const DeleteLinkFailure = createAction(
    `${prefix} Delete Link failure`,
    props<{error: Error}>(),
)
