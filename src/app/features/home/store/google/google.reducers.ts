import { createReducer, on } from "@ngrx/store";
import { GoogleState } from "./google.state";
import { GoogleActions } from "./google.actions";

const initialState: GoogleState = {
    links: []
};

export const googleReducer =  createReducer(
      initialState,

      on(GoogleActions.loadGoogle, (state) => ({
        ...state, 
      })),
      on(GoogleActions.loadGoogleSuccess,(state,action) => ({
        ...state, 
        links: action.links, 
      })),
      on(GoogleActions.loadGoogleFailure,(state,action) => ({
        ...state, 
        error:action.error,
      })),
     
)
  