import { ActionReducerMap, combineReducers, createFeature } from "@ngrx/store";
import { HomeState } from "./home.state";
import { linkReducer } from "./link/link.reducers";
import { progressReducer } from "./progress/progress.reducers";
import { googleReducer } from "./google/google.reducers";
import { menuReducer } from "./menu/menu.reducers";

const reducers: ActionReducerMap<HomeState>  = 
{
  link: linkReducer,
  progress: progressReducer,
  google: googleReducer,
  menu: menuReducer
};

export const HomeFeature = createFeature({
  name: 'home',
  reducer: combineReducers(reducers)
});
