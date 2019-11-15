import _ from 'lodash';
import {
  FETCH_ALL_ESCALATION_RULES_SUCCESS,
} from '../constants';

const initialState = {
  fetchedRule:{},
  allRules:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ESCALATION_RULES_SUCCESS:
      return {
        ...state,
        allRules: action.payload
      };
    default: {
      return state;
    }
  }
}
