import { createReducer, on } from "@ngrx/store";
import { LinkActions } from "../home.store";
import { LinkState } from "./link.state";

const initialState: LinkState = {
    links: [],
    stations: [],
    error: undefined
};

export const linkReducer =  createReducer(
      initialState,

      on(LinkActions.loadLinks, (state) => ({
        ...state, 
      })),
      on(LinkActions.loadLinksSuccess,(state,action) => ({
        ...state, 
        links: action.links, 
      })),
      on(LinkActions.loadLinksFailure,(state,action) => ({
        ...state, 
        error:action.error,
      })),

      on(LinkActions.loadWeather, (state) => ({
        ...state, 
      })),
      on(LinkActions.loadWeatherSuccess,(state,action) => ({
        ...state, 
        stations: action.stations, 
      })),
      on(LinkActions.loadWeatherFailure,(state,action) => ({
        ...state, 
        error:action.error,
      })),
  
  
      // on(LinkActions.addLink, (state) => ({
      //   ...state, 
      //   loading:'Adding Link...' 
      // })),
      // on(LinkActions.addLinksuccess,(state,action) => ({
      //   ...state, 
      //   links: [...state.links, action.Link],
      //   loading: ''
      // })),
      // on(LinkActions.addLinkFailure,(state,action) => ({
      //   ...state, 
      //   loading:'',
      //   error:action.error
      // })),
  
      // on(LinkActions.deleteLink, (state) => ({
      //   ...state, 
      //   loading:'Deleting Link...' 
      // })),
      // on(LinkActions.deleteLinksuccess,(state,action) => ({
      //   ...state, 
      //   links: state.links.filter(x=>x.id !== action.id), 
      //   loading:''})),
      // on(LinkActions.deleteLinkFailure,(state,action) => ({
      //   ...state, 
      //   loading:'',
      //   error:action.error
      // })),
      
    )
  