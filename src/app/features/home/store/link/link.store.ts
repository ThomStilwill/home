import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Link } from "./link.model";

export interface LinksState {
  list: Link[],
  loading: string,
  error: any;
}

export interface AppState {
  links: LinksState
}

export const linkFeatureSelector = createFeatureSelector<LinksState>('links')
export const state = (state: LinksState) => state
export const linksSelector = createSelector(linkFeatureSelector, state => state.list)
export const loadSelector = createSelector(linkFeatureSelector, state => state.loading)
