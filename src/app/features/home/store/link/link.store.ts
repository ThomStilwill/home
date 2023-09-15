import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"
import { LinksReducer } from "./link.reducers";
import { Link } from "./link.model";

export { LinkActions } from './link.actions';
export { LinksReducer } from "./link.reducers";
export { LinksEffects } from "./link.effects";


export interface LinksState {
  list: Link[],
  loading: string,
  error: any;
}

export interface AppState {
  links: LinksState
}


export const linkFeatureSelector = createFeatureSelector<LinksState>('links')
const selector = (selectorFn: <T>(state: LinksState) => T) => createSelector(linkFeatureSelector, selectorFn);


// export const reducer: ActionReducerMap<AppState> = {
//   links: LinksReducer
// } 


//export const state = (state: LinksState) => state
export const linksSelector = createSelector(linkFeatureSelector, state => state.list)
export const loadSelector = createSelector(linkFeatureSelector, state => state.loading)
