import { createReducer, on } from "@ngrx/store";
import { LinkState, LinkActions } from "../home.store";

export const initialState: LinkState = {
    links: [],
    stations: [],
    error: undefined
};

export const linkReducer =  createReducer(
      initialState,
      on(LinkActions.loadLinks, (state) => ({
        ...state, 
        //loading: state.loading
      })),
      on(LinkActions.loadLinksSuccess,(state,action) => ({
        ...state, 
        links: action.links, 
        //loading: action.loading
      })),
      on(LinkActions.loadLinksFailure,(state,action) => ({
        ...state, 
        error:action.error,
        //loading: action.loading
      })),
  
      on(LinkActions.loadWeather, (state) => ({
        ...state, 
        //loading: state.loading
      })),
      on(LinkActions.loadWeatherSuccess,(state,action) => ({
        ...state, 
        stations: action.stations, 
        //loading: action.loading
      })),
      on(LinkActions.loadWeatherFailure,(state,action) => ({
        ...state, 
        error:action.error,
        //loading: action.loading
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
  