import { combineReducers, createFeature } from "@ngrx/store";
import { linkReducer } from "./link/link.reducers";
import { progressReducer } from "./progress/progress.reducers";

const reducers = combineReducers({
  link: linkReducer,
  progress: progressReducer
});

export const HomeFeature = createFeature({
  name: 'home',
  reducer: reducers
});
