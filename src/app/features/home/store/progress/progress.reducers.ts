import { createReducer, on } from "@ngrx/store";

import { ProgressActions } from "./progress.actions";
import { ProgressState } from "../home.store";

export const initialState: ProgressState = {
    message: ''
};
  
export const progressReducer= createReducer(
    initialState,
    
    on(ProgressActions.showProgress, (state, action) => ({
        ...state, 
        message: action.message
    })),

    on(ProgressActions.hideProgress, (state, action) => ({
        ...state,
        message: action.message
    }))
)

