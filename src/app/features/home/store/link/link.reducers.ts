import { createReducer, on } from '@ngrx/store';
import * as Actions from './link.actions';
import { LinksState } from './link.store';

export const initialState: LinksState = {
  list: [],
  loading: '',
  error: undefined
};

export const LinksReducer = createReducer(
    initialState,
    on(Actions.LoadLinks, (state) => ({
      ...state, 
      loading: state.loading
    })),
    on(Actions.LoadLinksSuccess,(state,action) => ({
      ...state, 
      list: action.list, 
      loading:'Links Loaded.'
    })),
    on(Actions.LoadLinksFailure,(state,action) => ({
      ...state, 
      error:action.error,
      loading: 'Links Error'
    })),
    on(Actions.AddLink, (state) => ({
      ...state, 
      loading:'Adding Link...' 
    })),
    on(Actions.AddLinksuccess,(state,action) => ({
      ...state, 
      list: [...state.list, action.Link],
      loading: ''
    })),
    on(Actions.AddLinkFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    })),

    on(Actions.DeleteLink, (state) => ({
      ...state, 
      loading:'Deleting Link...' 
    })),
    on(Actions.DeleteLinksuccess,(state,action) => ({
      ...state, 
      list: state.list.filter(x=>x.id !== action.id), 
      loading:''})),
    on(Actions.DeleteLinkFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    }))
);    
