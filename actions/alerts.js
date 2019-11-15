import {
  GET_ALL_ALERTS,
  GET_ALL_ALERTS_SUCCESS,
  GET_ALL_ALERTS_ERROR,
  FETCH_ALERT,
  FETCH_ALERT_SUCCESS,
  FETCH_ALERT_ERROR,
  PATCH_ALERT,
  PATCH_ALERT_SUCCESS,
  PATCH_ALERT_ERROR,
  API_ALERT,
} from '../constants';
import { cvoFetch, jsonOrDie, getRequestOpts } from 'cvo-tools';

export const getAllAlerts = (startDate, endDate) => (dispatch) => {
  const urlSearchParams = new URLSearchParams({ 
    from: startDate.startOf('day').format('X'), 
    to: endDate.endOf('day').format('X') 
  });
  dispatch({
    type: GET_ALL_ALERTS,
  });
  cvoFetch(`${API_ALERT}?${urlSearchParams.toString()}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: GET_ALL_ALERTS_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ALL_ALERTS_ERROR,
      });
    });
}

export const getAlert = (uid) => (dispatch) => {
  dispatch({
    type: FETCH_ALERT,
  });
    cvoFetch(`${API_ALERT}${uid}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          type: FETCH_ALERT_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_ALERT_ERROR,
          payload: error
        });
      });
}

export const patchAlert = (uid, newStatus) => (dispatch) => {
  dispatch({ type: PATCH_ALERT });
  if (uid && newStatus) {
    return cvoFetch(`${API_ALERT}${uid}`, getRequestOpts('PATCH', { status: newStatus }))
      .then(jsonOrDie)
      .then(alert => {
        dispatch({ type: PATCH_ALERT_SUCCESS, payload: alert })
        return alert;
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: PATCH_ALERT_ERROR, error });
      });
  } else {
    dispatch({ type: PATCH_ALERT_ERROR, error });
  }
}
