import { ActionReducerMap, combineReducers, createFeature } from "@ngrx/store";
import { linkReducer } from "./link/link.reducers";
import { progressReducer } from "./progress/progress.reducers";
import { HomeState } from "./home.state";
import { googleReducer } from "./google/google.reducers";

const reducers: ActionReducerMap<HomeState>  = 
{
  link: linkReducer,
  progress: progressReducer,
  google: googleReducer
};

export const HomeFeature = createFeature({
  name: 'home',
  reducer: combineReducers(reducers)
});
