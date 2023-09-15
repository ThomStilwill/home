import { createReducer, on } from '@ngrx/store';
import { LinksState, LinkActions } from './link.store';

export const initialState: LinksState = {
  list: [],
  loading: '',
  error: undefined
};

export const LinksReducer = createReducer(
    initialState,
    on(LinkActions.loadlinks, (state) => ({
      ...state, 
      loading: state.loading
    })),
    on(LinkActions.loadlinkssuccess,(state,action) => ({
      ...state, 
      list: action.list, 
      loading:'Links Loaded.'
    })),
    on(LinkActions.loadlinksfailure,(state,action) => ({
      ...state, 
      error:action.error,
      loading: 'Links Error'
    })),
    on(LinkActions.addlink, (state) => ({
      ...state, 
      loading:'Adding Link...' 
    })),
    on(LinkActions.addlinksuccess,(state,action) => ({
      ...state, 
      list: [...state.list, action.Link],
      loading: ''
    })),
    on(LinkActions.addlinkfailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    })),

    on(LinkActions.deletelink, (state) => ({
      ...state, 
      loading:'Deleting Link...' 
    })),
    on(LinkActions.deletelinksuccess,(state,action) => ({
      ...state, 
      list: state.list.filter(x=>x.id !== action.id), 
      loading:''})),
    on(LinkActions.deletelinkfailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    }))
);    
