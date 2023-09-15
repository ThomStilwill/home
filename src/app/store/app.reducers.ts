import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
  
}

export const initialState: AppState = {
  
};

export const AppReducer = createReducer(
    initialState
);    
