import { createFeatureSelector, createSelector } from "@ngrx/store"
import { HomeState } from "./home.state";
import { Menu } from "./menu/menu"

export { LinkActions } from './link/link.actions';

const featureSelector = createFeatureSelector<HomeState>('home')

export const linksSelector = createSelector(featureSelector, (state: HomeState) => state.link.links)
export const stationSelector = createSelector(featureSelector, (state: HomeState) => state.link.stations)
export const progressSelector = createSelector(featureSelector, (state: HomeState) => state.progress.message)
export const googleSelector = createSelector(featureSelector, (state: HomeState) => state.google.links) 
export const allMenuSelector = createSelector(featureSelector, (state: HomeState) => state.menu.menus)

export const menuSelector = (menuName: string) => 
    createSelector(allMenuSelector,  (menus: Menu[]) => {
                if (menus) {
                    return menus.find( m=>m.name==menuName).children
                }
                return null;    
            }
        )
