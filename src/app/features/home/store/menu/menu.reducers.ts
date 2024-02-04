import { createReducer, on } from "@ngrx/store";
import { Menu } from "./menu";
import { MenuActions } from "./menu.actions";


export interface MenuState {
  menus: Menu[];
}

const initialState: MenuState = {
    menus: null
};

export const menuReducer =  createReducer(
      initialState,

      on(MenuActions.loadMenus, (state) => ({
        ...state, 
      })),
      on(MenuActions.loadMenuSuccess,(state,action) => ({
        ...state, 
        menus: action.menus, 
      })),
      on(MenuActions.loadMenuFailure,(state,action) => ({
        ...state, 
        error:action.error,
      })),
)
  