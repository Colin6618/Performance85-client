import { normalize } from 'normalizr';

import cloneDeep from 'lodash/cloneDeep';

import { ApiAction } from 'store/middlewares/apiMiddleware';
import { CLEAR_ALL_ERRORS } from './errors';
import { createAPIAction } from 'store/helpers';
import { performanceSchema } from 'store/schemas';
import { batch } from 'react-redux';

// action
export const API = 'API';
export const CLEAR_PERFORMANCE_DATA = 'singleperformance/CLEAR_PERFORMANCE_DATA';
export const FETCH_PERFORMANCE = createAPIAction('singleperformance/FETCH_PERFORMANCE');
export const TOGGLE_PERFORMANCE = createAPIAction('singleperformance/TOGGLE_PERFORMANCE');
export const UPDATE_PERFORMANCE = createAPIAction('singleperformance/UPDATE_PERFORMANCE');
export const ADD_COMMENT = createAPIAction('singleperformance/ADD_COMMENT');
export const EDIT_COMMENT = createAPIAction('singleperformance/EDIT_COMMENT');


export interface SingleperformanceReducerState {
  entities: {
    comments: {
      [x: string]: any
    }
  },
  result: {
    activities: any[];
    body: string;
    title: string;
    performanceId: number;
    comments: string[];
    references: any[];
    date_opened: string;
    author: any;
    subject?: any;
    [x: string]: any
  }
}
const DEFAULT_STATE: SingleperformanceReducerState = {
  entities: {
    comments: {}
  },
  result: {
    activities: [],
    body: '',
    title: '',
    performanceId: 0,
    comments: [],
    references: [],
    date_opened: '',
    author: { username: '' },
  }
}


const reducer = (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case FETCH_PERFORMANCE.SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    //  return { ...state, entities: merge({}, state.entities, action.payload.entities) }
    case EDIT_COMMENT.SUCCESS:
    case ADD_COMMENT.SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          comments: {
            ...state.entities.comments,
            [action.payload.id]: {
              ...action.payload
            }
          }
        }
      }
    case UPDATE_PERFORMANCE.SUCCESS:
      return {
        ...state,
        result: { ...state.result, body: action.payload }
      }
    case TOGGLE_PERFORMANCE.SUCCESS:
      return {
        ...state,
        result: {
          ...state.result,
          activities: action.payload.data,
          isOpen: action.payload.performance_state === 'open' ? true : false
        }
      }
    case CLEAR_PERFORMANCE_DATA:
      return {}
    default:
      // if (action?.payload?.entities?.comments) {
      //   return merge({}, state, action?.payload?.entities?.comments);
      // }
      return state;
  }
}
export default reducer;

// side effects

export const fetchPerformanceWithId = (performanceId: number | string): ApiAction => ({
  type: API,
  payload: {
    method: 'GET',
    url: `/api/performances/${performanceId}`,
  },
  onRequest: (dispatch: any) => {
    batch(() => {
      dispatch({ type: CLEAR_ALL_ERRORS });
      dispatch({ type: CLEAR_PERFORMANCE_DATA });
      dispatch({ type: FETCH_PERFORMANCE.REQUEST });
    })
  },
  onSuccess: (dispatch: any, data) => {
    dispatch({
      type: FETCH_PERFORMANCE.SUCCESS,
      payload: normalize(data, performanceSchema)
    })
  },
  onFailure: FETCH_PERFORMANCE.FAILURE
});


//#region 
export const addComment = (
  performanceId: number | string,
  formData: { body: string }
): ApiAction => ({
  type: API,
  payload: {
    method: 'PATCH',
    url: `/api/performances/${performanceId}/comments`,
    formData: formData,
  },
  onRequest: ADD_COMMENT.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: ADD_COMMENT.SUCCESS, payload: data });
  },
  onFailure: ADD_COMMENT.FAILURE
});

export const editComment = (
  performanceId: number | string,
  commentId: string,
  formData: { body: string }
): ApiAction => ({
  type: API,
  payload: {
    method: 'PATCH',
    url: `/api/performances/${performanceId}/comments/${commentId}`,
    formData: formData,
  },
  onRequest: EDIT_COMMENT.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: EDIT_COMMENT.SUCCESS, payload: data });
    
  },
  onFailure: EDIT_COMMENT.FAILURE
});

export const updatePerformance = (
  performanceId: number | string,
  formData: { body: string }
): ApiAction => ({
  type: API,
  payload: {
    method: 'PATCH',
    url: `/api/performances/${performanceId}`,
    formData: formData,
  },
  onRequest: UPDATE_PERFORMANCE.REQUEST,
  onSuccess: UPDATE_PERFORMANCE.SUCCESS,
  onFailure: UPDATE_PERFORMANCE.FAILURE
});

export const openOrClosePerformance = (
  performanceId: number | string,
  state: string
): ApiAction => ({
  type: API,
  payload: {
    method: 'PATCH',
    url: `/api/performances/${performanceId}/${state}`,
  },
  onRequest: TOGGLE_PERFORMANCE.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({
      type: TOGGLE_PERFORMANCE.SUCCESS,
      payload: { data, performance_state: state },
    });
    
  },
  onFailure: TOGGLE_PERFORMANCE.FAILURE
});


export const addReferences = (
  performanceId: number | string,
  references: string[]
): ApiAction => ({
  type: API,
  payload: {
    method: 'PATCH',
    url: `/api/performances/${performanceId}/references`,
    formData: { references },
  },
  onSuccess: () => {
    
  },
});

export const mentionPeople = (
  performanceId: number | string,
  mentions: string[]
): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: `/api/notifications/mentions/${performanceId}`,
    formData: { mentions },
  },
  onSuccess: () => {
    
  },
});

//#endregion