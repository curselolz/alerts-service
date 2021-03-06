import _ from 'lodash';
import {
  GET_ALL_ALERTS_SUCCESS,
  FETCH_ALERT_SUCCESS,
  PATCH_ALERT_SUCCESS,
  CHANGE_MODAL_STATE
} from '../constants';

const initialState = {
  alerts: [],
  fetchedAlert: null,
  statusModal:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALERTS_SUCCESS:
      return {
        ...state,
        alerts: action.payload
      };
    case CHANGE_MODAL_STATE:
      return {
        ...state,
        statusModal: action.payload
      };
    case FETCH_ALERT_SUCCESS:
    case PATCH_ALERT_SUCCESS:
      let fetchedAlert = action.payload;
      let updatedAlerts = [];
      if (_.isArray(state.alerts) && state.alerts.length > 0) {
        updatedAlerts = state.alerts.map(alert => alert.uid === fetchedAlert.uid ? fetchedAlert : alert);
      }
      return {
        ...state,
        fetchedAlert,
        alerts: updatedAlerts,
      };
    default: {
      return state;
    }
  }
}
