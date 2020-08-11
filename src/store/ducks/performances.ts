import { ApiAction } from 'store/middlewares/apiMiddleware';
import { createAPIAction } from 'store/helpers';

// action
export const API = 'API';
export const FETCH_PERFORMANCES = createAPIAction('performances/FETCH_PERFORMANCES');
export const ADD_PERFORMANCE = createAPIAction('performances/ADD_PERFORMANCE');

const DEFAULT_STATE = <any[]>[]

// reducers
const reducer = (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case FETCH_PERFORMANCES.SUCCESS:
      return [...action.payload]
    default:
      return state
  }
}

export default reducer;

// side effects
export const fetchPerformances = (): ApiAction => ({
  type: API,
  payload: {
    method: 'GET',
    url: `/api/performances/`,
  },
  onRequest: FETCH_PERFORMANCES.REQUEST,
  onSuccess: FETCH_PERFORMANCES.SUCCESS,
  onFailure: FETCH_PERFORMANCES.FAILURE,
});

export const addPerformance = (
  formData: { title: string; body: string }
): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: `/api/performances/`,
    formData
  },
  onRequest: ADD_PERFORMANCE.REQUEST,
  onSuccess: ADD_PERFORMANCE.SUCCESS,
  onFailure: ADD_PERFORMANCE.FAILURE,
});