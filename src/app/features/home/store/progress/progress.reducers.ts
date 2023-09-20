import { createReducer, on } from "@ngrx/store";

import { ProgressActions } from "./progress.actions";
import { ProgressState } from "../home.store";

export const initialState: ProgressState = {
    message: ''
};
  
export const progressReducer= createReducer(
    initialState,
    
    on(ProgressActions.showProgress, (state) => ({
        ...state, 
        message: state.message
    })),

    on(ProgressActions.hideProgress, (state) => ({
        ...state,
        message: state.message
    }))
)

