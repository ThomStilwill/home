import { createFeatureSelector, createSelector } from "@ngrx/store"
import { HomeState } from "./home.state";

export { LinkActions } from './link/link.actions';


const featureSelector = createFeatureSelector<HomeState>('home')
const selector = (selectorFn: <T>(state: HomeState) => T) => createSelector(featureSelector, selectorFn);

export const linksSelector = createSelector(featureSelector, (state: HomeState) => state.link.links)
export const stationSelector = createSelector(featureSelector, (state: HomeState) => state.link.stations)
export const progressSelector = createSelector(featureSelector, (state: HomeState) => state.progress.message)
export const googleSelector = createSelector(featureSelector, (state: HomeState) => state.google.links) 
