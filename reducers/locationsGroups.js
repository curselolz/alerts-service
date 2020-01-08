import _ from 'lodash';
import { FETCH_LOCATIONS_GROUPS } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function locationsGroups(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_GROUPS:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}