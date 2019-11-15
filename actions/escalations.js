import {
  PATCH_ESCALATION_RULE,
  PATCH_ESCALATION_RULE_SUCCESS,
  PATCH_ESCALATION_RULE_ERROR,
  FETCH_ALL_ESCALATION_RULES,
  FETCH_ALL_ESCALATION_RULES_SUCCESS,
  FETCH_ALL_ESCALATION_RULES_ERROR,
} from '../constants';
import { cvoFetch, getRequestOpts } from 'cvo-tools';
import { API_ESCALATION_RULE} from '../constants';

export const fetchAllRules = () => (dispatch) => {
  dispatch({
    type: FETCH_ALL_ESCALATION_RULES,
  });
  cvoFetch(`${API_ESCALATION_RULE}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_ALL_ESCALATION_RULES_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_ALL_ESCALATION_RULES_ERROR,
        payload: error
      });
    });
}

export const patchEscalationRule = (uid, data) => (dispatch) => {
  dispatch({
    type: PATCH_ESCALATION_RULE,
  });
  cvoFetch(`${API_ESCALATION_RULE}${uid}`, getRequestOpts('PATCH', data))
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: PATCH_ESCALATION_RULE_SUCCESS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: PATCH_ESCALATION_RULE_ERROR,
        payload: error
      });
    });
}