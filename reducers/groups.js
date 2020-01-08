import _ from 'lodash';
import { FETCH_TRACKABLE_GROUPS } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function groups(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_TRACKABLE_GROUPS:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}