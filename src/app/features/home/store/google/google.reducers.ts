import { createReducer, on } from "@ngrx/store";
import { GoogleActions } from "./google.actions";
import { LinkBase } from "../models/linkbase.model";

export class GoogleState {
  links: LinkBase[];
}

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
      }))
)
  