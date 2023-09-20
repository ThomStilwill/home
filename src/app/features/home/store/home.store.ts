import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Link } from "./link/link.model";
import { WeatherStation } from "./link/weather.model";

export { LinkActions } from './link/link.actions';


export interface ProgressState {
  message: string;
}

export interface LinkState {
  links: Link[],
  stations: WeatherStation[]
  error: any;
}

export interface HomeState {
  progress: ProgressState,
  link: LinkState
}

const featureSelector = createFeatureSelector<HomeState>('home')
const selector = (selectorFn: <T>(state: HomeState) => T) => createSelector(featureSelector, selectorFn);

export const linksSelector = createSelector(featureSelector, state => state.link.links)
export const stationSelector = createSelector(featureSelector, state => state.link.stations)
export const progressSelector = createSelector(featureSelector, state => state.progress.message)
 